import React from 'react';
import SVGComponent from './svgviewer-searchicon';

// Search in the table and also filtering with search key
export default function Search({ placeholder, className, name, value, onChange, ...rest }) {
    return (
        <>
            <div className="flex justify-center items-center relative ml-2">
                <input
                    type="text"
                    className={`${
                        className !== undefined ? className : ''
                    } filter-search pr-6 placeholder-blue-400 text-blue-50`}
                    placeholder={placeholder !== null ? placeholder : ''}
                    value={value || ''}
                    onChange={onChange}
                    {...rest}
                    name={name ? name : ''}
                />
                <SVGComponent className="absolute left-32 z-10" />
            </div>
        </>
    );
}
