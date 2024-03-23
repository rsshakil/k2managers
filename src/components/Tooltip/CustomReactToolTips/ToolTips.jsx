import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import TooltipContainer from './TooltipContainer';

export default function Tooltips({ children, targetRect, show, horiScroll }) {
    const ref = useRef(null);
    const [tooltipHeight] = useState(0);

    let tooltipX = 0,
        tooltipY = 0,
        tooltipArrow = 0;
    if (targetRect !== null) {
        tooltipX = targetRect.left + horiScroll;
        tooltipY = targetRect.top - tooltipHeight;
        tooltipArrow = Math.ceil((targetRect.right - targetRect.left) / 2);
        if (tooltipY < 0) {
            tooltipY = targetRect.bottom;
        }
    }

    return (
        show &&
        createPortal(
            <TooltipContainer x={tooltipX} y={tooltipY} tooltipArrow={tooltipArrow} contentRef={ref} show={show}>
                {children}
            </TooltipContainer>,
            document.body
        )
    );
}
