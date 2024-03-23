import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { isNumeric } from '../../../utilities/commonFunctions';
import SelectBox from '../../Form/FormInputs/SelectBox';
import TextBox from '../../Form/FormInputs/TextBox';
import InputContainer from '../../Wrapper/InputContainer';

export default function ExpandRowInputV2({
    fc,
    i,
    handleSubmit,
    rowsLabel,
    itemConditionChange,
    selectedItemConditionsArr,
    itemConditions,
    deleteInputFiledRows,
    itemConditionChangeAmount,
    amountValue,
    allOptions
}) {

    const [selectedOptionsValue, setSelectedOptionsValue] = useState([...itemConditions])
    const [value, setValue] = React.useState(); //format(selectedItemConditionsArr[i].amount) || ""


    useEffect(() => {
        try {
            setValue(format(fc.amount))
        } catch (error) {
            console.log("Set amount in state", error);
        }
    }, [])


    useEffect(() => {
        let prevSelected = allOptions && allOptions.filter((item) => item?.id === fc.id)[0];

        if (prevSelected) {
            const isPresentPrevItem = itemConditions.find(x => x.id == prevSelected.id);
            if (!isPresentPrevItem) setSelectedOptionsValue([prevSelected, ...itemConditions]);
            else setSelectedOptionsValue(itemConditions);
        }
        else {
            setSelectedOptionsValue(itemConditions);
        }
    }, [itemConditions])



    const format = (num) => {
        return String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1,')
    }

    const handleInputFocus = (e) => {
        setValue(e.target.value.replace(/\D/g, ''));
    }

    const handleOnChangeInput = (e) => {
        const typedValue = e.target.value;

        if (typedValue && !/^\d+$/.test(typedValue)) {
            e.preventDefault();
            return;
        }

        itemConditionChangeAmount(e);
        setValue(typedValue);
    }

    const handleOnBlurInput = (e) => {
        let typedValue = e.target.value
        // Step 0: Checking number or empty string

        let formattedValue = ''

        if (typedValue && /\d/.test(typedValue)) {
            let rawValue = typedValue.replace(/\D/g, '');
            formattedValue = format(parseInt(rawValue))
        }

        setValue(formattedValue)
    }


    // useEffect(() => {
    //     // console.log("🚨itemConditions", itemConditions)
    //     // console.log("🚨allOptions", allOptions)

    //     try {
    //         let prevSelected = allOptions && allOptions.filter((item) => item?.id === fc.id)[0];

    //         if (prevSelected) {
    //             const itemConditionsCopy = [...itemConditions];
    //             const removeDuplicateItem = removeDuplicateOption(itemConditionsCopy, prevSelected)
    //             // console.log("🧑‍💻[prevSelected, ...removeDuplicateItem]", [prevSelected, ...removeDuplicateItem])
    //             setSelectedOptionsValue([prevSelected, ...removeDuplicateItem])
    //         } else {
    //             // console.log("🧑‍💻There is no previous select set What value is coming from params")
    //             setSelectedOptionsValue([...itemConditions])
    //         }
    //     } catch (error) {
    //         console.log("error from set search value in expand row input", error)
    //     }

    //     // setSelectedOptionsValue([...itemConditions])
    // }, [itemConditions])

    // remove duplicated option from search result 
    const removeDuplicateOption = (results, prevSelected) => {
        // same id should remove from the option list other wise show error (corner case)
        let removeDuplicateItem
        let updatedOptionArray;
        if (results && prevSelected?.id) {
            removeDuplicateItem = results.filter(rs => rs.id !== prevSelected.id)
            if (removeDuplicateItem) {
                updatedOptionArray = [...removeDuplicateItem]
                // updatedOptionArray = [prevSelected, ...removeDuplicateItem]
                //  console.log("updatedOptionArray", updatedOptionArray)
            }
        }
        return updatedOptionArray;
    }


    return (
        <>
            <div className="flex" key={i}>
                <div className="flex w-full space-x-10">
                    <div className="w-[50%]">
                        {/* <p>Investigating select box</p> */}
                        <InputContainer className="!mb-0">
                            <SelectBox
                                inputClassName='bg-blue-25 text-blue-100'
                                labelClassName="text-blue-100"
                                name={`filter_item_${rowsLabel}_${i}`}
                                dataFieldType="item_condition"
                                target_name={rowsLabel}
                                target_index={i}
                                onChange={itemConditionChange}
                                defaultValue={fc.id}
                            // defaultValue={selectedItemConditionsArr[i]?.id}
                            >
                                <option
                                    key='DEFAULT'
                                    value=''>条件設定なし（無条件）
                                </option>
                                {
                                    selectedOptionsValue?.length > 0 &&
                                    selectedOptionsValue?.map((option) => (
                                        <option
                                            value={option.id}
                                            key={option.id}
                                            selected={fc.id == option.id}
                                        // selected={selectedItemConditionsArr[i]?.id === option.id}
                                        >
                                            {option.name}{option.managementName && '（' + option.managementName + '）'}
                                        </option>
                                    ))

                                }
                            </SelectBox>
                        </InputContainer>
                    </div>
                    <div className="w-[47%]">
                        {/* <p>Investigating amount</p> */}
                        <InputContainer>
                            <TextBox
                                labelClassName='text-blue-100'
                                inputClassName='bg-blue-25 text-right placeholder-blue-100 placeholder:text-left'
                                // placeholder="販売価格 Enter Click to submit the form"
                                // type="number"
                                placeholder="販売価格"
                                defaultValue={fc.amount}
                                // defaultValue={selectedItemConditionsArr[i]?.amount}
                                name={`item_condition_${selectedItemConditionsArr[i]?.id}_amount`}
                                type="text"
                                target_name={rowsLabel}
                                target_index={i}
                                onFocus={handleInputFocus}
                                onChange={handleOnChangeInput}
                                onBlur={handleOnBlurInput}
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
