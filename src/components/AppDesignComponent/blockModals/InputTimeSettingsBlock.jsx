import React, { useEffect, useState } from 'react';

import { Form, Formik } from 'formik';
import _ from 'lodash';
import {
    hourTypeList,
    minuteTypeList,
    pickerDropDownList,
    readOnlyDropDownItems,
    requiredDropDownItems
} from '../../../lib/commonConstants';
import { autoComplete } from '../../../lib/tailwindClassAttributes';
import { getFieldDropDownItemsByFieldType } from '../../../services/appDesignerService';
import { valueFormatCheck } from '../../../utilities/commonFunctions';
import Note from '../../Form/FormInputs/Note';
import SelectBox from '../../Form/FormInputs/SelectBox';
import TextBox from '../../Form/FormInputs/TextBox';
import TimePickerInput from '../../Form/FormInputs/TimePickerInput';
import Loader from '../../Loading/Loader';
import ModalTitle from '../../Modal/components/ModalTitle';
import WhiteModalWrapper from '../../Modal/components/WhiteModalWrapper';
import InputContainer from '../../Wrapper/InputContainer';
import BlockModalFooter from './BlockModalFooter';

export default function InputTimeSettingsBlock({
    blockData = '',
    setModalOpen = () => { },
    handleOnPressSave = () => { },
    uniqueError = {},
}) {
    const [dropDownItemData, setDropDownItems] = useState([]);
    const [loading, setLoading] = useState(true);

    async function getFileterItemsByFieldType() {
        const projectId = window.sessionStorage.getItem('currentProjectId');
        const { data, status } = await getFieldDropDownItemsByFieldType(projectId, 6);
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

        if (name === 'hourDropdownStartNumber' || name === 'hourDropdownEndNumber') {
            let obj = { [name]: value };
            const { hourInitialNumber, hourDropdownEndNumber, hourDropdownStartNumber } = formData;

            if (name === 'hourDropdownStartNumber') {
                if (!_.inRange(hourInitialNumber, value, hourDropdownEndNumber + 1)) {
                    obj.hourInitialNumber = value;
                }

                if (value > hourDropdownEndNumber) {
                    obj.hourDropdownEndNumber = value;
                }
            } else if (name === 'hourDropdownEndNumber') {
                if (!_.inRange(hourInitialNumber, hourDropdownStartNumber, value + 1)) {
                    obj.hourInitialNumber = hourDropdownStartNumber;
                }
            }

            setFormData((prevState) => ({
                ...prevState,
                ...obj,
            }));
        } else if (name === 'minuteDropdownStartNumber' || name === 'minuteDropdownEndNumber') {
            let obj = { [name]: value };
            const { minuteInitialNumber, minuteDropdownEndNumber, minuteDropdownStartNumber } = formData;

            if (name === 'minuteDropdownStartNumber') {
                let updatedMinuteDropdownEndNumber = minuteDropdownEndNumber;
                if (value > minuteDropdownEndNumber) {
                    obj.minuteDropdownEndNumber = value;
                    updatedMinuteDropdownEndNumber = value;
                }

                if (!_.inRange(minuteInitialNumber, value, updatedMinuteDropdownEndNumber + 1)) {
                    obj.minuteInitialNumber = value;
                }
            } else if (name === 'minuteDropdownEndNumber') {
                if (!_.inRange(minuteInitialNumber, minuteDropdownStartNumber, value + 1)) {
                    obj.minuteInitialNumber = minuteDropdownStartNumber;
                }
            }

            setFormData((prevState) => ({
                ...prevState,
                ...obj,
            }));
        } else {
            if (e.target.name === 'fieldId') {
                const findField = dropDownItemData.find((x) => x.fieldId === +value);
                const { fieldCode = '' } = findField || {};

                setFormDateDataValue('fieldCode', fieldCode);
            }

            setFormData((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    }
    let hourList = _.range(0, 24);
    let minuteList = _.range(0, 60);

    function rangeItems(start, end, steps = 1) {
        return Array(end - start + 1)
            .fill()
            .map((_, idx) => (start + idx) * steps);
    }
    const stepRange99 = rangeItems(1, 99, 60);

    function setTimeValues(dateValues) {
        setFormDateDataValue('value', dateValues);
    }

    function setMinTimeValue(dateValues) {
        setFormDateDataValue('minValue', dateValues);
    }

    function setMaxTimeValue(dateValues) {
        setFormDateDataValue('maxValue', dateValues);
    }

    function setFormDateDataValue(name, value) {
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const initialSelectionHourList = () => {
        const { hourDropdownStartNumber = 0, hourDropdownEndNumber = 23 } = formData;

        return _.range(Number(hourDropdownStartNumber), Number(hourDropdownEndNumber) + 1);
    };
    const initialSelectionMinuteList = () => {
        const { minuteDropdownStartNumber = 0, minuteDropdownEndNumber = 59 } = formData;

        return _.range(Number(minuteDropdownStartNumber), Number(minuteDropdownEndNumber) + 1);
    };

    const endSelectionHourList = () => {
        const { hourDropdownStartNumber = 0 } = formData;

        return hourList.filter((x) => x >= hourDropdownStartNumber);
    };
    const endSelectionMinuteList = () => {
        const { minuteDropdownStartNumber = 0 } = formData;

        return minuteList.filter((x) => x >= minuteDropdownStartNumber);
    };

    return (
        <>
            {loading && <Loader />}

            <WhiteModalWrapper width="border-none text-black" className="items-start">
                <ModalTitle title="入力フォームinputTime設定" className="text-blue-100 text-xl" />

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
                                            <option value={false}>分割しない</option>
                                            <option value={true}>時分に分割する</option>
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
                                            <option value="">フィールドを選択してください</option>
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
                                                        <TimePickerInput
                                                            label="value（初期値）"
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25"
                                                            timePickerWidth="w-full"
                                                            name="value"
                                                            value={formData.value}
                                                            setTimeValue={setTimeValues}
                                                            placeholder="value"
                                                        />
                                                    </InputContainer>
                                                </div>

                                                <div className="w-1/5 px-2">
                                                    <InputContainer>
                                                        <TimePickerInput
                                                            label="min(最小時刻)"
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25"
                                                            timePickerWidth="w-full"
                                                            name="minValue"
                                                            value={formData.minValue}
                                                            setTimeValue={setMinTimeValue}
                                                            placeholder="min"
                                                        />
                                                    </InputContainer>
                                                </div>

                                                <div className="w-1/5 px-2">
                                                    <InputContainer>
                                                        <TimePickerInput
                                                            label="max(最大時刻)"
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25"
                                                            name="maxValue"
                                                            value={formData.maxValue}
                                                            timePickerWidth="w-full"
                                                            setTimeValue={setMaxTimeValue}
                                                            placeholder="max"
                                                        />
                                                    </InputContainer>
                                                </div>

                                                <div className="w-1/5 pl-2">
                                                    <InputContainer>
                                                        <SelectBox
                                                            label={`ステップ分`}
                                                            name={`step`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25"
                                                            onChange={handleOnchange}
                                                        >
                                                            {stepRange99.map((n, i) => (
                                                                <option key={i} value={n}>
                                                                    {i + 1}分
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
                                                            label={`最小以下エラー時テキスト `}
                                                            name={`minErrorText`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25"
                                                            placeholder="最小以下エラー時テキスト"
                                                        />
                                                    </InputContainer>
                                                </div>

                                                <div className="w-1/5 px-2">
                                                    <InputContainer>
                                                        <TextBox
                                                            label={`最大以上エラー時テキスト `}
                                                            name={`maxErrorText`}
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
                                                            label="placeholder"
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
                                                            label="name属性"
                                                            name={`name`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25"
                                                            placeholder="name属性"
                                                            isRequired
                                                        />
                                                    </InputContainer>
                                                </div>
                                                <div className="w-3/5 pl-2">
                                                    <InputContainer>
                                                        <Note
                                                            label="エラーテキストカスタムクラス"
                                                            name={`errorCustomClass`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25 !p-1"
                                                            height="h-8"
                                                            placeholder="カスタムClass"
                                                        />
                                                    </InputContainer>
                                                </div>
                                            </div>
                                            <div className="px-8">
                                                <InputContainer>
                                                    <Note
                                                        label="ラベルカスタムクラス"
                                                        name={`labelCustomClass`}
                                                        labelClassName="text-blue-100 text-xs"
                                                        inputClassName="bg-blue-25 !p-1"
                                                        height="h-8"
                                                        placeholder="カスタムClass"
                                                    />
                                                </InputContainer>
                                                <InputContainer>
                                                    <Note
                                                        label="inputTimeカスタムクラス"
                                                        name={`inputTimeCustomClass`}
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
                                            <div className="mb-4 mt-4">
                                                <label htmlFor="headerAreaShadow" className="text-blue-100 !mb-8 !mt-8">
                                                    時エリア
                                                </label>
                                            </div>
                                            <div className="flex flex-start space-x-4">
                                                <div className="w-1/6">
                                                    <InputContainer>
                                                        <SelectBox
                                                            label={`時形式`}
                                                            name={`hourType`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25"
                                                            onChange={handleOnchange}
                                                        >
                                                            {hourTypeList.length > 0 &&
                                                                hourTypeList.map((field, index) => (
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
                                                <div className="w-1/6">
                                                    <InputContainer>
                                                        <TextBox
                                                            label={`ラベル `}
                                                            name={`hourLabel`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25"
                                                            placeholder="ラベル"
                                                        />
                                                    </InputContainer>
                                                </div>
                                                <div className="w-1/6">
                                                    <InputContainer>
                                                        <SelectBox
                                                            label={`必須`}
                                                            name={`hourRequired`}
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
                                                <div className="w-1/6">
                                                    <InputContainer>
                                                        <TextBox
                                                            label={`name属性`}
                                                            name={`hourName`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25"
                                                            placeholder="name属性"
                                                            isRequired={true}
                                                        />
                                                    </InputContainer>
                                                </div>
                                                <div className="w-1/6">
                                                    <InputContainer>
                                                        <SelectBox
                                                            label={`ドロップダウン開始時`}
                                                            name={`hourDropdownStartNumber`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25"
                                                            onChange={handleOnchange}
                                                            value={formData.hourDropdownStartNumber}
                                                        >
                                                            {hourList.map((n) => (
                                                                <option key={n} value={n}>
                                                                    {n}
                                                                </option>
                                                            ))}
                                                        </SelectBox>
                                                    </InputContainer>
                                                </div>
                                                <div className="w-1/6">
                                                    <InputContainer>
                                                        <SelectBox
                                                            label={`ドロップダウン終了時`}
                                                            name={`hourDropdownEndNumber`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25"
                                                            onChange={handleOnchange}
                                                            value={formData.hourDropdownEndNumber}
                                                        >
                                                            {endSelectionHourList().map((n) => (
                                                                <option key={n} value={n}>
                                                                    {n}
                                                                </option>
                                                            ))}
                                                        </SelectBox>
                                                    </InputContainer>
                                                </div>
                                                <div className="w-1/6">
                                                    <InputContainer>
                                                        <SelectBox
                                                            label={`ドロップダウン初期選択`}
                                                            name={`hourInitialNumber`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25"
                                                            onChange={handleOnchange}
                                                        >
                                                            {initialSelectionHourList().map((n) => (
                                                                <option key={n} value={n}>
                                                                    {n}
                                                                </option>
                                                            ))}
                                                        </SelectBox>
                                                    </InputContainer>
                                                </div>
                                            </div>

                                            <div className="flex flex-start space-x-4">
                                                <div className="w-1/4">
                                                    <InputContainer>
                                                        <Note
                                                            label={`ラベルカスタムクラス `}
                                                            name={`hourLabelCustomClass`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25 !p-1"
                                                            height="h-8"
                                                            placeholder="カスタムClass"
                                                        />
                                                    </InputContainer>
                                                </div>
                                                <div className="w-1/4">
                                                    <InputContainer>
                                                        <Note
                                                            label={`エラーカスタムクラス`}
                                                            name={`hourErrorCustomClass`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25 !p-1"
                                                            height="h-8"
                                                            placeholder="カスタムClass"
                                                        />
                                                    </InputContainer>
                                                </div>
                                                <div className="w-1/4">
                                                    <InputContainer>
                                                        <Note
                                                            label={`hourInputカスタムクラス`}
                                                            name={`hourInputCustomClass`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25 !p-1"
                                                            height="h-8"
                                                            placeholder="カスタムClass"
                                                        />
                                                    </InputContainer>
                                                </div>
                                                <div className="w-1/4">
                                                    <InputContainer>
                                                        <Note
                                                            label={`hourWrapカスタムクラス`}
                                                            name={`hourWrapCustomClass`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25 !p-1"
                                                            height="h-8"
                                                            placeholder="カスタムClass"
                                                        />
                                                    </InputContainer>
                                                </div>
                                            </div>

                                            <div className="mb-4 mt-4">
                                                <label htmlFor="headerAreaShadow" className="text-blue-100 !mb-8 !mt-8">
                                                    分エリア
                                                </label>
                                            </div>

                                            <div className="flex flex-start space-x-4">
                                                <div className="w-1/6">
                                                    <InputContainer>
                                                        <SelectBox
                                                            label={`分形式`}
                                                            name={`minuteType`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25"
                                                            onChange={handleOnchange}
                                                        >
                                                            {minuteTypeList.length > 0 &&
                                                                minuteTypeList.map((field, index) => (
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
                                                <div className="w-1/6">
                                                    <InputContainer>
                                                        <TextBox
                                                            label={`ラベル`}
                                                            name={`minuteLabel`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25"
                                                            placeholder="ラベル"
                                                        />
                                                    </InputContainer>
                                                </div>
                                                <div className="w-1/6">
                                                    <InputContainer>
                                                        <SelectBox
                                                            label={`必須`}
                                                            name={`minuteRequired`}
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
                                                <div className="w-1/6">
                                                    <InputContainer>
                                                        <TextBox
                                                            label={`name属性 `}
                                                            name={`minuteName`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25"
                                                            placeholder="name属性"
                                                            isRequired={true}
                                                        />
                                                    </InputContainer>
                                                </div>
                                                <div className="w-1/6">
                                                    <InputContainer>
                                                        <SelectBox
                                                            label={`ドロップダウン開始分`}
                                                            name={`minuteDropdownStartNumber`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25"
                                                            onChange={handleOnchange}
                                                            value={formData.minuteDropdownStartNumber}
                                                        >
                                                            {minuteList.map((n) => (
                                                                <option key={n} value={n}>
                                                                    {n}
                                                                </option>
                                                            ))}
                                                        </SelectBox>
                                                    </InputContainer>
                                                </div>
                                                <div className="w-1/6">
                                                    <InputContainer>
                                                        <SelectBox
                                                            label={`ドロップダウン終了分`}
                                                            name={`minuteDropdownEndNumber`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25"
                                                            onChange={handleOnchange}
                                                            value={formData.minuteDropdownEndNumber}
                                                        >
                                                            {endSelectionMinuteList().map((n) => (
                                                                <option key={n} value={n}>
                                                                    {n}
                                                                </option>
                                                            ))}
                                                        </SelectBox>
                                                    </InputContainer>
                                                </div>
                                                <div className="w-1/6">
                                                    <InputContainer>
                                                        <SelectBox
                                                            label={`ドロップダウン初期選択`}
                                                            name={`minuteInitialNumber`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25"
                                                            onChange={handleOnchange}
                                                        >
                                                            {initialSelectionMinuteList().map((x) => (
                                                                <option key={x} value={x}>
                                                                    {x}
                                                                </option>
                                                            ))}
                                                        </SelectBox>
                                                    </InputContainer>
                                                </div>
                                            </div>

                                            <div className="flex flex-start space-x-4">
                                                <div className="w-1/4">
                                                    <InputContainer>
                                                        <Note
                                                            label={`ラベルカスタムクラス `}
                                                            name={`minuteLabelCustomClass`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25 !p-1"
                                                            height="h-8"
                                                            placeholder="カスタムClass"
                                                        />
                                                    </InputContainer>
                                                </div>
                                                <div className="w-1/4">
                                                    <InputContainer>
                                                        <Note
                                                            label={`エラーカスタムクラス`}
                                                            name={`minuteErrorCustomClass`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25 !p-1"
                                                            height="h-8"
                                                            placeholder="カスタムClass"
                                                        />
                                                    </InputContainer>
                                                </div>
                                                <div className="w-1/4">
                                                    <InputContainer>
                                                        <Note
                                                            label={`minuteInputカスタムクラス`}
                                                            name={`minuteInputCustomClass`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25 !p-1"
                                                            height="h-8"
                                                            placeholder="カスタムClass"
                                                        />
                                                    </InputContainer>
                                                </div>
                                                <div className="w-1/4">
                                                    <InputContainer>
                                                        <Note
                                                            label={`minuteWrapカスタムクラス`}
                                                            name={`minuteWrapCustomClass`}
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
                                    <div className="mt-10">
                                        <InputContainer>
                                            <Note
                                                label="placeholderカスタムクラス"
                                                name="placeholderCustomClass"
                                                labelClassName="text-blue-100"
                                                inputClassName="bg-blue-25 !p-1"
                                                height="h-8"
                                                placeholder="placeholderカスタムクラス"
                                            />
                                        </InputContainer>
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
