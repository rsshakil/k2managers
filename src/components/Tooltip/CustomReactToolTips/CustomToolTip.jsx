import React, { useCallback, useEffect, useRef, useState } from 'react';
import Tooltips from './ToolTips';

export default function CustomToolTip({ tooltipContent, ...rest }) {
    const [targetRect, setTargetRect] = useState(null);
    const divRef = useRef(null);
    const [show, setShow] = useState(false);
    const [horiScroll, setHoriScroll] = useState(0)

    // FOR FIXED It will be Need -- scroll horizontal to page, tooltip position get same.
    const handleNavigation = useCallback(
        e => {
          const window = e.currentTarget;
            // console.log("window ",window.scrollX);
            setHoriScroll(window.scrollX)
        }, []
      );

    useEffect(()=>{
        window.addEventListener("scroll", (e)=>handleNavigation(e))
    },[handleNavigation])
      

    return (
        <>
            <div
                {...rest}
                className="ellipsis"
                ref={divRef}
                onPointerEnter={() => {
                    const { offsetWidth, scrollWidth } = divRef.current;
                    if (offsetWidth < scrollWidth) {
                        setShow(true);
                    } else {
                        setShow(false);
                    }

                    const rect = divRef.current.getBoundingClientRect();
                    // if (window.addEventListener("scroll", (e)=>handleNavigation(e))){

                    //     console.log("rect: ", rect);
                    // }

                    setTargetRect({
                        left: rect.left,
                        top: rect.top,
                        right: rect.right,
                        bottom: rect.bottom,
                    });
                }}
                onPointerLeave={() => {
                    setShow(false);
                    setTargetRect(null);
                }}
            />
            {targetRect !== null && (
                <Tooltips targetRect={targetRect} show={show} horiScroll={horiScroll}>
                    {tooltipContent}
                </Tooltips>
            )}
        </>
    );
}
