import React from "react";
import { useNavigate } from "react-router-dom";
import CustomToolTip from "../../components/Tooltip/CustomReactToolTips/CustomToolTip";
import { UnixTsToString } from "../../lib/unixTsToString";

export default function InstituteListTr({ institute }) {

  const navigate = useNavigate()

  function numberWithHiphen(x, l) {
    // x type string
    return checkNumberLength(x, l)
      ? x.toString().replace(/\B(?=(\d{4})+(?!\d))/g, "-")
      : null;
  }
  function checkNumberLength(number, length) {
    return number && number.length <= length ? number : null;
  }
  return (
    <>
      {
        // Updated Tooltips by Lin kon 10/2/22
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
          className="w-[14.75rem] cursor-pointer underline truncate max-w-[14.75rem] text-blue-200 px-2 right-border text-left"
          onClick={() => navigate(`/institute_edit/${institute.instituteId}`)}
        // onMouseEnter={(e) => handleTooltip(e.target)}
        // onMouseLeave={(e) => setTooltipEnabled(false)}
        >
          <CustomToolTip
            tooltipContent={
              <> {institute?.instituteName}</>} >
            {institute?.instituteName}
          </CustomToolTip>
          {/* <ReactTooltipSpan dataText={institute.instituteName} /> */}
        </td>
        <td className="w-[14.75rem] max-w-[14.75rem] right-border px-2 text-left cursor-default truncate">
          {/* <ReactTooltipSpan dataText={institute.instituteManageName} /> */}
          {/* {institute.instituteManageName} */}
          <CustomToolTip
            tooltipContent={
              <> {institute?.instituteManageName}</>} >
            {institute?.instituteManageName}
          </CustomToolTip>
        </td>
        <td className="w-[6.5rem] px-2 right-border text-center">
          {numberWithHiphen(institute.instituteZipCode, 8)}
        </td>
        <td
          className="min-w-[21.75rem] truncate max-w-[0] px-2 right-border text-left"
        // onMouseEnter={(e) => handleTooltip(e.target)}
        // onMouseLeave={(e) => setTooltipEnabled(false)}
        >
          {/* <ReactTooltipSpan 
          dataText={`${institute.institutePrefecture}${institute.instituteCityName}${institute.instituteTownName}${institute.instituteAddressName}${institute.instituteBuilding}`} /> */}
          <CustomToolTip
            tooltipContent={
              <>{`${institute.institutePrefecture}${institute.instituteCityName}${institute.instituteTownName}${institute.instituteAddressName}${institute.instituteBuilding}`}</>} >
            {`${institute.institutePrefecture}${institute.instituteCityName}${institute.instituteTownName}${institute.instituteAddressName}${institute.instituteBuilding}`}
          </CustomToolTip>
        </td>
        <td className="w-[9rem] right-border px-2 text-center">
          {institute.instituteTelNo}
        </td>
        <td className="w-[10.375rem] px-2 right-border cursor-default text-center">
          {institute.updatedAt && UnixTsToString(institute.updatedAt)}
        </td>
        <td className="w-[10.375rem] right-border px-2 cursor-default text-center">
          {institute.createdAt && UnixTsToString(institute.createdAt)}
        </td>
      </tr>
    </>
  );
}
