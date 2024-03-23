import React from 'react';
import styles from '../Table/UpperSection/upperSection.module.css';
export default function Select({ name, id, defaultValue, options, value, onChange }) {
    return (
        <>
            <select
                name={name !== undefined ? name : 'function'}
                id={id !== undefined ? id : 'function'}
                className={`${styles.filterIcon} pt-px pb-0.5 pl-4 outline-none bg-transparent border-b border-cLightBlue text-cLightBlue cursor-pointer appearance-none`}
                value={value}
                onChange={onChange}
            >
                <option defaultValue={defaultValue}>{defaultValue}</option>
                {options.map((item, index) => (
                    <option key={index} value={item.id}>
                        {item.value}
                    </option>
                ))}
            </select>
        </>
    );
}
