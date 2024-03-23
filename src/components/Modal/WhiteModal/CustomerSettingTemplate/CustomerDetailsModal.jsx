import React, { useEffect, useState } from 'react';
import UseTable from '../../../Table/UseTable';
import FormBodyContainer from '../../../Wrapper/FormBodyContainer';
import ModalTitle from '../../components/ModalTitle';
import WhiteModalWrapper from '../../components/WhiteModalWrapper';
import Button from '../../../Button/Button';
import moment from 'moment/moment';
import _ from 'lodash';

const headerCells = [{ label: '項目', width: '15rem' }, { label: '内容' }];

const headerCells2 = [
    { label: 'フィールド', width: '15rem' },
    { label: '変更前', width: '35.375rem' },
    { label: '変更後' },
];

export default function CustomerDetailsModal({ handleCancel, customerDetailsData }) {
    const { TblContainer, TblHead } = UseTable(headerCells);
    const tableLayout = UseTable(headerCells2);
    const [rowCellsData, setRowCellsData] = useState([]);
    const [logData, setLogData] = useState([]);

    useEffect(() => {
        setRowCellsData([
            { item: '操作日時', content: moment.unix(customerDetailsData?.logDateTime).format('YYYY/MM/DD HH:mm') },
            { item: 'アカウントID', content: customerDetailsData?.accountId },
            { item: 'IPアドレス', content: customerDetailsData?.ipAddress },
            { item: '操作場所', content: customerDetailsData?._target },
            { item: '操作内容', content: customerDetailsData?._type },
            { item: '操作結果', content: customerDetailsData?._result },
            { item: 'ロググループ名', content: customerDetailsData?.logGroupName  },
            { item: 'ログストリーム名', content: customerDetailsData?.logStreamName  },
        ]);

        if (typeof customerDetailsData.logData !== 'undefined') {
            let logDataParse = JSON.parse(customerDetailsData.logData);
            if (logDataParse !== null) {
                setLogData(logDataParse);
            }
        }
    }, [customerDetailsData]);

    // CELL TEXT START
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
    // CELL TEXT END

    return (
        <>
            <WhiteModalWrapper width="border-none text-black" className="items-start">
                <ModalTitle className="text-blue-100 bold text-xl" title={'顧客操作ログ'} />
                <div className="relative w-full h-full overlay">
                    <FormBodyContainer className="!p-0">
                        <div className="table-wrapper">
                            <TblContainer className="!table-auto min-w-[1372px]">
                                <TblHead />
                                <tbody>
                                    {rowCellsData &&
                                        rowCellsData.map((item, index) => (
                                            <tr className="h-8 table-row-bg row-display" key={index}>
                                                <td className="w-[15rem] right-border px-2">{item.item}</td>
                                                <td className="right-border px-2 ellipsis max-w-0">{item.content}</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </TblContainer>
                        </div>

                        { logData?.length > 0 && (
                            <div className="table-wrapper mt-16">
                                <TblContainer className="!table-auto min-w-[1372px]">
                                    <tableLayout.TblHead />
                                    <tbody> 
                                        {logData &&
                                            !_.isEmpty(logData) &&
                                            logData.map((item, index) => (
                                                <tr className="h-8 table-row-bg row-display" key={index}>
                                                    <td className="min-w-[15rem] w-[15rem] right-border px-2 whitespace-pre-wrap break-all">
                                                        {cellText(item.fieldName)}
                                                    </td>
                                                    <td className="max-w-[35.375rem] w-[35.375rem] right-border px-2 whitespace-pre-wrap break-all">
                                                        {cellText(item.beforeValue)}
                                                    </td>
                                                    <td className="min-w-[35.375rem] right-border px-2 whitespace-pre-wrap break-all">
                                                    {cellText(item.afterValue)}
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </TblContainer>
                            </div>
                        )}
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
        </>
    );
}
