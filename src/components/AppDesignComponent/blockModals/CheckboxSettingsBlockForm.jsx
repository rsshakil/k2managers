import React, { useState, useEffect } from "react";
import { Form, Formik } from "formik";
import _ from "lodash";

import SelectBox from "../../Form/FormInputs/SelectBox";
import TextBox from "../../Form/FormInputs/TextBox";
import InputContainer from "../../Wrapper/InputContainer";
import WhiteModalWrapper from '../../Modal/components/WhiteModalWrapper';
import ModalTitle from "../../Modal/components/ModalTitle";
import { getFieldList } from '../../../services/appDesignerService';
import { TagBox } from "devextreme-react/tag-box";
import ArrayStore from 'devextreme/data/array_store';
import { isPositiveInteger, valueFormatCheck, twoArrayHaveSameItem } from "../../../utilities/commonFunctions";
import BlockModalFooter from "./BlockModalFooter";
import Loader from "../../Loading/Loader";
import { pageBlockFormSchema } from "../../../lib/Schema";
import Note from "../../Form/FormInputs/Note";
import { errorMessages } from "../../../lib/errorMessages";

const placeholderItem = {
    fieldId: "",
    fieldName: "フィールドを選択してください",
    fieldStyle: {
        caption: "フィールドを選択してください",
    },
};
export default function CheckboxSettingsBlockForm({ blockData, error = '', setModalOpen = () => { }, handleOnPressSave = () => { }, uniqueError = {} }) {
    const [formData, setFormData] = useState(blockData);
    const [fieldList, setFieldList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [initialSelectionError, setInitialSelectionError] = useState('');
    const [selectedFieldStyles, setSelectedFieldStyles] = useState(new ArrayStore({
        data: [],
        key: 'id',
    }));

    useEffect(() => {
        async function getFieldListInit() {
            try {
                setLoading(true);
                const projectId = window.sessionStorage.getItem("currentProjectId");

                const { data, status } = await getFieldList(3, projectId);
                if (status == 200) {
                    let { records = [] } = data || [];
                    setFieldList([placeholderItem, ...records]);

                    const selectedFie = formData.fieldId ? records.find(x => x.fieldId === +formData.fieldId) : records[0].fieldId;

                    handleOnChangeField(selectedFie);
                }

                setLoading(false);
            }
            catch (err) {
                console.log(err);
                setLoading(false);
            }
        }

        getFieldListInit();

    }, []);



    function handleOnChangeField(field) {

        let initialSelectionArrays = [];
        let unchangeablesArrays = [];
        let displayTextsArray = [];

        const { displayTexts = [], fieldId = '', initialSelections = [], unchangeables = [] } = blockData;

        const { lookup = [] } = field.fieldStyle;

        if (Number(field.fieldId) === Number(fieldId)) {
            displayTextsArray = lookup.map(x => {
                const { inputBox2 = {}, fieldListCode = '' } = x;

                const foundItem = displayTexts.find(i => i.fieldCode === fieldListCode);
                const { newValue = '' } = foundItem || '';

                return { ...inputBox2, fieldCode: fieldListCode, newValue: newValue };
            })

            initialSelectionArrays = initialSelections;
            unchangeablesArrays = unchangeables;

        } else {
            displayTextsArray = lookup.map(x => {
                const { inputBox2 = {}, fieldListCode = '' } = x;

                return { ...inputBox2, fieldCode: fieldListCode, newValue: '' };
            })
        }

        setSelectedFieldStyles(new ArrayStore({
            data: displayTextsArray,
            key: 'id',
        }));

        setFormData((prevState) => ({
            ...prevState,
            fieldId: field.fieldId,
            fieldCode: field.fieldCode,
            initialSelections: initialSelectionArrays,
            unchangeables: unchangeablesArrays,
            displayTexts: displayTextsArray,
        }))
    }


    function handleOnchange(e) {
        const name = e.target.name;
        let value = valueFormatCheck(e.target.value)

        if (name === 'displayTexts') {
            // It doesn't work if + is attached. Please tell me the meaning of + TODO from haga
            // const selectedItemId = +e.target.getAttribute("data-id")
            const selectedItemId = e.target.getAttribute("data-id")
            value = [...formData.displayTexts].map(item => {
                return item.id == selectedItemId ? { ...item, newValue: value } : item;
            });

        } else if (name === 'fieldId') {
            const newSselectedField = fieldList.find(x => x.fieldId === +value);
            handleOnChangeField(newSselectedField);

            console.log('my form ////', formData)
        }

        if (name === 'minQuantity' || name === 'maxQuantity') {
            const result = isPositiveInteger(value);

            if (!result) {
                return null;
            }
        }

        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }


    function handleOnChangeTags(e, name = '') {
        const { addedItems = [], removedItems = [] } = e || {};

        let updatedTagItems = formData[name];

        if (addedItems.length > 0) {
            updatedTagItems = [...updatedTagItems, ...addedItems];
        }

        if (removedItems.length > 0) {
            updatedTagItems = updatedTagItems.filter(x => !removedItems.filter(y => y.fieldCode === x.fieldCode).length);
        }

        updatedTagItems = _.uniqBy(updatedTagItems, 'fieldCode');

        setFormData((prevState) => ({
            ...prevState,
            [name]: updatedTagItems
        }))
    }

    const handleOnClickSubmit = (e) => {
        e.preventDefault();
        setInitialSelectionError('');

        const { initialSelections = [], unchangeables = [], displayTexts = [] } = formData || {};

        //Duplicate item selection error checking
        if (initialSelections.length > 0 && unchangeables.length > 0) {
            const result = twoArrayHaveSameItem(initialSelections, unchangeables);

            if (result) {
                setInitialSelectionError(errorMessages['E_DUPLICATE']);
                return null;
            }
        }

        //All unselected item selection error cehcking
        if (unchangeables.length > 0 && displayTexts.length > 0 && (unchangeables.length == displayTexts.length)) {
            setInitialSelectionError(errorMessages['E_ALL_UNSELECTED']);
            return null;
        }

        handleOnPressSave(e, formData);
    }

    return (
        <>
            {loading && <Loader />}

            <WhiteModalWrapper width="border-none text-black" className="items-start">
                <ModalTitle title="入力フォームcheckbox設定" className="text-blue-100 text-xl" />

                <Formik
                    enableReinitialize={true}
                    initialValues={formData}
                >
                    <div className='relative w-full h-full'>
                        <Form onChange={handleOnchange}>
                            <div className="body-height3 pt-12 px-10 min-h-[calc(100vh-452px)] !p-0">
                                <div className="flex flex-col py-10">
                                    <InputContainer>
                                        <SelectBox
                                            label="表示方法"
                                            name="verticalOrHorizontal"
                                            labelClassName="text-blue-100 text-xs"
                                            inputClassName="bg-blue-25"
                                            value={formData.verticalOrHorizontal}
                                            onChange={handleOnchange}
                                        >
                                            <option value={0}>縦並び</option>
                                            <option value={1}>横並び</option>
                                        </SelectBox>
                                    </InputContainer>
                                    <InputContainer>
                                        <SelectBox
                                            label="対象フィールド（[個]予約カテゴリーIDと[個]施設IDを選択すると予期せぬ挙動となることがあります）"
                                            name="fieldId"
                                            labelClassName="text-blue-100 text-xs"
                                            inputClassName="bg-blue-25"
                                            value={formData.fieldId}
                                            onChange={handleOnchange}
                                        >
                                            {fieldList.map(x => <option key={x.fieldId} value={x.fieldId}>{x.fieldName}</option>)}
                                        </SelectBox>
                                    </InputContainer>
                                    <InputContainer>
                                        <TextBox
                                            label="エリアラベル"
                                            name="label"
                                            labelClassName="text-blue-100 text-xs"
                                            inputClassName="bg-blue-25"
                                            value={formData.label}
                                            onChange={handleOnchange}
                                            placeholder="エリアラベル"
                                        />
                                    </InputContainer>

                                    <div className="px-8">
                                        <div className="flex">
                                            <div className="w-1/5 pr-2">
                                                <InputContainer>
                                                    <TextBox
                                                        // type="number"
                                                        label="最低選択個数（1以上で必須表示）"
                                                        name="minQuantity"
                                                        labelClassName='text-blue-100 text-xs'
                                                        inputClassName='bg-blue-25'
                                                        value={formData.minQuantity}
                                                        onChange={handleOnchange}
                                                        placeholder="最低選択個数"
                                                    />
                                                </InputContainer>
                                            </div>
                                            <div className="w-1/5 px-2">
                                                <InputContainer>
                                                    <TextBox
                                                        // type="number"
                                                        label="最大選択個数"
                                                        name="maxQuantity"
                                                        labelClassName="text-blue-100 text-xs"
                                                        inputClassName="bg-blue-25"
                                                        value={formData.maxQuantity}
                                                        onChange={handleOnchange}
                                                        placeholder="最大選択個数"
                                                    />
                                                </InputContainer>
                                            </div>
                                            <div className="w-1/5 px-2">
                                                <InputContainer>
                                                    <TextBox
                                                        label="name属性"
                                                        name="name"
                                                        labelClassName="text-blue-100 text-xs"
                                                        inputClassName="bg-blue-25"
                                                        value={formData.name}
                                                        onChange={handleOnchange}
                                                        placeholder="name属性"
                                                        isRequired
                                                    />
                                                </InputContainer>
                                            </div>
                                            <div className="w-1/5 pl-2">
                                                <InputContainer>
                                                    <TextBox
                                                        label="最低選択個数エラー時テキスト"
                                                        name="minQuantityErrorText"
                                                        labelClassName="text-blue-100 text-xs"
                                                        inputClassName="bg-blue-25"
                                                        value={formData.minQuantityErrorText}
                                                        onChange={handleOnchange}
                                                        placeholder="最低選択個数エラー時テキスト"
                                                    />
                                                </InputContainer>
                                            </div>
                                        </div>

                                        <InputContainer>
                                            <Note
                                                label="ラベルカスタムクラス"
                                                name="labelCustomClass"
                                                labelClassName="text-blue-100 text-xs"
                                                inputClassName='bg-blue-25 !p-1'
                                                height='h-8'
                                                value={formData.labelCustomClass}
                                                onChange={handleOnchange}
                                                placeholder="ラベルカスタムクラス"
                                            />
                                        </InputContainer>
                                        <InputContainer>
                                            <Note
                                                label="inputCheckboxカスタムクラス"
                                                name="inputCustomClass"
                                                labelClassName="text-blue-100 text-xs"
                                                inputClassName='bg-blue-25 !p-1'
                                                height='h-8'
                                                value={formData.inputCustomClass}
                                                onChange={handleOnchange}
                                                placeholder="inputCheckboxカスタムクラス"
                                            />
                                        </InputContainer>
                                        <InputContainer>
                                            <Note
                                                label="エラーテキストカスタムクラス"
                                                name="errorTextCustomClass"
                                                labelClassName="text-blue-100 text-xs"
                                                inputClassName='bg-blue-25 !p-1'
                                                height='h-8'
                                                value={formData.errorTextCustomClass}
                                                onChange={handleOnchange}
                                                placeholder="エラーテキストカスタムクラス"
                                            />
                                        </InputContainer>
                                        <InputContainer>
                                            <Note
                                                label="areaWrapカスタムクラス"
                                                name="areaWrapCustomClass"
                                                labelClassName="text-blue-100 text-xs"
                                                inputClassName='bg-blue-25 !p-1'
                                                height='h-8'
                                                value={formData.areaWrapCustomClass}
                                                onChange={handleOnchange}
                                                placeholder="areaWrapカスタムクラス"
                                            />
                                        </InputContainer>
                                    </div>

                                    <InputContainer>
                                        <label className="text-blue-100 text-xs">初期選択アイテム</label>
                                        <TagBox
                                            name="initialSelections"
                                            dataSource={selectedFieldStyles}
                                            value={!loading ? _.map(formData.initialSelections, 'fieldCode') : []}
                                            displayExpr="value"
                                            valueExpr="fieldCode"
                                            onSelectionChanged={(e) => handleOnChangeTags(e, 'initialSelections')}
                                            noDataText="データがありません"
                                            selectAllText="すべて選択する"
                                            placeholder="初期選択アイテムを選択してください"
                                        />
                                    </InputContainer>
                                    <InputContainer>
                                        <label className="text-blue-100 text-xs">選択変更不可アイテム</label>
                                        <TagBox
                                            name="unchangeables"
                                            dataSource={selectedFieldStyles}
                                            value={!loading ? _.map(formData.unchangeables, 'fieldCode') : []}
                                            displayExpr="value"
                                            valueExpr="fieldCode"
                                            onSelectionChanged={(e) => handleOnChangeTags(e, 'unchangeables')}
                                            noDataText="データがありません"
                                            selectAllText="すべて選択する"
                                            placeholder="選択変更不可アイテムを選択してください"
                                        />
                                    </InputContainer>

                                    <div>
                                        <label className="text-blue-100 text-xs">画面表示文言</label>
                                        <div className="px-8 mt-2">
                                            {formData.displayTexts.map(x => (
                                                <InputContainer key={x.id}>
                                                    <TextBox
                                                        label={`管理名：${x.value}`}
                                                        name="displayTexts"
                                                        labelClassName='text-blue-100 text-xs'
                                                        inputClassName='bg-blue-25'
                                                        data-id={x.id}
                                                        value={x.newValue}
                                                        onChange={handleOnchange}
                                                        placeholder="画面に表示する文言"
                                                    />
                                                </InputContainer>
                                            ))}
                                        </div>
                                    </div>

                                    <InputContainer>
                                        <Note
                                            label="blockWrapカスタムクラス"
                                            name="blockWrapCustomClass"
                                            labelClassName='text-blue-100 text-xs'
                                            inputClassName='bg-blue-25 !p-1'
                                            height='h-8'
                                            placeholder="blockWrapカスタムクラス"
                                        />
                                    </InputContainer>
                                </div>
                            </div>

                            <BlockModalFooter
                                errors={{ itemSelectionError: initialSelectionError, ...uniqueError }}
                                setModalOpen={() => setModalOpen(false)}
                                handleOnPressSave={handleOnClickSubmit}
                            />
                        </Form>
                    </div>
                </Formik>
            </WhiteModalWrapper >
        </>
    )
}