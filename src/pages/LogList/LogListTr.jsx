import React from "react";
import { UnixTsToStringYYMMDD_HHMMSS } from "../../lib/unixTsToString";
import { TbListDetails } from "react-icons/tb";
import CustomToolTip from "../../components/Tooltip/CustomReactToolTips/CustomToolTip";

export default function LogListTr({ log, fetchLogDetails }) {

  return (
    <>
      <tr className="table-row-bg row-display text-left h-8">
        <td className="w-[11.25rem] right-border text-center px-2 ellipsis max-w-[11.25rem]">
        <CustomToolTip tooltipContent={<>{log.logDateTime && UnixTsToStringYYMMDD_HHMMSS(log.logDateTime)}</>}>
          {log.logDateTime && UnixTsToStringYYMMDD_HHMMSS(log.logDateTime)}
        </CustomToolTip>
        </td>
        <td
          className={`${log.accountId === "システム動作" ? "text-green-50" : ""
            } w-[16rem] right-border px-2 ellipsis max-w-[16rem]`}
        >
          <CustomToolTip tooltipContent={<>{log.accountId && log.accountId}</>}>
              {log.accountId && log.accountId}
          </CustomToolTip>
        </td>
        <td className="w-[11.25rem] right-border text-center px-2 ellipsis max-w-[11.25rem]">
        <CustomToolTip tooltipContent={<> {log.ipAddress && log.ipAddress}</>}>
        {log.ipAddress && log.ipAddress}
          </CustomToolTip>
        </td>
        <td
          className="min-w-[11.25rem] ellipsis right-border px-2 max-w-[0]"
        >
          <CustomToolTip tooltipContent={<>{log._target && log._target}</>}>
              {log._target && log._target}
          </CustomToolTip>
        </td>
        <td
          className="w-[11.25rem] right-border px-2 ellipsis max-w-[11.25rem]"
        >
        <CustomToolTip tooltipContent={<>{log._type && log._type}</>}>{log._type && log._type}</CustomToolTip>
        </td>
        <td
          className={`w-[11.25rem] right-border px-2 ellipsis max-w-[11.25rem] ${log._result === "失敗" && "text-orange-300"}`}
        >
        <CustomToolTip tooltipContent={<>{log._result && log._result}</>}>{log._result && log._result}</CustomToolTip>
        </td>
        <td className="w-[6rem] cursor-pointer" onClick={fetchLogDetails}>
          <TbListDetails className="text-blue-100 m-auto" />
        </td>
      </tr>
    </>
  );
}
