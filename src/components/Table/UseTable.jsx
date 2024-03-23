import React from 'react';

export default function UseTable(headerCells, className = {}) {
    const headClass = className.headClass || '';
    // Table Component
    const TblContainer = ({ children, className }) => (
        <table
            className={`w-full text-base border-separate border-spacing-0 table-fixed ${
                className !== undefined ? className : ''
            }`}
        >
            {children}
        </table>
    );
    //Table Header Component
    const TblHead = () => {
        return (
            <thead>
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
                                  className={`sticky top-0 z-10 right-border text-center font-bold text-white bg-blue-50${
                                      headClass !== undefined && ` ${headClass}`
                                  }`}
                              >
                                  <span className="flex-row">
                                      {headerCell.label !== undefined ? headerCell.label.split('\n').map(t => (<div>{t}</div>)) : headerCell.iconLabel }{' '}
                                  </span>
                                  {headerCell.endIcon && (
                                      <span className="float-right mt-[4px] mr-[4px] cursor-pointer">
                                          {headerCell.endIcon}
                                      </span>
                                  )}
                              </th>
                          ))
                        : 'Table Header Label Not Found'}
                </tr>
            </thead>
        );
    };
    return { TblContainer, TblHead };
}
