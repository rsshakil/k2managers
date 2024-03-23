import React, { useState } from 'react';
import { CgFileDocument, CgShapeCircle } from 'react-icons/cg';
import { GoMail } from 'react-icons/go';
import { IoMdClose } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading/Loader';
import UseTable from '../../components/Table/UseTable';

import { useRef } from 'react';
import { checkNumberLength, numberWithCommas, numberWithHiphen } from '../../lib/concate';

import { UnixTsToString, UnixTsToStringYYMMDD } from '../../lib/unixTsToString';

// GLOBAL DECLARATION START
const headerCells = [
    { label: 'ユーザーID', width: '9.875rem' },
    { label: '予約ID', width: '9.875rem' },
    { label: '健診施設', minWidth: '22.625rem' },
    { label: '健診日', width: '8rem' },
    { label: '健診時間', width: '5.25rem' },
    { label: '姓', width: '5.875rem' },
    { label: '名', width: '5.875rem' },
    { label: 'セイ', width: '5.875rem' },
    { label: 'メイ', width: '5.875rem' },
    { label: '性', width: '2rem' },
    { label: '生年月日', width: '8rem' },
    { label: 'TEL', width: '8.125rem' },
    { label: '〒', width: '5.875rem' },
    { label: '住所', minWidth: '31.4375rem' },
    { label: '検診内容', minWidth: '31.4375rem' },
    { label: '負担額', width: '4.875rem' },
    { label: '記号', width: '5.875rem' },
    { label: '番', width: '2rem' },
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

export default function TemplateDefaultView({ objProps: { customers, setEmailModal, setIsOverFlow, setSelectedRow } }) {
    const { TblContainer, TblHead } = UseTable(headerCells);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const refs = useRef([]);
    refs.current = [];
    const addToRefs = (el) => {
        if (el && !refs.current.includes(el)) {
            refs.current.push(el);
        }
        if (refs.current.length === customers.length) {
            setLoading(false);
        }
    };

    // FUNCTION START
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
                    {loading && <Loading />}

                    {customers &&
                        customers.map((customer, index) => (
                            <tr
                                key={index}
                                className="h-10 table-row-bg row-display text-left align-middle"
                                ref={addToRefs}
                            >
                                <td className="w-[9.875rem] right-border text-right pr-2">
                                    {customer.reservationNo && customer.reservationNo}
                                </td>
                                <td className="min-w-[22.625rem] right-border text-left pl-2 ellipsis max-w-0">
                                    {customer.reservationEventInstituteName && customer.reservationEventInstituteName}
                                </td>
                                <td className="w-[8rem] right-border text-center">
                                    {customer.reservationReceiveDatetime &&
                                        UnixTsToStringYYMMDD(customer.reservationReceiveDatetime)}
                                </td>
                                <td className="w-[5.25rem] right-border text-center">
                                    {customer.reservationExecutionTime && customer.reservationExecutionTime}
                                </td>
                                <td className="w-[5.875rem] max-w-[5.875rem] ellipsis right-border pl-2">
                                    {customer.reservationLastName && customer.reservationLastName}
                                </td>
                                <td className="w-[5.875rem] max-w-[5.875rem] ellipsis right-border pl-2">
                                    {customer.reservationFirstName && customer.reservationFirstName}
                                </td>
                                <td className="w-[5.875rem] max-w-[5.875rem] ellipsis right-border pl-2">
                                    {customer.reservationLastNameKana && customer.reservationLastNameKana}
                                </td>
                                <td className="w-[5.875rem] max-w-[5.875rem] ellipsis right-border pl-2">
                                    {customer.reservationFirstNameKana && customer.reservationFirstNameKana}
                                </td>
                                <td className="w-[2rem] right-border text-center">{checkGender(customer.gender)}</td>
                                <td className="w-[8rem] right-border text-center">
                                    {customer.birthdayDatetime && UnixTsToStringYYMMDD(customer.birthdayDatetime)}
                                </td>
                                <td className="w-[8.125rem] right-border pr-2 text-right">
                                    {customer.reservationTelNo && checkNumberLength(customer.reservationTelNo, 11)}
                                </td>
                                <td className="w-[5.875rem] right-border text-center">
                                    {customer.reservationZipCode && numberWithHiphen(customer.reservationZipCode, 8)}
                                </td>
                                <td className="min-w-[31.4375rem] right-border text-left pl-2 ellipsis max-w-0">
                                    {customer.reservationPrefectureName && customer.reservationPrefectureName}
                                    {customer.reservationCityName && customer.reservationCityName}
                                    {customer.reservationTownName && customer.reservationTownName}
                                    {customer.reservationAddressName && customer.reservationAddressName}
                                    {customer.reservationBuilding && customer.reservationBuilding}
                                </td>
                                <td className="min-w-[31rem] right-border text-left pl-2 ellipsis max-w-0">
                                    {customer.reservationItemContents && customer.reservationItemContents}
                                </td>
                                <td className="w-[4.875rem] right-border text-right pr-2">
                                    {customer.reservationItemCost && numberWithCommas(customer.reservationItemCost, 7)}
                                </td>

                                <td className="w-[5.875rem] right-border text-right pr-2">
                                    {customer.insuredPersonSymbol && customer.insuredPersonSymbol}
                                </td>
                                <td className="w-[2rem] right-border text-center">
                                    {customer.insuredPersonNo && customer.insuredPersonNo}
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
                                    {customer.updatedBy && customer.reservationStatus === 2
                                        ? customer.updatedBy.substr(0, 4)
                                        : null}
                                </td>
                                <td className="w-[2rem] right-border text-center cursor-pointer hover:text-blue-50">
                                    <CgFileDocument className="inline-block hover:text-blue-50 text-blue-100 h-[1.5rem] w-[1.5rem]" />
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
