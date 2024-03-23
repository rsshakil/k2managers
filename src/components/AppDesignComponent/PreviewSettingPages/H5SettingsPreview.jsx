import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { appDesignerState, getSelectedPageData } from "../../../store/recoil/appDesignerState";

const H5SettingsPreview = () => {
    const [recoilStateValue, setRecoilState] = useRecoilState(appDesignerState);
    const { activeTab, activePageId, tabItems } = recoilStateValue;
    let viewSettingData = recoilStateValue.tabItems.settings.appSettingQuery.h5Settings;
    return (
        <div className={`w-full flex px-8`}>
            <h5 className={`
                ${viewSettingData?.customClass}
                bg-[${viewSettingData?.backgroundColor}]
                border-[${viewSettingData?.borderColor}]
                text-[${viewSettingData?.textColor}]   
                ${viewSettingData?.textAlign} sm:${viewSettingData?.textAlignSm} md:${viewSettingData?.textAlignMd} lg:${viewSettingData?.textAlignLg} xl:${viewSettingData?.textAlignXl} 2xl:${viewSettingData?.textAlign2xl}
                ${viewSettingData?.verticalAlign} sm:${viewSettingData?.verticalAlignSm} md:${viewSettingData?.verticalAlignMd} lg:${viewSettingData?.verticalAlignLg} xl:${viewSettingData?.verticalAlignXl} 2xl:${viewSettingData?.verticalAlign2xl} 
                ${viewSettingData?.textSize} sm:${viewSettingData?.textSizeSm} md:${viewSettingData?.textSizeMd} lg:${viewSettingData?.textSizeLg} xl:${viewSettingData?.textSizeXl} 2xl:${viewSettingData?.textSize2Xl}
                ${viewSettingData?.textWeight} sm:${viewSettingData?.textWeightSm} md:${viewSettingData?.textWeightMd} lg:${viewSettingData?.textWeightLg} xl:${viewSettingData?.textWeightXl} 2xl:${viewSettingData?.textWeight2Xl}
                ${viewSettingData?.letterSpacing} sm:${viewSettingData?.letterSpacingSm} md:${viewSettingData?.letterSpacingMd} lg:${viewSettingData?.letterSpacingLg} xl:${viewSettingData?.letterSpacingXl} 2xl:${viewSettingData?.letterSpacing2Xl}
                ${viewSettingData?.paddingX} sm:${viewSettingData?.paddingXSm} md:${viewSettingData?.paddingXMd} lg:${viewSettingData?.paddingXLg} xl:${viewSettingData?.paddingXXl} 2xl:${viewSettingData?.paddingX2Xl}
                ${viewSettingData?.paddingY} sm:${viewSettingData?.paddingYSm} md:${viewSettingData?.paddingYMd} lg:${viewSettingData?.paddingYLg} xl:${viewSettingData?.paddingYXl} 2xl:${viewSettingData?.paddingY2Xl}
                ${viewSettingData?.borderRadius} sm:${viewSettingData?.borderRadiusSm} md:${viewSettingData?.borderRadiusMd} lg:${viewSettingData?.borderRadiusLg} xl:${viewSettingData?.borderRadiusXl} 2xl:${viewSettingData?.borderRadius2Xl}
                ${viewSettingData?.borderWidth} sm:${viewSettingData?.borderWidthSm} md:${viewSettingData?.borderWidthMd} lg:${viewSettingData?.borderWidthLg} xl:${viewSettingData?.borderWidthXl} 2xl:${viewSettingData?.borderWidth2Xl}
                ${viewSettingData?.borderStyle} sm:${viewSettingData?.borderStyleSm} md:${viewSettingData?.borderStyleMd} lg:${viewSettingData?.borderStyleLg} xl:${viewSettingData?.borderStyleXl} 2xl:${viewSettingData?.borderStyle2Xl}
                ${viewSettingData?.dropShadow} sm:${viewSettingData?.dropShadowSm} md:${viewSettingData?.dropShadowMd} lg:${viewSettingData?.dropShadowLg} xl:${viewSettingData?.dropShadowXl} 2xl:${viewSettingData?.dropShadow2Xl}
                ${viewSettingData?.height} sm:${viewSettingData?.heightSm} md:${viewSettingData?.heightMd} lg:${viewSettingData?.heightLg} xl:${viewSettingData?.heightXl} 2xl:${viewSettingData?.height2Xl}

            `}>見出しH5</h5>
        </div>
    );
};
export default H5SettingsPreview
