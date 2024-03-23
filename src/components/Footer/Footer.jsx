import React from 'react';
import './Footer.css';

const Footer = ({ children, classNameDiv, classNameFooter }) => {
    return (
        <footer
            className={`bottom-0 inset-x-0 z-30 bg-slate-100 relative flex items-center justify-between h-14 ${
                classNameFooter && classNameFooter
            }`}
        >
            <div className={classNameDiv && classNameDiv}> </div>
            {children}
        </footer>
    );
};

export default Footer;
