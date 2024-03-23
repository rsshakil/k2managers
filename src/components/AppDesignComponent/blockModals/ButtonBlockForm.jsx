import { Form, Formik } from 'formik';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { v4 as uuid } from 'uuid';

import { FiSettings } from 'react-icons/fi';
import SelectBox from '../../Form/FormInputs/SelectBox';
import TextBox from '../../Form/FormInputs/TextBox';
import IconPicker from '../../IconPicker/IconPicker';
import ModalTitle from '../../Modal/components/ModalTitle';
import WhiteModalWrapper from '../../Modal/components/WhiteModalWrapper';
import InputContainer from '../../Wrapper/InputContainer';

import { buttonFunction, strokeSizeArray } from '../../../lib/commonConstants';
import { getFieldList, getFilterList } from '../../../services/appDesignerService';
import { getTransitionDestinationRouteList } from '../../../store/recoil/appDesignerState';
import { blockTitle, valueFormatCheck } from '../../../utilities/commonFunctions';
import Note from '../../Form/FormInputs/Note';
import Loader from '../../Loading/Loader';
import BlockModalFooter from './BlockModalFooter';
import ButtonCommonModalBlockForm from './ButtonCommonModalBlockForm';
import FieldValueChangeSettingModal from './FieldValueChangeSettingModal';
import FilterSettingButtonBlockForm from './FilterSettingButtonBlockForm';
import InformationAreaBlockForm from './InformationAreaBlockForm';
import ModalStructureBlockForm from './ModalStructureBlockForm';
import { tailwindColorCodeKeys } from "../SettingFormPages/SettingsForm";
import ColorPickerWithRecent from '../../ColorPicker/ColorPickerWithRecent';
import { fontSizeAttributes } from '../../../lib/tailwindClassAttributes';
import { rgbaTohex } from '../../../lib/ColorConvert';

export default function ButtonBlockForm({ blockData, setModalOpen = () => { }, handleOnPressSave = () => { } }) {
    const transitionRoutes = useRecoilValue(getTransitionDestinationRouteList);

    const [filters, setFilters] = useState([]);
    const [fieldList, setFieldList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState(blockData);

    const [modalStucture, setModalStucture] = useState(false);
    const [filterButtonModal, setFilterButtonModal] = useState(false);
    const [_reservationCreationModalForm, setReservationCreationModalForm] = useState(false);
    const [commonButtonModalForm, setCommonButtonModalForm] = useState(false);
    const [modalType, setModalType] = useState(1);
    const [selectedButton, setSelectedButton] = useState(1);
    const [modalOpen1, setModalOpen1] = useState(false);
    const [openFieldModifyModal, setOpenFieldModifyModal] = useState(false);
    const [selectedBlock1, setSelectedBlock1] = useState(null);
    const [butttonModalStuctureData, setButttonModalStuctureData] = useState(null);
    const [selectedButtonBlock, setSelectedButtonBlock] = useState(1);

    let newAdditionalObject1 = {
        button1HasModal: 1,
        button1blocks: [
            {
                informationAreaType: 1,
                informationAreaCustomClass: '',
                informationAreaTitle: '',
                informationAreaContnts: '',
                memo: '',
                blocks: [],
                belowBlockText: '',
                appPageBlockId: uuid(),
                appPageBlockOrderNo: 0,
                blockListCaption: '[情報エリアブロック]',
                blockPageTitle: '情報エリアブロック',
                blockPageId: 1,
                key: 'INFORMATION_AREA',
            },
        ],
        button1TrueText: '',
        button1FalseText: '',
        button2HasModal: 1,
        button2blocks: [],
        button2TrueText: '',
        button2FalseText: '',
        button1CustomClass: '',
        button2CustomClass: '',
    };

    useEffect(() => {
        async function fetchFieldListInit() {
            try {
                setLoading(true);
                const projectId = sessionStorage.getItem('currentProjectId');

                const { data, status } = await getFieldList('4', projectId);

                if (status == 200) {
                    let { records = [] } = data || [];

                    records = records.map((record) =>
                        _.pick(record, ['fieldId', 'fieldCode', 'fieldType', 'fieldName'])
                    );

                    setFieldList(records);
                }

                setLoading(false);
            } catch (err) {
                setLoading(false);
            }
        }

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

        fetchFieldListInit();
        fetchFilteList();

        if (!formData.hasOwnProperty('button1HasModal')) {
            if (formData.buttonQuantity == 2) {
                newAdditionalObject1.button2blocks = [
                    {
                        informationAreaType: 1,
                        informationAreaCustomClass: '',
                        informationAreaTitle: '',
                        informationAreaContnts: '',
                        memo: '',
                        blocks: [],
                        belowBlockText: '',
                        appPageBlockId: uuid(),
                        appPageBlockOrderNo: 0,
                        blockListCaption: '[情報エリアブロック]',
                        blockPageTitle: '情報エリアブロック',
                        blockPageId: 2,
                        key: 'INFORMATION_AREA',
                    },
                ];
            }
            let newFormDataObj = { ...formData, ...newAdditionalObject1 };
            setFormData(newFormDataObj);
        }
    }, []);

    function handleOnchange(e) {
        let name = e.target.name;
        let value = valueFormatCheck(e.target.value);

        if (name == 'button1HasModal' || name == 'button2HasModal') {
            value = parseInt(value);
        }

        if (name == 'buttonQuantity') {
            updatedButtonBlock2(value);
        }

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const handleOnChangeColor = (name, colorCode, tailwindColorClassKey) => {
        const hex = rgbaTohex(`rgba(${colorCode})`);
        let modifiedValue = `${tailwindColorClassKey}-[${hex}]`;


        console.log('my val ', modifiedValue)


        setFormData((prevState) => ({
            ...prevState,
            [name]: modifiedValue,
        }));
    }

    const getColorCode = (string = '') => {
        return '#' + string.match(/[a-f0-9]{6}/i);
    }

    function updatedButtonBlock2(numberOfButton) {
        let name = 'button2blocks';
        if (numberOfButton == 2) {
            if (formData.button2blocks.length == 0) {
                setFormData((prevState) => ({
                    ...prevState,
                    [name]: [
                        {
                            informationAreaType: 1,
                            informationAreaCustomClass: '',
                            informationAreaTitle: '',
                            informationAreaContnts: '',
                            memo: '',
                            blocks: [],
                            belowBlockText: '',
                            appPageBlockId: uuid(),
                            appPageBlockOrderNo: 0,
                            blockListCaption: '[情報エリアブロック]',
                            blockPageTitle: '情報エリアブロック',
                            blockPageId: 2,
                            key: 'INFORMATION_AREA',
                        },
                    ],
                }));
            }
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [name]: [],
            }));
        }
    }

    function handleOnPressModalSaveButton(e, blockData) {
        e.preventDefault();
        setModalOpen1(false);

        blockData = JSON.parse(JSON.stringify(blockData));
        blockData.blockListCaption = blockTitle(blockData);
        let blockState = '';
        if (selectedButtonBlock == 1) {
            blockState = 'button1blocks';
        } else {
            blockState = 'button2blocks';
        }

        setSelectedBlock1(blockData);

        let updatedBlocks = [...formData[blockState]];
        updatedBlocks.splice(_.findIndex(updatedBlocks, { appPageBlockId: blockData.appPageBlockId }), 1, blockData);

        setFormData((prevState) => ({
            ...prevState,
            [blockState]: updatedBlocks,
        }));
    }
    function getLabelAndPlaceholder(fieldName) {
        let fieldLabel = '';
        switch (fieldName) {
            case 'outgoingCall':
                fieldLabel = '電話番号';
                break;
            case 'sendEmail':
                fieldLabel = 'メールアドレス';
                break;
            case 'externalLink':
                fieldLabel = '外部リンク';
                break;
        }
        return fieldLabel;
    }

    function handleOnChangeIcon(name, icon) {
        // updateState(name, icon, 'info');
        setFormData((prevState) => ({
            ...prevState,
            [name]: icon,
        }));
    }

    function openModalStructureFromButton(e, buttonNo) {
        e.preventDefault();
        setModalStucture(true);
        setSelectedButton(buttonNo);
    }

    function openfilterFormButton(e, buttonNo) {
        e.preventDefault();
        setFilterButtonModal(true);
        setSelectedButton(buttonNo);
    }

    const handleOnClickFieldModifyModal = (e, buttonNo) => {
        e.preventDefault();
        setOpenFieldModifyModal(true);
        setSelectedButton(buttonNo);
    };

    function openCommonButtonModalForm(e, buttonNo, modalType) {
        e.preventDefault();
        setCommonButtonModalForm(true);
        setSelectedButton(buttonNo);
        setModalType(modalType);
    }

    function handleOnPressModalSaveButtonFromModalStucture(e, blockData) {
        setModalStucture(false);
        setFormData((prevState) => ({
            ...prevState,
            ...blockData,
        }));
    }

    function handleOnPressSavefilterData(e, blockData) {
        setFilterButtonModal(false);
        setReservationCreationModalForm(false);
        setCommonButtonModalForm(false);
        setFormData((prevState) => ({
            ...prevState,
            ...blockData,
        }));
    }

    const handleOnPressSaveFieldModifyData = (e, blockData) => {
        setOpenFieldModifyModal(false);

        setFormData((prevState) => ({
            ...prevState,
            ...blockData,
        }));
    };

    const buttonSettingsElement = (buttonNo = 1) => {
        return (
            <React.Fragment key={buttonNo}>
                <p className="text-blue-100">ボタン{buttonNo}設定</p>

                <div className="px-8">
                    <InputContainer>
                        <TextBox
                            label="ボタンテキスト（12文字まで）"
                            name={`button${buttonNo}Text`}
                            placeholder="ボタンテキスト"
                            labelClassName="text-blue-100"
                            inputClassName="bg-blue-25"
                            maxLength="12"
                            value={formData[`button${buttonNo}Text`]}
                            onChange={handleOnchange}
                        />
                    </InputContainer>
                    <div className="flex">
                        <div className="w-1/3 pr-2">
                            <InputContainer>
                                <SelectBox
                                    label="活性化条件(disabled)"
                                    name={`button${buttonNo}Filter`}
                                    labelClassName="text-blue-100"
                                    inputClassName="bg-blue-25"
                                    value={formData[`button${buttonNo}Filter`]}
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
                        </div>

                        {formData[`button${buttonNo}Filter`] > 0 && (
                            <>
                                <div className="w-1/3 px-2">
                                    <InputContainer>
                                        <TextBox
                                            label="非活性時 ボタン下エラーメッセージ"
                                            name={`button${buttonNo}DisabledText`}
                                            placeholder="ボタン下エラーメッセージ"
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25"
                                            value={formData[`button${buttonNo}DisabledText`]}
                                            onChange={handleOnchange}
                                        />
                                    </InputContainer>
                                </div>
                                <div className="w-1/3 pl-2">
                                    <InputContainer>
                                        <SelectBox
                                            label="活性状態記録先フィールド	 "
                                            name={`button${buttonNo}FilterResTargetField`}
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25"
                                            onChange={handleOnchange}
                                        >
                                            <option value="">記録しない</option>
                                            {fieldList.map((x) => (
                                                <option key={x.fieldId} value={x?.fieldCode}>
                                                    {x.fieldName}
                                                </option>
                                            ))}
                                        </SelectBox>
                                    </InputContainer>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="flex">
                        <div className="w-1/2 pr-2">
                            <InputContainer>
                                <SelectBox
                                    label="押下後機能"
                                    name={`button${buttonNo}Function`}
                                    labelClassName="text-blue-100"
                                    inputClassName="bg-blue-25"
                                    value={formData[`button${buttonNo}Function`]}
                                    onChange={(e) => handleOnchange(e, buttonNo)}
                                >
                                    {buttonFunction.map((x) => (
                                        <option key={x.value} value={x.value}>
                                            {x.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                        <div className="w-1/2 pl-2">
                            {formData[`button${buttonNo}Function`] === 'onClick' && (
                                <InputContainer>
                                    <SelectBox
                                        label="遷移先"
                                        name={`button${buttonNo}Destination`}
                                        labelClassName="text-blue-100"
                                        inputClassName="bg-blue-25"
                                        value={formData[`button${buttonNo}Destination`]}
                                        onChange={handleOnchange}
                                    >
                                        <option value="">なし</option>
                                        {/* <option value="-1">[←戻る]</option> */}
                                        {transitionRoutes.map((x) => (
                                            <option key={x.id} value={x.url}>
                                                {x.name}
                                            </option>
                                        ))}
                                    </SelectBox>
                                </InputContainer>
                            )}

                            {(formData[`button${buttonNo}Function`] === 'outgoingCall' ||
                                formData[`button${buttonNo}Function`] === 'sendEmail' ||
                                formData[`button${buttonNo}Function`] === 'externalLink') && (
                                    <InputContainer>
                                        <TextBox
                                            label={getLabelAndPlaceholder(formData[`button${buttonNo}Function`])}
                                            name={`button${buttonNo}Destination`}
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25"
                                            value={formData[`button${buttonNo}Destination`]}
                                            onChange={handleOnchange}
                                            placeholder={getLabelAndPlaceholder(formData[`button${buttonNo}Function`])}
                                        />
                                    </InputContainer>
                                )}

                            {formData[`button${buttonNo}Function`] === 'reservation' && (
                                <div className="flex justify-end mt-6">
                                    <div>
                                        <button
                                            className="text-right"
                                            onClick={(e) => openCommonButtonModalForm(e, buttonNo, 0)}
                                        >
                                            予約実行機能詳細設定
                                        </button>
                                    </div>
                                    <div className="hover:text-gray-700 align-middle align-items p-1 focus:text-gray-200 text-gray-600">
                                        <FiSettings />
                                    </div>
                                </div>
                            )}

                            {formData[`button${buttonNo}Function`] === 'reservationCancel' && (
                                <div className="flex justify-end mt-6">
                                    <div>
                                        <button
                                            className="text-right"
                                            onClick={(e) => openCommonButtonModalForm(e, buttonNo, 1)}
                                        >
                                            予約取消機能詳細設定{' '}
                                        </button>
                                    </div>
                                    <div className="hover:text-gray-700 align-middle align-items p-1 focus:text-gray-200 text-gray-600">
                                        <FiSettings />
                                    </div>
                                </div>
                            )}

                            {formData[`button${buttonNo}Function`] === 'reservationChange' && (
                                <div className="flex justify-end mt-6">
                                    <div>
                                        <button
                                            className="text-right"
                                            onClick={(e) => openCommonButtonModalForm(e, buttonNo, 2)}
                                        >
                                            予約変更機能詳細設定
                                        </button>
                                    </div>
                                    <div className="hover:text-gray-700 align-middle align-items p-1 focus:text-gray-200 text-gray-600">
                                        <FiSettings />
                                    </div>
                                </div>
                            )}

                            {formData[`button${buttonNo}Function`] === 'sendField' && (
                                <div className="flex justify-end mt-6">
                                    <div>
                                        <button
                                            className="text-right"
                                            onClick={(e) => openCommonButtonModalForm(e, buttonNo, 3)}
                                        >
                                            フィールド送信機能詳細設定
                                        </button>
                                    </div>
                                    <div className="hover:text-gray-700 align-middle align-items p-1 focus:text-gray-200 text-gray-600">
                                        <FiSettings />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <InputContainer>
                        <SelectBox
                            label="確認モーダル"
                            name={`button${buttonNo}HasModal`}
                            labelClassName="text-blue-100"
                            inputClassName="bg-blue-25"
                            value={formData[`button${buttonNo}HasModal`]}
                            onChange={handleOnchange}
                        >
                            <option value="1">はい</option>
                            <option value="2">いいえ</option>
                        </SelectBox>
                    </InputContainer>
                    <div className="flex justify-end">
                        <div>
                            <button className="text-right" onClick={(e) => openModalStructureFromButton(e, buttonNo)}>
                                モーダル詳細設定
                            </button>
                        </div>
                        <div className="hover:text-gray-700 align-middle align-items p-1 focus:text-gray-200 text-gray-600">
                            <FiSettings />
                        </div>
                    </div>

                    <InputContainer>
                        <SelectBox
                            label="ボタン押下後フィルター"
                            name={`button${buttonNo}HasPressingFilter`}
                            labelClassName="text-blue-100"
                            inputClassName="bg-blue-25"
                            value={formData[`button${buttonNo}HasPressingFilter`]}
                            onChange={handleOnchange}
                        >
                            <option value="1">あり</option>
                            <option value="2">なし</option>
                        </SelectBox>
                    </InputContainer>
                    <div className="flex flex justify-end">
                        <div>
                            <button className="text-right" onClick={(e) => openfilterFormButton(e, buttonNo)}>
                                ボタン押下後フィルター設定
                            </button>
                        </div>
                        <div className="hover:text-gray-700 align-middle align-items p-1 focus:text-gray-200 text-gray-600">
                            <FiSettings />
                        </div>
                    </div>

                    <InputContainer>
                        <SelectBox
                            label="ボタン押下後スピナー"
                            name={`button${buttonNo}HasSpinner`}
                            labelClassName="text-blue-100"
                            inputClassName="bg-blue-25"
                            value={formData[`button${buttonNo}HasSpinner`]}
                            onChange={handleOnchange}
                        >
                            <option value="1">あり</option>
                            <option value="2">なし</option>
                        </SelectBox>
                    </InputContainer>

                    {/* Spinner */}
                    <div className='flex space-x-4'>
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label='アイコン1サイズ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name={`button${buttonNo}SpinnerSize`}
                                    value={formData[`button${buttonNo}SpinnerSize`]}
                                    onChange={(e) => handleOnchange(e, 1)}>
                                    {fontSizeAttributes.map((field, index) => (
                                        <option
                                            value={field.value}
                                            key={field.value + "_" + index}>
                                            {field.caption}
                                        </option>
                                    )
                                    )}
                                </SelectBox>
                            </InputContainer>
                        </div>
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label='アイコン1strokeサイズ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name={`button${buttonNo}SpinnerStrokeSize`}
                                    value={formData[`button${buttonNo}SpinnerStrokeSize`]}
                                    onChange={(e) => handleOnchange(e, 1)}
                                >
                                    {strokeSizeArray.map((field, index) => (
                                        <option key={field.value} value={field.value} > {field.caption}</option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                    </div>
                    <div className="flex mb-4 customIconsBox space-x-4">
                        <IconPicker
                            name={`button${buttonNo}SpinnerSvg`}
                            value={formData[`button${buttonNo}SpinnerSvg`]}
                            width="32px"
                            height="32px"
                            iconSize="1.2em"
                            iconTitle="スピナーアイコン"
                            path="M894 462c30.9 0 43.8-39.7 18.7-58L530.8 126.2a31.81 31.81 0 0 0-37.6 0L111.3 404c-25.1 18.2-12.2 58 18.8 58H192v374h-72c-4.4 0-8 3.6-8 8v52c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-52c0-4.4-3.6-8-8-8h-72V462h62zM381 836H264V462h117v374zm189 0H453V462h117v374zm190 0H642V462h118v374z"
                            iconCustomClass="!rounded-none"
                            iconWrapperCustomClasses="flex flex-row items-center"
                            titleCustomClasses="ml-2 !mt-0 text-blue-100"
                            onChangeIcon={(name, iconData) => handleOnChangeIcon(name, iconData)}
                        />

                        <ColorPickerWithRecent
                            labelClassName="text-[10px] text-blue-100"
                            setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.fillColor)}
                            inputBoxItem={`button${buttonNo}SpinnerFillColor`} pickerLabel="アイコンfill色" isBackgroundColor="1"
                            isDefaultColor={getColorCode(formData[`button${buttonNo}SpinnerFillColor`])} />

                        <ColorPickerWithRecent
                            labelClassName="text-[10px] text-blue-100"
                            setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.strokeColor)}
                            inputBoxItem={`button${buttonNo}SpinnerStrokeColor`} pickerLabel="アイコンstroke色" isBackgroundColor="1"
                            isDefaultColor={getColorCode(formData[`button${buttonNo}SpinnerStrokeColor`])} />
                    </div>
                    <InputContainer>
                        <TextBox
                            label="スピナーアイコンWrapカスタムClass"
                            name={`button${buttonNo}SpinnerCustomClass`}
                            placeholder="スピナーアイコンWrapカスタムClass"
                            labelClassName="text-blue-100"
                            inputClassName="bg-blue-25"
                            value={formData[`button${buttonNo}SpinnerCustomClass`]}
                            onChange={handleOnchange}
                        />
                    </InputContainer>


                    <InputContainer>
                        <SelectBox
                            label="このページにアイテムが設置されていた時に選択状態のチェックを行う"
                            name={`button${buttonNo}WaitingForItemCheck`}
                            labelClassName="text-blue-100"
                            inputClassName="bg-blue-25"
                            value={formData[`button${buttonNo}WaitingForItemCheck`]}
                            onChange={handleOnchange}
                        >
                            <option value={1}>行う</option>
                            <option value={2}>行わない</option>
                        </SelectBox>
                    </InputContainer>

                    {/* Field clean up setting */}
                    <InputContainer>
                        <SelectBox
                            label="ボタン押下後フィールド値変更(フィルター処理後、押下後機能の直前に書き込まれます)"
                            name={`button${buttonNo}FieldModify`}
                            labelClassName="text-blue-100"
                            inputClassName="bg-blue-25"
                            value={formData[`button${buttonNo}FieldModify`]}
                            onChange={handleOnchange}
                        >
                            <option value={1}>あり</option>
                            <option value={2}>なし</option>
                        </SelectBox>
                    </InputContainer>
                    <div className="flex justify-end">
                        <button className="text-right" onClick={(e) => handleOnClickFieldModifyModal(e, buttonNo)}>
                            ボタン押下後フィールド値変更設定
                        </button>
                        <div className="hover:text-gray-700 align-middle align-items p-1 focus:text-gray-200 text-gray-600">
                            <FiSettings />
                        </div>
                    </div>

                    <InputContainer>
                        <Note
                            label={`ボタン${buttonNo}カスタムClass`}
                            name={`button${buttonNo}CustomClass`}
                            placeholder="カスタムClass"
                            labelClassName="text-blue-100"
                            inputClassName="bg-blue-25 !p-1"
                            height="h-8"
                            value={formData[`button${buttonNo}CustomClass`]}
                            onChange={handleOnchange}
                        />
                    </InputContainer>
                </div>
            </React.Fragment>
        );
    };

    return (
        <>
            {loading && <Loader />}

            <WhiteModalWrapper width="border-none text-black" className="items-start">
                <ModalTitle title="ボタンブロック設定" className="text-blue-100 text-xl" />

                <Formik enableReinitialize={true} initialValues={formData}>
                    <div className="relative w-full h-full">
                        <Form onChange={handleOnchange}>
                            <div className="body-height3 pt-12 px-10 min-h-[calc(100vh-452px)] !p-0">
                                <div className="flex flex-col py-10">
                                    <InputContainer>
                                        <SelectBox
                                            label="配置ボタン数"
                                            name="buttonQuantity"
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25"
                                        >
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                        </SelectBox>
                                    </InputContainer>
                                    <InputContainer>
                                        <SelectBox
                                            label="配置ボタンタイプ"
                                            name="buttonType"
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25"
                                        >
                                            <option value="a">A</option>
                                            <option value="b">B</option>
                                            <option value="c">C</option>
                                        </SelectBox>
                                    </InputContainer>
                                    <InputContainer>
                                        <Note
                                            label="ブロックエリアwrapカスタムClass"
                                            name="blockWrapCustomClass"
                                            placeholder="ブロックカスタムClass"
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25 !p-1"
                                            height="h-8"
                                            value={formData.blockWrapCustomClass}
                                            onChange={handleOnchange}
                                        />
                                    </InputContainer>

                                    <div className="mt-10">
                                        {_.range(formData.buttonQuantity).map((x) => buttonSettingsElement(x + 1))}
                                    </div>
                                </div>
                            </div>

                            <BlockModalFooter
                                setModalOpen={() => setModalOpen(false)}
                                handleOnPressSave={(e) => handleOnPressSave(e, formData)}
                            />
                        </Form>
                        {modalOpen1 && (
                            <>
                                {selectedBlock1.key === 'INFORMATION_AREA' && (
                                    <InformationAreaBlockForm
                                        blockData={selectedBlock1}
                                        setModalOpen={setModalOpen1}
                                        handleOnPressSave={handleOnPressModalSaveButton}
                                    />
                                )}
                            </>
                        )}
                        {modalStucture && (
                            <>
                                <ModalStructureBlockForm
                                    blockData={formData}
                                    setModalOpen={setModalStucture}
                                    handleOnPressSave={handleOnPressModalSaveButtonFromModalStucture}
                                    selectedButton={selectedButton}
                                />
                            </>
                        )}
                        {filterButtonModal && (
                            <>
                                <FilterSettingButtonBlockForm
                                    blockData={formData}
                                    setModalOpen={setFilterButtonModal}
                                    handleOnPressSave={handleOnPressSavefilterData}
                                    selectedButton={selectedButton}
                                />
                            </>
                        )}

                        {openFieldModifyModal && (
                            <FieldValueChangeSettingModal
                                blockData={formData}
                                setModalOpen={setOpenFieldModifyModal}
                                handleOnPressSave={handleOnPressSaveFieldModifyData}
                                selectedButton={selectedButton}
                            />
                        )}

                        {commonButtonModalForm && (
                            <>
                                <ButtonCommonModalBlockForm
                                    blockData={formData}
                                    setModalOpen={setCommonButtonModalForm}
                                    handleOnPressSave={handleOnPressSavefilterData}
                                    selectedButton={selectedButton}
                                    selectedModalType={modalType}
                                />
                            </>
                        )}
                    </div>
                </Formik>
            </WhiteModalWrapper>
        </>
    );
}
