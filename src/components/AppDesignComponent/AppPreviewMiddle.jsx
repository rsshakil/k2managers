import React from "react";
import { Formik, Form } from "formik";

import { useRecoilState, useRecoilValue } from "recoil";
import { appDesignerState, getSelectedPageData } from "../../store/recoil/appDesignerState";
import PageFramePreview from "./PreviewSettingPages/PageFramePreview";
import AppInformatinSettingPreview from "./PreviewSettingPages/AppInformatinSettingPreview";
import Step1SettingsPreview from "./PreviewSettingPages/Step1SettingsPreview";
import Step2SettingsPreview from "./PreviewSettingPages/Step2SettingsPreview";
import Step3SettingsPreview from "./PreviewSettingPages/Step3SettingsPreview";
import H1SettingsPreview from "./PreviewSettingPages/H1SettingsPreview";
import H2SettingsPreview from "./PreviewSettingPages/H2SettingsPreview";
import H3SettingsPreview from "./PreviewSettingPages/H3SettingsPreview";
import H4SettingsPreview from "./PreviewSettingPages/H4SettingsPreview";
import H5SettingsPreview from "./PreviewSettingPages/H5SettingsPreview";
import H6SettingsPreview from "./PreviewSettingPages/H6SettingsPreview";
import ButtonSettingsPreview from "./PreviewSettingPages/ButtonSettingsPreview";
import PageBlockPreview from "./PreviewSettingPages/PageBlockPreview";
import FavIconUploaderPreview from "./PreviewSettingPages/FavIconUploaderPreview";
import FieldFormSettingsPreview from "./PreviewSettingPages/FieldFormSettingsPreview";
import AppPreviewFooter from "./PreviewSettingPages/AppPreviewFooter";
import Slot1SettingsPreview from "./PreviewSettingPages/Slot1SettingsPreview";
import Slot2SettingsPreview from "./PreviewSettingPages/Slot2SettingsPreview";
import Token1loginSettingsPreview from "./PreviewSettingPages/Token1loginSettingsPreview";
import Token2loginSettingsPreview from "./PreviewSettingPages/Token2loginSettingsPreview";
import CustomColorSettingsPreview from "./PreviewSettingPages/CustomColorSettingsPreview";
import CheckboxIconSettingPreview from "./PreviewSettingPages/CheckboxIconSettingPreview";
import RadioboxIconSettingPreview from "./PreviewSettingPages/RadioboxIconSettingPreview";
import ZipSearchSettingsPreview from "./PreviewSettingPages/ZipSearchSettingsPreview";
import InputBirthdayPreview from "./PreviewSettingPages/InputBirthdayPreview";
import CategorySelection1SettingsPreview from "./PreviewSettingPages/CategorySelection1SettingsPreview";
import CategorySelection2SettingsPreview from "./PreviewSettingPages/CategorySelection2SettingsPreview";
import InstituteSelection1SettingsPreview from "./PreviewSettingPages/InstituteSelection1SettingsPreview";
import InstituteSelection2SettingsPreview from "./PreviewSettingPages/InstituteSelection2SettingsPreview";
import ItemSelection1SettingsPreview from "./PreviewSettingPages/ItemSelection1SettingsPreview";
import Token2login1SettingsPreview from "./PreviewSettingPages/Token2login1SettingsPreview";
import Token2login2SettingsPreview from "./PreviewSettingPages/Token2login2SettingsPreview";

const AppPreviewHeader = ({ children, className = '', id, flexType = 'col', previewBorderClass = '' }) => {
    const [recoilStateValue] = useRecoilState(appDesignerState);
    const { activePageId, activeTab } = recoilStateValue;
    const selectedPageDetail = useRecoilValue(getSelectedPageData);


    return (

        <div className="flex flex-col">
            {selectedPageDetail && (
                <>
                    {activeTab === 'freePages' && <PageBlockPreview data={selectedPageDetail} />}
                    {activeTab === 'commonPages' && <PageBlockPreview data={selectedPageDetail} />}
                    {activePageId === 'pageFrameSettings' && <PageFramePreview pageId={activePageId} data={selectedPageDetail} />}
                    {activePageId === 'step1Settings' && <Step1SettingsPreview pageId={activePageId} data={selectedPageDetail} />}
                    {activePageId === 'step2Settings' && <Step1SettingsPreview pageId={activePageId} data={selectedPageDetail} />}
                    {activePageId === 'step3Settings' && <Step1SettingsPreview pageId={activePageId} data={selectedPageDetail} />}
                    {activePageId === 'buttonASettings' && <ButtonSettingsPreview buttonType={activePageId} data={selectedPageDetail} />}
                    {activePageId === 'buttonBSettings' && <ButtonSettingsPreview buttonType={activePageId} data={selectedPageDetail} />}
                    {activePageId === 'buttonCSettings' && <ButtonSettingsPreview buttonType={activePageId} data={selectedPageDetail} />}
                    {activePageId === 'informationAreaSttings' && <AppInformatinSettingPreview />}
                    {activePageId === 'h1Settings' && <H1SettingsPreview pageText="見出しH1" pageId={activePageId} data={selectedPageDetail} />}
                    {activePageId === 'h2Settings' && <H1SettingsPreview pageText="見出しH2" pageId={activePageId} data={selectedPageDetail} />}
                    {activePageId === 'h3Settings' && <H1SettingsPreview pageText="見出しH3" pageId={activePageId} data={selectedPageDetail} />}
                    {activePageId === 'h4Settings' && <H1SettingsPreview pageText="見出しH4" pageId={activePageId} data={selectedPageDetail} />}
                    {activePageId === 'h5Settings' && <H1SettingsPreview pageText="見出しH5" pageId={activePageId} data={selectedPageDetail} />}
                    {activePageId === 'h6Settings' && <H1SettingsPreview pageText="見出しH6" pageId={activePageId} data={selectedPageDetail} />}
                    {activePageId === 'faviconSettings' && <FavIconUploaderPreview pageText="Fav" pageId={activePageId} data={selectedPageDetail} />}
                    {activePageId === 'inputTextSettings' && <FieldFormSettingsPreview pageText="" pageId={activePageId} data={selectedPageDetail} />}
                    {activePageId === 'itemSelection1Settings' && <ItemSelection1SettingsPreview pageText="" pageId={activePageId} data={selectedPageDetail} />}
                    {activePageId === 'textareaFormSettings' && <FieldFormSettingsPreview pageText="" pageId={activePageId} data={selectedPageDetail} />}
                    {activePageId === 'selectFormSettings' && <FieldFormSettingsPreview pageText="" pageId={activePageId} data={selectedPageDetail} />}
                    {activePageId === 'radioAFormSettings' && <FieldFormSettingsPreview pageText="" pageId={activePageId} data={selectedPageDetail} />}
                    {activePageId === 'radioBFormSettings' && <FieldFormSettingsPreview pageText="" pageId={activePageId} data={selectedPageDetail} />}
                    {activePageId === 'checkboxSettings' && <FieldFormSettingsPreview pageText="" pageId={activePageId} data={selectedPageDetail} />}
                    {activePageId === 'slotSelection1Settings' && <Slot1SettingsPreview pageText="" pageId={activePageId} data={selectedPageDetail} />}
                    {activePageId === 'slotSelection2Settings' && <Slot2SettingsPreview pageText="" pageId={activePageId} data={selectedPageDetail} />}
                    {activePageId === 'token1loginSettings' && <Token1loginSettingsPreview pageText="" pageId={activePageId} data={selectedPageDetail} />}
                    {activePageId === 'token2loginSettings' && <Token2loginSettingsPreview pageText="" pageId={activePageId} data={selectedPageDetail} />}
                    {activePageId === 'token2loginType1Settings' && <Token2login1SettingsPreview pageText="" pageId={activePageId} data={selectedPageDetail} />}
                    {activePageId === 'token2loginType2Settings' && <Token2login2SettingsPreview pageText="" pageId={activePageId} data={selectedPageDetail} />}
                    {activePageId === 'token3loginSettings' && <Token2loginSettingsPreview pageText="" pageId={activePageId} data={selectedPageDetail} />}
                    {activePageId === 'inputDateSettings' && <FieldFormSettingsPreview pageText="" pageId={activePageId} data={selectedPageDetail} />}
                    {activePageId === 'inputTimeSettings' && <FieldFormSettingsPreview pageText="" pageId={activePageId} data={selectedPageDetail} />}
                    {activePageId === 'inputNumberSettings' && <FieldFormSettingsPreview pageText="" pageId={activePageId} data={selectedPageDetail} />}
                    {activePageId === 'combinInputTextSettings' && <FieldFormSettingsPreview pageText="" pageId={activePageId} data={selectedPageDetail} />}
                    {activePageId === 'customColorSettings' && <CustomColorSettingsPreview pageText="" pageId={activePageId} data={selectedPageDetail} />}
                    {activePageId === 'checkboxIconSettings' && <CheckboxIconSettingPreview pageText="" data={selectedPageDetail} />}
                    {activePageId === 'customRadioIconSettings' && <RadioboxIconSettingPreview pageText="" data={selectedPageDetail} />}
                    {activePageId === 'zipSearchSettings' && <ZipSearchSettingsPreview pageText="" data={selectedPageDetail} />}
                    {activePageId === 'inputBirthdaySettings' && <InputBirthdayPreview pageText="" data={selectedPageDetail} />}
                    {activePageId === 'categorySelection1Settings' && <CategorySelection1SettingsPreview pageText="" data={selectedPageDetail} />}
                    {activePageId === 'categorySelection2Settings' && <CategorySelection2SettingsPreview pageText="" data={selectedPageDetail} />}
                    {activePageId === 'instituteSelection1Settings' && <InstituteSelection1SettingsPreview pageText="" data={selectedPageDetail} />}
                    {activePageId === 'instituteSelection2Settings' && <InstituteSelection2SettingsPreview pageText="" data={selectedPageDetail} />}
                </>
            )}
        </div>
    )
};
export default AppPreviewHeader