import React from 'react';

export default function TitleDialog({ title }) {
    return (
        <>
            <div className="flex flex-col w-full text-center tooltip">
                <div className="truncate h-8 modal-header">
                    <span className="sticky z-20 left-0 w-auto top-0 font-bold">{title}</span>
                </div>
                <div className="tooltiptext">{title}</div>
            </div>
        </>
    );
}
