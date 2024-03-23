import _ from "lodash";
import React from "react";

import { Formik } from "formik";
import { useRecoilState } from "recoil";
import { appDesignerState } from "../../../store/recoil/appDesignerState";
import EnterButtonLegacyStyle from "../../shared/EnterButtonLegacyStyle";
import ErrorText from "../../shared/ErrorText";
import StandardInput from "../../shared/StandardInput";

function rangeItems(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => start + idx);
}
const yearRange1900 = rangeItems(1900, 2100);

const Token2login1SettingsPreview = ({ data }) => {

    const [recoilStateValue] = useRecoilState(appDesignerState);
    const { activePageId, activeTab, tabItems } = recoilStateValue;

    const { info, styles, classes, } = data;
    const { divisionNumber, buttonType, divisionText, isMaskId, isMaskPssword, requiredCharacters, } = info;

    let buttyonTypeKey = '';
    if (buttonType === 'a') buttyonTypeKey = 'buttonASettings';
    else if (buttonType === 'b') buttyonTypeKey = 'buttonBSettings';
    else if (buttonType === 'c') buttyonTypeKey = 'buttonCSettings';


    const buttonSettings = tabItems.settings.appSettingQuery[buttyonTypeKey];


    const formInitialValue = {
        t1AreaName: '',
        t2AreaName: '1234',
        t3AreaName: '1234',
        t4AreaName: '',
        password: '123456',
    }


    const buttonClasses = [
        buttonSettings.classes.paddingX,
        buttonSettings.classes.paddingY,
        buttonSettings.classes.marginTop,
        buttonSettings.classes.marginBottom,
        buttonSettings.classes.customClass,
    ].join(' ');

    const buttonErrorClass = [
        classes.buttonErrorTextSize,
        classes.buttonErrorTextWeight,
        // classes.buttonErrorTextColor,
        // classes.buttonErrorBackgroundColor,
        classes.buttonErrorCustomClass,
    ].join(" ");
    const buttonErrorStyle = { ...styles.buttonErrorTextColor, ...styles.buttonErrorBackgroundColor };

    const inputErrorClass = [
        classes.inputErrorTextSize,
        classes.inputErrorTextWeight, 
        classes.inputErrorCustomClass,
    ].join(" ");
    const inputErrorStyle = { ...styles.inputErrorTextColor, ...styles.inputErrorBackgroundColor };

    const dayMonthClass = [
        classes.dayMonthTextSize,
        classes.dayMonthTextWeight, 
        classes.dayMonthcustomClass, 
        classes.inputBorderStyle,
        classes.inputBorderWidth,
        classes.inputBorderRadius,
    ].join(" ");
    const dayMonthStyle = { ...styles.dayMonthTextColor, ...styles.dayMonthBackgroundColor, ...styles.inputBorderColor };

    const divisionClass = [
        classes.divisionTextSize,
        classes.divisionTextWeight, 
        classes.divisionTextCustomClass,
    ].join(" ");
    const divisionStyle = { ...styles.divisionTextColor };

    const placeholderClass = [
        classes.placeholderTextSize,
        classes.placeholderTextWeight, 
    ].join(" ");
    const placeholderStyle = { ...styles.placeholderTextColor };

    const inputClass = [
        classes.inputTextSize,
        classes.inputTextWeight,
        classes.inputBorderWidth,
        classes.inputBorderStyle,
        classes.inputBorderRadius, 
        classes.inputCustomClass,
    ].join(" ");
    const inputStyle = { ...styles.placeholderTextWeight, ...styles.inputBorderColor, ...styles.inputTextColor, ...styles.inputBackgroundColor };

    const labelClass = [
        classes.labelTextSize,
        classes.labelTextWeight, 
        classes.labelCustomClass,
    ].join(" ");
    const labelStyle = { ...styles.labelBackgroundColor };

    const requiredClass = [
        classes.requiredTextSize,
        classes.requiredTextWeight, 
        classes.requiredCustomClass,
    ].join(" ");
    const requiredStyle = { ...styles.requiredTextColor, ...styles.requiredBackgroundColor }

    const selectClass = [ 

        classes.inputBorderStyle,
        classes.inputBorderWidth,
        classes.inputBorderRadius, 
        classes.inputTextSize,
        classes.inputTextWeight,
    ].join(" ");
    const selectStyle = { ...styles.selectTextColor, ...styles.selectBackgroundColor, ...styles.inputBorderColor }

    const fieldLabel = (index = 0) => {
        const label = `エリア${index}`;
        const mandatoryText = <span className={`${requiredClass}`} style={requiredStyle}>{requiredCharacters}</span>;

        return <span>{label} {mandatoryText}</span>
    };

    const yearList = yearRange1900;

    return (
        <div className={`w-full flex`}>


            <Formik
                enableReinitialize={true}
                initialValues={formInitialValue}
                validateOnBlur={false}
                validateOnChange={false}

                render={({ values }) => (
                    <form className="w-full" onSubmit={(e) => { e.preventDefault(); }}>

                        <div data-id="allIdWrapCustomClass" className={`flex flex-row items-start ${classes.idWrapCustomClass}`} >
                            {_.range(1, divisionNumber + 1).map((x) => (
                                <div data-id="flexBasis_idWrapCustomClass" key={x} className={`flex flex-col ${classes[`flexBasis${x}`]}`}>
                                    <StandardInput
                                        order={x}
                                        placeholderStyle={placeholderStyle}
                                        className={`h-8 ${placeholderClass} ${inputClass}`}
                                        inputStyles={inputStyle}
                                        labelClass={` ${labelClass}`}
                                        labelStyles={labelStyle}
                                        type={isMaskId ? "password" : "text"}
                                        name={`t${x}AreaName`}
                                        labrl={fieldLabel(x)}
                                        placeholder="プレイスホルダー"
                                        value={values[`t${x}AreaName`]}
                                        errorComponent={<p className={`${inputErrorClass}`} style={inputErrorStyle}>エラーメッセージ</p>}
                                    >
                                        {divisionNumber !== x && (
                                            <div className={`${classes.divisionTextwrapCustomClass} grow-0 flex items-center`}  >
                                                <span className={`${divisionClass} text-center flex-none`} style={divisionStyle}>{divisionText}</span>
                                            </div>
                                        )}
                                    </StandardInput>
                                </div>
                            ))}
                        </div>


                        <div className={`flex flex-col`}>
                            <StandardInput
                                order={1}
                                placeholderStyle={placeholderStyle}
                                className={`h-8 ${placeholderClass} ${inputClass}`}
                                inputStyles={inputStyle}
                                labelClass={` ${labelClass}`}
                                labelStyles={labelStyle}
                                type={isMaskPssword ? "password" : "text"}
                                name={`password`}
                                labrl={'パスワード'}
                                placeholder="プレイスホルダー"
                                value={values[`password`]}
                                errorComponent={<p className={`${inputErrorClass}`} style={inputErrorStyle}>エラーメッセージ</p>}
                            />
                        </div>

                        <div data-id="buttonWrapCustomClass" className={`min-w-min overflow-visible ${classes.buttonWrapCustomClass}`}>
                            <ErrorText
                                errorType={"unauthorize"}
                                unauthorizeErrorText={'エラーテキスト'}
                                classes={`w-full flex ${buttonErrorClass} ${buttonClasses}`}
                                styles={buttonErrorStyle}
                            />

                            <EnterButtonLegacyStyle
                                buttonType={buttonType}
                                buttonDisabled={false}
                            >
                                エラーテキスト
                            </EnterButtonLegacyStyle>
                        </div>
                    </form>
                )}
            />
        </div>
    );
};
export default Token2login1SettingsPreview;
