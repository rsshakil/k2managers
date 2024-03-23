import { useEffect, useLayoutEffect, useRef, useState } from "react";

export default function TooltipContainer({
  children,
  x = 0,
  y = 0,
  tooltipArrow = 0,
  contentRef,
  show,
}) {
  const refDiv = useRef();
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [maxWidth, setMaxWidth] = useState(300);
  const [clientHeight, setClientHeight] = useState(32);
  const [tooltipPosition, setTooltipPosition] = useState('top');
  const [tooltipCss, setTooltipCss] = useState({ bottom: "calc(100% + 6px)" });

  useEffect(() => {
    const contentNode = refDiv.current;
    let clientRect = contentNode.getBoundingClientRect();
    let clientX = clientRect.left;
    let clientY = clientRect.top;
    const parentWidth =
      contentNode?.parentNode?.offsetWidth || window.innerWidth;
    const isOverflowing = contentNode && contentNode.clientWidth > parentWidth;
    setMaxWidth(parentWidth - (x + 16));
    setIsOverflowing(isOverflowing);
    setClientHeight(contentNode.clientHeight);
    // console.log('contentNode.clientHeight', contentNode.clientHeight);
    // console.log('contentNode.scrollHeight', contentNode.scrollHeight);
    console.log('window.innerHeight', window.innerHeight);
    console.log('clientY', y+contentNode.scrollHeight);
    console.log('contentNode.clientHeight', contentNode.clientHeight);
    console.log('x',x)
    console.log('y',y)
    if (y + contentNode.scrollHeight > window.innerHeight) {
      console.log('set to top');
      setTooltipPosition('top');
      setTooltipCss({ bottom: "calc(100% + 6px)" });
      
    } else { 
      console.log('set to bottom');
      setTooltipPosition('bottom');
      setTooltipCss({ top: "32px" });
      
    }
  }, [refDiv, x]);

  useLayoutEffect(() => {
    refDiv.current.style.maxWidth = `${isOverflowing ? 300 : maxWidth}px`;
  }, [maxWidth, isOverflowing]);
  
  return (
    
    <div
      ref={refDiv}
      style={{
        wordWrap: "break-word",
        borderRadius: "4px",
        color: "white",
        background: "rgba(0, 0, 0, 0.7)",
        padding: "4px 8px",
        position: "absolute",
        ...tooltipCss,
        left: 0,
        transform: `translate3d(${x}px, ${y}px, 0)`,
        pointerEvents: "none",
        zIndex: "9999",
        opacity: 1,
      }}
    >
     {show && tooltipPosition=='top' && (
        <span
          style={{ left: `${tooltipArrow}px`}}
          className={`tooltip-arrow2 visible`}
        />
      )}
      <div ref={contentRef} className="tooltip">
        {children}
      </div>
      {show && tooltipPosition=='bottom' && (
        <span
          style={{ left: `${tooltipArrow}px`}}
          className={`tooltip-arrow3 visible`}
        />
      )}
    </div>
  );
}
