// import { getUnixTime } from "date-fns";
import DataGrid, {
    Column,
    ColumnChooser,
    ColumnFixing,
    Editing,
    Grouping,
    Paging,
    Scrolling,
} from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.light.css';
import React, { useEffect, useState } from 'react';
import { BsLink } from 'react-icons/bs';
import Page1440Body from '../../components/Page1440/Page1440Body.jsx';
import { generateId } from '../../lib/idGenerator.js';
import { parseLocalStorageJSON, setToLocalStorage } from '../../lib/localStrorage.js';
import { columnsData, rowsData } from './data.js';
import './SlotTable.css';
import Button from '../../components/Button/Button';
const initValueIconsStatus = parseLocalStorageJSON('iconsStatus');
const SlotTable = () => {
    const [slotRowData, setSlotRowData] = useState([]);
    const [slotColumnData, setSlotColumnData] = useState({});
    const [iconsStatus] = useState(initValueIconsStatus ? initValueIconsStatus : {});
    const [isLocalStorageChanged, setIsLocalStorageChanged] = useState(null);
    useEffect(() => {
        setToLocalStorage('iconsStatus', iconsStatus);
    }, [iconsStatus]);

    useEffect(() => {
        setSlotRowData(rowsData);
        const slotColumnDataFromLS = parseLocalStorageJSON('columnsData');
        if (slotColumnDataFromLS) {
            setSlotColumnData(slotColumnDataFromLS);
        } else {
            setToLocalStorage('columnsData', columnsData);
            const slotColumnDataFromLS = parseLocalStorageJSON('columnsData');
            setSlotColumnData(slotColumnDataFromLS);
        }
    }, [isLocalStorageChanged]);

    const handleAddMenuItems = (e) => {
        if (e.target === 'header') {
            e.items = [];
        }
        if (e.column.caption === '上限') {
            e.items = [];
            e.items.push(
                {
                    text: 'Item 1',
                    onItemClick: () => {
                        window.alert('Item 1 clicked'); 
                    },
                },
                {
                    text: 'Item 2',
                    onItemClick: () => {
                        window.alert('Item 2 clicked'); 
                    },
                },
                {
                    text: 'Item 3',
                    onItemClick: () => {
                        window.alert('Item 3 clicked'); 
                    },
                },
                {
                    text: 'Item 4',
                    onItemClick: () => {
                        window.alert('Item 4 clicked'); 
                    },
                }
            );
        }
    };

    //This is a custom component to customize the column header
    const ColumnHeader = (e, columnData) => {
        const handleClick = () => {
            const parentId = columnData.parentId;
            const columnId = columnData.id; 
            const lsData = parseLocalStorageJSON('columnsData'); //local storage data
            //iterating slots data to match columns parent id and column id to locate the index of column to be unlinked
            lsData.slots.forEach((slot, i) => {
                if (slot.id === parentId) {
                    const parentIndex = i; 
                    let targetIndex;

                    //unlink operation
                    if (slot['child'].length > 1) {
                        slot['child'].forEach((child, i) => {
                            if (child.id === columnId && child.chained) {
                                targetIndex = i + 1;
                                const removedChild = slot['child'].splice(targetIndex, 1);
                                if (i === slot['child'].length - 1) {
                                    //if slot's position before the last element, it will not be chained
                                    child.chained = false; //as it will not be chained with its next column
                                }
                                const parentId = generateId(6); //generating unique id for parent
                                const childId = generateId(6); //generating unique id for children
                                const newColumn = {
                                    id: parentId,
                                    caption: '',
                                    allowReordering: true,
                                    child: [
                                        {
                                            parentId: parentId,
                                            id: childId, //unique
                                            caption: removedChild[0].caption,
                                            format: 'string',
                                            cssClass: true,
                                            chained: false,
                                            displayChain: true,
                                            allowReordering: false,
                                            isLastElement: false,
                                            gChild: [
                                                {
                                                    parentId: childId,
                                                    dataField: removedChild[0]?.gChild[0]?.dataField,
                                                    caption: removedChild[0]?.gChild[0]?.caption,
                                                    width: 64,
                                                    allowEditing: false,
                                                    allowSorting: false,
                                                    allowReordering: false,
                                                },
                                                {
                                                    parentId: childId,
                                                    dataField: removedChild[0]?.gChild[1]?.dataField,
                                                    caption: removedChild[0]?.gChild[1]?.caption,
                                                    width: 64,
                                                    allowEditing: true,
                                                    allowSorting: false,
                                                    allowReordering: false,
                                                },
                                            ],
                                        },
                                    ],
                                };
                                lsData.slots.splice(parentIndex + 1, 0, newColumn);
                            }
                        });
                    }
                }
            });
            setToLocalStorage('columnsData', lsData);
            setIsLocalStorageChanged((prev) => !prev);
        };

        return (
            <>
                <div>{e.data.column.caption}</div>
                <div
                    className={`absolute ml-[106px]  cursor-pointer overflow-visible  ${
                        columnData.chained ? 'opacity-100' : 'opacity-0'
                    }  hover:opacity-100 transition-all duration-300`}
                >
                    <BsLink onClick={handleClick} color={columnData.chained ? 'black' : 'gray'} size={30} />
                </div>
            </>
        );
    };

    //reorder the columns
    const handleReorder = (e) => {
        if (e.name === 'columns') {
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
                    allowReordering: parent.allowReordering,
                    child: childArray,
                };
                parentArray.push(data);
            });
            const reOrderedColumns = {
                headers: slotColumnData.headers, //this one will not be changed
                slots: parentArray, //this is the reordered slots
            };
            setToLocalStorage('columnsData', reOrderedColumns);
        }
    };
    return (
        <Page1440Body className="h-[calc(100vh-71px)]">
            <DataGrid
                dataSource={slotRowData}
                height={600}
                columnAutoWidth={true}
                allowColumnReordering={true}
                showBorders={true}
                rowAlternationEnabled={true}
                onContextMenuPreparing={handleAddMenuItems}
                onOptionChanged={handleReorder}
            >
                <Grouping contextMenuEnabled={true} expandMode="rowClick" />
                <ColumnFixing enabled={true} />
                <Paging enabled={false} />
                <Editing mode="cell" allowUpdating={true} allowAdding={true} />
                <ColumnChooser enabled={true} />
                <Scrolling mode="virtual" />
                {slotColumnData?.slots?.map((parent) => (
                    <Column
                        key={parent.id}
                        parentId={parent.id}
                        allowReordering={parent.allowReordering}
                        caption={parent.caption}
                        fixed={parent.fixed}
                    >
                        {parent?.child.map((child) => (
                            <Column
                                key={child.id + child.caption}
                                caption={child.caption} //dynamic
                                fixed={child.fixed}
                                format={child.format}
                                allowReordering={child.allowReordering}
                                cssClass={`${child.cssClass ? 'childHeader' : ''}`}
                                headerCellComponent={
                                    child.displayChain && !child.isLastElement ? (e) => ColumnHeader(e, child) : ''
                                }
                                chained={child.chained}
                                displayChain={child.displayChain}
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
                                    ? child['gChild'].map((gChild, index) => (
                                          <Column //0
                                              key={gChild.id + gChild.caption}
                                              gChildsParentId={gChild.parentId}
                                              dataField={gChild.dataField} //dynamic
                                              caption={gChild.caption}
                                              width={gChild.width}
                                              allowEditing={gChild.allowEditing}
                                              allowSorting={gChild.allowSorting}
                                              allowReordering={child.allowReordering}
                                          />
                                      ))
                                    : null}
                            </Column>
                        ))}
                    </Column>
                ))}
            </DataGrid>

            <div className=" flex space-x-[42px] mt-8">
                <Button
                    title="キャンセル"
                    className="bg-blue-100"
                    hoverColorType="hover:bg-blue-300"
                    type="button"
                    onClick={''}
                />
                <Button title="保存" type="submit" onClick={''} />
            </div>
        </Page1440Body>
    );
};
export default SlotTable;
