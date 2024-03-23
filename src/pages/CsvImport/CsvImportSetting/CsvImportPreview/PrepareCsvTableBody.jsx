import React from 'react';
import CustomToolTip from '../../../../components/Tooltip/CustomToolTip';

export default function PrepareCsvTableBody({ csvImportPreviewRecords, headerFieldLists, parentTableRef }) {
    return (
        <>
            {csvImportPreviewRecords &&
                csvImportPreviewRecords.map((cellItem, index) => (
                    <div key={index} className="flex table-row-bg row-display align-middle w-max">
                        {headerFieldLists.length > 0 &&
                            headerFieldLists.map((headerCell, index2) => {
                                return (
                                    <CustomToolTip
                                        key={`${index}_${index2}`}
                                        text={Object.values(cellItem)[index2]}
                                        divInfo={parentTableRef}
                                    >
                                        <div
                                            className={`right-border px-2 h-10 leading-10 flex-none truncate ${headerCell?.column_width}`}
                                        >
                                            {Object.values(cellItem)[index2]}
                                        </div>
                                    </CustomToolTip>
                                );
                            })}
                        <div className="grow"></div>
                    </div>
                ))}
        </>
    );
}
