import React, { useLayoutEffect, useRef } from 'react';

export const FewSlot = (props) => {
    const {
        timeTextClass,
        rowWrapClass,
        statusWrapClass,
        stockStatusTextClass,
        icon1Class,
        icon2Class,

        rowStyle,
        timeTextStyle,
        stockStatusTextStyle,
        icon1Style,
        icon2Style,
        divideStyle,

        statustext,
        svg1,
        svg2,
        strTime,
    } = props;

    const { icon: icon1 = '' } = svg1 || '';
    const { icon: icon2 = '' } = svg2 || '';

    let icon1Ref = useRef();
    let icon2Ref = useRef();

    useLayoutEffect(() => {
        if (icon1) {
            icon1Ref.current.firstChild.setAttribute('class', icon1Class);
            icon1Ref.current.firstChild.style.fill = icon1Style.fill;
            icon1Ref.current.firstChild.style.stroke = icon1Style.stroke;
        }
        if (icon2) {
            icon2Ref.current.firstChild.setAttribute('class', icon2Class);
            icon2Ref.current.firstChild.style.fill = icon2Style.fill;
            icon2Ref.current.firstChild.style.stroke = icon2Style.stroke;
        }
    }, [icon1Class, icon1Style, icon2Class, icon2Style]);

    return (
        <div data-id="rowWrapClass" className={`${rowWrapClass}`} style={divideStyle}>
            <li className={`flex flex-row`} style={rowStyle}>
                <div className="select-none flex flex-1 items-center p-2">
                    <div className="flex flex-1">
                        <p className={`tracking-widest pl-4 alig-middlen ${timeTextClass}`} style={timeTextStyle}>
                            {strTime}
                        </p>
                    </div>

                    <div className={`w-24 text-right flex justify-end ${statusWrapClass}`}>
                        <p className={`${stockStatusTextClass}`} style={stockStatusTextStyle}>
                            {statustext}
                        </p>

                        <span className={`icon-container`}>
                            <i ref={icon1Ref} className={`bottom-icon`} dangerouslySetInnerHTML={{ __html: icon1 }}></i>
                            <i ref={icon2Ref} className={`top-icon`} dangerouslySetInnerHTML={{ __html: icon2 }}></i>
                        </span>
                    </div>
                </div>
            </li>
        </div>
    );
};
