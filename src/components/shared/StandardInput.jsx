import React, { useRef, useEffect } from 'react';
import useWindowDimensions from '../../hooks/useWindowDimensions';

const StandardInput = (props) => {
    const {
        inputmode,
        order,
        name,
        labrl,
        type,
        placeholder,
        value,
        autoComplete,
        onchange,
        required,
        onblur,
        className,
        labelClass,
        children,
        errorComponent,
        inputStyles,
        labelStyles,
        placeholderStyle,
    } = props;

    const elmLabel = useRef(null);
    const elmInput = useRef(null);
    const errorRef = useRef(null);

    const { width, height } = useWindowDimensions();

    //To make same label as its input
    useEffect(() => {
        const inputMaxwidth = elmInput.current.offsetWidth;

        if (labrl) {
            const { firstChild } = elmLabel.current;
            if (firstChild) {
                firstChild.style.maxWidth = inputMaxwidth - 8 + 'px';
            }
        }

        if (errorComponent && errorRef.current) {
            errorRef.current.style.maxWidth = inputMaxwidth + 'px';
        }
    }, [width, height, children]);

    const labelId = 'label-' + order;

    let placeholderCss = `
        .placeholderClas::placeholder{
            color:${placeholderStyle?.color}
        }
      `;

    return (
        <>
            <style>{placeholderCss}</style>

            <div ref={elmLabel} className="w-full flex flex-col">
                <label htmlFor={labelId} required={required} className={`break-all ${labelClass}`} style={labelStyles}>
                    {labrl}
                </label>
            </div>

            <label className="ml-0 flex w-full">
                <input
                    ref={elmInput}
                    id={labelId}
                    className={`placeholderClas w-full ${className}`}
                    style={inputStyles}
                    inputMode={inputmode}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onchange}
                    onBlur={onblur}
                    autoComplete={autoComplete}
                />
                {children}
            </label>

            <div ref={errorRef}>{errorComponent}</div>
        </>
    );
};

export default StandardInput;
