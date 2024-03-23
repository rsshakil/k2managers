import Button from '../Button/Button';
import InputContainer from '../Wrapper/InputContainer';
import Note from './FormInputs/Note';

const FormFooter = ({
    btn_title1,
    formType,
    memoClassName,
    padding,
    setContinuousAdd,
    setIsOverFlow,
    setOpenModal,
    handleCancel,
    children,
    btn_title2,
    loading,
    deleteLoading,
    buttonComponents,
    btn_title3,
    btn_title4,
    handleCopy,
    continuousAddRemove,  
    showMemo = true,
}) => { 
    return (
        <div className={`px-10 ${padding}`}>
            {showMemo && (
                <InputContainer className="mb-8 mt-24">
                    <Note
                        label="メモ（2048文字まで）"
                        labelClassName={`text-blue-100 ${memoClassName}`}
                        inputClassName="bg-blue-25 placeholder-gray-300"
                        type="text"
                        name="memo"
                        placeholder="メモ"
                    />
                </InputContainer>
            )}
            {children}

            {/* ロール  button component*/}
            <div className="flex space-x-[42px] mb-4">
                {formType === 'add' && continuousAddRemove ? (
                    <Button title="キャンセル" type="button" onClick={handleCancel} />
                ) : (
                    <></>
                )}
                <Button
                    title={btn_title1}
                    className={`${formType === 'add' ? 'bg-blue-100' : 'bg-orange-300'}`}
                    hoverColorType={`${formType === 'add' ? 'hover:bg-blue-300' : 'hover:bg-orange-400'}`}
                    type={formType === 'add' ? 'submit' : 'button'}
                    onClick={
                        formType === 'add'
                            ? () => setContinuousAdd(false)
                            : () => {
                                  setOpenModal(true);
                                  setIsOverFlow(true);
                              }
                    }
                    disabled={!!loading}
                />
                {!continuousAddRemove || formType === 'edit' ? (
                    <Button
                        title={btn_title2}
                        type="submit"
                        onClick={() => setContinuousAdd(true)}
                        disabled={!!(deleteLoading || loading)}
                    />
                ) : (
                    <></>
                )}
            </div>

            {formType === 'edit' ? (
                <div className=" flex space-x-[42px] mb-4">
                    <Button
                        title={btn_title3}
                        className="bg-blue-100"
                        hoverColorType="hover:bg-blue-300"
                        type="button"
                        onClick={handleCancel}
                    />
                    {buttonComponents && <Button title={btn_title4} type="button" onClick={handleCopy} />}
                </div>
            ) : continuousAddRemove ? (
                <></>
            ) : (
                <div className="pb-10">
                    <Button title="キャンセル" type="button" onClick={handleCancel} />
                </div>
            )}
        </div>
    );
};
export default FormFooter;
