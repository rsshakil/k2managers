//--------added 6th feb,23, no need anymore-------
//Ebetsu Version
import { Form, Formik } from 'formik';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { TagBox } from 'devextreme-react/tag-box';
import ArrayStore from 'devextreme/data/array_store';
import { getFieldList } from '../../../services/appDesignerService';
import { valueFormatCheck } from '../../../utilities/commonFunctions';
import SelectBox from '../../Form/FormInputs/SelectBox';
import TextBox from '../../Form/FormInputs/TextBox';
import Loader from '../../Loading/Loader';
import ModalTitle from '../../Modal/components/ModalTitle';
import WhiteModalWrapper from '../../Modal/components/WhiteModalWrapper';
import InputContainer from '../../Wrapper/InputContainer';
import BlockModalFooter from './BlockModalFooter';

export default function SelectSettingsBlockForm({
    blockData,
    setModalOpen = () => {},
    handleOnPressSave = () => {},
    uniqueError = {},
}) {
    const [formData, setFormData] = useState(blockData);
    const [fieldList, setFieldList] = useState([]);
    const [selectedArea1FieldStyles, setSelectedArea1FieldStyles] = useState([]);
    const [selectedArea2FieldStyles, setSelectedArea2FieldStyles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getFieldListInit() {
            try {
                setLoading(true);
                const projectId = window.sessionStorage.getItem('currentProjectId');

                const { data, status } = await getFieldList('3,4', projectId);
                if (status == 200) {
                    let { records = [] } = data || [];
                    setFieldList(records);

                    const selectedArea1Field = formData.area1FieldId
                        ? records.find((x) => x.fieldId === +formData.area1FieldId)
                        : records[0];
                    handleOnChangeField(selectedArea1Field, 1);

                    if (formData.areaNumberQuantity == 2) {
                        const selectedArea2Field = formData.area2FieldId
                            ? records.find((x) => x.fieldId === +formData.area2FieldId)
                            : records[0];
                        handleOnChangeField(selectedArea2Field, 2);
                    }
                }

                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        }

        getFieldListInit();
    }, []);

    function handleOnChangeField(field, areaNo = 0) {
        const { fieldStyle = '', fieldType = 0 } = field;
        const { lookup = [] } = fieldStyle || '';

        let items = [];
        if (fieldType === 3) {
            //textbox type
            items = lookup.map((x) => {
                const { inputBox2 = '' } = x;
                return inputBox2;
            });
        } else if (fieldType === 4) {
            //boolean type
            let { trueText = '', falseText = '', dataType = 'boolean' } = field?.fieldStyle;

            items = [
                { id: uuid(), type: dataType, name: 'trueText', value: trueText },
                { id: uuid(), type: dataType, name: 'falseText', value: falseText },
            ];
        }

        let area1UnchangeablesArrays = [];
        let area1DisplayTextsArray = [];
        let area2UnchangeablesArrays = [];
        let area2DisplayTextsArray = [];

        if (areaNo === 1) {
            if (field.fieldId !== +formData.area1FieldId) {
                area1DisplayTextsArray = items.map((x) => {
                    return x.newValue ? x : { ...x, newValue: '' };
                });
            } else {
                area1DisplayTextsArray = formData.area1DisplayTexts;

                if (formData.area1Unselectable.length > 0) {
                    area1UnchangeablesArrays = formData.area1Unselectable;
                }

                if (fieldType === 4) {
                    items.map((x) => {
                        let foundIndex = area1UnchangeablesArrays.findIndex((y) => y.name == x.name);
                        if (foundIndex >= 0) {
                            x.id = formData.area1Unselectable[foundIndex].id;
                        }
                        return x;
                    });
                }
            }

            setSelectedArea1FieldStyles(
                new ArrayStore({
                    data: items,
                    key: 'id',
                })
            );

            setFormData((prevState) => ({
                ...prevState,
                area1FieldId: field.fieldId,
                area1FieldCode: field.fieldCode,
                area1Unselectable: area1UnchangeablesArrays,
                area1DisplayTexts: area1DisplayTextsArray,
            }));
        } else if (areaNo === 2) {
            if (field.fieldId !== +formData.area2FieldId) {
                area2DisplayTextsArray = items.map((x) => {
                    return x.newValue ? x : { ...x, newValue: '' };
                });
            } else {
                area2DisplayTextsArray = formData.area2DisplayTexts;

                if (formData.area2Unselectable.length > 0) {
                    area2UnchangeablesArrays = formData.area2Unselectable;
                }

                if (fieldType === 4) {
                    items.map((x) => {
                        let foundIndex = area2UnchangeablesArrays.findIndex((y) => y.name == x.name);
                        if (foundIndex >= 0) {
                            x.id = formData.area2Unselectable[foundIndex].id;
                        }
                        return x;
                    });
                }
            }

            setSelectedArea2FieldStyles(
                new ArrayStore({
                    data: items,
                    key: 'id',
                })
            );

            setFormData((prevState) => ({
                ...prevState,
                area2FieldId: field.fieldId,
                area2FieldCode: field.fieldCode,
                area2Unselectable: area2UnchangeablesArrays,
                area2DisplayTexts: area2DisplayTextsArray,
            }));
        }
    }

    function handleOnchange(e, areaNo = 0) {
        const name = e.target.name;
        let value = valueFormatCheck(e.target.value);

        if (name === 'area1DisplayTexts' || name === 'area2DisplayTexts') {
            const selectedItemId = e.target.getAttribute('data-id');

            value = [...formData[name]].map((item) => {
                return item.id == selectedItemId ? { ...item, newValue: value } : item;
            });
        } else if (name === 'area1FieldId' || name === 'area2FieldId') {
            const newSselectedField = fieldList.find((x) => x.fieldId === +value);
            handleOnChangeField(newSselectedField, areaNo);
        } else if (name === 'areaNumberQuantity' && +value === 1) {
            setFormData((prevState) => ({
                ...prevState,
                area2FieldId: '',
                area2FieldCode: '',
                area2Label: '',
                area2ErrorText: '',
                area2Required: false,
                area2BlankInitialValue: '',
                area2name: '',
                area2Selected: '',
                area2WrapCustomClass: '',
                area2Unselectable: [],
                area2DisplayTexts: [],
            }));
            setSelectedArea2FieldStyles([]);
        }

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    function handleOnChangeTags(e, name = '') {
        const { addedItems = [], removedItems = [] } = e;

        let updatedTagItems = formData[name];

        if (addedItems.length > 0) {
            updatedTagItems = [...updatedTagItems, ...addedItems];
        }

        if (removedItems.length > 0) {
            updatedTagItems = updatedTagItems.filter((x) => !removedItems.filter((y) => y.id === x.id).length);
        }

        updatedTagItems = _.uniqBy(updatedTagItems, 'id');

        setFormData((prevState) => ({
            ...prevState,
            [name]: updatedTagItems,
        }));
    }

    const selectSettingElement = (areaNo = 0) => {
        return (
            <React.Fragment key={areaNo}>
                <p className="text-blue-100">選択エリア{areaNo}</p>
                <div className="px-8 mt-2">
                    <InputContainer>
                        <TextBox
                            label="エリアwrapカスタムクラス"
                            name={`area${areaNo}WrapCustomClass`}
                            labelClassName="text-blue-100 text-xs"
                            inputClassName="bg-blue-25"
                            value={formData[`area${areaNo}WrapCustomClass`]}
                            onChange={handleOnchange}
                            placeholder="エリアwrapカスタムクラス"
                        />
                    </InputContainer>
                    <InputContainer>
                        <SelectBox
                            label="対象フィールド"
                            name={`area${areaNo}FieldId`}
                            labelClassName="text-blue-100 text-xs"
                            inputClassName="bg-blue-25"
                            value={formData[`area${areaNo}FieldId`]}
                            onChange={(e) => handleOnchange(e, areaNo)}
                        >
                            {fieldList.map((x) => (
                                <option key={x.fieldId} value={x.fieldId}>
                                    {x.fieldName}
                                </option>
                            ))}
                        </SelectBox>
                    </InputContainer>

                    <div className="flex">
                        <div className="w-1/5 pr-2">
                            <InputContainer>
                                <TextBox
                                    label="エリアラベル"
                                    name={`area${areaNo}Label`}
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    value={formData[`area${areaNo}Label`]}
                                    onChange={handleOnchange}
                                    placeholder="エリアラベル"
                                />
                            </InputContainer>
                        </div>
                        <div className="w-1/5 px-2">
                            <InputContainer>
                                <TextBox
                                    label="エラー時テキスト"
                                    name={`area${areaNo}ErrorText`}
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    value={formData[`area${areaNo}ErrorText`]}
                                    onChange={handleOnchange}
                                    placeholder="エラー時テキスト"
                                />
                            </InputContainer>
                        </div>
                        <div className="w-1/5 px-2">
                            <InputContainer>
                                <SelectBox
                                    label="必須"
                                    name={`area${areaNo}Required`}
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    value={formData[`area${areaNo}Required`]}
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
                                    label="初期選択文言(非選択、設定優先)"
                                    name={`area${areaNo}BlankInitialValue`}
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    value={formData[`area${areaNo}BlankInitialValue`]}
                                    onChange={handleOnchange}
                                    placeholder="初期選択文言"
                                />
                            </InputContainer>
                        </div>
                        <div className="w-1/5 pl-2">
                            <InputContainer>
                                <TextBox
                                    label="name属性"
                                    name={`area${areaNo}name`}
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    value={formData[`area${areaNo}name`]}
                                    onChange={handleOnchange}
                                    placeholder="name属性"
                                    isRequired
                                />
                            </InputContainer>
                        </div>
                    </div>

                    <InputContainer>
                        <SelectBox
                            label="初期選択option（初期選択文言を設定した場合無効になります）"
                            name={`area${areaNo}Selected`}
                            labelClassName="text-blue-100 text-xs"
                            inputClassName="bg-blue-25"
                            value={formData[`area${areaNo}Selected`]}
                            onChange={handleOnchange}
                        >
                            {formData[`area${areaNo}DisplayTexts`].map((x, index) => (
                                <option key={index} value={x.id}>
                                    {x.value}
                                </option>
                            ))}
                        </SelectBox>
                    </InputContainer>

                    <InputContainer>
                        <label className="text-blue-100 text-xs">選択不可アイテム</label>
                        <TagBox
                            name={`area${areaNo}Unselectable`}
                            dataSource={areaNo === 1 ? selectedArea1FieldStyles : selectedArea2FieldStyles}
                            value={_.map(formData[`area${areaNo}Unselectable`], 'id')}
                            displayExpr="value"
                            valueExpr="id"
                            onSelectionChanged={(e) => handleOnChangeTags(e, `area${areaNo}Unselectable`)}
                            noDataText="データがありません"
                            selectAllText="すべて選択する"
                            placeholder="選択不可アイテムを選択してください"
                        />
                    </InputContainer>

                    <div>
                        <label className="text-blue-100 text-xs">画面表示文言</label>
                        <div className="px-8">
                            {formData[`area${areaNo}DisplayTexts`].map((x) => (
                                <InputContainer key={x.id}>
                                    <TextBox
                                        label={`管理名：${x.value}`}
                                        name={`area${areaNo}DisplayTexts`}
                                        labelClassName="text-blue-100 text-xs"
                                        inputClassName="bg-blue-25"
                                        data-id={x.id}
                                        value={x.newValue}
                                        onChange={handleOnchange}
                                        placeholder="管理名"
                                    />
                                </InputContainer>
                            ))}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    };

    return (
        <>
            {loading && <Loader />}
            <WhiteModalWrapper width="border-none text-black" className="items-start">
                <ModalTitle title="[江別]select設定" className="text-blue-100 text-xl" />

                <Formik enableReinitialize={true} initialValues={formData}>
                    <div className="relative w-full h-full">
                        <Form onChange={handleOnchange}>
                            <div className="body-height3 pt-12 px-10 min-h-[calc(100vh-452px)] !p-0">
                                <div className="flex flex-col py-10">
                                    <InputContainer>
                                        <SelectBox
                                            label="横並び配置エリア数"
                                            name="areaNumberQuantity"
                                            labelClassName="text-blue-100 text-xs"
                                            inputClassName="bg-blue-25"
                                            value={formData.areaNumberQuantity}
                                            onChange={handleOnchange}
                                        >
                                            <option value="1">1個</option>
                                            <option value="2">2個</option>
                                        </SelectBox>
                                    </InputContainer>

                                    {_.range(formData.areaNumberQuantity).map((x) => selectSettingElement(x + 1))}

                                    <InputContainer className="mt-8">
                                        <TextBox
                                            label="blockWrapカスタムクラス"
                                            name="blockWrapCustomClass"
                                            labelClassName="text-blue-100 text-xs"
                                            inputClassName="bg-blue-25"
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
