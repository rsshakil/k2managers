import React from 'react';
import { BsFillPlusCircleFill } from 'react-icons/bs';

export default function AddButton({ text, endIcon, textColor, hoverColor, iconPosition = 'right', ...others }) {
    return (
        <>
            <div className="flex justify-end ">
                {iconPosition === 'left' && (
                    <span className="py-1 ml-2">{endIcon === undefined ? <BsFillPlusCircleFill /> : endIcon}</span>
                )}

                <button
                    className={`flex items-center pl-2 columns-12 tracking-normal text-left ${
                        textColor === undefined ? 'text-blue-100' : textColor
                    }  ${hoverColor === undefined ? 'hover:text-blue-50 ' : hoverColor}`}
                    {...others}
                >
                    <span>{text}</span>

                    {iconPosition === 'right' && (
                        <span className="float-right py-1 ml-2">
                            {endIcon === undefined ? <BsFillPlusCircleFill /> : endIcon}
                        </span>
                    )}
                </button>
            </div>
        </>
    );
}
