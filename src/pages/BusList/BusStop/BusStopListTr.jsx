import React from "react";
import { useNavigate } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import CustomToolTip from "../../../components/Tooltip/CustomReactToolTips/CustomToolTip";
import ReactTooltipSpan from "../../../components/Tooltip/ReactTooltipSpan";
import useOverLayTooltips from "../../../hooks/useOverLayTooltips";
import { UnixTsToString } from "../../../lib/unixTsToString";

export default function BusStopListTr({ bus }) {
  // TODO: Remove this if not using 
  // const { tid, tooltipEnabled, setTooltipEnabled, handleTooltip, navigate } =
  //   useOverLayTooltips();
  const navigate = useNavigate()
  return (
    <>
      {
        // TODO: Remove this if not using 
        // tooltipEnabled && (
        //   <ReactTooltip
        //     id={tid}
        //     wrapper="span"
        //     place="bottom"
        //     type="dark"
        //     effect="solid"
        //   />
        // )
      }

      <tr className="h-8 table-row-bg row-display text-left">
        <td
          className="min-w-[12.25rem] px-2 truncate cursor-pointer underline text-blue-200 max-w-[12.25rem] right-border text-left "
          onClick={() => navigate(`/bus_stop_edit/${bus.busStopId}`)}
        // onMouseEnter={(e) => handleTooltip(e.target)}
        // onMouseLeave={(e) => setTooltipEnabled(false)}
        >
          {/* <ReactTooltipSpan dataText={bus.busStopName && bus.busStopName} /> */}
          <CustomToolTip
            tooltipContent={
              <>{bus.busStopName && bus.busStopName}</>} >
            {bus.busStopName && bus.busStopName}
          </CustomToolTip>
        </td>
        <td
          className="min-w-[12.25rem] px-2 truncate max-w-[12.25rem] right-border text-left cursor-default"
        >
          {/* <ReactTooltipSpan dataText={bus.busStopManageName && bus.busStopManageName} /> */}
          <CustomToolTip
            tooltipContent={
              <>{bus.busStopManageName && bus.busStopManageName} </>} >
            {bus.busStopManageName && bus.busStopManageName}
          </CustomToolTip>
        </td>
        <td
          className="min-w-[21rem] px-2 truncate max-w-[0] right-border text-left"
        // onMouseEnter={(e) => handleTooltip(e.target)}
        // onMouseLeave={(e) => setTooltipEnabled(false)}
        >
          {/* <ReactTooltipSpan dataText={bus.busStopAddress && bus.busStopAddress} /> */}
          <CustomToolTip
            tooltipContent={
              <>{bus.busStopAddress && bus.busStopAddress} </>} >
            {bus.busStopAddress && bus.busStopAddress}
          </CustomToolTip>
        </td>
        <td className="w-[10.375rem] px-2 right-border text-center">
          {bus.updatedAt && UnixTsToString(bus.updatedAt)}
        </td>
        <td className="w-[10.375rem] right-border px-2 text-center">
          {bus.createdAt && UnixTsToString(bus.createdAt)}
        </td>
      </tr>
    </>
  );
}
