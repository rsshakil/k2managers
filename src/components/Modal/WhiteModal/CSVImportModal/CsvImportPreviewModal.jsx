import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import CsvImportPreviewTable from '../../../../pages/CsvImport/CsvImportSetting/CsvImportPreview/CsvImportPreviewTable';
import Button from '../../../Button/Button';
import ModalTitle from '../../components/ModalTitle';
import WhiteModalWrapper from '../../components/WhiteModalWrapper';
import {baseURL, csvImportExec, listCsvImportPreviewList, listMethod, createMethod} from '../../../../restapi/queries';
import Loading from '../../../../components/Loading/Loader';
import { instance } from '../../../../services/axios.js';
import DialogModal from '../../../../components/Modal/DialogModal';
import { errorMessages } from '../../../../lib/errorMessages';
import { getErrorMessageWithErrorCode } from '../../../../lib/getErrorMessageWithErrorCode';

export default function CsvImportPreviewModal({ title, templateId, handleCancel, closePreviewModal, setIsOverFlow}) {
    const role = useSelector((state) => state.auth.role);
    const { info } = useSelector((state) => state.auth);
    const processing = useRef(false);

    // delete and modal open close state
    const [importModal, setImportModal] = useState(false);
    const [systemError, setSystemError] = useState(false);
    const [importLoading, setImportLoading] = useState(false);
    const [alreadyDeletedErrorMessage, setAlreadyDeletedErrorMessage] = useState('');

    const [csvPreviewProperties, setCsvPreviewProperties] = useState({
        csvImportPreviewHeaderData:[],
        csvImportPreview:[]
    });
    const [loading, setLoading] = useState(false)
    const [informations, setInformations] = useState(false)
    const [csvImportId, setCsvImportId] = useState(4)
    const [tempId, setTempId] = useState(templateId)
    const projectId = sessionStorage.getItem('currentProjectId');

    const [key, setKey] = useState("");

    // useEffect(() => {
    // }, []);

    useEffect(() => {
        setKey('csvImportId_'+projectId)
    }, [projectId]);


    useEffect(() => {
        if (key != "") {
            getAllCsvImportPreviewList();
        }
    }, [key]);

    let csvImportIdValue;

    const getAllCsvImportPreviewList = async () => {
        try {
            csvImportIdValue = sessionStorage.getItem(key);
            setLoading(true);
            if (projectId) {
                const ENDPOINT = `${baseURL}${listCsvImportPreviewList}${csvImportIdValue}?pid=${projectId}`;
                const config = { method: listMethod, url: ENDPOINT };
                const response = await instance.request(config);
                console.log('apiRes',response?.data);
                setInformations(!informations)
                setCsvPreviewProperties(response?.data);
                setLoading(false);
            }
        } catch (err) {
            setLoading(false);
        }
    };    

    const handleImportCSV = async () => {
        if (processing.current) return;
        processing.current = true;
        setImportLoading(true);
        setSystemError(false);
        csvImportIdValue = sessionStorage.getItem(key);
        try {
console.log("start csvimport")
            const ENDPOINT = `${baseURL}${csvImportExec}${csvImportIdValue}?pid=${projectId}`; //?pid=${projectId}}
            const config = {
                method: createMethod,
                url: ENDPOINT,
                data: {
                    execedBy: info.accountId,
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            };
            const exec = await instance.request(config);
            if (exec) {
                // if delete is successful
                setSystemError(false);
                setImportLoading(false);
                setImportModal(false);
                handleCancel()
            }
            else {
                throw new Error();
            }
        } catch (error) {
            if (error.response.status === 400) {
                const matchErrorMessage = getErrorMessageWithErrorCode(error);
                setAlreadyDeletedErrorMessage(matchErrorMessage);
            } else {
                setSystemError(true);
            }
            setImportLoading(false);
        }finally {
            processing.current = false;
        }
    };

    const closeImportModal = () => {
        setImportModal(false);
        setSystemError(false);
        sessionStorage.removeItem('csvImportId');
    };


    return (
        <>
        {loading && <Loading /> }
            <WhiteModalWrapper width="border-none text-black" className="items-start">
                {/*This is the modal title section*/}
                <ModalTitle className="text-blue-100 bold text-xl mb-8" title={title ? title : 'Modal Title'} />

                {/* IMPORT PREVIEW TABLE START */}
                <div className="table-wrapper scroll-bar overflow-x-auto">
                    <CsvImportPreviewTable importPreviewTableProps={csvPreviewProperties} informations={informations}/>
                </div>
                {/* IMPORT PREVIEW TABLE END */}

                {/* FOOTER BUTTON START */}
                <div className="space-x-[42px] mt-8 mb-4">
                    <Button title="インポート実行" onClick={() => {
                        setImportModal(true);
                        sessionStorage.setItem('csvImport_delete_id', csvImportIdValue);
                    }}
                />
                </div>
                <div className="space-x-[42px]">
                    <Button title="閉じる" onClick={handleCancel} />
                </div>
            </WhiteModalWrapper>
            {importModal && (
                <DialogModal
                    title="CSVインポート"
                    btn_title="インポート実行"
                    cancel_title="キャンセル "
                    handleButtonLeft={() => handleImportCSV()}
                    handleButtonRight={() => closeImportModal()}
                    setIsOverFlow={setIsOverFlow}
                    deleteLoading={importLoading}
                    errors={
                        <span className={`${systemError} ? "visible" : "invisible"`}>
                            {systemError && `${errorMessages.E_SYSTEM_01}`}
                            {alreadyDeletedErrorMessage && `${alreadyDeletedErrorMessage}`}
                        </span>
                    }
                >
                    <div className="text-center mt-[1rem]">
                        <p>選択したデータをインポートします。</p>
                        <div className="text-orange-500 mt-[1rem]">実行した処理は取り消しできません。</div>
                    </div>
                </DialogModal>
            )}
        </>
    );
}
