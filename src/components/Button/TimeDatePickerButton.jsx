import React from 'react';

const TimeDatePickerButton = ({ handleClear, handleSet, className }) => {
    return (
        <div className={`flex justify-between w-full space-x-4 text-blue-100 mt-4 ${className}`}>
            <button
                className="font-bold text-white bg-blue-100 hover:bg-blue-300 w-[171px] h-[2rem]"
                onClick={handleClear}
                type="button"
            >
                クリア
            </button>
            <button
                className="font-bold text-white bg-blue-100 hover:bg-blue-300 w-[171px] h-[2rem]"
                onClick={handleSet}
                type="button"
            >
                決定
            </button>
        </div>
    );
};
export default TimeDatePickerButton;
