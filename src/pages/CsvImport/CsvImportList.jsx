import React, { useEffect, useState } from 'react';
import { RiRefreshLine } from 'react-icons/ri';
import { useLocation, useNavigate } from 'react-router-dom';
import OutlineButtonLinkContainer from '../../components/Button/OutlineButtonLinkContainer';
import Footer from '../../components/Footer/Footer';
import Loading from '../../components/Loading/Loader';
import PaginationSearchParams from '../../components/Pagination/PaginationSearchParams';
import AddButton from '../../components/Table/FooterSection/AddButton';
import TableControls from '../../components/Table/TableControls';
import UseTable from '../../components/Table/UseTable';
import { SessionStorageOnReload } from '../../helper/browserSessionStorage/SessionStorageOnReload';
import { FilterComMethods } from '../../helper/functions/FilterComMethods';
import { ItemData } from '../../utilities/projectBtnItemData';
import CsvImportListTd from './CsvImportListTd';

import { listCsvImport } from '../../restapi/queries';

// GLOBAL DECLARATION START
const headerCells = [
    { label: 'インポートファイル名 ', minWidth: '19rem' },
    { label: 'インポートテンプレート設定名', minWidth: '19rem' },
    { label: 'ステータス', width: '10.375rem' },
    { label: 'インポート実行完了日時', width: '12rem' },
    { label: 'インポート件数', width: '10.375rem' },
    { label: 'ダウンロード', width: '8rem' },
    { label: '削除', width: '8rem' },
];
export default function CsvImportList() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [loading, setLoading] = useState(false);
    const [iconLoading, setIconLoading] = useState(false);
    const [_deleteModal, setDeleteModal] = useState(false);
    const [csvImportList, setCsvImportList] = useState([]);
    const [numberOfRecords, setNumberOfRecords] = useState(0);
    const { TblContainer, TblHead } = UseTable(headerCells);
    const { getInitialState, fetchSessionStorageData } = SessionStorageOnReload();
    const initializeValue = { pid: sessionStorage.getItem('currentProjectId') };
    const [pageNumber, setPageNumber] = useState(+sessionStorage.getItem(`pagination_pageNo`) || 0);
    // const { searchParamsValues } = getInitialState(pathname);
    // const { searchParams, setValues } = FilterComMethods(initializeValue);
    // useEffect(() => {
    //     fetchSessionStorageData(pathname, 'listCsvImport', setValues, initializeValue); // Get searchParams from localStorage and set it to filter section
    // }, []);
    
    const handleDownload = () => {};
    const handleIconLoading = () => {
        console.log("handleIconLoading");
        navigate('/csv_import_list');
        setIconLoading(true);
        setTimeout(() => {
            setIconLoading(false);
        }, 1500);
    };

    const [searchDBParams, setSearchDBParams] = useState(initializeValue);
    
    return (
        <>
            {loading && <Loading />}
            <OutlineButtonLinkContainer ItemData={ItemData} />
            <div className="px-4">
                {/* Filter section  */}
                <TableControls.UpperSection>
                    <TableControls.NumberOfRecords recordsLabel={'CSVインポート'} numberOfRecords={numberOfRecords} />
                    <div className="flex justify-between">
                        <div>
                            <button
                                className="h-7 cursor-pointer hover:bg-blue-300 align-middle items-center px-2
                        font-bold bg-blue-100 w-[32px] ml-4 flex text-white justify-between "
                                onClick={() => handleIconLoading()}
                            >
                                <RiRefreshLine className={`${iconLoading && 'animate-spin'}`} />
                            </button>
                        </div>
                    </div>
                </TableControls.UpperSection>

                {/* Table Section  */}
                <div className="table-wrapper">
                    <TblContainer>
                        <TblHead />
                        <tbody className="tbody-height206p tbody-vertical-scroll">
                            {csvImportList &&
                                csvImportList.map((csvImport, index) => (
                                    <tr key={index} className="h-8 table-row-bg row-display text-left">
                                        <CsvImportListTd info={{ csvImport, handleDownload, setDeleteModal }} handleIconLoading={handleIconLoading} />
                                    </tr>
                                ))}
                        </tbody>
                    </TblContainer>
                </div>

                {/* Pagination Section  */}
                <Footer>
                    {/* {typeof searchDBParams === 'string' && ( */}
                        <PaginationSearchParams
                            itemsPerPage={300}
                            records={csvImportList}
                            setRecords={setCsvImportList}
                            setLoading={setLoading}
                            endPoint={listCsvImport}
                            setNumberOfRecords={setNumberOfRecords}
                            subQueryString={searchDBParams}
                            pageNumber={pageNumber}
                            setPageNumber={setPageNumber}
                        />
                    {/* )} */}
                    <div className="flex flex-col items-end">
                        <AddButton text="CSVインポート" onClick={() => navigate('/csv_import_setting')} />
                    </div>
                </Footer>
            </div>
        </>
    );
}
