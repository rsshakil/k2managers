import React from 'react';
import Button from '../../../components/Button/Button';

export default function CsvExportImportSettingFooterButton({
    btn_title1,
    formType,
    handleCancel,
    setOpenModal,
    setIsOverFlow,
}) {
    return (
        <>
            {/* ロール  button component*/}
            <div className=" flex space-x-[42px] mb-4">
                <Button
                    title={btn_title1}
                    className={`${formType === 'add' ? 'bg-blue-100' : 'bg-orange-300'}`}
                    hoverColorType={`${formType === 'add' ? 'hover:bg-blue-300' : 'hover:bg-orange-400'}`}
                    type={formType === 'add' ? 'button' : 'submit'}
                    onClick={
                        formType === 'add'
                            ? handleCancel
                            : () => {
                                  setOpenModal(true);
                                  setIsOverFlow(true);
                              }
                    }
                />
            </div>
        </>
    );
}
