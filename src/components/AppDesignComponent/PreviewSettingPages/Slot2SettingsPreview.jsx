import React from "react";
import { slot2Data } from "../../../lib/slotConstant";
import { FewSlot } from "./Slots/FewSlot";
import { FullSlot } from "./Slots/FullSlot";
import { VacantSlot } from "./Slots/VacantSlot";

const Slot2SettingsPreview = ({ pageText, pageId, data }) => {
    const { classes, styles, info, prefixClass } = data || '';

    const {
        isSticky,
        dentalCheckText,
        outOfStockText,
        outOfStockThreshold,
        outOfStockSvg1,
        outOfStockSvg2,
        lowStockText,
        lowStockThreshold,
        lowStockSvg1,
        lowStockSvg2,
        inStockText,
        inStockSvg1,
        inStockSvg2,
    } = info;

    //slot wrap classes
    const slotBorderClass = [
        ignoredPrefixValue(prefixClass.sm.slotBorderRadius, 'sm:'),
        ignoredPrefixValue(prefixClass.sm.slotBorderStyle, 'sm:'),
        ignoredPrefixValue(prefixClass.sm.slotBorderWidth, 'sm:'),
    ].join(' ');
    const slotBorderStyle = styles.slotBorderColor;

    const slotWrapClass = [
        ignoredPrefixValue(prefixClass.sm.slotBoxShadow, 'sm:'),
        ignoredPrefixValue(prefixClass.sm.slotMarginX, 'sm:'),

        classes.slotWrapCustomClass,
    ].join(' ')
    const slotWrapStyle = { ...slotBorderStyle, ...styles.slotBoxShadowColor };

    const divideclass = [
        classes.slotDivideWidthY,
        classes.slotDivideStyle,
        classes.slotDivideColor,
    ].join(' ');
    const divideStyle = { ...styles.slotDivideColor }

    const headerClass = [
        classes.slotHeaderCustomClass,
    ].join(' ');
    const headerStyle = { ...styles.slotHeaderBackgroundColor };

    const dentalCheckClass = [
        classes.dentalCheckTextSize,
        classes.dentalCheckFontWeight,
        classes.dentalCheckBorderRadius,
        classes.dentalCheckCustomClass,
        // classes.dentalCheckTextColor,
        // classes.dentalCheckBackgroundColor,
    ].join(' ');
    const dentalCheckStyle = { ...styles.dentalCheckTextColor, ...styles.dentalCheckBackgroundColor };

    const insituteNameClass = [
        classes.insituteNameTextSize,
        classes.insituteNameFontWeight,
        classes.insituteNameCustomClass,
        // classes.insituteNameTextColor,
    ].join(' ');
    const insituteNameStyle = { ...styles.insituteNameTextColor };

    const instituteAdressClass = [
        classes.insituteAdressTextSize,
        classes.insituteAdressFontWeight,
        classes.insituteAdressCustomClass,
        // classes.insituteAdressTextColor,
    ].join(' ');
    const instituteAdressStyle = { ...styles.insituteAdressTextColor };

    const dayTextClass = [
        classes.dayTextSize,
        classes.dayFontWeight,
        classes.dayCustomClass,
        // classes.dayTextColor,
    ].join(' ');
    const dayTextStyle = { ...styles.dayTextColor };


    const rowOddStyle = { ...styles.rowBackgroundColorOdd };
    const rowEvenStyle = { ...styles.rowBackgroundColorEven };


    const timeTextOddClass = [
        classes.timeTextSize,
        classes.timeFontWeight,
        classes.timeCustomClass,
    ].join(' ')
    const timeTextEvenClass = [
        classes.timeTextSize,
        classes.timeFontWeight,
        classes.timeCustomClass,
    ].join(' ')

    const timeTextOddStyle = { ...styles.timeTextColorOdd };
    const timeTextEvenStyle = { ...styles.timeTextColorEven };

    const outOfStockIcon1Class = [
        classes.outOfStockIcon1TextSize,
        // classes.outOfStockSvg1FillColor,
        // classes.outOfStockSvg1StrokeColor,
    ].join(' ')
    const outOfStockIcon1Style = { ...styles.outOfStockSvg1FillColor, ...styles.outOfStockSvg1StrokeColor }

    const outOfStockIcon2Class = [
        classes.outOfStockIcon2TextSize,
        // classes.outOfStockSvg2FillColor,
        // classes.outOfStockSvg2StrokeColor,
    ].join(' ')
    const outOfStockIcon2Style = { ...styles.outOfStockSvg2FillColor, ...styles.outOfStockSvg2StrokeColor }

    const lowStockIcon1Class = [
        classes.lowStockIcon1TextSize,
        // classes.lowStockSvg1FillColor,
        // classes.lowStockSvg1StrokeColor,
    ].join(' ')
    const lowStockIcon1Style = { ...styles.lowStockSvg1FillColor, ...styles.lowStockSvg1StrokeColor };

    const lowStockIcon2Class = [
        classes.lowStockIcon2TextSize,
        classes.lowStockSvg2FillColor,
        classes.lowStockSvg2StrokeColor,
    ].join(' ')
    const lowStockIcon2Style = { ...styles.lowStockSvg2FillColor, ...styles.lowStockSvg2StrokeColor };

    const inStockIcon1Class = [
        classes.inStockIcon1TextSize,
        // classes.inStockSvg1FillColor,
        // classes.inStockSvg1StrokeColor,
    ].join(' ')
    const inStockIcon1Style = { ...styles.inStockSvg1FillColor, ...styles.inStockSvg1StrokeColor };

    const inStockIcon2Class = [
        classes.inStockIcon2TextSize,
        // classes.inStockSvg2FillColor,
        // classes.inStockSvg2StrokeColor,
    ].join(' ')
    const inStockIcon2Style = { ...styles.inStockSvg2FillColor, ...styles.inStockSvg2StrokeColor };

    const stockStatusTextClass = [
        classes.stockStatusTextSize,
        classes.stockStatusFontWeight,
        classes.stockStatusCustomClass,
    ].join(' ')


    function ignoredPrefixValue(value, ignoreStr = '') {
        return value.replace(`${ignoreStr}`, '')
    }

    const date_format = (mappingDatetime) => {
        const _date = new Date(mappingDatetime * 1000);
        return _date.getFullYear() + "年" + (_date.getMonth() + 1) + "月" + _date.getDate() + "日";
    };

    return (
        <div className={`w-full flex flex-col`}>
            {slot2Data.map(item => (
                <div data-id="slotWrapClass" className={`flex flex-col mx-auto w-full items-center justify-center ${slotWrapClass} ${slotBorderClass}`} style={slotWrapStyle}>
                    <div className={`top-0 px-6 py-4 sm:px-6 w-full ${isSticky === 0 ? 'sticky' : ''} ${headerClass} ${slotBorderClass}`} style={{ ...headerStyle, borderBottomColor: slotBorderStyle.borderColor }}>
                        {item.dentalFlag && <span data-id="deltalCheckClass" className={`w-fit py-0.5 px-2 mb-2 ${dentalCheckClass}`} style={dentalCheckStyle}>{dentalCheckText}</span>}

                        <h2 className={`${insituteNameClass}`} style={insituteNameStyle}>{item.instituteName}</h2>
                        <p className={`${instituteAdressClass}`} style={instituteAdressStyle}>{item.institutePrefecture}{item.instituteCityName}{item.instituteTownName}{item.instituteAddressName}{item.instituteBuilding}</p>
                        <h3 className={`${dayTextClass}`} style={dayTextStyle}>{date_format(item.mappingDatetime)}</h3>
                    </div>

                    <ul className={`flex flex-col w-full ${divideclass}`}>
                        {item.slots.map((slot, index) => (
                            (() => {
                                let slotTime = slot.datetime.toString()
                                if (slotTime.length == 3) {
                                    slotTime = slotTime.substring(0, 1) + ":" + slotTime.substring(1, 3)
                                }
                                else {
                                    slotTime = slotTime.substring(0, 2) + ":" + slotTime.substring(2, 4)
                                }

                                let rowStyle = rowOddStyle;
                                let timeTextClass = timeTextOddClass;
                                let timeTextStyle = timeTextOddStyle;
                                if ((index % 2) == 0) {
                                    rowStyle = rowEvenStyle;
                                    timeTextClass = timeTextEvenClass;
                                    timeTextStyle = timeTextEvenStyle;
                                }

                                let remainCount = slot.maxReservationCount - slot.reservationCount;

                                if (remainCount <= outOfStockThreshold) {
                                    return (
                                        <FullSlot
                                            timeTextClass={timeTextClass}
                                            rowWrapClass={classes.slotRowWrapCustomClass}
                                            statusWrapClass={classes.outOfStockCustomClass}
                                            stockStatusTextClass={stockStatusTextClass}
                                            icon1Class={outOfStockIcon1Class}
                                            icon2Class={outOfStockIcon2Class}

                                            rowStyle={rowStyle}
                                            timeTextStyle={timeTextStyle}
                                            stockStatusTextStyle={styles.outOfStockTextColor}
                                            icon1Style={outOfStockIcon1Style}
                                            icon2Style={outOfStockIcon2Style}
                                            divideStyle={divideStyle}

                                            statustext={outOfStockText}
                                            svg1={outOfStockSvg1}
                                            svg2={outOfStockSvg2}
                                            strTime={slotTime}
                                        />
                                    );
                                } else if (remainCount <= lowStockThreshold) {
                                    return (
                                        <FewSlot
                                            timeTextClass={timeTextClass}
                                            rowWrapClass={classes.slotRowWrapCustomClass}
                                            statusWrapClass={classes.lowStockCustomClass}
                                            stockStatusTextClass={stockStatusTextClass}
                                            icon1Class={lowStockIcon1Class}
                                            icon2Class={lowStockIcon2Class}

                                            rowStyle={rowStyle}
                                            timeTextStyle={timeTextStyle}
                                            stockStatusTextStyle={styles.lowStockTextColor}
                                            icon1Style={lowStockIcon1Style}
                                            icon2Style={lowStockIcon2Style}
                                            divideStyle={divideStyle}

                                            statustext={lowStockText}
                                            svg1={lowStockSvg1}
                                            svg2={lowStockSvg2}
                                            strTime={slotTime}
                                        />
                                    );
                                } else {
                                    return (
                                        <VacantSlot
                                            timeTextClass={timeTextClass}
                                            rowWrapClass={classes.slotRowWrapCustomClass}
                                            statusWrapClass={classes.inStockCustomClass}
                                            stockStatusTextClass={stockStatusTextClass}
                                            icon1Class={inStockIcon1Class}
                                            icon2Class={inStockIcon2Class}

                                            rowStyle={rowStyle}
                                            timeTextStyle={timeTextStyle}
                                            stockStatusTextStyle={styles.inStockTextColor}
                                            icon1Style={inStockIcon1Style}
                                            icon2Style={inStockIcon2Style}
                                            divideStyle={divideStyle}

                                            statustext={inStockText}
                                            svg1={inStockSvg1}
                                            svg2={inStockSvg2}
                                            strTime={slotTime}
                                        />
                                    );
                                }
                            })()
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};
export default Slot2SettingsPreview
