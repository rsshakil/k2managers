import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { isNumeric } from '../../../utilities/commonFunctions';
import SelectBox from '../../Form/FormInputs/SelectBox';
import TextBox from '../../Form/FormInputs/TextBox';
import InputContainer from '../../Wrapper/InputContainer';

export default function ExpandRowInput({
    fc,
    i,
    handleSubmit,
    rowsLabel,
    itemConditionChange,
    selectedItemConditionsArr,
    itemConditions,
    deleteInputFiledRows,
    itemConditionChangeAmount,
    amountValue
}) {

    const format = (num) => {
        return String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1,')
    }



    const [value, setValue] = React.useState(); //format(selectedItemConditionsArr[i].amount) || ""
    const onChangeValue = (e) => {
        let typedValue = e.target.value
        // Step 0: Checking number or empty string

        if (typedValue == "" || !isNumeric(typedValue.charAt(0))) {
            setValue("");
            return 0;
        }

        let proverb = e.target.value
        let RemoveComma = proverb.replaceAll(',', '')



        let stateValue = format(parseInt(RemoveComma))
        setValue(stateValue)
    }

    useEffect(() => {
        try {
            setValue(format(selectedItemConditionsArr[i].amount))
        } catch (error) {
            console.log("Set amount in state", error);
        }
    }, [])

    return (
        <>
            <div className="flex" key={i}>
                <div className="flex w-full space-x-10">
                    <div className="w-[50%]">
                        <InputContainer className="!mb-0">
                            <SelectBox
                                inputClassName='bg-blue-25 text-blue-100'
                                labelClassName="text-blue-100"
                                name={`filter_item_${rowsLabel}_${i}`}
                                dataFieldType="item_condition"
                                target_name={rowsLabel}
                                target_index={i}
                                onChange={itemConditionChange}
                                defaultValue={selectedItemConditionsArr[i]?.id}
                            >
                                <option
                                    key='DEFAULT'
                                    value=''>条件設定なし（無条件）
                                </option>
                                {
                                        itemConditions?.length > 0 &&
                                        itemConditions?.map((option) => (
                                            <option
                                                value={option.id}
                                                key={option.id}
                                                selected={selectedItemConditionsArr[i]?.id === option.id}
                                            >
                                                {option.name}
                                            </option>
                                        ))

                                }
                            </SelectBox>
                        </InputContainer>
                    </div>
                    <div className="w-[47%]">
                        <InputContainer>
                            <TextBox
                                labelClassName='text-blue-100'
                                inputClassName='bg-blue-25 text-right placeholder-blue-100 placeholder:text-left'
                                // placeholder="販売価格 Enter Click to submit the form"
                                // type="number"
                                placeholder="販売価格"
                                defaultValue={selectedItemConditionsArr[i]?.amount}
                                name={`item_condition_${selectedItemConditionsArr[i]?.id}_amount`}
                                type="text"
                                target_name={rowsLabel}
                                target_index={i}
                                onChange={(e) => {
                                    onChangeValue(e)
                                    itemConditionChangeAmount(e)
                                }}

                                value={value}

                            />
                        </InputContainer>
                    </div>
                </div>
                <div
                    className="hover:text-blue-50 h-8 w-[3%] cursor-pointer pl-2 flex items-center text-blue-100">
                    <FaTrash className="" onClick={() => {
                        deleteInputFiledRows(fc, rowsLabel, i)
                    }} />
                </div>
            </div>
        </>
    )
}
