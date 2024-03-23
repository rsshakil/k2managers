import React from 'react';
import CustomToolTip from '../../../../components/Tooltip/CustomToolTip';
import Loading from '../../../Loading/Loader';

export default function BroadcastUserTableBody({ broadcastUsers, headerCells, loading }) {
    return (
        <>
            {broadcastUsers && broadcastUsers.length > 0 && loading && <Loading />}
            {broadcastUsers?.map((cellItem, index) => (
                <div key={index} className="flex table-row-bg row-display align-middle w-max">
                    {headerCells.map((headerCell, index2) => {
                        return (
                            <CustomToolTip
                                key={`${index}_${index2}`}
                                text={Object.values(cellItem)[index2]}
                            >
                                <div className={`right-border px-2 h-10 leading-10 flex-none truncate w-48`}>
                                    {Object.values(cellItem)[index2]}
                                </div>
                            </CustomToolTip>
                        )
                    })}
                </div>
            ))}
        </>
    );
}
