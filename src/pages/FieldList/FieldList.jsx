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
import { listField } from '../../restapi/queries';
import { ItemData } from '../../utilities/projectBtnItemData';
import FieldListTr from './FieldListTr';
import FieldSearch from './FieldSearch';

const headerCells = [
    { label: 'フィールド名', width: '258px' },
    { label: 'フィールド管理名', width: '258px' },
    { label: 'フィールドタイプ', width: '212px' },
    { label: 'フィールド説明', minWidth: '345px' },
    { label: '変更日時', width: '166px' },
    { label: '作成日時', width: '166px' },
];

const FieldList = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); // make -- true -- after finish development
    const [isOverFlow, setIsOverFlow] = useState(false);
    const [numberOfRecords, setNumberOfRecords] = useState(0);
    const [fieldListData, setFieldListData] = useState([]);
    const { TblContainer, TblHead } = UseTable(headerCells);

    const { getInitialState, fetchSessionStorageData } = SessionStorageOnReload();
    const [pageNumber, setPageNumber] = useState(+sessionStorage.getItem(`pagination_pageNo`) || 0);
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
                        <TableControls.NumberOfRecords recordsLabel="フィールド" numberOfRecords={numberOfRecords} />
                        <div className="flex">
                            <FieldSearch setSearchParams={setSearchParams} numberOfRecords={numberOfRecords} setPageNumber={setPageNumber}/>
                        </div>
                    </TableControls.UpperSection>
                    {/* table section */}
                    <div className="table-wrapper overflow-x-auto">
                        <TblContainer className="!table-auto min-w-[1400px]">
                            <TblHead />
                            <tbody className="tbody-height206p tbody-vertical-scroll">
                                {fieldListData.map((field, index) => (
                                    <FieldListTr key={index} field={field} />
                                ))}
                            </tbody>
                        </TblContainer>
                    </div>
                    {/* Table Footer Section  */}
                    <Footer>
                        <PaginationSearchParams
                            itemsPerPage={300}
                            endPoint={listField}
                            records={fieldListData}
                            setRecords={setFieldListData}
                            setLoading={setLoading}
                            setNumberOfRecords={setNumberOfRecords}
                            subQueryString={searchParams ? searchParams : searchParamsValues}
                            pageNumber={pageNumber}
                            setPageNumber={setPageNumber}
                        />
                        <div className="flex flex-col items-end">
                            <AddButton text="フィールド 追加" onClick={() => navigate('/field_add')} />
                        </div>
                    </Footer>
                </div>
            </Container>
        </div>
    );
};

export default FieldList;
