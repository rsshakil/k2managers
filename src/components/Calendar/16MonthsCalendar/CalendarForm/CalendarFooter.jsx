import Button from '../../../Button/Button';
import Note from '../../../Form/FormInputs/Note';
import InputContainer from '../../../Wrapper/InputContainer';

const CalendarFooter = ({
    btn_title1,
    formType,
    setAdd,
    handleCancel,
    children,
    btn_title2,
    loading,
    deleteLoading,
}) => {
    return (
        <div>
            <InputContainer className="mb-8">
                <Note
                    label="メモ（2048文字まで）"
                    inputClassName="bg-blue-25"
                    labelClassName="text-blue-100"
                    type="text"
                    name="memo"
                />
            </InputContainer>
            {children}

            {/* ロール  button component*/}
            <div className=" flex space-x-[42px] mb-4">
                <Button
                    title={btn_title1}
                    className={`${formType === 'add' ? 'bg-blue-100' : 'bg-orange-300'}`}
                    hoverColorType={`${formType === 'add' ? 'hover:bg-blue-300' : 'hover:bg-orange-400'}`}
                    type="button"
                    onClick={handleCancel}
                    disabled={!!loading}
                />
                <Button
                    title={btn_title2}
                    type="submit"
                    onClick={() => setAdd(true)}
                    disabled={!!(deleteLoading || loading)}
                />
            </div>
        </div>
    );
};
export default CalendarFooter;
