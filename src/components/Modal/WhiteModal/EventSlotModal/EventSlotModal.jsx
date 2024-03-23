import DataGrid, {
    Column,
    ColumnFixing,
    Editing,
    Grouping, Paging, PatternRule
} from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.light.css';
import React, { useEffect, useRef, useState } from 'react';
import Button from '../../../Button/Button';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';
import { Form, Formik } from 'formik';
import { BsLink } from 'react-icons/bs';
import { CgFileDocument } from 'react-icons/cg';
import { useSelector } from 'react-redux';
import useGetEventSlot from '../../../../hooks/useGetEventSlot';
import { errorMessages } from '../../../../lib/errorMessages';
import {
    baseURL, listSchedulerSlotUpdate,
    updateMethod
} from '../../../../restapi/queries';
import { instance } from '../../../../services/axios';
import ErrorMessage from '../../../ErrorMessage/ErrorMessage';
import Loading from '../../../Loading/Loader';
import Page1440Body from '../../../Page1440/Page1440Body.jsx';
import ModalTitle from '../../components/ModalTitle';
import WhiteModalWrapper from '../../components/WhiteModalWrapper';
import './EventSlotModal.css';
import moment from "moment";

const EventSlotModal = ({
    setCancelModal,
    pathName,
    eventInstituteId,
    eventName,
    categoryName,
    instituteName,
    mappingId,
    mappingDate,
    eventInstituteItemType
}) => {
    const role = useSelector((state) => state.auth.role);

    const [slotRowData, setSlotRowData] = useState([]);
    const [slotColumnData, setSlotColumnData] = useState({});
    const [slotAllColumnData, setSlotAllColumnData] = useState({});
    const [dataGridWidth, setDataGridWidth] = useState(0);
    const [slotsCount, setSlotsCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [systemError, setSystemError] = useState(false);
    const [validationMessage, setValidationMessage] = useState('');
    const [errorShow, setErrorShow] = useState(false);
    const [initialValues, setInitialValues] = useState({});
    const { info } = useSelector((state) => state.auth);
    const [modifiedDataField, setModifiedDataField] = useState([]);
    const [targetDataField, setTargetDataField] = useState('');
    const [focusedRowIndex, setFocusedRowIndex] = useState('');
    const [validationArr, setValidationArr] = useState([]);

    const sessionStorageKey = `${pathName}_${eventInstituteId}_${mappingId}_eventItemSlotModal`;

    const { eventSlot, eventBus, load, error } = useGetEventSlot(mappingId);

    const [eventBusId, setEventBusId] = useState();
    const [busRouteName, setBusRouteName] = useState();
    const [busWayName, setBusWayName] = useState();

    // eventBusId = created.eventBusId[0].eventBusId
    // busRouteName = created.eventBusId[0].busRouteName
    // busWayName = created.eventBusId[0].busWayName

    const grid = useRef();

    useEffect(() => {
        setValuesInExistingSessionStorage();
    }, []);

    useEffect(() => {
        const slots = eventSlot?.columnsData?.slots;
        if (slots) {
            // column width set
            setupGridWidth(eventSlot.columnsData);

            const actualColumnData = JSON.parse(JSON.stringify(eventSlot.columnsData));
            actualColumnData.slots.forEach(slot => {
                slot.child.forEach(child => {
                    child.gChild.shift();
                })
            })

            setSlotColumnData(actualColumnData);
            if (role.r6 === 1) {
                setSlotAllColumnData(eventSlot.columnsData);
            } else {
                setSlotAllColumnData(actualColumnData);
            }

            setSlotRowData(eventSlot.rowsData);
            sessionStorage.setItem(sessionStorageKey, JSON.stringify(eventSlot));

            let slotsLength = 0;
            slots.forEach((slot) => {
                slot.child.forEach((item) => {
                    slotsLength++;
                });
            });
            setSlotsCount(slotsLength);

            if (eventBus != undefined && eventBus.length >= 1) {
                // console.log("busあり", slots.eventBusId);
                for (let i = 0; i < eventBus.length; i++) {
                    setEventBusId(eventBus[i].eventBusId);
                    setBusRouteName(eventBus[i].busRouteName);
                    setBusWayName(eventBus[i].busWayName);
                }
            }
        }
    }, [eventSlot]);

    const setValuesInExistingSessionStorage = () => {
        try {
            const getSSData = window.sessionStorage.getItem(sessionStorageKey),
                parseSSdata = JSON.parse(getSSData);

            if (getSSData !== null) {
                // column width set
                setupGridWidth(parseSSdata.columnsData);
                setSlotColumnData(parseSSdata.columnsData);
                setSlotRowData(parseSSdata.rowsData);
            }
        } catch (e) {
            console.log('Error in store data in sessionStorage when submit the 16 month calendar from. ', e.message);
        }
    };

    const setupGridWidth = (columnsData) => {
        if (columnsData.slots) {
            let childCount = 0;
            columnsData.slots.map((item) => {
                childCount += item.child.length;
            });
            const gridWidth = childCount * 168;
            if (gridWidth < 1440) {
                setDataGridWidth(gridWidth);
            } else {
                setDataGridWidth('100%');
            }
        }
    };

    const onToolbarPreparing = (e) => {
        const toolbarItems = e.toolbarOptions.items;
        toolbarItems.forEach((item) => {
            if (item.name === 'saveButton' || item.name === 'revertButton') {
                item.visible = false;
            }
        });
    };

    //This is a custom component to customize the column header
    const ColumnHeader = (e) => {
        return (
            <>
                <div>{e.data.column.caption}</div>
                <div
                    className={`absolute ml-[32px] mt-[-45px] overflow-visible ${e.data.column.caption === '最大' ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    <BsLink color={'white'} size={30} />
                </div>
            </>
        );
    };

    const handleCancel = () => {
        setCancelModal(false);
    };

    const onOptionChanged = (e) => {
        if (e.name === 'editing') {
            setErrorShow(false);
        }

        if (e.fullName === 'editing.changes') {
            if (focusedRowIndex === '' || targetDataField === '') {
                return;
            }
            let affectedDataField = modifiedDataField;

            const dataFieldId = String(targetDataField.split('_')[0]);

            let targetSlotColumnArr = [];
            slotColumnData.slots.forEach((slot) => {
                let targetSlotColumnFind;
                if (dataFieldId == 'null') {
                    targetSlotColumnFind = slot.child.find((child) => child.itemId === null);
                } else {
                    targetSlotColumnFind = slot.child.find((child) => child.itemId == dataFieldId);
                }
                if (typeof targetSlotColumnFind !== 'undefined') {
                    slot.child.forEach((child) => {
                        targetSlotColumnArr.push(child.itemId + '_' + child.id);
                    });
                }
            });

            let targetSlotRow = slotRowData[focusedRowIndex];
            let targetRowValue;
            e.value.forEach((item) => {
                let targetSlotRowFind = item.key.ID === targetSlotRow.ID;
                if (targetSlotRowFind) {
                    targetRowValue = item.data[targetDataField];
                }
            });

            if (typeof targetRowValue !== 'undefined') {
                targetSlotColumnArr.forEach((dataField) => {
                    targetSlotRow[dataField] = targetRowValue;
                    affectedDataField[focusedRowIndex + ',' + dataField] = targetRowValue ? targetRowValue : 0;
                });

                let records = {};
                records['columnsData'] = slotColumnData;
                records['rowsData'] = slotRowData;
                window.sessionStorage.setItem(sessionStorageKey, JSON.stringify(records));

                setModifiedDataField(affectedDataField);
            }
        }

        if (e.fullName === 'editing.editColumnName') {
            if (modifiedDataField) {
                for (const key in modifiedDataField) {
                    let modifiedDataFieldKey = key.split(',');
                    if (modifiedDataField.hasOwnProperty(key)) {
                        updateCell(modifiedDataFieldKey[0], modifiedDataFieldKey[1], modifiedDataField[key]);
                    }
                }
            }
        }

        let getSessionStorage = JSON.parse(window.sessionStorage.getItem(sessionStorageKey));

        const targetColumnDataField = [];
        getSessionStorage.columnsData.slots.map((slot, i) => {
            if (i > 0) {
                slot.child.forEach((child) => {
                    targetColumnDataField.push(child.gChild[2]?.dataField);
                });
            }
        });

        if (validationArr.length > 0) {
            validationArr.forEach((row, rowIndex) => {
                row.forEach((cell, cellIndex) => {
                    if (!cell) {
                        let errorCellElement = grid.current?.instance?.getCellElement(
                            rowIndex,
                            targetColumnDataField[cellIndex]
                        );
                        errorCellElement?.classList.add('error-show');
                    }
                });
            });
        }
    };

    function updateCell(rowIndex, dataField, value) {
        grid.current.instance.cellValue(rowIndex, dataField, value);
    }

    const handleValidate = () => {
        setValidationArr([]);

        let getSessionStorage = JSON.parse(window.sessionStorage.getItem(sessionStorageKey));
        const errors = {};
        // Get chain parent column - child > grand child dataField
        const targetColumnDataField = [];
        const reservationColumnDataField = [];
        getSessionStorage.columnsData.slots.map((slot, i) => {
            if (i > 0) {
                slot.child.forEach((child) => {
                    if (child.gChild.length == 3) {
                        targetColumnDataField.push(child.gChild[2]?.dataField);
                        reservationColumnDataField.push(child.gChild[0]?.dataField);
                    }
                    else {
                        targetColumnDataField.push(child.gChild[3]?.dataField);
                        reservationColumnDataField.push(child.gChild[1]?.dataField);
                    }
                });
            }
        });

        // Get target rows columns value
        let dataFieldValue = [];
        let reservationFieldValue = [];
        getSessionStorage.rowsData.forEach((row) => {
            let dataFieldArr = [];
            let reservationFieldArr = [];
            targetColumnDataField.forEach((dataField, i) => {
                // console.log("slotbug", dataField);
                dataFieldArr[i] = row[dataField];
            });
            reservationColumnDataField.forEach((dataField, i) => {
                reservationFieldArr[i] = row[dataField];
            });
            dataFieldValue.push(dataFieldArr);
            reservationFieldValue.push(reservationFieldArr);
        });


        let validationStatusArr = [];
        let validation_error = false;

        // console.log("slotbug dataFieldValue", dataFieldValue);
        // console.log("slotbug reservationFieldValue", reservationFieldValue);

        dataFieldValue.forEach((rowArr, rowIndex) => {
            console.log('rowArr', rowArr)
            let firstIndexValue = rowArr[0];
            // console.log("slotbug baseValue", firstIndexValue);
            let validation = [];
            rowArr.forEach((number, numberIndex) => {
                if (firstIndexValue >= 999) {
                    validation.push(true);
                } else {
                    /*console.log(number, 'number')
                    console.log(reservationFieldValue[rowIndex][numberIndex], 'reservationFieldValue --> number')*/
                    // if value not integer or negative or number grater then first index value then showing error || reservation > max-reservation
                    if ((!Number.isInteger(number) || number < 0 || number > firstIndexValue) && number < 999 || reservationFieldValue[rowIndex][numberIndex] > number) {
                        validation.push(false);
                        validation_error = true;
                    }
                    else {
                        validation.push(true);
                    }
                }
                // if value negative or gather then 999 showing error
                if (number < 0 || number > 999) {
                    validation_error = true;
                }
            });
            validationStatusArr.push(validation);
            setValidationArr((oldValidation) => [...oldValidation, validation]);
        });
        console.log("validation_error", validation_error)
        if (validation_error) {
            errors.number = errorMessages.W_NUMERIC_01;
            setErrorShow(true);
        }

        console.log("slotbug validationStatusArr", validationStatusArr);

        if (validationStatusArr.length > 0) {
            validationStatusArr.forEach((row, rowIndex) => {
                row.forEach((cell, cellIndex) => {
                    if (!cell) {
                        let errorCellElement = grid.current?.instance?.getCellElement(
                            rowIndex,
                            targetColumnDataField[cellIndex]
                        );
                        errorCellElement?.classList.add('error-show');
                    } else {
                        let errorCellElement = grid.current?.instance?.getCellElement(
                            rowIndex,
                            targetColumnDataField[cellIndex]
                        );
                        errorCellElement?.classList.remove('error-show');
                    }
                });
            });
        }

        return errors;
    };

    const processing = useRef(false);

    // handleUpdate row values
    const handleUpdate = async (e) => {
        if (processing.current) return;
        processing.current = true;
        const { rowsData } = JSON.parse(sessionStorage.getItem(sessionStorageKey));
        try {
            setLoading(true);
            const ENDPOINT = `${baseURL}${listSchedulerSlotUpdate}${mappingId}`;
            const config = {
                method: updateMethod,
                url: ENDPOINT,
                data: {
                    rowsData: rowsData,
                    eventInstituteItemType: eventInstituteItemType,
                    updateAt: Date.now().toLocaleString(),
                    updatedBy: info.accountId,
                },
            };

            const created = await instance.request(config);
            if (created) {
                setSystemError(false);
                setErrorShow(false);
                setLoading(false);
                handleCancel(true);
            }
        } catch (error) {
            if (error.response.data?.message === 'capacity over') {
                console.log("slotbug capacity over");
                setValidationMessage(errorMessages.W_NUMERIC_01);
            }
            setSystemError(true);
            setErrorShow(true);
            setLoading(false);
        } finally {
            processing.current = false;
        }
    };

    const onEditorPreparing = (cellData) => {
        setTargetDataField(cellData.name);
        setFocusedRowIndex(cellData.row.rowIndex);
    };

    const cellRender = (cellInfo, dataField) => {
        if (dataField.includes('_reservation')) {
            let limitFlag = dataField.replace('_reservation', '_limitflag');
            if (cellInfo.data[limitFlag]) {
                return <div className="text-red-500">{cellInfo.data[dataField].toString()}</div>;
            } else {
                return cellInfo.data[dataField].toString();
            }
        }
    };

    const exportToExcel = (e) => {
        const currentDate = new Date();
        const currentDateFormat = moment(currentDate).format('YYYY/MM/DD HH:mm');

        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet('予約枠情報');
        let rightPosition = slotsCount * 3 - 2;
        if (role.r6 === 1) {
            rightPosition = slotsCount * 4 - 3;
        }

        // header top
        const headerTopRow = worksheet.getRow(2);
        headerTopRow.height = 30;
        // merge by start row, start column, end row, end column
        worksheet.mergeCells(2, 1, 2, rightPosition);

        //headerTopRow.getCell(1).value = `『${eventName}』`
        headerTopRow.getCell(1).value = `『${eventName}』`;
        //"『YYYY-MM-DD 施設名』作成日時：YYYY-MM-DD HH:MM";
        headerTopRow.getCell(1).font = {
            color: { argb: '000' },
            name: 'Segoe UI Light',
            size: 22,
        };
        headerTopRow.getCell(1).alignment = { horizontal: 'center' };

        // header
        const headerRow = worksheet.getRow(3);
        headerRow.height = 30;
        worksheet.mergeCells(3, 1, 3, rightPosition);

        //headerRow.getCell(1).value = `『${eventName}』`
        headerRow.getCell(
            1
        ).value = `『予約枠情報：${categoryName} ${instituteName} ${mappingDate}』作成日時：${currentDateFormat}`;
        //"『YYYY-MM-DD 施設名』作成日時：YYYY-MM-DD HH:MM";
        headerRow.getCell(1).font = {
            color: { argb: '000' },
            name: 'Segoe UI Light',
            size: 22,
        };
        headerRow.getCell(1).alignment = { horizontal: 'center' };

        // Loop through the headers array and generate the header rows
        const headerRowIndex = 4;
        const childRowIndex = 5;
        const gChildRowIndex = 6;
        let headerIndex = 1;
        let childIndex = 1;
        let gChildIndex = 1;
        slotAllColumnData.slots.forEach((header) => {
            const headerRow = worksheet.getRow(headerRowIndex);
            headerRow.getCell(childIndex).value = '';
            const headerChildLength = header.child ? header.child.length : 0;
            let endHeaderColumn = 0;
            if (headerIndex === 1) {
                endHeaderColumn = headerChildLength > 0 ? headerIndex + headerChildLength - 1 : headerIndex;
            } else {
                if (role.r6 === 1) {
                    endHeaderColumn = headerChildLength > 0 ? headerIndex + (headerChildLength * 4) - 1 : headerIndex;
                } else {
                    endHeaderColumn = headerChildLength > 0 ? headerIndex + (headerChildLength * 3) - 1 : headerIndex;
                }
            }

            // merge by start row, start column, end row, end column
            worksheet.mergeCells(headerRowIndex, headerIndex, headerRowIndex, endHeaderColumn);

            headerIndex = endHeaderColumn + 1;

            if (header.child && header.child.length > 0) {
                header.child.forEach((child) => {
                    const childRow = worksheet.getRow(childRowIndex);
                    childRow.getCell(childIndex).value = child.caption;
                    childRow.getCell(childIndex).style = { font: { bold: true } };
                    childRow.getCell(childIndex).alignment = { horizontal: 'center', vertical: 'middle' };
                    let childrenLength = child.gChild ? child.gChild.length : 0;
                    const endChildColumn = childrenLength > 0 ? childIndex + childrenLength - 1 : childIndex;

                    if (child.gChild && child.gChild.length > 0) {
                        child.gChild.forEach((gChild,) => {
                            const gChildRow = worksheet.getRow(gChildRowIndex);
                            gChildRow.getCell(gChildIndex).value = gChild.caption;
                            gChildRow.getCell(gChildIndex).style = { font: { bold: true } };
                            gChildRow.getCell(gChildIndex).alignment = { horizontal: 'center' };
                            gChildIndex++;
                        });
                    }
                    else {
                        const gChildRow = worksheet.getRow(gChildRowIndex);
                        gChildRow.getCell(gChildIndex).value = '';
                        gChildIndex++;
                    }

                    // merge by start row, start column, end row, end column
                    if (childIndex === 1) {
                        worksheet.mergeCells(childRowIndex, childIndex, childRowIndex + 1, endChildColumn);
                    } else {
                        worksheet.mergeCells(childRowIndex, childIndex, childRowIndex, endChildColumn);
                    }

                    childIndex = endChildColumn + 1;
                });
            }
        });

        // Loop through the data array and add the data rows
        let slotRowDataLength = 0;
        if (slotRowData && slotRowData.length) {
            slotRowDataLength = slotRowData.length;
            slotRowData.forEach((row) => {
                delete row.ID;
                delete row.instituteLimit;
                Object.keys(row).forEach((key) => {
                    if (key.includes("_limitflag") || key.includes("_common")) {
                        delete row[key];
                    }
                    else if (role.r6 !== 1 && key.includes("_slotId")) {
                        delete row[key];
                    }
                });

                worksheet.addRow(Object.values(row));
            });
        }

        // footer account ID
        const footerRowIndexAccountId = 6 + slotRowDataLength + 2;
        const footerRowAccountId = worksheet.getRow(footerRowIndexAccountId);
        worksheet.mergeCells(footerRowIndexAccountId, 2, footerRowIndexAccountId, rightPosition);

        footerRowAccountId.getCell(1).value = 'アカウントID';
        footerRowAccountId.getCell(2).value = info.accountId;
        footerRowAccountId.getCell(2).font = { color: { argb: 'ff0000' }, italic: true };
        footerRowAccountId.getCell(2).alignment = { horizontal: 'right' };

        if (role.r6 === 1) {
            // footer account mappingId
            const footerRowIndexMappingId = 6 + slotRowDataLength + 3;
            const footerRowMappingId = worksheet.getRow(footerRowIndexMappingId);
            worksheet.mergeCells(footerRowIndexMappingId, 2, footerRowIndexMappingId, rightPosition);
            footerRowMappingId.getCell(1).value = 'マッピングID';
            footerRowMappingId.getCell(2).value = mappingId;
            footerRowMappingId.getCell(2).font = { color: { argb: 'ff0000' }, italic: true };
            footerRowMappingId.getCell(2).alignment = { horizontal: 'right' };
            // バスであればバスIDも表示する
            if (eventBusId >= 1) {
                if (eventBus != undefined && eventBus.length >= 1) {
                    for (let i = 0; i < eventBus.length; i++) {
                        const footerRowIndexEventBusId = 6 + slotRowDataLength + 4 + i;
                        const footerRowEventBusId = worksheet.getRow(footerRowIndexEventBusId);
                        worksheet.mergeCells(footerRowIndexEventBusId, 2, footerRowIndexEventBusId, rightPosition);
                        footerRowEventBusId.getCell(1).value = 'バスID';

                        footerRowEventBusId.getCell(2).value = eventBus[i].eventBusId + "：" + "路線名:" + eventBus[i].busRouteName + "（" + eventBus[i].busWayName + "）"
                        footerRowEventBusId.getCell(2).font = { color: { argb: 'ff0000' }, italic: true };
                        footerRowEventBusId.getCell(2).alignment = { horizontal: 'right' };
                    }
                }
            }
        }

        // Generate and download the Excel file
        workbook.xlsx.writeBuffer().then((buffer) => {
            saveAs(
                new Blob([buffer], { type: 'application/octet-stream' }),
                `予約枠情報_${eventName}_${categoryName}_${instituteName}_${mappingDate.replaceAll(
                    /\//g,
                    ''
                )}_${currentDateFormat.replaceAll(/\/|:| /g, '')}.xlsx`
            );
        });
        e.cancel = true;
    };

    return (
        <>
            {loading && <Loading />}
            {load ? (
                <Loading />
            ) : (
                <WhiteModalWrapper width="border-none text-black slot-modal-wrapper" className="items-start">
                    {/*this is the modal title section*/}
                    <ModalTitle
                        className="text-blue-100 bold text-xl"
                        title={`予約枠情報：${categoryName} ${instituteName} ${mappingDate}`}
                    />
                    <Page1440Body className="slot_table_modal_page">
                        <Formik
                            validateOnChange={false}
                            validateOnBlur={false}
                            initialValues={initialValues}
                            validate={handleValidate}
                            onSubmit={handleUpdate}
                        >
                            {({ errors }) => {
                                const first = Object.keys(errors)[0];
                                return (
                                    <Form>
                                        <DataGrid
                                            ref={grid}
                                            dataSource={slotRowData}
                                            height={600}
                                            width={dataGridWidth}
                                            columnAutoWidth={false}
                                            allowColumnReordering={false}
                                            showBorders={true}
                                            rowAlternationEnabled={true}
                                            onToolbarPreparing={onToolbarPreparing}
                                            onOptionChanged={onOptionChanged}
                                            className="slotTableCustomClass"
                                            onEditorPreparing={onEditorPreparing}
                                            hoverStateEnabled={true}
                                        >
                                            <Grouping contextMenuEnabled={true} expandMode="rowClick" />
                                            <ColumnFixing enabled={true} />
                                            <Paging enabled={false} />
                                            <Editing mode="batch" allowUpdating={true} />

                                            {slotColumnData?.slots?.map((parent, parentIndex) => (
                                                <Column
                                                    key={parent.id}
                                                    parentId={parent.id}
                                                    caption={parent.caption}
                                                    fixed={parent.fixed}
                                                    cssClass={`${parent.child.length > 1 ? 'bg-green-100' : ''}`}
                                                >
                                                    {parent?.child.map((child, childIndex) => (
                                                        <Column
                                                            key={child.id + child.caption}
                                                            caption={child.caption} //dynamic
                                                            fixed={child.fixed}
                                                            format={child.format}
                                                            cssClass={`${parentIndex === 1
                                                                ? 'childHeader facility-header'
                                                                : parentIndex > 0
                                                                    ? 'childHeader'
                                                                    : 'childHeaderOther'
                                                                }`}
                                                            chained={true}
                                                            displayChain={true}
                                                            chainedWith={child.chainedWith}
                                                            dataField={child.dataField ? child.dataField : undefined}
                                                            width={child.width ? child.width : undefined}
                                                            allowEditing={child.allowEditing}
                                                            allowSorting={child.allowSorting}
                                                            sortIndex={child.sortIndex}
                                                            prev={child.prev}
                                                            next={child.next}
                                                            childId={child.id}
                                                            childsParentId={child.parentId}
                                                        >
                                                            {child?.gChild
                                                                ? child['gChild'].map((gChild) =>
                                                                    role.r6 == 1 ? (
                                                                        <Column //0
                                                                            key={gChild.id + gChild.caption}
                                                                            gChildsParentId={gChild.parentId}
                                                                            dataField={gChild.dataField} //dynamic
                                                                            caption={gChild.caption}
                                                                            width={gChild.width}
                                                                            allowEditing={gChild.allowEditing}
                                                                            allowSorting={gChild.allowSorting}
                                                                            cssClass={`grandChildHeaderClass`}
                                                                            headerCellComponent={
                                                                                parent?.child.length > 1 &&
                                                                                    childIndex + 1 < parent?.child.length
                                                                                    ? (e) => ColumnHeader(e)
                                                                                    : ''
                                                                            }
                                                                            cellRender={
                                                                                gChild.dataField.includes(
                                                                                    '_reservation'
                                                                                )
                                                                                    ? (e) =>
                                                                                        cellRender(
                                                                                            e,
                                                                                            gChild.dataField
                                                                                        )
                                                                                    : ''
                                                                            }
                                                                        //format={columnValueFormat}
                                                                        >
                                                                            <PatternRule pattern="^\d+$" />
                                                                        </Column>
                                                                    ) : (
                                                                        <Column //0
                                                                            key={gChild.id + gChild.caption}
                                                                            gChildsParentId={gChild.parentId}
                                                                            dataField={gChild.dataField} //dynamic
                                                                            caption={gChild.caption}
                                                                            width={gChild.width}
                                                                            allowEditing={false}
                                                                            allowSorting={gChild.allowSorting}
                                                                            cssClass={`grandChildHeaderClass`}
                                                                            headerCellComponent={
                                                                                parent?.child.length > 1 &&
                                                                                    childIndex + 1 < parent?.child.length
                                                                                    ? (e) => ColumnHeader(e)
                                                                                    : ''
                                                                            }
                                                                            cellRender={
                                                                                gChild.dataField.includes(
                                                                                    '_reservation'
                                                                                )
                                                                                    ? (e) =>
                                                                                        cellRender(
                                                                                            e,
                                                                                            gChild.dataField
                                                                                        )
                                                                                    : ''
                                                                            }
                                                                        //format={columnValueFormat}
                                                                        >
                                                                            <PatternRule pattern="^\d+$" />
                                                                        </Column>
                                                                    )
                                                                )
                                                                : null}
                                                        </Column>
                                                    ))}
                                                </Column>
                                            ))}
                                        </DataGrid>

                                        {errorShow ? (
                                            <ErrorMessage className={`${errors[first]} ? "visible" : "invisible"`}>
                                                {errors[first]}
                                                {systemError &&
                                                    !errors[first] &&
                                                    `${validationMessage
                                                        ? validationMessage
                                                        : errorMessages.E_SYSTEM_01
                                                    }`}
                                            </ErrorMessage>
                                        ) : (
                                            <div className="h-8 mt-8"></div>
                                        )}

                                        <div className="flex w-full relative space-x-[42px] min-w-full justify-center event_slot_modal_btn">
                                            <Button
                                                title="キャンセル"
                                                className="bg-blue-100 max-w-2xl"
                                                hoverColorType="hover:bg-blue-300"
                                                type="button"
                                                onClick={handleCancel}
                                            />
                                            {role.r6 == 1 ? <Button title="保存" type="submit" /> : null}
                                            <DownLoadButtonCSVSlotInformation onExporting={exportToExcel} />
                                        </div>
                                    </Form>
                                );
                            }}
                        </Formik>

                        {/*<DataGrid dataSource={data} ref={grid}>
                            <Column dataField="name" caption="Name" />
                            <Column dataField="age" caption="Age" />
                        </DataGrid>
                        <button onClick={exportToExcel}>Export to Excel</button>*/}
                    </Page1440Body>
                </WhiteModalWrapper>
            )}
        </>
    );
};

export default EventSlotModal;

export const DownLoadButtonCSVSlotInformation = ({ onExporting }) => {
    return (
        <>
            <div className="h-8 absolute pr-8 right-0">
                <button
                    type="button"
                    className={`flex items-center pl-2 tracking-normal text-blue-100 hover:text-blue-50`}
                    onClick={onExporting}
                >
                    <div className="leading-4">
                        <span className="font-semibold">スロット情報CSVダウンロード</span>
                        <br />
                        <span className="text-[9px] font-medium">※表示されているデータがCSVになります</span>
                    </div>
                    <span className="float-right py-1 ml-2">
                        <CgFileDocument className="h-[1.5rem] w-[1.5rem]" />
                    </span>
                </button>
            </div>
        </>
    );
};
