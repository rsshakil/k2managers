import React, { useEffect, useState } from 'react';

import { Form, Formik } from 'formik';
import _ from 'lodash';

import DatePickerInput from '../../Form/FormInputs/DatePickerInput';
import SelectBox from '../../Form/FormInputs/SelectBox';
import TextBox from '../../Form/FormInputs/TextBox';

import {
    divisionDropDrownList,
    pickerDropDownList,
    readOnlyDropDownItems,
    requiredDropDownItems,
} from '../../../lib/commonConstants';
import { autoComplete } from '../../../lib/tailwindClassAttributes';
import { getFieldDropDownItemsByFieldType } from '../../../services/appDesignerService';
import Loader from '../../Loading/Loader';
import ModalTitle from '../../Modal/components/ModalTitle';
import WhiteModalWrapper from '../../Modal/components/WhiteModalWrapper';
import InputContainer from '../../Wrapper/InputContainer';
import BlockModalFooter from './BlockModalFooter';

import { valueFormatCheck } from '../../../utilities/commonFunctions';
import Note from '../../Form/FormInputs/Note';

export default function InputDateSettingsBlock({
    blockData = '',
    setModalOpen = () => { },
    handleOnPressSave = () => { },
    uniqueError = {},
}) {
    const [dropDownItemData, setDropDownItems] = useState([]);
    const [loading, setLoading] = useState(true);

    async function getFileterItemsByFieldType() {
        const projectId = window.sessionStorage.getItem('currentProjectId');
        const { data, status } = await getFieldDropDownItemsByFieldType(projectId, 5);
        if (status == 200) {
            let { records = [] } = data || [];
            setDropDownItems(records);
        }

        setLoading(false);
    }

    useEffect(() => {
        getFileterItemsByFieldType();
    }, []);

    const [formData, setFormData] = useState(blockData);
    function handleOnchange(e) {
        const name = e.target.name;
        const value = valueFormatCheck(e.target.value);

        if (name === 'yearDropdownStartNumber' || name === 'yearDropdownEndNumber') {
            let obj = { [name]: value };
            const { yearInitialNumber, yearDropdownEndNumber, yearDropdownStartNumber } = formData;

            if (name === 'yearDropdownStartNumber') {
                if (!_.inRange(yearInitialNumber, value, yearDropdownEndNumber + 1)) {
                    obj.yearInitialNumber = value;
                }

                if (value > yearDropdownEndNumber) {
                    obj.yearDropdownEndNumber = value;
                }
            } else if (name === 'yearDropdownEndNumber') {
                if (!_.inRange(yearInitialNumber, yearDropdownStartNumber, value + 1)) {
                    obj.yearInitialNumber = yearDropdownStartNumber;
                }
            }

            setFormData((prevState) => ({
                ...prevState,
                ...obj,
            }));
        } else {
            if (e.target.name === 'fieldId') {
                const findField = dropDownItemData.find((x) => x.fieldId === +value);
                setFormDateDataValue('fieldCode', findField.fieldCode);
            }

            setFormData((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    }

    let numField = Array.from({ length: formData.columns }, (_, i) => i + 1);
    let MaxlengthList = Array.from({ length: 100 }, (_, i) => i + 1);
    let monthLengthList = Array.from({ length: 12 }, (_, i) => i + 1);
    let dayLengthList = Array.from({ length: 31 }, (_, i) => i + 1);

    let yearList = _.range(1900, 2051);

    const endSelectionYearList = () => {
        const { yearDropdownStartNumber = 1900 } = formData;

        return yearList.filter((x) => x >= yearDropdownStartNumber);
    };
    const initialSelectionYearList = () => {
        const { yearDropdownStartNumber = 1900, yearDropdownEndNumber = 2101 } = formData;

        return _.range(Number(yearDropdownStartNumber), Number(yearDropdownEndNumber) + 1);
    };

    function setDateValue(dateValues) {
        setFormDateDataValue('value', dateValues);
    }
    function setMinDateValue(dateValues) {
        setFormDateDataValue('minValue', dateValues);
    }
    function setMaxDateValue(dateValues) {
        setFormDateDataValue('maxValue', dateValues);
    }

    function setFormDateDataValue(name, value) {
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    return (
        <>
            {loading && <Loader />}

            <WhiteModalWrapper width="border-none text-black" className="items-start">
                <ModalTitle title="入力フォームinputDate設定" className="text-blue-100 text-xl" />

                <Formik enableReinitialize={true} initialValues={formData}>
                    <div className="relative w-full h-full">
                        <Form onChange={handleOnchange}>
                            <div className="body-height3 pt-12 px-10 min-h-[calc(100vh-452px)] !p-0">
                                <div className="flex flex-col py-10">
                                    <InputContainer>
                                        <SelectBox
                                            label="エリア分割"
                                            name={`division`}
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25"
                                            onChange={handleOnchange}
                                        >
                                            {divisionDropDrownList.map((x) => (
                                                <option key={x.value} value={x.value}>
                                                    {x.caption}
                                                </option>
                                            ))}
                                        </SelectBox>
                                    </InputContainer>

                                    <InputContainer>
                                        <SelectBox
                                            label="対象フィールド "
                                            name={`fieldId`}
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25"
                                            onChange={handleOnchange}
                                        >
                                            <option value="">選択してください</option>
                                            {dropDownItemData.map((x) => (
                                                <option key={x.fieldId} value={x.fieldId}>
                                                    {x.fieldName}
                                                </option>
                                            ))}
                                        </SelectBox>
                                    </InputContainer>
                                    {JSON.parse(formData.division) && (
                                        <InputContainer>
                                            <SelectBox
                                                label={`readonly`}
                                                name={`readOnly`}
                                                labelClassName="text-blue-100"
                                                inputClassName="bg-blue-25"
                                                onChange={handleOnchange}
                                            >
                                                {readOnlyDropDownItems.length > 0 &&
                                                    readOnlyDropDownItems.map((field, index) => (
                                                        <option value={field.value} key={field.value + '_' + index}>
                                                            {field.caption}
                                                        </option>
                                                    ))}
                                            </SelectBox>
                                        </InputContainer>
                                    )}

                                    {!JSON.parse(formData.division) && (
                                        <>
                                            <InputContainer>
                                                <TextBox
                                                    label="ラベル"
                                                    name={`label`}
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25"
                                                    placeholder="ラベル"
                                                />
                                            </InputContainer>

                                            <InputContainer>
                                                <SelectBox
                                                    label={`ピッカー`}
                                                    name={`picker`}
                                                    labelClassName="text-blue-100 "
                                                    inputClassName="bg-blue-25"
                                                    onChange={handleOnchange}
                                                >
                                                    {pickerDropDownList.length > 0 &&
                                                        pickerDropDownList.map((field, index) => (
                                                            <option value={field.value} key={field.value + '_' + index}>
                                                                {field.caption}
                                                            </option>
                                                        ))}
                                                </SelectBox>
                                            </InputContainer>

                                            <div className="flex px-8">
                                                <div className="w-1/5 pr-2">
                                                    <InputContainer>
                                                        <SelectBox
                                                            label={`必須`}
                                                            name={`required`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25"
                                                            onChange={handleOnchange}
                                                        >
                                                            {requiredDropDownItems.length > 0 &&
                                                                requiredDropDownItems.map((field, index) => (
                                                                    <option
                                                                        value={field.value}
                                                                        key={field.value + '_' + index}
                                                                    >
                                                                        {field.caption}
                                                                    </option>
                                                                ))}
                                                        </SelectBox>
                                                    </InputContainer>
                                                </div>

                                                <div className="w-1/5 px-2">
                                                    <InputContainer>
                                                        <DatePickerInput
                                                            label="value（初期値）"
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25"
                                                            datePickerWidth="w-full"
                                                            name="value"
                                                            value={formData.value}
                                                            setDateValue={setDateValue}
                                                            placeholder="value"
                                                        />
                                                    </InputContainer>
                                                </div>

                                                <div className="w-1/5 px-2">
                                                    <InputContainer>
                                                        <DatePickerInput
                                                            label="min(最小日付)"
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25"
                                                            datePickerWidth="w-full"
                                                            name="minValue"
                                                            value={formData.minValue}
                                                            setDateValue={setMinDateValue}
                                                            placeholder="min"
                                                        />
                                                    </InputContainer>
                                                </div>

                                                <div className="w-1/5 px-2">
                                                    <InputContainer>
                                                        <DatePickerInput
                                                            label="max(最大日付) "
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25"
                                                            name="maxValue"
                                                            value={formData.maxValue}
                                                            datePickerWidth="w-full"
                                                            setDateValue={setMaxDateValue}
                                                            placeholder="max"
                                                        />
                                                    </InputContainer>
                                                </div>

                                                <div className="w-1/5 pl-2">
                                                    <InputContainer>
                                                        <SelectBox
                                                            label={`ステップ日数`}
                                                            name={`step`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25"
                                                            onChange={handleOnchange}
                                                        >
                                                            {MaxlengthList.map((n, i) => (
                                                                <option key={i} value={i}>
                                                                    {i}
                                                                </option>
                                                            ))}
                                                        </SelectBox>
                                                    </InputContainer>
                                                </div>
                                            </div>

                                            <div className="flex px-8">
                                                <div className="w-1/5 pr-2">
                                                    <InputContainer>
                                                        <SelectBox
                                                            label={`readonly`}
                                                            name={`readOnly`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25"
                                                            onChange={handleOnchange}
                                                        >
                                                            {readOnlyDropDownItems.length > 0 &&
                                                                readOnlyDropDownItems.map((field, index) => (
                                                                    <option
                                                                        value={field.value}
                                                                        key={field.value + '_' + index}
                                                                    >
                                                                        {field.caption}
                                                                    </option>
                                                                ))}
                                                        </SelectBox>
                                                    </InputContainer>
                                                </div>

                                                <div className="w-1/5 px-2">
                                                    <InputContainer>
                                                        <TextBox
                                                            label={`必須エラー時テキスト`}
                                                            name={`errorText`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25"
                                                            placeholder="必須エラー時テキスト"
                                                        />
                                                    </InputContainer>
                                                </div>

                                                <div className="w-1/5 px-2">
                                                    <InputContainer>
                                                        <TextBox
                                                            label={`最小以下エラー時テキスト`}
                                                            name={`minError`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25"
                                                            placeholder="最小以下エラー時テキスト"
                                                        />
                                                    </InputContainer>
                                                </div>

                                                <div className="w-1/5 px-2">
                                                    <InputContainer>
                                                        <TextBox
                                                            label={`最大以上エラー時テキスト`}
                                                            name={`maxError`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25"
                                                            placeholder="最大以上エラー時テキスト"
                                                        />
                                                    </InputContainer>
                                                </div>

                                                <div className="w-1/5 pl-2">
                                                    <InputContainer>
                                                        <SelectBox
                                                            label={`autocomplete属性`}
                                                            name={`autoComplete`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25"
                                                            onChange={handleOnchange}
                                                        >
                                                            {autoComplete.length > 0 &&
                                                                autoComplete.map((field, index) => (
                                                                    <option
                                                                        value={field.value}
                                                                        key={field.value + '_' + index}
                                                                    >
                                                                        {field.caption}
                                                                    </option>
                                                                ))}
                                                        </SelectBox>
                                                    </InputContainer>
                                                </div>
                                            </div>

                                            <div className="flex px-8">
                                                <div className="w-1/5 pr-2">
                                                    <InputContainer>
                                                        <TextBox
                                                            label={`placeholder`}
                                                            name={`placeholder`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25"
                                                            placeholder="placeholder"
                                                        />
                                                    </InputContainer>
                                                </div>
                                                <div className="w-1/5 px-2">
                                                    <InputContainer>
                                                        <TextBox
                                                            label={`name属性`}
                                                            name={`name`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25"
                                                            placeholder="name属性"
                                                            isRequired={true}
                                                        />
                                                    </InputContainer>
                                                </div>
                                                <div className="w-1/5 px-2"></div>
                                                <div className="w-1/5 px-2"></div>
                                                <div className="w-1/5 pl-2"></div>
                                            </div>
                                            <div className="px-8">
                                                <InputContainer>
                                                    <Note
                                                        label={`ラベルカスタムクラス`}
                                                        name="labelCustomClass"
                                                        labelClassName="text-blue-100 text-xs"
                                                        inputClassName="bg-blue-25 !p-1"
                                                        height="h-8"
                                                        placeholder="カスタムClass"
                                                    />
                                                </InputContainer>
                                                <InputContainer>
                                                    <Note
                                                        label={`inputDateカスタムクラス`}
                                                        name="inputDateCustomClass"
                                                        labelClassName="text-blue-100 text-xs"
                                                        inputClassName="bg-blue-25 !p-1"
                                                        height="h-8"
                                                        placeholder="カスタムClass"
                                                    />
                                                </InputContainer>
                                                <InputContainer>
                                                    <Note
                                                        label={`placeholderカスタムクラス `}
                                                        name="placeholderCustomClass"
                                                        labelClassName="text-blue-100 text-xs"
                                                        inputClassName="bg-blue-25 !p-1"
                                                        height="h-8"
                                                        placeholder="カスタムClass"
                                                    />
                                                </InputContainer>
                                                <InputContainer>
                                                    <Note
                                                        label={`エラーテキストカスタムクラス`}
                                                        name="errorTextCustomClass"
                                                        labelClassName="text-blue-100 text-xs"
                                                        inputClassName="bg-blue-25 !p-1"
                                                        height="h-8"
                                                        placeholder="カスタムClass"
                                                    />
                                                </InputContainer>
                                                <InputContainer>
                                                    <Note
                                                        label={`areaWrapカスタムクラス`}
                                                        name="areaWrapCustomClass"
                                                        labelClassName="text-blue-100 text-xs"
                                                        inputClassName="bg-blue-25 !p-1"
                                                        height="h-8"
                                                        placeholder="カスタムClass"
                                                    />
                                                </InputContainer>
                                            </div>
                                        </>
                                    )}

                                    {JSON.parse(formData.division) && (
                                        <>
                                            <div className="px-8 mb-4 mt-4">
                                                <label htmlFor="headerAreaShadow" className="text-blue-100 !mb-8 !mt-8">
                                                    年エリア
                                                </label>
                                            </div>
                                            <div className="flex px-8">
                                                <div className="w-1/6 pr-2">
                                                    <InputContainer>
                                                        <SelectBox
                                                            label={`年形式`}
                                                            name={`yearType`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25"
                                                            onChange={handleOnchange}
                                                        >
                                                            <option value="0">YYYY年(EEYY年)</option>
                                                            <option value="1">YYYY年</option>
                                                            {/* {yearTypeDropDownList.length > 0 &&
                                                            yearTypeDropDownList.map((field, index) => (
                                                                <option
                                                                    value={field.value}
                                                                    key={field.value + "_" + index}>
                                                                    {field.caption}
                                                                </option>
                                                            )
                                                            )} */}
                                                        </SelectBox>
                                                    </InputContainer>
                                                </div>
                                                <div className="w-1/6 px-2">
                                                    <InputContainer>
                                                        <TextBox
                                                            label={`ラベル `}
                                                            name={`yearLabel`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25"
                                                            placeholder="ラベル"
                                                        />
                                                    </InputContainer>
                                                </div>
                                                <div className="w-1/6 px-2">
                                                    <InputContainer>
                                                        <SelectBox
                                                            label={`必須`}
                                                            name={`yearRequired`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25"
                                                            onChange={handleOnchange}
                                                        >
                                                            {requiredDropDownItems.length > 0 &&
                                                                requiredDropDownItems.map((field, index) => (
                                                                    <option
                                                                        value={field.value}
                                                                        key={field.value + '_' + index}
                                                                    >
                                                                        {field.caption}
                                                                    </option>
                                                                ))}
                                                        </SelectBox>
                                                    </InputContainer>
                                                </div>
                                                <div className="w-1/6 px-2">
                                                    <InputContainer>
                                                        <TextBox
                                                            label={`name属性`}
                                                            name={`yearName`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25"
                                                            placeholder="name属性"
                                                            isRequired={true}
                                                        />
                                                    </InputContainer>
                                                </div>
                                                <div className="w-1/6 px-2">
                                                    <InputContainer>
                                                        <SelectBox
                                                            label={`ドロップダウン開始年`}
                                                            name={`yearDropdownStartNumber`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25"
                                                            onChange={handleOnchange}
                                                        >
                                                            {yearList.map((n) => (
                                                                <option key={n} value={n}>
                                                                    {n}
                                                                </option>
                                                            ))}
                                                        </SelectBox>
                                                    </InputContainer>
                                                </div>
                                                <div className="w-1/6 px-2">
                                                    <InputContainer>
                                                        <SelectBox
                                                            label={`ドロップダウン終了年`}
                                                            name={`yearDropdownEndNumber`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25"
                                                            onChange={handleOnchange}
                                                        >
                                                            {endSelectionYearList().map((n) => (
                                                                <option key={n} value={n}>
                                                                    {n}
                                                                </option>
                                                            ))}
                                                        </SelectBox>
                                                    </InputContainer>
                                                </div>
                                                <div className="w-1/6 pl-2">
                                                    <InputContainer>
                                                        <SelectBox
                                                            label={`ドロップダウン初期選択`}
                                                            name={`yearInitialNumber`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25"
                                                            onChange={handleOnchange}
                                                        >
                                                            {initialSelectionYearList().map((n) => (
                                                                <option key={n} value={n}>
                                                                    {n}
                                                                </option>
                                                            ))}
                                                        </SelectBox>
                                                    </InputContainer>
                                                </div>
                                            </div>

                                            <div className="flex px-8">
                                                <div className="w-1/4 pr-2">
                                                    <InputContainer>
                                                        <Note
                                                            label={`ラベルカスタムクラス `}
                                                            name={`yearLabelCustomClass`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25 !p-1"
                                                            height="h-8"
                                                            placeholder="カスタムClass"
                                                        />
                                                    </InputContainer>
                                                </div>
                                                <div className="w-1/4 px-2">
                                                    <InputContainer>
                                                        <Note
                                                            label={`エラーカスタムクラス`}
                                                            name={`yearRequiredErrorCustomClass`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25 !p-1"
                                                            height="h-8"
                                                            placeholder="カスタムClass"
                                                        />
                                                    </InputContainer>
                                                </div>
                                                <div className="w-1/4 px-2">
                                                    <InputContainer>
                                                        <Note
                                                            label={`yearInputカスタムクラス`}
                                                            name={`yearInputCustomClass`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25 !p-1"
                                                            height="h-8"
                                                            placeholder="カスタムClass"
                                                        />
                                                    </InputContainer>
                                                </div>
                                                <div className="w-1/4 pl-2">
                                                    <InputContainer>
                                                        <Note
                                                            label={`yearWrapカスタムクラス`}
                                                            name={`yearWrapCustomClass`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25 !p-1"
                                                            height="h-8"
                                                            placeholder="カスタムClass"
                                                        />
                                                    </InputContainer>
                                                </div>
                                            </div>

                                            <div className="px-8 mb-4 mt-4">
                                                <label htmlFor="headerAreaShadow" className="text-blue-100 !mb-8 !mt-8">
                                                    月エリア
                                                </label>
                                            </div>

                                            <div className="flex px-8">
                                                <div className="w-1/6 pr-2">
                                                    <InputContainer>
                                                        <SelectBox
                                                            label={`月形式`}
                                                            name={`monthType`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25"
                                                            onChange={handleOnchange}
                                                        >
                                                            <option value="0">MM月</option>
                                                            <option value="1">MM</option>
                                                            {/* {monthDayTypeDropDownList.length > 0 &&
                                                            monthDayTypeDropDownList.map((field, index) => (
                                                                <option
                                                                    value={field.value}
                                                                    key={field.value + "_" + index}>
                                                                    {field.caption}
                                                                </option>
                                                            )
                                                            )} */}
                                                        </SelectBox>
                                                    </InputContainer>
                                                </div>
                                                <div className="w-1/6 px-2">
                                                    <InputContainer>
                                                        <TextBox
                                                            label={`ラベル`}
                                                            name={`monthLabel`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25"
                                                            placeholder="ラベル"
                                                        />
                                                    </InputContainer>
                                                </div>
                                                <div className="w-1/6 px-2">
                                                    <InputContainer>
                                                        <SelectBox
                                                            label={`必須`}
                                                            name={`monthRequired`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25"
                                                            onChange={handleOnchange}
                                                        >
                                                            {requiredDropDownItems.length > 0 &&
                                                                requiredDropDownItems.map((field, index) => (
                                                                    <option
                                                                        value={field.value}
                                                                        key={field.value + '_' + index}
                                                                    >
                                                                        {field.caption}
                                                                    </option>
                                                                ))}
                                                        </SelectBox>
                                                    </InputContainer>
                                                </div>
                                                <div className="w-1/6 px-2">
                                                    <InputContainer>
                                                        <TextBox
                                                            label={`name属性 `}
                                                            name={`monthName`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25"
                                                            placeholder="name属性"
                                                            isRequired={true}
                                                        />
                                                    </InputContainer>
                                                </div>
                                                <div className="w-1/6 px-2">
                                                    <InputContainer></InputContainer>
                                                </div>
                                                <div className="w-1/6 px-2">
                                                    <InputContainer></InputContainer>
                                                </div>
                                                <div className="w-1/6 pl-2">
                                                    <InputContainer>
                                                        <SelectBox
                                                            label={`初期選択`}
                                                            name={`monthInitialNumber`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25"
                                                            onChange={handleOnchange}
                                                        >
                                                            {monthLengthList.map((n, i) => (
                                                                <option key={n} value={String(n).padStart(2, '0')}>
                                                                    {n}
                                                                </option>
                                                            ))}
                                                        </SelectBox>
                                                    </InputContainer>
                                                </div>
                                            </div>

                                            <div className="flex px-8">
                                                <div className="w-1/4 pr-2">
                                                    <InputContainer>
                                                        <Note
                                                            label={`ラベルカスタムクラス `}
                                                            name={`monthLabelCustomClass`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25 !p-1"
                                                            height="h-8"
                                                            placeholder="カスタムClass"
                                                        />
                                                    </InputContainer>
                                                </div>
                                                <div className="w-1/4 px-2">
                                                    <InputContainer>
                                                        <Note
                                                            label={`エラーカスタムクラス`}
                                                            name={`monthRequiredErrorCustomClass`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25 !p-1"
                                                            height="h-8"
                                                            placeholder="カスタムClass"
                                                        />
                                                    </InputContainer>
                                                </div>
                                                <div className="w-1/4 px-2">
                                                    <InputContainer>
                                                        <Note
                                                            label={`monthInputカスタムクラス`}
                                                            name={`monthInputCustomClass`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25 !p-1"
                                                            height="h-8"
                                                            placeholder="カスタムClass"
                                                        />
                                                    </InputContainer>
                                                </div>
                                                <div className="w-1/4 pl-2">
                                                    <InputContainer>
                                                        <Note
                                                            label={`monthWrapカスタムクラス`}
                                                            name={`monthWrapCustomClass`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25 !p-1"
                                                            height="h-8"
                                                            placeholder="カスタムClass"
                                                        />
                                                    </InputContainer>
                                                </div>
                                            </div>

                                            <div className="px-8 mb-4 mt-4">
                                                <label htmlFor="headerAreaShadow" className="text-blue-100 !mb-8 !mt-8">
                                                    日エリア
                                                </label>
                                            </div>

                                            <div className="flex px-8">
                                                <div className="w-1/6 pr-2">
                                                    <InputContainer>
                                                        <SelectBox
                                                            label={`日形式`}
                                                            name={`dayType`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25"
                                                            onChange={handleOnchange}
                                                        >
                                                            <option value="0">DD日</option>
                                                            <option value="1">DD</option>
                                                            {/* {monthDayTypeDropDownList.length > 0 &&
                                                            monthDayTypeDropDownList.map((field, index) => (
                                                                <option
                                                                    value={field.value}
                                                                    key={field.value + "_" + index}>
                                                                    {field.caption}
                                                                </option>
                                                            )
                                                            )} */}
                                                        </SelectBox>
                                                    </InputContainer>
                                                </div>
                                                <div className="w-1/6 px-2">
                                                    <InputContainer>
                                                        <TextBox
                                                            label={`ラベル`}
                                                            name={`dayLabel`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25"
                                                            placeholder="ラベル"
                                                        />
                                                    </InputContainer>
                                                </div>
                                                <div className="w-1/6 px-2">
                                                    <InputContainer>
                                                        <SelectBox
                                                            label={`必須`}
                                                            name={`dayRequired`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25"
                                                            onChange={handleOnchange}
                                                        >
                                                            {requiredDropDownItems.length > 0 &&
                                                                requiredDropDownItems.map((field, index) => (
                                                                    <option
                                                                        value={field.value}
                                                                        key={field.value + '_' + index}
                                                                    >
                                                                        {field.caption}
                                                                    </option>
                                                                ))}
                                                        </SelectBox>
                                                    </InputContainer>
                                                </div>
                                                <div className="w-1/6 px-2">
                                                    <InputContainer>
                                                        <TextBox
                                                            label={`name属性 `}
                                                            name={`dayName`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25"
                                                            placeholder="name属性"
                                                            isRequired={true}
                                                        />
                                                    </InputContainer>
                                                </div>
                                                <div className="w-1/6 px-2">
                                                    <InputContainer></InputContainer>
                                                </div>
                                                <div className="w-1/6 px-2">
                                                    <InputContainer></InputContainer>
                                                </div>
                                                <div className="w-1/6 pl-2">
                                                    <InputContainer>
                                                        <SelectBox
                                                            label={`初期選択`}
                                                            name={`dayInitialNumber`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25"
                                                            onChange={handleOnchange}
                                                        >
                                                            {dayLengthList.map((n, i) => (
                                                                <option key={n} value={String(n).padStart(2, '0')}>
                                                                    {n}
                                                                </option>
                                                            ))}
                                                        </SelectBox>
                                                    </InputContainer>
                                                </div>
                                            </div>

                                            <div className="flex px-8">
                                                <div className="w-1/4 pr-2">
                                                    <InputContainer>
                                                        <Note
                                                            label={`ラベルカスタムクラス `}
                                                            name={`dayLabelCustomClass`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25 !p-1"
                                                            height="h-8"
                                                            placeholder="カスタムClass"
                                                        />
                                                    </InputContainer>
                                                </div>
                                                <div className="w-1/4 px-2">
                                                    <InputContainer>
                                                        <Note
                                                            label={`エラーカスタムクラス`}
                                                            name={`dayRequiredErrorCustomClass`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25 !p-1"
                                                            height="h-8"
                                                            placeholder="カスタムClass"
                                                        />
                                                    </InputContainer>
                                                </div>
                                                <div className="w-1/4 px-2">
                                                    <InputContainer>
                                                        <Note
                                                            label={`dayInputカスタムクラス`}
                                                            name={`dayInputCustomClass`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25 !p-1"
                                                            height="h-8"
                                                            placeholder="カスタムClass"
                                                        />
                                                    </InputContainer>
                                                </div>
                                                <div className="w-1/4 pl-2">
                                                    <InputContainer>
                                                        <Note
                                                            label={`dayWrapカスタムクラス`}
                                                            name={`dayWrapCustomClass`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25 !p-1"
                                                            height="h-8"
                                                            placeholder="カスタムClass"
                                                        />
                                                    </InputContainer>
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    <InputContainer>
                                        <Note
                                            label="blockWrapカスタムクラス"
                                            name="blockWrapCustomClass"
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25 !p-1"
                                            height="h-8"
                                            placeholder="blockWrapカスタムクラス"
                                        />
                                    </InputContainer>
                                </div>
                            </div>

                            <BlockModalFooter
                                errors={uniqueError}
                                setModalOpen={() => setModalOpen(false)}
                                handleOnPressSave={(e) => handleOnPressSave(e, formData)}
                            />
                        </Form>
                    </div>
                </Formik>
            </WhiteModalWrapper>
        </>
    );
}
