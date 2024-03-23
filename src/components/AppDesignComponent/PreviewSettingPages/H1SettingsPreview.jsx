import React from "react";
import { useRecoilState } from "recoil";
import { appDesignerState } from "../../../store/recoil/appDesignerState";

const H1SettingsPreview = ({ pageText,
pageId,
data}) => {
    const [recoilStateValue, setRecoilState] = useRecoilState(appDesignerState);
    const { activeTab, activePageId, tabItems } = recoilStateValue;
    const { classes, styles, info, prefixClass} = data || '';
    let viewSettingData = { ...classes, ...styles, ...info, ...prefixClass };
    function removeSM(str) {  
        if (typeof str!='undefined') { 
            if (str.includes("sm:")) {
                let arr = str.split(':');
                return arr[1];
            } else { 
                return str;
            }
        }
    }
    return (
        <div className={`w-full flex`}>
            <h1 className={`w-full 
                ${viewSettingData?.customClass} 
                ${removeSM(viewSettingData?.sm?.textAlign)} 
                ${removeSM(viewSettingData?.sm?.verticalAlign)} 
                ${removeSM(viewSettingData?.sm?.textSize)} 
                ${removeSM(viewSettingData?.sm?.textWeight)} 
                ${removeSM(viewSettingData?.sm?.letterSpacing)} 
                ${removeSM(viewSettingData?.sm?.paddingX)} 
                ${removeSM(viewSettingData?.sm?.paddingY)} 
                ${removeSM(viewSettingData?.sm?.borderRadius)} 
                ${removeSM(viewSettingData?.sm?.borderWidth)} 
                ${removeSM(viewSettingData?.sm?.borderStyle)} 
                ${removeSM(viewSettingData?.sm?.dropShadow)} 
                ${removeSM(viewSettingData?.sm?.height)} 
                

            `} style={{ color: viewSettingData?.textColor?.color, backgroundColor: viewSettingData?.backgroundColor?.backgroundColor, borderColor: viewSettingData?.borderColor?.borderColor }}>{ pageText }</h1>
        </div>
    );
};
export default H1SettingsPreview
