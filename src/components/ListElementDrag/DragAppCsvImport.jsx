import ScrollView from 'devextreme-react/scroll-view';
import Sortable from 'devextreme-react/sortable';
import React, { useEffect, useState } from 'react';
import FieldModalCSVImport from '../../pages/CsvList/TemplateSetting/FieldModalCSVImport.jsx';
import ButtonTypeF from './ButtonType/ButtonTypeF.jsx';
import Item from './Item.jsx';
import { v4 as uuid } from 'uuid';
import { tasks } from './data.js';
import './style.css';

export default function DragAppCsvImport({
    dragList,
    filterRecords,
    buttonType,
    buttonType2,
    controlDragDrop,
    addLimit,
    title,
    buttonTitle,
    fieldInfoList,
    load,
    setLoading,
    fTypeId = null,
    setLoad,
    openEditPencilModal = 'csvExport',
    stateInfoCsvImport: { setOpenEditImportModal, setItemDataOfCsvImportField },
}) {
    const pathname = window.location.pathname;
    const routeName = pathname.split('/').pop();
    const [modalOpen, setModalOpen] = useState(false);
    const [itemDataOfField, setItemDataOfField] = useState({});
    let dragListFromSessionStorage = JSON.parse(sessionStorage.getItem(`${routeName}_drag`));

    //TODO: Remove if not used
    const sessionStorageKey = `${routeName}_drag`;

    // non sql obj in array
    const [state, setState] = useState({
        items: dragListFromSessionStorage ? dragListFromSessionStorage : tasks,
        sortedItems: dragListFromSessionStorage ?? [],
        limit: addLimit ? addLimit : 60,
        optionValue: '',
        button: buttonType ? buttonType : { buttonName: `${buttonTitle}`, type: 'expandable' },
        stateControlDragDrop: controlDragDrop
            ? controlDragDrop
            : {
                grid: { name: 'grid grid-cols-12 gap-1' },
                dragable: { show: true, space: 'col-span-1', header: '移動' }, //col-span-2
                pen: { show: true, space: 'col-span-1', header: '編集' },
                checkbox1: { show: true, space: 'col-span-3', header: '必須 （管理画面からの操作時のみ）' }, //before col-span-1
                info: { show: true, space: 'col-span-2', header: 'info' },
                info2: { show: true, space: 'col-span-2', header: 'info2' },
                task: { show: true, space: 'col-span-1', header: '' },
                checkbox2: { show: true, space: 'col-span-1', header: '初期値 ' },
                inputBox: { show: true, space: 'col-span-2', header: 'タスク' },
                inputBox2: { show: true, space: 'col-span-3', header: '' },
                inputBox3: { show: true, space: 'col-span-3', header: '' },
                trash: { show: true, space: 'col-span-1', header: '削除 ' },
            },

        dropFeedbackMode: 'push',
        itemOrientation: 'vertical',
        dragDirection: 'vertical',
        scrollSpeed: 30,
        scrollSensitivity: 60,
        handle: '.handle',
        dragComponent: null,
        cursorOffset: null,
    });

    useEffect(() => {
        setLoading && setLoading(true); // 12/1/23 Added by linkon
        let dragListFromSessionStorageData = JSON.parse(sessionStorage.getItem(`${routeName}_drag`));
        dragListFromSessionStorageData = dragListFromSessionStorageData ?? [];
        const unSortedArray = [...dragListFromSessionStorageData];
        const sortedArrayByPostion = unSortedArray.sort((a, b) => {
            return a.currentPos - b.currentPos;
        });
        console.log('sortedArrayByPostion', sortedArrayByPostion);
        setState((prevState) => ({
            ...prevState,
            button: buttonType,
            sortedItems: [...sortedArrayByPostion],
        }));
        setLoading && setLoading(false);
    }, [buttonType, dragList]);

    const onDragStart = (e) => {
        e.itemData = state.sortedItems[e.fromIndex];
    };

    // drag row and organize
    const onReorder = (e) => {
        let { sortedItems } = state;
        console.log('e.fromIndex', e.fromIndex);
        console.log('e.toIndex', e.toIndex);
        sortedItems = [...sortedItems.slice(0, e.fromIndex), ...sortedItems.slice(e.fromIndex + 1)];
        sortedItems = [...sortedItems.slice(0, e.toIndex), e.itemData, ...sortedItems.slice(e.toIndex)];
        console.log('sortedItems>>>>>>>>>>>', sortedItems);
        setState((prevState) => ({
            ...prevState,
            sortedItems: sortedItems,
        }));
        let dragListFromSessionStorageData = JSON.parse(sessionStorage.getItem(`${routeName}_drag`));
        dragListFromSessionStorageData = dragListFromSessionStorageData ?? [];
        let items = [...sortedItems];
        // Changes in main array which will go to the backend
        for (let i = 0; i < items.length; i++) {
            const mainArray = items[i];
            console.log('mainArray', mainArray);
            const indexChange = sortedItems.indexOf(mainArray);
            console.log('indexChange', indexChange);

            mainArray.currentPos = indexChange;
            console.log('mainArray.currentPos', mainArray.currentPos);

        }
        // // send update position array of data in backend
        if (fTypeId) {
            console.log('itemssss>>......fTypeId_' + fTypeId, items);
            sessionStorageInnerDragDataSync(items);
        } else {
            console.log('itemssss>>......', items);
            sessionStorage.setItem(`${routeName}_drag`, JSON.stringify(items));
        }

        if (state.button?.type === 'F') {
            if (fTypeId) {
                //sessionStorage.setItem(`${routeName}_${fTypeId}_drag_F_Type`, JSON.stringify(items))
            } else {
                sessionStorage.setItem(`${routeName}_drag_F_Type`, JSON.stringify(items));
            }
        } else if (state?.button?.type === 'B') {
            sessionStorage.setItem(`${routeName}_drag_B_Type`, JSON.stringify(items));
        }
    };

    // input 2 change data by onBlur handle
    const inputBox3OnBlur = (item, data) => {
        const value = data.target.value;
        const task_id = item.Task_ID;
        let items = [...state.sortedItems];

        if (fTypeId) {
            const sItem = JSON.parse(sessionStorage.getItem(`${routeName}_drag`));
            const targetSItem = sItem.find((item) => item.fTypeId === fTypeId);
            let innerDrag = targetSItem.innerDrag;
            if (innerDrag) {
                innerDrag.map((item) => {
                    if (item.Task_ID === task_id) {
                        item.inputBox3 = {};
                        item.inputBox3.value = value;
                    }
                });
                sessionStorageInnerDragDataSync(innerDrag);
            }
        } else {
            items.map((item) => {
                if (item.Task_ID === task_id) {
                    item.inputBox3.value = value;
                }
            });

            setState((prevState) => ({ ...prevState, sortedItems: items }));

            //  send data to the local and database
            const lItem = JSON.parse(sessionStorage.getItem(`${routeName}_drag`));
            if (lItem) {
                lItem.map((item) => {
                    if (item.Task_ID === task_id) {
                        if (item.Task_ID === task_id) {
                            item.inputBox3.value = value;
                        }
                    }
                });
            }
            sessionStorage.setItem(`${routeName}_drag`, JSON.stringify(lItem));
        }
    };

    // add type FFFFFFF From
    const addFromFType = (e) => {
        const selectedItem = e.itemData;
        const selectedItemId = e.itemData.id;
        const selectedItemValue = e.itemData.text;
        const selectedItemType = e.itemData?.type;

        const stateButton = state.button;
        let stateButtonData = [...state.button.buttonData];

        stateButtonData.forEach((item, index, arr) => {
            if (item.id == selectedItemId) {
                item.disabled = true;
            }
        });

        const newButtonData = { ...stateButton, buttonData: stateButtonData };

        const { sortedItems, items } = state;
        const sItems = [...sortedItems];
        const addInItems = [...items];

        let currentPosition = 0;
        const arrayLen = sortedItems.length;

        if (arrayLen === 0) {
            currentPosition = currentPosition;
        } else {
            const lastSortedTask = sortedItems[arrayLen - 1];
            const lastPositionOfSortedArray = lastSortedTask.currentPos + 1;
            currentPosition = lastPositionOfSortedArray;
        }
        let selectedFieldTop = fieldInfoList && fieldInfoList.find((item) => item.fieldId == selectedItemId);
        const fromObj = {
            Task_ID: uuid(),
            Task_Subject: '' + Math.floor(Math.random() * (1000 - 100 + 1) + 100),
            inputBox2: { id: uuid(), value: selectedItemValue, type: selectedItemType },
            inputBox: { id: uuid(), value: selectedItemValue, type: selectedItemType },
            expandType: 'F',
            fTypeId: selectedItemId,
            fieldData: selectedFieldTop || '',
            info2: selectedItem.busStopAddress || '',
            number: Math.floor(Math.random() * (1000 - 100 + 1) + 100),
            currentPos: currentPosition,
            checkbox1: { checked: false, id: uuid(), type: 'checkbox' },
            checkbox2: { checked: false, id: uuid(), type: 'checkbox' },
        };

        if (sItems.length < state.limit) {
            sItems.push(fromObj);
            addInItems.push(fromObj);
        }
        setState((prevState) => ({
            ...prevState,
            items: addInItems,
            sortedItems: sItems,
            optionValue: selectedItemValue,
            button: newButtonData,
        }));
        if (fTypeId) {
            sessionStorageInnerDragDataSync(addInItems);
        } else {
            sessionStorage.setItem(`${routeName}_drag`, JSON.stringify(sItems));
            sessionStorage.setItem(`${routeName}_drag_F_Type`, JSON.stringify(sItems));
        }
    };

    const deleteFTypeArray = (data) => {
        if (data?.dragType != 'default') {
            const selectedItemId = data.fTypeId;
            const stateButton = state.button;
            let stateButtonData = [...state.button.buttonData];

            stateButtonData.forEach((item, index, arr) => {
                if (item.id == selectedItemId) {
                    item.disabled = false;
                }
            });

            const newButtonData = { ...stateButton, buttonData: stateButtonData };

            const task_id = data.Task_ID;
            const items = [...state.sortedItems];
            const filteredItems = items.filter((item) => item.Task_ID !== task_id);
            setState((prevState) => ({
                ...prevState,
                items: filteredItems,
                sortedItems: filteredItems,
                button: newButtonData,
                optionValue: '',
            }));

            if (fTypeId) {
                sessionStorageInnerDragDataSync(filteredItems);
            } else {
                sessionStorage.setItem(`${routeName}_drag`, JSON.stringify(filteredItems)); // Where Only 1 drag list there F type
                sessionStorage.setItem(`${routeName}_drag_F_Type`, JSON.stringify(filteredItems)); // where 2 drag list is there
            }
        }
    };

    function handleOnPressModalSaveButton(e, formData) {
        if (e) e.preventDefault();

        const currentSessionStorageData = JSON.parse(sessionStorage.getItem(`${routeName}_drag`));
        const tagBox1Key = `${routeName}_timestamp_tag_box1_${formData.fTypeId}`;

        const tagBoxValue = JSON.parse(sessionStorage.getItem(tagBox1Key));

        const existFieldFormat = currentSessionStorageData.map((item) => {
            if (item.Task_ID == formData.Task_ID) {
                if (formData.memo) item.memo = formData.memo;
                if (tagBoxValue) item.tagBoxValue = tagBoxValue;
                item.innerDrag = [];
                return item;
            }
            return item;
        });
        setState((prevState) => ({ ...prevState, items: existFieldFormat, sortedItems: existFieldFormat }));
        sessionStorage.setItem(`${routeName}_drag`, JSON.stringify(existFieldFormat));
        sessionStorage.setItem(`${routeName}_drag_F_Type`, JSON.stringify(existFieldFormat));

        setModalOpen(false);

        // session data delete
        sessionStorage.removeItem(tagBox1Key);
    }

    const openEditModal = (data) => {
        setModalOpen(true);
        setItemDataOfField(data);
    };
    const openCSVImportEditModal = (data) => {
        setModalOpen(true);
        setItemDataOfField(data);
    };

    function sessionStorageInnerDragDataSync(addInItems) {
        let currentSessionStorageData = JSON.parse(sessionStorage.getItem(sessionStorageKey));
        currentSessionStorageData.map((item) => {
            if (item.fTypeId == fTypeId) {
                item.innerDrag = addInItems;
            }
        });
        sessionStorage.setItem(sessionStorageKey, JSON.stringify(currentSessionStorageData));
    }

    return (
        <div id="">
            {title ? (
                <div className="text-blue-100 mb-8">
                    <label>{title}</label>
                </div>
            ) : (
                ''
            )}
            <div className="pl-10">
                <div className={`${state.stateControlDragDrop.grid.name} mb-1 text-blue-100`}>
                    {state.stateControlDragDrop.dragable.show && (
                        <div className={`${state.stateControlDragDrop.dragable.space}`}>
                            <p>{state.stateControlDragDrop.dragable.header}</p>
                        </div>
                    )}
                    {state.stateControlDragDrop.pen.show && (
                        <div className={`${state.stateControlDragDrop.pen.space} `}>
                            <p>{state.stateControlDragDrop.pen.header}</p>
                        </div>
                    )}
                    {state.stateControlDragDrop.checkbox1.show && (
                        <div className={`${state.stateControlDragDrop.checkbox1.space} !col-span-3`}>
                            <p>{state.stateControlDragDrop.checkbox1.header}</p>
                        </div>
                    )}
                    {state.stateControlDragDrop.info.show && (
                        <div className={`${state.stateControlDragDrop.info.space} `}>
                            <p>{state.stateControlDragDrop.info.header}</p>
                        </div>
                    )}
                    {state.stateControlDragDrop.inputBox.show && (
                        <div className={`${state.stateControlDragDrop.inputBox.space}`}>
                            <p>{state.stateControlDragDrop.inputBox.header}</p>
                        </div>
                    )}
                    {state.stateControlDragDrop.info2.show && (
                        <div className={`${state.stateControlDragDrop.info2.space}`}>
                            <p>{state.stateControlDragDrop.info2.header}</p>
                        </div>
                    )}
                    {state.stateControlDragDrop.inputBox2.show && (
                        <div className={`${state.stateControlDragDrop.inputBox2.space}`}>
                            <p>{state.stateControlDragDrop.inputBox2.header}</p>
                        </div>
                    )}
                    {state.stateControlDragDrop.inputBox3.show ? (
                        <div className={`${state.stateControlDragDrop.inputBox3.space}`}>
                            <p>{state.stateControlDragDrop.inputBox3.header}</p>
                        </div>
                    ) : (
                        <></>
                    )}

                    {state.stateControlDragDrop.checkbox2.show && (
                        <div className={`${state.stateControlDragDrop.checkbox2.space}  flex justify-center`}>
                            <p>{state.stateControlDragDrop.checkbox2.header}</p>
                        </div>
                    )}

                    {state.stateControlDragDrop.trash.show && (
                        <div className={`${state.stateControlDragDrop.trash.space} text-end items-center`}>
                            <p>{state.stateControlDragDrop.trash.header}</p>
                        </div>
                    )}
                </div>

                <div>
                    <ScrollView id="scroll" direction={state.itemOrientation} showScrollbar="always">
                        <Sortable
                            id="list"
                            dropFeedbackMode={state.dropFeedbackMode}
                            itemOrientation={state.itemOrientation}
                            dragDirection="vertical"
                            scrollSpeed={state.scrollSpeed}
                            scrollSensitivity={state.scrollSensitivity}
                            handle=".handle"
                            dragComponent={state.dragComponent}
                            cursorOffset={state.cursorOffset}
                            onDragStart={onDragStart}
                            onReorder={onReorder}
                        >
                            {state.sortedItems.map((item) => (
                                <Item
                                    key={item.Task_ID}
                                    text={item.Task_Subject}
                                    handle={state.handle}
                                    item={item} // drag item show
                                    deleteFTypeArray={deleteFTypeArray} // delete F type array
                                    openEditModal={
                                        openEditPencilModal === 'csvImport' ? openCSVImportEditModal : openEditModal
                                    } // delete F type array
                                    inputBox3OnBlur={inputBox3OnBlur} // Input box on blur data will save
                                    stateControlDragDrop={state.stateControlDragDrop} // Controlling which things should show to the ui
                                />
                            ))}
                        </Sortable>
                    </ScrollView>
                    <div className="text-center">
                        <br />
                        <div className="text-center">
                            {state.button.type === 'F' && (
                                <div>
                                    <ButtonTypeF
                                        buttonData={state?.button.buttonData}
                                        placeholder={state?.button?.placeholder} // Linkon 17-11-22 Placeholder changes button type F will change the placeholder dynamically
                                        list={state?.items}
                                        limit={addLimit}
                                        addFromFType={addFromFType}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {modalOpen && (
                <FieldModalCSVImport
                    filterRecords={filterRecords}
                    fieldRecords={buttonType2.buttonData}
                    blockData={itemDataOfField}
                    setModalOpen={setModalOpen}
                    handleOnPressSave={handleOnPressModalSaveButton}
                />
            )}
        </div>
    );
}
