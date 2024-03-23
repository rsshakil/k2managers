import React, { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import {
    readOnlyDropDownItems, requiredDropDownItems
} from '../../../lib/commonConstants';
import { getFieldDropDownItemsByFieldType } from '../../../services/appDesignerService';
import SelectBox from '../../Form/FormInputs/SelectBox';
import TextBox from '../../Form/FormInputs/TextBox';
import Loader from '../../Loading/Loader';
import ModalTitle from '../../Modal/components/ModalTitle';
import WhiteModalWrapper from '../../Modal/components/WhiteModalWrapper';
import InputContainer from '../../Wrapper/InputContainer';
import BlockModalFooter from './BlockModalFooter';
import { valueFormatCheck } from '../../../utilities/commonFunctions';
import Note from '../../Form/FormInputs/Note';

export default function BirthdayBlockForm({
    blockData = '',
    setModalOpen = () => {},
    handleOnPressSave = () => {},
    handleBlur = () => {},
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

        if (e.target.name === 'fieldId') {
            const findField = dropDownItemData.find((x) => x.fieldId === +value);
            setFormDateDataValue('fieldCodeBirthday', findField.fieldCode);
        }
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
    let monthLengthList = Array.from({ length: 12 }, (_, i) => i + 1);
    let dayLengthList = Array.from({ length: 31 }, (_, i) => i + 1);
    function rangeItems(start, end) {
        return Array(end - start + 1)
            .fill()
            .map((_, idx) => start + idx);
    }
    const yearRange1900 = rangeItems(1900, 2030);
    const yearEndList = rangeItems(formData.yearDropdownStartNumber ?? 1900, 2030);
    const yearInitialValue = rangeItems(
        formData.yearDropdownStartNumber ?? 1900,
        formData.yearDropdownEndNumber ?? 2030
    );

    function setFormDateDataValue(name, value) {
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
    return (
        <>
            {loading && <Loader />}

            <WhiteModalWrapper width="border-none text-black" className="items-start">
                <ModalTitle title="入力フォームinputBirthDay設定" className="text-blue-100 text-xl" />

                <Formik enableReinitialize={true} initialValues={formData}>
                    <div className="relative w-full h-full">
                        <Form onChange={handleOnchange}>
                            <div className="body-height3 pt-12 px-10 min-h-[calc(100vh-452px)] !p-0">
                                <div className="flex flex-col py-10">
                                    <InputContainer>
                                        <TextBox
                                            label="対象フィールド"
                                            name="notUse"
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-gray-300 placeholder-gray-300 cursor-default pointer-events-none"
                                            defaultValue="基本グループ：生年月日（8桁）"
                                            readOnly
                                        />
                                    </InputContainer>

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
                                                            <option value={field.value} key={field.value + '_' + index}>
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
                                                    onBlur={(e) => handleBlur(e, blockData.appPageBlockId)}
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
                                                    value={formData.yearDropdownStartNumber}
                                                >
                                                    {yearRange1900.map((n, i) => (
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
                                                    value={formData.yearDropdownEndNumber}
                                                >
                                                    <option selected value="2030">
                                                        2030
                                                    </option>
                                                    {yearEndList.map((n, i) => (
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
                                                    value={formData.yearInitialNumber}
                                                    onChange={handleOnchange}
                                                >
                                                    {yearInitialValue.map((n, i) => (
                                                        <option key={n} value={n}>
                                                            {n}
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
                                                    label="必須表示"
                                                    name="yearRequiredDisplay"
                                                    labelClassName="text-blue-100 text-xs"
                                                    inputClassName="bg-blue-25"
                                                    value={formData.yearRequiredDisplay}
                                                    onChange={handleOnchange}
                                                >
                                                    <option value={false}>非表示</option>
                                                    <option value={true}>表示</option>
                                                </SelectBox>
                                            </InputContainer>
                                        </div>

                                        <div className="w-1/5 pr-2">
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
                                        <div className="w-1/5 px-2">
                                            <InputContainer>
                                                <Note
                                                    label={`必須エラーカスタムクラス`}
                                                    name={`yearRequiredCustomClass`}
                                                    labelClassName="text-blue-100 text-xs"
                                                    inputClassName="bg-blue-25 !p-1"
                                                    height="h-8"
                                                    placeholder="カスタムClass"
                                                />
                                            </InputContainer>
                                        </div>
                                        <div className="w-1/5 px-2">
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
                                        <div className="w-1/5 pl-2">
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
                                                            <option value={field.value} key={field.value + '_' + index}>
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
                                                    handleBlur={handleBlur}
                                                    name={`monthName`}
                                                    labelClassName="text-blue-100 text-xs"
                                                    inputClassName="bg-blue-25"
                                                    placeholder="name属性"
                                                    isRequired={true}
                                                    onBlur={(e) => handleBlur(e, blockData.appPageBlockId)}
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
                                                        <option key={n} value={n}>
                                                            {n}
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
                                                    label="必須表示"
                                                    name="monthRequiredDisplay"
                                                    labelClassName="text-blue-100 text-xs"
                                                    inputClassName="bg-blue-25"
                                                    value={formData.monthRequiredDisplay}
                                                    onChange={handleOnchange}
                                                >
                                                    <option value={false}>非表示</option>
                                                    <option value={true}>表示</option>
                                                </SelectBox>
                                            </InputContainer>
                                        </div>
                                        <div className="w-1/5 pr-2">
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
                                        <div className="w-1/5 px-2">
                                            <InputContainer>
                                                <Note
                                                    label={`必須エラーカスタムクラス`}
                                                    name={`monthRequiredCustomClass`}
                                                    labelClassName="text-blue-100 text-xs"
                                                    inputClassName="bg-blue-25 !p-1"
                                                    height="h-8"
                                                    placeholder="カスタムClass"
                                                />
                                            </InputContainer>
                                        </div>
                                        <div className="w-1/5 px-2">
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
                                        <div className="w-1/5 pl-2">
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
                                                            <option value={field.value} key={field.value + '_' + index}>
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
                                                    handleBlur={handleBlur}
                                                    name={`dayName`}
                                                    labelClassName="text-blue-100 text-xs"
                                                    inputClassName="bg-blue-25"
                                                    placeholder="name属性"
                                                    isRequired={true}
                                                    onBlur={(e) => {
                                                        handleBlur(e, formData.appPageBlockId);
                                                    }}
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
                                                        <option key={n} value={n}>
                                                            {n}
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
                                                    label="必須表示"
                                                    name="dayRequiredDisplay"
                                                    labelClassName="text-blue-100 text-xs"
                                                    inputClassName="bg-blue-25"
                                                    value={formData.dayRequiredDisplay}
                                                    onChange={handleOnchange}
                                                >
                                                    <option value={false}>非表示</option>
                                                    <option value={true}>表示</option>
                                                </SelectBox>
                                            </InputContainer>
                                        </div>

                                        <div className="w-1/5 pr-2">
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
                                        <div className="w-1/5 px-2">
                                            <InputContainer>
                                                <Note
                                                    label={`必須エラーカスタムクラス`}
                                                    name={`dayRequiredCustomClass`}
                                                    labelClassName="text-blue-100 text-xs"
                                                    inputClassName="bg-blue-25 !p-1"
                                                    height="h-8"
                                                    placeholder="カスタムClass"
                                                />
                                            </InputContainer>
                                        </div>
                                        <div className="w-1/5 px-2">
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
                                        <div className="w-1/5 pl-2">
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
