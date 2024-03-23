import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BreadCrumbs from '../../../components/BreadCrumbs/BreadCrumbs';
import CsvImportPreviewModal from '../../../components/Modal/WhiteModal/CSVImportModal/CsvImportPreviewModal';
import CsvImportTemplateModal from '../../../components/Modal/WhiteModal/CSVImportModal/CsvImportTemplateModal';
import CsvImportSetting1440Body from './CsvImportSetting1440Body';
import Loading from '../../../components/Loading/Loader';
import { csvImportPreviewData } from './demo';
import { instance } from '../../../services/axios.js';
import { saveAs } from "file-saver-es";
import {baseURL, csvImportTemplateDownload, listCsvImportTemplateList, listMethod} from '../../../restapi/queries';
export default function CsvImportSetting() {
    // LOCAL INITIALIZE START
    const navigate = useNavigate();
    const { info } = useSelector((state) => state.auth);
    const [limit, setLimit] = useState(0),
        [loading, setLoading] = useState(false),
        [csvTemplate, setCsvTemplate] = useState([]),
        [systemError, setSystemError] = useState(false),
        [showImportPreviewModal, setShowImportPreviewModal] = useState(false),
        [showCsvImportTemplateCreateModal, setShowCsvImportTemplateCreateModal] = useState(false),
        [csvImportTempModalTitle, setCsvImportTempModalTitle] = useState('CSVインポートテンプレート新規作成'),
        [csvImportTempModalFormType, setCsvImportTempModalFormType] = useState('add'),
        [templateId, setTemplateId] = useState(0),
        [csvImportTemplateIdValue, setCsvImportTemplateId] = useState(''),
        [initialValues, setInitialValues] = useState({}),
        [importPreviewList, setImportPreviewList] = useState([]);
    useEffect(() => {
        getAllCsvImportTemplateList();
        setImportPreviewList(csvImportPreviewData);
    }, []);
    // useEFFECT END
    // HANDLE FUNCTION START
    const handleCancel = () => {
        navigate('/csv_import_list');
    };
    console.log('csvImportTemplateIdValue',csvImportTemplateIdValue);
    // HANDLE FUNCTION END
    // API HANDLE FUNCTION START
    const handleChange = (e) => {
        const projectId = sessionStorage.getItem('currentProjectId');
        const {name,value } = e.target;
        console.log('e.targetvalues',e.target.value);
        if(name=='csvImportTemplateName'){
            sessionStorage.setItem('csvImportTemplateId_'+projectId,value);
        }
        setCsvImportTemplateId(value);
    };
    const addedTemplateSetting = () => {
        setCsvImportTempModalFormType('add');
        setTemplateId(0);
        setInitialValues({});
        setShowCsvImportTemplateCreateModal(true);
    };
    const handleEditList = async (templateIdValue) => {
        setTemplateId(templateIdValue);
        setCsvImportTempModalTitle('CSVインポートテンプレート編集');
        try {
            setLoading(true);
            const projectId = sessionStorage.getItem('currentProjectId');
            if (projectId) {
                const ENDPOINT = `${baseURL}${listCsvImportTemplateList}?CsvImportTemplateId=${templateIdValue}`;
                const config = {
                    method: listMethod,
                    url: ENDPOINT,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                };
                const response = await instance.request(config);
                setInitialValues(response?.data?.records);
                setCsvImportTempModalFormType('edit');
                setShowCsvImportTemplateCreateModal(true);
                setLoading(false);
            }
        } catch (err) {
            setLoading(false);
        }
    };

    const csvTemplateDownload = async (templateId) => {
        setLoading(true);

        try {
            const projectId = sessionStorage.getItem('currentProjectId');
            let targetCsvTemplate = csvTemplate.find(item => item.csvImportTemplateId === templateId);
            let csvName = `${projectId}_${targetCsvTemplate?.csvImportTemplateName}_import_template`
            if (projectId) {
                const ENDPOINT = `${baseURL}${csvImportTemplateDownload}${templateId}?pid=${projectId}&aid=${info.accountId}`;
                const config = {
                    method: listMethod,
                    url: ENDPOINT,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                };
                await instance.request(config).then((res) => {
                    // base64をバイナリ（Blob）に変換する
                    var bin = window.atob(res.data.replace(/^.*,/, ''));
                    var buffer = new Uint8Array(bin.length);
                    for (var i = 0; i < bin.length; i++) {
                        buffer[i] = bin.charCodeAt(i);
                    }
                    // base64をバイナリ（Blob）に変換する
                    try {
                        (async () => {
                            var blob = new Blob([buffer.buffer], {
                                type: 'application/csv',
                            });
                            const fh = await window.showSaveFilePicker({ suggestedName: csvName + '.csv' });
                            // FileSystemWritableFileStream オブジェクトを取得
                            const stream = await fh.createWritable();
                            // テキストデータの Blob オブジェクトを生成
                            // const blob = new Blob(['こんにちは'], { type: 'text/html' });
                            // テキストデータをファイルに書き込む
                            await stream.write(blob);
                            // ファイルを閉じる
                            await stream.close();
                            // 保存されたファイルのファイル名をコンソールに出力
                        })();
                    } catch (e) {
                        console.log('fileDownLoadError',e);
                        return false;
                    }
                    setLoading(false);
                });
        
        
                // const csvData = [
                //     ["Name", "Age", "Email"]
                // ];
                // //console.log(csvData, 'csvData.....')
        
                // const csvString = csvData.map((row) => row.join(",")).join("\n");
                // const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
                // saveAs(blob, `${targetCsvTemplate.csvImportTemplateName}.csv`);
                setLoading(false);

            }
        } catch (err) {
            setLoading(false);

            console.log('error ---> ', err)
        }
    }

    const addCsvImportFile = () => {};
    const closePreviewModal = () => {
        setShowImportPreviewModal(!showImportPreviewModal);
    };
    const closeAddUpdateModal = (status) => {
        getAllCsvImportTemplateList();
        setCsvImportTempModalFormType('add');
        setTemplateId(0);
        setInitialValues({});
        setShowCsvImportTemplateCreateModal(status);
    };
    const handle_CsvImportPreviewModal = () => {
        setShowImportPreviewModal(!showImportPreviewModal);
    };
    const handle_ImportRun = () => {};

    const getAllCsvImportTemplateList = async () => {
        try {
            setLoading(true);
            const projectId = sessionStorage.getItem('currentProjectId');
            if (projectId) {
                const ENDPOINT = `${baseURL}${listCsvImportTemplateList}?pid=${projectId}`;
                const config = { method: listMethod, url: ENDPOINT };
                const response = await instance.request(config);
                if(response?.data?.records && response?.data?.records.length>0){
                    if(!csvImportTemplateIdValue){
                        sessionStorage.setItem('csvImportTemplateId_'+projectId,response?.data?.records[0].csvImportTemplateId);
                        setCsvImportTemplateId(response?.data?.records[0].csvImportTemplateId);
                    }
                    
                    console.log('templateList',response?.data?.records);
                    setCsvTemplate(response?.data?.records);
                }
                setLoading(false);
            }
        } catch (err) {
            setLoading(false);
        }
    };

    const importSettingProps = {
            handleCancel: handleCancel,
            addedTemplateSetting: addedTemplateSetting,
            handleEditList: handleEditList,
            csvTemplateDownload: csvTemplateDownload,
            csvTemplate: csvTemplate,
            error: systemError,
            limit: limit,
        },
        outputSettingProps = {
            handleChange: handleChange,
            addCsvImportFile: addCsvImportFile,
            handle_CsvImportPreviewModal: handle_CsvImportPreviewModal,
            csvTemplate: csvTemplate,
            csvImportTemplateIdValue: csvImportTemplateIdValue,
            limit: limit,
        },
        importPreviewTableProps = {
            importPreviewList: importPreviewList,
        };
    // DECLARE PROPS OBJ END
    return (
        <>
            {loading && <Loading />}
            <div className="flex flex-start text-blue-50 mt-4 font-bold">
                <BreadCrumbs
                    title="CSV"
                    className="underline cursor-pointer px-4"
                    onClick={() => navigate('/csv_import_list')}
                />
                <span>&gt;</span>
                <BreadCrumbs title="CSV入力テンプレート設定" />
            </div>
            <CsvImportSetting1440Body
                load={loading}
                importSettingProps={importSettingProps}
                outputSettingProps={outputSettingProps}
            />
            {showImportPreviewModal && (
                <CsvImportPreviewModal
                    title="CSVインポートプレビュー"
                    handleImportRun={handle_ImportRun}
                    handleCancel={closePreviewModal}
                    templateId={templateId}
                />
            )}
            {showCsvImportTemplateCreateModal && (
                <CsvImportTemplateModal
                    title={csvImportTempModalTitle}
                    formType={csvImportTempModalFormType}
                    templateId={templateId}
                    initialValues={initialValues}
                    handleCancel={() => closeAddUpdateModal(false)}
                />
            )}
        </>
    );
}
