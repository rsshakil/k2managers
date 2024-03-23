import React from "react";

const BreadCrumbs = ({ title, className, ...props }) => {
    
    return (
        <div className={`truncate overflow-1440 px-1 ${className}`}>
                <span {...props} className="w-auto">{title}</span>
        </div>
    );
};
export default BreadCrumbs;
