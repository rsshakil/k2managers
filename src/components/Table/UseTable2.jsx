import React from 'react';

export default function UseTable2(headerCells) {
    // Table Component
    const TblContainer = ({ children, className }) => (
        <>
            <table
                className={`w-full text-base border-separate border-spacing-0 table-fixed ${
                    className !== undefined ? className : ''
                }`}
            >
                {children}
            </table>
        </>
    );
    //Table Header Component
    const TblHead = () => {
        return (
            <>
                <tr className="h-8 row-display">
                    {headerCells
                        ? headerCells.map((headerCell, index) => (
                              <th
                                  scope="col"
                                  key={index}
                                  style={
                                      headerCell.minWidth
                                          ? { minWidth: headerCell.minWidth }
                                          : { width: headerCell.width }
                                  }
                                  className={`sticky top-0 z-10 right-border text-center font-bold text-white bg-blue-50`}
                              >
                                  {headerCell.label !== undefined ? headerCell.label : headerCell.iconLabel}
                              </th>
                          ))
                        : 'Table Header Label Not Found'}
                </tr>
            </>
        );
    };
    return { TblContainer, TblHead };
}
