import BroadcastUserTableBody from './BroadcastUserTableBody';

export default function BroadcastUserTable({ broadcastUsers, loading }) {
    const tableMinWidth = '1372px';

    const headerCells = [
        { headerName: '姓' },
        { headerName: '名' },
        { headerName: 'メールアドレス' },
        { headerName: '電話番号' },
        { headerName: '住所' },
        { headerName: '項目1' },
        { headerName: '項目2' },
        { headerName: '項目3' },
        { headerName: '項目4' },
        { headerName: '項目5' },
        { headerName: '項目6' },
        { headerName: '項目7' },
        { headerName: '項目8' },
    ];

    return (
        <>
            <div
                className={`min-w-[${tableMinWidth}] overflow-x-auto`}
                style={{ minWidth: tableMinWidth }}
            >
                <div className="h-[calc(100vh-246px)] tbody-vertical-scroll">
                    {/* HEADER PART START */}
                    <div className="flex bg-blue-50 sticky top-0 z-10">
                        {headerCells.length > 0 &&
                            headerCells.map((headerCell, index) => (
                                <div key={index} className={`sticky top-0 z-10 flex-none h-8 px-1 leading-8 text-white text-center right-border truncate w-48 bg-blue-50`} >
                                    {headerCell?.headerName}
                                </div>
                            ))}
                    </div>
                    {/* HEADER PART END */}
                    {/* TABLE BODY PART START*/}
                    <BroadcastUserTableBody
                        broadcastUsers={broadcastUsers}
                        headerCells={headerCells}
                        loading={loading}
                    />
                    {/* TABLE BODY PART END*/}
                </div>
            </div>
        </>
    );
}
