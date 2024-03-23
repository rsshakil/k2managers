import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Loading from '../../components/Loading/Loader';
import PaginationSearchParams from '../../components/Pagination/PaginationSearchParams';
import AddButton from '../../components/Table/FooterSection/AddButton';
import TableControls from '../../components/Table/TableControls';
import UseTable from '../../components/Table/UseTable';
import Container from '../../components/Wrapper/Container';
import { SessionStorageOnReload } from '../../helper/browserSessionStorage/SessionStorageOnReload';
import { listDomain } from '../../restapi/queries';
import DomainListTr from './DomainListTr';
import DomainSearch from './DomainSearch';

const headerCells = [
    { label: 'ドメイン名', minWidth: '14.5rem' }, // domain name
    { label: 'ドメインURL', minWidth: '24.5rem' }, // domain URL
    { label: '設定中APP', width: '22.25rem' }, //setting app
    { label: '変更日時', width: '10.375rem' }, // updateDate
    { label: '作成日時', width: '10.375rem' }, //createDate
];

const DomainList = () => {
    const navigate = useNavigate();
    const { TblContainer, TblHead } = UseTable(headerCells);
    const recordsLabel = 'ドメイン';
    const { pathname } = useLocation();
    const [domainListData, setDomainListData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [numberOfRecords, setNumberOfRecords] = useState(0);
    const [isOverFlow, setIsOverFlow] = useState(false);
    const { getInitialState, fetchSessionStorageData } = SessionStorageOnReload();
    const { setSelectedValue } = SessionStorageOnReload(); // Manage reload option flag
    const [pageNumber, setPageNumber] = useState(0);

    const retainedDomainList = JSON.parse(sessionStorage.getItem(`retained_domain_list`));

    const initializeValue = {
        domainName: retainedDomainList?.domainName,
    };
    setSelectedValue(initializeValue);

    const { searchParamsValues } = getInitialState(pathname);

    const [searchDBParams, setSearchDBParams] = useState(searchParamsValues ? searchParamsValues : '');

    return (
        <div className={`${isOverFlow && 'overflow-hidden'} `}>
            {loading && <Loading />}
            <Container>
                <div className="px-4">
                    {/* Filter section  */}
                    <TableControls.UpperSection>
                        <TableControls.NumberOfRecords recordsLabel={recordsLabel} numberOfRecords={numberOfRecords} />
                        <div className="flex">
                            <DomainSearch setSearchParams={setSearchDBParams} setPageNumber={setPageNumber}/>
                        </div>
                    </TableControls.UpperSection>

                    {/* Table Section  */}
                    <div className="table-wrapper">
                        <TblContainer>
                            <TblHead />
                            <tbody className="tbody-vertical-scroll">
                                {domainListData &&
                                    domainListData.map((domain, index) => <DomainListTr key={index} domain={domain} />)}
                            </tbody>
                        </TblContainer>
                    </div>
                    {/* Pagination Section  */}
                    <Footer>
                        <PaginationSearchParams
                            itemsPerPage={300}
                            records={domainListData}
                            setRecords={setDomainListData}
                            setLoading={setLoading}
                            endPoint={listDomain}
                            subQueryString={searchDBParams}
                            setNumberOfRecords={setNumberOfRecords}
                            pageNumber={pageNumber}
                            setPageNumber={setPageNumber}
                        />
                        <div className="flex flex-col items-end">
                            <AddButton text="ドメイン追加" onClick={() => navigate('/domain_add')} />
                        </div>
                    </Footer>
                </div>
            </Container>
        </div>
    );
};

export default DomainList;
