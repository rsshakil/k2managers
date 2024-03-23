import { Form, Formik } from 'formik';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { TagBox } from 'devextreme-react/tag-box';
import ArrayStore from 'devextreme/data/array_store';
import { getFieldList } from '../../../services/appDesignerService';
import { valueFormatCheck, twoArrayHaveSameItem } from '../../../utilities/commonFunctions';
import Note from '../../Form/FormInputs/Note';
import SelectBox from '../../Form/FormInputs/SelectBox';
import TextBox from '../../Form/FormInputs/TextBox';
import Loader from '../../Loading/Loader';
import ModalTitle from '../../Modal/components/ModalTitle';
import WhiteModalWrapper from '../../Modal/components/WhiteModalWrapper';
import InputContainer from '../../Wrapper/InputContainer';
import BlockModalFooter from './BlockModalFooter';
import { errorMessages } from '../../../lib/errorMessages';


const placeholderItem = {
    fieldId: '',
    fieldName: 'フィールドを選択してください',
    fieldStyle: {
        caption: 'フィールドを選択してください',
    },
};
export default function OptionSelect({
    blockData,
    setModalOpen = () => { },
    handleOnPressSave = () => { },
    uniqueError = {},
}) {
    const [formData, setFormData] = useState(blockData);
    const [fieldList, setFieldList] = useState([]);
    const [selectedArea1FieldStyles, setSelectedArea1FieldStyles] = useState([]);
    const [selectedArea2FieldStyles, setSelectedArea2FieldStyles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [initialSelectionError, setInitialSelectionError] = useState('');
    let MaxlengthList = Array.from({ length: 100 }, (_, i) => i);

    useEffect(() => {
        async function getFieldListInit() {
            try {
                setLoading(true);
                const projectId = window.sessionStorage.getItem('currentProjectId');

                const { data, status } = await getFieldList('3,4', projectId);
                if (status == 200) {
                    let { records = [] } = data || [];
                    setFieldList([placeholderItem, ...records]);

                    const selectedArea1Field = formData.area1FieldId
                        ? records.find((x) => x.fieldId === +formData.area1FieldId)
                        : records[0].area1FieldId;
                    handleOnChangeField(selectedArea1Field, 1);

                    if (formData.areaNumberQuantity == 2) {
                        const selectedArea2Field = formData.area2FieldId
                            ? records.find((x) => x.fieldId === +formData.area2FieldId)
                            : records[0].area2FieldId;
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
                const { inputBox2 = {}, fieldListCode = '' } = x;

                return { ...inputBox2, fieldCode: fieldListCode };
            });
        } else if (fieldType === 4) {
            //boolean type
            let { trueText = '', falseText = '', dataType = 'boolean' } = field?.fieldStyle;

            items = [
                { id: uuid(), type: dataType, name: 'trueText', value: trueText, fieldCode: 1 },
                { id: uuid(), type: dataType, name: 'falseText', value: falseText, fieldCode: 0 },
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
                // setDefaultUnchangeableSelections(_.map(formData.unchangeables, 'id'));

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
        }
        else if (name === 'area1FieldId' || name === 'area2FieldId') {
            const newSselectedField = fieldList.find((x) => x.fieldId === +value);
            handleOnChangeField(newSselectedField, areaNo);

            //After change field reset prev selected option from prev selected field
            if (formData[`area${areaNo}Selected`]?.length > 0) {
                setFormData((prevState) => ({
                    ...prevState,
                    [`area${areaNo}Selected`]: [],
                }));
            }

            if (formData[`area${areaNo}Unselectable`]?.length > 0) {
                setFormData((prevState) => ({
                    ...prevState,
                    [`area${areaNo}Unselectable`]: [],
                }));
            }
        }
        else if (name === 'areaNumberQuantity' && +value === 1) {
            setFormData((prevState) => ({
                ...prevState,
                area2FieldId: '',
                area2FieldCode: '',
                area2Label: '',
                area2ErrorText: '',
                area2BlankInitialValue: '',
                area2Name: '',
                area2Selected: [],
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
            updatedTagItems = updatedTagItems.filter((x) => !removedItems.filter((y) => y.fieldCode === x.fieldCode).length);
        }

        updatedTagItems = _.uniqBy(updatedTagItems, 'fieldCode');

        setFormData((prevState) => ({
            ...prevState,
            [name]: updatedTagItems,
        }));
    }


    const handleOnClickSubmit = (e) => {
        e.preventDefault();
        setInitialSelectionError('');

        const {
            area1Selected = [],
            area1Unselectable = [],
            area2Selected = [],
            area2Unselectable = [],
            area1DisplayTexts = [],
            area2DisplayTexts = []
        } = formData || {};


        //Duplicate item selection error checking
        if (area1Selected.length > 0 && area1Unselectable.length > 0) {
            const result = twoArrayHaveSameItem(area1Selected, area1Unselectable);

            if (result) {
                setInitialSelectionError(errorMessages['E_DUPLICATE']);
                return null;
            }
        }

        if (area2Selected.length > 0 && area2Unselectable.length > 0) {
            const result = twoArrayHaveSameItem(area2Selected, area2Unselectable);

            if (result) {
                setInitialSelectionError(errorMessages['E_DUPLICATE']);
                return null;
            }
        }

        console.log('my form data ', formData)

        //All unselected item selection error cehcking
        if (area1Unselectable.length > 0 && area1DisplayTexts.length > 0 && (area1Unselectable.length == area1DisplayTexts.length)) {
            setInitialSelectionError(errorMessages['E_ALL_UNSELECTED']);
            return null;
        }

        if (area2Unselectable.length > 0 && area2DisplayTexts.length > 0 && (area2Unselectable.length == area2DisplayTexts.length)) {
            setInitialSelectionError(errorMessages['E_ALL_UNSELECTED']);
            return null;
        }

        handleOnPressSave(e, formData);
    }



    console.log('my form is ss', formData)


    const selectSettingElement = (areaNo = 0) => {
        console.log('my form is ssttt', _.map(formData[`area${areaNo}Selected`], 'id'))

        return (
            <React.Fragment key={areaNo}>
                <p className="text-blue-100">選択エリア{areaNo}</p>
                <div className="px-8 mt-2">
                    <InputContainer>
                        <SelectBox
                            label="対象フィールド（[個]予約カテゴリーIDと[個]施設IDを選択すると予期せぬ挙動となることがあります）"
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

                    <InputContainer>
                        <TextBox
                            label={`ラベル`}
                            name={`area${areaNo}Label`}
                            labelClassName="text-blue-100"
                            inputClassName="bg-blue-25"
                            value={formData[`area${areaNo}Label`]}
                            onChange={handleOnchange}
                            placeholder="ラベル"
                        />
                    </InputContainer>

                    <div className="flex">
                        <div className="w-1/5 pr-2">
                            <InputContainer>
                                <SelectBox
                                    label="最低選択個数（1以上で必須表示）"
                                    name={`area${areaNo}MinQuantity`}
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    value={formData[`area${areaNo}MinQuantity`]}
                                    onChange={handleOnchange}
                                >
                                    {MaxlengthList.map((n, i) => (
                                        <option key={n} value={n}>
                                            {n}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                        <div className="w-1/5 px-2">
                            <InputContainer>
                                <SelectBox
                                    label="最大選択個数（yesno型の場合無効です）"
                                    name={`area${areaNo}MaxQuantity`}
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    value={formData[`area${areaNo}MaxQuantity`]}
                                    onChange={handleOnchange}
                                >
                                    {MaxlengthList.map((n, i) => (
                                        <option key={n} value={n}>
                                            {n}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                        <div className="w-1/5 px-2">
                            <InputContainer>
                                <TextBox
                                    label="name属性"
                                    name={`area${areaNo}Name`}
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    value={formData[`area${areaNo}Name`]}
                                    onChange={handleOnchange}
                                    placeholder="name属性"
                                    isRequired
                                />
                            </InputContainer>
                        </div>
                        <div className="w-1/5 px-2">
                            <InputContainer>
                                <TextBox
                                    label="最低選択個数エラーテキスト"
                                    name={`area${areaNo}ErrorText`}
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    value={formData[`area${areaNo}ErrorText`]}
                                    onChange={handleOnchange}
                                    placeholder="最低選択個数エラーテキスト"
                                />
                            </InputContainer>
                        </div>
                        <div className="w-1/5 pl-2">
                            <InputContainer>
                                <SelectBox
                                    label="size属性（１以外でスクロール式）"
                                    name={`area${areaNo}Size`}
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    value={formData[`area${areaNo}Size`]}
                                    onChange={handleOnchange}
                                >
                                    {MaxlengthList.map((n, i) => (
                                        <option key={n} value={n}>
                                            {n}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                    </div>

                    <div className="text-right mt-[-16px] text-red-400">
                        <p>※複数の選択ができるのはSIZE属性が1以外のスクロール式だけです</p>
                    </div>

                    <InputContainer>
                        <Note
                            label="ラベルカスタムクラス"
                            name={`area${areaNo}LabelCustomClass`}
                            labelClassName="text-blue-100 text-xs"
                            inputClassName="bg-blue-25 !p-1"
                            height="h-8"
                            value={formData[`area${areaNo}LabelCustomClass`]}
                            onChange={handleOnchange}
                            placeholder="カスタムClass"
                        />
                    </InputContainer>

                    <InputContainer>
                        <Note
                            label="selectカスタムクラス"
                            name={`area${areaNo}SelectCustomClass`}
                            labelClassName="text-blue-100 text-xs"
                            inputClassName="bg-blue-25 !p-1"
                            height="h-8"
                            value={formData[`area${areaNo}SelectCustomClass`]}
                            onChange={handleOnchange}
                            placeholder="カスタムClass"
                        />
                    </InputContainer>

                    <InputContainer>
                        <Note
                            label="エラーテキストカスタムクラス"
                            name={`area${areaNo}ErrorTextCustomClass`}
                            labelClassName="text-blue-100 text-xs"
                            inputClassName="bg-blue-25 !p-1"
                            height="h-8"
                            value={formData[`area${areaNo}ErrorTextCustomClass`]}
                            onChange={handleOnchange}
                            placeholder="カスタムClass"
                        />
                    </InputContainer>

                    <InputContainer>
                        <Note
                            label="areaWrapカスタムクラス"
                            name={`area${areaNo}WrapCustomClass`}
                            labelClassName="text-blue-100 text-xs"
                            inputClassName="bg-blue-25 !p-1"
                            height="h-8"
                            value={formData[`area${areaNo}WrapCustomClass`]}
                            onChange={handleOnchange}
                            placeholder="カスタムClass"
                        />
                    </InputContainer>

                    <InputContainer>
                        <TextBox
                            label="選択不可な初期文言"
                            name={`area${areaNo}NoValueOption`}
                            labelClassName="text-blue-100 text-xs"
                            inputClassName="bg-blue-25"
                            value={formData[`area${areaNo}NoValueOption`]}
                            onChange={handleOnchange}
                            placeholder="選択不可な初期文言"
                        />
                    </InputContainer>

                    <InputContainer>
                        <label className="text-blue-100 text-xs">
                            初期選択アイテム（選択不可な初期文言より優先されます。SIZE属性より多い場合左から優先して初期値に採用されます）
                        </label>

                        <TagBox
                            name={`area${areaNo}Selected`}
                            dataSource={areaNo === 1 ? selectedArea1FieldStyles : selectedArea2FieldStyles}
                            value={!loading ? _.map(formData[`area${areaNo}Selected`], 'fieldCode') : []}
                            displayExpr="value"
                            valueExpr="fieldCode"
                            onSelectionChanged={(e) => handleOnChangeTags(e, `area${areaNo}Selected`)}
                            noDataText="データがありません"
                            selectAllText="すべて選択する"
                            placeholder="初期選択アイテム（選択不可な初期文言より優先されます）"
                        />
                    </InputContainer>

                    <InputContainer>
                        <label className="text-blue-100 text-xs">選択不可アイテム</label>
                        <TagBox
                            name={`area${areaNo}Unselectable`}
                            dataSource={areaNo === 1 ? selectedArea1FieldStyles : selectedArea2FieldStyles}
                            value={!loading ? _.map(formData[`area${areaNo}Unselectable`], 'fieldCode') : []}
                            displayExpr="value"
                            valueExpr="fieldCode"
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
                <ModalTitle title="入力フォームselect設定" className="text-blue-100 text-xl" />

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
                                errors={{ itemSelectionError: initialSelectionError, ...uniqueError }}
                                setModalOpen={() => setModalOpen(false)}
                                handleOnPressSave={handleOnClickSubmit}
                            />
                        </Form>
                    </div>
                </Formik>
            </WhiteModalWrapper>
        </>
    );
}
