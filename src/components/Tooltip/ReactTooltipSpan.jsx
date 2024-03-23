import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import { v4 as uuid } from 'uuid';

export default function ReactTooltipSpan({ dataText }) {
    const widthRef = useRef();
    const uniqueID = useMemo(() => uuid(), []);
    const [show, setShow] = useState(false);

    useLayoutEffect(() => {
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
                <span
                    ref={widthRef}
                    className="block ellipsis w-full "
                    data-for={uniqueID}
                    data-tip={dataText}
                    data-multiline={true}
                >
                    {dataText && dataText}
                </span>
            </div>
        </>
    );
}
