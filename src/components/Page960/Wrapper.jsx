import React from 'react';

const Wrapper = ({ children }) => {
    return <div className="content min-h-full overlay scroll-bar">{children}</div>;
};
export default Wrapper;
