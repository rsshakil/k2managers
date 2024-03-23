import { Form, Formik } from "formik";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { v4 as uuid } from "uuid";

import { getFieldList } from "../../../services/appDesignerService";
import { getSelectedPageData, getTransitionDestinationRouteList } from "../../../store/recoil/appDesignerState";
import SelectBox from "../../Form/FormInputs/SelectBox";
import TextBox from "../../Form/FormInputs/TextBox";
import ModalTitle from "../../Modal/components/ModalTitle";
import WhiteModalWrapper from '../../Modal/components/WhiteModalWrapper';
import InputContainer from "../../Wrapper/InputContainer";
import IconPicker from "../../IconPicker/IconPicker";

import { valueFormatCheck } from "../../../utilities/commonFunctions";
import Note from "../../Form/FormInputs/Note";
import Loader from "../../Loading/Loader";
import BlockModalFooter from "./BlockModalFooter";

import { strokeSizeArray } from '../../../lib/commonConstants';
import { tailwindColorCodeKeys } from "../SettingFormPages/SettingsForm";
import ColorPickerWithRecent from '../../ColorPicker/ColorPickerWithRecent';
import { fontSizeAttributes } from '../../../lib/tailwindClassAttributes';
import { rgbaTohex } from '../../../lib/ColorConvert';

import {
    autoComplete, inputMode
} from '../../../lib/tailwindClassAttributes';

const range1to99 = _.range(1, 100);
const yearRange = _.range(1900, 2031);

export default function Block2TokenLogin1({ blockData = '', divisionNumber = 3, buttonType = 'a', setModalOpen = () => { }, handleOnPressSave = () => { }, uniqueError = {} }) {
    const selectedPageDetail = useRecoilValue(getSelectedPageData);
    const transitionRoutes = useRecoilValue(getTransitionDestinationRouteList);
    const [formData, setFormData] = useState(blockData);
    const [fieldList, setFieldList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let obj = {};
        if (divisionNumber != blockData.divisionNumber) obj.divisionNumber = valueFormatCheck(divisionNumber);
        if (buttonType != blockData.buttonType) obj.buttonType = buttonType;
        if (!_.isEmpty(obj)) setFormData((prevState) => ({ ...prevState, ...obj }))
    }, [])


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
                setLoading(false);
            }
        }

        fetchFieldListInit();
    }, [])


    function handleOnchange(e) {
        const name = e.target.name;
        const value = valueFormatCheck(e.target.value);


        if (name === 'birthdayYearStartNumber' || name === 'birthdayYearEndNumber') {
            let obj = { [name]: value };
            const { birthdayYearInitialNumber, birthdayYearEndNumber, birthdayYearStartNumber } = formData;

            if (name === 'birthdayYearStartNumber') {
                if (!_.inRange(birthdayYearInitialNumber, value, birthdayYearEndNumber + 1)) {
                    obj.birthdayYearInitialNumber = value;
                }

                if (value > birthdayYearEndNumber) {
                    obj.birthdayYearEndNumber = value;
                }
            }
            else if (name === 'birthdayYearEndNumber') {
                if (!_.inRange(birthdayYearInitialNumber, birthdayYearStartNumber, value + 1)) {
                    obj.birthdayYearInitialNumber = birthdayYearStartNumber;
                }
            }

            setFormData((prevState) => ({
                ...prevState,
                ...obj
            }))
        }
        else {
            setFormData((prevState) => ({
                ...prevState,
                [name]: value
            }))
        }
    }

    function handleOnChangeIcon(name, icon) {
        // updateState(name, icon, 'info');
        setFormData((prevState) => ({
            ...prevState,
            [name]: icon,
        }));
    }

    const handleOnChangeColor = (name, colorCode, tailwindColorClassKey) => {
        const hex = rgbaTohex(`rgba(${colorCode})`);
        let modifiedValue = `${tailwindColorClassKey}-[${hex}]`;

        setFormData((prevState) => ({
            ...prevState,
            [name]: modifiedValue,
        }));
    }

    const getColorCode = (string = '') => {
        return '#' + string.match(/[a-f0-9]{6}/i);
    }

    let numField = Array.from({ length: divisionNumber }, (_, i) => i + 1);


    const initialSelectionYearList = () => {
        const { birthdayYearStartNumber = 1900, birthdayYearEndNumber = 2030 } = formData;

        return _.range(Number(birthdayYearStartNumber), Number(birthdayYearEndNumber) + 1);
    }

    const endSelectionYearList = () => {
        const { birthdayYearStartNumber = 1900 } = formData;

        return yearRange.filter(x => x >= birthdayYearStartNumber);
    }


    function processDataOnPressSubmit(e) {
        let updatedFormData = { ...formData };

        _.range(1, divisionNumber + 1).forEach(x => {
            const fieldNameKey = `id${x}Name`;
            if (!updatedFormData[fieldNameKey]) {
                updatedFormData[fieldNameKey] = uuid();
            }
        })

        handleOnPressSave(e, updatedFormData);
    }


    return (
        <>
            {loading && <Loader />}

            <WhiteModalWrapper width="border-none text-black" className="items-start">
                <ModalTitle title="誕生日ログイン設定" className="text-blue-100 text-xl" />

                <Formik
                    enableReinitialize={true}
                    initialValues={formData}
                >
                    <div className='relative w-full h-full'>
                        <Form onChange={handleOnchange}>
                            <div className="body-height3 pt-12 px-10 min-h-[calc(100vh-452px)] !p-0">
                                <div className="flex flex-col py-10">

                                    <div className="flex justify-between space-x-4">
                                        <div className="w-1/4">
                                            <InputContainer>
                                                <SelectBox
                                                    label="ID対象トークン"
                                                    name="tokenId"
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
                                        <div className="w-1/4">
                                            <InputContainer>
                                                <SelectBox
                                                    label="誕生日対象トークン(トークンに誕生日を設定してください)"
                                                    name="tokenBirthday"
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
                                        <div className="w-2/4">
                                            <InputContainer>
                                                <TextBox
                                                    label="ID入力エリア分割数（デザイン画面にて設定）"
                                                    name="divisionNumber"
                                                    labelClassName="text-blue-100 text-xs"
                                                    inputClassName="bg-gray-300 cursor-default pointer-events-none"
                                                    readOnly
                                                    tabIndex="-1"
                                                    value={divisionNumber}
                                                />
                                            </InputContainer>
                                        </div>
                                    </div>

                                    <div className="flex justify-between space-x-4">
                                        <div className="w-1/2">
                                            <InputContainer>
                                                <SelectBox
                                                    label="ログイン成功時遷移先"
                                                    name="successDestination"
                                                    labelClassName="text-blue-100 text-xs"
                                                    inputClassName="bg-blue-25"
                                                    value={formData.successDestination}
                                                    onChange={handleOnchange}
                                                >
                                                    <option value="">なし</option>
                                                    {transitionRoutes.map(x => <option key={x.id} value={x.url}>{x.name}</option>)}
                                                </SelectBox>
                                            </InputContainer>
                                        </div>
                                        <div className="w-1/2">
                                            <InputContainer>
                                                <SelectBox
                                                    label="ログインチェック状態記録先フィールド"
                                                    name={`loginAuthTargetField`}
                                                    labelClassName="text-blue-100 text-xs"
                                                    inputClassName="bg-blue-25"
                                                    onChange={handleOnchange}
                                                >
                                                    <option value=''>記録しない</option>
                                                    {fieldList.map(x => <option key={x.fieldId} value={x?.fieldCode}>{x.fieldName}</option>)}
                                                </SelectBox>
                                            </InputContainer>
                                        </div>
                                    </div>

                                    <div className="flex justify-between space-x-4">
                                        {numField.length > 0 && numField.map((number, index) => (
                                            <div className={`w-1/${numField.length}`}>
                                                <InputContainer>
                                                    <SelectBox
                                                        label={`ID分割${number}(先頭詰め)`}
                                                        name={`numberOfSplitCharacters${number}`}
                                                        labelClassName="text-blue-100 text-xs"
                                                        inputClassName="bg-blue-25"
                                                        onChange={handleOnchange}
                                                    >
                                                        {range1to99.map(n => <option key={n} value={n}>{n}</option>)}
                                                    </SelectBox>
                                                </InputContainer>
                                            </div>
                                        ))}
                                    </div>


                                    {numField.length > 0 && numField.map((number, index) => (
                                        <React.Fragment key={index}>
                                            <label className="text-blue-100 !mb-6 !mt-8">{`ID　入力エリア${number}`}</label>

                                            <div className="px-8">
                                                <InputContainer>
                                                    <TextBox
                                                        label="ラベル"
                                                        name={`id${number}Label`}
                                                        placeholder="ラベル"
                                                        labelClassName='text-blue-100 text-xs'
                                                        inputClassName='bg-blue-25'
                                                    />
                                                </InputContainer>
                                            </div>
                                            <div className="flex justify-between space-x-4 px-8">
                                                <div className="w-1/4">
                                                    <InputContainer>
                                                        <TextBox
                                                            label="placeholder"
                                                            placeholder="placeholder"
                                                            labelClassName='text-blue-100 text-xs'
                                                            inputClassName='bg-blue-25'
                                                            name={`id${number}Placeholder`}
                                                        />
                                                    </InputContainer>
                                                </div>
                                                <div className="w-1/4">
                                                    <InputContainer>
                                                        <SelectBox
                                                            label="入力モード"
                                                            name={`id${number}InputMode`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25"
                                                            onChange={handleOnchange}
                                                        >
                                                            {inputMode.map((field, index) => (
                                                                <option value={field.value} key={field.value + "_" + index}>{field.caption}</option>
                                                            ))}
                                                        </SelectBox>
                                                    </InputContainer>
                                                </div>
                                                <div className="w-1/4">
                                                    <InputContainer>
                                                        <TextBox
                                                            label="name属性"
                                                            placeholder="name属性"
                                                            labelClassName='text-blue-100 text-xs'
                                                            inputClassName='bg-blue-25'
                                                            name={`id${number}Name`}
                                                            isRequired
                                                        />
                                                    </InputContainer>
                                                </div>
                                                <div className="w-1/4">
                                                    <InputContainer>
                                                        <SelectBox
                                                            label="autocomplete属性"
                                                            name={`id${number}AutoComplete`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25"
                                                            onChange={handleOnchange}
                                                        >
                                                            {autoComplete.map((field, index) => (
                                                                <option value={field.value} key={field.value + "_" + index}>{field.caption}</option>
                                                            ))}
                                                        </SelectBox>
                                                    </InputContainer>
                                                </div>
                                            </div>

                                            <div className="flex justify-between space-x-4 px-8">
                                                <div className="w-1/4">
                                                    <InputContainer>
                                                        <SelectBox
                                                            label="必須"
                                                            name={`id${number}Required`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25"
                                                            onChange={handleOnchange}
                                                        >
                                                            <option value={true}>必須</option>
                                                            <option value={false}>任意</option>
                                                        </SelectBox>
                                                    </InputContainer>
                                                </div>
                                                <div className="w-1/4">
                                                    <InputContainer>
                                                        <SelectBox
                                                            label="必須表示"
                                                            name={`id${number}RequiredDisplay`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25"
                                                            onChange={handleOnchange}
                                                        >
                                                            <option value={true}>表示</option>
                                                            <option value={false}>非表示</option>
                                                        </SelectBox>
                                                    </InputContainer>
                                                </div>
                                                <div className="w-2/4">
                                                    <InputContainer>
                                                        <TextBox
                                                            label="必須　エラーメッセージ"
                                                            placeholder="必須　エラーメッセージ"
                                                            labelClassName='text-blue-100 text-xs'
                                                            inputClassName='bg-blue-25'
                                                            name={`id${number}RequiredErrorText`}
                                                        />
                                                    </InputContainer>
                                                </div>
                                            </div>

                                            <div className="flex justify-between space-x-4 px-8">
                                                <div className="w-1/2">
                                                    <InputContainer>
                                                        <SelectBox
                                                            label="最低文字数"
                                                            name={`id${number}MinlengthText`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25"
                                                            onChange={handleOnchange}
                                                        >
                                                            {range1to99.map(x => <option key={x} value={x}>{x}</option>)}
                                                        </SelectBox>
                                                    </InputContainer>
                                                </div>
                                                <div className="w-1/2">
                                                    <InputContainer>
                                                        <TextBox
                                                            label="最低文字数　エラーメッセージ"
                                                            placeholder="最低文字数　エラーメッセージ"
                                                            labelClassName='text-blue-100 text-xs'
                                                            inputClassName='bg-blue-25'
                                                            name={`id${number}MinlengthError`}
                                                        />
                                                    </InputContainer>
                                                </div>
                                            </div>

                                            <div className="flex justify-between space-x-4 px-8">
                                                <div className="w-1/2">
                                                    <InputContainer>
                                                        <SelectBox
                                                            label="最大文字数"
                                                            name={`id${number}MaxlengthText`}
                                                            labelClassName="text-blue-100 text-xs"
                                                            inputClassName="bg-blue-25"
                                                            onChange={handleOnchange}
                                                        >
                                                            {range1to99.map(x => <option key={x} value={x}>{x}</option>)}
                                                        </SelectBox>
                                                    </InputContainer>
                                                </div>
                                                <div className="w-1/2">
                                                    <InputContainer>
                                                        <TextBox
                                                            label="最大文字数　エラーメッセージ"
                                                            placeholder="最大文字数　エラーメッセージ"
                                                            labelClassName='text-blue-100 text-xs'
                                                            inputClassName='bg-blue-25'
                                                            name={`id${number}MaxlengthError`}
                                                        />
                                                    </InputContainer>
                                                </div>
                                            </div>

                                            <div className="px-8">
                                                <InputContainer>
                                                    <TextBox
                                                        label="ログイン失敗時エラーメッセージ"
                                                        placeholder="ログイン失敗時エラーメッセージ"
                                                        labelClassName='text-blue-100 text-xs'
                                                        inputClassName='bg-blue-25'
                                                        name={`id${number}LoginFailureText`}
                                                    />
                                                </InputContainer>
                                            </div>

                                            <div className="flex justify-between space-x-4 px-8">
                                                <div className="w-1/2">
                                                    <InputContainer>
                                                        <TextBox
                                                            label="許可パターン正規表現1"
                                                            placeholder="許可パターン正規表現1"
                                                            labelClassName='text-blue-100 text-xs'
                                                            inputClassName='bg-blue-25'
                                                            name={`id${number}RegularExpression1`}
                                                        />
                                                    </InputContainer>
                                                </div>
                                                <div className="w-1/2">
                                                    <InputContainer>
                                                        <TextBox
                                                            label="許可パターン正規表現1　エラーメッセージ"
                                                            placeholder="許可パターン正規表現1　エラーメッセージ"
                                                            labelClassName='text-blue-100 text-xs'
                                                            inputClassName='bg-blue-25'
                                                            name={`id${number}RegularExpression1ErrorText`}
                                                        />
                                                    </InputContainer>
                                                </div>
                                            </div>
                                            <div className="flex justify-between space-x-4 px-8">
                                                <div className="w-1/2">
                                                    <InputContainer>
                                                        <TextBox
                                                            label="許可パターン正規表現2"
                                                            placeholder="許可パターン正規表現2"
                                                            labelClassName='text-blue-100 text-xs'
                                                            inputClassName='bg-blue-25'
                                                            name={`id${number}RegularExpression2`}
                                                        />
                                                    </InputContainer>
                                                </div>
                                                <div className="w-1/2">
                                                    <InputContainer>
                                                        <TextBox
                                                            label="許可パターン正規表現2　エラーメッセージ"
                                                            placeholder="許可パターン正規表現2　エラーメッセージ"
                                                            labelClassName='text-blue-100 text-xs'
                                                            inputClassName='bg-blue-25'
                                                            name={`id${number}RegularExpression2ErrorText`}
                                                        />
                                                    </InputContainer>
                                                </div>
                                            </div>
                                            <div className="flex justify-between space-x-4 px-8">
                                                <div className="w-1/2">
                                                    <InputContainer>
                                                        <TextBox
                                                            label="許可パターン正規表現3"
                                                            placeholder="許可パターン正規表現3"
                                                            labelClassName='text-blue-100 text-xs'
                                                            inputClassName='bg-blue-25'
                                                            name={`id${number}RegularExpression3`}
                                                        />
                                                    </InputContainer>
                                                </div>
                                                <div className="w-1/2">
                                                    <InputContainer>
                                                        <TextBox
                                                            label="許可パターン正規表現3　エラーメッセージ"
                                                            placeholder="許可パターン正規表現3　エラーメッセージ"
                                                            labelClassName='text-blue-100 text-xs'
                                                            inputClassName='bg-blue-25'
                                                            name={`id${number}RegularExpression3ErrorText`}
                                                        />
                                                    </InputContainer>
                                                </div>
                                            </div>
                                            <div className="flex justify-between space-x-4 px-8">
                                                <div className="w-1/2">
                                                    <InputContainer>
                                                        <TextBox
                                                            label="許可パターン正規表現4"
                                                            placeholder="許可パターン正規表現4"
                                                            labelClassName='text-blue-100 text-xs'
                                                            inputClassName='bg-blue-25'
                                                            name={`id${number}RegularExpression4`}
                                                        />
                                                    </InputContainer>
                                                </div>
                                                <div className="w-1/2">
                                                    <InputContainer>
                                                        <TextBox
                                                            label="許可パターン正規表現4　エラーメッセージ"
                                                            placeholder="許可パターン正規表現4　エラーメッセージ"
                                                            labelClassName='text-blue-100 text-xs'
                                                            inputClassName='bg-blue-25'
                                                            name={`id${number}RegularExpression4ErrorText`}
                                                        />
                                                    </InputContainer>
                                                </div>
                                            </div>

                                            <div className="flex justify-between space-x-4 px-8 mt-8">
                                                <div className="w-1/2">
                                                    <InputContainer>
                                                        <Note
                                                            label="ラベルカスタムクラス"
                                                            placeholder="カスタムClass"
                                                            labelClassName='text-blue-100 text-xs'
                                                            inputClassName='bg-blue-25 !p-1'
                                                            height='h-8'
                                                            name={`id${number}LabelCustomClass`}
                                                        />
                                                    </InputContainer>
                                                </div>
                                                <div className="w-1/2">
                                                    <InputContainer>
                                                        <Note
                                                            label="必須カスタムクラス"
                                                            placeholder="カスタムClass"
                                                            labelClassName='text-blue-100 text-xs'
                                                            inputClassName='bg-blue-25 !p-1'
                                                            height='h-8'
                                                            name={`id${number}RequiredCustomClass`}
                                                        />
                                                    </InputContainer>
                                                </div>
                                            </div>
                                            <div className="flex justify-between space-x-4 px-8">
                                                <div className="w-1/2">
                                                    <InputContainer>
                                                        <Note
                                                            label="inputTextカスタムクラス"
                                                            placeholder="カスタムClass"
                                                            labelClassName='text-blue-100 text-xs'
                                                            inputClassName='bg-blue-25 !p-1'
                                                            height='h-8'
                                                            name={`id${number}InputCustomClass`}
                                                        />
                                                    </InputContainer>
                                                </div>
                                                <div className="w-1/2">
                                                    <InputContainer>
                                                        <Note
                                                            label="placeholderカスタムクラス"
                                                            placeholder="カスタムClass"
                                                            labelClassName='text-blue-100 text-xs'
                                                            inputClassName='bg-blue-25 !p-1'
                                                            height='h-8'
                                                            name={`id${number}PlaceholderCustomClass`}
                                                        />
                                                    </InputContainer>
                                                </div>
                                            </div>
                                            <div className="flex justify-between space-x-4 px-8">
                                                <div className="w-1/2">
                                                    <InputContainer>
                                                        <Note
                                                            label="エラーテキストカスタムクラス"
                                                            placeholder="カスタムClass"
                                                            labelClassName='text-blue-100 text-xs'
                                                            inputClassName='bg-blue-25 !p-1'
                                                            height='h-8'
                                                            name={`id${number}ErrorCustomClass`}
                                                        />
                                                    </InputContainer>
                                                </div>
                                                <div className="w-1/2">
                                                    <InputContainer>
                                                        <Note
                                                            label="areaWrapカスタムクラス"
                                                            placeholder="カスタムClass"
                                                            labelClassName='text-blue-100 text-xs'
                                                            inputClassName='bg-blue-25 !p-1'
                                                            height='h-8'
                                                            name={`id${number}WrapCustomClass`}
                                                        />
                                                    </InputContainer>
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    ))}

                                    <label className="text-blue-100 !mb-6 !mt-8">誕生日</label>
                                    <div className="flex justify-between space-x-4 px-8">
                                        <div className="w-1/2">
                                            <InputContainer>
                                                <SelectBox
                                                    label="年形式"
                                                    name={`birthdayYearType`}
                                                    labelClassName="text-blue-100 text-xs"
                                                    inputClassName="bg-blue-25"
                                                    onChange={handleOnchange}
                                                >
                                                    <option value={0}>YYYY年(EEYY年)</option>
                                                    <option value={1}>YYYY年</option>
                                                </SelectBox>
                                            </InputContainer>
                                        </div>
                                        <div className="w-1/2">
                                            <InputContainer>
                                                <SelectBox
                                                    label={`ドロップダウン開始年`}
                                                    name={`birthdayYearStartNumber`}
                                                    labelClassName="text-blue-100 text-xs"
                                                    inputClassName="bg-blue-25"
                                                    onChange={handleOnchange}
                                                >
                                                    {yearRange.map(n => <option key={n} value={n}>{n}</option>)}
                                                </SelectBox>
                                            </InputContainer>
                                        </div>
                                        <div className="w-1/2">
                                            <InputContainer>
                                                <SelectBox
                                                    label={`ドロップダウン終了年`}
                                                    name={`birthdayYearEndNumber`}
                                                    labelClassName="text-blue-100 text-xs"
                                                    inputClassName="bg-blue-25"
                                                    onChange={handleOnchange}
                                                >
                                                    {endSelectionYearList().map(n => <option key={n} value={n}>{n}</option>)}
                                                </SelectBox>
                                            </InputContainer>
                                        </div>
                                        <div className="w-1/2">
                                            <InputContainer>
                                                <SelectBox
                                                    label={`ドロップダウン初期選択年`}
                                                    name={`birthdayYearInitialNumber`}
                                                    labelClassName="text-blue-100 text-xs"
                                                    inputClassName="bg-blue-25"
                                                    onChange={handleOnchange}
                                                >
                                                    {initialSelectionYearList().map(n => <option key={n} value={n}>{n}</option>)}
                                                </SelectBox>
                                            </InputContainer>
                                        </div>
                                    </div>

                                    <div className="flex justify-between space-x-4 px-8">
                                        <div className="w-1/4">
                                            <InputContainer>
                                                <TextBox label="年ラベル"
                                                    name={`birthdayYearLabel`}
                                                    placeholder="年ラベル"
                                                    labelClassName="text-blue-100 text-xs"
                                                    inputClassName='bg-blue-25'
                                                />
                                            </InputContainer>
                                        </div>
                                        <div className="w-1/4">
                                            <InputContainer>
                                                <Note label="年ラベルカスタムクラス"
                                                    name={`birthdayYearLabelCustomClass`}
                                                    placeholder="カスタムClass"
                                                    labelClassName="text-blue-100 text-xs"
                                                    inputClassName='bg-blue-25 !p-1'
                                                    height='h-8'
                                                />
                                            </InputContainer>
                                        </div>
                                        <div className="w-2/4">
                                            <InputContainer>
                                                <Note label="年wrapカスタムクラス"
                                                    name={`birthdayYearWrapCustomClass`}
                                                    placeholder="カスタムClass"
                                                    labelClassName="text-blue-100 text-xs"
                                                    inputClassName='bg-blue-25 !p-1'
                                                    height='h-8'
                                                />
                                            </InputContainer>
                                        </div>
                                    </div>

                                    <div className="flex justify-between space-x-4 px-8">
                                        <div className="w-1/4">
                                            <InputContainer>
                                                <TextBox label="月ラベル"
                                                    name={`birthdayMonthLabel`}
                                                    placeholder="月ラベル"
                                                    labelClassName="text-blue-100 text-xs"
                                                    inputClassName='bg-blue-25'
                                                />
                                            </InputContainer>
                                        </div>
                                        <div className="w-1/4">
                                            <InputContainer>
                                                <Note label="月ラベルカスタムクラス"
                                                    name={`birthdayMonthLabelCustomClass`}
                                                    placeholder="カスタムClass"
                                                    labelClassName="text-blue-100 text-xs"
                                                    inputClassName='bg-blue-25 !p-1'
                                                    height='h-8'
                                                />
                                            </InputContainer>
                                        </div>
                                        <div className="w-2/4">
                                            <InputContainer>
                                                <Note label="月wrapカスタムクラス"
                                                    name={`birthdayMonthWrapCustomClass`}
                                                    placeholder="カスタムClass"
                                                    labelClassName="text-blue-100 text-xs"
                                                    inputClassName='bg-blue-25 !p-1'
                                                    height='h-8'
                                                />
                                            </InputContainer>
                                        </div>
                                    </div>
                                    <div className="flex justify-between space-x-4 px-8">
                                        <div className="w-1/4">
                                            <InputContainer>
                                                <TextBox label="日ラベル"
                                                    name={`birthdayDayLabel`}
                                                    placeholder="日ラベル"
                                                    labelClassName="text-blue-100 text-xs"
                                                    inputClassName='bg-blue-25'
                                                />
                                            </InputContainer>
                                        </div>
                                        <div className="w-1/4">
                                            <InputContainer>
                                                <Note label="日ラベルカスタムクラス"
                                                    name={`birthdayDayLabelCustomClass`}
                                                    placeholder="カスタムClass"
                                                    labelClassName="text-blue-100 text-xs"
                                                    inputClassName='bg-blue-25 !p-1'
                                                    height='h-8'
                                                />
                                            </InputContainer>
                                        </div>
                                        <div className="w-2/4">
                                            <InputContainer>
                                                <Note label="日wrapカスタムクラス"
                                                    name={`birthdayDayWrapCustomClass`}
                                                    placeholder="カスタムClass"
                                                    labelClassName="text-blue-100 text-xs"
                                                    inputClassName='bg-blue-25 !p-1'
                                                    height='h-8'
                                                />
                                            </InputContainer>
                                        </div>
                                    </div>


                                    <label className="text-blue-100 !mb-6 !mt-8">ログインボタン</label>
                                    <div className="flex justify-between space-x-4 px-8">
                                        <div className="w-1/2">
                                            <InputContainer>
                                                <TextBox
                                                    label="配置ボタンタイプ"
                                                    name="buttonType"
                                                    labelClassName="text-blue-100 text-xs"
                                                    inputClassName="bg-gray-300 cursor-default pointer-events-none"
                                                    readOnly
                                                    tabIndex="-1"
                                                    value={buttonType}
                                                />
                                            </InputContainer>
                                        </div>
                                        <div className="w-1/2">
                                            <InputContainer>
                                                <TextBox label="ログインボタン文言"
                                                    name={`buttonText`}
                                                    placeholder="ログインボタン文言"
                                                    labelClassName="text-blue-100 text-xs"
                                                    inputClassName='bg-blue-25'
                                                />
                                            </InputContainer>
                                        </div>
                                    </div>
                                    <div className="flex justify-between space-x-4 px-8">
                                        <div className="w-1/2">
                                            <InputContainer>
                                                <TextBox label="ログイン失敗時ボタン上エラーメッセージ"
                                                    name={`buttonLoginFailureText`}
                                                    placeholder="ログイン失敗時ボタン上エラーメッセージ"
                                                    labelClassName="text-blue-100 text-xs"
                                                    inputClassName='bg-blue-25'
                                                />
                                            </InputContainer>
                                        </div>
                                        <div className="w-1/2">
                                            <InputContainer>
                                                <TextBox label="ネットワークエラー時ボタン上エラーメッセージ"
                                                    name={`buttonNetworkErrorText`}
                                                    placeholder="ネットワークエラー時ボタン上エラーメッセージ"
                                                    labelClassName="text-blue-100 text-xs"
                                                    inputClassName='bg-blue-25'
                                                />
                                            </InputContainer>
                                        </div>
                                    </div>
                                    <div className="flex justify-between space-x-4 px-8 mb-5">
                                        <div className="w-1/2">
                                            <InputContainer>
                                                <Note label="ボタンカスタムクラス"
                                                    name={`buttonCustomClass`}
                                                    placeholder="カスタムClass"
                                                    labelClassName="text-blue-100 text-xs"
                                                    inputClassName='bg-blue-25 !p-1'
                                                    height='h-8'
                                                />
                                            </InputContainer>
                                        </div>
                                        <div className="w-1/2">
                                            <InputContainer>
                                                <Note label="ボタン上エラーメッセージカスタムClass"
                                                    name={`buttonErrorCustomClass`}
                                                    placeholder="カスタムClass"
                                                    labelClassName="text-blue-100 text-xs"
                                                    inputClassName='bg-blue-25 !p-1'
                                                    height='h-8'
                                                />
                                            </InputContainer>
                                        </div>
                                    </div>

                                    {/* Spinner */}
                                    <div className='flex space-x-4'>
                                        <div className="w-1/2">
                                            <InputContainer>
                                                <SelectBox
                                                    label='アイコン1サイズ'
                                                    labelClassName='text-blue-100 text-xs'
                                                    inputClassName='bg-blue-25'
                                                    name={`buttonSpinnerSize`}
                                                    value={formData[`buttonSpinnerSize`]}
                                                    onChange={(e) => handleOnchange(e, 1)}>
                                                    {fontSizeAttributes.map((field, index) => (
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
                                        <div className="w-1/2">
                                            <InputContainer>
                                                <SelectBox
                                                    label='アイコン1strokeサイズ'
                                                    labelClassName='text-blue-100 text-xs'
                                                    inputClassName='bg-blue-25'
                                                    name={`buttonSpinnerStrokeSize`}
                                                    value={formData[`buttonSpinnerStrokeSize`]}
                                                    onChange={(e) => handleOnchange(e, 1)}
                                                >
                                                    {strokeSizeArray.map((field, index) => (
                                                        <option key={field.value} value={field.value} > {field.caption}</option>
                                                    ))}
                                                </SelectBox>
                                            </InputContainer>
                                        </div>
                                    </div>
                                    <div className="flex customIconsBox space-x-4 px-8">
                                        <InputContainer>
                                            <IconPicker
                                                name={`buttonSpinnerSvg`}
                                                value={formData[`buttonSpinnerSvg`]}
                                                width="32px"
                                                height="32px"
                                                iconSize="1.2em"
                                                iconTitle="スピナーアイコン"
                                                path="M894 462c30.9 0 43.8-39.7 18.7-58L530.8 126.2a31.81 31.81 0 0 0-37.6 0L111.3 404c-25.1 18.2-12.2 58 18.8 58H192v374h-72c-4.4 0-8 3.6-8 8v52c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-52c0-4.4-3.6-8-8-8h-72V462h62zM381 836H264V462h117v374zm189 0H453V462h117v374zm190 0H642V462h118v374z"
                                                iconCustomClass="!rounded-none"
                                                iconWrapperCustomClasses="flex flex-row items-center"
                                                titleCustomClasses="ml-3 text-blue-100"
                                                onChangeIcon={(name, iconData) => handleOnChangeIcon(name, iconData)}
                                            />
                                        </InputContainer>
                                        <InputContainer>
                                            <ColorPickerWithRecent
                                                labelClassName="text-[10px] text-blue-100"
                                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.fillColor)}
                                                inputBoxItem={`buttonSpinnerFillColor`} pickerLabel="アイコンfill色" isBackgroundColor="1"
                                                isDefaultColor={getColorCode(formData[`buttonSpinnerFillColor`])} />
                                        </InputContainer>

                                        <InputContainer>
                                            <ColorPickerWithRecent
                                                labelClassName="text-[10px] text-blue-100"
                                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.strokeColor)}
                                                inputBoxItem={`buttonSpinnerStrokeColor`} pickerLabel="アイコンstroke色" isBackgroundColor="1"
                                                isDefaultColor={getColorCode(formData[`buttonSpinnerStrokeColor`])} />
                                        </InputContainer>
                                    </div>
                                    <InputContainer>
                                        <TextBox
                                            label="スピナーアイコンWrapカスタムClass"
                                            name={`buttonSpinnerCustomClass`}
                                            placeholder="スピナーアイコンWrapカスタムClass"
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25"
                                            value={formData[`buttonSpinnerCustomClass`]}
                                            onChange={handleOnchange}
                                        />
                                    </InputContainer>


                                    <InputContainer>
                                        <Note label="IDWrapカスタムClass"
                                            name={`idWrapCustomClass`}
                                            placeholder="カスタムClass"
                                            labelClassName="text-blue-100 text-xs"
                                            inputClassName='bg-blue-25 !p-1'
                                            height='h-8'
                                        />
                                    </InputContainer>
                                    <InputContainer>
                                        <Note label="誕生日wrapカスタムClass"
                                            name={`birthdayWrapCustomClass`}
                                            placeholder="カスタムClass"
                                            labelClassName="text-blue-100 text-xs"
                                            inputClassName='bg-blue-25 !p-1'
                                            height='h-8'
                                        />
                                    </InputContainer>
                                    <InputContainer>
                                        <Note label="ボタンWrapカスタムClass"
                                            name={`buttonWrapCustomClass`}
                                            placeholder="カスタムClass"
                                            labelClassName="text-blue-100 text-xs"
                                            inputClassName='bg-blue-25 !p-1'
                                            height='h-8'
                                        />
                                    </InputContainer>
                                    <InputContainer>
                                        <Note label="blockWrapカスタムClass"
                                            name={`blockWrapCustomClass`}
                                            placeholder="カスタムClass"
                                            labelClassName="text-blue-100 text-xs"
                                            inputClassName='bg-blue-25 !p-1'
                                            height='h-8'
                                        />
                                    </InputContainer>
                                </div>
                            </div>

                            <BlockModalFooter
                                errors={uniqueError}
                                setModalOpen={() => setModalOpen(false)}
                                handleOnPressSave={(e) => processDataOnPressSubmit(e)}
                            />
                        </Form>
                    </div>
                </Formik>
            </WhiteModalWrapper>
        </>
    );
}