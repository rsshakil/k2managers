import { Form, Formik } from "formik";
import _ from "lodash";
import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { v4 as uuid } from 'uuid';

import { appDesignerState, defaultBlockSettings, getSelectedPageData } from "../../../store/recoil/appDesignerState";
import { blockListTypes, valueFormatCheck } from "../../../utilities/commonFunctions";
import Note from "../../Form/FormInputs/Note";
import SelectBox from "../../Form/FormInputs/SelectBox";
import TextBox from "../../Form/FormInputs/TextBox";
import ModalTitle from "../../Modal/components/ModalTitle";
import WhiteModalWrapper from '../../Modal/components/WhiteModalWrapper';
import TreeListCustom from "../../shared/TreeListCustom";
import InputContainer from "../../Wrapper/InputContainer";
import ButtonBlockForm from './../blockModals/ButtonBlockForm';
import ImageBlockForm from "./../blockModals/ImageBlockForm";
import TextLinkBlockForm from "./../blockModals/TextLinkBlockForm";
import BlockModalFooter from "./BlockModalFooter";
import DisplayControlSettingBlockForm from "./DisplayControlSettingBlockForm";
import DisplayField from "./DisplayField";
import HBlockForm from "./HBlockForm";
import HorizontalLineBlockForm from "./HorizontalLineBlockForm";
import HtmlEditorBlockForm from "./HtmlEditorBlockForm";
import MapBlockForm from "./MapBlockForm";
import SpaceBlockForm from "./SpaceBlockForm";

export default function InformationAreaBlockForm({ blockData = '', setModalOpen = () => { }, handleOnPressSave = () => { }, fieldKey = '' }) {
    const selectedPageDetail = useRecoilValue(getSelectedPageData);
    const [recoilStateValue, setRecoilState] = useRecoilState(appDesignerState);

    const { activePageId } = recoilStateValue;

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

    const [modalOpen1, setModalOpen1] = useState(false);
    const [selectedBlock1, setSelectedBlock1] = useState(null);

    const [formData, setFormData] = useState(blockData);

    const pageBlocks = blockListTypes(['', 'BUTTON', 'TEXT_LINK', 'IMAGE', 'HORIZONTAL_LINE', 'SPACE_SETTINGS_BLOCK', 'MAP', 'HTML_EDITOR', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'FIELD_DISPLAY_SETTINGS_BLOCK', 'DISPLAY_FIELD', 'DISPLAY_CONTROL_BLOCK_SETTING'], false);


    function handleOnchange(e) {
        const name = e.target.name;
        const value = valueFormatCheck(e.target.value);

        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }


    function handleOnEventTriggered(e, eventType = '', modifiedItems = []) {
        let updatedBlocks = [];

        switch (eventType) {
            case 'add':
                const selectedBlock = JSON.parse(e.target.value);
                if (!selectedBlock) return null;

                let newBlock = { ...selectedBlock, ...getNewItemAttributes(selectedBlock) };
                updatedBlocks = orderBlocks([...formData.blocks, newBlock]);

                updateState('blocks', updatedBlocks);

                return updatedBlocks;
            case 'delete':
                const selectedItem = e.row.data;

                const filteredBlocks = _.filter(formData.blocks, (item) => {
                    return (item.appPageBlockId !== selectedItem.appPageBlockId)
                })


                updateState('blocks', filteredBlocks);
                break;

            case 'edit':
                const data = e.row.data
                setModalOpen1(true);

                const defaultBlockAttributes = defaultBlockSettings[data.key] || {};
                let selectedData = { ...defaultBlockAttributes, ...data };
                if (selectedBlock1 && selectedBlock1.appPageBlockId === data.appPageBlockId) {
                    selectedData = { ...selectedData, ...selectedBlock1 }
                }

                setSelectedBlock1(selectedData);

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


        setFormData((prevState) => ({
            ...prevState,
            [key]: value
        }))



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

        let newDefaultBlock = defaultBlockSettings[key] || {};
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

    function handleOnPressModalSaveButton(e, blockData, modalClose = false) {
        if (e != '') {
            e.preventDefault();
        }

        setModalOpen1(modalClose);


        blockData = JSON.parse(JSON.stringify(blockData));

        blockData.blockListCaption = blockTitle(blockData);

        setSelectedBlock1(blockData);

        let updatedBlocks = [...formData.blocks];
        updatedBlocks.splice(_.findIndex(updatedBlocks, { appPageBlockId: blockData.appPageBlockId }), 1, blockData);


        setFormData((prevState) => ({
            ...prevState,
            blocks: updatedBlocks
        }))
        let newFormdata = { ...formData, blocks: updatedBlocks }
        handleOnPressSave(e, newFormdata, true);
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
        <WhiteModalWrapper width="border-none text-black" className="items-start">
            <ModalTitle title="情報エリア設定" className="text-blue-100 text-xl" />

            <Formik
                enableReinitialize={true}
                initialValues={formData}
            >
                <div className='relative w-full h-full'>
                    <Form onChange={handleOnchange}>
                        <div className="body-height3 pt-12 px-10 min-h-[calc(100vh-452px)] !p-0">
                            <div className="flex flex-col py-10">
                                <InputContainer>
                                    <SelectBox
                                        label="情報エリアタイプ"
                                        name="informationAreaType"
                                        labelClassName="text-blue-100"
                                        inputClassName="bg-blue-25"
                                    >
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                    </SelectBox>
                                </InputContainer>

                                <InputContainer>
                                    <Note label="ブロックエリアwrapカスタムClass"
                                        name="informationAreaCustomClass"
                                        placeholder="ブロックエリアwrapカスタムClass"
                                        labelClassName='text-blue-100'
                                        inputClassName='bg-blue-25 !p-1'
                                        height='h-8'
                                    />
                                </InputContainer>

                                <InputContainer>
                                    <TextBox label="情報エリアタイトル"
                                        name="informationAreaTitle"
                                        placeholder="情報エリアタイトル"
                                        labelClassName='text-blue-100'
                                        inputClassName='bg-blue-25'
                                    />
                                </InputContainer>


                                <InputContainer>
                                    <Note
                                        label='情報エリア本文'
                                        labelClassName={`text-white !text-blue-100`}
                                        inputClassName='bg-blue-25'
                                        type='text'
                                        name='informationAreaContnts'
                                        placeholder="情報エリア本文"
                                    />
                                </InputContainer>


                                <label className="text-blue-100">情報エリア本文下ブロック</label>
                                <div className="mt-5 px-8 mb-5">
                                    <label className="!text-blue-100">ブロックの配置(3個まで)</label>

                                    <TreeListCustom
                                        config={{
                                            treeListClasses: 'custom-treelist',
                                            noDataText: "",
                                            dragDropConfig: { allowDragDrop: true, handleOnOrderChange: (e, eventType, updatedItems) => handleOnEventTriggered(e, eventType, updatedItems) },
                                            showColumnHeaders: false,
                                            idKey: 'appPageBlockId',
                                            defaultSelected: 0,
                                            clickableCells: ['blockPageTitle'],
                                            dragDirection: 'vertical',

                                            handleOnCellPreapared: (e, eventType) => handleOnEventTriggered(e, eventType),

                                            allowAddMoreButton: !(formData.blocks.length > 2),
                                        }}

                                        addMoreConfig={{
                                            buttonType: "dropdown",
                                            options: {
                                                dropdownItems: pageBlocks,
                                                captionKey: "blockPageTitle",
                                                valueKey: "blockPageId",
                                                handleOnClick: (e, eventType) => handleOnEventTriggered(e, eventType)
                                            }
                                        }}

                                        dataSource={formData.blocks}
                                        columns={[{ dataField: "blockListCaption", eventType: "cellClick", classes: "cursor-pointer", handleOnClick: ({ e, eventType, updatedItems }) => handleOnEventTriggered(e, eventType, updatedItems) }]}
                                        actionColumns={[
                                            { icon: "edit", eventType: "edit", handleOnClick: ({ e, eventType, updatedItems }) => handleOnEventTriggered(e, eventType, updatedItems) },
                                            { icon: "trash", eventType: "delete", handleOnClick: ({ e, eventType, updatedItems }) => handleOnEventTriggered(e, eventType, updatedItems) },
                                        ]}
                                    />
                                </div>

                                <InputContainer>
                                    <Note
                                        label='情報エリアblock下本文'
                                        labelClassName={`text-white !text-blue-100`}
                                        inputClassName='bg-blue-25'
                                        name='belowBlockText'
                                        placeholder=""
                                    />
                                </InputContainer>

                                <InputContainer>
                                    <Note label="情報エリアblock下本文カスタムClass"
                                        name="belowBlockTextCustomClass"
                                        placeholder="カスタムClassを入力してください"
                                        labelClassName='text-blue-100'
                                        inputClassName='bg-blue-25 !p-1'
                                        height='h-8'
                                    />
                                </InputContainer>
                            </div>
                        </div>

                        <BlockModalFooter
                            setModalOpen={() => setModalOpen(false)}
                            handleOnPressSave={(e) => handleOnPressSave(e, formData)}
                        />
                    </Form>

                    {modalOpen1 && (
                        <>

                            {selectedBlock1.key === 'BUTTON' && <ButtonBlockForm blockData={selectedBlock1} setModalOpen={setModalOpen1} handleOnPressSave={handleOnPressModalSaveButton} fieldKey={fieldKey} />}

                            {selectedBlock1.key === 'TEXT_LINK' && <TextLinkBlockForm blockData={selectedBlock1} setModalOpen={setModalOpen1} handleOnPressSave={handleOnPressModalSaveButton} fieldKey={fieldKey} />}
                            {selectedBlock1.key === 'IMAGE' && <ImageBlockForm blockData={selectedBlock1} setModalOpen={setModalOpen1} handleOnPressSave={handleOnPressModalSaveButton} fieldKey={fieldKey} />}
                            {selectedBlock1.key === 'HORIZONTAL_LINE' && <HorizontalLineBlockForm blockData={selectedBlock1} setModalOpen={setModalOpen1} handleOnPressSave={handleOnPressModalSaveButton} fieldKey={fieldKey} />}
                            {selectedBlock1.key === 'SPACE_SETTINGS_BLOCK' && <SpaceBlockForm blockData={selectedBlock1} setModalOpen={setModalOpen1} handleOnPressSave={handleOnPressModalSaveButton} fieldKey={fieldKey} />}
                            {selectedBlock1.key === 'MAP' && <MapBlockForm blockData={selectedBlock1} setModalOpen={setModalOpen1} handleOnPressSave={handleOnPressModalSaveButton} fieldKey={fieldKey} />}
                            {selectedBlock1.key === 'H1' && <HBlockForm blockData={selectedBlock1} setModalOpen={setModalOpen1} handleOnPressSave={handleOnPressModalSaveButton} type="1" />}
                            {selectedBlock1.key === 'H2' && <HBlockForm blockData={selectedBlock1} setModalOpen={setModalOpen1} handleOnPressSave={handleOnPressModalSaveButton} type="2" />}
                            {selectedBlock1.key === 'H3' && <HBlockForm blockData={selectedBlock1} setModalOpen={setModalOpen1} handleOnPressSave={handleOnPressModalSaveButton} type="3" />}
                            {selectedBlock1.key === 'H4' && <HBlockForm blockData={selectedBlock1} setModalOpen={setModalOpen1} handleOnPressSave={handleOnPressModalSaveButton} type="4" />}
                            {selectedBlock1.key === 'H5' && <HBlockForm blockData={selectedBlock1} setModalOpen={setModalOpen1} handleOnPressSave={handleOnPressModalSaveButton} type="5" />}
                            {selectedBlock1.key === 'H6' && <HBlockForm blockData={selectedBlock1} setModalOpen={setModalOpen1} handleOnPressSave={handleOnPressModalSaveButton} type="6" />}
                            {selectedBlock1.key === 'HTML_EDITOR' && <HtmlEditorBlockForm blockData={selectedBlock1} setModalOpen={setModalOpen1} handleOnPressSave={handleOnPressModalSaveButton} />}

                            {selectedBlock1.key === 'DISPLAY_FIELD' && <DisplayField blockData={selectedBlock1} setModalOpen={setModalOpen1} handleOnPressSave={handleOnPressModalSaveButton} />}
                            {selectedBlock1.key === 'DISPLAY_CONTROL_BLOCK_SETTING' && <DisplayControlSettingBlockForm blockData={selectedBlock1} setModalOpen={setModalOpen1} handleOnPressSave={handleOnPressModalSaveButton} />}
                        </>
                    )}
                </div>
            </Formik>
        </WhiteModalWrapper >
    )
}