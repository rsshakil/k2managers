import React from 'react';

const Select = (props) => {
    const {
        name,
        labrl,
        labelId,
        placeholder,
        onchange,
        options,
        defaultValue,
        className,
        labelClass,
        spanText,
        spanClass = '',
        spanStyles = {},
        selectStyle = {},
    } = props;

    return (
        <div className="">
            <label data-id="labelClass" for={labelId} className={`${labelClass}`}>
                {labrl}
            </label>

            <div className="flex">
                <select
                    id={labelId}
                    className={`w-full ${spanText ? '!rounded-r-none' : ''} ${className}`}
                    style={selectStyle}
                    aria-label={placeholder}
                    name={name}
                    onChange={onchange}
                    defaultValue={defaultValue}
                    value={defaultValue}
                >
                    {options.map((children) => {
                        return <option value={children}>{children}</option>;
                    })}
                </select>
                {spanText && (
                    <span
                        className={`border text-center align-middle grid content-center !rounded-l-none ${spanClass}`}
                        style={spanStyles}
                    >
                        {spanText}
                    </span>
                )}
            </div>
        </div>
    );
};

export default Select;
