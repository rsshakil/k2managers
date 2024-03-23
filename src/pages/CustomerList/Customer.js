import { Form, Formik } from 'formik';
import Button from '../../components/Button/Button';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import TextAreaInput from '../../components/Form/FormInputs/TextAreaInput';
import TextBox from '../../components/Form/FormInputs/TextBox';
import BaseModal from '../../components/Modal/BaseModal';
import ButtonContainer from '../../components/Wrapper/ButtonContainer';
import InputContainer from '../../components/Wrapper/InputContainer';

const initialValues = {
    healthInsuranceCardSymbol: '',
    healthInsuranceCardNumber: '',
    dob: '',
    memo: '',
};

export default function Customer({ closeModal, setIsOverFlow }) {
    const submitHandler = (values, { resetForm }) => {
        resetForm({ [values]: '' });
    };

    return (
        <>
            <BaseModal title="顧客作成">
                <Formik
                    validateOnChange={false}
                    validateOnBlur={false}
                    initialValues={initialValues}
                    onSubmit={submitHandler}
                >
                    {() => {
                        return (
                            <Form>
                                <InputContainer>
                                    <TextBox
                                        inputClassName="text-black placeholder-blue-50"
                                        label="保険証記号"
                                        type="text"
                                        placeholder="保険証記号"
                                        name="healthInsuranceCardSymbol"
                                    />
                                </InputContainer>
                                <InputContainer>
                                    <TextBox
                                        inputClassName="text-black placeholder-blue-50"
                                        label="保険証番号"
                                        type="text"
                                        placeholder="保険証番号"
                                        name="healthInsuranceCardNumber"
                                    />
                                </InputContainer>
                                {/* Calendar */}
                                <InputContainer>
                                    <TextBox
                                        label="生年月日"
                                        inputClassName="custom-date-picker text-black placeholder-blue-50 cursor-pointer"
                                        type="date"
                                        name="dob"
                                        data-placeholder="生年月日を選択してください"
                                        aria-required="true"
                                        required
                                    />
                                </InputContainer>
                                <div className="h-[calc(100vh_-_576px)] min-h-[96px]">
                                    {/* Space Between TextArea and Input Field*/}
                                </div>
                                <InputContainer>
                                    <TextAreaInput
                                        inputClassName="text-black placeholder-blue-50 resize-none scroll-bar"
                                        label="メモ（2048文字まで）"
                                        name="memo"
                                        maxLength="2048"
                                    />
                                </InputContainer>

                                {/* Modal Footer Section*/}
                                <ErrorMessage>エラー文言表示エリア</ErrorMessage>
                                <ButtonContainer>
                                    {/* Cancel Button */}
                                    <Button
                                        title="キャンセル"
                                        onClick={() => {
                                            closeModal(false);
                                            setIsOverFlow(false);
                                        }}
                                    />
                                    {/* Save Setting Button */}
                                    <Button
                                        title="設定保存"
                                        type="submit"
                                        onClick={() => {
                                            setIsOverFlow(false);
                                        }}
                                    />
                                </ButtonContainer>
                            </Form>
                        );
                    }}
                </Formik>
            </BaseModal>
        </>
    );
}
