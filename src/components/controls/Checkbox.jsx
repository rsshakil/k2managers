import React from 'react';

function Checkbox(props) {
    const { label, checked, checkHandler, ...others } = props;

    return (
        <>
            <label className="text-blue-100 font-normal">
                <input
                    id={label}
                    type="checkbox"
                    className="mr-2 checked:text-blue-500"
                    checked={checked}
                    onChange={checkHandler}
                    {...others}
                />
                {label}
            </label>
        </>
    );
}

export default Checkbox;
