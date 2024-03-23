import React from "react";

const TitleWrap = ({ headerPageFrameData }) => {
    const { classes, styles, info, prefixClass} = headerPageFrameData || '';
    let viewSettingData = { ...classes, ...styles, ...info, ...prefixClass };
    function removeSM(str) {
        if (typeof str != "undefined") {
            if (str.includes("sm:")) {
                let arr = str.split(':');
                return arr[1];
            } else {
                return str;
            }
        }
    }
    return (
        <div className={`w-full flex flex-col flex-wrap
        ${removeSM(viewSettingData?.sm?.textAlign)} ${viewSettingData?.logoWrapCustomClass}
        ${removeSM(viewSettingData?.sm?.verticalAlign)}
        `} style={{width: "100%" }}>
            <h1 className={`whitespace-pre underline ${viewSettingData?.textCustomClass}
            ${removeSM(viewSettingData?.sm?.textSize)} 
            ${removeSM(viewSettingData?.sm?.textWeight)} 
            ${removeSM(viewSettingData?.sm?.letterSpacing)}
           `} style={{color:viewSettingData?.textColor?.color, width:"100%"}}>{viewSettingData?.text}</h1>
        </div>
    );
};
export default TitleWrap
