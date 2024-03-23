import React from 'react';
import { useRecoilState } from 'recoil';
import { instituteDummyData } from '../../../lib/slotConstant';
import { appDesignerState } from '../../../store/recoil/appDesignerState';

const InstituteSelection2SettingsPreview = ({ data }) => {
    const { classes, styles, info, prefixClass } = data || '';

    const [recoilStateValue, setRecoilState] = useRecoilState(appDesignerState);
    const { activeTab, activePageId, tabItems } = recoilStateValue;

    const { dentalCheckText, instituteDestinationText, mapDestinationText } = info;

    const wrapCalss = [
        ignoredPrefixValue(prefixClass.sm.instituteBorderRadius, 'sm:'),
        ignoredPrefixValue(prefixClass.sm.instituteBorderWidth, 'sm:'),
        ignoredPrefixValue(prefixClass.sm.instituteBorderStyle, 'sm:'),
        ignoredPrefixValue(prefixClass.sm.instituteMarginX, 'sm:'),
        ignoredPrefixValue(prefixClass.sm.instituteBoxShadow, 'sm:'),
        classes.instituteWrapCustomClass,
    ].join(' ');

    const wrapStyle = { ...styles.instituteBorderColor, ...styles.instituteBoxShadowColor };

    const instituteDivideXClass = [classes.instituteDivideWidthX, classes.instituteDivideStyle].join(' ');
    const instituteDivideYClass = [classes.instituteDivideWidthY, classes.instituteDivideStyle].join(' ');
    const instituteDivideColorStyle = { ...styles.instituteDivideColor };

    const instituteListClass = [
        ignoredPrefixValue(prefixClass.sm.instituteListPaddingX, 'sm:'),
        ignoredPrefixValue(prefixClass.sm.instituteListPaddingY, 'sm:'),
        ignoredPrefixValue(prefixClass.sm.instituteListMarginX, 'sm:'),
        ignoredPrefixValue(prefixClass.sm.instituteListBoxShadow, 'sm:'),
        ignoredPrefixValue(prefixClass.sm.instituteListBorderWidth, 'sm:'),
        ignoredPrefixValue(prefixClass.sm.instituteListBorderStyle, 'sm:'), 
        classes.instituteListCustomClass,
    ].join(' ');
    const instituteListStyle = {
        ...styles.instituteListBackgroundColor,
        ...styles.instituteListBorderColor,
        ...styles.instituteListBoxShadowColor,
    };

    const instituteNameClass = [
        ignoredPrefixValue(prefixClass.sm.instituteNameTextSize, 'sm:'),
        ignoredPrefixValue(prefixClass.sm.instituteNameTextWeight, 'sm:') ,
        classes.instituteNameCustomClass,
    ].join(' ');
    const instituteNameStyle = { ...styles.instituteNameTextColor };

    const instituteAddressClass = [
        ignoredPrefixValue(prefixClass.sm.instituteAddressTextSize, 'sm:'),
        ignoredPrefixValue(prefixClass.sm.instituteAddressTextWeight, 'sm:') ,
        classes.instituteAddressCustomClass,
    ].join(' ');
    const instituteAddressStyle = { ...styles.instituteAddressTextColor };

    const deltalCheckClass = [
        classes.dentalCheckBorderRadius,
        classes.dentalCheckTextSize,
        classes.dentalCheckFontWeight,
        classes.dentalCheckCustomClass,
    ].join(' ');
    const deltalCheckStyle = { ...styles.dentalCheckTextColor, ...styles.dentalCheckBackgroundColor };

    const selectionTextClass = [
        ignoredPrefixValue(prefixClass.sm.selectionTextSize, 'sm:'),
        ignoredPrefixValue(prefixClass.sm.selectionTextWeight, 'sm:'),

        prefixClass.default.selectionTextColor,
        prefixClass.default.selectionBackgroundColor,
    ].join(' ');
    const selectionTextStyle = { ...styles.selectionTextColor, ...styles.selectionBackgroundColor };

    function ignoredPrefixValue(value, ignoreStr = '') {
        return value.replace(`${ignoreStr}`, '');
    }

    const mappingDateTime = (mappingData = []) => {
        let mappingDateTimeArr = [];
        mappingData.forEach((x) => {
            const _date = new Date(parseInt(x) * 1000);
            const formatDate = _date.getFullYear() + '年' + (_date.getMonth() + 1) + '月' + _date.getDate() + '日';
            mappingDateTimeArr.push(formatDate);
        });

        return mappingDateTimeArr.join(',');
    };

    return (
        <div className="w-full">
            <div data-id="wrapCalss" className={`overflow-visible break-all ${wrapCalss}`} style={wrapStyle}>
                {instituteDummyData.map((institute) => (
                    <div
                        data-id="instituteListClass_instituteDivideXClass"
                        role="listitem"
                        className={`flex w-full relative z-30 ${instituteDivideXClass} ${instituteListClass}`}
                        style={instituteListStyle}
                    >
                        <div className="w-[calc(100%_-_80px)] p-2">
                            <div className="flex flex-col justify-between">
                                {institute.dentalFlag == 1 && (
                                    <span
                                        data-id="deltalCheckClass"
                                        className={`w-fit py-0.5 px-2 mb-2 ${deltalCheckClass}`}
                                        style={deltalCheckStyle}
                                    >
                                        {dentalCheckText}
                                    </span>
                                )}

                                <p
                                    data-id="instituteNameClass"
                                    className={`${instituteNameClass}`}
                                    style={instituteNameStyle}
                                >
                                    {institute.instituteName}
                                </p>
                            </div>

                            <p
                                data-id="instituteAddressClass"
                                className={`text-left ${instituteAddressClass}`}
                                style={instituteAddressStyle}
                            >
                                {institute.instituteZipcode +
                                    ' ' +
                                    institute.institutePrefecture +
                                    institute.instituteCityName +
                                    institute.instituteTownName +
                                    institute.instituteTownName +
                                    institute.instituteBuilding}
                            </p>

                            <p className="align-middle text-base text-left mb-2">
                                <span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="20"
                                        fill="currentColor"
                                        className="inline bi bi-calendar3 text-kenpo-red"
                                        viewBox="0 0 16 20"
                                    >
                                        <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z" />
                                        <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                                    </svg>
                                </span>
                                <span className="font-semibold">検診日</span>
                                <span className="font-semibold">：</span>
                                <span className="">{mappingDateTime(institute.eventInstituteDays)}</span>
                            </p>
                        </div>

                        {/*  useMap == 1 : not use map */}
                        {institute.useMap == 0 && (
                            <div
                                data-id="selectionWrapCustomClass"
                                className={`flex items-center flex-col w-[96px] p-0 ${classes.selectionWrapCustomClass}`}
                                style={instituteDivideColorStyle}
                            >
                                <div
                                    data-id="selectionTextClass"
                                    className={`h-full w-full flex items-center justify-center align-middle p-0 m-0 cursor-pointer ${selectionTextClass}`}
                                    style={selectionTextStyle}
                                >
                                    {instituteDestinationText}
                                </div>
                            </div>
                        )}
                        {/*  useMap == 2 :  use map */}
                        {institute.useMap == 1 && (
                            <div
                                data-id="selectionWrapCustomClass_instituteDivideYClass"
                                className={`flex items-center flex-col w-[96px] p-0 ${instituteDivideYClass} ${classes.selectionWrapCustomClass}`}
                                style={instituteDivideColorStyle}
                            >
                                <div
                                    data-id="selectionTextClass"
                                    className={`h-[50%] w-full flex items-center justify-center align-middle p-0 m-0 cursor-pointer ${selectionTextClass}`}
                                    style={selectionTextStyle}
                                >
                                    {mapDestinationText}
                                </div>

                                <div
                                    data-id="selectionTextClass"
                                    className={`h-[50%] w-full flex items-center justify-center align-middle p-0 m-0 cursor-pointer ${selectionTextClass}`}
                                    style={{ ...selectionTextStyle, ...instituteDivideColorStyle }}
                                >
                                    {instituteDestinationText}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
export default InstituteSelection2SettingsPreview;
