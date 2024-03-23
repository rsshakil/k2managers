import React from 'react';
import { FaBus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import CustomToolTip from '../../components/Tooltip/CustomReactToolTips/CustomToolTip';
import ReactTooltipSpan from '../../components/Tooltip/ReactTooltipSpan';
import { UnixTsToString } from '../../lib/unixTsToString';

export default function BusRouteListTr({ bus }) {
    const navigate = useNavigate();

    const handleBusWay = (busRouteId, busRouteName) => {
        window.sessionStorage.setItem('busRouteName', busRouteName);
        navigate(`/bus_way_list/${busRouteId}`);
    };
    return (
        <>

            <tr className="h-8 table-row-bg row-display text-left">
                <td
                    className="min-w-[24.00rem] cursor-pointer underline truncate max-w-[24.00rem] text-blue-200 px-2 right-border text-left"
                    onClick={() => navigate(`/bus_route_edit/${bus.busRouteId}`)}

                >
                    {/* <ReactTooltipSpan dataText={bus.busRouteName && bus.busRouteName} /> */}
                    <CustomToolTip
                        tooltipContent={
                            <> {bus.busRouteName && bus.busRouteName}</>} >
                        {bus.busRouteName && bus.busRouteName}
                    </CustomToolTip>

                </td>
                <td className="min-w-[15.00rem] truncate max-w-[15.00rem] px-2 right-border text-left cursor-default">
                    <span>{bus.busRouteManageName && bus.busRouteManageName}</span>
                </td>
                <td className="w-[5.5rem] px-2  right-border text-right">
                    {bus.busServiceCount && bus.busServiceCount}
                </td>
                <td className="w-[10.375rem] px-2 right-border text-center">
                    {bus.updatedAt && UnixTsToString(bus.updatedAt)}
                </td>
                <td className="w-[10.375rem] right-border px-2 text-center">
                    {bus.createdAt && UnixTsToString(bus.createdAt)}
                </td>
                <td
                    className="w-[4rem] px-2 text-center cursor-pointer"
                    onClick={() => {
                        handleBusWay(bus.busRouteId, bus.busRouteName);
                        sessionStorage.setItem('busRouteId', bus.busRouteId); // Storing to fetch the data from add screen
                    }}
                >
                    <FaBus className="text-blue-100 ml-4" />
                </td>
            </tr>
        </>
    );
}
