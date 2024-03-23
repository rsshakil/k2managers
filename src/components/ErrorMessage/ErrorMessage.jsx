import React from "react";

const ErrorMessage = ({ children, className }) => {
    return (
        <div className={`h-8 mt-8 ${className}`}>
            <p className={`  text-orange-300 text-right  `}>{children}</p>
        </div>
    );
};

export default ErrorMessage;
