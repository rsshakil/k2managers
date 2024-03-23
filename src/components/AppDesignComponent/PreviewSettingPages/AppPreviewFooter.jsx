import React from "react";
const AppPreviewFooter = ({ footerPageFrameData }) => {
    let corporationWrapCustomClass = footerPageFrameData?.classes?.corporationWrapCustomClass;
    let  telTimeWrapCustomClass = footerPageFrameData?.classes?.telTimeWrapCustomClass
    let copywriteWrapCustomClass = footerPageFrameData?.classes?.copyrightWrapCustomClass;

    return (
        <div className="flex flex-col">
            <div className={`${footerPageFrameData?.classes?.height} flex justify-center items-center`} style={{ backgroundColor: footerPageFrameData?.styles?.backgroundColor?.backgroundColor }}>
                <div className={`text-center ${footerPageFrameData?.classes?.customClass} text-sm`} style={{ color: footerPageFrameData?.styles?.textColor?.color }}>
                    <a href="#" className={`cursor-text ${corporationWrapCustomClass}`} onClick={(e) => e.preventDefault()}>{footerPageFrameData?.info?.corporationText}</a>
                    <div className={` flex items-center justify-center ${telTimeWrapCustomClass}`}>
                        {footerPageFrameData?.info?.tel && <p className="px-2">{footerPageFrameData?.info?.tel}</p>}
                        {footerPageFrameData?.info?.time && <p className="px-2">{footerPageFrameData?.info?.time}</p>}
                    </div>
                    {footerPageFrameData?.info?.copyright && <p className={`${copywriteWrapCustomClass}`}>{footerPageFrameData?.info?.copyright}</p>}
                </div>
            </div>
        </div>
    )
};
export default AppPreviewFooter