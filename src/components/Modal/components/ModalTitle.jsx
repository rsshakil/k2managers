import React from 'react';

const ModalTitle = ({ title, className }) => {
    return (
        <>
            <h2 className={`font-bold text-center ${className}`}>{title}</h2>
        </>
    );
};

export default ModalTitle;
