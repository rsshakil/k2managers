import { Form, Formik } from 'formik';
import { useState } from 'react';
import Button from '../../components/Button/Button';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import PasswordWithEye from '../../components/Form/FormInputs/PasswordWithEye';
import TextAreaInput from '../../components/Form/FormInputs/TextAreaInput';
import BaseModal from '../../components/Modal/BaseModal';
import ButtonContainer from '../../components/Wrapper/ButtonContainer';
import InputContainer from '../../components/Wrapper/InputContainer';
/*import { csvPasswordSchema } from "../../lib/Schema";*/
import { errorMessages } from '../../lib/errorMessages';
import { useNavigate } from 'react-router-dom';
import { csvPasswordSchema } from '../../lib/Schema';

const CSVModal = ({ closeModal, setIsOverFlow }) => {
    const navigate = useNavigate();
    const [eye, setEye] = useState(false);
    const [csvError, setCsvError] = useState(false);
    const initialValues = {
        csvDownloadPassword: '',
        memo: '',
    };
    const handleSubmit = () => {
        closeModal(false);
        navigate('/csv_export_list');
    };
    return (
        <BaseModal title="CSVパスワード設定（変更は次回生成以降に反映します）">
            <Formik
                validateOnChange={false}
                validateOnBlur={false}
                initialValues={initialValues}
                validationSchema={csvPasswordSchema()}
                onSubmit={(values, errors) => {
                    handleSubmit(values);
                }}
            >
                {({ errors }) => {
                    const first = Object.keys(errors)[0];
                    return (
                        <Form>
                            <InputContainer>
                                <PasswordWithEye
                                    label="CSVパスワード（8-32文字　英大・英小・数字・半角記号を1文字以上使用して下さい。空欄の場合パスワード無しで生成されます。）"
                                    inputClassName="text-black bg-blue-25 placeholder-blue-50"
                                    labelClassName="font-normal"
                                    placeholder="ZIPパスワードを設定してください。"
                                    eye={eye}
                                    setEye={setEye}
                                    name="csvDownloadPassword"
                                />
                            </InputContainer>
                            <div className="h-[calc(100vh-485px)] min-h-[96px]">
                                {/* Space Between TextArea and Input Field*/}
                            </div>

                            <InputContainer>
                                <TextAreaInput
                                    label="メモ（2048文字まで）"
                                    inputClassName="text-black resize-none bg-blue-25"
                                    maxLength="2048"
                                    labelClassName="font-normal"
                                    name="memo"
                                />
                            </InputContainer>
                            <ErrorMessage className={`${errors[first]} ? "visible" : "invisible"`}>
                                {csvError && !errors[first] ? `${errorMessages.E_SYSTEM_01}}` : errors[first]}
                            </ErrorMessage>
                            <ButtonContainer>
                                <Button
                                    title={'キャンセル'}
                                    className={'bg-blue-100'}
                                    hoverColorType={'hover:bg-blue-300'}
                                    type="button"
                                    onClick={() => {
                                        closeModal(false);
                                        setIsOverFlow(false);
                                    }}
                                />
                                <Button title={'設定保存'} type="submit" />
                            </ButtonContainer>
                        </Form>
                    );
                }}
            </Formik>
        </BaseModal>
    );
};

export default CSVModal;
