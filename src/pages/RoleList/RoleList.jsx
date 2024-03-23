import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Loading from '../../components/Loading/Loader';
import Pagination from '../../components/Pagination/Pagination';
import TableControls from '../../components/Table/TableControls';
import UseTable from '../../components/Table/UseTable';
import { listRoles } from '../../restapi/queries';
import AddButton from '../../components/Table/FooterSection/AddButton';
import RoleListTr from './RoleListTr';

// Declare table header label
const headerCells = [
    { label: 'ロール', minWidth: '6.5rem' },
    { label: 'アカウント数', width: '4rem' },
    { label: '二段階', width: '4rem' },
    { label: 'シス管', width: '5rem' },
    { label: 'シス監', width: '5rem' },
    { label: 'APP', width: '4.5rem' },
    { label: 'イベ\nント', width: '4rem' },
    { label: 'スケジューラー', width: '4.5rem' },
    { label: 'スロ\nット', width: '4rem' },
    { label: 'データ', width: '4rem' },
    { label: '顧客\n閲覧', width: '4rem' },
    { label: '顧客\n管理', width: '4rem' },
    { label: 'CSV\n出力', width: '4rem' },
    { label: 'CSV\n入力', width: '4rem' },
    { label: '一斉\n送信', width: '4rem' },
    { label: '変更日時', width: '9.5rem' },
];

const UserRoleList = () => {
    const recordsLabel = '権限・ロール';
    const navigate = useNavigate();
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [numberOfRecords, setNumberOfRecords] = useState(0);
    const { TblContainer, TblHead } = UseTable(headerCells, {
        headClass: 'whitespace-normal',
    });

    return (
        <>
            {loading && <Loading />}
            <div className="px-4">
                {/* Filter section  */}
                <TableControls.UpperSection>
                    <TableControls.NumberOfRecords recordsLabel={recordsLabel} numberOfRecords={numberOfRecords} />
                </TableControls.UpperSection>
                {/* Table Section  */}
                <div className="table-wrapper">
                    <TblContainer>
                        <TblHead />
                        <tbody className="h-[calc(100vh-200px)] tbody-vertical-scroll">
                            {roles && roles.map((role, index) => <RoleListTr key={index} role={role} />)}
                        </tbody>
                    </TblContainer>
                </div>
                {/* Pagination Section  */}
                <Footer>
                    <Pagination
                        itemsPerPage={10000}
                        endPoint={listRoles}
                        setRecords={setRoles}
                        setLoading={setLoading}
                        setNumberOfRecords={setNumberOfRecords}
                    />
                    {/* temporarily comment out */}
                    <AddButton text="権限・ロール追加" onClick={() => navigate('/role_add')} />
                </Footer>
            </div>
        </>
    );
};

export default UserRoleList;
