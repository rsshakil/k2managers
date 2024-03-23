import React, {useState} from 'react';
import SelectBox from '../../../components/FormikFreeComponents/SelectBox';
import InputContainer from '../../../components/Wrapper/InputContainer';
import CsvExportImportSettingAddTemplateButton from '../../CsvList/TemplateSetting/CsvExportImportSettingAddTemplateButton';
import CsvFileUpload from "../../CsvList/TemplateSetting/CsvFileUpload";

export default function CsvImportOutputSetting({
    outputSettingProps: { handleChange, addCsvImportFile, handle_CsvImportPreviewModal, csvTemplate, limit,csvImportTemplateIdValue },
}) {
    const [csvImportPreviewStatus, setCsvImportPreviewStatus] = useState(false);
    const [csvImportUploadFileName, setCsvImportUploadFileName] = useState('');
    const [csvFileUploadError, setCsvFileUploadError] = useState('');
    const fileUploadOutputProps = (value) => {
        setCsvFileUploadError(value.errorMessage);
        setCsvImportPreviewStatus(value.csvImportPreviewStatus);
        setCsvImportUploadFileName(value.csvImportUploadFileName);
    };

    return (
        <>
            <div className="flex flex-col mb-16">
                <div className="mb-4 text-blue-100">
                    <label htmlFor="">CSVインポートテンプレート選択</label>
                </div>
                <InputContainer className="pl-10 mb-8">
                    <SelectBox
                        label="CSVインポートテンプレート名"
                        labelClassName="text-blue-100"
                        inputClassName="bg-blue-25"
                        name="csvImportTemplateName"
                        value={csvImportTemplateIdValue}
                        onChange={handleChange}
                    >
                        {csvTemplate.length > 0 &&
                            csvTemplate.map((template, index) => (
                                <option value={template.csvImportTemplateId} key={template.csvImportTemplateId}>
                                    {template.csvImportTemplateName}
                                </option>
                            ))}
                    </SelectBox>
                </InputContainer>
                {csvImportUploadFileName && <p className="pl-10 mb-8">ファイル名: {csvImportUploadFileName}</p>}
                <InputContainer className="pl-10 mb-8">
                    {/*<CsvExportImportSettingAddTemplateButton
                        addedTemplateSetting={addCsvImportFile}
                        addedTemplateButtonName="CSVインポートファイル追加"
                        limit={limit}
                    />*/}
                    <CsvFileUpload bucketName={process.env.REACT_APP_AWS_S3_K2_BUCKET_NAME} dirName="csvImport" selectButtonText='CSVインポートファイル追加' csvTemplate={csvTemplate} fileUploadOutputProps={fileUploadOutputProps} />
                    <p className="text-orange-300 text-right">{csvFileUploadError}</p>
                </InputContainer>
                {csvImportPreviewStatus && <InputContainer className="pl-10">
                    <CsvExportImportSettingAddTemplateButton
                        startIconDisable={false}
                        addedTemplateSetting={handle_CsvImportPreviewModal}
                        addedTemplateButtonName="CSVインポートプレビューに進む"
                        limit={limit}
                    />
                </InputContainer>}
            </div>
        </>
    );
}
