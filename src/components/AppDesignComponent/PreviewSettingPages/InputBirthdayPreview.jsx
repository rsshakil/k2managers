import React, { useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { appDesignerState, getSelectedPageData } from '../../../store/recoil/appDesignerState';
import { Formik, Form, Field, ErrorMessage } from 'formik';

function rangeItems(start, end) {
    return Array(end - start + 1)
        .fill()
        .map((_, idx) => start + idx);
}
const yearRange1900 = rangeItems(1900, 2100);

const monthRange12 = rangeItems(1, 12);
const dayRange31 = rangeItems(1, 31);
const hourRange24 = rangeItems(1, 23);
const minuteRange60 = rangeItems(1, 59);

const FieldFormSettingsPreview = ({ pageText, pageId, data }) => {
    const selectRef = useRef(null);
    const [recoilStateValue, setRecoilState] = useRecoilState(appDesignerState);
    const { activeTab, activePageId, tabItems } = recoilStateValue;
    const { classes, styles, info, prefixClass } = data || '';
    let viewSettingData = { ...classes, ...styles, ...info, ...prefixClass };
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
          color:${viewSettingData?.buttonTextColor?.color}
        }
        .peer:checked ~ .peer-checked:selectButtonTextColor{
          --tw-text-opacity: 1;
          color:${viewSettingData?.selectedButtonTextColor?.color}
        }
        .peer:checked ~ .peer-checked:selectButtonBackgroundColor{
          --tw-bg-opacity: 1;
          background-color: ${viewSettingData?.selectedButtonBackgroundColor?.backgroundColor};
        }
        .numberField::-webkit-inner-spin-button, 
        .numberField::-webkit-outer-spin-button {  
          height:auto;
          opacity: 1;
    
        }
      `;
    function removeSM(str) {
        if (typeof str != 'undefined') {
            if (str.includes('sm:')) {
                let arr = str.split(':');
                return arr[1];
            } else {
                return str;
            }
        }
    }
    //placeholder custom color for selectbox
    const changeColor = (item) => {
        if (item.target.value == 0) {
            selectRef.current.style.color = viewSettingData?.placeholderTextColor?.color;
        } else {
            selectRef.current.style.color = viewSettingData?.valueTextColor?.color;
        }
    };
    return (
        <>
            <style>{placeholderCss}</style>
            <Formik>
                <form>
                    <div className={`${viewSettingData?.birthdayWrapCustomClass}`}>
                        <div className="flex">
                            <div className={`flex flex-col w-1/3 ${viewSettingData?.yearWrapCustomClass}`}>
                                <label
                                    className={`${viewSettingData?.labelTextSize} ${viewSettingData?.labelFontWeight} ${viewSettingData?.labelCustomClass} pt-2`}
                                    style={{ color: viewSettingData?.labelTextColor?.color }}
                                >
                                    誕生年
                                    <span
                                        className={`px-2 ${viewSettingData?.requiredTextSize} ${viewSettingData?.requiredFontWeight} ${viewSettingData?.requiredCustomClass}`}
                                        style={{
                                            color: viewSettingData?.requiredTextColor?.color,
                                            backgroundColor: viewSettingData?.requiredBackgroundColor?.backgroundColor,
                                        }}
                                    >
                                        {viewSettingData?.requiredCharacters}
                                    </span>
                                </label>

                                <select
                                    className={`w-full h-8 px-2 ${viewSettingData?.selectBorderWidth} ${viewSettingData?.selectBorderStyle} ${viewSettingData?.selectBorderRadius} ${viewSettingData?.selectTextSize} ${viewSettingData?.selectTextWeight}`}
                                    style={{
                                        color: viewSettingData?.selectTextColor?.color,
                                        backgroundColor: viewSettingData?.selectBackgroundColor?.backgroundColor,
                                        borderColor: viewSettingData?.selectBorderColor?.borderColor,
                                    }}
                                >
                                    <option defaultValue>1970</option>
                                    {yearRange1900.map((n, i) => (
                                        <option key={n} value={n}>
                                            {n}
                                        </option>
                                    ))}
                                </select>
                                <p
                                    className={`${viewSettingData?.inputErrorTextSize} ${viewSettingData?.inputErrorTextWeight} ${viewSettingData?.inputErrorCustomClass} text-left`}
                                    style={{
                                        color: viewSettingData?.inputErrorTextColor?.color,
                                        backgroundColor: viewSettingData?.inputErrorBackgroundColor?.backgroundColor,
                                    }}
                                >
                                    エラーメッセージ
                                </p>
                            </div>

                            <div className={`flex flex-col w-1/3 px-2 ${viewSettingData?.monthWrapCustomClass}`}>
                                <label
                                    className={`${viewSettingData?.labelTextSize} ${viewSettingData?.labelFontWeight} ${viewSettingData?.labelCustomClass} pt-2`}
                                    style={{ color: viewSettingData?.labelTextColor?.color }}
                                >
                                    誕生月
                                    <span
                                        className={`px-2 ${viewSettingData?.requiredTextSize} ${viewSettingData?.requiredFontWeight} ${viewSettingData?.requiredCustomClass}`}
                                        style={{
                                            color: viewSettingData?.requiredTextColor?.color,
                                            backgroundColor: viewSettingData?.requiredBackgroundColor?.backgroundColor,
                                        }}
                                    >
                                        {viewSettingData?.requiredCharacters}
                                    </span>
                                </label>
                                <div className="relative w-full">
                                    <select
                                        className={`w-full h-8 px-2
                                            ${viewSettingData?.selectBorderWidth} ${viewSettingData?.selectBorderStyle} ${viewSettingData?.selectBorderRadius} 
                                            ${viewSettingData?.selectTextSize} ${viewSettingData?.selectTextWeight}
                                            `}
                                        style={{
                                            backgroundColor: viewSettingData?.selectBackgroundColor?.backgroundColor,
                                            color: viewSettingData?.selectTextColor?.color,

                                            borderColor: viewSettingData?.selectBorderColor?.borderColor,
                                        }}
                                    >
                                        <option defaultValue>10</option>
                                        {monthRange12.map((n, i) => (
                                            <option key={n} value={n}>
                                                {n}
                                            </option>
                                        ))}
                                    </select>
                                    <button
                                        class={`absolute top-0 right-0 bottom-0 w-10 !rounded-l-none h-8 ${viewSettingData?.dayMonthTextSize} ${viewSettingData?.dayMonthTextWeight} ${viewSettingData?.dayMonthcustomClass} ${viewSettingData?.selectBorderRadius}  ${viewSettingData?.selectBorderWidth} ${viewSettingData?.selectBorderStyle}  `}
                                        style={{
                                            color: viewSettingData?.dayMonthTextColor?.color,
                                            backgroundColor: viewSettingData?.dayMonthBackgroundColor?.backgroundColor,
                                            borderColor: viewSettingData?.selectBorderColor?.borderColor,
                                        }}
                                    >
                                        月
                                    </button>
                                </div>
                                <p
                                    className={`${viewSettingData?.inputErrorTextSize} ${viewSettingData?.inputErrorTextWeight} ${viewSettingData?.inputErrorCustomClass} text-left`}
                                    style={{
                                        color: viewSettingData?.inputErrorTextColor?.color,
                                        backgroundColor: viewSettingData?.inputErrorBackgroundColor?.backgroundColor,
                                    }}
                                >
                                    エラーメッセージ
                                </p>
                            </div>

                            <div className={`flex flex-col w-1/3 ${viewSettingData?.dayWrapCustomClass}`}>
                                <label
                                    className={`${viewSettingData?.labelTextSize} ${viewSettingData?.labelFontWeight} ${viewSettingData?.labelCustomClass} pt-2`}
                                    style={{ color: viewSettingData?.labelTextColor?.color }}
                                >
                                    誕生日
                                    <span
                                        className={`px-2 ${viewSettingData?.requiredTextSize} ${viewSettingData?.requiredFontWeight} ${viewSettingData?.requiredCustomClass}`}
                                        style={{
                                            color: viewSettingData?.requiredTextColor?.color,
                                            backgroundColor: viewSettingData?.requiredBackgroundColor?.backgroundColor,
                                        }}
                                    >
                                        {viewSettingData?.requiredCharacters}
                                    </span>
                                </label>
                                <div className="relative w-full">
                                    <select
                                        className={`w-full h-8 px-2
                                            ${viewSettingData?.selectBorderWidth} ${viewSettingData?.selectBorderStyle} ${viewSettingData?.selectBorderRadius} 
                                            ${viewSettingData?.selectTextSize} ${viewSettingData?.selectTextWeight}`}
                                        style={{
                                            color: viewSettingData?.selectTextColor?.color,
                                            backgroundColor: viewSettingData?.selectBackgroundColor?.backgroundColor,
                                            borderColor: viewSettingData?.selectBorderColor?.borderColor,
                                        }}
                                    >
                                        <option defaultValue>10</option>
                                        {dayRange31.map((n, i) => (
                                            <option key={n} value={n}>
                                                {n}
                                            </option>
                                        ))}
                                    </select>
                                    <button
                                        class={`absolute top-0 right-0 bottom-0 w-10 !rounded-l-none h-8 ${viewSettingData?.dayMonthTextSize} ${viewSettingData?.dayMonthTextWeight} ${viewSettingData?.dayMonthcustomClass} ${viewSettingData?.selectBorderRadius}  ${viewSettingData?.selectBorderWidth} ${viewSettingData?.selectBorderStyle}  `}
                                        style={{
                                            color: viewSettingData?.dayMonthTextColor?.color,
                                            backgroundColor: viewSettingData?.dayMonthBackgroundColor?.backgroundColor,
                                            borderColor: viewSettingData?.selectBorderColor?.borderColor,
                                        }}
                                    >
                                        日
                                    </button>
                                </div>
                                <p
                                    className={`${viewSettingData?.inputErrorTextSize} ${viewSettingData?.inputErrorTextWeight} ${viewSettingData?.inputErrorCustomClass} text-left`}
                                    style={{
                                        color: viewSettingData?.inputErrorTextColor?.color,
                                        backgroundColor: viewSettingData?.inputErrorBackgroundColor?.backgroundColor,
                                    }}
                                >
                                    エラーメッセージ
                                </p>
                            </div>
                        </div>
                    </div>
                </form>
            </Formik>
        </>
    );
};
export default FieldFormSettingsPreview;
