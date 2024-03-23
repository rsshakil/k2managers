import { Formik } from 'formik';
import { useState } from 'react';
import AppSettingFooter from '../../../pages/AppList/Components/AppSettingFooter';
import { Form } from '../../controls/UseForm';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import Loading from '../../Loading/Loader';
import Page1440Body from '../../Page1440/Page1440Body';
import FormBodyContainer from '../../Wrapper/FormBodyContainer';

const AppSettingForm = ({ formType, initialValues }) => {
    const [loading, setLoading] = useState(false);
    return (
        <>
            {loading && <Loading />}
            <Page1440Body className="page1440-body3 h-[calc(100vh-134px)] p-0">
                <Formik initialValues={initialValues} onSubmit="">
                    <div className="relative w-full h-full">
                        <Form>
                            <div className="-mt-4" id="scroller"></div>
                            <FormBodyContainer height="!min-h-[calc(100vh-272px)]"></FormBodyContainer>

                            <AppSettingFooter
                                btn_title1="Button A"
                                btn_title2="Button B"
                                formType={formType}
                                setLoading={setLoading}
                            >
                                {/* ----error---- */}
                                <ErrorMessage></ErrorMessage>
                            </AppSettingFooter>
                        </Form>
                    </div>
                </Formik>
            </Page1440Body>
        </>
    );
};
export default AppSettingForm;
