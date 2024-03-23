import React from 'react';
const Page1440Body = ({ children, className = '', id }) => {
    return (
        /* component for 1440px screen's body content */

        <div className="relative overflow-hidden flex justify-center flex-col items-center mb-8" id={id}>
            {/* <div className={`${className} scroll-bar wrap overscroll-auto overlay min-w-[1440px]`}> */}
            <div className={`${className} scroll-bar wrap overscroll-auto overlay`}>
                <div className="p-2">{children}</div>
            </div>
        </div>
    );
};
export default Page1440Body;
