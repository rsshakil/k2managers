import { format } from 'date-fns';
const export16Store = {};

export16Store.storeDateLS = ({
    selectedDate,
    setRecords,
    path,
    receptionDatetimeFrom = '',
    receptionDatetimeTo = '',
    calendarData,
    eventInstituteId,
    initialCalendarData = null,
}) => {
    if (window.sessionStorage.getItem(`${path}_${eventInstituteId}_timestamp_16MonthsCalendar`) === null) {
        // Only set First time render not every time
        window.sessionStorage.setItem(
            `${path}_${eventInstituteId}_timestamp_16MonthsCalendar`,
            JSON.stringify(calendarData)
        );
    } else if (initialCalendarData !== null) {
        window.sessionStorage.setItem(
            `${path}_${eventInstituteId}_timestamp_16MonthsCalendar`,
            JSON.stringify(initialCalendarData)
        );
    } else {
        const selectedYear = selectedDate && format(selectedDate, 'y'),
            selectedMonth = selectedDate && format(selectedDate, 'MM'),
            selectedDay = selectedDate && format(selectedDate, 'dd'),
            getDateLS = JSON.parse(
                window.sessionStorage.getItem(`${path}_${eventInstituteId}_timestamp_16MonthsCalendar`)
            );
        getDateLS && setRecords(getDateLS);

        let eventInstituteReserveFrom = getDateLS.eventInstitute.info.eventInstituteReserveFrom;
        let eventInstituteReserveTo = getDateLS.eventInstitute.info.eventInstituteReserveTo;
        let eventReceptionDatetimeFrom;
        let eventReceptionDatetimeTo;

        try {
            const yearWiseDate = getDateLS && getDateLS.eventInstitute?.[selectedYear];
            if (yearWiseDate !== undefined || yearWiseDate) {
                let monthWiseDate = yearWiseDate[selectedMonth];
                if (monthWiseDate !== undefined || monthWiseDate) {
                    const selectDayIndex = monthWiseDate.findIndex(
                        (itemDate) =>
                            format(new Date(itemDate.startDate), 'y') === selectedYear &&
                            format(new Date(itemDate.startDate), 'MM') === selectedMonth &&
                            format(new Date(itemDate.startDate), 'dd') === selectedDay
                    );

                    if (selectDayIndex !== -1) {
                        if (receptionDatetimeFrom === '' && receptionDatetimeTo === '') {
                            monthWiseDate.splice(selectDayIndex, 1);
                        } else {
                            if (receptionDatetimeFrom != '') {
                                eventReceptionDatetimeFrom = receptionDatetimeFrom;
                            } else {
                                eventReceptionDatetimeFrom = new Date(
                                    (selectedDate?.getTime() / 1000 - eventInstituteReserveFrom) * 1000
                                );
                            }
                            if (receptionDatetimeTo != '') {
                                eventReceptionDatetimeTo = receptionDatetimeTo;
                            } else {
                                eventReceptionDatetimeTo = new Date(
                                    (selectedDate?.getTime() / 1000 - eventInstituteReserveTo) * 1000
                                );
                            }

                            // Updated reservation date over selectedDate
                            monthWiseDate[selectDayIndex] = {
                                startDate: `${selectedDate}`,
                                endDate: `${selectedDate}`,
                                resStartDate: `${eventReceptionDatetimeFrom}`,
                                resEndDate: `${eventReceptionDatetimeTo}`,
                            };
                        }
                    } else {
                        if (receptionDatetimeFrom != '') {
                            eventReceptionDatetimeFrom = receptionDatetimeFrom;
                        } else {
                            eventReceptionDatetimeFrom = new Date(
                                (selectedDate?.getTime() / 1000 - eventInstituteReserveFrom) * 1000
                            );
                        }
                        if (receptionDatetimeTo != '') {
                            eventReceptionDatetimeTo = receptionDatetimeTo;
                        } else {
                            eventReceptionDatetimeTo = new Date(
                                (selectedDate?.getTime() / 1000 - eventInstituteReserveTo) * 1000
                            );
                        }

                        monthWiseDate.push({
                            startDate: `${selectedDate}`,
                            endDate: `${selectedDate}`,
                            resStartDate: `${eventReceptionDatetimeFrom}`,
                            resEndDate: `${eventReceptionDatetimeTo}`,
                        });
                    }

                    window.sessionStorage.setItem(
                        `${path}_${eventInstituteId}_timestamp_16MonthsCalendar`,
                        JSON.stringify(getDateLS)
                    );
                }
                if (monthWiseDate === undefined && selectedMonth !== '') {
                    eventReceptionDatetimeFrom = new Date(
                        (selectedDate?.getTime() / 1000 - eventInstituteReserveFrom) * 1000
                    );
                    eventReceptionDatetimeTo = new Date(
                        (selectedDate?.getTime() / 1000 - eventInstituteReserveTo) * 1000
                    );
                    // Month Not in Storage
                    getDateLS.eventInstitute[selectedYear] = {
                        ...getDateLS.eventInstitute[selectedYear],
                        [selectedMonth]: [
                            {
                                startDate: `${selectedDate}`,
                                endDate: `${selectedDate}`,
                                resStartDate: `${eventReceptionDatetimeFrom}`,
                                resEndDate: `${eventReceptionDatetimeTo}`,
                            },
                        ],
                    };

                    window.sessionStorage.setItem(
                        `${path}_${eventInstituteId}_timestamp_16MonthsCalendar`,
                        JSON.stringify(getDateLS)
                    );
                }
            }
            if (yearWiseDate === undefined && selectedMonth !== '') {
                eventReceptionDatetimeFrom = new Date(
                    (selectedDate?.getTime() / 1000 - eventInstituteReserveFrom) * 1000
                );
                eventReceptionDatetimeTo = new Date((selectedDate?.getTime() / 1000 - eventInstituteReserveTo) * 1000);

                // Year Not in Storage
                getDateLS.eventInstitute[selectedYear] = {
                    [selectedMonth]: [
                        {
                            startDate: `${selectedDate}`,
                            endDate: `${selectedDate}`,
                            resStartDate: `${eventReceptionDatetimeFrom}`,
                            resEndDate: `${eventReceptionDatetimeTo}`,
                        },
                    ],
                };

                window.sessionStorage.setItem(
                    `${path}_${eventInstituteId}_timestamp_16MonthsCalendar`,
                    JSON.stringify(getDateLS)
                );
            }
        } catch (e) {
            console.log('NO Data in LS < getDateLS >', e.message);
        }
    }
    setRecords(JSON.parse(window.sessionStorage.getItem(`${path}_${eventInstituteId}_timestamp_16MonthsCalendar`)));
};

export16Store.getReceptionStartData = ({ selectedDate, path, eventInstituteId }) => {
    if (window.sessionStorage.getItem(`${path}_${eventInstituteId}_timestamp_16MonthsCalendar`) === null) {
        return null;
    } else {
        let retunDate;
        const selectedYear = selectedDate && format(selectedDate, 'y'),
            selectedMonth = selectedDate && format(selectedDate, 'MM'),
            selectedDay = selectedDate && format(selectedDate, 'dd'),
            getDateLS = JSON.parse(
                window.sessionStorage.getItem(`${path}_${eventInstituteId}_timestamp_16MonthsCalendar`)
            );
        const selectDayIndex = getDateLS.eventInstitute?.[selectedYear][selectedMonth].findIndex(
            (itemDate) =>
                format(new Date(itemDate.startDate), 'y') === selectedYear &&
                format(new Date(itemDate.startDate), 'MM') === selectedMonth &&
                format(new Date(itemDate.startDate), 'dd') === selectedDay
        );
        if (selectDayIndex !== -1) {
            retunDate = getDateLS.eventInstitute?.[selectedYear][selectedMonth][selectDayIndex].resStartDate;
        } else {
            let eventInstituteReserveFrom = getDateLS.eventInstitute.info.eventInstituteReserveFrom;
            retunDate = new Date((selectedDate.getTime() / 1000 - eventInstituteReserveFrom) * 1000);
        }
        return retunDate;
    }
};

export16Store.getReceptionEndData = ({ selectedDate, path, eventInstituteId }) => {
    if (window.sessionStorage.getItem(`${path}_${eventInstituteId}_timestamp_16MonthsCalendar`) === null) {
        return null;
    } else {
        let retunDate;
        const selectedYear = selectedDate && format(selectedDate, 'y'),
            selectedMonth = selectedDate && format(selectedDate, 'MM'),
            selectedDay = selectedDate && format(selectedDate, 'dd'),
            getDateLS = JSON.parse(
                window.sessionStorage.getItem(`${path}_${eventInstituteId}_timestamp_16MonthsCalendar`)
            );
        const selectDayIndex = getDateLS.eventInstitute?.[selectedYear][selectedMonth].findIndex(
            (itemDate) =>
                format(new Date(itemDate.startDate), 'y') === selectedYear &&
                format(new Date(itemDate.startDate), 'MM') === selectedMonth &&
                format(new Date(itemDate.startDate), 'dd') === selectedDay
        );
        if (selectDayIndex !== -1) {
            retunDate = getDateLS.eventInstitute?.[selectedYear][selectedMonth][selectDayIndex].resEndDate;
        } else {
            let eventInstituteReserveTo = getDateLS.eventInstitute.info.eventInstituteReserveTo;
            retunDate = new Date((selectedDate.getTime() / 1000 - eventInstituteReserveTo) * 1000);
        }
        return retunDate;
    }
};

export default export16Store;
