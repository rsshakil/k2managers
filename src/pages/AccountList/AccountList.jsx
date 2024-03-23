/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Loading from '../../components/Loading/Loader';
import PaginationV3 from '../../components/Pagination/PaginationV3';
import AddButton from '../../components/Table/FooterSection/AddButton';
import TableControls from '../../components/Table/TableControls';
import UseTable from '../../components/Table/UseTable';
import { SessionStorageOnReload } from '../../helper/browserSessionStorage/SessionStorageOnReload';
import fetchRecords from '../../lib/filterFetch';
import { listAccounts, listRoles } from '../../restapi/queries';
import AccountListTr from './AccountListTr';
import AccountSearch from './AccountSearch';

// Declare table header label // Fix-width for each columns // minWidth for one column which was responsive under 1440px
const headerCells = [
    { label: 'アカウントID', width: '13rem' },
    { label: '氏名', width: '13rem' },
    { label: 'メールアドレス', minWidth: '10rem' },
    { label: 'ロール', width: '13rem' },
    { label: 'パスワード有効期限', width: '10.375rem' },
    { label: '最終ログイン', width: '10.375rem' },
    { label: 'ログイン失敗', width: '7rem' },
    { label: '初期状態', width: '5rem' },
    { label: 'ロック状態', width: '6rem' },
];

function AccountList() {
    const [loading, setLoading] = useState(true);
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const recordsLabel = 'アカウント';
    const { TblContainer, TblHead } = UseTable(headerCells);
    const [numberOfRecords, setNumberOfRecords] = useState(0);
    const [accounts, setAccounts] = useState([]);
    const [options, setOptions] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [searchDBParams, setSearchDBParams] = useState('');

    const { fetchSessionStorageData } = SessionStorageOnReload();
    const retainedAccountList = JSON.parse(sessionStorage.getItem(`retained_account_list`));

    const [values, setValues] = useState({
        roleId: retainedAccountList?.roleId ? retainedAccountList?.roleId : '',
        accountName: retainedAccountList?.accountName || '',
    });

    const filterPropObj = {
        setId: 'roleId',
        setName: 'roleName',
        endPoint: listRoles,
        setOptions: setOptions,
        setLoading: setLoading // loading animation handle linkon update 2/3/23
    };
    // useEFFECT START
    useEffect(() => {
        const retainedAccountList = JSON.parse(sessionStorage.getItem(`retained_account_list`));
        const initializeValue = {
            roleId: retainedAccountList?.roleId,
            accountName: retainedAccountList?.accountName,
        };
        setValues(initializeValue);
        setSearchDBParams(new URLSearchParams(initializeValue)?.toString());

        fetchRecords.filter(filterPropObj); // get roleList Select option
        fetchSessionStorageData(pathname, 'listAccounts', setValues, initializeValue);
    }, []);
    // useEFFECT END

    return (
        <>
            {loading && <Loading />}
            <div className="px-4">
                {/* Filter section  */}
                <TableControls.UpperSection>
                    <TableControls.NumberOfRecords recordsLabel={recordsLabel} numberOfRecords={numberOfRecords} />
                    <div className="flex">
                        <AccountSearch
                            options={options}
                            values={values}
                            setSearchDBParams={setSearchDBParams}
                            setValues={setValues}
                            setPageNumber={setPageNumber}
                        />
                    </div>
                </TableControls.UpperSection>

                {/* Table Section  */}
                <div className="table-wrapper">
                    <TblContainer>
                        <TblHead />
                        <tbody className="tbody-vertical-scroll">
                            {accounts &&
                                accounts.map((account, index) => <AccountListTr key={index} account={account} />)}
                        </tbody>
                    </TblContainer>
                </div>

                {/* Pagination Section  */}
                <Footer>
                    <PaginationV3
                        itemsPerPage={300} //Temporary set itemsPerPage 10000 instance of itemsPerPage 300
                        records={accounts}
                        setRecords={setAccounts}
                        setLoading={setLoading}
                        endPoint={listAccounts}
                        setNumberOfRecords={setNumberOfRecords}
                        subQueryString={searchDBParams}
                        routeName={'account_list'}
                        pageNumber={pageNumber}
                        setPageNumber={setPageNumber}
                    // subQueryString={searchParams ? searchParams : searchParamsValues}
                    />
                    <AddButton text="アカウント追加" onClick={() => navigate('/account_add')} />
                </Footer>
            </div>
        </>
    );
}

export default AccountList;
