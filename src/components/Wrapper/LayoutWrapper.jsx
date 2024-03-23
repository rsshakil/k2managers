import React from 'react';

const LayoutWrapper = ({ children }) => {
    return <div className="px-4 min-h-[calc(100vh_-_92px)] flex justify-center items-start">{children}</div>;
};

export default LayoutWrapper;
