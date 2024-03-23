import React from 'react';
const SelectBox = ({ label, labelClassName, inputClassName, border = 'border', ...props }) => {
    return (
        <>
            <label htmlFor={props.id || props.name} className={`${labelClassName}`}>
                {label}
            </label>
            <div className="flex justify-between">
                <select
                    className={`h-8 pl-1 py-1 select-icon cursor-pointer outline-none  border-solid  border-blue-100 w-full ${inputClassName} ${border}`}
                    {...props}
                />
            </div>
        </>
    );
};
export default SelectBox;
