import React from 'react';

export default function UpperSection({ children }) {
    return (
        <>
            <div className="mt-4 mb-2 flex justify-between items-center">{children}</div>
        </>
    );
}
