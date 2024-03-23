import React from 'react';
import Page1440Body from '../../../components/Page1440/Page1440Body';
import Loading from '../../../components/Loading/Loader';
import CsvExportSettingList from './CsvExportSettingList';
import CsvExportSettingList2 from './CsvExportSettingList2';
import CsvExportImportSettingAddTemplateButton from './CsvExportImportSettingAddTemplateButton';
import CsvExportImportSettingFooterButton from './CsvExportImportSettingFooterButton';
import { useSelector } from 'react-redux';

export default function CsvExportSettingLayer({
    heading,
    handleCancel,
    addedTemplateSetting,
    handleEditList,
    csvTemplate,
    load,
    error,
    limit,
    setOpenModal,
    setIsOverFlow,
}) {
    const role = useSelector((state) => state.auth.role);

    // LOCAL INITIALIZE START
    const formType = 'add',
        btn_title1 = 'キャンセル',
        addedTemplateButtonName = 'CSV出力テンプレート作成',
        settingList_Title_Text = {
            headerTitle: 'CSV出力テンプレート（512個まで）',
            column1Title: '編集',
            column2Title: 'CSVテンプレート名',
            column3Title: 'CSV出力実行',

        },
        settingList_PropertyName = {
            csvTemplate: csvTemplate,
            handleEditList: handleEditList,
            templateId: 'csvExportTemplateId',
            templateName: 'csvExportTemplateName',
        };
    // LOCAL INITIALIZE END

    return (
        <>
            {load ? (
                <Loading />
            ) : (
                <Page1440Body className="page1440-body3 h-[calc(100vh-134px)] p-0">
                    <div className="relative w-full h-full">
                        <label className="text-blue-100 flex justify-center text-xl">{heading}</label>
                        <div className="-mt-4" id="scroller"></div>
                        <div className="body-height3 pt-12 px-10">
                            {role.r10 == 1 ? (
                            <CsvExportSettingList
                                propertyName={settingList_PropertyName}
                                text={settingList_Title_Text}
                                error={error}
                            />
                            ):(
                            <CsvExportSettingList2
                                propertyName={settingList_PropertyName}
                                text={settingList_Title_Text}
                                error={error}
                            />
                            )}
                            {role.r10 == 1 && (
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
                        </div>
                    </div>
                </Page1440Body>
            )}
        </>
    );
}
