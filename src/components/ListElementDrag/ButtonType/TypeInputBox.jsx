import React from 'react';
import { errorMessages } from '../../../lib/errorMessages';
import InputContainer from '../../Wrapper/InputContainer';

const TypeInputBox = ({
    handleClick,
    disabled,
    buttonLabel,
    label,
    inputLabel1,
    inputLabel2,
    inputValue1,
    inputValue2,
    handleChange,
    inputRef,
    inputRef2,
    placeholder1,
    placeholder2,
}) => {
    return (
        <>
            <InputContainer className="pr-10">
                <label className="text-blue-100 ml-[-30px] text-left">{label}</label>
                <div className="flex justify-between w-full space-x-2 !cursor-pointer text-blue-100 mt-[1rem]">
                    <div className="flex flex-col w-[30%]">
                        <label className="text-blue-100 text-left">{inputLabel1}</label>
                        <input
                            ref={inputRef}
                            className="h-8 p-2 text-black outline-none border border-solid border-blue-100 bg-blue-25 placeholder-gray-300"
                            type="text"
                            value={inputValue1}
                            onChange={handleChange}
                            placeholder={placeholder1 ? errorMessages.W_REQUIRED_01(placeholder1) : ''}
                        />
                    </div>
                    <div className="flex flex-col w-[60%] ">
                        <label className="text-blue-100 text-left">{inputLabel2}</label>
                        <input
                            className="h-8 p-2 outline-none text-black border border-solid border-blue-100 bg-blue-25 placeholder-gray-300"
                            type="text"
                            value={inputValue2}
                            ref={inputRef2}
                            placeholder={placeholder2 ? errorMessages.W_REQUIRED_01(placeholder2) : ''}
                        />
                    </div>

                    <div className="mt-[24px]">
                        <button
                            type="button"
                            onClick={handleClick}
                            className="w-[60px] bg-blue-400 hover:bg-blue-300 text-blue-100 hover:text-white cursor-pointer items-end h-[32px]"
                            disabled={disabled}
                        >
                            {buttonLabel}
                        </button>
                    </div>
                </div>
            </InputContainer>
        </>
    );
};
export default TypeInputBox;
