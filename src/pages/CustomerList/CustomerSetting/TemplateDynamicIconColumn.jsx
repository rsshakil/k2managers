import React, { useMemo, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import { v4 as uuid } from 'uuid';

export default function TemplateDynamicIconColumn({ dataText, children, fetchLogDetails }) {
    const uniqueID = useMemo(() => uuid(), []);
    const [tooltip, showTooltip] = useState(true);
    return (
        <>
            {tooltip && (
                <ReactTooltip
                    id={uniqueID}
                    wrapper="span"
                    place="bottom"
                    type="dark"
                    effect="solid"
                    scrollHide={true}
                />
            )}
            <span
                data-for={uniqueID}
                data-tip={dataText}
                onMouseEnter={() => showTooltip(true)}
                onMouseLeave={() => {
                    showTooltip(false);
                    setTimeout(() => showTooltip(true), 50);
                }}
            >
                <div
                    className="w-[2.5rem] right-border h-10 leading-10 flex-none px-2 text-center cursor-pointer"
                    onClick={fetchLogDetails}
                >
                    {children}
                </div>
            </span>
        </>
    );
}
