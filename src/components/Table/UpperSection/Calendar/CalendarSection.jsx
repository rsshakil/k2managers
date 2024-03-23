import { addDays, startOfDay } from 'date-fns'
import { getUnixTime } from 'date-fns/esm'
import React, { useContext, useEffect, useState } from 'react'
import { getEndDateUnixTime } from '../../../../lib/date'
import { UnixTsToStringYYMMDD } from '../../../../lib/unixTsToString'
import { DataManageContext } from '../../../../routes/Router'
import Calendar from '../../../Calendar/Calendar'
import CalendarInput from './CalendarInput'

const startDate = getUnixTime(addDays(startOfDay(new Date()), -120)) //4 month before starting at 12:00 am
const endDate = new Date().setHours(23, 59, 59, 999) //present day 11:59:59 pm
const initialDateRange = [
    {
        startDate: new Date(startDate * 1000),
        endDate: new Date(endDate),
        key: 'selection',
    },
]

const CalendarSection = ({ placeholder, start, end }) => {
    const [dataManage] = useContext(DataManageContext)
    const [showCalendar, setShowCalendar] = useState(false)
    const [placeholderDynamic, setPlaceholderDynamic] = useState(placeholder) // placeholder change
    const [dateRange, setDateRange] = useState(initialDateRange)
    const [onChangeDateRange, setOnChangeDateRange] = useState([])
    const [controlFunction, setControlFunction] = useState(true)
    const [isCloseClicked, setIsCloseClicked] = useState(false)
    const handleCalendarModal = (value) => setShowCalendar(value)

    useEffect(() => {
        const localStorageValue = JSON.parse(
            localStorage.getItem(
                `retained_${window.location.pathname.split('/').pop()}`
            )
        )

        if (localStorageValue) {
            const { [start]: startDate } = localStorageValue
            const { [end]: endDate } = localStorageValue
            if (startDate && endDate) {
                const sDateConvert = UnixTsToStringYYMMDD(startDate)
                const eDateConvert = UnixTsToStringYYMMDD(endDate)
                let totalDate = sDateConvert + '-' + eDateConvert

                setPlaceholderDynamic(totalDate)
                const existingDate = [
                    {
                        startDate: new Date(startDate * 1000),
                        endDate: new Date(endDate * 1000),
                        key: 'selection',
                    },
                ]
                setDateRange(existingDate)
            }
        }
    }, [end, start])

    const placeholderClick = () => {
        if (!isCloseClicked) {
            try {
                controlFunction &&
                    setControlFunction(controlFunction ? false : true)

                if (!controlFunction) {
                    const startDate = getUnixTime(
                        onChangeDateRange[0].startDate
                    )
                    const endDate = getEndDateUnixTime(
                        onChangeDateRange[0].endDate
                    ) //added next 23 hours 59 minutes and 59 sec
                    if (startDate && endDate) {
                        const { start, end } = dataManage
                        let dateSelected = dataManage.func
                        dateSelected({
                            startDate,
                            endDate,
                            startName: start,
                            endName: end,
                        })
                        const sDateConvert = UnixTsToStringYYMMDD(startDate)
                        const eDateConvert = UnixTsToStringYYMMDD(endDate)
                        let totalDate = sDateConvert + '-' + eDateConvert
                        setPlaceholderDynamic(totalDate)
                    }
                    setControlFunction(controlFunction ? false : true)
                }
            } catch (error) {
                console.log(error)
                console.log('Calendar date not close by selection')
            }
        } else {
            setPlaceholderDynamic(placeholder)
        }
    }

    return (
        <div className='relative cursor-pointer'>
            <CalendarInput
                handleCalendarModal={handleCalendarModal}
                showCalendar={showCalendar}
                placeholder={placeholderDynamic}
                placeholderClick={placeholderClick}
                setShowCalendar={setShowCalendar}
            />
            <div>
                {showCalendar && (
                    <Calendar
                        close={() => {
                            setShowCalendar(false)
                        }}
                        setPlaceholderDynamic={setPlaceholderDynamic}
                        dateRange={dateRange}
                        setDateRange={setDateRange}
                        placeholderClick={placeholderClick}
                        setOnChangeDateRange={setOnChangeDateRange}
                        setControlFunction={setControlFunction}
                        controlFunction={controlFunction}
                        placeholder={placeholder}
                        initialDateRange={initialDateRange}
                        setIsCloseClicked={setIsCloseClicked}
                    />
                )}
            </div>
        </div>
    )
}
export default CalendarSection
