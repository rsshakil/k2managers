import React from "react";

const OutlineButtonContainer = ({ children }) => {
    return (
        <div className="px-4 h-6 flex justify-start items-center bg-green-100">
            {children}
        </div>
    );
};

export default OutlineButtonContainer;
