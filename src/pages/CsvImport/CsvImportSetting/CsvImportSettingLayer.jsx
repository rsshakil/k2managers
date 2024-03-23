import React from 'react';
import CsvExportImportSettingAddTemplateButton from '../../CsvList/TemplateSetting/CsvExportImportSettingAddTemplateButton';
import CsvExportImportSettingFooterButton from '../../CsvList/TemplateSetting/CsvExportImportSettingFooterButton';
import CsvImportSettingList from '../../CsvList/TemplateSetting/CsvImportSettingList';
import CsvImportSettingList2 from '../../CsvList/TemplateSetting/CsvImportSettingList2';
import { useSelector } from 'react-redux';

export default function CsvImportSettingLayer({
    importSettingProps: {
        handleCancel,
        addedTemplateSetting,
        handleEditList,
        csvTemplateDownload,
        csvTemplate,
        error,
        limit,
        setOpenModal,
        setIsOverFlow,
    },
}) {
    const role = useSelector((state) => state.auth.role);
    // LOCAL INITIALIZE START
    const formType = 'add',
        btn_title1 = 'キャンセル',
        addedTemplateButtonName = 'CSVインポートテンプレート設定追加　　',
        settingList_Title_Text = {
            headerTitle: 'CSVインポートテンプレート設定',
            column1Title: '編集',
            column2Title: 'CSVテンプレート',
        },
        settingList_PropertyName = {
            csvTemplate: csvTemplate,
            handleEditList: handleEditList,
            templateId: 'csvImportTemplateId',
            templateName: 'csvImportTemplateName',
            csvTemplateDownload: csvTemplateDownload
        };
    // LOCAL INITIALIZE END

    return (
        <>

            {role.r11 == 1 ? (
            <CsvImportSettingList propertyName={settingList_PropertyName} text={settingList_Title_Text} error={error} />
            ):(
            <CsvImportSettingList2 propertyName={settingList_PropertyName} text={settingList_Title_Text} error={error} />
            )}
            {role.r11 == 1 && (
            <div className="pl-36 pr-28  mt-6 mb-8">
                <CsvExportImportSettingAddTemplateButton
                    addedTemplateSetting={addedTemplateSetting}
                    addedTemplateButtonName={addedTemplateButtonName}
                    limit={limit}
                />
            </div>
            )}
            <CsvExportImportSettingFooterButton
                btn_title1={btn_title1}
                formType={formType}
                handleCancel={handleCancel}
                setOpenModal={setOpenModal}
                setIsOverFlow={setIsOverFlow}
            />
        </>
    );
}
