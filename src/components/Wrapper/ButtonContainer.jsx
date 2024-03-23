import React from 'react';

const ButtonContainer = ({children}) => {
    return (
        <div className="flex w-full space-x-[42px]">
            {children}
        </div>
    );
};

export default ButtonContainer;