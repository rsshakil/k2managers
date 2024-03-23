
import React, { useLayoutEffect, useRef } from "react";

export default function PlayIconIcon(props) {
    const { svg1, svg2, icon1Class, icon2Class, iconWrapClass = '', svg1Style = { fill: '', stroke: '' }, svg2Style = { fill: '', stroke: '' } } = props;
    const { icon: icon1 = '' } = svg1 || '';
    const { icon: icon2 = '' } = svg2 || '';

    let icon1Ref = useRef();
    let icon2Ref = useRef(); 

    useLayoutEffect(() => {
        if (icon1) {
            icon1Ref.current.firstChild.setAttribute('class', icon1Class);
            icon1Ref.current.firstChild.style.fill = svg1Style.fill
            icon1Ref.current.firstChild.style.stroke = svg1Style.stroke
        }
        if (icon2) {
            icon2Ref.current.firstChild.setAttribute('class', icon2Class);
            icon2Ref.current.firstChild.style.fill = svg2Style.fill
            icon2Ref.current.firstChild.style.stroke = svg2Style.stroke
        }
    }, [icon1Class, svg1Style, icon2Class, svg2Style])

    return (
        <span className={`icon-container ${iconWrapClass}`}>
            <i ref={icon1Ref} className={`bottom-icon`} dangerouslySetInnerHTML={{ __html: icon1 }}></i>
            <i ref={icon2Ref} className={`top-icon`} dangerouslySetInnerHTML={{ __html: icon2 }}></i>
        </span>
    )
}