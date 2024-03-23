import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { IoTrashOutline } from 'react-icons/io5';
import { RiDownloadLine } from 'react-icons/ri';
import CustomToolTip from '../../components/Tooltip/CustomReactToolTips/CustomToolTip';
import { baseURL, csvImportDeleteList, csvImportDownload, deleteMethod, listMethod } from '../../restapi/queries';
import { instance } from '../../services/axios';
import { getErrorMessageWithErrorCode } from '../../lib/getErrorMessageWithErrorCode';
import DialogModal from '../../components/Modal/DialogModal';
import { errorMessages } from '../../lib/errorMessages';

// export default function CsvImportListTd({ info: { csvImport, handleDownload, setDeleteModal } }) {
export default function CsvImportListTd({ info: { csvImport, setIsOverFlow, setNumberOfRecords, numberOfRecords, setCsvList }, handleIconLoading }) {
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
    const csvImport_delete_id = sessionStorage.getItem('csvImport_delete_id');
    const projectId = sessionStorage.getItem('currentProjectId');
    try {
      const ENDPOINT = `${baseURL}${csvImportDeleteList}${csvImport_delete_id}?pid=${projectId}`; //?pid=${projectId}}
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
        sessionStorage.removeItem('csvImport_delete_id');
        handleIconLoading()
      }
      // count number and csv list remove data from state
      setNumberOfRecords(numberOfRecords - 1);
      setCsvList((s) => s.filter((ele, index) => ele.csvId != csvImport_delete_id));
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
    sessionStorage.removeItem('csvImport_delete_id');
  };

  const handleDownload = async (csvImportId, csvImportFileName) => {

    setLoading(true);
    try {
      const projectId = window.sessionStorage.getItem('currentProjectId');
      const ENDPOINT = `${baseURL}${csvImportDownload}${csvImportId}?pid=${projectId}&aid=${info.accountId}`;
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
            const fh = await window.showSaveFilePicker({ suggestedName: csvImportFileName });
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

  const handleDeleteClicked = (csvImportId) => {
    setDeleteModal(true);
    sessionStorage.setItem(
      "csvImport_delete_id",
      csvImportId
    );
  }

  return (
    <>
      <td className="min-w-[19rem] px-2 right-border text-left max-w-0">
        {/* <ReactTooltipSpan dataText={csvImport?.csvImportFileName} /> */}
        <CustomToolTip tooltipContent={<>{csvImport?.csvImportFileName}</>}>
          {csvImport?.csvImportFileName}
        </CustomToolTip>
      </td>
      <td className="min-w-[19rem] px-2 right-border text-left max-w-0">
        {/* <ReactTooltipSpan dataText={csvImport?.csvImportTemplateName} /> */}
        <CustomToolTip
          tooltipContent={<>{csvImport?.csvImportTemplateName}</>}
        >
          {csvImport?.csvImportTemplateName}
        </CustomToolTip>
      </td>
      <td
        className={`w-[10.375rem] px-2 right-border text-center ${csvImport?.csvImportStatus == 3 ? "text-red-600" : ""
          }`}
      >
        {csvImport?.importStatus}
      </td>
      <td className="w-[12rem] px-2 right-border text-center">
        {csvImport?.csvImportExecDate}
      </td>
      <td className="w-[10.375rem] px-2 right-border text-right">
        {csvImport?.csvImportDataCount}
      </td>
      <td
        className={`w-[8rem] right-border text-center ${csvImport?.csvImportDelFlag == 0 ? "cursor-pointer" : ""
          } !hover:text-blue-50`}
        onClick={() => {
          if (csvImport?.csvImportDelFlag == 0) {
            handleDownload(
              csvImport.csvImportId,
              csvImport.csvImportFileName
            )
          }
        }
        }
      >
        {csvImport?.csvImportDelFlag == 0 ? (
          <RiDownloadLine
            // onClick={() =>
            //   handleDownload(
            //     csvImport.csvImportId,
            //     csvImport.csvImportFileName
            //   )
            // }
            className="inline-block text-blue-100 h-[1.5rem] w-[1.5rem] hover:text-blue-50"
          />
        ) : (
          <div className="inline-block text-blue-100 h-[1.5rem] w-[1.5rem] hover:text-blue-50"></div>
        )}
      </td>
      <td
        className={`w-[8rem] right-border text-center ${csvImport?.csvImportDelFlag == 0
          ? "cursor-pointer"
          : "cursor-default pointer-events-none"
          } !hover:text-blue-50`}
        onClick={() =>
          csvImport?.csvImportDelFlag == 0 &&
          handleDeleteClicked(csvImport?.csvImportId)
        }
      >
        {csvImport?.csvImportDelFlag == 0 ? (
          <IoTrashOutline className="inline-block text-blue-100 h-[1.5rem] w-[1.5rem] hover:text-blue-50" />
        ) : (
          <div className="inline-block text-blue-100 pointer-events-none hover:text-blue-50">
            削除済み
          </div>
        )}
      </td>
      {
        deleteModal && (
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
              <div className="text-orange-500 mt-[1rem]">
                削除したデータは復元できません。
              </div>
            </div>
          </DialogModal>
        )
      }
    </>
  );
}
