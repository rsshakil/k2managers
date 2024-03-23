import React, { useEffect, useRef, useState } from 'react';
import ScrollView from 'devextreme-react/scroll-view';
import Sortable from 'devextreme-react/sortable';
import SelectBox from 'devextreme-react/select-box';
import { AiOutlinePlus } from 'react-icons/ai';
import FieldModal from '../../pages/CsvList/TemplateSetting/FieldModal.jsx';
import ButtonTypeE from './ButtonType/ButtonTypeE.jsx';
import ButtonTypeF from './ButtonType/ButtonTypeF.jsx';
import TypeInputBox from './ButtonType/TypeInputBox';
import { tasks } from './data.js';
import Item from './Item.jsx';
import { v4 as uuid } from 'uuid';
import './style.css';

export default function DragApp({
    dragList,
    buttonType,
    controlDragDrop,
    addLimit,
    title,
    buttonTitle,
    setDragList,
    setFunctionMode,
    fieldInfoList,
    load,
    setLoading,
    searchItemValue = '',
    dragForFilter=0
}) {
    const pathname = window.location.pathname;
    const routeName = pathname.split('/').pop();
    const inputRef = useRef(null);
    const inputRef2 = useRef(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [itemDataOfField, setItemDataOfField] = useState({});

    // non sql obj in array
    const [state, setState] = useState({
        items: dragList ? dragList : tasks,
        sortedItems: [],
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
        setLoading && setLoading(true);
        const unSortedArray = [...state.items];
        const sortedArrayByPostion = unSortedArray.sort((a, b) => {
            return a.currentPos - b.currentPos;
        });
        setState({ ...state, sortedItems: [...sortedArrayByPostion] });

        sessionStorage.setItem(`${routeName}_drag`, JSON.stringify(state.items));
        setLoading && setLoading(false);
    }, [dragList]);

    useEffect(() => {
        setLoading && setLoading(true);
        const str = pathname;
        if (str.includes('bus_route_edit') || str.includes('customer_setting') || str.includes('csv_export_setting')) {
            let t = 2;
            const timer = setTimeout(() => {
                while (t--) {
                    const unSortedArray = [...state.items];
                    const sortedArrayByPostion = unSortedArray.sort((a, b) => {
                        return a.currentPos - b.currentPos;
                    });

                    setState({ ...state, sortedItems: sortedArrayByPostion, button: buttonType });
                }

                if (str.includes('customer_setting') || str.includes('csv_export_setting')) {
                    if (buttonType?.buttonItems?.length > 0) {
                        const unSortedArray = [...buttonType?.buttonItems];
                        const sortedArrayByPostion = unSortedArray.sort((a, b) => {
                            return a.currentPos - b.currentPos;
                        });
                        setState({
                            ...state,
                            button: buttonType,
                            items: buttonType?.buttonItems,
                            sortedItems: sortedArrayByPostion,
                        });

                        sessionStorage.setItem(`${routeName}_drag`, JSON.stringify(buttonType?.buttonItems));
                    } else {
                        if (
                            buttonType?.buttonItems?.length === 0 &&
                            (buttonType?.type === 'F' || buttonType?.type === 'B')
                        ) {
                            setState({
                                ...state,
                                button: buttonType,
                            });
                        }
                    }
                }
            }, 1000);
            return () => clearTimeout(timer);

            setLoading && setLoading(false);
        } else {
            const unSortedArray = [...state.items];
            const sortedArrayByPostion = unSortedArray.sort((a, b) => {
                return a.currentPos - b.currentPos;
            });
            setState({ ...state, sortedItems: sortedArrayByPostion, button: buttonType });
            setLoading && setLoading(false);
        }

        setLoading && setLoading(false);
    }, [load && load, buttonType && buttonType]);

    // drag row start
    const onDragStart = (e) => {
        e.itemData = state.sortedItems[e.fromIndex];
    };

    // drag row and organize
    const onReorder = (e) => {
        let { sortedItems, items } = state;
        sortedItems = [...sortedItems.slice(0, e.fromIndex), ...sortedItems.slice(e.fromIndex + 1)];
        sortedItems = [...sortedItems.slice(0, e.toIndex), e.itemData, ...sortedItems.slice(e.toIndex)];

        setState({
            ...state,
            sortedItems: sortedItems,
        });

        // Changes in main array which will go to the backend
        for (let i = 0; i < items.length; i++) {
            const mainArray = items[i];
            const indexChange = sortedItems.indexOf(mainArray);
            mainArray.currentPos = indexChange;
        }

        sessionStorage.setItem(`${routeName}_drag`, JSON.stringify(items));

        if (state.button?.type === 'F') {
            sessionStorage.setItem(`${routeName}_drag_F_Type`, JSON.stringify(items));
        } else if (state?.button?.type === 'B') {
            sessionStorage.setItem(`${routeName}_drag_B_Type`, JSON.stringify(items));
        }
    };

    const addFrom = (data) => {
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

        if (data === 'inputBox') {
            const fromObj = {
                Task_ID: inputRef.current.value,
                Task_Subject: inputRef.current.value + '',
                inputBox: { id: inputRef.current.value, value: inputRef.current.value, type: 'text' },
                expandType: false,
                info2: inputRef2.current.value,
                number: Math.floor(Math.random() * (1000 - 100 + 1) + 100),
                currentPos: currentPosition,
                checkbox1: {
                    checked: false,
                    id: uuid(),
                    type: 'checkbox',
                },
                checkbox2: {
                    checked: false,
                    id: uuid(),
                    type: 'checkbox',
                },
            };
            if (sItems.length < state.limit) {
                sItems.push(fromObj);
                addInItems.push(fromObj);
            }

            setState({ ...state, items: addInItems, sortedItems: sItems });
            sessionStorage.setItem(`${routeName}_drag`, JSON.stringify(addInItems));
            inputRef.current.value = '';
            inputRef2.current.value = '';
        }

        if (data === 'B') {
            const fromObj = {
                currentPos: currentPosition,
                Task_ID: uuid(),
                expandType: true,
                components: [
                    { cId: uuid(), inputType: 'text', colorValue: '', inputValue: '', label: 'ラベル1' },
                    { cId: uuid(), inputType: 'text', colorValue: '', inputValue: '', label: 'ラベル2' },
                    { cId: uuid(), inputType: 'text', colorValue: '', inputValue: '', label: 'ラベル3' },
                ],
                task: 11,
            };

            if (sItems.length < state.limit) {
                sItems.push(fromObj);
                addInItems.push(fromObj);
            }
        }
        if (data === 'A') {
            const fromObj = {
                Task_ID: uuid(),
                Task_Subject: '' + Math.floor(Math.random() * (1000 - 100 + 1) + 100),
                inputBox2: {
                    id: uuid(),
                    value: '',
                    type: 'text',
                },
                inputBox3: {
                    id: uuid(),
                    value: '',
                    type: 'text',
                },
                expandType: false,
                number: Math.floor(Math.random() * (1000 - 100 + 1) + 100),
                currentPos: currentPosition,
                checkbox1: {
                    checked: false,
                    id: uuid(),
                    type: 'checkbox',
                },
                checkbox2: {
                    checked: false,
                    id: uuid(),
                    type: 'checkbox',
                },
            };

            if (sItems.length < state.limit) {
                sItems.push(fromObj);
                addInItems.push(fromObj);
            }
        }

        setState({ ...state, items: addInItems, sortedItems: sItems });
        sessionStorage.setItem(`${routeName}_drag`, JSON.stringify(addInItems));
    };

    const addFromAType = () => {
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

        const fromObj = {
            Task_ID: uuid(),
            Task_Subject: '' + Math.floor(Math.random() * (1000 - 100 + 1) + 100),
            inputBox2: { id: uuid(), value: '', type: 'text' },
            inputBox3: { id: uuid(), value: '', type: 'text' },
            expandType: false,

            number: Math.floor(Math.random() * (1000 - 100 + 1) + 100),
            currentPos: currentPosition,
            checkbox1: { checked: false, id: uuid(), type: 'checkbox' },
            checkbox2: { checked: false, id: uuid(), type: 'checkbox' },
        };

        if (sItems.length < state.limit) {
            sItems.push(fromObj);
            addInItems.push(fromObj);
        }

        setState({ ...state, items: addInItems, sortedItems: sItems });
        sessionStorage.setItem(`${routeName}_drag_A_Type`, JSON.stringify(addInItems));
    };

    // add type BBBB From
    const addFromBType = (data) => {
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

        const fromObj = {
            currentPos: currentPosition,
            Task_ID: uuid(),
            expandType: true,
            components: [
                {
                    cId: uuid(),
                    inputType: 'text',
                    colorValue: '',
                    inputValue: '',
                    label: 'ラベル1',
                    name: 'customersTemplate',
                },
            ],
            task: uuid(),
        };

        if (sItems.length < state.limit) {
            sItems.push(fromObj);
            addInItems.push(fromObj);
        }

        setState({ ...state, items: addInItems, sortedItems: sItems });
        sessionStorage.setItem(`${routeName}_drag_B_Type`, JSON.stringify(addInItems));
    };

    // add Form CCCC Type button type c onChange value
    const onValueChanged = (e) => {
        const itemValue = e.itemData.text;
        let stateArray = [...state.items];
        let randomID = Math.floor(Math.random() * (10000 - 100 + 1) + 100);

        const fromObj = {
            Name: e.value,
            Title: e.value,
            expandType: 'C',
            id: uuid(),
            name: e.value + itemValue + 'Can Perent and Child',
            isDirectory: true,
            expanded: true,
            icon: 'home',
            items: [],
            ID: uuid(),
        };

        stateArray.push(fromObj);

        setFunctionMode && setFunctionMode({ mode: 'add', item: fromObj });

        setState({ ...state, optionValue: e.value, sortedItems: [...state.sortedItems, fromObj] });
        setDragList && setDragList([...state.sortedItems, fromObj]);
    };

    // delete form AAAA type and BBBB type
    const deleteForm = (data) => {
        const task_id = data.Task_ID;
        const items = [...state.sortedItems];
        const filteredItems = items.filter((item) => item.Task_ID !== task_id);
        setState({ ...state, items: filteredItems, sortedItems: filteredItems });
        sessionStorage.setItem(`${routeName}_drag`, JSON.stringify(filteredItems));
        if (state?.button?.type === 'B') {
            sessionStorage.setItem(`${routeName}_drag_B_Type`, JSON.stringify(filteredItems));
        }
    };

    // edit form data
    const handleEditForm2 = (e, data) => {
        const value = e.target.value;
        const task_id = data.Task_ID;
        const items = [...state.sortedItems];

        const filterdItems = items.filter((item) => item.Task_ID === task_id);
        filterdItems[0].info2 = value;

        // api data then save it here
        const lItem = JSON.parse(sessionStorage.getItem(`${routeName}_drag`));
        const LfilterdItems = lItem.filter((item) => item.Task_ID === task_id);
        LfilterdItems[0].info2 = value;

        sessionStorage.setItem(`${routeName}_drag`, JSON.stringify(lItem));
    };

    // edit form data
    const handleEditForm = (e, data) => {
        const value = e.target.value;
        const task_id = data.Task_ID;
        const items = [...state.sortedItems];

        const filteredItems = items.filter((item) => item.Task_ID === task_id);
        filteredItems[0].Task_Subject = value;

        // api data then save it here
        const lItem = JSON.parse(sessionStorage.getItem(`${routeName}_drag`));
        const LFilteredItems = lItem.filter((item) => item.Task_ID === task_id);
        LFilteredItems[0].Task_Subject = value;

        sessionStorage.setItem(`${routeName}_drag`, JSON.stringify(lItem));
    };

    const checkbox1OnChange = (item, _checkbox, data) => {
        const task_id = item.Task_ID;
        const items = [...state.sortedItems];

        if (items) {
            items.map((item) => {
                if (item.Task_ID === task_id) {
                    item.checkbox1.checked = data;
                }
            });
        }

        setState({ ...state, sortedItems: items });

        const lItem = JSON.parse(sessionStorage.getItem(`${routeName}_drag`));
        if (lItem) {
            lItem.map((item) => {
                if (item.Task_ID === task_id) {
                    if (item.Task_ID === task_id) {
                        item.checkbox1.checked = data;
                    }
                }
            });
        }
        sessionStorage.setItem(`${routeName}_drag`, JSON.stringify(lItem));
    };
    // edit checkbox 2 onChange
    const checkbox2OnChange = (item, checkbox, data) => {
        const task_id = item.Task_ID;
        const items = [...state.sortedItems];

        if (items) {
            items.map((item) => {
                if (item.Task_ID === task_id) {
                    item.checkbox2.checked = data;
                }
            });
        }

        setState({ ...state, sortedItems: items });

        //  send data to the local and database
        const lItem = JSON.parse(sessionStorage.getItem(`${routeName}_drag`));
        if (lItem) {
            lItem.map((item) => {
                if (item.Task_ID === task_id) {
                    if (item.Task_ID === task_id) {
                        item.checkbox2.checked = data;
                    }
                }
            });
        }
        sessionStorage.setItem(`${routeName}_drag`, JSON.stringify(lItem));
    };

    // input 2 change data by onBlur handle
    const inputBox2OnBlur = (item, data) => {
        const value = data.target.value;
        const task_id = item.Task_ID;
        const items = [...state.sortedItems];
        if (items) {
            items.map((item) => {
                if (item.Task_ID === task_id) {
                    item.inputBox2.value = value;
                }
            });
        }
        setState({ ...state, sortedItems: items });

        //  send data to the local and database
        const lItem = JSON.parse(sessionStorage.getItem(`${routeName}_drag`));
        if (lItem) {
            lItem.map((item) => {
                if (item.Task_ID === task_id) {
                    if (item.Task_ID === task_id) {
                        item.inputBox2.value = value;
                    }
                }
            });
        }
        sessionStorage.setItem(`${routeName}_drag`, JSON.stringify(lItem));
    };

    // input 2 change data by onBlur handle
    const inputBox3OnBlur = (item, data) => {
        const value = data.target.value;
        const task_id = item.Task_ID;
        const items = [...state.sortedItems];
        if (items) {
            items.map((item) => {
                if (item.Task_ID === task_id) {
                    item.inputBox3.value = value;
                }
            });
        }
        setState({ ...state, sortedItems: items });

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
    };

    // expandable row input field
    const chagneColorInput = (item, comp, e) => {
        const inputValues = e.target.value;

        const task_id = item.Task_ID;
        const items = [...state.sortedItems];

        const inputBoxId = comp.cId;

        items.map((item) => {
            if (item.Task_ID === task_id) {
                const component = item.components;
                component.map((comp) => {
                    if (comp.cId === inputBoxId) {
                        comp.inputValue = inputValues;
                    }
                });
            }
        });

        const lItem = JSON.parse(sessionStorage.getItem(`${routeName}_drag`));

        if (lItem) {
            lItem.map((item) => {
                if (item.Task_ID === task_id) {
                    const component = item.components;
                    component.map((comp) => {
                        if (comp.cId === inputBoxId) {
                            comp.inputValue = inputValues;
                        }
                    });
                }
            });
        }

        sessionStorage.setItem(`${routeName}_drag`, JSON.stringify(lItem));
    };

    // extandable from color set
    const setColorhandle = (arrayItem, inputBoxItem, color) => {
        const task_id = arrayItem.Task_ID;
        const inputBoxId = inputBoxItem?.cId;
        const items = [...state.sortedItems];

        const changeValue = items.map((item) => {
            if (item.Task_ID === task_id) {
                const component = item.components;
                component.map((comp) => {
                    if (comp.cId === inputBoxId) {
                        comp.colorValue = color;
                    }
                });
            }
        });
        setState({ ...state, sortedItems: items });

        //  send data to the local and database

        const lItem = JSON.parse(sessionStorage.getItem(`${routeName}_drag`));

        if (lItem) {
            lItem.map((item) => {
                if (item.Task_ID === task_id) {
                    const component = item.components;
                    component.map((comp) => {
                        if (comp.cId === inputBoxId) {
                            comp.colorValue = color;
                        }
                    });
                }
            });
        }

        sessionStorage.setItem(`${routeName}_drag`, JSON.stringify(lItem));
    };

    // delete c type array
    const deleteCTypeArray = (data) => {
        // delete value store for handle from child component management screen
        setFunctionMode && setFunctionMode({ mode: 'delete', item: data });

        const { sortedItems } = state;
        const updateArray = sortedItems.filter((sArr) => sArr.ID !== data.ID);
        setState({ ...state, sortedItems: updateArray });
        setDragList && setDragList([...updateArray]);
    };

    // type E type button data added

    // add type EEEEEEE From
    const addFromEType = (e) => {
        const buttonValue = e.itemData;
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

        const fromObj = {
            Task_ID: uuid(),
            inputBox2: { id: uuid(), value: buttonValue, type: 'text' },
            expandType: false,
            number: Math.floor(Math.random() * (1000 - 100 + 1) + 100),
            currentPos: currentPosition,
            checkbox1: { checked: false, id: uuid(), type: 'checkbox' },
            checkbox2: { checked: false, id: uuid(), type: 'checkbox' },
        };

        if (sItems.length < state.limit) {
            sItems.push(fromObj);
            addInItems.push(fromObj);
        }

        setState({ ...state, items: addInItems, sortedItems: sItems, optionValue: buttonValue });
    };
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

        setState({
            ...state,
            items: addInItems,
            sortedItems: sItems,
            optionValue: selectedItemValue,
            button: newButtonData,
        });
        sessionStorage.setItem(`${routeName}_drag`, JSON.stringify(addInItems));
        sessionStorage.setItem(`${routeName}_drag_F_Type`, JSON.stringify(addInItems));
    };

    const deleteFTypeArray = (data) => {
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
        if (dragForFilter == 1) {  
            let deletedObj = JSON.parse(sessionStorage.getItem(`${routeName}_reset_filter_search`));
            if (!deletedObj) {
                deletedObj = {isReset:1,resetField:[]};   
            } else {
                deletedObj = {...deletedObj,isReset:1}
            }

            const deletedItems = items.find((item) => item.Task_ID == task_id); 
            console.log('deletedItems',deletedItems);
            if (deletedItems && deletedItems?.fieldData) {
                if (deletedItems?.fieldData?.projectId == 0) {
                    deletedObj.resetField.push(deletedItems?.fieldData?.fieldCode);
                }
            }
            sessionStorage.setItem(`${routeName}_reset_filter_search`, JSON.stringify(deletedObj));
        }
        const filteredItems = items.filter((item) => item.Task_ID !== task_id);
        
        setState({
            ...state,
            items: filteredItems,
            sortedItems: filteredItems,
            button: newButtonData,
            optionValue: '',
        });

        sessionStorage.setItem(`${routeName}_drag_F_Type`, JSON.stringify(filteredItems)); // where 2 drag list is there
        sessionStorage.setItem(`${routeName}_drag`, JSON.stringify(filteredItems)); // Where Only 1 drag list there F type
        
    };

    function handleOnPressModalSaveButton(e, formData) {
        e.preventDefault();

        const task_id = formData.Task_ID;
        const existFieldFormat = JSON.parse(sessionStorage.getItem(`${routeName}_drag`));
        const filteredItems = existFieldFormat.filter((item) => item.Task_ID !== task_id);
        sessionStorage.setItem(`${routeName}_drag_F_Type`, JSON.stringify([...filteredItems, formData]));
        sessionStorage.setItem(`${routeName}_drag`, JSON.stringify([...filteredItems, formData]));

        sessionStorage.setItem(`${routeName}_drag_F_Type`, JSON.stringify([...filteredItems, formData]));
        sessionStorage.setItem(`${routeName}_drag`, JSON.stringify([...filteredItems, formData]));

        setModalOpen(false);
    }

    const openEditModal = (data) => {
        //
        setModalOpen(true);
        setItemDataOfField(data);
    };

    useEffect(() => {
        setLoading && setLoading(false);
    }, [buttonType]);

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
                {/* grid layout end */}

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
                                    // Working function instruction by Linkon
                                    item={item} // drag item show
                                    deleteForm={deleteForm} // delete A and B type array
                                    deleteCTypeArray={deleteCTypeArray} //delete C type array
                                    deleteFTypeArray={deleteFTypeArray} // delete F type array
                                    openEditModal={openEditModal} // delete F type array
                                    handleEditForm={handleEditForm} // Input box edit form
                                    handleEditForm2={handleEditForm2} // Input box 2 edit from
                                    setColorhandle={setColorhandle} // Expandable color ser
                                    checkbox1OnChange={checkbox1OnChange} // Checkbox 1 onchage function
                                    checkbox2OnChange={checkbox2OnChange} // Checkbox 2 onchage function
                                    chagneColorInput={chagneColorInput} // Changes color input box
                                    inputBox2OnBlur={inputBox2OnBlur} // Input box on blur data will save
                                    inputBox3OnBlur={inputBox3OnBlur} // Input box on blur data will save
                                    stateControlDragDrop={state.stateControlDragDrop} // Controlling which things should show to the ui
                                    searchItemValue={searchItemValue}
                                />
                            ))}
                        </Sortable>
                    </ScrollView>
                    <div className="text-center">
                        <br />
                        <div className="text-center">
                            {/*If Button type is inputbox */}
                            {state.button.type === 'inputBox' && (
                                <TypeInputBox
                                    buttonLabel={state?.button?.buttonName}
                                    label="停留所追加"
                                    inputLabel1="停留所名"
                                    inputLabel2="停留所住所"
                                    handleClick={() => addFrom('inputBox')}
                                    disabled={state.sortedItems.length >= state.limit}
                                    inputRef={inputRef}
                                    inputRef2={inputRef2}
                                    placeholder1={state.button.placeholder1 ? state.button.placeholder1 : '停留所名'}
                                    placeholder2={state.button.placeholder2 ? state.button.placeholder2 : '停留所住所'}
                                />
                            )}

                            {/* If button type is A type */}

                            {state.button.type === 'A' && (
                                <div className="flex justify-center align-middle hover:bg-blue-400 items-center bg-blue-25 !cursor-pointer text-blue-100 border border-all h-[32px]">
                                    <AiOutlinePlus
                                        className="h-[22px] w-[22px] z-10 mr-[-32px]"
                                        onClick={() => addFromAType()}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => addFromAType()}
                                        className="w-full cursor-pointer"
                                        disabled={state.sortedItems.length < state.limit ? false : true}
                                    >
                                        {state?.button?.buttonName}
                                    </button>
                                </div>
                            )}
                            {/* If button type is B type */}
                            {state.button.type === 'B' && (
                                <div className="flex justify-center align-middle hover:bg-blue-400 items-center bg-blue-25 !cursor-pointer text-blue-100 border border-all h-[32px]">
                                    <AiOutlinePlus
                                        className="h-[22px] w-[22px] z-10 mr-[-32px]"
                                        onClick={() => addFromBType()}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => addFromBType()}
                                        className="w-full cursor-pointer"
                                        disabled={state.sortedItems.length < state.limit ? false : true}
                                    >
                                        {state?.button?.buttonName}
                                    </button>
                                </div>
                            )}
                            {/* If button type is C type select box will show and click to open and can selectable */}
                            {state.button.type === 'C' && (
                                <div className="flex justify-center align-middle hover:bg-blue-400 items-center bg-blue-25 !cursor-pointer text-blue-100 border border-all h-[32px]">
                                    <div className="dx-field-value">
                                        <SelectBox
                                            items={state?.button.buttonData}
                                            placeholder="Select Option"
                                            value={state?.optionValue}
                                            onValueChanged={(e) => {
                                                state.button.functionCall === 'A' ? addFromAType() : onValueChanged(e);
                                            }}
                                            showClearButton={true}
                                        />
                                    </div>
                                </div>
                            )}
                            {/* haga create timepicker area  */}
                            {state.button.type === 'D' && (
                                <div className="flex justify-center align-middle hover:bg-blue-400 items-center bg-blue-25 !cursor-pointer text-blue-100 border border-all h-[32px]">
                                    <AiOutlinePlus
                                        className="h-[22px] w-[22px] z-10 mr-[-32px]"
                                        onClick={() => addFromAType()}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => addFromAType()}
                                        className="w-full cursor-pointer"
                                        disabled={state.sortedItems.length < state.limit ? false : true}
                                    >
                                        {state?.button?.buttonName}
                                    </button>
                                </div>
                            )}

                            {/* If button type is E it will add data to the drag list */}
                            {state.button.type === 'E' && (
                                <div>
                                    <ButtonTypeE
                                        buttonData={state?.button.buttonData}
                                        optionValue={state?.optionValue}
                                        addFromEType={addFromEType}
                                    />
                                </div>
                            )}

                            {/* If button type is F it will add data to the drag list but same data wont add */}
                            {state.button.type === 'F' && (
                                <div>
                                    <ButtonTypeF
                                        buttonData={state?.button.buttonData}
                                        // optionValue={state?.optionValue}
                                        placeholder={state?.button?.placeholder} // Linkon 17-11-22 Placeholder changes button type F will change the placeholder dynamically
                                        list={state?.items}
                                        limit={addLimit}
                                        addFromFType={addFromFType}
                                        searchItemValue={searchItemValue}
                                    />
                                    {/* addFromFType={state.button.functionCall == "B" ? onValueChanged : addFromFType} /> */}
                                </div>
                            )}

                            {state.button.type === 'normal' && (
                                <div className="flex justify-center align-middle hover:bg-blue-400 items-center bg-blue-25 !cursor-pointer text-blue-100 border border-all h-[32px]">
                                    {/* <option className='text-center' value={"B"}>Normal Form</option>*/}
                                    <AiOutlinePlus
                                        className="h-[22px] w-[22px] z-10 mr-[-32px]"
                                        onClick={() => addFrom('A')}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => addFrom('A')}
                                        className="w-full cursor-pointer"
                                        disabled={state.sortedItems.length < state.limit ? false : true}
                                    // disabled:opacity-25
                                    >
                                        {state?.button?.buttonName}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {modalOpen && (
                <FieldModal
                    blockData={itemDataOfField}
                    setModalOpen={setModalOpen}
                    handleOnPressSave={handleOnPressModalSaveButton}
                />
            )}
        </div>
    );
}
