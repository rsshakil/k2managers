import React from 'react';

// This is the number of records section
export default function NumberOfRecords({ recordsLabel, numberOfRecords }) {
    return (
        <p className="pl-2 pt-px pb-0.5 font-bold text-cLightBlue truncate ... text-ellipsis overflow-hidden">
            {recordsLabel} : {numberOfRecords}
        </p>
    );
}
