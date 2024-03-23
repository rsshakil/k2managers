import SelectBox from "devextreme-react/select-box";
import React from "react";
import InputContainer from "../../Wrapper/InputContainer";


const ButtonTypeC = ({items, placeholder, value, onValueChanged}) => {
    return (
        <InputContainer>
            <label className="text-start text-blue-100">他の施設のアイテム状態を複製する</label>
                <div className="dx-field-value w-full">
                    <SelectBox items={items}
                               placeholder={placeholder}
                               value={value}
                               onValueChanged={onValueChanged}
                               showClearButton={true}
                    /> 
                </div>
        </InputContainer>
    )
}
export default ButtonTypeC