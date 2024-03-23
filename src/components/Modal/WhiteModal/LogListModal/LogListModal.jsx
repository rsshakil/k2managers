import ModalTitle from "../../components/ModalTitle";
import FormBodyContainer from "../../../Wrapper/FormBodyContainer";
import Button from "../../../Button/Button";
import WhiteModalWrapper from "../../components/WhiteModalWrapper";
import React, {useState} from "react";
import {CgFileDocument} from "react-icons/cg";
import UseTable from "../../../Table/UseTable";
import {LogListData} from "./data"

const headerCells = [
    { label: '操作日時',width: '10.375rem' },
    { label: '操作場所', minWidth: '8rem' },
    { label: 'アカウントID', minWidth: '8rem' },
    { label: '氏名', minWidth: '23.625rem' },
    { label: '操作内容', minWidth: '30rem' },
    { label: '詳細', width: '2.5rem' },
];
const LogListModal = ({handleCancel}) => {
    const { TblContainer, TblHead } = UseTable(headerCells);
    const [loglistData, setLoglistData]=useState(LogListData)
    return (
        <>
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
                                        <tbody className="">
                                        {loglistData &&
                                            loglistData.map((item, index) => (
                                                <tr key={index}
                                                    className="h-8 table-row-bg row-display"
                                                >
                                                    <td className="w-[10.375rem] text-center right-border px-2">
                                                        {item.date_time}
                                                    </td>
                                                    <td className="min-w-[8rem] right-border px-2 ellipsis max-w-0">
                                                        {item.operation_place}
                                                    </td>
                                                    <td className="min-w-[8rem] right-border px-2 ellipsis max-w-0">
                                                        {item.account_id}
                                                    </td>
                                                    <td className="min-w-[23.625rem] right-border px-2 ellipsis max-w-0">
                                                        {item.full_name}
                                                    </td>
                                                    <td className="min-w-[30rem] right-border px-2 ellipsis max-w-0">
                                                        {item.operation_place}
                                                    </td>
                                                    <td
                                                        className="w-[2.5rem] px-2 text-center cursor-pointer !hover:text-blue-50"
                                                    >
                                                        <CgFileDocument className="inline-block text-blue-100 h-[1.5rem] w-[1.5rem] hover:text-blue-50" />
                                                    </td>
                                                </tr>
                                            ))}
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
        </>
    )
}
export default LogListModal