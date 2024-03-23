import React from 'react';
import styles from './upperSection.module.css';

const OutlineSelection = ({ name, defaultValue, options, className, onClick, value, onChange, ...others }) => (
    <div>
        <select
            name={name}
            className={`${styles.outlineFilterIcon} ${
                className !== undefined ? className : ''
            } w-[22.625rem] h-8 pt-0 pb-0s pl-2 outline-none border text-blue-100 border-blue-100 bg-transparent cursor-pointer appearance-none focus:outline-2 outline-offset-2 focus:outline-blue-100`}
            value={value}
            onChange={onChange}
            onClick={onClick}
            {...others}
        >
            {defaultValue && (
                <option defaultValue={defaultValue} value="">
                    {defaultValue}
                </option>
            )}
            {options &&
                options.map((option, index) => (
                    <option key={index} value={option.id}>
                        {option.value}
                    </option>
                ))}
        </select>
    </div>
);

export default OutlineSelection;
