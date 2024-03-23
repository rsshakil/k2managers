import React from 'react';
import '../Modal.css';

const WhiteModalWrapper = ({ children, width, className }) => {
    return (
        <div tabIndex={-1} className="overlay modal-overlay !bg-[#f4f5f7]">
            <div className={`content-m min-h-full ${className}`}>
                <div className={`content-1440 ${width} flex-container`}>{children}</div>
            </div>
        </div>
    );
};
export default WhiteModalWrapper;
