import React from "react";
import SelectBox from "../../../components/Form/FormInputs/SelectBox";
import TextAreaInput from "../../../components/Form/FormInputs/TextAreaInput";
import TextBox from "../../../components/Form/FormInputs/TextBox";
import InputContainer from "../../../components/Wrapper/InputContainer";


const InformationSection = (props) => {
    return (
        <>
            {/* Information title (up to 128 characters, no line breaks, no TEL, etc.) */}
            <InputContainer>
                <TextBox
                    label={props.titleLabel}
                    inputClassName="bg-blue-25 text-black placeholder-blue-50"
                    labelClassName="font-normal"
                    maxLength="128"
                    name={props.titleName}
                    placeholder={props.titlePlaceholder}
                />
            </InputContainer>
            {/*Information Contents (up to 2048 characters can be broken) */}
            <InputContainer>
                <TextAreaInput
                    label={props.contentLabel}
                    inputClassName="placeholder-blue-50 bg-blue-25 resize-none text-black " 
                    maxLength="2048"
                    labelClassName="font-normal"
                    name={props.contentName}
                    placeholder={props.contentPlaceholder}
                />
            </InputContainer>
            {/* Information color */}
            <InputContainer className="mb-[2rem]">
                <SelectBox
                    label={props.colorLabel}
                    labelClassName="font-normal "
                    inputClassName="bg-transparent text-white  "
                    border="border-b"
                    name={props.colorName}
                >
                    
                    {props.colorValues.map((color, index) => (
                        <option value={index+1} key={index} className="bg-black" >
                            {color}
                        </option>
                    ))}
                </SelectBox>
            </InputContainer>
        </>
    );
};

export default InformationSection;
