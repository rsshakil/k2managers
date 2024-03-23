import React, { useRef, useState } from 'react';
import Loader from '../../../components/Loading/Loader';
import EditIconSVG from '../../../components/SVG/EditIconSVG';
import CSVIconSVG from '../../../components/SVG/CSVIconSVG';
import { createMethod, csvExportTemplateGenerate } from '../../../restapi/queries';
import { useSelector } from 'react-redux';
import { instance } from '../../../services/axios';

export default function CsvExportSettingList({
    propertyName: { csvTemplate, handleEditList, templateId, templateName },
    error,
    text: { headerTitle, column1Title = '編集', column2Title = 'CSVテンプレート', column3Title = 'CSV出力実行' },

}) {
    const processing = useRef(false);
    const [loading, setLoading] = useState(false);
    const { info } = useSelector((state) => state.auth);
    const generateCSV = async (id) => {
        if (processing.current) return;
        processing.current = true;
        setLoading(true);
        try {
            const projectId = sessionStorage.getItem('currentProjectId');
            if (projectId) {
                const ENDPOINT = `${csvExportTemplateGenerate}${id}`;
                const config = {
                    method: createMethod,
                    url: ENDPOINT,
                    data: {
                        projectId: projectId,
                        createdBy: info.accountId,
                    },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                };
                const response = await instance.request(config);
                if (response) {
                    setLoading(false);
                }
            }
        } catch (err) {
            setLoading(false);
        }finally {
            processing.current = false;
        }
    };

    return (
        <>
            {loading && <Loader />}
            <div className="flex flex-col mb-4">
                <div className="mb-8 text-blue-100">
                    <label htmlFor="">{headerTitle}</label>
                </div>
                <div className="pl-10">
                    <div className="grid grid-cols-12 gap-1 mb-1 text-blue-100">
                        <div className="col-span-1">
                            <p>{column1Title}</p>
                        </div>
                        <div className="col-span-9">
                            <p>{column2Title}</p>
                        </div>
                        <div className="col-span-2">
                            <p>{column3Title}</p>
                        </div>
                    </div>
                    <div id="csvExportImportSettingList">
                        {csvTemplate.length > 0 &&
                            csvTemplate.map((template) => (
                                <div key={template?.csvExportTemplateId} className="hover:bg-cevenhover">
                                    <div className="grid grid-cols-12 gap-1 mb-1 text-blue-100">
                                        <div className="col-span-1 flex items-center">
                                            <EditIconSVG
                                                onClick={() => {
                                                    handleEditList(template?.csvExportTemplateId);
                                                    sessionStorage.setItem('csv_export_setting_edit', template?.csvExportTemplateId);
                                                }}
                                            />
                                        </div>
                                        <div className="col-span-9">
                                            <p>{template?.csvExportTemplateName}</p>
                                        </div>
                                        <div className="col-span-1 flex items-center">
                                            {/* <button
                                                className="border-4 border-red-500"
                                                onClick={() => {
                                                    generateCSV(template?.csvExportTemplateId);
                                                }}
                                            >
                                                Button
                                            </button> */}
                                            <CSVIconSVG
                                                onClick={() => generateCSV(template?.csvExportTemplateId)}
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
