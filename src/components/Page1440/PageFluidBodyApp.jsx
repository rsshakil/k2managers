import React from 'react';
import { Formik, Form } from 'formik';
import FormBodyContainer from '../Wrapper/FormBodyContainer';
import AppFormFooter from '../Form/App/AppFormFooter';
import AppPreview from '../AppDesignComponent/AppPreview';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import { useRecoilState, useRecoilValue } from 'recoil';
import { appDesignerState, getSelectedPageData } from '../../store/recoil/appDesignerState';

const PageFluidBodyApp = ({
    className = '',
    id,
    style,
    stretchAreaStyle,
    stretchCustomClass,
    previewBorderClass = '',
}) => {
    const [recoilStateValue, setRecoilState] = useRecoilState(appDesignerState);
    const { activeTab, activePageId, tabItems } = recoilStateValue;

    const selectedPageDetail = useRecoilValue(getSelectedPageData);

    let customClassList = '';
    let customStyleList = {};

    if (activeTab === 'freePages') {
        const { appPageCustomClass = '' } = selectedPageDetail || '';

        const { pageFrameSettings = {} } = tabItems['settings']?.appSettingQuery;
        const { classes = {}, styles = {} } = pageFrameSettings;
        const {
            contentsCustomClass = '',
            contentsDropShadow = '',
            contentsBorderStyle = '',
            contentsBorderWidth = '',
        } = classes;
        const { contentsBackgroundColor = {}, contentsBorderColor = {} } = styles;

        customClassList = `${appPageCustomClass} ${contentsCustomClass} ${contentsDropShadow} ${contentsBorderWidth} ${contentsBorderStyle}`;
        customStyleList = {
            ...contentsBackgroundColor,
            ...contentsBorderColor,
            contentsBorderStyle,
            contentsDropShadow,
            ...style,
        };
    } else if (activeTab === 'commonPages') {
        const { appCommonPageCustomClass = '' } = selectedPageDetail || '';
        const { pageFrameSettings = {} } = tabItems['settings']?.appSettingQuery;
        const { classes = {}, styles = {} } = pageFrameSettings;
        const {
            contentsCustomClass = '',
            contentsDropShadow = '',
            contentsBorderStyle = '',
            contentsBorderWidth = '',
        } = classes;
        const { contentsBackgroundColor = {}, contentsBorderColor = {} } = styles;

        customClassList = `${appCommonPageCustomClass} ${contentsCustomClass} ${contentsDropShadow} ${contentsBorderWidth} ${contentsBorderStyle}`;
        customStyleList = {
            ...contentsBackgroundColor,
            ...contentsBorderColor,
            contentsBorderStyle,
            contentsDropShadow,
            ...style,
        };
    } else if (activeTab === 'settings') {
        const { pageFrameSettings = {} } = tabItems[activeTab]?.appSettingQuery;
        const { classes = {}, styles = {} } = pageFrameSettings;
        const {
            contentsCustomClass = '',
            contentsDropShadow = '',
            contentsBorderStyle = '',
            contentsBorderWidth = '',
        } = classes;
        const { contentsBackgroundColor = {}, contentsBorderColor = {} } = styles;

        customClassList = `${contentsCustomClass} ${contentsDropShadow} ${contentsBorderWidth} ${contentsBorderStyle}`;
        customStyleList = {
            ...contentsBackgroundColor,
            ...contentsBorderColor,
            contentsBorderStyle,
            contentsDropShadow,
            ...style,
        };
    }
    return (
        <div className={`flex flex-col items-center ${stretchCustomClass}`} style={stretchAreaStyle} id={id}>
            <div
                className={`${className} p-4 w-[622px] bg-white !max-w-[624px] wrap ${previewBorderClass} ${customClassList} ${customStyleList}`}
                style={customStyleList}
            >
                <AppPreview />
            </div>
        </div>
    );
};
export default PageFluidBodyApp;
