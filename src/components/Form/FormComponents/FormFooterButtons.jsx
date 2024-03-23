import Button from '../../Button/Button';

const FormFooterButtons = ({
    btn_title1,
    formType,
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
}) => {
    return (
        <div className={`px-10 ${padding}`}>
            {children}
            {/* ロール  button component*/}
            <div className="flex space-x-[42px] mb-4">
                <Button
                    title={btn_title1}
                    className={`${formType === 'add' ? 'bg-blue-100' : 'bg-orange-300'}`}
                    hoverColorType={`${formType === 'add' ? 'hover:bg-blue-300' : 'hover:bg-orange-400'}`}
                    type={formType === 'add' ? 'button' : 'button'}
                    onClick={
                        formType === 'add'
                            ? handleCancel
                            : () => {
                                  setOpenModal && setOpenModal(true);
                                  setOpenModal && setIsOverFlow(true);
                              }
                    }
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
                    <Button title="キャンセル" type="button" onClick={handleCancel} />
                </div>
            )}
        </div>
    );
};
export default FormFooterButtons;
