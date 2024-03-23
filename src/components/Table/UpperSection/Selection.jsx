import React from 'react';
import styles from './upperSection.module.css';

// Filter Selection List
export default function Selection(props) {
    const { name, defaultValue, options, className, value, onChange, ...others } = props;
    return (
        <div className="ml-2 mr-2">
            <select
                name={name !== undefined ? name : 'function'}
                className={`${styles.filterIcon} ${
                    className !== undefined ? className : ''
                } filter-search text-blue-50 max-w-[9.25rem] ellipsis cursor-pointer appearance-none`}
                value={value}
                onChange={onChange}
                {...others}
            >
                <option defaultValue={defaultValue} value="">
                    {defaultValue}
                </option>
                {options &&
                    options.map((option, index) => (
                        <option key={index} value={option.id}>
                            {option.value}
                        </option>
                    ))}
            </select>
        </div>
    );
}
