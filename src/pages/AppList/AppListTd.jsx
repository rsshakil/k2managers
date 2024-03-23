import React from "react";
import { FaCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { PalatteIcon } from "../../components/CustomIcon/PalatteIcon";
import CustomToolTip from "../../components/Tooltip/CustomReactToolTips/CustomToolTip";

export default function AppListTd({ app }) {

  const navigate = useNavigate();

  // HELPER FUNCTION START
  function getDeployStatus(codeNumber = 0, isDeploy = false) {
    return codeNumber % 10 === 5 ? "失敗"
      : codeNumber === 100 ? "完了"
      : codeNumber >= 0 && codeNumber <= 99 ? (isDeploy ? "デプロイ中" : "構成中")
      : "";
  }
  
  function deployStructureFontColor(codeNumber = 0) {
    return codeNumber % 10 === 5 ? "text-orange-300" : "text-green-300";
  }
  // HELPER FUNCTION END

  return (
    <>

      <td
        className="min-w-[8rem] right-border pl-2 max-w-0 cell-text-link"
        onClick={() => navigate(`/app_edit/${app.appId}`)}
      >
        {/* <ReactTooltipSpan dataText={app?.appName}/> */}
        <CustomToolTip
          tooltipContent={
            <> {app.appName && app?.appName}</>} >
          {app.appName && app?.appName}
        </CustomToolTip>
      </td>
      <td
        className="w-[24rem] right-border pl-2 max-w-[24rem] cell-text-link"
      >
        <a
          href={`https://${app.appDomainName}`}
          target="_blank"
          rel="noreferrer"
        >
          {/* <ReactTooltipSpan dataText={app.appDomainName} /> */}
          <CustomToolTip
            tooltipContent={
              <> {app.appDomainName && app?.appDomainName}</>} >
            {app.appDomainName && app?.appDomainName}
          </CustomToolTip>
        </a>
      </td>
      <td
        className="min-w-[9rem] right-border text-left pl-2 max-w-0"
      >
        {/* <ReactTooltipSpan dataText={app?.eventName} /> */}
        <CustomToolTip
          tooltipContent={
            <> {app?.eventName && app?.eventName}</>} >
          {app?.eventName && app?.eventName}
        </CustomToolTip>
      </td>
      <td className="w-[7.25rem] right-border text-right px-2">
        {app?.accessCount & app.accessCount}
      </td>
      <td className="w-[6rem] right-border text-center">
        <span className={`${deployStructureFontColor(app?.appInitializeStatus)} flex justify-center`}>
          {/* <ReactTooltipSpan dataText={app.appInitializeStatus} /> */}
          <CustomToolTip
            tooltipContent={
              <> {app?.appInitializeStatus && getDeployStatus(app?.appInitializeStatus)}</>} >
            {app?.appInitializeStatus && getDeployStatus(app?.appInitializeStatus)}
          </CustomToolTip>
        </span>
      </td>
      <td className="w-[6rem] right-border text-center">
        <span className={`${deployStructureFontColor(app?.appDeployStatus)} flex justify-center`}>
          {/* <ReactTooltipSpan dataText={app.appDeployStatus} /> */}
          <CustomToolTip
            tooltipContent={
              <> {app?.appDeployStatus && getDeployStatus(app?.appDeployStatus, true)}</>} >
            {app?.appDeployStatus && getDeployStatus(app?.appDeployStatus, true)}
          </CustomToolTip>
        </span>
      </td>
      <td className="w-[6rem] right-border text-center">
        <span
          className={
            app?.appStatus && app.appStatus === 1
              ? "text-green-300 flex justify-center"
              : "text-orange-300 flex justify-center"
          }
        >
          <FaCircle />
        </span>
      </td>
      <td className="w-[6.375rem] right-border px-2 text-right">
        <span
          className={
            app?.appBasicFlag && app.appBasicFlag === 1
              ? "text-green-300 flex justify-center"
              : "text-orange-300 flex justify-center"
          }
        >
          <FaCircle />
        </span>
      </td>
      <td
        className={
          app?.appInitializeStatus === 100
            ? "w-[2.25rem] right-border px-2 text-right cursor-pointer"
            : "w-[2.25rem] right-border px-2 text-right cursor-default"
        }
      >
        {app?.appInitializeStatus === 100 ? (
          <Link
            className={"cursor-pointer"}
            to={`/app_designer/${app.appId}`}
            target="_blank"
          >
            <PalatteIcon disabledicon="0" />
          </Link>
        ) : (
          <Link
            className={"cursor-default"}
            onClick={(event) => event.preventDefault()}
            to={`/app_designer/${app.appId}`}
            target="_blank"
          >
            <PalatteIcon disabledicon="1" />
          </Link>
        )}

      </td>
    </>
  );
}
