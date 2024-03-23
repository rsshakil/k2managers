import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Form } from '../controls/UseForm';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Page1440Body from '../Page1440/Page1440Body';
import FormBodyContainer from '../Wrapper/FormBodyContainer';
import InputContainer from '../Wrapper/InputContainer';
import FormFooter from './FormFooter';
import TextBox from './FormInputs/TextBox';

const CsvExportForm = ({ formType, initialValues }) => {
    const navigate = useNavigate();
    const handleCancel = () => {
        navigate('/csv_export_list');
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
                                        label="CSV名（32文字まで）"
                                        labelClassName="text-blue-100"
                                        inputClassName="bg-blue-25"
                                        name="csvExport_name"
                                        type="text"
                                        maxLength="32"
                                    />
                                </InputContainer>
                            </FormBodyContainer>

                            <FormFooter
                                btn_title1="新規追加"
                                btn_title2="連続追加"
                                handleCancel={handleCancel}
                                formType={formType}
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
export default CsvExportForm;
