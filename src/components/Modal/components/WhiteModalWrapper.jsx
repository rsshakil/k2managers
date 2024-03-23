import React from 'react';
import '../Modal.css';

const WhiteModalWrapper = ({ children, width, className }) => {
    return (
        <div tabIndex={-1} className="modal-overlay overflow-scroll !bg-[#f4f5f7] dx-scrollable-container">
            <div className={`content-m h-screen ${className}`}>
                <div className={`content-1440 bg-white ${width} flex-container`}>{children}</div>
            </div>
        </div>
    );
};
export default WhiteModalWrapper;
