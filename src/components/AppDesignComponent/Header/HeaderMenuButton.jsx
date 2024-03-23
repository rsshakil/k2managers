import _ from 'lodash';
import React from 'react';
import { useRecoilState } from 'recoil';
import { appDesignerState } from '../../../store/recoil/appDesignerState';

const HeaderMenuButton = ({ buttonType, label, buttonSettingData, buttonNumber }) => {
    let buttonTypeKey = 'a';
    if (buttonType === 'a') {
        buttonTypeKey = 'buttonASettings';
    } else if (buttonType === 'b') {
        buttonTypeKey = 'buttonBSettings';
    } else if (buttonType === 'c') {
        buttonTypeKey = 'buttonCSettings';
    }
    const [recoilStateValue, setRecoilState] = useRecoilState(appDesignerState);
    const { activeTab, activePageId, tabItems } = recoilStateValue;
    const data = tabItems.settings.appSettingQuery[buttonTypeKey];
    const { classes = {}, styles = {}, prefixClass = {} } = data || '';
    const { active = {}, default: defaultClasses = {}, focus = {}, disabled = {}, hover = {} } = prefixClass;

    let classList = '';
    let activeButtonClassList = '';
    let hoverButtonClassList = '';
    let focusButtonClassList = '';
    let disabledButtonClassList = '';

    if (!_.isEmpty(classes)) {
        const filteredGlobalClasses = filteredClassesCustom(
            classes,
            ['spinnerCustomClass', 'fontWeight', 'textSize', 'paddingX'],
            false
        );
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

    let normalButtonStyles = {};
    let activeButtonStyles = '';
    let hoverButtonStyles = '';
    let focusButtonStyles = '';
    let disabledButtonStyles = '';
    let spinnerStyles = '';

    if (!_.isEmpty(styles)) {
        normalButtonStyles = { ...styles.backgroundColor, ...styles.borderColor, ...styles.textColor };
        activeButtonStyles = {
            ...styles.backgroundColorActive,
            ...styles.borderColorActive,
            ...styles.textColorActive,
            ...styles.ringColorActive,
        };
        hoverButtonStyles = { ...styles.backgroundColorHover, ...styles.borderColorHover, ...styles.textColorHover };
        focusButtonStyles = {
            ...styles.backgroundColorFocus,
            ...styles.borderColorFocus,
            ...styles.textColorFocus,
            ...styles.ringColorFocus,
        };
        disabledButtonStyles = {
            ...styles.backgroundColorDisabled,
            ...styles.borderColorDisabled,
            ...styles.textColorDisabled,
        };
        spinnerStyles = { ...styles.spinnerColor };
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

    function filteredClassesCustom(classList = {}, filterKey = [], isSkip = false) {
        return Object.keys(classList)
            .filter((key) => !filterKey.includes(key))
            .reduce((cur, key) => {
                return Object.assign(cur, { [key]: classList[key] });
            }, {});
    }

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
    let smButtonProperty = '';
    let menuButtonCustomClass = '';
    let buttonPaddingX = '';
    if (buttonNumber == 1) {
        smButtonProperty = `  ${removeSM(buttonSettingData?.prefixClass?.sm?.headerMenu1textSize)} ${removeSM(
            buttonSettingData?.prefixClass?.sm?.headerMenu1textWeight
        )} `;
        buttonPaddingX = ` ${removeSM(buttonSettingData?.prefixClass?.sm?.headerMenu1paddingX)} `;
        menuButtonCustomClass = ` ${buttonSettingData?.classes?.headerMenu1CustomClass} `;
    } else if (buttonNumber == 2) {
        smButtonProperty = ` ${removeSM(buttonSettingData?.prefixClass?.sm?.headerMenu2textSize)} ${removeSM(
            buttonSettingData?.prefixClass?.sm?.headerMenu2textWeight
        )} `;
        buttonPaddingX = ` ${removeSM(buttonSettingData?.prefixClass?.sm?.headerMenu2paddingX)} `;
        menuButtonCustomClass = ` ${buttonSettingData?.classes?.headerMenu2CustomClass} `;
    }

    return (
        <div className={`px-1`}>
            <button
                className={`hover:bg-[${tabItems.settings.appSettingQuery.buttonBSettings.styles.backgroundColorHover.backgroundColor}] ${classList} ${hoverButtonClassList} ${activeButtonClassList} ${focusButtonClassList} ${disabledButtonClassList} ${smButtonProperty} ${buttonPaddingX} ${menuButtonCustomClass}`}
                style={normalButtonStyles}
            >
                {label}
            </button>
        </div>
    );
};
export default HeaderMenuButton;
