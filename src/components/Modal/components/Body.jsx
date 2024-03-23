import React from 'react';

export default function BodyDialog({ children, className, overflowRemove }) {
    return (
        <>
            <div
                className={`p-2 ${className !== undefined ? className : ''} ${
                    overflowRemove ? overflowRemove : 'h-[16rem] overscroll-auto'
                }`}
            >
                {children}
            </div>
        </>
    );
}
