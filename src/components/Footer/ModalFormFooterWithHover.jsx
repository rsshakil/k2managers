import Button from '../Button/Button';
import InputContainer from '../Wrapper/InputContainer';
import Note from '../Form/FormInputs/Note';

const ModalFormFooterWithHover = ({
    btn_title1,
    formType,
    memoClassName,
    padding,
    setContinuousAdd,
    setIsOverFlow,
    setOpenModal,
    buttonComponents,
    handleCancel,
    children,
    btn_title2,
    loading,
    deleteLoading,
    setTimeRangeValue,
}) => {
    return (
        <div className={`px-10 ${padding}`}>
            <InputContainer className="mb-8 mt-24">
                <Note
                    label="メモ（2048文字まで）"
                    labelClassName={`text-white ${memoClassName}`}
                    inputClassName="bg-blue-25"
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
                    type={'button'}
                    onClick={() => {
                        if (formType === 'add') {
                            handleCancel();
                            setTimeRangeValue && setTimeRangeValue('');
                            localStorage.removeItem('event_scheduler_timestamp_TimeRangePicker');
                            sessionStorage.removeItem('event_scheduler_timestamp_TimeRangePicker');
                        } else {
                            setOpenModal(true);
                            setIsOverFlow(true);
                        }
                    }}
                    disabled={!!loading}
                />
                <Button
                    title={btn_title2}
                    type="submit"
                    onClick={() => setContinuousAdd && setContinuousAdd(true)}
                    disabled={!!(deleteLoading || loading)}
                />
            </div>
            {buttonComponents && formType === 'edit' && (
                <div className="pb-10">
                    <Button title="キャンセル" type="button" onClick={() => handleCancel()} />
                </div>
            )}
        </div>
    );
};
export default ModalFormFooterWithHover;
