import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import OutlineButtonLinkContainer from '../../components/Button/OutlineButtonLinkContainer';
import Footer from '../../components/Footer/Footer';
import Loading from '../../components/Loading/Loader';
import AddButton from '../../components/Table/FooterSection/AddButton';
import TableControls from '../../components/Table/TableControls';
import UseTable from '../../components/Table/UseTable';
import Container from '../../components/Wrapper/Container';
import { listItem } from '../../restapi/queries';
import { ItemData } from '../../utilities/projectBtnItemData';
import { FilterComMethods } from '../../helper/functions/FilterComMethods';
import { SessionStorageOnReload } from '../../helper/browserSessionStorage/SessionStorageOnReload';
import ItemListTd from './ItemListTd';
import SVGComponent from '../../components/Table/UpperSection/svgviewer-searchicon';
import ItemSearch from './ItemSearch';
import PaginationSearchParams from '../../components/Pagination/PaginationSearchParams';

const headerCells = [
    { label: 'アイテム', width: '18.25rem' },
    { label: '管理名', width: '18.25rem' },
    { label: 'アイテム説明', minWidth: '28rem' },
    { label: '変更日時', width: '10.375rem' },
    { label: '作成日時', width: '10.375rem' },
];

const ItemList = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [itemList, setItemList] = useState([]);
    const [isOverFlow] = useState(false);
    const [numberOfRecords, setNumberOfRecords] = useState(0);
    const { TblContainer, TblHead } = UseTable(headerCells);
    const [pageNumber, setPageNumber] = useState(+sessionStorage.getItem(`pagination_pageNo`) || 0);
    const { getInitialState } = SessionStorageOnReload();
    const { searchParamsValues } = getInitialState(pathname);
    const [searchParams, setSearchParams] = useState(searchParamsValues ? searchParamsValues : '');

    return (
        <div className={`${isOverFlow && 'overflow-hidden'} `}>
            {loading && <Loading />}

            <Container>
                {/*  ----- outline button section ----- */}
                <OutlineButtonLinkContainer ItemData={ItemData} />
                <div className="px-4">
                    <TableControls.UpperSection>
                        <TableControls.NumberOfRecords recordsLabel="アイテム" numberOfRecords={numberOfRecords} />
                        <div className="flex">
                            <ItemSearch setSearchParams={setSearchParams} numberOfRecords={numberOfRecords} setPageNumber={setPageNumber}/>
                        </div>
                    </TableControls.UpperSection>

                    {/* table section */}
                    <div className="table-wrapper">
                        <TblContainer className="!table-auto min-w-[1400px]">
                            <TblHead />
                            <tbody className="h-[calc(100vh-206px)] tbody-vertical-scroll">
                                {/* --------TAble content goes here-------- */}
                                {itemList.map((item, index) => (
                                    <tr key={index} className="h-8 table-row-bg row-display">
                                        <ItemListTd item={item} />
                                    </tr>
                                ))}
                            </tbody>
                        </TblContainer>
                    </div>
                    {/* Table Footer Section  */}
                    <Footer>
                        <PaginationSearchParams
                            itemsPerPage={300}
                            records={itemList}
                            setRecords={setItemList}
                            setLoading={setLoading}
                            setNumberOfRecords={setNumberOfRecords}
                            endPoint={listItem}
                            subQueryString={searchParams}
                            pageNumber={pageNumber}
                            setPageNumber={setPageNumber}
                        />
                        <div className="flex flex-col items-end">
                            <AddButton text="アイテム追加" onClick={() => navigate('/item_add')} />
                        </div>
                    </Footer>
                </div>
            </Container>
        </div>
    );
};

export default ItemList;
