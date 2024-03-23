import React from 'react';
import _ from 'lodash';

import { useRecoilState, useRecoilValue } from 'recoil';
import { appDesignerState, getSelectedPageData } from '../../../store/recoil/appDesignerState';

const Token1loginSettingsPreview = ({ pageText, pageId, data }) => {
    const [recoilStateValue, setRecoilState] = useRecoilState(appDesignerState);
    const { activeTab, activePageId, tabItems } = recoilStateValue;
    const { classes, styles, info, prefixClass } = data || '';
    let viewSettingData = { ...classes, ...styles, ...info, ...prefixClass };
    let numField = Array.from({ length: viewSettingData?.divisionNumber }, (_, i) => i + 1);
    let currentStateData = JSON.parse(JSON.stringify({ ...recoilStateValue }));
    let pageCss = `
    .placeholderColorClass::placeholder{
        color:${viewSettingData?.placeholderTextColor?.color}
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
    const defaultButtonClasses = '';

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
        <div className={`w-full px-8`}>
            <div className={`w-full flex ${viewSettingData?.outerWrapCustumClass}`}>
                <style>{pageCss}</style>
                {numField.length > 0 &&
                    numField.map((number, index) => {
                        let inputLabelText = 'inputLabelText' + number;
                        let inputPlaceholderText = 'inputPlaceholderText' + number;
                        let inputCustumClass = 'inputCustumClass' + number;
                        let inputWrapCustumClassAll = 'inputWrapCustumClass' + number;
                        return (
                            <>
                                <div className={`w-1/${numField.length} px-2`}>
                                    <div className="flex flex-row">
                                        {index > 0 && (
                                            <div
                                                className={`flex items-center justify-center ${viewSettingData?.divisionTextwrapCustomClass}`}
                                            >
                                                <span
                                                    className={`mt-8 mr-4 ${viewSettingData?.divisionTextSize} ${viewSettingData?.divisionTextWeight} ${viewSettingData?.divisionTextCustomClass}`}
                                                    style={{ color: viewSettingData?.divisionTextColor?.color }}
                                                >
                                                    {viewSettingData?.divisionText}
                                                </span>
                                            </div>
                                        )}
                                        <div
                                            className={` ${viewSettingData?.inputWrapCustomClass} ${viewSettingData[inputWrapCustumClassAll]}`}
                                        >
                                            <h3
                                                className={`pt-2 h-8
                            ${viewSettingData?.labelTextSize}
                            ${viewSettingData?.labelTextWeight}
                            `}
                                                style={{ color: viewSettingData?.labelTextColor?.color }}
                                            >
                                                {viewSettingData[inputLabelText]}
                                            </h3>
                                            <input
                                                type={viewSettingData?.isMask == false ? 'text' : 'password'}
                                                className={`w-full px-2 ${viewSettingData[inputCustumClass]} ${viewSettingData?.inputCustomClass}
                                 ${viewSettingData?.inputBorderWidth}
                                  ${viewSettingData?.inputBorderStyle}
                                   ${viewSettingData?.inputBorderRadius}
                                    ${viewSettingData?.inputTextSize} 
                                    ${viewSettingData?.inputTextWeight} 
                                    h-8 placeholderColorClass `}
                                                placeholder={viewSettingData[inputPlaceholderText]}
                                                defaultValue={index > 0 ? '1234' : ''}
                                                style={{
                                                    color: viewSettingData?.inputTextColor?.color,
                                                    borderColor: viewSettingData?.borderColor?.borderColor,
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </>
                        );
                    })}
            </div>

            <div className="flex flex-1">
                <div className={`mt-8 ${viewSettingData?.customClass} w-full`}>
                    <button className={`w-full ${classList}`} style={normalButtonStyles}>
                        ボタン
                    </button>
                </div>
            </div>
            <div className="flex flex-1">
                <div className={`w-full ${viewSettingData?.errorMessageWrapCustomClass}`}>
                    <p
                        className={`${viewSettingData?.errorMessageTextSize} ${viewSettingData?.errorMessageTextWeight} ${viewSettingData?.errorMessagecustomClass} text-right`}
                        style={{
                            color: viewSettingData?.errorMessageTextColor?.color,
                        }}
                    >
                        エラーテキスト
                    </p>
                </div>
            </div>
        </div>
    );
};
export default Token1loginSettingsPreview;
