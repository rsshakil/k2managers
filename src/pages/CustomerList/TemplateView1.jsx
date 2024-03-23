/* Template View 1 User Information  */
import React from 'react';
import { CgFileDocument, CgShapeCircle } from 'react-icons/cg';
import { GoMail } from 'react-icons/go';
import { IoMdClose } from 'react-icons/io';
import UseTable from '../../components/Table/UseTable';
import { checkNumberLength, numberWithCommas, numberWithHiphen } from '../../lib/concate';
import { UnixTsToString, UnixTsToStringHM, UnixTsToStringMD, UnixTsToStringYYMMDD } from '../../lib/unixTsToString';

// GLOBAL DECLARATION START
const headerCells = [
    { label: 'ユーザーID', width: '9.875rem' },
    { label: '予約ID', width: '9.875rem' },
    { label: '記号', width: '5.875rem' },
    { label: '番', width: '2rem' },
    { label: '姓', width: '5.875rem' },
    { label: '名', width: '5.875rem' },
    { label: 'セイ', width: '5.875rem' },
    { label: 'メイ', width: '5.875rem' },
    { label: '性', width: '2rem' },
    { label: '生年月日', width: '8rem' },
    { label: '〒', width: '5.875rem' },
    { label: '住所', minWidth: '31.4375rem' },
    { label: '送付先住所', minWidth: '31rem' },
    { label: 'TEL', width: '8.125rem' },
    { label: '検診施設', minWidth: '22.625rem' },
    { label: '健診日', width: '8rem' },
    { label: '健診時間', width: '5.25rem' },
    { label: '負担額', width: '4.875rem' },
    { label: '予約日時', width: '10.375rem' },
    { label: '取消日時', width: '10.375rem' },
    { label: '予約者', width: '3.9375rem' },
    { label: '取消者', width: '3.9375rem' },
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

export default function TemplateView1({ objProps: { customers, setEmailModal, setIsOverFlow, setSelectedRow } }) {
    const { TblContainer, TblHead } = UseTable(headerCells);
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
            <TblContainer className="!table-auto min-w-[3456px]">
                <TblHead />
                <tbody className="h-[calc(100vh-212px)] tbody-vertical-scroll">
                    {customers &&
                        customers.map((customer, index) => (
                            <tr key={index} className="h-10 table-row-bg row-display text-left align-middle">
                                <td className="w-[9.875rem] right-border text-right pr-2">
                                    {customer.reservationNo && customer.reservationNo}
                                </td>
                                <td className="w-[5.875rem] right-border text-right pr-2">
                                    {customer.insuranceSymbol && customer.insuranceSymbol}
                                </td>
                                <td className="w-[2rem] right-border text-right pr-2">
                                    {customer.insuranceNo && customer.insuranceNo}
                                </td>
                                <td className="w-[5.875rem] max-w-[5.875rem] ellipsis right-border pl-2">
                                    {customer.historyLastName && customer.historyLastName}
                                </td>
                                <td className="w-[5.875rem] max-w-[5.875rem] ellipsis right-border pl-2">
                                    {customer.historyFirstName && customer.historyFirstName}
                                </td>
                                <td className="w-[5.875rem] max-w-[5.875rem] ellipsis right-border pl-2">
                                    {customer.historyLastNameKana && customer.historyLastNameKana}
                                </td>
                                <td className="w-[5.875rem] max-w-[5.875rem] ellipsis right-border pl-2">
                                    {customer.historyFirstNameKana && customer.historyFirstNameKana}
                                </td>
                                <td className="w-[2rem] right-border text-center">
                                    {customer.historyGender && checkGender(customer.historyGender)}
                                </td>
                                <td className="w-[8rem] right-border text-center">
                                    {customer.birthdayDatetime && UnixTsToStringYYMMDD(customer.birthdayDatetime)}
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
                                <td className="min-w-[31rem] right-border text-left pl-2 ellipsis max-w-0">
                                    {customer.historyPrefecture && customer.historyPrefecture}
                                    {customer.historyCityName && customer.historyCityName}
                                    {customer.historyTownName && customer.historyTownName}
                                    {customer.historyAddressName && customer.historyAddressName}
                                    {customer.historyBuilding && customer.historyBuilding}
                                </td>
                                <td className="w-[8.125rem] right-border pr-2 text-right">
                                    {customer.historyTelNo && checkNumberLength(customer.historyTelNo, 11)}
                                </td>
                                <td className="min-w-[22.625rem] right-border text-left pl-2 ellipsis max-w-0">
                                    {customer.historyInstituteName && customer.historyInstituteName}
                                </td>
                                <td className="w-[8rem] right-border text-center">
                                    {customer.reservationReceiveDatetime &&
                                        UnixTsToStringMD(customer.reservationReceiveDatetime)}
                                </td>
                                <td className="w-[5.25rem] right-border text-center">
                                    {customer.reservationReceiveDatetime &&
                                        UnixTsToStringHM(customer.reservationReceiveDatetime)}
                                </td>
                                <td className="w-[4.875rem] right-border text-right pr-2">
                                    {customer.selfPaymentAmount && numberWithCommas(customer.selfPaymentAmount, 7)}
                                </td>
                                <td className="w-[10.375rem] right-border text-center">
                                    {customer.reservationDatetime && UnixTsToString(customer.reservationDatetime)}
                                </td>
                                <td className="w-[10.375rem] right-border text-center">
                                    {customer.cancelDatetime && UnixTsToString(customer.cancelDatetime)}
                                </td>
                                <td className="w-[3.9375rem] right-border text-left pl-2">
                                    {customer.createdBy && customer.createdBy.substr(0, 4)}
                                </td>
                                <td className="w-[3.9375rem] right-border text-left pl-2">
                                    {customer.updatedBy && customer.reservationStatus === 1
                                        ? customer.updatedBy.substr(0, 4)
                                        : null}
                                </td>

                                <td className="w-[2rem] right-border text-center cursor-pointer">
                                    <CgFileDocument className="inline-block text-blue-100 h-[1.5rem] w-[1.5rem] hover:text-blue-50" />
                                    {/* </Link>*/}
                                </td>
                                <td
                                    className={`w-[2rem] right-border hover:text-blue-50 text-center${
                                        customer.historyEmailAddress && customer.reservationStatus === 1
                                            ? ' cursor-pointer'
                                            : ''
                                    }`}
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
