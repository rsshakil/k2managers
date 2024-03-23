import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import OutlineButtonLinkContainer from '../../components/Button/OutlineButtonLinkContainer';
import Footer from '../../components/Footer/Footer';
import Loading from '../../components/Loading/Loader';
import PaginationSearchParams from '../../components/Pagination/PaginationSearchParams';
import AddButton from '../../components/Table/FooterSection/AddButton';
import TableControls from '../../components/Table/TableControls';
import UseTable from '../../components/Table/UseTable';
import Container from '../../components/Wrapper/Container';
import { SessionStorageOnReload } from '../../helper/browserSessionStorage/SessionStorageOnReload';
import { listInstitute } from '../../restapi/queries';
import { ItemData } from '../../utilities/projectBtnItemData';
import InstituteListTr from './InstituteListTr';
import InstituteSearch from './InstituteSearch';

const headerCells = [
    { label: '施設名', width: '14.75rem' },
    { label: '施設管理名', width: '14.75rem' },
    { label: '郵便番号', width: '6.5rem' },
    { label: '住所', minWidth: '21.75rem' },
    { label: '電話番号', width: '9rem' },
    { label: '変更日時', width: '10.375rem' },
    { label: '作成日時', width: '10.375rem' },
];

const InstituteList = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); // make -- true -- after finish development
    const [isOverFlow] = useState(false);
    const [numberOfRecords, setNumberOfRecords] = useState(0);
    const { TblContainer, TblHead } = UseTable(headerCells);
    const [instituteList, setInstituteList] = useState([]);
    const { getInitialState } = SessionStorageOnReload();
    const { searchParamsValues } = getInitialState(pathname);
    const [searchParams, setSearchParams] = useState(searchParamsValues ? searchParamsValues : '');
    const [pageNumber, setPageNumber] = useState(+sessionStorage.getItem(`pagination_pageNo`) || 0);
    return (
        <div className={`${isOverFlow && 'overflow-hidden'} `}>
            {loading && <Loading />}
            <Container>
                {/* FIXME: */}
                {/*  ---------- outline button section ---------- */}
                <OutlineButtonLinkContainer ItemData={ItemData} />
                <div className="px-4">
                    {/* ---------- Filter section ---------- */}
                    <TableControls.UpperSection>
                        <TableControls.NumberOfRecords recordsLabel="施設" numberOfRecords={numberOfRecords} />

                        <div className="flex justify-between">
                            <InstituteSearch setSearchParams={setSearchParams} numberOfRecords={numberOfRecords} setPageNumber={setPageNumber}/>
                        </div>
                    </TableControls.UpperSection>
                    {/* t---------- Table section ---------- */}
                    <div className="table-wrapper">
                        <TblContainer className="!table-auto min-w-[1400px]">
                            <TblHead />
                            <tbody className="h-[calc(100vh-206px)] tbody-vertical-scroll">
                                {/* ---------- Table content goes here ---------- */}
                                {instituteList.map((institute, index) => (
                                    <InstituteListTr key={index} institute={institute} />
                                ))}
                            </tbody>
                        </TblContainer>
                    </div>
                    {/* Table Footer Section  */}
                    <Footer>
                        <PaginationSearchParams
                            itemsPerPage={300}
                            records={instituteList}
                            setRecords={setInstituteList}
                            setLoading={setLoading}
                            setNumberOfRecords={setNumberOfRecords}
                            endPoint={listInstitute}
                            subQueryString={searchParams ? searchParams : searchParamsValues}
                            pageNumber={pageNumber}
                            setPageNumber={setPageNumber}
                        />
                        <div className="flex flex-col items-end">
                            <div className="cursor-pointer" onClick={() => navigate('/institute_add')}>
                                <AddButton text="施設追加" />
                            </div>
                        </div>
                    </Footer>
                </div>
            </Container>
        </div>
    );
};

export default InstituteList;
