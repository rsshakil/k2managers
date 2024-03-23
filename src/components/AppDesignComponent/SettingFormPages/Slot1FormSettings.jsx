import { Form, Formik } from "formik";
import _ from 'lodash';
import React from "react";
import { useRecoilState } from "recoil";
import ColorPickerWithRecent from "../../ColorPicker/ColorPickerWithRecent";
import Note from "../../Form/FormInputs/Note";
import SelectBox from "../../Form/FormInputs/SelectBox";
import TextBox from "../../Form/FormInputs/TextBox";
import IconPicker from "../../IconPicker/IconPicker";
import InputBoxSeparator from '../../InputBoxSeparator/InputBoxSeparator';
import InputContainer from "../../Wrapper/InputContainer";


import {
    borderAttributes, borderRadiousAttributes, borderStyles, fontSizeAttributes, fontWeightAttributes, gapColumnAttributes, heightAttributes, justifyContentAttributes, lineClampList, marginXAttributes
} from "../../../lib/tailwindClassAttributes";
import { appDesignerState } from "../../../store/recoil/appDesignerState";


const Slot1FormSettings = ({ formData: initialData, handleOnChange, handleOnChangeColor = () => { }, updateState, tailwindColorCodeKeys }) => {
    const [recoilStateValue, setRecoilState] = useRecoilState(appDesignerState);
    const { activeTab, activePageId, tabItems } = recoilStateValue;


    function handleOnChangePrefix(e, attr) {
        let attrName = e.target.name;
        let attrValue = e.target.value;
        let getAttrNameFromArr = attrName.split('.');
        let objName = getAttrNameFromArr[0];
        let objIndex = getAttrNameFromArr[1];
        let currentStateDataUpdate = JSON.parse(JSON.stringify({ ...recoilStateValue }));
        currentStateDataUpdate.tabItems.settings.appSettingQuery[activePageId].prefixClass[objName][objIndex] = attrValue;

        setRecoilState(currentStateDataUpdate);
    }

    function handleOnChangeIcon(name, icon) {
        updateState(name, icon, 'info');
    }

    return (
        <Formik
            validateOnChange={false}
            validateOnBlur={false}
            enableReinitialize={true}
            initialValues={initialData}
        >
            <div className='relative w-full'>
                <Form>
                    <div className="flex justify-between space-x-4">
                        <div className="w-1/3">
                            <InputContainer>
                                <SelectBox
                                    label='スロットエリア角丸サイズ：無指定'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='default.slotWrapBorderRadius'
                                    value={initialData.default.slotWrapBorderRadius}
                                    onChange={(e) => handleOnChangePrefix(e, 'default')}>
                                    {borderRadiousAttributes.map((field, index) => (
                                        <option
                                            value={field.value}
                                            key={field.value + "_" + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                        <div className="w-1/3">
                            <InputContainer>
                                <SelectBox
                                    label='スロットエリア角丸サイズ：640px以上'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='sm.slotWrapBorderRadius'
                                    value={initialData.sm.slotWrapBorderRadius}
                                    onChange={(e) => handleOnChangePrefix(e, 'sm')}>
                                    {borderRadiousAttributes.map((field, index) => (
                                        <option
                                            value={`sm:${field.value}`}
                                            key={field.value + "_" + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                        <div className="w-1/3">
                            <InputContainer>
                                <SelectBox
                                    label='スロットエリア角丸サイズ：768px以上'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='md.slotWrapBorderRadius'
                                    value={initialData.md.slotWrapBorderRadius}
                                    onChange={(e) => handleOnChangePrefix(e, 'md')}>
                                    {borderRadiousAttributes.map((field, index) => (
                                        <option
                                            value={`md:${field.value}`}
                                            key={field.value + "_" + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                    </div>
                    <div className="flex justify-between mt-4 mb-12 space-x-4">
                        <div className="w-1/3">
                            <InputContainer>
                                <SelectBox
                                    label='スロットエリア角丸サイズ：1024px以上'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='lg.slotWrapBorderRadius'
                                    value={initialData.lg.slotWrapBorderRadius}
                                    onChange={(e) => handleOnChangePrefix(e, 'lg')}>
                                    {borderRadiousAttributes.map((field, index) => (
                                        <option
                                            value={`lg:${field.value}`}
                                            key={field.value + "_" + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                        <div className="w-1/3">
                            <InputContainer>
                                <SelectBox
                                    label='スロットエリア角丸サイズ：1280px以上'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='xl.slotWrapBorderRadius'
                                    value={initialData.xl.slotWrapBorderRadius}
                                    onChange={(e) => handleOnChangePrefix(e, 'xl')}>
                                    {borderRadiousAttributes.map((field, index) => (
                                        <option
                                            value={`xl:${field.value}`}
                                            key={field.value + "_" + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                        <div className="w-1/3">
                            <InputContainer>
                                <SelectBox
                                    label='スロットエリア角丸サイズ：1536px以上'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='2xl.slotWrapBorderRadius'
                                    value={initialData['2xl'].slotWrapBorderRadius}
                                    onChange={(e) => handleOnChangePrefix(e, '2xl')}
                                >
                                    {borderRadiousAttributes.map((field, index) => <option key={field.value + "_" + index} value={'2xl:' + field.value}> {field.caption}</option>)}
                                </SelectBox>
                            </InputContainer>
                        </div>
                    </div>

                    <div className="flex justify-between space-x-4">
                        <div className="w-1/3">
                            <InputContainer>
                                <SelectBox
                                    label='スロットエリア枠線：無指定'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='default.slotWrapBorderWidth'
                                    value={initialData.default.slotWrapBorderWidth}
                                    onChange={(e) => handleOnChangePrefix(e, 'default')}>
                                    {borderAttributes.map((field, index) => (
                                        <option
                                            value={field.value}
                                            key={field.value + "_" + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                        <div className="w-1/3">
                            <InputContainer>
                                <SelectBox
                                    label='スロットエリア枠線：640px以上'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='sm.slotWrapBorderWidth'
                                    value={initialData.sm.slotWrapBorderWidth}
                                    onChange={(e) => handleOnChangePrefix(e, 'sm')}>
                                    {borderAttributes.map((field, index) => (
                                        <option
                                            value={`sm:${field.value}`}
                                            key={field.value + "_" + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                        <div className="w-1/3">
                            <InputContainer>
                                <SelectBox
                                    label='スロットエリア枠線：768px以上'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='md.slotWrapBorderWidth'
                                    value={initialData.md.slotWrapBorderWidth}
                                    onChange={(e) => handleOnChangePrefix(e, 'md')}>
                                    {borderAttributes.map((field, index) => (
                                        <option
                                            value={`md:${field.value}`}
                                            key={field.value + "_" + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                    </div>
                    <div className="flex justify-between mt-4 mb-12 space-x-4">
                        <div className="w-1/3">
                            <InputContainer>
                                <SelectBox
                                    label='スロットエリア枠線：1024px以上'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='lg.slotWrapBorderWidth'
                                    value={initialData.lg.slotWrapBorderWidth}
                                    onChange={(e) => handleOnChangePrefix(e, 'lg')}>
                                    {borderAttributes.map((field, index) => (
                                        <option
                                            value={`lg:${field.value}`}
                                            key={field.value + "_" + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                        <div className="w-1/3">
                            <InputContainer>
                                <SelectBox
                                    label='スロットエリア枠線：1280px以上'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='xl.slotWrapBorderWidth'
                                    value={initialData.xl.slotWrapBorderWidth}
                                    onChange={(e) => handleOnChangePrefix(e, 'xl')}>
                                    {borderAttributes.map((field, index) => (
                                        <option
                                            value={`xl:${field.value}`}
                                            key={field.value + "_" + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                        <div className="w-1/3">
                            <InputContainer>
                                <SelectBox
                                    label='スロットエリア枠線：1536px以上'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='2xl.slotWrapBorderWidth'
                                    value={initialData['2xl'].slotWrapBorderWidth}
                                    onChange={(e) => handleOnChangePrefix(e, '2xl')}
                                >
                                    {borderAttributes.map((field, index) => <option key={field.value + "_" + index} value={'2xl:' + field.value}> {field.caption}</option>)}
                                </SelectBox>
                            </InputContainer>
                        </div>
                    </div>

                    <div className="flex justify-between space-x-4">
                        <div className="w-1/3">
                            <InputContainer>
                                <SelectBox
                                    label='スロットエリア枠線種類：無指定'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='default.slotWrapBorderStyle'
                                    value={initialData.default.slotWrapBorderStyle}
                                    onChange={(e) => handleOnChangePrefix(e, 'default')}>
                                    {borderStyles.map((field, index) => (
                                        <option
                                            value={field.value}
                                            key={field.value + "_" + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                        <div className="w-1/3">
                            <InputContainer>
                                <SelectBox
                                    label='スロットエリア枠線種類：640px以上'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='sm.slotWrapBorderStyle'
                                    value={initialData.sm.slotWrapBorderStyle}
                                    onChange={(e) => handleOnChangePrefix(e, 'sm')}>
                                    {borderStyles.map((field, index) => (
                                        <option
                                            value={`sm:${field.value}`}
                                            key={field.value + "_" + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                        <div className="w-1/3">
                            <InputContainer>
                                <SelectBox
                                    label='スロットエリア枠線種類：768px以上'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='md.slotWrapBorderStyle'
                                    value={initialData.md.slotWrapBorderStyle}
                                    onChange={(e) => handleOnChangePrefix(e, 'md')}>
                                    {borderStyles.map((field, index) => (
                                        <option
                                            value={`md:${field.value}`}
                                            key={field.value + "_" + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                    </div>
                    <div className="flex justify-between mt-4 mb-12 space-x-4">
                        <div className="w-1/3">
                            <InputContainer>
                                <SelectBox
                                    label='スロットエリア枠線種類：1024px以上'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='lg.slotWrapBorderStyle'
                                    value={initialData.lg.slotWrapBorderStyle}
                                    onChange={(e) => handleOnChangePrefix(e, 'lg')}>
                                    {borderStyles.map((field, index) => (
                                        <option
                                            value={`lg:${field.value}`}
                                            key={field.value + "_" + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                        <div className="w-1/3">
                            <InputContainer>
                                <SelectBox
                                    label='スロットエリア枠線種類：1280px以上'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='xl.slotWrapBorderStyle'
                                    value={initialData.xl.slotWrapBorderStyle}
                                    onChange={(e) => handleOnChangePrefix(e, 'xl')}>
                                    {borderStyles.map((field, index) => (
                                        <option
                                            value={`xl:${field.value}`}
                                            key={field.value + "_" + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                        <div className="w-1/3">
                            <InputContainer>
                                <SelectBox
                                    label='スロットエリア枠線種類：1536px以上'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='2xl.slotWrapBorderStyle'
                                    value={initialData['2xl'].slotWrapBorderStyle}
                                    onChange={(e) => handleOnChangePrefix(e, '2xl')}
                                >
                                    {borderStyles.map((field, index) => <option key={field.value + "_" + index} value={'2xl:' + field.value}> {field.caption}</option>)}
                                </SelectBox>
                            </InputContainer>
                        </div>
                    </div>

                    <div className="flex justify-between space-x-4">
                        <div className="w-1/3">
                            <InputContainer>
                                <SelectBox
                                    label='スロットエリア左右間隔：無指定'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='default.slotWrapMarginX'
                                    value={initialData.default.slotWrapMarginX}
                                    onChange={(e) => handleOnChangePrefix(e, 'default')}>
                                    {marginXAttributes.map((field, index) => (
                                        <option
                                            value={field.value}
                                            key={field.value + "_" + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                        <div className="w-1/3">
                            <InputContainer>
                                <SelectBox
                                    label='スロットエリア左右間隔：640px以上'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='sm.slotWrapMarginX'
                                    value={initialData.sm.slotWrapMarginX}
                                    onChange={(e) => handleOnChangePrefix(e, 'sm')}>
                                    {marginXAttributes.map((field, index) => (
                                        <option
                                            value={`sm:${field.value}`}
                                            key={field.value + "_" + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                        <div className="w-1/3">
                            <InputContainer>
                                <SelectBox
                                    label='スロットエリア左右間隔：768px以上'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='md.slotWrapMarginX'
                                    value={initialData.md.slotWrapMarginX}
                                    onChange={(e) => handleOnChangePrefix(e, 'md')}>
                                    {marginXAttributes.map((field, index) => (
                                        <option
                                            value={`md:${field.value}`}
                                            key={field.value + "_" + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                    </div>
                    <div className="flex justify-between mt-4 mb-12 space-x-4">
                        <div className="w-1/3">
                            <InputContainer>
                                <SelectBox
                                    label='スロットエリア左右間隔：1024px以上'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='lg.slotWrapMarginX'
                                    value={initialData.lg.slotWrapMarginX}
                                    onChange={(e) => handleOnChangePrefix(e, 'lg')}>
                                    {marginXAttributes.map((field, index) => (
                                        <option
                                            value={`lg:${field.value}`}
                                            key={field.value + "_" + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                        <div className="w-1/3">
                            <InputContainer>
                                <SelectBox
                                    label='スロットエリア左右間隔：1280px以上'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='xl.slotWrapMarginX'
                                    value={initialData.xl.slotWrapMarginX}
                                    onChange={(e) => handleOnChangePrefix(e, 'xl')}>
                                    {marginXAttributes.map((field, index) => (
                                        <option
                                            value={`xl:${field.value}`}
                                            key={field.value + "_" + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                        <div className="w-1/3">
                            <InputContainer>
                                <SelectBox
                                    label='スロットエリア左右間隔：1536px以上'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='2xl.slotWrapMarginX'
                                    value={initialData['2xl'].slotWrapMarginX}
                                    onChange={(e) => handleOnChangePrefix(e, '2xl')}
                                >
                                    {marginXAttributes.map((field, index) => <option key={field.value + "_" + index} value={'2xl:' + field.value}> {field.caption}</option>)}
                                </SelectBox>
                            </InputContainer>
                        </div>
                    </div>

                    <div className="flex flex-col mb-4">
                        <label htmlFor="headerAreaShadow" className="text-blue-100  text-xs">スロットエリア配色</label>
                        <div className="flex justify-start space-x-4">
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.borderColor, [1, 2])}
                                inputBoxItem="slotWrapBorderColor" pickerLabel="外枠線色" isBackgroundColor="1"
                                isDefaultColor={initialData?.slotWrapBorderColor} />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [1, 2])}
                                inputBoxItem="slotWrapBackgroundColor" pickerLabel="背景色" isBackgroundColor="1"
                                isDefaultColor={initialData?.slotWrapBackgroundColor} />

                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [1, 2])}
                                inputBoxItem="rowBackgroundColorEven" pickerLabel="偶数セル背景色" isBackgroundColor="1"
                                isDefaultColor={initialData?.rowBackgroundColorEven} />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [1, 2])}
                                inputBoxItem="rowBackgroundColorOdd" pickerLabel="奇数セル背景色" isBackgroundColor="1"
                                isDefaultColor={initialData?.rowBackgroundColorOdd} />
                        </div>
                    </div>

                    <InputContainer>
                        <Note
                            label='バスWrapカスタムClass'
                            labelClassName='text-blue-100 text-xs'
                            inputClassName='bg-blue-25 !p-1'
                            height='h-8'
                            name='busWrapCustomClass'
                            placeholder="バスWrapカスタムClass"
                            onBlur={(e) => handleOnChange(e, 1)}
                        />
                    </InputContainer>
                    <InputContainer>
                        <Note
                            label='出前WrapカスタムClass'
                            labelClassName='text-blue-100 text-xs'
                            inputClassName='bg-blue-25 !p-1'
                            height='h-8'
                            name='deliveryWrapCustomClass'
                            placeholder="出前WrapカスタムClass"
                            onBlur={(e) => handleOnChange(e, 1)}
                        />
                    </InputContainer>
                    <InputContainer>
                        <Note
                            label='通常エリアWrapカスタムClass'
                            labelClassName='text-blue-100 text-xs'
                            inputClassName='bg-blue-25 !p-1'
                            height='h-8'
                            name='normalWrapCustomClass'
                            placeholder="通常エリアWrapカスタムClass"
                            onBlur={(e) => handleOnChange(e, 1)}
                        />
                    </InputContainer>
                    <InputContainer>
                        <Note
                            label='スロットエリアOuterWrapカスタムClass'
                            labelClassName='text-blue-100 text-xs'
                            inputClassName='bg-blue-25 !p-1'
                            height='h-8'
                            name='slotOuterWrapCustomClass'
                            placeholder="スロットエリアOuterWrapカスタムClass"
                            onBlur={(e) => handleOnChange(e, 1)}
                        />
                    </InputContainer>

                    <InputBoxSeparator cProperty={`mt-8 mb-8`} />

                    {/* {A part start} */}

                    <div className="flex justify-between space-x-4">
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label='凡例文字サイズ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='explanatoryNoteTextSize'
                                    onChange={(e) => handleOnChange(e, 1)}>
                                    {fontSizeAttributes.map((field, index) => (
                                        <option
                                            value={field.value}
                                            key={field.value + "_" + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label='凡例文字太さ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='explanatoryNoteFontWeight'
                                    onChange={(e) => handleOnChange(e, 1)}>
                                    {fontWeightAttributes.map((field, index) => (
                                        <option
                                            value={field.value}
                                            key={field.value + "_" + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                    </div>

                    <div className="flex flex-col mb-4">
                        <label htmlFor="headerAreaShadow" className="text-blue-100  text-xs">凡例文字色設定</label>
                        <div className="flex justify-start space-x-4">
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])}
                                inputBoxItem="explanatoryNoteTextColor" pickerLabel="文字色" isBackgroundColor="1"
                                isDefaultColor={initialData?.explanatoryNoteTextColor} />
                        </div>
                    </div>

                    <div className="flex justify-between space-x-4">
                        <div className="w-1/2">
                            <InputContainer>
                                <InputContainer>
                                    <TextBox label="凡例受付不可説明文言"
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='explanatoryNoteOutOfStockText'
                                        onBlur={(e) => handleOnChange(e, 4)}
                                        placeholder='凡例受付不可説明文言'
                                        type="text" />
                                </InputContainer>
                            </InputContainer>
                        </div>
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label='受付不可残数(以下)'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='explanatoryThresholdOutOfStock'
                                    onChange={(e) => handleOnChange(e, 4)}>
                                    {_.range(0, 100).map((x, index) => <option value={x} key={x + "_" + index}> {x} </option>)}
                                </SelectBox>
                            </InputContainer>
                        </div>
                    </div>
                    <div className="flex justify-between space-x-4">
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label='不可アイコン1サイズ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='explanatoryNoteOutOfStockSvg1Size'
                                    onChange={(e) => handleOnChange(e, 1)}>
                                    {fontSizeAttributes.map((field, index) => (
                                        <option value={field.value} key={field.value + "_" + index}> {field.caption}</option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label='不可アイコン2サイズ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='explanatoryNoteOutOfStockSvg2Size'
                                    onChange={(e) => handleOnChange(e, 1)}>
                                    {fontSizeAttributes.map((field, index) => (
                                        <option value={field.value} key={field.value + "_" + index}> {field.caption}</option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                    </div>

                    <div className="flex flex-col mb-4">
                        <label htmlFor="headerAreaShadow" className="text-blue-100  text-xs">不可アイコン・配色設定</label>
                        <div className="flex justify-start space-x-4">
                            <div className="icons">
                                <IconPicker
                                    name="explanatoryNoteOutOfStockSvg1"
                                    value={initialData?.explanatoryNoteOutOfStockSvg1}
                                    width="32px"
                                    height="32px"
                                    iconSize="1.2em"
                                    iconTitle="アイコン1"
                                    iconCustomClass="!rounded-none"
                                    iconWrapperCustomClasses="flex flex-row"
                                    titleCustomClasses="ml-1 text-blue-100"
                                    onChangeIcon={(name, iconData) => handleOnChangeIcon(name, iconData)}
                                />
                            </div>
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.fillColor, [1, 2])}
                                inputBoxItem="explanatoryNoteOutOfStockSvg1FillColor" pickerLabel="アイコン1fill色" isBackgroundColor="1"
                                isDefaultColor={initialData?.explanatoryNoteOutOfStockSvg1FillColor} />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.strokeColor, [1, 2])}
                                inputBoxItem="explanatoryNoteOutOfStockSvg1StrokeColor" pickerLabel="アイコン1stroke色" isBackgroundColor="1"
                                isDefaultColor={initialData?.explanatoryNoteOutOfStockSvg1StrokeColor} />
                        </div>
                        <div className="flex justify-start space-x-4 mt-5">
                            <div className="icons">
                                <IconPicker
                                    name="explanatoryNoteOutOfStockSvg2"
                                    value={initialData?.explanatoryNoteOutOfStockSvg2}
                                    width="32px"
                                    height="32px"
                                    iconSize="1.2em"
                                    iconTitle="アイコン2"
                                    iconCustomClass="!rounded-none"
                                    iconWrapperCustomClasses="flex flex-row"
                                    titleCustomClasses="ml-1 text-blue-100"
                                    onChangeIcon={(name, iconData) => handleOnChangeIcon(name, iconData)}
                                />
                            </div>

                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.fillColor, [1, 2])}
                                inputBoxItem="explanatoryNoteOutOfStockSvg2FillColor" pickerLabel="アイコン2fill色" isBackgroundColor="1"
                                isDefaultColor={initialData?.explanatoryNoteOutOfStockSvg2FillColor} />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.strokeColor, [1, 2])}
                                inputBoxItem="explanatoryNoteOutOfStockSvg2StrokeColor" pickerLabel="アイコン2stroke色" isBackgroundColor="1"
                                isDefaultColor={initialData?.explanatoryNoteOutOfStockSvg2StrokeColor} />
                        </div>
                    </div>

                    <div className="flex justify-between space-x-4">
                        <div className="w-1/2">
                            <InputContainer>
                                <TextBox label="凡例残り僅か説明文言"
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='explanatoryNoteLowStockText'
                                    onBlur={(e) => handleOnChange(e, 4)}
                                    placeholder='凡例残り僅か説明文言'
                                    type="text" />
                            </InputContainer>
                        </div>
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label='残り僅か残数(以下)'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='explanatoryThresholdLowStock'
                                    onChange={(e) => handleOnChange(e, 4)}>
                                    {_.range(0, 100).map((x, index) => <option value={x} key={x + "_" + index}> {x} </option>)}
                                </SelectBox>
                            </InputContainer>
                        </div>
                    </div>
                    <div className="flex justify-between space-x-4">
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label='残り僅かアイコン1サイズ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='explanatoryNoteLowStockSvg1Size'
                                    onChange={(e) => handleOnChange(e, 1)}>
                                    {fontSizeAttributes.map((field, index) => (
                                        <option value={field.value} key={field.value + "_" + index}> {field.caption}</option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label='残り僅かアイコン2サイズ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='explanatoryNoteLowStockSvg2Size'
                                    onChange={(e) => handleOnChange(e, 1)}>
                                    {fontSizeAttributes.map((field, index) => (
                                        <option value={field.value} key={field.value + "_" + index}> {field.caption}</option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                    </div>

                    <div className="flex flex-col mb-4">
                        <label className="text-blue-100  text-xs">残り僅かアイコン・配色設定</label>
                        <div className="flex justify-start space-x-4">
                            <div className="icons">
                                <IconPicker
                                    name="explanatoryNoteLowStockSvg1"
                                    value={initialData?.explanatoryNoteLowStockSvg1}
                                    width="32px"
                                    height="32px"
                                    iconSize="1.2em"
                                    iconTitle="アイコン1"
                                    iconCustomClass="!rounded-none"
                                    iconWrapperCustomClasses="flex flex-row"
                                    titleCustomClasses="ml-1 text-blue-100"
                                    onChangeIcon={(name, iconData) => handleOnChangeIcon(name, iconData)}
                                />
                            </div>

                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.fillColor, [1, 2])}
                                inputBoxItem="explanatoryNoteLowStockSvg1FillColor" pickerLabel="アイコン1fill色" isBackgroundColor="1"
                                isDefaultColor={initialData?.explanatoryNoteLowStockSvg1FillColor} />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.strokeColor, [1, 2])}
                                inputBoxItem="explanatoryNoteLowStockSvg1StrokeColor" pickerLabel="アイコン1stroke色" isBackgroundColor="1"
                                isDefaultColor={initialData?.explanatoryNoteLowStockSvg1StrokeColor} />
                        </div>
                        <div className="flex justify-start space-x-4 mt-5">
                            <div className="icons">
                                <IconPicker
                                    name="explanatoryNoteLowStockSvg2"
                                    value={initialData?.explanatoryNoteLowStockSvg2}
                                    width="32px"
                                    height="32px"
                                    iconSize="1.2em"
                                    iconTitle="アイコン2"
                                    iconCustomClass="!rounded-none"
                                    iconWrapperCustomClasses="flex flex-row"
                                    titleCustomClasses="ml-1 text-blue-100"
                                    onChangeIcon={(name, iconData) => handleOnChangeIcon(name, iconData)}
                                />
                            </div>

                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.fillColor, [1, 2])}
                                inputBoxItem="explanatoryNoteLowStockSvg2FillColor" pickerLabel="アイコン2fill色" isBackgroundColor="1"
                                isDefaultColor={initialData?.explanatoryNoteLowStockSvg2FillColor} />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.strokeColor, [1, 2])}
                                inputBoxItem="explanatoryNoteLowStockSvg2StrokeColor" pickerLabel="アイコン2stroke色" isBackgroundColor="1"
                                isDefaultColor={initialData?.explanatoryNoteLowStockSvg2StrokeColor} />
                        </div>
                    </div>

                    <div className="flex justify-between space-x-4">
                        <div className="w-1/2">
                            <InputContainer>
                                <TextBox label="受付中説明文言"
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='explanatoryNoteInStockText'
                                    onBlur={(e) => handleOnChange(e, 4)}
                                    placeholder='スタムClass'
                                    type="text" />
                            </InputContainer>
                        </div>
                        <div className="w-1/2"></div>
                    </div>
                    <div className="flex justify-between space-x-4">
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label='受付中アイコン1サイズ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='explanatoryNoteInStockSvg1Size'
                                    onChange={(e) => handleOnChange(e, 1)}>
                                    {fontSizeAttributes.map((field, index) => (
                                        <option value={field.value} key={field.value + "_" + index}> {field.caption}</option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label='受付中アイコン2サイズ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='explanatoryNoteInStockSvg2Size'
                                    onChange={(e) => handleOnChange(e, 1)}>
                                    {fontSizeAttributes.map((field, index) => (
                                        <option value={field.value} key={field.value + "_" + index}> {field.caption}</option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                    </div>

                    <div className="flex flex-col mb-4">
                        <label className="text-blue-100  text-xs">受付中アイコン・配色設定</label>
                        <div className="flex justify-start space-x-4">
                            <div className="icons">
                                <IconPicker
                                    name="explanatoryNoteInStockSvg1"
                                    value={initialData?.explanatoryNoteInStockSvg1}
                                    width="32px"
                                    height="32px"
                                    iconSize="1.2em"
                                    iconTitle="アイコン1"
                                    iconCustomClass="!rounded-none"
                                    iconWrapperCustomClasses="flex flex-row"
                                    titleCustomClasses="ml-1 text-blue-100"
                                    onChangeIcon={(name, iconData) => handleOnChangeIcon(name, iconData)}
                                />
                            </div>

                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.fillColor, [1, 2])}
                                inputBoxItem="explanatoryNoteInStockSvg1FillColor" pickerLabel="アイコン1fill色" isBackgroundColor="1"
                                isDefaultColor={initialData?.explanatoryNoteInStockSvg1FillColor} />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.strokeColor, [1, 2])}
                                inputBoxItem="explanatoryNoteInStockSvg1StrokeColor" pickerLabel="アイコン1stroke色" isBackgroundColor="1"
                                isDefaultColor={initialData?.explanatoryNoteInStockSvg1StrokeColor} />
                        </div>
                        <div className="flex justify-start space-x-4 mt-5">
                            <div className="icons">
                                <IconPicker
                                    name="explanatoryNoteInStockSvg2"
                                    value={initialData?.explanatoryNoteInStockSvg2}
                                    width="32px"
                                    height="32px"
                                    iconSize="1.2em"
                                    iconTitle="アイコン2"
                                    iconCustomClass="!rounded-none"
                                    iconWrapperCustomClasses="flex flex-row"
                                    titleCustomClasses="ml-1 text-blue-100"
                                    onChangeIcon={(name, iconData) => handleOnChangeIcon(name, iconData)}
                                />
                            </div>

                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.fillColor, [1, 2])}
                                inputBoxItem="explanatoryNoteInStockSvg2FillColor" pickerLabel="アイコン2fill色" isBackgroundColor="1"
                                isDefaultColor={initialData?.explanatoryNoteInStockSvg2FillColor} />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.strokeColor, [1, 2])}
                                inputBoxItem="explanatoryNoteInStockSvg2StrokeColor" pickerLabel="アイコン2stroke色" isBackgroundColor="1"
                                isDefaultColor={initialData?.explanatoryNoteInStockSvg2StrokeColor} />
                        </div>
                    </div>

                    <InputContainer>
                        <Note
                            label='凡例エリアWrapカスタムClass'
                            labelClassName='text-blue-100 text-xs'
                            inputClassName='bg-blue-25 !p-1'
                            height='h-8'
                            name='explanatoryNoteWrapCustomClass'
                            placeholder="凡例エリアWrapカスタムClass"
                            onBlur={(e) => handleOnChange(e, 1)}
                        />
                    </InputContainer>

                    <InputBoxSeparator cProperty={`mt-8 mb-8`} />

                    {/* {B part start} */}

                    <div className="flex justify-between space-x-4">
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label='ナビゲーション文字サイズ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='navigationTextSize'
                                    onChange={(e) => handleOnChange(e, 1)}>
                                    {fontSizeAttributes.map((field, index) => (
                                        <option
                                            value={field.value}
                                            key={field.value + "_" + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label='ナビゲーション文字太さ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='navigationFontWeight'
                                    onChange={(e) => handleOnChange(e, 1)}>
                                    {fontWeightAttributes.map((field, index) => (
                                        <option
                                            value={field.value}
                                            key={field.value + "_" + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                    </div>

                    <div className="flex justify-between space-x-4">
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label='ナビゲーション枠線'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='navigationBorderWidth'
                                    onChange={(e) => handleOnChange(e, 1)}>
                                    {justifyContentAttributes.map((field, index) => (
                                        <option
                                            value={field.value}
                                            key={field.value + "_" + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label='ナビゲーション枠線種類'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='navigationBorderStyle'
                                    onChange={(e) => handleOnChange(e, 1)}>
                                    {borderStyles.map((field, index) => (
                                        <option
                                            value={field.value}
                                            key={field.value + "_" + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                    </div>
                    <div className="flex justify-between space-x-4">
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label='ナビゲーション枠線角丸'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='navigationBorderRadius'
                                    onChange={(e) => handleOnChange(e, 1)}>
                                    {borderRadiousAttributes.map((field, index) => (
                                        <option
                                            value={field.value}
                                            key={field.value + "_" + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label='ナビゲーションGAP'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='navigationGap'
                                    onChange={(e) => handleOnChange(e, 1)}>
                                    {gapColumnAttributes.map((field, index) => (
                                        <option
                                            value={field.value}
                                            key={field.value + "_" + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                    </div>
                    <div className="flex justify-between space-x-4">
                        <div className="w-1/2">
                            <InputContainer>
                                <TextBox label="前の月文言"
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='navigationLastMonthText'
                                    onBlur={(e) => handleOnChange(e, 4)}
                                    placeholder='前の月文言'
                                    type="text" />
                            </InputContainer>
                        </div>
                        <div className="w-1/2">
                            <InputContainer>
                                <TextBox label="前の週文言"
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='navigationLastWeekText'
                                    onBlur={(e) => handleOnChange(e, 4)}
                                    placeholder='前の週文言'
                                    type="text" />
                            </InputContainer>
                        </div>
                    </div>
                    <div className="flex justify-between space-x-4">
                        <div className="w-1/2">
                            <InputContainer>
                                <Note
                                    label='前の月カスタムクラス'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25 !p-1'
                                    height='h-8'
                                    name='navigationLastMonthCustomClass'
                                    placeholder="前の月カスタムクラス"
                                    onBlur={(e) => handleOnChange(e, 1)}
                                />
                            </InputContainer>
                        </div>
                        <div className="w-1/2">
                            <InputContainer>
                                <Note
                                    label='前の週カスタムクラス'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25 !p-1'
                                    height='h-8'
                                    name='navigationLastWeekCustomClass'
                                    placeholder="前の週カスタムクラス"
                                    onBlur={(e) => handleOnChange(e, 1)}
                                />
                            </InputContainer>
                        </div>
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-blue-100  text-xs">前の月アイコン・配色設定</label>
                        <div className="flex justify-start space-x-4">
                            <div className="icons">
                                <IconPicker
                                    name="navigationLastMonthSvg1"
                                    value={initialData?.navigationLastMonthSvg1}
                                    width="32px"
                                    height="32px"
                                    iconSize="1.2em"
                                    iconTitle="アイコン1"
                                    iconCustomClass="!rounded-none"
                                    iconWrapperCustomClasses="flex flex-row"
                                    titleCustomClasses="ml-1 text-blue-100"
                                    onChangeIcon={(name, iconData) => handleOnChangeIcon(name, iconData)}
                                />
                            </div>

                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.fillColor, [1, 2])}
                                inputBoxItem="navigationLastMonthSvg1FillColor" pickerLabel="アイコン1fill色" isBackgroundColor="1"
                                isDefaultColor={initialData?.navigationLastMonthSvg1FillColor} />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.strokeColor, [1, 2])}
                                inputBoxItem="navigationLastMonthSvg1StrokeColor" pickerLabel="アイコン1stroke色" isBackgroundColor="1"
                                isDefaultColor={initialData?.navigationLastMonthSvg1StrokeColor} />
                        </div>
                        <div className="flex justify-start space-x-4 mt-5">
                            <div className="icons">
                                <IconPicker
                                    name="navigationLastMonthSvg2"
                                    value={initialData?.navigationLastMonthSvg2}
                                    width="32px"
                                    height="32px"
                                    iconSize="1.2em"
                                    iconTitle="アイコン2"
                                    iconCustomClass="!rounded-none"
                                    iconWrapperCustomClasses="flex flex-row"
                                    titleCustomClasses="ml-1 text-blue-100"
                                    onChangeIcon={(name, iconData) => handleOnChangeIcon(name, iconData)}
                                />
                            </div>

                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.fillColor, [1, 2])}
                                inputBoxItem="navigationLastMonthSvg2FillColor" pickerLabel="アイコン2fill色" isBackgroundColor="1"
                                isDefaultColor={initialData?.navigationLastMonthSvg2FillColor} />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.strokeColor, [1, 2])}
                                inputBoxItem="navigationLastMonthSvg2StrokeColor" pickerLabel="アイコン2stroke色" isBackgroundColor="1"
                                isDefaultColor={initialData?.navigationLastMonthSvg2StrokeColor} />
                        </div>
                    </div>
                    <div className="flex justify-between space-x-4">
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label='前の月アイコン1サイズ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='navigationLastMonthSvg1Size'
                                    onChange={(e) => handleOnChange(e, 1)}>
                                    {fontSizeAttributes.map((field, index) => (
                                        <option value={field.value} key={field.value + "_" + index}> {field.caption}</option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label='前の月アイコン2サイズ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='navigationLastMonthSvg2Size'
                                    onChange={(e) => handleOnChange(e, 1)}>
                                    {fontSizeAttributes.map((field, index) => (
                                        <option value={field.value} key={field.value + "_" + index}> {field.caption}</option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                    </div>


                    <div className="flex flex-col mb-4">
                        <label className="text-blue-100  text-xs">前の週アイコン・配色設定</label>
                        <div className="flex justify-start space-x-4">
                            <div className="icons">
                                <IconPicker
                                    name="navigationLastWeekSvg1"
                                    value={initialData?.navigationLastWeekSvg1}
                                    width="32px"
                                    height="32px"
                                    iconSize="1.2em"
                                    iconTitle="アイコン1"
                                    iconCustomClass="!rounded-none"
                                    iconWrapperCustomClasses="flex flex-row"
                                    titleCustomClasses="ml-1 text-blue-100"
                                    onChangeIcon={(name, iconData) => handleOnChangeIcon(name, iconData)}
                                />
                            </div>

                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.fillColor, [1, 2])}
                                inputBoxItem="navigationLastWeekSvg1FillColor" pickerLabel="アイコン1fill色" isBackgroundColor="1"
                                isDefaultColor={initialData?.navigationLastWeekSvg1FillColor} />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.strokeColor, [1, 2])}
                                inputBoxItem="navigationLastWeekSvg1StrokeColor" pickerLabel="アイコン1stroke色" isBackgroundColor="1"
                                isDefaultColor={initialData?.navigationLastWeekSvg1StrokeColor} />
                        </div>
                        <div className="flex justify-start space-x-4 mt-5">
                            <div className="icons">
                                <IconPicker
                                    name="navigationLastWeekSvg2"
                                    value={initialData?.navigationLastWeekSvg2}
                                    width="32px"
                                    height="32px"
                                    iconSize="1.2em"
                                    iconTitle="アイコン2"
                                    iconCustomClass="!rounded-none"
                                    iconWrapperCustomClasses="flex flex-row"
                                    titleCustomClasses="ml-1 text-blue-100"
                                    onChangeIcon={(name, iconData) => handleOnChangeIcon(name, iconData)}
                                />
                            </div>

                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.fillColor, [1, 2])}
                                inputBoxItem="navigationLastWeekSvg2FillColor" pickerLabel="アイコン2fill色" isBackgroundColor="1"
                                isDefaultColor={initialData?.navigationLastWeekSvg2FillColor} />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.strokeColor, [1, 2])}
                                inputBoxItem="navigationLastWeekSvg2StrokeColor" pickerLabel="アイコン2stroke色" isBackgroundColor="1"
                                isDefaultColor={initialData?.navigationLastWeekSvg2StrokeColor} />
                        </div>
                    </div>
                    <div className="flex justify-between space-x-4">
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label='前の週アイコン1サイズ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='navigationLastWeekSvg1Size'
                                    onChange={(e) => handleOnChange(e, 1)}>
                                    {fontSizeAttributes.map((field, index) => (
                                        <option value={field.value} key={field.value + "_" + index}> {field.caption}</option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label='前の週アイコン2サイズ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='navigationLastWeekSvg2Size'
                                    onChange={(e) => handleOnChange(e, 1)}>
                                    {fontSizeAttributes.map((field, index) => (
                                        <option value={field.value} key={field.value + "_" + index}> {field.caption}</option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                    </div>

                    <div className="flex justify-between space-x-4">
                        <div className="w-1/2">
                            <InputContainer>
                                <TextBox label="次の月文言"
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='navigationNextMonthText'
                                    onBlur={(e) => handleOnChange(e, 4)}
                                    placeholder='次の月文言'
                                    type="text" />
                            </InputContainer>
                        </div>
                        <div className="w-1/2">
                            <InputContainer>
                                <TextBox label="次の週文言"
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='navigationNextWeekText'
                                    onBlur={(e) => handleOnChange(e, 4)}
                                    placeholder='次の週文言'
                                    type="text" />
                            </InputContainer>
                        </div>
                    </div>
                    <div className="flex justify-between space-x-4">
                        <div className="w-1/2">
                            <InputContainer>
                                <Note
                                    label='次の月カスタムクラス'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25 !p-1'
                                    height='h-8'
                                    name='navigationNextMonthCustomClass'
                                    placeholder="次の月カスタムクラス"
                                    onBlur={(e) => handleOnChange(e, 1)}
                                />
                            </InputContainer>
                        </div>
                        <div className="w-1/2">
                            <InputContainer>
                                <Note
                                    label='次の週カスタムクラス'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25 !p-1'
                                    height='h-8'
                                    name='navigationNextWeekCustomClass'
                                    placeholder="次の週カスタムクラス"
                                    onBlur={(e) => handleOnChange(e, 1)}
                                />
                            </InputContainer>
                        </div>
                    </div>

                    <div className="flex flex-col mb-4">
                        <label className="text-blue-100  text-xs">次の月アイコン・配色設定</label>
                        <div className="flex justify-start space-x-4">
                            <div className="icons">
                                <IconPicker
                                    name="navigationNextMonthSvg1"
                                    value={initialData?.navigationNextMonthSvg1}
                                    width="32px"
                                    height="32px"
                                    iconSize="1.2em"
                                    iconTitle="アイコン1"
                                    iconCustomClass="!rounded-none"
                                    iconWrapperCustomClasses="flex flex-row"
                                    titleCustomClasses="ml-1 text-blue-100"
                                    onChangeIcon={(name, iconData) => handleOnChangeIcon(name, iconData)}
                                />
                            </div>

                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.fillColor, [1, 2])}
                                inputBoxItem="navigationNextMonthSvg1FillColor" pickerLabel="アイコン1fill色" isBackgroundColor="1"
                                isDefaultColor={initialData?.navigationNextMonthSvg1FillColor} />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.strokeColor, [1, 2])}
                                inputBoxItem="navigationNextMonthSvg1StrokeColor" pickerLabel="アイコン1stroke色" isBackgroundColor="1"
                                isDefaultColor={initialData?.navigationNextMonthSvg1StrokeColor} />
                        </div>
                        <div className="flex justify-start space-x-4 mt-5">
                            <div className="icons">
                                <IconPicker
                                    name="navigationNextMonthSvg2"
                                    value={initialData?.navigationNextMonthSvg2}
                                    width="32px"
                                    height="32px"
                                    iconSize="1.2em"
                                    iconTitle="アイコン2"
                                    iconCustomClass="!rounded-none"
                                    iconWrapperCustomClasses="flex flex-row"
                                    titleCustomClasses="ml-1 text-blue-100"
                                    onChangeIcon={(name, iconData) => handleOnChangeIcon(name, iconData)}
                                />
                            </div>

                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.fillColor, [1, 2])}
                                inputBoxItem="navigationNextMonthSvg2FillColor" pickerLabel="アイコン2fill色" isBackgroundColor="1"
                                isDefaultColor={initialData?.navigationNextMonthSvg2FillColor} />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.strokeColor, [1, 2])}
                                inputBoxItem="navigationNextMonthSvg2StrokeColor" pickerLabel="アイコン2stroke色" isBackgroundColor="1"
                                isDefaultColor={initialData?.navigationNextMonthSvg2StrokeColor} />
                        </div>
                    </div>
                    <div className="flex justify-between space-x-4">
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label='次の月アイコン1サイズ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='navigationNextMonthSvg1Size'
                                    onChange={(e) => handleOnChange(e, 1)}>
                                    {fontSizeAttributes.map((field, index) => (
                                        <option value={field.value} key={field.value + "_" + index}> {field.caption}</option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label='次の月アイコン2サイズ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='navigationNextMonthSvg2Size'
                                    onChange={(e) => handleOnChange(e, 1)}>
                                    {fontSizeAttributes.map((field, index) => (
                                        <option value={field.value} key={field.value + "_" + index}> {field.caption}</option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                    </div>

                    <div className="flex flex-col mb-4">
                        <label className="text-blue-100  text-xs">次の週アイコン・配色設定</label>
                        <div className="flex justify-start space-x-4">
                            <div className="icons">
                                <IconPicker
                                    name="navigationNextWeekSvg1"
                                    value={initialData?.navigationNextWeekSvg1}
                                    width="32px"
                                    height="32px"
                                    iconSize="1.2em"
                                    iconTitle="アイコン1"
                                    iconCustomClass="!rounded-none"
                                    iconWrapperCustomClasses="flex flex-row"
                                    titleCustomClasses="ml-1 text-blue-100"
                                    onChangeIcon={(name, iconData) => handleOnChangeIcon(name, iconData)}
                                />
                            </div>

                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.fillColor, [1, 2])}
                                inputBoxItem="navigationNextWeekSvg1FillColor" pickerLabel="アイコン1fill色" isBackgroundColor="1"
                                isDefaultColor={initialData?.navigationNextWeekSvg1FillColor} />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.strokeColor, [1, 2])}
                                inputBoxItem="navigationNextWeekSvg1StrokeColor" pickerLabel="アイコン1stroke色" isBackgroundColor="1"
                                isDefaultColor={initialData?.navigationNextWeekSvg1StrokeColor} />
                        </div>
                        <div className="flex justify-start space-x-4 mt-5">
                            <div className="icons">
                                <IconPicker
                                    name="navigationNextWeekSvg2"
                                    value={initialData?.navigationNextWeekSvg2}
                                    width="32px"
                                    height="32px"
                                    iconSize="1.2em"
                                    iconTitle="アイコン2"
                                    iconCustomClass="!rounded-none"
                                    iconWrapperCustomClasses="flex flex-row"
                                    titleCustomClasses="ml-1 text-blue-100"
                                    onChangeIcon={(name, iconData) => handleOnChangeIcon(name, iconData)}
                                />
                            </div>

                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.fillColor, [1, 2])}
                                inputBoxItem="navigationNextWeekSvg2FillColor" pickerLabel="アイコン2fill色" isBackgroundColor="1"
                                isDefaultColor={initialData?.navigationNextWeekSvg2FillColor} />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.strokeColor, [1, 2])}
                                inputBoxItem="navigationNextWeekSvg2StrokeColor" pickerLabel="アイコン2stroke色" isBackgroundColor="1"
                                isDefaultColor={initialData?.navigationNextWeekSvg2StrokeColor} />
                        </div>
                    </div>
                    <div className="flex justify-between space-x-4">
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label='次の週アイコン1サイズ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='navigationNextWeekSvg1Size'
                                    onChange={(e) => handleOnChange(e, 1)}>
                                    {fontSizeAttributes.map((field, index) => (
                                        <option value={field.value} key={field.value + "_" + index}> {field.caption}</option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label='次の週アイコン2サイズ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='navigationNextWeekSvg2Size'
                                    onChange={(e) => handleOnChange(e, 1)}>
                                    {fontSizeAttributes.map((field, index) => (
                                        <option value={field.value} key={field.value + "_" + index}> {field.caption}</option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                    </div>

                    <InputContainer>
                        <Note
                            label='開催月エリアWrapカスタムClass'
                            labelClassName='text-blue-100 text-xs'
                            inputClassName='bg-blue-25 !p-1'
                            height='h-8'
                            name='navigationMonthWrapCustomClass'
                            placeholder="開催月エリアWrapカスタムClass"
                            onBlur={(e) => handleOnChange(e, 1)}
                        />
                    </InputContainer>

                    <div className="flex flex-col mb-4">
                        <label className="text-blue-100  text-xs">ナビボタン文字色</label>
                        <div className="flex justify-start space-x-4">
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [2, 3], 'default')}
                                inputBoxItem="navigationTextColor" pickerLabel="通常時" isBackgroundColor="1"
                                isDefaultColor={initialData?.navigationTextColor} />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [2, 3], 'hover')}
                                inputBoxItem="navigationTextColor" pickerLabel="ホバー" isBackgroundColor="1"
                                isDefaultColor={initialData?.navigationTextColorHover} />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [2, 3], 'focus')}
                                inputBoxItem="navigationTextColor" pickerLabel="フォーカス" isBackgroundColor="1"
                                isDefaultColor={initialData?.navigationTextColorFocus} />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [2, 3], 'active')}
                                inputBoxItem="navigationTextColor" pickerLabel="アクティブ" isBackgroundColor="1"
                                isDefaultColor={initialData?.navigationTextColorActive} />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [2, 3], 'disabled')}
                                inputBoxItem="navigationTextColor" pickerLabel="非活性時" isBackgroundColor="1"
                                isDefaultColor={initialData?.navigationTextColorDisabled} />
                        </div>
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-blue-100  text-xs">ナビボタン背景色</label>
                        <div className="flex justify-start space-x-4">
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [2, 3], 'default')}
                                inputBoxItem="navigationBackgroundColor" pickerLabel="通常時" isBackgroundColor="1"
                                isDefaultColor={initialData?.navigationBackgroundColor} />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [2, 3], 'hover')}
                                inputBoxItem="navigationBackgroundColor" pickerLabel="ホバー" isBackgroundColor="1"
                                isDefaultColor={initialData?.navigationBackgroundColorHover} />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [2, 3], 'focus')}
                                inputBoxItem="navigationBackgroundColor" pickerLabel="フォーカス" isBackgroundColor="1"
                                isDefaultColor={initialData?.navigationBackgroundColorFocus} />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [2, 3], 'active')}
                                inputBoxItem="navigationBackgroundColor" pickerLabel="アクティブ" isBackgroundColor="1"
                                isDefaultColor={initialData?.navigationBackgroundColorActive} />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [2, 3], 'disabled')}
                                inputBoxItem="navigationBackgroundColor" pickerLabel="非活性時" isBackgroundColor="1"
                                isDefaultColor={initialData?.navigationBackgroundColorDisabled} />
                        </div>
                    </div>


                    <div className="flex flex-col mb-4">
                        <label className="text-blue-100  text-xs">ナビボタン枠線色</label>
                        <div className="flex justify-start space-x-4">
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.borderColor, [2, 3], 'default')}
                                inputBoxItem="navigationBoderColor" pickerLabel="通常時" isBackgroundColor="1"
                                isDefaultColor={initialData?.navigationBoderColor} />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.borderColor, [2, 3], 'hover')}
                                inputBoxItem="navigationBoderColor" pickerLabel="ホバー" isBackgroundColor="1"
                                isDefaultColor={initialData?.navigationBoderColorHover} />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.borderColor, [2, 3], 'focus')}
                                inputBoxItem="navigationBoderColor" pickerLabel="フォーカス" isBackgroundColor="1"
                                isDefaultColor={initialData?.navigationBoderColorFocus} />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.borderColor, [2, 3], 'active')}
                                inputBoxItem="navigationBoderColor" pickerLabel="アクティブ" isBackgroundColor="1"
                                isDefaultColor={initialData?.navigationBoderColorActive} />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.borderColor, [2, 3], 'disabled')}
                                inputBoxItem="navigationBoderColor" pickerLabel="非活性時" isBackgroundColor="1"
                                isDefaultColor={initialData?.navigationBoderColorDisabled} />
                        </div>
                    </div>

                    <InputContainer>
                        <Note
                            label='ナビゲーションエリアWrapカスタムClass'
                            labelClassName='text-blue-100 text-xs'
                            inputClassName='bg-blue-25 !p-1'
                            height='h-8'
                            name='navigationWrapCustomClass'
                            placeholder="ナビゲーションエリアWrapカスタムClass"
                            onBlur={(e) => handleOnChange(e, 1)}
                        />
                    </InputContainer>

                    <InputBoxSeparator cProperty={`mt-8 mb-8`} />

                    {/* {C part start} */}

                    <div className="flex justify-between space-x-4">
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label='列ヘッダー文字サイズ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='columnHeaderTextSize'
                                    onChange={(e) => handleOnChange(e, 1)}>
                                    {fontSizeAttributes.map((field, index) => (
                                        <option
                                            value={field.value}
                                            key={field.value + "_" + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label='列ヘッダー文字太さ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='columnHeaderFontWeight'
                                    onChange={(e) => handleOnChange(e, 1)}>
                                    {fontWeightAttributes.map((field, index) => (
                                        <option
                                            value={field.value}
                                            key={field.value + "_" + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                    </div>

                    <div className="flex justify-between space-x-4">
                        <div className="w-1/2">
                            <InputContainer>
                                <TextBox label="受診日列ヘッダー文言"
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='columnDayHeaderText'
                                    onBlur={(e) => handleOnChange(e, 4)}
                                    placeholder='受診日列ヘッダー文言'
                                    type="text" />
                            </InputContainer>
                        </div>
                        <div className="w-1/2">
                            <InputContainer>
                                <Note
                                    label='受診日列ヘッダーカスタムクラス'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25 !p-1'
                                    height='h-8'
                                    name='columnDayHeaderCustomClass'
                                    placeholder="受診日列ヘッダーカスタムクラス"
                                    onBlur={(e) => handleOnChange(e, 1)}
                                />
                            </InputContainer>
                        </div>
                    </div>
                    <div className="flex justify-between space-x-4">
                        <div className="w-1/2">
                            <InputContainer>
                                <TextBox label="出発時刻列ヘッダー文言"
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='columnDepartureTimeHeaderText'
                                    onBlur={(e) => handleOnChange(e, 4)}
                                    placeholder='出発時刻列ヘッダー文言'
                                    type="text" />
                            </InputContainer>
                        </div>
                        <div className="w-1/2">
                            <InputContainer>
                                <Note
                                    label='出発時刻列ヘッダーカスタムクラス'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25 !p-1'
                                    height='h-8'
                                    name='columnDepartureTimeHeaderCustomClass'
                                    placeholder="出発時刻列ヘッダーカスタムクラス"
                                    onBlur={(e) => handleOnChange(e, 1)}
                                />
                            </InputContainer>
                        </div>
                    </div>
                    <div className="flex justify-between space-x-4">
                        <div className="w-1/2">
                            <InputContainer>
                                <TextBox label="出発場所列ヘッダー文言"
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='columnBusStopHeaderText'
                                    onBlur={(e) => handleOnChange(e, 4)}
                                    placeholder='出発場所列ヘッダー文言'
                                    type="text" />
                            </InputContainer>
                        </div>
                        <div className="w-1/2">
                            <InputContainer>
                                <Note
                                    label='出発場所列ヘッダーカスタムクラス'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25 !p-1'
                                    height='h-8'
                                    name='columnBusStopHeaderCustomClass'
                                    placeholder="出発場所列ヘッダーカスタムクラス"
                                    onBlur={(e) => handleOnChange(e, 1)}
                                />
                            </InputContainer>
                        </div>
                    </div>
                    <div className="flex justify-between space-x-4">
                        <div className="w-1/2">
                            <InputContainer>
                                <TextBox label="空き状況列ヘッダー文言"
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='columnRemainingSeatsHeaderText'
                                    onBlur={(e) => handleOnChange(e, 4)}
                                    placeholder='空き状況列ヘッダー文言'
                                    type="text" />
                            </InputContainer>
                        </div>
                        <div className="w-1/2">
                            <InputContainer>
                                <Note label="空き状況列ヘッダーカスタムクラス"
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25 !p-1'
                                    height='h-8'
                                    name='columnRemainingSeatsHeaderCustomClass'
                                    onBlur={(e) => handleOnChange(e, 1)}
                                    placeholder='空き状況列ヘッダーカスタムクラス'
                                />
                            </InputContainer>
                        </div>
                    </div>

                    <div className="flex flex-col mb-4">
                        <label className="text-blue-100  text-xs">受診日列ヘッダー配色</label>
                        <div className="flex justify-start space-x-4">
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])}
                                inputBoxItem="columnDayHeaderTextColor" pickerLabel="文字色" isBackgroundColor="1"
                                isDefaultColor={initialData?.columnDayHeaderTextColor} />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [1, 2])}
                                inputBoxItem="columnDayHeaderBackgroundColor" pickerLabel="セル背景色" isBackgroundColor="1"
                                isDefaultColor={initialData?.columnDayHeaderBackgroundColor} />
                        </div>
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-blue-100  text-xs">出発時間列ヘッダー配色</label>
                        <div className="flex justify-start space-x-4">
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])}
                                inputBoxItem="columnDepartureTimeHeaderTextColor" pickerLabel="文字色" isBackgroundColor="1"
                                isDefaultColor={initialData?.columnDepartureTimeHeaderTextColor} />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [1, 2])}
                                inputBoxItem="columnDepartureTimeHeaderBackgroundColor" pickerLabel="セル背景色" isBackgroundColor="1"
                                isDefaultColor={initialData?.columnDepartureTimeHeaderBackgroundColor} />
                        </div>
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-blue-100  text-xs">出発場所列ヘッダー配色</label>
                        <div className="flex justify-start space-x-4">
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])}
                                inputBoxItem="columnBusStopHeaderTextColor" pickerLabel="文字色" isBackgroundColor="1"
                                isDefaultColor={initialData?.columnBusStopHeaderTextColor} />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [1, 2])}
                                inputBoxItem="columnBusStopHeaderBackgroundColor" pickerLabel="セル背景色" isBackgroundColor="1"
                                isDefaultColor={initialData?.columnBusStopHeaderBackgroundColor} />
                        </div>
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-blue-100  text-xs">空き状況列ヘッダー配色</label>
                        <div className="flex justify-start space-x-4">
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])}
                                inputBoxItem="columnRemainingSeatsHeaderTextColor" pickerLabel="文字色" isBackgroundColor="1"
                                isDefaultColor={initialData?.columnRemainingSeatsHeaderTextColor} />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [1, 2])}
                                inputBoxItem="columnRemainingSeatsHeaderBackgroundColor" pickerLabel="セル背景色" isBackgroundColor="1"
                                isDefaultColor={initialData?.columnRemainingSeatsHeaderBackgroundColor} />
                        </div>
                    </div>

                    <div className="flex justify-between space-x-4">
                        <div className="w-1/2">
                            <InputContainer>
                                <TextBox label="受付時間列ヘッダー文言"
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='columnTimeHeaderText'
                                    onBlur={(e) => handleOnChange(e, 4)}
                                    placeholder='受付時間列ヘッダー文言'
                                    type="text" />
                            </InputContainer>
                        </div>
                        <div className="w-1/2">
                            <InputContainer>
                                <Note label="受付時間列ヘッダーカスタムクラス"
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25 !p-1'
                                    height='h-8'
                                    name='columnTimeHeaderCustomClass'
                                    onBlur={(e) => handleOnChange(e, 1)}
                                    placeholder='受付時間列ヘッダーカスタムクラス'
                                />
                            </InputContainer>
                        </div>
                    </div>
                    <div className="flex justify-between space-x-4">
                        <div className="w-1/2"></div>
                        <div className="w-1/2">
                            <InputContainer>
                                <Note label="日曜日列ヘッダーカスタムクラス"
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25 !p-1'
                                    height='h-8'
                                    name='columnSundayHeaderSundayCustomClass'
                                    onBlur={(e) => handleOnChange(e, 1)}
                                    placeholder='日曜日列ヘッダーカスタムクラス'
                                />
                            </InputContainer>
                        </div>
                    </div>
                    <div className="flex justify-between space-x-4">
                        <div className="w-1/2"></div>
                        <div className="w-1/2">
                            <InputContainer>
                                <Note label="平日列ヘッダーカスタムクラス"
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25 !p-1'
                                    height='h-8'
                                    name='columnWeekdayHeaderSundayCustomClass'
                                    onBlur={(e) => handleOnChange(e, 1)}
                                    placeholder='平日列ヘッダーカスタムクラス'
                                />
                            </InputContainer>
                        </div>
                    </div>
                    <div className="flex justify-between space-x-4">
                        <div className="w-1/2"></div>
                        <div className="w-1/2">
                            <InputContainer>
                                <Note label="土曜日列ヘッダーカスタムクラス"
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25 !p-1'
                                    height='h-8'
                                    name='columnSaturdayHeaderSundayCustomClass'
                                    onBlur={(e) => handleOnChange(e, 1)}
                                    placeholder='土曜日列ヘッダーカスタムクラス'
                                />
                            </InputContainer>
                        </div>
                    </div>

                    <div className="flex flex-col mb-4">
                        <label className="text-blue-100  text-xs">受付時間列ヘッダー配色</label>
                        <div className="flex justify-start space-x-4">
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])}
                                inputBoxItem="columnTimeHeaderTextColor" pickerLabel="文字色" isBackgroundColor="1"
                                isDefaultColor={initialData?.columnTimeHeaderTextColor} />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [1, 2])}
                                inputBoxItem="columnTimeHeaderBackgroundColor" pickerLabel="セル背景色" isBackgroundColor="1"
                                isDefaultColor={initialData?.columnTimeHeaderBackgroundColor} />
                        </div>
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-blue-100  text-xs">日曜日列ヘッダー配色</label>
                        <div className="flex justify-start space-x-4">
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])}
                                inputBoxItem="columnSundayHeaderTextColor" pickerLabel="文字色" isBackgroundColor="1"
                                isDefaultColor={initialData?.columnSundayHeaderTextColor} />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [1, 2])}
                                inputBoxItem="columnSundayHeaderBackgroundColor" pickerLabel="セル背景色" isBackgroundColor="1"
                                isDefaultColor={initialData?.columnSundayHeaderBackgroundColor} />
                        </div>
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-blue-100  text-xs">平日列ヘッダー配色</label>
                        <div className="flex justify-start space-x-4">
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])}
                                inputBoxItem="columnWeekdayHeaderTextColor" pickerLabel="文字色" isBackgroundColor="1"
                                isDefaultColor={initialData?.columnWeekdayHeaderTextColor} />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [1, 2])}
                                inputBoxItem="columnWeekdayHeaderBackgroundColor" pickerLabel="セル背景色" isBackgroundColor="1"
                                isDefaultColor={initialData?.columnWeekdayHeaderBackgroundColor} />
                        </div>
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-blue-100  text-xs">土曜日列ヘッダー配色</label>
                        <div className="flex justify-start space-x-4">
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])}
                                inputBoxItem="columnSaturdayHeaderTextColor" pickerLabel="文字色" isBackgroundColor="1"
                                isDefaultColor={initialData?.columnSaturdayHeaderTextColor} />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [1, 2])}
                                inputBoxItem="columnSaturdayHeaderBackgroundColor" pickerLabel="セル背景色" isBackgroundColor="1"
                                isDefaultColor={initialData?.columnSaturdayHeaderBackgroundColor} />
                        </div>
                    </div>

                    <InputBoxSeparator cProperty={`mt-8 mb-8`} />

                    {/* {D part start} */}

                    <div className="flex justify-between space-x-4">
                        <div className="w-1/2">
                            <InputContainer>
                                <TextBox label="検診場所行ヘッダー文言"
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='rowDayHeaderText'
                                    onBlur={(e) => handleOnChange(e, 4)}
                                    placeholder='検診場所行ヘッダー文言'
                                    type="text" />
                            </InputContainer>
                        </div>
                        <div className="w-1/2">
                            <InputContainer>
                                <Note label="検診場所行ヘッダーカスタムクラス"
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25 !p-1'
                                    height='h-8'
                                    name='rowDayHeaderCustomClass'
                                    onBlur={(e) => handleOnChange(e, 1)}
                                    placeholder='検診場所行ヘッダーカスタムクラス'
                                />
                            </InputContainer>
                        </div>
                    </div>

                    <div className="flex justify-between space-x-4">
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label='検診場所行ヘッダー文字サイズ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='rowInstituteHeaderTextSize'
                                    onChange={(e) => handleOnChange(e, 1)}>
                                    {fontSizeAttributes.map((field, index) => (
                                        <option
                                            value={field.value}
                                            key={field.value + "_" + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label='検診場所行ヘッダー文字太さ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='rowInstituteHeaderFontWeight'
                                    onChange={(e) => handleOnChange(e, 1)}>
                                    {fontWeightAttributes.map((field, index) => (
                                        <option
                                            value={field.value}
                                            key={field.value + "_" + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                    </div>
                    <div className="flex justify-between space-x-4">
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label='検診場所...省略行'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='rowInstituteHeaderLineClamp'
                                    onChange={(e) => handleOnChange(e, 1)}>
                                    {lineClampList.map((field, index) => (
                                        <option
                                            value={field.value}
                                            key={field.value + "_" + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label='検診場所行高さ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='rowInstituteHeaderHeight'
                                    onChange={(e) => handleOnChange(e, 1)}>
                                    {heightAttributes.map((field, index) => (
                                        <option
                                            value={field.value}
                                            key={field.value + "_" + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                    </div>

                    <div className="flex flex-col mb-4">
                        <label className="text-blue-100  text-xs">検診場所行ヘッダー配色</label>
                        <div className="flex justify-start space-x-4">
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])}
                                inputBoxItem="rowInstituteHeaderTextColor" pickerLabel="文字色" isBackgroundColor="1"
                                isDefaultColor={initialData?.rowInstituteHeaderTextColor} />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [1, 2])}
                                inputBoxItem="rownstituteHeaderBackgroundColor" pickerLabel="セル背景色" isBackgroundColor="1"
                                isDefaultColor={initialData?.rownstituteHeaderBackgroundColor} />
                        </div>
                    </div>
                    <InputContainer>
                        <Note label="検診場所カスタムClass"
                            labelClassName='text-blue-100 text-xs'
                            inputClassName='bg-blue-25 !p-1'
                            height='h-8'
                            name='rowInstituteHeaderCustomClass'
                            onBlur={(e) => handleOnChange(e, 1)}
                            placeholder='検診場所カスタムClass'
                        />
                    </InputContainer>

                    <InputBoxSeparator cProperty={`mt-8 mb-8`} />

                    {/* {E part start} */}

                    <div className="flex justify-between space-x-4">
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label='日時出発場所セル文字サイズ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='rowHeaderTextSize'
                                    onChange={(e) => handleOnChange(e, 1)}>
                                    {fontSizeAttributes.map((field, index) => (
                                        <option
                                            value={field.value}
                                            key={field.value + "_" + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label='日時出発場所セル文字太さ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='rowHeaderFontWeight'
                                    onChange={(e) => handleOnChange(e, 1)}>
                                    {fontWeightAttributes.map((field, index) => (
                                        <option
                                            value={field.value}
                                            key={field.value + "_" + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                    </div>

                    <div className="flex flex-col mb-4">
                        <label className="text-blue-100  text-xs">日時出発場所セル配色</label>
                        <div className="flex justify-start space-x-4">
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])}
                                inputBoxItem="rowHeaderTextColor" pickerLabel="文字色" isBackgroundColor="1"
                                isDefaultColor={initialData?.rowHeaderTextColor} />
                            {/* <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [1, 2])}
                                inputBoxItem="rowHeaderBackgroundColor" pickerLabel="セル背景色" isBackgroundColor="1"
                                isDefaultColor={initialData?.rowHeaderBackgroundColor} /> */}
                        </div>
                    </div>
                    <InputContainer>
                        <Note label="日時出発場所セルカスタムClass"
                            labelClassName='text-blue-100 text-xs'
                            inputClassName='bg-blue-25 !p-1'
                            height='h-8'
                            name='rowHeaderCustomClass'
                            onBlur={(e) => handleOnChange(e, 1)}
                            placeholder='日時出発場所セルカスタムClass'
                        />
                    </InputContainer>

                    <InputBoxSeparator cProperty={`mt-8 mb-8`} />

                    {/* {F part start} */}

                    <div className="flex justify-between space-x-4">
                        <div className="w-1/2">
                            <InputContainer>
                                <TextBox label="残数セル左辺文言"
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='cellsLeftText'
                                    onBlur={(e) => handleOnChange(e, 4)}
                                    placeholder='残数セル左辺文言'
                                    type="text" />
                            </InputContainer>
                        </div>
                        <div className="w-1/2">
                            <InputContainer>
                                <TextBox label="残数セル中央文言"
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='cellsCenterText'
                                    onBlur={(e) => handleOnChange(e, 4)}
                                    placeholder='残数セル中央文言'
                                    type="text" />
                            </InputContainer>
                        </div>
                    </div>
                    <div className="flex justify-between space-x-4">
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label='残数セル文字サイズ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='cellsTextSize'
                                    onChange={(e) => handleOnChange(e, 1)}>
                                    {fontSizeAttributes.map((field, index) => (
                                        <option
                                            value={field.value}
                                            key={field.value + "_" + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label='残数セル文字太さ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='cellsFontWeight'
                                    onChange={(e) => handleOnChange(e, 1)}>
                                    {fontWeightAttributes.map((field, index) => (
                                        <option
                                            value={field.value}
                                            key={field.value + "_" + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                    </div>
                    <InputContainer>
                        <Note label="残数文言カスタムClass"
                            labelClassName='text-blue-100 text-xs'
                            inputClassName='bg-blue-25 !p-1'
                            height='h-8'
                            name='cellsTextWrapCustomClass'
                            onBlur={(e) => handleOnChange(e, 1)}
                            placeholder='残数文言カスタムClass'
                        />
                    </InputContainer>
                    <InputContainer>
                        <Note label="残数アイコンカスタムClass"
                            labelClassName='text-blue-100 text-xs'
                            inputClassName='bg-blue-25 !p-1'
                            height='h-8'
                            name='cellsIconWrapCustomClass'
                            onBlur={(e) => handleOnChange(e, 1)}
                            placeholder='残数アイコンカスタムClass'
                        />
                    </InputContainer>
                    <InputContainer>
                        <Note label="残数wrapカスタムClass"
                            labelClassName='text-blue-100 text-xs'
                            inputClassName='bg-blue-25 !p-1'
                            height='h-8'
                            name='cellsAllWrapCustomClass'
                            onBlur={(e) => handleOnChange(e, 1)}
                            placeholder='残数wrapカスタムClass'
                        />
                    </InputContainer>

                    <div className="flex flex-col mb-4">
                        <label className="text-blue-100  text-xs">残数セル配色</label>
                        <div className="flex justify-start space-x-4">
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])}
                                inputBoxItem="cellsTextColor" pickerLabel="文字色" isBackgroundColor="1"
                                isDefaultColor={initialData?.cellsTextColor} />
                        </div>
                    </div>

                    <div className="flex flex-col justify-between mb-6">
                        <div className="flex space-x-4">
                            <div className="w-1/2">
                                <InputContainer className="mb-1">
                                    <SelectBox
                                        label='不可アイコン1サイズ'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='cellOutOfStockSvg1Size'
                                        onChange={(e) => handleOnChange(e, 1)}>
                                        {fontSizeAttributes.map((field, index) => (
                                            <option value={field.value} key={field.value + "_" + index}> {field.caption}</option>
                                        ))}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                            <div className="w-1/2">
                                <InputContainer className="mb-1">
                                    <SelectBox
                                        label='不可アイコン2サイズ'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='cellOutOfStockSvg2Size'
                                        onChange={(e) => handleOnChange(e, 1)}>
                                        {fontSizeAttributes.map((field, index) => (
                                            <option value={field.value} key={field.value + "_" + index}> {field.caption}</option>
                                        ))}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                        </div>
                        <p className="text-blue-100 text-xs">アイコンの種類や色は説明エリアと同じになります</p>
                    </div>
                    <div className="flex flex-col justify-between mb-6">
                        <div className="flex space-x-4">
                            <div className="w-1/2">
                                <InputContainer className="mb-1">
                                    <SelectBox
                                        label='残り僅かアイコン1サイズ'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='cellLowStockSvg1Size'
                                        onChange={(e) => handleOnChange(e, 1)}>
                                        {fontSizeAttributes.map((field, index) => (
                                            <option value={field.value} key={field.value + "_" + index}> {field.caption}</option>
                                        ))}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                            <div className="w-1/2">
                                <InputContainer className="mb-1">
                                    <SelectBox
                                        label='残り僅かアイコン2サイズ'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='cellLowStockSvg2Size'
                                        onChange={(e) => handleOnChange(e, 1)}>
                                        {fontSizeAttributes.map((field, index) => (
                                            <option value={field.value} key={field.value + "_" + index}> {field.caption}</option>
                                        ))}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                        </div>
                        <p className="text-blue-100 text-xs">アイコンの種類や色は説明エリアと同じになります</p>
                    </div>
                    <div className="flex flex-col justify-between">
                        <div className="flex space-x-4">
                            <div className="w-1/2">
                                <InputContainer className="mb-1">
                                    <SelectBox
                                        label='受付中アイコン1サイズ'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='cellInStockSvg1Size'
                                        onChange={(e) => handleOnChange(e, 1)}>
                                        {fontSizeAttributes.map((field, index) => (
                                            <option value={field.value} key={field.value + "_" + index}> {field.caption}</option>
                                        ))}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                            <div className="w-1/2">
                                <InputContainer className="mb-1">
                                    <SelectBox
                                        label='受付中アイコン2サイズ'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='cellInStockSvg2Size'
                                        onChange={(e) => handleOnChange(e, 1)}>
                                        {fontSizeAttributes.map((field, index) => (
                                            <option value={field.value} key={field.value + "_" + index}> {field.caption}</option>
                                        ))}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                        </div>
                        <p className="text-blue-100 text-xs">アイコンの種類や色は説明エリアと同じになります</p>
                    </div>
                </Form>
            </div>
        </Formik>
    );
}
export default Slot1FormSettings