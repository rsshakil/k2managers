import { Formik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from '../controls/UseForm';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import FormFooter from '../Form/FormFooter';
import FieldTextType from '../Form/FormInputs/FieldTextType';
import SelectBox from '../Form/FormInputs/SelectBox';
import TextAreaInput from '../Form/FormInputs/TextAreaInput';
import TextBox from '../Form/FormInputs/TextBox';
import DragApp from '../ListElementDrag/DragApp';
import Page1440Body from '../Page1440/Page1440Body';
import FormBodyContainer from '../Wrapper/FormBodyContainer';
import InputContainer from '../Wrapper/InputContainer';
import DxFilterBuilder from './DxFilterBuilder';

const selectOptions = [
    { id: 0, value: 'テキスト型' },
    { id: 1, value: 'テキストエリア型' },
    { id: 3, value: 'リスト型' },
    { id: 4, value: 'YesNo型' },
    { id: 5, value: '日付型' },
    { id: 6, value: '時間型' },
    { id: 7, value: '数値型' },
];

const conditionOptions = [{ id: 1, value: 'なし' }];

const FilterBuilder = ({ formType, initialValues, setIsOverFlow }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [_continuousAdd, setContinuousAdd] = useState(false);
    const [options] = useState(selectOptions);
    const [show, setShow] = useState(false);
    const [selectShow, setSelectShow] = useState(false);
    const [selectTextType, setSelectTextType] = useState(false);

    // drag app state handle whole things
    const [dragList] = useState([]);
    const [buttonType] = useState({ buttonName: 'リスト追加', type: 'normal' });
    const [controlDragDrop, setDragDrop] = useState({
        dragable: { show: true, space: 'col-span-1' }, //col-span-2
        pen: { show: false, space: 'col-span-1' },
        checkbox1: { show: false, space: 'col-span-1' },
        info: { show: false, space: 'col-span-2' },
        task: { show: false, space: 'col-span-1' },
        checkbox2: { show: false, space: 'col-span-1' },
        inputBox: { show: false, space: 'col-span-2' },
        inputBox2: { show: true, space: 'col-span-10' },
        inputBox3: { show: false, space: 'col-span-10', header: '' },
        trash: { show: true, space: 'col-span-1' },
    });

    const HandleFieldData = (event) => {
        setShow(event.target.value === 'リスト型');
        setSelectShow(event.target.value === '結合テキスト型');
        setSelectTextType(event.target.value === 'テキスト型');
    };
    const handleCancel = () => {
        navigate('/field_list');
    };

    return (
        <>
            <Page1440Body className="page1440-body3 h-[calc(100vh-134px)] p-0">
                <Formik initialValues={initialValues} onSubmit="">
                    <div className="relative w-full h-full">
                        <Form>
                            <div className="-mt-4" id="scroller"></div>
                            <FormBodyContainer>
                                <InputContainer>
                                    <TextBox
                                        label="フィールド名（32文字まで）"
                                        labelClassName="text-blue-100"
                                        inputClassName="bg-blue-25"
                                        name="field_name"
                                        maxLength="32"
                                        type="text"
                                    />
                                </InputContainer>
                                <InputContainer>
                                    <TextBox
                                        label="フィールド説明（改行不可128文字）"
                                        labelClassName="text-blue-100"
                                        inputClassName="bg-blue-25"
                                        name="field_name"
                                        maxLength="128"
                                        type="text"
                                    />
                                </InputContainer>
                                <InputContainer>
                                    <TextAreaInput
                                        label="フィールド説明（改行可512文字）"
                                        labelClassName="text-blue-100"
                                        inputClassName="bg-blue-25 !h-16"
                                        name="field_name"
                                        maxLength="512"
                                        type="text"
                                    />
                                </InputContainer>
                                <InputContainer>
                                    <TextBox
                                        label="フィールドコード（自動生成変更不可）"
                                        labelClassName="text-blue-100"
                                        inputClassName="bg-gray-300 pointer-events-none"
                                        name="field_name"
                                        readOnly
                                        tabIndex="-1"
                                    />
                                </InputContainer>
                                <InputContainer>
                                    <SelectBox
                                        label="フィールドタイプ"
                                        labelClassName="text-blue-100"
                                        inputClassName="bg-blue-25"
                                        name="aaa"
                                        onChange={HandleFieldData}
                                    >
                                        {options.length > 0 &&
                                            options.map((field) => (
                                                <option value={field.value} key={field.id}>
                                                    {field.value}
                                                </option>
                                            ))}
                                    </SelectBox>
                                </InputContainer>
                                {show && (
                                    <div className="mx-8 my-4">
                                        <DragApp
                                            dragList={dragList}
                                            buttonType={buttonType}
                                            controlDragDrop={controlDragDrop}
                                        />
                                    </div>
                                )} 
                                {selectShow && (
                                    <InputContainer>
                                        <SelectBox
                                            label="結合フィールド数"
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25"
                                            name="abc"
                                        >
                                            <option key="default" value="3">
                                                3
                                            </option>
                                            {conditionOptions.length > 0 &&
                                                conditionOptions.map((field) => (
                                                    <option value={field.id} key={field.id}>
                                                        {field.value}
                                                    </option>
                                                ))}
                                        </SelectBox>
                                    </InputContainer>
                                )}
                                {selectTextType && <FieldTextType />}

                                <InputContainer>
                                    <DxFilterBuilder
                                        info={{ page: `k2_layout_design_timestamp_filterBuilder`, maxGroupLevel: 5 }}
                                    />
                                </InputContainer>
                                {/* DX FILTER BUILDER END */}
                            </FormBodyContainer>
                            <FormFooter
                                btn_title1={formType === 'add' ? '新規追加' : 'フィールド削除'}
                                btn_title2={formType === 'add' ? '連続追加' : '更新'}
                                handleCancel={handleCancel}
                                formType={formType}
                                setContinuousAdd={setContinuousAdd}
                                setIsOverFlow={setIsOverFlow}
                                loading={loading}
                            >
                                {/* ----error---- */}
                                <ErrorMessage></ErrorMessage>
                            </FormFooter>
                        </Form>
                    </div>
                </Formik>
            </Page1440Body>
        </>
    );
};
export default FilterBuilder;
