import React, { useRef } from 'react';

export default function UseDynamicTableHeader(headerFieldLists, tableMinWidth) {
    const ref1 = useRef(null);

    const TblContainer = ({ children, className }) => (
        <>
            <table
                className={`w-full text-base border-separate border-spacing-0 table-fixed ${
                    className !== undefined ? className : ''
                }`}
                style={{ minWidth: tableMinWidth ? tableMinWidth : '1408px' }}
            >
                {children}
            </table>
        </>
    );

    //Table Header Component
    const TableHeader = () => {
        return (
            <>
                <thead>
                    <tr className="h-8 row-display">
                        {headerFieldLists.length > 0 &&
                            headerFieldLists.map((headerCell, index) => (
                                <th
                                    ref={ref1}
                                    scope="col"
                                    key={index}
                                    className={`sticky top-0 z-10 text-white text-center right-border truncate 
                            ${headerCell?.column_width} bg-blue-50`}
                                >
                                    {headerCell?.headerName}
                                </th>
                            ))}
                        <th className="min-w-0 sticky top-0 z-10 bg-blue-50"></th>
                    </tr>
                </thead>
            </>
        );
    };
    return { TblContainer, TableHeader };
}
