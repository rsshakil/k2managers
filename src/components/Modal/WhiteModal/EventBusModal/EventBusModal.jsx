import { Form, Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import useGetEventBus from '../../../../hooks/useGetEventBus';
import {
    baseURL,
    listBusWay,
    listEventItemSlotTemplateModal,
    listMethod,
    updateEventBus,
    updateMethod
} from '../../../../restapi/queries';
import { instance } from '../../../../services/axios';
import ErrorMessage from '../../../ErrorMessage/ErrorMessage';
import ModalFormFooter from '../../../Footer/ModalFormFooter';
import Loading from '../../../Loading/Loader';
import TagBoxComponentV4 from '../../../ManagementItem/TagBoxComponentV4';
import UseTable from '../../../Table/UseTable';
import FormBodyContainer from '../../../Wrapper/FormBodyContainer';
import InputContainer from '../../../Wrapper/InputContainer';
import ModalTitle from '../../components/ModalTitle';
import WhiteModalWrapper from '../../components/WhiteModalWrapper';
import _ from "lodash";

const headerCells = [
    { label: '開催枠', minWidth: '17.5rem' },
    { label: '路線名', minWidth: '24.5rem' },
    { label: '便名', width: '22.25rem' }, //setting app
    { label: '予約', width: '11.375rem' }, // updateDate
    { label: '定員', width: '11.375rem' }, //createDate
];

const initialValues = {
    memo: '',
};
const EventBusModal = ({
    pathName,
    formType,
    setIsOverflow,
    handleCancel,
    eventInstituteId,
    instituteName,
    mappingId,
    mappingDate,
}) => {
    const { info } = useSelector((state) => state.auth);
    const processing = useRef(false);
    const [systemError, setSystemError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loadingBusWay, setLoadingBusWay] = useState(true);
    const { TblContainer, TblHead } = UseTable(headerCells);
    const [functionMode, setFunctionMode] = useState({ mode: '', item: {} });
    const [countTagBox1, setCoutTagBox1] = useState([{ name: 'TagBox1', ID: 1 }]);

    const [busWayList, setBusWayList] = useState([]);
    const [busTableData, setBusTableData] = useState({});
    const [busTableArr, setBusTableArr] = useState([]);
    const [slotRowData, setSlotRowData] = useState([]);
    const [preDefineTagBoxValue, setPreDefineTagBoxValue] = useState({});
    const [busWayListLoaded, setBusWayListLoaded] = useState(false);

    const { eventBus, load, error } = useGetEventBus(mappingId);

    useEffect(() => {
        getBusWayList();
        getListData();
    }, []);


    useEffect(() => {
        if (eventBus?.length > 0 && busWayListLoaded) {
            setLoadingBusWay(true)
            const selectedBusItems = [];
            const selectedBusWayIds = [];
            let selectedBusWayIdsTimeWise = {};
            eventBus.forEach((bus) => {
                selectedBusWayIds.push(bus.busWayId);
                let busWay = busWayList.filter((item) => item.busWayId == bus.busWayId);
                const timeString = timeToTimeString(bus.busTime);
                bus.time = timeString;
                if (busWay.length > 0) {
                    bus.busWayName = busWay[0].busWayName ? busWay[0].busWayName : '';
                    bus.busRouteName = busWay[0].busRouteName ? busWay[0].busRouteName : '';
                    bus.busWayCapacity = busWay[0].busWayCapacity ? busWay[0].busWayCapacity : '';
                }
                selectedBusItems.push(bus);
                let prevSelectedBusWayIdsTime = selectedBusWayIdsTimeWise[bus.busTime]
                    ? selectedBusWayIdsTimeWise[bus.busTime] + ','
                    : '';
                const selectedBusWayIdValue = (prevSelectedBusWayIdsTime + bus.busWayId).split(',').map(Number);
                selectedBusWayIdsTimeWise[bus.busTime] = selectedBusWayIdValue;
                //event_scheduler_timestamp_141_973_08:00
                const tagBoxSessionStorageKey = `${pathName}_timestamp_${eventInstituteId}_${mappingId}_${timeString}`;
                sessionStorage.removeItem(tagBoxSessionStorageKey);
                sessionStorage.setItem(tagBoxSessionStorageKey, JSON.stringify(selectedBusWayIdValue));
            });
            setPreDefineTagBoxValue(selectedBusWayIdsTimeWise);

            if (busWayList.length > 0) {
                /*busWayList.map((item, i) => {
                    item.disabled = selectedBusWayIds.includes(item.busWayId);
                    item.showText = item.busRouteName + '：' + item.busWayName + '（' + item.busRouteManageName + '）'
                });
                setBusWayList(busWayList);*/

                // console.log("⚓ Disable busWayList", busWayList)
                const selectedBusArr = {};
                Object.values(selectedBusWayIdsTimeWise).map((busTimes, i) => {
                    const time = timeToTimeString(Object.keys(selectedBusWayIdsTimeWise)[i]);
                    selectedBusArr[time] = [];
                    busTimes.forEach((bus, k) => {
                        let item = busWayList.filter((item) => item.busWayId == bus);
                        // console.log("busReservationCount", item);
                        item.busReservationCount = 0;
                        selectedBusArr[time][k] = item[0];
                    });
                });
                // setBusTableData({ ...busTableData, ...selectedBusArr });
            }
            // Sort with ascending order
            selectedBusItems.sort(function (a, b) {
                return parseInt(a.time) - parseInt(b.time);
            });


            console.log('my val check >>', selectedBusItems)
            setBusTableArr(selectedBusItems);
            setLoadingBusWay(false)
        }
    }, [eventBus, busWayListLoaded]);

    const getListData = async () => {
        setLoading(true);
        try {
            const ENDPOINT = `${baseURL}${listEventItemSlotTemplateModal + eventInstituteId}`;
            const config = {
                method: listMethod,
                url: ENDPOINT,
            };

            const response = await instance.request(config);
            if (response.data.records) {
                setSlotRowData(response.data.records?.rowsData);
                console.log("⚓ Row Data", response.data.records?.rowsData)
            }
            setLoading(false);
        } catch (error) {
            setSystemError(true);
            setLoading(false);
        }
    };

    const handleOnChangeTagItems = (time, { addedItems = [], removedItems = [] }) => {
        if (addedItems.length > 0) {
            const modifiedNewItems = addedItems.map(x => ({ time, busTime: Number(time.replace(':', '')), ...x }));

            setBusTableArr(prevState => (_.uniqBy([...prevState, ...modifiedNewItems], 'busWayId').sort((a, b) => parseInt(a.time) - parseInt(b.time))));
        }

        if (removedItems.length > 0) {
            const removeItemIdArr = removedItems.map(x => x.busWayId);
            setBusTableArr(prevState => prevState.filter(x => removeItemIdArr.includes(x.busWayId) == false));
        }

        console.log('looooooooooooooooooooooooooooooooo time', time)
        console.log('looooooooooooooooooooooooooooooooo addedItems', addedItems)
        console.log('looooooooooooooooooooooooooooooooo removedItems', removedItems)
    }

    const getBusWayList = async () => {
        setLoading(true);
        setLoadingBusWay(true)
        try {
            const pid = sessionStorage.getItem('currentProjectId');
            const ENDPOINT = `${baseURL}${listBusWay}?pid=${pid}`;
            const config = {
                method: listMethod,
                url: ENDPOINT,
            };

            const response = await instance.request(config);
            if (response.data.records.length > 0) {
                let busWayList = response.data.records;

                busWayList.map((item, i) => {
                    let busName = item.busRouteName + '：' + item.busWayName;
                    if (item.busRouteManageName) busName += '（' + item.busRouteManageName + '）';

                    item.showText = busName
                });
                // console.log("busTableData xxxx", busWayList);
                setBusWayList(busWayList);
                setBusWayListLoaded(true);

            }
            setLoading(false);
            setLoadingBusWay(false)
        } catch (error) {
            setSystemError(true);
            setLoading(false);
            setLoadingBusWay(false)
        }
    };

    const handleSubmit = async (values) => {
        if (processing.current) return;
        processing.current = true;
        let formData = [];
        busTableArr.forEach((bus, i) => {
            let data = {};
            data.busTime = bus.busTime;
            data.busWayId = bus.busWayId;
            formData.push(data);
        });

        try {
            setLoading(true);
            const ENDPOINT = `${baseURL}${updateEventBus}${eventInstituteId}`;
            const config = {
                method: updateMethod,
                url: ENDPOINT,
                data: {
                    mappingId: mappingId,
                    busData: formData,
                    updateAt: Date.now().toLocaleString(),
                    updatedBy: info.accountId,
                },
            };

            const created = await instance.request(config);
            if (created) {
                setSystemError(false);
                setLoading(false);
                handleCancel(true);
            }
            //setOpenModal16MonthCal(false)
        } catch (error) {
            setSystemError(true);
            setLoading(false);
        } finally {
            processing.current = false;
        }
    };

    const timeToTimeString = (time) => {
        const timeString = String(time);
        if (timeString.length < 4) {
            return ('0' + String(time).slice(0, 1)).slice(-2) + ':' + String('0' + time).slice(-2);
        } else {
            return String(time).slice(0, 2) + ':' + String('0' + time).slice(-2);
        }
    };

    const getDragList = () => {
        const selectedItems = busTableArr.map(x => x.busWayId);

        return busWayList.map(x => {
            if (selectedItems.includes(x.busWayId) == true) return { ...x, disabled: true };
            return { ...x };
        })
    }


    // console.log("⚓busWayList", busWayList)

    return (
        <>
            {(loading || loadingBusWay) && <Loading />}
            {(load || loadingBusWay) ? (
                <Loading />
            ) : (
                <WhiteModalWrapper width="border-none text-black" className="items-start">
                    {/*this is the modal title section*/}
                    <ModalTitle className="text-blue-100 bold text-xl" title={`${instituteName}：${mappingDate}`} />
                    <Formik
                        validateOnChange={false}
                        validateOnBlur={false}
                        initialValues={initialValues}
                        onSubmit={(values) => handleSubmit(values)}
                    >
                        {({ errors }) => {
                            const first = Object.keys(errors)[0];
                            return (
                                <>
                                    <div className="relative w-full h-full">
                                        <Form>
                                            <div className="-mt-4" id="scroller"></div>
                                            <FormBodyContainer className="!px-0">
                                                <div>
                                                    {slotRowData.length > 0 &&
                                                        slotRowData.map((rowData, index) => (
                                                            <InputContainer key={index}>
                                                                <label className="text-blue-100">
                                                                    バス路線・運行便設定：開催枠{rowData.time}
                                                                </label>
                                                                <div
                                                                    className="w-full flex"
                                                                    key={rowData.busWayId + index}
                                                                >
                                                                    <div className="w-full">
                                                                        <InputContainer>
                                                                            <TagBoxComponentV4
                                                                                dragList={getDragList()}
                                                                                functionMode={functionMode}
                                                                                preDefineTagBoxValue={
                                                                                    preDefineTagBoxValue[
                                                                                    Number(
                                                                                        rowData.time.replace(
                                                                                            ':',
                                                                                            ''
                                                                                        )
                                                                                    )
                                                                                    ]
                                                                                }
                                                                                count={`${eventInstituteId}_${mappingId}_${rowData.time}`}
                                                                                displayExpr="showText"
                                                                                valueExpr="busWayId"
                                                                                pathName={pathName}
                                                                                // tagBoxSessionStorageKey={(
                                                                                //     sessionStorageKey
                                                                                // ) =>
                                                                                //     tagBoxSessionStorageKey(
                                                                                //         sessionStorageKey,
                                                                                //         rowData.time
                                                                                //     )
                                                                                // }
                                                                                onChangeTagItems={(data) => handleOnChangeTagItems(rowData.time, data)}
                                                                                loadingBusWay={loadingBusWay}
                                                                            />
                                                                        </InputContainer>
                                                                        {/* <InputContainer>
                                                                            <TagBoxComponent
                                                                                dragList={busWayList}
                                                                                functionMode={functionMode}
                                                                                preDefineTagBoxValue={
                                                                                    preDefineTagBoxValue[
                                                                                    Number(
                                                                                        rowData.time.replace(
                                                                                            ':',
                                                                                            ''
                                                                                        )
                                                                                    )
                                                                                    ]
                                                                                }
                                                                                count={`${eventInstituteId}_${mappingId}_${rowData.time}`}
                                                                                displayExpr="showText"
                                                                                valueExpr="busWayId"
                                                                                pathName={pathName}
                                                                                tagBoxSessionStorageKey={(
                                                                                    sessionStorageKey
                                                                                ) =>
                                                                                    tagBoxSessionStorageKey(
                                                                                        sessionStorageKey,
                                                                                        rowData.time
                                                                                    )
                                                                                }
                                                                            />
                                                                        </InputContainer> */}
                                                                    </div>
                                                                </div>
                                                                {
                                                                    // countTagBox1.length > 0 &&
                                                                    // countTagBox1.map((ctb) => (
                                                                    //     <div
                                                                    //         className="w-full flex"
                                                                    //         key={rowData.busWayId + index}
                                                                    //     >
                                                                    //         <div className="w-full">
                                                                    //             <InputContainer>
                                                                    //                 <TagBoxComponent
                                                                    //                     dragList={busWayList}
                                                                    //                     functionMode={functionMode}
                                                                    //                     preDefineTagBoxValue={
                                                                    //                         preDefineTagBoxValue[
                                                                    //                         Number(
                                                                    //                             rowData.time.replace(
                                                                    //                                 ':',
                                                                    //                                 ''
                                                                    //                             )
                                                                    //                         )
                                                                    //                         ]
                                                                    //                     }
                                                                    //                     count={`${eventInstituteId}_${mappingId}_${rowData.time}`}
                                                                    //                     displayExpr="showText"
                                                                    //                     // displayExpr={
                                                                    //                     //     (data) =>
                                                                    //                     //         data.busRouteName
                                                                    //                     //         +
                                                                    //                     //         '：' +
                                                                    //                     //         data.busWayName
                                                                    //                     // }

                                                                    //                     valueExpr="busWayId"
                                                                    //                     pathName={pathName}
                                                                    //                     tagBoxSessionStorageKey={(
                                                                    //                         sessionStorageKey
                                                                    //                     ) =>
                                                                    //                         tagBoxSessionStorageKey(
                                                                    //                             sessionStorageKey,
                                                                    //                             rowData.time
                                                                    //                         )
                                                                    //                     }
                                                                    //                 />
                                                                    //             </InputContainer>
                                                                    //         </div>
                                                                    //     </div>
                                                                    // ))

                                                                }
                                                            </InputContainer>
                                                        ))}

                                                    <InputContainer>
                                                        <div className="table-wrapper">
                                                            <TblContainer className="!table-auto">
                                                                <TblHead />
                                                                <tbody className="h-[calc(100vh-350px)] tbody-vertical-scroll">
                                                                    {/* --------TAble content goes here-------- */}

                                                                    {busTableArr.map((bus, index) => (
                                                                        <tr
                                                                            key={index}
                                                                            className="h-8 table-row-bg row-display text-left"
                                                                        >
                                                                            <td className="min-w-[17.5rem] max-w-[0] px-2 right-border text-left">
                                                                                {bus.time}
                                                                            </td>
                                                                            <td className="min-w-[24.5rem] px-2 right-border text-left max-w-[0]">
                                                                                {bus.busRouteName}
                                                                            </td>
                                                                            <td className="w-[22.25rem] px-2 right-border text-left">
                                                                                {bus.busWayName}
                                                                            </td>
                                                                            <td className="w-[11.375rem] px-2 right-border text-right">
                                                                                {bus.busReservationCount}
                                                                            </td>
                                                                            <td className="w-[11.375rem] right-border px-2 text-right">
                                                                                {bus.busWayCapacity}
                                                                            </td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </TblContainer>
                                                        </div>
                                                    </InputContainer>
                                                    <ModalFormFooter
                                                        padding="!p-0"
                                                        btn_title1={`${formType === 'add' ? 'キャンセル' : ''}`}
                                                        btn_title2={`${formType === 'add' ? '保存' : ''}`}
                                                        formType={formType}
                                                        handleCancel={handleCancel}
                                                        setIsOverFlow={setIsOverflow}
                                                        memoViewDisable={true}
                                                    >
                                                        {/* ----error---- */}
                                                        <ErrorMessage></ErrorMessage>
                                                    </ModalFormFooter>
                                                </div>
                                            </FormBodyContainer>
                                        </Form>
                                    </div>
                                </>
                            );
                        }}
                    </Formik>
                </WhiteModalWrapper>
            )}
        </>
    );
};
export default EventBusModal;
