import { SelectBox } from 'devextreme-react';
import React, { useEffect, useRef, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import TextBox from '../../Form/FormInputs/TextBox';
import './ButtonType.css';
import InputContainer from '../../Wrapper/InputContainer';
import _ from "lodash";

export default function ButtonTypeF({
    buttonData = [],
    displayExpr,
    valueExpr,
    optionValue,
    addFromFType,
    label,
    dropDownButtonTemplate,
    limit,
    list,
    placeholder,
    customSearchEnabled, // Optional
    customSearchLabel, // Optional
    customSearchPlaceholder, // Optional
    searchItemValue,
}) {
    const ref = useRef();
    const [searchItemNameValue, setSearchItemNameValue] = useState('');
    const [searchItem, setSearchItem] = useState([]);
    const [buttonState, setButtonState] = useState([...buttonData]);
    const [buttonDisable, setButtonDisable] = useState(false);

    useEffect(() => {
        if (buttonData && Array.isArray(buttonData)) {
            itemNameSearchHandler(searchItemValue);
        }
    }, [searchItemValue, buttonData])

    useEffect(() => {
        setButtonState([...buttonData]);
        searchItem.length > 0 && setSearchItem([...searchItem]);
    }, [buttonData]);

    useEffect(() => {
        if (list && limit) {
            if (list.length <= limit - 1) {
                setButtonDisable(false);
            } else {
                setButtonDisable(true);
            }
        }
    }, [list]);

    const itemNameSearchHandler = (searchKeyword) => {
        let filteredItems = [...buttonData];
        //console.log('llllloooooo', filteredItems)
        console.log('searchKeyword from ButtonTypeF', searchKeyword);

        if (searchKeyword) {
            filteredItems = filteredItems.filter((item) => {
                return Object.values(_.pick(item, ["text", "managementName"])).some((value) => String(value).toLowerCase().includes(searchKeyword.toLowerCase()));
            });
            console.log('filteredItems', filteredItems)
        }

        setSearchItem(filteredItems);
    };

    return (
        <>
            {customSearchEnabled && (
                <InputContainer className="mb-0">
                    <TextBox
                        label={customSearchLabel}
                        labelClassName="text-blue-100 text-left"
                        inputClassName="bg-blue-25 mb-4"
                        type="text"
                        name="customSearchName"
                        placeholder={customSearchPlaceholder}
                        value={searchItemNameValue}
                        onChange={(e) => {
                            setSearchItemNameValue(e.target.value);
                            itemNameSearchHandler(e.target.value)
                        }}
                    />
                </InputContainer>
            )}

            {label && <label className="text-blue-100">{label}</label>}
            <div className="flex justify-center align-middle hover:bg-blue-400 items-center bg-blue-25 !cursor-pointer text-blue-100 border border-all h-[32px]">
                <AiOutlinePlus className="h-[22px] w-[22px] z-10 mr-[-32px]" />
                <div className="dx-field-value customSelectButton customSelectButtonInput">
                    <SelectBox
                        ref={ref}
                        items={(searchItemValue || searchItemNameValue) ? searchItem : buttonState}
                        // placeholder="オプション"
                        placeholder={placeholder ? placeholder : 'オプション'}
                        displayExpr={displayExpr ? displayExpr : 'text'}
                        valueExpr={valueExpr ? valueExpr : 'text'}
                        onItemClick={(e) => {
                            addFromFType(e);
                            e.component.reset();
                        }}
                        value={optionValue}
                        noDataText="データがありません" // Addded 4/1/23 Linkon No Data text changes @tatchan san command
                        dropDownButtonTemplate={dropDownButtonTemplate ? dropDownButtonTemplate : ''} // Right side icon dropdownButtonTemplate take icon as a input
                        disabled={buttonDisable}
                    />
                </div>
            </div>
        </>
    );
}
