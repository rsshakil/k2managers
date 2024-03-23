import React from 'react';

export default function Input({
    id,
    name,
    type,
    placeholder,
    textColor,
    placeholderColor,
    value,
    onChange,
    width,
    className,
    ...others
}) {
    function isClassPropsApply(textColor, placeholderColor, width, className) {
        textColor = textColor !== undefined ? textColor : 'text-black'; // TailwindCSS style component added default bg-blue-100
        placeholderColor = placeholderColor !== undefined ? placeholderColor : ' -slate-700'; // TailwindCSS style component added default hover:bg-blue-200
        width = width !== undefined ? width : 'w-full';
        return textColor + ' ' + placeholderColor + ' ' + width + ' ' + className;
    }

    return (
        <input
            id={id}
            name={name}
            placeholder={placeholder}
            className={`h-8 mb-8 p-2 outline-none border border-solid border-blue-100 ${isClassPropsApply(
                textColor,
                placeholderColor,
                width,
                className
            )}`}
            type={type !== undefined ? type : 'text'}
            value={value}
            onChange={onChange}
            {...others}
        />
    );
}
