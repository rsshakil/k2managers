import { Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import {
    appDesignerState
} from "../../../store/recoil/appDesignerState";
import InputCheckBoxSettingPreview from "./InputCheckBoxSettingPreview";
import InputDateSettingPreview from "./InputDateSettingPreview";
import InputTimeSettingPreview from "./InputTimeSettingPreview";
import InputRadioBSettingPreview from "./InputRadioBSettingPreview";


function rangeItems(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => start + idx);
}


const FieldFormSettingsPreview = ({ pageText, pageId, data }) => {
    const selectRef = useRef(null)
    const [width1, setWidth1] = useState(0)
    const [recoilStateValue, setRecoilState] = useRecoilState(appDesignerState);
    const { activePageId } = recoilStateValue;
    const { classes, styles, info, prefixClass } = data || "";
    let viewSettingData = { ...classes, ...styles, ...prefixClass };

    const { divisionText = '', requiredCharacters = '' } = info;
 
    const labelClass = [
        classes.labelTextSize,
        classes.labelFontWeight,
        classes.labelCustomClass,
        'break-all'
    ].join(' ');
    const labelStyle = { ...styles.labelTextColor };

    const requiredClass = [
        classes.requiredTextSize,
        classes.requiredFontWeight,
        classes.requiredCustomClass,
    ].join(' ');
    const requiredStyle = { ...styles.requiredTextColor, ...styles.requiredBackgroundColor };

    const inputClass = [
        classes.valueTextSize,
        classes.valueFontWeight,
        classes.inputCustomClass,
        classes.inputBorderStyle,
        classes.inputBorderWidth,
        classes.inputBorderRadius,
        'w-full h-8 placeholderClas',
    ].join(' ');
    const inputStyle = { ...styles.valueTextColor, ...styles.inputBackgroundColor, ...styles.inputBorderColor };
    const inputWrapCustomClass = classes.inputWrapCustomClass;

    const errorMessageClass = [
        classes.errorMessageTextSize,
        classes.errorMessageFontWeight,
        classes.errorMessageCustomClass,
        'text-left'
    ].join(' ');
    const errorMessageStyle = { ...styles.errorMessageTextColor, ...styles.errorMessageBackgroundColor };

    const divideClass = [
        classes.divisionTextSize,
        classes.divisionTextWeight,
        classes.divisionTextCustomClass,
    ].join(' ');
    const divideWrapClass = classes.divisionTextwrapCustomClass;
    const divideStyle = { ...styles.divisionTextColor };




    let placeholderCss = `
        label{
          margin-left:0;
        }
        input,textarea,select[name=last_name]{
          background:inherit
        }
        .placeholderClas::placeholder{
            color:${viewSettingData?.placeholderTextColor?.color}
        }
        .labelStyle{
          color:${viewSettingData?.valueTextColor?.color}
        }
        .perrButtonTextColor{
          color:${viewSettingData?.selectTextColor?.color}
        }
        .peer:checked ~ .peer-checked:selectButtonTextColor{
          --tw-text-opacity: 1;
          color:${viewSettingData?.selectTextColor?.color}
        }
        .peer:checked ~ .peer-checked:selectButtonBackgroundColor{
          --tw-bg-opacity: 1;
          background-color: ${viewSettingData?.selectBackgroundColor?.backgroundColor};
        }
        .numberField::-webkit-inner-spin-button, 
        .numberField::-webkit-outer-spin-button {  
          height:auto;
          opacity: 1;
    
        }
      `; 
    function removeSM(str) { 
        if (typeof str != "undefined") {
            if (str.includes("sm:")) {
                let arr = str.split(":");
                return arr[1];
            } else {
                return str;
            }
        }

    }
    
    const changeColor = (item) => { 
        if (item.target.value == 0) {
            selectRef.current.style.color = viewSettingData?.placeholderTextColor?.color;
        } else {
            selectRef.current.style.color = viewSettingData?.valueTextColor?.color;
        }
    };
    const ref1 = useRef(null);
    useEffect(() => { 
        if (activePageId === "radioAFormSettings") {
            setWidth1(ref1.current.offsetWidth);
        }
    }, [viewSettingData?.buttonWidth]);

    return (
        <>
            <style>{placeholderCss}</style>
            <Formik>
                <form>
                    {activePageId == "inputTextSettings" && (
                        <>
                            <div className={`flex flex-col ${classes.inputWrapCustomClass}`}>
                                <label
                                    className={`${viewSettingData?.labelTextSize} ${viewSettingData?.labelFontWeight} ${viewSettingData?.labelCustomClass} pt-2`}
                                    style={{ color: viewSettingData?.labelTextColor?.color }}
                                >
                                    フォーム名
                                    <span
                                        className={`${viewSettingData?.requiredTextSize} ${viewSettingData?.requiredFontWeight} ${viewSettingData?.requiredCustomClass}`}
                                        style={{
                                            color: viewSettingData?.requiredTextColor?.color,
                                            backgroundColor:
                                                viewSettingData?.requiredBackgroundColor?.backgroundColor,
                                        }}
                                    >
                                        {requiredCharacters}
                                    </span>
                                </label>

                                <input
                                    name="last_name"
                                    className={`w-full p-2 h-8 placeholderClas 
                                        ${viewSettingData?.inputBorderWidth} ${viewSettingData?.inputBorderStyle} ${viewSettingData?.inputBorderRadius} 
                                        ${viewSettingData?.valueTextSize} ${viewSettingData?.valueFontWeight} ${viewSettingData?.inputCustomClass}`}
                                    defaultValue="入力テキスト"
                                    placeholder="プレイスホルダー"
                                    style={{
                                        color: viewSettingData?.valueTextColor?.color,
                                        backgroundColor: viewSettingData?.inputBackgroundColor?.backgroundColor,
                                        borderColor: viewSettingData?.inputBorderColor?.borderColor
                                    }}
                                />
                                <p
                                    className={`${viewSettingData?.errorMessageTextSize} ${viewSettingData?.errorMessageFontWeight} ${viewSettingData?.errorMessageCustomClass} text-left`}
                                    style={{
                                        color: viewSettingData?.errorMessageTextColor?.color,
                                        backgroundColor: viewSettingData?.errorMessageBackgroundColor?.backgroundColor
                                    }}
                                >
                                    エラーメッセージ
                                </p>
                            </div>

                            <div className={`flex flex-row ${classes.inputWrapCustomClass}`}>
                                <div className="w-full flex flex-col">
                                    <label
                                        className={`${viewSettingData?.labelTextSize} ${viewSettingData?.labelFontWeight} ${viewSettingData?.labelCustomClass} pt-2`}
                                        style={{ color: viewSettingData?.labelTextColor?.color }}
                                    >
                                        フォーム名
                                        <span
                                            className={`${viewSettingData?.requiredTextSize} ${viewSettingData?.requiredFontWeight} ${viewSettingData?.requiredCustomClass}`}
                                            style={{
                                                color: viewSettingData?.requiredTextColor?.color,
                                                backgroundColor:
                                                    viewSettingData?.requiredBackgroundColor?.backgroundColor,
                                            }}
                                        >
                                            {requiredCharacters}
                                        </span>
                                    </label>

                                    <input
                                        name="last_name"
                                        placeholder="プレイスホルダー"
                                        defaultValue=""
                                        className={`w-full h-8 p-2 placeholderClas 
                                            ${viewSettingData?.inputBorderWidth} ${viewSettingData?.inputBorderStyle} ${viewSettingData?.inputBorderRadius} 
                                            ${viewSettingData?.valueTextSize} ${viewSettingData?.valueFontWeight} ${viewSettingData?.inputCustomClass}`}
                                        style={{
                                            color: viewSettingData?.valueTextColor?.color,
                                            backgroundColor: viewSettingData?.inputBackgroundColor?.backgroundColor,
                                            borderColor: viewSettingData?.inputBorderColor?.borderColor
                                        }}
                                    />
                                    <p
                                        className={`${viewSettingData?.errorMessageTextSize} ${viewSettingData?.errorMessageFontWeight} ${viewSettingData?.errorMessageCustomClass} text-left`}
                                        style={{
                                            color: viewSettingData?.errorMessageTextColor?.color,
                                            backgroundColor: viewSettingData?.errorMessageBackgroundColor?.backgroundColor
                                        }}
                                    >
                                        エラーメッセージ
                                    </p>
                                </div>
                                <div
                                    className={`flex items-center justify-center ${viewSettingData?.divisionTextwrapCustomClass}`}>
                                    <span
                                        className={`flex-none ${viewSettingData?.divisionTextSize} ${viewSettingData?.divisionTextWeight} ${viewSettingData?.divisionTextCustomClass}`}
                                        style={{ color: viewSettingData?.divisionTextColor?.color }}
                                    >{divisionText}</span>
                                </div>
                                <div className="w-full flex flex-col">
                                    <label
                                        className={`${viewSettingData?.labelTextSize} ${viewSettingData?.labelFontWeight} ${viewSettingData?.labelCustomClass} pt-2`}
                                        style={{ color: viewSettingData?.labelTextColor?.color }}
                                    >
                                        フォーム名
                                        <span
                                            className={`${viewSettingData?.requiredTextSize} ${viewSettingData?.requiredFontWeight} ${viewSettingData?.requiredCustomClass}`}
                                            style={{
                                                color: viewSettingData?.requiredTextColor?.color,
                                                backgroundColor:
                                                    viewSettingData?.requiredBackgroundColor?.backgroundColor,
                                            }}
                                        >
                                            {requiredCharacters}
                                        </span>
                                    </label>

                                    <input
                                        name="last_name"
                                        className={`w-full p-2 h-8 placeholderClas
                                            ${viewSettingData?.inputBorderWidth} ${viewSettingData?.inputBorderStyle} ${viewSettingData?.inputBorderRadius} 
                                            ${viewSettingData?.valueTextSize} ${viewSettingData?.valueFontWeight} ${viewSettingData?.inputCustomClass}`}
                                        defaultValue="入力テキスト"
                                        placeholder="プレイスホルダー"
                                        style={{
                                            color: viewSettingData?.valueTextColor?.color,
                                            backgroundColor: viewSettingData?.inputBackgroundColor?.backgroundColor,
                                            borderColor: viewSettingData?.inputBorderColor?.borderColor
                                        }}
                                    />
                                    <p
                                        className={`${viewSettingData?.errorMessageTextSize} ${viewSettingData?.errorMessageFontWeight} ${viewSettingData?.errorMessageCustomClass} text-left`}
                                        style={{
                                            color: viewSettingData?.errorMessageTextColor?.color,
                                            backgroundColor: viewSettingData?.errorMessageBackgroundColor?.backgroundColor
                                        }}
                                    >
                                        エラーメッセージ
                                    </p>
                                </div>
                            </div>

                            <div className={`flex ${classes.inputWrapCustomClass}`}>
                                <div className="w-1/1">
                                    <div className="w-full flex flex-row">
                                        <div className="flex flex-col">
                                            <label
                                                className={`${viewSettingData?.labelTextSize} ${viewSettingData?.labelFontWeight} ${viewSettingData?.labelCustomClass} pt-2`}
                                                style={{ color: viewSettingData?.labelTextColor?.color }}
                                            >
                                                フォーム名
                                                <span
                                                    className={`${viewSettingData?.requiredTextSize} ${viewSettingData?.requiredFontWeight} ${viewSettingData?.requiredCustomClass}`}
                                                    style={{
                                                        color: viewSettingData?.requiredTextColor?.color,
                                                        backgroundColor:
                                                            viewSettingData?.requiredBackgroundColor?.backgroundColor,
                                                    }}
                                                >
                                                    {requiredCharacters}
                                                </span>
                                            </label>

                                            <input
                                                name="last_name"
                                                placeholder="プレイスホルダー"
                                                defaultValue=""
                                                className={`w-full h-8 p-2 placeholderClas
                                                    ${viewSettingData?.inputBorderWidth} ${viewSettingData?.inputBorderStyle} ${viewSettingData?.inputBorderRadius}  
                                                    ${viewSettingData?.valueTextSize} ${viewSettingData?.valueFontWeight} ${viewSettingData?.inputCustomClass}`}
                                                style={{
                                                    color: viewSettingData?.valueTextColor?.color,
                                                    backgroundColor: viewSettingData?.inputBackgroundColor?.backgroundColor,
                                                    borderColor: viewSettingData?.inputBorderColor?.borderColor
                                                }}
                                            />
                                            <p
                                                className={`${viewSettingData?.errorMessageTextSize} ${viewSettingData?.errorMessageFontWeight} ${viewSettingData?.errorMessageCustomClass} text-left`}
                                                style={{
                                                    color: viewSettingData?.errorMessageTextColor?.color,
                                                    backgroundColor: viewSettingData?.errorMessageBackgroundColor?.backgroundColor
                                                }}
                                            >
                                                エラーメッセージ
                                            </p>
                                        </div>

                                        <div
                                            className={`flex items-center justify-center ${viewSettingData?.divisionTextwrapCustomClass}`}>
                                            <span
                                                className={`flex-none ${viewSettingData?.divisionTextSize} ${viewSettingData?.divisionTextWeight} ${viewSettingData?.divisionTextCustomClass}`}
                                                style={{ color: viewSettingData?.divisionTextColor?.color }}
                                            >{divisionText}</span>
                                        </div>

                                        <div className="flex flex-col">
                                            <label
                                                className={`${viewSettingData?.labelTextSize} ${viewSettingData?.labelFontWeight} ${viewSettingData?.labelCustomClass} pt-2`}
                                                style={{ color: viewSettingData?.labelTextColor?.color }}
                                            >
                                                フォーム名
                                                <span
                                                    className={`${viewSettingData?.requiredTextSize} ${viewSettingData?.requiredFontWeight} ${viewSettingData?.requiredCustomClass}`}
                                                    style={{
                                                        color: viewSettingData?.requiredTextColor?.color,
                                                        backgroundColor:
                                                            viewSettingData?.requiredBackgroundColor?.backgroundColor,
                                                    }}
                                                >
                                                    {requiredCharacters}
                                                </span>
                                            </label>

                                            <input
                                                name="last_name"
                                                className={`w-full p-2 h-8 placeholderClas 
                                                    ${viewSettingData?.inputBorderWidth} ${viewSettingData?.inputBorderStyle} ${viewSettingData?.inputBorderRadius} 
                                                    ${viewSettingData?.valueTextSize} ${viewSettingData?.valueFontWeight} ${viewSettingData?.inputCustomClass}`}
                                                defaultValue="入力テキスト"
                                                placeholder="プレイスホルダー"
                                                style={{
                                                    color: viewSettingData?.valueTextColor?.color,
                                                    backgroundColor: viewSettingData?.inputBackgroundColor?.backgroundColor,
                                                    borderColor: viewSettingData?.inputBorderColor?.borderColor
                                                }}
                                            />
                                            <p
                                                className={`${viewSettingData?.errorMessageTextSize} ${viewSettingData?.errorMessageFontWeight} ${viewSettingData?.errorMessageCustomClass} text-left`}
                                                style={{
                                                    color: viewSettingData?.errorMessageTextColor?.color,
                                                    backgroundColor: viewSettingData?.errorMessageBackgroundColor?.backgroundColor
                                                }}
                                            >
                                                エラーメッセージ
                                            </p>
                                        </div>

                                        <div
                                            className={`flex items-center justify-center ${viewSettingData?.divisionTextwrapCustomClass}`}>
                                            <span
                                                className={`flex-none ${viewSettingData?.divisionTextSize} ${viewSettingData?.divisionTextWeight} ${viewSettingData?.divisionTextCustomClass}`}
                                                style={{ color: viewSettingData?.divisionTextColor?.color }}
                                            >{divisionText}</span>
                                        </div>

                                        <div className="flex flex-col">
                                            <label
                                                className={`${viewSettingData?.labelTextSize} ${viewSettingData?.labelFontWeight} ${viewSettingData?.labelCustomClass} pt-2`}
                                                style={{ color: viewSettingData?.labelTextColor?.color }}
                                            >
                                                フォーム名
                                                <span
                                                    className={`${viewSettingData?.requiredTextSize}
                                                        ${viewSettingData?.requiredFontWeight} ${viewSettingData?.requiredCustomClass}`}
                                                    style={{
                                                        color: viewSettingData?.requiredTextColor?.color,
                                                        backgroundColor:
                                                            viewSettingData?.requiredBackgroundColor?.backgroundColor,
                                                    }}
                                                >
                                                    {requiredCharacters}
                                                </span>
                                            </label>
                                            <input
                                                name="last_name"
                                                className={`w-full p-2 h-8 placeholderClas 
                                                    ${viewSettingData?.inputBorderWidth} ${viewSettingData?.inputBorderStyle} ${viewSettingData?.inputBorderRadius} 
                                                    ${viewSettingData?.valueTextSize} ${viewSettingData?.valueFontWeight} ${viewSettingData?.inputCustomClass}`}
                                                placeholder="プレイスホルダー"
                                                defaultValue=""
                                                style={{
                                                    color: viewSettingData?.valueTextColor?.color,
                                                    backgroundColor: viewSettingData?.inputBackgroundColor?.backgroundColor,
                                                    borderColor: viewSettingData?.inputBorderColor?.borderColor
                                                }}
                                            />
                                            <p
                                                className={`${viewSettingData?.errorMessageTextSize} ${viewSettingData?.errorMessageFontWeight} ${viewSettingData?.errorMessageCustomClass} text-left`}
                                                style={{
                                                    color: viewSettingData?.errorMessageTextColor?.color,
                                                    backgroundColor: viewSettingData?.errorMessageBackgroundColor?.backgroundColor
                                                }}
                                            >
                                                エラーメッセージ
                                            </p>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </>
                    )}
                    {activePageId == "radioAFormSettings" && (
                        <>
                            <div className={` ${viewSettingData?.radioAWrapCustomClass} `}>
                                <h3
                                    className={`${viewSettingData?.labelTextSize} ${viewSettingData?.labelFontWeight} ${viewSettingData?.labelCustomClass} pt-2`}
                                    style={{ color: viewSettingData?.labelTextColor?.color }}
                                >
                                    フォーム名
                                    <span
                                        className={`${viewSettingData?.requiredTextSize} ${viewSettingData?.requiredFontWeight} ${viewSettingData?.requiredCustomClass}`}
                                        style={{
                                            color: viewSettingData?.requiredTextColor?.color,
                                            backgroundColor:
                                                viewSettingData?.requiredBackgroundColor?.backgroundColor,
                                        }}
                                    >
                                        {requiredCharacters}
                                    </span>
                                </h3>
                                <div ref={ref1}
                                    className={`flex w-fit ${viewSettingData?.buttonSpaceBetweenX}`}
                                >
                                    <div className={`${viewSettingData?.buttonWidth}`}>
                                        <input type="radio" name="citizen" id="1" checked className="peer hidden" />
                                        <label htmlFor="1"
                                            className={`block cursor-pointer select-none p-2 text-center perrButtonTextColor ${viewSettingData?.buttonTextSize} ${viewSettingData?.buttonFontWeight} ${viewSettingData?.buttonCustomClass}
                                                   ${viewSettingData?.selectButtonBorderWidth}
                                                   ${viewSettingData?.selectButtonBorderStyle}
                                                   ${viewSettingData?.buttonBorderRadius}
                                                   transition-all duration-300 ease-in-out`}
                                            style={{
                                                backgroundColor: viewSettingData?.selectButtonBackgroundColor?.backgroundColor,
                                                color: viewSettingData?.selectButtonTextColor?.color,
                                                borderColor: viewSettingData?.selectButtonBorderColor?.borderColor
                                            }}
                                        >はい</label>
                                    </div>
                                    <div className={`${viewSettingData?.buttonWidth}`}>
                                        <input type="radio" name="citizen" id="2" className="peer hidden" />
                                        <label htmlFor="2"
                                            className={`block cursor-pointer select-none p-2 text-center perrButtonTextColor ${viewSettingData?.buttonTextSize} ${viewSettingData?.buttonFontWeight} ${viewSettingData?.buttonCustomClass}
                                                   ${viewSettingData?.unSelectButtonBorderWidth}
                                                   ${viewSettingData?.unSelectButtonBorderStyle}
                                                   ${viewSettingData?.buttonBorderRadius}
                                                   transition-all duration-300 ease-in-out`}
                                            style={{
                                                backgroundColor: viewSettingData?.unSelectButtonBackgroundColor?.backgroundColor,
                                                color: viewSettingData?.unSelectButtonTextColor?.color,
                                                borderColor: viewSettingData?.unSelectButtonBorderColor?.borderColor
                                            }}
                                        >いいえ</label>
                                    </div>
                                </div>
                                <p
                                    className={`${viewSettingData?.errorMessageTextSize} ${viewSettingData?.errorMessageFontWeight} ${viewSettingData?.errorMessageCustomClass}`}
                                    style={{
                                        color: viewSettingData?.errorMessageTextColor?.color,
                                        backgroundColor: viewSettingData?.errorMessageBackgroundColor?.backgroundColor,
                                        width: `${width1}px`
                                    }}
                                >
                                    エラーメッセージ
                                </p>
                            </div>
                        </>
                    )}
                    {activePageId == "radioBFormSettings" && (
                        <InputRadioBSettingPreview
                            viewSettingData={viewSettingData}
                            requiredCharacters={requiredCharacters}
                        />
                    )}
                    {activePageId == "checkboxSettings" && (
                        <InputCheckBoxSettingPreview
                            viewSettingData={viewSettingData}
                            requiredCharacters={requiredCharacters}
                            placeholderCss={placeholderCss}
                        />
                    )}
                    {activePageId == "textareaFormSettings" && (
                        <>
                            <div className={`${viewSettingData.inputWrapCustomClass}`}>
                                <h3
                                    className={`${viewSettingData?.labelTextSize} ${viewSettingData?.labelFontWeight} ${viewSettingData?.labelCustomClass} pt-2`}
                                    style={{ color: viewSettingData?.labelTextColor?.color }}
                                >
                                    フォーム名
                                </h3>
                                <textarea
                                    className={`h-32 p-2 outline-none  placeholderClas w-full ${viewSettingData?.valueTextSize} ${viewSettingData?.valueFontWeight} ${viewSettingData?.valueCustomClass}
                                        ${viewSettingData?.valueBorderWidth}
                                        ${viewSettingData?.valueBorderStyle}
                                        ${viewSettingData?.valueBorderRadius}
                                        `}
                                    maxLength="2048"
                                    placeholder="プレイスホルダー"
                                    style={{
                                        borderColor: viewSettingData?.valueBorderColor?.borderColor,
                                        backgroundColor: viewSettingData?.valueBackgroundColor?.backgroundColor,
                                    }}
                                />
                            </div>
                            <div className={`${viewSettingData.inputWrapCustomClass}`}>
                                <h3
                                    className={`${viewSettingData?.labelTextSize} ${viewSettingData?.labelFontWeight} ${viewSettingData?.labelCustomClass} pt-2`}
                                    style={{ color: viewSettingData?.labelTextColor?.color }}
                                >
                                    フォーム名
                                    <span
                                        className={`${viewSettingData?.requiredTextSize} ${viewSettingData?.requiredFontWeight} ${viewSettingData?.requiredCustomClass}`}
                                        style={{
                                            color: viewSettingData?.requiredTextColor?.color,
                                            backgroundColor:
                                                viewSettingData?.requiredBackgroundColor?.backgroundColor,
                                        }}
                                    >
                                        {requiredCharacters}
                                    </span>
                                </h3>
                                <textarea
                                    className={`h-32 w-full p-2 outline-none placeholderClas ${viewSettingData?.valueTextSize} ${viewSettingData?.valueFontWeight} ${viewSettingData?.valueCustomClass}
                                        ${viewSettingData?.valueBorderWidth}
                                        ${viewSettingData?.valueBorderStyle}
                                        ${viewSettingData?.valueBorderRadius}
                                        `}
                                    maxLength="2048"
                                    defaultValue="テキスト"
                                    placeholder="プレイスホルダー"
                                    style={{
                                        color: viewSettingData?.valueTextColor?.color,
                                        borderColor: viewSettingData?.valueBorderColor?.borderColor,
                                        backgroundColor: viewSettingData?.valueBackgroundColor?.backgroundColor,
                                    }}
                                />
                                <p
                                    className={`${viewSettingData?.errorMessageTextSize} ${viewSettingData?.errorMessageFontWeight} ${viewSettingData?.errorMessageCustomClass}`}
                                    style={{
                                        color: viewSettingData?.errorMessageTextColor?.color,
                                        backgroundColor: viewSettingData?.errorMessageBackgroundColor?.backgroundColor
                                    }}
                                >
                                    エラーメッセージ
                                </p>
                            </div>
                        </>
                    )}
                    {activePageId == "selectFormSettings" && (
                        <>
                            <div className={`flex flex-col ${viewSettingData.inputWrapCustomClass} `}>
                                <label
                                    className={`${viewSettingData?.labelTextSize} 
                                        ${viewSettingData?.labelFontWeight} ${viewSettingData?.labelCustomClass}`}
                                    style={{ color: viewSettingData?.labelTextColor?.color }}
                                >
                                    フォーム名
                                    <span
                                        className={`${viewSettingData?.requiredTextSize} ${viewSettingData?.requiredFontWeight} ${viewSettingData?.requiredCustomClass}`}
                                        style={{
                                            color: viewSettingData?.requiredTextColor?.color,
                                            backgroundColor:
                                                viewSettingData?.requiredBackgroundColor?.backgroundColor,
                                        }}
                                    >
                                        {requiredCharacters}
                                    </span>
                                </label>

                                <select
                                    name="last_name"
                                    className={`h-8 select-icon ${viewSettingData?.inputBorderWidth} 
                                        ${viewSettingData?.inputBorderStyle} ${viewSettingData?.inputBorderColor} ${viewSettingData?.inputBorderRadius} 
                                        ${viewSettingData?.valueTextSize} ${viewSettingData?.valueFontWeight} ${viewSettingData?.inputCustomClass}`}
                                    defaultValue="入力テキスト"
                                    style={{
                                        color: viewSettingData?.valueTextColor?.color,
                                        backgroundColor: viewSettingData?.inputBackgroundColor?.backgroundColor,
                                        borderColor: viewSettingData?.inputBorderColor?.borderColor,
                                    }}
                                >
                                    <option>選択肢1</option>
                                    <option>選択肢2</option>
                                    <option>選択肢3</option>
                                    <option>選択肢4</option>
                                </select>
                                <p
                                    className={`${viewSettingData?.errorMessageTextSize} ${viewSettingData?.errorMessageFontWeight} ${viewSettingData?.errorMessageCustomClass}`}
                                    style={{
                                        color: viewSettingData?.errorMessageTextColor?.color,
                                        backgroundColor: viewSettingData?.errorMessageBackgroundColor?.backgroundColor,
                                        borderColor: viewSettingData?.inputBorderColor?.borderColor,
                                    }}
                                >
                                    エラーメッセージ
                                </p>
                            </div>

                            <div className={`flex ${viewSettingData.inputWrapCustomClass}`}>
                                <div className="flex flex-col w-1/2">
                                    <label
                                        className={`${viewSettingData?.labelTextSize} ${viewSettingData?.labelFontWeight} ${viewSettingData?.labelCustomClass} pt-2`}
                                        style={{ color: viewSettingData?.labelTextColor?.color }}
                                    >
                                        フォーム名
                                        <span
                                            className={`${viewSettingData?.requiredTextSize} ${viewSettingData?.requiredFontWeight} ${viewSettingData?.requiredCustomClass}`}
                                            style={{
                                                color: viewSettingData?.requiredTextColor?.color,
                                                backgroundColor:
                                                    viewSettingData?.requiredBackgroundColor?.backgroundColor,
                                            }}
                                        >
                                            {requiredCharacters}
                                        </span>
                                    </label>
                                    <select
                                        ref={selectRef}
                                        onChange={changeColor}
                                        name="last_name"
                                        className={`w-full select-icon h-8 customPlaceHolder ${viewSettingData?.inputBorderColor}
                                            ${viewSettingData?.inputBorderWidth} ${viewSettingData?.inputBorderStyle} ${viewSettingData?.inputBorderRadius} 
                                            ${viewSettingData?.valueTextSize} ${viewSettingData?.valueFontWeight} ${viewSettingData?.inputCustomClass}`}
                                        style={{
                                            color: viewSettingData?.placeholderTextColor?.color,
                                            backgroundColor: viewSettingData?.inputBackgroundColor?.backgroundColor,
                                            borderColor: viewSettingData?.inputBorderColor?.borderColor,
                                        }}
                                    >
                                        <option selected value="">プレイスホルダー</option>
                                        <option value="選択肢1">選択肢1</option>
                                        <option value="選択肢2">選択肢2</option>
                                        <option value="選択肢3">選択肢3</option>
                                        <option value="選択肢4">選択肢4</option>
                                    </select>
                                    <p
                                        className={`${viewSettingData?.errorMessageTextSize} ${viewSettingData?.errorMessageFontWeight} ${viewSettingData?.errorMessageCustomClass} text-left`}
                                        style={{
                                            color: viewSettingData?.errorMessageTextColor?.color,
                                            backgroundColor: viewSettingData?.errorMessageBackgroundColor?.backgroundColor
                                        }}
                                    >
                                        エラーメッセージ
                                    </p>
                                </div>

                                <div
                                    className={`flex items-center justify-center mt-2 ${viewSettingData?.divisionTextwrapCustomClass}`}>
                                    <span
                                        className={`flex-none ${viewSettingData?.divisionTextSize} ${viewSettingData?.divisionTextWeight} ${viewSettingData?.divisionTextCustomClass}`}
                                        style={{ color: viewSettingData?.divisionTextColor?.color }}
                                    >{divisionText}</span>
                                </div>

                                <div className="flex flex-col w-1/2">

                                    <label
                                        className={`${viewSettingData?.labelTextSize} ${viewSettingData?.labelFontWeight} ${viewSettingData?.labelCustomClass} pt-2`}
                                        style={{ color: viewSettingData?.labelTextColor?.color }}
                                    >
                                        フォーム名
                                        <span
                                            className={`${viewSettingData?.requiredTextSize} ${viewSettingData?.requiredFontWeight} ${viewSettingData?.requiredCustomClass}`}
                                            style={{
                                                color: viewSettingData?.requiredTextColor?.color,
                                                backgroundColor: viewSettingData?.requiredBackgroundColor?.backgroundColor,
                                            }}
                                        >
                                            {requiredCharacters}
                                        </span>
                                    </label>

                                    <select
                                        name="last_name"
                                        className={`w-full select-icon h-8 ${viewSettingData?.inputBorderColor}
                                            ${viewSettingData?.inputBorderWidth} ${viewSettingData?.inputBorderStyle} ${viewSettingData?.inputBorderRadius}
                                            ${viewSettingData?.valueTextSize} ${viewSettingData?.valueFontWeight} ${viewSettingData?.inputCustomClass}`}
                                        defaultValue="入力テキスト"
                                        style={{
                                            color: viewSettingData?.valueTextColor?.color,
                                            backgroundColor: viewSettingData?.inputBackgroundColor?.backgroundColor,
                                            borderColor: viewSettingData?.inputBorderColor?.borderColor,
                                        }}
                                    >
                                        <option>選択肢1</option>
                                        <option>選択肢2</option>
                                        <option>選択肢3</option>
                                        <option>選択肢4</option>
                                    </select>
                                    <p
                                        className={`${viewSettingData?.errorMessageTextSize} ${viewSettingData?.errorMessageFontWeight} ${viewSettingData?.errorMessageCustomClass} text-left`}
                                        style={{
                                            color: viewSettingData?.errorMessageTextColor?.color,
                                            backgroundColor: viewSettingData?.errorMessageBackgroundColor?.backgroundColor,
                                        }}
                                    >
                                        エラーメッセージ
                                    </p>
                                </div>
                            </div>

                            <div className={`flex flex-col ${viewSettingData.inputWrapCustomClass}`}>
                                <label
                                    className={`${viewSettingData?.labelTextSize} 
                                        ${viewSettingData?.labelFontWeight} ${viewSettingData?.labelCustomClass} pt-2`}
                                    style={{ color: viewSettingData?.labelTextColor?.color }}
                                >
                                    フォーム名
                                    <span
                                        className={`${viewSettingData?.requiredTextSize} ${viewSettingData?.requiredFontWeight} ${viewSettingData?.requiredCustomClass}`}
                                        style={{
                                            color: viewSettingData?.requiredTextColor?.color,
                                            backgroundColor:
                                                viewSettingData?.requiredBackgroundColor?.backgroundColor,
                                        }}
                                    >
                                        {requiredCharacters}
                                    </span>
                                </label>

                                <select
                                    name="last_name"
                                    size="6"
                                    className={`w-full ${viewSettingData?.inputBorderWidth} 
                                        ${viewSettingData?.inputBorderStyle} ${viewSettingData?.inputBorderColor} ${viewSettingData?.inputBorderRadius} 
                                        ${viewSettingData?.valueTextSize} ${viewSettingData?.valueFontWeight} ${viewSettingData?.inputCustomClass}`}
                                    defaultValue="入力テキスト"
                                    style={{
                                        color: viewSettingData?.valueTextColor?.color,
                                        backgroundColor: viewSettingData?.inputBackgroundColor?.backgroundColor,
                                        borderColor: viewSettingData?.inputBorderColor?.borderColor,
                                    }}
                                >
                                    <option>選択肢1</option>
                                    <option>選択肢2</option>
                                    <option>選択肢3</option>
                                    <option>選択肢4</option>
                                    <option>選択肢5</option>
                                    <option>選択肢6</option>
                                    <option>選択肢7</option>
                                </select>
                                <p
                                    className={`${viewSettingData?.errorMessageTextSize} ${viewSettingData?.errorMessageFontWeight} ${viewSettingData?.errorMessageCustomClass} text-left`}
                                    style={{
                                        color: viewSettingData?.errorMessageTextColor?.color,
                                        backgroundColor: viewSettingData?.errorMessageBackgroundColor?.backgroundColor,
                                        borderColor: viewSettingData?.inputBorderColor?.borderColor,
                                    }}
                                >
                                    エラーメッセージ
                                </p>
                            </div>

                            <div className={`flex ${viewSettingData.inputWrapCustomClass}`}>
                                <div className="flex flex-col w-1/2">
                                    <label
                                        className={`${viewSettingData?.labelTextSize} ${viewSettingData?.labelFontWeight} ${viewSettingData?.labelCustomClass} pt-2`}
                                        style={{ color: viewSettingData?.labelTextColor?.color }}
                                    >
                                        フォーム名
                                        <span
                                            className={`${viewSettingData?.requiredTextSize} ${viewSettingData?.requiredFontWeight} ${viewSettingData?.requiredCustomClass}`}
                                            style={{
                                                color: viewSettingData?.requiredTextColor?.color,
                                                backgroundColor:
                                                    viewSettingData?.requiredBackgroundColor?.backgroundColor,
                                            }}
                                        >
                                            {requiredCharacters}
                                        </span>
                                    </label>
                                    <select
                                        size="6"
                                        ref={selectRef}
                                        onChange={changeColor}
                                        name="last_name"
                                        className={`w-full customPlaceHolder ${viewSettingData?.inputBorderColor}
                                            ${viewSettingData?.inputBorderWidth} ${viewSettingData?.inputBorderStyle} ${viewSettingData?.inputBorderRadius} 
                                            ${viewSettingData?.valueTextSize} ${viewSettingData?.valueFontWeight} ${viewSettingData?.inputCustomClass}`}
                                        style={{
                                            color: viewSettingData?.placeholderTextColor?.color,
                                            backgroundColor: viewSettingData?.inputBackgroundColor?.backgroundColor,
                                            borderColor: viewSettingData?.inputBorderColor?.borderColor,
                                        }}
                                    >
                                        <option selected value="">プレイスホルダー</option>
                                        <option value="選択肢1">選択肢1</option>
                                        <option value="選択肢2">選択肢2</option>
                                        <option value="選択肢3">選択肢3</option>
                                        <option value="選択肢4">選択肢4</option>
                                        <option value="選択肢4">選択肢5</option>
                                        <option value="選択肢4">選択肢6</option>
                                        <option value="選択肢4">選択肢7</option>
                                    </select>
                                    <p
                                        className={`${viewSettingData?.errorMessageTextSize} ${viewSettingData?.errorMessageFontWeight} ${viewSettingData?.errorMessageCustomClass} text-left`}
                                        style={{
                                            color: viewSettingData?.errorMessageTextColor?.color,
                                            backgroundColor: viewSettingData?.errorMessageBackgroundColor?.backgroundColor
                                        }}
                                    >
                                        エラーメッセージ
                                    </p>
                                </div>

                                <div
                                    className={`flex items-center justify-center ${viewSettingData?.divisionTextwrapCustomClass}`}>
                                    <span
                                        className={`flex-none ${viewSettingData?.divisionTextSize} ${viewSettingData?.divisionTextWeight} ${viewSettingData?.divisionTextCustomClass}`}
                                        style={{ color: viewSettingData?.divisionTextColor?.color }}
                                    >{divisionText}</span>
                                </div>

                                <div className="flex flex-col w-1/2">

                                    <label
                                        className={`${viewSettingData?.labelTextSize} ${viewSettingData?.labelFontWeight} ${viewSettingData?.labelCustomClass} pt-2`}
                                        style={{ color: viewSettingData?.labelTextColor?.color }}
                                    >
                                        フォーム名
                                        <span
                                            className={`${viewSettingData?.requiredTextSize} ${viewSettingData?.requiredFontWeight} ${viewSettingData?.requiredCustomClass}`}
                                            style={{
                                                color: viewSettingData?.requiredTextColor?.color,
                                                backgroundColor: viewSettingData?.requiredBackgroundColor?.backgroundColor,
                                            }}
                                        >
                                            {requiredCharacters}
                                        </span>
                                    </label>

                                    <select
                                        size="6"
                                        name="last_name"
                                        className={`w-full ${viewSettingData?.inputBorderColor}
                                            ${viewSettingData?.inputBorderWidth} ${viewSettingData?.inputBorderStyle} ${viewSettingData?.inputBorderRadius}
                                            ${viewSettingData?.valueTextSize} ${viewSettingData?.valueFontWeight} ${viewSettingData?.inputCustomClass}`}
                                        defaultValue="入力テキスト"
                                        style={{
                                            color: viewSettingData?.valueTextColor?.color,
                                            backgroundColor: viewSettingData?.inputBackgroundColor?.backgroundColor,
                                            borderColor: viewSettingData?.inputBorderColor?.borderColor,
                                        }}
                                    >
                                        <option>選択肢1</option>
                                        <option>選択肢2</option>
                                        <option>選択肢3</option>
                                        <option>選択肢4</option>
                                        <option>選択肢4</option>
                                        <option>選択肢5</option>
                                        <option>選択肢6</option>
                                        <option>選択肢7</option>
                                    </select>
                                    <p
                                        className={`${viewSettingData?.errorMessageTextSize} ${viewSettingData?.errorMessageFontWeight} ${viewSettingData?.errorMessageCustomClass} text-left`}
                                        style={{
                                            color: viewSettingData?.errorMessageTextColor?.color,
                                            backgroundColor: viewSettingData?.errorMessageBackgroundColor?.backgroundColor,
                                        }}
                                    >
                                        エラーメッセージ
                                    </p>
                                </div>
                            </div>
                        </>
                    )}

                    {activePageId == "inputDateSettings" && (
                        <InputDateSettingPreview
                            info={info}
                            labelClass={labelClass}
                            labelStyle={labelStyle}
                            requiredClass={requiredClass}
                            requiredStyle={requiredStyle}
                            inputClass={inputClass}
                            inputWrapCustomClass={inputWrapCustomClass}
                            inputStyle={inputStyle}
                            errorMessageClass={errorMessageClass}
                            errorMessageStyle={errorMessageStyle}
                            divideClass={divideClass}
                            divideWrapClass={divideWrapClass}
                            divideStyle={divideStyle}
                        />
                    )}

                    {activePageId == "inputTimeSettings" && (
                        <InputTimeSettingPreview
                            info={info}
                            labelClass={labelClass}
                            labelStyle={labelStyle}
                            requiredClass={requiredClass}
                            requiredStyle={requiredStyle}
                            inputClass={inputClass}
                            inputWrapCustomClass={inputWrapCustomClass}
                            inputStyle={inputStyle}
                            errorMessageClass={errorMessageClass}
                            errorMessageStyle={errorMessageStyle}
                            divideClass={divideClass}
                            divideWrapClass={divideWrapClass}
                            divideStyle={divideStyle}
                        />
                    )}

                    {activePageId == "inputNumberSettings" && (
                        <>
                            <div className={`flex flex-col ${viewSettingData.inputWrapCustomClass}`}>
                                <label
                                    className={`${viewSettingData?.labelTextSize} ${viewSettingData?.labelFontWeight} ${viewSettingData?.labelCustomClass}`}
                                    style={{ color: viewSettingData?.labelTextColor?.color }}
                                >
                                    フォーム名
                                    <span
                                        className={`${viewSettingData?.requiredTextSize} ${viewSettingData?.requiredFontWeight} ${viewSettingData?.requiredCustomClass}`}
                                        style={{
                                            color: viewSettingData?.requiredTextColor?.color,
                                            backgroundColor:
                                                viewSettingData?.requiredBackgroundColor?.backgroundColor,
                                        }}
                                    >
                                        {requiredCharacters}
                                    </span>
                                </label>

                                <input
                                    name="last_name"
                                    // className={`w-full p-2 h-8 placeholderClas numberField ${viewSettingData?.valueTextSize} ${viewSettingData?.valueFontWeight} ${viewSettingData?.inputCustomClass}`}
                                    defaultValue="1256"
                                    placeholder="プレイスホルダー"
                                    type={`number`}
                                    className={`w-full h-8 p-2 placeholderClas
                                        ${viewSettingData?.inputBorderWidth} ${viewSettingData?.inputBorderStyle} ${viewSettingData?.inputBorderRadius}  
                                        ${viewSettingData?.valueTextSize} ${viewSettingData?.valueFontWeight} ${viewSettingData?.inputCustomClass}`}
                                    style={{
                                        color: viewSettingData?.valueTextColor?.color,
                                        backgroundColor: viewSettingData?.inputBackgroundColor?.backgroundColor,
                                        borderColor: viewSettingData?.inputBorderColor?.borderColor
                                    }}
                                />
                                <p
                                    className={`${viewSettingData?.errorMessageTextSize} ${viewSettingData?.errorMessageFontWeight} ${viewSettingData?.errorMessageCustomClass} text-left`}
                                    style={{
                                        color: viewSettingData?.errorMessageTextColor?.color,
                                        backgroundColor: viewSettingData?.errorMessageBackgroundColor?.backgroundColor
                                    }}
                                >
                                    エラーメッセージ
                                </p>
                            </div>
                            <div className={`flex ${viewSettingData.inputWrapCustomClass}`}>
                                <div className="flex flex-col w-1/2">
                                    <label
                                        className={`${viewSettingData?.labelTextSize} ${viewSettingData?.labelFontWeight} ${viewSettingData?.labelCustomClass}`}
                                        style={{ color: viewSettingData?.labelTextColor?.color }}>
                                        フォーム名
                                        <span
                                            className={`${viewSettingData?.requiredTextSize} ${viewSettingData?.requiredFontWeight} ${viewSettingData?.requiredCustomClass}`}
                                            style={{
                                                color: viewSettingData?.requiredTextColor?.color,
                                                backgroundColor:
                                                    viewSettingData?.requiredBackgroundColor?.backgroundColor,
                                            }}
                                        >
                                            {requiredCharacters}
                                        </span>
                                    </label>

                                    <input
                                        name="last_name"
                                        defaultValue="222"
                                        placeholder="プレイスホルダー"
                                        type='number'
                                        className={`w-full h-8 p-2 placeholderClas
                                            ${viewSettingData?.inputBorderWidth} ${viewSettingData?.inputBorderStyle} ${viewSettingData?.inputBorderRadius}  
                                            ${viewSettingData?.valueTextSize} ${viewSettingData?.valueFontWeight} ${viewSettingData?.inputCustomClass}`}
                                        style={{
                                            color: viewSettingData?.valueTextColor?.color,
                                            backgroundColor: viewSettingData?.inputBackgroundColor?.backgroundColor,
                                            borderColor: viewSettingData?.inputBorderColor?.borderColor
                                        }}
                                    />
                                    <p
                                        className={`${viewSettingData?.errorMessageTextSize} ${viewSettingData?.errorMessageFontWeight} ${viewSettingData?.errorMessageCustomClass}`}
                                        style={{
                                            color: viewSettingData?.errorMessageTextColor?.color,
                                            backgroundColor: viewSettingData?.errorMessageBackgroundColor?.backgroundColor
                                        }}
                                    >
                                        エラーメッセージ
                                    </p>
                                </div>
                                <div
                                    className={`flex items-center justify-center ${viewSettingData?.divisionTextwrapCustomClass}`}>
                                    <span
                                        className={`flex-none ${viewSettingData?.divisionTextSize} ${viewSettingData?.divisionTextWeight} ${viewSettingData?.divisionTextCustomClass}`}
                                        style={{ color: viewSettingData?.divisionTextColor?.color }}
                                    >{divisionText}</span>
                                </div>

                                <div className="flex flex-col w-1/2">
                                    <label
                                        className={`${viewSettingData?.labelTextSize} ${viewSettingData?.labelFontWeight} ${viewSettingData?.labelCustomClass}`}
                                        style={{ color: viewSettingData?.labelTextColor?.color }}
                                    >
                                        フォーム名
                                        <span
                                            className={`${viewSettingData?.requiredTextSize} ${viewSettingData?.requiredFontWeight} ${viewSettingData?.requiredCustomClass}`}
                                            style={{
                                                color: viewSettingData?.requiredTextColor?.color,
                                                backgroundColor:
                                                viewSettingData?.requiredBackgroundColor?.backgroundColor,
                                            }}
                                        >
                                            {requiredCharacters}
                                        </span>
                                    </label>

                                    <input
                                        name="last_name"
                                        type='number'
                                        defaultValue="2210"
                                        placeholder="プレイスホルダー"
                                        className={`w-full h-8 p-2 placeholderClas
                                            ${viewSettingData?.inputBorderWidth} ${viewSettingData?.inputBorderStyle} ${viewSettingData?.inputBorderRadius}  
                                            ${viewSettingData?.valueTextSize} ${viewSettingData?.valueFontWeight} ${viewSettingData?.inputCustomClass}`}
                                        style={{
                                            color: viewSettingData?.valueTextColor?.color,
                                            backgroundColor: viewSettingData?.inputBackgroundColor?.backgroundColor,
                                            borderColor: viewSettingData?.inputBorderColor?.borderColor
                                        }}
                                    />
                                    <p
                                        className={`${viewSettingData?.errorMessageTextSize} ${viewSettingData?.errorMessageFontWeight} ${viewSettingData?.errorMessageCustomClass}`}
                                        style={{
                                            color: viewSettingData?.errorMessageTextColor?.color,
                                            backgroundColor: viewSettingData?.errorMessageBackgroundColor?.backgroundColor
                                        }}
                                    >
                                        エラーメッセージ
                                    </p>
                                </div>
                            </div>

                        </>
                    )}

                    {activePageId == "combinInputTextSettings" && (
                        <>
                            <div className="flex flex-col mb-4">
                                <label
                                    className={`${viewSettingData?.labelTextSize} ${viewSettingData?.labelFontWeight} ${viewSettingData?.labelCustomClass} pt-2`}
                                    style={{ color: viewSettingData?.labelTextColor?.color }}
                                >
                                    フォーム名
                                </label>
                                <input
                                    name="last_name"
                                    className={`w-full px-1 placeholderClas ${viewSettingData?.valueTextSize} ${viewSettingData?.valueFontWeight} ${viewSettingData?.inputCustomClass}
                                        ${viewSettingData?.inputBorderWidth} ${viewSettingData?.inputBorderStyle} ${viewSettingData?.inputBorderRadius}
                                        `}
                                    defaultValue=""
                                    placeholder="プレイスホルダー"
                                    style={{
                                        color: viewSettingData?.valueTextColor?.color,
                                        backgroundColor: viewSettingData?.inputBackgroundColor?.backgroundColor,
                                        borderColor: viewSettingData?.inputBorderColor?.borderColor
                                    }}
                                />
                            </div>

                            <div className="flex flex-col mb-4">
                                <label
                                    className={`${viewSettingData?.labelTextSize} ${viewSettingData?.labelFontWeight} ${viewSettingData?.labelCustomClass} pt-2`}
                                    style={{ color: viewSettingData?.labelTextColor?.color }}
                                >
                                    フォーム名
                                    <span
                                        className={`${viewSettingData?.requiredTextSize} ${viewSettingData?.requiredFontWeight} ${viewSettingData?.requiredCustomClass}`}
                                        style={{
                                            color: viewSettingData?.requiredTextColor?.color,
                                            backgroundColor:
                                                viewSettingData?.requiredBackgroundColor?.backgroundColor,
                                        }}
                                    >
                                        {requiredCharacters}
                                    </span>
                                </label>

                                <input
                                    name="last_name"
                                    className={`w-full px-1 placeholderClas
                                         ${viewSettingData?.valueTextSize} ${viewSettingData?.valueFontWeight} ${viewSettingData?.inputCustomClass}
                                         ${viewSettingData?.inputBorderWidth} ${viewSettingData?.inputBorderStyle} ${viewSettingData?.inputBorderRadius}
                                         `}
                                    defaultValue="入力テキスト"
                                    placeholder="プレイスホルダー"
                                    style={{
                                        color: viewSettingData?.valueTextColor?.color,
                                        backgroundColor: viewSettingData?.inputBackgroundColor?.backgroundColor,
                                        borderColor: viewSettingData?.inputBorderColor?.borderColor
                                    }}
                                />
                                <p
                                    className={`${viewSettingData?.errorMessageTextSize} ${viewSettingData?.errorMessageFontWeight} ${viewSettingData?.errorMessageCustomClass}`}
                                    style={{
                                        color: viewSettingData?.errorMessageTextColor?.color,
                                        backgroundColor: viewSettingData?.errorMessageBackgroundColor?.backgroundColor
                                    }}
                                >
                                    エラーメッセージ
                                </p>
                            </div>

                            <div className="flex mb-4">

                                <div className="w-1/2">
                                    <div className="flex flex-col">
                                        <label
                                            className={`${viewSettingData?.labelTextSize} ${viewSettingData?.labelFontWeight} ${viewSettingData?.labelCustomClass} pt-2`}
                                            style={{ color: viewSettingData?.labelTextColor?.color }}
                                        >
                                            フォーム名
                                        </label>

                                        <input
                                            name="last_name"
                                            className={`w-full px-1 placeholderClas ${viewSettingData?.valueTextSize} ${viewSettingData?.valueFontWeight} ${viewSettingData?.inputCustomClass}
                                                    ${viewSettingData?.inputBorderWidth} ${viewSettingData?.inputBorderStyle} ${viewSettingData?.inputBorderRadius}`}
                                            defaultValue=""
                                            placeholder="プレイスホルダー"
                                            style={{
                                                color: viewSettingData?.valueTextColor?.color,
                                                backgroundColor: viewSettingData?.inputBackgroundColor?.backgroundColor,
                                                borderColor: viewSettingData?.inputBorderColor?.borderColor
                                            }}
                                        />
                                        <p
                                            className={`${viewSettingData?.errorMessageTextSize} ${viewSettingData?.errorMessageFontWeight} ${viewSettingData?.errorMessageCustomClass}`}
                                            style={{
                                                color: viewSettingData?.errorMessageTextColor?.color,
                                                backgroundColor: viewSettingData?.errorMessageBackgroundColor?.backgroundColor
                                            }}
                                        >
                                            エラーメッセージ
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-center">
                                    <div
                                        className={` ${viewSettingData?.divisionTextwrapCustomClass}`}>
                                        <span
                                            className={`flex-none ${viewSettingData?.divisionTextSize} ${viewSettingData?.divisionTextWeight} ${viewSettingData?.divisionTextCustomClass}`}
                                            style={{ color: viewSettingData?.divisionTextColor?.color }}>{divisionText}
                                        </span>
                                    </div>
                                </div>

                                <div className="w-1/2">
                                    <div className="flex flex-col">
                                        <label
                                            className={`${viewSettingData?.labelTextSize} ${viewSettingData?.labelFontWeight} ${viewSettingData?.labelCustomClass} pt-2`}
                                            style={{ color: viewSettingData?.labelTextColor?.color }}>
                                            フォーム名
                                            <span
                                                className={`${viewSettingData?.requiredTextSize} ${viewSettingData?.requiredFontWeight} ${viewSettingData?.requiredCustomClass}`}
                                                style={{
                                                    color: viewSettingData?.requiredTextColor?.color,
                                                    backgroundColor:
                                                        viewSettingData?.requiredBackgroundColor?.backgroundColor,
                                                }}>
                                                {requiredCharacters}
                                            </span>
                                        </label>

                                        <input
                                            name="last_name"
                                            className={`w-full px-1 placeholderClas ${viewSettingData?.valueTextSize} ${viewSettingData?.valueFontWeight} ${viewSettingData?.inputCustomClass}
                                                    ${viewSettingData?.inputBorderWidth} ${viewSettingData?.inputBorderStyle} ${viewSettingData?.inputBorderRadius}`}
                                            defaultValue="入力テキスト"
                                            placeholder="プレイスホルダー"
                                            style={{
                                                color: viewSettingData?.valueTextColor?.color,
                                                backgroundColor: viewSettingData?.inputBackgroundColor?.backgroundColor,
                                                borderColor: viewSettingData?.inputBorderColor?.borderColor
                                            }}
                                        />
                                        <p
                                            className={`${viewSettingData?.errorMessageTextSize} ${viewSettingData?.errorMessageFontWeight} ${viewSettingData?.errorMessageCustomClass}`}
                                            style={{
                                                color: viewSettingData?.errorMessageTextColor?.color,
                                                backgroundColor: viewSettingData?.errorMessageBackgroundColor?.backgroundColor
                                            }}
                                        >
                                            エラーメッセージ
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex mb-4">
                                <div className="flex flex-row">
                                    <div className="flex flex-col w-1/3">
                                        <label
                                            className={`${viewSettingData?.labelTextSize} ${viewSettingData?.labelFontWeight} ${viewSettingData?.labelCustomClass} pt-2`}
                                            style={{ color: viewSettingData?.labelTextColor?.color }}>市外局番
                                        </label>
                                        <input
                                            name="last_name"
                                            className={`w-full px-1 placeholderClas ${viewSettingData?.valueTextSize} ${viewSettingData?.valueFontWeight} ${viewSettingData?.inputCustomClass}
                                                    ${viewSettingData?.inputBorderWidth} ${viewSettingData?.inputBorderStyle} ${viewSettingData?.inputBorderRadius}`}
                                            defaultValue=""
                                            placeholder="プレイスホルダー"
                                            style={{
                                                color: viewSettingData?.valueTextColor?.color,
                                                backgroundColor: viewSettingData?.inputBackgroundColor?.backgroundColor,
                                                borderColor: viewSettingData?.inputBorderColor?.borderColor
                                            }}
                                        />
                                        <p
                                            className={`${viewSettingData?.errorMessageTextSize} ${viewSettingData?.errorMessageFontWeight} ${viewSettingData?.errorMessageCustomClass}`}
                                            style={{
                                                color: viewSettingData?.errorMessageTextColor?.color,
                                                backgroundColor: viewSettingData?.errorMessageBackgroundColor?.backgroundColor
                                            }}
                                        >
                                            エラーメッセージ
                                        </p>
                                    </div>
                                    <div
                                        className={`flex items-center justify-center ${viewSettingData?.divisionTextwrapCustomClass}`}>
                                        <span
                                            className={`flex-none ${viewSettingData?.divisionTextSize} ${viewSettingData?.divisionTextWeight} ${viewSettingData?.divisionTextCustomClass}`}
                                            style={{ color: viewSettingData?.divisionTextColor?.color }}>{divisionText}
                                        </span>
                                    </div>
                                    <div className="flex flex-col w-1/3">
                                        <label
                                            className={`${viewSettingData?.labelTextSize} ${viewSettingData?.labelFontWeight} ${viewSettingData?.labelCustomClass} pt-2`}
                                            style={{ color: viewSettingData?.labelTextColor?.color }}>
                                            市内局番
                                            <span
                                                className={`${viewSettingData?.requiredTextSize} ${viewSettingData?.requiredFontWeight} ${viewSettingData?.requiredCustomClass}`}
                                                style={{
                                                    color: viewSettingData?.requiredTextColor?.color,
                                                    backgroundColor:
                                                        viewSettingData?.requiredBackgroundColor?.backgroundColor,
                                                }}>
                                                {requiredCharacters}
                                            </span>
                                        </label>

                                        <input
                                            name="last_name"
                                            className={`w-full px-1 placeholderClas ${viewSettingData?.valueTextSize} ${viewSettingData?.valueFontWeight} ${viewSettingData?.inputCustomClass}
                                                    ${viewSettingData?.inputBorderWidth} ${viewSettingData?.inputBorderStyle} ${viewSettingData?.inputBorderRadius}`}
                                            defaultValue="入力テキスト"
                                            placeholder="プレイスホルダー"
                                            style={{
                                                color: viewSettingData?.valueTextColor?.color,
                                                backgroundColor: viewSettingData?.inputBackgroundColor?.backgroundColor,
                                                borderColor: viewSettingData?.inputBorderColor?.borderColor
                                            }}
                                        />
                                        <p
                                            className={`${viewSettingData?.errorMessageTextSize} ${viewSettingData?.errorMessageFontWeight} ${viewSettingData?.errorMessageCustomClass}`}
                                            style={{
                                                color: viewSettingData?.errorMessageTextColor?.color,
                                                backgroundColor: viewSettingData?.errorMessageBackgroundColor?.backgroundColor
                                            }}
                                        >
                                            エラーメッセージ
                                        </p>
                                    </div>
                                    <div
                                        className={`flex items-center justify-center ${viewSettingData?.divisionTextwrapCustomClass}`}>
                                        <span
                                            className={`flex-none ${viewSettingData?.divisionTextSize} ${viewSettingData?.divisionTextWeight} ${viewSettingData?.divisionTextCustomClass}`}
                                            style={{ color: viewSettingData?.divisionTextColor?.color }}>{divisionText}
                                        </span>
                                    </div>
                                    <div className="flex flex-col w-1/3">
                                        <label
                                            className={`${viewSettingData?.labelTextSize} ${viewSettingData?.labelFontWeight} ${viewSettingData?.labelCustomClass} pt-2`}
                                            style={{ color: viewSettingData?.labelTextColor?.color }}
                                        >
                                            加入者番号
                                        </label>
                                        <input
                                            name="last_name"
                                            className={`w-full px-1 placeholderClas
                                                    ${viewSettingData?.inputBorderWidth} ${viewSettingData?.inputBorderStyle} ${viewSettingData?.inputBorderRadius}
                                                    ${viewSettingData?.valueTextSize} ${viewSettingData?.valueFontWeight} ${viewSettingData?.inputCustomClass}`}
                                            defaultValue=""
                                            placeholder="プレイスホルダー"
                                            style={{
                                                color: viewSettingData?.valueTextColor?.color,
                                                backgroundColor: viewSettingData?.inputBackgroundColor?.backgroundColor,
                                                borderColor: viewSettingData?.inputBorderColor?.borderColor
                                            }}
                                        />
                                        <p
                                            className={`${viewSettingData?.errorMessageTextSize} ${viewSettingData?.errorMessageFontWeight} ${viewSettingData?.errorMessageCustomClass}`}
                                            style={{
                                                color: viewSettingData?.errorMessageTextColor?.color,
                                                backgroundColor: viewSettingData?.errorMessageBackgroundColor?.backgroundColor
                                            }}
                                        >
                                            エラーメッセージ
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex mb-4">
                                <div className="flex flex-row">
                                    <div className="flex flex-col w-1/4">
                                        <label
                                            className={`${viewSettingData?.labelTextSize} ${viewSettingData?.labelFontWeight} ${viewSettingData?.labelCustomClass} pt-2`}
                                            style={{ color: viewSettingData?.labelTextColor?.color }}
                                        >
                                            都道府県
                                        </label>

                                        <input
                                            name="last_name"
                                            className={`w-full px-1 placeholderClas
                                                    ${viewSettingData?.inputBorderWidth} ${viewSettingData?.inputBorderStyle} ${viewSettingData?.inputBorderRadius}
                                                    ${viewSettingData?.valueTextSize} ${viewSettingData?.valueFontWeight} ${viewSettingData?.inputCustomClass}`}
                                            defaultValue=""
                                            placeholder="プレイスホルダー"
                                            style={{
                                                color: viewSettingData?.valueTextColor?.color,
                                                backgroundColor: viewSettingData?.inputBackgroundColor?.backgroundColor,
                                                borderColor: viewSettingData?.inputBorderColor?.borderColor
                                            }}
                                        />
                                        <p
                                            className={`${viewSettingData?.errorMessageTextSize} ${viewSettingData?.errorMessageFontWeight} ${viewSettingData?.errorMessageCustomClass}`}
                                            style={{
                                                color: viewSettingData?.errorMessageTextColor?.color,
                                                backgroundColor: viewSettingData?.errorMessageBackgroundColor?.backgroundColor
                                            }}
                                        >
                                            エラーメッセージ
                                        </p>
                                    </div>

                                    <div className={`flex items-center justify-center ${viewSettingData?.divisionTextwrapCustomClass}`}>
                                        <span
                                            className={`flex-none ${viewSettingData?.divisionTextSize} ${viewSettingData?.divisionTextWeight} ${viewSettingData?.divisionTextCustomClass}`}
                                            style={{ color: viewSettingData?.divisionTextColor?.color }}>{divisionText}
                                        </span>
                                    </div>

                                    <div className="flex flex-col w-1/4">
                                        <label
                                            className={`${viewSettingData?.labelTextSize} ${viewSettingData?.labelFontWeight} ${viewSettingData?.labelCustomClass} pt-2`}
                                            style={{ color: viewSettingData?.labelTextColor?.color }}
                                        >
                                            市区町村
                                        </label>
                                        <input
                                            name="last_name"
                                            className={`w-full px-1 placeholderClas
                                                    ${viewSettingData?.inputBorderWidth} ${viewSettingData?.inputBorderStyle} ${viewSettingData?.inputBorderRadius}
                                                    ${viewSettingData?.valueTextSize} ${viewSettingData?.valueFontWeight} ${viewSettingData?.inputCustomClass}`}
                                            defaultValue=""
                                            placeholder="プレイスホルダー"
                                            style={{
                                                color: viewSettingData?.valueTextColor?.color,
                                                backgroundColor: viewSettingData?.inputBackgroundColor?.backgroundColor,
                                                borderColor: viewSettingData?.inputBorderColor?.borderColor
                                            }}
                                        />
                                        <p
                                            className={`${viewSettingData?.errorMessageTextSize} ${viewSettingData?.errorMessageFontWeight} ${viewSettingData?.errorMessageCustomClass}`}
                                            style={{
                                                color: viewSettingData?.errorMessageTextColor?.color,
                                                backgroundColor: viewSettingData?.errorMessageBackgroundColor?.backgroundColor
                                            }}
                                        >
                                            エラーメッセージ
                                        </p>
                                    </div>
                                    <div className={`flex items-center justify-center ${viewSettingData?.divisionTextwrapCustomClass}`}>
                                        <span
                                            className={`flex-none ${viewSettingData?.divisionTextSize} ${viewSettingData?.divisionTextWeight} ${viewSettingData?.divisionTextCustomClass}`}
                                            style={{ color: viewSettingData?.divisionTextColor?.color }}>{divisionText}
                                        </span>
                                    </div>

                                    <div className="flex flex-col w-1/4">
                                        <label
                                            className={`${viewSettingData?.labelTextSize} ${viewSettingData?.labelFontWeight} ${viewSettingData?.labelCustomClass} pt-2`}
                                            style={{ color: viewSettingData?.labelTextColor?.color }}
                                        >
                                            地番
                                        </label>
                                        <input
                                            name="last_name"
                                            className={`w-full px-1 placeholderClas
                                                    ${viewSettingData?.inputBorderWidth} ${viewSettingData?.inputBorderStyle} ${viewSettingData?.inputBorderRadius}
                                                    ${viewSettingData?.valueTextSize} ${viewSettingData?.valueFontWeight} ${viewSettingData?.inputCustomClass}`}
                                            defaultValue=""
                                            placeholder="プレイスホルダー"
                                            style={{
                                                color: viewSettingData?.valueTextColor?.color,
                                                backgroundColor: viewSettingData?.inputBackgroundColor?.backgroundColor,
                                                borderColor: viewSettingData?.inputBorderColor?.borderColor
                                            }}
                                        />
                                        <p
                                            className={`${viewSettingData?.errorMessageTextSize} ${viewSettingData?.errorMessageFontWeight} ${viewSettingData?.errorMessageCustomClass}`}
                                            style={{
                                                color: viewSettingData?.errorMessageTextColor?.color,
                                                backgroundColor: viewSettingData?.errorMessageBackgroundColor?.backgroundColor
                                            }}
                                        >
                                            エラーメッセージ
                                        </p>
                                    </div>
                                    <div className={`flex items-center justify-center ${viewSettingData?.divisionTextwrapCustomClass}`}>
                                        <span
                                            className={`flex-none ${viewSettingData?.divisionTextSize} ${viewSettingData?.divisionTextWeight} ${viewSettingData?.divisionTextCustomClass}`}
                                            style={{ color: viewSettingData?.divisionTextColor?.color }}>{divisionText}
                                        </span>
                                    </div>
                                    <div className="flex flex-col w-1/4">
                                        <label
                                            className={`${viewSettingData?.labelTextSize} ${viewSettingData?.labelFontWeight} ${viewSettingData?.labelCustomClass} pt-2`}
                                            style={{ color: viewSettingData?.labelTextColor?.color }}
                                        >
                                            住所
                                        </label>
                                        <input
                                            name="last_name"
                                            className={`w-full px-1 placeholderClas
                                                    ${viewSettingData?.inputBorderWidth} ${viewSettingData?.inputBorderStyle} ${viewSettingData?.inputBorderRadius}
                                                    ${viewSettingData?.valueTextSize} ${viewSettingData?.valueFontWeight} ${viewSettingData?.inputCustomClass}`}
                                            defaultValue=""
                                            placeholder="プレイスホルダー"
                                            style={{
                                                color: viewSettingData?.valueTextColor?.color,
                                                backgroundColor: viewSettingData?.inputBackgroundColor?.backgroundColor,
                                                borderColor: viewSettingData?.inputBorderColor?.borderColor
                                            }}
                                        />
                                        <p
                                            className={`${viewSettingData?.errorMessageTextSize} ${viewSettingData?.errorMessageFontWeight} ${viewSettingData?.errorMessageCustomClass}`}
                                            style={{
                                                color: viewSettingData?.errorMessageTextColor?.color,
                                                backgroundColor: viewSettingData?.errorMessageBackgroundColor?.backgroundColor
                                            }}
                                        >
                                            エラーメッセージ
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex mb-4">
                                <div className="flex flex-row">
                                    <div className="flex flex-col w-[105px]">
                                        <label
                                            className={`${viewSettingData?.labelTextSize} ${viewSettingData?.labelFontWeight} ${viewSettingData?.labelCustomClass} pt-2`}
                                            style={{ color: viewSettingData?.labelTextColor?.color }}
                                        >
                                            カード番号1
                                        </label>
                                        <input
                                            name="last_name"
                                            className={`w-full px-1 placeholderClas
                                                    ${viewSettingData?.inputBorderWidth} ${viewSettingData?.inputBorderStyle} ${viewSettingData?.inputBorderRadius}
                                                    ${viewSettingData?.valueTextSize} ${viewSettingData?.valueFontWeight} ${viewSettingData?.inputCustomClass}`}
                                            defaultValue=""
                                            placeholder="プレイスホルダー"
                                            style={{
                                                color: viewSettingData?.valueTextColor?.color,
                                                backgroundColor: viewSettingData?.inputBackgroundColor?.backgroundColor,
                                                borderColor: viewSettingData?.inputBorderColor?.borderColor
                                            }}
                                        />
                                        <p
                                            className={`${viewSettingData?.errorMessageTextSize} ${viewSettingData?.errorMessageFontWeight} ${viewSettingData?.errorMessageCustomClass}`}
                                            style={{
                                                color: viewSettingData?.errorMessageTextColor?.color,
                                                backgroundColor: viewSettingData?.errorMessageBackgroundColor?.backgroundColor
                                            }}
                                        >
                                            エラーメッセージ
                                        </p>
                                    </div>

                                    <div className={`flex items-center justify-center ${viewSettingData?.divisionTextwrapCustomClass}`}>
                                        <span
                                            className={`flex-none ${viewSettingData?.divisionTextSize} ${viewSettingData?.divisionTextWeight} ${viewSettingData?.divisionTextCustomClass}`}
                                            style={{ color: viewSettingData?.divisionTextColor?.color }}
                                        >
                                            {divisionText}
                                        </span>
                                    </div>
                                    <div className="flex flex-col w-[105px]">
                                        <label
                                            className={`${viewSettingData?.labelTextSize} ${viewSettingData?.labelFontWeight} ${viewSettingData?.labelCustomClass} pt-2`}
                                            style={{ color: viewSettingData?.labelTextColor?.color }}
                                        >
                                            カード番号2

                                        </label>
                                        <input
                                            name="last_name"
                                            className={`w-full px-1 placeholderClas
                                                    ${viewSettingData?.inputBorderWidth} ${viewSettingData?.inputBorderStyle} ${viewSettingData?.inputBorderRadius}
                                                    ${viewSettingData?.valueTextSize} ${viewSettingData?.valueFontWeight} ${viewSettingData?.inputCustomClass}`}
                                            defaultValue=""
                                            placeholder="プレイスホルダー"
                                            style={{
                                                color: viewSettingData?.valueTextColor?.color,
                                                backgroundColor: viewSettingData?.inputBackgroundColor?.backgroundColor,
                                                borderColor: viewSettingData?.inputBorderColor?.borderColor
                                            }}
                                        />
                                        <p
                                            className={`${viewSettingData?.errorMessageTextSize} ${viewSettingData?.errorMessageFontWeight} ${viewSettingData?.errorMessageCustomClass}`}
                                            style={{
                                                color: viewSettingData?.errorMessageTextColor?.color,
                                                backgroundColor: viewSettingData?.errorMessageBackgroundColor?.backgroundColor
                                            }}
                                        >
                                            エラーメッセージ
                                        </p>
                                    </div>

                                    <div className={`flex items-center justify-center ${viewSettingData?.divisionTextwrapCustomClass}`}>
                                        <span
                                            className={`flex-none ${viewSettingData?.divisionTextSize} ${viewSettingData?.divisionTextWeight} ${viewSettingData?.divisionTextCustomClass}`}
                                            style={{ color: viewSettingData?.divisionTextColor?.color }}
                                        >
                                            {divisionText}
                                        </span>
                                    </div>
                                    <div className="flex flex-col w-[105px]">
                                        <label
                                            className={`${viewSettingData?.labelTextSize} ${viewSettingData?.labelFontWeight} ${viewSettingData?.labelCustomClass} pt-2`}
                                            style={{ color: viewSettingData?.labelTextColor?.color }}
                                        >
                                            カード番号3
                                        </label>
                                        <input
                                            name="last_name"
                                            className={`w-full px-1 placeholderClas
                                                    ${viewSettingData?.inputBorderWidth} ${viewSettingData?.inputBorderStyle} ${viewSettingData?.inputBorderRadius}
                                                    ${viewSettingData?.valueTextSize} ${viewSettingData?.valueFontWeight} ${viewSettingData?.inputCustomClass}`}
                                            defaultValue=""
                                            placeholder="プレイスホルダー"
                                            style={{
                                                color: viewSettingData?.valueTextColor?.color,
                                                backgroundColor: viewSettingData?.inputBackgroundColor?.backgroundColor,
                                                borderColor: viewSettingData?.inputBorderColor?.borderColor
                                            }}
                                        />
                                        <p
                                            className={`${viewSettingData?.errorMessageTextSize} ${viewSettingData?.errorMessageFontWeight} ${viewSettingData?.errorMessageCustomClass}`}
                                            style={{
                                                color: viewSettingData?.errorMessageTextColor?.color,
                                                backgroundColor: viewSettingData?.errorMessageBackgroundColor?.backgroundColor
                                            }}
                                        >
                                            エラーメッセージ
                                        </p>
                                    </div>

                                    <div className={`flex items-center justify-center ${viewSettingData?.divisionTextwrapCustomClass}`}>
                                        <span
                                            className={`flex-none ${viewSettingData?.divisionTextSize} ${viewSettingData?.divisionTextWeight} ${viewSettingData?.divisionTextCustomClass}`}
                                            style={{ color: viewSettingData?.divisionTextColor?.color }}
                                        >
                                            {divisionText}
                                        </span>
                                    </div>

                                    <div className="flex flex-col w-[105px]">
                                        <label
                                            className={`${viewSettingData?.labelTextSize} ${viewSettingData?.labelFontWeight} ${viewSettingData?.labelCustomClass} pt-2`}
                                            style={{ color: viewSettingData?.labelTextColor?.color }}
                                        >
                                            カード番号4
                                        </label>

                                        <input
                                            name="last_name"
                                            className={`w-full px-1 placeholderClas
                                                    ${viewSettingData?.inputBorderWidth} ${viewSettingData?.inputBorderStyle} ${viewSettingData?.inputBorderRadius}
                                                    ${viewSettingData?.valueTextSize} ${viewSettingData?.valueFontWeight} ${viewSettingData?.inputCustomClass}`}
                                            defaultValue=""
                                            placeholder="プレイスホルダー"
                                            style={{
                                                color: viewSettingData?.valueTextColor?.color,
                                                backgroundColor: viewSettingData?.inputBackgroundColor?.backgroundColor,
                                                borderColor: viewSettingData?.inputBorderColor?.borderColor
                                            }}
                                        />
                                        <p
                                            className={`${viewSettingData?.errorMessageTextSize} ${viewSettingData?.errorMessageFontWeight} ${viewSettingData?.errorMessageCustomClass}`}
                                            style={{
                                                color: viewSettingData?.errorMessageTextColor?.color,
                                                backgroundColor: viewSettingData?.errorMessageBackgroundColor?.backgroundColor
                                            }}
                                        >
                                            エラーメッセージ
                                        </p>
                                    </div>
                                    <div className={`flex items-center justify-center ${viewSettingData?.divisionTextwrapCustomClass}`}>
                                        <span
                                            className={`flex-none ${viewSettingData?.divisionTextSize} ${viewSettingData?.divisionTextWeight} ${viewSettingData?.divisionTextCustomClass}`}
                                            style={{ color: viewSettingData?.divisionTextColor?.color }}
                                        >
                                            {divisionText}
                                        </span>
                                    </div>

                                    <div className="flex flex-col w-[105px]">
                                        <label
                                            className={`${viewSettingData?.labelTextSize} ${viewSettingData?.labelFontWeight} ${viewSettingData?.labelCustomClass} pt-2`}
                                            style={{ color: viewSettingData?.labelTextColor?.color }}
                                        >
                                            CVV
                                        </label>

                                        <input
                                            name="last_name"
                                            className={`w-full px-1 placeholderClas
                                                    ${viewSettingData?.inputBorderWidth} ${viewSettingData?.inputBorderStyle} ${viewSettingData?.inputBorderRadius}
                                                    ${viewSettingData?.valueTextSize} ${viewSettingData?.valueFontWeight} ${viewSettingData?.inputCustomClass}`}
                                            defaultValue=""
                                            placeholder="プレイスホルダー"
                                            style={{
                                                color: viewSettingData?.valueTextColor?.color,
                                                backgroundColor: viewSettingData?.inputBackgroundColor?.backgroundColor,
                                                borderColor: viewSettingData?.inputBorderColor?.borderColor
                                            }}
                                        />
                                        <p
                                            className={`${viewSettingData?.errorMessageTextSize} ${viewSettingData?.errorMessageFontWeight} ${viewSettingData?.errorMessageCustomClass}`}
                                            style={{
                                                color: viewSettingData?.errorMessageTextColor?.color,
                                                backgroundColor: viewSettingData?.errorMessageBackgroundColor?.backgroundColor
                                            }}
                                        >
                                            エラーメッセージ
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {/*_________________________temporary added_____________*/}

                    {activePageId === "itemSelection1Settings" && (
                        <>
                            <p className="h-8 bg-blue-50 w-full text-2xl text-center">バグ修正中</p>
                        </>
                    )}
                    {/* </div> */}
                </form>
            </Formik>
        </>
    );
};
export default FieldFormSettingsPreview;
