import BreadCrumbs from '../BreadCrumbs/BreadCrumbs';
import Footer from '../Footer/Footer';
import Pagination from '../Pagination/Pagination';
import AddButton from '../Table/FooterSection/AddButton';
import TableControls from '../Table/TableControls';
import UseTable from '../Table/UseTable';

// Declare table header label
// Fixw-width for each columns
// minWidth for one cloumn which was responsive under 1440px
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

const MINW1440Table = () => {
    const title = 'breadcrumbs root > breadcrumbs list > breadcrumbs list > breadcrumbs list';

    const { TblContainer, TblHead } = UseTable(headerCells);
    let rows = [];
    for (let i = 0; i < 22; i++) {
        rows.push(`rows${i + 1}`);
    }

    return (
        <>
            <div className="px-4" style={{ backgroundColor: 'green' }}>
                {/* Filter section  */}
                <TableControls.UpperSection>
                    <BreadCrumbs title={title} />
                    <div className="flex" style={{ backgroundColor: 'olive' }}>
                        <TableControls.Selection defaultValue="全ロール" />
                        <TableControls.Selection defaultValue="全ロール" />
                        <TableControls.Selection defaultValue="全ロール" />
                        <TableControls.Selection defaultValue="全ロール" />
                        <TableControls.Selection defaultValue="全ロール" />
                        <TableControls.Selection defaultValue="全ロール" />

                        <TableControls.CalendarSection />
                        <TableControls.Search placeholder="氏名" />
                    </div>
                </TableControls.UpperSection>
                {/* Table Section  */}
                <div className="table-wrapper">
                    <TblContainer>
                        <TblHead />
                        <tbody className="tbody-vertical-scroll">
                            {rows.map((role, index) => (
                                <tr
                                    key={index}
                                    className="h-8 table-row-bg row-display text-left"
                                    style={{
                                        backgroundColor: 'Cyan',
                                    }}
                                >
                                    <td className="w-[13rem] right-border pl-2 ">{role}</td>
                                </tr>
                            ))}
                        </tbody>
                    </TblContainer>
                </div>
                {/* Pagination Section  */}
                <Footer>
                    <Pagination />
                    <div>
                        <AddButton text="アカウント追加-1" />
                        <AddButton text="アカウント追加-2" />
                    </div>
                </Footer>
            </div>
        </>
    );
};

export default MINW1440Table;
