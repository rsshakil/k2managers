import { Form, Formik } from 'formik';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { v4 as uuid } from 'uuid';

import BirthdayBlockForm from './BirthdayBlockForm';
import Block2TokenLogin1 from './Block2TokenLogin1';
import Block2TokenLogin2 from './Block2TokenLogin2';
import BlockBirthdaySettings from './BlockBirthdaySettings';
import BusSettingBlock from './BusSettingBlock';
import ButtonBlockForm from './ButtonBlockForm';
import Category from './Category';
import CategorySettingBlock from './CategorySettingBlock';
import CheckboxSettingsBlockForm from './CheckboxSettingsBlockForm';
import CombineInputText from './CombineInputText';
import DisplayControlSettingBlockFormDuplicate from './DisplayControlSettingBlockForm';
import DisplayField from './DisplayField';
import FieldDisplaySettingBlockForm from './FieldDisplaySettingBlockForm';
import HBlockForm from './HBlockForm';
import HorizontalLineBlockForm from './HorizontalLineBlockForm';
import HtmlEditorBlockForm from './HtmlEditorBlockForm';
import ImageBlockForm from './ImageBlockForm';
import InformationAreaBlockForm from './InformationAreaBlockForm';
import InputDateSettingsBlock from './InputDateSettingsBlock';
import InputNumberSettingsBlock from './InputNumberSettingsBlock';
import InputText from './InputText';
import InputTextAreaSettingsBlock from './InputTextAreaSettingsBlock';
import InputTextSettingsBlock from './InputTextSettingsBlock';
import InputTimeSettingsBlock from './InputTimeSettingsBlock';
import InstituteBlockForm from './InstituteBlockForm';
import Item from './Item';
import ItemSettingBlock from './ItemSettingBlock';
import JoinInputFormSettingsBlock from './JoinInputFormSettingsBlock';
import LoginButtonForm from './LoginButtonForm';
import MapBlockForm from './MapBlockForm';
import OneButtonLogin from './OneButtonLogin';
import OneTokenLoginBlockForm from './OneTokenLoginBlockForm';
import OptionSelect from './OptionSelect';
import PageTitleSettingBlock from './PageTitleSettingBlock';
import RadioA from './RadioA';
import RadioASettingsBlockForm from './RadioASettingsBlockForm';
import RadioBSettingsBlockForm from './RadioBSettingsBlockForm';
import ReservationNumberBlockForm from './ReservationNumberBlockForm';
import SelectSettingsBlockForm from './SelectSettingsBlockForm';
import Slot from './Slot';
import SpaceBlockForm from './SpaceBlockForm';
import TermsConditionBlockForm from './TermsConditionBlockForm';
import TermsOfService from './TermsOfService';
import TextLinkBlockForm from './TextLinkBlockForm';
import ThreeTokenLoginBlockForm from './ThreeTokenLoginBlockForm';
import TwoTokenLogin from './TwoTokenLogin';
import TwoTokenLoginBlockForm from './TwoTokenLoginBlockForm';
import ZipCodeSearchSettingBlock from './ZipCodeSearchSettingBlock';
import ZipSearchSettingBlockForm from './ZipSearchSettingBlockForm';

import { getFilterList } from '../../../services/appDesignerService';
import {
    appDesignerState,
    defaultBlockSettings,
    getSelectedPageData,
    getTransitionDestinationRouteList,
} from '../../../store/recoil/appDesignerState';
import { BlockFieldValidate, blockListTypes, blockTitle, valueFormatCheck } from '../../../utilities/commonFunctions';
import Note from '../../Form/FormInputs/Note';
import SelectBox from '../../Form/FormInputs/SelectBox';
import Loader from '../../Loading/Loader';
import ModalTitle from '../../Modal/components/ModalTitle';
import WhiteModalWrapper from '../../Modal/components/WhiteModalWrapper';
import TreeListCustom from '../../shared/TreeListCustom';
import InputContainer from '../../Wrapper/InputContainer';
import BlockModalFooter from './BlockModalFooter';

export default function DisplayControlSettingBlockForm({
    blockData,
    setModalOpen = () => { },
    handleOnPressSave = () => { },
}) {
    const transitionRoutes = useRecoilValue(getTransitionDestinationRouteList);
    const [recoilStateValue, setRecoilState] = useRecoilState(appDesignerState);
    const selectedPageDetail = useRecoilValue(getSelectedPageData);

    const { tabItems } = recoilStateValue;
    const [uniqueError, setUniqueError] = useState({});
    const [filters, setFilters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState(blockData);

    const [modalOpen1, setModalOpen1] = useState(false);
    const [selectedBlock1, setSelectedBlock1] = useState(null);
    const pageBlocks = blockListTypes(
        [
            'displayItem',
            'ONE_TOKEN_LOGIN_BLOCK',
            'THREE_TOKEN_LOGIN',
            'DISPLAY_CONTROL_BLOCK_SETTING',
            'SLOT',
            'ITEM',
            'INSTITUTE',
            'CATEGORY',
        ],
        true
    );

    const divisionNumber = tabItems?.settings?.appSettingQuery?.token1loginSettings?.info?.divisionNumber;
    const token2DivisionNumber = tabItems?.settings?.appSettingQuery?.token2loginSettings?.info?.divisionNumber;
    const token3DivisionNumber = tabItems?.settings?.appSettingQuery?.token3loginSettings?.info?.divisionNumber;
    const buttonType = tabItems?.settings?.appSettingQuery?.token2loginSettings?.info?.buttonType;

    // For TWO_TOKEN_LOGIN_1 & TWO_TOKEN_LOGIN_2
    const { token2loginType1Settings, token2loginType2Settings } = tabItems.settings?.appSettingQuery;
    const { divisionNumber: twoTokenLoginType1DivisionNo = 1, buttonType: twoTokenLoginType1ButtonType = 'a' } =
        token2loginType1Settings?.info;
    const { divisionNumber: twoTokenLoginType2DivisionNo = 1, buttonType: twoTokenLoginType2ButtonType = 'a' } =
        token2loginType2Settings?.info;

    const mapper = {
        freePages: 'appPageId',
        commonPages: 'appCommonPageId',
    };

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
    //         sendTargetField: [],
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
    //             informationAreaCustomClass: '',
    //             informationAreaTitle: '',
    //             informationAreaContnts: '',
    //             memo: '',
    //             blocks: [],
    //             belowBlockText: '',
    //             appPageBlockId: uuid(),
    //             appPageBlockOrderNo: 0,
    //             blockListCaption: '[情報エリアブロック]',
    //             blockPageTitle: '情報エリアブロック',
    //             blockPageId: 1,
    //             key: 'INFORMATION_AREA',
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
    //         sendTargetField: [],
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
    // };
    useEffect(() => {
        async function fetchFilteList() {
            try {
                setLoading(true);
                const projectId = sessionStorage.getItem('currentProjectId');

                const { data, status } = await getFilterList(projectId);

                if (status == 200) {
                    let { records = [] } = data || [];
                    setFilters(records);
                }

                setLoading(false);
            } catch (err) {
                setLoading(false);
            }
        }

        fetchFilteList();
    }, []);

    function handleOnchange(e) {
        let name = e.target.name;
        let value = valueFormatCheck(e.target.value);

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    function handleOnEventTriggered(e, eventType = '', modifiedItems = []) {
        switch (eventType) {
            case 'add':
                const selectedField = JSON.parse(e.target.value);
                if (!selectedField) return null;
                const newField = { ...selectedField, ...getNewItemAttributes(selectedField) };
                const updatedFields = orderBlocks([...formData.blocks, newField]);

                updateState('blocks', updatedFields);
                setUniqueError({});
                return updatedFields;
            case 'delete':
                const selectedItem = e.row.data;
                setUniqueError({});
                const filteredBlocks = _.filter(formData.blocks, (item) => {
                    return item.appPageBlockId !== selectedItem.appPageBlockId;
                });
                updateState('blocks', filteredBlocks);

                let newFormdata = { ...formData, blocks: filteredBlocks };
                handleOnPressSave('', newFormdata, true);

                break;

            case 'edit':
                const data = e.row.data;
                setUniqueError({});
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

    function handleOnPressModalSaveButton(e, blockData, modalClose = false) {
        if (e != '') e.preventDefault();
        let isValidate = BlockFieldValidate(blockData, tabItems);
        if (isValidate.hasOwnProperty('err')) {
            setUniqueError(isValidate);
            return false;
        } else {
            setUniqueError({});
        }
        /*new code for validate 20230208*/
        setModalOpen1(modalClose);
        blockData.blockListCaption = blockTitle(blockData);
        setSelectedBlock1(blockData);

        let updatedBlocks = [...formData.blocks];
        updatedBlocks.splice(_.findIndex(updatedBlocks, { appPageBlockId: blockData.appPageBlockId }), 1, blockData);

        setFormData((prevState) => ({
            ...prevState,
            blocks: updatedBlocks,
        }));

        let newFormdata = { ...formData, blocks: updatedBlocks };
        handleOnPressSave(e, newFormdata, true);
    }

    function updateState(key, value) {
        setFormData((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    }

    function orderBlocks(pageBlocks = []) {
        pageBlocks = JSON.parse(JSON.stringify([...pageBlocks]));

        return pageBlocks.map((item, index) => {
            item.fieldOrderNo = index + 1;
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

    return (
        <>
            {loading && <Loader />}

            <WhiteModalWrapper width="border-none text-black" className="items-start">
                <ModalTitle title="表示制御ブロック設定" className="text-blue-100 text-xl" />

                <Formik enableReinitialize={true} initialValues={formData}>
                    <div className="relative w-full h-full">
                        <Form onChange={handleOnchange}>
                            <div className="body-height3 pt-12 px-10 min-h-[calc(100vh-452px)] !p-0">
                                <div className="flex flex-col py-10">
                                    <InputContainer>
                                        <SelectBox
                                            label="表示条件フィルター"
                                            name="filter"
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25"
                                            value={formData.filter}
                                            onChange={handleOnchange}
                                        >
                                            <option value="0">フィルターなし</option>
                                            {filters.map((row, index) => (
                                                <option value={row.filterId} key={row.filterId + '_' + index}>
                                                    {row.filterName}
                                                </option>
                                            ))}
                                        </SelectBox>
                                    </InputContainer>

                                    <InputContainer>
                                        <label className="!text-blue-100">条件付き表示ブロック</label>
                                        <div className="px-8">
                                            <label className="pt-4 mt-4 text-blue-100 text-xs">
                                                ブロックの配置(16個まで)
                                            </label>
                                            <TreeListCustom
                                                config={{
                                                    treeListClasses: 'custom-treelist block-content px-8',
                                                    noDataText: '',
                                                    dragDropConfig: {
                                                        allowDragDrop: true,
                                                        handleOnOrderChange: (e, eventType, updatedItems) =>
                                                            handleOnEventTriggered(e, eventType, updatedItems),
                                                    },
                                                    showColumnHeaders: false,
                                                    idKey: 'appPageBlockId',
                                                    defaultSelected: 0,
                                                    clickableCells: ['fieldName'],

                                                    handleOnCellPreapared: (e, eventType) =>
                                                        handleOnEventTriggered(e, eventType),

                                                    allowAddMoreButton: !(formData.blocks.length > 15),
                                                }}
                                                addMoreConfig={{
                                                    buttonType: 'dropdown',
                                                    options: {
                                                        dropdownItems: pageBlocks,
                                                        captionKey: 'blockPageTitle',
                                                        valueKey: 'blockPageId',
                                                        handleOnClick: (e, eventType) =>
                                                            handleOnEventTriggered(e, eventType),
                                                    },
                                                }}
                                                dataSource={formData.blocks}
                                                columns={[
                                                    {
                                                        dataField: 'blockListCaption',
                                                        eventType: 'cellClick',
                                                        classes: 'cursor-pointer',
                                                        handleOnClick: ({ e, eventType, updatedItems }) =>
                                                            handleOnEventTriggered(e, eventType, updatedItems),
                                                    },
                                                ]}
                                                actionColumns={[
                                                    {
                                                        icon: 'edit',
                                                        eventType: 'edit',
                                                        handleOnClick: ({ e, eventType, updatedItems }) =>
                                                            handleOnEventTriggered(e, eventType, updatedItems),
                                                    },
                                                    {
                                                        icon: 'trash',
                                                        eventType: 'delete',
                                                        handleOnClick: ({ e, eventType, updatedItems }) =>
                                                            handleOnEventTriggered(e, eventType, updatedItems),
                                                    },
                                                ]}
                                            />
                                        </div>
                                    </InputContainer>
                                    <InputContainer>
                                        <Note
                                            label="ブロックWrapカスタムClass"
                                            name="blockWrapCustomClass"
                                            placeholder="ブロックカスタムClass"
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25 !p-1"
                                            height="h-8"
                                            value={formData.blockWrapCustomClass}
                                            onChange={handleOnchange}
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
                                {selectedBlock1.key === 'BUTTON' && (
                                    <ButtonBlockForm
                                        blockData={selectedBlock1}
                                        setModalOpen={setModalOpen1}
                                        handleOnPressSave={handleOnPressModalSaveButton}
                                    />
                                )}
                                {selectedBlock1.key === 'INFORMATION_AREA' && (
                                    <InformationAreaBlockForm
                                        blockData={selectedBlock1}
                                        setModalOpen={setModalOpen1}
                                        handleOnPressSave={handleOnPressModalSaveButton}
                                    />
                                )}
                                {selectedBlock1.key === 'IMAGE' && (
                                    <ImageBlockForm
                                        blockData={selectedBlock1}
                                        setModalOpen={setModalOpen1}
                                        handleOnPressSave={handleOnPressModalSaveButton}
                                    />
                                )}
                                {selectedBlock1.key === 'TEXT_LINK' && (
                                    <TextLinkBlockForm
                                        blockData={selectedBlock1}
                                        setModalOpen={setModalOpen1}
                                        handleOnPressSave={handleOnPressModalSaveButton}
                                    />
                                )}
                                {selectedBlock1.key === 'H1' && (
                                    <HBlockForm
                                        blockData={selectedBlock1}
                                        setModalOpen={setModalOpen1}
                                        handleOnPressSave={handleOnPressModalSaveButton}
                                        type="1"
                                    />
                                )}
                                {selectedBlock1.key === 'H2' && (
                                    <HBlockForm
                                        blockData={selectedBlock1}
                                        setModalOpen={setModalOpen1}
                                        handleOnPressSave={handleOnPressModalSaveButton}
                                        type="2"
                                    />
                                )}
                                {selectedBlock1.key === 'H3' && (
                                    <HBlockForm
                                        blockData={selectedBlock1}
                                        setModalOpen={setModalOpen1}
                                        handleOnPressSave={handleOnPressModalSaveButton}
                                        type="3"
                                    />
                                )}
                                {selectedBlock1.key === 'H4' && (
                                    <HBlockForm
                                        blockData={selectedBlock1}
                                        setModalOpen={setModalOpen1}
                                        handleOnPressSave={handleOnPressModalSaveButton}
                                        type="4"
                                    />
                                )}
                                {selectedBlock1.key === 'H5' && (
                                    <HBlockForm
                                        blockData={selectedBlock1}
                                        setModalOpen={setModalOpen1}
                                        handleOnPressSave={handleOnPressModalSaveButton}
                                        type="5"
                                    />
                                )}
                                {selectedBlock1.key === 'H6' && (
                                    <HBlockForm
                                        blockData={selectedBlock1}
                                        setModalOpen={setModalOpen1}
                                        handleOnPressSave={handleOnPressModalSaveButton}
                                        type="6"
                                    />
                                )}
                                {selectedBlock1.key === 'PAGE_TITLE_SETTINGS_BLOCK' && (
                                    <PageTitleSettingBlock
                                        blockData={selectedBlock1}
                                        setModalOpen={setModalOpen1}
                                        handleOnPressSave={handleOnPressModalSaveButton}
                                    />
                                )}
                                {selectedBlock1.key === 'RESERVATION_NUMBER' && (
                                    <ReservationNumberBlockForm
                                        blockData={selectedBlock1}
                                        setModalOpen={setModalOpen1}
                                        handleOnPressSave={handleOnPressModalSaveButton}
                                    />
                                )}
                                {selectedBlock1.key === 'HORIZONTAL_LINE' && (
                                    <HorizontalLineBlockForm
                                        blockData={selectedBlock1}
                                        setModalOpen={setModalOpen1}
                                        handleOnPressSave={handleOnPressModalSaveButton}
                                    />
                                )}
                                {selectedBlock1.key === 'SPACE_SETTINGS_BLOCK' && (
                                    <SpaceBlockForm
                                        blockData={selectedBlock1}
                                        setModalOpen={setModalOpen1}
                                        handleOnPressSave={handleOnPressModalSaveButton}
                                    />
                                )}
                                {selectedBlock1.key === 'MAP' && (
                                    <MapBlockForm
                                        blockData={selectedBlock1}
                                        setModalOpen={setModalOpen1}
                                        handleOnPressSave={handleOnPressModalSaveButton}
                                    />
                                )}
                                {selectedBlock1.key === 'HTML_EDITOR' && (
                                    <HtmlEditorBlockForm
                                        blockData={selectedBlock1}
                                        setModalOpen={setModalOpen1}
                                        handleOnPressSave={handleOnPressModalSaveButton}
                                    />
                                )}
                                {selectedBlock1.key === 'JOIN_INPUT_FORM_SETTINGS_BLOCK' && (
                                    <JoinInputFormSettingsBlock
                                        blockData={selectedBlock1}
                                        setModalOpen={setModalOpen1}
                                        handleOnPressSave={handleOnPressModalSaveButton}
                                        uniqueError={uniqueError}
                                    />
                                )}
                                {selectedBlock1.key === 'COMBINE_INPUT_TEXT' && (
                                    <CombineInputText
                                        blockData={selectedBlock1}
                                        setModalOpen={setModalOpen1}
                                        handleOnPressSave={handleOnPressModalSaveButton}
                                        uniqueError={uniqueError}
                                    />
                                )}
                                {selectedBlock1.key === 'INPUT_TEXT_SETTINGS_BLOCK' && (
                                    <InputTextSettingsBlock
                                        blockData={selectedBlock1}
                                        setModalOpen={setModalOpen1}
                                        handleOnPressSave={handleOnPressModalSaveButton}
                                        uniqueError={uniqueError}
                                    />
                                )}
                                {selectedBlock1.key === 'INPUT_TEXT' && (
                                    <InputText
                                        blockData={selectedBlock1}
                                        setModalOpen={setModalOpen1}
                                        handleOnPressSave={handleOnPressModalSaveButton}
                                        uniqueError={uniqueError}
                                    />
                                )}
                                {selectedBlock1.key === 'INPUT_DATE_SETTINGS_BLOCK' && (
                                    <InputDateSettingsBlock
                                        blockData={selectedBlock1}
                                        setModalOpen={setModalOpen1}
                                        handleOnPressSave={handleOnPressModalSaveButton}
                                        uniqueError={uniqueError}
                                    />
                                )}
                                {selectedBlock1.key === 'INPUT_BIRTHDAY' && (
                                    <BirthdayBlockForm
                                        blockData={selectedBlock1}
                                        setModalOpen={setModalOpen1}
                                        handleOnPressSave={handleOnPressModalSaveButton}
                                        uniqueError={uniqueError}
                                    />
                                )}
                                {selectedBlock1.key === 'INPUT_TIME_SETTINGS_BLOCK' && (
                                    <InputTimeSettingsBlock
                                        blockData={selectedBlock1}
                                        setModalOpen={setModalOpen1}
                                        handleOnPressSave={handleOnPressModalSaveButton}
                                        uniqueError={uniqueError}
                                    />
                                )}
                                {selectedBlock1.key === 'INPUT_NUMBER_SETTINGS_BLOCK' && (
                                    <InputNumberSettingsBlock
                                        blockData={selectedBlock1}
                                        setModalOpen={setModalOpen1}
                                        handleOnPressSave={handleOnPressModalSaveButton}
                                        uniqueError={uniqueError}
                                    />
                                )}
                                {selectedBlock1.key === 'INPUT_TEXTAREA_SETTINGS_BLOCK' && (
                                    <InputTextAreaSettingsBlock
                                        blockData={selectedBlock1}
                                        setModalOpen={setModalOpen1}
                                        handleOnPressSave={handleOnPressModalSaveButton}
                                        uniqueError={uniqueError}
                                    />
                                )}
                                {selectedBlock1.key === 'CHECKBOX_SETTINGS_BLOCK' && (
                                    <CheckboxSettingsBlockForm
                                        blockData={selectedBlock1}
                                        setModalOpen={setModalOpen1}
                                        handleOnPressSave={handleOnPressModalSaveButton}
                                        uniqueError={uniqueError}
                                    />
                                )}
                                {selectedBlock1.key === 'SELECT_SETTINGS_BLOCK' && (
                                    <SelectSettingsBlockForm
                                        blockData={selectedBlock1}
                                        setModalOpen={setModalOpen1}
                                        handleOnPressSave={handleOnPressModalSaveButton}
                                        uniqueError={uniqueError}
                                    />
                                )}
                                {selectedBlock1.key === 'OPTION_SELECT' && (
                                    <OptionSelect
                                        blockData={selectedBlock1}
                                        setModalOpen={setModalOpen1}
                                        handleOnPressSave={handleOnPressModalSaveButton}
                                        uniqueError={uniqueError}
                                    />
                                )}
                                {selectedBlock1.key === 'RADIOA_SETTINGS_BLOCK' && (
                                    <RadioASettingsBlockForm
                                        blockData={selectedBlock1}
                                        setModalOpen={setModalOpen1}
                                        handleOnPressSave={handleOnPressModalSaveButton}
                                        uniqueError={uniqueError}
                                    />
                                )}
                                {selectedBlock1.key === 'RADIO_A' && (
                                    <RadioA
                                        blockData={selectedBlock1}
                                        setModalOpen={setModalOpen1}
                                        handleOnPressSave={handleOnPressModalSaveButton}
                                        uniqueError={uniqueError}
                                    />
                                )}
                                {selectedBlock1.key === 'RADIOB_SETTINGS_BLOCK' && (
                                    <RadioBSettingsBlockForm
                                        blockData={selectedBlock1}
                                        setModalOpen={setModalOpen1}
                                        handleOnPressSave={handleOnPressModalSaveButton}
                                        uniqueError={uniqueError}
                                    />
                                )}
                                {selectedBlock1.key === 'FIELD_DISPLAY_SETTINGS_BLOCK' && (
                                    <FieldDisplaySettingBlockForm
                                        blockData={selectedBlock1}
                                        setModalOpen={setModalOpen1}
                                        handleOnPressSave={handleOnPressModalSaveButton}
                                    />
                                )}
                                {selectedBlock1.key === 'DISPLAY_FIELD' && (
                                    <DisplayField
                                        blockData={selectedBlock1}
                                        setModalOpen={setModalOpen1}
                                        handleOnPressSave={handleOnPressModalSaveButton}
                                    />
                                )}
                                {selectedBlock1.key === 'ZIP_CODE_SEARCH_SETTINGS_BLOCK' && (
                                    <ZipCodeSearchSettingBlock
                                        blockData={selectedBlock1}
                                        setModalOpen={setModalOpen1}
                                        handleOnPressSave={handleOnPressModalSaveButton}
                                        uniqueError={uniqueError}
                                    />
                                )}
                                {selectedBlock1.key === 'ZIP_CODE_SEARCH' && (
                                    <ZipSearchSettingBlockForm
                                        blockData={selectedBlock1}
                                        setModalOpen={setModalOpen1}
                                        handleOnPressSave={handleOnPressModalSaveButton}
                                        uniqueError={uniqueError}
                                    />
                                )}
                                {selectedBlock1.key === 'CATEGORY_SETTINGS_BLOCK' && (
                                    <CategorySettingBlock
                                        blockData={selectedBlock1}
                                        setModalOpen={setModalOpen1}
                                        handleOnPressSave={handleOnPressModalSaveButton}
                                    />
                                )}
                                {selectedBlock1.key === 'CATEGORY' && (
                                    <Category
                                        blockData={selectedBlock1}
                                        setModalOpen={setModalOpen1}
                                        handleOnPressSave={handleOnPressModalSaveButton}
                                    />
                                )}
                                {selectedBlock1.key === 'BUS_SETTINGS_BLOCK' && (
                                    <BusSettingBlock
                                        blockData={selectedBlock1}
                                        setModalOpen={setModalOpen1}
                                        handleOnPressSave={handleOnPressModalSaveButton}
                                    />
                                )}
                                {selectedBlock1.key === 'SLOT' && (
                                    <Slot
                                        blockData={selectedBlock1}
                                        setModalOpen={setModalOpen1}
                                        handleOnPressSave={handleOnPressModalSaveButton}
                                    />
                                )}
                                {selectedBlock1.key === 'ITEM_SETTINGS_BLOCK' && (
                                    <ItemSettingBlock
                                        blockData={selectedBlock1}
                                        setModalOpen={setModalOpen1}
                                        handleOnPressSave={handleOnPressModalSaveButton}
                                    />
                                )}
                                {selectedBlock1.key === 'ITEM' && (
                                    <Item
                                        blockData={selectedBlock1}
                                        setModalOpen={setModalOpen1}
                                        handleOnPressSave={handleOnPressModalSaveButton}
                                    />
                                )}
                                {selectedBlock1.key === 'INSTITUTE' && (
                                    <InstituteBlockForm
                                        blockData={selectedBlock1}
                                        setModalOpen={setModalOpen1}
                                        handleOnPressSave={handleOnPressModalSaveButton}
                                    />
                                )}
                                {selectedBlock1.key === 'TERMSS_OF_SERVICE' && (
                                    <TermsConditionBlockForm
                                        blockData={selectedBlock1}
                                        setModalOpen={setModalOpen1}
                                        handleOnPressSave={handleOnPressModalSaveButton}
                                    />
                                )}
                                {selectedBlock1.key === 'TERMS_OF_SERVICE' && (
                                    <TermsOfService
                                        blockData={selectedBlock1}
                                        setModalOpen={setModalOpen1}
                                        handleOnPressSave={handleOnPressModalSaveButton}
                                    />
                                )}
                                {selectedBlock1.key === 'LOGIN_BUTTON' && (
                                    <LoginButtonForm
                                        blockData={selectedBlock1}
                                        setModalOpen={setModalOpen1}
                                        handleOnPressSave={handleOnPressModalSaveButton}
                                    />
                                )}
                                {selectedBlock1.key === 'ONE_BUTTON_LOGIN' && (
                                    <OneButtonLogin
                                        blockData={selectedBlock1}
                                        setModalOpen={setModalOpen1}
                                        handleOnPressSave={handleOnPressModalSaveButton}
                                    />
                                )}
                                {selectedBlock1.key === 'ONE_TOKEN_LOGIN_BLOCK' && (
                                    <OneTokenLoginBlockForm
                                        divisionNumber={divisionNumber}
                                        blockData={selectedBlock1}
                                        setModalOpen={setModalOpen1}
                                        handleOnPressSave={handleOnPressModalSaveButton}
                                    />
                                )}
                                {selectedBlock1.key === 'TWO_TOKEN_LOGIN_BLOCK' && (
                                    <TwoTokenLoginBlockForm
                                        divisionNumber={token2DivisionNumber}
                                        buttonType={buttonType}
                                        blockData={selectedBlock1}
                                        setModalOpen={setModalOpen1}
                                        handleOnPressSave={handleOnPressModalSaveButton}
                                    />
                                )}
                                {selectedBlock1.key === 'TWO_TOKEN_LOGIN' && (
                                    <TwoTokenLogin
                                        divisionNumber={token2DivisionNumber}
                                        blockData={selectedBlock1}
                                        buttonType={buttonType}
                                        setModalOpen={setModalOpen1}
                                        handleOnPressSave={handleOnPressModalSaveButton}
                                        uniqueError={uniqueError}
                                    />
                                )}

                                {selectedBlock1.key === 'TWO_TOKEN_LOGIN_1' && (
                                    <Block2TokenLogin1
                                        divisionNumber={twoTokenLoginType1DivisionNo}
                                        blockData={selectedBlock1}
                                        buttonType={twoTokenLoginType1ButtonType}
                                        setModalOpen={setModalOpen1}
                                        handleOnPressSave={handleOnPressModalSaveButton}
                                        uniqueError={uniqueError}
                                    />
                                )}
                                {selectedBlock1.key === 'TWO_TOKEN_LOGIN_2' && (
                                    <Block2TokenLogin2
                                        divisionNumber={twoTokenLoginType2DivisionNo}
                                        blockData={selectedBlock1}
                                        buttonType={twoTokenLoginType2ButtonType}
                                        setModalOpen={setModalOpen1}
                                        handleOnPressSave={handleOnPressModalSaveButton}
                                        uniqueError={uniqueError}
                                    />
                                )}

                                {selectedBlock1.key === 'THREE_TOKEN_LOGIN' && (
                                    <ThreeTokenLoginBlockForm
                                        divisionNumber={token3DivisionNumber}
                                        blockData={selectedBlock1}
                                        setModalOpen={setModalOpen1}
                                        handleOnPressSave={handleOnPressModalSaveButton}
                                    />
                                )}
                                {selectedBlock1.key === 'DISPLAY_CONTROL_BLOCK_SETTING' && (
                                    <DisplayControlSettingBlockFormDuplicate
                                        blockData={selectedBlock1}
                                        setModalOpen={setModalOpen1}
                                        handleOnPressSave={handleOnPressModalSaveButton}
                                    />
                                )}
                                {selectedBlock1.key === 'BIRTHDAY_SETTINGS_BLOCK' && (
                                    <BlockBirthdaySettings
                                        blockData={selectedBlock1}
                                        setModalOpen={setModalOpen1}
                                        handleOnPressSave={handleOnPressModalSaveButton}
                                        uniqueError={uniqueError}
                                    />
                                )}
                            </>
                        )}
                    </div>
                </Formik>
            </WhiteModalWrapper>
        </>
    );
}
