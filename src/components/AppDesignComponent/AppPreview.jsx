import React from "react";
import AppPreviewHeader from "./AppPreviewHeader";
import AppPreviewFooter from "./PreviewSettingPages/AppPreviewFooter";
import AppPreviewMiddle from "./AppPreviewMiddle";
import { useRecoilState, useRecoilValue } from "recoil";
import { appDesignerState, getSelectedPageData } from "../../store/recoil/appDesignerState";

const AppPreview = ({ children, className = '', id, flexType = 'col', previewBorderClass = '' }) => {
    const [recoilStateValue, setRecoilState] = useRecoilState(appDesignerState);
    const { activeTab, activePageId, tabItems } = recoilStateValue;

    return (
        <div className="w-full h-full">

            <div className={`middleArea relative min-h-full`}>
                <AppPreviewMiddle />
            </div>

        </div>
    )
};
export default AppPreview