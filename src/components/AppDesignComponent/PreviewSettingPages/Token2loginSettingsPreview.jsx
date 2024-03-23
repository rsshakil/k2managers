import _ from 'lodash';
import React, { useRef } from 'react';

import { Formik } from 'formik';
import { useRecoilState } from 'recoil';
import { appDesignerState } from '../../../store/recoil/appDesignerState';

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

const Token2loginSettingsPreview = ({ pageText, pageId, data }) => {
    const selectRef = useRef(null);
    const [recoilStateValue, setRecoilState] = useRecoilState(appDesignerState);
    const { activeTab, activePageId, tabItems } = recoilStateValue;
    const { classes, styles, info, prefixClass } = data || '';
    let viewSettingData = { ...classes, ...styles, ...info, ...prefixClass };
    let numField = Array.from({ length: viewSettingData?.divisionNumber }, (_, i) => i + 1);
    let currentStateData = JSON.parse(JSON.stringify({ ...recoilStateValue }));

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

    //buttonStart
    let buttonTypes = '';
    if (viewSettingData?.buttonType == 'a') {
        buttonTypes = 'buttonASettings';
    } else {
        buttonTypes = 'buttonBSettings';
    }
    let buttonData = currentStateData.tabItems.settings.appSettingQuery[buttonTypes];

    const { classes: btnClasses = {}, styles: btnStyles = {}, prefixClass: btnprefixClass = {} } = buttonData || '';
    const { active = {}, default: defaultClasses = {}, focus = {}, disabled = {}, hover = {} } = btnClasses;

    let classList = '';
    let activeButtonClassList = '';
    let hoverButtonClassList = '';
    let focusButtonClassList = '';
    let disabledButtonClassList = '';

    if (!_.isEmpty(btnClasses)) {
        const filteredGlobalClasses = filteredClasses(btnClasses, 'spinnerCustomClass', true);
        classList = Object.values(filteredGlobalClasses).join(' ');
    }

    if (!_.isEmpty(active)) {
        const filteredActiveButtonClasses = filteredClasses(active, 'Preview', false);
        activeButtonClassList = Object.values(filteredActiveButtonClasses).join(' ');
    }

    if (!_.isEmpty(hover)) {
        const filteredHoverButtonClasses = filteredClasses(hover, 'Preview', false);
        hoverButtonClassList = Object.values(filteredHoverButtonClasses).join(' ');
    }

    if (!_.isEmpty(focus)) {
        const filteredFocusButtonClasses = filteredClasses(focus, 'Preview', false);
        focusButtonClassList = Object.values(filteredFocusButtonClasses).join(' ');
    }

    if (!_.isEmpty(disabled)) {
        const filteredDisabledButtonClasses = filteredClasses(disabled, 'Preview', false);
        disabledButtonClassList = Object.values(filteredDisabledButtonClasses).join(' ');
    }

    let normalButtonStyles = '';
    let activeButtonStyles = '';
    let hoverButtonStyles = '';
    let focusButtonStyles = '';
    let disabledButtonStyles = '';
    let spinnerStyles = '';

    if (!_.isEmpty(btnStyles)) {
        normalButtonStyles = { ...btnStyles.backgroundColor, ...btnStyles.borderColor, ...btnStyles.textColor };
        activeButtonStyles = {
            ...btnStyles.backgroundColorActive,
            ...btnStyles.borderColorActive,
            ...btnStyles.textColorActive,
            ...btnStyles.ringColorActive,
        };
        hoverButtonStyles = {
            ...btnStyles.backgroundColorHover,
            ...btnStyles.borderColorHover,
            ...btnStyles.textColorHover,
        };
        focusButtonStyles = {
            ...btnStyles.backgroundColorFocus,
            ...btnStyles.borderColorFocus,
            ...btnStyles.textColorFocus,
            ...btnStyles.ringColorFocus,
        };
        disabledButtonStyles = {
            ...btnStyles.backgroundColorDisabled,
            ...btnStyles.borderColorDisabled,
            ...btnStyles.textColorDisabled,
        };
        spinnerStyles = { ...btnStyles.spinnerColor };
    }

    function filteredClasses(classList = {}, filterKey = '', isSkip = false) {
        if (isSkip) {
            return Object.keys(classList)
                .filter((key) => !key.includes(filterKey))
                .reduce((cur, key) => {
                    return Object.assign(cur, { [key]: classList[key] });
                }, {});
        } else {
            return Object.keys(classList)
                .filter((key) => key.includes(filterKey))
                .reduce((cur, key) => {
                    return Object.assign(cur, { [key]: classList[key] });
                }, {});
        }
    }

    return (
        <>
            <style>{placeholderCss}</style>
            <Formik>
                <form>
                    <div className={`${viewSettingData?.birthdayWrapCustomClass}`}>
                        <div className={`flex mb-10 ${viewSettingData?.token1WrapCustumClass}`}>
                            {numField.length > 0 &&
                                numField.map((number, index) => {
                                    return (
                                        <>
                                            {index > 0 && (
                                                <div
                                                    className={`flex items-center justify-center px-1 ${viewSettingData?.divisionTextwrapCustomClass}`}
                                                >
                                                    <span
                                                        className={` ${viewSettingData?.divisionTextSize} ${viewSettingData?.divisionTextWeight} ${viewSettingData?.divisionTextCustomClass}`}
                                                        style={{ color: viewSettingData?.divisionTextColor?.color }}
                                                    >
                                                        {viewSettingData?.divisionText}
                                                    </span>
                                                </div>
                                            )}
                                            <div className={`w-1/${numField.length}`}>
                                                <label
                                                    className={`pt-2 
                            ${viewSettingData?.labelTextSize}
                            ${viewSettingData?.labelTextWeight}
                            ${viewSettingData?.labelCustomClass}
                            `}
                                                    style={{
                                                        color: viewSettingData?.labelTextColor?.color,
                                                        backgroundColor:
                                                            viewSettingData?.labelBackgroundColor?.backgroundColor,
                                                    }}
                                                >{`エリア${number}`}</label>
                                                <span
                                                    className={`px-2 pt-2 ${viewSettingData?.requiredTextSize} ${viewSettingData?.requiredTextWeight} ${viewSettingData?.requiredCustomClass}`}
                                                    style={{
                                                        color: viewSettingData?.requiredTextColor?.color,
                                                        backgroundColor:
                                                            viewSettingData?.requiredBackgroundColor?.backgroundColor,
                                                    }}
                                                >
                                                    {viewSettingData?.requiredCharacters}
                                                </span>
                                                <div
                                                    className={` flex flex-col ${viewSettingData?.t1inputWrapCustomClass} `}
                                                >
                                                    <input
                                                        type={viewSettingData?.isMask == false ? 'text' : 'password'}
                                                        className={`w-full px-2 
                                 ${viewSettingData?.inputBorderWidth}
                                  ${viewSettingData?.inputBorderStyle}
                                   ${viewSettingData?.inputBorderRadius}
                                    ${viewSettingData?.inputTextSize} 
                                    ${viewSettingData?.inputTextWeight} 
                                    h-8 placeholderClas `}
                                                        placeholder={index == 0 ? 'プレイスホルダー' : ''}
                                                        defaultValue={index > 0 ? '1234' : ''}
                                                        style={{
                                                            color: viewSettingData?.inputTextColor?.color,
                                                            borderColor: viewSettingData?.inputBorderColor?.borderColor,
                                                            backgroundColor:
                                                                viewSettingData?.inputBackgroundColor?.backgroundColor,
                                                        }}
                                                    />
                                                    <p
                                                        className={`${viewSettingData?.inputErrorTextSize} ${viewSettingData?.inputErrorTextWeight} ${viewSettingData?.inputErrorCustomClass} text-left`}
                                                        style={{
                                                            color: viewSettingData?.inputErrorTextColor?.color,
                                                            backgroundColor:
                                                                viewSettingData?.inputErrorBackgroundColor
                                                                    ?.backgroundColor,
                                                        }}
                                                    >
                                                        エラーメッセージ
                                                    </p>
                                                </div>
                                            </div>
                                        </>
                                    );
                                })}
                        </div>
                        <div className={`flex mb-10 ${viewSettingData?.token2WrapCustumClass}`}>
                            <div className={` w-1/3 ${viewSettingData?.yearWrapCustomClass}`}>
                                <label
                                    className={`${viewSettingData?.labelTextSize} ${viewSettingData?.labelFontWeight} ${viewSettingData?.labelCustomClass}`}
                                    style={{
                                        color: viewSettingData?.labelTextColor?.color,
                                        backgroundColor: viewSettingData?.labelBackgroundColor?.backgroundColor,
                                    }}
                                >
                                    誕生年
                                </label>
                                <span
                                    className={`px-2 ${viewSettingData?.requiredTextSize} ${viewSettingData?.requiredFontWeight} ${viewSettingData?.requiredCustomClass}`}
                                    style={{
                                        color: viewSettingData?.requiredTextColor?.color,
                                        backgroundColor: viewSettingData?.requiredBackgroundColor?.backgroundColor,
                                    }}
                                >
                                    {viewSettingData?.requiredCharacters}
                                </span>
                                <div className="flex flex-col">
                                    <select
                                        className={`w-full h-8 px-2
                                                    ${viewSettingData?.inputBorderWidth}
                                  ${viewSettingData?.inputBorderStyle}
                                   ${viewSettingData?.inputBorderRadius}
                                   ${viewSettingData?.inputTextSize} 
                                   ${viewSettingData?.inputTextWeight} 
                                                    `}
                                        style={{
                                            color: viewSettingData?.selectTextColor?.color,
                                            backgroundColor: viewSettingData?.selectBackgroundColor?.backgroundColor,
                                            borderColor: viewSettingData?.inputBorderColor?.borderColor,
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
                                            backgroundColor:
                                                viewSettingData?.inputErrorBackgroundColor?.backgroundColor,
                                        }}
                                    >
                                        エラーメッセージ
                                    </p>
                                </div>
                            </div>

                            <div className={` w-1/3 px-2 ${viewSettingData?.monthWrapCustomClass}`}>
                                <label
                                    className={`${viewSettingData?.labelTextSize} ${viewSettingData?.labelFontWeight} ${viewSettingData?.labelCustomClass} `}
                                    style={{
                                        color: viewSettingData?.labelTextColor?.color,
                                        backgroundColor: viewSettingData?.labelBackgroundColor?.backgroundColor,
                                    }}
                                >
                                    誕生月
                                </label>
                                <span
                                    className={`px-2 ${viewSettingData?.requiredTextSize} ${viewSettingData?.requiredFontWeight} ${viewSettingData?.requiredCustomClass}`}
                                    style={{
                                        color: viewSettingData?.requiredTextColor?.color,
                                        backgroundColor: viewSettingData?.requiredBackgroundColor?.backgroundColor,
                                    }}
                                >
                                    {viewSettingData?.requiredCharacters}
                                </span>
                                <div className="relative w-full flex flex-col">
                                    <select
                                        className={`w-full h-8 px-2
                                            
                                            ${viewSettingData?.inputBorderWidth}
                                            ${viewSettingData?.inputBorderStyle}
                                             ${viewSettingData?.inputBorderRadius}
                                             ${viewSettingData?.inputTextSize} 
                                             ${viewSettingData?.inputTextWeight} 
                                            `}
                                        style={{
                                            color: viewSettingData?.selectTextColor?.color,
                                            backgroundColor: viewSettingData?.selectBackgroundColor?.backgroundColor,
                                            borderColor: viewSettingData?.inputBorderColor?.borderColor,
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
                                        class={`absolute top-0 right-0 bottom-0 w-10 !rounded-l-none h-8  ${viewSettingData?.inputBorderWidth}
                                            ${viewSettingData?.inputBorderStyle}
                                             ${viewSettingData?.inputBorderRadius} 
                                             ${viewSettingData?.dayMonthTextSize} ${viewSettingData?.dayMonthTextWeight} ${viewSettingData?.dayMonthcustomClass}
                                             `}
                                        style={{
                                            color: viewSettingData?.dayMonthTextColor?.color,
                                            backgroundColor: viewSettingData?.dayMonthBackgroundColor?.backgroundColor,
                                            borderColor: viewSettingData?.inputBorderColor?.borderColor,
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

                            <div className={` w-1/3 ${viewSettingData?.dayWrapCustomClass}`}>
                                <label
                                    className={`${viewSettingData?.labelTextSize} ${viewSettingData?.labelFontWeight} ${viewSettingData?.labelCustomClass}`}
                                    style={{
                                        color: viewSettingData?.labelTextColor?.color,
                                        backgroundColor: viewSettingData?.labelBackgroundColor?.backgroundColor,
                                    }}
                                >
                                    誕生日
                                </label>
                                <span
                                    className={`px-2 ${viewSettingData?.requiredTextSize} ${viewSettingData?.requiredFontWeight} ${viewSettingData?.requiredCustomClass}`}
                                    style={{
                                        color: viewSettingData?.requiredTextColor?.color,
                                        backgroundColor: viewSettingData?.requiredBackgroundColor?.backgroundColor,
                                    }}
                                >
                                    {viewSettingData?.requiredCharacters}
                                </span>
                                <div className="relative w-full flex flex-col">
                                    <select
                                        className={`w-full h-8 px-2
                                            ${viewSettingData?.inputBorderWidth}
                                            ${viewSettingData?.inputBorderStyle}
                                             ${viewSettingData?.inputBorderRadius}
                                             ${viewSettingData?.inputTextSize} 
                                    ${viewSettingData?.inputTextWeight} 
                                            `}
                                        style={{
                                            color: viewSettingData?.selectTextColor?.color,
                                            backgroundColor: viewSettingData?.selectBackgroundColor?.backgroundColor,
                                            borderColor: viewSettingData?.inputBorderColor?.borderColor,
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
                                        class={`absolute top-0 right-0 bottom-0 w-10 !rounded-l-none h-8  
                                        ${viewSettingData?.inputBorderWidth}
                                            ${viewSettingData?.inputBorderStyle}
                                             ${viewSettingData?.inputBorderRadius}
                                             ${viewSettingData?.dayMonthTextSize} ${viewSettingData?.dayMonthTextWeight} ${viewSettingData?.dayMonthcustomClass}
                                             `}
                                        style={{
                                            color: viewSettingData?.dayMonthTextColor?.color,
                                            backgroundColor: viewSettingData?.dayMonthBackgroundColor?.backgroundColor,
                                            borderColor: viewSettingData?.inputBorderColor?.borderColor,
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

                        <div className={`flex flex-1 ${viewSettingData?.buttonWrapCustumClass}`}>
                            <div className={`mt-8 w-full`}>
                                <button className={`w-full ${classList}`} style={normalButtonStyles}>
                                    ボタン
                                </button>
                                <p
                                    className={`${viewSettingData?.buttonErrorTextSize} ${viewSettingData?.buttonErrorTextWeight} ${viewSettingData?.buttonErrorCustomClass} text-right`}
                                    style={{
                                        color: viewSettingData?.buttonErrorTextColor?.color,
                                        backgroundColor: viewSettingData?.buttonErrorBackgroundColor?.backgroundColor,
                                    }}
                                >
                                    エラーテキスト
                                </p>
                            </div>
                        </div>
                    </div>
                </form>
            </Formik>
        </>
    );
};
export default Token2loginSettingsPreview;
