import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { v4 as uuid } from "uuid";

import {
    appDesignerState, defaultBlockSettings, getSelectedPageData
} from "../../store/recoil/appDesignerState";
import { BlockFieldValidate, blockListTypes, blockTitle } from "../../utilities/commonFunctions";
import TreeListCustom from "../shared/TreeListCustom";
import BirthdayBlockForm from "./blockModals/BirthdayBlockForm";
import Block2TokenLogin1 from "./blockModals/Block2TokenLogin1";
import Block2TokenLogin2 from "./blockModals/Block2TokenLogin2";
import BlockBirthdaySettings from "./blockModals/BlockBirthdaySettings";
import BusSettingBlock from "./blockModals/BusSettingBlock";
import ButtonBlockForm from "./blockModals/ButtonBlockForm";
import Category from "./blockModals/Category";
import CategorySettingBlock from "./blockModals/CategorySettingBlock";
import CheckboxSettingsBlockForm from "./blockModals/CheckboxSettingsBlockForm";
import CombineInputText from "./blockModals/CombineInputText";
import DisplayControlSettingBlockForm from "./blockModals/DisplayControlSettingBlockForm";
import DisplayField from "./blockModals/DisplayField";
import FieldDisplaySettingBlockForm from "./blockModals/FieldDisplaySettingBlockForm";
import HBlockForm from "./blockModals/HBlockForm";
import HorizontalLineBlockForm from "./blockModals/HorizontalLineBlockForm";
import HtmlEditorBlockForm from "./blockModals/HtmlEditorBlockForm";
import ImageBlockForm from "./blockModals/ImageBlockForm";
import InformationAreaBlockForm from "./blockModals/InformationAreaBlockForm";
import InputDateSettingsBlock from "./blockModals/InputDateSettingsBlock";
import InputNumberSettingsBlock from "./blockModals/InputNumberSettingsBlock";
import InputText from "./blockModals/InputText";
import InputTextAreaSettingsBlock from "./blockModals/InputTextAreaSettingsBlock";
import InputTextSettingsBlock from "./blockModals/InputTextSettingsBlock";
import InputTimeSettingsBlock from "./blockModals/InputTimeSettingsBlock";
import InstituteBlockForm from "./blockModals/InstituteBlockForm";
import Item from "./blockModals/Item";
import ItemSettingBlock from "./blockModals/ItemSettingBlock";
import JoinInputFormSettingsBlock from "./blockModals/JoinInputFormSettingsBlock";
import LoginButtonForm from "./blockModals/LoginButtonForm";
import MapBlockForm from "./blockModals/MapBlockForm";
import OneButtonLogin from "./blockModals/OneButtonLogin";
import OneTokenLoginBlockForm from "./blockModals/OneTokenLoginBlockForm";
import OptionSelect from "./blockModals/OptionSelect";
import PageTitleSettingBlock from "./blockModals/PageTitleSettingBlock";
import RadioA from "./blockModals/RadioA";
import RadioASettingsBlockForm from "./blockModals/RadioASettingsBlockForm";
import RadioBSettingsBlockForm from "./blockModals/RadioBSettingsBlockForm";
import ReservationNumberBlockForm from "./blockModals/ReservationNumberBlockForm";
import SelectSettingsBlockForm from "./blockModals/SelectSettingsBlockForm";
import Slot from "./blockModals/Slot";
import SpaceBlockForm from "./blockModals/SpaceBlockForm";
import TermsConditionBlockForm from "./blockModals/TermsConditionBlockForm";
import TermsOfService from "./blockModals/TermsOfService";
import TextLinkBlockForm from "./blockModals/TextLinkBlockForm";
import ThreeTokenLoginBlockForm from "./blockModals/ThreeTokenLoginBlockForm";
import TwoTokenLogin from "./blockModals/TwoTokenLogin";
import TwoTokenLoginBlockForm from "./blockModals/TwoTokenLoginBlockForm";
import ZipCodeSearchSettingBlock from "./blockModals/ZipCodeSearchSettingBlock";
import ZipSearchSettingBlockForm from "./blockModals/ZipSearchSettingBlockForm";


const mapper = {
    freePages: "appPageId",
    commonPages: "appCommonPageId",
};

export default function PageBlocks({ config = {}, label = "", blocks = [] }) {
    const [recoilStateValue, setRecoilState] = useRecoilState(appDesignerState);
    const selectedPageDetail = useRecoilValue(getSelectedPageData);
    const [nameError, setNameError] = useState({});
    const [uniqueError, setUniqueError] = useState({});

    blocks = blocks.map((row) => {
        let row2 = Object.assign({}, row);
        row2.blockListCaption = blockTitle(row);
        return row2;
    });

    const { idKey = "", activeItem = "", clickableCells = [] } = config;

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedBlock, setSelectedBlock] = useState(null);

    const { activeTab, activePageId, tabItems } = recoilStateValue;
    const pageList = tabItems[activeTab];

    const divisionNumber =
        tabItems?.settings?.appSettingQuery?.token1loginSettings?.info
            ?.divisionNumber;

    const token2DivisionNumber =
        tabItems?.settings?.appSettingQuery?.token2loginSettings?.info
            ?.divisionNumber;

    const token3DivisionNumber =
        tabItems?.settings?.appSettingQuery?.token3loginSettings?.info
            ?.divisionNumber;

    const buttonType =
        tabItems?.settings?.appSettingQuery?.token2loginSettings?.info
            ?.buttonType;


    // For TWO_TOKEN_LOGIN_1 & TWO_TOKEN_LOGIN_2
    const { token2loginType1Settings, token2loginType2Settings } = tabItems.settings?.appSettingQuery;
    const { divisionNumber: twoTokenLoginType1DivisionNo = 1, buttonType: twoTokenLoginType1ButtonType = 'a' } = token2loginType1Settings?.info;
    const { divisionNumber: twoTokenLoginType2DivisionNo = 1, buttonType: twoTokenLoginType2ButtonType = 'a' } = token2loginType2Settings?.info;


    useEffect(() => {
        document.body.classList.toggle('no-scroll', modalOpen);
    }, [modalOpen])

    const pageBlocks = blockListTypes(["displayItem", "ONE_TOKEN_LOGIN_BLOCK", "THREE_TOKEN_LOGIN"], true);

    // let buttonDefautl = {
    //     buttonQuantity: 1,
    //     buttonType: 'a',
    //     blockWrapCustomClass: '',
    //     button1Text: '',
    //     button1Filter: '',
    //     button1DisabledText: '',
    //     button1FilterResTargetField: '',
    //     button1Function: 'onClick',
    //     button1Reservation: {
    //         successDestination: '',
    //         successTargetField: '',
    //         networkErrorDestination: '',
    //         networkErrorTargetField: '',
    //         networkErrorModalClose: 2,
    //         networkErrorButtonDisable: 2,
    //         networkErrorText: '',
    //         error1Destination: '',
    //         error1TargetField: '',
    //         error1ModalClose: 2,
    //         error1ButtonDisable: 2,
    //         error1Text: '',
    //         error1Code: 201,
    //         error2Destination: '',
    //         error2TargetField: '',
    //         error2ModalClose: 2,
    //         error2ButtonDisable: 2,
    //         error2Text: '',
    //         error2Code: 202,
    //         error3Destination: '',
    //         error3TargetField: '',
    //         error3ModalClose: 2,
    //         error3ButtonDisable: 2,
    //         error3Text: '',
    //         error3Code: 203,
    //     },
    //     button1ReservationCancel: {
    //         successDestination: '',
    //         successTargetField: '',
    //         networkErrorDestination: '',
    //         networkErrorTargetField: '',
    //         networkErrorModalClose: 2,
    //         networkErrorButtonDisable: 2,
    //         networkErrorText: '',
    //         error1Destination: '',
    //         error1TargetField: '',
    //         error1ModalClose: 2,
    //         error1ButtonDisable: 2,
    //         error1Text: '',
    //         error1Code: 301,
    //         error2Destination: '',
    //         error2TargetField: '',
    //         error2ModalClose: 2,
    //         error2ButtonDisable: 2,
    //         error2Text: '',
    //         error2Code: 302,
    //         error3Destination: '',
    //         error3TargetField: '',
    //         error3ModalClose: 2,
    //         error3ButtonDisable: 2,
    //         error3Text: '',
    //         error3Code: 303,
    //     },
    //     button1ReservationChange: {
    //         successDestination: '',
    //         successTargetField: '',
    //         networkErrorDestination: '',
    //         networkErrorTargetField: '',
    //         networkErrorModalClose: 2,
    //         networkErrorButtonDisable: 2,
    //         networkErrorText: '',
    //         error1Destination: '',
    //         error1TargetField: '',
    //         error1ModalClose: 2,
    //         error1ButtonDisable: 2,
    //         error1Text: '',
    //         error1Code: 401,
    //         error2Destination: '',
    //         error2TargetField: '',
    //         error2ModalClose: 2,
    //         error2ButtonDisable: 2,
    //         error2Text: '',
    //         error2Code: 402,
    //         error3Destination: '',
    //         error3TargetField: '',
    //         error3ModalClose: 2,
    //         error3ButtonDisable: 2,
    //         error3Text: '',
    //         error3Code: 403,
    //     },
    //     button1SendField: {
    //         successDestination: '',
    //         successTargetField: '',
    //         networkErrorDestination: '',
    //         networkErrorTargetField: '',
    //         networkErrorModalClose: 2,
    //         networkErrorButtonDisable: 2,
    //         networkErrorText: '',
    //         error1Destination: '',
    //         error1TargetField: '',
    //         error1ModalClose: 2,
    //         error1ButtonDisable: 2,
    //         error1Text: '',
    //         error1Code: 501,
    //         error2Destination: '',
    //         error2TargetField: '',
    //         error2ModalClose: 2,
    //         error2ButtonDisable: 2,
    //         error2Text: '',
    //         error2Code: 502,
    //         error3Destination: '',
    //         error3TargetField: '',
    //         error3ModalClose: 2,
    //         error3ButtonDisable: 2,
    //         error3Text: '',
    //         error3Code: 503,
    //         sendTargetField: []
    //     },
    //     button1Destination: '',
    //     button1HasModal: 2,
    //     button1HasPressingFilter: 2,
    //     button1HasSpinner: 3,
    //     button1SpinnerSvg: '',

    //     button1ModalButtonStructure: 3,
    //     button1ModalButtonType: 'a',
    //     button1ModalTrueText: '',
    //     button1ModalFalseText: '',
    //     button1ModalHeight: 'h-auto',
    //     button1ModalHeightSm: 'sm:h-auto',
    //     button1ModalHeightMd: 'md:h-auto',
    //     button1ModalHeightLg: 'lg:h-auto',
    //     button1ModalHeightXl: 'xl:h-auto',
    //     button1ModalHeight2xl: '2xl:h-auto',
    //     button1ModalWidth: 'w-auto',
    //     button1ModalWidthSm: 'sm:w-auto',
    //     button1ModalWidthMd: 'md:w-auto',
    //     button1ModalWidthLg: 'lg:w-auto',
    //     button1ModalWidthXl: 'xl:w-auto',
    //     button1ModalWidth2xl: '2xl:w-auto',
    //     button1ModalBorderWidth: 'border-0',
    //     button1ModalBorderStyle: 'border-solid',
    //     button1ModalBorderRadius: 'rounded-none',
    //     button1ModalBoxShadow: 'drop-shadow-none',
    //     button1ModalErrorTextSize: 'text-base',
    //     button1ModalErrorTextWeight: 'font-normal',
    //     button1ModalErrorCustomClass: '',
    //     button1ModalBorderColor: 'border-[#ffffff]',
    //     button1ModalBackgroundColor: 'bg-[#ffffff]',
    //     button1ModalBoxShadowColor: 'shadow-[#ffffff]',
    //     button1ModalTextColor: 'text-[#ffffff]',
    //     button1ValidateFilters: [],
    //     button1blocks: [
    //         {
    //             informationAreaType: 1,
    //             informationAreaCustomClass: "",
    //             informationAreaTitle: "",
    //             informationAreaContnts: "",
    //             memo: "",
    //             blocks: [],
    //             belowBlockText: "",
    //             appPageBlockId: uuid(),
    //             appPageBlockOrderNo: 0,
    //             blockListCaption: "[情報エリアブロック]",
    //             blockPageTitle: "情報エリアブロック",
    //             blockPageId: 1,
    //             key: "INFORMATION_AREA",
    //         },
    //     ],
    //     button1FieldModify: 2,
    //     button1FieldModifySetting: [],
    //     button1ModalBlockWrapCustomClass: '',
    //     button1ModalButtonWrapCustomClass: '',
    //     button1ModalModalWrapCustomClass: '',


    //     button2Text: '',
    //     button2Filter: '',
    //     button2DisabledText: '',
    //     button2FilterResTargetField: '',
    //     button2Function: 'onClick',
    //     button2Reservation: {
    //         successDestination: '',
    //         successTargetField: '',
    //         networkErrorDestination: '',
    //         networkErrorTargetField: '',
    //         networkErrorModalClose: 2,
    //         networkErrorButtonDisable: 2,
    //         networkErrorText: '',
    //         error1Destination: '',
    //         error1TargetField: '',
    //         error1ModalClose: 2,
    //         error1ButtonDisable: 2,
    //         error1Text: '',
    //         error1Code: 201,
    //         error2Destination: '',
    //         error2TargetField: '',
    //         error2ModalClose: 2,
    //         error2ButtonDisable: 2,
    //         error2Text: '',
    //         error2Code: 202,
    //         error3Destination: '',
    //         error3TargetField: '',
    //         error3ModalClose: 2,
    //         error3ButtonDisable: 2,
    //         error3Text: '',
    //         error3Code: 203,
    //     },
    //     button2ReservationCancel: {
    //         successDestination: '',
    //         successTargetField: '',
    //         networkErrorDestination: '',
    //         networkErrorTargetField: '',
    //         networkErrorModalClose: 2,
    //         networkErrorButtonDisable: 2,
    //         networkErrorText: '',
    //         error1Destination: '',
    //         error1TargetField: '',
    //         error1ModalClose: 2,
    //         error1ButtonDisable: 2,
    //         error1Text: '',
    //         error1Code: 301,
    //         error2Destination: '',
    //         error2TargetField: '',
    //         error2ModalClose: 2,
    //         error2ButtonDisable: 2,
    //         error2Text: '',
    //         error2Code: 302,
    //         error3Destination: '',
    //         error3TargetField: '',
    //         error3ModalClose: 2,
    //         error3ButtonDisable: 2,
    //         error3Text: '',
    //         error3Code: 303,
    //     },
    //     button2ReservationChange: {
    //         successDestination: '',
    //         successTargetField: '',
    //         networkErrorDestination: '',
    //         networkErrorTargetField: '',
    //         networkErrorModalClose: 2,
    //         networkErrorButtonDisable: 2,
    //         networkErrorText: '',
    //         error1Destination: '',
    //         error1TargetField: '',
    //         error1ModalClose: 2,
    //         error1ButtonDisable: 2,
    //         error1Text: '',
    //         error1Code: 401,
    //         error2Destination: '',
    //         error2TargetField: '',
    //         error2ModalClose: 2,
    //         error2ButtonDisable: 2,
    //         error2Text: '',
    //         error2Code: 402,
    //         error3Destination: '',
    //         error3TargetField: '',
    //         error3ModalClose: 2,
    //         error3ButtonDisable: 2,
    //         error3Text: '',
    //         error3Code: 403,
    //     },
    //     button2SendField: {
    //         successDestination: '',
    //         successTargetField: '',
    //         networkErrorDestination: '',
    //         networkErrorTargetField: '',
    //         networkErrorModalClose: 2,
    //         networkErrorButtonDisable: 2,
    //         networkErrorText: '',
    //         error1Destination: '',
    //         error1TargetField: '',
    //         error1ModalClose: 2,
    //         error1ButtonDisable: 2,
    //         error1Text: '',
    //         error1Code: 501,
    //         error2Destination: '',
    //         error2TargetField: '',
    //         error2ModalClose: 2,
    //         error2ButtonDisable: 2,
    //         error2Text: '',
    //         error2Code: 502,
    //         error3Destination: '',
    //         error3TargetField: '',
    //         error3ModalClose: 2,
    //         error3ButtonDisable: 2,
    //         error3Text: '',
    //         error3Code: 503,
    //         sendTargetField: []
    //     },
    //     button2Destination: '',
    //     button2HasModal: 2,
    //     button2HasPressingFilter: 2,
    //     button2HasSpinner: 3,
    //     button2SpinnerSvg: '',

    //     button2ModalButtonStructure: 3,
    //     button2ModalButtonType: 'a',
    //     button2ModalTrueText: '',
    //     button2ModalFalseText: '',
    //     button2ModalHight: 'h-auto',
    //     button2ModalHeightSm: 'sm:h-auto',
    //     button2ModalHeightMd: 'md:h-auto',
    //     button2ModalHeightLg: 'lg:h-auto',
    //     button2ModalHeightXl: 'xl:h-auto',
    //     button2ModalHeight2xl: '2xl:h-auto',
    //     button2ModalWidth: 'w-auto',
    //     button2ModalWidthSm: 'sm:w-auto',
    //     button2ModalWidthMd: 'md:w-auto',
    //     button2ModalWidthLg: 'lg:w-auto',
    //     button2ModalWidthXl: 'xl:w-auto',
    //     button2ModalWidth2xl: '2xl:w-auto',
    //     button2ModalBorderWidth: 'border-0',
    //     button2ModalBorderStyle: 'border-solid',
    //     button2ModalBorderRadius: 'rounded-none',
    //     button2ModalBoxShadow: 'drop-shadow-none',
    //     button2ModalErrorTextSize: 'text-base',
    //     button2ModalErrorTextWeight: 'font-normal',
    //     button2ModalErrorCustomClass: '',
    //     button2ModalBorderColor: 'border-[#ffffff]',
    //     button2ModalBackgroundColor: 'bg-[#ffffff]',
    //     button2ModalBoxShadowColor: 'shadow-[#ffffff]',
    //     button2ModalTextColor: 'text-[#ffffff]',

    //     button2blocks: [],
    //     button2ValidateFilters: [],
    //     button2ModalBlockWrapCustomClass: '',
    //     button2ModalButtonWrapCustomClass: '',
    //     button2ModalModalWrapCustomClass: '',
    //     button1CustomClass: '',
    //     button2CustomClass: '',
    //     itemSelectionOnThisPage: {},
    //     button1WaitingForItemCheck: 2,
    //     button2WaitingForItemCheck: 2,
    //     button2FieldModify: 2,
    //     button2FieldModifySetting: [],
    //     memo: '',
    // };

    function handleOnEventTriggered(e, eventType = "", modifiedItems = []) {
        let updatedBlocks = [];

        switch (eventType) {
            case "add":
                const selectedBlock = JSON.parse(e.target.value);
                if (!selectedBlock) return null;

                setUniqueError({});
                let newBlock = {
                    ...selectedBlock,
                    ...getNewItemAttributes(selectedBlock),
                };
                updatedBlocks = [...blocks, newBlock];

                updateState("blocks", updatedBlocks);
                setNameError({})

                return updatedBlocks;
            case "delete":
                const selectedItem = e.row.data;
                setUniqueError({});
                updatedBlocks = _.filter(blocks, (item) => {
                    return item.appPageBlockId !== selectedItem.appPageBlockId;
                });

                updateState("blocks", updatedBlocks);
                break;

            case "edit":
                const data = e.row.data;
                setUniqueError({});
                setNameError({});

                setModalOpen(true);
                //setSelectedBlock(_.merge(defaultBlockSettings[data.key], data));
                setSelectedBlock({ ...defaultBlockSettings[data.key], ...data });

                break;
            case "orderChange":
                const updatedItems = orderBlocks(modifiedItems);

                updateState("blocks", updatedItems);
                break;
            default:
                return null;
        }
    }

    function updateState(key, value) {
        const currentStateData = JSON.parse(
            JSON.stringify({ ...recoilStateValue })
        );

        let updatedData = { ...selectedPageDetail, [key]: orderBlocks(value) };
        const index = pageList.findIndex(
            (x) => x[mapper[activeTab]] == activePageId
        );
        currentStateData.tabItems[activeTab][index] = updatedData;

        setRecoilState(currentStateData);
    }

    function orderBlocks(pageBlocks = []) {
        pageBlocks = JSON.parse(JSON.stringify([...pageBlocks]));

        return pageBlocks.map((item, index) => {
            item.appPageBlockOrderNo = index + 1;
            return item;
        });
    }

    function getNewItemAttributes(blockKey) {
        const { key } = blockKey;

        let newDefaultBlock = defaultBlockSettings[key];
        const newBlockInfoDefault = {
            appPageBlockId: uuid(),
            appPageBlockOrderNo: 0,
            blockListCaption: blockKey.blockPageTitle,
        };

        if (key == "BUTTON" && newDefaultBlock.hasOwnProperty("button1blocks") && newDefaultBlock.button1blocks.length > 0) {
            newDefaultBlock = {
                ...newDefaultBlock,
                button1blocks: newDefaultBlock.button1blocks.map(x => { return { ...x, appPageBlockId: uuid() } })
            }
        }
        else if (newDefaultBlock.hasOwnProperty("blocks") && newDefaultBlock.blocks.length > 0) {
            newDefaultBlock = {
                ...newDefaultBlock,
                blocks: newDefaultBlock.blocks.map(x => { return { ...x, appPageBlockId: uuid() } })
            }
        }

        return { ...newBlockInfoDefault, ...newDefaultBlock };

        // if (key == "BUTTON") {
        //     return { ...newBlockInfoDefault, ...buttonDefautl };
        // } else {
        //     return { ...newBlockInfoDefault, ...newDefaultBlock };
        // }
    }

    function handleOnPressModalSaveButton(e, formData, modalClose = false) {
        if (e && e != '') e.preventDefault();

        /*new code for validate 20230208*/
        let isValidate = BlockFieldValidate(formData, tabItems);
        if (isValidate.hasOwnProperty('err')) {
            setUniqueError(isValidate);
            return false;
        } else {
            setUniqueError({});
        }
        /*new code for validate 20230208*/
        setModalOpen(modalClose);

        let selectedTabPages = JSON.parse(
            JSON.stringify([...tabItems[activeTab]])
        );

        let updatedPages = selectedTabPages.map((x) => {
            if (
                x[mapper[activeTab]] === selectedPageDetail[mapper[activeTab]]
            ) {
                let updatedBlocks = x.blocks.map((i) => {
                    if (i.appPageBlockId === selectedBlock.appPageBlockId) {
                        return {
                            ...i,
                            ...formData,
                            blockListCaption: blockTitle(formData),
                        };
                    }
                    return i;
                });
                return { ...x, blocks: updatedBlocks };
            }
            return x;
        });

        setRecoilState((prevState) => ({
            ...prevState,
            tabItems: {
                ...prevState.tabItems,
                [activeTab]: updatedPages,
            },
        }));
    }

    const handleBlur = (e, appPageBlockId) => {
        setNameError({});

        const { name, value } = e.target;
        const key = `${appPageBlockId}_${name}`;

        let currentNames = { ...recoilStateValue.tabItems.names };


        if (!value) {
            delete currentNames[key];

        } else {
            const exists = Object.values(currentNames).includes(value);
            if (exists) setNameError({ name: "そのname属性は使用できません" });

            currentNames = { ...currentNames, [key]: value }
        }

        setRecoilState((prevState) => ({
            ...prevState,
            tabItems: {
                ...prevState.tabItems,
                names: currentNames,
            },
        }));
    };

    return (
        <>
            <label className="pt-4 text-blue-100 text-xs">{label}</label>

            <TreeListCustom
                config={{
                    treeListClasses: "custom-treelist block-content !w-[608px]",
                    noDataText: "",
                    dragDropConfig: {
                        allowDragDrop: true,
                        handleOnOrderChange: (e, eventType, updatedItems) =>
                            handleOnEventTriggered(e, eventType, updatedItems),
                    },
                    showColumnHeaders: false,
                    columnAutoWidth: false,
                    idKey: idKey,
                    defaultSelected: activeItem,
                    clickableCells: clickableCells,
                    dragDirection: "vertical", // Accepted Values: 'both' | 'horizontal' | 'vertical' => Default Value: 'both'

                    handleOnCellPreapared: (e, eventType) =>
                        handleOnEventTriggered(e, eventType),

                    allowAddMoreButton: !(blocks.length > 47),
                }}
                addMoreConfig={{
                    buttonType: "dropdown",
                    options: {
                        dropdownItems: pageBlocks,
                        captionKey: "blockPageTitle",
                        valueKey: "blockPageId",
                        handleOnClick: (e, eventType) =>
                            handleOnEventTriggered(e, eventType),
                    },
                }}
                dataSource={blocks}
                columns={[
                    {
                        dataField: "blockListCaption",
                        eventType: "cellClick",
                        classes: "cursor-pointer max-w-[478px] !w-[478px]",
                        handleOnClick: ({ e, eventType, updatedItems }) =>
                            handleOnEventTriggered(e, eventType, updatedItems),
                    },
                ]}
                actionColumns={[
                    {
                        icon: "edit",
                        eventType: "edit",
                        handleOnClick: ({ e, eventType, updatedItems }) =>
                            handleOnEventTriggered(e, eventType, updatedItems),
                    },
                    {
                        icon: "trash",
                        eventType: "delete",
                        handleOnClick: ({ e, eventType, updatedItems }) =>
                            handleOnEventTriggered(e, eventType, updatedItems),
                    },
                ]}
            />

            {modalOpen && (
                <>
                    {selectedBlock.key === "BUTTON" && (
                        <ButtonBlockForm
                            blockData={selectedBlock}
                            setModalOpen={setModalOpen}
                            handleOnPressSave={handleOnPressModalSaveButton}
                        />
                    )}
                    {selectedBlock.key === "INFORMATION_AREA" && (
                        <InformationAreaBlockForm
                            blockData={selectedBlock}
                            setModalOpen={setModalOpen}
                            handleOnPressSave={handleOnPressModalSaveButton}
                        />
                    )}
                    {selectedBlock.key === "IMAGE" && (
                        <ImageBlockForm
                            blockData={selectedBlock}
                            setModalOpen={setModalOpen}
                            handleOnPressSave={handleOnPressModalSaveButton}
                        />
                    )}
                    {selectedBlock.key === "TEXT_LINK" && (
                        <TextLinkBlockForm
                            blockData={selectedBlock}
                            setModalOpen={setModalOpen}
                            handleOnPressSave={handleOnPressModalSaveButton}
                        />
                    )}
                    {selectedBlock.key === "H1" && (
                        <HBlockForm
                            blockData={selectedBlock}
                            setModalOpen={setModalOpen}
                            handleOnPressSave={handleOnPressModalSaveButton}
                            type="1"
                        />
                    )}
                    {selectedBlock.key === "H2" && (
                        <HBlockForm
                            blockData={selectedBlock}
                            setModalOpen={setModalOpen}
                            handleOnPressSave={handleOnPressModalSaveButton}
                            type="2"
                        />
                    )}
                    {selectedBlock.key === "H3" && (
                        <HBlockForm
                            blockData={selectedBlock}
                            setModalOpen={setModalOpen}
                            handleOnPressSave={handleOnPressModalSaveButton}
                            type="3"
                        />
                    )}
                    {selectedBlock.key === "H4" && (
                        <HBlockForm
                            blockData={selectedBlock}
                            setModalOpen={setModalOpen}
                            handleOnPressSave={handleOnPressModalSaveButton}
                            type="4"
                        />
                    )}
                    {selectedBlock.key === "H5" && (
                        <HBlockForm
                            blockData={selectedBlock}
                            setModalOpen={setModalOpen}
                            handleOnPressSave={handleOnPressModalSaveButton}
                            type="5"
                        />
                    )}
                    {selectedBlock.key === "H6" && (
                        <HBlockForm
                            blockData={selectedBlock}
                            setModalOpen={setModalOpen}
                            handleOnPressSave={handleOnPressModalSaveButton}
                            type="6"
                        />
                    )}
                    {selectedBlock.key === "PAGE_TITLE_SETTINGS_BLOCK" && (
                        <PageTitleSettingBlock
                            blockData={selectedBlock}
                            setModalOpen={setModalOpen}
                            handleOnPressSave={handleOnPressModalSaveButton}
                        />
                    )}
                    {selectedBlock.key === "RESERVATION_NUMBER" && (
                        <ReservationNumberBlockForm
                            blockData={selectedBlock}
                            setModalOpen={setModalOpen}
                            handleOnPressSave={handleOnPressModalSaveButton}
                        />
                    )}
                    {selectedBlock.key === "HORIZONTAL_LINE" && (
                        <HorizontalLineBlockForm
                            blockData={selectedBlock}
                            setModalOpen={setModalOpen}
                            handleOnPressSave={handleOnPressModalSaveButton}
                        />
                    )}
                    {selectedBlock.key === "SPACE_SETTINGS_BLOCK" && (
                        <SpaceBlockForm
                            blockData={selectedBlock}
                            setModalOpen={setModalOpen}
                            handleOnPressSave={handleOnPressModalSaveButton}
                        />
                    )}
                    {selectedBlock.key === "MAP" && (
                        <MapBlockForm
                            blockData={selectedBlock}
                            setModalOpen={setModalOpen}
                            handleOnPressSave={handleOnPressModalSaveButton}
                        />
                    )}
                    {selectedBlock.key === "HTML_EDITOR" && (
                        <HtmlEditorBlockForm
                            blockData={selectedBlock}
                            setModalOpen={setModalOpen}
                            handleOnPressSave={handleOnPressModalSaveButton}
                        />
                    )}
                    {selectedBlock.key === "JOIN_INPUT_FORM_SETTINGS_BLOCK" && (
                        <JoinInputFormSettingsBlock
                            blockData={selectedBlock}
                            setModalOpen={setModalOpen}
                            handleOnPressSave={handleOnPressModalSaveButton}
                            uniqueError={uniqueError}
                        />
                    )}
                    {selectedBlock.key === "COMBINE_INPUT_TEXT" && (
                        <CombineInputText
                            blockData={selectedBlock}
                            setModalOpen={setModalOpen}
                            handleOnPressSave={handleOnPressModalSaveButton}
                            handleBlur={handleBlur}
                            nameError={nameError}
                            uniqueError={uniqueError}
                        />
                    )}
                    {selectedBlock.key === "INPUT_TEXT_SETTINGS_BLOCK" && (
                        <InputTextSettingsBlock
                            blockData={selectedBlock}
                            setModalOpen={setModalOpen}
                            handleOnPressSave={handleOnPressModalSaveButton}
                            uniqueError={uniqueError}
                        />
                    )}
                    {selectedBlock.key === "INPUT_TEXT" && (
                        <InputText
                            blockData={selectedBlock}
                            setModalOpen={setModalOpen}
                            handleOnPressSave={handleOnPressModalSaveButton}
                            uniqueError={uniqueError}
                        />
                    )}
                    {selectedBlock.key === "INPUT_DATE_SETTINGS_BLOCK" && (
                        <InputDateSettingsBlock
                            blockData={selectedBlock}
                            setModalOpen={setModalOpen}
                            handleOnPressSave={handleOnPressModalSaveButton}
                            uniqueError={uniqueError}
                        />
                    )}
                    {selectedBlock.key === "INPUT_BIRTHDAY" && (
                        <BirthdayBlockForm
                            handleBlur={handleBlur}
                            blockData={selectedBlock}
                            setModalOpen={setModalOpen}
                            handleOnPressSave={handleOnPressModalSaveButton}
                            uniqueError={uniqueError}
                        />
                    )}
                    {selectedBlock.key === "INPUT_TIME_SETTINGS_BLOCK" && (
                        <InputTimeSettingsBlock
                            blockData={selectedBlock}
                            setModalOpen={setModalOpen}
                            handleOnPressSave={handleOnPressModalSaveButton}
                            uniqueError={uniqueError}
                        />
                    )}
                    {selectedBlock.key === "INPUT_NUMBER_SETTINGS_BLOCK" && (
                        <InputNumberSettingsBlock
                            blockData={selectedBlock}
                            setModalOpen={setModalOpen}
                            handleOnPressSave={handleOnPressModalSaveButton}
                            uniqueError={uniqueError}
                        />
                    )}
                    {selectedBlock.key === "INPUT_TEXTAREA_SETTINGS_BLOCK" && (
                        <InputTextAreaSettingsBlock
                            blockData={selectedBlock}
                            setModalOpen={setModalOpen}
                            handleOnPressSave={handleOnPressModalSaveButton}
                            uniqueError={uniqueError}
                        />
                    )}
                    {selectedBlock.key === "CHECKBOX_SETTINGS_BLOCK" && (
                        <CheckboxSettingsBlockForm
                            blockData={selectedBlock}
                            setModalOpen={setModalOpen}
                            handleOnPressSave={handleOnPressModalSaveButton}
                            uniqueError={uniqueError}
                        />
                    )}
                    {selectedBlock.key === "SELECT_SETTINGS_BLOCK" && (
                        <SelectSettingsBlockForm
                            blockData={selectedBlock}
                            setModalOpen={setModalOpen}
                            handleOnPressSave={handleOnPressModalSaveButton}
                            uniqueError={uniqueError}
                        />
                    )}
                    {selectedBlock.key === "OPTION_SELECT" && (
                        <OptionSelect
                            blockData={selectedBlock}
                            setModalOpen={setModalOpen}
                            handleOnPressSave={handleOnPressModalSaveButton}
                            uniqueError={uniqueError}
                        />
                    )}
                    {selectedBlock.key === "RADIOA_SETTINGS_BLOCK" && (
                        <RadioASettingsBlockForm
                            blockData={selectedBlock}
                            setModalOpen={setModalOpen}
                            handleOnPressSave={handleOnPressModalSaveButton}
                            uniqueError={uniqueError}
                        />
                    )}
                    {selectedBlock.key === "RADIO_A" && (
                        <RadioA
                            blockData={selectedBlock}
                            setModalOpen={setModalOpen}
                            handleOnPressSave={handleOnPressModalSaveButton}
                            uniqueError={uniqueError}
                        />
                    )}
                    {selectedBlock.key === "RADIOB_SETTINGS_BLOCK" && (
                        <RadioBSettingsBlockForm
                            blockData={selectedBlock}
                            setModalOpen={setModalOpen}
                            handleOnPressSave={handleOnPressModalSaveButton}
                            uniqueError={uniqueError}
                        />
                    )}
                    {selectedBlock.key === "FIELD_DISPLAY_SETTINGS_BLOCK" && (
                        <FieldDisplaySettingBlockForm
                            blockData={selectedBlock}
                            setModalOpen={setModalOpen}
                            handleOnPressSave={handleOnPressModalSaveButton}
                        />
                    )}
                    {selectedBlock.key === "DISPLAY_FIELD" && (
                        <DisplayField
                            blockData={selectedBlock}
                            setModalOpen={setModalOpen}
                            handleOnPressSave={handleOnPressModalSaveButton}
                        />
                    )}
                    {selectedBlock.key === "ZIP_CODE_SEARCH_SETTINGS_BLOCK" && (
                        <ZipCodeSearchSettingBlock
                            blockData={selectedBlock}
                            setModalOpen={setModalOpen}
                            handleOnPressSave={handleOnPressModalSaveButton}
                            uniqueError={uniqueError}
                        />
                    )}
                    {selectedBlock.key === "ZIP_CODE_SEARCH" && (
                        <ZipSearchSettingBlockForm
                            handleBlur={handleBlur}
                            blockData={selectedBlock}
                            setModalOpen={setModalOpen}
                            handleOnPressSave={handleOnPressModalSaveButton}
                            uniqueError={uniqueError}
                        />
                    )}
                    {selectedBlock.key === "CATEGORY_SETTINGS_BLOCK" && (
                        <CategorySettingBlock
                            blockData={selectedBlock}
                            setModalOpen={setModalOpen}
                            handleOnPressSave={handleOnPressModalSaveButton}
                        />
                    )}
                    {selectedBlock.key === "CATEGORY" && (
                        <Category
                            blockData={selectedBlock}
                            setModalOpen={setModalOpen}
                            handleOnPressSave={handleOnPressModalSaveButton}
                        />
                    )}
                    {selectedBlock.key === "BUS_SETTINGS_BLOCK" && (
                        <BusSettingBlock
                            blockData={selectedBlock}
                            setModalOpen={setModalOpen}
                            handleOnPressSave={handleOnPressModalSaveButton}
                        />
                    )}
                    {selectedBlock.key === "SLOT" && (
                        <Slot
                            blockData={selectedBlock}
                            setModalOpen={setModalOpen}
                            handleOnPressSave={handleOnPressModalSaveButton}
                        />
                    )}
                    {selectedBlock.key === "ITEM_SETTINGS_BLOCK" && (
                        <ItemSettingBlock
                            blockData={selectedBlock}
                            setModalOpen={setModalOpen}
                            handleOnPressSave={handleOnPressModalSaveButton}
                        />
                    )}
                    {selectedBlock.key === "ITEM" && (
                        <Item
                            blockData={selectedBlock}
                            setModalOpen={setModalOpen}
                            handleOnPressSave={handleOnPressModalSaveButton}
                        />
                    )}
                    {selectedBlock.key === "INSTITUTE" && (
                        <InstituteBlockForm
                            blockData={selectedBlock}
                            setModalOpen={setModalOpen}
                            handleOnPressSave={handleOnPressModalSaveButton}
                        />
                    )}
                    {selectedBlock.key === "TERMSS_OF_SERVICE" && (
                        <TermsConditionBlockForm
                            blockData={selectedBlock}
                            setModalOpen={setModalOpen}
                            handleOnPressSave={handleOnPressModalSaveButton}
                        />
                    )}
                    {selectedBlock.key === "TERMS_OF_SERVICE" && (
                        <TermsOfService
                            blockData={selectedBlock}
                            setModalOpen={setModalOpen}
                            handleOnPressSave={handleOnPressModalSaveButton}
                        />
                    )}
                    {selectedBlock.key === "LOGIN_BUTTON" && (
                        <LoginButtonForm
                            blockData={selectedBlock}
                            setModalOpen={setModalOpen}
                            handleOnPressSave={handleOnPressModalSaveButton}
                        />
                    )}
                    {selectedBlock.key === "ONE_BUTTON_LOGIN" && (
                        <OneButtonLogin
                            blockData={selectedBlock}
                            setModalOpen={setModalOpen}
                            handleOnPressSave={handleOnPressModalSaveButton}
                        />
                    )}
                    {selectedBlock.key === "ONE_TOKEN_LOGIN_BLOCK" && (
                        <OneTokenLoginBlockForm
                            divisionNumber={divisionNumber}
                            blockData={selectedBlock}
                            setModalOpen={setModalOpen}
                            handleOnPressSave={handleOnPressModalSaveButton}
                        />
                    )}
                    {selectedBlock.key === "TWO_TOKEN_LOGIN_BLOCK" && (
                        <TwoTokenLoginBlockForm
                            divisionNumber={token2DivisionNumber}
                            buttonType={buttonType}
                            blockData={selectedBlock}
                            setModalOpen={setModalOpen}
                            handleOnPressSave={handleOnPressModalSaveButton}
                        />
                    )}
                    {selectedBlock.key === "TWO_TOKEN_LOGIN" && (
                        <TwoTokenLogin
                            divisionNumber={token2DivisionNumber}
                            buttonType={buttonType}
                            blockData={selectedBlock}
                            setModalOpen={setModalOpen}
                            handleOnPressSave={handleOnPressModalSaveButton}
                            uniqueError={uniqueError}
                        />
                    )}

                    {selectedBlock.key === "TWO_TOKEN_LOGIN_1" && (
                        <Block2TokenLogin1
                            divisionNumber={twoTokenLoginType1DivisionNo}
                            buttonType={twoTokenLoginType1ButtonType}
                            blockData={selectedBlock}
                            setModalOpen={setModalOpen}
                            handleOnPressSave={handleOnPressModalSaveButton}
                            uniqueError={uniqueError}
                        />
                    )}
                    {selectedBlock.key === "TWO_TOKEN_LOGIN_2" && (
                        <Block2TokenLogin2
                            divisionNumber={twoTokenLoginType2DivisionNo}
                            buttonType={twoTokenLoginType2ButtonType}
                            blockData={selectedBlock}
                            setModalOpen={setModalOpen}
                            handleOnPressSave={handleOnPressModalSaveButton}
                            uniqueError={uniqueError}
                        />
                    )}

                    {selectedBlock.key === "THREE_TOKEN_LOGIN" && (
                        <ThreeTokenLoginBlockForm
                            divisionNumber={token3DivisionNumber}
                            blockData={selectedBlock}
                            setModalOpen={setModalOpen}
                            handleOnPressSave={handleOnPressModalSaveButton}
                        />
                    )}
                    {selectedBlock.key === "DISPLAY_CONTROL_BLOCK_SETTING" && (
                        <DisplayControlSettingBlockForm
                            blockData={selectedBlock}
                            setModalOpen={setModalOpen}
                            handleOnPressSave={handleOnPressModalSaveButton}
                            uniqueError={uniqueError}
                        />
                    )}
                    {selectedBlock.key === "BIRTHDAY_SETTINGS_BLOCK" && (
                        <BlockBirthdaySettings
                            blockData={selectedBlock}
                            setModalOpen={setModalOpen}
                            handleOnPressSave={handleOnPressModalSaveButton}
                            uniqueError={uniqueError}
                        />
                    )}
                </>
            )}
        </>
    );
}
