import { DateBox } from 'devextreme-react';
import { Form, Formik, useFormikContext } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Loading from '../../../../components/Loading/Loader';
import { errorMessages } from '../../../../lib/errorMessages';
import { baseURL, updateEventInstituteCalendar, updateMethod } from '../../../../restapi/queries';
import { instance } from '../../../../services/axios.js';
import ErrorMessage from '../../../ErrorMessage/ErrorMessage';
import SelectBox from '../../../Form/FormInputs/SelectBox';
import InputContainer from '../../../Wrapper/InputContainer';
import { selectMonth, selectTime } from '../StoreService/data';
import CalendarFooter from './CalendarFooter';

const FormObserver = ({ path, eventInstituteId }) => {

    const { values } = useFormikContext();
    try {
        const getLSData = window.sessionStorage.getItem(`${path}_${eventInstituteId}_timestamp_16MonthsCalendar`),
            parseLSdata = JSON.parse(getLSData);

        let fromUnixtimeDate = 0;
        let fromUnixtimeTime = 0;
        let toUnixtimeDate = 0;
        let toUnixtimeTime = 0;

        selectMonth.map((value) => {
            if (value?.key == values.eventInstituteReserveDateFrom) {
                fromUnixtimeDate = value?.unixtime;
            }
        });
        selectTime.map((value) => {
            if (value?.key == values.eventInstituteReserveTimeFrom) {
                fromUnixtimeTime = value?.unixtime;
            }
        });
        selectMonth.map((value) => {
            if (value?.key == values.eventInstituteReserveDateTo) {
                toUnixtimeDate = value?.unixtime;
            }
        });
        selectTime.map((value) => {
            if (value?.key == values.eventInstituteReserveTimeTo) {
                toUnixtimeTime = value?.unixtime;
            }
        });

        const eventInstituteReserveFrom = fromUnixtimeDate - fromUnixtimeTime;
        const eventInstituteReserveTo = toUnixtimeDate - toUnixtimeTime;

        parseLSdata.eventInstitute.info = {
            ...parseLSdata.eventInstitute.info,
            eventInstituteReserveDateFrom: values.eventInstituteReserveDateFrom,
            eventInstituteReserveTimeFrom: values.eventInstituteReserveTimeFrom,
            eventInstituteReserveDateTo: values.eventInstituteReserveDateTo,
            eventInstituteReserveTimeTo: values.eventInstituteReserveTimeTo,

            eventInstituteReserveFrom: eventInstituteReserveFrom,
            eventInstituteReserveTo: eventInstituteReserveTo,
        };
        window.sessionStorage.setItem(
            `${path}_${eventInstituteId}_timestamp_16MonthsCalendar`,
            JSON.stringify(parseLSdata)
        );
    } catch (e) {
        console.log('Warning:: sessionStorage DATA not Founded!!', e.message);
    }

    return null;
};

const CalendarForm = ({ setOpenModal16MonthCal, initialValues, formType, path, eventInstituteId, dateTimeObj, eventInstituteItemType }) => {
    const { info } = useSelector((state) => state.auth);
    const processing = useRef(false);
    const [errorCode, setErrorCode] = useState('E_SYSTEM_01');
    const [dateBoxConfig, setDateBoxConfig] = useState({
        acceptCustomValue: false,
        interval: 15,
        now: new Date(),
        min: new Date(2020, 0, 1),

        max: new Date(2050, 0, 1),
    });
    const [options, setOptions] = useState({
        selectMonthOptions: selectMonth,
        selectTimeOptions: selectTime,
    });
    const [dateBoxStartDate, setDateBoxStartDate] = useState(''),
        [dateBoxStartTime, setDateBoxStartTime] = useState(''),
        [dateBoxEndDate, setDateBoxEndDate] = useState(''),
        [dateBoxEndTime, setDateBoxEndTime] = useState('');

    let resDateTimeObj = {
        resStartDate: undefined,
        resStartTime: undefined,
        resEndDate: undefined,
        resEndTime: undefined,
    }; // Alert Don't change the object key name

    const [_, setReservation] = useState(true),
        [fieldError] = useState(false),
        [systemError, setSystemError] = useState(false);
    const [loading, setLoading] = useState(false);

    // useEFFECT START
    useEffect(() => {
        checkValueInStorage();
    }, []);

    useEffect(() => {
        setDateBoxStartDate(dateTimeObj?.resStartDate);
        setDateBoxStartTime(dateTimeObj?.resStartTime);
        setDateBoxEndDate(dateTimeObj?.resEndDate);
        setDateBoxEndTime(dateTimeObj?.resEndTime);
    }, [dateTimeObj]);

    const closeModal = () => {
        setOpenModal16MonthCal(false);
    },
        onChangeHandle = () => { },
        onValueChangedHandleSD = (e) => {
            if (typeof e.event !== 'undefined') {
                resDateTimeSetIntoSessionStorage('resStartDate', e.value);
                setDateBoxStartDate(e.value);
            }
        },
        onValueChangedHandleED = (e) => {
            if (typeof e.event !== 'undefined') {
                resDateTimeSetIntoSessionStorage('resEndDate', e.value);
                setDateBoxEndDate(e.value);
            }
        },
        onValueChangedHandleST = (e) => {
            if (typeof e.event !== 'undefined') {
                resDateTimeSetIntoSessionStorage('resStartTime', e.value);
                resDateTimeObj.resStartTime = e.value;
                setDateBoxStartTime(e.value);
            }
        },
        // value change
        onValueChangedHandleET = (e) => {
            if (typeof e.event !== 'undefined') {
                resDateTimeObj.resEndTime = e.value;
                resDateTimeSetIntoSessionStorage('resEndTime', e.value);
                setDateBoxEndTime(e.value);
            }
        },
        // option change
        onOptionChanged = (e) => {
            if (e.name === 'text' && e.value !== '') {
                if (resDateTimeObj.hasOwnProperty(e.element.id)) {
                    resDateTimeObj[e.element.id] = e.value;
                }
            }
        },
        // form validation
        validate = (values) => {
            setDXValueInFormikValues(values);
            let errors = {};
            const errorMessRequired = '施設表示期間';
            // DATE
            if (!values.resStartDate) {
                errors.resStartDate = errorMessages?.W_REQUIRED_01(errorMessRequired);
            } else if (!values.resStartTime) {
                errors.resStartTime = errorMessages?.W_REQUIRED_01(errorMessRequired);
            } else if (!values.resEndDate) {
                errors.resEndDate = errorMessages?.W_REQUIRED_01(errorMessRequired);
            } else if (!values.resEndTime) {
                errors.resEndTime = errorMessages?.W_REQUIRED_01(errorMessRequired);
            } else if (dateCompare(resDateTimeObj['resStartDate'], resDateTimeObj['resEndDate']) === 'GREATER_THEN') {
                errors.resEndDate = errorMessages?.W_DATE_01;
            }
            // TIME
            else if (
                dateCompare(resDateTimeObj['resStartDate'], resDateTimeObj['resEndDate']) === 'EQUAL' &&
                timeCompare(resDateTimeObj['resStartTime'], resDateTimeObj['resEndTime']) === 'GREATER_THEN'
            ) {
                errors.resEndTime = errorMessages?.W_DATE_01;
            }

            return errors;
        },
        // submit the form
        onSubmitFormik = async (values) => {
            if (processing.current) return;
            processing.current = true;

            setLoading(true);
            setSystemError(false);

            let resStartDateTimeArr = dateBoxStartTime.split(' ');
            let resStartDateTime = dateBoxStartDate + ' ' + resStartDateTimeArr[1];
            let eventInstituteStartDate = parseInt((new Date(resStartDateTime).getTime() / 1000).toFixed(0));

            let resEndDateTimeArr = dateBoxEndTime.split(' ');
            let resEndDateTime = dateBoxEndDate + ' ' + resEndDateTimeArr[1];
            let eventInstituteEndDate = parseInt((new Date(resEndDateTime).getTime() / 1000).toFixed(0));
            let mappingDataList = sessionStorage.getItem(`${path}_${eventInstituteId}_timestamp_16MonthsCalendar`);
            let checkMappingDataList = JSON.parse(mappingDataList);
            let itemArray = checkMappingDataList.eventInstitute;
            console.log('mappingDataList', itemArray);
            delete itemArray.info;
            let found = true;
            if (itemArray) {
                Object.keys(itemArray).length>0 && Object.keys(itemArray).forEach(function (item) {
                    let yearItems = itemArray[item];
                    console.log('yearItems',yearItems);
                    Object.keys(yearItems).length>0 && Object.keys(yearItems).forEach(function (year) {
                        let itemsList = yearItems[year];
                        console.log('itemsList', itemsList);
                        itemsList && itemsList.length > 0 && itemsList.map(row => {
                            console.log('rowData', row);
                            if (row && (row?.resStartDate == "null" || row?.resEndDate == "null")) {
                                console.log('invalid date value');
                                found = false;
                                return false;
                            }
                        })
                    });
                });
            }
          
            if(found){
                try {
                    const ENDPOINT = `${baseURL}${updateEventInstituteCalendar}${eventInstituteId}`;
                    const config = {
                        method: updateMethod,
                        url: ENDPOINT,
                        data: {
                            eventInstituteStartDate: eventInstituteStartDate,
                            eventInstituteEndDate: eventInstituteEndDate,
                            memo: values.memo,
                            createdBy: info.accountId,
                            updatedBy: info.accountId,
                            mappingData: mappingDataList,
                            eventInstituteItemType,
                        },
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    };

                    const created = await instance.request(config);
                    if (created) {
                        setSystemError(false);
                        setLoading(false);
                    }
                    setOpenModal16MonthCal(false);
                } catch (error) {
                    console.log('errror', error);
                    if (error?.response?.data?.errorCode == 701) {
                        setErrorCode('E_UPDATE_05');
                    } else {
                        setErrorCode('E_SYSTEM_01');
                    }

                    setSystemError(true);
                    setLoading(false);
                } finally {
                    processing.current = false;
                }
            } else {
                setErrorCode('E_CAL_ERROR_01');
                setSystemError(true);
                setLoading(false);
                processing.current = false;
            }
        };

    const setAddHandler = () => { };

    function resDateTimeSetIntoSessionStorage(key, value) {
        try {
            const getLSData = window.sessionStorage.getItem(`${path}_${eventInstituteId}_timestamp_16MonthsCalendar`),
                parseLSdata = JSON.parse(getLSData);

            let values = parseLSdata.eventInstitute.info.values;
            if (typeof values === 'undefined') {
                values = initialValues;
            }
            values[key] = value;
            parseLSdata.eventInstitute.info = {
                ...parseLSdata.eventInstitute.info,
                values: values,
            };
            window.sessionStorage.setItem(
                `${path}_${eventInstituteId}_timestamp_16MonthsCalendar`,
                JSON.stringify(parseLSdata)
            );
        } catch (err) {
            console.log(err, 'err resDateTimeSetIntoSessionStorage');
        }
    }

    // SOME NECESSARY FUNCTION START

    function setDateBoxDxValue(value) {
        return value !== null ? value : null;
    }

    function checkValueInStorage() {
        try {
            const getLSData = window.sessionStorage.getItem(`${path}_${eventInstituteId}_timestamp_16MonthsCalendar`),
                parseLSdata = JSON.parse(getLSData);

            const lsKeyName = parseLSdata?.eventInstitute?.info?.values;
            if (getLSData !== null) {
                setDateBoxStartDate(lsKeyName?.resStartDate);
                setDateBoxEndDate(lsKeyName?.resEndDate);
                setDateBoxStartTime(lsKeyName?.resStartTime);
                setDateBoxEndTime(lsKeyName?.resEndTime);
            }
        } catch (e) {
            console.log('Warning:: sessionStorage DATA not Founded!!', e.message);
        }
    }

    function setDXValueInFormikValues(values) {
        Object.keys(resDateTimeObj).forEach((Key) => {
            if (resDateTimeObj[Key] != null) {
                values[Key] = resDateTimeObj[Key];
            }
        });
    }

    function timeCompare(time1, time2) {
        const date1 = new Date('2020-01-01 ' + time1);
        const date2 = new Date('2020-01-01 ' + time2);

        // Verify if the first time is equal
        if (date1.getTime() === date2.getTime()) {
            return 'EQUAL';
        } else if (date1.getTime() > date2.getTime()) {
            return 'GREATER_THEN';
        } else {
            return 'LESS_THEN';
        }
    }

    function dateCompare(d1, d2) {
        const date1 = new Date(d1);
        const date2 = new Date(d2);
        if (date1 < date2) {
            return 'LESS_THEN';
        } else if (date1 > date2) {
            return 'GREATER_THEN';
        } else {
            return 'EQUAL';
        }
    }

    return (
        <>
            {loading && <Loading />}

            <Formik
                enableReinitialize={true}
                validateOnChange={false}
                validateOnBlur={false}
                initialValues={initialValues}
                validate={validate}
                onSubmit={onSubmitFormik}
            >
                {({ errors, handleChange }) => {
                    const first = Object.keys(errors)[0];
                    return (
                        <>
                            <div className="relative w-full h-full">
                                <Form>
                                    <FormObserver
                                        setReservation={setReservation}
                                        path={path}
                                        eventInstituteId={eventInstituteId}
                                    />
                                    <InputContainer className="mb-8">
                                        <label className="text-blue-100">施設表示期間</label>
                                        <div className="flex">
                                            <div className="dx-field-value bg-blue-25 border border-blue-100 cdx-DateBox">
                                                <DateBox
                                                    name="resStartDate"
                                                    fullName="resStartDate"
                                                    inputAttr={{ id: 'resStartDate' }}
                                                    elementAttr={{ id: 'resStartDate' }}
                                                    min={dateBoxConfig.min}
                                                    max={dateBoxConfig.max}
                                                    acceptCustomValue={dateBoxConfig.acceptCustomValue}
                                                    onChange={onChangeHandle}
                                                    value={dateBoxStartDate}
                                                    onValueChanged={onValueChangedHandleSD}
                                                    onOptionChanged={onOptionChanged}
                                                    type="date"
                                                />
                                            </div>
                                            <div className="dx-field-value bg-blue-25 border border-blue-100  cdx-DateBox cdx-field-value-ml">
                                                <DateBox
                                                    name="resStartTime"
                                                    fullName="resStartTime"
                                                    elementAttr={{ id: 'resStartTime' }}
                                                    min={dateBoxConfig.min}
                                                    max={dateBoxConfig.max}
                                                    interval={dateBoxConfig.interval}
                                                    acceptCustomValue={dateBoxConfig.acceptCustomValue}
                                                    onChange={onChangeHandle}
                                                    value={dateBoxStartTime}
                                                    onValueChanged={onValueChangedHandleST}
                                                    onOptionChanged={onOptionChanged}
                                                    type="time"
                                                />
                                            </div>
                                            <span className="mx-[39px] text-blue-100">～</span>
                                            <div className="dx-field-value bg-blue-25 border border-blue-100 cdx-DateBox">
                                                <DateBox
                                                    name="resEndDate"
                                                    fullName="resEndDate"
                                                    inputAttr={{ id: 'resEndDate' }}
                                                    elementAttr={{ id: 'resEndDate' }}
                                                    min={dateBoxConfig.min}
                                                    max={dateBoxConfig.max}
                                                    acceptCustomValue={dateBoxConfig.acceptCustomValue}
                                                    onChange={onChangeHandle}
                                                    value={dateBoxEndDate}
                                                    onValueChanged={onValueChangedHandleED}
                                                    onOptionChanged={onOptionChanged}
                                                    type="date"
                                                />
                                            </div>
                                            <div className="dx-field-value bg-blue-25 border border-blue-100 cdx-DateBox cdx-field-value-ml">
                                                <DateBox
                                                    name="resEndTime"
                                                    fullName="resEndTime"
                                                    elementAttr={{ id: 'resEndTime' }}
                                                    min={dateBoxConfig.min}
                                                    max={dateBoxConfig.max}
                                                    interval={dateBoxConfig.interval}
                                                    acceptCustomValue={dateBoxConfig.acceptCustomValue}
                                                    onChange={onChangeHandle}
                                                    value={dateBoxEndTime}
                                                    onValueChanged={onValueChangedHandleET}
                                                    onOptionChanged={onOptionChanged}
                                                    type="time"
                                                />
                                            </div>
                                        </div>
                                    </InputContainer>
                                    <InputContainer className="mb-8">
                                        <label className="text-blue-100">予約受付期間初期値</label>
                                        <div className="flex ml-[-8px]">
                                            <SelectBox
                                                inputClassName="w-[265px] h-[34px] text-blue-100 bg-blue-25"
                                                labelClassName="text-blue-100"
                                                name="eventInstituteReserveDateFrom"
                                            >
                                                {options?.selectMonthOptions.length > 0 &&
                                                    options?.selectMonthOptions.map((option, index) => (
                                                        <option
                                                            value={option.key}
                                                            key={option.key}
                                                            className="text-black"
                                                        >
                                                            {option.value}
                                                        </option>
                                                    ))}
                                            </SelectBox>
                                            <span className="pl-[45px] pr-[41px] text-blue-100">の</span>
                                            {/* 2nd SELECT-BOX */}
                                            <SelectBox
                                                inputClassName="w-[265px] h-[34px] text-blue-100 bg-blue-25"
                                                labelClassName="text-blue-100"
                                                name="eventInstituteReserveTimeFrom"
                                            >
                                                {options?.selectTimeOptions.length > 0 &&
                                                    options?.selectTimeOptions.map((option, index) => (
                                                        <option
                                                            value={option.key}
                                                            key={option.key}
                                                            className="text-black"
                                                        >
                                                            {option.value}
                                                        </option>
                                                    ))}
                                            </SelectBox>
                                            <span className="ml-[39px] mr-[31px] text-blue-100">～</span>
                                            {/* 3rd SELECT-BOX */}
                                            <SelectBox
                                                inputClassName="w-[265px] h-[34px] text-blue-100 bg-blue-25"
                                                labelClassName="text-blue-100"
                                                name="eventInstituteReserveDateTo"
                                            >
                                                {options?.selectMonthOptions.length > 0 &&
                                                    options?.selectMonthOptions.map((option, index) => (
                                                        <option
                                                            value={option.key}
                                                            key={option.key}
                                                            className="text-black"
                                                        >
                                                            {option.value}
                                                        </option>
                                                    ))}
                                            </SelectBox>
                                            <span className="ml-[49px] mr-[39px] text-blue-100">の</span>
                                            {/* 4th SELECT-BOX */}
                                            <SelectBox
                                                inputClassName="w-[265px] h-[34px] text-blue-100 bg-blue-25"
                                                labelClassName="text-blue-100"
                                                name="eventInstituteReserveTimeTo"
                                            >
                                                {options?.selectTimeOptions.length > 0 &&
                                                    options?.selectTimeOptions.map((option, index) => (
                                                        <option
                                                            value={option.key}
                                                            key={option.key}
                                                            className="text-black"
                                                        >
                                                            {option.value}
                                                        </option>
                                                    ))}
                                            </SelectBox>
                                        </div>
                                    </InputContainer>

                                    <CalendarFooter
                                        btn_title1="キャンセル"
                                        btn_title2="保存"
                                        formType={formType}
                                        handleCancel={closeModal}
                                        setAdd={setAddHandler}
                                    >
                                        {/* ----error---- */}
                                        <ErrorMessage className={`${errors[first]} ? "visible" : "invisible"`}>
                                            {fieldError && !errors[first]
                                                ? `${errorMessages.W_EXISTS_01('フィールド名')}`
                                                : errors[first]}
                                            {systemError && !errors[first] && `${errorMessages[errorCode]}`}
                                        </ErrorMessage>
                                    </CalendarFooter>
                                    <div className="text-orange-300 text-right">
                                        実施日が確定するとアイテムの追加削除スロットの枠構造に関わる変更が出来なくなります
                                        <br></br>
                                        枠の最大数変更や実施日の受付期間の変更は引き続き可能です
                                    </div>
                                </Form>
                            </div>
                        </>
                    );
                }}
            </Formik>
        </>
    );
};
export default CalendarForm;
