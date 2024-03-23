import React, { useState } from 'react';
import ReactTooltipTH from '../Tooltip/ReactTooltipTH';

export default function UseTable3(headerCells) {
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
                                          ? { minWidth: headerCell.minWidth, maxWidth: 0 }
                                          : { width: headerCell.width, maxWidth: headerCell.width }
                                  }
                                  className={`sticky top-0 z-10 px-2 right-border text-center font-bold text-white bg-blue-50`}
                              >
                                  <div className="flex justify-start flex-row flex-nowrap items-center">
                                      <div className="flex-1 truncate">
                                          <ReactTooltipTH headerCell={headerCell} />
                                      </div>
                                      <div className="h-4">
                                          {headerCell.endIcon && (
                                              <span className="leading-4 align-middle mt-[4px] mr-[4px] cursor-pointer">
                                                  {headerCell.endIcon}
                                              </span>
                                          )}
                                      </div>
                                  </div>
                              </th>
                          ))
                        : 'Table Header Label Not Found'}
                </tr>
            </thead>
        );
    };
    return { TblContainer, TblHead };
}
