import { Form, Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { errorMessages } from '../../../../lib/errorMessages';
import {
    baseURL,
    listEventInstitute,
    listEventItem,
    listFilter,
    listItem,
    listMethod,
    updateEventItem,
    updateMethod,
} from '../../../../restapi/queries';
import { instance } from '../../../../services/axios';
import { isNumeric } from '../../../../utilities/commonFunctions';
import ErrorMessage from '../../../ErrorMessage/ErrorMessage';
import ModalFormFooter from '../../../Footer/ModalFormFooter';
import SelectBox from '../../../Form/FormInputs/SelectBox';
import ButtonTypeFV2 from '../../../ListElementDrag/ButtonType/ButtonTypeFV2';
import Loading from '../../../Loading/Loader';
import EmployeeList from '../../../ManagementItem/EmployeeList';
import ExpandRow from '../../../ManagementItem/ExpandRows/ExpandRow';
import TagBoxComponentV1 from '../../../ManagementItem/TagBoxComponentV1';
import AddButton from '../../../Table/FooterSection/AddButton';
import FormBodyContainer from '../../../Wrapper/FormBodyContainer';
import InputContainer from '../../../Wrapper/InputContainer';
import ModalTitle from '../../components/ModalTitle';
import WhiteModalWrapper from '../../components/WhiteModalWrapper';

import { v4 as uuid } from 'uuid';
import TextBox from '../../../Form/FormInputs/TextBox';
import ExpandRowV2 from '../../../ManagementItem/ExpandRows/ExpandRowV2';

const itemOptionsData = [
    { id: 1, name: '選択必須' },
    { id: 2, name: '初期状態で選択済み' },
    { id: 3, name: '単独選択不可' },
    { id: 4, name: '変更不可' },
];

const EventItemModal = ({
    formType,
    setIsOverflow,
    setCancelModal,
    eventId,
    pathName,
    eventInstituteId,
    error = null,
    load = false,
    initialValues,
    instituteName,
}) => {
    const { info } = useSelector((state) => state.auth);
    const [systemError, setSystemError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [dragList, setDragList] = useState([]);
    const [treeList, setTreeList] = useState([]);
    const [eventInstituteList, setEventInstituteList] = useState([]);
    const [tagboxError, setTagboxError] = useState('');

    // const [searchItemValue, setSearchItemValue] = useState("")
    const [searchItemNameValue, setSearchItemNameValue] = useState('');
    const [buttonType, setButtonType] = useState({
        buttonName: 'Button Type F',
        type: 'F',
        buttonData: [],
    });
    // F type button will show
    const [optionValue, setOptionValue] = useState('');
    const [itemLoaded, setItemLoaded] = useState(false);

    // Tag box handle state
    const [functionMode, setFunctionMode] = useState({ mode: '', item: {} });
    const [countTagBox1, setCoutTagBox1] = useState([]);
    const [countTagBox2, setCoutTagBox2] = useState([]);
    const [itemConditions, setItemConditions] = useState([]);
    const [itemOptions, setItemOptions] = useState([]);
    const [searchItemInButtonTypeF, setSearchItemInButtonTypeF] = useState([]);
    // disableFButton button
    const [disableFButton, setDisableFButton] = useState(false);
    // Selected Event item drag list data sessionStorage key
    const selectedEventItemSessionKey = `${pathName}_event_item_data_${eventInstituteId}`;
    const selectedEventItemTreeListSessionKey = `${pathName}_event_item_tree_list_data_${eventInstituteId}`;
    // amount value
    const [amountValue, setAmountValue] = useState('');

    // component render 
    // const [componentRender1, setComponentRender1] = useState(true)
    // const [componentRender2, setComponentRender2] = useState(true)
    // const [componentRender3, setComponentRender3] = useState(true)

    useEffect(() => {
        getItemList();
        getEventInstituteList();
        getFilterList();

        setItemOptions(itemOptionsData);

        setFunctionMode && setFunctionMode({ mode: 'array', item: dragList });
    }, []);

    useEffect(() => {
        setSelectedItems(initialValues);
    }, [initialValues]);

    useEffect(() => {
        setTimeout(() => {
            const selectedDragList = [...dragList];
            const buttonIdArr = selectedDragList.map((x) => x['buttonId']);
            const itemListArr = [...buttonType.buttonData];
            if (itemListArr.length > 0 && buttonIdArr.length > 0) {
                itemListArr.map((item, i) => {
                    if (buttonIdArr.includes(item.id)) {
                        item.disabled = true;
                    } else {
                        item.disabled = false;
                    }
                    return item;
                });
                if (itemListArr?.length > 0) {
                    setButtonType({ ...buttonType, buttonData: itemListArr });
                }
            } else {
                itemListArr.map((item, i) => {
                    item.disabled = false;
                    return item;
                });
                if (itemListArr?.length > 0) {
                    setButtonType({ ...buttonType, buttonData: itemListArr });
                }
            }
        }, 2000);
    }, [dragList, itemLoaded]);

    //  HANDLER FUNCTION START
    const itemNameSearchHandler = (e) => {

        const searchTerm = e.target.value;
        // console.log("⚓ OnBlur :", searchTerm)
        setSearchItemNameValue(searchTerm);

        // drag list change
        const dragListSession = JSON.parse(sessionStorage.getItem(selectedEventItemSessionKey))
        if (dragListSession) {
            // console.log("🧑‍💻🚨dragListSession", dragListSession) /// cause after change value of select box it not able to change the value in drag-list sate
            setDragList(dragListSession)
        }
        setFunctionMode({ mode: '' })
        // setFunctionMode({ mode: '', item: fromObj })
    };
    //  HANDLER FUNCTION END

    const getEventInstituteList = async () => {
        try {
            const pid = sessionStorage.getItem('currentProjectId');
            const ENDPOINT = `${baseURL}${listEventInstitute}?pid=${pid}&eid=${eventId}&eeid=0 `;
            const config = {
                method: listMethod,
                url: ENDPOINT,
            };

            const response = await instance.request(config);
            if (response.data.records.length > 0) {
                let itemListArr = [];
                response.data.records.forEach((item) => {
                    let newItem = {};
                    newItem.id = item.eventInstituteId;
                    newItem.text = item.eventInstituteName ? item.eventInstituteName : item.instituteName;
                    // newItem.text = (item.eventInstituteName) ? item.eventInstituteName + (item.instituteManageName)? "(" + item.instituteManageName + ")":"" : item.instituteName + (item.instituteManageName)? "(" + item.instituteManageName + ")":"";
                    itemListArr.push(newItem);
                });
                setEventInstituteList(itemListArr);

                setLoading(false);
            } else {
                setLoading(false);
            }
        } catch (error) {
            setSystemError(true);
            setLoading(false);
        }
    };

    const getItemList = async () => {
        try {
            const pid = sessionStorage.getItem('currentProjectId');
            const ENDPOINT = `${baseURL}${listItem}?pid=${pid}`;
            const config = {
                method: listMethod,
                url: ENDPOINT,
            };

            const response = await instance.request(config);
            if (response.data.records.length > 0) {
                let itemListArr = [];
                response.data.records.forEach((item) => {
                    let newItem = {};
                    newItem.id = item.itemId;
                    // newItem.text = item.itemName;
                    newItem.text = item.itemManageName
                        ? item.itemName + '（' + item.itemManageName + '）'
                        : item.itemName;
                    itemListArr.push(newItem);
                });
                setButtonType({ ...buttonType, buttonData: itemListArr });

                setLoading(false);
                setItemLoaded(true);
            } else {
                setLoading(false);
            }
        } catch (error) {
            setSystemError(true);
            setLoading(false);
        }
    };

    const getFilterList = async () => {
        try {
            const pid = sessionStorage.getItem('currentProjectId');
            const ENDPOINT = `${baseURL}${listFilter}?pid=${pid}`;
            const config = {
                method: listMethod,
                url: ENDPOINT,
            };

            const response = await instance.request(config);
            if (response.data.records.length > 0) {
                let filterListArr = [];
                response.data.records.forEach((item) => {
                    let newItem = {};
                    newItem.id = item.filterId;
                    newItem.name = item.filterName;
                    newItem.managementName = item.filterManageName;
                    filterListArr.push(newItem);
                });
                setItemConditions(filterListArr);
            }
        } catch (error) {
            setSystemError(true);
            setLoading(false);
        }
    };

    const handleChangeInstitute = async (e) => {
        let currentEventInstituteId = e.target.value;
        if (!currentEventInstituteId) currentEventInstituteId = eventInstituteId; // set original EventInstituteId

        if (!currentEventInstituteId) return;

        try {
            setLoading(true);
            const projectId = sessionStorage.getItem('currentProjectId');
            const ENDPOINT = `${baseURL}${listEventItem}${currentEventInstituteId}`;
            const config = {
                method: listMethod,
                url: ENDPOINT,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            };
            const response = await instance.request(config);
            if (response) {
                setLoading(false);
                setSelectedItems(response.data.records.records[0]);
            }
        } catch (error) {
            setLoading(false);
            setSystemError(error.message);
        }
    };

    const setSelectedItems = (initialValues) => {
        sessionStorage.removeItem(selectedEventItemSessionKey);
        sessionStorage.removeItem(selectedEventItemTreeListSessionKey);
        if (initialValues.eventInstituteItemInfo) {
            const { dragList, treeList, tagbox1, tagbox2 } = initialValues.eventInstituteItemInfo;
            if (dragList?.length > 0) {
                setDragList(dragList);
                sessionStorage.setItem(selectedEventItemSessionKey, JSON.stringify(dragList));
                sessionStorage.setItem(selectedEventItemTreeListSessionKey, JSON.stringify(treeList));
                setTreeList(treeList);
                // console.log("🧑‍💻 Set initialValues.eventInstituteItemInfo", initialValues.eventInstituteItemInfo)
                // console.log("🧑‍💻 Set Tree", treeList)
                setFunctionMode && setFunctionMode({ mode: 'array', item: treeList });
            }

            if (Array.isArray(tagbox1)) {
                setCoutTagBox1(tagbox1);
                setTagBoxIntoSessionStorage(tagbox1, 1);
            }
            if (Array.isArray(tagbox2)) {
                setCoutTagBox2(tagbox2);
                setTagBoxIntoSessionStorage(tagbox2, 2);
            }
        } else {
            setDragList([]);
            setTreeList([]);
            setFunctionMode && setFunctionMode({ mode: 'array', item: [] });
            setCoutTagBox1([]);
            setTagBoxIntoSessionStorage([], 1);
            setCoutTagBox2([]);
            setTagBoxIntoSessionStorage([], 2);
        }
    };

    const setTagBoxIntoSessionStorage = (tagbox, box) => {
        tagbox.map((item) => {
            sessionStorage.setItem(`${pathName}_timestamp_tag_box${box}_${item.ID}`, JSON.stringify(item.selectedDrag));
        });
    };

    const setDragListDataSessionStorageToState = () => {
        setDragList(JSON.parse(sessionStorage.getItem(selectedEventItemSessionKey)));
    };

    const getDragListFromSessionStorage = () => {
        return JSON.parse(sessionStorage.getItem(selectedEventItemSessionKey));
    };

    const getTreeListFromSessionStorage = () => {
        return JSON.parse(sessionStorage.getItem(selectedEventItemTreeListSessionKey));
    };

    // Add more tag box handle 1
    const addMoreTagBox1 = () => {
        if (countTagBox1.length == 0) {
            setCoutTagBox1([{ name: 'TagBox1', ID: Math.floor(Math.random() * (1000 - 100 + 1) + 100) }]);
        } else {
            setCoutTagBox1([
                ...countTagBox1,
                { name: 'TagBox', ID: Math.floor(Math.random() * (1000 - 100 + 1) + 100) },
            ]);
        }
    };
    // delete tagBox handle 1
    const deleteTagBox1 = (id, object, index, array) => {
        try {
            console.log('ididid',id);
            console.log('countTagBox1',countTagBox1);
            if (countTagBox1.length > 0) {
                const filterCountTagBox = countTagBox1.filter((ctb) => ctb.ID != id);

                const sessionStorageKey = `${pathName}_timestamp_tag_box1_${id}`;
                sessionStorage.removeItem(`${sessionStorageKey}`);
                localStorage.removeItem(`TagBox${id}`);
                sessionStorage.removeItem(`TagBox${id}`);

                setCoutTagBox1(filterCountTagBox);
            }
        } catch (error) {
            console.log('Delete tag box 1 error');
        }
    };
    // Add more tag box handle 2
    const addMoreTagBox2 = () => {
        if (countTagBox2.length == 0) {
            setCoutTagBox2([{ name: 'TagBox1', ID: 1 }]);
        } else {
            setCoutTagBox2([
                ...countTagBox2,
                { name: 'TagBox', ID: Math.floor(Math.random() * (1000 - 100 + 1) + 100) },
            ]);
        }
    };
    // delete tagBox handle 1
    const deleteTagBox2 = (e) => {
        if (countTagBox2.length > 0) {
            console.log('ididid',e);
            console.log('countTagBox1',countTagBox2);
            const filterCountTagBox = countTagBox2.filter((ctb) => ctb.ID !== e);
            setCoutTagBox2([...filterCountTagBox]);
            const sessionStorageKey = `${pathName}_timestamp_tag_box2_${e}`;
            sessionStorage.removeItem(`${sessionStorageKey}`);
            localStorage.removeItem(`TagBox${e}`);
            sessionStorage.removeItem(`TagBox${e}`);

        }
    };

    // Add form type FFFFFFFFF
    const addFromFType = (e) => {
        setDisableFButton(true); // disable button type f
        const selectedItemId = e.itemData.id;
        // const selectedItem = e.itemData;
        // const selectedItemValue = e.itemData.text;

        // copying previous data of f button and disable selected item
        let stateButtonData = [...buttonType.buttonData];
        stateButtonData.forEach((item, index, arr) => {
            if (item.id == selectedItemId) {
                item.disabled = true;
            }
        });
        // after select making this new object for state
        const newButtonData = { ...buttonType, buttonData: stateButtonData };
        setButtonType({ ...newButtonData });

        // making this for drag list and rest of others
        const itemValue = e.itemData.text;
        let stateArray = getDragListFromSessionStorage() ? getDragListFromSessionStorage() : [];

        // checking state array has same value or not
        if (stateArray) {
            const stateCheck = stateArray.find(sA => sA.buttonId === selectedItemId)
            if (stateCheck) {
                // console.log("💣💣There is value already exist return please")
                setDisableFButton(false); // disable button type f
            } else {
                // console.log("💣💣There is no value already exist", stateCheck)
                let randomID = uuid();
                const fromObj = {
                    Name: itemValue,
                    Title: itemValue,

                    // Tree view list
                    id: randomID,
                    buttonId: selectedItemId,
                    name: itemValue,

                    isDirectory: true, //isDirectory
                    expanded: true,

                    items: [],
                    selectedItemConditions: [{ id: '', amount: '' }],
                    selectedItemOptions: [],
                    ID: randomID,
                };
                // added new value store for handle from child component management screen
                setFunctionMode && setFunctionMode({ mode: 'add', item: fromObj });

                sessionStorage.setItem(selectedEventItemSessionKey, JSON.stringify([...stateArray, fromObj]));
                setDragListDataSessionStorageToState();

                // TODO: If not using remove this Lin kon
                // bug fix one method lin kon 16-3-23 bug will fix later 
                // Button behave that component run faster then devextreme so that you made in this way after devextreme run complete it 
                // will enable the button again -> assuming time 2s
                // setTimeout(() => {
                //     console.log("Select button process completed and enable the button again")
                //     setDisableFButton(false); // disable button type f
                // }, 2000)

                setDisableFButton(false); // disable button type f
            }
        } else {
            console.log("🚨There is no state")
        }
    };

    // delete form type FFFFFFFFF
    const deleteFormFType = (item) => {
        const { id, buttonId } = item || {};

        let updatedButtonState;
        if (buttonType && Array.isArray(buttonType.buttonData)) {
            updatedButtonState = {
                ...buttonType, buttonData: buttonType.buttonData.map(x => {
                    if (x.id == buttonId) return { ...x, disabled: false };
                    else return { ...x }
                })
            }
        }

        const sessionDragList = sessionStorage.getItem(selectedEventItemSessionKey) ? JSON.parse(sessionStorage.getItem(selectedEventItemSessionKey)) : [];
        const filteredItems = sessionDragList.filter(x => x.id != id);
        sessionStorage.setItem(selectedEventItemSessionKey, JSON.stringify(filteredItems));

        setFunctionMode({ mode: 'delete', item: item });
        setButtonType(updatedButtonState);
        setDragList(filteredItems);

        // try {
        //     // employee list will render and delete the list
        //     setFunctionMode && setFunctionMode({ mode: 'delete', item: item }); // Employee list useEffect

        //     const data = item; // props assign as a data
        //     const selectedItemId = data.id; // select id
        //     const itemButtonId = data.buttonId; // item button id for disable make false
        //     const stateButton = buttonType; // button all data copy
        //     let stateButtonData = [...stateButton.buttonData]; // button array get

        //     // making disable state of button data
        //     stateButtonData.forEach((item, index, arr) => {
        //         if (item.id == itemButtonId) {
        //             item.disabled = false;
        //         }
        //     });

        //     // new button type data added after delete rows
        //     const newButtonData = { ...buttonType, buttonData: stateButtonData };
        //     setButtonType(newButtonData);

        //     //  set new drag list after delete new code added by lin kon 9/3/23
        //     const sessionStorageDragList = JSON.parse(sessionStorage.getItem(selectedEventItemSessionKey))
        //     let filteredItems
        //     filteredItems = sessionStorageDragList.filter((item) => item.id !== selectedItemId);

        //     // Not shake screen after delete fix by lin kon 16-3-23 bug will fix later
        //     setTimeout(() => {
        //         setDragList(filteredItems);
        //     }, 0);

        //     // prev code by hossain vai 
        //     // setDragList([]);
        //     // setTimeout(() => {
        //     //     setDragList(filteredItems);
        //     // }, 0);

        //     sessionStorage.setItem(selectedEventItemSessionKey, JSON.stringify(filteredItems));

        //     // setTimeout(() => {
        //     //     console.log("🚨 After 0.5s later set new value from session ")
        //     //     const data = JSON.parse(sessionStorage.getItem(selectedEventItemSessionKey))
        //     //     console.log("🚨 After 0.5s later set new value from filteredItems :", filteredItems)
        //     //     console.log("🚨 After 0.5s later set new value from session :", data)

        //     //     // setDragList(JSON.parse(sessionStorage.getItem(selectedEventItemSessionKey)));
        //     // }, 500);


        // } catch (error) {
        //     console.log('Error from delete item row event item modal', error);
        // }
    };

    const processing = useRef(false);

    const handleSubmit = async (e) => {
        if (processing.current) return;
        processing.current = true;
        setLoading(true);
        let inputData = {};
        inputData.dragList = getDragListFromSessionStorage();
        inputData.treeList = getTreeListFromSessionStorage();
        inputData.tagbox1 = countTagBox1;
        let errorFromTagBox1 = false;
        let errorFromTagBox2 = false;
        if (inputData.tagbox1.length > 0) {
            inputData.tagbox1.map((item) => {
                let box1ItemList = sessionStorage.getItem(`${pathName}_timestamp_tag_box1_${item.ID}`);
                const selectedDrag = box1ItemList && JSON.parse(box1ItemList);
                console.log('selectedDrag',selectedDrag);
                if (selectedDrag && selectedDrag.length>0) {
                    return (item.selectedDrag = selectedDrag);
                } else {
                    console.log('need to apply validation here1');
                    errorFromTagBox1 = true;
                }
            });
        }
        inputData.tagbox2 = countTagBox2;
        if (inputData.tagbox2.length > 0) {
            inputData.tagbox2.map((item) => {
                let box2ItemList = sessionStorage.getItem(`${pathName}_timestamp_tag_box2_${item.ID}`);
                const selectedDrag = box2ItemList && JSON.parse(box2ItemList);
                console.log('selectedDrag',selectedDrag);
                if (selectedDrag && selectedDrag.length>0) {
                    return (item.selectedDrag = selectedDrag);
                } else {
                    console.log('need to apply validation here2');
                    errorFromTagBox2 = true;
                }
            });
        }

        console.log("🌅 Input Data : ", inputData)
        console.log("🌅 Input errorFromTagBox1 : ", errorFromTagBox1)
        console.log("🌅 Input errorFromTagBox2 : ", errorFromTagBox2)
        //add validation for section group
        if (errorFromTagBox1) { 
            setTagboxError('同時選択必須グループを確認してください');
            processing.current = false;
            setLoading(false);
            return false;
        }

        if (errorFromTagBox2) { 
            setTagboxError('同時選択禁止グループを確認してください');
            processing.current = false;
            setLoading(false);
            return false;
        }
        if (!errorFromTagBox1 && !errorFromTagBox2) { 
            try {

                setLoading(true);
                setTagboxError('')
                const ENDPOINT = `${baseURL}${updateEventItem}${eventInstituteId}`;
                const config = {
                    method: updateMethod,
                    url: ENDPOINT,
                    data: {
                        eventInstituteItemInfo: inputData,
                        memo: e.memo,
                        updateAt: Date.now().toLocaleString(),
                        updatedBy: info.accountId,
                    },
                };

                const created = await instance.request(config);
                if (created) {
                    setSystemError(false);
                    setLoading(false);
                    handleCancel(true);
                    // remove existing temporary data
                    sessionStorage.removeItem('event_scheduler_temporary_option_value');
                }

            } catch (error) {
                setSystemError(true);
                setLoading(false);
            } finally {
                setLoading(false);
                processing.current = false;
            }
        }
    };

    const itemConditionChange = (e) => {

        try {
            const targetName = e.target.attributes.target_name.value;
            const targetIndex = e.target.attributes.target_index.value;

            let itemValue = 0;
            if (e.target.type === 'checkbox') {
                if (e.target.checked) {
                    itemValue = parseInt(e.target.attributes.target_value.value);
                } else {
                    itemValue = 0;
                }
            } else {
                itemValue = parseInt(e.target.value);
            }
            // store the selected value in session linkon update 3/3/23
            sessionStorage.setItem('event_scheduler_temporary_option_value', itemValue)

            const newDragList = getDragListFromSessionStorage();
            newDragList.map((item) => {
                if (item.Name === targetName) {
                    if (typeof item.selectedItemConditions !== 'undefined') {
                        const selectedItemCondition = item.selectedItemConditions[targetIndex];
                        if (e.target.type === 'select-one') {
                            return (selectedItemCondition.id = itemValue);
                        } else if (e.target.type === 'number') {
                            return (selectedItemCondition.amount = itemValue);
                        }
                    }

                    if (e.target.type === 'checkbox') {
                        return (item.selectedItemOptions[targetIndex] = itemValue);
                    }
                }
            });
            // console.log("⚓ newDragList itemConditionChange ID: ", newDragList)
            sessionStorage.setItem(selectedEventItemSessionKey, JSON.stringify(newDragList));
        } catch (error) {
            console.log("🚨itemConditionChange error", error)
        }
    };
    const itemConditionChangeAmount = (e) => {
        try {
            const targetName = e.target.attributes.target_name.value;
            const targetIndex = e.target.attributes.target_index.value;

            // convert into ASCII value
            let typedValue = e.target.value;
            const slen = typedValue.length;
            const result = typedValue.charCodeAt(slen - 1);

            // Step 0: Checking number or empty string

            if (typedValue == '' || !isNumeric(typedValue.charAt(0))) {
                setAmountValue('');

                let itemValue = typedValue;
                // itemValue = parseInt(typedValue);

                const newDragList = getDragListFromSessionStorage();
                newDragList.map((item) => {
                    if (item.Name === targetName) {
                        if (typeof item.selectedItemConditions !== 'undefined') {
                            const selectedItemCondition = item.selectedItemConditions[targetIndex];
                            if (e.target.type === 'select-one') {
                                return (selectedItemCondition.id = itemValue);
                            } else if (e.target.type === 'text') {
                                return (selectedItemCondition.amount = itemValue);
                            }
                        }

                        if (e.target.type === 'checkbox') {
                            return (item.selectedItemOptions[targetIndex] = itemValue);
                        }
                    }
                });
                sessionStorage.setItem(selectedEventItemSessionKey, JSON.stringify(newDragList));
                // console.log("⚓ newDragList itemConditionAmountChange Amount 1: ", newDragList)
                // setDragList(newDragList)
                return 0;
            }

            // Step 1: remove comma from targeted string value
            // remove comma from string
            let proverb = e.target.value;
            let RemoveComma = proverb.replaceAll(',', '');

            // Step 2: Making format of commas again
            const format = (num) => {
                return String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1,');
            };

            // Step 3: Set the value to the state
            let stateValue = format(parseInt(RemoveComma));
            setAmountValue(stateValue);

            let itemValue = 0;
            if (e.target.type === 'checkbox') {
                if (e.target.checked) {
                    itemValue = parseInt(e.target.attributes.target_value.value);
                } else {
                    itemValue = 0;
                }
            } else {
                itemValue = parseInt(RemoveComma);
                // itemValue = parseInt(e.target.value);
            }

            const newDragList = getDragListFromSessionStorage();
            newDragList.map((item) => {
                if (item.Name === targetName) {
                    if (typeof item.selectedItemConditions !== 'undefined') {
                        const selectedItemCondition = item.selectedItemConditions[targetIndex];
                        if (e.target.type === 'select-one') {
                            return (selectedItemCondition.id = itemValue);
                        } else if (e.target.type === 'text') {
                            return (selectedItemCondition.amount = itemValue);
                        }
                    }

                    if (e.target.type === 'checkbox') {
                        return (item.selectedItemOptions[targetIndex] = itemValue);
                    }
                }
            });
            // console.log("⚓ newDragList itemConditionAmountChange Amount 2: ", newDragList)
            sessionStorage.setItem(selectedEventItemSessionKey, JSON.stringify(newDragList));
        } catch (error) {
            console.log("itemConditionChangeAmount error", error)
        }
    };

    const handleCancel = () => {
        sessionStorage.removeItem(selectedEventItemSessionKey);
        sessionStorage.removeItem(selectedEventItemTreeListSessionKey);
        setCancelModal(false);
        // store the selected value in session linkon update 3/3/23
        sessionStorage.removeItem('event_scheduler_temporary_option_value')
    };

    // const onChangeValue = (e) => {
    //     setSearchItemValue(e.target.value)
    // }

    return (
        <>
            {(loading) && <Loading />}
            {load ? <Loading /> : (
                <WhiteModalWrapper width="border-none text-black" className="items-start">
                    {/*this is the modal title section*/}
                    <ModalTitle className="text-blue-100 bold text-xl" title={`アイテム管理：${instituteName}`} />
                    <Formik
                        validateOnChange={false}
                        validateOnBlur={false}
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, handleSubmit }) => {
                            const first = Object.keys(errors)[0];
                            return (
                                <>
                                    <div className="relative w-full h-full">
                                        <Form>
                                            <div className="-mt-4" id="scroller"></div>
                                            <FormBodyContainer className="!px-0">
                                                <div>
                                                    <InputContainer>
                                                        <SelectBox
                                                            label="他の施設のアイテム状態を複製する"
                                                            inputClassName="bg-blue-25 text-blue-100"
                                                            labelClassName="text-blue-100"
                                                            name="eventInstituteId"
                                                            onChange={handleChangeInstitute}
                                                        >
                                                            <option key="default" value="">
                                                                アイテムを複製する施設を選択してください
                                                            </option>
                                                            {eventInstituteList.length > 0 &&
                                                                eventInstituteList.map((instituteList) => (
                                                                    <option
                                                                        value={instituteList.id}
                                                                        key={instituteList.id}
                                                                    >
                                                                        {instituteList.text}
                                                                    </option>
                                                                ))}
                                                        </SelectBox>
                                                    </InputContainer>
                                                    <InputContainer>
                                                        <TextBox
                                                            label={"表示条件（アイテム名・管理名）"}
                                                            labelClassName="text-blue-100"
                                                            inputClassName="bg-blue-25 mb-4"
                                                            type="text"
                                                            name="itemNameSearch"
                                                            placeholder={"表示条件（アイテム名・管理名）"}
                                                            value={searchItemNameValue}
                                                            onChange={itemNameSearchHandler}
                                                        // onBlur={itemNameSearchHandler}
                                                        />

                                                        <div className="flex justify-between">
                                                            <label className="text-blue-100">アイテム名</label>
                                                            <label className="text-blue-100">削除</label>
                                                        </div>
                                                        {dragList.length > 0 &&
                                                            dragList.map((dL, i) => (
                                                                <ExpandRowV2
                                                                    rowsLabel={dL.Name}
                                                                    item={dL}
                                                                    itemConditions={itemConditions}
                                                                    key={i}
                                                                    itemOptions={itemOptions}
                                                                    deleteFormFType={deleteFormFType}
                                                                    extendFormType={'eventItem'}
                                                                    pathName={pathName}
                                                                    selectedItemConditionsArr={
                                                                        dL.selectedItemConditions
                                                                    }
                                                                    selectedItemOptions={dL.selectedItemOptions}
                                                                    itemConditionChange={itemConditionChange}
                                                                    itemConditionChangeAmount={
                                                                        itemConditionChangeAmount
                                                                    }
                                                                    sessionStorageKey={selectedEventItemSessionKey}
                                                                    // handleSubmit from function passed
                                                                    handleSubmit={handleSubmit}
                                                                    amountValue={amountValue}
                                                                    setAmountValue={setAmountValue}
                                                                    searchItemNameValue={searchItemNameValue} // Optional :: Required sor search
                                                                    setDragList={setDragList}
                                                                    dragList={dragList}
                                                                />
                                                            ))}
                                                        <ButtonTypeFV2
                                                            placeholder="アイテム追加"
                                                            buttonData={buttonType.buttonData}
                                                            addFromFType={addFromFType}
                                                            optionValue={optionValue}
                                                            disableFButton={disableFButton}
                                                            setDisableFButton={setDisableFButton}
                                                            searchItemNameValue={searchItemNameValue} // Optional :: Required sor search
                                                        />
                                                    </InputContainer>
                                                    <InputContainer>
                                                        <label className="text-blue-100">同時選択必須グループ</label>
                                                        {countTagBox1.length > 0 &&
                                                            countTagBox1.map((ctb, i) => (
                                                                <div key={'ctb1' + i}>
                                                                    <div className="w-full flex">
                                                                        <div className="w-full">
                                                                            <InputContainer>
                                                                                {/* <h1>TagBox ID : {ctb.ID}</h1> */}
                                                                                <TagBoxComponentV1
                                                                                    key={'tag_box1' + i}
                                                                                    count={'tag_box1_' + ctb.ID}
                                                                                    dragList={dragList}
                                                                                    preDefineTagBoxValue={
                                                                                        ctb.selectedDrag
                                                                                    }
                                                                                    functionMode={functionMode}
                                                                                    pathName={pathName}
                                                                                    // Fixing selected tagBoxIssue
                                                                                    countTagBox1={countTagBox1}
                                                                                    setCoutTagBox1={setCoutTagBox1}
                                                                                    countTagBox={ctb}
                                                                                    id={ctb.ID}
                                                                                />
                                                                            </InputContainer>
                                                                        </div>
                                                                        <div className="pl-4 flex">
                                                                            <button
                                                                                onClick={() =>
                                                                                    deleteTagBox1(
                                                                                        ctb.ID,
                                                                                        ctb,
                                                                                        i,
                                                                                        countTagBox1
                                                                                    )
                                                                                }
                                                                                type="button"
                                                                                className="hover:text-blue-50 pb-4 cursor-pointer pr-2
                                                                                flex items-center text-blue-100"
                                                                            >
                                                                                <FaTrash />
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        <div className="pr-[38px] font-bold">
                                                            <AddButton
                                                                text="同時選択必須グループ追加"
                                                                onClick={addMoreTagBox1}
                                                                type="button"
                                                            />
                                                        </div>
                                                    </InputContainer>
                                                    <InputContainer>
                                                        <label className="text-blue-100">同時選択禁止グループ</label>
                                                        {countTagBox2.length > 0 &&
                                                            countTagBox2.map((ctb, i) => (
                                                                <div key={'ctb2' + i}>
                                                                    <div className="w-full flex">
                                                                        <div className="w-full">
                                                                            <InputContainer>
                                                                                <TagBoxComponentV1
                                                                                    key={'tag_box2' + i}
                                                                                    count={'tag_box2_' + ctb.ID}
                                                                                    dragList={dragList}
                                                                                    preDefineTagBoxValue={
                                                                                        ctb.selectedDrag
                                                                                    }
                                                                                    functionMode={functionMode}
                                                                                    pathName={pathName}
                                                                                    // fixing bug Linkon
                                                                                    countTagBox1={countTagBox2}
                                                                                    setCoutTagBox1={setCoutTagBox2}
                                                                                    countTagBox={ctb}
                                                                                    id={ctb.ID}
                                                                                />
                                                                            </InputContainer>
                                                                        </div>

                                                                        <div className="pl-4 flex">
                                                                            <button
                                                                                onClick={() => deleteTagBox2(ctb.ID)}
                                                                                type="button"
                                                                                className="hover:text-blue-50 pb-4 cursor-pointer pr-2
                                                                                    flex items-center text-blue-100"
                                                                            >
                                                                                <FaTrash />
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        <div className="pr-[38px] font-bold">
                                                            <AddButton
                                                                text="同時選択禁止グループ追加"
                                                                onClick={addMoreTagBox2}
                                                                type="button"
                                                            />
                                                        </div>
                                                    </InputContainer>
                                                    <InputContainer>
                                                        <EmployeeList
                                                            noDataText=""
                                                            customClass="item-management-treeview"
                                                            dragList={treeList}
                                                            dependencyRun={dragList}
                                                            functionMode={functionMode}
                                                            selectedEventItemTreeListSessionKey={
                                                                selectedEventItemTreeListSessionKey
                                                            }
                                                            selectedEventItemSessionKey={selectedEventItemSessionKey}
                                                        />
                                                    </InputContainer>
                                                </div>
                                                <ModalFormFooter
                                                    padding="!p-0"
                                                    btn_title1={`${formType === 'add' ? 'キャンセル' : '施設削除'}`}
                                                    btn_title2={`${formType === 'add' ? '保存' : '更新'}`}
                                                    formType={formType}
                                                    handleCancel={handleCancel}
                                                    setIsOverFlow={setIsOverflow}
                                                    memoClassName="!text-blue-100"
                                                >
                                                    {/* ----error---- */}
                                                    <ErrorMessage
                                                        className={`${errors[first]} ? "visible" : "invisible"`}
                                                    >
                                                        
                                                        {systemError &&
                                                            !errors[first] &&
                                                            `${errorMessages.E_SYSTEM_01}`}
                                                        {error && !errors[first] && `${errorMessages.E_SYSTEM_01}`}
                                                    </ErrorMessage>
                                                    <ErrorMessage
                                                        className={`${tagboxError} ? "visible" : "invisible"`}
                                                    >
{tagboxError}
                                                    </ErrorMessage>
                                                </ModalFormFooter>
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
export default EventItemModal;
