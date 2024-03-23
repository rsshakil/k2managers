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
import { listCounselor } from '../../restapi/queries';
import { ItemData } from '../../utilities/projectBtnItemData';
import CounselorListTr from './CounselorListTr';
import CounselorSearch from './CounselorSearch';

const headerCells = [
    { label: '', width: '10rem' },
    { label: 'カウンセラー名', width: '18rem' },
    { label: 'カウンセラー管理名', width: '18rem' },
    { label: 'カウンセラー説明', minWidth: '17.5rem' },
    { label: '変更日時', width: '10rem' },
    { label: '作成日時', width: '10rem' },
];

const CounselorList = () => {
    const recordsLabel = 'カウンセラー';
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [loading, setLoading] = useState(false); // make -- true -- after finish development
    const [isOverFlow, setIsOverFlow] = useState(false);
    const [numberOfRecords, setNumberOfRecords] = useState(0);
    const { TblContainer, TblHead } = UseTable(headerCells);
    const [counselorList, setCounselorList] = useState([]);
    const [pageNumber, setPageNumber] = useState(+sessionStorage.getItem(`pagination_pageNo`) || 0);
    const { getInitialState, fetchSessionStorageData } = SessionStorageOnReload();
    const { searchParamsValues } = getInitialState(pathname);
    const [searchParams, setSearchParams] = useState(searchParamsValues ? searchParamsValues : '');

    return (
        <div className={`${isOverFlow && 'overflow-hidden'} `}>
            {loading && <Loading />}
            <Container>
                {/*  ----- outline button section ----- */}
                <OutlineButtonLinkContainer ItemData={ItemData} />
                <div className="px-4">
                    {/* ------ Filter section ---------*/}
                    <TableControls.UpperSection>
                        <TableControls.NumberOfRecords recordsLabel={recordsLabel} numberOfRecords={numberOfRecords} />
                        <div className="flex justify-between">
                            <CounselorSearch setSearchParams={setSearchParams} numberOfRecords={numberOfRecords} setPageNumber={setPageNumber}/>
                        </div>
                    </TableControls.UpperSection>
                    {/* table section */}
                    <div className="table-wrapper">
                        <TblContainer className="!table-auto min-w-[1400px]">
                            <TblHead />
                            <tbody className="h-[calc(100vh-206px)] tbody-vertical-scroll">
                                {/* --------TAble content goes here-------- */}
                                {counselorList.map((counselor, index) => (
                                    <CounselorListTr key={index} counselor={counselor} />
                                ))}
                            </tbody>
                        </TblContainer>
                    </div>
                    {/* Table Footer Section  */}
                    <Footer>
                        <PaginationSearchParams
                            itemsPerPage={300}
                            records={counselorList}
                            setRecords={setCounselorList}
                            setLoading={setLoading}
                            setNumberOfRecords={setNumberOfRecords}
                            endPoint={listCounselor}
                            subQueryString={searchParams ? searchParams : searchParamsValues}
                            pageNumber={pageNumber}
                            setPageNumber={setPageNumber}
                        />
                        <div className="flex flex-col items-end">
                            <AddButton text=" カウンセラー追加" onClick={() => navigate('/counselor_add')} />
                        </div>
                    </Footer>
                </div>
            </Container>
        </div>
    );
};

export default CounselorList;
