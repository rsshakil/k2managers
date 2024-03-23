import React from 'react';

export const StepBox = (props) => {
    const {  color, stepnumber, fill, stroke, border, bgColor, borderWidth = '' } = props;
    return (
        <div
            className={`rounded-full transition duration-500 ease-in-out h-12 w-12 ${borderWidth}`}
            style={{ backgroundColor: bgColor, borderColor: border, color: color }}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-bookmark "
            >
                <text x="12" y="19.25" fontSize="20" stroke={stroke} textAnchor="middle" strokeWidth="0.75" fill={fill}>
                    {stepnumber}
                </text>
            </svg>
        </div>
    );
};
