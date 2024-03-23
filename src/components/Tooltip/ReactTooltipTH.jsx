import React, { useEffect, useMemo, useRef, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import { v4 as uuid } from 'uuid';

export default function ReactTooltipTH({ headerCell }) {
    const widthRef = useRef();
    const uniqueID = useMemo(() => uuid(), []);
    const [show, setShow] = useState(false);

    useEffect(() => {
        const { offsetWidth, scrollWidth } = widthRef.current;
        if (offsetWidth < scrollWidth) setShow(true);
        else setShow(false);
    }, []);
    return (
        <>
            <ReactTooltip
                id={uniqueID}
                wrapper="div"
                place="bottom"
                type="dark"
                effect="solid"
                multiline={true}
                className={show ? '!block' : '!hidden'}
                scrollHide={true}
            />

            <div className="w-full">
                <span className="block ellipsis w-full" data-for={uniqueID} data-tip={headerCell?.label} ref={widthRef}>
                    {headerCell.label !== undefined ? headerCell.label : headerCell.iconLabel}
                </span>
            </div>
        </>
    );
}
