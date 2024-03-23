import { useRecoilState } from "recoil";
import { appDesignerState, getSelectedPageData } from "../../store/recoil/appDesignerState";

import PageFrameSettingsForm from './PageFrameSettingsForm';
import LogoSettings from './SettingFormPages/LogoSettings';
import FooterSettings from './SettingFormPages/FooterSettings';
import Step1Settings from "./SettingFormPages/Step1Settings";
import Step2Settings from "./SettingFormPages/Step2Settings";
import Step3Settings from "./SettingFormPages/Step3Settings";
import H1Settings from "./SettingFormPages/H1Settings";
import ButtonSettingsForm from "./SettingFormPages/ButtonSettingsForm";
import SettingsForm from "./SettingFormPages/SettingsForm";
import H2Settings from "./SettingFormPages/H2Settings";
import H3Settings from "./SettingFormPages/H3Settings";
import H4Settings from "./SettingFormPages/H4Settings";
import H5Settings from "./SettingFormPages/H5Settings";
import H6Settings from "./SettingFormPages/H6Settings";
import FieldFormSettings from "./SettingFormPages/FieldFormSettings";
import FieldFormRadioSettings from "./SettingFormPages/FieldFormRadioSettings";
import FavIconUploader from "./SettingFormPages/FavIconUploader";
import CustomCssSettingsForm from "./SettingFormPages/CustomCssSettingsForm";

import SettingInformationForm from './SettingFormPages/SettingInformationForm';
import Slot1FormSettings from './SettingFormPages/Slot1FormSettings';
import Slot2FormSettings from './SettingFormPages/Slot2FormSettings';
import Token1loginSettingsForm from './SettingFormPages/Token1loginSettingsForm';
import Token2loginSettingsForm from './SettingFormPages/Token2loginSettingsForm';
import CustomColorSettingForm from "./SettingFormPages/CustomColorSettingForm";
import CheckboxIconSettingForm from "./SettingFormPages/CheckboxIconSettingForm";
import RadioboxIconSettingForm from "./SettingFormPages/RadioboxIconSettingForm";
import DuplicateAppDesignSettingsForm from "./SettingFormPages/DuplicateAppDesignSettingsForm";
import ZipSearchSettingsForm from "./SettingFormPages/ZipSearchSettingsForm";
import DebugModeSettingsForm from "./SettingFormPages/DebugModeSettingsForm";
import InputBirthdaySettingsForm from "./SettingFormPages/InputBirthdaySettingsForm";
import TextAreaFieldFormSettings from "./SettingFormPages/TextAreaFieldFormSettings";
import CategorySelection1SettingsForm from "./SettingFormPages/CategorySelection1SettingsForm";
import CategorySelection2SettingsForm from "./SettingFormPages/CategorySelection2SettingsForm";
import InstituteSelection1SettingsForm from "./SettingFormPages/InstituteSelection1SettingsForm";
import InstituteSelection2SettingsForm from "./SettingFormPages/InstituteSelection2SettingsForm";
import ItemSelection1FormSettings from "./SettingFormPages/ItemSelection1FormSettings";
import TwoTokenLogin1SettingsForm from "./SettingFormPages/TwoTokenLogin1SettingsForm";
import TwoTokenLogin2SettingsForm from "./SettingFormPages/TwoTokenLogin2SettingsForm";

export default function SettingPagesForm({ fetchAppDesignerData }) {
    const [recoilStateValue, setRecoilState] = useRecoilState(appDesignerState);
    const { activePageId } = recoilStateValue;

    return (
        <>
            {activePageId === 'pageFrameSettings' && <SettingsForm render={({ ...rest }) => <PageFrameSettingsForm {...rest} />} />}
            {activePageId === 'logoSettings' && <SettingsForm render={({ ...rest }) => <LogoSettings {...rest} />} />}
            {activePageId === 'footerSettings' && <SettingsForm render={({ ...rest }) => <FooterSettings {...rest} />} />}
            {activePageId === 'step1Settings' && <SettingsForm render={({ ...rest }) => <Step1Settings {...rest} />} />}
            {activePageId === 'step2Settings' && <SettingsForm render={({ ...rest }) => <Step1Settings {...rest} />} />}
            {activePageId === 'step3Settings' && <SettingsForm render={({ ...rest }) => <Step1Settings {...rest} />} />}
            {activePageId === 'informationAreaSttings' && <SettingsForm render={({ ...rest }) => <SettingInformationForm {...rest} />} />}
            {activePageId === 'buttonASettings' && <SettingsForm render={({ ...rest }) => <ButtonSettingsForm buttonType="A" {...rest} />} />}
            {activePageId === 'buttonBSettings' && <SettingsForm render={({ ...rest }) => <ButtonSettingsForm buttonType="B" {...rest} />} />}
            {activePageId === 'buttonCSettings' && <SettingsForm render={({ ...rest }) => <ButtonSettingsForm buttonType="C" {...rest} />} />}
            {activePageId === 'h1Settings' && <SettingsForm render={({ ...rest }) => <H1Settings {...rest} />} />}
            {activePageId === 'h2Settings' && <SettingsForm render={({ ...rest }) => <H1Settings {...rest} />} />}
            {activePageId === 'h3Settings' && <SettingsForm render={({ ...rest }) => <H1Settings {...rest} />} />}
            {activePageId === 'h4Settings' && <SettingsForm render={({ ...rest }) => <H1Settings {...rest} />} />}
            {activePageId === 'h5Settings' && <SettingsForm render={({ ...rest }) => <H1Settings {...rest} />} />}
            {activePageId === 'h6Settings' && <SettingsForm render={({ ...rest }) => <H1Settings {...rest} />} />}
            {activePageId === 'faviconSettings' && <SettingsForm render={({ ...rest }) => <FavIconUploader {...rest} />} />}
            {activePageId === 'inputTextSettings' && <SettingsForm render={({ ...rest }) => <FieldFormSettings {...rest} />} />}
            {activePageId === 'customCssSettings' && <CustomCssSettingsForm />}
            {activePageId === 'textareaFormSettings' && <SettingsForm render={({ ...rest }) => <TextAreaFieldFormSettings {...rest} />} />}
            {activePageId === 'selectFormSettings' && <SettingsForm render={({ ...rest }) => <FieldFormSettings {...rest} />} />}
            {activePageId === 'radioAFormSettings' && <SettingsForm render={({ ...rest }) => <FieldFormRadioSettings {...rest} />} />}
            {activePageId === 'radioBFormSettings' && <SettingsForm render={({ ...rest }) => <FieldFormSettings {...rest} />} />}
            {activePageId === 'checkboxSettings' && <SettingsForm render={({ ...rest }) => <FieldFormSettings {...rest} />} />}
            {activePageId === 'checkboxIconSettings' && <SettingsForm render={({ ...rest }) => <CheckboxIconSettingForm {...rest} />} />}
            {activePageId === 'customRadioIconSettings' && <SettingsForm render={({ ...rest }) => <RadioboxIconSettingForm {...rest} />} />}
            {activePageId === 'slotSelection1Settings' && <SettingsForm render={({ ...rest }) => <Slot1FormSettings {...rest} />} />}
            {activePageId === 'slotSelection2Settings' && <SettingsForm render={({ ...rest }) => <Slot2FormSettings {...rest} />} />}
            {activePageId === 'itemSelection1Settings' && <SettingsForm render={({ ...rest }) => <ItemSelection1FormSettings {...rest} />} />}
            {activePageId === 'token1loginSettings' && <SettingsForm render={({ ...rest }) => <Token1loginSettingsForm {...rest} />} />}
            {activePageId === 'token2loginSettings' && <SettingsForm render={({ ...rest }) => <Token2loginSettingsForm {...rest} />} />}
            {activePageId === 'token2loginType1Settings' && <SettingsForm render={({ ...rest }) => <TwoTokenLogin1SettingsForm {...rest} />} />}
            {activePageId === 'token2loginType2Settings' && <SettingsForm render={({ ...rest }) => <TwoTokenLogin2SettingsForm {...rest} />} />}
            {activePageId === 'token3loginSettings' && <SettingsForm render={({ ...rest }) => <Token2loginSettingsForm {...rest} />} />}
            {activePageId === 'inputDateSettings' && <SettingsForm render={({ ...rest }) => <FieldFormSettings {...rest} />} />}
            {activePageId === 'inputTimeSettings' && <SettingsForm render={({ ...rest }) => <FieldFormSettings {...rest} />} />}
            {activePageId === 'inputNumberSettings' && <SettingsForm render={({ ...rest }) => <FieldFormSettings {...rest} />} />}
            {activePageId === 'combinInputTextSettings' && <SettingsForm render={({ ...rest }) => <FieldFormSettings {...rest} />} />}
            {activePageId === 'customColorSettings' && <CustomColorSettingForm />}
            {activePageId === 'duplicateAppDesignSettings' && <DuplicateAppDesignSettingsForm fetchAppDesignerData={fetchAppDesignerData} />}
            {activePageId === 'zipSearchSettings' && <SettingsForm render={({ ...rest }) => <ZipSearchSettingsForm {...rest} />} />}
            {activePageId === 'debugModeSettings' && <SettingsForm render={({ ...rest }) => <DebugModeSettingsForm {...rest} />} />}
            {activePageId === 'inputBirthdaySettings' && <SettingsForm render={({ ...rest }) => <InputBirthdaySettingsForm {...rest} />} />}
            {activePageId === 'categorySelection1Settings' && <SettingsForm render={({ ...rest }) => <CategorySelection1SettingsForm {...rest} />} />}
            {activePageId === 'categorySelection2Settings' && <SettingsForm render={({ ...rest }) => <CategorySelection2SettingsForm {...rest} />} />}
            {/* {activePageId === 'instituteSelection1Settings' && <SettingsForm render={({ ...rest }) => <InstituteSelection1SettingsForm {...rest} />} />} */}
            {activePageId === 'instituteSelection2Settings' && <SettingsForm render={({ ...rest }) => <InstituteSelection2SettingsForm {...rest} />} />}

        </>
    )
}