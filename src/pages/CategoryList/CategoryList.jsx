import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import OutlineButtonLinkContainer from '../../components/Button/OutlineButtonLinkContainer';
import Footer from '../../components/Footer/Footer';
import Loading from '../../components/Loading/Loader';
import PaginationSearchParams from '../../components/Pagination/PaginationSearchParams';
import AddButton from '../../components/Table/FooterSection/AddButton';
import TableControls from '../../components/Table/TableControls';
import UseTable from '../../components/Table/UseTable';
import { SessionStorageOnReload } from '../../helper/browserSessionStorage/SessionStorageOnReload';
import { listCategory } from '../../restapi/queries';
import { ItemData } from '../../utilities/projectBtnItemData';
import CategoryListTr from './CategoryListTr';
import CategorySearch from './CategorySearch';

const headerCells = [
    { label: '予約カテゴリー名', width: '20.234rem' },
    { label: '予約カテゴリー管理名', width: '20.234rem' },
    { label: 'メンテ', width: '4rem' },
    { label: 'イベント', minWidth: '10.875rem' },
    { label: 'アクセス数', width: '8rem' },
    { label: '変更日時', width: '10.375rem' },
    { label: '作成日時', width: '10.375rem' },
];

const CategoryList = () => {
    const recordsLabel = '予約カテゴリー';
    const [loading, setLoading] = useState(true);
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [categoryListData, setCategoryListData] = useState([]);
    const [isOverFlow] = useState(false);
    const [numberOfRecords, setNumberOfRecords] = useState(0);
    const { TblContainer, TblHead } = UseTable(headerCells);
    const { getInitialState } = SessionStorageOnReload();
    const { searchParamsValues } = getInitialState(pathname);
    const [searchParams, setSearchParams] = useState(searchParamsValues ? searchParamsValues : '');
    const [pageNumber, setPageNumber] = useState(+sessionStorage.getItem(`pagination_pageNo`) || 0);
    return (
        <div className={`${isOverFlow && 'overflow-hidden'} `}>
            {loading && <Loading />}
            {/*  ----- outline button section ----- */}
            <OutlineButtonLinkContainer ItemData={ItemData} />
            <div className="px-4">
                {/* ------ Filter section ---------*/}
                <TableControls.UpperSection>
                    <TableControls.NumberOfRecords recordsLabel={recordsLabel} numberOfRecords={numberOfRecords} />
                    <div className="flex">
                        <CategorySearch setSearchParams={setSearchParams} numberOfRecords={numberOfRecords} setPageNumber={setPageNumber}/>
                    </div>
                </TableControls.UpperSection>
                {/* table section */}
                <div className="table-wrapper">
                    <TblContainer className="!table-auto min-w-[1400px]">
                        <TblHead />
                        <tbody className="h-[calc(100vh-206px)] tbody-vertical-scroll">
                            {/* --------TAble content goes here-------- */}
                            {categoryListData &&
                                categoryListData.map((category, index) => (
                                    <CategoryListTr key={index} category={category} />
                                ))}
                        </tbody>
                    </TblContainer>
                </div>
                {/* Table Footer Section  */}

                <Footer>
                    <PaginationSearchParams
                        itemsPerPage={300}
                        endPoint={listCategory}
                        records={categoryListData}
                        setLoading={setLoading}
                        setRecords={setCategoryListData}
                        setNumberOfRecords={setNumberOfRecords}
                        subQueryString={searchParams ? searchParams : searchParamsValues}
                        pageNumber={pageNumber}
                        setPageNumber={setPageNumber}
                    />
                    <div className="flex flex-col items-end">
                        <AddButton text="予約カテゴリー 追加" onClick={() => navigate('/category_add')} />
                    </div>
                </Footer>
            </div>
        </div>
    );
};

export default CategoryList;
