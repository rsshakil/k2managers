import { useRef } from 'react';
import React, { useEffect, useState } from 'react';
import { SelectBox } from 'devextreme-react';
import './ButtonType.css';
import { AiOutlinePlus, AiOutlinePlusCircle } from 'react-icons/ai';
import TextBox from '../../Form/FormInputs/TextBox';
import _ from "lodash";

export default function ButtonTypeFV2({
    buttonData,
    displayExpr,
    valueExpr,
    optionValue,
    addFromFType,
    label,
    dropDownButtonTemplate,
    limit,
    list,
    placeholder,
    disableFButton,
    setDisableFButton,
    searchItemNameValue, // Optional :: Required for Search
    setComponentRender2,
}) {
    const ref = useRef();

    const [searchItem, setSearchItem] = useState([]);
    const [buttonState, setButtonState] = useState([...buttonData]);

    // useEffect(() => {
    //     setButtonState([...buttonData]);
    //     searchItem && setSearchItem([...searchItem]);
    // }, [buttonData]);


    useEffect(() => {
        setButtonState(buttonData);

        console.log("⚓ touhid data", buttonData) // // Delete this line
        // const results = data.filter((item) => {
        //     return Object.values(item).some((value) =>
        //         String(value)
        //             .toLowerCase()
        //             .includes(searchItemNameValue.toLowerCase())
        //     );
        // }); // Delete this line
        const results = buttonData.filter((item) => {
            return Object.values(_.pick(item, ["text"])).some((value) => String(value).toLowerCase().includes(searchItemNameValue.toLowerCase()));
        });

        if (results.length > 0) setSearchItem(results)
        else setSearchItem([]);

        console.log("⚓Results:", results)
    }, [searchItemNameValue, buttonData]);

    useEffect(() => {
        if (list && limit) {
            if (list.length <= limit - 1) {
                setDisableFButton(false);
            } else {
                setDisableFButton(true);
            }
        }
    }, [list]);

    return (
        <>
            {label && <label className="text-blue-100">{label}</label>}
            <div className="flex justify-center align-middle hover:bg-blue-400 items-center bg-blue-25 !cursor-pointer text-blue-100 border border-all h-[32px]">
                <AiOutlinePlus className="h-[22px] w-[22px] z-10 mr-[-32px]" />
                <div
                    className={`dx-field-value customSelectButtonInput customSelectButton`}
                >
                    <SelectBox
                        ref={ref}
                        // items={searchItem.length ? searchItem : buttonState} // Prev condition
                        items={(searchItemNameValue === '' ? buttonState :
                            searchItem.length > 0 && searchItem) || (searchItem.length === 0 && searchItem)}
                        // new condition Lin kon
                        // if searchItem == '' -> all data will show
                        // if search.length > 0 -> searchItem array  
                        // OR [] will show
                        noDataText="データがありません"
                        placeholder={placeholder ? placeholder : 'オプション'}
                        displayExpr={displayExpr ? displayExpr : 'text'}
                        valueExpr={valueExpr ? valueExpr : 'text'}
                        disabled={disableFButton}
                        value={optionValue}
                        dropDownButtonTemplate={dropDownButtonTemplate ? dropDownButtonTemplate : ''} // Right side icon dropdownButtonTemplate take icon as a input
                        onItemClick={(e) => {
                            // ref.current._element
                            addFromFType(e);
                            e.component.reset();
                        }}
                    />
                </div>
            </div>
        </>
    );
}
