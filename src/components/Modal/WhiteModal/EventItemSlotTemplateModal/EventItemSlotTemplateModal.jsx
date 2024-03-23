import DataGrid, { Column, ColumnFixing, Editing, Grouping, Paging, PatternRule } from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.light.css';
import React, { useEffect, useRef, useState } from 'react';
import Button from '../../../Button/Button';

import { Form, Formik } from 'formik';
import { BiGridHorizontal } from 'react-icons/bi';
import { BsLink } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { includes } from 'rrule/dist/esm/helpers';
import { errorMessages } from '../../../../lib/errorMessages';
import { generateId } from '../../../../lib/idGenerator';
import {
    baseURL,
    listEventItemSlotTemplateModal,
    listMethod,
    updateEventItemSlotTemplateModal,
    updateMethod
} from '../../../../restapi/queries';
import { instance } from '../../../../services/axios';
import ErrorMessage from '../../../ErrorMessage/ErrorMessage';
import Loading from '../../../Loading/Loader';
import Page1440Body from '../../../Page1440/Page1440Body.jsx';
import ModalTitle from '../../components/ModalTitle';
import WhiteModalWrapper from '../../components/WhiteModalWrapper';
import './EventItemSlotTemplateModal.css';

const EventItemSlotTemplateModal = ({ setCancelModal, eventInstituteId, instituteName, load = false }) => {
    const processing = useRef(false);
    const pathName = window.location.pathname;
    const routeName = pathName.split('/').pop();
    const { info } = useSelector((state) => state.auth);
    const [slotRowData, setSlotRowData] = useState([]);
    const [slotColumnData, setSlotColumnData] = useState({});
    const [modifiedDataField, setModifiedDataField] = useState({});
    const [isSessionStorageChanged, setIsSessionStorageChanged] = useState(null);
    const [dataGridWidth, setDataGridWidth] = useState(undefined);
    const sessionStorageKey = `${routeName}_${eventInstituteId}_timestamp_eventItemSlotTemplateModal`;
    const [loading, setLoading] = useState(false);
    const [systemError, setSystemError] = useState(false);
    const [initialValues, setInitialValues] = useState({});
    const [errorShow, setErrorShow] = useState(false);
    const [targetDataField, setTargetDataField] = useState('');
    const [focusedRowIndex, setFocusedRowIndex] = useState('');
    const grid = useRef();

    useEffect(() => {
        getListData();
    }, []);

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
                // count child column
                if (response.data.records?.columnsData.slots) {
                    let childCount = 0;
                    response.data.records?.columnsData.slots.map((item) => {
                        childCount += item.child.length;
                    });
                    const gridWidth = childCount * 92 + 8;
                    if (gridWidth < 1440) {
                        setDataGridWidth(gridWidth);
                    }
                }

                setSlotColumnData(response.data.records?.columnsData);
                setSlotRowData(response.data.records?.rowsData);
                sessionStorage.setItem(sessionStorageKey, JSON.stringify(response.data?.records));

                setLoading(false);
            } else {
                setLoading(false);
            }
        } catch (error) {
            setSystemError(true);
            setLoading(false);
        }
    };

    useEffect(() => {
        const getSSData = window.sessionStorage.getItem(sessionStorageKey),
            parseSSdata = JSON.parse(getSSData);

        if (getSSData !== null) {
            setSlotColumnData(parseSSdata.columnsData);
            setSlotRowData(parseSSdata.rowsData);
        }
    }, [isSessionStorageChanged]);

    //This is a custom component to customize the column header
    const ColumnHeader = (e, columnData) => {
        const handleClick = () => {
            setTargetDataField('');
            setFocusedRowIndex('');
            const parentId = columnData.parentId;
            const columnId = columnData.id;

            // Getting data from sessionStorage
            const ssData = JSON.parse(window.sessionStorage.getItem(sessionStorageKey));
            let ssColumnsData = ssData.columnsData;
            let ssRowsData = ssData.rowsData;

            // chain off
            if (columnData.chained) {
                //Looping throw the column array
                ssColumnsData.slots.forEach((slot, i) => {
                    if (slot.id === parentId) {
                        if (slot['child'].length > 1) {
                            //if more than two column exist in a group column we will unlink
                            const targetIndex = slot['child'].findIndex((child) => child.id === columnId);

                            const modifiedElement = slot['child'].splice(targetIndex + 1);

                            let targetElement = slot['child'].find((child) => child.id === columnId);
                            targetElement.chained = false;

                            const parentId = generateId(6); //generating unique id for parent

                            let child = [];
                            modifiedElement.forEach((item) => {
                                const childId = generateId(6); //generating unique id for children
                                const itemId = item?.gChild[0]?.dataField.split('_');
                                //forming a new column from the remove child as it will need to be added after the previous index
                                const childElement = {
                                    parentId: parentId,
                                    id: childId, //unique
                                    caption: item.caption,
                                    itemId: Number(itemId[0]),
                                    format: 'string',
                                    cssClass: true,
                                    chained: true,
                                    displayChain: true,
                                    allowReordering: false,
                                    isLastElement: false,
                                    gChild: [
                                        {
                                            parentId: childId,
                                            dataField: item?.gChild[0]?.dataField,
                                            caption: item?.gChild[0]?.caption,
                                            width: 92,
                                            allowEditing: false,
                                            allowSorting: false,
                                            allowReordering: false,
                                        },
                                    ],
                                };
                                child.push(childElement);
                            });

                            child.map((item, i, row) => {
                                // Child without last element
                                if (i + 1 === row.length) {
                                    item.chained = false;
                                }
                            });

                            const newColumn = {
                                id: parentId,
                                caption: '',
                                allowReordering: true,
                                child,
                            };

                            ssColumnsData.slots.splice(i + 1, 0, newColumn);
                        }
                    }
                });
            }
            // chain on
            else {
                let parentNextIndex;
                // chain on header column
                ssColumnsData.slots.forEach((slot, i) => {
                    if (slot.id === parentId) {
                        let parentColumn = ssColumnsData.slots[i];
                        parentNextIndex = i + 1;

                        let nextParentColumn = ssColumnsData.slots[i + 1];
                        // Get the next parent column child 1 or more
                        const nextParentColumnChild = nextParentColumn['child'];
                        // Push the next parent column child into parent column
                        parentColumn['child'].push(...nextParentColumnChild);

                        // Set parent column child property parent id & chain
                        parentColumn['child'].map((child, i, row) => {
                            child.parentId = parentId;
                            // Child without last element
                            if (i + 1 !== row.length) {
                                child.chained = true;
                            }
                        });

                        // Get chain parent column - child > grand child dataField
                        const targetColumnDataField = parentColumn['child'].map((child) => {
                            return child.gChild[0].dataField;
                        });
                        // Get target rows columns value
                        let dataFiledValues = [];
                        ssRowsData.forEach((row) => {
                            let dataFieldArr = [];
                            targetColumnDataField.forEach((dataField, i) => {
                                dataFieldArr[i] = row[dataField];
                            });
                            dataFiledValues.push(dataFieldArr);
                        });

                        let largeDataFieldValues = [];
                        dataFiledValues.forEach((columnValueArr) => {
                            largeDataFieldValues.push(columnValueArr.sort((a, b) => a - b).reverse()[0]);
                        });

                        let affectedDataField = modifiedDataField;
                        ssRowsData.map((row, i) => {
                            targetColumnDataField.forEach((dataField) => {
                                if (row[dataField] != largeDataFieldValues[i]) {
                                    affectedDataField[i + ',' + dataField] = largeDataFieldValues[i];
                                }
                                return (row[dataField] = largeDataFieldValues[i]);
                            });
                        });
                        setModifiedDataField(affectedDataField);
                    }
                });
                ssColumnsData.slots.splice(parentNextIndex, 1);
            }

            let records = rearrangeSerial(ssColumnsData, ssRowsData);

            window.sessionStorage.setItem(sessionStorageKey, JSON.stringify(records));

            setSlotColumnData(records['columnsData']);
            setSlotRowData(records['rowsData']);

            //setIsSessionStorageChanged((prev) => !prev);
            if (Object.keys(modifiedDataField).length > 0) {
                const firstModifiedDataFieldKey = Object.keys(modifiedDataField).sort()[0].split(',');
                setTimeout(
                    () =>
                        grid.current.instance.editCell(
                            Number(firstModifiedDataFieldKey[0]),
                            firstModifiedDataFieldKey[1]
                        ),
                    500
                );
            }
        };

        return (
            <>
                <div>{e.data.column.caption}</div>
                <div
                    className={`absolute ml-[47px] mt-[-45px]  cursor-pointer overflow-visible  ${columnData.chained ? 'opacity-100' : 'opacity-0'
                        }  hover:opacity-100 transition-all duration-300`}
                >
                    <BsLink onClick={handleClick} color={columnData.chained ? 'black' : 'gray'} size={30} />
                </div>
            </>
        );
    };

    //reorder the columns
    const handleReorder = (e) => {
        let getSessionStorage = JSON.parse(window.sessionStorage.getItem(sessionStorageKey));

        if (e.name === 'editing') {
            setErrorShow(false);
        }

        if (e.fullName === 'editing.changes') {
            if (focusedRowIndex === '' || targetDataField === '') {
                return;
            }
            let affectedDataField = modifiedDataField;

            const dataFieldId = targetDataField ? String(targetDataField.split('_')[0]) : '';

            let targetSlotColumnArr = [];
            getSessionStorage.columnsData.slots.forEach((slot) => {
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
            let targetSlotRow = getSessionStorage.rowsData[focusedRowIndex];
            let targetRowValue;
            e.value.forEach((item) => {
                let targetSlotRowFind =
                    item.key.ID === targetSlotRow.ID && includes(Object.keys(item.data), targetDataField);
                if (targetSlotRowFind) {
                    targetRowValue = item.data[targetDataField];
                }
            });

            if (typeof targetRowValue !== 'undefined') {
                targetSlotColumnArr.forEach((dataField) => {
                    if (targetSlotRow[dataField] !== targetRowValue) {
                        affectedDataField[focusedRowIndex + ',' + dataField] = targetRowValue ? targetRowValue : 0;
                    }
                    targetSlotRow[dataField] = targetRowValue ? targetRowValue : 0;
                });

                setModifiedDataField(affectedDataField);

                let records = {};
                records['columnsData'] = getSessionStorage.columnsData;
                records['rowsData'] = getSessionStorage.rowsData;
                window.sessionStorage.setItem(sessionStorageKey, JSON.stringify(records));
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
        if (e.name === 'columns') {
            const getVisibleColumnsHeader = e.component.getVisibleColumns(0);

            const allParentColumns = e.component.getVisibleColumns(0); //parent
            const allChildColumns = e.component.getVisibleColumns(1); //child
            const allGChildColumns = e.component.getVisibleColumns(2); //gChild
            const parentArray = [];

            allParentColumns.forEach((parent) => {
                const childArray = [];
                allChildColumns.forEach((child) => {
                    const gChildArray = [];
                    allGChildColumns.forEach((gChild) => {
                        if (parent.parentId === child.childsParentId) {
                            if (child.childId === gChild.gChildsParentId) {
                                gChildArray.push({
                                    parentId: gChild.gChildsParentId,
                                    dataField: gChild.dataField,
                                    caption: gChild.caption,
                                    width: gChild.width,
                                    allowEditing: gChild.allowEditing,
                                    allowSorting: gChild.allowSorting,
                                    allowReordering: gChild.allowReordering,
                                });
                            }
                        }
                    });
                    if (parent.parentId === child.childsParentId) {
                        childArray.push({
                            parentId: child.childsParentId,
                            id: child.childId, //unique
                            itemId: child.itemId,
                            caption: child.caption,
                            format: child.format,
                            cssClass: child.cssClass,
                            chained: child.chained,
                            displayChain: child.displayChain,
                            chainedWith: child.chainedWith, //id
                            prev: child.prev,
                            next: child.next,
                            allowReordering: child.allowReordering,
                            fixed: child.fixed,
                            dataField: child.dataField ? child.dataField : null,
                            width: child.width,
                            gChild: gChildArray,
                        });
                    }
                });
                const data = {
                    //parent
                    id: parent.parentId,
                    caption: parent.caption,
                    fixed: parent.fixed,
                    allowReordering: parent.allowReordering,
                    child: childArray,
                };
                parentArray.push(data);
                // setSlotColumnData(parentArray)
            });

            const reOrderedColumns = {
                headers: slotColumnData.headers, //this one will not be changed
                slots: parentArray, //this is the reordered slots
            };

            let records = {};
            records['columnsData'] = reOrderedColumns;
            records['rowsData'] = getSessionStorage.rowsData;
            window.sessionStorage.setItem(sessionStorageKey, JSON.stringify(records));
        }
    };

    function updateCell(rowIndex, dataField, value) {
        grid.current.instance.cellValue(rowIndex, dataField, value);
    }

    const handleCancel = () => {
        setCancelModal(false);
    };

    // handleUpdate row values
    const handleUpdate = async (e) => {
        if (processing.current) return;
        processing.current = true;
        const submitData = JSON.parse(sessionStorage.getItem(sessionStorageKey));
        try {
            setLoading(true);
            const ENDPOINT = `${baseURL}${updateEventItemSlotTemplateModal}${eventInstituteId}`;
            const config = {
                method: updateMethod,
                url: ENDPOINT,
                data: {
                    eventInstituteId: eventInstituteId,
                    eventInstituteItemStyle: submitData,
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
            setSystemError(true);
            setErrorShow(true);
            setLoading(false);
        } finally {
            processing.current = false;
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

    const handleValidate = () => {
        let getSessionStorage = JSON.parse(window.sessionStorage.getItem(sessionStorageKey));

        const errors = {};
        // Get chain parent column - child > grand child dataField
        const targetColumnDataField = [];
        getSessionStorage.columnsData.slots.map((slot, i) => {
            if (i > 0) {
                slot.child.forEach((child) => {
                    targetColumnDataField.push(child.gChild[0]?.dataField);
                });
            }
        });

        // Get target rows columns value
        let dataFieldValue = [];
        getSessionStorage.rowsData.forEach((row) => {
            let dataFieldArr = [];
            targetColumnDataField.forEach((dataField, i) => {
                dataFieldArr[i] = row[dataField];
            });
            dataFieldValue.push(dataFieldArr);
        });

        const isNumber = (str) => (/^[\+\-]?\d+(\.\d+)?$/.test(str));

        let validation_error = false;
        dataFieldValue.forEach((rowArr) => {
            let firstIndexValue = rowArr[0];
            let firstIndexLower = rowArr.findIndex(function (number) {
                // if value not integer then showing error
                if (!isNumber(number)) {
                    return number;
                }
                // if value negative or gather then 999 showing error
                if (number < 0 || number > 999) {
                    return number;
                }
                return number < 999 && number > firstIndexValue;
            });

            if (firstIndexLower !== -1) {
                validation_error = true;
            }
        });
        if (validation_error) {
            errors.number = errorMessages.W_NUMERIC_01;
            setErrorShow(true);
        }
        return errors;
    };

    const dragIconDisplay = () => {
        return (
            <div className="flex flex-col">
                <span className="text-center customDragIcon">
                    <BiGridHorizontal />
                </span>
            </div>
        );
    };

    const rearrangeSerial = (columnsData, rowsData) => {
        // Rearrange id serial
        let childId = 1;
        let multiChild = 0;
        columnsData.slots.map((slot, index) => {
            slot.id = index + 1;
            multiChild = slot.child.length > 1;
            slot.child.map((child, i) => {
                child.parentId = index + 1;
                child.id = childId;

                multiChild && i + 1 < slot.child.length ? (child.chained = true) : (child.chained = false);

                child.gChild.map((gChild) => {
                    gChild.parentId = childId;
                    gChild.dataField = child.itemId + '_' + child.id;
                });

                childId++;
            });
        });

        // Rearrange item id key serial
        rowsData.map((row, rowIndex) => {
            for (const [key, value] of Object.entries(row)) {
                const arr = ['ID', 'time', 'second_2', 'instituteLimit'];
                if (!arr.includes(key)) {
                    let rowItemId = key.split('_');

                    columnsData.slots.forEach((slot) => {
                        slot.child.forEach((child) => {
                            if (child.itemId === Number(rowItemId[0])) {
                                if (child.itemId + '_' + child.id !== key) {
                                    row[child.itemId + '_' + child.id] = row[key];
                                    delete row[key];

                                    for (let fieldKey of Object.keys(modifiedDataField)) {
                                        let modifiedFieldKey = fieldKey.split(',');
                                        let modifiedFieldItemId = modifiedFieldKey[1].split('_');
                                        if (child.itemId == modifiedFieldItemId[0]) {
                                            let keyValue = modifiedDataField[fieldKey];
                                            delete modifiedDataField[fieldKey];
                                            let newModifiedKey =
                                                modifiedFieldKey[0] + ',' + child.itemId + '_' + child.id;
                                            modifiedDataField[newModifiedKey] = keyValue;
                                        }
                                    }
                                }
                            }
                        });
                    });
                }
            }
        });

        let records = {};
        records['columnsData'] = columnsData;
        records['rowsData'] = rowsData;
        return records;
    };

    // With rowIndex, the value changes after scrolling. by haga to Hossain
    const onEditorPreparing = (cellData) => {
        setTargetDataField(cellData.dataField);
        setFocusedRowIndex(cellData.row.dataIndex);
    };

    return (
        <>

            {loading && <Loading />}
            {load && loading ? (
                <Loading />
            ) : (
                <WhiteModalWrapper width="border-none text-black" className="items-start slot-template-modal-wrapper">
                    {/*this is the modal title section*/}
                    <ModalTitle
                        className="text-blue-100 bold text-xl"
                        title={`スロットテンプレート設定：${instituteName}`}
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
                                            allowColumnReordering={true}
                                            showBorders={true}
                                            rowAlternationEnabled={true}
                                            onOptionChanged={handleReorder}
                                            onToolbarPreparing={onToolbarPreparing}
                                            className="slotTableCustomClass"
                                            onEditorPreparing={onEditorPreparing}
                                        >
                                            <Grouping contextMenuEnabled={true} expandMode="rowClick" />
                                            <ColumnFixing enabled={true} />
                                            <Paging enabled={false} />
                                            <Editing mode="batch" allowUpdating={true} />
                                            {slotColumnData?.slots?.map((parent, parentIndex) => (
                                                <Column
                                                    key={parent.id}
                                                    parentId={parent.id}
                                                    allowReordering={parentIndex > 1}
                                                    fixed={parent.fixed}
                                                    headerCellComponent={parentIndex > 1 ? dragIconDisplay : ''}
                                                    cssClass={`parentHeader ${parent.child.length > 1 ? 'bg-green-100' : ''
                                                        }`}
                                                >
                                                    {parent?.child.map((child) => (
                                                        <Column
                                                            key={child.id + child.caption}
                                                            caption={child.caption} //dynamic
                                                            fixed={child.fixed}
                                                            format={child.format}
                                                            allowReordering={false}
                                                            cssClass={`${parentIndex > 0 ? 'childHeader' : 'childHeaderOther'
                                                                }`}
                                                            chained={child.chained}
                                                            displayChain={child.displayChain}
                                                            chainedWith={child.chainedWith}
                                                            dataField={child.dataField ? child.dataField : undefined}
                                                            width={child.width ? child.width : undefined}
                                                            allowEditing={parentIndex > 0}
                                                            allowSorting={child.allowSorting}
                                                            sortIndex={child.sortIndex}
                                                            prev={child.prev}
                                                            next={child.next}
                                                            childId={child.id}
                                                            childsParentId={child.parentId}
                                                            itemId={child.itemId}
                                                        >
                                                            {child?.gChild
                                                                ? child['gChild'].map((gChild) => (
                                                                    <Column //0
                                                                        key={gChild.id + gChild.caption}
                                                                        gChildsParentId={gChild.parentId}
                                                                        dataField={gChild.dataField} //dynamic
                                                                        caption={gChild.caption}
                                                                        width={gChild.width}
                                                                        allowEditing={true}
                                                                        allowSorting={gChild.allowSorting}
                                                                        allowReordering={false}
                                                                        cssClass="grandChildHeaderClass"
                                                                        headerCellComponent={
                                                                            child.displayChain && !child.isLastElement
                                                                                ? (e) => ColumnHeader(e, child)
                                                                                : ''
                                                                        }
                                                                    >
                                                                        <PatternRule pattern="^\d+$" />
                                                                    </Column>
                                                                ))
                                                                : null}
                                                        </Column>
                                                    ))}
                                                </Column>
                                            ))}
                                        </DataGrid>

                                        {errorShow ? (
                                            <ErrorMessage className={`${errors[first]} ? "visible" : "invisible"`}>
                                                {errors[first]}
                                                {systemError && !errors[first] && `${errorMessages.E_SYSTEM_01}`}
                                            </ErrorMessage>
                                        ) : (
                                            <div className="h-8 mt-8" style={{ minWidth: '250px' }}></div>
                                        )}

                                        {/* ロール  button component */}
                                        <div className="flex w-full space-x-[42px] min-w-full">
                                            <Button
                                                title="キャンセル"
                                                className="bg-blue-100"
                                                hoverColorType="hover:bg-blue-300"
                                                type="button"
                                                onClick={handleCancel}
                                            />
                                            <Button title="保存" type="submit" />
                                        </div>
                                    </Form>
                                );
                            }}
                        </Formik>
                    </Page1440Body>
                </WhiteModalWrapper>
            )}
        </>
    );
};

export default EventItemSlotTemplateModal;
