import { AiOutlinePlus } from 'react-icons/ai';
import React from 'react';

const ButtonTypeNormal = ({ addTimeInput, buttonTitle }) => {
    return (
        <div className="flex mt-4 justify-center align-middle hover:bg-blue-400 items-center bg-blue-25 !cursor-pointer text-blue-100 border border-all h-[32px]">
            <AiOutlinePlus className="h-[22px] w-[22px] z-10 mr-[-32px]" onClick={addTimeInput} />
            <button type="button" onClick={addTimeInput} className="w-full cursor-pointer">
                {' '}
                {buttonTitle}
            </button>
        </div>
    );
};
export default ButtonTypeNormal;
