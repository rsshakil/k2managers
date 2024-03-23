import React from "react";
import ReactTooltip from "react-tooltip";
import useOverLayTooltips from "../../../hooks/useOverLayTooltips";

export default function BusWayListTr({ busRow }) {
  const { tid, tooltipEnabled, setTooltipEnabled, handleTooltip, navigate } =
    useOverLayTooltips();

  const timeFormat = (value) => {
    // console.log('============== value ======================');
    // console.log("value:", value);
    // console.log("value:", typeof (value));
    // console.log('============== value ======================');
    let value2 = "00:00";
    if (value) {
      if (value === "0" || value === null) { //  || value == "00" || value == "000" || value ||"0000"
        return "00:00"
      }
      // checking value is there or not fixed by linkon 11-10-22
      if (String(value).length === 3) {
        value2 =
          "0" + String(value.slice(0, 1)) + ":" + String(value.slice(-2));
      } else {
        value2 = String(value.slice(0, 2)) + ":" + String(value.slice(-2));
      }
      return value2;
    }
  };

  return (
    <>
      {tooltipEnabled && (
        <ReactTooltip
          id={tid}
          wrapper="span"
          place="bottom"
          type="dark"
          effect="solid"
        />
      )}
      <tr className="h-8 table-row-bg row-display text-left">
        {/* {console.log("Bus way row", busRow)} */}
        {
          // busRow?.busWayId ?
          //     <td className="min-w-[15.5rem] truncate max-w-[0] px-2 right-border text-right">
          //         {timeFormat(busRow?.busTime)}
          //         {/* {bus?.busTime} */}
          //     </td>
          //     :
          //     <td className="min-w-[15.5rem] truncate max-w-[0] px-2 right-border text-left"
          //         onMouseEnter={(e) => handleTooltip(e.target)}
          //         onMouseLeave={(e) => setTooltipEnabled(false)}
          //     >
          //         <span data-for={tid} data-tip={busRow?.busStopName}>{busRow?.busStopName} </span>
          //     </td>
        }
        {busRow &&
          busRow.map((bus, index2) =>
            bus?.busWayId ? (
              <td
                key={index2}
                className="min-w-[5rem] truncate max-w-[0] px-2 right-border text-right"
              >
                {timeFormat(bus?.busTime)}
                {/* {bus?.busTime} */}
              </td>
            ) : (
              <td
                key={index2}
                className="min-w-[5rem] truncate max-w-[0] px-2 right-border text-left"
                onMouseEnter={(e) => handleTooltip(e.target)}
                onMouseLeave={(e) => setTooltipEnabled(false)}
              >
                <span data-for={tid} data-tip={bus?.busStopName}>
                  {bus?.busStopName}{" "}
                </span>
              </td>
            )
          )}
      </tr>
    </>
  );
}
