import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AddedCSVExportModal from './AddedCSVExportModal';
import CsvExportSettingLayer from './CsvExportSettingLayer';
import BreadCrumbs from '../../../components/BreadCrumbs/BreadCrumbs';
import { baseURL, listMethod, csvExportTemplateList } from '../../../restapi/queries';
import { instance } from '../../../services/axios';

export default function CsvExportSetting() {
    // LOCAL INITIALIZE START
    const processing = useRef(false);
    const navigate = useNavigate();
    const [showExportSettingModal, setShowExportSettingModal] = useState(false);
    const [csvExportModalFormType, setCsvExportModalFormType] = useState('add');
    const [csvExportModalTitle, setCsvExportModalTitle] = useState('CSV出力テンプレート作成');
    const [csvTemplate, setCsvTemplate] = useState(false);
    const [limit, setLimit] = useState(0);
    const [systemError, setSystemError] = useState(false);
    const [loading, setLoading] = useState(true);

    const pid = sessionStorage.getItem('currentProjectId');
    const [initialValues, setInitialValues] = useState({});

    useEffect(() => {
        fetchCsvTemplate();
    }, []);

    const fetchCsvTemplate = async () => {
        try {
            setLoading(true);
            const ENDPOINT = `${baseURL}${csvExportTemplateList}?pid=${pid}`;
            const config = {
                method: listMethod,
                url: ENDPOINT,
            };
            const response = await instance.request(config);
            if (response) {
                setLoading(false);
                const csvTemplateList = response.data.records;
                setLimit(csvTemplateList.length);
                setCsvTemplate(response.data.records); 
            }
        } catch (error) {
            setLoading(false);
            setSystemError(error.message);
        }
    };

    // LOCAL INITIALIZE END
    // PROPS HANDLE METHOD START

    const handleCancel = () => {
        navigate('/csv_export_list');
    };
    const addedTemplateSetting = () => {
        setCsvExportModalFormType('add');
        setCsvExportModalTitle('CSV出力テンプレート作成');
        setShowExportSettingModal(!showExportSettingModal);
        setInitialValues({
            csvExportTemplateName: '',
            csvExportTemplateFileName: '',
            csvExportTemplateGenerationCycle: 0,
            csvExportTemplateGenerationTiming: 0,
            csvExportTemplateAutomaticDeletion: '0',
            csvExportTemplatePassword: '',
            filterId: '',
            memo: '',
        });
    }; // added new csv export setting

    const handleEditList = (csvExportTemplateId) => { 
        setCsvExportModalFormType('edit');
        setCsvExportModalTitle('CSV出力テンプレート編集');
        setShowExportSettingModal(!showExportSettingModal);
        fetchEditCsvTemplate(csvExportTemplateId);
    }; // update csv export setting list

    const fetchEditCsvTemplate = async (csvExportTemplateId) => {
        if (processing.current) return;
        processing.current = true;
        try {
            setLoading(true);
            const ENDPOINT = `${baseURL}${csvExportTemplateList}?csvExportTemplateId=${csvExportTemplateId}`;
            const config = {
                method: listMethod,
                url: ENDPOINT,
            };
            const response = await instance.request(config);
            if (response) {
                setLoading(false);

                setInitialValues({
                    ...response.data.records,
                    limitType:
                        response.data.records.csvExportTemplateAuthRole &&
                        response.data.records.csvExportTemplateAuthRole.length > 0
                            ? 1
                            : 0,
                }); 
            }
        } catch (error) {
            setLoading(false);
            setSystemError(error.message);
        } finally {
            processing.current = false;
        }
    };

    // ADD CSV_EXPORT_SETTING MODAL START
    const handleModalCancel = () => {
        setInitialValues({});
        fetchCsvTemplate();
        setShowExportSettingModal(!showExportSettingModal);
    };
    const handelImmediateGeneration = () => {
        alert('Immediate Generation Button clicked!!!');
    };
    // ADD CSV_EXPORT_SETTING END

    // PROPS HANDLE METHOD END

    return (
        <>
            <div className="flex flex-start text-blue-50 mt-4 font-bold">
                <BreadCrumbs
                    title="CSV出力"
                    className="underline cursor-pointer px-4"
                    onClick={() => navigate('/csv_export_list')}
                />
                <span>&gt;</span>
                <BreadCrumbs title="CSV出力テンプレート設定" />
            </div>
            <CsvExportSettingLayer
                handleCancel={handleCancel}
                addedTemplateSetting={addedTemplateSetting}
                handleEditList={handleEditList}
                csvTemplate={csvTemplate}
                load={loading}
                error={systemError}
                limit={limit} 
            />

            {showExportSettingModal && (
                <AddedCSVExportModal
                    title={csvExportModalTitle}
                    formType={csvExportModalFormType}
                    initialValues={initialValues}
                    handleCancel={handleModalCancel}
                />
            )}
        </>
    );
}
