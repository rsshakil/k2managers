import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { appDesignerState, getSelectedPageData } from "../../../store/recoil/appDesignerState";

const PageFramePreview = () => {
    const [recoilStateValue, setRecoilState] = useRecoilState(appDesignerState);
    const { activeTab, activePageId, tabItems } = recoilStateValue;

    const { classes, styles } = recoilStateValue.tabItems.settings.appSettingQuery.informationAreaSttings;
    let prevPageFrameData = { ...classes, ...styles };

    const {
        infoType1TitleWrapCustomClass = "",
        infoType1BodyWrapCustomClass = "",
        infoType1BlockWrapCustomClass = "",
        infoType1BelowBlockTextSize = "text-base",
        infoType1BelowBlockFontWeight = "font-normal",
        infoType1BelowBlockWrapCustomClass = "",

        infoType2TitleWrapCustomClass = "",
        infoType2BodyWrapCustomClass = "",
        infoType2BlockWrapCustomClass = "",
        infoType2BelowBlockTextSize = "text-base",
        infoType2BelowBlockFontWeight = "font-normal",
        infoType2BelowBlockWrapCustomClass = "",

        infoType3TitleWrapCustomClass = "",
        infoType3BodyWrapCustomClass = "",
        infoType3BlockWrapCustomClass = "",
        infoType3BelowBlockTextSize = "text-base",
        infoType3BelowBlockFontWeight = "font-normal",
        infoType3BelowBlockWrapCustomClass = "",

        infoType4TitleWrapCustomClass = "",
        infoType4BodyWrapCustomClass = "",
        infoType4BlockWrapCustomClass = "",
        infoType4BelowBlockTextSize = "text-base",
        infoType4BelowBlockFontWeight = "font-normal",
        infoType4BelowBlockWrapCustomClass = "",

        infoType5TitleWrapCustomClass = "",
        infoType5BodyWrapCustomClass = "",
        infoType5BlockWrapCustomClass = "",
        infoType5BelowBlockTextSize = "text-base",
        infoType5BelowBlockFontWeight = "font-normal",
        infoType5BelowBlockWrapCustomClass = "",

    } = prevPageFrameData; 
    
    return (
        <>
            <label htmlFor="headerAreaShadow" className="text-blue-100">タイプ１</label>
            <div className={`whitespace-pre-line w-full flex justify-center items-center px-2 mb-2`}>
                <div className={`${prevPageFrameData?.infoType1CustomClass}  ${prevPageFrameData?.infoType1BorderWidth} ${prevPageFrameData?.infoType1BorderRadius} ${prevPageFrameData?.infoType1BorderStyle} ${prevPageFrameData?.infoType1DropShadow} px-4 py-3" role="alert`}
                    style={{ backgroundColor: prevPageFrameData?.infoType1BackgroundColor?.backgroundColor, borderColor: prevPageFrameData?.infoType1BorderColor?.borderColor }}
                >
                    <p className={`${prevPageFrameData?.infoType1TitleTextSize} ${prevPageFrameData?.infoType1TitleFontWeight} ${infoType1TitleWrapCustomClass}`}
                        style={{ color: prevPageFrameData?.infoType1TitleTextColor?.color }}
                    >タイトル</p>
                    <div className={`${prevPageFrameData?.infoType1BodyTextSize} ${prevPageFrameData?.infoType1BodyFontWeight} ${infoType1BodyWrapCustomClass}`}
                        style={{ color: prevPageFrameData?.infoType1BodyTextColor?.color }}
                    >
                        本文テキスト 本文テキスト 本文テキスト 本文テキスト 本文テキスト 本文テキスト 本文テキスト 本文テキスト 本文テキスト 本文テキスト 本文テキスト
                    </div>

                    <div className={`mt-5 ${infoType1BlockWrapCustomClass} ${infoType1BelowBlockTextSize} ${infoType1BelowBlockFontWeight} ${infoType1BelowBlockWrapCustomClass}`}
                         style={{ color: prevPageFrameData?.infoType1BelowBlockTextColor?.color }}
                    >
                        Block下テキスト Block下テキスト Block下テキスト Block下テキスト Block下テキスト
                    </div>
                </div>
            </div>

            <label htmlFor="headerAreaShadow" className="text-blue-100">タイプ２</label>
            <div className={`whitespace-pre-line  w-full flex justify-center items-center px-2 mb-2`}>
                <div className={`${prevPageFrameData?.infoType2CustomClass}  ${prevPageFrameData?.infoType2BorderWidth} ${prevPageFrameData?.infoType2BorderRadius} ${prevPageFrameData?.infoType2BorderStyle} ${prevPageFrameData?.infoType2DropShadow} px-4 py-3" role="alert`}
                    style={{ backgroundColor: prevPageFrameData?.infoType2BackgroundColor?.backgroundColor, borderColor: prevPageFrameData?.infoType2BorderColor?.borderColor }}
                >
                    <p className={`${prevPageFrameData?.infoType2TitleTextSize} ${prevPageFrameData?.infoType2TitleFontWeight} ${infoType2TitleWrapCustomClass}`}
                        style={{ color: prevPageFrameData?.infoType2TitleTextColor?.color }}
                    >タイトル</p>
                    <div className={`${prevPageFrameData?.infoType2BodyTextSize} ${prevPageFrameData?.infoType2BodyFontWeight} ${infoType2BodyWrapCustomClass}`}
                        style={{ color: prevPageFrameData?.infoType2BodyTextColor?.color }}
                    >
                        本文テキスト 本文テキスト 本文テキスト 本文テキスト 本文テキスト 本文テキスト 本文テキスト 本文テキスト 本文テキスト 本文テキスト 本文テキスト
                    </div>

                    <div className={`mt-5 ${infoType2BlockWrapCustomClass} ${infoType2BelowBlockTextSize} ${infoType2BelowBlockFontWeight} ${infoType2BelowBlockWrapCustomClass}`}
                         style={{ color: prevPageFrameData?.infoType2BelowBlockTextColor?.color }}
                    >
                        Block下テキスト Block下テキスト Block下テキスト Block下テキスト Block下テキスト
                    </div>
                </div>
            </div>

            <label htmlFor="headerAreaShadow" className="text-blue-100">タイプ３</label>
            <div className={`whitespace-pre-line w-full flex justify-center items-center px-2 mb-2`}>
                <div className={`${prevPageFrameData?.infoType3CustomClass}  ${prevPageFrameData?.infoType3BorderWidth} ${prevPageFrameData?.infoType3BorderRadius} ${prevPageFrameData?.infoType3BorderStyle} ${prevPageFrameData?.infoType3DropShadow} px-4 py-3" role="alert`}
                    style={{ backgroundColor: prevPageFrameData?.infoType3BackgroundColor?.backgroundColor, borderColor: prevPageFrameData?.infoType3BorderColor?.borderColor }}
                >
                    <p className={`${prevPageFrameData?.infoType3TitleTextSize} ${prevPageFrameData?.infoType3TitleFontWeight} ${infoType3TitleWrapCustomClass}`}
                        style={{ color: prevPageFrameData?.infoType3TitleTextColor?.color }}
                    >タイトル</p>
                    <div className={`${prevPageFrameData?.infoType3BodyTextSize} ${prevPageFrameData?.infoType3BodyFontWeight} ${infoType3BodyWrapCustomClass}`}
                        style={{ color: prevPageFrameData?.infoType3BodyTextColor?.color }}
                    >
                        本文テキスト 本文テキスト 本文テキスト 本文テキスト 本文テキスト 本文テキスト 本文テキスト 本文テキスト 本文テキスト 本文テキスト 本文テキスト
                    </div>

                    <div className={`mt-5 ${infoType3BlockWrapCustomClass} ${infoType3BelowBlockTextSize} ${infoType3BelowBlockFontWeight} ${infoType3BelowBlockWrapCustomClass}`}
                         style={{ color: prevPageFrameData?.infoType3BelowBlockTextColor?.color }}
                    >
                        Block下テキスト Block下テキスト Block下テキスト Block下テキスト Block下テキスト
                    </div>
                </div>
            </div>

            <label htmlFor="headerAreaShadow" className="text-blue-100">タイプ４</label>
            <div className={`whitespace-pre-line w-full flex justify-center items-center px-2 mb-2`}>
                <div className={`${prevPageFrameData?.infoType4CustomClass}  ${prevPageFrameData?.infoType4BorderWidth} ${prevPageFrameData?.infoType4BorderRadius} ${prevPageFrameData?.infoType4BorderStyle} ${prevPageFrameData?.infoType4DropShadow} px-4 py-3" role="alert`}
                    style={{ backgroundColor: prevPageFrameData?.infoType4BackgroundColor?.backgroundColor, borderColor: prevPageFrameData?.infoType4BorderColor?.borderColor }}
                >
                    <p className={`${prevPageFrameData?.infoType4TitleTextSize} ${prevPageFrameData?.infoType4TitleFontWeight} ${infoType4TitleWrapCustomClass}`}
                        style={{ color: prevPageFrameData?.infoType4TitleTextColor?.color }}
                    >タイトル</p>
                    <div className={`${prevPageFrameData?.infoType4BodyTextSize} ${prevPageFrameData?.infoType4BodyFontWeight} ${infoType4BodyWrapCustomClass}`}
                        style={{ color: prevPageFrameData?.infoType4BodyTextColor?.color }}
                    >
                        本文テキスト 本文テキスト 本文テキスト 本文テキスト 本文テキスト 本文テキスト 本文テキスト 本文テキスト 本文テキスト 本文テキスト 本文テキスト
                    </div>

                    <div className={`mt-5 ${infoType4BlockWrapCustomClass} ${infoType4BelowBlockTextSize} ${infoType4BelowBlockFontWeight} ${infoType4BelowBlockWrapCustomClass}`}
                         style={{ color: prevPageFrameData?.infoType4BelowBlockTextColor?.color }}
                    >
                        Block下テキスト Block下テキスト Block下テキスト Block下テキスト Block下テキスト
                    </div>
                </div>
            </div>


            <label htmlFor="headerAreaShadow" className="text-blue-100">タイプ５</label>
            <div className={`whitespace-pre-line  w-full flex justify-center items-center px-2`}>
                <div className={`${prevPageFrameData?.infoType5CustomClass}  ${prevPageFrameData?.infoType5BorderWidth} ${prevPageFrameData?.infoType5BorderRadius} ${prevPageFrameData?.infoType5BorderStyle} ${prevPageFrameData?.infoType5DropShadow} px-4 py-3" role="alert`}
                    style={{ backgroundColor: prevPageFrameData?.infoType5BackgroundColor?.backgroundColor, borderColor: prevPageFrameData?.infoType5BorderColor?.borderColor }}
                >
                    <p className={`${prevPageFrameData?.infoType5TitleTextSize} ${prevPageFrameData?.infoType5TitleFontWeight} ${infoType5TitleWrapCustomClass}`}
                        style={{ color: prevPageFrameData?.infoType5TitleTextColor?.color }}
                    >タイトル</p>
                    <div className={`${prevPageFrameData?.infoType5BodyTextSize} ${prevPageFrameData?.infoType5BodyFontWeight} ${infoType5BodyWrapCustomClass}`}
                        style={{ color: prevPageFrameData?.infoType5BodyTextColor?.color }}
                    >
                        本文テキスト 本文テキスト 本文テキスト 本文テキスト 本文テキスト 本文テキスト 本文テキスト 本文テキスト 本文テキスト 本文テキスト 本文テキスト
                    </div>

                    <div className={`mt-5  ${infoType5BlockWrapCustomClass} ${infoType5BelowBlockTextSize} ${infoType5BelowBlockFontWeight} ${infoType5BelowBlockWrapCustomClass}`}
                         style={{ color: prevPageFrameData?.infoType5BelowBlockTextColor?.color }}
                    >
                        Block下テキスト Block下テキスト Block下テキスト Block下テキスト Block下テキスト
                    </div>
                </div>
            </div>
        </>
    );
};
export default PageFramePreview
