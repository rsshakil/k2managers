import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import AddRequiredMark from '../HelpingComponent/AddRequiredMark';
import InputContainer from '../Wrapper/InputContainer';
import TextBox from './FormInputs/TextBox';
import ToggleLock from './FormInputs/ToggleLock';

import { TagBox } from 'devextreme-react/tag-box';
import _ from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import SelectBox from './FormInputs/SelectBox';

import { DateBox } from 'devextreme-react';
import { locale } from 'devextreme/localization';
import { useSelector } from 'react-redux';
import Loading from '../../components/Loading/Loader';
import {
    baseURL,
    createMethod,
    customerEditTemplateRead,
    updateCustomerReservation, 
    listCustomerViewTemplate,
    listCustomer,
    listEvent,
    listEventCategory,
    listEventInstitute,
    listMethod,
} from '../../restapi/queries';
import { instance } from '../../services/axios';
import { intToTimeFormatForDB } from '../../utilities/commonFunctions';
import BlockModalFooter from '../AppDesignComponent/blockModals/BlockModalFooter';
import Note from '../Form/FormInputs/Note';
import ModalTitle from '../Modal/components/ModalTitle';
import WhiteModalWrapper from '../Modal/components/WhiteModalWrapper';

const selectOptions = [
    { id: 0, value: '顧客一覧テンプレート名を選択してください' }, //7
    { id: 1, value: 'テキストエリア型' },
];

const CustomerEditForm = ({
    formType,
    initialValues,
    setModalOpen = () => {},
    handleOnPressSave = () => {},
    templateId,
}) => {
    const navigate = useNavigate();
    const processing = useRef(false);
    locale('ja-JP');
    const [loading, setLoading] = useState(true);
    const [systemError, setSystemError] = useState(false);
    const [error, setError] = useState({});
    const [formData, setFormData] = useState([]);
    const [customerEditTemplateObject, setCustomerEditTemplateObject] = useState([]);
    const [customerformField, setCustomerformField] = useState(false);
    const [requiredFieldListData, setRequiredFieldListData] = useState([]);
    const [newFormData, setNewFormData] = useState([]);
    const [eventList, setEventList] = useState([]);
    const [eventCategoryIdList, setEventCategoryIdList] = useState([]);
    const [eventInstituteIdList, setEventInstituteIdList] = useState([]);

    const { info } = useSelector((state) => state.auth);
    const [dateBoxConfig, setDateBoxConfig] = useState({
        acceptCustomValue: false,
        interval: 1,
        now: new Date(),
        min: new Date(1800, 0, 1),
        max: new Date(2050, 0, 1),
    });
    const specialListField = ['eventCategoryId','eventInstituteId'];
    const refs = useRef([]);
    refs.current = [];
    const addToRefs = (el) => {
        if (el && !refs.current.includes(el)) {
            refs.current.push(el);
        }

        if (refs.current.length === customerEditTemplateObject.length) {
            console.log('offHere1');
            if(customerformField){
                setLoading(false);
            }
        }
    };
    useEffect(() => {
        if (customerformField && customerEditTemplateObject.length == 0) {
            console.log('offHere2');
            setLoading(false);
        }
    }, [customerformField]);
    useEffect(() => {
        async function fetchCustomerInfo() {
            // setLoading(true);
            setSystemError(false);
            try {
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

                const ENDPOINT = `${baseURL}${customerEditTemplateRead}${template.customerViewTemplateCreateTemplateId}?pid=${pid}`;


                const config = {
                    method: listMethod,
                    url: ENDPOINT,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                };
                const response = await instance.request(config);
                let customerEditTemplateContentLists =
                    response?.data?.records?.customerEditTemplateColumn.length > 0 &&
                    response?.data?.records?.customerEditTemplateColumn.sort((a, b) =>
                        a.currentPos > b.currentPos ? 1 : -1
                    );

                let fieldListData = [];
                let requiredfieldListData = [];
                customerEditTemplateContentLists.length > 0 &&
                    customerEditTemplateContentLists.map((item) => {
                        let findField = response?.data?.records?.fieldListInfo.find(
                            (fieldInfo) => fieldInfo.fieldId == item.fTypeId
                        );
                        findField.requiredStatus = item.checkbox1.checked;
                        fieldListData.push(findField);
                        if (item.checkbox1.checked) {
                            requiredfieldListData.push(item.fTypeId);
                            if (findField?.fieldType == 4) {
                                //setIniValues(findField);//no need to set Inivalues
                            }
                        }
                    });

                setCustomerEditTemplateObject(fieldListData);
                setCustomerformField(true);
                setRequiredFieldListData(requiredfieldListData);
                setSystemError(false);
                setLoading(false);
            } catch (error) {
                if (error?.response?.status === 409) {
                    setSystemError(false);
                } else {
                    setSystemError(true);
                }
                setLoading(false);
            }
            setLoading(false);
        }

        async function fetchEventInfo() {
            // setLoading(true);
            setSystemError(false);
            try {
                const pid = sessionStorage.getItem('currentProjectId');
                const ENDPOINT = `${baseURL}${listEvent}?pid=${pid}`;
                const config = { method: listMethod, url: ENDPOINT };
                const response = await instance.request(config);
                setEventList(response?.data?.records);
                setSystemError(false);
                setLoading(false);
            } catch (error) {
                if (error?.response?.status === 409) {
                    setSystemError(false);
                } else {
                    setSystemError(true);
                }
                setLoading(false);
            }
            setLoading(false);
        }

        

        fetchCustomerInfo();
        fetchEventInfo();
       
    }, []);

    async function fetchEventCategoryInfo(eventId) {
        setLoading(true);
        setSystemError(false);
        try {
            const pid = sessionStorage.getItem('currentProjectId');
            const ENDPOINT = `${baseURL}${listEventCategory}?eid=${eventId}&pid=${pid}`;
            const config = { method: listMethod, url: ENDPOINT };
            const response = await instance.request(config);
            console.log('setEventCategoryIdList',response?.data?.records)
            if (response.data?.records?.length > 0) {
                let itemListArr = [];
                response.data.records.forEach((item) => {
                    let newItem = {};
                    newItem.fieldListCode = item.eventCategoryId;
                    newItem.text = item.eventCategoryName ? item.eventCategoryName : item.categoryName;
                    itemListArr.push(newItem);
                });
                setEventCategoryIdList(itemListArr);
                console.log('offHere3');
                setLoading(false);
            } else {
                console.log('offHere4');
                setLoading(false);
            }
            setSystemError(false);
            console.log('offHere5');
            setLoading(false);
        } catch (error) {
            if (error?.response?.status === 409) {
                setSystemError(false);
            } else {
                setSystemError(true);
            }
            console.log('offHere6');
            setLoading(false);
        }
        console.log('offHere7');
        setLoading(false);
    }

    async function fetchEventInstituteInfo(eventId) {
        setLoading(true);
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
                console.log('offHere8');
                setLoading(false);
            } else {
                console.log('offHere9');
                setLoading(false);
            }
            setSystemError(false);
            console.log('offHere10');
            setLoading(false);
        } catch (error) {
            if (error?.response?.status === 409) {
                setSystemError(false);
            } else {
                setSystemError(true);
            }
            console.log('offHere11');
            setLoading(false);
        }
        console.log('offHere12');
        setLoading(false);
    }
    
    useEffect(()=>{
        if(formData?.eventId){
            fetchEventCategoryInfo(formData?.eventId);
            fetchEventInstituteInfo(formData?.eventId);
        }
    },[formData?.eventId])

    function handleOnchange(e) {
        let name = e.target.name;
        let value = e.target.value;
        const fieldName = e.target.getAttribute('fieldName');
        const fieldIdValue = +e.target.getAttribute('fieldId');
        const fieldGroupIdValue = +e.target.getAttribute('fieldGroupId');
        const fieldTypeValue = +e.target.getAttribute('fieldType');
        const projectId = +e.target.getAttribute('projectId');
        if (fieldIdValue != 0) {
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

            if (projectId != 0) {
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
            };
            if (newFormData.length > 0) {
                _.remove(newFormData, { fieldId: fieldIdValue });
            }
            let newData = [...newFormData, newObject];
            setNewFormData(newData);
        }
    }
    const getFieldName = (fieldInfo) => {
        let fieldName = fieldInfo?.fieldColumnName ?? '';
        if (fieldName !== '') {
            return fieldName.includes('.') ? fieldName.split('.')[1] : fieldName;
        } else {
            return fieldInfo?.fieldCode;
        }
    };

    function handleOnChangeTags(e, fieldInfo) {
        const { addedItems = [], removedItems = [] } = e;

        if (addedItems.length > 0 || removedItems.length > 0) {
            let fieldIdValue = fieldInfo?.fieldId;
            let fieldGroupIdValue = fieldInfo?.fieldGroupId;
            let fieldTypeValue = fieldInfo?.fieldType;
            let name = getFieldName(fieldInfo);
            let updatedTagItems = formData[name] ?? [];
            if (addedItems.length > 0) {
                updatedTagItems = [...updatedTagItems, addedItems[0].fieldListCode];
            }

            if (removedItems.length > 0) {
                updatedTagItems = updatedTagItems.filter(
                    (x) => !removedItems.filter((y) => y.fieldListCode === x).length
                );
            }

            updatedTagItems = _.uniq(updatedTagItems);
            setFormData((prevState) => ({
                ...prevState,
                [name]: updatedTagItems,
            }));
            if (fieldInfo.projectId != 0) {
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
            };
            if (newFormData.length > 0) {
                _.remove(newFormData, { fieldId: fieldIdValue });
            }
            let newData = [...newFormData, newObject];
            setNewFormData(newData);
        }
    }

    function setDateTimePickerValue(value, fieldInfo, type = 1) {
        let fieldIdValue = fieldInfo?.fieldId;
        let fieldGroupIdValue = fieldInfo?.fieldGroupId;
        let fieldTypeValue = fieldInfo?.fieldType;
        let name = getFieldName(fieldInfo);
        let updatedValue = formData[name] ?? '';
        value = type === 1 ? value : '2023/01/01 ' + value + ':01';
        value = Math.floor(new Date(value).getTime());
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        if (fieldInfo.projectId != 0) {
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
        value = value / 1000;
        let newObject = {
            fieldGroupId: fieldGroupIdValue,
            fieldType: fieldTypeValue,
            fieldId: fieldIdValue,
            fieldKey: name,
            fieldName: fieldInfo.fieldName,
            fieldValue: value,
        };
        if (newFormData.length > 0) {
            _.remove(newFormData, { fieldId: fieldIdValue });
        }
        let newData = [...newFormData, newObject];
        setNewFormData(newData);
    }

    // option change
    const onOptionChanged = (e) => {},
        onChangeHandle = (e) => {},
        onValueChangedHandleSD = (e, fieldInfo) => {
            if (typeof e.event !== 'undefined') {
                let value = e.value ?? '1800/01/01';
                let fieldIdValue = fieldInfo?.fieldId;
                let fieldGroupIdValue = fieldInfo?.fieldGroupId;
                let fieldTypeValue = fieldInfo?.fieldType;
                let name = getFieldName(fieldInfo);
                let updatedValue = formData[name] ?? '';
                setFormData((prevState) => ({
                    ...prevState,
                    [name]: value == '1800/01/01' ? undefined : Math.floor(new Date(value).getTime()),
                }));
                if (fieldInfo.projectId != 0) {
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
                if (fieldInfo?.fieldType == 5) {
                    value = value != '1800/01/01' ? Math.floor(new Date(value).getTime() / 1000) : '';
                } else {
                    value = value != '1800/01/01' ? intToTimeFormatForDB(e.value) : '';
                }

                let newObject = {
                    fieldGroupId: fieldGroupIdValue,
                    fieldType: fieldTypeValue,
                    fieldId: fieldIdValue,
                    fieldKey: name,
                    fieldName: fieldInfo.fieldName,
                    fieldValue: value,
                };
                if (newFormData.length > 0) {
                    _.remove(newFormData, { fieldId: fieldIdValue });
                }
                let newData = [...newFormData, newObject];
                setNewFormData(newData);
            }
        };

    function setIniValues(fieldInfo) {
        const fieldIdValue = +fieldInfo?.fieldId;
        const fieldGroupIdValue = +fieldInfo?.fieldGroupId;
        const fieldTypeValue = +fieldInfo?.fieldType;
        let name = getFieldName(fieldInfo);
        let value = formData[name] ?? '';
        if (value == '') {
            value = 0;
            setFormData((prevState) => ({
                ...prevState,
                [name]: value,
            }));

            if (fieldInfo?.projectId != 0) {
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
                fieldValue: value,
            };
            if (newFormData.length > 0) {
                _.remove(newFormData, { fieldId: fieldIdValue });
            }
            let newData = [...newFormData, newObject];
            setNewFormData(newData);
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
                            inputClassName="bg-blue-25"
                            placeholder=""
                            fieldId={fieldItem?.fieldId}
                            fieldName={fieldItem?.fieldName}
                            fieldGroupId={fieldItem?.fieldGroupId}
                            fieldType={fieldItem?.fieldType}
                            projectId={fieldItem?.projectId}
                            isRequired={fieldItem?.requiredStatus}
                        />
                    </InputContainer>
                );
                break;
            case 7:
                //this text field
                return (
                    <InputContainer>
                        <TextBox
                            label={fieldItem?.fieldName}
                            name={getFieldName(fieldItem)}
                            type='number'
                            labelClassName="text-blue-100"
                            inputClassName="bg-blue-25"
                            placeholder=""
                            fieldId={fieldItem?.fieldId}
                            fieldName={fieldItem?.fieldName}
                            fieldGroupId={fieldItem?.fieldGroupId}
                            fieldType={fieldItem?.fieldType}
                            projectId={fieldItem?.projectId}
                            isRequired={fieldItem?.requiredStatus}
                        />
                    </InputContainer>
                );
                break;
            case 1:
                return (
                    <InputContainer>
                        <Note
                            label={fieldItem?.fieldName}
                            name={getFieldName(fieldItem)}
                            labelClassName={`text-white !text-blue-100`}
                            inputClassName="bg-blue-25"
                            type="text"
                            fieldId={fieldItem?.fieldId}
                            fieldName={fieldItem?.fieldName}
                            fieldGroupId={fieldItem?.fieldGroupId}
                            fieldType={fieldItem?.fieldType}
                            projectId={fieldItem?.projectId}
                            isRequired={fieldItem?.requiredStatus}
                        />
                    </InputContainer>
                );
                break;

            case 3:
                //this list field
                return (
                    <>
                        <InputContainer>
                            <label className="text-blue-100">
                                {fieldItem?.fieldName}{' '}
                                {fieldItem?.requiredStatus ? <span class="text-orange-300">※</span> : ''}
                            </label>
                            {specialListField.includes(getFieldName(fieldItem))?(
                                <>
                                {getFieldName(fieldItem)=='eventCategoryId'? <TagBox
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
                            />  : <TagBox
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
                    }
                            </>):(
 <TagBox
 name={getFieldName(fieldItem)}
 dataSource={fieldItem?.fieldStyle?.lookup}
 value={formData[getFieldName(fieldItem)]}
 displayExpr={(data) => data?.inputBox2?.value}
 valueExpr="fieldListCode"
 onSelectionChanged={(e) => handleOnChangeTags(e, fieldItem)}
 noDataText="データがありません"
 selectAllText="すべて選択する"
 placeholder={fieldItem?.fieldName}
 isRequired={fieldItem?.requiredStatus}
/> 
                            )}
                        </InputContainer>
                    </>
                );
                break;
            case 4:
                //this yesNO field
                return (
                    <>
                        <InputContainer>
                            {/* <ToggleLock
                                label={fieldItem?.fieldName}
                                labelClassName="text-blue-100"
                                name={getFieldName(fieldItem)}
                                inputClassName=""
                                type="checkbox"
                                textLeft={fieldItem?.fieldStyle?.trueText}
                                textRight={fieldItem?.fieldStyle?.falseText}
                                fieldId={fieldItem?.fieldId}
                                fieldGroupId={fieldItem?.fieldGroupId}
                                fieldType={fieldItem?.fieldType}
                                isRequired={fieldItem?.requiredStatus}
                            /> */}
                            <SelectBox
                                label={fieldItem?.fieldName}
                                labelClassName='text-blue-100'
                                inputClassName='bg-blue-25'
                                name={getFieldName(fieldItem)}
                                onChange={handleOnchange}
                                fieldId={fieldItem?.fieldId}
                                projectId={fieldItem?.projectId}
                                fieldGroupId={fieldItem?.fieldGroupId}
                                fieldType={fieldItem?.fieldType}
                                isRequired={fieldItem?.requiredStatus}>
                                    <option value=''>未選択</option>
                                    <option value={1}>{fieldItem?.fieldStyle?.trueText}</option>
                                    <option value={0}>{fieldItem?.fieldStyle?.falseText}</option>
                            
                            </SelectBox>
                        </InputContainer>
                    </>
                );
                break;
            case 5:
                //this Date field
                return (
                    <>
                        <InputContainer>
                            <label className="text-blue-100">
                                {fieldItem?.fieldName} {fieldItem?.requiredStatus ? <AddRequiredMark /> : null}
                            </label>
                            <div className="dx-field-value bg-blue-25 border border-blue-100 text-blue-50 ellipsis cursor-pointer devExtreameDateTimePicker cdx-DateBox">
                                <DateBox
                                    name={getFieldName(fieldItem)}
                                    value={formData[getFieldName(fieldItem)] ?? undefined}
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
                    </>
                );
            case 6:
                return (
                    <>
                        <InputContainer>
                            <label className="text-blue-100">
                                {fieldItem?.fieldName} {fieldItem?.requiredStatus ? <AddRequiredMark /> : null}
                            </label>
                            <div className="dx-field-value bg-blue-25 border border-blue-100 text-blue-50 ellipsis cursor-pointer devExtreameDateTimePicker cdx-DateBox">
                                <DateBox
                                    name={getFieldName(fieldItem)}
                                    value={formData[getFieldName(fieldItem)] ?? undefined}
                                    fullName={getFieldName(fieldItem)}
                                    inputAttr={{ id: getFieldName(fieldItem) }}
                                    elementAttr={{ id: getFieldName(fieldItem) }}
                                    min={dateBoxConfig.min}
                                    max={dateBoxConfig.max}
                                    interval={dateBoxConfig.interval}
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
                                    type="time"
                                    pickerType="list"
                                />
                            </div>
                        </InputContainer>
                    </>
                );
        }
    };
    const handleOnPressSaveInnerModal = async (e, formDataForValidation) => {
      if (processing.current) return;
      processing.current = true;
      console.log('loadingsttartttt');
      setCustomerformField(false);
      setLoading(true);
      setError({})
      setSystemError(false);

      let validateFeildId = formDataForValidation.map((item) => item.fieldId);
      let allFounded = requiredFieldListData.every((ai) =>
        validateFeildId.includes(ai)
      );
      let eventIdValue = formData.eventId ?? "";
      try {
      setLoading(true);
        if (allFounded && eventIdValue != "") {
          let formDataForUpdate = {};
          const pid = sessionStorage.getItem("currentProjectId");
          formDataForUpdate.updateFieldList = newFormData;
          formDataForUpdate.projectId = pid;
          formDataForUpdate.createdBy = info.accountId;

          const ENDPOINT = `${baseURL}${updateCustomerReservation}`;
          const config = {
            method: createMethod,
            url: ENDPOINT,
            data: formDataForUpdate,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          };
          const copied = await instance.request(config);

          if (copied) {
            setModalOpen(false);
            setSystemError(false);
            setLoading(false);
            navigate("/customer_list");
          }
        } else {
          setError({ err: "すべての必須フィールドに入力してください" });
          console.log('offHere13');
          setLoading(false);
          setSystemError(false);
        }
      } catch (error) {
        if (error.response.status === 409) {
          setSystemError(false);
        } else {
          setSystemError(true);
        }
        setError({
          err: "システムエラーが発生しました サーバー管理者に連絡してください",
        });
        console.log('offHere14');
        setLoading(false);
      } finally {
        processing.current = false;
      }
    };
    return (
        <>
        {console.log('loaderFired',loading)}
            {loading && <Loading />}
            <WhiteModalWrapper width="border-none text-black" className="items-start">
                <ModalTitle title="顧客追加" className="text-blue-100 text-xl" />

                <Formik enableReinitialize={true} initialValues={formData}>
                    <div className="relative w-full h-full">
                        <Form onChange={handleOnchange}>
                            <div className="body-height3 pt-12 px-10 min-h-[calc(100vh-452px)] !p-0">
                                <div className="flex flex-col py-10">
                                    <InputContainer>
                                        <SelectBox
                                            label="イベント名"
                                            name="eventId"
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25"
                                            onChange={handleOnchange}
                                            isRequired={true}
                                            fieldId="1"
                                        >
                                            <option value="">イベントを選択</option>
                                            {eventList.length > 0 &&
                                                eventList.map((item) => (
                                                    <option value={item.eventId}>{item.eventName}</option>
                                                ))}
                                        </SelectBox>
                                    </InputContainer>
                                    {customerEditTemplateObject?.length > 0 &&
                                        customerEditTemplateObject.map((fieldItem,index) => (
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
                                setModalOpen={() => setModalOpen(false)}
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
