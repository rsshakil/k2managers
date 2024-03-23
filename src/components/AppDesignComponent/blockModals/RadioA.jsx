import { Form, Formik } from 'formik';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

import ArrayStore from 'devextreme/data/array_store';
import { getFieldList } from '../../../services/appDesignerService';
import { valueFormatCheck } from '../../../utilities/commonFunctions';
import Note from '../../Form/FormInputs/Note';
import SelectBox from '../../Form/FormInputs/SelectBox';
import TextBox from '../../Form/FormInputs/TextBox';
import Loader from '../../Loading/Loader';
import ModalTitle from '../../Modal/components/ModalTitle';
import WhiteModalWrapper from '../../Modal/components/WhiteModalWrapper';
import InputContainer from '../../Wrapper/InputContainer';
import BlockModalFooter from './BlockModalFooter';

const placeholderItem = {
    fieldId: '',
    fieldName: 'フィールドを選択してください',
    fieldStyle: {
        caption: 'フィールドを選択してください',
    },
};

export default function RadioA({ blockData, setModalOpen = () => {}, handleOnPressSave = () => {}, uniqueError = {} }) {
    const [formData, setFormData] = useState(blockData);
    const [fieldList, setFieldList] = useState([]);
    const [_selectedFieldStyles, setSelectedFieldStyles] = useState([]);
    const [initialSelections, setInitialSelections] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getFieldListInit() {
            try {
                setLoading(true);
                const projectId = window.sessionStorage.getItem('currentProjectId');

                const { data, status } = await getFieldList(4, projectId);
                if (status == 200) {
                    let { records = [] } = data || [];
                    setFieldList([placeholderItem, ...records]);

                    const selectedFie = formData.fieldId ? records.find((x) => x.fieldId === +formData.fieldId) : '';
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
        ];

        let unchangeablesArrays = [];
        let updatedTrueText = '';
        let updatedFalseText = '';

        if (field.fieldId !== +formData.fieldId) {
        } else {
            if (formData.unchangeables.length > 0) {
                unchangeablesArrays = formData.unchangeables;

                items.map((x) => {
                    var foundIndex = formData.unchangeables.findIndex((y) => y.name == x.name);
                    if (foundIndex >= 0) {
                        x.id = formData.unchangeables[foundIndex].id;
                    }
                    return x;
                });
            }

            updatedTrueText = formData.trueText;
            updatedFalseText = formData.falseText;
        }

        setSelectedFieldStyles(
            new ArrayStore({
                data: items,
                key: 'id',
            })
        );

        setInitialSelections(items);

        setFormData((prevState) => ({
            ...prevState,
            fieldId: field.fieldId,
            fieldCode: field.fieldCode,
            unchangeables: unchangeablesArrays,
            trueText: updatedTrueText,
            falseText: updatedFalseText,
        }));
    }

    function handleOnchange(e) {
        const name = e.target.name;
        let value = valueFormatCheck(e.target.value);

        if (name === 'fieldId') {
            const newSselectedField = fieldList.find((x) => x.fieldId === +value);
            handleOnChangeField(newSselectedField);
        }

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    function getDispayText(key) {
        const { value = '' } = initialSelections.find((x) => x.name == key) || '';
        return value;
    }

    return (
        <>
            {loading && <Loader />}

            <WhiteModalWrapper width="border-none text-black" className="items-start">
                <ModalTitle title="入力フォームinputRadioA設定" className="text-blue-100 text-xl" />

                <Formik enableReinitialize={true} initialValues={formData}>
                    <div className="relative w-full h-full">
                        <Form onChange={handleOnchange}>
                            <div className="body-height3 pt-12 px-10 min-h-[calc(100vh-452px)] !p-0">
                                <div className="flex flex-col py-10">
                                    <InputContainer>
                                        <SelectBox
                                            label="対象フィールド（[個]予約カテゴリーIDと[個]施設IDを選択すると予期せぬ挙動となることがあります）"
                                            name="fieldId"
                                            labelClassName="text-blue-100 text-xs"
                                            inputClassName="bg-blue-25"
                                            value={formData.fieldId}
                                            onChange={handleOnchange}
                                        >
                                            {fieldList.map((x) => (
                                                <option key={x.fieldId} value={x.fieldId}>
                                                    {x.fieldName}
                                                </option>
                                            ))}
                                        </SelectBox>
                                    </InputContainer>

                                    <InputContainer>
                                        <TextBox
                                            label="ラベル"
                                            name="label"
                                            labelClassName="text-blue-100 text-xs"
                                            inputClassName="bg-blue-25"
                                            value={formData.label}
                                            onChange={handleOnchange}
                                            placeholder="ラベル"
                                        />
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
                                                        label="必須表示"
                                                        name="requiredDisplay"
                                                        labelClassName="text-blue-100 text-xs"
                                                        inputClassName="bg-blue-25"
                                                        value={formData.requiredDisplay}
                                                        onChange={handleOnchange}
                                                    >
                                                        <option value={false}>非表示</option>
                                                        <option value={true}>表示</option>
                                                    </SelectBox>
                                                </InputContainer>
                                            </div>
                                            <div className="w-1/5 px-2">
                                                <InputContainer>
                                                    <SelectBox
                                                        label="readonly"
                                                        name="readOnly"
                                                        labelClassName="text-blue-100 text-xs"
                                                        inputClassName="bg-blue-25"
                                                        value={formData.readOnly}
                                                        onChange={handleOnchange}
                                                    >
                                                        <option value={false}>書き込み可</option>
                                                        <option value={true}>書き込み不可</option>
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
                                                        {initialSelections.map((x) => (
                                                            <option key={x.id} value={x.name}>
                                                                {x.value}
                                                            </option>
                                                        ))}
                                                    </SelectBox>
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
                                        <InputContainer>
                                            <TextBox
                                                label="必須エラー時テキスト"
                                                name="requiredErrorText"
                                                labelClassName="text-blue-100 text-xs"
                                                inputClassName="bg-blue-25"
                                                value={formData.requiredErrorText}
                                                onChange={handleOnchange}
                                                placeholder="必須エラー時テキスト"
                                            />
                                        </InputContainer>
                                    </div>

                                    <div>
                                        <label className="text-blue-100 text-xs">画面表示文言</label>
                                        <div className="px-8 mt-2">
                                            <InputContainer>
                                                <TextBox
                                                    label={`管理名：${getDispayText('trueText')}`}
                                                    name="trueText"
                                                    labelClassName="text-blue-100 text-xs"
                                                    inputClassName="bg-blue-25"
                                                    value={formData.trueText}
                                                    onChange={handleOnchange}
                                                    placeholder="管理名"
                                                />
                                            </InputContainer>
                                            <InputContainer>
                                                <TextBox
                                                    label={`管理名：${getDispayText('falseText')}`}
                                                    name="falseText"
                                                    labelClassName="text-blue-100 text-xs"
                                                    inputClassName="bg-blue-25"
                                                    value={formData.falseText}
                                                    onChange={handleOnchange}
                                                    placeholder="管理名"
                                                />
                                            </InputContainer>
                                        </div>
                                    </div>

                                    <InputContainer className="mt-8">
                                        <Note
                                            label="blockWrapカスタムクラス"
                                            name="blockWrapCustomClass"
                                            labelClassName="text-blue-100 text-xs"
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
