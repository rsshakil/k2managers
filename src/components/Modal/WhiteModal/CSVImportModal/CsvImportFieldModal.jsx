import React, { useEffect, useState } from 'react';
import Loading from '../../../Loading/Loader';
import ModalTitle from '../../components/ModalTitle';
import WhiteModalWrapper from '../../components/WhiteModalWrapper';
import InputContainer from '../../../Wrapper/InputContainer';
import TagBoxComponentV1 from '../../../ManagementItem/TagBoxComponentV1';
import { Form, Formik } from 'formik';
import FormBodyContainer from '../../../Wrapper/FormBodyContainer';
import { errorMessages } from '../../../../lib/errorMessages';
import ErrorMessage from '../../../ErrorMessage/ErrorMessage';
import ModalFormFooter from '../../../Footer/ModalFormFooter';

export default function CsvImportFieldModal({ filterRecords, blockData = '', handleCancel, formType = 'add' }) {
    const pathName = window.location.pathname;
    const routeName = pathName.split('/').pop();
    const [formData, setFormData] = useState(blockData);
    const [loading, setLoading] = useState(false);
    const [systemError, setSystemError] = useState(false);
    const [tagBoxItems, setTagBoxItems] = useState([]);
    const [countTagBox1, setCoutTagBox1] = useState([]);
    const [functionMode, setFunctionMode] = useState({ mode: '', item: {} });

    useEffect(() => {
        setTagBoxItems(filterRecords);
    }, []);

    const handleAdd = async (values, resetForm) => {};
    const handleUpdate = async (values) => {};

    return (
        <>
            {loading && <Loading />}
            <WhiteModalWrapper width="border-none text-black" className="items-start">
                <ModalTitle title={`${formData?.inputBox?.value}フィルター編集`} className="text-blue-100 text-xl" />
                <Formik
                    validateOnChange={false}
                    validateOnBlur={false}
                    initialValues={formData}
                    enableReinitialize={true}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        if (formType === 'add') {
                            handleAdd(values, resetForm);
                        } else {
                            handleUpdate(values);
                        }
                    }}
                >
                    {({ errors }) => {
                        const first = Object.keys(errors)[0];
                        return (
                            <div className="relative w-full h-full">
                                <Form>
                                    <FormBodyContainer className="!px-0">
                                        <label htmlFor="tagBox" className="text-blue-100">
                                            フィルター設定
                                        </label>
                                        <InputContainer>
                                            <TagBoxComponentV1
                                                id="tagBox"
                                                valueExpr="filterId"
                                                displayExpr="filterName"
                                                placeholder="フィルター設定を選択してください"
                                                key={'tag_box1'}
                                                count={'tag_box1_' + formData.fTypeId}
                                                dragList={tagBoxItems}
                                                preDefineTagBoxValue={formData.tagBoxValue}
                                                functionMode={functionMode}
                                                pathName={routeName}
                                                countTagBox1={countTagBox1}
                                                setCoutTagBox1={setCoutTagBox1}
                                                //countTagBox={ctb}
                                            />
                                        </InputContainer>
                                        <ModalFormFooter
                                            padding="!p-0"
                                            btn_title1={`${formType === 'add' ? 'キャンセル' : 'csv Delete'}`}
                                            btn_title2={`${formType === 'add' ? '新規追加' : '更新'}`}
                                            formType={formType}
                                            handleCancel={handleCancel}
                                            memoClassName="!text-blue-100"
                                        >
                                            {/* ----error---- */}
                                            <ErrorMessage>
                                                {errors[first]}
                                                {systemError && !errors[first] && `${errorMessages.E_SYSTEM_01}`}
                                            </ErrorMessage>
                                        </ModalFormFooter>
                                    </FormBodyContainer>
                                </Form>
                            </div>
                        );
                    }}
                </Formik>
            </WhiteModalWrapper>
        </>
    );
}
