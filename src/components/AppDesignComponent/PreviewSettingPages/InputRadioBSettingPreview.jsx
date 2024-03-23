import React from "react";
import {useRecoilState} from "recoil";
import {appDesignerState} from "../../../store/recoil/appDesignerState";
import CheckIcon from "../icons/CheckIcon";

const data = [
    { id: 1, labelText: 'はい' },
    { id: 2, labelText: 'いいえ' },
    { id: 3, labelText: 'だいたいそう' },
    { id: 4, labelText: 'わからない' },
];
const data2 = [
    { id: 1, labelText: 'はい' },
    { id: 2, labelText: 'いいえ' }
];

export default function InputRadioBSettingPreview(props){
    const {viewSettingData, requiredCharacters} = props;
    const [recoilStateValue] = useRecoilState(appDesignerState);
    let radioBIconSetting = recoilStateValue.tabItems.settings.appSettingQuery.customRadioIconSettings;

    const { classes, info, styles } = radioBIconSetting;
    const { notSelectedIcon1, notSelectedIcon2, selectedIcon1, selectedIcon2 } = info || '';

    const notSelectedIcon1Classes = `${classes.notSelectedIcon1Size} ${classes.notSelectedIcon1StrokeSize}`;
    const notSelectedIcon2Classes = `${classes.notSelectedIcon2Size} ${classes.notSelectedIcon2StrokeSize}`;
    const selectedIcon1Classes = `${classes.selectedIcon1Size} ${classes.selectedIcon1StrokeSize}`;
    const selectedIcon2Classes = `${classes.selectedIcon2Size} ${classes.selectedIcon2StrokeSize}`;

    const selectedIcon1Style = { ...styles.selectedIcon1FillColor, ...styles.selectedIcon1StrokeColor };
    const notSelectedIcon1Style = { ...styles.notSelectedIcon1FillColor, ...styles.notSelectedIcon1StrokeColor };
    const selectedIcon2Style = { ...styles.selectedIcon2FillColor, ...styles.selectedIcon2StrokeColor };
    const notSelectedIcon2Style = { ...styles.notSelectedIcon2FillColor, ...styles.notSelectedIcon2StrokeColor };
    return (
        <>
            <div className={`${viewSettingData?.inputWrapCustomClass}`}>
                <label
                    className={`${viewSettingData?.labelTextSize} ${viewSettingData?.labelFontWeight} ${viewSettingData?.labelCustomClass} pt-2`}
                    style={{color: viewSettingData?.labelTextColor?.color}}
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
                <div className="flex">

                    {data2.map((value, index) => (
                        <div className="flex items-center mr-4" key={index}>
                            {info.useIcon === false ? (
                                <input
                                    id={`inline-radio-${value.id}`} type="radio" defaultValue="" name="inline-radio"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                            ): (
                                <>
                                    <input
                                        id={`inline-radio-${value.id}`}
                                        type="radio"
                                        defaultValue=""
                                        name="inline-radio"
                                        value={value.labelText}
                                        className="peer"
                                    />
                                    <label
                                        htmlFor={`inline-radio-${value.id}`}
                                        className={`ml-[-15px] invisible peer-checked:visible`}
                                    >
                                        <CheckIcon
                                            icon1Class={selectedIcon1Classes}
                                            icon2Class={selectedIcon2Classes}
                                            iconWrapClass={classes.selectedCustomClass}
                                            svg1Style={selectedIcon1Style}
                                            svg2Style={selectedIcon2Style}
                                            svg1={selectedIcon1}
                                            svg2={selectedIcon2}
                                        />
                                    </label>
                                    <label
                                        htmlFor={`inline-radio-${value.id}`}
                                        className="ml-[-30px] visible peer-checked:invisible"
                                    >
                                        <CheckIcon
                                            icon1Class={notSelectedIcon1Classes}
                                            icon2Class={notSelectedIcon2Classes}
                                            iconWrapClass={classes.selectedCustomClass}
                                            svg1Style={notSelectedIcon1Style}
                                            svg2Style={notSelectedIcon2Style}
                                            svg1={notSelectedIcon1}
                                            svg2={notSelectedIcon2}
                                        />
                                    </label>
                                </>
                            )}
                            <label
                                htmlFor={`inline-radio-${value.id}`}
                                className={`ml-2 labelStyle ${viewSettingData?.valueTextSize} ${viewSettingData?.valueFontWeight} ${viewSettingData?.inputCustomClass}`}>{value.labelText}</label>
                        </div>
                    ))}

                </div>
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

            <div className={`${viewSettingData?.inputWrapCustomClass}`}>
                <label
                    className={`${viewSettingData?.labelTextSize} ${viewSettingData?.labelFontWeight} ${viewSettingData?.labelCustomClass} pt-2`}
                    style={{color: viewSettingData?.labelTextColor?.color}}
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

                {data.map((value, index) => (
                    <div className="flex items-center" key={index}>
                        {info.useIcon === false ? (
                            <input
                                id={`default-radio-${value.id}`} type="radio" defaultValue="" name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                            ): (
                            <>
                                <input
                                    id={`default-radio-${value.id}`}
                                    type="radio"
                                    defaultValue=""
                                    name="default-radio"
                                    value={value.labelText}
                                    className="peer"
                                />
                                <label
                                    htmlFor={`default-radio-${value.id}`}
                                    className={`ml-[-15px] invisible peer-checked:visible`}
                                >
                                    <CheckIcon
                                        icon1Class={selectedIcon1Classes}
                                        icon2Class={selectedIcon2Classes}
                                        iconWrapClass={classes.selectedCustomClass}
                                        svg1Style={selectedIcon1Style}
                                        svg2Style={selectedIcon2Style}
                                        svg1={selectedIcon1}
                                        svg2={selectedIcon2}
                                    />
                                </label>
                                <label
                                    htmlFor={`default-radio-${value.id}`}
                                    className="ml-[-30px] visible peer-checked:invisible"
                                >
                                    <CheckIcon
                                        icon1Class={notSelectedIcon1Classes}
                                        icon2Class={notSelectedIcon2Classes}
                                        iconWrapClass={classes.selectedCustomClass}
                                        svg1Style={notSelectedIcon1Style}
                                        svg2Style={notSelectedIcon2Style}
                                        svg1={notSelectedIcon1}
                                        svg2={notSelectedIcon2}
                                    />
                                </label>
                            </>
                        )}
                            <label
                            htmlFor={`default-radio-${value.id}`}
                            className={`ml-2 labelStyle ${viewSettingData?.valueTextSize} ${viewSettingData?.valueFontWeight} ${viewSettingData?.inputCustomClass}`}>{value.labelText}</label>
                    </div>
                ))}
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
    );
}