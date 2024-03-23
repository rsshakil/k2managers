import { Form, Formik } from 'formik';
import _ from 'lodash';
import React, { useState } from 'react';
import { rgbaTohex } from '../../../lib/ColorConvert';
import {
    borderradiusArrays,
    borderWidthArrays,
    boxShadowArrays,
    fontSizeArrays,
    fontWeightArrays,
} from '../../../lib/commonConstants';
import { borderStyles, heightAttributes, widthAttributes } from '../../../lib/tailwindClassAttributes';
import { blockTitle } from '../../../utilities/commonFunctions';
import ColorPickerWithRecent from '../../ColorPicker/ColorPickerWithRecent';
import SelectBox from '../../Form/FormInputs/SelectBox';
import TextBox from '../../Form/FormInputs/TextBox';
import ModalTitle from '../../Modal/components/ModalTitle';
import WhiteModalWrapper from '../../Modal/components/WhiteModalWrapper';
import TreeListCustom from '../../shared/TreeListCustom';
import InputContainer from '../../Wrapper/InputContainer';
import BlockModalFooter from './BlockModalFooter';
import InformationAreaBlockForm from './InformationAreaBlockForm';
import { defaultBlockSettings } from '../../../store/recoil/appDesignerState';

export default function ModalStructureBlockForm({
    blockData = '',
    setModalOpen = () => { },
    handleOnPressSave = () => { },
    fieldKey = '',
    selectedButton = 1,
}) {
    const [formData, setFormData] = useState(blockData);
    const [modalOpen1, setModalOpen1] = useState(false);
    const [selectedBlock1, setSelectedBlock1] = useState(null);

    function handleOnchange(e) {
        const name = e.target.name;
        const value = e.target.value;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }
    const handleOnChangeColor = (name, value, colorType) => {
        const hex = rgbaTohex(`rgba(${value})`);
        let updatedColor = null;
        setFormData((prevState) => ({
            ...prevState,
            [name]: `${colorType}[${hex}]`,
        }));
    };

    function handleOnEventTriggered(e, eventType = '', modifiedItems = []) {
        let updatedBlocks = [];

        switch (eventType) {
            case 'edit':
                const data = e.row.data;
                setModalOpen1(true);

                const defaultBlockAttributes = defaultBlockSettings[data.key] || {};
                let selectedData = { ...defaultBlockAttributes, ...data };
                if (selectedBlock1 && selectedBlock1.appPageBlockId === data.appPageBlockId) {
                    selectedData = { ...selectedData, ...selectedBlock1 }
                }

                setSelectedBlock1(selectedData);

                break;
            case 'orderChange':
                break;
            default:
                return null;
        }
    }

    function handleOnPressModalSaveButton(e, blockData) {
        e.preventDefault();
        setModalOpen1(false);

        blockData = JSON.parse(JSON.stringify(blockData));
        blockData.blockListCaption = blockTitle(blockData);

        setSelectedBlock1(blockData);

        let updatedBlocks = [...formData[`button${selectedButton}blocks`]];
        updatedBlocks.splice(_.findIndex(updatedBlocks, { appPageBlockId: blockData.appPageBlockId }), 1, blockData);
        let btnKey = `button${selectedButton}blocks`;
        setFormData((prevState) => ({
            ...prevState,
            [btnKey]: updatedBlocks,
        }));
    }

    function colorChangeToHex(colorWithPrefix) {
        colorWithPrefix = colorWithPrefix.replace('[', '');
        colorWithPrefix = colorWithPrefix.replace(']', '');
        return colorWithPrefix.split('-')[1];
    }

    return (
        <WhiteModalWrapper width="border-none text-black" className="items-start">
            <ModalTitle title={`モーダル詳細設定`} className="text-blue-100 text-xl" />

            <Formik enableReinitialize={true} initialValues={formData}>
                <div className="relative w-full h-full">
                    <Form onChange={handleOnchange}>
                        <div className="body-height3 pt-12 px-10 min-h-[calc(100vh-458px)] !p-0">
                            <div className="flex flex-col py-10">
                                <div className="flex space-x-8">
                                    <InputContainer className="mb-4 w-1/2">
                                        <SelectBox
                                            label="確認モーダル下ボタン構成"
                                            name={`button${selectedButton}ModalButtonStructure`}
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25"
                                        >
                                            <option value="1">閉じる</option>
                                            <option value="2">確定</option>
                                            <option value="3">閉じる・確定</option>
                                        </SelectBox>
                                    </InputContainer>
                                    <InputContainer className="mb-4 w-1/2">
                                        <SelectBox
                                            label="確認モーダル下ボタンタイプ"
                                            name={`button${selectedButton}ModalButtonType`}
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25"
                                        >
                                            <option value="a">a</option>
                                            <option value="b">b</option>
                                            <option value="c">c</option>
                                        </SelectBox>
                                    </InputContainer>
                                </div>

                                <div className="flex space-x-8">
                                    <InputContainer className="mb-4 w-1/2">
                                        <TextBox
                                            label="閉じるボタンテキスト（8文字まで）"
                                            name={`button${selectedButton}ModalTrueText`}
                                            placeholder="ボタン名"
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25"
                                            value={formData[`button${selectedButton}ModalTrueText`]}
                                            onChange={handleOnchange}
                                        />
                                    </InputContainer>
                                    <InputContainer className="mb-4 w-1/2">
                                        <TextBox
                                            label="確定ボタンテキスト（8文字まで）"
                                            name={`button${selectedButton}ModalFalseText`}
                                            placeholder="ボタン名"
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25"
                                            value={formData[`button${selectedButton}ModalFalseText`]}
                                            onChange={handleOnchange}
                                        />
                                    </InputContainer>
                                </div>

                                <div className="flex space-x-6 mt-10">
                                    <InputContainer className="mb-4 w-1/6">
                                        <SelectBox
                                            label="最大高さ：無指定"
                                            name={`button${selectedButton}ModalHeight`}
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25"
                                        >
                                            {heightAttributes.length > 0 &&
                                                heightAttributes.map((field, index) => (
                                                    <option value={`${field.value}`} key={field.value + '_' + index}>
                                                        {field.caption}
                                                    </option>
                                                ))}
                                        </SelectBox>
                                    </InputContainer>
                                    <InputContainer className="mb-4 w-1/6">
                                        <SelectBox
                                            label="高さ：640px以上"
                                            name={`button${selectedButton}ModalHeightSm`}
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25"
                                        >
                                            {heightAttributes.length > 0 &&
                                                heightAttributes.map((field, index) => (
                                                    <option value={`sm:${field.value}`} key={field.value + '_' + index}>
                                                        {field.caption}
                                                    </option>
                                                ))}
                                        </SelectBox>
                                    </InputContainer>
                                    <InputContainer className="mb-4 w-1/6">
                                        <SelectBox
                                            label="高さ：768px以上"
                                            name={`button${selectedButton}ModalHeightMd`}
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25"
                                            value={formData[`button${selectedButton}ModalHeightMd`]}
                                        >
                                            {heightAttributes.length > 0 &&
                                                heightAttributes.map((field, index) => (
                                                    <option value={`md:${field.value}`} key={field.value + '_' + index}>
                                                        {field.caption}
                                                    </option>
                                                ))}
                                        </SelectBox>
                                    </InputContainer>
                                    <InputContainer className="mb-4 w-1/6">
                                        <SelectBox
                                            label="高さ：1024px以上"
                                            name={`button${selectedButton}ModalHeightLg`}
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25"
                                        >
                                            {heightAttributes.length > 0 &&
                                                heightAttributes.map((field, index) => (
                                                    <option value={`lg:${field.value}`} key={field.value + '_' + index}>
                                                        {field.caption}
                                                    </option>
                                                ))}
                                        </SelectBox>
                                    </InputContainer>
                                    <InputContainer className="mb-4 w-1/6">
                                        <SelectBox
                                            label="高さ：1280px以上"
                                            name={`button${selectedButton}ModalHeightXl`}
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25"
                                        >
                                            {heightAttributes.length > 0 &&
                                                heightAttributes.map((field, index) => (
                                                    <option value={`xl:${field.value}`} key={field.value + '_' + index}>
                                                        {field.caption}
                                                    </option>
                                                ))}
                                        </SelectBox>
                                    </InputContainer>
                                    <InputContainer className="mb-4 w-1/6">
                                        <SelectBox
                                            label="高さ：1536px以上"
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25"
                                            name={`button${selectedButton}ModalHeight2xl`}
                                        >
                                            {heightAttributes.length > 0 &&
                                                heightAttributes.map((field, index) => (
                                                    <option
                                                        value={`2xl:${field.value}`}
                                                        key={field.value + '_' + index}
                                                    >
                                                        {field.caption}
                                                    </option>
                                                ))}
                                        </SelectBox>
                                    </InputContainer>
                                </div>

                                <div className="flex space-x-6">
                                    <InputContainer className="mb-4 w-1/6">
                                        <SelectBox
                                            label="横幅：無指定"
                                            name={`button${selectedButton}ModalWidth`}
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25"
                                        >
                                            {widthAttributes.length > 0 &&
                                                widthAttributes.map((field, index) => (
                                                    <option value={`${field.value}`} key={field.value + '_' + index}>
                                                        {field.caption}
                                                    </option>
                                                ))}
                                        </SelectBox>
                                    </InputContainer>
                                    <InputContainer className="mb-4 w-1/6">
                                        <SelectBox
                                            label="横幅：640px以上"
                                            name={`button${selectedButton}ModalWidthSm`}
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25"
                                        >
                                            {widthAttributes.length > 0 &&
                                                widthAttributes.map((field, index) => (
                                                    <option value={`sm:${field.value}`} key={field.value + '_' + index}>
                                                        {field.caption}
                                                    </option>
                                                ))}
                                        </SelectBox>
                                    </InputContainer>
                                    <InputContainer className="mb-4 w-1/6">
                                        <SelectBox
                                            label="横幅：768px以上"
                                            name={`button${selectedButton}ModalWidthMd`}
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25"
                                        >
                                            {widthAttributes.length > 0 &&
                                                widthAttributes.map((field, index) => (
                                                    <option value={`md:${field.value}`} key={field.value + '_' + index}>
                                                        {field.caption}
                                                    </option>
                                                ))}
                                        </SelectBox>
                                    </InputContainer>
                                    <InputContainer className="mb-4 w-1/6">
                                        <SelectBox
                                            label="横幅：1024px以上"
                                            name={`button${selectedButton}ModalWidthLg`}
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25"
                                        >
                                            {widthAttributes.length > 0 &&
                                                widthAttributes.map((field, index) => (
                                                    <option value={`lg:${field.value}`} key={field.value + '_' + index}>
                                                        {field.caption}
                                                    </option>
                                                ))}
                                        </SelectBox>
                                    </InputContainer>
                                    <InputContainer className="mb-4 w-1/6">
                                        <SelectBox
                                            label="横幅：1280px以上"
                                            name={`button${selectedButton}ModalWidthXl`}
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25"
                                        >
                                            {widthAttributes.length > 0 &&
                                                widthAttributes.map((field, index) => (
                                                    <option value={`xl:${field.value}`} key={field.value + '_' + index}>
                                                        {field.caption}
                                                    </option>
                                                ))}
                                        </SelectBox>
                                    </InputContainer>
                                    <InputContainer className="mb-4 w-1/6">
                                        <SelectBox
                                            label="横幅：1536px以上"
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25"
                                            name={`button${selectedButton}ModalWidth2xl`}
                                        >
                                            {widthAttributes.length > 0 &&
                                                widthAttributes.map((field, index) => (
                                                    <option
                                                        value={`2xl:${field.value}`}
                                                        key={field.value + '_' + index}
                                                    >
                                                        {field.caption}
                                                    </option>
                                                ))}
                                        </SelectBox>
                                    </InputContainer>
                                </div>

                                <div className="flex space-x-6">
                                    <InputContainer className="mb-4 w-1/4">
                                        <SelectBox
                                            label="枠線"
                                            name={`button${selectedButton}ModalBorderWidth`}
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25"
                                        >
                                            {borderWidthArrays.map((x) => (
                                                <option key={x.value} value={x.value}>
                                                    {x.caption}
                                                </option>
                                            ))}
                                        </SelectBox>
                                    </InputContainer>
                                    <InputContainer className="mb-4 w-1/4">
                                        <SelectBox
                                            label="枠線種別"
                                            name={`button${selectedButton}ModalBorderStyle`}
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25"
                                        >
                                            {borderStyles.map((x) => (
                                                <option key={x.value} value={x.value}>
                                                    {x.caption}
                                                </option>
                                            ))}
                                        </SelectBox>
                                    </InputContainer>
                                    <InputContainer className="mb-4 w-1/4">
                                        <SelectBox
                                            label="角丸サイズ	"
                                            name={`button${selectedButton}ModalBorderRadius`}
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25"
                                        >
                                            {borderradiusArrays.map((x) => (
                                                <option key={x.value} value={x.value}>
                                                    {x.caption}
                                                </option>
                                            ))}
                                        </SelectBox>
                                    </InputContainer>
                                    <InputContainer className="mb-4 w-1/4">
                                        <SelectBox
                                            label="ボックスシャドウ"
                                            name={`button${selectedButton}ModalBoxShadow`}
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25"
                                        >
                                            {boxShadowArrays.map((x) => (
                                                <option key={x.value} value={x.value}>
                                                    {x.caption}
                                                </option>
                                            ))}
                                        </SelectBox>
                                    </InputContainer>
                                </div>

                                <div className="flex space-x-6 ">
                                    <InputContainer className="mb-4 w-1/4">
                                        <SelectBox
                                            label="ボタン下エラー文字サイズ"
                                            name={`button${selectedButton}ModalErrorTextSize`}
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25"
                                        >
                                            {fontSizeArrays.map((x) => (
                                                <option key={x.value} value={x.value}>
                                                    {x.caption}
                                                </option>
                                            ))}
                                        </SelectBox>
                                    </InputContainer>
                                    <InputContainer className="mb-4 w-1/4">
                                        <SelectBox
                                            label="ボタン下エラー文字太さ"
                                            name={`button${selectedButton}ModalErrorTextWeight`}
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25"
                                        >
                                            {fontWeightArrays.map((x) => (
                                                <option key={x.value} value={x.value}>
                                                    {x.caption}
                                                </option>
                                            ))}
                                        </SelectBox>
                                    </InputContainer>
                                    <InputContainer className="mb-4 w-2/4">
                                        <TextBox
                                            label={`ボタン下エラー文字カスタムクラス`}
                                            name={`button${selectedButton}ModalErrorCustomClass`}
                                            placeholder="カスタムClass"
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25"
                                        />
                                    </InputContainer>
                                </div>

                                <div className="flex flex-col mt-4">
                                    <div className="flex justify-start font-bold app-design-color-picker">
                                        <ColorPickerWithRecent
                                            setColorhandle={(_, name, colorCode) =>
                                                handleOnChangeColor(name, colorCode, 'border-')
                                            }
                                            inputBoxItem={`button${selectedButton}ModalBorderColor`}
                                            pickerLabel="モーダル枠線色"
                                            isBackgroundColor="1"
                                            isDefaultColor={colorChangeToHex(
                                                formData[`button${selectedButton}ModalBorderColor`]
                                            )}
                                        />
                                        <ColorPickerWithRecent
                                            setColorhandle={(_, name, colorCode) =>
                                                handleOnChangeColor(name, colorCode, 'bg-')
                                            }
                                            inputBoxItem={`button${selectedButton}ModalBackgroundColor`}
                                            pickerLabel="モーダル背景色"
                                            isBackgroundColor="1"
                                            isDefaultColor={colorChangeToHex(
                                                formData[`button${selectedButton}ModalBackgroundColor`]
                                            )}
                                        />
                                        <ColorPickerWithRecent
                                            setColorhandle={(_, name, colorCode) =>
                                                handleOnChangeColor(name, colorCode, 'shaddow-')
                                            }
                                            inputBoxItem={`button${selectedButton}ModalBoxShadowColor`}
                                            pickerLabel="モーダルシャドウ色"
                                            isBackgroundColor="1"
                                            isDefaultColor={colorChangeToHex(
                                                formData[`button${selectedButton}ModalBoxShadowColor`]
                                            )}
                                        />
                                        <ColorPickerWithRecent
                                            setColorhandle={(_, name, colorCode) =>
                                                handleOnChangeColor(name, colorCode, 'text-')
                                            }
                                            inputBoxItem={`button${selectedButton}ModalTextColor`}
                                            pickerLabel="エラー文字色"
                                            isBackgroundColor="1"
                                            isDefaultColor={colorChangeToHex(
                                                formData[`button${selectedButton}ModalTextColor`]
                                            )}
                                        />
                                    </div>
                                </div>

                                <div className="mt-10 mb-10">
                                    <label className="pt-4 text-blue-100">確認モーダル内情報エリア</label>
                                    <TreeListCustom
                                        config={{
                                            treeListClasses: 'custom-treelist block-content truncate w-fill px-8 mt-4',
                                            noDataText: '',
                                            dragDropConfig: {
                                                allowDragDrop: true,
                                                handleOnOrderChange: (e, eventType, updatedItems) =>
                                                    handleOnEventTriggered(e, eventType, updatedItems),
                                            },
                                            showColumnHeaders: false,
                                            idKey: 'appPageBlockId',
                                            defaultSelected: 0,
                                            clickableCells: ['blockListCaption'],
                                            dragDirection: 'vertical',
                                            handleOnCellPreapared: (e, eventType) =>
                                                handleOnEventTriggered(e, eventType),
                                            allowAddMoreButton: false,
                                        }}
                                        dataSource={formData[`button${selectedButton}blocks`]}
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
                                        ]}
                                    />
                                </div>

                                <div className="mt-10">
                                    <InputContainer>
                                        <TextBox
                                            label={`モーダル内ブロックエリアwrapカスタムClass`}
                                            name={`button${selectedButton}ModalBlockWrapCustomClass`}
                                            placeholder="カスタムClass"
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25"
                                        />
                                    </InputContainer>
                                    <InputContainer>
                                        <TextBox
                                            label={`モーダル内ボタンエリアwrapカスタムClass`}
                                            name={`button${selectedButton}ModalButtonWrapCustomClass`}
                                            placeholder="カスタムClass"
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25"
                                        />
                                    </InputContainer>
                                    <InputContainer>
                                        <TextBox
                                            label={`モーダルwrapカスタムClass`}
                                            name={`button${selectedButton}ModalModalWrapCustomClass`}
                                            placeholder="カスタムClass"
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25"
                                        />
                                    </InputContainer>
                                </div>
                            </div>
                        </div>

                        <BlockModalFooter
                            memoFieldShow={false}
                            setModalOpen={() => setModalOpen(false)}
                            handleOnPressSave={(e) => handleOnPressSave(e, formData)}
                        />
                    </Form>
                    {modalOpen1 && (
                        <>
                            {selectedBlock1.key === 'INFORMATION_AREA' && (
                                <InformationAreaBlockForm
                                    blockData={selectedBlock1}
                                    setModalOpen={setModalOpen}
                                    handleOnPressSave={handleOnPressModalSaveButton}
                                />
                            )}
                        </>
                    )}
                </div>
            </Formik>
        </WhiteModalWrapper>
    );
}
