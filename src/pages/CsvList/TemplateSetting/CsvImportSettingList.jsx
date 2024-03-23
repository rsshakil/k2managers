import React from "react";
import EditIconSVG from "../../../components/SVG/EditIconSVG";
import {RiDownloadLine} from "react-icons/ri";

export default function CsvImportSettingList({
  propertyName: { csvTemplate, handleEditList, templateId, templateName, csvTemplateDownload },
  error,
  text: {
    headerTitle,
    column1Title = "編集",
    column2Title = "CSVテンプレート",
    column3Title = "ダウンロード",
  },
}) {
  return (
    <>
      <div className="flex flex-col mb-4">
        <div className="mb-8 text-blue-100">
          <label htmlFor="">{headerTitle}</label>
        </div>
        <div className="pl-10">
          <div className="grid grid-cols-12 gap-1 mb-1 text-blue-100">
            <div className="col-span-1">
              <p>{column1Title}</p>
            </div>
            <div className="col-span-10">
              <p>{column2Title}</p>
            </div>
            <div className="col-span-1">
              <p>{column3Title}</p>
            </div>
          </div>
          <div id="csvExportImportSettingList">
            {csvTemplate.length > 0 &&
              csvTemplate.map((template) => (
                <div key={template?.csvImportTemplateId} className="hover:bg-cevenhover">
                  <div className="grid grid-cols-12 gap-1 mb-1 text-blue-100">
                    <div className="col-span-1 flex items-center">
                      <EditIconSVG
                        onClick={() => handleEditList(template?.csvImportTemplateId)}
                      />
                    </div>
                    <div className="col-span-10">
                      <p>{template?.csvImportTemplateName}</p>
                    </div>
                    <div className="col-span-1 flex items-center justify-center">
                      <RiDownloadLine
                        className="cursor-pointer text-2xl"
                        onClick={() => csvTemplateDownload(template?.csvImportTemplateId)}
                      />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
