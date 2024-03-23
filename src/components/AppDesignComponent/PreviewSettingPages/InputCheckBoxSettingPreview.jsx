import React from 'react';
import { useRecoilState } from 'recoil';
import { appDesignerState } from '../../../store/recoil/appDesignerState';
import CheckIcon from '../icons/CheckIcon';

const data = [
    { id: 1, labelText: 'はい' },
    { id: 2, labelText: 'いいえ' },
    { id: 3, labelText: 'だいたいそう' },
    { id: 4, labelText: 'わからない' },
];

export default function InputCheckBoxSettingPreview(props) {
    const { viewSettingData, requiredCharacters, placeholderCss } = props;
    const [recoilStateValue] = useRecoilState(appDesignerState);
    let checkBoxIconSetting = recoilStateValue.tabItems.settings.appSettingQuery.checkboxIconSettings;

    const { classes, info, styles } = checkBoxIconSetting;
    const { notSelectedIcon1, notSelectedIcon2, selectedIcon1, selectedIcon2 } = info || '';

    const notSelectedIcon1Classes = `${classes.notSelectedIcon1Size} ${classes.notSelectedIcon1StrokeSize}`;
    const notSelectedIcon2Classes = `${classes.notSelectedIcon2Size} ${classes.notSelectedIcon2StrokeSize}`;
    const selectedIcon1Classes = `${classes.selectedIcon1Size} ${classes.selectedIcon1StrokeSize}`;
    const selectedIcon2Classes = `${classes.selectedIcon2Size} ${classes.selectedIcon2StrokeSize}`;

    const selectedIcon1Style = { ...styles.selectedIcon1FillColor, ...styles.selectedIcon1StrokeColor };
    const notSelectedIcon1Style = { ...styles.notSelectedIcon1FillColor, ...styles.notSelectedIcon1StrokeColor };
    const selectedIcon2Style = { ...styles.selectedIcon2FillColor, ...styles.selectedIcon2StrokeColor };
    const notSelectedIcon2Style = { ...styles.notSelectedIcon2FillColor, ...styles.notSelectedIcon2StrokeColor };

    const label = (
        <h3
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
        </h3>
    );

    const errormessage = (
        <p
            className={`${viewSettingData?.errorMessageTextSize} ${viewSettingData?.errorMessageFontWeight} ${viewSettingData?.errorMessageCustomClass} text-left`}
            style={{
                color: viewSettingData?.errorMessageTextColor?.color,
                backgroundColor: viewSettingData?.errorMessageBackgroundColor?.backgroundColor,
            }}
        >
            エラーメッセージ
        </p>
    );

    return (
        <>
            <style>{placeholderCss}</style>
            <div className={`${viewSettingData.inputWrapCustomClass}`}>
                {label}
                <div className="flex">
                    {data.map((value, index) => (
                        <div className="flex items-center mr-4" key={index}>
                            {info.useIcon === false ? (
                                <input
                                    id={`horizontal-${value.id}`}
                                    type="checkbox"
                                    defaultValue=""
                                    name="inline-checkbox-group"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                            ) : (
                                <>
                                    <input
                                        id={`horizontal-${value.id}`}
                                        type="checkbox"
                                        defaultValue=""
                                        name={value.id}
                                        value={value.labelText}
                                        className="peer"
                                    />
                                    <label
                                        htmlFor={`horizontal-${value.id}`}
                                        className={`ml-[-20px] invisible peer-checked:visible`}
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
                                        htmlFor={`horizontal-${value.id}`}
                                        className="ml-[-36px] visible peer-checked:invisible"
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
                                htmlFor={`horizontal-${value.id}`}
                                className={`ml-2 labelStyle ${viewSettingData?.valueTextSize} ${viewSettingData?.valueFontWeight} ${viewSettingData?.inputCustomClass}`}
                            >
                                {value.labelText}
                            </label>
                        </div>
                    ))}
                </div>
                {errormessage}
            </div>

            <div className={`${viewSettingData.inputWrapCustomClass}`}>
                {label}
                {data.map((value, index) => (
                    <div className="flex items-center mr-4">
                        {info.useIcon === false ? (
                            <input
                                id={`vertical-${value.id}`}
                                type="checkbox"
                                defaultValue=""
                                name={value.id}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                        ) : (
                            <>
                                <input
                                    id={`vertical-${value.id}`}
                                    type="checkbox"
                                    defaultValue=""
                                    name={value.id}
                                    value={value.labelText}
                                    className="peer"
                                />
                                <label
                                    htmlFor={`vertical-${value.id}`}
                                    className={`ml-[-20px] invisible peer-checked:visible`}
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
                                    htmlFor={`vertical-${value.id}`}
                                    className="ml-[-36px] visible peer-checked:invisible"
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
                            htmlFor={`vertical-${value.id}`}
                            className={`ml-2 labelStyle ${viewSettingData?.valueTextSize} ${viewSettingData?.valueFontWeight} ${viewSettingData?.inputCustomClass}`}
                        >
                            {value.labelText}
                        </label>
                    </div>
                ))}

                {errormessage}
            </div>
        </>
    );
}
