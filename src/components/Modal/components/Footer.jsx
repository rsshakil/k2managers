import React from 'react';

export default function FooterDialog({ error, numButton, children }) {
    return (
        <>
            <div className="p-2 flex flex-col text-red-600">
                <p className="leading6 text-right h-8">{error}</p>
                <div className={`w-full grid grid-cols-${numButton} gap-x-8 gap-y-4`}>{children}</div>
            </div>
        </>
    );
}
