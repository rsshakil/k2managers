import React from 'react';
import OutlineButtonContainer from '../../components/Wrapper/OutlineButtonContainer';
import BreadCrumbs from '../BreadCrumbs/BreadCrumbs';
import Controls from '../controls/Controls';
import Footer from '../Footer/Footer';
import Pagination from '../Pagination/Pagination';
import AddButton from '../Table/FooterSection/AddButton';
import TableControls from '../Table/TableControls';
import UseTable from '../Table/UseTable';

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

const MINW1440ProjectTable = () => {
    const title =
        'breadcrumbs root > breadcrumbs list > breadcrumbs list > breadcrumbs list > breadcrumbs list > breadcrumbs list  > breadcrumbs list > breadcrumbs list > breadcrumbs list > breadcrumbs list > breadcrumbs list > breadcrumbs list > breadcrumbs list > breadcrumbs list > breadcrumbs list';

    const { TblContainer, TblHead } = UseTable(headerCells);
    let rows = [];
    let items = [];
    for (let i = 0; i < 22; i++) {
        rows.push(`rows${i + 1}`);
    }
    for (let i = 0; i < 12; i++) {
        items.push('item');
    }

    return (
        <>
            <div className="px-4" style={{ backgroundColor: 'green' }}>
                {/* ----- outline button section ----- */}
                <OutlineButtonContainer>
                    {items.map((item, index) => (
                        <Controls.OutlineButton key={index} text={item} />
                    ))}
                </OutlineButtonContainer>

                {/* ------ Filter section ---------*/}
                <TableControls.UpperSection>
                    <BreadCrumbs title={title} />
                    <div className="flex justify-between" style={{ backgroundColor: 'olive' }}>
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
                {/* ----Table Section----  */}
                <div className="table-wrapper">
                    <TblContainer>
                        <TblHead />

                        {/* a new class "scroll-bar" is added to enable scroll height-width */}
                        <tbody className="block h-[calc(100vh_-_200px)] overlay scroll-bar">
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
                {/* -----Pagination Section----  */}
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

export default MINW1440ProjectTable;
