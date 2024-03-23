import React from 'react';
import CustomToolTip from '../../../../components/Tooltip/CustomToolTip';

export default function PrepareCsvTableHeader({ headerCell, parentTableRef, ref1 }) {
    return (
        <>
            <CustomToolTip text={headerCell?.headerName} divInfo={parentTableRef}>
                <div
                    ref={ref1}
                    className={`sticky top-0 z-10 flex-none h-8 px-1 leading-8 text-white text-center right-border truncate ${headerCell?.column_width} bg-blue-50`}
                >
                    {headerCell?.headerName}
                </div>
            </CustomToolTip>
        </>
    );
}
