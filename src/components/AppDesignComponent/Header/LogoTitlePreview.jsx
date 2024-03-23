import React from "react";

const LogoTitlePreview = ({ headerPageFrameData }) => {
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
        <>
            {(viewSettingData?.structure==3 || viewSettingData?.structure==4) &&
                <div className={`w-full flex  ${viewSettingData?.logoWrapCustomClass} ${viewSettingData?.justifyContent} ${viewSettingData?.structure==4?'flex-col-reverse':'flex-col'}`}  style={{width: "100%" }}>
                    <div className={`flex ${viewSettingData?.justifyContent}`}>
                        {viewSettingData?.imageUrl!='' && (<>
                        <a href={viewSettingData?.linkUrl} target={viewSettingData?.linkTargetBlank == true ? '_blank' : ''}>
                            <img className={`m-1 object-contain ${viewSettingData?.imageCustomClass} ${removeSM(viewSettingData?.sm?.imageHeight)} ${removeSM(viewSettingData?.sm?.imageWidth)}
                    `} src={viewSettingData?.imageUrl} alt="" /></a>
                    </>)}
                    </div>
                    <div className={`w-full flex ${viewSettingData?.textCustomClass} ${removeSM(viewSettingData?.sm?.textAlign)} ${removeSM(viewSettingData?.sm?.verticalAlign)}`} style={{width: "100%" }}>
                        <h1 className={`whitespace-pre underline ${viewSettingData?.textCustomClass} ${removeSM(viewSettingData?.sm?.textSize)}  ${removeSM(viewSettingData?.sm?.textWeight)}  ${removeSM(viewSettingData?.sm?.letterSpacing)} `} style={{color:viewSettingData?.textColor?.color,width:"100%"}}>{viewSettingData?.text}</h1>
                    </div>
                </div>
               
            }  
            {(viewSettingData?.structure==5 || viewSettingData?.structure==6) &&
                <div className={`w-full flex  ${viewSettingData?.logoWrapCustomClass}  ${viewSettingData?.justifyContent} ${viewSettingData?.structure==5?'flex-row-reverse':'flex-row'}`} style={{width: "100%" }}>
                    <div className={`flex  ${viewSettingData?.justifyContent}`}>
                    {viewSettingData?.imageUrl!='' && (<>
                        <a href={viewSettingData?.linkUrl} target={viewSettingData?.linkTargetBlank == true ? '_blank' : ''}>
                            <img className={`m-1 object-contain ${viewSettingData?.imageCustomClass} ${removeSM(viewSettingData?.sm?.imageHeight)} ${removeSM(viewSettingData?.sm?.imageWidth)}
                    `} src={viewSettingData?.imageUrl} alt="" /></a>
                     </>)}
                    </div>
                    <div className={`w-full flex ${viewSettingData?.textCustomClass} ${removeSM(viewSettingData?.sm?.textAlign)} ${removeSM(viewSettingData?.sm?.verticalAlign)}`} style={{width: "100%" }}>
                        <h1 className={`whitespace-pre underline ${viewSettingData?.textCustomClass} ${removeSM(viewSettingData?.sm?.textSize)}  ${removeSM(viewSettingData?.sm?.textWeight)}  ${removeSM(viewSettingData?.sm?.letterSpacing)} `} style={{color:viewSettingData?.textColor?.color, width:"100%"}}>{viewSettingData?.text}</h1>
                    </div>
                </div>
               
            }  
        </>    
    );
};
export default LogoTitlePreview
