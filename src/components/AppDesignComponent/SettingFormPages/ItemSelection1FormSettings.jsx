import { Form, Formik } from "formik";
import _ from 'lodash';
import React from "react";
import { useRecoilState } from "recoil";
import {
    borderAttributes, borderRadiousAttributes, borderStyles, boxShadowAttributes, divideStyleAttributes, divideYWithAttributes, fontSizeAttributes, fontWeightAttributes, marginXAttributes
} from "../../../lib/tailwindClassAttributes";
import { appDesignerState } from "../../../store/recoil/appDesignerState";
import ColorPickerWithRecent from "../../ColorPicker/ColorPickerWithRecent";
import SelectBox from "../../Form/FormInputs/SelectBox";
import TextBox from "../../Form/FormInputs/TextBox";
import IconPicker from "../../IconPicker/IconPicker";
import InputBoxSeparator from '../../InputBoxSeparator/InputBoxSeparator';
import InputContainer from "../../Wrapper/InputContainer";


const strokeSizeRangeStart = 0;
const strokeSizeRangeEnd = 5;

const ItemSelection1FormSettings = ({ formData: initialData, handleOnChange, handleOnChangeColor = () => { }, updateState, tailwindColorCodeKeys }) => {
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

    function handleOnChangeStrokeSize(e) {
        const value = e.target.value;
        const key = e.target.name;
        const classValue = `stroke-[${value}]`;
        const styleClass = { strokeWidth: value };

        updateState(key, classValue, 'classes');
        updateState(key, styleClass, 'styles');
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
                                    label='アイテムエリア角丸サイズ：無指定'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='default.itemBorderRadius'
                                    value={initialData.default.itemBorderRadius}
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
                                    label='アイテムエリア角丸サイズ：640px以上'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='sm.itemBorderRadius'
                                    value={initialData.sm.itemBorderRadius}
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
                                    label='アイテムエリア角丸サイズ：768px以上'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='md.itemBorderRadius'
                                    value={initialData.md.itemBorderRadius}
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
                                    label='アイテムエリア角丸サイズ：1024px以上'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='lg.itemBorderRadius'
                                    value={initialData.lg.itemBorderRadius}
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
                                    label='アイテムエリア角丸サイズ：1280px以上'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='xl.itemBorderRadius'
                                    value={initialData.xl.itemBorderRadius}
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
                                    label='アイテムエリア角丸サイズ：1536px以上'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='2xl.itemBorderRadius'
                                    value={initialData['2xl'].itemBorderRadius}
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
                                    label='アイテムエリア枠線：無指定'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='default.itemBorderWidth'
                                    value={initialData.default.itemBorderWidth}
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
                                    label='アイテムエリア枠線：640px以上'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='sm.itemBorderWidth'
                                    value={initialData.sm.itemBorderWidth}
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
                                    label='アイテムエリア枠線：768px以上'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='md.itemBorderWidth'
                                    value={initialData.md.itemBorderWidth}
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
                                    label='アイテムエリア枠線：1024px以上'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='lg.itemBorderWidth'
                                    value={initialData.lg.itemBorderWidth}
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
                                    label='アイテムエリア枠線：1280px以上'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='xl.itemBorderWidth'
                                    value={initialData.xl.itemBorderWidth}
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
                                    label='アイテムエリア枠線：1536px以上'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='2xl.itemBorderWidth'
                                    value={initialData['2xl'].itemBorderWidth}
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
                                    label='アイテムエリア枠線種類：無指定'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='default.itemBorderStyle'
                                    value={initialData.default.itemBorderStyle}
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
                                    label='アイテムエリア枠線種類：640px以上'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='sm.itemBorderStyle'
                                    value={initialData.sm.itemBorderStyle}
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
                                    label='アイテムエリア枠線種類：768px以上'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='md.itemBorderStyle'
                                    value={initialData.md.itemBorderStyle}
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
                                    label='アイテムエリア枠線種類：1024px以上'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='lg.itemBorderStyle'
                                    value={initialData.lg.itemBorderStyle}
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
                                    label='アイテムエリア枠線種類：1280px以上'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='xl.itemBorderStyle'
                                    value={initialData.xl.itemBorderStyle}
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
                                    label='アイテムエリア枠線種類：1536px以上'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='2xl.itemBorderStyle'
                                    value={initialData['2xl'].itemBorderStyle}
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
                                    label='アイテムエリア左右間隔：無指定'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='default.itemMarginX'
                                    value={initialData.default.itemMarginX}
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
                                    label='アイテムエリア左右間隔：640px以上'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='sm.itemMarginX'
                                    value={initialData.sm.itemMarginX}
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
                                    label='アイテムエリア左右間隔：768px以上'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='md.itemMarginX'
                                    value={initialData.md.itemMarginX}
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
                                    label='アイテムエリア左右間隔：1024px以上'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='lg.itemMarginX'
                                    value={initialData.lg.itemMarginX}
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
                                    label='アイテムエリア左右間隔：1280px以上'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='xl.itemMarginX'
                                    value={initialData.xl.itemMarginX}
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
                                    label='アイテムエリア左右間隔：1536px以上'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='2xl.itemMarginX'
                                    value={initialData['2xl'].itemMarginX}
                                    onChange={(e) => handleOnChangePrefix(e, '2xl')}
                                >
                                    {marginXAttributes.map((field, index) => <option key={field.value + "_" + index} value={'2xl:' + field.value}> {field.caption}</option>)}
                                </SelectBox>
                            </InputContainer>
                        </div>
                    </div>

                    <div className="flex justify-between space-x-4">
                        <div className="w-1/3">
                            <InputContainer>
                                <SelectBox
                                    label='アイテムエリア影：無指定'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='default.itemBoxShadow'
                                    value={initialData.default.itemBoxShadow}
                                    onChange={(e) => handleOnChangePrefix(e, 'default')}>
                                    {boxShadowAttributes.map((field, index) => (
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
                                    label='アイテムエリア影：640px以上'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='sm.itemBoxShadow'
                                    value={initialData.sm.itemBoxShadow}
                                    onChange={(e) => handleOnChangePrefix(e, 'sm')}>
                                    {boxShadowAttributes.map((field, index) => (
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
                                    label='アイテムエリア影：768px以上'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='md.itemBoxShadow'
                                    value={initialData.md.itemBoxShadow}
                                    onChange={(e) => handleOnChangePrefix(e, 'md')}>
                                    {boxShadowAttributes.map((field, index) => (
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
                                    label='アイテムエリア影：1024px以上'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='lg.itemBoxShadow'
                                    value={initialData.lg.itemBoxShadow}
                                    onChange={(e) => handleOnChangePrefix(e, 'lg')}>
                                    {boxShadowAttributes.map((field, index) => (
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
                                    label='アイテムエリア影：1280px以上'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='xl.itemBoxShadow'
                                    value={initialData.xl.itemBoxShadow}
                                    onChange={(e) => handleOnChangePrefix(e, 'xl')}>
                                    {boxShadowAttributes.map((field, index) => (
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
                                    label='アイテムエリア影：1536px以上'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='2xl.itemBoxShadow'
                                    value={initialData['2xl'].itemBoxShadow}
                                    onChange={(e) => handleOnChangePrefix(e, '2xl')}
                                >
                                    {boxShadowAttributes.map((field, index) => <option key={field.value + "_" + index} value={'2xl:' + field.value}> {field.caption}</option>)}
                                </SelectBox>
                            </InputContainer>
                        </div>
                    </div>
                    <InputContainer>
                        <SelectBox
                            label='アイテムエリア分割線'
                            labelClassName='text-blue-100 text-xs'
                            inputClassName='bg-blue-25'
                            name='itemDivideWidthY'
                            onChange={(e) => handleOnChange(e, 1)}
                        >
                            {divideYWithAttributes.map((field, index) => <option key={field.value + "_" + index} value={field.value}> {field.caption}</option>)}
                        </SelectBox>
                    </InputContainer>
                    <InputContainer>
                        <SelectBox
                            label='アイテムトエリア分割線種別'
                            labelClassName='text-blue-100 text-xs'
                            inputClassName='bg-blue-25'
                            name='itemDivideStyle'
                            onChange={(e) => handleOnChange(e, 1)}
                        >
                            {divideStyleAttributes.map((field, index) => <option key={field.value + "_" + index} value={'2xl:' + field.value}> {field.caption}</option>)}
                        </SelectBox>
                    </InputContainer>
                    <div className="flex flex-col mb-4">
                        <label className="text-blue-100  text-xs">線配色</label>
                        <div className="flex justify-start space-x-4">
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.borderColor, [1, 2])}
                                inputBoxItem="itemBorderColor" pickerLabel="外枠線色" isBackgroundColor="1"
                                isDefaultColor={initialData?.itemBorderColor} />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.borderColor, [1, 2])}
                                inputBoxItem="itemDivideColor" pickerLabel="分割線色" isBackgroundColor="1"
                                isDefaultColor={initialData?.itemDivideColor} />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.shadowColor, [1, 2])}
                                inputBoxItem="itemBoxShadowColor" pickerLabel="影色" isBackgroundColor="1"
                                isDefaultColor={initialData?.itemBoxShadowColor} />
                        </div>
                    </div>
                    <InputContainer>
                        <TextBox label="アイテムエリアWrapカスタムClass"
                            labelClassName='text-blue-100 text-xs'
                            inputClassName='bg-blue-25'
                            name='itemWrapCustomClass'
                            onBlur={(e) => handleOnChange(e, 1)}
                            placeholder='アイテムエリアWrapカスタムClass'
                            type="text" />
                    </InputContainer>

                    <InputBoxSeparator cProperty={`mt-8 mb-8`} />

                    {/* {A part start} */}

                    <div className="flex justify-between space-x-4">
                        <div className="w-1/2">
                            <InputContainer>
                                <TextBox label="合計金額文言"
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='totalAmountText'
                                    onBlur={(e) => handleOnChange(e, 4)}
                                    placeholder='合計金額文言'
                                    type="text" />
                            </InputContainer>
                        </div>
                        <div className="w-1/2">
                            <InputContainer>
                                <TextBox label="合計金額接続文字"
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='totalAmountDelimiter'
                                    onBlur={(e) => handleOnChange(e, 4)}
                                    placeholder='合計金額接続文字'
                                    type="text" />
                            </InputContainer>
                        </div>
                    </div>
                    <div className="flex justify-between space-x-4">
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label='合計金額以外文字サイズ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='totalAmountExceptingTextSize'
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
                                    label='合計金額以外文字文字太さ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='totalAmountExceptingFontWeight'
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
                                    label='合計金額文字サイズ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='totalAmountTextSize'
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
                                    label='合計金額文字太さ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='totalAmountFontWeight'
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
                                <TextBox label="合計金額文言カスタムClass"
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='totalAmountTextCustomClass'
                                    onBlur={(e) => handleOnChange(e, 1)}
                                    placeholder='合計金額文言カスタムClass'
                                    type="text" />
                            </InputContainer>
                        </div>
                        <div className="w-1/2">
                            <InputContainer>
                                <TextBox label="接続文字カスタムClass"
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='totalAmountDelimiterCustomClass'
                                    onBlur={(e) => handleOnChange(e, 1)}
                                    placeholder='接続文字カスタムClass'
                                    type="text" />
                            </InputContainer>
                        </div>
                    </div>
                    <div className="flex justify-between space-x-4">
                        <div className="w-1/2">
                            <InputContainer>
                                <TextBox label="金額カスタムClass"
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='totalAmountCustomClass'
                                    onBlur={(e) => handleOnChange(e, 1)}
                                    placeholder='金額カスタムClass'
                                    type="text" />
                            </InputContainer>
                        </div>
                        <div className="w-1/2">
                            <InputContainer>
                                <TextBox label="通貨単位カスタムClass"
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='currencyCustomClass'
                                    onBlur={(e) => handleOnChange(e, 1)}
                                    placeholder='通貨単位カスタムClass'
                                    type="text" />
                            </InputContainer>
                        </div>
                    </div>
                    <InputContainer>
                        <TextBox label="合計金額WrapカスタムClass"
                            labelClassName='text-blue-100 text-xs'
                            inputClassName='bg-blue-25'
                            name='totalAmountWrapCustomClass'
                            onBlur={(e) => handleOnChange(e, 1)}
                            placeholder='合計金額WrapカスタムClass'
                            type="text" />
                    </InputContainer>

                    <InputBoxSeparator cProperty={`mt-8 mb-8`} />

                    {/* {B part start} */}

                    <InputContainer>
                        <TextBox label="アイテム表示エリアRowカスタムClass"
                            labelClassName='text-blue-100 text-xs'
                            inputClassName='bg-blue-25'
                            name='itemRowCustomClass'
                            onBlur={(e) => handleOnChange(e, 1)}
                            placeholder='アイテム表示エリアRowカスタムClass'
                            type="text" />
                    </InputContainer>
                    <div className="flex flex-col mb-4">
                        <label className="text-blue-100  text-xs">[偶数]行文字色</label>
                        <div className="flex justify-start space-x-4">
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [2, 3], 'default')}
                                inputBoxItem="rowTextColorEven" pickerLabel="通常時" isBackgroundColor="1"
                                isDefaultColor={initialData?.rowTextColorEven} />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [2, 3], 'hover')}
                                inputBoxItem="rowTextColorEven" pickerLabel="ホバー" isBackgroundColor="1"
                                isDefaultColor={initialData?.rowTextColorEvenHover} />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [2, 3], 'focus')}
                                inputBoxItem="rowTextColorEven" pickerLabel="フォーカス" isBackgroundColor="1"
                                isDefaultColor={initialData?.rowTextColorEvenFocus} />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [2, 3], 'active')}
                                inputBoxItem="rowTextColorEven" pickerLabel="アクティブ" isBackgroundColor="1"
                                isDefaultColor={initialData?.rowTextColorEvenActive} />
                        </div>
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-blue-100  text-xs">[偶数]行背景色</label>
                        <div className="flex justify-start space-x-4">
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [2, 3], 'default')}
                                inputBoxItem="rowBackgroundColorEven" pickerLabel="通常時" isBackgroundColor="1"
                                isDefaultColor={initialData?.rowBackgroundColorEven} />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [2, 3], 'hover')}
                                inputBoxItem="rowBackgroundColorEven" pickerLabel="ホバー" isBackgroundColor="1"
                                isDefaultColor={initialData?.rowBackgroundColorEvenHover} />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [2, 3], 'focus')}
                                inputBoxItem="rowBackgroundColorEven" pickerLabel="フォーカス" isBackgroundColor="1"
                                isDefaultColor={initialData?.rowBackgroundColorEvenFocus} />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [2, 3], 'active')}
                                inputBoxItem="rowBackgroundColorEven" pickerLabel="アクティブ" isBackgroundColor="1"
                                isDefaultColor={initialData?.rowBackgroundColorEvenActive} />
                        </div>
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-blue-100  text-xs">[奇数]行文字色</label>
                        <div className="flex justify-start space-x-4">
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [2, 3], 'default')}
                                inputBoxItem="rowTextColorOdd" pickerLabel="通常時" isBackgroundColor="1"
                                isDefaultColor={initialData?.rowTextColorOdd} />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [2, 3], 'hover')}
                                inputBoxItem="rowTextColorOdd" pickerLabel="ホバー" isBackgroundColor="1"
                                isDefaultColor={initialData?.rowTextColorOddHover} />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [2, 3], 'focus')}
                                inputBoxItem="rowTextColorOdd" pickerLabel="フォーカス" isBackgroundColor="1"
                                isDefaultColor={initialData?.rowTextColorOddFocus} />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [2, 3], 'active')}
                                inputBoxItem="rowTextColorOdd" pickerLabel="アクティブ" isBackgroundColor="1"
                                isDefaultColor={initialData?.rowTextColorOddActive} />
                        </div>
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-blue-100  text-xs">[奇数]行背景色</label>
                        <div className="flex justify-start space-x-4">
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [2, 3], 'default')}
                                inputBoxItem="rowBackgroundColorOdd" pickerLabel="通常時" isBackgroundColor="1"
                                isDefaultColor={initialData?.rowBackgroundColorOdd} />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [2, 3], 'hover')}
                                inputBoxItem="rowBackgroundColorOdd" pickerLabel="ホバー" isBackgroundColor="1"
                                isDefaultColor={initialData?.rowBackgroundColorOddHover} />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [2, 3], 'focus')}
                                inputBoxItem="rowBackgroundColorOdd" pickerLabel="フォーカス" isBackgroundColor="1"
                                isDefaultColor={initialData?.rowBackgroundColorOddFocus} />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [2, 3], 'active')}
                                inputBoxItem="rowBackgroundColorOdd" pickerLabel="アクティブ" isBackgroundColor="1"
                                isDefaultColor={initialData?.rowBackgroundColorOddActive} />
                        </div>
                    </div>
                    <InputContainer>
                        <TextBox label="アイテム表示エリアWrapカスタムClass"
                            labelClassName='text-blue-100 text-xs'
                            inputClassName='bg-blue-25'
                            name='itemOuterWrapCustomClass'
                            onBlur={(e) => handleOnChange(e, 1)}
                            placeholder='アイテム表示エリアWrapカスタムClass'
                            type="text" />
                    </InputContainer>

                    <InputBoxSeparator cProperty={`mt-8 mb-8`} />

                    {/* {C part start} */}

                    <div className="flex justify-between space-x-4">
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label='選択不可アイコン1サイズ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='unselectableIcon1Size'
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
                                    label='選択不可アイコン1strokeサイズ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='unselectableIcon1StrokeSize'
                                    onChange={(e) => handleOnChangeStrokeSize(e)}>
                                    {_.range(strokeSizeRangeStart, strokeSizeRangeEnd).map(x => <option key={x} value={`${x}px`}>{x + 'px'}</option>)}
                                </SelectBox>
                            </InputContainer>
                        </div>
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-blue-100  text-xs">選択不可アイコン1配色設定</label>
                        <div className="flex justify-start space-x-4">
                            <div className="icons">
                                <IconPicker
                                    name="unselectableIcon1Svg"
                                    value={initialData?.unselectableIcon1Svg}
                                    width="32px"
                                    height="32px"
                                    iconSize="1.2em"
                                    iconTitle="アイコン"
                                    iconCustomClass="!rounded-none"
                                    iconWrapperCustomClasses="flex flex-row"
                                    titleCustomClasses="ml-1 text-blue-100"
                                    onChangeIcon={(name, iconData) => handleOnChangeIcon(name, iconData)}
                                />
                            </div>

                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.fillColor, [1, 2])}
                                inputBoxItem="unselectableIcon1FillColor" pickerLabel="fill色" isBackgroundColor="1"
                                isDefaultColor={initialData?.unselectableIcon1FillColor} />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.strokeColor, [1, 2])}
                                inputBoxItem="unselectableIcon1StrokeColor" pickerLabel="stroke色" isBackgroundColor="1"
                                isDefaultColor={initialData?.unselectableIcon1StrokeColor} />
                        </div>
                    </div>
                    <div className="flex justify-between space-x-4">
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label='選択不可アイコン2サイズ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='unselectableIcon2Size'
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
                                    label='選択不可アイコン2strokeサイズ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='unselectableIcon2StrokeSize'
                                    onChange={(e) => handleOnChangeStrokeSize(e)}>
                                    {_.range(strokeSizeRangeStart, strokeSizeRangeEnd).map(x => <option key={x} value={`${x}px`}>{x + 'px'}</option>)}
                                </SelectBox>
                            </InputContainer>
                        </div>
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-blue-100  text-xs">選択不可アイコン2配色設定</label>
                        <div className="flex justify-start space-x-4">
                            <div className="icons">
                                <IconPicker
                                    name="unselectableIcon2Svg"
                                    value={initialData?.unselectableIcon2Svg}
                                    width="32px"
                                    height="32px"
                                    iconSize="1.2em"
                                    iconTitle="アイコン"
                                    iconCustomClass="!rounded-none"
                                    iconWrapperCustomClasses="flex flex-row"
                                    titleCustomClasses="ml-1 text-blue-100"
                                    onChangeIcon={(name, iconData) => handleOnChangeIcon(name, iconData)}
                                />
                            </div>

                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.fillColor, [1, 2])}
                                inputBoxItem="unselectableIcon2FillColor" pickerLabel="fill色" isBackgroundColor="1"
                                isDefaultColor={initialData?.unselectableIcon2FillColor} />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.strokeColor, [1, 2])}
                                inputBoxItem="unselectableIcon2StrokeColor" pickerLabel="stroke色" isBackgroundColor="1"
                                isDefaultColor={initialData?.unselectableIcon2StrokeColor} />
                        </div>
                    </div>
                    <InputContainer>
                        <TextBox label="選択不可カスタムClass"
                            labelClassName='text-blue-100 text-xs'
                            inputClassName='bg-blue-25'
                            name='unselectableIconCustomClass'
                            onBlur={(e) => handleOnChange(e, 1)}
                            placeholder='選択不可カスタムClass'
                            type="text" />
                    </InputContainer>
                    <div className="flex justify-between space-x-4">
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label='選択可能アイコン1サイズ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='selectableIcon1Size'
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
                                    label='選択可能アイコン1strokeサイズ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='selectableIcon1StrokeSize'
                                    onChange={(e) => handleOnChangeStrokeSize(e)}>
                                    {_.range(strokeSizeRangeStart, strokeSizeRangeEnd).map(x => <option key={x} value={`${x}px`}>{x + 'px'}</option>)}
                                </SelectBox>
                            </InputContainer>
                        </div>
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-blue-100  text-xs">選択可能アイコン1配色設定</label>
                        <div className="flex justify-start space-x-4">
                            <div className="icons">
                                <IconPicker
                                    name="selectableIcon1Svg"
                                    value={initialData?.selectableIcon1Svg}
                                    width="32px"
                                    height="32px"
                                    iconSize="1.2em"
                                    iconTitle="アイコン"
                                    iconCustomClass="!rounded-none"
                                    iconWrapperCustomClasses="flex flex-row"
                                    titleCustomClasses="ml-1 text-blue-100"
                                    onChangeIcon={(name, iconData) => handleOnChangeIcon(name, iconData)}
                                />
                            </div>

                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.fillColor, [1, 2])}
                                inputBoxItem="selectableIcon1FillColor" pickerLabel="fill色" isBackgroundColor="1"
                                isDefaultColor={initialData?.selectableIcon1FillColor} />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.strokeColor, [1, 2])}
                                inputBoxItem="selectableIcon1StrokeColor" pickerLabel="stroke色" isBackgroundColor="1"
                                isDefaultColor={initialData?.selectableIcon1StrokeColor} />
                        </div>
                    </div>
                    <div className="flex justify-between space-x-4">
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label='選択可能アイコン2サイズ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='selectableIcon2Size'
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
                                    label='選択可能アイコン2strokeサイズ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='selectableIcon2StrokeSize'
                                    onChange={(e) => handleOnChangeStrokeSize(e)}>
                                    {_.range(strokeSizeRangeStart, strokeSizeRangeEnd).map(x => <option key={x} value={`${x}px`}>{x + 'px'}</option>)}
                                </SelectBox>
                            </InputContainer>
                        </div>
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-blue-100  text-xs">選択可能アイコン2配色設定</label>
                        <div className="flex justify-start space-x-4">
                            <div className="icons">
                                <IconPicker
                                    name="selectableIcon2Svg"
                                    value={initialData?.selectableIcon2Svg}
                                    width="32px"
                                    height="32px"
                                    iconSize="1.2em"
                                    iconTitle="アイコン"
                                    iconCustomClass="!rounded-none"
                                    iconWrapperCustomClasses="flex flex-row"
                                    titleCustomClasses="ml-1 text-blue-100"
                                    onChangeIcon={(name, iconData) => handleOnChangeIcon(name, iconData)}
                                />
                            </div>

                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.fillColor, [1, 2])}
                                inputBoxItem="selectableIcon2FillColor" pickerLabel="fill色" isBackgroundColor="1"
                                isDefaultColor={initialData?.selectableIcon2FillColor} />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.strokeColor, [1, 2])}
                                inputBoxItem="selectableIcon2StrokeColor" pickerLabel="stroke色" isBackgroundColor="1"
                                isDefaultColor={initialData?.selectableIcon2StrokeColor} />
                        </div>
                    </div>
                    <InputContainer>
                        <TextBox label="選択可能カスタムClass"
                            labelClassName='text-blue-100 text-xs'
                            inputClassName='bg-blue-25'
                            name='selectableIconCustomClass'
                            onBlur={(e) => handleOnChange(e, 1)}
                            placeholder='選択可能カスタムClass'
                            type="text" />
                    </InputContainer>
                    <div className="flex justify-between space-x-4 mt-8">
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label='選択済みアイコン1サイズ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='selectedIcon1Size'
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
                                    label='選択済みアイコン1strokeサイズ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='selectedIcon1StrokeSize'
                                    onChange={(e) => handleOnChangeStrokeSize(e)}>
                                    {_.range(strokeSizeRangeStart, strokeSizeRangeEnd).map(x => <option key={x} value={`${x}px`}>{x + 'px'}</option>)}
                                </SelectBox>
                            </InputContainer>
                        </div>
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-blue-100  text-xs">選択済みアイコン1配色設定</label>
                        <div className="flex justify-start space-x-4">
                            <div className="icons">
                                <IconPicker
                                    name="selectedIcon1Svg"
                                    value={initialData?.selectedIcon1Svg}
                                    width="32px"
                                    height="32px"
                                    iconSize="1.2em"
                                    iconTitle="アイコン"
                                    iconCustomClass="!rounded-none"
                                    iconWrapperCustomClasses="flex flex-row"
                                    titleCustomClasses="ml-1 text-blue-100"
                                    onChangeIcon={(name, iconData) => handleOnChangeIcon(name, iconData)}
                                />
                            </div>

                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.fillColor, [1, 2])}
                                inputBoxItem="selectedIcon1FillColor" pickerLabel="fill色" isBackgroundColor="1"
                                isDefaultColor={initialData?.selectedIcon1FillColor} />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.strokeColor, [1, 2])}
                                inputBoxItem="selectedIcon1StrokeColor" pickerLabel="stroke色" isBackgroundColor="1"
                                isDefaultColor={initialData?.selectedIcon1StrokeColor} />
                        </div>
                    </div>
                    <div className="flex justify-between space-x-4">
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label='選択済みアイコン2サイズ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='selectedIcon2Size'
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
                                    label='選択済みアイコン2strokeサイズ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='selectedIcon2StrokeSize'
                                    onChange={(e) => handleOnChangeStrokeSize(e)}>
                                    {_.range(strokeSizeRangeStart, strokeSizeRangeEnd).map(x => <option key={x} value={`${x}px`}>{x + 'px'}</option>)}
                                </SelectBox>
                            </InputContainer>
                        </div>
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-blue-100  text-xs">選択済みアイコン2配色設定</label>
                        <div className="flex justify-start space-x-4">
                            <div className="icons">
                                <IconPicker
                                    name="selectedIcon2Svg"
                                    value={initialData?.selectedIcon2Svg}
                                    width="32px"
                                    height="32px"
                                    iconSize="1.2em"
                                    iconTitle="アイコン"
                                    iconCustomClass="!rounded-none"
                                    iconWrapperCustomClasses="flex flex-row"
                                    titleCustomClasses="ml-1 text-blue-100"
                                    onChangeIcon={(name, iconData) => handleOnChangeIcon(name, iconData)}
                                />
                            </div>

                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.fillColor, [1, 2])}
                                inputBoxItem="selectedIcon2FillColor" pickerLabel="fill色" isBackgroundColor="1"
                                isDefaultColor={initialData?.selectedIcon2FillColor} />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.strokeColor, [1, 2])}
                                inputBoxItem="selectedIcon2StrokeColor" pickerLabel="stroke色" isBackgroundColor="1"
                                isDefaultColor={initialData?.selectedIcon2StrokeColor} />
                        </div>
                    </div>
                    <InputContainer>
                        <TextBox label="選択済みカスタムClass"
                            labelClassName='text-blue-100 text-xs'
                            inputClassName='bg-blue-25'
                            name='selectedCustomClass'
                            onBlur={(e) => handleOnChange(e, 1)}
                            placeholder='選択済みカスタムClass'
                            type="text" />
                    </InputContainer>
                    <InputContainer>
                        <TextBox label="選択エリアWrapカスタムClass"
                            labelClassName='text-blue-100 text-xs'
                            inputClassName='bg-blue-25'
                            name='selectAreaCustomClass'
                            onBlur={(e) => handleOnChange(e, 1)}
                            placeholder='選択エリアWrapカスタムClass'
                            type="text" />
                    </InputContainer>

                    <InputBoxSeparator cProperty={`mt-8 mb-8`} />

                    {/* {D part start} */}

                    <div className="flex justify-between space-x-4">
                        <div className="w-1/2">
                            <InputContainer>
                                <TextBox label="単独選択不可文字"
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='SingleSelectionNotPossibleText'
                                    onBlur={(e) => handleOnChange(e, 4)}
                                    placeholder='単独選択不可文字'
                                    type="text" />
                            </InputContainer>
                        </div>
                        <div className="w-1/2"></div>
                    </div>
                    <div className="flex justify-between space-x-4">
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label='単独選択不可文字サイズ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='SingleSelectionNotPossibleTextSize'
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
                                    label='単独選択不可文字太さ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='SingleSelectionNotPossibleFontWeight'
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
                        <label className="text-blue-100  text-xs">単独選択不可配色</label>
                        <div className="flex justify-start space-x-4">
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])}
                                inputBoxItem="SingleSelectionNotPossibleTextColor" pickerLabel="文字色" isBackgroundColor="1"
                                isDefaultColor={initialData?.SingleSelectionNotPossibleTextColor} />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [1, 2])}
                                inputBoxItem="SingleSelectionNotPossibleBackgroundColor" pickerLabel="背景色" isBackgroundColor="1"
                                isDefaultColor={initialData?.SingleSelectionNotPossibleBackgroundColor} />
                        </div>
                    </div>
                    <InputContainer>
                        <TextBox label="単独選択不可カスタムClass"
                            labelClassName='text-blue-100 text-xs'
                            inputClassName='bg-blue-25'
                            name='SingleSelectionNotPossibleCustomClass'
                            onBlur={(e) => handleOnChange(e, 1)}
                            placeholder='単独選択不可カスタムClass'
                            type="text" />
                    </InputContainer>
                    <div className="flex justify-between space-x-4 mt-10">
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label='項目名文字サイズ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='ItemNameTextSize'
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
                                    label='項目名文字太さ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='ItemNameFontWeight'
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
                        <TextBox label="項目名カスタムClass"
                            labelClassName='text-blue-100 text-xs'
                            inputClassName='bg-blue-25'
                            name='ItemNameCustomClass'
                            onBlur={(e) => handleOnChange(e, 1)}
                            placeholder='項目名カスタムClass'
                            type="text" />
                    </InputContainer>
                    <InputContainer>
                        <TextBox label="項目名エリアWrapカスタムClass"
                            labelClassName='text-blue-100 text-xs'
                            inputClassName='bg-blue-25'
                            name='ItemNameAreaWrapCustomClass'
                            onBlur={(e) => handleOnChange(e, 1)}
                            placeholder='項目名エリアWrapカスタムClass'
                            type="text" />
                    </InputContainer>

                    <InputBoxSeparator cProperty={`mt-8 mb-8`} />

                    {/* {E part start} */}

                    <div className="flex justify-between space-x-4">
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label='項目説明文字サイズ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='itemExplanationTextSize'
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
                                    label='項目説明文字太さ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='itemExplanationFontWeight'
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
                        <TextBox label="項目説明カスタムClass"
                            labelClassName='text-blue-100 text-xs'
                            inputClassName='bg-blue-25'
                            name='itemExplanationCustomClass'
                            onBlur={(e) => handleOnChange(e, 1)}
                            placeholder='項目説明カスタムClass'
                            type="text" />
                    </InputContainer>
                    <InputContainer>
                        <TextBox label="項目説明エリアWrapカスタムClass"
                            labelClassName='text-blue-100 text-xs'
                            inputClassName='bg-blue-25'
                            name='itemExplanationAreaWrapCustomClass'
                            onBlur={(e) => handleOnChange(e, 1)}
                            placeholder='項目説明エリアWrapカスタムClass'
                            type="text" />
                    </InputContainer>


                    <InputBoxSeparator cProperty={`mt-8 mb-8`} />

                    {/* {F part start} */}

                    <div className="flex justify-between space-x-4">
                        <div className="w-1/2">
                            <InputContainer>
                                <TextBox label="残数左辺文字"
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='remainingLeftText'
                                    onBlur={(e) => handleOnChange(e, 4)}
                                    placeholder='残数左辺文字'
                                    type="text" />
                            </InputContainer>
                        </div>
                        <div className="w-1/2"></div>
                    </div>
                    <div className="flex justify-between space-x-4">
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label='残数左辺文字サイズ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='remainingLeftTextSize'
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
                                    label='残数左辺文字太さ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='remainingLeftFontWeight'
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
                        <TextBox label="残数左辺カスタムClass"
                            labelClassName='text-blue-100 text-xs'
                            inputClassName='bg-blue-25'
                            name='remainingLeftCustomClass'
                            onBlur={(e) => handleOnChange(e, 1)}
                            placeholder='残数左辺カスタムClass'
                            type="text" />
                    </InputContainer>
                    <div className="flex justify-between space-x-4">
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label='残数文字サイズ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='remainingNumberTextSize'
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
                                    label='残数文字太さ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='remainingNumberFontWeight'
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
                        <TextBox label="残数カスタムClass"
                            labelClassName='text-blue-100 text-xs'
                            inputClassName='bg-blue-25'
                            name='remainingNumberCustomClass'
                            onBlur={(e) => handleOnChange(e, 1)}
                            placeholder='残数カスタムClass'
                            type="text" />
                    </InputContainer>
                    <InputContainer>
                        <TextBox label="残数エリアWrapカスタムClass"
                            labelClassName='text-blue-100 text-xs'
                            inputClassName='bg-blue-25'
                            name='remainingAreaWrapCustomClass'
                            onBlur={(e) => handleOnChange(e, 1)}
                            placeholder='残数エリアWrapカスタムClass'
                            type="text" />
                    </InputContainer>

                    <InputBoxSeparator cProperty={`mt-8 mb-8`} />

                    {/* {G part start} */}

                    <div className="flex justify-between space-x-4">
                        <div className="w-1/2">
                            <InputContainer>
                                <TextBox label="通貨単位文字"
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='currencyUnitText'
                                    onBlur={(e) => handleOnChange(e, 4)}
                                    placeholder='通貨単位文字'
                                    type="text" />
                            </InputContainer>
                        </div>
                        <div className="w-1/2"></div>
                    </div>
                    <div className="flex justify-between space-x-4">
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label='通貨単位文字サイズ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='currencyUnitTextSize'
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
                                    label='通貨単位文字太さ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='currencyUnitFontWeight'
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
                        <TextBox label="通貨単位カスタムClass"
                            labelClassName='text-blue-100 text-xs'
                            inputClassName='bg-blue-25'
                            name='currencyUnitCustomClass'
                            onBlur={(e) => handleOnChange(e, 4)}
                            placeholder='通貨単位カスタムClass'
                            type="text" />
                    </InputContainer>
                    <InputContainer>
                        <TextBox label="通貨エリアWrapカスタムClass"
                            labelClassName='text-blue-100 text-xs'
                            inputClassName='bg-blue-25'
                            name='currencyAreaCustomClass'
                            onBlur={(e) => handleOnChange(e, 4)}
                            placeholder='通貨エリアWrapカスタムClass'
                            type="text" />
                    </InputContainer>

                    <InputBoxSeparator cProperty={`mt-8 mb-8`} />

                    {/* {H part start} */}

                    <InputContainer>
                        <SelectBox
                            label='エラーメッセージ文字サイズ'
                            labelClassName='text-blue-100 text-xs'
                            inputClassName='bg-blue-25'
                            name='errorMessageTextSize'
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
                    <InputContainer>
                        <SelectBox
                            label='エラーメッセージ文字太さ'
                            labelClassName='text-blue-100 text-xs'
                            inputClassName='bg-blue-25'
                            name='errorMessageFontWeight'
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
                    <div className="flex flex-col mb-4">
                        <label className="text-blue-100  text-xs">エラーメッセージ配色</label>
                        <div className="flex justify-start space-x-4">
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])}
                                inputBoxItem="errorMessageTextColor" pickerLabel="入力文字色" isBackgroundColor="1"
                                isDefaultColor={initialData?.errorMessageTextColor} />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [1, 2])}
                                inputBoxItem="errorMessageBackgroundColor" pickerLabel="背景色" isBackgroundColor="1"
                                isDefaultColor={initialData?.errorMessageBackgroundColor} />
                        </div>
                    </div>
                    <InputContainer>
                        <TextBox label="エラーメッセージカスタムClass"
                            labelClassName='text-blue-100 text-xs'
                            inputClassName='bg-blue-25'
                            name='errorMessageCustomClass'
                            onBlur={(e) => handleOnChange(e, 1)}
                            placeholder='エラーメッセージカスタムClass'
                            type="text" />
                    </InputContainer>
                </Form>
            </div>
        </Formik>
    );
}
export default ItemSelection1FormSettings