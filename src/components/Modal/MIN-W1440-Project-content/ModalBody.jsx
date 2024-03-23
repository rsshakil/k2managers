import React from 'react';
const ModalBody = ({ children }) => {
    return (
        <div className="p-2 " style={{ minHeight: 'calc(100vh - 370px)' }}>
            {children}
        </div>
    );
};
export default ModalBody;
