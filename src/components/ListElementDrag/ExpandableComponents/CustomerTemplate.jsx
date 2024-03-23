import React, { useEffect, useState } from 'react';
import { hexToRGBA, rgbaToHexNew } from '../../../lib/ColorConvert';
import {
    fontSizeAttributes,
    fontWeightAttributes,
    textAlignContentAttributes,
    widthAttributes2,
} from '../../../lib/tailwindClassAttributes';
import { baseURL, listField, listMethod } from '../../../restapi/queries';
import { instance } from '../../../services/axios';
import ColorPicker from '../../ColorPicker/ColorPicker';
import TextBox from '../../Form/FormInputs/TextBox';
import SelectBox from '../../FormikFreeComponents/SelectBox';
import ToggleLock from '../../FormikFreeComponents/ToggleLock';
import InputContainer from '../../Wrapper/InputContainer';

const CustomerTemplate = ({ item, extendForm, changeItem, setExtendValue, searchItemValue = '' }) => {
    const [options, setOptions] = useState('');
    const [fieldRecords, setFieldRecords] = useState([]);
    const [fields, setFields] = useState([]);
    const [columnWithOption, setColumnWithOption] = useState([]);
    const [textSizeOption, setTextSizeOption] = useState([]);
    const task = JSON.parse(sessionStorage.getItem(`customer_template_${item.Task_ID}`));
    const editId = JSON.parse(sessionStorage.getItem('customer_template_edit'));
    let disabledItemFromSessionStorage = JSON.parse(
        sessionStorage.getItem(`customer_disabled_option_template_id_${editId}`)
    );
    const [_disabledOption, setDisabledOption] = useState(disabledItemFromSessionStorage);

    let sortPriorityList = Array.from({ length: 99 }, (_, i) => {
        return { id: i + 1, value: i + 1, status: false };
    });
    const [sortPriorityOption, setPriorityOption] = useState(sortPriorityList);
    const commandFieldList = ['00000a01', '00000a02', '00000a03', '00000a04', '00000a05'];
    const [values, setValues] = useState({
        Task_ID: item?.Task_ID || '',
        headerName: task?.headerName || '',
        fieldType: task?.fieldType || '',
        mask_state: task?.mask_state === 'true' ? 'true' : 'false',
        sort_priority: task?.sort_priority || '',
        ascending_order: task?.ascending_order || 'ASC',
        column_width: task?.column_width || 'w-48',
        text_align: task?.text_align || 'justify-start',
        text_size: task?.text_size || 'text-base',
        text_bold: task?.text_bold || 'font-medium',
        text_color: task?.text_color || '#000000',
    });

    const projectId = JSON.parse(sessionStorage.getItem('currentProjectId'));


    useEffect(() => {
        if (fieldRecords && Array.isArray(fieldRecords) && fieldRecords.length > 0) {
            let filteredRecords = [...fieldRecords];

            if (searchItemValue) {
                filteredRecords = filteredRecords.filter((item) => String(item.fieldName).toLowerCase().includes(searchItemValue.toLowerCase()) || String(item.fieldManageName).toLowerCase().includes(searchItemValue.toLowerCase()));

                const selectedFieldId = values?.fieldType;
                if (selectedFieldId && !filteredRecords.find(x => x.fieldId == selectedFieldId)) {
                    const findItem = fieldRecords.find(x => x.fieldId == selectedFieldId);
                    if (findItem) filteredRecords = [findItem, ...filteredRecords];
                }
            }
            setFields(filteredRecords);
        }
    }, [searchItemValue, fieldRecords]);



    const getFieldList = async () => {
        try {
            const projectId = sessionStorage.getItem('currentProjectId');
            let fieldType = '0,1,2,3,4,5,6,7,9';
            if (projectId) {
                const ENDPOINT = `${baseURL}${listField}?pid=${projectId}&fieldType=${fieldType}`;
                const config = {
                    method: listMethod,
                    url: ENDPOINT,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                };
                const response = await instance.request(config);
                const fieldRecords = response?.data?.records || [];

                setFieldRecords(fieldRecords);
                setFields(fieldRecords);

                let fieldRow =
                    response?.data?.records.length > 0 &&
                    response?.data?.records.find((item) => item.fieldId == values?.fieldType);

                if (typeof fieldRow != 'undefined') {
                    if (commandFieldList.includes(fieldRow.fieldCode)) {
                        setShowHideDiv(false);
                        setShowHideDivHeaderName(false);
                    } else {
                        setShowHideDiv(true);
                        setShowHideDivHeaderName(true);
                    }
                }
            }
        } catch (err) {
            console.log('Field err', err);
        }
    };

    const [showHideDiv, setShowHideDiv] = useState(true);
    const [showHideDivHeaderName, setShowHideDivHeaderName] = useState(true);
    const getFieldCode = (fieldId) => {
        let fieldRow = fields.length > 0 && fields.find((item) => item.fieldId == fieldId);

        if (typeof fieldRow != 'undefined') {
            if (commandFieldList.includes(fieldRow.fieldCode)) {
                setShowHideDiv(false);
                setShowHideDivHeaderName(false);
            } else {
                setShowHideDiv(true);
                setShowHideDivHeaderName(true);
            }
            return fieldRow.fieldCode;
        }
    };
    useEffect(() => {
        getFieldList();
        let columnWithArray = [{ value: '指定しない', label: '指定しない', key: '指定しない' }]; //指定しない]
        let textSizeArray = [];
        for (let i = 1; i < 65; i++) {
            const number = i;
            const mul = number * 8;
            if (mul == 16) {
                const object = { value: mul + '', label: mul + 'px', key: 'default' }; //指定しない
                columnWithArray.push(object);
            } else {
                const object = { value: mul + '', label: mul + 'px', key: mul + '' };
                columnWithArray.push(object);
            }
        }
        for (let i = 8; i <= 24; i++) {
            const number = i;
            const mul = number;
            if (number == 16) {
                const object = { value: mul + '', label: mul + 'px', key: 'default' }; //指定しない
                textSizeArray.push(object);
            } else {
                const object = { value: mul + '', label: mul + 'px', key: mul + '' };
                textSizeArray.push(object);
            }
        }

        setColumnWithOption([...columnWithArray]);
        setTextSizeOption([...textSizeArray]);

        disabledOptionlist();
    }, []);
    // optionCreation()

    useEffect(() => {
        const task = JSON.parse(sessionStorage.getItem(`customer_template_${item.Task_ID}`));
        setValues({
            Task_ID: item?.Task_ID || '',
            headerName: task?.headerName || '',
            fieldType: task?.fieldType || '',
            mask_state: task?.mask_state === 'true' ? 'true' : 'false',
            sort_priority: task?.sort_priority || '',
            ascending_order: task?.ascending_order || 'ASC',
            column_width: task?.column_width || 'w-48',
            text_align: task?.text_align || 'justify-start',
            text_size: task?.text_size || 'text-base',
            text_bold: task?.text_bold || 'font-medium',
            text_color: task?.text_color || '#000000',
        });
    }, [extendForm]);

    const [clearHeaderTitle, setClearHeaderTitle] = useState(false);

    const handleChange = (e) => {
        let mask_state = values?.mask_state === 'true' ? 'true' : 'false';
        if (e.target.name === 'headerName' && e.target.value?.length > 32) {
            return;
        }
        if (e.target.name === 'mask_state') {
            mask_state = values?.mask_state === 'true' ? 'false' : 'true';
        }
        if (e.target.name === 'headerName') {
            setExtendValue(e.target.value);
        }

        let fieldTypeFieldName = '';
        if (e.target.name === 'fieldType' && e.target.value != '') {
            let selectedFieldInfo = fields.find((field) => field.fieldId == e.target.value);
            let fCodes = getFieldCode(e.target.value);
            if (selectedFieldInfo.fieldType == 9 || commandFieldList.includes(fCodes)) {
                //hide selection area
                setShowHideDiv(false);
                if (commandFieldList.includes(fCodes)) {
                    fieldTypeFieldName = selectedFieldInfo?.fieldName;
                    setClearHeaderTitle(true);
                    setShowHideDivHeaderName(false);
                    setExtendValue(fieldTypeFieldName); // onchange fieldTitle name change
                } else {
                    setShowHideDivHeaderName(true);
                }
            } else {
                //show selection area
                setClearHeaderTitle(false);
                setShowHideDiv(true);
                setShowHideDivHeaderName(true);
            }
        }

        clearHeaderTitle && setExtendValue(); // Clear fieldTitle header

        const newValues = {
            ...values,
            Task_ID: item.Task_ID,
            headerName: fieldTypeFieldName !== '' ? fieldTypeFieldName : clearHeaderTitle ? '' : values.headerName,
            mask_state: mask_state == 'true' ? 'true' : 'false',
            [e.target.name]: e.target.value,
        };
        setValues(newValues);
        sessionStorage.setItem(`customer_template_${item.Task_ID}`, JSON.stringify(newValues));
        if (e.target.name === 'sort_priority') {
            disabledOptionlist(e.target.value);
        }
    };

    function disabledOptionlist(optionIndexValue = 0) {
        const pathname = window.location.pathname;
        const routeName = pathname.split('/').pop();
        const templateIds = JSON.parse(sessionStorage.getItem(`${routeName}_drag_B_Type`));
        let priorityDisabledList = [];
        if (templateIds && templateIds?.length) {
            for (let template of templateIds) {
                let priorityValue = JSON.parse(sessionStorage.getItem(`customer_template_${template.Task_ID}`));
                priorityValue = priorityValue?.sort_priority;
                if (!isNaN(priorityValue) && priorityValue != '') {
                    priorityDisabledList.push(priorityValue);
                    sortPriorityList[priorityValue - 1].status = true;
                }
            }
        }

        setPriorityOption(sortPriorityList);
        setDisabledOption(priorityDisabledList);
        sessionStorage.setItem(`customer_disabled_option_template_id_${editId}`, JSON.stringify(priorityDisabledList));
    }
    const handleOnChangeColor = (name, colorCode, colorName, colorArray) => {
        const task = JSON.parse(sessionStorage.getItem(`customer_template_${item.Task_ID}`));
        const colorCodes = colorCode.split(',');
        const rgbaToHex = rgbaToHexNew(
            Number(colorCodes[0]),
            Number(colorCodes[1]),
            Number(colorCodes[2]),
            Number(colorCodes[3])
        );
        if (task?.Task_ID) {
            sessionStorage.setItem(
                `customer_template_${changeItem?.Task_ID}`,
                JSON.stringify({
                    ...task,
                    text_color: rgbaToHex,
                })
            );
            const newValues = {
                ...values,
                text_color: rgbaToHex,
            };
            setValues(newValues);
        }
    };

    return (
        <div className=" flex w-full align-middle items-center mb-5 mt-5">
            <div className="w-full px-8 pr-16">
                <div className={showHideDivHeaderName ? '' : 'hidden'}>
                    <InputContainer>
                        <TextBox
                            label="列ヘッダー表示名"
                            placeholder="列ヘッダー表示名"
                            labelClassName="text-blue-100"
                            inputClassName="bg-blue-25 text-black placeholder-gray-300"
                            name="headerName"
                            value={values.headerName}
                            onChange={handleChange}
                        />
                    </InputContainer>
                </div>
                <InputContainer>
                    <SelectBox
                        label="表示するフィールド"
                        // label='フィールドタイプ'
                        labelClassName="text-blue-100"
                        inputClassName="bg-blue-25"
                        name="fieldType"
                        onChange={handleChange}
                    >
                        <option key="default" value="">
                            表示するフィールドを選択してください
                        </option>
                        {fields.length > 0 &&
                            fields.map((field, index) => (
                                <option
                                    value={field.fieldId}
                                    key={field.fieldId + '_' + index}
                                    selected={values.fieldType == field.fieldId ? true : false}
                                >
                                    {field.fieldName}{field.fieldManageName && '（' + field.fieldManageName + '）'}
                                </option>
                            ))}
                    </SelectBox>
                </InputContainer>
                <div className={showHideDiv ? '' : 'hidden'}>
                    <InputContainer>
                        <ToggleLock
                            label="マスク活性状態"
                            labelClassName="text-blue-100"
                            name="mask_state"
                            value={values?.mask_state === 'true' ? 'false' : 'true'}
                            checked={values?.mask_state === 'true' ? false : true}
                            inputClassName=""
                            type="checkbox"
                            textLeft="マスク非活性化中"
                            textRight="マスク活性化中"
                            onChange={handleChange}
                        />
                    </InputContainer>
                    <InputContainer>
                        <SelectBox
                            label="ソート優先度（重複不可）"
                            inputClassName="bg-transparent text-blue-100"
                            labelClassName="text-blue-100"
                            border="border-unset border-b-[1px]"
                            name="sort_priority"
                            onChange={handleChange}
                        >
                            <option key="default" value="">
                                指定しない
                            </option>
                            {sortPriorityOption.map((n, i) => {
                                return n.status == true ? (
                                    <option
                                        key={n.id}
                                        value={n.value}
                                        selected={values.sort_priority == n.value ? true : false}
                                        disabled={n.status}
                                    >
                                        {n.value}
                                    </option>
                                ) : (
                                    <option
                                        key={n.id}
                                        value={n.value}
                                        selected={values.sort_priority == n.value ? true : false}
                                    >
                                        {n.value}
                                    </option>
                                );
                            })}
                        </SelectBox>
                    </InputContainer>
                    <InputContainer>
                        <SelectBox
                            label="昇降順"
                            inputClassName="bg-transparent text-blue-100"
                            labelClassName="text-blue-100"
                            border="border-unset border-b-[1px]"
                            name="ascending_order"
                            onChange={handleChange}
                        >
                            <option key="default" value="ASC" selected={values.ascending_order == 'ASC' ? true : false}>
                                昇順
                            </option>
                            <option key="降順" value="DESC" selected={values.ascending_order == 'DESC' ? true : false}>
                                降順
                            </option>
                        </SelectBox>
                    </InputContainer>
                    <InputContainer>
                        <SelectBox
                            // 列の幅設定（指定しない場合自動調整されます）
                            label="列の幅設定（指定しない場合自動調整されます）"
                            inputClassName="bg-transparent text-blue-100"
                            labelClassName="text-blue-100"
                            border="border-unset border-b-[1px]"
                            name="column_width"
                            onChange={handleChange}
                            defaultValue={values.column_width}
                        >
                            {widthAttributes2.length > 0 &&
                                widthAttributes2.map((field, index) => (
                                    <option value={field.value} key={field.value + '_' + index}>
                                        {field.caption}
                                    </option>
                                ))}
                        </SelectBox>
                    </InputContainer>
                    <InputContainer>
                        {/* 列の幅設定 列の幅設定 */}

                        <SelectBox
                            label="テキストアライメント"
                            inputClassName="bg-transparent text-blue-100"
                            labelClassName="text-blue-100"
                            border="border-unset border-b-[1px]"
                            name="text_align"
                            onChange={handleChange}
                        >
                            {textAlignContentAttributes.length > 0 &&
                                textAlignContentAttributes.map((field, index) => (
                                    <option
                                        value={field.value}
                                        key={field.value + '_' + index}
                                        selected={values.text_align == field.value ? true : false}
                                    >
                                        {field.caption}
                                    </option>
                                ))}
                        </SelectBox>
                    </InputContainer>
                    <InputContainer>
                        <SelectBox
                            label="	テキストサイズ"
                            inputClassName="bg-transparent text-blue-100"
                            labelClassName="text-blue-100"
                            border="border-unset border-b-[1px]"
                            name="text_size"
                            onChange={handleChange}
                            defaultValue={values.text_size}
                        >
                            {fontSizeAttributes.length > 0 &&
                                fontSizeAttributes.map((field, index) => (
                                    <option value={field.value} key={field.value + '_' + index}>
                                        {field.caption}
                                    </option>
                                ))}
                        </SelectBox>
                    </InputContainer>
                    <InputContainer>
                        <SelectBox
                            label="テキストボールド"
                            inputClassName="bg-transparent text-blue-100"
                            labelClassName="text-blue-100"
                            border="border-unset border-b-[1px]"
                            name="text_bold"
                            onChange={handleChange}
                            defaultValue={values.text_bold}
                        >
                            {fontWeightAttributes.length > 0 &&
                                fontWeightAttributes.map((field, index) => (
                                    <option value={field.value} key={field.value + '_' + index}>
                                        {field.caption}
                                    </option>
                                ))}
                        </SelectBox>
                    </InputContainer>
                    <InputContainer>
                        <label className="text-blue-100">テキストカラー</label>
                        <div className="flex items-center">
                            <ColorPicker
                                setColorhandle={(_, name, colorCode) =>
                                    handleOnChangeColor(name, colorCode, 'color', [1, 2])
                                }
                                inputBoxItem="labelTextColor"
                                isDefaultColor={hexToRGBA(values?.text_color)}
                            />
                            <label className="text-blue-100">表示するテキストの色</label>
                        </div>
                    </InputContainer>
                </div>
            </div>
        </div>
    );
};
export default CustomerTemplate;
