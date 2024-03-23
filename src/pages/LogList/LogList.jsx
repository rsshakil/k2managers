import axios from 'axios';
import { getUnixTime, set } from 'date-fns';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { RiRefreshLine } from 'react-icons/ri';
import * as queries from '../../api/gql/queries';
import Loading from '../../components/Loading/Loader';
import LogDetailsModal from '../../components/Modal/WhiteModal/LogDetailsModal/LogDetailsModal';
import TableControls from '../../components/Table/TableControls';
import UseTable from '../../components/Table/UseTable';
import { getEndDateUnixTime } from '../../lib/date';
import { datePlaceholders } from '../../lib/datePlaceholder';
import LogListTr from './LogListTr';

// AppSync Settings
// Declare table header label
const headerCells = [
    { label: '日時', width: '11.25rem' },
    { label: 'アカウントID', width: '16rem' },
    { label: 'IPアドレス', width: '11.25rem' },
    { label: '実行場所', minWidth: '11.25rem' },
    { label: '実行内容', width: '11.25rem' },
    { label: '実行結果', width: '11.25rem' },
    { label: '詳細', width: '6rem' },
];

// Global Declaration
const pathName = window.location.pathname;

const LogList = () => {
    // DECLARATION START
    const tableRef = useRef(null);
    const loadingProcess = useRef(false);
    const tableWrapperRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [logRecords, setLogRecords] = useState([]);
    const [iconLoading, setIconLoading] = useState(false);
    const [logFunction] = useState(
        sessionStorage.getItem('logFunction') ? JSON.parse(sessionStorage.getItem('logFunction')) : ''
    );
    const [values, setValues] = useState(
        sessionStorage.getItem('inputValues')
            ? JSON.parse(sessionStorage.getItem('inputValues'))
            : { accountId: '', logFlag: '' }
    );
    const [selectedDate, setSelectedDate] = useState({
        // Lin kon Update 17/2/23
        from: JSON.parse(sessionStorage.getItem('log_list_timestamp_DateRangePicker'))?.from
            ? new Date(JSON.parse(sessionStorage.getItem('log_list_timestamp_DateRangePicker'))?.from)
            : null,
        to: JSON.parse(sessionStorage.getItem('log_list_timestamp_DateRangePicker'))?.to
            ? new Date(JSON.parse(sessionStorage.getItem('log_list_timestamp_DateRangePicker'))?.to)
            : null,
    });

    const { TblHead } = UseTable(headerCells);
    const [filter, setFilter] = useState(JSON.parse(sessionStorage.getItem('retained_log_list')));
    const [showLogDetailsModal, setShowLogDetailsModal] = useState(false);
    const [logDetailsData, setLogDetailsData] = useState({});

    // initial log list data -
    useEffect(() => {
        const initialFilterVariable = JSON.parse(sessionStorage.getItem('retained_log_list'));
        if (initialFilterVariable != {}) {
            handleFilterListLog(initialFilterVariable);
        } else {
            handleListLog();
        }
    }, []);

    // when the log function option will be changed, filter function should be called
    useEffect(() => {
        handleFilterOptions();
    }, [logFunction]);

    const fetchRecords = () => {
        let variablesParams = {};

        if (selectedDate.from && selectedDate.to) {
            let getUnixTimeFrom = getUnixTime(new Date(selectedDate.from));
            let getUnixTimeTo = getUnixTime(new Date(selectedDate.to));
            variablesParams.logDateTime = {
                between: [getUnixTimeFrom, getUnixTimeTo],
            };
        } else if (selectedDate.from) {
            // Lin kon update 26/1/23 make the toDate time 23:59:59
            const dateAndTimeSet = set(new Date(), { hours: 23, minutes: 59, seconds: 59 });

            let getUnixTimeFrom = getUnixTime(new Date(selectedDate.from));
            let getUnixTimeTo = getUnixTime(new Date(dateAndTimeSet));

            variablesParams.logDateTime = {
                between: [getUnixTimeFrom, getUnixTimeTo],
            };
        }

        setLoading(true);
        setLogRecords([]);
        let filterAll = { customerId: { attributeExists: false }, ...filter }; 
        axios({
            url: process.env.REACT_APP_APPSYNC_API_URL,
            method: 'post',
            headers: {
                'x-api-key': process.env.REACT_APP_APPSYNC_API_KEY,
            },
            data: {
                query: queries.logByLogDateTime,
                variables: {
                    filter: filterAll,
                    type: 'log',
                    sortDirection: 'DESC',
                    limit: 300,
                    ...variablesParams,
                },
            },
        })
            .then((res) => {
                setLogRecords(res.data.data.logByLogDateTime.items);
                const nextToken = res.data.data.logByLogDateTime.nextToken;
                nextToken !== null
                    ? sessionStorage.setItem('logListNextToken', JSON.stringify({ token: true, data: nextToken }))
                    : sessionStorage.setItem('logListNextToken', JSON.stringify({ token: false, data: nextToken }));
            })
            .catch((err) => console.log('Log data fetch error 1: ', err.message))
            .finally(() => {
                setLoading(false);
                setIconLoading(false);
            });
    };

    useEffect(() => {
        fetchRecords();
        sessionStorage.setItem('log_list_reload', false);
    }, [sessionStorage.getItem('log_list_reload')]);

    useEffect(() => {
        fetchRecords();
    }, [filter]);

    // automatic date selected from local storage also onChange calendar data
    useEffect(() => {
        // if user select new date
        const initialFilterVariable = JSON.parse(sessionStorage.getItem('retained_log_list'));
        handleFilterListLog(initialFilterVariable);
    }, [selectedDate]);

    // search result by user inputs
    const handleFilterListLog = (initialFilterVariable) => {
        setLoading(true);
        //get filter inputs without empty strings
        const objectWithoutEmptyValue = Object.keys(values)
            .filter((k) => values[k] !== '')
            .reduce((a, k) => ({ ...a, [k]: values[k] }), {});
        if (logFunction !== '') {
            objectWithoutEmptyValue.logFunction = logFunction;
        }

        let filterVariable = {};
        //creating a variable for axios query according to the axios format
        if (initialFilterVariable) {
            filterVariable = initialFilterVariable;
        } else {
            // values check there is other values or not
            if (Object.keys(objectWithoutEmptyValue).length > 0) {
                Object.keys(objectWithoutEmptyValue).forEach((key) => {
                    filterVariable[key] = {
                        contains: `${objectWithoutEmptyValue[key]}`,
                    };
                });

                // if there is a value it will save the calendar date as a search input from local stroage
                const items = JSON.parse(sessionStorage.getItem(`retained_log_list`));
            } else {
                const getUnixTimeFrom = getUnixTime(new Date(selectedDate.from));
                const getUnixTimeTo = getEndDateUnixTime(new Date(selectedDate.to));
                if (getUnixTimeFrom && getUnixTimeTo) {
                    filterVariable.createdAt = {
                        between: [getUnixTimeFrom, getUnixTimeTo],
                    };
                }
            }
        }

        //saving the variable in the local storage
        sessionStorage.setItem('retained_log_list', JSON.stringify(filterVariable));
        setFilter(filterVariable);
    };

    // Queries data if there is no parameters
    const handleListLog = () => {
        // default queries if there is no other search field
        let filterVariable = {};
        const items = JSON.parse(sessionStorage.getItem(`retained_log_list`));
        // local storage date select and change the variables
        if (items?.createdAt) {
            const range = items?.createdAt;
            const from = range?.between[0];
            const to = range?.between[1];
            if (from && to) {
                filterVariable.createdAt = {
                    between: [from, to],
                };
            }
        }
        setFilter(filterVariable);
    };

    const handleFilterOptions = () => {
        if (values.logFlag !== '' || logFunction !== '' || values.accountId !== '') {
            handleFilterListLog();
        } else {
            handleListLog();
            // empty string means delete from local also
            let filterVariable = JSON.parse(sessionStorage.getItem('retained_log_list'));
            if (filterVariable && filterVariable?.accountId) {
                delete filterVariable.accountId;
                sessionStorage.setItem('retained_log_list', JSON.stringify(filterVariable));
            }
            if (filterVariable && filterVariable?.logFlag) {
                delete filterVariable.logFlag;
                sessionStorage.setItem('retained_log_list', JSON.stringify(filterVariable));
            }
            if (filterVariable && filterVariable?.logFunction) {
                delete filterVariable?.logFunction;
                sessionStorage.setItem('retained_log_list', JSON.stringify(filterVariable));
            }
        }
    };

    // Handle changes on changes value store in values and setvalues
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };
    // Enter click to search data
    const handleFilterOnEnter = () => {
        handleFilterOptions();
        sessionStorage.setItem('inputValues', JSON.stringify(values));
    };

    const fetchLogDetails = (logId) => {
        setShowLogDetailsModal(true);
        // Calling api data
        setLoading(true);
        axios({
            url: process.env.REACT_APP_APPSYNC_API_URL,
            method: 'post',
            headers: { 'x-api-key': process.env.REACT_APP_APPSYNC_API_KEY },
            data: { query: queries.getLog, variables: { logId: logId } },
        })
            .then((res) => setLogDetailsData(res.data.data.getLog))
            .catch((err) => console.log('Get Log details fetch error 1: ', err))
            .finally(() => setLoading(false));
    };

    const handleIconLoading = async () => {
        setIconLoading(true);
        fetchRecords();
    };

    const fetchRecursive = (config) => { 

        axios(config)
            .then((res) => {
                const data = res.data.data?.logByLogDateTime?.items;
                const token = res.data.data.logByLogDateTime?.nextToken || null;

                token === null
                    ? sessionStorage.setItem('logListNextToken', JSON.stringify({ token: false, data: token }))
                    : sessionStorage.setItem('logListNextToken', JSON.stringify({ token: true, data: token }));

                if (!data.length) {
                    const newConfig = { ...config };
                    newConfig.data.variables.nextToken = token;
                    fetchRecursive(newConfig);
                } else setLogRecords((p) => [...p, ...data]);
            })
            .catch((err) => console.log('Log data fetch error 1: ', err.message))
            .finally(() => {
                setLoading(false);
                loadingProcess.current = false;
            });
    };

    const scrollFetch = useCallback(function () {
        const scrollTop = this.scrollTop;
        const scrollHeight = this.scrollHeight;
        const clientHeight = this.clientHeight;
        const token = JSON.parse(sessionStorage.getItem('logListNextToken'));
        const tableScrollHeight = tableWrapperRef.current.scrollHeight;
        const variables = { type: 'log', sortDirection: 'DESC', limit: 300, nextToken: token.data };
        const filterLog = JSON.parse(sessionStorage.getItem('retained_log_list'));
        const shouldFetch = scrollTop + clientHeight + 1 >= scrollHeight && tableScrollHeight < scrollHeight;
        const datePicker = JSON.parse(sessionStorage.getItem('log_list_timestamp_DateRangePicker')) || {};

        let logDateTime = { between: [] };

        if (datePicker.from) {
            const dateAndTimeSet = set(new Date(), { hours: 23, minutes: 59, seconds: 59 });
            logDateTime.between[0] = Number(getUnixTime(new Date(datePicker.from)));
            datePicker.to
                ? (logDateTime.between[1] = Number(getUnixTime(new Date(datePicker.to))))
                : (logDateTime.between[1] = Number(getUnixTime(new Date(dateAndTimeSet))));
            variables['logDateTime'] = logDateTime;
        }

        const config = {
            url: process.env.REACT_APP_APPSYNC_API_URL,
            method: 'post',
            headers: { 'x-api-key': process.env.REACT_APP_APPSYNC_API_KEY },
            data: {
                query: queries.logByLogDateTime,
                variables: { ...variables, filter: { customerId: { attributeExists: false }, ...filterLog } },
            },
        };

        if (shouldFetch && token.token) {
            setLoading(true);

            if (!loadingProcess.current) {
                loadingProcess.current = true;
                fetchRecursive(config);
            }
        }
    }, []);

    const notScrollableFetch = () => {
        const token = JSON.parse(sessionStorage.getItem('logListNextToken')) || {};
        if (loadingProcess.current || !token.token) return;
        loadingProcess.current = true;

        const variables = { type: 'log', sortDirection: 'DESC', limit: 300, nextToken: token.data };
        const datePicker = JSON.parse(sessionStorage.getItem('log_list_timestamp_DateRangePicker')) || {};
        let logDateTime = { between: [] };

        if (datePicker.from) {
            const dateAndTimeSet = set(new Date(), { hours: 23, minutes: 59, seconds: 59 });
            logDateTime.between[0] = Number(getUnixTime(new Date(datePicker.from)));
            datePicker.to
                ? (logDateTime.between[1] = Number(getUnixTime(new Date(datePicker.to))))
                : (logDateTime.between[1] = Number(getUnixTime(new Date(dateAndTimeSet))));
            variables['logDateTime'] = logDateTime;
        }

        token.token &&
            axios({
                url: process.env.REACT_APP_APPSYNC_API_URL,
                method: 'post',
                headers: { 'x-api-key': process.env.REACT_APP_APPSYNC_API_KEY },
                data: {
                    query: queries.logByLogDateTime,
                    variables: {
                        ...variables,
                        filter: {
                            customerId: { attributeExists: false },
                            ...JSON.parse(sessionStorage.getItem('retained_log_list')),
                        },
                    },
                },
            })
                .then((res) => {
                    const data = res.data.data?.logByLogDateTime?.items;
                    const nextToken = res.data.data.logByLogDateTime?.nextToken || null;
                    data && setLogRecords((p) => [...p, ...data]);
                    nextToken === null
                        ? sessionStorage.setItem('logListNextToken', JSON.stringify({ token: false, data: nextToken }))
                        : sessionStorage.setItem('logListNextToken', JSON.stringify({ token: true, data: nextToken }));
                })
                .catch((err) => console.log('Log data fetch error 1: ', err.message))
                .finally(() => {
                    setLoading(false);
                    loadingProcess.current = false;
                });
    };

    useLayoutEffect(() => {
        tableRef.current.addEventListener('scroll', scrollFetch);
        return () => tableRef.current?.removeEventListener('scroll', scrollFetch);
    }, []);

    useEffect(() => {
        if (tableRef.current.scrollHeight <= tableRef.current.clientHeight) notScrollableFetch();
    }, [sessionStorage.getItem('logListNextToken')]);

    return (
        <>
            {loading && <Loading />}
            <div className="px-4">
                {/* Filter section  */}
                <TableControls.UpperSection>
                    <div className="mt-4 mb-2 flex justify-between items-center"></div>
                    <div className="flex">
                        <TableControls.CalendarSection2
                            placeholder={datePlaceholders.logListCalendar}
                            start="dateRangeFrom"
                            end="dateRangeTo"
                            setSelectedDate={setSelectedDate}
                        />

                        <TableControls.Search
                            placeholder="アカウントID"
                            name="accountId"
                            value={values.accountId}
                            onChange={handleChange}
                            onKeyDown={(e) => e.key === 'Enter' && handleFilterOnEnter(e)}
                        />
                        <div className="flex justify-between">
                            <div>
                                <button
                                    className="h-7 cursor-pointer hover:bg-blue-300 align-middle items-center px-2
                        font-bold bg-blue-100 w-[32px] ml-4 flex text-white justify-between "
                                    onClick={() => handleIconLoading()}
                                >
                                    <RiRefreshLine className={`${iconLoading && 'animate-spin'}`} />
                                </button>
                            </div>
                        </div>
                    </div>
                </TableControls.UpperSection>

                {/* Table Section  */}
                <div className="table-wrapper" ref={tableWrapperRef}>
                    <table className="w-full text-base border-separate border-spacing-0 table-fixed">
                        <TblHead />
                        <tbody ref={tableRef} className="tbody-vertical-scroll">
                            {logRecords.map((log, index) => (
                                <LogListTr key={index} log={log} fetchLogDetails={() => fetchLogDetails(log.logId)} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {showLogDetailsModal && (
                <LogDetailsModal
                    handleCancel={() => setShowLogDetailsModal(false)}
                    logDetailsData={logDetailsData}
                    load={loading}
                />
            )}
        </>
    );
};

export default LogList;
