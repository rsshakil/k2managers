
import { FewIcon } from '../icons/FewIcon';
import { FullIcon } from '../icons/FullIcon';
import { VacancyIcon } from '../icons/VacancyIcon';

export default function BusPreview({ settingData, eventSlotData }) {
    const {
        info,
        classes,
        prefixClass,
        styles,
    } = settingData;

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
        columnDayHeaderText,
        columnDepartureTimeHeaderText,
        columnBusStopHeaderText,
        columnRemainingSeatsHeaderText,
        columnTimeHeaderText,
        cellsLeftText,
        cellsCenterText,
    } = info;

    const explanatoryNoteClass = [
        classes.explanatoryNoteTextSize,
        classes.explanatoryNoteFontWeight,
        
    ].join(' ');
    const explanatoryNoteStyle = { ...styles.explanatoryNoteTextColor }

    

    const explanatorySvg1InStockStyle = { ...styles.explanatoryNoteInStockSvg1FillColor, ...styles.explanatoryNoteInStockSvg1StrokeColor };
    const explanatorySvg2InStockStyle = { ...styles.explanatoryNoteInStockSvg2FillColor, ...styles.explanatoryNoteInStockSvg2StrokeColor };


 

    const explanatorySvg1LowStockStyle = { ...styles.explanatoryNoteLowStockSvg1FillColor, ...styles.explanatoryNoteLowStockSvg1StrokeColor };
    const explanatorySvg2LowStockStyle = { ...styles.explanatoryNoteLowStockSvg2FillColor, ...styles.explanatoryNoteLowStockSvg2StrokeColor };


  

    const explanatorySvg1OutStockStyle = { ...styles.explanatoryNoteOutOfStockSvg1FillColor, ...styles.explanatoryNoteOutOfStockSvg1StrokeColor }
    const explanatorySvg2OutStockStyle = { ...styles.explanatoryNoteOutOfStockSvg2FillColor, ...styles.explanatoryNoteOutOfStockSvg2StrokeColor }


    const headerClass = [
        classes.columnHeaderTextSize,
        classes.columnHeaderFontWeight,
    ].join(' ');
    const dayHeaderClass = [ 
        classes.columnDayHeaderCustomClass,
    ].join(' ');
    const dayHeaderStyle = { ...styles.columnDayHeaderBackgroundColor, ...styles.columnDayHeaderTextColor }


    const departureHeaderClass = [ 
        classes.columnDepartureTimeHeaderCustomClass,
    ].join(' ');
    const departureHeaderStyle = { ...styles.columnDepartureTimeHeaderTextColor, ...styles.columnDepartureTimeHeaderBackgroundColor }

    const busStopHeaderClass = [ 
        classes.columnBusStopHeaderCustomClass,
    ].join(' ');
    const busStopHeaderStyle = { ...styles.columnBusStopHeaderTextColor, ...styles.columnBusStopHeaderBackgroundColor }

    const remainingSeatHeaderClass = [ 
        classes.columnRemainingSeatsHeaderCustomClass,
    ].join(' ');
    const remainingSeatHeaderStyle = { ...styles.columnRemainingSeatsHeaderTextColor, ...styles.columnRemainingSeatsHeaderBackgroundColor }

    const rowHeaderClass = [
        classes.rowHeaderTextSize,
        classes.rowHeaderFontWeight,
        classes.rowHeaderTextColor,
        classes.rowHeaderCustomClass,
    ].join(' ');

    const cellClass = [
        classes.cellsTextSize,
        classes.cellsFontWeight,
        classes.cellsTextColor,
        classes.cellsTextWrapCustomClass,
    ].join(' ');



    const date_format = (mappingDatetime) => {
        let d = new Date(mappingDatetime * 1000);
        let dayValue;
        if (d.getDay() == 0) {
            dayValue = "日"
        }
        else if (d.getDay() == 1) {
            dayValue = "月"
        }
        else if (d.getDay() == 2) {
            dayValue = "火"
        }
        else if (d.getDay() == 3) {
            dayValue = "水"
        }
        else if (d.getDay() == 4) {
            dayValue = "木"
        }
        else if (d.getDay() == 5) {
            dayValue = "金"
        }
        else if (d.getDay() == 6) {
            dayValue = "土"
        }
        return d.getMonth() + 1 + "/" + d.getDate() + "(" + dayValue + ")"
    };


    return (
        <>
            {eventSlotData && eventSlotData.length >= 1 &&
                <div className="w-full">
                    <div data-id="explanatoryNoteWrapCustomClass" className={`flex flex-row ${classes.explanatoryNoteWrapCustomClass}`}>
                        <div className="flex flex-row items-end">
                            <p className="align-text-bottom"><VacancyIcon icon1Class={classes.explanatoryNoteInStockSvg1Size} icon2Class={classes.explanatoryNoteInStockSvg2Size} svg1Style={explanatorySvg1InStockStyle} svg2Style={explanatorySvg2InStockStyle} svg1={explanatoryNoteInStockSvg1} svg2={explanatoryNoteInStockSvg2} /></p>
                            <p data-id="explanatoryNoteClass_instock" className={`${explanatoryNoteClass}`} style={explanatoryNoteStyle}>{explanatoryNoteInStockText}</p>
                        </div>
                        <div className="flex flex-row items-end">
                            <p className="align-text-bottom"><FewIcon icon1Class={classes.explanatoryNoteLowStockSvg1Size} icon2Class={classes.explanatoryNoteLowStockSvg2Size} svg1Style={explanatorySvg1LowStockStyle} svg2Style={explanatorySvg2LowStockStyle} svg1={explanatoryNoteLowStockSvg1} svg2={explanatoryNoteLowStockSvg2} /></p>
                            <p data-id="explanatoryNoteClass_lowstock" className={`${explanatoryNoteClass}`} style={explanatoryNoteStyle}>{explanatoryNoteLowStockText}</p>
                        </div>
                        <div className="flex flex-row items-end">
                            <p className="align-text-bottom"><FullIcon icon1Class={classes.explanatoryNoteOutOfStockSvg1Size} icon2Class={classes.explanatoryNoteOutOfStockSvg2Size} svg1Style={explanatorySvg1OutStockStyle} svg2Style={explanatorySvg2OutStockStyle} svg1={explanatoryNoteOutOfStockSvg1} svg2={explanatoryNoteOutOfStockSvg2} /></p>
                            <p data-id="explanatoryNoteClass_outstock" className={`${explanatoryNoteClass}`} style={explanatoryNoteStyle}>{explanatoryNoteOutOfStockText}</p>
                        </div>
                    </div>

                    <div class="grid grid-flow-row auto-rows-max  divide-gray-200 border">
                        <div class="grid grid-cols-6 divide-y divide-x divide-gray-200">
                            <div data-id="headerClass_dayHeaderClass" id="headExaminationDay" className={`text-center ${headerClass} ${dayHeaderClass}`} style={dayHeaderStyle}>{columnDayHeaderText}</div>
                            <div data-id="headerClass_departureHeaderClass" id="headDepartureTime" className={`text-center ${headerClass} ${departureHeaderClass}`} style={departureHeaderStyle}>{columnDepartureTimeHeaderText}</div>
                            <div data-id="headerClass_busStopHeaderClass" id="headBusStop" className={`text-center col-span-3 ${headerClass} ${busStopHeaderClass}`} style={busStopHeaderStyle}>{columnBusStopHeaderText}</div>
                            <div data-id="headerClass_remainingSeatHeaderClass" id="headSeatAvailability" className={`text-center ${headerClass} ${remainingSeatHeaderClass}`} style={remainingSeatHeaderStyle}>{columnRemainingSeatsHeaderText}</div>


                            {eventSlotData.map((data) => (
                                (() => {
                                    let displayDate = data.mappingDatetime
                                    let busDisplayTime = data.busTime
                                    let numberOfRemaining = data.maxReservationCount - data.reservationCount

                                    let bgcolorCells = styles.rowBackgroundColorOdd;
                                    if ((data.groupId % 2) == 0) {
                                        bgcolorCells = styles.rowBackgroundColorEven;
                                    }

                                    if (data.rowspanCount == 0) {
                                        return (
                                            <>
                                                <div className={`grid place-content-center ${rowHeaderClass}`} style={bgcolorCells}>{busDisplayTime}</div>
                                                <div className={`col-span-3 grid place-content-center ${rowHeaderClass}`} style={bgcolorCells}>{data.busStopName}({data.busStopAddress})</div>

                                                {numberOfRemaining >= 3
                                                    ? <div className={`grid place-content-center cursor-pointer ${classes.cellsAllWrapCustomClass}`} style={bgcolorCells}>
                                                        <VacancyIcon icon1Class={classes.cellInStockSvg1Size} icon2Class={classes.cellInStockSvg2Size} iconWrapClass={classes.cellsIconWrapCustomClass} svg1Style={explanatorySvg1InStockStyle} svg2Style={explanatorySvg2InStockStyle} svg1={explanatoryNoteInStockSvg1} svg2={explanatoryNoteInStockSvg2} />
                                                        <p data-id="cellClass_cellsTextWrapCustomClass" className={`${cellClass}`}>{cellsLeftText + cellsCenterText}{numberOfRemaining}</p>
                                                    </div>
                                                    : numberOfRemaining == 0
                                                        ? <div className={`grid place-content-center cursor-pointer ${classes.cellsAllWrapCustomClass}`} style={bgcolorCells}>
                                                            <FullIcon icon1Class={classes.cellOutOfStockSvg1Size} icon2Class={classes.cellOutOfStockSvg2Size} iconWrapClass={classes.cellsIconWrapCustomClass} svg1Style={explanatorySvg1OutStockStyle} svg2Style={explanatorySvg2OutStockStyle} svg1={explanatoryNoteOutOfStockSvg1} svg2={explanatoryNoteOutOfStockSvg2} />
                                                            <p data-id="cellClass_cellsTextWrapCustomClass" className={`${cellClass}`}>{cellsLeftText + cellsCenterText}{numberOfRemaining}</p>
                                                        </div>
                                                        : <div className={`grid place-content-center cursor-pointer ${classes.cellsAllWrapCustomClass}`} style={bgcolorCells}>
                                                            <FewIcon icon1Class={classes.cellLowStockSvg1Size} icon2Class={classes.cellLowStockSvg2Size} iconWrapClass={classes.cellsIconWrapCustomClass} svg1Style={explanatorySvg1LowStockStyle} svg2Style={explanatorySvg2LowStockStyle} svg1={explanatoryNoteLowStockSvg1} svg2={explanatoryNoteLowStockSvg2} />
                                                            <p data-id="cellClass_cellsTextWrapCustomClass" className={`${cellClass}`}>{cellsLeftText + cellsCenterText}{numberOfRemaining}</p>
                                                        </div>
                                                }
                                            </>
                                        )
                                    }
                                    else {
                                        return (
                                            <>
                                                <div className={`row-span-${data.rowspanCount} text-center`} style={bgcolorCells}>
                                                    <p className={`h-full grid place-content-center ${rowHeaderClass}`}>{displayDate}</p>
                                                </div>
                                                <div className={`grid place-content-center ${rowHeaderClass}`} style={bgcolorCells}>{busDisplayTime}</div>
                                                <div className={`col-span-3 grid place-content-center ${rowHeaderClass}`} style={bgcolorCells}>{data.busStopName}({data.busStopAddress})</div>

                                                {numberOfRemaining >= 3
                                                    ? <div className={`grid place-content-center cursor-pointer  ${classes.cellsAllWrapCustomClass}`} style={bgcolorCells}>
                                                        <VacancyIcon icon1Class={classes.cellInStockSvg1Size} icon2Class={classes.cellInStockSvg2Size} iconWrapClass={classes.cellsIconWrapCustomClass} svg1Style={explanatorySvg1InStockStyle} svg2Style={explanatorySvg2InStockStyle} svg1={explanatoryNoteInStockSvg1} svg2={explanatoryNoteInStockSvg2} />
                                                        <p data-id="cellClass_cellsTextWrapCustomClass" className={`${cellClass}`}>{cellsLeftText + cellsCenterText}{numberOfRemaining}</p>
                                                    </div>
                                                    : numberOfRemaining == 0
                                                        ? <div className={`grid place-content-center cursor-pointer ${classes.cellsAllWrapCustomClass}`} style={bgcolorCells}>
                                                            <FullIcon icon1Class={classes.cellOutOfStockSvg1Size} icon2Class={classes.cellOutOfStockSvg2Size} iconWrapClass={classes.cellsIconWrapCustomClass} svg1Style={explanatorySvg1OutStockStyle} svg2Style={explanatorySvg2OutStockStyle} svg1={explanatoryNoteOutOfStockSvg1} svg2={explanatoryNoteOutOfStockSvg2} />
                                                            <p data-id="cellClass_cellsTextWrapCustomClass" className={`${cellClass}`}>{cellsLeftText + cellsCenterText}{numberOfRemaining}</p>
                                                        </div>
                                                        : <div className={`grid place-content-center cursor-pointer  ${classes.cellsAllWrapCustomClass}`} style={bgcolorCells}>
                                                            <FewIcon icon1Class={classes.cellLowStockSvg1Size} icon2Class={classes.cellLowStockSvg2Size} iconWrapClass={classes.cellsIconWrapCustomClass} svg1Style={explanatorySvg1LowStockStyle} svg2Style={explanatorySvg2LowStockStyle} svg1={explanatoryNoteLowStockSvg1} svg2={explanatoryNoteLowStockSvg2} />
                                                            <p data-id="cellClass_cellsTextWrapCustomClass" className={`${cellClass}`}>{cellsLeftText + cellsCenterText}{numberOfRemaining}</p>
                                                        </div>
                                                }
                                            </>
                                        )
                                    }
                                })()
                            ))}
                        </div>
                    </div>
                </div>

            }
        </>
    );
}