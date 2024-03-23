import _ from "lodash";
import { FiRefreshCw } from 'react-icons/fi';

export default function ButtonSettingsPreview({ buttonType, data = null }) {

    const defaultButtonClasses = "";

    const { classes = {}, styles = {}, prefixClass = {} } = data || '';
    const { active = {}, default: defaultClasses = {}, focus = {}, disabled = {}, hover = {} } = prefixClass;

    let classList = "";
    let activeButtonClassList = "";
    let hoverButtonClassList = "";
    let focusButtonClassList = "";
    let disabledButtonClassList = "";

    if (!_.isEmpty(classes)) {
        const filteredGlobalClasses = filteredClasses(classes, 'spinnerCustomClass', true);
        classList = Object.values(filteredGlobalClasses).join(" ");
    }

    if (!_.isEmpty(active)) {
        const filteredActiveButtonClasses = filteredClasses(active, 'Preview', false);
        activeButtonClassList = Object.values(filteredActiveButtonClasses).join(" ");
    }

    if (!_.isEmpty(hover)) {
        const filteredHoverButtonClasses = filteredClasses(hover, 'Preview', false);
        hoverButtonClassList = Object.values(filteredHoverButtonClasses).join(" ");
    }

    if (!_.isEmpty(focus)) {
        const filteredFocusButtonClasses = filteredClasses(focus, 'Preview', false);
        focusButtonClassList = Object.values(filteredFocusButtonClasses).join(" ");
    }

    if (!_.isEmpty(disabled)) {
        const filteredDisabledButtonClasses = filteredClasses(disabled, 'Preview', false);
        disabledButtonClassList = Object.values(filteredDisabledButtonClasses).join(" ");
    }

    let normalButtonStyles = "";
    let activeButtonStyles = "";
    let hoverButtonStyles = "";
    let focusButtonStyles = "";
    let disabledButtonStyles = "";
    let spinnerStyles = "";

    if (!_.isEmpty(styles)) {
        normalButtonStyles = { ...styles.backgroundColor, ...styles.borderColor, ...styles.textColor };
        activeButtonStyles = { ...styles.backgroundColorActive, ...styles.borderColorActive, ...styles.textColorActive, ...styles.ringColorActive };
        hoverButtonStyles = { ...styles.backgroundColorHover, ...styles.borderColorHover, ...styles.textColorHover };
        focusButtonStyles = { ...styles.backgroundColorFocus, ...styles.borderColorFocus, ...styles.textColorFocus, ...styles.ringColorFocus };
        disabledButtonStyles = { ...styles.backgroundColorDisabled, ...styles.borderColorDisabled, ...styles.textColorDisabled };
        spinnerStyles = { ...styles.textColorDisabled };
    }


    function filteredClasses(classList = {}, filterKey = "", isSkip = false) {
        if (isSkip) {
            return Object.keys(classList).filter((key) => !key.includes(filterKey))
                .reduce((cur, key) => { return Object.assign(cur, { [key]: classList[key] }) }, {});
        }
        else {
            return Object.keys(classList).filter((key) => key.includes(filterKey))
                .reduce((cur, key) => { return Object.assign(cur, { [key]: classList[key] }) }, {});
        }
    }

    return (
        <div className={`w-full text-center mt-6 grid gap-5 overflow-hidden`}>

            <div className="grid grid-cols-1 overflow-hidden">
                <p className="text-sm text-left">通常</p>
                <div className="mt-2">
                    <button className={`w-full ${classList}`} style={normalButtonStyles}>ボタン</button>
                    <div className="flex justify-around space-x-4 mt-4">
                        <button className={`w-[50%] ${classList}`} style={normalButtonStyles}>ボタン</button>
                        <button className={`w-[50%] ${classList}`} style={normalButtonStyles}>ボタン</button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 overflow-hidden">
                <p className="text-sm text-left">ホバー</p>

                <div className="mt-2">
                    <button className={`w-full ${classList} ${hoverButtonClassList}`} style={hoverButtonStyles}>ボタン</button>
                    <div className="flex justify-around space-x-4 mt-5">
                        <button className={`w-[50%] ${classList} ${hoverButtonClassList}`} style={hoverButtonStyles}>ボタン</button>
                        <button className={`w-[50%] ${classList} ${hoverButtonClassList}`} style={hoverButtonStyles}>ボタン</button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 overflow-hidden">
                <p className="text-sm text-left">フォーカス</p>

                <div className=" mt-2">
                    <button className={`w-full ${classList} ${focusButtonClassList}`} style={focusButtonStyles}>ボタン</button>
                    <div className="flex justify-around space-x-4 mt-5">
                        <button className={`w-[50%] ${classList} ${focusButtonClassList}`} style={focusButtonStyles}>ボタン</button>
                        <button className={`w-[50%] ${classList} ${focusButtonClassList}`} style={focusButtonStyles}>ボタン</button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 overflow-hidden">
                <p className="text-sm text-left">アクティブ</p>

                <div className="mt-2">
                    <button className={` w-full ${classList} ${activeButtonClassList}`} style={activeButtonStyles}>ボタン</button>
                    <div className="flex justify-around space-x-4 mt-5">
                        <button className={`w-[50%] ${classList} ${activeButtonClassList}`} style={activeButtonStyles}>ボタン</button>
                        <button className={`w-[50%] ${classList} ${activeButtonClassList}`} style={activeButtonStyles}>ボタン</button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 overflow-hidden">
                <p className="text-sm text-left">無効時</p>

                <div className=" mt-2">
                    <button className={`w-full ${classList} ${disabledButtonClassList}`} style={disabledButtonStyles}>ボタン</button>
                    <div className="flex justify-around space-x-4 mt-5">
                        <button className={`w-[50%] ${classList} ${disabledButtonClassList}`} style={disabledButtonStyles}>ボタン</button>
                        <button className={`w-[50%] ${classList} ${disabledButtonClassList}`} style={disabledButtonStyles}>ボタン</button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 overflow-hidden">
                <p className="text-sm text-left">無効時＋スピナー</p>

                <div className="mt-2">
                    <button className={`flex justify-center w-full h-8 pt-3 ${classList} ${disabledButtonClassList}`} style={disabledButtonStyles}>
                        <FiRefreshCw style={spinnerStyles} className={classes?.spinnerCustomClass} />
                        <span className="ml-1">ボタン</span>
                    </button>
                    <div className="flex justify-around space-x-4 mt-5">
                        <button className={`flex w-[50%] justify-center h-8 pt-3 ${classList} ${disabledButtonClassList}`} style={disabledButtonStyles}>
                            <FiRefreshCw style={spinnerStyles} className={classes?.spinnerCustomClass} />
                            <span className="ml-1">ボタン</span>
                        </button>
                        <button className={`flex w-[50%] justify-center h-8 pt-3 ${classList} ${disabledButtonClassList}`} style={disabledButtonStyles}>
                            <FiRefreshCw style={spinnerStyles} className={classes?.spinnerCustomClass} />
                            <span className="ml-1">ボタン</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}