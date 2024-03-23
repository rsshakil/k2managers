import React from "react";
import { Formik, Form } from "formik";

import { useRecoilState, useRecoilValue } from "recoil";
import { appDesignerState, getSelectedPageData } from "../../store/recoil/appDesignerState";
import LogoWrap from "./Header/LogoWrap";
import TitleWrap from "./Header/TitleWrap";
import LogoTitlePreview from "./Header/LogoTitlePreview";
import _ from "lodash";
import HeaderMenuButton from "./Header/HeaderMenuButton";


const AppPreviewHeader = ({ children, className = '', id, flexType = 'col', previewBorderClass = '' }) => {
    const [recoilStateValue, setRecoilState] = useRecoilState(appDesignerState);
    const selectedPageDetail = useRecoilValue(getSelectedPageData);
    let logoSettingData = recoilStateValue.tabItems.settings.appSettingQuery?.logoSettings;
    let headerPageFrameData = recoilStateValue.tabItems.settings.appSettingQuery?.pageFrameSettings;
    let headerMenuButton = recoilStateValue.tabItems.settings.appSettingQuery?.pageFrameSettings.info;
    const { classes, styles, info, prefixClass} = logoSettingData || '';
    let viewSettingData = { ...classes, ...styles, ...info, ...prefixClass };

    let headerPosition = "flex-row justify-between"

    if (viewSettingData?.justifyContent === 'justify-start'){
        headerPosition = "flex-row justify-between"
    }else if (viewSettingData?.justifyContent === 'justify-end'){
        headerPosition = "flex-row-reverse justify-between"
    }else if (viewSettingData?.justifyContent === 'justify-center'){
        headerPosition = "flex-row justify-center"
    } 
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
        <header
            className={`flex flex-col ${headerPageFrameData?.classes?.headerCustomClass}`}
            style={{minWidth: "622px", width: "100% "}}
        >
            <div
                className={`flex px-2 w-full items-center ${headerPageFrameData?.classes.headerDropShadow} ${headerPosition}
            ${removeSM(headerPageFrameData?.prefixClass?.sm.headerHeight)} ${headerPageFrameData?.classes.headerBorderWidth}`}
                style={{
                    backgroundColor: headerPageFrameData?.styles?.headerBackgroundColor?.backgroundColor,
                    borderColor: headerPageFrameData?.styles?.headerBorderColor?.borderColor
                }}>

                <div>
                {logoSettingData?.info?.imageUrl != '' && logoSettingData?.info?.structure == 1 &&
                    <LogoWrap headerPageFrameData={logoSettingData}/>}
                {logoSettingData?.info?.text != '' && logoSettingData?.info?.structure == 2 &&
                    <TitleWrap headerPageFrameData={logoSettingData}/>}

                {logoSettingData?.info?.structure > 2 && <LogoTitlePreview headerPageFrameData={logoSettingData}/>}
                </div>

                {(headerPageFrameData.info?.headerMenu1 || headerPageFrameData.info?.headerMenu2) &&
                    (viewSettingData?.justifyContent === 'justify-start' || viewSettingData?.justifyContent === 'justify-end') &&
                <div className="flex">
                    {headerPageFrameData.info?.headerMenu1 &&
                        <HeaderMenuButton
                            buttonType={headerMenuButton.headerMenu1Button}
                            label={headerPageFrameData.info?.headerMenu1TextSm}
                            buttonSettingData={headerPageFrameData}
                            buttonNumber={1}
                        />
                    }
                    {headerPageFrameData.info?.headerMenu2 &&
                        <HeaderMenuButton
                            buttonType={headerMenuButton.headerMenu2Button}
                            label={headerPageFrameData.info?.headerMenu2TextSm}
                            buttonSettingData={headerPageFrameData}
                            buttonNumber={2}
                        />
                    }
                </div>
                }
            </div>
        </header>
    );
};
export default AppPreviewHeader
