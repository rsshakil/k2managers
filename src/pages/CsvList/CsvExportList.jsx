import { getUnixTime } from 'date-fns';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import OutlineButtonLinkContainer from '../../components/Button/OutlineButtonLinkContainer';
import Footer from '../../components/Footer/Footer';
import Loading from '../../components/Loading/Loader';
import PaginationSearchParams from '../../components/Pagination/PaginationSearchParams';
import AddButton from '../../components/Table/FooterSection/AddButton';
import TableControls from '../../components/Table/TableControls';
import UseTable from '../../components/Table/UseTable';
import { listCsvExport } from '../../restapi/queries';
import { ItemData } from '../../utilities/projectBtnItemData';
import CsvExportSearch from './CsvExportSearch';
import CSVListTr from './CSVListTr';

const CsvExportList = () => {
    const role = useSelector((state) => state.auth.role);
    const headerCells =
            [
                  { label: 'エクスポートCSV ', minWidth: '24.875rem' }, //min-w-[40.875rem]
                  { label: '作成日時', width: '10.375rem' },
                  { label: '最終DL日時', width: '10.375rem' },
                  { label: '削除予定日', width: '10.375rem' },
                  { label: 'DL回数', width: '8rem' },
                  { label: '件数', width: '8rem' },
                  { label: 'ダウンロード', width: '8rem' },
                  { label: '削除', width: '8rem' },
            ];
    const navigate = useNavigate();
    const { TblContainer, TblHead } = UseTable(headerCells);
    const recordsLabel = 'CSV';
    const [csvList, setCsvList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [numberOfRecords, setNumberOfRecords] = useState(0);
    const [isOverFlow, setIsOverFlow] = useState(false);
    const [pageNumber, setPageNumber] = useState(+sessionStorage.getItem(`pagination_pageNo`) || 0);
    const retainedCSVList = JSON.parse(
        sessionStorage.getItem(`retained_csv_export_list_${sessionStorage.getItem('currentProjectId')} `)
    );
    const retainedCSVDATESEARCH = JSON.parse(
        sessionStorage.getItem(`retained_csv_export_list_date_search_${sessionStorage.getItem('currentProjectId')}`)
    );
    const initializeValue = {
        csvName: retainedCSVList?.csvName?retainedCSVList?.csvName:'',
        // csvCreateDateTimeFrom: retainedCSVList?.csvCreateDateTimeFrom?retainedCSVList?.csvCreateDateTimeFrom:'',
        // csvCreateDateTimeTo: retainedCSVList?.csvCreateDateTimeTo?retainedCSVList?.csvCreateDateTimeTo:'',
        csvCreateDateTimeFrom: (retainedCSVDATESEARCH?.from && getUnixTime(new Date(retainedCSVDATESEARCH.from))) || '',
        csvCreateDateTimeTo: (retainedCSVDATESEARCH?.to && getUnixTime(new Date(retainedCSVDATESEARCH.to))) || '',
    };

    const [searchDBParams, setSearchDBParams] = useState(new URLSearchParams(initializeValue)?.toString());

    return (
        <div className={`${isOverFlow && 'overflow-hidden'} `}>
            {loading && <Loading />}
            <OutlineButtonLinkContainer ItemData={ItemData} />
            <div className="px-4">
                {/* Filter section  */}
                <TableControls.UpperSection>
                    <TableControls.NumberOfRecords recordsLabel={recordsLabel} numberOfRecords={numberOfRecords} />

                    <div className="flex">
                        <CsvExportSearch
                            setSearchDBParams={setSearchDBParams}
                            setLoading={setLoading}
                            loading={loading}
                            setPageNumber={setPageNumber}
                        />
                    </div>
                </TableControls.UpperSection>

                {/* Table Section  */}
                <div className="table-wrapper">
                    <TblContainer>
                        <TblHead />
                        <tbody className="tbody-height206p tbody-vertical-scroll">
                            {csvList &&
                                csvList.map((csv, index) => (
                                    <CSVListTr
                                        key={index}
                                        info={{
                                            csv,
                                            setIsOverFlow,
                                            setNumberOfRecords,
                                            numberOfRecords,
                                            setCsvList,
                                        }}
                                    />
                                ))}
                        </tbody>
                    </TblContainer>
                </div>

                {/* Pagination Section  */}
                <Footer>
                    {typeof searchDBParams === 'string' && (
                        <PaginationSearchParams
                            itemsPerPage={300}
                            records={csvList}
                            setRecords={setCsvList}
                            setLoading={setLoading}
                            endPoint={listCsvExport}
                            setNumberOfRecords={setNumberOfRecords}
                            subQueryString={searchDBParams}
                            pageNumber={pageNumber}
                            setPageNumber={setPageNumber}
                        />
                    )}
                    <div className="flex flex-col items-end">
                        <AddButton text="CSV出力テンプレート設定" onClick={() => navigate('/csv_export_setting')} />
                    </div>
                </Footer>
            </div>
        </div>
    );
};

export default CsvExportList;
