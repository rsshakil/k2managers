import React, { useCallback, useMemo, useState, useLayoutEffect, useEffect, useRef } from 'react';
import './CustomToolTip.css';
const CustomToolTip = ({ children, text, divInfo, ...rest }) => {
    const [show, setShow] = useState(false);
    const [dynamicWidth, setDynamicWidth] = useState('max-content');
    const [dynamicTopCss, setDynamicTopCss] = useState('calc(100% + 5px)');
    const [mousePos, setMousePos] = useState({});
    const [tooltipPositionTop, setTooltipPositionTop] = useState('bottom');
    const [tooltipPositionRight, setTooltipPositionRight] = useState('left');
    const [tooltipArrowPos, setArrowPos] = useState('-5px');
    const [tooltipArrowTransform, setArrowTransform] = useState('rotate(0deg)');

    const tooltipBoxRef = useRef(null);

    function checkTooltipVisibility(e) {
        let { clientX, clientY } = e;
        let { clientWidth, clientHeight, scrollWidth, scrollHeight,offsetWidth } = e.target;
        console.log('clientWidth',clientWidth);
        console.log('scrollWidth',scrollWidth);
        console.log('offsetWidth',offsetWidth);
        console.log('eTextWidth;', e.target.getBoundingClientRect());
        console.log('offsetParent ;', e.target.offsetParent.offsetWidth);
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        context.font = "16px Arial";
        console.log('widhtprops',context.measureText(e.target.textContent))
        const widthOfContent = Math.ceil(context.measureText(e.target.textContent).width);
        console.log('widthOfContent',widthOfContent);
        let style = e.currentStyle || window.getComputedStyle(e.target);
        // console.log('style', style);
        console.log('e.target', e.target.textContent);
        // if (e.target.textContent=="浦河郡浦河町堺町西1-2urakawa１０１") {
        //     setShow(true);
        //     setDynamicWidth(scrollWidth + 15 + 'px');
        //     setMousePos({ x: e.clientX, y: e.clientY });
        // }
        if (clientWidth < scrollWidth) {
            setShow(true);
            setDynamicWidth(scrollWidth + 15 + 'px');
            setMousePos({ x: e.clientX, y: e.clientY });
        } else if (clientWidth > widthOfContent) {
            let diffWidth = clientWidth - widthOfContent;
            console.log('diffWidth',diffWidth);
            if (diffWidth<=15) { 
                setShow(true);
                setDynamicWidth(scrollWidth + 15 + 'px');
                setMousePos({ x: e.clientX, y: e.clientY });
            }
        }
        //handleToolTipPos
        const { innerWidth: width, innerHeight: height } = window;

        //change left right position
        let tooltipBoxWidth = scrollWidth > 512 ? 520 : scrollWidth;
        tooltipBoxWidth = clientX + tooltipBoxWidth;

        if (parseInt(tooltipBoxWidth) > width) {
            setTooltipPositionRight('right');
        } else {
            setTooltipPositionRight('left');
        }

        if (clientY + scrollHeight > divInfo?.current.clientHeight) {
            setTooltipPositionTop('top');
            let moveToTop = scrollHeight + 5;

            setDynamicTopCss(`${moveToTop}px`);
            setArrowPos(`${clientHeight - 5}px`);
            setArrowTransform('rotate(180deg)');
        } else {
            setTooltipPositionTop('bottom');

            setDynamicTopCss('calc(100% + 5px)');
            setArrowPos('-5px');
            setArrowTransform('rotate(0deg)');
        }
    }
    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height,
        };
    }

    function hideTooltip(e) {
        setShow(false);
        setDynamicWidth('auto');
    }
    return (
        <>
            <div className="tooltip-container">
                <span
                    className={show ? 'tooltip-arrow visible' : 'tooltip-arrow'}
                    style={{ bottom: tooltipArrowPos, transform: tooltipArrowTransform }}
                />
                <div
                    className={`${show ? 'tooltip-box visible' : 'tooltip-box'
                        } ${tooltipPositionRight} ${tooltipPositionTop}`}
                    style={{ width: dynamicWidth, bottom: dynamicTopCss }}
                    ref={tooltipBoxRef}
                >
                    {text}
                </div>
                <div onMouseEnter={(e) => checkTooltipVisibility(e)} onMouseLeave={(e) => hideTooltip(e)} {...rest}>
                    {children}
                </div>
            </div>
        </>
    );
};

export default CustomToolTip;
