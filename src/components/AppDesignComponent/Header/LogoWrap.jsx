import React from "react";
const LogoWrap = ({ headerPageFrameData }) => {
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
            <div className={`flex ${headerPageFrameData?.classes?.justifyContent} 
            ${headerPageFrameData?.classes?.logoWrapCustomClass} `} style={{width: "100%" }}>
            <a href={headerPageFrameData?.info?.linkUrl} target={headerPageFrameData?.info?.linkTargetBlank == true ? '_blank' : ''}>
                <img className={`object-contain ${headerPageFrameData?.classes?.imageCustomClass} ${removeSM(headerPageFrameData?.prefixClass?.sm?.imageHeight)} ${removeSM(headerPageFrameData?.prefixClass?.sm?.imageWidth)}
            `} src={headerPageFrameData?.info?.imageUrl} alt="" /></a>
            </div>
    );
};
export default LogoWrap
