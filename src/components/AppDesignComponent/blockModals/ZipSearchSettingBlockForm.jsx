import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';

import {
    appDesignerState,
    getSelectedPageData,
    getTransitionDestinationRouteList,
} from '../../../store/recoil/appDesignerState';
import Note from '../../Form/FormInputs/Note';
import SelectBox from '../../Form/FormInputs/SelectBox';
import TextBox from '../../Form/FormInputs/TextBox';
import TagBoxComponent from '../../ManagementItem/TagBoxComponent';
import ModalTitle from '../../Modal/components/ModalTitle';
import WhiteModalWrapper from '../../Modal/components/WhiteModalWrapper';
import InputContainer from '../../Wrapper/InputContainer';
import BlockModalFooter from './BlockModalFooter';

import { useEffect } from 'react';
import {
    autoComplete,
    dataCollection,
    fieldCodeNewList,
    ifEmptyInitialSelection,
    inputMode,
    widthAttributes,
} from '../../../lib/tailwindClassAttributes';
import { valueFormatCheck } from '../../../utilities/commonFunctions';

export default function ZipSearchSettingBlockForm({
    blockData = '',
    setModalOpen = () => { },
    handleOnPressSave = () => { },
    handleBlur = () => { },
    uniqueError = {},
}) {
    const selectedPageDetail = useRecoilValue(getSelectedPageData);
    const transitionRoutes = useRecoilValue(getTransitionDestinationRouteList);
    const recoilStateValue = useRecoilValue(appDesignerState);
    const { activeTab, activePageId, tabItems } = recoilStateValue;
    const [functionMode, setFunctionMode] = useState({ mode: '', item: {} });
    const [tagLists, setTagLists] = useState(dataCollection);
    const [selectedTagItems, setSelectedTagItems] = useState([]);

    const [formData, setFormData] = useState(blockData);
    let numField = Array.from({ length: formData.numberOfInputItems }, (_, i) => i + 1);
    function handleOnchange(e) {
        const name = e.target.name;
        let value = valueFormatCheck(e.target.value);
        if (name === 'name属性') {
            setFormData((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    function returnItem(e, items, key) {
        setFormData((prevState) => ({
            ...prevState,
            [key]: items,
        }));
    }
    function disabledTagList() {
        let selectedTagItemsTemp = [];
        for (var i = 1; i <= 6; i++) {
            let formDataTag = formData[`input${i}DataCollection`];
            if (formDataTag && formDataTag.length > 0) {
                selectedTagItemsTemp.push(...formDataTag);
            }
        }
        setSelectedTagItems(selectedTagItemsTemp);
        tagLists.map((item, i) => {
            item.disabled = selectedTagItemsTemp.includes(item.value);
        });
        setTagLists(tagLists);
    }
    useEffect(() => {
        disabledTagList();
    }, []);
    useEffect(() => {
        let selectedTagItemsTemp = [];
        for (var i = 1; i <= 6; i++) {
            let formDataTag = formData[`input${i}DataCollection`];
            if (formDataTag && formDataTag.length > 0) {
                selectedTagItemsTemp.push(...formDataTag);
            }
        }
        tagLists.map((item, i) => {
            item.disabled = selectedTagItemsTemp.includes(item.value);
        });
        setTagLists(tagLists);
    }, [formData, selectedTagItems]);

    return (
        <WhiteModalWrapper width="border-none text-black" className="items-start">
            <ModalTitle title="郵便番号設定" className="text-blue-100 text-xl" />

            <Formik enableReinitialize={true} initialValues={formData}>
                <div className="relative w-full h-full">
                    <Form onChange={handleOnchange}>
                        <div className="body-height3 pt-12 px-10 min-h-[calc(100vh-452px)] !p-0">
                            <div className="flex flex-col py-10">
                                <div className="flex">
                                    <div className="w-1/4 pr-2">
                                        <InputContainer>
                                            <SelectBox
                                                label="郵便番号１横幅"
                                                name="zip1Width"
                                                labelClassName="text-blue-100"
                                                inputClassName="bg-blue-25"
                                            >
                                                {widthAttributes.length > 0 &&
                                                    widthAttributes.map((field, index) => (
                                                        <option value={field.value} key={field.value + '_' + index}>
                                                            {field.caption}
                                                        </option>
                                                    ))}
                                            </SelectBox>
                                        </InputContainer>
                                    </div>
                                    <div className="w-1/4 px-2">
                                        <InputContainer>
                                            <SelectBox
                                                label="郵便番号2横幅 "
                                                name="zip2Width"
                                                labelClassName="text-blue-100"
                                                inputClassName="bg-blue-25"
                                            >
                                                {widthAttributes.length > 0 &&
                                                    widthAttributes.map((field, index) => (
                                                        <option value={field.value} key={field.value + '_' + index}>
                                                            {field.caption}
                                                        </option>
                                                    ))}
                                            </SelectBox>
                                        </InputContainer>
                                    </div>
                                    <div className="w-1/4 px-2">
                                        <TextBox
                                            label="検索エラー時文言(郵便番号１の下部に表示)"
                                            name="zipSearchError"
                                            placeholder="検索エラー時文言(郵便番号１の下部に表示)"
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25"
                                        />
                                    </div>

                                    <div className="w-1/4 pl-2">
                                        <InputContainer>
                                            <SelectBox
                                                label="郵便番号対象フィールド "
                                                name="zipTargetField"
                                                labelClassName="text-blue-100"
                                                inputClassName="bg-blue-25"
                                            >
                                                <option value="customerZipCode">顧客郵便番号</option>
                                                <option value="reservationZipCode">予約郵便番号</option>
                                                <option value="customerDeliveryZipCode">顧客送付先郵便番号</option>
                                                <option value="reservationDeliveryZipCode">予約送付先郵便番号</option>
                                            </SelectBox>
                                        </InputContainer>
                                    </div>
                                </div>

                                <div className="flex">
                                    <div className="w-1/4 pr-2">
                                        <InputContainer>
                                            <TextBox
                                                label="郵便番号１ラベル"
                                                name="zip1Label"
                                                placeholder="郵便番号１ラベル"
                                                labelClassName="text-blue-100"
                                                inputClassName="bg-blue-25"
                                            />
                                        </InputContainer>
                                    </div>
                                    <div className="w-1/4 px-2">
                                        <InputContainer>
                                            <TextBox
                                                label="郵便番号２ラベル"
                                                name="zip2Label"
                                                placeholder="郵便番号２ラベル"
                                                labelClassName="text-blue-100"
                                                inputClassName="bg-blue-25"
                                            />
                                        </InputContainer>
                                    </div>
                                    <div className="w-1/4 px-2">
                                        <InputContainer>
                                            <TextBox
                                                label="郵便番号１プレイスホルダー"
                                                name="zip1PlaceholderText"
                                                placeholder="郵便番号１プレイスホルダー"
                                                labelClassName="text-blue-100"
                                                inputClassName="bg-blue-25"
                                            />
                                        </InputContainer>
                                    </div>
                                    <div className="w-1/4 pl-2">
                                        <InputContainer>
                                            <TextBox
                                                label="郵便番号２プレイスホルダー"
                                                name="zip2PlaceholderText"
                                                placeholder="郵便番号２プレイスホルダー"
                                                labelClassName="text-blue-100"
                                                inputClassName="bg-blue-25"
                                            />
                                        </InputContainer>
                                    </div>
                                </div>

                                <div className="flex">
                                    <div className="w-1/4 pr-2">
                                        <InputContainer>
                                            <TextBox
                                                label="郵便番号１文字数不足時エラー文言"
                                                name="zip1textLengthErrorText"
                                                placeholder="郵便番号１文字数不足時エラー文言"
                                                labelClassName="text-blue-100"
                                                inputClassName="bg-blue-25"
                                            />
                                        </InputContainer>
                                    </div>
                                    <div className="w-1/4 px-2">
                                        <InputContainer>
                                            <TextBox
                                                label="郵便番号２文字数不足時エラー文言"
                                                name="zip2textLengthErrorText"
                                                placeholder="郵便番号２文字数不足時エラー文言"
                                                labelClassName="text-blue-100"
                                                inputClassName="bg-blue-25"
                                            />
                                        </InputContainer>
                                    </div>
                                    <div className="w-1/4 px-2">
                                        <InputContainer>
                                            <SelectBox
                                                label="郵便番号１必須 "
                                                name="zip1Required"
                                                labelClassName="text-blue-100"
                                                inputClassName="bg-blue-25"
                                            >
                                                <option value={false}>任意</option>
                                                <option value={true}>必須</option>
                                            </SelectBox>
                                        </InputContainer>
                                    </div>
                                    <div className="w-1/4 pl-2">
                                        <InputContainer>
                                            <SelectBox
                                                label="郵便番号２必須 "
                                                name="zip2Required"
                                                labelClassName="text-blue-100"
                                                inputClassName="bg-blue-25"
                                            >
                                                <option value={false}>任意</option>
                                                <option value={true}>必須</option>
                                            </SelectBox>
                                        </InputContainer>
                                    </div>
                                </div>

                                <div className="flex">
                                    <div className="w-1/4 pr-2">
                                        <InputContainer>
                                            <SelectBox
                                                label="郵便番号１必須表示 "
                                                name="zip1RequiredDisplay"
                                                labelClassName="text-blue-100"
                                                inputClassName="bg-blue-25"
                                            >
                                                <option value={false}>非表示</option>
                                                <option value={true}>表示</option>
                                            </SelectBox>
                                        </InputContainer>
                                    </div>
                                    <div className="w-1/4 px-2">
                                        <InputContainer>
                                            <SelectBox
                                                label="郵便番号２必須表示 "
                                                name="zip2RequiredDisplay"
                                                labelClassName="text-blue-100"
                                                inputClassName="bg-blue-25"
                                            >
                                                <option value={false}>非表示</option>
                                                <option value={true}>表示</option>
                                            </SelectBox>
                                        </InputContainer>
                                    </div>

                                    <div className="w-1/4 px-2">
                                        <InputContainer>
                                            <Note
                                                label="郵便番号1,2ラベルカスタムクラス"
                                                name="zipAllLabelCustomClass"
                                                placeholder="スタムクラス"
                                                labelClassName="text-blue-100"
                                                inputClassName="bg-blue-25 !p-1"
                                                height="h-8"
                                            />
                                        </InputContainer>
                                    </div>
                                    <div className="w-1/4 pl-2">
                                        <InputContainer>
                                            <Note
                                                label="郵便番号1,2inputカスタムクラス"
                                                name="zipAllInputCustomClass"
                                                placeholder="カスタムクラス"
                                                labelClassName="text-blue-100"
                                                inputClassName="bg-blue-25 !p-1"
                                                height="h-8"
                                            />
                                        </InputContainer>
                                    </div>
                                </div>

                                <div className="flex">
                                    <div className="w-1/3 pr-2">
                                        <InputContainer>
                                            <Note
                                                label="郵便番号1,2placeholderカスタムクラス"
                                                name="zipPlaceholderCustomClass"
                                                placeholder="スタムクラス"
                                                labelClassName="text-blue-100"
                                                inputClassName="bg-blue-25 !p-1"
                                                height="h-8"
                                            />
                                        </InputContainer>
                                    </div>

                                    <div className="w-1/3 px-2">
                                        <InputContainer>
                                            <Note
                                                label="郵便番号1,2エラーカスタムクラス"
                                                name="zipErrorCustomClass"
                                                placeholder="スタムクラス"
                                                labelClassName="text-blue-100"
                                                inputClassName="bg-blue-25 !p-1"
                                                height="h-8"
                                            />
                                        </InputContainer>
                                    </div>
                                    <div className="w-1/3 pl-2">
                                        <InputContainer>
                                            <Note
                                                label="郵便番号1,2Wrapカスタムクラス"
                                                name="zipOuterWrapCustomClass"
                                                placeholder="カスタムクラス"
                                                labelClassName="text-blue-100"
                                                inputClassName="bg-blue-25 !p-1"
                                                height="h-8"
                                            />
                                        </InputContainer>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="w-1/4 pr-2">
                                        <InputContainer>
                                            <SelectBox
                                                label="都道府県をドロップダウン表示"
                                                name="useCityDropdown"
                                                labelClassName="text-blue-100"
                                                inputClassName="bg-blue-25"
                                            >
                                                <option value={false}>しない</option>
                                                <option value={true}>する</option>
                                            </SelectBox>
                                        </InputContainer>
                                    </div>
                                    <div className="w-1/4 px-2">
                                        {formData.useCityDropdown && (
                                            <InputContainer>
                                                <SelectBox
                                                    label="対象フィールドに一致する都市がないの場合の初期選択"
                                                    name="ifEmptyInitialSelection"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25"
                                                >
                                                    {ifEmptyInitialSelection.length > 0 &&
                                                        ifEmptyInitialSelection.map((field, index) => (
                                                            <option value={field.value} key={field.value + '_' + index}>
                                                                {field.caption}
                                                            </option>
                                                        ))}
                                                </SelectBox>
                                            </InputContainer>
                                        )}
                                    </div>
                                    <div className="w-1/4 px-2">
                                        {formData.useCityDropdown && (
                                            <InputContainer>
                                                <SelectBox
                                                    label="都道府県ドロップダウン対象フィールド"
                                                    name="cityDropdownTargetField"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25"
                                                >
                                                    <option value="customerPrefectureNameList">顧客</option>
                                                    <option value="reservationPrefectureNameList">予約</option>
                                                </SelectBox>
                                            </InputContainer>
                                        )}
                                    </div>
                                    <div className="w-1/4 pl-2">
                                        {formData.useCityDropdown && (
                                            <InputContainer>
                                                <SelectBox
                                                    label="都道府県ドロップダウン横幅"
                                                    name="dropdownWidth"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25"
                                                >
                                                    {widthAttributes.length > 0 &&
                                                        widthAttributes.map((field, index) => (
                                                            <option value={field.value} key={field.value + '_' + index}>
                                                                {field.caption}
                                                            </option>
                                                        ))}
                                                </SelectBox>
                                            </InputContainer>
                                        )}
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="w-1/4 pr-2">
                                        {formData.useCityDropdown && (
                                            <InputContainer>
                                                <SelectBox
                                                    label="都道府県ドロップダウン必須 "
                                                    name="dropdownRequired"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25"
                                                >
                                                    <option value={false}>任意</option>
                                                    <option value={true}>必須</option>
                                                </SelectBox>
                                            </InputContainer>
                                        )}
                                    </div>
                                    <div className="w-1/4 px-2">
                                        {formData.useCityDropdown && (
                                            <InputContainer>
                                                <SelectBox
                                                    label="都道府県ドロップダウン必須表示"
                                                    name="dropdownRequiredDisplay"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25"
                                                >
                                                    <option value={false}>しない</option>
                                                    <option value={true}>する</option>
                                                </SelectBox>
                                            </InputContainer>
                                        )}
                                    </div>
                                    <div className="w-1/4 px-2">
                                        {formData.useCityDropdown && (
                                            <InputContainer>
                                                <TextBox
                                                    label="都道府県ドロップダウンラベル"
                                                    name="dropdownLabel"
                                                    placeholder="都道府県ドロップダウンラベル"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25"
                                                />
                                            </InputContainer>
                                        )}
                                    </div>
                                    <div className="w-1/4 pl-2">
                                        {formData.useCityDropdown && (
                                            <InputContainer>
                                                <Note
                                                    label="都道府県ドロップダウンラベルカスタムクラス"
                                                    name="dropdownLabelCustomClass"
                                                    placeholder="カスタムクラス"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25 !p-1"
                                                    height="h-8"
                                                />
                                            </InputContainer>
                                        )}
                                    </div>
                                </div>

                                <div className="flex">
                                    <div className="w-1/3 pr-2">
                                        <InputContainer>
                                            <Note
                                                label="都道府県ドロップダウンカスタムクラス"
                                                name="dropdownCustomClass"
                                                placeholder="スタムクラス"
                                                labelClassName="text-blue-100"
                                                inputClassName="bg-blue-25 !p-1"
                                                height="h-8"
                                            />
                                        </InputContainer>
                                    </div>

                                    <div className="w-1/3 px-2">
                                        <InputContainer>
                                            <Note
                                                label="都道府県ドロップダウンエラーカスタムクラス"
                                                name="dropdownErrorCustomClass"
                                                placeholder="スタムクラス"
                                                labelClassName="text-blue-100"
                                                inputClassName="bg-blue-25 !p-1"
                                                height="h-8"
                                            />
                                        </InputContainer>
                                    </div>
                                    <div className="w-1/3 pl-2">
                                        <InputContainer>
                                            <Note
                                                label="都道府県Wrapカスタムクラス"
                                                name="dropdownWrapCustomClass"
                                                placeholder="カスタムクラス"
                                                labelClassName="text-blue-100"
                                                inputClassName="bg-blue-25 !p-1"
                                                height="h-8"
                                            />
                                        </InputContainer>
                                    </div>
                                </div>

                                <InputContainer>
                                    <SelectBox
                                        label="入力項目数"
                                        name="numberOfInputItems"
                                        labelClassName="text-blue-100"
                                        inputClassName="bg-blue-25"
                                    >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                    </SelectBox>
                                </InputContainer>

                                {numField.length > 0 &&
                                    numField.map((number, index) => (
                                        <React.Fragment key={index}>
                                            <label
                                                htmlFor="headerAreaShadow"
                                                className="text-blue-100 !mb-8 !mt-8"
                                            >{`入力項目${number}設定`}</label>
                                            <div className="px-8">
                                                <InputContainer>
                                                    <label htmlFor="headerAreaShadow" className="text-blue-100">
                                                        郵便番号検索データ挿入方法
                                                    </label>
                                                    <TagBoxComponent
                                                        dragList={tagLists}
                                                        functionMode={functionMode}
                                                        preDefineTagBoxValue={formData[`input${number}DataCollection`]}
                                                        displayExpr={(data) => data.caption}
                                                        valueExpr="value"
                                                        attrKey={`input${number}DataCollection`}
                                                        returnItem={returnItem}
                                                    />
                                                </InputContainer>
                                                <div className="flex">
                                                    <div className="w-1/4 pr-2">
                                                        <InputContainer>
                                                            <SelectBox
                                                                label="横幅"
                                                                name={`input${number}Width`}
                                                                labelClassName="text-blue-100"
                                                                inputClassName="bg-blue-25"
                                                            >
                                                                {widthAttributes.length > 0 &&
                                                                    widthAttributes.map((field, index) => (
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
                                                    <div className="w-1/4 px-2">
                                                        <InputContainer>
                                                            <SelectBox
                                                                label="必須 "
                                                                name={`input${number}Required`}
                                                                labelClassName="text-blue-100"
                                                                inputClassName="bg-blue-25"
                                                            >
                                                                <option value={false}>任意</option>
                                                                <option value={true}>必須</option>
                                                            </SelectBox>
                                                        </InputContainer>
                                                    </div>
                                                    <div className="w-1/4 px-2">
                                                        <InputContainer>
                                                            <SelectBox
                                                                label="必須表示"
                                                                name={`input${number}RequiredDisplay`}
                                                                labelClassName="text-blue-100"
                                                                inputClassName="bg-blue-25"
                                                            >
                                                                <option value={false}>しない</option>
                                                                <option value={true}>する</option>
                                                            </SelectBox>
                                                        </InputContainer>
                                                    </div>
                                                    <div className="w-1/4 pl-2">
                                                        <InputContainer>
                                                            <Note
                                                                label="必須エラー文言"
                                                                name={`input${number}RequiredErrorText`}
                                                                placeholder="カスタムClass"
                                                                labelClassName="text-blue-100"
                                                                inputClassName="bg-blue-25 !p-1"
                                                                height="h-8"
                                                            />
                                                        </InputContainer>
                                                    </div>
                                                </div>
                                                <div className="flex">
                                                    <div className="w-1/4 pr-2">
                                                        <InputContainer>
                                                            <TextBox
                                                                label="ラベル"
                                                                name={`input${number}Label`}
                                                                labelClassName="text-blue-100"
                                                                inputClassName="bg-blue-25"
                                                            />
                                                        </InputContainer>
                                                    </div>
                                                    <div className="w-1/4 px-2">
                                                        <InputContainer>
                                                            <TextBox
                                                                label="placeholder"
                                                                name={`input${number}PlaceholderText`}
                                                                labelClassName="text-blue-100"
                                                                inputClassName="bg-blue-25"
                                                            />
                                                        </InputContainer>
                                                    </div>
                                                    <div className="w-1/4 px-2">
                                                        <InputContainer>
                                                            <TextBox
                                                                label="許可パターン正規表現"
                                                                name={`input${number}RegularExpressions`}
                                                                labelClassName="text-blue-100"
                                                                inputClassName="bg-blue-25"
                                                            />
                                                        </InputContainer>
                                                    </div>
                                                    <div className="w-1/4 pl-2">
                                                        <InputContainer>
                                                            <TextBox
                                                                label="正規表現エラー時テキスト"
                                                                name={`input${number}RegularExpressionsErrorText`}
                                                                labelClassName="text-blue-100"
                                                                inputClassName="bg-blue-25"
                                                            />
                                                        </InputContainer>
                                                    </div>
                                                </div>
                                                <div className="flex">
                                                    <div className="w-1/3 pr-2">
                                                        <InputContainer>
                                                            <TextBox
                                                                // ref={(el) => (nameRef.current[number] = el)}
                                                                label="name属性"
                                                                name={`input${number}Name`}
                                                                labelClassName="text-blue-100"
                                                                inputClassName="bg-blue-25"
                                                                isRequired={true}
                                                                validate={(value) => {
                                                                    if (!value) return 'name属性は必須です.';
                                                                }}
                                                                onBlur={(e) => handleBlur(e, formData.appPageBlockId)}
                                                            />
                                                        </InputContainer>
                                                    </div>
                                                    <div className="w-1/3 px-2">
                                                        <InputContainer>
                                                            <SelectBox
                                                                label="autocomplate属性"
                                                                name={`input${number}AutoComplete`}
                                                                labelClassName="text-blue-100"
                                                                inputClassName="bg-blue-25"
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
                                                    <div className="w-1/3 pl-2">
                                                        <InputContainer>
                                                            <SelectBox
                                                                label="入力モード"
                                                                name={`input${number}InputMode`}
                                                                labelClassName="text-blue-100"
                                                                inputClassName="bg-blue-25"
                                                            >
                                                                {inputMode.length > 0 &&
                                                                    inputMode.map((field, index) => (
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
                                                <InputContainer>
                                                    <SelectBox
                                                        label="対象フィールド"
                                                        name={`input${number}TargetField`}
                                                        labelClassName="text-blue-100"
                                                        inputClassName="bg-blue-25"
                                                    >
                                                        {fieldCodeNewList.length > 0 &&
                                                            fieldCodeNewList.map((field, index) => (
                                                                <option
                                                                    value={field.value}
                                                                    key={field.value + '_' + index}
                                                                >
                                                                    {field.caption}
                                                                </option>
                                                            ))}
                                                    </SelectBox>
                                                </InputContainer>
                                                <InputContainer>
                                                    <Note
                                                        label="ラベルカスタムクラス"
                                                        name={`input${number}LabelCustomClass`}
                                                        placeholder="カスタムClass"
                                                        labelClassName="text-blue-100"
                                                        inputClassName="bg-blue-25 !p-1"
                                                        height="h-8"
                                                    />
                                                </InputContainer>
                                                <InputContainer>
                                                    <Note
                                                        label="inputカスタムクラス"
                                                        name={`input${number}InputCustomClass`}
                                                        placeholder="カスタムClass"
                                                        labelClassName="text-blue-100"
                                                        inputClassName="bg-blue-25 !p-1"
                                                        height="h-8"
                                                    />
                                                </InputContainer>
                                                <InputContainer>
                                                    <Note
                                                        label="placeholderカスタムクラス"
                                                        name={`input${number}PlaceholderCustomClass`}
                                                        placeholder="カスタムClass"
                                                        labelClassName="text-blue-100"
                                                        inputClassName="bg-blue-25 !p-1"
                                                        height="h-8"
                                                    />
                                                </InputContainer>
                                                <InputContainer>
                                                    <Note
                                                        label="エラーテキストカスタムクラス"
                                                        name={`input${number}ErrorTextCustomClass`}
                                                        placeholder="カスタムClass"
                                                        labelClassName="text-blue-100"
                                                        inputClassName="bg-blue-25 !p-1"
                                                        height="h-8"
                                                    />
                                                </InputContainer>
                                                <InputContainer>
                                                    <Note
                                                        label="areaWrapカスタムクラス"
                                                        name={`input${number}WrapCustomClass`}
                                                        placeholder="カスタムClass"
                                                        labelClassName="text-blue-100"
                                                        inputClassName="bg-blue-25 !p-1"
                                                        height="h-8"
                                                    />
                                                </InputContainer>
                                            </div>
                                        </React.Fragment>
                                    ))}
                                <InputContainer>
                                    <Note
                                        label="ブロックカスタムクラス"
                                        name="blockWrapCustomClass"
                                        placeholder="カスタムClass"
                                        labelClassName="text-blue-100"
                                        inputClassName="bg-blue-25 !p-1"
                                        height="h-8"
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
    );
}
