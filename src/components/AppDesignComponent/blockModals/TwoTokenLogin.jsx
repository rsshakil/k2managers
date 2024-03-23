import { Form, Formik } from "formik";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

import { getFieldList } from "../../../services/appDesignerService";
import { getTransitionDestinationRouteList } from "../../../store/recoil/appDesignerState";
import SelectBox from "../../Form/FormInputs/SelectBox";
import TextBox from "../../Form/FormInputs/TextBox";
import ModalTitle from "../../Modal/components/ModalTitle";
import WhiteModalWrapper from '../../Modal/components/WhiteModalWrapper';
import InputContainer from "../../Wrapper/InputContainer";

import { valueFormatCheck } from "../../../utilities/commonFunctions";
import Note from "../../Form/FormInputs/Note";
import Loader from "../../Loading/Loader";
import BlockModalFooter from "./BlockModalFooter";
import IconPicker from "../../IconPicker/IconPicker";

import {
    autoComplete, inputMode
} from '../../../lib/tailwindClassAttributes';

export default function TwoTokenLogin({ blockData = '', divisionNumber = 3, buttonType = 'a', setModalOpen = () => { }, handleOnPressSave = () => { }, uniqueError = {} }) {
    const transitionRoutes = useRecoilValue(getTransitionDestinationRouteList);
    const [formData, setFormData] = useState(blockData);
    const [fieldList, setFieldList] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        async function fetchFieldListInit() {
            try {
                setLoading(true);
                const projectId = sessionStorage.getItem("currentProjectId")

                const { data, status } = await getFieldList('4', projectId);

                if (status == 200) {
                    let { records = [] } = data || [];

                    records = records.map(record => _.pick(record, ['fieldId', 'fieldCode', 'fieldType', 'fieldName']))

                    setFieldList(records);
                }

                setLoading(false);

            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        }

        fetchFieldListInit();

    }, [])

    function handleOnchange(e) {
        const name = e.target.name;
        const value = valueFormatCheck(e.target.value);

        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    function handleOnChangeIcon(name, icon) {
        // updateState(name, icon, 'info');
        setFormData((prevState) => ({
            ...prevState,
            [name]: icon,
        }));
    }

    let numField = Array.from({ length: divisionNumber }, (_, i) => i + 1);
    let splitField = Array.from({ length: 100 }, (_, i) => i + 1);

    let areaInputTypeValueList = [
        formData.area1InputType, formData.area2InputType, formData.area3InputType, formData.area4InputType
    ];

    function rangeItems(start, end) {
        return Array(end - start + 1).fill().map((_, idx) => start + idx);
    }
    const yearRange1900 = rangeItems(1900, 2030);
    const yearEndList = rangeItems(formData.yearDropdownStartNumber ?? 1900, 2030);
    const yearInitialValue = rangeItems(formData.yearDropdownStartNumber ?? 1900, formData.yearDropdownEndNumber ?? 2030);

    return (
        <>
            {loading && <Loader />}

            <WhiteModalWrapper width="border-none text-black" className="items-start">
                <ModalTitle title="2トークンログインブロック設定（トークン2は年月日）" className="text-blue-100 text-xl" />

                <Formik
                    enableReinitialize={true}
                    initialValues={formData}
                >
                    <div className='relative w-full h-full'>
                        <Form onChange={handleOnchange}>
                            <div className="body-height3 pt-12 px-10 min-h-[calc(100vh-452px)] !p-0">
                                <div className="flex flex-col py-10">
                                    <InputContainer>
                                        <TextBox label="ボタン表示名"
                                            name="buttonText"
                                            placeholder="ボタン表示名"
                                            labelClassName='text-blue-100'
                                            inputClassName='bg-blue-25'
                                        />
                                    </InputContainer>

                                    <div className="flex">
                                        <div className="w-1/2 pr-2">
                                            <InputContainer>
                                                <SelectBox
                                                    label={`エリア１対象トークン`}
                                                    name={`area1token`}
                                                    labelClassName="text-blue-100 text-xs"
                                                    inputClassName="bg-blue-25"
                                                    onChange={handleOnchange}
                                                >
                                                    <option value="token1">1</option>
                                                    <option value="token2">2</option>
                                                    <option value="token3">3</option>
                                                </SelectBox>
                                            </InputContainer>
                                        </div>
                                        <div className="w-1/2">
                                            <InputContainer>
                                                <SelectBox
                                                    label={`エリア2対象トークン `}
                                                    name={`area2token`}
                                                    labelClassName="text-blue-100 text-xs"
                                                    inputClassName="bg-blue-25"
                                                    onChange={handleOnchange}
                                                >
                                                    <option value="token1">1</option>
                                                    <option value="token2">2</option>
                                                    <option value="token3">3</option>
                                                </SelectBox>
                                            </InputContainer>


                                        </div>
                                    </div>

                                    <div className="flex">
                                        <div className="w-1/3 pr-2">
                                            <InputContainer>
                                                <SelectBox
                                                    label="ログイン成功時遷移先"
                                                    name="successDestination"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25"
                                                    value={formData.successDestination}
                                                    onChange={handleOnchange}
                                                >
                                                    <option value="">なし</option>
                                                    {transitionRoutes.map(x => <option key={x.id}
                                                        value={x.url}>{x.name}</option>)}
                                                </SelectBox>
                                            </InputContainer>
                                        </div>
                                        <div className="w-1/3 px-2">
                                            <InputContainer>
                                                <TextBox label="ログイン失敗時ボタン下表示文言"
                                                    name="failureMessage"
                                                    placeholder="ログイン失敗時ボタン下表示文言"
                                                    labelClassName='text-blue-100'
                                                    inputClassName='bg-blue-25'
                                                />
                                            </InputContainer>
                                        </div>
                                        <div className="w-1/3 pl-2">
                                            <InputContainer>
                                                <TextBox label="ネットワークエラー時ボタン下表示文言"
                                                    name="networkErrorMessage"
                                                    placeholder="ネットワークエラー時ボタン下表示文言"
                                                    labelClassName='text-blue-100'
                                                    inputClassName='bg-blue-25'
                                                />
                                            </InputContainer>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="w-1/2 pr-2">

                                            <InputContainer>
                                                {/* <SelectBox
                                                    label="配置ボタンタイプ"
                                                    name="buttonType"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25"
                                                    value={formData.buttonType}
                                                    onChange={handleOnchange}
                                                >
                                                    <option value="a">A</option>
                                                    <option value="b">B</option>
                                                    <option value="c">C</option>
                                                </SelectBox> */}
                                                <TextBox
                                                    label="配置ボタンタイプ"
                                                    name="buttonType"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-gray-300 cursor-default pointer-events-none"
                                                    readOnly
                                                    tabIndex="-1"
                                                    value={buttonType}
                                                />

                                            </InputContainer>
                                        </div>
                                        <div className="w-1/2 pl-2">
                                            <InputContainer>

                                                <TextBox
                                                    label="トークン1入力エリア分割数（1トークンログイン設定ページの設定値）"
                                                    name="divisionNumber"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-gray-300 cursor-default pointer-events-none"
                                                    readOnly
                                                    tabIndex="-1"
                                                    value={divisionNumber}
                                                />
                                            </InputContainer>
                                        </div>
                                    </div>

                                    <InputContainer>
                                        <SelectBox
                                            label="ログインチェック状態記録先フィールド	 "
                                            name={`loginAuthTargetField`}
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25"
                                            onChange={handleOnchange}
                                        >
                                            <option value=''>記録しない</option>
                                            {fieldList.map(x => <option key={x.fieldId}
                                                value={x?.fieldCode}>{x.fieldName}</option>)}
                                        </SelectBox>
                                    </InputContainer>
                                    <div className="flex">
                                        {numField.length > 0 && numField.map((number, index) => (
                                            <div
                                                className={`w-1/${numField.length} ${index > 0 && numField.length != number ? 'px-2' : ''}`}>
                                                <InputContainer>
                                                    <SelectBox
                                                        label={`トークン分割${number}(先頭詰め)）`}
                                                        name={`numberOfSplitCharacters${number}`}
                                                        labelClassName="text-blue-100 text-xs"
                                                        inputClassName="bg-blue-25"
                                                        onChange={handleOnchange}
                                                    >

                                                        {splitField.map((n, i) => <option key={i}
                                                            value={i}>{i}</option>)}
                                                    </SelectBox>
                                                </InputContainer>

                                            </div>
                                        ))}
                                    </div>


                                    {numField.length > 0 && numField.map((number, index) => (
                                        <React.Fragment key={index}>
                                            <label htmlFor="headerAreaShadow"
                                                className="text-blue-100 !mb-8 !mt-8">{`トークン1　入力エリア${number}`}</label>
                                            <div className="px-8">
                                                <InputContainer>
                                                    <TextBox label="許可パターン正規表現"
                                                        name={`t1Area${number}RegularExpressions`}
                                                        placeholder="許可パターン正規表現"
                                                        labelClassName='text-blue-100'
                                                        inputClassName='bg-blue-25'
                                                    />
                                                </InputContainer>
                                            </div>
                                            <div className="flex px-8">
                                                <div className="w-1/5 pr-2">
                                                    <InputContainer>
                                                        <SelectBox
                                                            label={`文字数`}
                                                            name={`t1Area${number}TextLength`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25"
                                                            onChange={handleOnchange}
                                                        >
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                            <option value="4">4</option>
                                                            <option value="5">5</option>
                                                            <option value="6">6</option>
                                                            <option value="7">7</option>
                                                            <option value="8">8</option>
                                                            <option value="9">9</option>
                                                        </SelectBox>
                                                    </InputContainer>

                                                </div>

                                                <div className="w-1/5 px-2">
                                                    <InputContainer>
                                                        <SelectBox
                                                            label={`入力方法`}
                                                            name={`t1Area${number}InputType`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25"
                                                            onChange={handleOnchange}
                                                        >
                                                            {/* <option value="0">ドロップダウン</option> */}
                                                            <option value="1">キーボード</option>
                                                        </SelectBox>
                                                    </InputContainer>

                                                </div>
                                                {/* <div className="w-1/5 px-2">
                                                    <InputContainer>
                                                        <SelectBox
                                                            label={`ドロップダウン開始数（ゼロ埋め）`}
                                                            name={`t1Area${number}DropdownStartNumber`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25"
                                                            onChange={handleOnchange}
                                                        >
                                                            {yearRange1900.map((n, i) => <option key={n} value={n}>{n}</option>)}
                                                        </SelectBox>
                                                    </InputContainer>

                                                </div>

                                                <div className="w-1/5 px-2">
                                                    <InputContainer>
                                                        <SelectBox
                                                            label={`ドロップダウン終了数（ゼロ埋め）`}
                                                            name={`t1Area${number}DropdownEndNumber`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25"
                                                            onChange={handleOnchange}
                                                        >
                                                            {yearRange1900.map((n, i) => <option key={n} value={n}>{n}</option>)}
                                                        </SelectBox>
                                                    </InputContainer>

                                                </div>

                                                <div className="w-1/5 pl-2">
                                                    <InputContainer>
                                                        <SelectBox
                                                            label={`ドロップダウン初期選択`}
                                                            name={`t1Area${number}InitialNumber`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25"
                                                            onChange={handleOnchange}
                                                        >
                                                            {yearRange1900.map((n, i) => <option key={n} value={n}>{n}</option>)}
                                                        </SelectBox>
                                                    </InputContainer>

                                                </div> */}

                                            </div>
                                            <div className="flex px-8">
                                                <div className="w-1/5 pr-2">
                                                    <InputContainer>
                                                        <TextBox label="ラベル"
                                                            name={`t1Area${number}Label`}
                                                            placeholder="ラベル"
                                                            labelClassName='text-blue-100'
                                                            inputClassName='bg-blue-25'
                                                        />
                                                    </InputContainer>

                                                </div>

                                                <div className="w-1/5 px-2">
                                                    <InputContainer>
                                                        <TextBox label="placeholder"
                                                            name={`t1Area${number}Placeholder`}
                                                            placeholder="placeholder"
                                                            labelClassName='text-blue-100'
                                                            inputClassName='bg-blue-25'
                                                        />
                                                    </InputContainer>

                                                </div>
                                                <div className="w-1/5 px-2">
                                                    <InputContainer>
                                                        <SelectBox
                                                            label={`必須`}
                                                            name={`t1Area${number}Required`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25"
                                                            onChange={handleOnchange}
                                                        >
                                                            <option value={true}>必須</option>
                                                            <option value={false}>任意</option>
                                                        </SelectBox>
                                                    </InputContainer>

                                                </div>

                                                <div className="w-1/5 px-2">
                                                    <InputContainer>
                                                        <SelectBox
                                                            label={`必須表示`}
                                                            name={`t1Area${number}RequiredDisplay`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25"
                                                            onChange={handleOnchange}
                                                        >
                                                            <option value={true}>表示</option>
                                                            <option value={false}>非表示</option>
                                                        </SelectBox>
                                                    </InputContainer>
                                                </div>


                                            </div>
                                            <div className="flex px-8">
                                                <div className="w-1/5 pr-2">
                                                    <InputContainer>
                                                        <TextBox label="正規表現エラー時テキスト"
                                                            name={`t1Area${number}RegExErrorText`}
                                                            placeholder="正規表現エラー時テキスト"
                                                            labelClassName='text-blue-100'
                                                            inputClassName='bg-blue-25'
                                                        />
                                                    </InputContainer>

                                                </div>

                                                <div className="w-1/5 px-2">
                                                    <InputContainer>
                                                        <TextBox label="必須エラー時テキスト"
                                                            name={`t1Area${number}RequiredErrorText`}
                                                            placeholder="必須エラー時テキスト"
                                                            labelClassName='text-blue-100'
                                                            inputClassName='bg-blue-25'
                                                        />
                                                    </InputContainer>

                                                </div>
                                                <div className="w-1/5 px-2">
                                                    <InputContainer>
                                                        <TextBox label="文字数エラーテキスト"
                                                            name={`t1Area${number}LengthErrorText`}
                                                            placeholder="文字数エラーテキスト"
                                                            labelClassName='text-blue-100'
                                                            inputClassName='bg-blue-25'
                                                        />
                                                    </InputContainer>
                                                </div>

                                            </div>

                                            <div className="flex px-8">
                                                <div className="w-1/5 pr-2">
                                                    <InputContainer>
                                                        <TextBox label="name属性"
                                                            name={`t1Area${number}Name`}
                                                            labelClassName='text-blue-100'
                                                            inputClassName='bg-blue-25'
                                                            isRequired
                                                        />
                                                    </InputContainer>

                                                </div>

                                                <div className="w-1/5 px-2">
                                                    <InputContainer>
                                                        <SelectBox
                                                            label="autocomplate属性"
                                                            name={`t1Area${number}AutoComplete`}
                                                            labelClassName="text-blue-100"
                                                            inputClassName="bg-blue-25"
                                                        >
                                                            {autoComplete.length > 0 &&
                                                                autoComplete.map((field, index) => (
                                                                    <option
                                                                        value={field.value}
                                                                        key={field.value + "_" + index}>
                                                                        {field.caption}
                                                                    </option>
                                                                )
                                                                )}
                                                        </SelectBox>
                                                    </InputContainer>

                                                </div>
                                                <div className="w-1/5 px-2">
                                                    <InputContainer>
                                                        <SelectBox
                                                            label={`入力モード`}
                                                            name={`t1Area${number}InputMode`}
                                                            labelClassName="text-blue-100"
                                                            inputClassName="bg-blue-25"
                                                            onChange={handleOnchange}
                                                        >
                                                            {inputMode.length > 0 &&
                                                                inputMode.map((field, index) => (
                                                                    <option
                                                                        value={field.value}
                                                                        key={field.value + "_" + index}>
                                                                        {field.caption}
                                                                    </option>
                                                                )
                                                                )}
                                                        </SelectBox>
                                                    </InputContainer>

                                                </div>

                                            </div>

                                            <div className="px-8">
                                                <InputContainer>
                                                    <Note label="ラベルカスタムクラス"
                                                        name={`t1Area${number}LabelCustomClass`}
                                                        placeholder="カスタムClass"
                                                        labelClassName='text-blue-100'
                                                        inputClassName='bg-blue-25 !p-1'
                                                        height='h-8'
                                                    />
                                                </InputContainer>

                                                <InputContainer>
                                                    <Note label="inputTextカスタムクラス"
                                                        name={`t1Area${number}InputCustomClass`}
                                                        placeholder="カスタムClass"
                                                        labelClassName='text-blue-100'
                                                        inputClassName='bg-blue-25 !p-1'
                                                        height='h-8'
                                                    />
                                                </InputContainer>
                                                <InputContainer>
                                                    <Note label="placeholderカスタムクラス"
                                                        name={`t1Area${number}PlaceholderCustomClass`}
                                                        placeholder="カスタムClass"
                                                        labelClassName='text-blue-100'
                                                        inputClassName='bg-blue-25 !p-1'
                                                        height='h-8'
                                                    />
                                                </InputContainer>
                                                <InputContainer>
                                                    <Note label="エラーテキストカスタムクラス"
                                                        name={`t1Area${number}ErrorTextCustomClass`}
                                                        placeholder="カスタムClass"
                                                        labelClassName='text-blue-100'
                                                        inputClassName='bg-blue-25 !p-1'
                                                        height='h-8'
                                                    />
                                                </InputContainer>
                                                <InputContainer>
                                                    <Note label="areaWrapカスタムクラス"
                                                        name={`t1Area${number}WrapCustomClass`}
                                                        placeholder="カスタムClass"
                                                        labelClassName='text-blue-100'
                                                        inputClassName='bg-blue-25 !p-1'
                                                        height='h-8'
                                                    />
                                                </InputContainer>
                                            </div>
                                        </React.Fragment>
                                    ))
                                    }
                                    <label htmlFor="headerAreaShadow"
                                        className="text-blue-100 !mb-8 !mt-8">{`トークン2`}</label>
                                    <div className="flex px-8">
                                        <div className="w-1/4 pr-2">
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

                                        <div className="w-1/4 px-2">
                                            <InputContainer>
                                                <SelectBox
                                                    label={`ドロップダウン開始年`}
                                                    name={`yearDropdownStartNumber`}
                                                    labelClassName="text-blue-100 text-xs"
                                                    inputClassName="bg-blue-25"
                                                    onChange={handleOnchange}
                                                >

                                                    {yearRange1900.map((n, i) => <option key={n}
                                                        value={n}>{n}</option>)}

                                                </SelectBox>
                                            </InputContainer>
                                        </div>
                                        <div className="w-1/4 px-2">
                                            <InputContainer>
                                                <SelectBox
                                                    label={`ドロップダウン終了年`}
                                                    name={`yearDropdownEndNumber`}
                                                    labelClassName="text-blue-100 text-xs"
                                                    inputClassName="bg-blue-25"
                                                    onChange={handleOnchange}
                                                >
                                                    <option selected value="2030">2030</option>
                                                    {yearEndList.map((n, i) => <option key={n} value={n}>{n}</option>)}
                                                </SelectBox>
                                            </InputContainer>
                                        </div>
                                        <div className="w-1/5 pl-2">
                                            <InputContainer>
                                                <SelectBox
                                                    label={`ドロップダウン初期選択`}
                                                    name={`yearInitialNumber`}
                                                    labelClassName="text-blue-100 text-xs"
                                                    inputClassName="bg-blue-25"
                                                    onChange={handleOnchange}
                                                >
                                                    {yearInitialValue.map((n, i) => <option key={n}
                                                        value={n}>{n}</option>)}
                                                </SelectBox>
                                            </InputContainer>
                                        </div>
                                    </div>
                                    <div className="flex px-8">
                                        <div className="w-1/3 pr-2">
                                            <InputContainer>
                                                <TextBox label="年ラベル"
                                                    name={`yearLabel`}
                                                    placeholder="年ラベル"
                                                    labelClassName='text-blue-100'
                                                    inputClassName='bg-blue-25'
                                                />
                                            </InputContainer>
                                        </div>
                                        <div className="w-1/3 px-2">
                                            <InputContainer>
                                                <TextBox label="月ラベル"
                                                    name={`monthLabel`}
                                                    placeholder="月ラベル"
                                                    labelClassName='text-blue-100'
                                                    inputClassName='bg-blue-25'
                                                />
                                            </InputContainer>
                                        </div>
                                        <div className="w-1/3 pl-2">
                                            <InputContainer>
                                                <TextBox label="日ラベル"
                                                    name={`dayLabel`}
                                                    placeholder="日ラベル"
                                                    labelClassName='text-blue-100'
                                                    inputClassName='bg-blue-25'
                                                />
                                            </InputContainer>
                                        </div>
                                    </div>
                                    <div className="flex px-8">
                                        <div className="w-1/3 pr-2">
                                            <InputContainer>
                                                <Note label="年wrapカスタムクラス"
                                                    name={`yearWrapCustomClass`}
                                                    placeholder="カスタムClass"
                                                    labelClassName='text-blue-100'
                                                    inputClassName='bg-blue-25 !p-1'
                                                    height='h-8'
                                                />
                                            </InputContainer>
                                        </div>
                                        <div className="w-1/3 px-2">
                                            <InputContainer>
                                                <Note label="月wrapカスタムクラス"
                                                    name={`monthWrapCustomClass`}
                                                    placeholder="カスタムClass"
                                                    labelClassName='text-blue-100'
                                                    inputClassName='bg-blue-25 !p-1'
                                                    height='h-8'
                                                />
                                            </InputContainer>
                                        </div>
                                        <div className="w-1/3 pl-2">
                                            <InputContainer>
                                                <Note label="日wrapカスタムクラス"
                                                    name={`dayWrapCustomClass`}
                                                    placeholder="カスタムClass"
                                                    labelClassName='text-blue-100'
                                                    inputClassName='bg-blue-25 !p-1'
                                                    height='h-8'
                                                />
                                            </InputContainer>
                                        </div>
                                    </div>
                                    <InputContainer>
                                        <Note label="トークン1wrapカスタムClass"
                                            name={`t1WrapCustomClass`}
                                            placeholder="カスタムClass"
                                            labelClassName='text-blue-100'
                                            inputClassName='bg-blue-25 !p-1'
                                            height='h-8'
                                        />
                                    </InputContainer>
                                    <InputContainer>
                                        <Note label="トークン2wrapカスタムClass"
                                            name={`t2WrapCustomClass`}
                                            placeholder="カスタムClass"
                                            labelClassName='text-blue-100'
                                            inputClassName='bg-blue-25 !p-1'
                                            height='h-8'
                                        />
                                    </InputContainer>
                                    <InputContainer>
                                        <Note label="blockWrapカスタムClass"
                                            name={`blockWrapCustomClass`}
                                            placeholder="カスタムClass"
                                            labelClassName='text-blue-100'
                                            inputClassName='bg-blue-25 !p-1'
                                            height='h-8'
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