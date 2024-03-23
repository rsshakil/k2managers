import { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import _ from "lodash";
import { v4 as uuid } from 'uuid';

import TreeListCustom from "../shared/TreeListCustom";
import { appDesignerState, getSelectedPageData, defaultBlockSettings } from "../../store/recoil/appDesignerState";
import ButtonBlockForm from './blockModals/ButtonBlockForm';
import InformationAreaBlockForm from './blockModals/InformationAreaBlockForm';
import TextLinkBlockForm from "./blockModals/TextLinkBlockForm";
import ImageBlockForm from "./blockModals/ImageBlockForm";
import HBlockForm from "./blockModals/HBlockForm";
import DisplayControlSettingBlockForm from "./blockModals/DisplayControlSettingBlockForm";
import TermsConditionBlockForm from "./blockModals/TermsConditionBlockForm";
import HorizontalLineBlockForm from "./blockModals/HorizontalLineBlockForm";
import SpaceBlockForm from "./blockModals/SpaceBlockForm";
import MapBlockForm from "./blockModals/MapBlockForm";
import HtmlEditorBlockForm from "./blockModals/HtmlEditorBlockForm";
import DisplayField from "./blockModals/DisplayField";


import { blockListTypes } from "../../utilities/commonFunctions";

export default function SettingPageBlocks({ config = {}, label = "", blocks = [], fieldKey = '' }) {
    const [recoilStateValue, setRecoilState] = useRecoilState(appDesignerState);
    const selectedPageDetail = useRecoilValue(getSelectedPageData);

    const pageBlocks = blockListTypes();
    const pageFrameBlockTypes = blockListTypes(['', 'BUTTON', 'IMAGE', 'TEXT_LINK', 'INFORMATION_AREA', 'HORIZONTAL_LINE', 'SPACE_SETTINGS_BLOCK', 'MAP', 'HTML_EDITOR', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'DISPLAY_CONTROL_BLOCK_SETTING', 'DISPLAY_FIELD'], false);

    const { idKey = "", activeItem = "", clickableCells = [] } = config;

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedBlock, setSelectedBlock] = useState(null);

    const { activeTab, activePageId, tabItems } = recoilStateValue;
    const pageList = tabItems[activeTab].appSettingQuery[activePageId].blocks;
    useEffect(() => {
        document.body.classList.toggle('no-scroll', modalOpen);
    }, [modalOpen])
    let dropDownKeyList = activePageId == 'pageFrameSettings' ? pageFrameBlockTypes : pageBlocks;

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
    //     button2FieldModify: 2,
    //     button2FieldModifySetting: [],
    //     memo: '',
    // }

    function handleOnEventTriggered(e, eventType = '', modifiedItems = []) {
        let updatedBlocks = [];


        switch (eventType) {
            case 'add':
                const selectedBlock = JSON.parse(e.target.value);
                if (!selectedBlock) return null;

                let newBlock = { ...selectedBlock, ...getNewItemAttributes(selectedBlock) };

                updatedBlocks = orderBlocks([...blocks, newBlock]);
                updateState(fieldKey, updatedBlocks);

                return updatedBlocks;
            case 'delete':
                const selectedItem = e.row.data;

                updatedBlocks = _.filter(blocks, (item) => {
                    return (item.appPageBlockId !== selectedItem.appPageBlockId)
                })

                updateState(fieldKey, updatedBlocks);
                break;

            case 'edit':
                const data = e.row.data
                setModalOpen(true);

                const defaultBlockAttributes = defaultBlockSettings[data.key] || {};
                let selectedData = { ...defaultBlockAttributes, ...data };

                setSelectedBlock(selectedData);

                break;
            case 'orderChange':
                const updatedItems = orderBlocks(modifiedItems);

                updateState('blocks', updatedItems);
                break;
            default:
                return null;
        }
    }


    function updateState(key, value) {
        const currentStateData = JSON.parse(JSON.stringify({ ...recoilStateValue }));

        currentStateData.tabItems[activeTab].appSettingQuery[activePageId].blocks[key] = orderBlocks(value);
        setRecoilState(currentStateData);
    }

    function orderBlocks(pageBlocks = []) {
        pageBlocks = JSON.parse(JSON.stringify([...pageBlocks]));

        return pageBlocks.map((item, index) => {
            item.appPageBlockOrderNo = index + 1
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
    }

    function handleOnPressModalSaveButton(e, formData, modalClose = false) {
        if (e && e != '') e.preventDefault();
        setModalOpen(modalClose);

        let selectedTabPages = JSON.parse(JSON.stringify([...tabItems[activeTab].appSettingQuery[activePageId].blocks[fieldKey]]));
        let updatedBlocks = selectedTabPages.map(i => {
            if (i.appPageBlockId === selectedBlock.appPageBlockId) {
                return { ...i, ...formData, blockListCaption: blockTitle(formData) };
            }
            return i;
        })
        const currentStateData = JSON.parse(JSON.stringify({ ...recoilStateValue }));
        currentStateData.tabItems[activeTab].appSettingQuery[activePageId].blocks[fieldKey] = updatedBlocks;
        setRecoilState(currentStateData);

    }


    const blockTitle = (data) => {
        let title = data.blockPageTitle;

        switch (data.key) {
            case 'BUTTON':
                const buttonTitles = [data.button1Text, data.button2Text].filter(e => e);
                title += buttonTitles.join(',');
                break;

            case 'INFORMATION_AREA':
                const infoAreaTitles = [data.informationAreaTitle];
                title += infoAreaTitles.join(',');
                break;

            case 'TEXT_LINK':
                const textLinkTitles = [data.linkText];
                title += textLinkTitles.join(',');
                break;

            case 'H1':
            case 'H2':
            case 'H3':
            case 'H4':
            case 'H5':
            case 'H6':
                const hTitles = [data.headingText];
                title += hTitles.join(',');
                break;

            default:
                break
        }

        return title;
    }

    return (
        <>
            <label className="pt-4 text-blue-100 text-xs">{label}</label>

            <TreeListCustom
                config={{
                    treeListClasses: 'custom-treelist',
                    noDataText: "",
                    dragDropConfig: { allowDragDrop: true, handleOnOrderChange: (e, eventType, updatedItems) => handleOnEventTriggered(e, eventType, updatedItems) },
                    showColumnHeaders: false,
                    idKey: idKey,
                    defaultSelected: activeItem,
                    clickableCells: clickableCells,
                    dragDirection: 'vertical', // Accepted Values: 'both' | 'horizontal' | 'vertical' => Default Value: 'both'

                    handleOnCellPreapared: (e, eventType) => handleOnEventTriggered(e, eventType),

                    allowAddMoreButton: true,
                }}
                addMoreConfig={{
                    buttonType: "dropdown",
                    options: {
                        dropdownItems: dropDownKeyList,
                        captionKey: "blockPageTitle",
                        valueKey: "blockPageId",
                        handleOnClick: (e, eventType) => handleOnEventTriggered(e, eventType)
                    }
                }}
                dataSource={blocks}
                columns={[{ dataField: "blockListCaption", eventType: "cellClick", classes: "cursor-pointer truncate max-w-[478px] !w-[478px]", handleOnClick: ({ e, eventType, updatedItems }) => handleOnEventTriggered(e, eventType, updatedItems) }]}
                actionColumns={[
                    { icon: "edit", eventType: "edit", handleOnClick: ({ e, eventType, updatedItems }) => handleOnEventTriggered(e, eventType, updatedItems) },
                    { icon: "trash", eventType: "delete", handleOnClick: ({ e, eventType, updatedItems }) => handleOnEventTriggered(e, eventType, updatedItems) },
                ]}
            />



            {modalOpen && (
                <>
                    {selectedBlock.key === 'BUTTON' && <ButtonBlockForm fieldKey={fieldKey} blockData={selectedBlock} setModalOpen={setModalOpen} handleOnPressSave={handleOnPressModalSaveButton} />}
                    {selectedBlock.key === 'INFORMATION_AREA' && <InformationAreaBlockForm fieldKey={fieldKey} blockData={selectedBlock} setModalOpen={setModalOpen} handleOnPressSave={handleOnPressModalSaveButton} />}
                    {selectedBlock.key === 'TEXT_LINK' && <TextLinkBlockForm fieldKey={fieldKey} blockData={selectedBlock} setModalOpen={setModalOpen} handleOnPressSave={handleOnPressModalSaveButton} />}
                    {selectedBlock.key === 'IMAGE' && <ImageBlockForm fieldKey={fieldKey} blockData={selectedBlock} setModalOpen={setModalOpen} handleOnPressSave={handleOnPressModalSaveButton} />}
                    {selectedBlock.key === 'H1' && <HBlockForm blockData={selectedBlock} setModalOpen={setModalOpen} handleOnPressSave={handleOnPressModalSaveButton} type="1" />}
                    {selectedBlock.key === 'H2' && <HBlockForm blockData={selectedBlock} setModalOpen={setModalOpen} handleOnPressSave={handleOnPressModalSaveButton} type="2" />}
                    {selectedBlock.key === 'H3' && <HBlockForm blockData={selectedBlock} setModalOpen={setModalOpen} handleOnPressSave={handleOnPressModalSaveButton} type="3" />}
                    {selectedBlock.key === 'H4' && <HBlockForm blockData={selectedBlock} setModalOpen={setModalOpen} handleOnPressSave={handleOnPressModalSaveButton} type="4" />}
                    {selectedBlock.key === 'H5' && <HBlockForm blockData={selectedBlock} setModalOpen={setModalOpen} handleOnPressSave={handleOnPressModalSaveButton} type="5" />}
                    {selectedBlock.key === 'H6' && <HBlockForm blockData={selectedBlock} setModalOpen={setModalOpen} handleOnPressSave={handleOnPressModalSaveButton} type="6" />}
                    {selectedBlock.key === 'DISPLAY_CONTROL_BLOCK_SETTING' && <DisplayControlSettingBlockForm blockData={selectedBlock} setModalOpen={setModalOpen} handleOnPressSave={handleOnPressModalSaveButton} fieldKey={fieldKey} />}
                    {selectedBlock.key === 'HORIZONTAL_LINE' && <HorizontalLineBlockForm blockData={selectedBlock} setModalOpen={setModalOpen} handleOnPressSave={handleOnPressModalSaveButton} />}
                    {selectedBlock.key === 'SPACE_SETTINGS_BLOCK' && <SpaceBlockForm blockData={selectedBlock} setModalOpen={setModalOpen} handleOnPressSave={handleOnPressModalSaveButton} />}
                    {selectedBlock.key === 'MAP' && <MapBlockForm blockData={selectedBlock} setModalOpen={setModalOpen} handleOnPressSave={handleOnPressModalSaveButton} />}
                    {selectedBlock.key === 'HTML_EDITOR' && <HtmlEditorBlockForm blockData={selectedBlock} setModalOpen={setModalOpen} handleOnPressSave={handleOnPressModalSaveButton} />}
                    {selectedBlock.key === 'DISPLAY_FIELD' && <DisplayField blockData={selectedBlock} setModalOpen={setModalOpen} handleOnPressSave={handleOnPressModalSaveButton} />}
                </>
            )}
        </>
    )
}