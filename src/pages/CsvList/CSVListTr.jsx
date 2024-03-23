import React, { useRef, useState } from 'react';
import { RiDownloadLine } from 'react-icons/ri';
import { IoTrashOutline } from 'react-icons/io5';
import ReactTooltip from 'react-tooltip';
import useOverLayTooltips from '../../hooks/useOverLayTooltips';
import { UnixTsToString, UnixTsToStringYYMMDD } from '../../lib/unixTsToString';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DialogModal from '../../components/Modal/DialogModal';
import { errorMessages } from '../../lib/errorMessages';
import { baseURL, csvExportDeleteList, csvExportDownload, deleteMethod, listMethod } from '../../restapi/queries';
import { instance } from '../../services/axios';
import { getErrorMessageWithErrorCode } from '../../lib/getErrorMessageWithErrorCode';
import Loading from '../../components/Loading/Loader';
import CustomToolTip from '../../components/Tooltip/CustomReactToolTips/CustomToolTip';

export default function CSVListTr({ info: { csv, setIsOverFlow, setNumberOfRecords, numberOfRecords, setCsvList } }) {
    const role = useSelector((state) => state.auth.role);
    const { info } = useSelector((state) => state.auth);
    const processing = useRef(false);

    const [loading, setLoading] = useState(false);

    // delete and modal open close state
    const [deleteModal, setDeleteModal] = useState(false);
    const [systemError, setSystemError] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [alreadyDeletedErrorMessage, setAlreadyDeletedErrorMessage] = useState('');

    // handle delete csv
    const handleDeleteCSV = async () => {
        if (processing.current) return;
        processing.current = true;
        setDeleteLoading(true);
        setSystemError(false);
        const csv_delete_id = sessionStorage.getItem('csv_delete_id');
        const projectId = sessionStorage.getItem('currentProjectId');
        try {
            const ENDPOINT = `${baseURL}${csvExportDeleteList}${csv_delete_id}?pid=${projectId}`; //?pid=${projectId}}
            const config = {
                method: deleteMethod,
                url: ENDPOINT,
                data: {
                    deletedBy: info.accountId,
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            };
            const deleted = await instance.request(config);
            if (deleted) {
                // if delete is successful
                setSystemError(false);
                setDeleteLoading(false);
                setDeleteModal(false);
                sessionStorage.removeItem('csv_delete_id');
            }
            // count number and csv list remove data from state
            setNumberOfRecords(numberOfRecords - 1);
            setCsvList((s) => s.filter((ele, index) => ele.csvId != csv_delete_id));
        } catch (error) {
            if (error.response.status === 400) {
                const matchErrorMessage = getErrorMessageWithErrorCode(error);
                setAlreadyDeletedErrorMessage(matchErrorMessage);
            } else {
                setSystemError(true);
            }
            setDeleteLoading(false);
        } finally {
            processing.current = false;
        }
    };

    const closeDeleteModal = () => {
        setDeleteModal(false);
        setSystemError(false);
        sessionStorage.removeItem('csv_delete_id');
    };

    const navigate = useNavigate();

    const handleDownload = async (id, csvName) => {
        setLoading(true);
        try {
            const projectId = window.sessionStorage.getItem('currentProjectId');
            const ENDPOINT = `${baseURL}${csvExportDownload}${id}?pid=${projectId}&aid=${info.accountId}`;
            const config = {
                method: listMethod,
                url: ENDPOINT,
                headers: {
                    Accept: 'application/zip',
                    Authorization: `Bearer ${localStorage.getItem('token')} `,
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
                            type: 'application/zip',
                        });
                        const fh = await window.showSaveFilePicker({ suggestedName: csvName + '.zip' });
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
                    return false;
                }
                setLoading(false);
            });
        } catch (error) {
            setLoading(false);
        }
    };

    return (
        <>
            <tr className="h-8 table-row-bg row-display text-left">
                {loading && <Loading />}
                {/* :: Edit Account :: */}
                <td className="min-w-[24.875rem] right-border pl-2 ellipsis max-w-0">
                    <CustomToolTip tooltipContent={<>{csv.csvName && csv.csvName}</>}>
                        {csv.csvName && csv.csvName}
                    </CustomToolTip>
                </td>
                <td className="w-[10.375rem] right-border text-center">
                    {csv.csvCreateDatetime && UnixTsToString(csv.csvCreateDatetime)}
                </td>
                <td className="w-[10.375rem] right-border text-center">
                    {csv.csvLastDownloadDatetime === 0 || csv.csvLastDownloadDatetime
                        ? UnixTsToString(csv.csvLastDownloadDatetime)
                        : ''}
                </td>
                <td className="w-[10.375rem] right-border text-center">
                    {csv.csvPath && (csv.csvDeletionDatetime === 0 || csv.csvDeletionDatetime) ? UnixTsToStringYYMMDD(csv.csvDeletionDatetime) : ''}
                </td>
                <td className="w-[8rem] right-border text-right">
                    <span className="pr-2">{(csv.csvDownloadCount && csv.csvPath) ? csv.csvDownloadCount : ''}</span>
                </td>
                <td className="w-[8rem] right-border text-right">
                    <span className="pr-2">{(csv.csvCount && csv.csvPath) ? csv.csvCount : ''}</span>
                </td>
                {/* {parseInt(role.r10) === 2 ? (
                    <></>
                ) : */}
                {csv.csvPath ? (
                    <td
                        className="w-[8rem] right-border text-center cursor-pointer !hover:text-blue-50"
                        onClick={() => handleDownload(csv.csvId, csv.csvName)}
                    >
                        <RiDownloadLine className="inline-block text-blue-100 h-[1.5rem] w-[1.5rem] hover:text-blue-50" />
                    </td>
                ) : (
                    <td className="w-[8rem] right-border text-center !hover:text-blue-50"></td>
                )}
                {csv.csvPath ? (
                    <td
                        className='w-[8rem] right-border text-center cursor-pointer !hover:text-blue-50'
                        onClick={() => {
                            setDeleteModal(true);
                            setSystemError(false);
                            setAlreadyDeletedErrorMessage('');
                            sessionStorage.setItem('csv_delete_id', csv.csvId);
                        }}
                    >
                        <IoTrashOutline className="inline-block text-blue-100 h-[1.5rem] w-[1.5rem] hover:text-blue-50" />
                    </td>
                ) : (
                    <td className={`w-[8rem] right-border text-center !hover:text-blue-50`}></td>
                )}
            </tr>

            {deleteModal && (
                <DialogModal
                    title="削除"
                    btn_title="CSV削除"
                    cancel_title="キャンセル "
                    handleButtonLeft={() => handleDeleteCSV()}
                    handleButtonRight={() => closeDeleteModal()}
                    setIsOverFlow={setIsOverFlow}
                    deleteLoading={deleteLoading}
                    errors={
                        <span className={`${systemError} ? "visible" : "invisible"`}>
                            {systemError && `${errorMessages.E_SYSTEM_01}`}
                            {alreadyDeletedErrorMessage && `${alreadyDeletedErrorMessage}`}
                        </span>
                    }
                >
                    <div className="text-center mt-[1rem]">
                        <p>選択したデータを削除します。</p>
                        <div className="text-orange-500 mt-[1rem]">削除したデータは復元できません。</div>
                    </div>
                </DialogModal>
            )}
        </>
    );
}
