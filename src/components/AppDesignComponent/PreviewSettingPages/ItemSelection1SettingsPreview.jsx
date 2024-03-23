import React from 'react';

import { itemData } from '../../../lib/slotConstant';
import ItemList from './ItemList';

export default function ItemSelection1SettingsPreview({ data: settingData }) {
    const formatTotalCost = 5000;
    const setTotalCost = 5000;
    const totalCost = 5000;

    const { info, classes, prefixClass, styles } = settingData;

    const itemAreaWrapClasses = [
        ignoredPrefixValue(prefixClass.sm.itemMarginX, 'sm:'),
        ignoredPrefixValue(prefixClass.sm.itemBoxShadow, 'sm:'),
        ignoredPrefixValue(prefixClass.sm.itemBorderStyle, 'sm:'),
        ignoredPrefixValue(prefixClass.sm.itemBorderWidth, 'sm:'),
        ignoredPrefixValue(prefixClass.sm.itemBorderRadius, 'sm:'),
        classes.itemWrapCustomClass,
    ].join(' ');
    const itemAreaWrapStyle = { ...styles.itemBorderColor, ...styles.itemBoxShadowColor };

    const itemDivideClass = [classes.itemDivideWidthY, classes.itemDivideStyle].join(' ');
    const divideColorStyle = styles.itemDivideColor;

    const totalAmoutExceptingClasses = [
        classes.totalAmountExceptingTextSize,
        classes.totalAmountExceptingFontWeight,
    ].join(' ');

    const totalAmoutNumericClasses = [classes.totalAmountTextSize, classes.totalAmountFontWeight].join(' ');

    const errorClass = [
        classes.errorMessageTextSize,
        classes.errorMessageFontWeight,
        classes.errorMessageTextColor,
        classes.errorMessageBackgroundColor,
        classes.errorMessageCustomClass,
    ].join(' ');

    function ignoredPrefixValue(value, ignoreStr = '') {
        if (value) {
            return value.replace(`${ignoreStr}`, '');
        }
    }

    return (
        // item Outer Wrap
        <div
            data-id={`itemOuterWrapCustomClass`}
            className={`w-full overflow-x-auto break-all ${classes.itemOuterWrapCustomClass}`}
        >
            {/*  Item wrap */}
            <div data-id={`itemWrap`} className={`${itemDivideClass} ${itemAreaWrapClasses}`} style={itemAreaWrapStyle}>
                {/* Total */}
                <div
                    data-id={`totalAmountWrapCustomClass`}
                    className={`text-right py-3 px-2 ${classes.totalAmountWrapCustomClass}`}
                >
                    <p
                        data-id={`totalAmoutExceptingClasses_totalAmountTextCustomClass`}
                        className={`inline ${totalAmoutExceptingClasses} ${classes.totalAmountTextCustomClass}`}
                    >
                        {info.totalAmountText}
                    </p>
                    <p
                        data-id={`totalAmoutExceptingClasses_totalAmountDelimiterCustomClass`}
                        className={`inline ${totalAmoutExceptingClasses} ${classes.totalAmountDelimiterCustomClass}`}
                    >
                        {info.totalAmountDelimiter}
                    </p>
                    <p
                        data-id={`totalAmoutNumericClasses_totalAmountCustomClass`}
                        className={`overflow-visible break-all inline text-right ${totalAmoutNumericClasses} ${classes.totalAmountCustomClass}`}
                    >
                        {formatTotalCost}
                        <span
                            data-id={`totalAmoutExceptingClasses_currencyCustomClass`}
                            className={`${totalAmoutExceptingClasses} ${classes.currencyCustomClass}`}
                        >
                            {info.currencyUnitText}
                        </span>
                    </p>
                </div>

                <div className="" style={divideColorStyle}>
                    <fieldset className={``}>
                        <div className={`grid  ${itemDivideClass}`}>
                            {itemData.map((data, index) => {
                                let bgSpecialColor = false;
                                if (data.maxReservationCount - data.reservationCount <= 0 && !data.reservedFlag) {
                                    bgSpecialColor = true;
                                }

                                if (data.maxReservationCount != 0) {
                                    let requiredCss;
                                    if (data.required != 0) {
                                        requiredCss = 'required';
                                    }
                                    if (data.maxReservationCount >= 999) {
                                        data.maxReservationCount = '-';
                                    }
                                    let singleSelected = '';
                                    if (data.singleSelected == 0) {
                                        //singleSelected = "※";
                                        singleSelected = info.SingleSelectionNotPossibleText;
                                    }

                                    return (
                                        <ItemList
                                            key={index}
                                            index={index}
                                            slotId={data.slotId}
                                            itemName={data.itemName}
                                            itemOverview={data.itemOverview}
                                            itemDescription={data.itemDescription}
                                            maxReservationCount={data.maxReservationCount}
                                            reservationCount={data.reservationCount}
                                            required={requiredCss}
                                            itemPrice={data.itemPrice}
                                            eventSubItemId={data.eventSubItemId}
                                            itemId={data.itemId}
                                            itemSubId={data.itemSubId}
                                            parentItemId={data.parentItemId}
                                            eventItemData={itemData}
                                            setTotalCost={setTotalCost}
                                            totalCost={totalCost}
                                            singleSelected={singleSelected}
                                            bgSpecialColor={bgSpecialColor}
                                            checked={data.checked}
                                            selected={data.selected}
                                            readonly={data.readonly}
                                            reservedFlag={data.reservedFlag}
                                            settingData={settingData}
                                        />
                                    );
                                }
                            })}
                        </div>
                    </fieldset>
                </div>
            </div>
        </div>
    );
}
