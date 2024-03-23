import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import Button from "../../../Button/Button";
import Loading from "../../../Loading/Loader";
import UseTable from "../../../Table/UseTable";
import FormBodyContainer from "../../../Wrapper/FormBodyContainer";
import ModalTitle from "../../components/ModalTitle";
import WhiteModalWrapper from "../../components/WhiteModalWrapper";

const headerCells = [
    { label: '項目', width: '15rem' },
    { label: '内容' },
];

const headerCells2 = [
    { label: 'フィールド', width: '15rem' },
    { label: '変更前', width: '35.375rem' },
    { label: '変更後' },
];

const LogDetailsModal = ({handleCancel, logDetailsData, load}) => {
    const { TblContainer, TblHead } = UseTable(headerCells);
    const tableLayout = UseTable(headerCells2);
    const [ rowCellsData, setRowCellsData ] = useState([]);
    const [ logData, setLogData ] = useState([]);

    useEffect(() => {
        setRowCellsData([
            { item: '日時', content: logDetailsData.logDateTime ? moment.unix(logDetailsData.logDateTime).format('YYYY/MM/DD HH:mm') : '' },
            { item: 'アカウントID', content: logDetailsData.accountId },
            { item: 'IPアドレス', content: logDetailsData.ipAddress },
            { item: '実行場所', content: logDetailsData._target },
            { item: '実行内容', content: logDetailsData._type },
            { item: '実行結果', content: logDetailsData._result },
            { item: 'ロググループ名', content: logDetailsData.logGroupName },
            { item: 'ログストリーム名', content: logDetailsData.logStreamName },
        ]);

        if (typeof logDetailsData.logData !== 'undefined') {
            let logDataParse = JSON.parse(logDetailsData.logData); 
            if (logDataParse !== null) {
                setLogData(logDataParse);
            }
        }
    }, [logDetailsData])

    const cellText = (itemText) => {
      let temp_ItemText = itemText;
      if (temp_ItemText == null) {
        temp_ItemText = "";
      } else if (typeof temp_ItemText === "string" && (temp_ItemText.charAt(0) === "[" || temp_ItemText.charAt(0) === "{")) {
        try {
          temp_ItemText = JSON.parse(temp_ItemText);
        } catch (error) {
          // nop
        }
      }

      const jsonObjectData =
        temp_ItemText && JSON.stringify(temp_ItemText, undefined, 2);

      return typeof temp_ItemText === "string" ? temp_ItemText : jsonObjectData;
    };

    return (
        <>
            {load ? (
                <Loading />
            ) : (
            <WhiteModalWrapper width="border-none text-black" className="items-start">
                <ModalTitle
                    className="text-blue-100 bold text-xl"
                    title={"操作ログ"}
                />
                    <div className="relative w-full h-full overlay">
                            <FormBodyContainer className="!p-0">
                                <div className="table-wrapper">
                                    <TblContainer className="!table-auto min-w-[1372px]">
                                        <TblHead />
                                        <tbody>
                                        {rowCellsData && rowCellsData.map((item, index) => (
                                            <tr className="h-8 table-row-bg row-display" key={index}>
                                                <td className="w-[15rem] right-border px-2">
                                                    { item.item }
                                                </td>
                                                <td className={`right-border px-2 ellipsis max-w-0 ${item.content === "失敗" && "text-orange-300"}`} >
                                                    { item.content }
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </TblContainer>
                                </div>

                                { logData.length > 0 && <div className="table-wrapper mt-16">
                                    <TblContainer className="!table-auto min-w-[1372px]">
                                        <tableLayout.TblHead />
                                        <tbody>
                                            {logData && logData.map((item, index) => (
                                                <tr className="h-8 table-row-bg row-display" key={index}>
                                                    <td className="max-w-[15rem] w-[15rem] right-border px-2 whitespace-pre-wrap break-all">
                                                        {/* { typeof item.fieldName === 'string' ? item.fieldName : JSON.stringify(item.fieldName, undefined, 2) } */}
                                                        {cellText(item?.fieldName)}
                                                    </td>
                                                    <td className="max-w-[35.375rem] w-[35.375rem] right-border px-2 whitespace-pre-wrap break-all">
                                                        {cellText(item?.beforeValue)}
                                                    </td>
                                                    <td className="min-w-[35.375rem] right-border px-2 whitespace-pre-wrap break-all">
                                                         {cellText(item?.afterValue)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </TblContainer>
                                </div>
                                }
                            </FormBodyContainer>
                            <div>
                                <div className="">
                                    <Button
                                        title="閉じる"
                                        className="bg-blue-100 mt-10"
                                        hoverColorType="hover:bg-blue-300"
                                        type="button"
                                        onClick={handleCancel}
                                    />
                                </div>
                            </div>
                    </div>
            </WhiteModalWrapper>
            )}
        </>
    )
}
export default LogDetailsModal