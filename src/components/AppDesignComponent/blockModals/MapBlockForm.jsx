import { Form, Formik } from 'formik';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';

import Note from '../../Form/FormInputs/Note';
import SelectBox from '../../Form/FormInputs/SelectBox';
import TextBox from '../../Form/FormInputs/TextBox';
import ModalTitle from '../../Modal/components/ModalTitle';
import WhiteModalWrapper from '../../Modal/components/WhiteModalWrapper';
import InputContainer from '../../Wrapper/InputContainer';
import BlockModalFooter from './BlockModalFooter';

import { getFieldList } from '../../../services/appDesignerService';

export default function MapBlockForm({ blockData = '', setModalOpen = () => {}, handleOnPressSave = () => {} }) {
    const [fieldList, setFieldList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState(blockData);

    function handleOnchange(e) {
        const name = e.target.name;
        const value = e.target.value;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    useEffect(() => {
        async function fetchFieldListInit() {
            try {
                setLoading(true);
                const projectId = sessionStorage.getItem('currentProjectId');

                const { data, status } = await getFieldList('0,1,2,3,4,5,6,7', projectId);

                if (status == 200) {
                    let { records = [] } = data || [];

                    records = records.map((record) =>
                        _.pick(record, ['fieldId', 'fieldCode', 'fieldType', 'fieldName'])
                    );

                    setFieldList(records);
                }

                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        }

        fetchFieldListInit();
    }, []);

    return (
        <WhiteModalWrapper width="border-none text-black" className="items-start">
            <ModalTitle title="地図ブロック設定" className="text-blue-100 text-xl" />

            <Formik enableReinitialize={true} initialValues={formData}>
                <div className="relative w-full h-full">
                    <Form onChange={handleOnchange}>
                        <div className="body-height3 pt-12 px-10 min-h-[calc(100vh-452px)] !p-0">
                            <div className="flex flex-col py-10">
                                <InputContainer>
                                    <TextBox
                                        label="名称初期値"
                                        name="nameInitialValue"
                                        placeholder="名称初期値"
                                        labelClassName="text-blue-100"
                                        inputClassName="bg-blue-25"
                                    />
                                </InputContainer>
                                <InputContainer>
                                    <SelectBox
                                        label="名称取得先フィールド "
                                        name="nameField"
                                        labelClassName="text-blue-100"
                                        inputClassName="bg-blue-25"
                                    >
                                        <option value="">記録しない</option>
                                        {fieldList.map((x) => (
                                            <option key={x.fieldId} value={x?.fieldCode}>
                                                {x.fieldName}
                                            </option>
                                        ))}
                                    </SelectBox>
                                </InputContainer>
                                <InputContainer>
                                    <TextBox
                                        label="住所初期値"
                                        name="addressInitialValue"
                                        placeholder="住所初期値"
                                        labelClassName="text-blue-100"
                                        inputClassName="bg-blue-25"
                                    />
                                </InputContainer>
                                <InputContainer>
                                    <SelectBox
                                        label="住所取得先フィールド"
                                        name="addressField"
                                        labelClassName="text-blue-100"
                                        inputClassName="bg-blue-25"
                                    >
                                        <option value="">記録しない</option>
                                        {fieldList.map((x) => (
                                            <option key={x.fieldId} value={x?.fieldCode}>
                                                {x.fieldName}
                                            </option>
                                        ))}
                                    </SelectBox>
                                </InputContainer>

                                <InputContainer>
                                    <Note
                                        label="地図エリアwrapカスタムClass"
                                        name="mapAreaWrapCustomClass"
                                        placeholder="地図エリアwrapカスタムClass"
                                        labelClassName="text-blue-100"
                                        inputClassName="bg-blue-25 !p-1"
                                        height="h-8"
                                    />
                                </InputContainer>

                                <InputContainer>
                                    <Note
                                        label="iframeカスタムClass"
                                        name="iframeCustomClass"
                                        placeholder="iframeカスタムClass"
                                        labelClassName="text-blue-100"
                                        inputClassName="bg-blue-25 !p-1"
                                        height="h-8"
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
