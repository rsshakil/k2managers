import { Form, Formik } from "formik";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { v4 as uuid } from 'uuid';

import { TagBox } from "devextreme-react/tag-box";
import ArrayStore from 'devextreme/data/array_store';
import { getFieldList } from '../../../services/appDesignerService';
import { valueFormatCheck, twoArrayHaveSameItem } from "../../../utilities/commonFunctions";
import Note from "../../Form/FormInputs/Note";
import SelectBox from "../../Form/FormInputs/SelectBox";
import TextBox from "../../Form/FormInputs/TextBox";
import Loader from "../../Loading/Loader";
import ModalTitle from "../../Modal/components/ModalTitle";
import WhiteModalWrapper from '../../Modal/components/WhiteModalWrapper';
import InputContainer from "../../Wrapper/InputContainer";
import BlockModalFooter from "./BlockModalFooter";
import { errorMessages } from "../../../lib/errorMessages";

export default function RadioBSettingsBlockForm({ blockData, setModalOpen = () => { }, handleOnPressSave = () => { }, uniqueError = {} }) {
    const [formData, setFormData] = useState(blockData);
    const [fieldList, setFieldList] = useState([]);
    const [selectedFieldStyles, setSelectedFieldStyles] = useState([]);
    const [initialSelections, setInitialSelections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [initialSelectionError, setInitialSelectionError] = useState('');

    useEffect(() => {
        async function getFieldListInit() {
            try {
                setLoading(true);
                const projectId = window.sessionStorage.getItem("currentProjectId");

                const { data, status } = await getFieldList('3,4', projectId);
                if (status == 200) {
                    let { records = [] } = data || [];
                    setFieldList(records);

                    const selectedFie = formData.fieldId ? records.find(x => x.fieldId === +formData.fieldId) : records[0];
                    handleOnChangeField(selectedFie);
                }
                setLoading(false);

            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        }

        getFieldListInit();

    }, []);

    function handleOnChangeField(field) {
        const { fieldStyle = '', fieldType = 0, fieldCode = '' } = field;
        const { lookup = [] } = fieldStyle || '';

        let items = [];
        if (fieldType === 3) { //textbox type
            items = lookup.map(x => {
                const { inputBox2 = '', fieldListCode = '' } = x;
                inputBox2.fieldCode = fieldListCode;
                return inputBox2;
            })
        } else if (fieldType === 4) { //boolean type
            let { trueText = '', falseText = '', dataType = 'boolean' } = fieldStyle;

            items = [
                { id: uuid(), type: dataType, name: 'trueText', value: trueText, fieldCode: 1 },
                { id: uuid(), type: dataType, name: 'falseText', value: falseText, fieldCode: 0 },
            ]
        }


        let unchangeablesArrays = [];
        let displayTextsArray = [];

        if (field.fieldId !== +formData.fieldId) {
            displayTextsArray = items.map(x => { return x.newValue ? x : { ...x, newValue: '' } });

        } else {
            displayTextsArray = formData.displayTexts;

            if (formData.unchangeables.length > 0) {
                unchangeablesArrays = formData.unchangeables;

                if (fieldType === 4) {
                    items.map(x => {
                        var foundIndex = formData.unchangeables.findIndex(y => y.name == x.name);
                        if (foundIndex >= 0) {
                            x.id = formData.unchangeables[foundIndex].id;
                        }
                        return x;
                    })
                }
            }
        }

        setSelectedFieldStyles(new ArrayStore({
            data: items,
            key: 'id',
        }));

        setInitialSelections(items);


        setFormData((prevState) => ({
            ...prevState,
            fieldId: field.fieldId,
            fieldCode: field.fieldCode,
            unchangeables: unchangeablesArrays,
            displayTexts: displayTextsArray,
        }))
    }


    function handleOnchange(e) {
        const name = e.target.name;
        let value = valueFormatCheck(e.target.value);


        if (name === 'displayTexts') {
            const selectedItemId = e.target.getAttribute("data-id")
            value = [...formData.displayTexts].map(item => {
                return item.id == selectedItemId ? { ...item, newValue: value } : item;
            });

        } else if (name === 'fieldId') {
            const newSselectedField = fieldList.find(x => x.fieldId === +value);
            handleOnChangeField(newSselectedField);
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

        let { initialSelections = '', unchangeables = [], displayTexts = [] } = formData || {};

        if (initialSelections !== '' && initialSelections !== undefined) {
            initialSelections = [{ fieldCode: initialSelections }]
        } else {
            initialSelections = [];
        }

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
                <ModalTitle title="入力フォームinputRadioB設定" className="text-blue-100 text-xl" />

                <Formik enableReinitialize={true} initialValues={formData}>
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

                                    <div className="px-8">
                                        <div className="flex">
                                            {/*<div className="w-1/5 pr-2">
                                                <InputContainer>
                                                    <SelectBox
                                                        label="必須"
                                                        name="required"
                                                        labelClassName="text-blue-100 text-xs"
                                                        inputClassName="bg-blue-25"
                                                        value={formData.required}
                                                        onChange={handleOnchange}
                                                    >
                                                        <option value={false}>任意</option>
                                                        <option value={true}>必須</option>
                                                    </SelectBox>
                                                </InputContainer>
                                            </div>*/}
                                            <div className="w-1/5 px-2">
                                                <InputContainer>
                                                    <SelectBox
                                                        label="初期選択アイテム"
                                                        name="initialSelections"
                                                        labelClassName="text-blue-100 text-xs"
                                                        inputClassName="bg-blue-25"
                                                        value={formData.initialSelections}
                                                        onChange={handleOnchange}
                                                    >
                                                        <option value="">選択なし</option>
                                                        {initialSelections.map(x => <option key={x.id} value={x.fieldCode}>{x.value}</option>)}
                                                    </SelectBox>
                                                </InputContainer>
                                            </div>
                                            <div className="w-1/5 px-2">
                                                <InputContainer>
                                                    <TextBox
                                                        label="エリアラベル"
                                                        name="label"
                                                        labelClassName='text-blue-100 text-xs'
                                                        inputClassName='bg-blue-25'
                                                        value={formData.label}
                                                        onChange={handleOnchange}
                                                        placeholder="エリアラベル"
                                                    />
                                                </InputContainer>
                                            </div>
                                            {/*<div className="w-1/5 px-2">
                                                <InputContainer>
                                                    <TextBox
                                                        label="必須エラー時テキスト"
                                                        name="requiredErrorText"
                                                        labelClassName='text-blue-100 text-xs'
                                                        inputClassName='bg-blue-25'
                                                        value={formData.requiredErrorText}
                                                        onChange={handleOnchange}
                                                        placeholder="必須エラー時テキスト"
                                                    />
                                                </InputContainer>
                                            </div>*/}
                                            <div className="w-1/5 pl-2">
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
                                        </div>
                                    </div>


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
                                            {formData.displayTexts.map((x, index) => (
                                                <InputContainer key={index}>
                                                    <TextBox
                                                        label={`管理名：${x.value}`}
                                                        name="displayTexts"
                                                        labelClassName='text-blue-100 text-xs'
                                                        inputClassName='bg-blue-25'
                                                        data-id={x.id}
                                                        value={x.newValue}
                                                        onChange={handleOnchange}
                                                        placeholder="画面に表示する文言を入力してください"
                                                    />
                                                </InputContainer>
                                            ))}
                                        </div>
                                    </div>

                                    <InputContainer>
                                        <Note
                                            label="ラベルカスタムクラス"
                                            name="labelCustomClass"
                                            labelClassName='text-blue-100 text-xs'
                                            inputClassName='bg-blue-25 !p-1'
                                            height='h-8'
                                            value={formData.labelCustomClass}
                                            onChange={handleOnchange}
                                            placeholder="カスタムClass"
                                        />
                                    </InputContainer>
                                    <InputContainer>
                                        <Note
                                            label="inputRadioカスタムクラス"
                                            name="inputRadioCustomClass"
                                            labelClassName='text-blue-100 text-xs'
                                            inputClassName='bg-blue-25 !p-1'
                                            height='h-8'
                                            value={formData.inputRadioCustomClass}
                                            onChange={handleOnchange}
                                            placeholder="カスタムClass"
                                        />
                                    </InputContainer>
                                    <InputContainer>
                                        <Note
                                            label="captionカスタムクラス"
                                            name="captionCustomClass"
                                            labelClassName='text-blue-100 text-xs'
                                            inputClassName='bg-blue-25 !p-1'
                                            height='h-8'
                                            value={formData.captionCustomClass}
                                            onChange={handleOnchange}
                                            placeholder="カスタムClass"
                                        />
                                    </InputContainer>
                                    <InputContainer>
                                        <Note
                                            label="エラーカスタムクラス"
                                            name="errorTextCustomClass"
                                            labelClassName='text-blue-100 text-xs'
                                            inputClassName='bg-blue-25 !p-1'
                                            height='h-8'
                                            value={formData.errorTextCustomClass}
                                            onChange={handleOnchange}
                                            placeholder="カスタムClass"
                                        />
                                    </InputContainer>
                                    <InputContainer>
                                        <Note
                                            label="blockWrapカスタムクラス"
                                            name="blockWrapCustomClass"
                                            labelClassName='text-blue-100 text-xs'
                                            inputClassName='bg-blue-25 !p-1'
                                            height='h-8'
                                            placeholder="カスタムClass"
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