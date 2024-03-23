import React from 'react';
import { MdDateRange } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import CustomToolTip from '../../components/Tooltip/CustomReactToolTips/CustomToolTip';
import { UnixTsToString } from '../../lib/unixTsToString';

export default function EventListTd({ info: { event, role, handleIconClick } }) {
    const navigate = useNavigate();
    return (
        <>
            <td className="w-[100px] right-border px-2 text-right">{event.eventId && event.eventId}</td>
            {role.r4 == 1 && (
                <td
                    className="min-w-[200px] right-border cursor-pointer underline text-blue-200 pl-2 max-w-0"
                    onClick={() => navigate(`/event_edit/${event.eventId}`)}
                >
                    <CustomToolTip tooltipContent={<> {event?.eventName} </>}>{event?.eventName}</CustomToolTip>
                </td>
            )}
            {role.r4 == 2 && (
                <td className="min-w-[200px] right-border pl-2 max-w-0">
                    <CustomToolTip tooltipContent={<> {event?.eventName} </>}>{event?.eventName}</CustomToolTip>
                </td>
            )}
            <td className="w-[166px] text-center right-border px-2">
                {event.eventStartDate && UnixTsToString(event.eventStartDate)}
            </td>
            <td className="w-[166px] text-center right-border px-2 ">
                {event.eventEndDate && UnixTsToString(event.eventEndDate)}
            </td>
            {role.r5 >= 1 && (
                <td className="w-[2rem] right-border">
                    {event.eventName && (
                        <MdDateRange
                            className="h-[24px] w-[24px] ml-[3px] text-blue-100 hover:text-blue-50 cursor-pointer"
                            onClick={() => handleIconClick(event.eventId, event.eventName)}
                        />
                    )}
                </td>
            )}
            <td className="min-w-[200px] right-border px-2 max-w-0">
                <CustomToolTip tooltipContent={<> {event?.appName} </>}>{event?.appName}</CustomToolTip>
            </td>
            <td className="min-w-[200px] right-border px-2 max-w-0">
                <CustomToolTip tooltipContent={<> {event?.categoryName} </>}>{event?.categoryName}</CustomToolTip>
            </td>
            <td className="w-[100px] right-border px-2 text-right">{event.loginUserCount && event.loginUserCount}</td>
            <td className="w-[100px] right-border px-2 text-right">
                {event.reservationUserCount && event.reservationUserCount}
            </td>
            <td className="w-[100px] right-border px-2 text-right">{event.cancelUserCount && event.cancelUserCount}</td>
        </>
    );
}
