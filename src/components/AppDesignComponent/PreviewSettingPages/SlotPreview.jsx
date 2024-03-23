import { ChevronLeftIcon } from '../icons/ChevronLeftIcon';
import { ChevronRightIcon } from '../icons/ChevronRightIcon';
import { DoubleLeftIcon } from '../icons/DoubleLeftIcon';
import { DoubleRightIcon } from '../icons/DoubleRightIcon';
import { FewIcon } from '../icons/FewIcon';
import { FullIcon } from '../icons/FullIcon';
import { VacancyIcon } from '../icons/VacancyIcon';

export default function SlotPreview({ settingData, eventSlotData }) {
    const currentWeekNumber = 0;

    const { info, classes, styles } = settingData;

    const {
        explanatoryNoteOutOfStockText,
        explanatoryNoteInStockText,
        explanatoryNoteLowStockText,
        explanatoryThresholdOutOfStock,
        explanatoryThresholdLowStock,

        explanatoryNoteOutOfStockSvg1 = { icon: '' },
        explanatoryNoteOutOfStockSvg2 = { icon: '' },
        explanatoryNoteLowStockSvg1 = { icon: '' },
        explanatoryNoteLowStockSvg2 = { icon: '' },
        explanatoryNoteInStockSvg1 = { icon: '' },
        explanatoryNoteInStockSvg2 = { icon: '' },

        navigationLastMonthText,
        navigationLastWeekText,
        navigationLastMonthSvg1,
        navigationLastMonthSvg2,
        navigationLastWeekSvg1,
        navigationLastWeekSvg2,
        navigationNextMonthText,
        navigationNextWeekText,
        navigationNextMonthSvg1,
        navigationNextMonthSvg2,
        navigationNextWeekSvg1,
        navigationNextWeekSvg2,
        columnTimeHeaderText,
        cellsLeftText,
        cellsCenterText,
    } = info;

    const explanatoryNoteClass = [classes.explanatoryNoteTextSize, classes.explanatoryNoteFontWeight].join(' ');
    const explanatoryNoteStyle = { ...styles.explanatoryNoteTextColor };

    const explanatorySvg1InStockStyle = {
        ...styles.explanatoryNoteInStockSvg1FillColor,
        ...styles.explanatoryNoteInStockSvg1StrokeColor,
    };
    const explanatorySvg2InStockStyle = {
        ...styles.explanatoryNoteInStockSvg2FillColor,
        ...styles.explanatoryNoteInStockSvg2StrokeColor,
    };

    const explanatorySvg1LowStockStyle = {
        ...styles.explanatoryNoteLowStockSvg1FillColor,
        ...styles.explanatoryNoteLowStockSvg1StrokeColor,
    };
    const explanatorySvg2LowStockStyle = {
        ...styles.explanatoryNoteLowStockSvg2FillColor,
        ...styles.explanatoryNoteLowStockSvg2StrokeColor,
    };

    const explanatorySvg1OutStockStyle = {
        ...styles.explanatoryNoteOutOfStockSvg1FillColor,
        ...styles.explanatoryNoteOutOfStockSvg1StrokeColor,
    };
    const explanatorySvg2OutStockStyle = {
        ...styles.explanatoryNoteOutOfStockSvg2FillColor,
        ...styles.explanatoryNoteOutOfStockSvg2StrokeColor,
    };

    const navigationClass = [
        classes.navigationTextSize,
        classes.navigationFontWeight,
        classes.navigationBorderStyle,
        classes.navigationBorderRadius,
        classes.navigationBorderWidth,
    ].join(' ');
    const navigationStyle = {
        ...styles.navigationTextColor,
        ...styles.navigationBackgroundColor,
    };
    const navigationDefaultBorderColor = styles.navigationBoderColor;
    const navigationDisabledBorderColor = styles.navigationBoderColorDisabled;

    const navLastMonthSvg1Style = {
        ...styles.navigationLastMonthSvg1FillColor,
        ...styles.navigationLastMonthSvg1StrokeColor,
    };
    const navLastMonthSvg2Style = {
        ...styles.navigationLastMonthSvg2FillColor,
        ...styles.navigationLastMonthSvg2StrokeColor,
    };

    const navLastWeekSvg1Style = {
        ...styles.navigationLastWeekSvg1FillColor,
        ...styles.navigationLastWeekSvg1StrokeColor,
    };
    const navLastWeekSvg2Style = {
        ...styles.navigationLastWeekSvg2FillColor,
        ...styles.navigationLastWeekSvg2StrokeColor,
    };

    const navNextWeekSvg1Style = {
        ...styles.navigationNextWeekSvg1FillColor,
        ...styles.navigationNextWeekSvg1StrokeColor,
    };
    const navNextWeekSvg2Style = {
        ...styles.navigationNextWeekSvg2FillColor,
        ...styles.navigationNextWeekSvg2StrokeColor,
    };

    const navNextMonthSvg1Style = {
        ...styles.navigationNextMonthSvg1FillColor,
        ...styles.navigationNextMonthSvg1StrokeColor,
    };
    const navNextMonthSvg2Style = {
        ...styles.navigationNextMonthSvg2FillColor,
        ...styles.navigationNextMonthSvg2StrokeColor,
    };

    const headerClass = [classes.columnHeaderTextSize, classes.columnHeaderFontWeight].join(' ');

    const timeHeaderClass = [
        classes.columnTimeHeaderCustomClass,
    ].join(' ');
    const timeHeaderStyle = { ...styles.columnTimeHeaderTextColor, ...styles.columnTimeHeaderBackgroundColor };

    const sundayHeaderClass = [, classes.columnSundayHeaderSundayCustomClass].join(' ');
    const sundayHeaderStyle = { ...styles.columnSundayHeaderTextColor, ...styles.columnSundayHeaderBackgroundColor };

    const weekdayHeaderClass = [classes.columnWeekdayHeaderSundayCustomClass].join(' ');
    const weekdayHeaderStyle = { ...styles.columnWeekdayHeaderTextColor, ...styles.columnWeekdayHeaderBackgroundColor };

    const saturdayHeaderClass = [classes.columnSaturdayHeaderSundayCustomClass].join(' ');
    const saturdayHeaderStyle = {
        ...styles.columnSaturdayHeaderTextColor,
        ...styles.columnSaturdayHeaderBackgroundColor,
    };

    const rowHeaderTextClass = [classes.rowHeaderTextSize, classes.rowHeaderFontWeight].join(' ');
    const rowHeaderTextStyle = { ...styles.rowHeaderTextColor };

    const rowHeaderClass = [classes.rowHeaderCustomClass].join(' ');

    const cellTextClass = [classes.cellsTextSize, classes.cellsFontWeight].join(' ');
    const cellTextStyle = { ...styles.cellsTextColor };

    if (eventSlotData.data.length >= 1) {
        let weekCount = eventSlotData.weekcount;

        return (
            <div className={`w-full`}>
                <div
                    data-id="explanatoryNoteWrapCustomClass"
                    className={`flex flex-row ${classes.explanatoryNoteWrapCustomClass}`}
                >
                    <div className="flex flex-row items-end">
                        <p className="align-text-bottom">
                            <VacancyIcon
                                icon1Class={classes.explanatoryNoteInStockSvg1Size}
                                icon2Class={classes.explanatoryNoteInStockSvg2Size}
                                svg1Style={explanatorySvg1InStockStyle}
                                svg2Style={explanatorySvg2InStockStyle}
                                svg1={explanatoryNoteInStockSvg1}
                                svg2={explanatoryNoteInStockSvg2}
                            />
                        </p>
                        <p
                            data-id="explanatoryNoteClass_instock"
                            className={`${explanatoryNoteClass}`}
                            style={explanatoryNoteStyle}
                        >
                            {explanatoryNoteInStockText}
                        </p>
                    </div>
                    <div className="flex flex-row items-end">
                        <p className="align-text-bottom">
                            <FewIcon
                                icon1Class={classes.explanatoryNoteLowStockSvg1Size}
                                icon2Class={classes.explanatoryNoteLowStockSvg2Size}
                                svg1Style={explanatorySvg1LowStockStyle}
                                svg2Style={explanatorySvg2LowStockStyle}
                                svg1={explanatoryNoteLowStockSvg1}
                                svg2={explanatoryNoteLowStockSvg2}
                            />
                        </p>
                        <p
                            data-id="explanatoryNoteClass_lowstock"
                            className={`${explanatoryNoteClass}`}
                            style={explanatoryNoteStyle}
                        >
                            {explanatoryNoteLowStockText}
                        </p>
                    </div>
                    <div className="flex flex-row items-end">
                        <p className="align-text-bottom">
                            <FullIcon
                                icon1Class={classes.explanatoryNoteOutOfStockSvg1Size}
                                icon2Class={classes.explanatoryNoteOutOfStockSvg2Size}
                                svg1Style={explanatorySvg1OutStockStyle}
                                svg2Style={explanatorySvg2OutStockStyle}
                                svg1={explanatoryNoteOutOfStockSvg1}
                                svg2={explanatoryNoteOutOfStockSvg2}
                            />
                        </p>
                        <p
                            data-id="explanatoryNoteClass_outstock"
                            className={`${explanatoryNoteClass}`}
                            style={explanatoryNoteStyle}
                        >
                            {explanatoryNoteOutOfStockText}
                        </p>
                    </div>
                </div>

                {/* Navigation section */}
                <div
                    data-id="navigationWrapCustomClass_navigationGap"
                    className={`flex flex-row ${classes.navigationWrapCustomClass} ${classes.navigationGap}`}
                >
                    {/* ページコントローラー */}
                    {(() => {
                        let step =
                            -(weekCount - 1 + (currentWeekNumber - (weekCount - 1))) < -4
                                ? -4
                                : -(weekCount - 1 + (currentWeekNumber - (weekCount - 1)));

                        return (
                            <button
                                data-id="navigationClass"
                                className={`cursor-pointer flex justify-center items-center disabled:cursor-default ${navigationClass} ${classes.navigationLastMonthCustomClass}`}
                                disabled
                                style={{ ...navigationStyle, ...navigationDisabledBorderColor }}
                            >
                                <DoubleLeftIcon
                                    icon1Class={classes.navigationLastMonthSvg1Size}
                                    icon2Class={classes.navigationLastMonthSvg2Size}
                                    svg1Style={navLastMonthSvg1Style}
                                    svg2Style={navLastMonthSvg2Style}
                                    svg1={navigationLastMonthSvg1}
                                    svg2={navigationLastMonthSvg2}
                                />
                                {navigationLastMonthText}
                            </button>
                        );
                    })()}
                    {(() => {
                        return (
                            <button
                                data-id="navigationClass"
                                className={`cursor-pointer flex justify-center items-center disabled:cursor-default ${navigationClass} ${classes.navigationLastWeekCustomClass}`}
                                disabled
                                style={{ ...navigationStyle, ...navigationDisabledBorderColor }}
                            >
                                <ChevronLeftIcon
                                    icon1Class={classes.navigationLastWeekSvg1Size}
                                    icon2Class={classes.navigationLastWeekSvg2Size}
                                    svg1Style={navLastWeekSvg1Style}
                                    svg2Style={navLastWeekSvg2Style}
                                    svg1={navigationLastWeekSvg1}
                                    svg2={navigationLastWeekSvg2}
                                />
                                {navigationLastWeekText}
                            </button>
                        );
                    })()}
                    {(() => {
                        return (
                            <button
                                data-id="navigationClass"
                                className={`cursor-pointer flex justify-center items-center disabled:cursor-default ${navigationClass} ${classes.navigationNextWeekCustomClass}`}
                                style={{ ...navigationStyle, ...navigationDefaultBorderColor }}
                            >
                                {navigationNextWeekText}
                                <ChevronRightIcon
                                    icon1Class={classes.navigationNextWeekSvg1Size}
                                    icon2Class={classes.navigationNextWeekSvg2Size}
                                    svg1Style={navNextWeekSvg1Style}
                                    svg2Style={navNextWeekSvg2Style}
                                    svg1={navigationNextWeekSvg1}
                                    svg2={navigationNextWeekSvg2}
                                />
                            </button>
                        );
                    })()}
                    {(() => {
                        let step = weekCount - 1 - currentWeekNumber >= 4 ? 4 : weekCount - 1 - currentWeekNumber;

                        return (
                            <button
                                data-id="navigationClass"
                                className={`cursor-pointer flex justify-center items-center disabled:cursor-default ${navigationClass} ${classes.navigationNextMonthCustomClass}`}
                                style={{ ...navigationStyle, ...navigationDefaultBorderColor }}
                            >
                                {navigationNextMonthText}
                                <DoubleRightIcon
                                    icon1Class={classes.navigationNextMonthSvg1Size}
                                    icon2Class={classes.navigationNextMonthSvg2Size}
                                    svg1Style={navNextMonthSvg1Style}
                                    svg2Style={navNextMonthSvg2Style}
                                    svg1={navigationNextMonthSvg1}
                                    svg2={navigationNextMonthSvg2}
                                />
                            </button>
                        );
                    })()}
                </div>

                <div class="grid grid-flow-row auto-rows-max divide-gray-200 border">
                    <div class="grid grid-cols-8 divide-y divide-x  divide-gray-200 text-sm text-slate-700">
                        {eventSlotData.data &&
                            eventSlotData.data[currentWeekNumber].head &&
                            eventSlotData.data[currentWeekNumber].head.map((data, index) =>
                                (() => {
                                    if (data.dayOfWeekNumber == '99') {
                                        return (
                                            <div
                                                data-id="headerClass_timeHeaderClass"
                                                id="examinationTime"
                                                className={`text-center   ${headerClass} ${timeHeaderClass}`}
                                                style={timeHeaderStyle}
                                            >
                                                {columnTimeHeaderText}
                                            </div>
                                        );
                                    } else if (data.dayOfWeekNumber == 0) {
                                        return (
                                            <div
                                                data-id="headerClass_sundayHeaderClass"
                                                id="sunday"
                                                className={`text-center  ${headerClass} ${sundayHeaderClass}`}
                                                style={sundayHeaderStyle}
                                            >
                                                {data.dateName}
                                            </div>
                                        );
                                    } else if (data.dayOfWeekNumber == 6) {
                                        let options = {
                                            month: 'short',
                                            day: 'numeric',
                                            weekday: 'short',
                                        };
                                        let dateFormatter = new Intl.DateTimeFormat('ja-JP', options);

                                        return (
                                            <div
                                                data-id="headerClass_saturdayHeaderClass"
                                                id="saturday"
                                                className={`text-center  ${headerClass} ${saturdayHeaderClass}`}
                                                style={saturdayHeaderStyle}
                                            >
                                                {data.dateName}
                                            </div>
                                        );
                                    } else {
                                        let options = {
                                            month: 'short',
                                            day: 'numeric',
                                            weekday: 'short',
                                        };
                                        let dateFormatter = new Intl.DateTimeFormat('ja-JP', options);

                                        return (
                                            <div
                                                data-id="headerClass_weekdayHeaderClass"
                                                id="monday"
                                                className={`text-center  ${headerClass} ${weekdayHeaderClass}`}
                                                style={weekdayHeaderStyle}
                                            >
                                                {data.dateName}
                                            </div>
                                        );
                                    }
                                })()
                            )}

                        {/* スロットデータ部分 / Slot data part */}
                        {eventSlotData &&
                            eventSlotData.data[currentWeekNumber].slot &&
                            eventSlotData.data[currentWeekNumber].slot.map((row, index) => {
                                let bgcolorCells = styles.rowBackgroundColorOdd;
                                if (index % 2 == 0) {
                                    bgcolorCells = styles.rowBackgroundColorEven;
                                }

                                return (
                                    <>
                                        {row.map((data, index2) => {
                                            if (data.slotType == 'datetime') {
                                                return (
                                                    <div
                                                        className={`grid place-content-center ${rowHeaderClass}`}
                                                        style={bgcolorCells}
                                                    >
                                                        <p
                                                            className={`h-fullIcon align-middle ${rowHeaderTextClass}`}
                                                            style={rowHeaderTextStyle}
                                                        >
                                                            {data.slotValue}
                                                        </p>
                                                    </div>
                                                );
                                            } else if (data.slotType == 'empty') {
                                                return (
                                                    <div
                                                        data-id="cellClass_cellsAllWrapCustomClass"
                                                        className={`grid place-content-center ${classes.cellsAllWrapCustomClass}`}
                                                        style={bgcolorCells}
                                                    ></div>
                                                );
                                            } else {
                                                let remainCount = data.maxReservationCount - data.reservationCount;

                                                if (remainCount <= explanatoryThresholdOutOfStock) {
                                                    return (
                                                        <div
                                                            data-id="cellClass_cellsAllWrapCustomClass"
                                                            className={`grid place-content-center cursor-pointer ${classes.cellsAllWrapCustomClass}`}
                                                            style={bgcolorCells}
                                                        >
                                                            <FullIcon
                                                                icon1Class={classes.cellOutOfStockSvg1Size}
                                                                icon2Class={classes.cellOutOfStockSvg2Size}
                                                                iconWrapClass={classes.cellsIconWrapCustomClass}
                                                                svg1Style={explanatorySvg1OutStockStyle}
                                                                svg2Style={explanatorySvg2OutStockStyle}
                                                                svg1={explanatoryNoteOutOfStockSvg1}
                                                                svg2={explanatoryNoteOutOfStockSvg2}
                                                            />

                                                            <div
                                                                data-id="cellsTextWrapCustomClass"
                                                                className={`${classes.cellsTextWrapCustomClass}`}
                                                            >
                                                                <p
                                                                    data-id="cellTextClass"
                                                                    className={`${cellTextClass}`}
                                                                    style={cellTextStyle}
                                                                >
                                                                    {cellsLeftText + cellsCenterText + remainCount}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    );
                                                } else if (remainCount <= explanatoryThresholdLowStock) {
                                                    let slot = {
                                                        datetime: data.datetime,
                                                        mappingDatetime: data.mappingDatetime,
                                                        slotId: data.slotId,
                                                    };
                                                    return (
                                                        <div
                                                            data-id="cellClass_cellsAllWrapCustomClass"
                                                            className={`grid place-content-center cursor-pointer ${classes.cellsAllWrapCustomClass}`}
                                                            style={bgcolorCells}
                                                        >
                                                            <FewIcon
                                                                icon1Class={classes.cellLowStockSvg1Size}
                                                                icon2Class={classes.cellLowStockSvg2Size}
                                                                iconWrapClass={classes.cellsIconWrapCustomClass}
                                                                svg1Style={explanatorySvg1LowStockStyle}
                                                                svg2Style={explanatorySvg2LowStockStyle}
                                                                svg1={explanatoryNoteLowStockSvg1}
                                                                svg2={explanatoryNoteLowStockSvg2}
                                                            />

                                                            <div
                                                                data-id="cellsTextWrapCustomClass"
                                                                className={`${classes.cellsTextWrapCustomClass}`}
                                                            >
                                                                <p
                                                                    data-id="cellTextClass"
                                                                    className={`${cellTextClass}`}
                                                                    style={cellTextStyle}
                                                                >
                                                                    {cellsLeftText + cellsCenterText + remainCount}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    );
                                                } else {
                                                    let slot = {
                                                        datetime: data.datetime,
                                                        mappingDatetime: data.mappingDatetime,
                                                        slotId: data.slotId,
                                                    };
                                                    return (
                                                        <div
                                                            data-id="cellClass_cellsAllWrapCustomClass"
                                                            className={`grid place-content-center cursor-pointer ${classes.cellsAllWrapCustomClass}`}
                                                            style={bgcolorCells}
                                                        >
                                                            <VacancyIcon
                                                                icon1Class={classes.cellInStockSvg1Size}
                                                                icon2Class={classes.cellInStockSvg2Size}
                                                                iconWrapClass={classes.cellsIconWrapCustomClass}
                                                                svg1Style={explanatorySvg1InStockStyle}
                                                                svg2Style={explanatorySvg2InStockStyle}
                                                                svg1={explanatoryNoteInStockSvg1}
                                                                svg2={explanatoryNoteInStockSvg2}
                                                            />

                                                            <div
                                                                data-id="cellsTextWrapCustomClass"
                                                                className={`${classes.cellsTextWrapCustomClass}`}
                                                            >
                                                                <p
                                                                    data-id="cellTextClass"
                                                                    className={`${cellTextClass}`}
                                                                    style={cellTextStyle}
                                                                >
                                                                    {cellsLeftText + cellsCenterText + remainCount}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                            }
                                        })}
                                    </>
                                );
                            })}
                    </div>
                </div>
            </div>
        );
    }
}
