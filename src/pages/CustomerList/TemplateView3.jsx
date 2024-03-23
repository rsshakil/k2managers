/* Template View 3 Unreserved / Uncancelled Information */
import React from 'react';
import { CgFileDocument, CgShapeCircle } from 'react-icons/cg';
import { GoMail } from 'react-icons/go';
import { IoMdClose } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import UseTable from '../../components/Table/UseTable';
import { checkNumberLength, numberWithHiphen } from '../../lib/concate';
import { UnixTsToStringYYMMDD } from '../../lib/unixTsToString';

// GLOBAL DECLARATION START
const headerCells = [
    { label: 'ユーザーID', width: '9.875rem' },
    { label: '予約ID', width: '9.875rem' },
    { label: '記号', width: '5.875rem' },
    { label: '生年月日', width: '8rem' },
    { label: '番', width: '2rem' },
    { label: '姓', width: '5.875rem' },
    { label: '名', width: '5.875rem' },
    { label: 'セイ', width: '5.875rem' },
    { label: 'メイ', width: '5.875rem' },
    { label: '性', width: '2rem' },
    { label: '〒', width: '5.875rem' },
    { label: '住所', minWidth: '31.4375rem' },
    { label: '送付先住所', minWidth: '31.875rem' },
    { label: 'TEL', width: '8.125rem' },
    { label: 'log', width: '2rem' },
    {
        iconLabel: <GoMail className="inline-block text-blue-100 h-[1.5rem] w-[1.5rem]" />,
        width: '2rem',
    },
    {
        iconLabel: <IoMdClose className="inline-block text-orange-300 h-[1.5rem] w-[1.5rem]" />,
        width: '2rem',
    },
];
// GLOBAL DECLARATION END

export default function TemplateView2({ objProps: { customers, setEmailModal, setIsOverFlow, setSelectedRow } }) {
    const { TblContainer, TblHead } = UseTable(headerCells);

    const navigate = useNavigate();
    const checkGender = (itemNumber) => {
        return itemNumber === 1 ? '男' : '女';
    };

    const isOpenModal = (reservationNo) => {
        setSelectedRow(reservationNo);
        setEmailModal(true);
        setIsOverFlow(true);
    };
    const ENDPOINT =
        process.env.NODE_ENV !== 'production'
            ? process.env.REACT_APP_CUTOMER_SITE_URL_LOCALHOST
            : process.env.REACT_APP_CUTOMER_SITE_URL_PRODUCTION;

    return (
        <>
            <TblContainer className="!table-auto min-w-[2320px]">
                <TblHead />
                <tbody className="h-[calc(100vh_-_212px)] tbody-vertical-scroll">
                    {customers &&
                        customers.map((customer, index) => (
                            <tr key={index} className="h-10 table-row-bg row-display text-left align-middle">
                                <td className="w-[9.875rem] right-border text-right pr-2">
                                    {customer.reservationNo && customer.reservationNo}
                                </td>
                                <td className="w-[5.875rem] right-border text-right pr-2">
                                    {customer.insuranceSymbol && customer.insuranceSymbol}
                                </td>
                                <td className="w-[8rem] right-border text-center">
                                    {customer.birthdayDatetime && UnixTsToStringYYMMDD(customer.birthdayDatetime)}
                                </td>
                                <td className="w-[2rem] right-border text-center">
                                    {customer.insuranceNo && customer.insuranceNo}
                                </td>
                                <td className="w-[5.875rem] right-border pl-2 max-w-[5.875rem] ellipsis">
                                    {customer.historyLastName && customer.historyLastName}
                                </td>
                                <td className="w-[5.875rem] right-border pl-2 max-w-[5.875rem] ellipsis">
                                    {customer.historyFirstName && customer.historyFirstName}
                                </td>
                                <td className="w-[5.875rem] right-border pl-2 max-w-[5.875rem] ellipsis">
                                    {customer.historyLastNameKana && customer.historyLastNameKana}
                                </td>
                                <td className="w-[5.875rem] right-border pl-2 max-w-[5.875rem] ellipsis">
                                    {customer.historyFirstNameKana && customer.historyFirstNameKana}
                                </td>
                                <td className="w-[2rem] right-border text-center">
                                    {customer.historyGender && checkGender(customer.historyGender)}
                                </td>
                                <td className="w-[5.875rem] right-border text-center">
                                    {customer.historyZipcode && numberWithHiphen(customer.historyZipcode, 8)}
                                </td>
                                <td className="min-w-[31.4375rem] right-border text-left pl-2 ellipsis max-w-0">
                                    {customer.historyPrefecture && customer.historyPrefecture}
                                    {customer.historyCityName && customer.historyCityName}
                                    {customer.historyTownName && customer.historyTownName}
                                    {customer.historyAddressName && customer.historyAddressName}
                                    {customer.historyBuilding && customer.historyBuilding}
                                </td>
                                <td className="min-w-[31.875rem] right-border text-left pl-2 ellipsis max-w-0">
                                    {customer.historyPrefecture && customer.historyPrefecture}
                                    {customer.historyCityName && customer.historyCityName}
                                    {customer.historyTownName && customer.historyTownName}
                                    {customer.historyAddressName && customer.historyAddressName}
                                    {customer.historyBuilding && customer.historyBuilding}
                                </td>
                                <td className="w-[8.125rem] right-border pr-2 text-right">
                                    {customer.historyTelNo && checkNumberLength(customer.historyTelNo, 11)}
                                </td>
                                <td
                                    className="w-[2rem] right-border text-center cursor-pointer"
                                    // onClick={()=>navigate("*")} //Do not go anywhere customer list TemplateView-3
                                >
                                    <CgFileDocument className="inline-block text-blue-100 h-[1.5rem] w-[1.5rem] hover:text-blue-50" />
                                </td>
                                <td
                                    className={`w-[2rem] right-border text-center${
                                        customer.historyEmailAddress && customer.reservationStatus === 1
                                            ? ' cursor-pointer'
                                            : ''
                                    }`}
                                    // onClick={() => isOpenModal(customer.reservationNo)}

                                    onClick={() => {
                                        customer.historyEmailAddress &&
                                            customer.reservationStatus === 1 &&
                                            isOpenModal(customer.reservationNo);
                                    }}
                                >
                                    {customer.historyEmailAddress &&
                                        (customer.reservationStatus === 1 ? (
                                            <GoMail className="inline-block text-blue-100 h-[1.5rem] w-[1.5rem] hover:text-blue-50" />
                                        ) : null)}
                                </td>
                                <td className="w-[2rem] right-border text-center">
                                    {customer.reservationStatus &&
                                        (customer.reservationStatus === 1 ? (
                                            <CgShapeCircle className="inline-block h-[1.5rem] w-[1.5rem] text-green-500" />
                                        ) : customer.reservationStatus === 0 ? (
                                            <IoMdClose className="inline-block h-[1.5rem] w-[1.5rem] text-orange-300 " />
                                        ) : (
                                            ''
                                        ))}
                                </td>
                            </tr>
                        ))}
                </tbody>
            </TblContainer>
        </>
    );
}
