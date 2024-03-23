import { Form, Formik } from 'formik';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { getFieldList } from '../../../services/appDesignerService';
import { valueFormatCheck } from '../../../utilities/commonFunctions';
import Note from '../../Form/FormInputs/Note';
import SelectBox from '../../Form/FormInputs/SelectBox';
import TextBox from '../../Form/FormInputs/TextBox';
import ModalTitle from '../../Modal/components/ModalTitle';
import WhiteModalWrapper from '../../Modal/components/WhiteModalWrapper';
import InputContainer from '../../Wrapper/InputContainer';
import BlockModalFooter from './BlockModalFooter';

export default function TermsOfService({ blockData = '', setModalOpen = () => {}, handleOnPressSave = () => {} }) {
    const [formData, setFormData] = useState(blockData);
    const [fieldList, setFieldList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchFieldListInit() {
            try {
                setLoading(true);
                const projectId = window.sessionStorage.getItem('currentProjectId');

                const { data, status } = await getFieldList(4, projectId);

                if (status == 200) {
                    let { records = [] } = data || [];

                    records = records.map((record) =>
                        _.pick(record, ['fieldId', 'fieldCode', 'fieldType', 'fieldName'])
                    );

                    setFieldList(records);

                    if (!formData.fieldCode && records.length > 0) {
                        setFormData((prevState) => ({
                            ...prevState,
                            fieldCode: records[0].fieldCode,
                        }));
                    }
                }

                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        }

        fetchFieldListInit();
    }, []);

    function handleOnchange(e) {
        const name = e.target.name;
        const value = valueFormatCheck(e.target.value);

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    return (
        <WhiteModalWrapper width="border-none text-black" className="items-start">
            <ModalTitle title="利用規約設定" className="text-blue-100 text-xl" />

            <Formik enableReinitialize={true} initialValues={formData}>
                <div className="relative w-full h-full">
                    <Form onChange={handleOnchange}>
                        <div className="body-height3 pt-12 px-10 min-h-[calc(100vh-452px)] !p-0">
                            <div className="flex flex-col py-10">
                                <InputContainer>
                                    <SelectBox
                                        label="スクロール判定"
                                        name="scrollType"
                                        labelClassName="text-blue-100"
                                        inputClassName="bg-blue-25"
                                    >
                                        <option value={1}>最下部までスクロールしなくてもレ点が押せる</option>
                                        <option value={2}>
                                            一番下までスクロールしないとチェックが押せません（利用規約が短い場合、レ点を押すことができません）
                                        </option>
                                    </SelectBox>
                                </InputContainer>
                                <div className="hidden">
                                    <InputContainer>
                                        <SelectBox
                                            label="配置ボタンタイプ"
                                            name="buttonType"
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25"
                                            onChange={handleOnchange}
                                        >
                                            <option value="a">A</option>
                                            <option value="b">B</option>
                                            <option value="c">C</option>
                                        </SelectBox>
                                    </InputContainer>
                                </div>
                                <InputContainer>
                                    <TextBox
                                        label="レ点文言"
                                        name="agreeCheckboxText"
                                        placeholder="チェックボックスの横に表示する文言"
                                        labelClassName="text-blue-100"
                                        inputClassName="bg-blue-25"
                                    />
                                </InputContainer>

                                <InputContainer>
                                    <TextBox
                                        label="レ点非活性時文言"
                                        name="checkFalseText"
                                        placeholder="（チェックすると非表示になります）チェックされていない時に表示する文言"
                                        labelClassName="text-blue-100"
                                        inputClassName="bg-blue-25"
                                    />
                                </InputContainer>
                                <InputContainer>
                                    <TextBox
                                        label="スクロール判定無効時文言"
                                        name="notScrolling2BottomText"
                                        placeholder="（最下部までスクロールすると非表示になります）最下部までスクロールが達成されていない時に表示する文言"
                                        labelClassName="text-blue-100"
                                        inputClassName="bg-blue-25"
                                    />
                                </InputContainer>
                                <div className="hidden">
                                    <InputContainer>
                                        <TextBox
                                            label="ボタン文言"
                                            name="buttonText"
                                            placeholder="ボタン文言"
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25"
                                        />
                                    </InputContainer>
                                </div>

                                <InputContainer>
                                    <Note
                                        label="利用規約エリアwrapカスタムClass"
                                        name="agreeAreaCustomClass"
                                        placeholder="利用規約エリアwrapカスタムClass"
                                        labelClassName="text-blue-100"
                                        inputClassName="bg-blue-25 !p-1"
                                        height="h-8"
                                    />
                                </InputContainer>
                                <InputContainer>
                                    <Note
                                        label="テキストエリアwrapカスタムClass"
                                        name="textAreaCustomClass"
                                        placeholder="テキストエリアwrapカスタムClass"
                                        labelClassName="text-blue-100"
                                        inputClassName="bg-blue-25 !p-1"
                                        height="h-8"
                                    />
                                </InputContainer>
                                <InputContainer>
                                    <Note
                                        label="レ点エリアwrapカスタムClass"
                                        name="checkboxAreaCustomClass"
                                        placeholder="レ点エリアwrapカスタムClass"
                                        labelClassName="text-blue-100"
                                        inputClassName="bg-blue-25 !p-1"
                                        height="h-8"
                                    />
                                </InputContainer>

                                <InputContainer>
                                    <Note
                                        label="レ点文言カスタムClass（チェックできる時）"
                                        name="checkboxDisabletextCustomClass"
                                        placeholder="カスタムClass"
                                        labelClassName="text-blue-100"
                                        inputClassName="bg-blue-25 !p-1"
                                        height="h-8"
                                    />
                                </InputContainer>

                                <InputContainer>
                                    <Note
                                        label="レ点文言カスタムClass（チェックできない時）"
                                        name="checkboxEnabletextCustomClass"
                                        placeholder="カスタムClass"
                                        labelClassName="text-blue-100"
                                        inputClassName="bg-blue-25 !p-1"
                                        height="h-8"
                                    />
                                </InputContainer>
                                <div className="hidden">
                                    <InputContainer>
                                        <Note
                                            label="ボタンエリアwrapカスタムClass"
                                            name="buttonAreaCustomClass"
                                            placeholder="ボタンエリアwrapカスタムClass"
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25 !p-1"
                                            height="h-8"
                                        />
                                    </InputContainer>
                                </div>
                                <InputContainer>
                                    <Note
                                        label="レ点非活性時文言エリアwrapカスタムClass"
                                        name="checkFalseTextAreaCustomClass"
                                        placeholder="カスタムClass"
                                        labelClassName="text-blue-100"
                                        inputClassName="bg-blue-25 !p-1"
                                        height="h-8"
                                    />
                                </InputContainer>
                                <InputContainer>
                                    <Note
                                        label="スクロール未達成カスタムClass"
                                        name="notScrollingTextAreaCustomClass"
                                        placeholder="カスタムClass"
                                        labelClassName="text-blue-100"
                                        inputClassName="bg-blue-25 !p-1"
                                        height="h-8"
                                    />
                                </InputContainer>

                                <div className="mt-8">
                                    <InputContainer>
                                        <SelectBox
                                            label="チェックの状態をフィールドに記録する（記録しない場合ボタンの非活性条件が作成できません）"
                                            name="record2field"
                                            placeholder="記録しない"
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25"
                                        >
                                            <option value={1}>記録しない</option>
                                            <option value={2}>記録する</option>
                                        </SelectBox>
                                    </InputContainer>
                                    <InputContainer>
                                        <SelectBox
                                            label="対象フィールド"
                                            name="fieldCode"
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25"
                                        >
                                            {fieldList.map((x) => (
                                                <option key={x.fieldId} value={x.fieldCode}>
                                                    {x.fieldName}
                                                </option>
                                            ))}
                                        </SelectBox>
                                    </InputContainer>
                                </div>

                                <InputContainer className="mb-8 mt-10">
                                    <Note
                                        label="利用規約本文"
                                        labelClassName={`text-white !text-blue-100`}
                                        inputClassName="bg-blue-25 h-96"
                                        type="text"
                                        name="termsOfService"
                                        placeholder="利用規約本文"
                                    />
                                </InputContainer>
                            </div>
                        </div>

                        <BlockModalFooter
                            setModalOpen={() => setModalOpen(false)}
                            handleOnPressSave={(e) => handleOnPressSave(e, formData)}
                        />
                    </Form>
                </div>
            </Formik>
        </WhiteModalWrapper>
    );
}
