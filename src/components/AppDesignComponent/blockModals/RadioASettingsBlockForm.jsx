
//--------added 6th feb,23, no need anymore-------
//Ebetsu Version

import { Form, Formik } from "formik";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { v4 as uuid } from 'uuid';

import { TagBox } from "devextreme-react/tag-box";
import ArrayStore from 'devextreme/data/array_store';
import { getFieldList } from '../../../services/appDesignerService';
import { valueFormatCheck } from "../../../utilities/commonFunctions";
import SelectBox from "../../Form/FormInputs/SelectBox";
import TextBox from "../../Form/FormInputs/TextBox";
import Loader from "../../Loading/Loader";
import ModalTitle from "../../Modal/components/ModalTitle";
import WhiteModalWrapper from '../../Modal/components/WhiteModalWrapper';
import InputContainer from "../../Wrapper/InputContainer";
import BlockModalFooter from "./BlockModalFooter";

export default function RadioASettingsBlockForm({ blockData, setModalOpen = () => { }, handleOnPressSave = () => { }, uniqueError = {} }) {
    const [formData, setFormData] = useState(blockData);
    const [fieldList, setFieldList] = useState([]);
    const [selectedFieldStyles, setSelectedFieldStyles] = useState([]);
    const [initialSelections, setInitialSelections] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getFieldListInit() {
            try {
                setLoading(true);
                const projectId = window.sessionStorage.getItem("currentProjectId");

                const { data, status } = await getFieldList(4, projectId);
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
        let { trueText = '', falseText = '' } = field?.fieldStyle;

        let items = [
            { id: uuid(), name: 'trueText', value: trueText },
            { id: uuid(), name: 'falseText', value: falseText },
        ]


        let unchangeablesArrays = [];
        let updatedTrueText = '';
        let updatedFalseText = '';

        if (field.fieldId !== +formData.fieldId) {
            

        } else {
            if (formData.unchangeables.length > 0) {
                unchangeablesArrays = formData.unchangeables;

                items.map(x => {
                    var foundIndex = formData.unchangeables.findIndex(y => y.name == x.name);
                    if (foundIndex >= 0) {
                        x.id = formData.unchangeables[foundIndex].id;
                    }
                    return x;
                })
            }

            updatedTrueText = formData.trueText;
            updatedFalseText = formData.falseText;
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
            trueText: updatedTrueText,
            falseText: updatedFalseText,
        }))
    }


    function handleOnchange(e) {
        const name = e.target.name;

        let value = valueFormatCheck(e.target.value);


        if (name === 'fieldId') {
            const newSselectedField = fieldList.find(x => x.fieldId === +value);
            handleOnChangeField(newSselectedField);
        }

        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }


    function handleOnChangeTags(e, name = '') { 
        const { addedItems = [], removedItems = [] } = e;

        let updatedTagItems = formData[name];

        if (addedItems.length > 0) {
            updatedTagItems = [...updatedTagItems, ...addedItems];
        }

        if (removedItems.length > 0) {
            updatedTagItems = updatedTagItems.filter(x => !removedItems.filter(y => y.id === x.id).length);
        }

        updatedTagItems = _.uniqBy(updatedTagItems, 'id');

        setFormData((prevState) => ({
            ...prevState,
            [name]: updatedTagItems
        }))
    }


    function getDispayText(key) {
        const { value = '' } = initialSelections.find(x => x.name == key) || '';
        return value;
    }

    return (
        <>
            {loading && <Loader />}

            <WhiteModalWrapper width="border-none text-black" className="items-start">
                <ModalTitle title="[江別]radio設定" className="text-blue-100 text-xl" />

                <Formik enableReinitialize={true} initialValues={formData}>
                    <div className='relative w-full h-full'>
                        <Form onChange={handleOnchange}>
                            <div className="body-height3 pt-12 px-10 min-h-[calc(100vh-452px)] !p-0">
                                <div className="flex flex-col py-10">
                                    <InputContainer>
                                        <SelectBox
                                            label="対象フィールド"
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
                                            <div className="w-1/5 pr-2">
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
                                            </div>
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
                                                        {initialSelections.map(x => <option key={x.id} value={x.name}>{x.value}</option>)}
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
                                            <div className="w-1/5 px-2">
                                                <InputContainer>
                                                    <TextBox
                                                        label="エラー時テキスト"
                                                        name="errorText"
                                                        labelClassName='text-blue-100 text-xs'
                                                        inputClassName='bg-blue-25'
                                                        value={formData.errorText}
                                                        onChange={handleOnchange}
                                                        placeholder="エラー時テキスト"
                                                    />
                                                </InputContainer>
                                            </div>
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
                                            value={_.map(formData.unchangeables, 'id')}
                                            displayExpr="value"
                                            valueExpr="id"
                                            onSelectionChanged={(e) => handleOnChangeTags(e, 'unchangeables')}
                                            noDataText="データがありません"
                                            selectAllText="すべて選択する"
                                            placeholder="選択変更不可アイテムを選択してください"
                                        />
                                    </InputContainer>

                                    <div>
                                        <label className="text-blue-100 text-xs">画面表示文言</label>
                                        <div className="px-8 mt-2">
                                            <InputContainer>
                                                <TextBox
                                                    label={`管理名：${getDispayText('trueText')}`}
                                                    name="trueText"
                                                    labelClassName='text-blue-100 text-xs'
                                                    inputClassName='bg-blue-25'
                                                    value={formData.trueText}
                                                    onChange={handleOnchange}
                                                    placeholder="管理名"
                                                />
                                            </InputContainer>
                                            <InputContainer>
                                                <TextBox
                                                    label={`管理名：${getDispayText('falseText')}`}
                                                    name="falseText"
                                                    labelClassName='text-blue-100 text-xs'
                                                    inputClassName='bg-blue-25'
                                                    value={formData.falseText}
                                                    onChange={handleOnchange}
                                                    placeholder="管理名"
                                                />
                                            </InputContainer>
                                        </div>
                                    </div>

                                    <InputContainer className='mt-8'>
                                        <TextBox
                                            label="blockWrapカスタムクラス"
                                            name="blockWrapCustomClass"
                                            labelClassName='text-blue-100 text-xs'
                                            inputClassName='bg-blue-25'
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
            </WhiteModalWrapper >
        </>
    )
}