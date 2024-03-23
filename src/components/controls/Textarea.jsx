import React from 'react';

export default function Textarea(props) {
    const { name, id, placeholder, rows, cols, resize, textColor, placeholderColor, ...others } = props;

    function isClassPropsApply(textColor, placeholderColor) {
        textColor = textColor !== undefined ? textColor : 'text-black';
        placeholderColor = placeholderColor !== undefined ? placeholderColor : 'placeholder-slate-700';
        return textColor + ' ' + placeholderColor;
    }

    return (
        <textarea
            name={name}
            id={id}
            placeholder={placeholder}
            rows={rows ? rows : '2'}
            cols={cols ? cols : '20'}
            {...others}
            className={`mb-8 p-2 outline-none border border-solid border-blue-100 ${isClassPropsApply(
                textColor,
                placeholderColor
            )} ${resize ? 'resize-none' : ''}`}
        />
    );
}
