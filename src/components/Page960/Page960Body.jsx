import React from 'react';
import './Page960.css';
const Page960Body = ({ children }) => {
    return (
        /* component for page960 body content */
        <div className="page960-body min-w-[960px]">
            <div className="p-2">{children}</div>
        </div>
    );
};
export default Page960Body;
