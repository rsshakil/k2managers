import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import InputContainer from '../Wrapper/InputContainer';
import TextBox from './FormInputs/TextBox';
import ToggleLock from './FormInputs/ToggleLock';

import { TagBox } from 'devextreme-react/tag-box';
import _ from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import SelectBox from './FormInputs/SelectBox';

import { DateBox } from 'devextreme-react';
import { locale } from 'devextreme/localization';
import { instance } from '../../services/axios';
import BlockModalFooter from '../AppDesignComponent/blockModals/BlockModalFooter';
import Note from '../Form/FormInputs/Note';
import AddRequiredMark from '../HelpingComponent/AddRequiredMark';
import ModalTitle from '../Modal/components/ModalTitle';
import WhiteModalWrapper from '../Modal/components/WhiteModalWrapper';

import Loading from '../../components/Loading/Loader';
import {
    baseURL,
    listCustomer,
    listEventCategory,
    listEventInstitute,
    listMethod,
    updateCustomerReservation,
    listCustomerViewTemplate,
    updateMethod,
} from '../../restapi/queries';
import { intToDateFormat, intToTimeFormat, intToTimeFormatForDB } from '../../utilities/commonFunctions';

const selectOptions = [
    { id: 0, value: '顧客一覧テンプレート名を選択してください' }, //7
    { id: 1, value: 'テキストエリア型' },
];

const CustomerEditForm = ({ initialValues, setModalOpen = () => {}, handleOnPressSave = () => {}, templateId }) => {
    const navigate = useNavigate();
    const processing = useRef(false);
    locale('ja-JP');
    const [loading, setLoading] = useState(true);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [systemError, setSystemError] = useState(false);
    const [formData, setFormData] = useState([]);
    const [customerEditTemplateObject, setCustomerEditTemplateObject] = useState([]);
    const [customerformField, setCustomerformField] = useState(false);

    const [newFormData, setNewFormData] = useState({
        CustomerField: [],
        Customer: [],
        Reservation: [],
    });
    const [eventCategoryIdList, setEventCategoryIdList] = useState([]);
    const [eventInstituteIdList, setEventInstituteIdList] = useState([]);
    const specialListField = ['eventCategoryId', 'eventInstituteId'];
    const refs = useRef([]);
    refs.current = [];

    const { info } = useSelector((state) => state.auth);
    const [error, setError] = useState({});
    const [requiredFieldListData, setRequiredFieldListData] = useState([]);
    const [dateBoxConfig, setDateBoxConfig] = useState({
        acceptCustomValue: false,
        interval: 1,
        now: new Date(),
        min: new Date(1800, 0, 1),
        max: new Date(2050, 0, 1),
    });
    const { customerId, eventId } = initialValues;
    const addToRefs = (el) => {
        if (el && !refs.current.includes(el)) {
            refs.current.push(el);
        }

        if (refs.current.length === customerEditTemplateObject.length) {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (customerformField && customerEditTemplateObject.length == 0) {
            setLoading(false);
        }
    }, [customerformField]);
    useEffect(() => {
        async function fetchCustomerInfo() {
            // setLoading(true);
            setSystemError(false);
            try {
                if (processing.current) return;
                processing.current = true;

                const pid = sessionStorage.getItem('currentProjectId');
                const viewENDPOINT = `${baseURL}${listCustomerViewTemplate}${templateId}?pid=${pid}`;
                const viewConfig = {
                    method: listMethod,
                    url: viewENDPOINT,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                };

                const viewResponse = await instance.request(viewConfig);

                const template = viewResponse?.data?.records?.find(template => template.customerViewTemplateId == templateId);


                const ENDPOINT = `${baseURL}${listCustomer}?pid=${pid}&customerId=${customerId}&eventId=${eventId}&templateId=${template.customerViewTemplateEditTemplateId}`;
                const config = {
                    method: listMethod,
                    url: ENDPOINT,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                };
                const response = await instance.request(config);
                let requiredList =
                    response?.data?.customerEditTemplateFieldList?.length > 0 &&
                    response?.data?.customerEditTemplateFieldList
                        .map((field) => {
                            if (field.requiredStatus && field.fieldModifyFlag == 1) {
                                return field.fieldId;
                            }
                        })
                        .filter((e) => typeof e !== 'undefined');
                setFormData(response?.data?.records[0]);
console.log("fieldItem response", response?.data?.records[0]);
                setCustomerEditTemplateObject(response?.data?.customerEditTemplateFieldList);
                setCustomerformField(true);
                setRequiredFieldListData(requiredList ?? []);
                setSystemError(false);
                // setLoading(false);
            } catch (error) {
                if (error?.response?.status === 409) {
                    setSystemError(false);
                } else {
                    setSystemError(true);
                }
                setLoading(false);
            }
            finally {
                processing.current = false;
            }
        }

        async function fetchEventCategoryInfo() {
            setSystemError(false);
            try {
                const pid = sessionStorage.getItem('currentProjectId');
                const ENDPOINT = `${baseURL}${listEventCategory}?eid=${eventId}&pid=${pid}`;
                const config = { method: listMethod, url: ENDPOINT };
                const response = await instance.request(config);
                if (response.data?.records?.length > 0) {
                    let itemListArr = [];
                    response.data.records.forEach((item) => {
                        let newItem = {};
                        newItem.fieldListCode = item.eventCategoryId;
                        newItem.text = item.eventCategoryName ? item.eventCategoryName : item.categoryName;
                        itemListArr.push(newItem);
                    });
                    setEventCategoryIdList(itemListArr);
                }
                setSystemError(false);
            } catch (error) {
                if (error?.response?.status === 409) {
                    setSystemError(false);
                } else {
                    setSystemError(true);
                }
                // setLoading(false);
            }
        }

        async function fetchEventInstituteInfo() {
            // setLoading(true);
            setSystemError(false);
            try {
                const pid = sessionStorage.getItem('currentProjectId');
                const ENDPOINT = `${baseURL}${listEventInstitute}?eid=${eventId}&pid=${pid}`;
                const config = { method: listMethod, url: ENDPOINT };
                const response = await instance.request(config);
                if (response.data?.records?.length > 0) {
                    let itemListArr = [];
                    response.data.records.forEach((item) => {
                        let newItem = {};
                        newItem.fieldListCode = item.eventInstituteId;
                        newItem.text = item.eventInstituteName ? item.eventInstituteName : item.instituteName;
                        itemListArr.push(newItem);
                    });
                    setEventInstituteIdList(itemListArr);
                    // setLoading(false);
                }
                setSystemError(false);
                // setLoading(false);
            } catch (error) {
                if (error?.response?.status === 409) {
                    setSystemError(false);
                } else {
                    setSystemError(true);
                }
            }
        }

        fetchEventCategoryInfo();
        fetchEventInstituteInfo();
        fetchCustomerInfo();
    }, []);

    function handleOnchange(e) {
        let name = e.target.name;
        let value = e.target.value;
        const fieldName = e.target.getAttribute('fieldName');
        const fieldIdValue = +e.target.getAttribute('fieldId');
        const fieldGroupIdValue = +e.target.getAttribute('fieldGroupId');
        const fieldTypeValue = +e.target.getAttribute('fieldType');
        const fieldTable = e.target.getAttribute('fieldTableName');
        const fieldStyle = e.target.getAttribute('fieldStyle');
        // if (fieldTypeValue == 4) {
        //     if (value == 'true' || value == 'false') {
        //         value = value == 'true' ? 1 : 0;
        //     } else {
        //         value = value ? 1 : 0;
        //     }
        // }
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        if (fieldTable == 'CustomerField') {
            switch (fieldTypeValue) {
                case 0:
                case 1:
                case 2:
                    //text
                    name = 'customerFieldText';
                    break;
                case 3:
                    //list
                    name = 'customerFieldList';
                    break;
                case 4:
                    //bool
                    name = 'customerFieldBoolean';
                    break;
                case 5:
                case 6:
                case 7:
                    //int
                    name = 'customerFieldInt';
                    break;
            }
        }
        let newObject = {
            fieldGroupId: fieldGroupIdValue,
            fieldType: fieldTypeValue,
            fieldId: fieldIdValue,
            fieldKey: name,
            fieldName: fieldName,
            fieldValue: value,
            fieldStyle: fieldStyle,
        };
        let newData = [];
        if (newFormData[fieldTable]?.length > 0) {
            _.remove(newFormData[fieldTable], { fieldId: fieldIdValue });
            newData = [...newFormData[fieldTable], newObject];
        } else {
            newData = [newObject];
        }

        setNewFormData((prevState) => ({
            ...prevState,
            [fieldTable]: newData,
        }));
    }
    const getFieldName = (fieldInfo) => {
        let fNames = '';
        if (fieldInfo?.projectId != 0) {
            fNames = fieldInfo?.fieldCode ?? '';
        } else {
            let fieldName = fieldInfo?.fieldColumnName ?? '';
            if (fieldName != '') {
                if (fieldName.includes(' AS ')) {
                    fNames = fieldName.split(' AS ')[1];
                    fNames = fNames.replace(/"|'/g, '');
                } else {
                    fNames = fieldName.includes('.') ? fieldName.split('.')[1] : fieldInfo?.fieldCode;
                }
            } else {
                fNames = fieldInfo?.fieldCode;
            }
        }
        return fNames.trim();
    };

    const getFieldName2 = (fieldInfo) => {

    }

    const getFieldTableName = (fieldInfo) => {
        if (fieldInfo?.projectId !== 0) {
            return 'CustomerField';
        } else {
            let fieldName = fieldInfo?.fieldColumnName ?? '';
            if (fieldName != '') {
                let tableName = fieldName.includes('.') ? fieldName.split('.')[0] : 'CustomerField';
                tableName = tableName.trimEnd().split(' ').pop();
                return tableName;
            } else {
                return 'CustomerField';
            }
        }
    };

    function handleOnChangeTags(e, fieldInfo) {
        const { addedItems = [], removedItems = [] } = e;
        console.log('removedItems',removedItems);
        console.log('removedItems.length',removedItems.length);
        if (addedItems.length > 0 || removedItems.length > 0) {
            let fieldIdValue = fieldInfo?.fieldId;
            let fieldGroupIdValue = fieldInfo?.fieldGroupId;
            let fieldTypeValue = fieldInfo?.fieldType;
            let name = '';
            let fieldTable = '';
            if (fieldInfo?.projectId != 0) {
                name = fieldInfo?.fieldCode;
                fieldTable = 'CustomerField';
            } else {
                let fieldName = fieldInfo?.fieldColumnName ?? '';
                if (fieldName != '') {
                    name = fieldName.includes('.') ? fieldName.split('.')[1] : fieldInfo?.fieldCode;
                    fieldTable = fieldName.includes('.') ? fieldName.split('.')[0] : 'CustomerField';
                } else {
                    name = fieldInfo?.fieldCode;
                    fieldTable = 'CustomerField';
                }
            }
            let updatedTagItems = formData[name] ?? [];
            if (addedItems.length > 0) {
                updatedTagItems = [...updatedTagItems, addedItems[0].fieldListCode];
            }
            
            if (removedItems.length > 0) {
                updatedTagItems = updatedTagItems.filter(
                    (x) => { 
                        if (x.hasOwnProperty("id")) { 
                            return !removedItems.filter((y) => y.fieldListCode === x?.id).length
                        } else {
                            return !removedItems.filter((y) => y.fieldListCode === x).length
                        }
                    }
                );
            }

            updatedTagItems = _.uniq(updatedTagItems);
            console.log('updatedTagItems',updatedTagItems);
            setFormData((prevState) => ({
                ...prevState,
                [name]: updatedTagItems,
            }));
            if (fieldTable == 'CustomerField') {
                switch (fieldTypeValue) {
                    case 0:
                    case 1:
                    case 2:
                        //text
                        name = 'customerFieldText';
                        break;
                    case 3:
                        //list
                        name = 'customerFieldList';
                        break;
                    case 4:
                        //bool
                        name = 'customerFieldBoolean';
                        break;
                    case 5:
                    case 6:
                    case 7:
                        //int
                        name = 'customerFieldInt';
                        break;
                }
            }
            let newObject = {
                fieldGroupId: fieldGroupIdValue,
                fieldType: fieldTypeValue,
                fieldId: fieldIdValue,
                fieldKey: name,
                fieldName: fieldInfo.fieldName,
                fieldValue: updatedTagItems,
                fieldStyle: fieldInfo.fieldStyle,
            };
            let newData = [];
            if (newFormData[fieldTable]?.length > 0) {
                _.remove(newFormData[fieldTable], { fieldId: fieldIdValue });
                newData = [...newFormData[fieldTable], newObject];
            } else {
                newData = [newObject];
            }

            setNewFormData((prevState) => ({
                ...prevState,
                [fieldTable]: newData,
            }));
        }
    }


    // リスト型アイテムの表示
    function selectBoxReadOnlyValuePrepare(fieldItem) {
        // value の取得
        let existsItemCodeList = formData[fieldItem?.fieldCode] ?? [];

        // フィールド情報の取得
        let filterItems =
            fieldItem?.fieldStyle?.lookup?.length > 0 &&
            fieldItem?.fieldStyle?.lookup.filter((fStyle) => existsItemCodeList.includes(fStyle?.fieldListCode));
        // フィールドにアイテムが存在する場合（都道府県など）
        if (filterItems) {
            let selecedValues = filterItems.length > 0 && filterItems.map((fStyle) => fStyle?.inputBox2?.value);
            let valuesData = selecedValues.length > 1 ? selecedValues.join(', ') : selecedValues[0];
            return valuesData;
        }
        // フィールドにアイテムがないリスト型の場合
        else {
            let valuesData
            if (existsItemCodeList.length >= 1) {
                console.log('existsItemCodeList',existsItemCodeList);
                console.log('existsItemCodeList typeof', typeof existsItemCodeList);
                if (typeof existsItemCodeList == 'string') {
                    valuesData = existsItemCodeList;
                } else {
                    valuesData = existsItemCodeList.join(', '); 
                }
                
            }
            else {
                valuesData = ""
            }
            return valuesData;
        }
    }

    const onOptionChanged = (e) => {},
        onChangeHandle = (e) => {},
        onValueChangedHandleSD = (e, fieldInfo) => {
            if (typeof e.event !== 'undefined') {
                let value = e.value ?? '1800/01/01';
                let fieldIdValue = fieldInfo?.fieldId;
                let fieldGroupIdValue = fieldInfo?.fieldGroupId;
                let fieldTypeValue = fieldInfo?.fieldType;
                let name = getFieldName(fieldInfo);
                let fieldTable = getFieldTableName(fieldInfo);
                let updatedValue = formData[name] ?? '';

                setFormData((prevState) => ({
                    ...prevState,
                    [name]: value == '1800/01/01' ? undefined : Math.floor(new Date(value).getTime() / 1000),
                }));

                if (fieldTable == 'CustomerField') {
                    switch (fieldTypeValue) {
                        case 0:
                        case 1:
                        case 2:
                            //text
                            name = 'customerFieldText';
                            break;
                        case 3:
                            //list
                            name = 'customerFieldList';
                            break;
                        case 4:
                            //bool
                            name = 'customerFieldBoolean';
                            break;
                        case 5:
                        case 6:
                        case 7:
                            //int
                            name = 'customerFieldInt';
                            break;
                    }
                }
                value = value != '1800/01/01' ? Math.floor(new Date(value).getTime() / 1000) : '';

                let newObject = {
                    fieldGroupId: fieldGroupIdValue,
                    fieldType: fieldTypeValue,
                    fieldId: fieldIdValue,
                    fieldKey: name,
                    fieldName: fieldInfo.fieldName,
                    fieldValue: value,
                    fieldStyle: fieldInfo.fieldStyle,
                };
                let newData = [];
                if (newFormData[fieldTable]?.length > 0) {
                    _.remove(newFormData[fieldTable], { fieldId: fieldIdValue });
                    newData = [...newFormData[fieldTable], newObject];
                } else {
                    newData = [newObject];
                }

                setNewFormData((prevState) => ({
                    ...prevState,
                    [fieldTable]: newData,
                }));
            }
        },
        onValueChangedHandleTM = (e, fieldInfo) => {
            if (typeof e.event !== 'undefined') {
                let value = e.value ?? '1800/01/01';
                let fieldIdValue = fieldInfo?.fieldId;
                let fieldGroupIdValue = fieldInfo?.fieldGroupId;
                let fieldTypeValue = fieldInfo?.fieldType;
                let name = getFieldName(fieldInfo);
                let fieldTable = getFieldTableName(fieldInfo);
                let updatedValue = formData[name] ?? '';

                setFormData((prevState) => ({
                    ...prevState,
                    [name]: value == '1800/01/01' ? undefined : formatToDevextremeTime(e.value),
                }));

                if (fieldTable == 'CustomerField') {
                    switch (fieldTypeValue) {
                        case 0:
                        case 1:
                        case 2:
                            //text
                            name = 'customerFieldText';
                            break;
                        case 3:
                            //list
                            name = 'customerFieldList';
                            break;
                        case 4:
                            //bool
                            name = 'customerFieldBoolean';
                            break;
                        case 5:
                        case 6:
                        case 7:
                            //int
                            name = 'customerFieldInt';
                            break;
                    }
                }
                value = value != '1800/01/01' ? intToTimeFormatForDB(e.value) : '';

                let newObject = {
                    fieldGroupId: fieldGroupIdValue,
                    fieldType: fieldTypeValue,
                    fieldId: fieldIdValue,
                    fieldKey: name,
                    fieldName: fieldInfo.fieldName,
                    fieldValue: value,
                };
                let newData = [];
                if (newFormData[fieldTable]?.length > 0) {
                    _.remove(newFormData[fieldTable], { fieldId: fieldIdValue });
                    newData = [...newFormData[fieldTable], newObject];
                } else {
                    newData = [newObject];
                }

                setNewFormData((prevState) => ({
                    ...prevState,
                    [fieldTable]: newData,
                }));
            }
        };

    function formatToDevextremeTime(value) {
        if (value) {
            if (typeof value == 'string' && value.includes(':')) {
                let time = '2023/01/01 ' + value + ':01';
                return Math.floor(new Date(time).getTime());
            } else {
                let valueLenth = value.toString();
                if (valueLenth.length > 4) {
                    return Math.floor(new Date(value).getTime());
                } else {
                    let result = valueLenth.padStart(4, '0');
                    result = result.slice(0, 2) + ':' + result.slice(2);
                    let timesValue = '2023/01/01 ' + result + ':01';

                    return Math.floor(new Date(timesValue).getTime());
                }
            }
        } else {
            return undefined;
        }
    }

    function getListData(listValue) {
        let listShapeValue = [];
        if (listValue && listValue.length >= 1) {
            for (let i = 0; i < listValue.length; i++) {
                let row = listValue[i];
                if (Object.keys(row).indexOf('id') !== -1 && Object.keys(row).indexOf('checked') !== -1) {
                    listShapeValue.push(String(row.id));
                }
                else {
                    listShapeValue.push(String(row));
                }
            }
        }
        const listShapeValue2 = Array.from(new Set(listShapeValue))
console.log("listShapeValue2", listShapeValue2)
        if (listShapeValue2.length >= 1) {
            return listShapeValue2;
        }
        else {
            return "";
        }
    }



    const addFieldByFieldType = (fieldItem) => {
        switch (parseInt(fieldItem.fieldType)) {
            case 0:
            case 2:
                return (
                    <InputContainer>
                        <TextBox
                            label={fieldItem?.fieldName}
                            name={getFieldName(fieldItem)}
                            labelClassName="text-blue-100"
                            inputClassName={`${
                                fieldItem?.fieldModifyFlag == 0
                                    ? 'bg-gray-300 cursor-default pointer-events-none'
                                    : 'bg-blue-25'
                            }`}
                            placeholder=""
                            fieldId={fieldItem?.fieldId}
                            fieldName={fieldItem?.fieldName}
                            fieldGroupId={fieldItem?.fieldGroupId}
                            fieldType={fieldItem?.fieldType}
                            fieldTableName={getFieldTableName(fieldItem)}
                            readOnly={fieldItem?.fieldModifyFlag == 0}
                            isRequired={fieldItem?.fieldModifyFlag == 1 && fieldItem?.requiredStatus}
                        />
                    </InputContainer>
                );
            case 7:
                return (
                    <InputContainer>
                        <TextBox
                            label={fieldItem?.fieldName}
                            name={getFieldName(fieldItem)}
                            type='number'
                            labelClassName="text-blue-100"
                            inputClassName={`${
                                fieldItem?.fieldModifyFlag == 0
                                    ? 'bg-gray-300 cursor-default pointer-events-none'
                                    : 'bg-blue-25'
                            }`}
                            placeholder=""
                            fieldId={fieldItem?.fieldId}
                            fieldName={fieldItem?.fieldName}
                            fieldGroupId={fieldItem?.fieldGroupId}
                            fieldType={fieldItem?.fieldType}
                            fieldTableName={getFieldTableName(fieldItem)}
                            readOnly={fieldItem?.fieldModifyFlag == 0}
                            isRequired={fieldItem?.fieldModifyFlag == 1 && fieldItem?.requiredStatus}
                        />
                    </InputContainer>
                );
            case 1:
                return (
                    <InputContainer>
                        <Note
                            label={fieldItem?.fieldName}
                            name={getFieldName(fieldItem)}
                            labelClassName={`text-white !text-blue-100`}
                            inputClassName={`${
                                fieldItem?.fieldModifyFlag == 0
                                    ? 'bg-gray-300 cursor-default pointer-events-none'
                                    : 'bg-blue-25'
                            }`}
                            type="text"
                            fieldId={fieldItem?.fieldId}
                            fieldName={fieldItem?.fieldName}
                            fieldGroupId={fieldItem?.fieldGroupId}
                            fieldType={fieldItem?.fieldType}
                            fieldTableName={getFieldTableName(fieldItem)}
                            readOnly={fieldItem?.fieldModifyFlag == 0}
                            isRequired={fieldItem?.fieldModifyFlag == 1 && fieldItem?.requiredStatus}
                            placeholder={fieldItem?.fieldName}
                        />
                    </InputContainer>
                );

            case 3:
                return (
                    <>
                        {fieldItem?.fieldModifyFlag == 0 && (
                            <InputContainer>
                                <TextBox
                                    label={fieldItem?.fieldName}
                                    name={fieldItem?.fieldCode}
                                    labelClassName="text-blue-100"
                                    inputClassName={`bg-gray-300 cursor-default pointer-events-none`}
                                    placeholder=""
                                    fieldId={fieldItem?.fieldId}
                                    fieldName={fieldItem?.fieldName}
                                    fieldGroupId={fieldItem?.fieldGroupId}
                                    fieldType={fieldItem?.fieldType}
                                    fieldTableName={getFieldTableName(fieldItem)}
                                    value={selectBoxReadOnlyValuePrepare(fieldItem)}
                                    readOnly
                                />
                            </InputContainer>
                        )}
                        {fieldItem?.fieldModifyFlag == 1 && (
                            <>
{/* {console.log("fieldItem---3_1", fieldItem)} */}
                                <InputContainer>
                                    <label className="text-blue-100">
                                        {fieldItem?.fieldName}{' '}
                                        {fieldItem?.requiredStatus ? <span class="text-orange-300">※</span> : ''}
                                    </label>
                                    {specialListField.includes(getFieldName(fieldItem)) ? (
                                        <>
                                            {getFieldName(fieldItem) == 'eventCategoryId' ? (
                                                <>
                                                    {/* eventCategoryIdの場合 */}
                                                    <TagBox
                                                        name={getFieldName(fieldItem)}
                                                        dataSource={eventCategoryIdList}
                                                        value={formData[getFieldName(fieldItem)]}
                                                        displayExpr="text"
                                                        valueExpr="fieldListCode"
                                                        onSelectionChanged={(e) => handleOnChangeTags(e, fieldItem)}
                                                        noDataText="データがありません"
                                                        selectAllText="すべて選択する"
                                                        placeholder={fieldItem?.fieldName}
                                                        isRequired={fieldItem?.requiredStatus}
                                                    />
                                                </>
                                            ) : (
                                                <>
                                                    {/* eventInstituteIdの場合 */}
                                                    <TagBox
                                                        name={getFieldName(fieldItem)}
                                                        dataSource={eventInstituteIdList}
                                                        value={formData[getFieldName(fieldItem)]}
                                                        displayExpr="text"
                                                        valueExpr="fieldListCode"
                                                        onSelectionChanged={(e) => handleOnChangeTags(e, fieldItem)}
                                                        noDataText="データがありません"
                                                        selectAllText="すべて選択する"
                                                        placeholder={fieldItem?.fieldName}
                                                        isRequired={fieldItem?.requiredStatus}
                                                    />
                                                </>
                                            )}
                                        </>
                                    ) : (
                                        <>
{/* {console.log("fieldItem---3_2", fieldItem) } */}
{console.log("fieldItem---3_1", fieldItem?.fieldStyle?.lookup)}
                                            <TagBox
                                                name={getFieldName(fieldItem)}
                                                dataSource={fieldItem?.fieldStyle?.lookup}
                                                value={getListData(formData[getFieldName(fieldItem)])}
                                                displayExpr={(data) => data?.inputBox2?.value}
                                                valueExpr="fieldListCode"
                                                onSelectionChanged={(e) => handleOnChangeTags(e, fieldItem)}
                                                noDataText="データがありません"
                                                selectAllText="すべて選択する"
                                                placeholder={fieldItem?.fieldName}
                                                isRequired={fieldItem?.requiredStatus}
                                            />
                                        </>
                                    )}
                                </InputContainer>
                            </>
                        )}
                    </>
                );

            case 4:
 console.log("fieldItem---4 bool not showing", fieldItem);
                return (
                    <>
                        {fieldItem?.fieldModifyFlag == 0 && (
                            <InputContainer>
                                <TextBox
                                    label={fieldItem?.fieldName}
                                    name={getFieldName(fieldItem)}
                                    labelClassName="text-blue-100"
                                    inputClassName={`bg-gray-300 cursor-default pointer-events-none`}
                                    placeholder=""
                                    fieldId={fieldItem?.fieldId}
                                    fieldName={fieldItem?.fieldName}
                                    fieldGroupId={fieldItem?.fieldGroupId}
                                    fieldType={fieldItem?.fieldType}
                                    value={
                                        formData[getFieldName(fieldItem)] === null
                                            ? ''
                                            : formData[getFieldName(fieldItem)] == 1
                                            ? fieldItem?.fieldStyle?.trueText
                                            : fieldItem?.fieldStyle?.falseText
                                    }
                                    readOnly
                                />
                            </InputContainer>
                        )}
                        {fieldItem?.fieldModifyFlag == 1 && (
                            <InputContainer>
                                {/* <ToggleLock
                                    label={fieldItem?.fieldName}
                                    labelClassName="text-blue-100"
                                    name={fieldItem?.fieldCode}
                                    inputClassName=""
                                    type="checkbox"
                                    textLeft={fieldItem?.fieldStyle?.trueText}
                                    textRight={fieldItem?.fieldStyle?.falseText}
                                    fieldId={fieldItem?.fieldId}
                                    fieldName={fieldItem?.fieldName}
                                    fieldGroupId={fieldItem?.fieldGroupId}
                                    fieldType={fieldItem?.fieldType}
                                    fieldTableName={getFieldTableName(fieldItem)}
                                    isRequired={fieldItem?.requiredStatus}
                                /> */}
                                <SelectBox
                                    label={fieldItem?.fieldName}
                                    labelClassName='text-blue-100'
                                    inputClassName='bg-blue-25'
                                    name={fieldItem?.fieldCode}
                                    onChange={handleOnchange}
                                    fieldId={fieldItem?.fieldId}
                                    fieldGroupId={fieldItem?.fieldGroupId}
                                    fieldType={fieldItem?.fieldType}
                                    fieldName={fieldItem?.fieldName}
                                    fieldTableName={getFieldTableName(fieldItem)}
                                    isRequired={fieldItem?.requiredStatus}>
                                        <option value=''>未選択</option>
                                        <option value={1}>{fieldItem?.fieldStyle?.trueText}</option>
                                        <option value={0}>{fieldItem?.fieldStyle?.falseText}</option>
                                
                                </SelectBox>
                            </InputContainer>
                        )}
                    </>
                );
            case 5:
                return (
                    <>
                        {fieldItem?.fieldModifyFlag == 0 && (
                            <InputContainer>
                                <TextBox
                                    label={fieldItem?.fieldName}
                                    name={fieldItem?.fieldCode}
                                    labelClassName="text-blue-100"
                                    inputClassName={`bg-gray-300 cursor-default pointer-events-none`}
                                    placeholder=""
                                    value={intToDateFormat(formData[fieldItem?.fieldCode] ?? '')}
                                    readOnly
                                />
                            </InputContainer>
                        )}
                        {fieldItem?.fieldModifyFlag == 1 && (
                            <InputContainer>
                                <label className="text-blue-100">
                                    {fieldItem?.fieldName} {fieldItem?.requiredStatus ? <AddRequiredMark /> : null}
                                </label>
                                <div className="dx-field-value bg-blue-25 border border-blue-100 text-blue-50 ellipsis cursor-pointer devExtreameDateTimePicker cdx-DateBox">
                                    <DateBox
                                        name={getFieldName(fieldItem)}
                                        value={
                                            formData[getFieldName(fieldItem)]
                                                ? formData[getFieldName(fieldItem)] * 1000
                                                : undefined
                                        }
                                        fullName={getFieldName(fieldItem)}
                                        inputAttr={{ id: getFieldName(fieldItem) }}
                                        elementAttr={{ id: getFieldName(fieldItem) }}
                                        min={dateBoxConfig.min}
                                        max={dateBoxConfig.max}
                                        acceptCustomValue={dateBoxConfig.acceptCustomValue}
                                        onChange={onChangeHandle}
                                        onValueChanged={(e) => onValueChangedHandleSD(e, fieldItem)}
                                        placeholder={fieldItem?.fieldName}
                                        onOptionChanged={onOptionChanged}
                                        showClearButton={true}
                                        showTodayButton={true}
                                        openOnFieldClick={true}
                                        applyButtonText="OK"
                                        applyValueMode="instantly"
                                        type="date"
                                    />
                                </div>
                            </InputContainer>
                        )}
                    </>
                );
            case 6:
                return (
                    <>
                        {fieldItem?.fieldModifyFlag == 0 && (
                            <InputContainer>
                                <TextBox
                                    label={fieldItem?.fieldName}
                                    name={fieldItem?.fieldCode}
                                    labelClassName="text-blue-100"
                                    inputClassName={`bg-gray-300 cursor-default pointer-events-none`}
                                    value={intToTimeFormat(formData[fieldItem?.fieldCode] ?? '')}
                                    readOnly
                                />
                            </InputContainer>
                        )}
                        {fieldItem?.fieldModifyFlag == 1 && (
                            <InputContainer>
                                <label className="text-blue-100">
                                    {fieldItem?.fieldName} {fieldItem?.requiredStatus ? <AddRequiredMark /> : null}
                                </label>
                                <div className="dx-field-value bg-blue-25 border border-blue-100 text-blue-50 ellipsis cursor-pointer devExtreameDateTimePicker cdx-DateBox">
                                    <DateBox
                                        name={getFieldName(fieldItem)}
                                        value={formatToDevextremeTime(formData[getFieldName(fieldItem)] ?? '')}
                                        fullName={getFieldName(fieldItem)}
                                        inputAttr={{ id: getFieldName(fieldItem) }}
                                        elementAttr={{ id: getFieldName(fieldItem) }}
                                        min={dateBoxConfig.min}
                                        max={dateBoxConfig.max}
                                        acceptCustomValue={dateBoxConfig.acceptCustomValue}
                                        onChange={onChangeHandle}
                                        onValueChanged={(e) => onValueChangedHandleTM(e, fieldItem)}
                                        placeholder={fieldItem?.fieldName}
                                        onOptionChanged={onOptionChanged}
                                        showClearButton={true}
                                        showTodayButton={true}
                                        openOnFieldClick={true}
                                        applyButtonText="OK"
                                        applyValueMode="instantly"
                                        interval={dateBoxConfig.interval}
                                        type="time"
                                        pickerType="list"
                                    />
                                </div>
                            </InputContainer>
                        )}
                    </>
                );
                break;
        }
    };
    async function handleOnPressSaveInnerModal(e, formDataForValidation) {
        setUpdateLoading(true);
        const { CustomerField, Customer, Reservation } = formDataForValidation;
        let customerValidateFieldList = Customer.length > 0 && Customer.map((field) => field.fieldId);
        customerValidateFieldList = customerValidateFieldList.length > 0 ? customerValidateFieldList : [];
        let customerFieldValidateFieldList = CustomerField.length > 0 && CustomerField.map((field) => field.fieldId);
        customerFieldValidateFieldList =
            customerFieldValidateFieldList.length > 0 ? customerFieldValidateFieldList : [];
        let reservationValidateFieldList = Reservation.length > 0 && Reservation.map((field) => field.fieldId);
        reservationValidateFieldList = reservationValidateFieldList.length > 0 ? reservationValidateFieldList : [];

        let validateFieldIdList = [
            ...customerValidateFieldList,
            ...customerFieldValidateFieldList,
            ...reservationValidateFieldList,
        ];
        let allFounded =
            requiredFieldListData?.length > 0 &&
            requiredFieldListData
                .map((ai) => {
                    let filedRow = customerEditTemplateObject.find((item) => item.fieldId == ai);
                    let name = getFieldName(filedRow);
                    let formValueByKey = formData[name] ?? '';

                    if (formValueByKey != '') {
                    } else {
                        if (formValueByKey === 0) {
                        } else {
                            return ai;
                        }
                    }
                })
                .filter((e) => typeof e != 'undefined');
                console.log('allFounded',allFounded);
                console.log('newFormData',newFormData);
                console.log('formData',formData);
        if (allFounded===false || allFounded?.length == 0) {
            setLoading(true);
            setSystemError(false);
            let formDataForUpdate = {};
            const pid = sessionStorage.getItem('currentProjectId');
            formDataForUpdate.updateFieldList = newFormData;
            formDataForUpdate.formData = formData;
            formDataForUpdate.projectId = pid;
            formDataForUpdate.customerId = initialValues.customerId;
            formDataForUpdate.eventId = initialValues.eventId;
            formDataForUpdate.reservationId = initialValues.reservationId;
            formDataForUpdate.updatedBy = info.accountId;
            if (processing.current) return;
            processing.current = true;
            try {
                const ENDPOINT = `${baseURL}${updateCustomerReservation}${initialValues.customerId}`;
                const config = { method: updateMethod, url: ENDPOINT, data: formDataForUpdate };
                const copied = await instance.request(config);

                if (copied) {
                    setSystemError(false);
                    setLoading(false);
                    setModalOpen(false);
                    navigate('/customer_list');
                }
            } catch (error) {
                if (error.response.status === 409) {
                    setSystemError(false);
                } else {
                    setSystemError(true);
                }
                setLoading(false);
            } finally {
                processing.current = false;
                setLoading(false);
            }
        } else {
            setError({ err: 'すべての必須フィールドに入力してください' });
        }
        setUpdateLoading(false);
    }
    const handleCancel = () => {
        setError({});
        setModalOpen(false);
    };
    return (
        <>
            {loading && <Loading />}
            {updateLoading && <Loading />}
            <WhiteModalWrapper width="border-none text-black" className="items-start">
                <ModalTitle title="顧客編集" className="text-blue-100 text-xl" />

                <Formik enableReinitialize={true} initialValues={formData}>
                    <div className="relative w-full h-full">
                        <Form onChange={handleOnchange}>
                            <div className="body-height3 pt-12 px-10 min-h-[calc(100vh-452px)] !p-0">
                                <div className="flex flex-col py-10">
                                    <InputContainer>
                                        <TextBox
                                            label="イベント名"
                                            name="eventName"
                                            labelClassName="text-blue-100"
                                            inputClassName={`bg-gray-300 cursor-default pointer-events-none`}
                                            placeholder=""
                                        />
                                    </InputContainer>
                                    {customerEditTemplateObject?.length > 0 &&
                                        customerEditTemplateObject.map((fieldItem, index) => (
                                            <>
                                                <div key={index} ref={addToRefs}>
                                                    {addFieldByFieldType(fieldItem)}
                                                </div>
                                            </>
                                        ))}
                                </div>
                            </div>

                            <BlockModalFooter
                                memoFieldShow={false}
                                errors={error}
                                setModalOpen={handleCancel}
                                handleOnPressSave={(e) => handleOnPressSaveInnerModal(e, newFormData)}
                            />
                        </Form>
                    </div>
                </Formik>
            </WhiteModalWrapper>
        </>
    );
};
export default CustomerEditForm;
