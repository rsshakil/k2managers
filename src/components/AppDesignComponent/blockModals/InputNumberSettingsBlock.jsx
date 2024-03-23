import { Form, Formik } from 'formik';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';

import { autoComplete } from '../../../lib/tailwindClassAttributes';
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

export default function InputNumberSettingsBlock({
    blockData,
    setModalOpen = () => {},
    handleOnPressSave = () => {},
    uniqueError = {},
}) {
    const [formData, setFormData] = useState(blockData);
    const [filterList, setFilterList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getFilterListInit() {
            try {
                setLoading(true);
                const projectId = window.sessionStorage.getItem('currentProjectId');

                const { data, status } = await getFieldList(7, projectId);
                if (status == 200) {
                    let { records = [] } = data || [];
                    setFilterList([placeholderItem, ...records]);
                }
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        }

        getFilterListInit();
    }, []);

    function handleOnchange(e) {
        const name = e.target.name;
        const value = valueFormatCheck(e.target.value);

        let fieldName = 'fieldCode';
        let fieldCode = '';
        if (e.target.name === 'area1FieldId') {
            // フィールドコードを取得
            const findField = filterList.find((x) => x.fieldId === +value);
            fieldName = 'area1FieldCode';
            fieldCode = findField.fieldCode;
        } else if (e.target.name === 'area2FieldId') {
            // フィールドコードを取得
            const findField = filterList.find((x) => x.fieldId === +value);
            fieldName = 'area2FieldCode';
            fieldCode = findField.fieldCode;
        } else if (e.target.name === 'area3FieldId') {
            // フィールドコードを取得
            const findField = filterList.find((x) => x.fieldId === +value);
            fieldName = 'area3FieldCode';
            fieldCode = findField.fieldCode;
        }

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
            [fieldName]: fieldCode,
        }));
    }

    const inputNumberElement = (number = 1) => {
        return (
            <React.Fragment key={number}>
                <label htmlFor="headerAreaShadow" className="text-blue-100 !mb-8 !mt-8">
                    エリア{number}
                </label>
                <div className="px-8 pb-4">
                    <InputContainer>
                        <SelectBox
                            label="対象フィールド "
                            name={`area${number}FieldId`}
                            labelClassName="text-blue-100"
                            inputClassName="bg-blue-25"
                            value={formData[`area${number}FieldId`]}
                            onChange={handleOnchange}
                        >
                            {filterList.map((x) => (
                                <option key={x.fieldId} value={x.fieldId}>
                                    {x.fieldName}
                                </option>
                            ))}
                        </SelectBox>
                    </InputContainer>

                    <InputContainer>
                        <TextBox
                            label="ラベル"
                            name={`area${number}label`}
                            labelClassName="text-blue-100"
                            inputClassName="bg-blue-25"
                            value={formData[`area${number}label`]}
                            onChange={handleOnchange}
                            placeholder="ラベル"
                        />
                    </InputContainer>

                    <InputContainer>
                        <SelectBox
                            label="ステッパー "
                            name={`area${number}lSteper`}
                            labelClassName="text-blue-100"
                            inputClassName="bg-blue-25"
                            value={formData[`area${number}lSteper`]}
                            onChange={handleOnchange}
                        >
                            <option value="1">表示</option>
                            <option value="2">表示しない</option>
                        </SelectBox>
                    </InputContainer>

                    <div className="flex">
                        <div className="w-1/5 pr-2">
                            <InputContainer>
                                <SelectBox
                                    label="必須"
                                    name={`area${number}Required`}
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    value={formData[`area${number}Required`]}
                                    onChange={handleOnchange}
                                >
                                    <option value={false}>任意</option>
                                    <option value={true}>必須</option>
                                </SelectBox>
                            </InputContainer>
                        </div>

                        <div className="w-1/5 px-2">
                            <InputContainer>
                                <TextBox
                                    type="number"
                                    label="value（初期値）"
                                    name={`area${number}value`}
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    value={formData[`area${number}value`]}
                                    onChange={handleOnchange}
                                    placeholder="value"
                                />
                            </InputContainer>
                        </div>

                        <div className="w-1/5 px-2">
                            <InputContainer>
                                <TextBox
                                    type="number"
                                    label="min(最小値)"
                                    name={`area${number}minValue`}
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    value={formData[`area${number}minValue`]}
                                    onChange={handleOnchange}
                                    placeholder="min"
                                />
                            </InputContainer>
                        </div>

                        <div className="w-1/5 px-2">
                            <InputContainer>
                                <TextBox
                                    type="number"
                                    label="max(最大時値)"
                                    name={`area${number}maxValue`}
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    value={formData[`area${number}maxValue`]}
                                    onChange={handleOnchange}
                                    placeholder="max"
                                />
                            </InputContainer>
                        </div>

                        <div className="w-1/5 pl-2">
                            <InputContainer>
                                <TextBox
                                    type="number"
                                    label="ステップ値"
                                    name={`area${number}step`}
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    value={formData[`area${number}step`]}
                                    onChange={handleOnchange}
                                    placeholder="ステップ値"
                                />
                            </InputContainer>
                        </div>
                    </div>

                    <div className="flex">
                        <div className="w-1/5 pr-2">
                            <InputContainer>
                                <SelectBox
                                    label="readonly"
                                    name={`area${number}ReadOnly`}
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    value={formData[`area${number}ReadOnly`]}
                                    onChange={handleOnchange}
                                >
                                    <option value={false}>書き込み可</option>
                                    <option value={true}>書き込み不可</option>
                                </SelectBox>
                            </InputContainer>
                        </div>

                        <div className="w-1/5 px-2">
                            <InputContainer>
                                <TextBox
                                    label="placeholder"
                                    name={`area${number}Placeholder`}
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    value={formData[`area${number}Placeholder`]}
                                    onChange={handleOnchange}
                                    placeholder="placeholder"
                                />
                            </InputContainer>
                        </div>
                        <div className="w-1/5 px-2">
                            <InputContainer>
                                <TextBox
                                    label="name属性"
                                    name={`area${number}Name`}
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    value={formData[`area${number}Name`]}
                                    onChange={handleOnchange}
                                    placeholder="name属性"
                                    isRequired
                                />
                            </InputContainer>
                        </div>

                        <div className="w-1/5 pl-2">
                            <InputContainer>
                                <SelectBox
                                    label="autocomplete属性"
                                    name={`area${number}AutoComplete`}
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    value={formData[`area${number}AutoComplete`]}
                                    onChange={handleOnchange}
                                    placeholder="autocomplete属性"
                                >
                                    {autoComplete.map((field, index) => (
                                        <option key={field.value + '_' + index} value={field.value}>
                                            {' '}
                                            {field.caption}{' '}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                    </div>

                    <div className="flex">
                        <div className="w-1/5 pr-2">
                            <InputContainer>
                                <TextBox
                                    label="必須エラー時テキスト"
                                    name={`area${number}RequiredErrorText`}
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    placeholder="必須エラー時テキスト"
                                />
                            </InputContainer>
                        </div>
                        <div className="w-1/5 px-2">
                            <InputContainer>
                                <TextBox
                                    label="最小値エラー時テキスト"
                                    name={`area${number}MinlengthErrorText`}
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    placeholder="最小値エラー時テキスト"
                                />
                            </InputContainer>
                        </div>
                        <div className="w-1/5 px-2">
                            <InputContainer>
                                <TextBox
                                    label="最大値エラー時テキスト"
                                    name={`area${number}MaxlengthErrorText`}
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    placeholder="最大値エラー時テキスト"
                                />
                            </InputContainer>
                        </div>
                        <div className="w-1/5 px-2">
                            <InputContainer>
                                <TextBox
                                    label="ステップエラー時テキスト"
                                    name={`area${number}StepErrorText`}
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    placeholder="ステップエラー時テキスト"
                                />
                            </InputContainer>
                        </div>
                    </div>

                    <div className="mt-10">
                        <InputContainer>
                            <Note
                                label="ラベルカスタムクラス"
                                name={`area${number}LabelCustomClass`}
                                labelClassName="text-blue-100"
                                inputClassName="bg-blue-25 !p-1"
                                height="h-8"
                                placeholder="カスタムClass"
                            />
                        </InputContainer>
                        <InputContainer>
                            <Note
                                label="inputTextカスタムクラス"
                                name={`area${number}InputCustomClass`}
                                labelClassName="text-blue-100"
                                inputClassName="bg-blue-25 !p-1"
                                height="h-8"
                                placeholder="カスタムClass"
                            />
                        </InputContainer>
                        <InputContainer>
                            <Note
                                label="placeholderカスタムクラス"
                                name={`area${number}PlaceholderCustomClass`}
                                labelClassName="text-blue-100"
                                inputClassName="bg-blue-25 !p-1"
                                height="h-8"
                                placeholder="カスタムClass"
                            />
                        </InputContainer>
                        <InputContainer>
                            <Note
                                label="エラーテキストカスタムクラス"
                                name={`area${number}ErrorTextCustomClass`}
                                labelClassName="text-blue-100"
                                inputClassName="bg-blue-25 !p-1"
                                height="h-8"
                                placeholder="カスタムClass"
                            />
                        </InputContainer>
                        <InputContainer>
                            <Note
                                label={`エリア${number}Wrapカスタムクラス`}
                                name={`area${number}WrapCustomClass`}
                                labelClassName="text-blue-100"
                                inputClassName="bg-blue-25 !p-1"
                                height="h-8"
                                value={formData[`area${number}WrapCustomClass`]}
                                onChange={handleOnchange}
                                placeholder={`エリア${number}Wrapカスタムクラス`}
                            />
                        </InputContainer>
                    </div>
                </div>
            </React.Fragment>
        );
    };

    return (
        <>
            {loading && <Loader />}

            <WhiteModalWrapper width="border-none text-black" className="items-start">
                <ModalTitle title="入力フォームinputNumber設定" className="text-blue-100 text-xl" />

                <Formik enableReinitialize={true} initialValues={formData}>
                    <div className="relative w-full h-full">
                        <Form onChange={handleOnchange}>
                            <div className="body-height3 pt-12 px-10 min-h-[calc(100vh-452px)] !p-0">
                                <div className="flex flex-col py-10">
                                    <InputContainer>
                                        <SelectBox
                                            label="横並び配置エリア数"
                                            name="inputNumberQuantity"
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25"
                                            value={formData.inputNumberQuantity}
                                            onChange={handleOnchange}
                                        >
                                            <option value={1}>1個</option>
                                            <option value={2}>2個</option>
                                        </SelectBox>
                                    </InputContainer>

                                    {_.range(formData.inputNumberQuantity).map((x) => inputNumberElement(x + 1))}

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
