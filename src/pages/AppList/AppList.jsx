import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OutlineButtonLinkContainer from '../../components/Button/OutlineButtonLinkContainer';
import Footer from '../../components/Footer/Footer';
import Loading from '../../components/Loading/Loader';
import PaginationV3 from '../../components/Pagination/PaginationV3';
import AddButton from '../../components/Table/FooterSection/AddButton';
import TableControls from '../../components/Table/TableControls';
import UseTable from '../../components/Table/UseTable';
import fetchRecords from '../../lib/filterFetch';
import {
    baseURL,
    listProjectData,
    listApp,
    listEvent,
    listMethod,
    listField,
} from '../../restapi/queries';
import { instance } from '../../services/axios';
import { ItemData } from '../../utilities/projectBtnItemData';
import AppListTd from './AppListTd';
import AppModal from './AppModal';
import AppSearch from './AppSearch';

// Declare table header label
const headerCells = [
    { label: 'APP ', minWidth: '8rem' }, //320px  //382px
    { label: '画面アクセスドメイン', width: '24rem' }, //160px
    { label: 'イベント', minWidth: '9rem' }, //166px
    { label: '累計アクセス数', width: '7.25rem' }, //128px
    { label: '構成', width: '6rem' }, //128px
    { label: 'デプロイ', width: '6rem' }, //128px
    { label: 'ステータス', width: '6rem' }, //128px
    { label: 'BASIC認証', width: '6.375rem' }, //128px
    { label: '編集', width: '2.25rem' }, //1400px--> total
];

const AppList = () => {
    const processing = useRef(false);
    const recordsLabel = 'APP';
    const [openModal, setOpenModal] = useState(0);
    const [appId, setAppId] = useState(null);
    const [options, setOptions] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); // make -- true -- after finish development
    const [isOverFlow, setIsOverFlow] = useState(false);
    const [appList, setAppList] = useState([]);
    const [numberOfRecords, setNumberOfRecords] = useState(0);
    const { TblContainer, TblHead } = UseTable(headerCells);
    const [pageNumber, setPageNumber] = useState(+sessionStorage.getItem(`pagination_pageNo`) || 0);
    // Search params value
    const [searchDBParams, setSearchDBParams] = useState('');
    const retainedAppList = JSON.parse(
        sessionStorage.getItem(`retained_app_list_${sessionStorage.getItem('currentProjectId')}`)
    );

    const [values, setValues] = useState({
        appName: retainedAppList?.appName ? retainedAppList?.appName : '',
        eventId: retainedAppList?.eventId,
    });

    // filter option fetch from API
    const filterPropObj = {
        setId: 'eventId',
        setName: 'eventName',
        endPoint: listEvent,
        setOptions: setOptions,
        projectId: sessionStorage.getItem('currentProjectId'),
    };
    // Project Id change
    useEffect(() => {
        setSearchDBParams('');
        const retainedAppList = JSON.parse(
            sessionStorage.getItem(`retained_app_list_${sessionStorage.getItem('currentProjectId')}`)
        );
        const initializeValue = {
            appName: retainedAppList?.appName ? retainedAppList?.appName : '',
            eventId: retainedAppList?.eventId,
        };

        setValues({ ...initializeValue });
        fetchRecords.filter(filterPropObj);
        setLoading(true);
        // listQueryForDropdown(listCategory, 'category');
        // listQueryForDropdown(listItem, 'item');
        // listQueryForDropdown(listInstitute, 'institute');
        // listQueryForDropdown(listCounselor, 'counselor');
        // listQueryForDropdown(listBusRoute, 'busRoute');
        getCommandFieldList();
    }, [sessionStorage.getItem('currentProjectId')]);

    useEffect(() => {
        getProjectData();
    }, [sessionStorage.getItem('currentProjectId')]);


    const getCommandFieldList = async () => {
        if (processing.current) return;
        processing.current = true;
        try {
            const projectId = sessionStorage.getItem('currentProjectId');
            // let fieldType = '0,1,2,3,4,5,6,7,8,9';
            let fieldType = '9';
            if (projectId) {
                const ENDPOINT = `${baseURL}${listField}?pid=${projectId}&fieldType=${fieldType}`;
                const config = {
                    method: listMethod,
                    url: ENDPOINT,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                };
                const response = await instance.request(config);
                sessionStorage.setItem(`command_field_list_` + projectId, JSON.stringify(response?.data?.records));
                //setLoading(false);
            }
        } catch (err) {
            //setLoading(false);
        } finally {
            processing.current = false;
        }
    };
    // getProjectData
    async function getProjectData() {
        if (processing.current) return;
        processing.current = true;
        try {
            const projectId = sessionStorage.getItem('currentProjectId');
            if (projectId) {
                const ENDPOINT = `${baseURL}${listProjectData}${projectId}`;
                const config = { method: listMethod, url: ENDPOINT };
                const response = await instance.request(config);
console.log("✋✋✋response", response);
                sessionStorage.setItem(
                    `customer_view_category_filter_` + projectId,
                    JSON.stringify(response?.data?.category)
                );
                sessionStorage.setItem(
                    `customer_view_institute_filter_` + projectId,
                    JSON.stringify(response?.data?.institute)
                );
                sessionStorage.setItem(
                    `customer_view_item_filter_` + projectId,
                    JSON.stringify(response?.data?.item)
                );
                sessionStorage.setItem(
                    `customer_view_counselor_filter_` + projectId,
                    JSON.stringify(response?.data?.counselor)
                );
                sessionStorage.setItem(
                    `customer_view_busRoute_filter_` + projectId,
                    JSON.stringify(response?.data?.busRoute)
                );
/*
                let apiResponseList = [];
                if (itemListType == 'category') {
                    apiResponseList = response?.data?.records.map((item) => {
                        return { id: item.eventCategoryId ?? 0, value: item?.categorySpecialName };
                    });
                    apiResponseList = apiResponseList ?? [];
                } else if (itemListType == 'item') {
                    apiResponseList = response?.data?.records.map((item) => {
                        return { id: item.itemId, value: item.itemName };
                    });
                    apiResponseList = apiResponseList ?? [];
                } else if (itemListType == 'institute') {
                    apiResponseList = response?.data?.records.map((item) => {
                        return { id: item.eventInstituteId ?? 0, value: item?.instituteSpecialName };
                    });
                    apiResponseList = apiResponseList ?? [];
                } else if (itemListType == 'counselor') {
                    apiResponseList = response?.data?.records.map((item) => {
                        return { id: item.counselorId, value: item.counselorName };
                    });
                    apiResponseList = apiResponseList ?? [];
                } else if (itemListType == 'busRoute') {
                    apiResponseList = response?.data?.records.map((item) => {
                        return { id: item.eventBusId ?? 0, value: item?.busRouteSpecialName };
                    });
                    apiResponseList = apiResponseList ?? [];
                }
*/
                // sessionStorage.setItem(
                //     `customer_view_${itemListType}_filter_` + projectId,
                //     JSON.stringify(apiResponseList)
                // );
            }
        } catch (err) {
            console.log('Field err', err);
        } finally {
            processing.current = false;
        }
    }


    // listQueryForDropdown
    async function listQueryForDropdown(APIURL, itemListType) {
        // if (processing.current) return;
        // processing.current = true;
        try {
            const projectId = sessionStorage.getItem('currentProjectId');
            if (projectId) {
                const ENDPOINT = `${baseURL}${APIURL}?pid=${projectId}`;
// console.log("ENDPOINTENDPOINT", ENDPOINT);
                const config = { method: listMethod, url: ENDPOINT };
                const response = await instance.request(config);
                let apiResponseList = [];
                if (itemListType == 'category') {
                    apiResponseList = response?.data?.records.map((item) => {
                        return { id: item.eventCategoryId ?? 0, value: item?.categorySpecialName };
                    });
                    apiResponseList = apiResponseList ?? [];
                } else if (itemListType == 'item') {
                    apiResponseList = response?.data?.records.map((item) => {
                        return { id: item.itemId, value: item.itemName };
                    });
                    apiResponseList = apiResponseList ?? [];
                } else if (itemListType == 'institute') {
                    apiResponseList = response?.data?.records.map((item) => {
                        return { id: item.eventInstituteId ?? 0, value: item?.instituteSpecialName };
                    });
                    apiResponseList = apiResponseList ?? [];
                } else if (itemListType == 'counselor') {
                    apiResponseList = response?.data?.records.map((item) => {
                        return { id: item.counselorId, value: item.counselorName };
                    });
                    apiResponseList = apiResponseList ?? [];
                } else if (itemListType == 'busRoute') {
                    apiResponseList = response?.data?.records.map((item) => {
                        return { id: item.eventBusId ?? 0, value: item?.busRouteSpecialName };
                    });
                    apiResponseList = apiResponseList ?? [];
                }
                sessionStorage.setItem(
                    `customer_view_${itemListType}_filter_` + projectId,
                    JSON.stringify(apiResponseList)
                );
            }
        } catch (err) {
            console.log('Field err', err);
        } finally {
            // processing.current = false;
        }
    }

    return (
        <>
            {loading && <Loading />}
            <div className={`${isOverFlow && 'overflow-hidden'} `}>
                <OutlineButtonLinkContainer ItemData={ItemData} />
                <div className="px-4">
                    {/* Filter section  */}
                    <TableControls.UpperSection>
                        <TableControls.NumberOfRecords recordsLabel={recordsLabel} numberOfRecords={numberOfRecords} />
                        <div className="flex justify-around">
                            <AppSearch
                                options={options}
                                setSearchDBParams={setSearchDBParams}
                                values={values}
                                setValues={setValues}
                                setPageNumber={setPageNumber}
                            />
                        </div>
                    </TableControls.UpperSection>
                    {/* Table Section  */}
                    <div className="table-wrapper">
                        <TblContainer>
                            <TblHead />
                            <tbody className="h-[calc(100vh-206px)] tbody-vertical-scroll">
                                {appList &&
                                    appList?.map((app, index) => (
                                        <tr key={index} className="h-8 table-row-bg row-display text-left">
                                            <AppListTd app={app} />
                                        </tr>
                                    ))}
                            </tbody>
                        </TblContainer>
                    </div>
                    {openModal === 1 && (
                        <AppModal
                            setOpenModal={setOpenModal}
                            setIsOverFlow={setIsOverFlow}
                            appId={appId}
                            setAppId={setAppId}
                        />
                    )}

                    {/* Pagination Section  */}
                    <Footer>
                        {
                            <PaginationV3
                                itemsPerPage={300}
                                endPoint={listApp}
                                records={appList}
                                setRecords={setAppList}
                                setLoading={setLoading}
                                setNumberOfRecords={setNumberOfRecords}
                                subQueryString={searchDBParams}
                                routeName={'app_list'}
                                pageNumber={pageNumber}
                                setPageNumber={setPageNumber}
                            />
                        }
                        <div className="flex flex-col items-end">
                            <AddButton text="APP追加" onClick={() => navigate('/app_add')} />
                        </div>
                    </Footer>
                </div>
            </div>
        </>
    );
};

export default AppList;
