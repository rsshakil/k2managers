import CheckIcon from '../icons/CheckIcon';
import PlayIconIcon from '../icons/PlayIconIcon';
import XmarkIcon from '../icons/XmarkIcon';

export default function ItemList(props) {
    const {
        settingData,
        index,
        slotId,
        maxReservationCount,
        reservationCount,
        readonly,
        itemName,
        eventSubItemId,
        itemId,
        itemSubId,
        checked,
        requiredCss,
        itemDescription,
        itemPrice,
        onclick,
        parentItemId,
        handleOnChange,
        eventItemData,
        singleSelected,
        bgSpecialColor,
        reservedFlag,
    } = props;
    const formatPrice = new Intl.NumberFormat('ja-JP').format(itemPrice);

    const { info, classes, prefixClass, styles } = settingData;

    const {
        unselectableIcon1Svg,
        unselectableIcon2Svg,
        selectableIcon1Svg,
        selectableIcon2Svg,
        selectedIcon1Svg,
        selectedIcon2Svg,
        //SingleSelectionNotPossibleText,
    } = info;

    const itemDivideClass = [classes.itemDivideWidthY, classes.itemDivideStyle].join(' ');
    const divideColorStyle = styles.itemDivideColor;

    let rowPrefixClass = [classes.itemRowCustomClass].join(' ');

    let rowPrefixStyle = { ...styles.rowTextColorOdd, ...styles.rowBackgroundColorOdd };
    if (index % 2 == 0) {
        rowPrefixStyle = { ...styles.rowTextColorEven, ...styles.rowBackgroundColorEven };
    }

    const unselectableIcon1Class = [
        classes.unselectableIcon1Size,
        classes.unselectableIcon1StrokeSize,
        // classes.unselectableIcon1FillColor,
        // classes.unselectableIcon1StrokeColor,
    ].join(' ');
    const unselectableIcon2Class = [
        classes.unselectableIcon2Size,
        classes.unselectableIcon2StrokeSize,
        // classes.unselectableIcon2FillColor,
        // classes.unselectableIcon2StrokeColor,
    ].join(' ');
    const unselectableIcon1Style = { ...styles.unselectableIcon1FillColor, ...styles.unselectableIcon1StrokeColor };
    const unselectableIcon2Style = { ...styles.unselectableIcon2FillColor, ...styles.unselectableIcon2StrokeColor };

    const selectableIcon1Class = [
        classes.selectableIcon1Size,
        classes.selectableIcon1StrokeSize,
        // classes.selectableIcon1FillColor,
        // classes.selectableIcon1StrokeColor,
    ].join(' ');
    const selectableIcon2Class = [
        classes.selectableIcon2Size,
        classes.selectableIcon2StrokeSize,
        // classes.selectableIcon2FillColor,
        // classes.selectableIcon2StrokeColor,
    ].join(' ');
    const selectableIcon1Style = { ...styles.selectableIcon1FillColor, ...styles.selectableIcon1StrokeColor };
    const selectableIcon2Style = { ...styles.selectableIcon2FillColor, ...styles.selectableIcon2StrokeColor };

    const selectedIcon1Class = [
        classes.selectedIcon1Size,
        classes.selectedIcon1StrokeSize,
        // classes.selectedIcon1FillColor,
        // classes.selectedIcon1StrokeColor,
    ].join(' ');
    const selectedIcon2Class = [
        classes.selectedIcon2Size,
        classes.selectedIcon2StrokeSize,
        // classes.selectedIcon2FillColor,
        // classes.selectedIcon2StrokeColor,
    ].join(' ');
    const selectedIcon1Style = { ...styles.selectedIcon1FillColor, ...styles.selectedIcon1StrokeColor };
    const selectedIcon2Style = { ...styles.selectedIcon2FillColor, ...styles.selectedIcon2StrokeColor };

    const singleSelectionClass = [
        classes.SingleSelectionNotPossibleTextSize,
        classes.SingleSelectionNotPossibleFontWeight,
        // classes.SingleSelectionNotPossibleTextColor,
        // classes.SingleSelectionNotPossibleBackgroundColor,
        classes.SingleSelectionNotPossibleCustomClass,
    ].join(' ');
    const singleSelectionStyle = {
        ...styles.SingleSelectionNotPossibleTextColor,
        ...styles.SingleSelectionNotPossibleBackgroundColor,
    };

    const itemNameClass = [classes.ItemNameTextSize, classes.ItemNameFontWeight, classes.ItemNameCustomClass].join(' ');

    const itemDescriptionClass = [
        classes.itemExplanationTextSize,
        classes.itemExplanationFontWeight,
        classes.itemExplanationCustomClass,
    ].join(' ');

    const remainingLeftClass = [
        classes.remainingLeftTextSize,
        classes.remainingLeftFontWeight,
        classes.remainingLeftCustomClass,
    ].join(' ');

    const remainingNumberClass = [
        classes.remainingNumberTextSize,
        classes.remainingNumberFontWeight,
        classes.remainingNumberCustomClass,
    ].join(' ');

    const currencyUnitClass = [
        classes.currencyUnitTextSize,
        classes.currencyUnitFontWeight,
        classes.currencyUnitCustomClass,
    ].join(' ');

    let childCss;
    if (parentItemId) {
        childCss = 'pl-4';
    }

    let remainCount = maxReservationCount == '-' ? '-' : maxReservationCount - reservationCount;

    return (
        <div
            data-id="rowPrefixClass"
            className={`cursor-pointer ${rowPrefixClass}`}
            key={index}
            style={{ ...rowPrefixStyle, ...divideColorStyle }}
        >
            <div className={`flex flex-row items-stretch `}>
                <div
                    data-id="selectAreaCustomClass"
                    data-name="icon-wrap"
                    className={`w-1/12 items-center self-center ${childCss} ${classes.selectAreaCustomClass}`}
                >
                    {(() => {
                        // 予約不可能
                        if (maxReservationCount <= reservationCount) {
                            if (reservedFlag) {
                                return (
                                    <input
                                        type="checkbox"
                                        name={slotId} //全て変数
                                        value={itemSubId} //　押せなくても入っててOK
                                        id={`custom-checkbox-${index}`} //全て必要
                                        checked={checked} //全て必要
                                        className="peer hidden" //全て必要
                                        // disabled={true}//全て必要
                                        origin={true}
                                    />
                                );
                            } else {
                                return (
                                    <input
                                        type="checkbox"
                                        readOnly={true} //上書き必要
                                        name={slotId} //全て変数
                                        value={itemSubId} //　押せなくても入っててOK
                                        id={`custom-checkbox-${index}`} //全て必要
                                        checked={checked} //全て必要
                                        className="peer is-readonly hidden" //全て必要
                                        disabled={true} //全て必要
                                        origin={true}
                                        required={true} //０件を特定するためのラベルとしておいてます
                                    />
                                );
                            }
                            // 選択してある？
                        } else if (checked) {
                            if (parentItemId) {
                                // let checkedFlag = false;
                                let parentTrueChecked = eventItemData.some((data) =>
                                    parentItemId == data.itemId && data.checked === true ? true : false
                                );
                                let parentFalseChecked = eventItemData.some((data) =>
                                    parentItemId == data.itemId && data.checked === false ? true : false
                                );
                                if (parentTrueChecked === true) {
                                    return (
                                        <input
                                            type="checkbox"
                                            readOnly={readonly}
                                            name={slotId}
                                            id={`custom-checkbox-${index}`}
                                            className="peer hidden h-4 w-4"
                                            checked={checked}
                                        />
                                    );
                                }
                                // 選択不可
                                else if (parentFalseChecked === true) {
                                    eventItemData.map((data) =>
                                        parentItemId == data.itemId && data.checked === false ? true : false
                                    );
                                    return (
                                        <input
                                            type="checkbox"
                                            readOnly={readonly}
                                            name={slotId}
                                            id={`custom-checkbox-${index}`}
                                            className="peer hidden h-4 w-4"
                                            checked={false}
                                            disabled={true}
                                        />
                                    );
                                }
                                // 選択不可
                                else {
                                    return (
                                        <input
                                            type="checkbox"
                                            readOnly={readonly}
                                            name={slotId}
                                            checked={false}
                                            id={`custom-checkbox-${index}`}
                                            className="peer hidden h-4 w-4"
                                            disabled={true}
                                        />
                                    );
                                }
                            } else {
                                return (
                                    <input
                                        type="checkbox"
                                        readOnly={readonly}
                                        name={slotId}
                                        id={`custom-checkbox-${index}`}
                                        checked={checked}
                                        // onChange={(e) => handleOnChange(e.target, eventSubItemId, itemId, itemSubId, itemPrice)} //全部あって良い
                                        className="peer hidden h-4 w-4"
                                        // disabled={true}
                                    />
                                );
                            }
                        } else {
                            if (parentItemId) {
                                let parentTrueChecked = eventItemData.some((data) =>
                                    parentItemId == data.itemId && data.selected === true ? true : false
                                );
                                let parentFalseChecked = eventItemData.some((data) =>
                                    parentItemId == data.itemId && data.selected === false ? true : false
                                );
                                if (parentTrueChecked === true) {
                                    return (
                                        <input
                                            type="checkbox"
                                            readOnly={readonly}
                                            name={slotId}
                                            id={`custom-checkbox-${index}`}
                                            // onChange={(e) => handleOnChange(e.target, eventSubItemId, itemId, itemSubId, itemPrice)}
                                            className="peer hidden h-4 w-4"
                                        />
                                    );
                                }
                                // 選択不可
                                else if (parentFalseChecked === true) {
                                    eventItemData.map((data) =>
                                        parentItemId == data.itemId && data.selected === false ? true : false
                                    );
                                    return (
                                        <input
                                            type="checkbox"
                                            readOnly={readonly}
                                            name={slotId}
                                            id={`custom-checkbox-${index}`}
                                            // onChange={(e) => handleOnChange(e.target, eventSubItemId, itemId, itemSubId, itemPrice)}
                                            className="peer hidden h-4 w-4"
                                            checked={false}
                                            disabled={true}
                                        />
                                    );
                                }
                                // 選択不可
                                else {
                                    return (
                                        <input
                                            type="checkbox"
                                            readOnly={readonly}
                                            name={slotId}
                                            id={`custom-checkbox-${index}`}
                                            // onChange={(e) => handleOnChange(e.target, eventSubItemId, itemId, itemSubId, itemPrice)}
                                            className="peer hidden h-4 w-4"
                                            checked={false}
                                            disabled={true}
                                        />
                                    );
                                }
                            }
                            // 選択可能
                            else {
                                return (
                                    <input
                                        type="checkbox"
                                        readOnly={readonly}
                                        name={slotId}
                                        id={`custom-checkbox-${index}`}
                                        className="peer hidden"
                                    />
                                );
                            }
                        }
                    })()}

                    <div for={`custom-checkbox-${index}`} className="hidden peer-required:block">
                        {/* Xmark = unselectable */}
                        <XmarkIcon
                            icon1Class={unselectableIcon1Class}
                            icon2Class={unselectableIcon2Class}
                            iconWrapClass={classes.unselectableIconCustomClass}
                            svg1Style={unselectableIcon1Style}
                            svg2Style={unselectableIcon2Style}
                            svg1={unselectableIcon1Svg}
                            svg2={unselectableIcon2Svg}
                        />
                    </div>

                    <div for={`custom-checkbox-${index}`} className="peer-checked:hidden peer-required:hidden">
                        {/* PlayIcon = selectable */}
                        <PlayIconIcon
                            icon1Class={selectableIcon1Class}
                            icon2Class={selectableIcon2Class}
                            iconWrapClass={classes.selectableIconCustomClass}
                            svg1Style={selectableIcon1Style}
                            svg2Style={selectableIcon2Style}
                            svg1={selectableIcon1Svg}
                            svg2={selectableIcon2Svg}
                        />
                    </div>
                    <div for={`custom-checkbox-${index}`} className="hidden peer-checked:block">
                        {/* Check = selected */}
                        <CheckIcon
                            icon1Class={selectedIcon1Class}
                            icon2Class={selectedIcon2Class}
                            iconWrapClass={classes.selectedCustomClass}
                            svg1Style={selectedIcon1Style}
                            svg2Style={selectedIcon2Style}
                            svg1={selectedIcon1Svg}
                            svg2={selectedIcon2Svg}
                        />
                    </div>
                </div>

                <div
                    data-id="ItemNameAreaWrapCustomClass"
                    data-name="postfix-wrap"
                    className={`w-1/6 items-center self-center ${classes.ItemNameAreaWrapCustomClass}`}
                >
                    <p data-id="itemNameClass" className={`${itemNameClass} ${requiredCss}`}>
                        <span className="whitespace-pre-wrap">{itemName}</span>
                        <span
                            data-id="singleSelectionClass"
                            className={`${singleSelectionClass}`}
                            style={singleSelectionStyle}
                        >
                            {singleSelected}
                        </span>
                    </p>
                </div>

                <div
                    data-id="itemExplanationAreaWrapCustomClass"
                    data-name="description-wrap"
                    className={`w-5/12 items-center self-center ${classes.itemExplanationAreaWrapCustomClass}`}
                >
                    <p
                        data-id="itemDescriptionClass"
                        key={index}
                        className={`whitespace-pre-wrap ${itemDescriptionClass}`}
                    >
                        {itemDescription}
                    </p>
                </div>

                <div data-name="count-wrap" className="w-1/6 items-center self-center">
                    <p
                        data-id="remainingAreaWrapCustomClass"
                        key={index}
                        className={`text-right ${classes.remainingAreaWrapCustomClass}`}
                    >
                        <span data-id="remainingLeftClass" className={`${remainingLeftClass}`}>
                            {info.remainingLeftText}
                        </span>
                        <span data-id="remainingNumberClass" className={`${remainingNumberClass}`}>
                            {remainCount}
                        </span>
                    </p>
                </div>

                <div data-name="price-wrap" className={`w-1/6 items-center self-center`}>
                    <p
                        key={index}
                        data-id="currencyAreaCustomClass"
                        className={`text-right ${classes.currencyAreaCustomClass}`}
                    >
                        {formatPrice}
                        <span data-id="currencyUnitClass" className={`${currencyUnitClass}`}>
                            {info.currencyUnitText}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}
