import React, { useState } from 'react';
import UseTable from '../../../Table/UseTable';
import FormBodyContainer from '../../../Wrapper/FormBodyContainer';
import ModalTitle from '../../components/ModalTitle';
import WhiteModalWrapper from '../../components/WhiteModalWrapper';
import Button from '../../../Button/Button';
import { CgNotes } from 'react-icons/cg';
import CustomerDetailsModal from './CustomerDetailsModal';
import Loading from '../../../Loading/Loader';
import * as queries from '../../../../api/gql/queries';
import axios from 'axios';
import { UnixTsToStringYYMMDD_HHMMSS } from '../../../../lib/unixTsToString';
import CustomToolTip from "../../../../components/Tooltip/CustomReactToolTips/CustomToolTip";

const headerCells = [
    { label: '操作日時', width: '11.25rem' },
    { label: '操作場所', width: '16.25rem' },
    { label: 'アカウントID', width: '16rem' },
    { label: '氏名', maxWidth: '11.25rem' },
    { label: '操作内容', width: '11.25rem' },
    { label: '実行結果', width: '7.25rem' },
    { label: '詳細', width: '3rem' },
];

export default function CustomerLogListModal({ handleCancel, customerLogListData=[] }) {
    const [loading, setLoading] = useState(false);
    const { TblContainer, TblHead } = UseTable(headerCells);
    const [customerDetailModal, setCustomerDetailModal] = useState(false);
    const [customerDetailLog, setCustomerDetailLog] = useState([]);

    const customerDetailList = (logId) => {
        try {
            // Calling api data
            setLoading(true);
            axios({
                url: process.env.REACT_APP_APPSYNC_API_URL,
                method: 'post',
                headers: { 'x-api-key': process.env.REACT_APP_APPSYNC_API_KEY },
                data: { query: queries.getLog, variables: { logId: logId } },
            })
                .then((res) => {
                    setCustomerDetailLog(res.data.data.getLog);
                    setLoading(false);
                })
                .catch((err) => {
                    setLoading(false);
                });
        } catch (err) {
            setLoading(false);
        }
        setCustomerDetailModal(true);
    };
  const getFullName = (logData) => {
    // console.log('logData',logData);
        let temp_LOG_DATA = logData,
            firstNameMatchWith = '予約者名（名）',
            lastNameMatchWith = '予約者名（姓）';

        try {
            temp_LOG_DATA =
                temp_LOG_DATA != null
                    ? typeof temp_LOG_DATA === 'string' && temp_LOG_DATA.charAt(0) === '['
                        ? JSON.parse(temp_LOG_DATA)
                        : JSON.parse(temp_LOG_DATA)
                    : '';

            if (Array.isArray(temp_LOG_DATA)) {
                const firstName = temp_LOG_DATA.find((item) => item.fieldName === firstNameMatchWith )?.beforeValue;
                const lastName = temp_LOG_DATA.find((item) => item.fieldName === lastNameMatchWith)?.beforeValue;
              // console.log('lastName ',  lastName); 
              // console.log('firstName ',  firstName); 
              // console.log('lastName typeOF', typeof lastName); 
              // console.log('firstName typeOF', typeof firstName); 
              let fullName = lastName ? lastName + '　' : ''
                fullName += firstName ? firstName : '';
                return fullName;
            } else {
                return '';
            }
        } catch (error) {
            console.warn('error: with JSON ', error);
            return '';
        }
    };
    let content =  null;
    content = logListContentTbody(customerLogListData, customerDetailList, getFullName)

    return (
        <>
            {loading && <Loading />}
            <WhiteModalWrapper width="border-none text-black" className="items-start">
                <ModalTitle className="text-blue-100 bold text-xl" title={'顧客操作ログ'} />
                <div className="relative w-full h-full overlay">
                    <FormBodyContainer className="!p-0">
                        <div className="table-wrapper">
                            <TblContainer className="!table-auto min-w-[1372px]">
                                <TblHead />
                                <tbody>
                                    {
                                        content
                                    }
                                </tbody>
                            </TblContainer>
                        </div>
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
            {customerDetailModal && (
                <CustomerDetailsModal
                    handleCancel={() => setCustomerDetailModal(false)}
                    customerDetailsData={customerDetailLog}
                />
            )}
        </>
    );
}



export function logListContentTbody(
  customerLogListData,
  customerDetailList,
  getFullName
) {
  let content = null;
  console.log('customerLogListData',customerLogListData);
  if (customerLogListData?.length > 0) {
    content =
      customerLogListData &&
      customerLogListData.map((item, index) => (
        <tr className="h-8 table-row-bg row-display" key={index}>
          <td className="w-[11.25rem] right-border px-2 text-center">
            {item?.logDateTime &&
              UnixTsToStringYYMMDD_HHMMSS(item?.logDateTime)}
          </td>
          <td className="right-border px-2 w-[16.25rem] ellipsis">
            {item?._target}
          </td>
          <td
            className={`right-border px-2 w-[16rem] ellipsis ${
              item?.accountId === "システム動作" && "text-green-50"
            }`}
          >
            {item?.accountId}
          </td>
          <td className="right-border px-2 max-w-[11.25rem] ellipsis">
            <div className="ellipsis">
              {getFullName(item?.logData)}
            </div>
          </td>
          <td className="right-border px-2 w-[11.25rem] ellipsis max-w-[11.25rem]">{item?._type}</td>
          <td
            className={`w-[7.25rem] right-border px-2 ${
              item?._result === "失敗" && "text-orange-300"
            }`}
          >
            {item?._result}
          </td>
          <td
            className="w-[3rem] right-border px-2 text-center cursor-pointer"
            onClick={() => customerDetailList(item?.logId)}
          >
            <CgNotes className="inline-block text-blue-100 h-[1.5rem] w-[1.5rem] hover:text-blue-50" />
          </td>
        </tr>
      ));
  }
  return content;
}