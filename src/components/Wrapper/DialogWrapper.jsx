import React from 'react';
import '../Modal/Modal.css';

const DialogWrapper = ({ children, width, className }) => {
    return (
        <div tabIndex={-1} className="overlay modal-overlay text-black backdrop-blur-sm bg-white/70">
            <div className={`content-m min-h-full ${className}`}>
                <div className={`content-1440_2 ${width} flex-container`}>{children}</div>
            </div>
        </div>
    );
};
export default DialogWrapper;
