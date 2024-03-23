import React from "react";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { v4 as uuid } from 'uuid';
import _ from 'lodash';
import AppDesignLeft from "../../AppDesignComponent/AppDesignLeft";
import AppDesignRight from "../../AppDesignComponent/AppDesignRight";
import PageFluidBodyApp from "../../Page1440/PageFluidBodyApp";
import { appDesignerState, getSelectedPageData } from "../../../store/recoil/appDesignerState";
import { appDesignerInitiate } from '../../../services/appDesignerService';
import Loader from "../../Loading/Loader";
import { defaultCommonPages } from "../../../lib/commonConstants";
import { Form, Formik } from "formik";
import AppFormFooter from "./AppFormFooter";
import AppPreviewHeader from "../../AppDesignComponent/AppPreviewHeader";
import AppPreviewFooter from "../../AppDesignComponent/PreviewSettingPages/AppPreviewFooter";
import useDocumentTitle from "../../../hooks/useDocumentTitle";
import { defaultColorCodes, defaultActiveHistories } from "../../../store/recoil/appDesignerState";
import { defaultTabState } from "../../../store/recoil/appDesignerState";

const AppDesignerForm = () => {
    useDocumentTitle("K2システム | APPデザイナー")
    const location = useLocation();
    let { appId } = useParams();
    const [recoilStateValue, setRecoilState] = useRecoilState(appDesignerState);
    const [loading, setLoading] = useState(true);
    const [stepFooterHeight, setStepFooterHeight] = useState(0);
    const [stepHeaderHeight, setStepHeaderHeight] = useState(0);
    const [validationErrors, setValidationErrors] = useState([]);

    let pageFrameDataQuery = recoilStateValue.tabItems?.settings?.appSettingQuery?.pageFrameSettings?.styles;
    let footerSettingData = recoilStateValue.tabItems.settings.appSettingQuery?.footerSettings;
    let defaultcommonPageList = defaultCommonPages.map(x => {
        return { ...x, appCommonPageId: uuid(), appId: appId }
    })

    useEffect(() => {
        setRecoilState((oldRecoilState) => ({
            ...oldRecoilState,
            pageTitle: 'App Designer'
        }));

    }, [location]);

    useEffect(() => {
        fetchAppDesignerData();
    }, [appId])

    async function fetchAppDesignerData() {
        try {
            setLoading(true);

            const { data, status } = await appDesignerInitiate(appId);

            if (!window.sessionStorage.getItem("currentProjectId")) {
                window.sessionStorage.setItem("currentProjectId", data.appData?.projectId);
            }


            if (status === 200) {
                const { appData = {}, records = {} } = data;
                const { commonPages = [], settings = {}, histories = {} } = records;
                let { freePages = [] } = records;
                const {
                    actives = defaultActiveHistories,
                    colorHistory = defaultColorCodes,
                    customColors = defaultColorCodes
                } = histories || '';

                const defaultSettingPageState = defaultTabState.tabItems.settings.appSettingQuery;

                const {
                    pageFrameSettings = { ...defaultSettingPageState.pageFrameSettings },
                    logoSettings = { ...defaultSettingPageState.logoSettings },
                    footerSettings = { ...defaultSettingPageState.footerSettings },
                    step1Settings = { ...defaultSettingPageState.step1Settings },
                    step2Settings = { ...defaultSettingPageState.step2Settings },
                    step3Settings = { ...defaultSettingPageState.step3Settings },
                    buttonASettings = { ...defaultSettingPageState.buttonASettings },
                    buttonBSettings = { ...defaultSettingPageState.buttonBSettings },
                    buttonCSettings = { ...defaultSettingPageState.buttonCSettings },
                    appReservationRemidMailSettings = {},
                    appReservationMailSettings = {},
                    appReservationCancelMailSettings = {},
                    appReservationRemidSMSSettings = {},
                    appReservationSMSSettings = {},
                    appReservationCancelSMSSettings = {},
                    appNewsSettings = {},
                    appDesignSettings = {},
                    informationAreaSttings = { ...defaultSettingPageState.informationAreaSttings },
                    h1Settings = { ...defaultSettingPageState.h1Settings },
                    h2Settings = { ...defaultSettingPageState.h2Settings },
                    h3Settings = { ...defaultSettingPageState.h3Settings },
                    h4Settings = { ...defaultSettingPageState.h4Settings },
                    h5Settings = { ...defaultSettingPageState.h5Settings },
                    h6Settings = { ...defaultSettingPageState.h6Settings },
                    faviconSettings = { ...defaultSettingPageState.faviconSettings },
                    inputTextSettings = { ...defaultSettingPageState.inputTextSettings },
                    textareaFormSettings = { ...defaultSettingPageState.textareaFormSettings },
                    selectFormSettings = { ...defaultSettingPageState.selectFormSettings },
                    radioAFormSettings = { ...defaultSettingPageState.radioAFormSettings },
                    radioBFormSettings = { ...defaultSettingPageState.radioBFormSettings },
                    checkboxSettings = { ...defaultSettingPageState.checkboxSettings },
                    customCssSettings = { ...defaultSettingPageState.customCssSettings },
                    slotSelection1Settings = { ...defaultSettingPageState.slotSelection1Settings },
                    slotSelection2Settings = { ...defaultSettingPageState.slotSelection2Settings },
                    slotSelection3Settings = {},
                    itemSelection1Settings = { ...defaultSettingPageState.itemSelection1Settings },
                    token1loginSettings = { ...defaultSettingPageState.token1loginSettings },
                    token2loginSettings = { ...defaultSettingPageState.token2loginSettings },
                    token2loginType1Settings = { ...defaultSettingPageState.token2loginType1Settings },
                    token2loginType2Settings = { ...defaultSettingPageState.token2loginType2Settings },
                    token3loginSettings = { ...defaultSettingPageState.token3loginSettings },
                    eventSelection1Settings = {},
                    eventSelection2Settings = {},
                    eventSelection3Settings = {},

                    categorySelection1Settings = { ...defaultSettingPageState.categorySelection1Settings },
                    categorySelection2Settings = { ...defaultSettingPageState.categorySelection2Settings },

                    instituteSelection1Settings = { ...defaultSettingPageState.instituteSelection1Settings },
                    instituteSelection2Settings = { ...defaultSettingPageState.instituteSelection2Settings },
                    busSelection1Settings = {},
                    busSelection2Settings = {},
                    busSelection3Settings = {},
                    inputDateSettings = { ...defaultSettingPageState.inputDateSettings },
                    inputTimeSettings = { ...defaultSettingPageState.inputTimeSettings },
                    inputNumberSettings = { ...defaultSettingPageState.inputNumberSettings },
                    combinInputTextSettings = { ...defaultSettingPageState.combinInputTextSettings },
                    checkboxIconSettings = { ...defaultSettingPageState.checkboxIconSettings },
                    customRadioIconSettings = { ...defaultSettingPageState.customRadioIconSettings },
                    zipSearchSettings = { ...defaultSettingPageState.zipSearchSettings },
                    debugModeSettings = { ...defaultSettingPageState.debugModeSettings },
                    inputBirthdaySettings = { ...defaultSettingPageState.inputBirthdaySettings },
                } = settings.hasOwnProperty('appSettingQuery') ? settings?.appSettingQuery : defaultSettingPageState;


                /*button blockUpdated Temp Code 01/06/23 delete on FEB*/
                let buttonDefautl = {
                    buttonQuantity: 1,
                    buttonType: 'a',
                    blockWrapCustomClass: '',
                    button1Text: '',
                    button1Filter: '',
                    button1DisabledText: '',
                    button1FilterResTargetField: '',
                    button1Function: 'onClick',
                    button1Reservation: {
                        successDestination: '',
                        successTargetField: '',
                        networkErrorDestination: '',
                        networkErrorTargetField: '',
                        networkErrorModalClose: 2,
                        networkErrorButtonDisable: 2,
                        networkErrorText: '',
                        error1Destination: '',
                        error1TargetField: '',
                        error1ModalClose: 2,
                        error1ButtonDisable: 2,
                        error1Text: '',
                        error1Code: 201,
                        error2Destination: '',
                        error2TargetField: '',
                        error2ModalClose: 2,
                        error2ButtonDisable: 2,
                        error2Text: '',
                        error2Code: 202,
                        error3Destination: '',
                        error3TargetField: '',
                        error3ModalClose: 2,
                        error3ButtonDisable: 2,
                        error3Text: '',
                        error3Code: 203,
                    },
                    button1ReservationCancel: {
                        successDestination: '',
                        successTargetField: '',
                        networkErrorDestination: '',
                        networkErrorTargetField: '',
                        networkErrorModalClose: 2,
                        networkErrorButtonDisable: 2,
                        networkErrorText: '',
                        error1Destination: '',
                        error1TargetField: '',
                        error1ModalClose: 2,
                        error1ButtonDisable: 2,
                        error1Text: '',
                        error1Code: 301,
                        error2Destination: '',
                        error2TargetField: '',
                        error2ModalClose: 2,
                        error2ButtonDisable: 2,
                        error2Text: '',
                        error2Code: 302,
                        error3Destination: '',
                        error3TargetField: '',
                        error3ModalClose: 2,
                        error3ButtonDisable: 2,
                        error3Text: '',
                        error3Code: 303,
                    },
                    button1ReservationChange: {
                        successDestination: '',
                        successTargetField: '',
                        networkErrorDestination: '',
                        networkErrorTargetField: '',
                        networkErrorModalClose: 2,
                        networkErrorButtonDisable: 2,
                        networkErrorText: '',
                        error1Destination: '',
                        error1TargetField: '',
                        error1ModalClose: 2,
                        error1ButtonDisable: 2,
                        error1Text: '',
                        error1Code: 401,
                        error2Destination: '',
                        error2TargetField: '',
                        error2ModalClose: 2,
                        error2ButtonDisable: 2,
                        error2Text: '',
                        error2Code: 402,
                        error3Destination: '',
                        error3TargetField: '',
                        error3ModalClose: 2,
                        error3ButtonDisable: 2,
                        error3Text: '',
                        error3Code: 403,
                    },
                    button1SendField: {
                        successDestination: '',
                        successTargetField: '',
                        networkErrorDestination: '',
                        networkErrorTargetField: '',
                        networkErrorModalClose: 2,
                        networkErrorButtonDisable: 2,
                        networkErrorText: '',
                        error1Destination: '',
                        error1TargetField: '',
                        error1ModalClose: 2,
                        error1ButtonDisable: 2,
                        error1Text: '',
                        error1Code: 501,
                        error2Destination: '',
                        error2TargetField: '',
                        error2ModalClose: 2,
                        error2ButtonDisable: 2,
                        error2Text: '',
                        error2Code: 502,
                        error3Destination: '',
                        error3TargetField: '',
                        error3ModalClose: 2,
                        error3ButtonDisable: 2,
                        error3Text: '',
                        error3Code: 503,
                        sendTargetField: []
                    },
                    button1Destination: '',
                    button1HasModal: 2,
                    button1HasPressingFilter: 2,
                    button1HasSpinner: 2,
                    button1SpinnerSvg: '',

                    button1ModalButtonStructure: 3,
                    button1ModalButtonType: 'a',
                    button1ModalTrueText: '',
                    button1ModalFalseText: '',
                    button1ModalHeight: 'h-auto',
                    button1ModalHeightSm: 'sm:h-auto',
                    button1ModalHeightMd: 'md:h-auto',
                    button1ModalHeightLg: 'lg:h-auto',
                    button1ModalHeightXl: 'xl:h-auto',
                    button1ModalHeight2xl: '2xl:h-auto',
                    button1ModalWidth: 'w-auto',
                    button1ModalWidthSm: 'sm:w-auto',
                    button1ModalWidthMd: 'md:w-auto',
                    button1ModalWidthLg: 'lg:w-auto',
                    button1ModalWidthXl: 'xl:w-auto',
                    button1ModalWidth2xl: '2xl:w-auto',
                    button1ModalBorderWidth: 'border-0',
                    button1ModalBorderStyle: 'border-solid',
                    button1ModalBorderRadius: 'rounded-none',
                    button1ModalBoxShadow: 'drop-shadow-none',
                    button1ModalErrorTextSize: 'text-base',
                    button1ModalErrorTextWeight: 'font-normal',
                    button1ModalErrorCustomClass: '',
                    button1ModalBorderColor: 'border-[#ffffff]',
                    button1ModalBackgroundColor: 'bg-[#ffffff]',
                    button1ModalBoxShadowColor: 'shadow-[#ffffff]',
                    button1ModalTextColor: 'text-[#ffffff]',
                    button1ValidateFilters: [],
                    button1blocks: [
                        {
                            informationAreaType: 1,
                            informationAreaCustomClass: "",
                            informationAreaTitle: "",
                            informationAreaContnts: "",
                            memo: "",
                            blocks: [],
                            belowBlockText: "",
                            appPageBlockId: uuid(),
                            appPageBlockOrderNo: 0,
                            blockListCaption: "[情報エリアブロック]",
                            blockPageTitle: "情報エリアブロック",
                            blockPageId: 1,
                            key: "INFORMATION_AREA",
                        },
                    ],
                    button1FieldModify: 2,
                    button1FieldModifySetting: [],
                    button1ModalBlockWrapCustomClass: '',
                    button1ModalButtonWrapCustomClass: '',
                    button1ModalModalWrapCustomClass: '',


                    button2Text: '',
                    button2Filter: '',
                    button2DisabledText: '',
                    button2FilterResTargetField: '',
                    button2Function: 'onClick',
                    button2Reservation: {
                        successDestination: '',
                        successTargetField: '',
                        networkErrorDestination: '',
                        networkErrorTargetField: '',
                        networkErrorModalClose: 2,
                        networkErrorButtonDisable: 2,
                        networkErrorText: '',
                        error1Destination: '',
                        error1TargetField: '',
                        error1ModalClose: 2,
                        error1ButtonDisable: 2,
                        error1Text: '',
                        error1Code: 201,
                        error2Destination: '',
                        error2TargetField: '',
                        error2ModalClose: 2,
                        error2ButtonDisable: 2,
                        error2Text: '',
                        error2Code: 202,
                        error3Destination: '',
                        error3TargetField: '',
                        error3ModalClose: 2,
                        error3ButtonDisable: 2,
                        error3Text: '',
                        error3Code: 203,
                    },
                    button2ReservationCancel: {
                        successDestination: '',
                        successTargetField: '',
                        networkErrorDestination: '',
                        networkErrorTargetField: '',
                        networkErrorModalClose: 2,
                        networkErrorButtonDisable: 2,
                        networkErrorText: '',
                        error1Destination: '',
                        error1TargetField: '',
                        error1ModalClose: 2,
                        error1ButtonDisable: 2,
                        error1Text: '',
                        error1Code: 301,
                        error2Destination: '',
                        error2TargetField: '',
                        error2ModalClose: 2,
                        error2ButtonDisable: 2,
                        error2Text: '',
                        error2Code: 302,
                        error3Destination: '',
                        error3TargetField: '',
                        error3ModalClose: 2,
                        error3ButtonDisable: 2,
                        error3Text: '',
                        error3Code: 303,
                    },
                    button2ReservationChange: {
                        successDestination: '',
                        successTargetField: '',
                        networkErrorDestination: '',
                        networkErrorTargetField: '',
                        networkErrorModalClose: 2,
                        networkErrorButtonDisable: 2,
                        networkErrorText: '',
                        error1Destination: '',
                        error1TargetField: '',
                        error1ModalClose: 2,
                        error1ButtonDisable: 2,
                        error1Text: '',
                        error1Code: 401,
                        error2Destination: '',
                        error2TargetField: '',
                        error2ModalClose: 2,
                        error2ButtonDisable: 2,
                        error2Text: '',
                        error2Code: 402,
                        error3Destination: '',
                        error3TargetField: '',
                        error3ModalClose: 2,
                        error3ButtonDisable: 2,
                        error3Text: '',
                        error3Code: 403,
                    },
                    button2SendField: {
                        successDestination: '',
                        successTargetField: '',
                        networkErrorDestination: '',
                        networkErrorTargetField: '',
                        networkErrorModalClose: 2,
                        networkErrorButtonDisable: 2,
                        networkErrorText: '',
                        error1Destination: '',
                        error1TargetField: '',
                        error1ModalClose: 2,
                        error1ButtonDisable: 2,
                        error1Text: '',
                        error1Code: 501,
                        error2Destination: '',
                        error2TargetField: '',
                        error2ModalClose: 2,
                        error2ButtonDisable: 2,
                        error2Text: '',
                        error2Code: 502,
                        error3Destination: '',
                        error3TargetField: '',
                        error3ModalClose: 2,
                        error3ButtonDisable: 2,
                        error3Text: '',
                        error3Code: 503,
                        sendTargetField: []
                    },
                    button2Destination: '',
                    button2HasModal: 2,
                    button2HasPressingFilter: 2,
                    button2HasSpinner: 3,
                    button2SpinnerSvg: '',

                    button2ModalButtonStructure: 3,
                    button2ModalButtonType: 'a',
                    button2ModalTrueText: '',
                    button2ModalFalseText: '',
                    button2ModalHight: 'h-auto',
                    button2ModalHeightSm: 'sm:h-auto',
                    button2ModalHeightMd: 'md:h-auto',
                    button2ModalHeightLg: 'lg:h-auto',
                    button2ModalHeightXl: 'xl:h-auto',
                    button2ModalHeight2xl: '2xl:h-auto',
                    button2ModalWidth: 'w-auto',
                    button2ModalWidthSm: 'sm:w-auto',
                    button2ModalWidthMd: 'md:w-auto',
                    button2ModalWidthLg: 'lg:w-auto',
                    button2ModalWidthXl: 'xl:w-auto',
                    button2ModalWidth2xl: '2xl:w-auto',
                    button2ModalBorderWidth: 'border-0',
                    button2ModalBorderStyle: 'border-solid',
                    button2ModalBorderRadius: 'rounded-none',
                    button2ModalBoxShadow: 'drop-shadow-none',
                    button2ModalErrorTextSize: 'text-base',
                    button2ModalErrorTextWeight: 'font-normal',
                    button2ModalErrorCustomClass: '',
                    button2ModalBorderColor: 'border-[#ffffff]',
                    button2ModalBackgroundColor: 'bg-[#ffffff]',
                    button2ModalBoxShadowColor: 'shadow-[#ffffff]',
                    button2ModalTextColor: 'text-[#ffffff]',

                    button2blocks: [],
                    button2ValidateFilters: [],
                    button2ModalBlockWrapCustomClass: '',
                    button2ModalButtonWrapCustomClass: '',
                    button2ModalModalWrapCustomClass: '',
                    button1CustomClass: '',
                    button2CustomClass: '',
                    itemSelectionOnThisPage: {},
                    button2FieldModify: 2,
                    button2FieldModifySetting: [],
                    memo: '',
                };


                freePages = freePages.map((page) => {
                    if (page.blocks.length > 0) {
                        let updatedBlock = page.blocks.map((blockInfo) => {
                            if (blockInfo.key == 'BUTTON' && blockInfo.hasOwnProperty('button1ValidateFilters') === false) {
                                let newButtonObject = { ...buttonDefautl, ...blockInfo };
                                return newButtonObject;
                            }
                            return blockInfo;
                        })
                        page.blocks = [...updatedBlock];
                        return page;
                    }
                    return page;
                })

                /*button blockUpdated*/
                let updatedCommonPages = defaultcommonPageList;
                updatedCommonPages = _.map(updatedCommonPages, (x) => {
                    const findItem = commonPages.find(i => i.appCommonPageURLName == x.appCommonPageURLName);
                    if (findItem) {
                        return { ...findItem, appCommonPageSubId: x.appCommonPageSubId };
                    }

                    return x;
                })

                setRecoilState((prevState) => ({
                    ...prevState,
                    appName: appData.appName,
                    activePageId: freePages.length > 0 ? freePages[0].appPageId : 0,
                    activeTab: 'freePages',
                    appURL: appData.domainURL,
                    tabItems: {
                        ...prevState.tabItems,
                        freePages: freePages,
                        //commonPages: commonPages.length > 0 ? commonPages : defaultcommonPageList,
                        commonPages: updatedCommonPages,
                        settings: {
                            appSettingQuery: {

                                pageFrameSettings: {
                                    classes: { ...prevState.tabItems.settings.appSettingQuery.pageFrameSettings.classes, ...pageFrameSettings.classes },
                                    prefixClass: {
                                        default: { ...prevState.tabItems.settings.appSettingQuery.pageFrameSettings.prefixClass.default, ...pageFrameSettings.prefixClass.default },
                                        sm: { ...prevState.tabItems.settings.appSettingQuery.pageFrameSettings.prefixClass.sm, ...pageFrameSettings.prefixClass.sm },
                                        md: { ...prevState.tabItems.settings.appSettingQuery.pageFrameSettings.prefixClass.md, ...pageFrameSettings.prefixClass.md },
                                        lg: { ...prevState.tabItems.settings.appSettingQuery.pageFrameSettings.prefixClass.lg, ...pageFrameSettings.prefixClass.lg },
                                        xl: { ...prevState.tabItems.settings.appSettingQuery.pageFrameSettings.prefixClass.xl, ...pageFrameSettings.prefixClass.xl },
                                        '2xl': { ...prevState.tabItems.settings.appSettingQuery.pageFrameSettings.prefixClass['2xl'], ...pageFrameSettings.prefixClass['2xl'] },
                                    },
                                    styles: {
                                        headerBackgroundColor: { ...prevState.tabItems.settings.appSettingQuery.pageFrameSettings.styles.headerBackgroundColor, ...pageFrameSettings.styles.headerBackgroundColor },
                                        headerBorderColor: { ...prevState.tabItems.settings.appSettingQuery.pageFrameSettings.styles.headerBorderColor, ...pageFrameSettings.styles.headerBorderColor },
                                        contentsBackgroundColor: { ...prevState.tabItems.settings.appSettingQuery.pageFrameSettings.styles.contentsBackgroundColor, ...pageFrameSettings.styles.contentsBackgroundColor },
                                        contentsBorderColor: { ...prevState.tabItems.settings.appSettingQuery.pageFrameSettings.styles.contentsBorderColor, ...pageFrameSettings.styles.contentsBorderColor },
                                        stretchBackgroundColor: { ...prevState.tabItems.settings.appSettingQuery.pageFrameSettings.styles.stretchBackgroundColor, ...pageFrameSettings.styles.stretchBackgroundColor },
                                    },
                                    info: { ...prevState.tabItems.settings.appSettingQuery.pageFrameSettings.info, ...pageFrameSettings.info },
                                    blocks: { ...prevState.tabItems.settings.appSettingQuery.pageFrameSettings.blocks, ...pageFrameSettings.blocks }
                                },


                                logoSettings: {
                                    classes: { ...prevState.tabItems.settings.appSettingQuery.logoSettings.classes, ...logoSettings.classes },
                                    info: { ...prevState.tabItems.settings.appSettingQuery.logoSettings.info, ...logoSettings.info },
                                    prefixClass: {
                                        default: { ...prevState.tabItems.settings.appSettingQuery.logoSettings.prefixClass.default, ...logoSettings.prefixClass.default },
                                        sm: { ...prevState.tabItems.settings.appSettingQuery.logoSettings.prefixClass.sm, ...logoSettings.prefixClass.sm },
                                        md: { ...prevState.tabItems.settings.appSettingQuery.logoSettings.prefixClass.md, ...logoSettings.prefixClass.md },
                                        lg: { ...prevState.tabItems.settings.appSettingQuery.logoSettings.prefixClass.lg, ...logoSettings.prefixClass.lg },
                                        xl: { ...prevState.tabItems.settings.appSettingQuery.logoSettings.prefixClass.xl, ...logoSettings.prefixClass.xl },
                                        '2xl': { ...prevState.tabItems.settings.appSettingQuery.logoSettings.prefixClass['2xl'], ...logoSettings.prefixClass['2xl'] }
                                    },
                                    styles: {
                                        textColor: { ...prevState.tabItems.settings.appSettingQuery.logoSettings.styles.textColor, ...logoSettings.styles.textColor }
                                    }
                                },


                                footerSettings: {
                                    classes: { ...prevState.tabItems.settings.appSettingQuery.footerSettings.classes, ...footerSettings.classes },
                                    info: { ...prevState.tabItems.settings.appSettingQuery.footerSettings.info, ...footerSettings.info },
                                    prefixClass: {
                                    },
                                    styles: {
                                        backgroundColor: { ...prevState.tabItems.settings.appSettingQuery.footerSettings.styles.backgroundColor, ...footerSettings.styles.backgroundColor },
                                        textColor: { ...prevState.tabItems.settings.appSettingQuery.footerSettings.styles.textColor, ...footerSettings.styles.textColor }
                                    },
                                    blocks: {},
                                },


                                step1Settings: {
                                    classes: { ...prevState.tabItems.settings.appSettingQuery.step1Settings.classes, ...step1Settings.classes },
                                    info: { ...prevState.tabItems.settings.appSettingQuery.step1Settings.info, ...step1Settings.info },
                                    prefixClass: {
                                        default: { ...prevState.tabItems.settings.appSettingQuery.step1Settings.prefixClass.default, ...step1Settings.prefixClass.default },
                                        sm: { ...prevState.tabItems.settings.appSettingQuery.step1Settings.prefixClass.sm, ...step1Settings.prefixClass.sm },
                                        md: { ...prevState.tabItems.settings.appSettingQuery.step1Settings.prefixClass.md, ...step1Settings.prefixClass.md },
                                        lg: { ...prevState.tabItems.settings.appSettingQuery.step1Settings.prefixClass.lg, ...step1Settings.prefixClass.lg },
                                        xl: { ...prevState.tabItems.settings.appSettingQuery.step1Settings.prefixClass.xl, ...step1Settings.prefixClass.xl },
                                        '2xl': { ...prevState.tabItems.settings.appSettingQuery.step1Settings.prefixClass['2xl'], ...step1Settings.prefixClass['2xl'] }
                                    },
                                    styles: {
                                        activeBackgroundColor: { ...prevState.tabItems.settings.appSettingQuery.step1Settings.styles.activeBackgroundColor, ...step1Settings.styles.activeBackgroundColor },
                                        activeBorderColor: { ...prevState.tabItems.settings.appSettingQuery.step1Settings.styles.activeBorderColor, ...step1Settings.styles.activeBorderColor },
                                        activeTextColor: { ...prevState.tabItems.settings.appSettingQuery.step1Settings.styles.activeTextColor, ...step1Settings.styles.activeTextColor },
                                        disableBackgroundColor: { ...prevState.tabItems.settings.appSettingQuery.step1Settings.styles.disableBackgroundColor, ...step1Settings.styles.disableBackgroundColor },
                                        disableBorderColor: { ...prevState.tabItems.settings.appSettingQuery.step1Settings.styles.disableBorderColor, ...step1Settings.styles.disableBorderColor },
                                        disableTextColor: { ...prevState.tabItems.settings.appSettingQuery.step1Settings.styles.disableTextColor, ...step1Settings.styles.disableTextColor },
                                        activeExplanationTextColor: { ...prevState.tabItems.settings.appSettingQuery.step1Settings.styles.activeExplanationTextColor, ...step1Settings.styles.activeExplanationTextColor },
                                        disableExplanationTextColor: { ...prevState.tabItems.settings.appSettingQuery.step1Settings.styles.disableExplanationTextColor, ...step1Settings.styles.disableExplanationTextColor },
                                    },
                                    blocks: {},
                                },


                                step2Settings: {
                                    classes: { ...prevState.tabItems.settings.appSettingQuery.step2Settings.classes, ...step2Settings.classes },
                                    info: { ...prevState.tabItems.settings.appSettingQuery.step2Settings.info, ...step2Settings.info },
                                    prefixClass: {
                                        default: { ...prevState.tabItems.settings.appSettingQuery.step2Settings.prefixClass.default, ...step2Settings.prefixClass.default },
                                        sm: { ...prevState.tabItems.settings.appSettingQuery.step2Settings.prefixClass.sm, ...step2Settings.prefixClass.sm },
                                        md: { ...prevState.tabItems.settings.appSettingQuery.step2Settings.prefixClass.md, ...step2Settings.prefixClass.md },
                                        lg: { ...prevState.tabItems.settings.appSettingQuery.step2Settings.prefixClass.lg, ...step2Settings.prefixClass.lg },
                                        xl: { ...prevState.tabItems.settings.appSettingQuery.step2Settings.prefixClass.xl, ...step2Settings.prefixClass.xl },
                                        '2xl': { ...prevState.tabItems.settings.appSettingQuery.step2Settings.prefixClass['2xl'], ...step2Settings.prefixClass['2xl'] }
                                    },
                                    styles: {
                                        activeBackgroundColor: { ...prevState.tabItems.settings.appSettingQuery.step2Settings.styles.activeBackgroundColor, ...step2Settings.styles.activeBackgroundColor },
                                        activeBorderColor: { ...prevState.tabItems.settings.appSettingQuery.step2Settings.styles.activeBorderColor, ...step2Settings.styles.activeBorderColor },
                                        activeTextColor: { ...prevState.tabItems.settings.appSettingQuery.step2Settings.styles.activeTextColor, ...step2Settings.styles.activeTextColor },
                                        disableBackgroundColor: { ...prevState.tabItems.settings.appSettingQuery.step2Settings.styles.disableBackgroundColor, ...step2Settings.styles.disableBackgroundColor },
                                        disableBorderColor: { ...prevState.tabItems.settings.appSettingQuery.step2Settings.styles.disableBorderColor, ...step2Settings.styles.disableBorderColor },
                                        disableTextColor: { ...prevState.tabItems.settings.appSettingQuery.step2Settings.styles.disableTextColor, ...step2Settings.styles.disableTextColor },
                                        activeExplanationTextColor: { ...prevState.tabItems.settings.appSettingQuery.step2Settings.styles.activeExplanationTextColor, ...step2Settings.styles.activeExplanationTextColor },
                                        disableExplanationTextColor: { ...prevState.tabItems.settings.appSettingQuery.step2Settings.styles.disableExplanationTextColor, ...step2Settings.styles.disableExplanationTextColor },
                                    },
                                    blocks: {},
                                },


                                step3Settings: {
                                    classes: { ...prevState.tabItems.settings.appSettingQuery.step3Settings.classes, ...step3Settings.classes },
                                    info: { ...prevState.tabItems.settings.appSettingQuery.step3Settings.info, ...step3Settings.info },
                                    prefixClass: {
                                        default: { ...prevState.tabItems.settings.appSettingQuery.step3Settings.prefixClass.default, ...step3Settings.prefixClass.default },
                                        sm: { ...prevState.tabItems.settings.appSettingQuery.step3Settings.prefixClass.sm, ...step3Settings.prefixClass.sm },
                                        md: { ...prevState.tabItems.settings.appSettingQuery.step3Settings.prefixClass.md, ...step3Settings.prefixClass.md },
                                        lg: { ...prevState.tabItems.settings.appSettingQuery.step3Settings.prefixClass.lg, ...step3Settings.prefixClass.lg },
                                        xl: { ...prevState.tabItems.settings.appSettingQuery.step3Settings.prefixClass.xl, ...step3Settings.prefixClass.xl },
                                        '2xl': { ...prevState.tabItems.settings.appSettingQuery.step3Settings.prefixClass['2xl'], ...step3Settings.prefixClass['2xl'] }
                                    },
                                    styles: {
                                        activeBackgroundColor: { ...prevState.tabItems.settings.appSettingQuery.step3Settings.styles.activeBackgroundColor, ...step3Settings.styles.activeBackgroundColor },
                                        activeBorderColor: { ...prevState.tabItems.settings.appSettingQuery.step3Settings.styles.activeBorderColor, ...step3Settings.styles.activeBorderColor },
                                        activeTextColor: { ...prevState.tabItems.settings.appSettingQuery.step3Settings.styles.activeTextColor, ...step3Settings.styles.activeTextColor },
                                        disableBackgroundColor: { ...prevState.tabItems.settings.appSettingQuery.step3Settings.styles.disableBackgroundColor, ...step3Settings.styles.disableBackgroundColor },
                                        disableBorderColor: { ...prevState.tabItems.settings.appSettingQuery.step3Settings.styles.disableBorderColor, ...step3Settings.styles.disableBorderColor },
                                        disableTextColor: { ...prevState.tabItems.settings.appSettingQuery.step3Settings.styles.disableTextColor, ...step3Settings.styles.disableTextColor },
                                        activeExplanationTextColor: { ...prevState.tabItems.settings.appSettingQuery.step3Settings.styles.activeExplanationTextColor, ...step3Settings.styles.activeExplanationTextColor },
                                        disableExplanationTextColor: { ...prevState.tabItems.settings.appSettingQuery.step3Settings.styles.disableExplanationTextColor, ...step3Settings.styles.disableExplanationTextColor },
                                    },
                                    blocks: {},
                                },


                                buttonASettings: {
                                    classes: { ...prevState.tabItems.settings.appSettingQuery.buttonASettings.classes, ...buttonASettings.classes },
                                    info: {},
                                    prefixClass: {
                                        default: { ...prevState.tabItems.settings.appSettingQuery.buttonASettings.prefixClass.default, ...buttonASettings.prefixClass.default },
                                        hover: { ...prevState.tabItems.settings.appSettingQuery.buttonASettings.prefixClass.hover, ...buttonASettings.prefixClass.hover },
                                        focus: { ...prevState.tabItems.settings.appSettingQuery.buttonASettings.prefixClass.focus, ...buttonASettings.prefixClass.focus },
                                        active: { ...prevState.tabItems.settings.appSettingQuery.buttonASettings.prefixClass.active, ...buttonASettings.prefixClass.active },
                                        disabled: { ...prevState.tabItems.settings.appSettingQuery.buttonASettings.prefixClass.disabled, ...buttonASettings.prefixClass.disabled }
                                    },
                                    styles: {
                                        backgroundColor: { ...prevState.tabItems.settings.appSettingQuery.buttonASettings.styles.backgroundColor, ...buttonASettings.styles.backgroundColor },
                                        backgroundColorHover: { ...prevState.tabItems.settings.appSettingQuery.buttonASettings.styles.backgroundColorHover, ...buttonASettings.styles.backgroundColorHover },
                                        backgroundColorFocus: { ...prevState.tabItems.settings.appSettingQuery.buttonASettings.styles.backgroundColorFocus, ...buttonASettings.styles.backgroundColorFocus },
                                        backgroundColorActive: { ...prevState.tabItems.settings.appSettingQuery.buttonASettings.styles.backgroundColorActive, ...buttonASettings.styles.backgroundColorActive },
                                        backgroundColorDisabled: { ...prevState.tabItems.settings.appSettingQuery.buttonASettings.styles.backgroundColorDisabled, ...buttonASettings.styles.backgroundColorDisabled },
                                        textColor: { ...prevState.tabItems.settings.appSettingQuery.buttonASettings.styles.textColor, ...buttonASettings.styles.textColor },
                                        textColorHover: { ...prevState.tabItems.settings.appSettingQuery.buttonASettings.styles.textColorHover, ...buttonASettings.styles.textColorHover },
                                        textColorFocus: { ...prevState.tabItems.settings.appSettingQuery.buttonASettings.styles.textColorFocus, ...buttonASettings.styles.textColorFocus },
                                        textColorActive: { ...prevState.tabItems.settings.appSettingQuery.buttonASettings.styles.textColorActive, ...buttonASettings.styles.textColorActive },
                                        textColorDisabled: { ...prevState.tabItems.settings.appSettingQuery.buttonASettings.styles.textColorDisabled, ...buttonASettings.styles.textColorDisabled },
                                        borderColor: { ...prevState.tabItems.settings.appSettingQuery.buttonASettings.styles.borderColor, ...buttonASettings.styles.borderColor },
                                        borderColorHover: { ...prevState.tabItems.settings.appSettingQuery.buttonASettings.styles.borderColorHover, ...buttonASettings.styles.borderColorHover },
                                        borderColorFocus: { ...prevState.tabItems.settings.appSettingQuery.buttonASettings.styles.borderColorFocus, ...buttonASettings.styles.borderColorFocus },
                                        borderColorActive: { ...prevState.tabItems.settings.appSettingQuery.buttonASettings.styles.borderColorActive, ...buttonASettings.styles.borderColorActive },
                                        borderColorDisabled: { ...prevState.tabItems.settings.appSettingQuery.buttonASettings.styles.borderColorDisabled, ...buttonASettings.styles.borderColorDisabled },
                                        ringColorFocus: { ...prevState.tabItems.settings.appSettingQuery.buttonASettings.styles.ringColorFocus, ...buttonASettings.styles.ringColorFocus },
                                        ringColorActive: { ...prevState.tabItems.settings.appSettingQuery.buttonASettings.styles.ringColorActive, ...buttonASettings.styles.ringColorActive },
                                        spinnerColor: { ...prevState.tabItems.settings.appSettingQuery.buttonASettings.styles.spinnerColor, ...buttonASettings.styles.spinnerColor },
                                        ringWidthActive: { ...prevState.tabItems.settings.appSettingQuery.buttonASettings.styles.ringWidthActive, ...buttonASettings.styles.ringWidthActive },
                                        ringOffsetWidthActive: { ...prevState.tabItems.settings.appSettingQuery.buttonASettings.styles.ringOffsetWidthActive, ...buttonASettings.styles.ringOffsetWidthActive },
                                        ringWidthFocus: { ...prevState.tabItems.settings.appSettingQuery.buttonASettings.styles.ringWidthFocus, ...buttonASettings.styles.ringWidthFocus },
                                        ringOffsetWidthFocus: { ...prevState.tabItems.settings.appSettingQuery.buttonASettings.styles.ringOffsetWidthFocus, ...buttonASettings.styles.ringOffsetWidthFocus },
                                        boxShadowActive: { ...prevState.tabItems.settings.appSettingQuery.buttonASettings.styles.boxShadowActive, ...buttonASettings.styles.boxShadowActive },
                                        boxShadowDisabled: { ...prevState.tabItems.settings.appSettingQuery.buttonASettings.styles.boxShadowDisabled, ...buttonASettings.styles.boxShadowDisabled },
                                    },
                                    blocks: {},
                                },


                                buttonBSettings: {
                                    classes: { ...prevState.tabItems.settings.appSettingQuery.buttonBSettings.classes, ...buttonBSettings.classes },
                                    info: {},
                                    prefixClass: {
                                        default: { ...prevState.tabItems.settings.appSettingQuery.buttonBSettings.prefixClass.default, ...buttonBSettings.prefixClass.default },
                                        hover: { ...prevState.tabItems.settings.appSettingQuery.buttonBSettings.prefixClass.hover, ...buttonBSettings.prefixClass.hover },
                                        focus: { ...prevState.tabItems.settings.appSettingQuery.buttonBSettings.prefixClass.focus, ...buttonBSettings.prefixClass.focus },
                                        active: { ...prevState.tabItems.settings.appSettingQuery.buttonBSettings.prefixClass.active, ...buttonBSettings.prefixClass.active },
                                        disabled: { ...prevState.tabItems.settings.appSettingQuery.buttonBSettings.prefixClass.disabled, ...buttonBSettings.prefixClass.disabled }
                                    },
                                    styles: {
                                        backgroundColor: { ...prevState.tabItems.settings.appSettingQuery.buttonBSettings.styles.backgroundColor, ...buttonBSettings.styles.backgroundColor },
                                        backgroundColorHover: { ...prevState.tabItems.settings.appSettingQuery.buttonBSettings.styles.backgroundColorHover, ...buttonBSettings.styles.backgroundColorHover },
                                        backgroundColorFocus: { ...prevState.tabItems.settings.appSettingQuery.buttonBSettings.styles.backgroundColorFocus, ...buttonBSettings.styles.backgroundColorFocus },
                                        backgroundColorActive: { ...prevState.tabItems.settings.appSettingQuery.buttonBSettings.styles.backgroundColorActive, ...buttonBSettings.styles.backgroundColorActive },
                                        backgroundColorDisabled: { ...prevState.tabItems.settings.appSettingQuery.buttonBSettings.styles.backgroundColorDisabled, ...buttonBSettings.styles.backgroundColorDisabled },
                                        textColor: { ...prevState.tabItems.settings.appSettingQuery.buttonBSettings.styles.textColor, ...buttonBSettings.styles.textColor },
                                        textColorHover: { ...prevState.tabItems.settings.appSettingQuery.buttonBSettings.styles.textColorHover, ...buttonBSettings.styles.textColorHover },
                                        textColorFocus: { ...prevState.tabItems.settings.appSettingQuery.buttonBSettings.styles.textColorFocus, ...buttonBSettings.styles.textColorFocus },
                                        textColorActive: { ...prevState.tabItems.settings.appSettingQuery.buttonBSettings.styles.textColorActive, ...buttonBSettings.styles.textColorActive },
                                        textColorDisabled: { ...prevState.tabItems.settings.appSettingQuery.buttonBSettings.styles.textColorDisabled, ...buttonBSettings.styles.textColorDisabled },
                                        borderColor: { ...prevState.tabItems.settings.appSettingQuery.buttonBSettings.styles.borderColor, ...buttonBSettings.styles.borderColor },
                                        borderColorHover: { ...prevState.tabItems.settings.appSettingQuery.buttonBSettings.styles.borderColorHover, ...buttonBSettings.styles.borderColorHover },
                                        borderColorFocus: { ...prevState.tabItems.settings.appSettingQuery.buttonBSettings.styles.borderColorFocus, ...buttonBSettings.styles.borderColorFocus },
                                        borderColorActive: { ...prevState.tabItems.settings.appSettingQuery.buttonBSettings.styles.borderColorActive, ...buttonBSettings.styles.borderColorActive },
                                        borderColorDisabled: { ...prevState.tabItems.settings.appSettingQuery.buttonBSettings.styles.borderColorDisabled, ...buttonBSettings.styles.borderColorDisabled },
                                        ringColorFocus: { ...prevState.tabItems.settings.appSettingQuery.buttonBSettings.styles.ringColorFocus, ...buttonBSettings.styles.ringColorFocus },
                                        ringColorActive: { ...prevState.tabItems.settings.appSettingQuery.buttonBSettings.styles.ringColorActive, ...buttonBSettings.styles.ringColorActive },
                                        spinnerColor: { ...prevState.tabItems.settings.appSettingQuery.buttonBSettings.styles.spinnerColor, ...buttonBSettings.styles.spinnerColor },
                                        ringWidthActive: { ...prevState.tabItems.settings.appSettingQuery.buttonBSettings.styles.ringWidthActive, ...buttonBSettings.styles.ringWidthActive },
                                        ringOffsetWidthActive: { ...prevState.tabItems.settings.appSettingQuery.buttonBSettings.styles.ringOffsetWidthActive, ...buttonBSettings.styles.ringOffsetWidthActive },
                                        ringWidthFocus: { ...prevState.tabItems.settings.appSettingQuery.buttonBSettings.styles.ringWidthFocus, ...buttonBSettings.styles.ringWidthFocus },
                                        ringOffsetWidthFocus: { ...prevState.tabItems.settings.appSettingQuery.buttonBSettings.styles.ringOffsetWidthFocus, ...buttonBSettings.styles.ringOffsetWidthFocus },
                                        boxShadowActive: { ...prevState.tabItems.settings.appSettingQuery.buttonBSettings.styles.boxShadowActive, ...buttonBSettings.styles.boxShadowActive },
                                        boxShadowDisabled: { ...prevState.tabItems.settings.appSettingQuery.buttonBSettings.styles.boxShadowDisabled, ...buttonBSettings.styles.boxShadowDisabled },
                                    },
                                    blocks: {},
                                },

                                buttonCSettings: {
                                    classes: { ...prevState.tabItems.settings.appSettingQuery.buttonCSettings.classes, ...buttonCSettings.classes },
                                    info: {},
                                    prefixClass: {
                                        default: { ...prevState.tabItems.settings.appSettingQuery.buttonCSettings.prefixClass.default, ...buttonCSettings.prefixClass.default },
                                        hover: { ...prevState.tabItems.settings.appSettingQuery.buttonCSettings.prefixClass.hover, ...buttonCSettings.prefixClass.hover },
                                        focus: { ...prevState.tabItems.settings.appSettingQuery.buttonCSettings.prefixClass.focus, ...buttonCSettings.prefixClass.focus },
                                        active: { ...prevState.tabItems.settings.appSettingQuery.buttonCSettings.prefixClass.active, ...buttonCSettings.prefixClass.active },
                                        disabled: { ...prevState.tabItems.settings.appSettingQuery.buttonCSettings.prefixClass.disabled, ...buttonCSettings.prefixClass.disabled }
                                    },
                                    styles: {
                                        backgroundColor: { ...prevState.tabItems.settings.appSettingQuery.buttonCSettings.styles.backgroundColor, ...buttonCSettings.styles.backgroundColor },
                                        backgroundColorHover: { ...prevState.tabItems.settings.appSettingQuery.buttonCSettings.styles.backgroundColorHover, ...buttonCSettings.styles.backgroundColorHover },
                                        backgroundColorFocus: { ...prevState.tabItems.settings.appSettingQuery.buttonCSettings.styles.backgroundColorFocus, ...buttonCSettings.styles.backgroundColorFocus },
                                        backgroundColorActive: { ...prevState.tabItems.settings.appSettingQuery.buttonCSettings.styles.backgroundColorActive, ...buttonCSettings.styles.backgroundColorActive },
                                        backgroundColorDisabled: { ...prevState.tabItems.settings.appSettingQuery.buttonCSettings.styles.backgroundColorDisabled, ...buttonCSettings.styles.backgroundColorDisabled },
                                        textColor: { ...prevState.tabItems.settings.appSettingQuery.buttonCSettings.styles.textColor, ...buttonCSettings.styles.textColor },
                                        textColorHover: { ...prevState.tabItems.settings.appSettingQuery.buttonCSettings.styles.textColorHover, ...buttonCSettings.styles.textColorHover },
                                        textColorFocus: { ...prevState.tabItems.settings.appSettingQuery.buttonCSettings.styles.textColorFocus, ...buttonCSettings.styles.textColorFocus },
                                        textColorActive: { ...prevState.tabItems.settings.appSettingQuery.buttonCSettings.styles.textColorActive, ...buttonCSettings.styles.textColorActive },
                                        textColorDisabled: { ...prevState.tabItems.settings.appSettingQuery.buttonCSettings.styles.textColorDisabled, ...buttonCSettings.styles.textColorDisabled },
                                        borderColor: { ...prevState.tabItems.settings.appSettingQuery.buttonCSettings.styles.borderColor, ...buttonCSettings.styles.borderColor },
                                        borderColorHover: { ...prevState.tabItems.settings.appSettingQuery.buttonCSettings.styles.borderColorHover, ...buttonCSettings.styles.borderColorHover },
                                        borderColorFocus: { ...prevState.tabItems.settings.appSettingQuery.buttonCSettings.styles.borderColorFocus, ...buttonCSettings.styles.borderColorFocus },
                                        borderColorActive: { ...prevState.tabItems.settings.appSettingQuery.buttonCSettings.styles.borderColorActive, ...buttonCSettings.styles.borderColorActive },
                                        borderColorDisabled: { ...prevState.tabItems.settings.appSettingQuery.buttonCSettings.styles.borderColorDisabled, ...buttonCSettings.styles.borderColorDisabled },
                                        ringColorFocus: { ...prevState.tabItems.settings.appSettingQuery.buttonCSettings.styles.ringColorFocus, ...buttonCSettings.styles.ringColorFocus },
                                        ringColorActive: { ...prevState.tabItems.settings.appSettingQuery.buttonCSettings.styles.ringColorActive, ...buttonCSettings.styles.ringColorActive },
                                        spinnerColor: { ...prevState.tabItems.settings.appSettingQuery.buttonCSettings.styles.spinnerColor, ...buttonCSettings.styles.spinnerColor },
                                        ringWidthActive: { ...prevState.tabItems.settings.appSettingQuery.buttonCSettings.styles.ringWidthActive, ...buttonCSettings.styles.ringWidthActive },
                                        ringOffsetWidthActive: { ...prevState.tabItems.settings.appSettingQuery.buttonCSettings.styles.ringOffsetWidthActive, ...buttonCSettings.styles.ringOffsetWidthActive },
                                        ringWidthFocus: { ...prevState.tabItems.settings.appSettingQuery.buttonCSettings.styles.ringWidthFocus, ...buttonCSettings.styles.ringWidthFocus },
                                        ringOffsetWidthFocus: { ...prevState.tabItems.settings.appSettingQuery.buttonCSettings.styles.ringOffsetWidthFocus, ...buttonCSettings.styles.ringOffsetWidthFocus },
                                        boxShadowActive: { ...prevState.tabItems.settings.appSettingQuery.buttonCSettings.styles.boxShadowActive, ...buttonCSettings.styles.boxShadowActive },
                                        boxShadowDisabled: { ...prevState.tabItems.settings.appSettingQuery.buttonCSettings.styles.boxShadowDisabled, ...buttonCSettings.styles.boxShadowDisabled },
                                    },
                                    blocks: {},
                                },


                                informationAreaSttings: {
                                    classes: { ...prevState.tabItems.settings.appSettingQuery.informationAreaSttings.classes, ...informationAreaSttings.classes },
                                    styles: { ...prevState.tabItems.settings.appSettingQuery.informationAreaSttings.styles, ...informationAreaSttings.styles }
                                },


                                h1Settings: {
                                    classes: { ...prevState.tabItems.settings.appSettingQuery.h1Settings.classes, ...h1Settings.classes },
                                    prefixClass: {
                                        default: { ...prevState.tabItems.settings.appSettingQuery.h1Settings.prefixClass.default, ...h1Settings.prefixClass.default },
                                        sm: { ...prevState.tabItems.settings.appSettingQuery.h1Settings.prefixClass.sm, ...h1Settings.prefixClass.sm },
                                        md: { ...prevState.tabItems.settings.appSettingQuery.h1Settings.prefixClass.md, ...h1Settings.prefixClass.md },
                                        lg: { ...prevState.tabItems.settings.appSettingQuery.h1Settings.prefixClass.lg, ...h1Settings.prefixClass.lg },
                                        xl: { ...prevState.tabItems.settings.appSettingQuery.h1Settings.prefixClass.xl, ...h1Settings.prefixClass.xl },
                                        '2xl': { ...prevState.tabItems.settings.appSettingQuery.h1Settings.prefixClass['2xl'], ...h1Settings.prefixClass['2xl'] }
                                    },
                                    styles: {
                                        textColor: { ...prevState.tabItems.settings.appSettingQuery.h1Settings.styles.textColor, ...h1Settings.styles.textColor },
                                        backgroundColor: { ...prevState.tabItems.settings.appSettingQuery.h1Settings.styles.backgroundColor, ...h1Settings.styles.backgroundColor },
                                        borderColor: { ...prevState.tabItems.settings.appSettingQuery.h1Settings.styles.borderColor, ...h1Settings.styles.borderColor },
                                    },
                                },


                                h2Settings: {
                                    classes: { ...prevState.tabItems.settings.appSettingQuery.h2Settings.classes, ...h2Settings.classes },
                                    prefixClass: {
                                        default: { ...prevState.tabItems.settings.appSettingQuery.h2Settings.prefixClass.default, ...h2Settings.prefixClass.default },
                                        sm: { ...prevState.tabItems.settings.appSettingQuery.h2Settings.prefixClass.sm, ...h2Settings.prefixClass.sm },
                                        md: { ...prevState.tabItems.settings.appSettingQuery.h2Settings.prefixClass.md, ...h2Settings.prefixClass.md },
                                        lg: { ...prevState.tabItems.settings.appSettingQuery.h2Settings.prefixClass.lg, ...h2Settings.prefixClass.lg },
                                        xl: { ...prevState.tabItems.settings.appSettingQuery.h2Settings.prefixClass.xl, ...h2Settings.prefixClass.xl },
                                        '2xl': { ...prevState.tabItems.settings.appSettingQuery.h2Settings.prefixClass['2xl'], ...h2Settings.prefixClass['2xl'] }
                                    },
                                    styles: {
                                        textColor: { ...prevState.tabItems.settings.appSettingQuery.h2Settings.styles.textColor, ...h2Settings.styles.textColor },
                                        backgroundColor: { ...prevState.tabItems.settings.appSettingQuery.h2Settings.styles.backgroundColor, ...h2Settings.styles.backgroundColor },
                                        borderColor: { ...prevState.tabItems.settings.appSettingQuery.h2Settings.styles.borderColor, ...h2Settings.styles.borderColor },
                                    },
                                },


                                h3Settings: {
                                    classes: { ...prevState.tabItems.settings.appSettingQuery.h3Settings.classes, ...h3Settings.classes },
                                    prefixClass: {
                                        default: { ...prevState.tabItems.settings.appSettingQuery.h3Settings.prefixClass.default, ...h3Settings.prefixClass.default },
                                        sm: { ...prevState.tabItems.settings.appSettingQuery.h3Settings.prefixClass.sm, ...h3Settings.prefixClass.sm },
                                        md: { ...prevState.tabItems.settings.appSettingQuery.h3Settings.prefixClass.md, ...h3Settings.prefixClass.md },
                                        lg: { ...prevState.tabItems.settings.appSettingQuery.h3Settings.prefixClass.lg, ...h3Settings.prefixClass.lg },
                                        xl: { ...prevState.tabItems.settings.appSettingQuery.h3Settings.prefixClass.xl, ...h3Settings.prefixClass.xl },
                                        '2xl': { ...prevState.tabItems.settings.appSettingQuery.h3Settings.prefixClass['2xl'], ...h3Settings.prefixClass['2xl'] }
                                    },
                                    styles: {
                                        textColor: { ...prevState.tabItems.settings.appSettingQuery.h3Settings.styles.textColor, ...h3Settings.styles.textColor },
                                        backgroundColor: { ...prevState.tabItems.settings.appSettingQuery.h3Settings.styles.backgroundColor, ...h3Settings.styles.backgroundColor },
                                        borderColor: { ...prevState.tabItems.settings.appSettingQuery.h3Settings.styles.borderColor, ...h3Settings.styles.borderColor },
                                    },
                                },


                                h4Settings: {
                                    classes: { ...prevState.tabItems.settings.appSettingQuery.h4Settings.classes, ...h4Settings.classes },
                                    prefixClass: {
                                        default: { ...prevState.tabItems.settings.appSettingQuery.h4Settings.prefixClass.default, ...h4Settings.prefixClass.default },
                                        sm: { ...prevState.tabItems.settings.appSettingQuery.h4Settings.prefixClass.sm, ...h4Settings.prefixClass.sm },
                                        md: { ...prevState.tabItems.settings.appSettingQuery.h4Settings.prefixClass.md, ...h4Settings.prefixClass.md },
                                        lg: { ...prevState.tabItems.settings.appSettingQuery.h4Settings.prefixClass.lg, ...h4Settings.prefixClass.lg },
                                        xl: { ...prevState.tabItems.settings.appSettingQuery.h4Settings.prefixClass.xl, ...h4Settings.prefixClass.xl },
                                        '2xl': { ...prevState.tabItems.settings.appSettingQuery.h4Settings.prefixClass['2xl'], ...h4Settings.prefixClass['2xl'] }
                                    },
                                    styles: {
                                        textColor: { ...prevState.tabItems.settings.appSettingQuery.h4Settings.styles.textColor, ...h4Settings.styles.textColor },
                                        backgroundColor: { ...prevState.tabItems.settings.appSettingQuery.h4Settings.styles.backgroundColor, ...h4Settings.styles.backgroundColor },
                                        borderColor: { ...prevState.tabItems.settings.appSettingQuery.h4Settings.styles.borderColor, ...h4Settings.styles.borderColor },
                                    },
                                },


                                h5Settings: {
                                    classes: { ...prevState.tabItems.settings.appSettingQuery.h5Settings.classes, ...h5Settings.classes },
                                    prefixClass: {
                                        default: { ...prevState.tabItems.settings.appSettingQuery.h5Settings.prefixClass.default, ...h5Settings.prefixClass.default },
                                        sm: { ...prevState.tabItems.settings.appSettingQuery.h5Settings.prefixClass.sm, ...h5Settings.prefixClass.sm },
                                        md: { ...prevState.tabItems.settings.appSettingQuery.h5Settings.prefixClass.md, ...h5Settings.prefixClass.md },
                                        lg: { ...prevState.tabItems.settings.appSettingQuery.h5Settings.prefixClass.lg, ...h5Settings.prefixClass.lg },
                                        xl: { ...prevState.tabItems.settings.appSettingQuery.h5Settings.prefixClass.xl, ...h5Settings.prefixClass.xl },
                                        '2xl': { ...prevState.tabItems.settings.appSettingQuery.h5Settings.prefixClass['2xl'], ...h5Settings.prefixClass['2xl'] }
                                    },
                                    styles: {
                                        textColor: { ...prevState.tabItems.settings.appSettingQuery.h5Settings.styles.textColor, ...h5Settings.styles.textColor },
                                        backgroundColor: { ...prevState.tabItems.settings.appSettingQuery.h5Settings.styles.backgroundColor, ...h5Settings.styles.backgroundColor },
                                        borderColor: { ...prevState.tabItems.settings.appSettingQuery.h5Settings.styles.borderColor, ...h5Settings.styles.borderColor },
                                    },
                                },


                                h6Settings: {
                                    classes: { ...prevState.tabItems.settings.appSettingQuery.h6Settings.classes, ...h6Settings.classes },
                                    prefixClass: {
                                        default: { ...prevState.tabItems.settings.appSettingQuery.h6Settings.prefixClass.default, ...h6Settings.prefixClass.default },
                                        sm: { ...prevState.tabItems.settings.appSettingQuery.h6Settings.prefixClass.sm, ...h6Settings.prefixClass.sm },
                                        md: { ...prevState.tabItems.settings.appSettingQuery.h6Settings.prefixClass.md, ...h6Settings.prefixClass.md },
                                        lg: { ...prevState.tabItems.settings.appSettingQuery.h6Settings.prefixClass.lg, ...h6Settings.prefixClass.lg },
                                        xl: { ...prevState.tabItems.settings.appSettingQuery.h6Settings.prefixClass.xl, ...h6Settings.prefixClass.xl },
                                        '2xl': { ...prevState.tabItems.settings.appSettingQuery.h6Settings.prefixClass['2xl'], ...h6Settings.prefixClass['2xl'] }
                                    },
                                    styles: {
                                        textColor: { ...prevState.tabItems.settings.appSettingQuery.h6Settings.styles.textColor, ...h6Settings.styles.textColor },
                                        backgroundColor: { ...prevState.tabItems.settings.appSettingQuery.h6Settings.styles.backgroundColor, ...h6Settings.styles.backgroundColor },
                                        borderColor: { ...prevState.tabItems.settings.appSettingQuery.h6Settings.styles.borderColor, ...h6Settings.styles.borderColor },
                                    },
                                },


                                faviconSettings: {
                                    info: { ...prevState.tabItems.settings.appSettingQuery.faviconSettings.info, ...faviconSettings.info },
                                    styles: {},
                                    classes: {},
                                    blocks: {},
                                    prefixClass: {},
                                },

                                inputTextSettings: {
                                    info: { ...prevState.tabItems.settings.appSettingQuery.inputTextSettings.info, ...inputTextSettings.info },
                                    styles: {
                                        labelTextColor: { ...prevState.tabItems.settings.appSettingQuery.inputTextSettings.styles.labelTextColor, ...inputTextSettings.styles.labelTextColor },
                                        requiredTextColor: { ...prevState.tabItems.settings.appSettingQuery.inputTextSettings.styles.requiredTextColor, ...inputTextSettings.styles.requiredTextColor },
                                        requiredBackgroundColor: { ...prevState.tabItems.settings.appSettingQuery.inputTextSettings.styles.requiredBackgroundColor, ...inputTextSettings.styles.requiredBackgroundColor },
                                        valueTextColor: { ...prevState.tabItems.settings.appSettingQuery.inputTextSettings.styles.valueTextColor, ...inputTextSettings.styles.valueTextColor },
                                        placeholderTextColor: { ...prevState.tabItems.settings.appSettingQuery.inputTextSettings.styles.placeholderTextColor, ...inputTextSettings.styles.placeholderTextColor },
                                        errorMessageTextColor: { ...prevState.tabItems.settings.appSettingQuery.inputTextSettings.styles.errorMessageTextColor, ...inputTextSettings.styles.errorMessageTextColor },
                                        errorMessageBackgroundColor: { ...prevState.tabItems.settings.appSettingQuery.inputTextSettings.styles.errorMessageBackgroundColor, ...inputTextSettings.styles.errorMessageBackgroundColor },
                                        divisionTextColor: { ...prevState.tabItems.settings.appSettingQuery.inputTextSettings.styles.divisionTextColor, ...inputTextSettings.styles.divisionTextColor },
                                        inputBackgroundColor: { ...prevState.tabItems.settings.appSettingQuery.inputTextSettings.styles.inputBackgroundColor, ...inputTextSettings.styles.inputBackgroundColor },
                                        inputBorderColor: { ...prevState.tabItems.settings.appSettingQuery.inputTextSettings.styles.inputBorderColor, ...inputTextSettings.styles.inputBorderColor },
                                    },
                                    classes: { ...prevState.tabItems.settings.appSettingQuery.inputTextSettings.classes, ...inputTextSettings.classes },
                                    blocks: {},
                                    prefixClass: {},
                                },


                                textareaFormSettings: {
                                    info: { ...prevState.tabItems.settings.appSettingQuery.textareaFormSettings.info, ...textareaFormSettings.info },
                                    styles: {
                                        labelTextColor: { ...prevState.tabItems.settings.appSettingQuery.textareaFormSettings.styles.labelTextColor, ...textareaFormSettings.styles.labelTextColor },
                                        requiredTextColor: { ...prevState.tabItems.settings.appSettingQuery.textareaFormSettings.styles.requiredTextColor, ...textareaFormSettings.styles.requiredTextColor },
                                        requiredBackgroundColor: { ...prevState.tabItems.settings.appSettingQuery.textareaFormSettings.styles.requiredBackgroundColor, ...textareaFormSettings.styles.requiredBackgroundColor },
                                        valueTextColor: { ...prevState.tabItems.settings.appSettingQuery.textareaFormSettings.styles.valueTextColor, ...textareaFormSettings.styles.valueTextColor },
                                        placeholderTextColor: { ...prevState.tabItems.settings.appSettingQuery.textareaFormSettings.styles.placeholderTextColor, ...textareaFormSettings.styles.placeholderTextColor },
                                        valueBackgroundColor: { ...prevState.tabItems.settings.appSettingQuery.textareaFormSettings.styles.valueBackgroundColor, ...textareaFormSettings.styles.valueBackgroundColor },
                                        valueBorderColor: { ...prevState.tabItems.settings.appSettingQuery.textareaFormSettings.styles.valueBorderColor, ...textareaFormSettings.styles.valueBorderColor },
                                        errorMessageTextColor: { ...prevState.tabItems.settings.appSettingQuery.textareaFormSettings.styles.errorMessageTextColor, ...textareaFormSettings.styles.errorMessageTextColor },
                                        errorMessageBackgroundColor: { ...prevState.tabItems.settings.appSettingQuery.textareaFormSettings.styles.errorMessageBackgroundColor, ...textareaFormSettings.styles.errorMessageBackgroundColor },
                                    },
                                    classes: { ...prevState.tabItems.settings.appSettingQuery.textareaFormSettings.classes, ...textareaFormSettings.classes },
                                    blocks: {},
                                    prefixClass: {},
                                },

                                selectFormSettings: {
                                    info: { ...prevState.tabItems.settings.appSettingQuery.selectFormSettings.info, ...selectFormSettings.info },
                                    styles: {
                                        labelTextColor: { ...prevState.tabItems.settings.appSettingQuery.selectFormSettings.styles.labelTextColor, ...selectFormSettings.styles.labelTextColor },
                                        requiredTextColor: { ...prevState.tabItems.settings.appSettingQuery.selectFormSettings.styles.requiredTextColor, ...selectFormSettings.styles.requiredTextColor },
                                        requiredBackgroundColor: { ...prevState.tabItems.settings.appSettingQuery.selectFormSettings.styles.requiredBackgroundColor, ...selectFormSettings.styles.requiredBackgroundColor },
                                        valueTextColor: { ...prevState.tabItems.settings.appSettingQuery.selectFormSettings.styles.valueTextColor, ...selectFormSettings.styles.valueTextColor },
                                        placeholderTextColor: { ...prevState.tabItems.settings.appSettingQuery.selectFormSettings.styles.placeholderTextColor, ...selectFormSettings.styles.placeholderTextColor },
                                        errorMessageTextColor: { ...prevState.tabItems.settings.appSettingQuery.selectFormSettings.styles.errorMessageTextColor, ...selectFormSettings.styles.errorMessageTextColor },
                                        errorMessageBackgroundColor: { ...prevState.tabItems.settings.appSettingQuery.selectFormSettings.styles.errorMessageBackgroundColor, ...selectFormSettings.styles.errorMessageBackgroundColor },
                                        inputBackgroundColor: { ...prevState.tabItems.settings.appSettingQuery.selectFormSettings.styles.inputBackgroundColor, ...selectFormSettings.styles.inputBackgroundColor },
                                        inputBorderColor: { ...prevState.tabItems.settings.appSettingQuery.selectFormSettings.styles.inputBorderColor, ...selectFormSettings.styles.inputBorderColor },
                                        divisionTextColor: { ...prevState.tabItems.settings.appSettingQuery.selectFormSettings.styles.divisionTextColor, ...selectFormSettings.styles.divisionTextColor },
                                    },
                                    classes: { ...prevState.tabItems.settings.appSettingQuery.selectFormSettings.classes, ...selectFormSettings.classes },
                                    blocks: {},
                                    prefixClass: {},
                                },

                                radioAFormSettings: {
                                    info: { ...prevState.tabItems.settings.appSettingQuery.radioAFormSettings.info, ...radioAFormSettings.info },
                                    styles: {
                                        labelTextColor: { ...prevState.tabItems.settings.appSettingQuery.radioAFormSettings.styles.labelTextColor, ...radioAFormSettings.styles.labelTextColor },
                                        requiredTextColor: { ...prevState.tabItems.settings.appSettingQuery.radioAFormSettings.styles.requiredTextColor, ...radioAFormSettings.styles.requiredTextColor },
                                        requiredBackgroundColor: { ...prevState.tabItems.settings.appSettingQuery.radioAFormSettings.styles.requiredBackgroundColor, ...radioAFormSettings.styles.requiredBackgroundColor },
                                        errorMessageTextColor: { ...prevState.tabItems.settings.appSettingQuery.radioAFormSettings.styles.errorMessageTextColor, ...radioAFormSettings.styles.errorMessageTextColor },
                                        errorMessageBackgroundColor: { ...prevState.tabItems.settings.appSettingQuery.radioAFormSettings.styles.errorMessageBackgroundColor, ...radioAFormSettings.styles.errorMessageBackgroundColor },

                                        unSelectButtonTextColor: { ...prevState.tabItems.settings.appSettingQuery.radioAFormSettings.styles.unSelectButtonTextColor, ...radioAFormSettings.styles.unSelectButtonTextColor },
                                        unSelectButtonTextColorHover: { ...prevState.tabItems.settings.appSettingQuery.radioAFormSettings.styles.unSelectButtonTextColorHover, ...radioAFormSettings.styles.unSelectButtonTextColorHover },
                                        unSelectButtonTextColorFocus: { ...prevState.tabItems.settings.appSettingQuery.radioAFormSettings.styles.unSelectButtonTextColorFocus, ...radioAFormSettings.styles.unSelectButtonTextColorFocus },
                                        unSelectButtonTextColorActive: { ...prevState.tabItems.settings.appSettingQuery.radioAFormSettings.styles.unSelectButtonTextColorActive, ...radioAFormSettings.styles.unSelectButtonTextColorActive },
                                        unSelectButtonTextColorDisabled: { ...prevState.tabItems.settings.appSettingQuery.radioAFormSettings.styles.unSelectButtonTextColorDisabled, ...radioAFormSettings.styles.unSelectButtonTextColorDisabled },
                                        unSelectButtonBackgroundColor: { ...prevState.tabItems.settings.appSettingQuery.radioAFormSettings.styles.unSelectButtonBackgroundColor, ...radioAFormSettings.styles.unSelectButtonBackgroundColor },
                                        unSelectButtonBackgroundColorHover: { ...prevState.tabItems.settings.appSettingQuery.radioAFormSettings.styles.unSelectButtonBackgroundColorHover, ...radioAFormSettings.styles.unSelectButtonBackgroundColorHover },
                                        unSelectButtonBackgroundColorFocus: { ...prevState.tabItems.settings.appSettingQuery.radioAFormSettings.styles.unSelectButtonBackgroundColorFocus, ...radioAFormSettings.styles.unSelectButtonBackgroundColorFocus },
                                        unSelectButtonBackgroundColorActive: { ...prevState.tabItems.settings.appSettingQuery.radioAFormSettings.styles.unSelectButtonBackgroundColorActive, ...radioAFormSettings.styles.unSelectButtonBackgroundColorActive },
                                        unSelectButtonBackgroundColorDisabled: { ...prevState.tabItems.settings.appSettingQuery.radioAFormSettings.styles.unSelectButtonBackgroundColorDisabled, ...radioAFormSettings.styles.unSelectButtonBackgroundColorDisabled },
                                        unSelectButtonBorderColor: { ...prevState.tabItems.settings.appSettingQuery.radioAFormSettings.styles.unSelectButtonBorderColor, ...radioAFormSettings.styles.unSelectButtonBorderColor },
                                        unSelectButtonBorderColorHover: { ...prevState.tabItems.settings.appSettingQuery.radioAFormSettings.styles.unSelectButtonBorderColorHover, ...radioAFormSettings.styles.unSelectButtonBorderColorHover },
                                        unSelectButtonBorderColorFocus: { ...prevState.tabItems.settings.appSettingQuery.radioAFormSettings.styles.unSelectButtonBorderColorFocus, ...radioAFormSettings.styles.unSelectButtonBorderColorFocus },
                                        unSelectButtonBorderColorActive: { ...prevState.tabItems.settings.appSettingQuery.radioAFormSettings.styles.unSelectButtonBorderColorActive, ...radioAFormSettings.styles.unSelectButtonBorderColorActive },
                                        unSelectButtonBorderColorDisabled: { ...prevState.tabItems.settings.appSettingQuery.radioAFormSettings.styles.unSelectButtonBorderColorDisabled, ...radioAFormSettings.styles.unSelectButtonBorderColorDisabled },
                                        selectButtonTextColor: { ...prevState.tabItems.settings.appSettingQuery.radioAFormSettings.styles.selectButtonTextColor, ...radioAFormSettings.styles.selectButtonTextColor },
                                        selectButtonTextColorHover: { ...prevState.tabItems.settings.appSettingQuery.radioAFormSettings.styles.selectButtonTextColorHover, ...radioAFormSettings.styles.selectButtonTextColorHover },
                                        selectButtonTextColorFocus: { ...prevState.tabItems.settings.appSettingQuery.radioAFormSettings.styles.selectButtonTextColorFocus, ...radioAFormSettings.styles.selectButtonTextColorFocus },
                                        selectButtonTextColorActive: { ...prevState.tabItems.settings.appSettingQuery.radioAFormSettings.styles.selectButtonTextColorActive, ...radioAFormSettings.styles.selectButtonTextColorActive },
                                        selectButtonTextColorDisabled: { ...prevState.tabItems.settings.appSettingQuery.radioAFormSettings.styles.selectButtonTextColorDisabled, ...radioAFormSettings.styles.selectButtonTextColorDisabled },
                                        selectButtonBackgroundColor: { ...prevState.tabItems.settings.appSettingQuery.radioAFormSettings.styles.selectButtonBackgroundColor, ...radioAFormSettings.styles.selectButtonBackgroundColor },
                                        selectButtonBackgroundColorHover: { ...prevState.tabItems.settings.appSettingQuery.radioAFormSettings.styles.selectButtonBackgroundColorHover, ...radioAFormSettings.styles.selectButtonBackgroundColorHover },
                                        selectButtonBackgroundColorFocus: { ...prevState.tabItems.settings.appSettingQuery.radioAFormSettings.styles.selectButtonBackgroundColorFocus, ...radioAFormSettings.styles.selectButtonBackgroundColorFocus },
                                        selectButtonBackgroundColorActive: { ...prevState.tabItems.settings.appSettingQuery.radioAFormSettings.styles.selectButtonBackgroundColorActive, ...radioAFormSettings.styles.selectButtonBackgroundColorActive },
                                        selectButtonBackgroundColorDisabled: { ...prevState.tabItems.settings.appSettingQuery.radioAFormSettings.styles.selectButtonBackgroundColorDisabled, ...radioAFormSettings.styles.selectButtonBackgroundColorDisabled },
                                        selectButtonBorderColor: { ...prevState.tabItems.settings.appSettingQuery.radioAFormSettings.styles.selectButtonBorderColor, ...radioAFormSettings.styles.selectButtonBorderColor },
                                        selectButtonBorderColorHover: { ...prevState.tabItems.settings.appSettingQuery.radioAFormSettings.styles.selectButtonBorderColorHover, ...radioAFormSettings.styles.selectButtonBorderColorHover },
                                        selectButtonBorderColorFocus: { ...prevState.tabItems.settings.appSettingQuery.radioAFormSettings.styles.selectButtonBorderColorFocus, ...radioAFormSettings.styles.selectButtonBorderColorFocus },
                                        selectButtonBorderColorActive: { ...prevState.tabItems.settings.appSettingQuery.radioAFormSettings.styles.selectButtonBorderColorActive, ...radioAFormSettings.styles.selectButtonBorderColorActive },
                                        selectButtonBorderColorDisabled: { ...prevState.tabItems.settings.appSettingQuery.radioAFormSettings.styles.selectButtonBorderColorDisabled, ...radioAFormSettings.styles.selectButtonBorderColorDisabled },

                                    },
                                    classes: { ...prevState.tabItems.settings.appSettingQuery.radioAFormSettings.classes, ...radioAFormSettings.classes },
                                    blocks: {},
                                    prefixClass: {
                                        default: { ...prevState.tabItems.settings.appSettingQuery.radioAFormSettings.prefixClass.default, ...radioAFormSettings.prefixClass.default },
                                        hover: { ...prevState.tabItems.settings.appSettingQuery.radioAFormSettings.prefixClass.hover, ...radioAFormSettings.prefixClass.hover },
                                        focus: { ...prevState.tabItems.settings.appSettingQuery.radioAFormSettings.prefixClass.focus, ...radioAFormSettings.prefixClass.focus },
                                        active: { ...prevState.tabItems.settings.appSettingQuery.radioAFormSettings.prefixClass.active, ...radioAFormSettings.prefixClass.active },
                                        disabled: { ...prevState.tabItems.settings.appSettingQuery.radioAFormSettings.prefixClass.disabled, ...radioAFormSettings.prefixClass.disabled }
                                    },
                                },

                                radioBFormSettings: {
                                    info: { ...prevState.tabItems.settings.appSettingQuery.radioBFormSettings.info, ...radioBFormSettings.info },
                                    styles: {
                                        labelTextColor: { ...prevState.tabItems.settings.appSettingQuery.radioBFormSettings.styles.labelTextColor, ...radioBFormSettings.styles.labelTextColor },
                                        requiredTextColor: { ...prevState.tabItems.settings.appSettingQuery.radioBFormSettings.styles.requiredTextColor, ...radioBFormSettings.styles.requiredTextColor },
                                        requiredBackgroundColor: { ...prevState.tabItems.settings.appSettingQuery.radioBFormSettings.styles.requiredBackgroundColor, ...radioBFormSettings.styles.requiredBackgroundColor },
                                        valueTextColor: { ...prevState.tabItems.settings.appSettingQuery.radioBFormSettings.styles.valueTextColor, ...radioBFormSettings.styles.valueTextColor },
                                        errorMessageTextColor: { ...prevState.tabItems.settings.appSettingQuery.radioBFormSettings.styles.errorMessageTextColor, ...radioBFormSettings.styles.errorMessageTextColor },
                                        errorMessageBackgroundColor: { ...prevState.tabItems.settings.appSettingQuery.radioBFormSettings.styles.errorMessageBackgroundColor, ...radioBFormSettings.styles.errorMessageBackgroundColor },
                                    },
                                    classes: { ...prevState.tabItems.settings.appSettingQuery.radioBFormSettings.classes, ...radioBFormSettings.classes },
                                    blocks: {},
                                    prefixClass: { ...prevState.tabItems.settings.appSettingQuery.radioBFormSettings.prefixClass, ...radioBFormSettings.prefixClass },
                                },


                                checkboxSettings: {
                                    info: { ...prevState.tabItems.settings.appSettingQuery.checkboxSettings.info, ...checkboxSettings.info },
                                    styles: {
                                        labelTextColor: { ...prevState.tabItems.settings.appSettingQuery.checkboxSettings.styles.labelTextColor, ...checkboxSettings.styles.labelTextColor },
                                        requiredTextColor: { ...prevState.tabItems.settings.appSettingQuery.checkboxSettings.styles.requiredTextColor, ...checkboxSettings.styles.requiredTextColor },
                                        requiredBackgroundColor: { ...prevState.tabItems.settings.appSettingQuery.checkboxSettings.styles.requiredBackgroundColor, ...checkboxSettings.styles.requiredBackgroundColor },
                                        valueTextColor: { ...prevState.tabItems.settings.appSettingQuery.checkboxSettings.styles.valueTextColor, ...checkboxSettings.styles.valueTextColor },
                                        errorMessageTextColor: { ...prevState.tabItems.settings.appSettingQuery.checkboxSettings.styles.errorMessageTextColor, ...checkboxSettings.styles.errorMessageTextColor },
                                        errorMessageBackgroundColor: { ...prevState.tabItems.settings.appSettingQuery.checkboxSettings.styles.errorMessageBackgroundColor, ...checkboxSettings.styles.errorMessageBackgroundColor },
                                        selectedButtonTextColor: { ...prevState.tabItems.settings.appSettingQuery.checkboxSettings.styles.selectedButtonTextColor, ...checkboxSettings.styles.selectedButtonTextColor },
                                        selectedButtonBackgroundColor: { ...prevState.tabItems.settings.appSettingQuery.checkboxSettings.styles.selectedButtonBackgroundColor, ...checkboxSettings.styles.selectedButtonBackgroundColor },
                                        buttonTextColor: { ...prevState.tabItems.settings.appSettingQuery.checkboxSettings.styles.buttonTextColor, ...checkboxSettings.styles.buttonTextColor },
                                        buttonBackgroundColor: { ...prevState.tabItems.settings.appSettingQuery.checkboxSettings.styles.buttonBackgroundColor, ...checkboxSettings.styles.buttonBackgroundColor },

                                    },
                                    classes: { ...prevState.tabItems.settings.appSettingQuery.checkboxSettings.classes, ...checkboxSettings.classes },
                                    blocks: {},
                                    prefixClass: { ...prevState.tabItems.settings.appSettingQuery.checkboxSettings.prefixClass, ...checkboxSettings.prefixClass },
                                },

                                customCssSettings: { ...prevState.tabItems.settings.appSettingQuery.customCssSettings, ...customCssSettings },

                                slotSelection1Settings: _.merge({}, prevState.tabItems.settings.appSettingQuery.slotSelection1Settings, slotSelection1Settings),

                                // slotSelection1Settings: {
                                //     info: { ...prevState.tabItems.settings.appSettingQuery.slotSelection1Settings.info, ...slotSelection1Settings.info },
                                //     styles: { ...prevState.tabItems.settings.appSettingQuery.slotSelection1Settings.styles, ...slotSelection1Settings.styles },
                                //     classes: { ...prevState.tabItems.settings.appSettingQuery.slotSelection1Settings.classes, ...slotSelection1Settings.classes },
                                //     prefixClass: { ...prevState.tabItems.settings.appSettingQuery.slotSelection1Settings.prefixClass, ...slotSelection1Settings.prefixClass },
                                //     blocks: {},
                                // },

                                slotSelection2Settings: {
                                    info: { ...prevState.tabItems.settings.appSettingQuery.slotSelection2Settings.info, ...slotSelection2Settings.info },
                                    styles: { ...prevState.tabItems.settings.appSettingQuery.slotSelection2Settings.styles, ...slotSelection2Settings.styles },
                                    classes: { ...prevState.tabItems.settings.appSettingQuery.slotSelection2Settings.classes, ...slotSelection2Settings.classes },
                                    prefixClass: { ...prevState.tabItems.settings.appSettingQuery.slotSelection2Settings.prefixClass, ...slotSelection2Settings.prefixClass },
                                    blocks: {},
                                },


                                itemSelection1Settings: {
                                    info: { ...prevState.tabItems.settings.appSettingQuery.itemSelection1Settings.info, ...itemSelection1Settings.info },
                                    styles: { ...prevState.tabItems.settings.appSettingQuery.itemSelection1Settings.styles, ...itemSelection1Settings.styles },
                                    classes: { ...prevState.tabItems.settings.appSettingQuery.itemSelection1Settings.classes, ...itemSelection1Settings.classes },
                                    prefixClass: { ...prevState.tabItems.settings.appSettingQuery.itemSelection1Settings.prefixClass, ...itemSelection1Settings.prefixClass },
                                    blocks: {},
                                },


                                token1loginSettings: {
                                    info: { ...prevState.tabItems.settings.appSettingQuery.token1loginSettings.info, ...token1loginSettings.info },
                                    styles: {
                                        divisionTextColor: { ...prevState.tabItems.settings.appSettingQuery.token1loginSettings.styles.divisionTextColor, ...token1loginSettings.styles.divisionTextColor },
                                        labelTextColor: { ...prevState.tabItems.settings.appSettingQuery.token1loginSettings.styles.labelTextColor, ...token1loginSettings.styles.labelTextColor },
                                        placeholderTextColor: { ...prevState.tabItems.settings.appSettingQuery.token1loginSettings.styles.placeholderTextColor, ...token1loginSettings.styles.placeholderTextColor },
                                        inputTextColor: { ...prevState.tabItems.settings.appSettingQuery.token1loginSettings.styles.inputTextColor, ...token1loginSettings.styles.inputTextColor },
                                        borderColor: { ...prevState.tabItems.settings.appSettingQuery.token1loginSettings.styles.borderColor, ...token1loginSettings.styles.borderColor },
                                        errorMessageTextColor: { ...prevState.tabItems.settings.appSettingQuery.token1loginSettings.styles.errorMessageTextColor, ...token1loginSettings.styles.errorMessageTextColor },
                                    },
                                    classes: { ...prevState.tabItems.settings.appSettingQuery.token1loginSettings.classes, ...token1loginSettings.classes },
                                    blocks: {},
                                    prefixClass: { ...prevState.tabItems.settings.appSettingQuery.token1loginSettings.prefixClass, ...token1loginSettings.prefixClass },
                                },

                                token2loginSettings: {
                                    info: { ...prevState.tabItems.settings.appSettingQuery.token2loginSettings.info, ...token2loginSettings.info },
                                    styles: {
                                        labelTextColor: { ...prevState.tabItems.settings.appSettingQuery.token2loginSettings.styles.labelTextColor, ...token2loginSettings.styles.labelTextColor },
                                        labelBackgroundColor: { ...prevState.tabItems.settings.appSettingQuery.token2loginSettings.styles.labelBackgroundColor, ...token2loginSettings.styles.labelBackgroundColor },
                                        requiredTextColor: { ...prevState.tabItems.settings.appSettingQuery.token2loginSettings.styles.requiredTextColor, ...token2loginSettings.styles.requiredTextColor },
                                        requiredBackgroundColor: { ...prevState.tabItems.settings.appSettingQuery.token2loginSettings.styles.requiredBackgroundColor, ...token2loginSettings.styles.requiredBackgroundColor },
                                        divisionTextColor: { ...prevState.tabItems.settings.appSettingQuery.token2loginSettings.styles.divisionTextColor, ...token2loginSettings.styles.divisionTextColor },
                                        inputBorderColor: { ...prevState.tabItems.settings.appSettingQuery.token2loginSettings.styles.inputBorderColor, ...token2loginSettings.styles.inputBorderColor },
                                        inputTextColor: { ...prevState.tabItems.settings.appSettingQuery.token2loginSettings.styles.inputTextColor, ...token2loginSettings.styles.inputTextColor },
                                        placeholderTextColor: { ...prevState.tabItems.settings.appSettingQuery.token2loginSettings.styles.placeholderTextColor, ...token2loginSettings.styles.placeholderTextColor },
                                        inputBackgroundColor: { ...prevState.tabItems.settings.appSettingQuery.token2loginSettings.styles.inputBackgroundColor, ...token2loginSettings.styles.inputBackgroundColor },
                                        selectTextColor: { ...prevState.tabItems.settings.appSettingQuery.token2loginSettings.styles.selectTextColor, ...token2loginSettings.styles.selectTextColor },
                                        selectBackgroundColor: { ...prevState.tabItems.settings.appSettingQuery.token2loginSettings.styles.selectBackgroundColor, ...token2loginSettings.styles.selectBackgroundColor },
                                        dayMonthTextColor: { ...prevState.tabItems.settings.appSettingQuery.token2loginSettings.styles.dayMonthTextColor, ...token2loginSettings.styles.dayMonthTextColor },
                                        dayMonthBackgroundColor: { ...prevState.tabItems.settings.appSettingQuery.token2loginSettings.styles.dayMonthBackgroundColor, ...token2loginSettings.styles.dayMonthBackgroundColor },
                                        inputErrorTextColor: { ...prevState.tabItems.settings.appSettingQuery.token2loginSettings.styles.inputErrorTextColor, ...token2loginSettings.styles.inputErrorTextColor },
                                        inputErrorBackgroundColor: { ...prevState.tabItems.settings.appSettingQuery.token2loginSettings.styles.inputErrorBackgroundColor, ...token2loginSettings.styles.inputErrorBackgroundColor },
                                        buttonErrorTextColor: { ...prevState.tabItems.settings.appSettingQuery.token2loginSettings.styles.buttonErrorTextColor, ...token2loginSettings.styles.buttonErrorTextColor },
                                        buttonErrorBackgroundColor: { ...prevState.tabItems.settings.appSettingQuery.token2loginSettings.styles.buttonErrorBackgroundColor, ...token2loginSettings.styles.buttonErrorBackgroundColor },

                                    },
                                    classes: { ...prevState.tabItems.settings.appSettingQuery.token2loginSettings.classes, ...token2loginSettings.classes },
                                    blocks: {},
                                    prefixClass: { ...prevState.tabItems.settings.appSettingQuery.token2loginSettings.prefixClass, ...token2loginSettings.prefixClass },
                                },

                                token2loginType1Settings: {
                                    info: { ...prevState.tabItems.settings.appSettingQuery.token2loginType1Settings.info, ...token2loginType1Settings.info },
                                    styles: { ...prevState.tabItems.settings.appSettingQuery.token2loginType1Settings.styles, ...token2loginType1Settings.styles },
                                    classes: { ...prevState.tabItems.settings.appSettingQuery.token2loginType1Settings.classes, ...token2loginType1Settings.classes },
                                    prefixClass: { ...prevState.tabItems.settings.appSettingQuery.token2loginType1Settings.prefixClass, ...token2loginType1Settings.prefixClass },
                                    blocks: {},
                                },
                                token2loginType2Settings: {
                                    info: { ...prevState.tabItems.settings.appSettingQuery.token2loginType2Settings.info, ...token2loginType2Settings.info },
                                    styles: { ...prevState.tabItems.settings.appSettingQuery.token2loginType2Settings.styles, ...token2loginType2Settings.styles },
                                    classes: { ...prevState.tabItems.settings.appSettingQuery.token2loginType2Settings.classes, ...token2loginType2Settings.classes },
                                    prefixClass: { ...prevState.tabItems.settings.appSettingQuery.token2loginType2Settings.prefixClass, ...token2loginType2Settings.prefixClass },
                                    blocks: {},
                                },

                                token3loginSettings: {
                                    info: { ...prevState.tabItems.settings.appSettingQuery.token3loginSettings.info, ...token3loginSettings.info },
                                    styles: {
                                        divisionTextColor: { ...prevState.tabItems.settings.appSettingQuery.token3loginSettings.styles.divisionTextColor, ...token3loginSettings.styles?.divisionTextColor },
                                        labelTextColor: { ...prevState.tabItems.settings.appSettingQuery.token3loginSettings.styles.labelTextColor, ...token3loginSettings.styles?.labelTextColor },
                                        placeholderTextColor: { ...prevState.tabItems.settings.appSettingQuery.token3loginSettings.styles.placeholderTextColor, ...token3loginSettings.styles?.placeholderTextColor },
                                        inputTextColor: { ...prevState.tabItems.settings.appSettingQuery.token3loginSettings.styles.inputTextColor, ...token3loginSettings.styles?.inputTextColor },
                                        borderColor: { ...prevState.tabItems.settings.appSettingQuery.token3loginSettings.styles.borderColor, ...token3loginSettings.styles?.borderColor },
                                        errorMessageTextColor: { ...prevState.tabItems.settings.appSettingQuery.token3loginSettings.styles.errorMessageTextColor, ...token3loginSettings.styles?.errorMessageTextColor },
                                    },
                                    classes: { ...prevState.tabItems.settings.appSettingQuery.token3loginSettings.classes, ...token3loginSettings.classes },
                                    blocks: {},
                                    prefixClass: { ...prevState.tabItems.settings.appSettingQuery.token3loginSettings.prefixClass, ...token3loginSettings.prefixClass },
                                },


                                inputDateSettings: {
                                    info: { ...prevState.tabItems.settings.appSettingQuery.inputDateSettings.info, ...inputDateSettings.info },
                                    styles: {
                                        labelTextColor: { ...prevState.tabItems.settings.appSettingQuery.inputDateSettings.styles.labelTextColor, ...inputDateSettings.styles.labelTextColor },
                                        requiredTextColor: { ...prevState.tabItems.settings.appSettingQuery.inputDateSettings.styles.requiredTextColor, ...inputDateSettings.styles.requiredTextColor },
                                        requiredBackgroundColor: { ...prevState.tabItems.settings.appSettingQuery.inputDateSettings.styles.requiredBackgroundColor, ...inputDateSettings.styles.requiredBackgroundColor },
                                        valueTextColor: { ...prevState.tabItems.settings.appSettingQuery.inputDateSettings.styles.valueTextColor, ...inputDateSettings.styles.valueTextColor },
                                        placeholderTextColor: { ...prevState.tabItems.settings.appSettingQuery.inputDateSettings.styles.placeholderTextColor, ...inputDateSettings.styles.placeholderTextColor },
                                        errorMessageTextColor: { ...prevState.tabItems.settings.appSettingQuery.inputDateSettings.styles.errorMessageTextColor, ...inputDateSettings.styles.errorMessageTextColor },
                                        errorMessageBackgroundColor: { ...prevState.tabItems.settings.appSettingQuery.inputDateSettings.styles.errorMessageBackgroundColor, ...inputDateSettings.styles.errorMessageBackgroundColor },
                                        inputBackgroundColor: { ...prevState.tabItems.settings.appSettingQuery.inputDateSettings.styles.inputBackgroundColor, ...inputDateSettings.styles.inputBackgroundColor },
                                        inputBorderColor: { ...prevState.tabItems.settings.appSettingQuery.inputDateSettings.styles.inputBorderColor, ...inputDateSettings.styles.inputBorderColor },
                                        divisionTextColor: { ...prevState.tabItems.settings.appSettingQuery.inputDateSettings.styles.divisionTextColor, ...inputDateSettings.styles.divisionTextColor },
                                    },
                                    classes: { ...prevState.tabItems.settings.appSettingQuery.inputDateSettings.classes, ...inputDateSettings.classes },
                                    blocks: {},
                                    prefixClass: { ...prevState.tabItems.settings.appSettingQuery.inputDateSettings.prefixClass, ...inputDateSettings.prefixClass },
                                },


                                inputTimeSettings: {
                                    info: { ...prevState.tabItems.settings.appSettingQuery.inputTimeSettings.info, ...inputTimeSettings.info },
                                    styles: {
                                        labelTextColor: { ...prevState.tabItems.settings.appSettingQuery.inputTimeSettings.styles.labelTextColor, ...inputTimeSettings.styles.labelTextColor },
                                        requiredTextColor: { ...prevState.tabItems.settings.appSettingQuery.inputTimeSettings.styles.requiredTextColor, ...inputTimeSettings.styles.requiredTextColor },
                                        requiredBackgroundColor: { ...prevState.tabItems.settings.appSettingQuery.inputTimeSettings.styles.requiredBackgroundColor, ...inputTimeSettings.styles.requiredBackgroundColor },
                                        valueTextColor: { ...prevState.tabItems.settings.appSettingQuery.inputTimeSettings.styles.valueTextColor, ...inputTimeSettings.styles.valueTextColor },
                                        placeholderTextColor: { ...prevState.tabItems.settings.appSettingQuery.inputTimeSettings.styles.placeholderTextColor, ...inputTimeSettings.styles.placeholderTextColor },
                                        errorMessageTextColor: { ...prevState.tabItems.settings.appSettingQuery.inputTimeSettings.styles.errorMessageTextColor, ...inputTimeSettings.styles.errorMessageTextColor },
                                        errorMessageBackgroundColor: { ...prevState.tabItems.settings.appSettingQuery.inputTimeSettings.styles.errorMessageBackgroundColor, ...inputTimeSettings.styles.errorMessageBackgroundColor },
                                        inputBackgroundColor: { ...prevState.tabItems.settings.appSettingQuery.inputTimeSettings.styles.inputBackgroundColor, ...inputTimeSettings.styles.inputBackgroundColor },
                                        inputBorderColor: { ...prevState.tabItems.settings.appSettingQuery.inputTimeSettings.styles.inputBorderColor, ...inputTimeSettings.styles.inputBorderColor },
                                        divisionTextColor: { ...prevState.tabItems.settings.appSettingQuery.inputTimeSettings.styles.divisionTextColor, ...inputTimeSettings.styles.divisionTextColor },
                                    },
                                    classes: { ...prevState.tabItems.settings.appSettingQuery.inputTimeSettings.classes, ...inputTimeSettings.classes },
                                    blocks: {},
                                    prefixClass: { ...prevState.tabItems.settings.appSettingQuery.inputTimeSettings.prefixClass, ...inputTimeSettings.prefixClass },
                                },


                                inputNumberSettings: {
                                    info: { ...prevState.tabItems.settings.appSettingQuery.inputNumberSettings.info, ...inputNumberSettings.info },
                                    styles: {
                                        labelTextColor: { ...prevState.tabItems.settings.appSettingQuery.inputNumberSettings.styles.labelTextColor, ...inputNumberSettings.styles.labelTextColor },
                                        requiredTextColor: { ...prevState.tabItems.settings.appSettingQuery.inputNumberSettings.styles.requiredTextColor, ...inputNumberSettings.styles.requiredTextColor },
                                        requiredBackgroundColor: { ...prevState.tabItems.settings.appSettingQuery.inputNumberSettings.styles.requiredBackgroundColor, ...inputNumberSettings.styles.requiredBackgroundColor },
                                        valueTextColor: { ...prevState.tabItems.settings.appSettingQuery.inputNumberSettings.styles.valueTextColor, ...inputNumberSettings.styles.valueTextColor },
                                        placeholderTextColor: { ...prevState.tabItems.settings.appSettingQuery.inputNumberSettings.styles.placeholderTextColor, ...inputNumberSettings.styles.placeholderTextColor },
                                        errorMessageTextColor: { ...prevState.tabItems.settings.appSettingQuery.inputNumberSettings.styles.errorMessageTextColor, ...inputNumberSettings.styles.errorMessageTextColor },
                                        errorMessageBackgroundColor: { ...prevState.tabItems.settings.appSettingQuery.inputNumberSettings.styles.errorMessageBackgroundColor, ...inputNumberSettings.styles.errorMessageBackgroundColor },
                                        inputBackgroundColor: { ...prevState.tabItems.settings.appSettingQuery.inputNumberSettings.styles.inputBackgroundColor, ...inputNumberSettings.styles.inputBackgroundColor },
                                        inputBorderColor: { ...prevState.tabItems.settings.appSettingQuery.inputNumberSettings.styles.inputBorderColor, ...inputNumberSettings.styles.inputBorderColor },
                                        divisionTextColor: { ...prevState.tabItems.settings.appSettingQuery.inputNumberSettings.styles.divisionTextColor, ...inputNumberSettings.styles.divisionTextColor },
                                    },
                                    classes: { ...prevState.tabItems.settings.appSettingQuery.inputNumberSettings.classes, ...inputNumberSettings.classes },
                                    blocks: {},
                                    prefixClass: { ...prevState.tabItems.settings.appSettingQuery.inputNumberSettings.prefixClass, ...inputNumberSettings.prefixClass },
                                },

                                combinInputTextSettings: {
                                    info: { ...prevState.tabItems.settings.appSettingQuery.combinInputTextSettings.info, ...combinInputTextSettings.info },
                                    styles: {
                                        labelTextColor: { ...prevState.tabItems.settings.appSettingQuery.combinInputTextSettings.styles.labelTextColor, ...combinInputTextSettings.styles.labelTextColor },
                                        requiredTextColor: { ...prevState.tabItems.settings.appSettingQuery.combinInputTextSettings.styles.requiredTextColor, ...combinInputTextSettings.styles.requiredTextColor },
                                        requiredBackgroundColor: { ...prevState.tabItems.settings.appSettingQuery.combinInputTextSettings.styles.requiredBackgroundColor, ...combinInputTextSettings.styles.requiredBackgroundColor },
                                        valueTextColor: { ...prevState.tabItems.settings.appSettingQuery.combinInputTextSettings.styles.valueTextColor, ...combinInputTextSettings.styles.valueTextColor },
                                        placeholderTextColor: { ...prevState.tabItems.settings.appSettingQuery.combinInputTextSettings.styles.placeholderTextColor, ...combinInputTextSettings.styles.placeholderTextColor },
                                        errorMessageTextColor: { ...prevState.tabItems.settings.appSettingQuery.combinInputTextSettings.styles.errorMessageTextColor, ...combinInputTextSettings.styles.errorMessageTextColor },
                                        errorMessageBackgroundColor: { ...prevState.tabItems.settings.appSettingQuery.combinInputTextSettings.styles.errorMessageBackgroundColor, ...combinInputTextSettings.styles.errorMessageBackgroundColor },
                                        divisionTextColor: { ...prevState.tabItems.settings.appSettingQuery.combinInputTextSettings.styles.divisionTextColor, ...combinInputTextSettings.styles.divisionTextColor },
                                        inputBackgroundColor: { ...prevState.tabItems.settings.appSettingQuery.combinInputTextSettings.styles.inputBackgroundColor, ...combinInputTextSettings.styles.inputBackgroundColor },
                                        inputBorderColor: { ...prevState.tabItems.settings.appSettingQuery.combinInputTextSettings.styles.inputBorderColor, ...combinInputTextSettings.styles.inputBorderColor },
                                    },
                                    classes: { ...prevState.tabItems.settings.appSettingQuery.combinInputTextSettings.classes, ...combinInputTextSettings.classes },
                                    blocks: {},
                                    prefixClass: { ...prevState.tabItems.settings.appSettingQuery.combinInputTextSettings.prefixClass, ...combinInputTextSettings.prefixClass },
                                },

                                checkboxIconSettings: {
                                    info: { ...prevState.tabItems.settings.appSettingQuery.checkboxIconSettings.info, ...checkboxIconSettings.info },
                                    styles: {
                                        notSelectedIcon1FillColor: { ...prevState.tabItems.settings.appSettingQuery.checkboxIconSettings.styles.notSelectedIcon1FillColor, ...checkboxIconSettings.styles.notSelectedIcon1FillColor },
                                        notSelectedIcon1StrokeColor: { ...prevState.tabItems.settings.appSettingQuery.checkboxIconSettings.styles.notSelectedIcon1StrokeColor, ...checkboxIconSettings.styles.notSelectedIcon1StrokeColor },
                                        notSelectedIcon2FillColor: { ...prevState.tabItems.settings.appSettingQuery.checkboxIconSettings.styles.notSelectedIcon2FillColor, ...checkboxIconSettings.styles.notSelectedIcon2FillColor },
                                        notSelectedIcon2StrokeColor: { ...prevState.tabItems.settings.appSettingQuery.checkboxIconSettings.styles.notSelectedIcon2StrokeColor, ...checkboxIconSettings.styles.notSelectedIcon2StrokeColor },
                                        selectedIcon1FillColor: { ...prevState.tabItems.settings.appSettingQuery.checkboxIconSettings.styles.selectedIcon1FillColor, ...checkboxIconSettings.styles.selectedIcon1FillColor },
                                        selectedIcon1StrokeColor: { ...prevState.tabItems.settings.appSettingQuery.checkboxIconSettings.styles.selectedIcon1StrokeColor, ...checkboxIconSettings.styles.selectedIcon1StrokeColor },
                                        selectedIcon2FillColor: { ...prevState.tabItems.settings.appSettingQuery.checkboxIconSettings.styles.selectedIcon2FillColor, ...checkboxIconSettings.styles.selectedIcon2FillColor },
                                        selectedIcon2StrokeColor: { ...prevState.tabItems.settings.appSettingQuery.checkboxIconSettings.styles.selectedIcon2StrokeColor, ...checkboxIconSettings.styles.selectedIcon2StrokeColor },
                                    },
                                    classes: { ...prevState.tabItems.settings.appSettingQuery.checkboxIconSettings.classes, ...checkboxIconSettings.classes },
                                    blocks: {},
                                    prefixClass: { ...prevState.tabItems.settings.appSettingQuery.checkboxIconSettings.prefixClass, ...checkboxIconSettings.prefixClass },
                                },
                                customRadioIconSettings: {
                                    info: { ...prevState.tabItems.settings.appSettingQuery.customRadioIconSettings.info, ...customRadioIconSettings.info },
                                    styles: {
                                        notSelectedIcon1FillColor: { ...prevState.tabItems.settings.appSettingQuery.customRadioIconSettings.styles.notSelectedIcon1FillColor, ...customRadioIconSettings.styles.notSelectedIcon1FillColor },
                                        notSelectedIcon1StrokeColor: { ...prevState.tabItems.settings.appSettingQuery.customRadioIconSettings.styles.notSelectedIcon1StrokeColor, ...customRadioIconSettings.styles.notSelectedIcon1StrokeColor },
                                        notSelectedIcon2FillColor: { ...prevState.tabItems.settings.appSettingQuery.customRadioIconSettings.styles.notSelectedIcon2FillColor, ...customRadioIconSettings.styles.notSelectedIcon2FillColor },
                                        notSelectedIcon2StrokeColor: { ...prevState.tabItems.settings.appSettingQuery.customRadioIconSettings.styles.notSelectedIcon2StrokeColor, ...customRadioIconSettings.styles.notSelectedIcon2StrokeColor },
                                        selectedIcon1FillColor: { ...prevState.tabItems.settings.appSettingQuery.customRadioIconSettings.styles.selectedIcon1FillColor, ...customRadioIconSettings.styles.selectedIcon1FillColor },
                                        selectedIcon1StrokeColor: { ...prevState.tabItems.settings.appSettingQuery.customRadioIconSettings.styles.selectedIcon1StrokeColor, ...customRadioIconSettings.styles.selectedIcon1StrokeColor },
                                        selectedIcon2FillColor: { ...prevState.tabItems.settings.appSettingQuery.customRadioIconSettings.styles.selectedIcon2FillColor, ...customRadioIconSettings.styles.selectedIcon2FillColor },
                                        selectedIcon2StrokeColor: { ...prevState.tabItems.settings.appSettingQuery.customRadioIconSettings.styles.selectedIcon2StrokeColor, ...customRadioIconSettings.styles.selectedIcon2StrokeColor },
                                    },
                                    classes: { ...prevState.tabItems.settings.appSettingQuery.customRadioIconSettings.classes, ...customRadioIconSettings.classes },
                                    blocks: {},
                                    prefixClass: { ...prevState.tabItems.settings.appSettingQuery.customRadioIconSettings.prefixClass, ...customRadioIconSettings.prefixClass },
                                },

                                zipSearchSettings: {
                                    info: { ...prevState.tabItems.settings.appSettingQuery.zipSearchSettings.info, ...zipSearchSettings.info },
                                    styles: {
                                        labelTextColor: { ...prevState.tabItems.settings.appSettingQuery.zipSearchSettings.styles.labelTextColor, ...zipSearchSettings.styles.labelTextColor },
                                        labelTextBackgroundColor: { ...prevState.tabItems.settings.appSettingQuery.zipSearchSettings.styles.labelTextBackgroundColor, ...zipSearchSettings.styles.labelTextBackgroundColor },
                                        requiredTextColor: { ...prevState.tabItems.settings.appSettingQuery.zipSearchSettings.styles.requiredTextColor, ...zipSearchSettings.styles.requiredTextColor },
                                        requiredBackgroundColor: { ...prevState.tabItems.settings.appSettingQuery.zipSearchSettings.styles.requiredBackgroundColor, ...zipSearchSettings.styles.requiredBackgroundColor },
                                        divisionTextColor: { ...prevState.tabItems.settings.appSettingQuery.zipSearchSettings.styles.divisionTextColor, ...zipSearchSettings.styles.divisionTextColor },
                                        valueTextColor: { ...prevState.tabItems.settings.appSettingQuery.zipSearchSettings.styles.valueTextColor, ...zipSearchSettings.styles.valueTextColor },
                                        placeholderTextColor: { ...prevState.tabItems.settings.appSettingQuery.zipSearchSettings.styles.placeholderTextColor, ...zipSearchSettings.styles.placeholderTextColor },
                                        borderColor: { ...prevState.tabItems.settings.appSettingQuery.zipSearchSettings.styles.borderColor, ...zipSearchSettings.styles.borderColor },
                                        errorMessageTextColor: { ...prevState.tabItems.settings.appSettingQuery.zipSearchSettings.styles.errorMessageTextColor, ...zipSearchSettings.styles.errorMessageTextColor },
                                        errorMessageBackgroundColor: { ...prevState.tabItems.settings.appSettingQuery.zipSearchSettings.styles.errorMessageBackgroundColor, ...zipSearchSettings.styles.errorMessageBackgroundColor },
                                        inputBackgroundColor: { ...prevState.tabItems.settings.appSettingQuery.zipSearchSettings.styles.inputBackgroundColor, ...zipSearchSettings.styles.inputBackgroundColor },

                                    },
                                    classes: { ...prevState.tabItems.settings.appSettingQuery.zipSearchSettings.classes, ...zipSearchSettings.classes },
                                    blocks: {},
                                    prefixClass: {},
                                },

                                debugModeSettings: {
                                    info: { ...prevState.tabItems.settings.appSettingQuery.debugModeSettings.info, ...debugModeSettings.info },
                                    styles: {},
                                    classes: {},
                                    blocks: {},
                                    prefixClass: {},
                                },

                                inputBirthdaySettings: {
                                    info: { ...prevState.tabItems.settings.appSettingQuery.inputBirthdaySettings.info, ...inputBirthdaySettings.info },
                                    styles: {
                                        labelTextColor: { ...prevState.tabItems.settings.appSettingQuery.inputBirthdaySettings.styles.labelTextColor, ...inputBirthdaySettings.styles.labelTextColor },
                                        labelBackgroundColor: { ...prevState.tabItems.settings.appSettingQuery.inputBirthdaySettings.styles.labelBackgroundColor, ...inputBirthdaySettings.styles.labelBackgroundColor },
                                        requiredTextColor: { ...prevState.tabItems.settings.appSettingQuery.inputBirthdaySettings.styles.requiredTextColor, ...inputBirthdaySettings.styles.requiredTextColor },
                                        requiredBackgroundColor: { ...prevState.tabItems.settings.appSettingQuery.inputBirthdaySettings.styles.requiredBackgroundColor, ...inputBirthdaySettings.styles.requiredBackgroundColor },
                                        selectTextColor: { ...prevState.tabItems.settings.appSettingQuery.inputBirthdaySettings.styles.selectTextColor, ...inputBirthdaySettings.styles.selectTextColor },
                                        selectBackgroundColor: { ...prevState.tabItems.settings.appSettingQuery.inputBirthdaySettings.styles.selectBackgroundColor, ...inputBirthdaySettings.styles.selectBackgroundColor },
                                        selectBorderColor: { ...prevState.tabItems.settings.appSettingQuery.inputBirthdaySettings.styles.selectBorderColor, ...inputBirthdaySettings.styles.selectBorderColor },
                                        dayMonthTextColor: { ...prevState.tabItems.settings.appSettingQuery.inputBirthdaySettings.styles.dayMonthTextColor, ...inputBirthdaySettings.styles.dayMonthTextColor },
                                        dayMonthBackgroundColor: { ...prevState.tabItems.settings.appSettingQuery.inputBirthdaySettings.styles.dayMonthBackgroundColor, ...inputBirthdaySettings.styles.dayMonthBackgroundColor },
                                        inputErrorTextColor: { ...prevState.tabItems.settings.appSettingQuery.inputBirthdaySettings.styles.inputErrorTextColor, ...inputBirthdaySettings.styles.inputErrorTextColor },
                                        inputErrorBackgroundColor: { ...prevState.tabItems.settings.appSettingQuery.inputBirthdaySettings.styles.inputErrorBackgroundColor, ...inputBirthdaySettings.styles.inputErrorBackgroundColor },
                                    },
                                    classes: { ...prevState.tabItems.settings.appSettingQuery.inputBirthdaySettings.classes, ...inputBirthdaySettings.classes },
                                    blocks: {},
                                    prefixClass: {},
                                },

                                categorySelection1Settings: {
                                    info: { ...prevState.tabItems.settings.appSettingQuery.categorySelection1Settings.info, ...categorySelection1Settings.info },
                                    styles: {
                                        cardOuterBorderColor: { ...prevState.tabItems.settings.appSettingQuery.categorySelection1Settings.styles.cardOuterBorderColor, ...categorySelection1Settings.styles.cardOuterBorderColor },
                                        cardDivideColor: { ...prevState.tabItems.settings.appSettingQuery.categorySelection1Settings.styles.cardDivideColor, ...categorySelection1Settings.styles.cardDivideColor },
                                        categoryNameTextColor: { ...prevState.tabItems.settings.appSettingQuery.categorySelection1Settings.styles.categoryNameTextColor, ...categorySelection1Settings.styles.categoryNameTextColor },
                                        headerAreaBackgroundColor: { ...prevState.tabItems.settings.appSettingQuery.categorySelection1Settings.styles.headerAreaBackgroundColor, ...categorySelection1Settings.styles.headerAreaBackgroundColor },
                                        categoryDescription1TextColor: { ...prevState.tabItems.settings.appSettingQuery.categorySelection1Settings.styles.categoryDescription1TextColor, ...categorySelection1Settings.styles.categoryDescription1TextColor },
                                        categoryDescription1BackgroundColor: { ...prevState.tabItems.settings.appSettingQuery.categorySelection1Settings.styles.categoryDescription1BackgroundColor, ...categorySelection1Settings.styles.categoryDescription1BackgroundColor },
                                        categoryDescription2TextColor: { ...prevState.tabItems.settings.appSettingQuery.categorySelection1Settings.styles.categoryDescription2TextColor, ...categorySelection1Settings.styles.categoryDescription2TextColor },
                                        categoryDescription2BackgroundColor: { ...prevState.tabItems.settings.appSettingQuery.categorySelection1Settings.styles.categoryDescription2BackgroundColor, ...categorySelection1Settings.styles.categoryDescription2BackgroundColor },
                                        examinationItemTitleTextColor: { ...prevState.tabItems.settings.appSettingQuery.categorySelection1Settings.styles.examinationItemTitleTextColor, ...categorySelection1Settings.styles.examinationItemTitleTextColor },
                                        examinationItemTextColor: { ...prevState.tabItems.settings.appSettingQuery.categorySelection1Settings.styles.examinationItemTextColor, ...categorySelection1Settings.styles.examinationItemTextColor },
                                        examinationItemBackgroundColor: { ...prevState.tabItems.settings.appSettingQuery.categorySelection1Settings.styles.examinationItemBackgroundColor, ...categorySelection1Settings.styles.examinationItemBackgroundColor },
                                        scheduleTitleTextColor: { ...prevState.tabItems.settings.appSettingQuery.categorySelection1Settings.styles.scheduleTitleTextColor, ...categorySelection1Settings.styles.scheduleTitleTextColor },
                                        scheduleTextColor: { ...prevState.tabItems.settings.appSettingQuery.categorySelection1Settings.styles.scheduleTextColor, ...categorySelection1Settings.styles.scheduleTextColor },
                                        scheduleBackgroundColor: { ...prevState.tabItems.settings.appSettingQuery.categorySelection1Settings.styles.scheduleBackgroundColor, ...categorySelection1Settings.styles.scheduleBackgroundColor },

                                    },
                                    classes: { ...prevState.tabItems.settings.appSettingQuery.categorySelection1Settings.classes, ...categorySelection1Settings.classes },
                                    blocks: {},
                                    prefixClass: {},
                                },

                                categorySelection2Settings: {
                                    info: { ...prevState.tabItems.settings.appSettingQuery.categorySelection2Settings.info, ...categorySelection2Settings.info },
                                    styles: {
                                        wrapBorderColor: { ...prevState.tabItems.settings.appSettingQuery.categorySelection2Settings.styles.wrapBorderColor, ...categorySelection2Settings.styles.wrapBorderColor },
                                        wrapBoxShadowColor: { ...prevState.tabItems.settings.appSettingQuery.categorySelection2Settings.styles.wrapBoxShadowColor, ...categorySelection2Settings.styles.wrapBoxShadowColor },
                                        wrapBackgroundColor: { ...prevState.tabItems.settings.appSettingQuery.categorySelection2Settings.styles.wrapBackgroundColor, ...categorySelection2Settings.styles.wrapBackgroundColor },
                                        areaTextColor: { ...prevState.tabItems.settings.appSettingQuery.categorySelection2Settings.styles.areaTextColor, ...categorySelection2Settings.styles.areaTextColor },
                                        areaBorderColor: { ...prevState.tabItems.settings.appSettingQuery.categorySelection2Settings.styles.areaBorderColor, ...categorySelection2Settings.styles.areaBorderColor },
                                        areaBackgroundColor: { ...prevState.tabItems.settings.appSettingQuery.categorySelection2Settings.styles.areaBackgroundColor, ...categorySelection2Settings.styles.areaBackgroundColor },
                                        areaBoxShadowColor: { ...prevState.tabItems.settings.appSettingQuery.categorySelection2Settings.styles.areaBoxShadowColor, ...categorySelection2Settings.styles.areaBoxShadowColor },
                                    },
                                    classes: { ...prevState.tabItems.settings.appSettingQuery.categorySelection2Settings.classes, ...categorySelection2Settings.classes },
                                    blocks: {},
                                    prefixClass: {
                                        default: { ...prevState.tabItems.settings.appSettingQuery.categorySelection2Settings.prefixClass.default, ...categorySelection2Settings.prefixClass.default },
                                        sm: { ...prevState.tabItems.settings.appSettingQuery.categorySelection2Settings.prefixClass.sm, ...categorySelection2Settings.prefixClass.sm },
                                        md: { ...prevState.tabItems.settings.appSettingQuery.categorySelection2Settings.prefixClass.md, ...categorySelection2Settings.prefixClass.md },
                                        lg: { ...prevState.tabItems.settings.appSettingQuery.categorySelection2Settings.prefixClass.lg, ...categorySelection2Settings.prefixClass.lg },
                                        xl: { ...prevState.tabItems.settings.appSettingQuery.categorySelection2Settings.prefixClass.xl, ...categorySelection2Settings.prefixClass.xl },
                                        '2xl': { ...prevState.tabItems.settings.appSettingQuery.categorySelection2Settings.prefixClass['2xl'], ...categorySelection2Settings.prefixClass['2xl'] }
                                    },
                                },

                                // instituteSelection1Settings: {
                                //     info: { ...prevState.tabItems.settings.appSettingQuery.instituteSelection1Settings.info, ...instituteSelection1Settings.info },
                                //     styles: {
                                //         instituteBorderColor: { ...prevState.tabItems.settings.appSettingQuery.instituteSelection1Settings.styles.cardOuterBorderColor, ...instituteSelection1Settings.styles.instituteBorderColor },
                                //         instituteDivideColor: { ...prevState.tabItems.settings.appSettingQuery.instituteSelection1Settings.styles.cardDivideColor, ...instituteSelection1Settings.styles.instituteDivideColor },
                                //         instituteBoxShadowColor: { ...prevState.tabItems.settings.appSettingQuery.instituteSelection1Settings.styles.categoryNameTextColor, ...instituteSelection1Settings.styles.instituteBoxShadowColor },
                                //         headerTitleTextColor: { ...prevState.tabItems.settings.appSettingQuery.instituteSelection1Settings.styles.headerAreaBackgroundColor, ...instituteSelection1Settings.styles.headerTitleTextColor },
                                //         headerExplanationTextColor: { ...prevState.tabItems.settings.appSettingQuery.instituteSelection1Settings.styles.categoryDescription1TextColor, ...instituteSelection1Settings.styles.headerExplanationTextColor },
                                //         headerBackgroundColor: { ...prevState.tabItems.settings.appSettingQuery.instituteSelection1Settings.styles.categoryDescription1BackgroundColor, ...instituteSelection1Settings.styles.headerBackgroundColor },
                                //         selectionAreaBackgroundColor: { ...prevState.tabItems.settings.appSettingQuery.instituteSelection1Settings.styles.categoryDescription2TextColor, ...instituteSelection1Settings.styles.selectionAreaBackgroundColor },
                                //         dentalCheckTextColor: { ...prevState.tabItems.settings.appSettingQuery.instituteSelection1Settings.styles.categoryDescription2BackgroundColor, ...instituteSelection1Settings.styles.dentalCheckTextColor },
                                //         dentalCheckBackgroundColor: { ...prevState.tabItems.settings.appSettingQuery.instituteSelection1Settings.styles.examinationItemTitleTextColor, ...instituteSelection1Settings.styles.dentalCheckBackgroundColor },
                                //         instituteNameTextColor: { ...prevState.tabItems.settings.appSettingQuery.instituteSelection1Settings.styles.examinationItemTextColor, ...instituteSelection1Settings.styles.instituteNameTextColor },
                                //         selectionTextColor: { ...prevState.tabItems.settings.appSettingQuery.instituteSelection1Settings.styles.examinationItemBackgroundColor, ...instituteSelection1Settings.styles.selectionTextColor },
                                //         selectionBackgroundColor: { ...prevState.tabItems.settings.appSettingQuery.instituteSelection1Settings.styles.scheduleTitleTextColor, ...instituteSelection1Settings.styles.selectionBackgroundColor },
                                //         instituteAddressTextColor: { ...prevState.tabItems.settings.appSettingQuery.instituteSelection1Settings.styles.instituteAddressTextColor, ...instituteSelection1Settings.styles.instituteAddressTextColor },
                                //         selectionTextColorHover: { ...prevState.tabItems.settings.appSettingQuery.instituteSelection1Settings.styles.selectionTextColorHover, ...instituteSelection1Settings.styles.selectionTextColorHover },
                                //         selectionTextColorFocus: { ...prevState.tabItems.settings.appSettingQuery.instituteSelection1Settings.styles.selectionTextColorFocus, ...instituteSelection1Settings.styles.selectionTextColorFocus },
                                //         selectionTextColorActive: { ...prevState.tabItems.settings.appSettingQuery.instituteSelection1Settings.styles.selectionTextColorActive, ...instituteSelection1Settings.styles.selectionTextColorActive },
                                //         selectionBackgroundColorHover: { ...prevState.tabItems.settings.appSettingQuery.instituteSelection1Settings.styles.selectionBackgroundColorHover, ...instituteSelection1Settings.styles.selectionBackgroundColorHover },
                                //         selectionBackgroundColorFocus: { ...prevState.tabItems.settings.appSettingQuery.instituteSelection1Settings.styles.selectionBackgroundColorFocus, ...instituteSelection1Settings.styles.selectionBackgroundColorFocus },
                                //         selectionBackgroundColorActive: { ...prevState.tabItems.settings.appSettingQuery.instituteSelection1Settings.styles.selectionBackgroundColorActive, ...instituteSelection1Settings.styles.selectionBackgroundColorActive },

                                //     },
                                //     classes: { ...prevState.tabItems.settings.appSettingQuery.instituteSelection1Settings.classes, ...instituteSelection1Settings.classes },
                                //     blocks: {},
                                //     prefixClass: {
                                //         default: { ...prevState.tabItems.settings.appSettingQuery.instituteSelection1Settings.prefixClass.default, ...instituteSelection1Settings.prefixClass.default },
                                //         sm: { ...prevState.tabItems.settings.appSettingQuery.instituteSelection1Settings.prefixClass.sm, ...instituteSelection1Settings.prefixClass.sm },
                                //         md: { ...prevState.tabItems.settings.appSettingQuery.instituteSelection1Settings.prefixClass.md, ...instituteSelection1Settings.prefixClass.md },
                                //         lg: { ...prevState.tabItems.settings.appSettingQuery.instituteSelection1Settings.prefixClass.lg, ...instituteSelection1Settings.prefixClass.lg },
                                //         xl: { ...prevState.tabItems.settings.appSettingQuery.instituteSelection1Settings.prefixClass.xl, ...instituteSelection1Settings.prefixClass.xl },
                                //         '2xl': { ...prevState.tabItems.settings.appSettingQuery.instituteSelection1Settings.prefixClass['2xl'], ...instituteSelection1Settings.prefixClass['2xl'] },
                                //         hover: { ...prevState.tabItems.settings.appSettingQuery.instituteSelection1Settings.prefixClass.hover, ...instituteSelection1Settings.prefixClass.hover },
                                //         focus: { ...prevState.tabItems.settings.appSettingQuery.instituteSelection1Settings.prefixClass.focus, ...instituteSelection1Settings.prefixClass.focus },
                                //         active: { ...prevState.tabItems.settings.appSettingQuery.instituteSelection1Settings.prefixClass.active, ...instituteSelection1Settings.prefixClass.active },

                                //     },
                                // },
                                instituteSelection2Settings: {
                                    info: { ...prevState.tabItems.settings.appSettingQuery.instituteSelection2Settings.info, ...instituteSelection2Settings.info },
                                    styles: {
                                        instituteBorderColor: { ...prevState.tabItems.settings.appSettingQuery.instituteSelection2Settings.styles.instituteBorderColor, ...instituteSelection2Settings.styles.instituteBorderColor },
                                        instituteDivideColor: { ...prevState.tabItems.settings.appSettingQuery.instituteSelection2Settings.styles.instituteDivideColor, ...instituteSelection2Settings.styles.instituteDivideColor },
                                        instituteBoxShadowColor: { ...prevState.tabItems.settings.appSettingQuery.instituteSelection2Settings.styles.instituteBoxShadowColor, ...instituteSelection2Settings.styles.instituteBoxShadowColor },
                                        instituteListBackgroundColor: { ...prevState.tabItems.settings.appSettingQuery.instituteSelection2Settings.styles.instituteListBackgroundColor, ...instituteSelection2Settings.styles.instituteListBackgroundColor },
                                        instituteListBorderColor: { ...prevState.tabItems.settings.appSettingQuery.instituteSelection2Settings.styles.instituteListBorderColor, ...instituteSelection2Settings.styles.instituteListBorderColor },
                                        instituteListBoxShadowColor: { ...prevState.tabItems.settings.appSettingQuery.instituteSelection2Settings.styles.instituteListBoxShadowColor, ...instituteSelection2Settings.styles.instituteListBoxShadowColor },
                                        instituteNameTextColor: { ...prevState.tabItems.settings.appSettingQuery.instituteSelection2Settings.styles.instituteNameTextColor, ...instituteSelection2Settings.styles.instituteNameTextColor },

                                        instituteAddressTextColor: { ...prevState.tabItems.settings.appSettingQuery.instituteSelection2Settings.styles.instituteAddressTextColor, ...instituteSelection2Settings.styles.instituteAddressTextColor },
                                        dentalCheckTextColor: { ...prevState.tabItems.settings.appSettingQuery.instituteSelection2Settings.styles.dentalCheckTextColor, ...instituteSelection2Settings.styles.dentalCheckTextColor },
                                        dentalCheckBackgroundColor: { ...prevState.tabItems.settings.appSettingQuery.instituteSelection2Settings.styles.dentalCheckBackgroundColor, ...instituteSelection2Settings.styles.dentalCheckBackgroundColor },
                                        selectionTextColor: { ...prevState.tabItems.settings.appSettingQuery.instituteSelection2Settings.styles.selectionTextColor, ...instituteSelection2Settings.styles.selectionTextColor },
                                        selectionBackgroundColor: { ...prevState.tabItems.settings.appSettingQuery.instituteSelection2Settings.styles.selectionBackgroundColor, ...instituteSelection2Settings.styles.selectionBackgroundColor },
                                        selectionTextColorHover: { ...prevState.tabItems.settings.appSettingQuery.instituteSelection2Settings.styles.selectionTextColorHover, ...instituteSelection2Settings.styles.selectionTextColorHover },
                                        selectionTextColorFocus: { ...prevState.tabItems.settings.appSettingQuery.instituteSelection2Settings.styles.selectionTextColorFocus, ...instituteSelection2Settings.styles.selectionTextColorFocus },
                                        selectionTextColorActive: { ...prevState.tabItems.settings.appSettingQuery.instituteSelection2Settings.styles.selectionTextColorActive, ...instituteSelection2Settings.styles.selectionTextColorActive },
                                        selectionBackgroundColorHover: { ...prevState.tabItems.settings.appSettingQuery.instituteSelection2Settings.styles.selectionBackgroundColorHover, ...instituteSelection2Settings.styles.selectionBackgroundColorHover },
                                        selectionBackgroundColorFocus: { ...prevState.tabItems.settings.appSettingQuery.instituteSelection2Settings.styles.selectionBackgroundColorFocus, ...instituteSelection2Settings.styles.selectionBackgroundColorFocus },
                                        selectionBackgroundColorActive: { ...prevState.tabItems.settings.appSettingQuery.instituteSelection2Settings.styles.selectionBackgroundColorActive, ...instituteSelection2Settings.styles.selectionBackgroundColorActive },
                                    },
                                    classes: { ...prevState.tabItems.settings.appSettingQuery.instituteSelection2Settings.classes, ...instituteSelection2Settings.classes },
                                    blocks: {},
                                    prefixClass: {
                                        default: { ...prevState.tabItems.settings.appSettingQuery.instituteSelection2Settings.prefixClass.default, ...instituteSelection2Settings.prefixClass.default },
                                        sm: { ...prevState.tabItems.settings.appSettingQuery.instituteSelection2Settings.prefixClass.sm, ...instituteSelection2Settings.prefixClass.sm },
                                        md: { ...prevState.tabItems.settings.appSettingQuery.instituteSelection2Settings.prefixClass.md, ...instituteSelection2Settings.prefixClass.md },
                                        lg: { ...prevState.tabItems.settings.appSettingQuery.instituteSelection2Settings.prefixClass.lg, ...instituteSelection2Settings.prefixClass.lg },
                                        xl: { ...prevState.tabItems.settings.appSettingQuery.instituteSelection2Settings.prefixClass.xl, ...instituteSelection2Settings.prefixClass.xl },
                                        '2xl': { ...prevState.tabItems.settings.appSettingQuery.instituteSelection2Settings.prefixClass['2xl'], ...instituteSelection2Settings.prefixClass['2xl'] },
                                        hover: { ...prevState.tabItems.settings.appSettingQuery.instituteSelection2Settings.prefixClass.hover, ...instituteSelection2Settings.prefixClass.hover },
                                        focus: { ...prevState.tabItems.settings.appSettingQuery.instituteSelection2Settings.prefixClass.focus, ...instituteSelection2Settings.prefixClass.focus },
                                        active: { ...prevState.tabItems.settings.appSettingQuery.instituteSelection2Settings.prefixClass.active, ...instituteSelection2Settings.prefixClass.active },
                                    },
                                }

                                // ...prevState.tabItems.settings.appSettingQuery,
                                // ...settings?.appSettingQuery
                            }
                        },
                        histories: {
                            colorHistory: colorHistory,
                            customColors: customColors,
                            actives: actives
                        }
                    }
                }));

            } else {
                const { message = '' } = data;
            }
            setLoading(false);

        } catch (err) {
            setLoading(false);
        }
    }

    let headerPageFrameData = recoilStateValue.tabItems.settings.appSettingQuery?.pageFrameSettings;
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const headerHeight = headerPageFrameData?.prefixClass?.sm.headerHeight
    const footerHeight = footerSettingData?.classes?.height

    useEffect(() => {
        if (ref1.current && ref1.current.offsetHeight) {
            setStepHeaderHeight(ref1.current.offsetHeight)
        }
        if (ref2.current && ref2.current.offsetHeight) {
            setStepFooterHeight(ref2.current.offsetHeight)
        }

    }, [headerHeight, footerHeight]);

    const totalHeight = stepFooterHeight + 158 + stepHeaderHeight

    return (
        <div className="flex justify-between">
            {loading && <Loader />}

            <AppDesignLeft loading={loading} />
            <div className="w-full flex flex-col max-w-[calc(100%-1280px)]">
                <div className={`overscroll-y-auto scroll-bar overlay border mx-2 border-dashed border-blue-100`}
                    tabIndex={-1} style={{ height: `calc(100vh - 156px)` }}>
                    <div className={`headerArea mt-auto ${headerPageFrameData?.classes.headerPosition}`}
                        style={{
                            zIndex: 30,
                            position: headerPageFrameData?.classes.headerPosition === 'fixed' ? `sticky` : ``,
                            top: (headerPageFrameData?.classes.headerPosition === 'fixed' ||
                                headerPageFrameData?.classes.headerPosition === 'sticky') ? 0 : ``

                        }} ref={ref1}>
                        <AppPreviewHeader />
                    </div>
                    <PageFluidBodyApp
                        stretchAreaStyle={{ backgroundColor: pageFrameDataQuery?.stretchBackgroundColor?.backgroundColor }}
                        stretchCustomClass={headerPageFrameData?.classes.stretchCustomClass}
                        style={{
                            minHeight: `calc(100vh - ${+totalHeight}px)`,
                            // marginTop: (headerPageFrameData?.classes.headerPosition === 'fixed' ||
                            marginTop: headerPageFrameData?.classes.headerPosition === 'absolute' ? `${stepHeaderHeight}px` : `auto`
                        }}
                        fetchAppDesignerData={fetchAppDesignerData}
                        setValidationErrors={setValidationErrors}
                        loading={loading}
                        setLoading={setLoading}
                        flexType="1" previewBorderClass=""
                    />
                    {footerSettingData?.info?.hasFooter === true &&
                        <div className={`footerArea relative w-full mt-auto left-0 right-0`} ref={ref2}>
                            <AppPreviewFooter footerPageFrameData={footerSettingData} />
                        </div>
                    }
                </div>

                <div className={`min-w-[640px] px-4`}>
                    <Formik initialValues="" onSubmit="">
                        <Form>
                            <AppFormFooter
                                padding=" mt-8"
                                btn_title1={'新規追加'}
                                btn_title2={'連続追加'}
                                isMemo="0"
                                fetchAppDesignerData={fetchAppDesignerData}
                                setValidationErrors={setValidationErrors}
                                loading={loading}
                                setLoading={setLoading}
                            />
                        </Form>
                    </Formik>
                </div>
            </div>
            <AppDesignRight loading={loading} errors={validationErrors} fetchAppDesignerData={fetchAppDesignerData} />
        </div>
    );
};
export default AppDesignerForm