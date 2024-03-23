import React from 'react';

export default function OutlineButton({ text, className, children, ...others }) {
    return (
        <button
            className={`${
                className !== undefined ? className : ''
            } active:bg-blue-400 h-[20px] text-[12px] min-w-[64px] hover:bg-blue-300 hover:text-white tracking-normal px-2 border-[0.5px] border-blue-100 text-center text-blue-100 mr-3`}
            {...others}
        >
            {text}
        </button>
    );
}
