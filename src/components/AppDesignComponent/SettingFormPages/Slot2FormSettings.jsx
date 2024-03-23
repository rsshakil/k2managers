import { Form, Formik } from 'formik';
import _ from 'lodash';
import React from 'react';
import { useRecoilState } from 'recoil';
import ColorPickerWithRecent from '../../ColorPicker/ColorPickerWithRecent';
import Note from '../../Form/FormInputs/Note';
import SelectBox from '../../Form/FormInputs/SelectBox';
import TextBox from '../../Form/FormInputs/TextBox';
import IconPicker from '../../IconPicker/IconPicker';
import InputBoxSeparator from '../../InputBoxSeparator/InputBoxSeparator';
import InputContainer from '../../Wrapper/InputContainer';

import {
    borderAttributes, borderRadiousAttributes, borderStyles, boxShadowAttributes, divideStyleAttributes, divideYWithAttributes, fontSizeAttributes,
    fontWeightAttributes, marginXAttributes
} from '../../../lib/tailwindClassAttributes';
import { appDesignerState } from '../../../store/recoil/appDesignerState';

const Slot1FormSettings = ({
    formData: initialData,
    handleOnChange,
    handleOnChangeColor = () => { },
    updateState,
    tailwindColorCodeKeys,
}) => {
    const [recoilStateValue, setRecoilState] = useRecoilState(appDesignerState);
    const { activeTab, activePageId, tabItems } = recoilStateValue;

    function handleOnChangePrefix(e, attr) {
        let attrName = e.target.name;
        let attrValue = e.target.value;
        let getAttrNameFromArr = attrName.split('.');
        let objName = getAttrNameFromArr[0];
        let objIndex = getAttrNameFromArr[1];

        let currentStateDataUpdate = JSON.parse(JSON.stringify({ ...recoilStateValue }));
        currentStateDataUpdate.tabItems.settings.appSettingQuery[activePageId].prefixClass[objName][objIndex] =
            attrValue;

        setRecoilState(currentStateDataUpdate);
    }

    function handleOnChangeIcon(name, icon) {
        updateState(name, icon, 'info');
    }

    return (
        <Formik validateOnChange={false} validateOnBlur={false} enableReinitialize={true} initialValues={initialData}>
            <div className="relative w-full">
                <Form>
                    <div className="flex justify-between space-x-4">
                        <div className="w-1/3">
                            <InputContainer>
                                <SelectBox
                                    label="スロットエリア角丸サイズ：無指定"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="default.slotBorderRadius"
                                    value={initialData.default.slotBorderRadius}
                                    onChange={(e) => handleOnChangePrefix(e, 'default')}
                                >
                                    {borderRadiousAttributes.map((field, index) => (
                                        <option value={field.value} key={field.value + '_' + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                        <div className="w-1/3">
                            <InputContainer>
                                <SelectBox
                                    label="スロットエリア角丸サイズ：640px以上"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="sm.slotBorderRadius"
                                    value={initialData.sm.slotBorderRadius}
                                    onChange={(e) => handleOnChangePrefix(e, 'sm')}
                                >
                                    {borderRadiousAttributes.map((field, index) => (
                                        <option value={`sm:${field.value}`} key={field.value + '_' + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                        <div className="w-1/3">
                            <InputContainer>
                                <SelectBox
                                    label="スロットエリア角丸サイズ：768px以上"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="md.slotBorderRadius"
                                    value={initialData.md.slotBorderRadius}
                                    onChange={(e) => handleOnChangePrefix(e, 'md')}
                                >
                                    {borderRadiousAttributes.map((field, index) => (
                                        <option value={`md:${field.value}`} key={field.value + '_' + index}>
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
                                    label="スロットエリア角丸サイズ：1024px以上"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="lg.slotBorderRadius"
                                    value={initialData.lg.slotBorderRadius}
                                    onChange={(e) => handleOnChangePrefix(e, 'lg')}
                                >
                                    {borderRadiousAttributes.map((field, index) => (
                                        <option value={`lg:${field.value}`} key={field.value + '_' + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                        <div className="w-1/3">
                            <InputContainer>
                                <SelectBox
                                    label="スロットエリア角丸サイズ：1280px以上"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="xl.slotBorderRadius"
                                    value={initialData.xl.slotBorderRadius}
                                    onChange={(e) => handleOnChangePrefix(e, 'xl')}
                                >
                                    {borderRadiousAttributes.map((field, index) => (
                                        <option value={`xl:${field.value}`} key={field.value + '_' + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                        <div className="w-1/3">
                            <InputContainer>
                                <SelectBox
                                    label="スロットエリア角丸サイズ：1536px以上"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="2xl.slotBorderRadius"
                                    value={initialData['2xl'].slotBorderRadius}
                                    onChange={(e) => handleOnChangePrefix(e, '2xl')}
                                >
                                    {borderRadiousAttributes.map((field, index) => (
                                        <option key={field.value + '_' + index} value={'2xl:' + field.value}>
                                            {' '}
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                    </div>

                    <div className="flex justify-between space-x-4">
                        <div className="w-1/3">
                            <InputContainer>
                                <SelectBox
                                    label="スロットエリア枠線：無指定"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="default.slotBorderWidth"
                                    value={initialData.default.slotBorderWidth}
                                    onChange={(e) => handleOnChangePrefix(e, 'default')}
                                >
                                    {borderAttributes.map((field, index) => (
                                        <option value={field.value} key={field.value + '_' + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                        <div className="w-1/3">
                            <InputContainer>
                                <SelectBox
                                    label="スロットエリア枠線：640px以上"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="sm.slotBorderWidth"
                                    value={initialData.sm.slotBorderWidth}
                                    onChange={(e) => handleOnChangePrefix(e, 'sm')}
                                >
                                    {borderAttributes.map((field, index) => (
                                        <option value={`sm:${field.value}`} key={field.value + '_' + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                        <div className="w-1/3">
                            <InputContainer>
                                <SelectBox
                                    label="スロットエリア枠線：768px以上"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="md.slotBorderWidth"
                                    value={initialData.md.slotBorderWidth}
                                    onChange={(e) => handleOnChangePrefix(e, 'md')}
                                >
                                    {borderAttributes.map((field, index) => (
                                        <option value={`md:${field.value}`} key={field.value + '_' + index}>
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
                                    label="スロットエリア枠線：1024px以上"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="lg.slotBorderWidth"
                                    value={initialData.lg.slotBorderWidth}
                                    onChange={(e) => handleOnChangePrefix(e, 'lg')}
                                >
                                    {borderAttributes.map((field, index) => (
                                        <option value={`lg:${field.value}`} key={field.value + '_' + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                        <div className="w-1/3">
                            <InputContainer>
                                <SelectBox
                                    label="スロットエリア枠線：1280px以上"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="xl.slotBorderWidth"
                                    value={initialData.xl.slotBorderWidth}
                                    onChange={(e) => handleOnChangePrefix(e, 'xl')}
                                >
                                    {borderAttributes.map((field, index) => (
                                        <option value={`xl:${field.value}`} key={field.value + '_' + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                        <div className="w-1/3">
                            <InputContainer>
                                <SelectBox
                                    label="スロットエリア枠線：1536px以上"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="2xl.slotBorderWidth"
                                    value={initialData['2xl'].slotBorderWidth}
                                    onChange={(e) => handleOnChangePrefix(e, '2xl')}
                                >
                                    {borderAttributes.map((field, index) => (
                                        <option key={field.value + '_' + index} value={'2xl:' + field.value}>
                                            {' '}
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                    </div>

                    <div className="flex justify-between space-x-4">
                        <div className="w-1/3">
                            <InputContainer>
                                <SelectBox
                                    label="スロットエリア枠線種類：無指定"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="default.slotBorderStyle"
                                    value={initialData.default.slotBorderStyle}
                                    onChange={(e) => handleOnChangePrefix(e, 'default')}
                                >
                                    {borderStyles.map((field, index) => (
                                        <option value={field.value} key={field.value + '_' + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                        <div className="w-1/3">
                            <InputContainer>
                                <SelectBox
                                    label="スロットエリア枠線種類：640px以上"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="sm.slotBorderStyle"
                                    value={initialData.sm.slotBorderStyle}
                                    onChange={(e) => handleOnChangePrefix(e, 'sm')}
                                >
                                    {borderStyles.map((field, index) => (
                                        <option value={`sm:${field.value}`} key={field.value + '_' + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                        <div className="w-1/3">
                            <InputContainer>
                                <SelectBox
                                    label="スロットエリア枠線種類：768px以上"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="md.slotBorderStyle"
                                    value={initialData.md.slotBorderStyle}
                                    onChange={(e) => handleOnChangePrefix(e, 'md')}
                                >
                                    {borderStyles.map((field, index) => (
                                        <option value={`md:${field.value}`} key={field.value + '_' + index}>
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
                                    label="スロットエリア枠線種類：1024px以上"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="lg.slotBorderStyle"
                                    value={initialData.lg.slotBorderStyle}
                                    onChange={(e) => handleOnChangePrefix(e, 'lg')}
                                >
                                    {borderStyles.map((field, index) => (
                                        <option value={`lg:${field.value}`} key={field.value + '_' + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                        <div className="w-1/3">
                            <InputContainer>
                                <SelectBox
                                    label="スロットエリア枠線種類：1280px以上"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="xl.slotBorderStyle"
                                    value={initialData.xl.slotBorderStyle}
                                    onChange={(e) => handleOnChangePrefix(e, 'xl')}
                                >
                                    {borderStyles.map((field, index) => (
                                        <option value={`xl:${field.value}`} key={field.value + '_' + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                        <div className="w-1/3">
                            <InputContainer>
                                <SelectBox
                                    label="スロットエリア枠線種類：1536px以上"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="2xl.slotBorderStyle"
                                    value={initialData['2xl'].slotBorderStyle}
                                    onChange={(e) => handleOnChangePrefix(e, '2xl')}
                                >
                                    {borderStyles.map((field, index) => (
                                        <option key={field.value + '_' + index} value={'2xl:' + field.value}>
                                            {' '}
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                    </div>

                    <div className="flex justify-between space-x-4">
                        <div className="w-1/3">
                            <InputContainer>
                                <SelectBox
                                    label="スロットエリア左右間隔：無指定"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="default.slotMarginX"
                                    value={initialData.default.slotMarginX}
                                    onChange={(e) => handleOnChangePrefix(e, 'default')}
                                >
                                    {marginXAttributes.map((field, index) => (
                                        <option value={field.value} key={field.value + '_' + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                        <div className="w-1/3">
                            <InputContainer>
                                <SelectBox
                                    label="スロットエリア左右間隔：640px以上"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="sm.slotMarginX"
                                    value={initialData.sm.slotMarginX}
                                    onChange={(e) => handleOnChangePrefix(e, 'sm')}
                                >
                                    {marginXAttributes.map((field, index) => (
                                        <option value={`sm:${field.value}`} key={field.value + '_' + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                        <div className="w-1/3">
                            <InputContainer>
                                <SelectBox
                                    label="スロットエリア左右間隔：768px以上"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="md.slotMarginX"
                                    value={initialData.md.slotMarginX}
                                    onChange={(e) => handleOnChangePrefix(e, 'md')}
                                >
                                    {marginXAttributes.map((field, index) => (
                                        <option value={`md:${field.value}`} key={field.value + '_' + index}>
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
                                    label="スロットエリア左右間隔：1024px以上"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="lg.slotMarginX"
                                    value={initialData.lg.slotMarginX}
                                    onChange={(e) => handleOnChangePrefix(e, 'lg')}
                                >
                                    {marginXAttributes.map((field, index) => (
                                        <option value={`lg:${field.value}`} key={field.value + '_' + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                        <div className="w-1/3">
                            <InputContainer>
                                <SelectBox
                                    label="スロットエリア左右間隔：1280px以上"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="xl.slotMarginX"
                                    value={initialData.xl.slotMarginX}
                                    onChange={(e) => handleOnChangePrefix(e, 'xl')}
                                >
                                    {marginXAttributes.map((field, index) => (
                                        <option value={`xl:${field.value}`} key={field.value + '_' + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                        <div className="w-1/3">
                            <InputContainer>
                                <SelectBox
                                    label="スロットエリア左右間隔：1536px以上"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="2xl.slotMarginX"
                                    value={initialData['2xl'].slotMarginX}
                                    onChange={(e) => handleOnChangePrefix(e, '2xl')}
                                >
                                    {marginXAttributes.map((field, index) => (
                                        <option key={field.value + '_' + index} value={'2xl:' + field.value}>
                                            {' '}
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                    </div>

                    <div className="flex justify-between space-x-4">
                        <div className="w-1/3">
                            <InputContainer>
                                <SelectBox
                                    label="スロットエリア影：無指定"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="default.slotBoxShadow"
                                    value={initialData.default.slotBoxShadow}
                                    onChange={(e) => handleOnChangePrefix(e, 'default')}
                                >
                                    {boxShadowAttributes.map((field, index) => (
                                        <option value={field.value} key={field.value + '_' + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                        <div className="w-1/3">
                            <InputContainer>
                                <SelectBox
                                    label="スロットエリア影：640px以上"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="sm.slotBoxShadow"
                                    value={initialData.sm.slotBoxShadow}
                                    onChange={(e) => handleOnChangePrefix(e, 'sm')}
                                >
                                    {boxShadowAttributes.map((field, index) => (
                                        <option value={`sm:${field.value}`} key={field.value + '_' + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                        <div className="w-1/3">
                            <InputContainer>
                                <SelectBox
                                    label="スロットエリア影：768px以上"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="md.slotBoxShadow"
                                    value={initialData.md.slotBoxShadow}
                                    onChange={(e) => handleOnChangePrefix(e, 'md')}
                                >
                                    {boxShadowAttributes.map((field, index) => (
                                        <option value={`md:${field.value}`} key={field.value + '_' + index}>
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
                                    label="スロットエリア影：1024px以上"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="lg.slotBoxShadow"
                                    value={initialData.lg.slotBoxShadow}
                                    onChange={(e) => handleOnChangePrefix(e, 'lg')}
                                >
                                    {boxShadowAttributes.map((field, index) => (
                                        <option value={`lg:${field.value}`} key={field.value + '_' + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                        <div className="w-1/3">
                            <InputContainer>
                                <SelectBox
                                    label="スロットエリア影：1280px以上"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="xl.slotBoxShadow"
                                    value={initialData.xl.slotBoxShadow}
                                    onChange={(e) => handleOnChangePrefix(e, 'xl')}
                                >
                                    {boxShadowAttributes.map((field, index) => (
                                        <option value={`xl:${field.value}`} key={field.value + '_' + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                        <div className="w-1/3">
                            <InputContainer>
                                <SelectBox
                                    label="スロットエリア影：1536px以上"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="2xl.slotBoxShadow"
                                    value={initialData['2xl'].slotBoxShadow}
                                    onChange={(e) => handleOnChangePrefix(e, '2xl')}
                                >
                                    {boxShadowAttributes.map((field, index) => (
                                        <option key={field.value + '_' + index} value={'2xl:' + field.value}>
                                            {' '}
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                    </div>

                    <InputContainer>
                        <SelectBox
                            label="スロットエリア分割線"
                            labelClassName="text-blue-100 text-xs"
                            inputClassName="bg-blue-25"
                            name="slotDivideWidthY"
                            onChange={(e) => handleOnChange(e, 1)}
                        >
                            {divideYWithAttributes.map((field, index) => (
                                <option key={field.value + '_' + index} value={field.value}>
                                    {' '}
                                    {field.caption}
                                </option>
                            ))}
                        </SelectBox>
                    </InputContainer>
                    <InputContainer>
                        <SelectBox
                            label="スロットエリア分割線種別"
                            labelClassName="text-blue-100 text-xs"
                            inputClassName="bg-blue-25"
                            name="slotDivideStyle"
                            onChange={(e) => handleOnChange(e, 1)}
                        >
                            {divideStyleAttributes.map((field, index) => (
                                <option key={field.value + '_' + index} value={field.value}>
                                    {' '}
                                    {field.caption}
                                </option>
                            ))}
                        </SelectBox>
                    </InputContainer>
                    <div className="flex flex-col mb-4">
                        <label className="text-blue-100  text-xs">線配色</label>
                        <div className="flex justify-start space-x-4">
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) =>
                                    handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.borderColor, [1, 2])
                                }
                                inputBoxItem="slotBorderColor"
                                pickerLabel="外枠線色"
                                isBackgroundColor="1"
                                isDefaultColor={initialData?.slotBorderColor}
                            />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) =>
                                    handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.divideColor, [1, 2])
                                }
                                inputBoxItem="slotDivideColor"
                                pickerLabel="分割線色"
                                isBackgroundColor="1"
                                isDefaultColor={initialData?.slotDivideColor}
                            />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) =>
                                    handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.shadowColor, [1, 2])
                                }
                                inputBoxItem="slotBoxShadowColor"
                                pickerLabel="影色"
                                isBackgroundColor="1"
                                isDefaultColor={initialData?.slotBoxShadowColor}
                            />
                        </div>
                    </div>
                    <InputContainer>
                        <Note
                            label="スロットエリアWrapカスタムClass"
                            labelClassName="text-blue-100 text-xs"
                            inputClassName="bg-blue-25 !p-1"
                            height="h-8"
                            name="slotWrapCustomClass"
                            onBlur={(e) => handleOnChange(e, 1)}
                            placeholder="スロットエリアWrapカスタムClass"
                        />
                    </InputContainer>

                    <InputBoxSeparator cProperty={`mt-8 mb-8`} />

                    {/* {A part start} */}

                    <InputContainer>
                        <SelectBox
                            label="ヘッダーsticky"
                            labelClassName="text-blue-100 text-xs"
                            inputClassName="bg-blue-25"
                            name="isSticky"
                            onChange={(e) => handleOnChange(e, 4)}
                        >
                            <option value={0}>する</option>
                            <option value={1}>しない</option>
                        </SelectBox>
                    </InputContainer>
                    <InputContainer>
                        <Note
                            label="ヘッダーWrapカスタムClass"
                            labelClassName="text-blue-100 text-xs"
                            inputClassName="bg-blue-25 !p-1"
                            height="h-8"
                            name="slotHeaderCustomClass"
                            onBlur={(e) => handleOnChange(e, 1)}
                            placeholder="ヘッダーWrapカスタムClass"
                        />
                    </InputContainer>
                    <div className="flex flex-col mb-4">
                        <label className="text-blue-100  text-xs">ヘッダー配色</label>
                        <div className="flex justify-start space-x-4">
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) =>
                                    handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [1, 2])
                                }
                                inputBoxItem="slotHeaderBackgroundColor"
                                pickerLabel="背景色"
                                isBackgroundColor="1"
                                isDefaultColor={initialData?.slotHeaderBackgroundColor}
                            />
                        </div>
                    </div>
                    <InputContainer>
                        <TextBox
                            label="歯科健診文言"
                            labelClassName="text-blue-100 text-xs"
                            inputClassName="bg-blue-25"
                            name="dentalCheckText"
                            onBlur={(e) => handleOnChange(e, 4)}
                            placeholder="歯科健診文言"
                            type="text"
                        />
                    </InputContainer>

                    {/* {stttttttttttttttttt} */}

                    <div className="flex justify-between space-x-4">
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label="歯科健診文字サイズ"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="dentalCheckTextSize"
                                    onChange={(e) => handleOnChange(e, 1)}
                                >
                                    {fontSizeAttributes.map((field, index) => (
                                        <option value={field.value} key={field.value + '_' + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label="歯科健診文字太さ"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="dentalCheckFontWeight"
                                    onChange={(e) => handleOnChange(e, 1)}
                                >
                                    {fontWeightAttributes.map((field, index) => (
                                        <option value={field.value} key={field.value + '_' + index}>
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
                                    label="歯科健診角丸サイズ"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="dentalCheckBorderRadius"
                                    onChange={(e) => handleOnChange(e, 1)}
                                >
                                    {borderRadiousAttributes.map((field, index) => (
                                        <option value={field.value} key={field.value + '_' + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                        <div className="w-1/2">
                            <InputContainer>
                                <Note
                                    label="歯科健診カスタムClass"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25 !p-1"
                                    height="h-8"
                                    name="dentalCheckCustomClass"
                                    onBlur={(e) => handleOnChange(e, 1)}
                                    placeholder="歯科健診カスタムClass"
                                />
                            </InputContainer>
                        </div>
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-blue-100  text-xs">歯科健診配色</label>
                        <div className="flex justify-start space-x-4">
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) =>
                                    handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])
                                }
                                inputBoxItem="dentalCheckTextColor"
                                pickerLabel="文字色"
                                isBackgroundColor="1"
                                isDefaultColor={initialData?.dentalCheckTextColor}
                            />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) =>
                                    handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [1, 2])
                                }
                                inputBoxItem="dentalCheckBackgroundColor"
                                pickerLabel="背景色"
                                isBackgroundColor="1"
                                isDefaultColor={initialData?.dentalCheckBackgroundColor}
                            />
                        </div>
                    </div>
                    <div className="flex justify-between space-x-4">
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label="施設名文字サイズ"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="insituteNameTextSize"
                                    onChange={(e) => handleOnChange(e, 1)}
                                >
                                    {fontSizeAttributes.map((field, index) => (
                                        <option value={field.value} key={field.value + '_' + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label="施設名文字太さ"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="insituteNameFontWeight"
                                    onChange={(e) => handleOnChange(e, 1)}
                                >
                                    {fontWeightAttributes.map((field, index) => (
                                        <option value={field.value} key={field.value + '_' + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                    </div>
                    <InputContainer>
                        <Note
                            label="施設名カスタムClass"
                            labelClassName="text-blue-100 text-xs"
                            inputClassName="bg-blue-25 !p-1"
                            height="h-8"
                            name="insituteNameCustomClass"
                            onBlur={(e) => handleOnChange(e, 1)}
                            placeholder="施設名カスタムClass"
                        />
                    </InputContainer>
                    <div className="flex flex-col mb-4">
                        <label className="text-blue-100  text-xs">施設名配色</label>
                        <div className="flex justify-start space-x-4">
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) =>
                                    handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])
                                }
                                inputBoxItem="insituteNameTextColor"
                                pickerLabel="文字色"
                                isBackgroundColor="1"
                                isDefaultColor={initialData?.insituteNameTextColor}
                            />
                        </div>
                    </div>
                    <div className="flex justify-between space-x-4">
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label="住所文字サイズ"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="insituteAdressTextSize"
                                    onChange={(e) => handleOnChange(e, 1)}
                                >
                                    {fontSizeAttributes.map((field, index) => (
                                        <option value={field.value} key={field.value + '_' + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label="住所文字太さ"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="insituteAdressFontWeight"
                                    onChange={(e) => handleOnChange(e, 1)}
                                >
                                    {fontWeightAttributes.map((field, index) => (
                                        <option value={field.value} key={field.value + '_' + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                    </div>
                    <InputContainer>
                        <Note
                            label="住所カスタムClass"
                            labelClassName="text-blue-100 text-xs"
                            inputClassName="bg-blue-25 !p-1"
                            height="h-8"
                            name="insituteAdressCustomClass"
                            onBlur={(e) => handleOnChange(e, 1)}
                            placeholder="住所カスタムClass"
                        />
                    </InputContainer>
                    <div className="flex flex-col mb-4">
                        <label className="text-blue-100  text-xs">住所配色</label>
                        <div className="flex justify-start space-x-4">
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) =>
                                    handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])
                                }
                                inputBoxItem="insituteAdressTextColor"
                                pickerLabel="文字色"
                                isBackgroundColor="1"
                                isDefaultColor={initialData?.insituteAdressTextColor}
                            />
                        </div>
                    </div>
                    <div className="flex justify-between space-x-4">
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label="年月日文字サイズ"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="dayTextSize"
                                    onChange={(e) => handleOnChange(e, 1)}
                                >
                                    {fontSizeAttributes.map((field, index) => (
                                        <option value={field.value} key={field.value + '_' + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label="年月日文字太さ"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="dayFontWeight"
                                    onChange={(e) => handleOnChange(e, 1)}
                                >
                                    {fontWeightAttributes.map((field, index) => (
                                        <option value={field.value} key={field.value + '_' + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                    </div>
                    <InputContainer>
                        <Note
                            label="年月日カスタムClass"
                            labelClassName="text-blue-100 text-xs"
                            inputClassName="bg-blue-25 !p-1"
                            height="h-8"
                            name="dayCustomClass"
                            onBlur={(e) => handleOnChange(e, 1)}
                            placeholder="年月日カスタムClass"
                        />
                    </InputContainer>

                    <div className="flex flex-col mb-4">
                        <label className="text-blue-100  text-xs">年月日配色</label>
                        <div className="flex justify-start space-x-4">
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) =>
                                    handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])
                                }
                                inputBoxItem="dayTextColor"
                                pickerLabel="文字色"
                                isBackgroundColor="1"
                                isDefaultColor={initialData?.dayTextColor}
                            />
                        </div>
                    </div>

                    <InputBoxSeparator cProperty={`mt-8 mb-8`} />

                    {/* {B part start} */}

                    <InputContainer>
                        <Note
                            label="スロットWrapカスタムClass"
                            labelClassName="text-blue-100 text-xs"
                            inputClassName="bg-blue-25 !p-1"
                            height="h-8"
                            name="slotRowWrapCustomClass"
                            onBlur={(e) => handleOnChange(e, 1)}
                            placeholder="スロットWrapカスタムClass"
                        />
                    </InputContainer>

                    <div className="flex flex-col mb-4">
                        <label className="text-blue-100  text-xs">[偶数]時間文字色</label>
                        <div className="flex justify-start space-x-4">
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) =>
                                    handleOnChangeColor(
                                        name,
                                        colorCode,
                                        tailwindColorCodeKeys.textColor,
                                        [2, 3],
                                        'default'
                                    )
                                }
                                inputBoxItem="timeTextColorEven"
                                pickerLabel="通常時"
                                isBackgroundColor="1"
                                isDefaultColor={initialData?.timeTextColorEven}
                            />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) =>
                                    handleOnChangeColor(
                                        name,
                                        colorCode,
                                        tailwindColorCodeKeys.textColor,
                                        [2, 3],
                                        'hover'
                                    )
                                }
                                inputBoxItem="timeTextColorEven"
                                pickerLabel="ホバー"
                                isBackgroundColor="1"
                                isDefaultColor={initialData?.timeTextColorEvenHover}
                            />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) =>
                                    handleOnChangeColor(
                                        name,
                                        colorCode,
                                        tailwindColorCodeKeys.textColor,
                                        [2, 3],
                                        'focus'
                                    )
                                }
                                inputBoxItem="timeTextColorEven"
                                pickerLabel="フォーカス"
                                isBackgroundColor="1"
                                isDefaultColor={initialData?.timeTextColorEvenFocus}
                            />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) =>
                                    handleOnChangeColor(
                                        name,
                                        colorCode,
                                        tailwindColorCodeKeys.textColor,
                                        [2, 3],
                                        'active'
                                    )
                                }
                                inputBoxItem="timeTextColorEven"
                                pickerLabel="アクティブ"
                                isBackgroundColor="1"
                                isDefaultColor={initialData?.timeTextColorEvenActive}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-blue-100  text-xs">[偶数]背景色</label>
                        <div className="flex justify-start space-x-4">
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) =>
                                    handleOnChangeColor(
                                        name,
                                        colorCode,
                                        tailwindColorCodeKeys.backgroundColor,
                                        [2, 3],
                                        'default'
                                    )
                                }
                                inputBoxItem="rowBackgroundColorEven"
                                pickerLabel="通常時"
                                isBackgroundColor="1"
                                isDefaultColor={initialData?.rowBackgroundColorEven}
                            />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) =>
                                    handleOnChangeColor(
                                        name,
                                        colorCode,
                                        tailwindColorCodeKeys.backgroundColor,
                                        [2, 3],
                                        'hover'
                                    )
                                }
                                inputBoxItem="rowBackgroundColorEven"
                                pickerLabel="ホバー"
                                isBackgroundColor="1"
                                isDefaultColor={initialData?.rowBackgroundColorEvenHover}
                            />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) =>
                                    handleOnChangeColor(
                                        name,
                                        colorCode,
                                        tailwindColorCodeKeys.backgroundColor,
                                        [2, 3],
                                        'focus'
                                    )
                                }
                                inputBoxItem="rowBackgroundColorEven"
                                pickerLabel="フォーカス"
                                isBackgroundColor="1"
                                isDefaultColor={initialData?.rowBackgroundColorEvenFocus}
                            />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) =>
                                    handleOnChangeColor(
                                        name,
                                        colorCode,
                                        tailwindColorCodeKeys.backgroundColor,
                                        [2, 3],
                                        'active'
                                    )
                                }
                                inputBoxItem="rowBackgroundColorEven"
                                pickerLabel="アクティブ"
                                isBackgroundColor="1"
                                isDefaultColor={initialData?.rowBackgroundColorEvenActive}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-blue-100  text-xs">[奇数]時間文字色</label>
                        <div className="flex justify-start space-x-4">
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) =>
                                    handleOnChangeColor(
                                        name,
                                        colorCode,
                                        tailwindColorCodeKeys.textColor,
                                        [2, 3],
                                        'default'
                                    )
                                }
                                inputBoxItem="timeTextColorOdd"
                                pickerLabel="通常時"
                                isBackgroundColor="1"
                                isDefaultColor={initialData?.timeTextColorOdd}
                            />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) =>
                                    handleOnChangeColor(
                                        name,
                                        colorCode,
                                        tailwindColorCodeKeys.textColor,
                                        [2, 3],
                                        'hover'
                                    )
                                }
                                inputBoxItem="timeTextColorOdd"
                                pickerLabel="ホバー"
                                isBackgroundColor="1"
                                isDefaultColor={initialData?.timeTextColorOddHover}
                            />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) =>
                                    handleOnChangeColor(
                                        name,
                                        colorCode,
                                        tailwindColorCodeKeys.textColor,
                                        [2, 3],
                                        'focus'
                                    )
                                }
                                inputBoxItem="timeTextColorOdd"
                                pickerLabel="フォーカス"
                                isBackgroundColor="1"
                                isDefaultColor={initialData?.timeTextColorOddFocus}
                            />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) =>
                                    handleOnChangeColor(
                                        name,
                                        colorCode,
                                        tailwindColorCodeKeys.textColor,
                                        [2, 3],
                                        'active'
                                    )
                                }
                                inputBoxItem="timeTextColorOdd"
                                pickerLabel="アクティブ"
                                isBackgroundColor="1"
                                isDefaultColor={initialData?.timeTextColorOddActive}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-blue-100  text-xs">[奇数]背景色</label>
                        <div className="flex justify-start space-x-4">
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) =>
                                    handleOnChangeColor(
                                        name,
                                        colorCode,
                                        tailwindColorCodeKeys.backgroundColor,
                                        [2, 3],
                                        'default'
                                    )
                                }
                                inputBoxItem="rowBackgroundColorOdd"
                                pickerLabel="通常時"
                                isBackgroundColor="1"
                                isDefaultColor={initialData?.rowBackgroundColorOdd}
                            />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) =>
                                    handleOnChangeColor(
                                        name,
                                        colorCode,
                                        tailwindColorCodeKeys.backgroundColor,
                                        [2, 3],
                                        'hover'
                                    )
                                }
                                inputBoxItem="rowBackgroundColorOdd"
                                pickerLabel="ホバー"
                                isBackgroundColor="1"
                                isDefaultColor={initialData?.rowBackgroundColorOddHover}
                            />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) =>
                                    handleOnChangeColor(
                                        name,
                                        colorCode,
                                        tailwindColorCodeKeys.backgroundColor,
                                        [2, 3],
                                        'focus'
                                    )
                                }
                                inputBoxItem="rowBackgroundColorOdd"
                                pickerLabel="フォーカス"
                                isBackgroundColor="1"
                                isDefaultColor={initialData?.rowBackgroundColorOddFocus}
                            />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) =>
                                    handleOnChangeColor(
                                        name,
                                        colorCode,
                                        tailwindColorCodeKeys.backgroundColor,
                                        [2, 3],
                                        'active'
                                    )
                                }
                                inputBoxItem="rowBackgroundColorOdd"
                                pickerLabel="アクティブ"
                                isBackgroundColor="1"
                                isDefaultColor={initialData?.rowBackgroundColorOddActive}
                            />
                        </div>
                    </div>

                    <div className="flex justify-between space-x-4">
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label="時間文字サイズ"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="timeTextSize"
                                    onChange={(e) => handleOnChange(e, 1)}
                                >
                                    {fontSizeAttributes.map((field, index) => (
                                        <option value={field.value} key={field.value + '_' + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label="時間文字太さ"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="timeFontWeight"
                                    onChange={(e) => handleOnChange(e, 1)}
                                >
                                    {fontWeightAttributes.map((field, index) => (
                                        <option value={field.value} key={field.value + '_' + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                    </div>

                    <InputContainer>
                        <Note
                            label="時間カスタムClass"
                            labelClassName="text-blue-100 text-xs"
                            inputClassName="bg-blue-25 !p-1"
                            height="h-8"
                            name="timeCustomClass"
                            onBlur={(e) => handleOnChange(e, 1)}
                            placeholder="時間カスタムClass"
                        />
                    </InputContainer>

                    <InputBoxSeparator cProperty={`mt-8 mb-8`} />

                    <div className="flex justify-between space-x-4">
                        <div className="w-1/2">
                            <InputContainer>
                                <TextBox
                                    label="受付不可文言"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="outOfStockText"
                                    onBlur={(e) => handleOnChange(e, 4)}
                                    placeholder="受付不可文言"
                                    type="text"
                                />
                            </InputContainer>
                        </div>
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label="受付不可残数(以下)"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="outOfStockThreshold"
                                    onChange={(e) => handleOnChange(e, 4)}
                                >
                                    {_.range(0, 100).map((x) => (
                                        <option key={x} value={x}>
                                            {x}
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
                                    label="受付不可アイコン1サイズ"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="outOfStockIcon1TextSize"
                                    onChange={(e) => handleOnChange(e, 1)}
                                >
                                    {fontSizeAttributes.map((field, index) => (
                                        <option value={field.value} key={field.value + '_' + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label="受付不可アイコン2サイズ"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="outOfStockIcon2TextSize"
                                    onChange={(e) => handleOnChange(e, 1)}
                                >
                                    {fontSizeAttributes.map((field, index) => (
                                        <option value={field.value} key={field.value + '_' + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                    </div>
                    <InputContainer>
                        <Note
                            label="受付不可カスタムクラス"
                            labelClassName="text-blue-100 text-xs"
                            inputClassName="bg-blue-25 !p-1"
                            height="h-8"
                            name="outOfStockCustomClass"
                            onBlur={(e) => handleOnChange(e, 1)}
                            placeholder="受付不可カスタムクラス"
                        />
                    </InputContainer>

                    <div className="flex flex-col mb-4">
                        <label className="text-blue-100  text-xs">不可アイコン・文字配色設定</label>
                        <div className="flex justify-start space-x-4">
                            <div className="icons">
                                <IconPicker
                                    name="outOfStockSvg1"
                                    value={initialData?.outOfStockSvg1}
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
                                setColorhandle={(_, name, colorCode) =>
                                    handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.fillColor, [1, 2])
                                }
                                inputBoxItem="outOfStockSvg1FillColor"
                                pickerLabel="アイコン1fill色"
                                isBackgroundColor="1"
                                isDefaultColor={initialData?.outOfStockSvg1FillColor}
                            />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) =>
                                    handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.strokeColor, [1, 2])
                                }
                                inputBoxItem="outOfStockSvg1StrokeColor"
                                pickerLabel="アイコン1stroke色"
                                isBackgroundColor="1"
                                isDefaultColor={initialData?.outOfStockSvg1StrokeColor}
                            />

                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) =>
                                    handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])
                                }
                                inputBoxItem="outOfStockTextColor"
                                pickerLabel="文字色"
                                isBackgroundColor="1"
                                isDefaultColor={initialData?.outOfStockTextColor}
                            />
                        </div>
                        <div className="flex justify-start space-x-4 mt-5">
                            <div className="icons">
                                <IconPicker
                                    name="outOfStockSvg2"
                                    value={initialData?.outOfStockSvg2}
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
                                setColorhandle={(_, name, colorCode) =>
                                    handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.fillColor, [1, 2])
                                }
                                inputBoxItem="outOfStockSvg2FillColor"
                                pickerLabel="アイコン2fill色"
                                isBackgroundColor="1"
                                isDefaultColor={initialData?.outOfStockSvg2FillColor}
                            />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) =>
                                    handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.strokeColor, [1, 2])
                                }
                                inputBoxItem="outOfStockSvg2StrokeColor"
                                pickerLabel="アイコン2stroke色"
                                isBackgroundColor="1"
                                isDefaultColor={initialData?.outOfStockSvg2StrokeColor}
                            />
                        </div>
                    </div>

                    <div className="flex justify-between space-x-4">
                        <div className="w-1/2">
                            <InputContainer>
                                <TextBox
                                    label="残り僅か文言"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="lowStockText"
                                    onBlur={(e) => handleOnChange(e, 4)}
                                    placeholder="残り僅か文言"
                                    type="text"
                                />
                            </InputContainer>
                        </div>
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label="残り僅か残数(以下)"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="lowStockThreshold"
                                    onChange={(e) => handleOnChange(e, 4)}
                                >
                                    {_.range(0, 100).map((x) => (
                                        <option key={x} value={x}>
                                            {x}
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
                                    label="残り僅かアイコン1サイズ"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="lowStockIcon1TextSize"
                                    onChange={(e) => handleOnChange(e, 1)}
                                >
                                    {fontSizeAttributes.map((field, index) => (
                                        <option value={field.value} key={field.value + '_' + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label="残り僅かアイコン2サイズ"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="lowStockIcon2TextSize"
                                    onChange={(e) => handleOnChange(e, 1)}
                                >
                                    {fontSizeAttributes.map((field, index) => (
                                        <option value={field.value} key={field.value + '_' + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                    </div>
                    <InputContainer>
                        <Note
                            label="残り僅かカスタムクラス"
                            labelClassName="text-blue-100 text-xs"
                            inputClassName="bg-blue-25 !p-1"
                            height="h-8"
                            name="lowStockCustomClass"
                            onBlur={(e) => handleOnChange(e, 1)}
                            placeholder="残り僅かカスタムクラス"
                        />
                    </InputContainer>

                    <div className="flex flex-col mb-4">
                        <label htmlFor="headerAreaShadow" className="text-blue-100  text-xs">
                            残り僅かアイコン・文字配色設定
                        </label>
                        <div className="flex justify-start space-x-4">
                            <div className="icons">
                                <IconPicker
                                    name="lowStockSvg1"
                                    value={initialData?.lowStockSvg1}
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
                                setColorhandle={(_, name, colorCode) =>
                                    handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.fillColor, [1, 2])
                                }
                                inputBoxItem="lowStockSvg1FillColor"
                                pickerLabel="アイコン1fill色"
                                isBackgroundColor="1"
                                isDefaultColor={initialData?.lowStockSvg1FillColor}
                            />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) =>
                                    handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.strokeColor, [1, 2])
                                }
                                inputBoxItem="lowStockSvg1StrokeColor"
                                pickerLabel="アイコン1stroke色"
                                isBackgroundColor="1"
                                isDefaultColor={initialData?.lowStockSvg1StrokeColor}
                            />

                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) =>
                                    handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])
                                }
                                inputBoxItem="lowStockTextColor"
                                pickerLabel="文字色"
                                isBackgroundColor="1"
                                isDefaultColor={initialData?.lowStockTextColor}
                            />
                        </div>
                        <div className="flex justify-start space-x-4 mt-5">
                            <div className="icons">
                                <IconPicker
                                    name="lowStockSvg2"
                                    value={initialData?.lowStockSvg2}
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
                                setColorhandle={(_, name, colorCode) =>
                                    handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.fillColor, [1, 2])
                                }
                                inputBoxItem="lowStockSvg2FillColor"
                                pickerLabel="アイコン2fill色"
                                isBackgroundColor="1"
                                isDefaultColor={initialData?.lowStockSvg2FillColor}
                            />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) =>
                                    handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.strokeColor, [1, 2])
                                }
                                inputBoxItem="lowStockSvg2StrokeColor"
                                pickerLabel="アイコン2stroke色"
                                isBackgroundColor="1"
                                isDefaultColor={initialData?.lowStockSvg2StrokeColor}
                            />
                        </div>
                    </div>

                    <div className="flex justify-between space-x-4">
                        <div className="w-1/2">
                            <InputContainer>
                                <TextBox
                                    label="受付中文言"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="inStockText"
                                    onBlur={(e) => handleOnChange(e, 4)}
                                    placeholder="受付中文言"
                                    type="text"
                                />
                            </InputContainer>
                        </div>
                        <div className="w-1/2"></div>
                    </div>
                    <div className="flex justify-between space-x-4">
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label="受付中アイコン1サイズ"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="inStockIcon1TextSize"
                                    onChange={(e) => handleOnChange(e, 1)}
                                >
                                    {fontSizeAttributes.map((field, index) => (
                                        <option value={field.value} key={field.value + '_' + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label="受付中アイコン2サイズ"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="inStockIcon2TextSize"
                                    onChange={(e) => handleOnChange(e, 1)}
                                >
                                    {fontSizeAttributes.map((field, index) => (
                                        <option value={field.value} key={field.value + '_' + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                    </div>
                    <InputContainer>
                        <Note
                            label="受付中カスタムクラス"
                            labelClassName="text-blue-100 text-xs"
                            inputClassName="bg-blue-25 !p-1"
                            height="h-8"
                            name="inStockCustomClass"
                            onBlur={(e) => handleOnChange(e, 1)}
                            placeholder="受付中カスタムクラス"
                        />
                    </InputContainer>

                    <div className="flex flex-col mb-4">
                        <label htmlFor="headerAreaShadow" className="text-blue-100  text-xs">
                            受付中アイコン・文字配色設定
                        </label>
                        <div className="flex justify-start space-x-4">
                            <div className="icons">
                                <IconPicker
                                    name="inStockSvg1"
                                    value={initialData?.inStockSvg1}
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
                                setColorhandle={(_, name, colorCode) =>
                                    handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.fillColor, [1, 2])
                                }
                                inputBoxItem="inStockSvg1FillColor"
                                pickerLabel="アイコン1fill色"
                                isBackgroundColor="1"
                                isDefaultColor={initialData?.inStockSvg1FillColor}
                            />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) =>
                                    handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.strokeColor, [1, 2])
                                }
                                inputBoxItem="inStockSvg1StrokeColor"
                                pickerLabel="アイコン1stroke色"
                                isBackgroundColor="1"
                                isDefaultColor={initialData?.inStockSvg1StrokeColor}
                            />

                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) =>
                                    handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])
                                }
                                inputBoxItem="inStockTextColor"
                                pickerLabel="文字色"
                                isBackgroundColor="1"
                                isDefaultColor={initialData?.inStockTextColor}
                            />
                        </div>
                        <div className="flex justify-start space-x-4 mt-5">
                            <div className="icons">
                                <IconPicker
                                    name="inStockSvg2"
                                    value={initialData?.inStockSvg2}
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
                                setColorhandle={(_, name, colorCode) =>
                                    handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.fillColor, [1, 2])
                                }
                                inputBoxItem="inStockSvg2FillColor"
                                pickerLabel="アイコン2fill色"
                                isBackgroundColor="1"
                                isDefaultColor={initialData?.inStockSvg2FillColor}
                            />
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) =>
                                    handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.strokeColor, [1, 2])
                                }
                                inputBoxItem="inStockSvg2StrokeColor"
                                pickerLabel="アイコン2stroke色"
                                isBackgroundColor="1"
                                isDefaultColor={initialData?.inStockSvg2StrokeColor}
                            />
                        </div>
                    </div>

                    <div className="flex justify-between space-x-4">
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label="受付状況文字サイズ"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="stockStatusTextSize"
                                    onChange={(e) => handleOnChange(e, 1)}
                                >
                                    {fontSizeAttributes.map((field, index) => (
                                        <option value={field.value} key={field.value + '_' + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label="受付状況文字太さ"
                                    labelClassName="text-blue-100 text-xs"
                                    inputClassName="bg-blue-25"
                                    name="stockStatusFontWeight"
                                    onChange={(e) => handleOnChange(e, 1)}
                                >
                                    {fontWeightAttributes.map((field, index) => (
                                        <option value={field.value} key={field.value + '_' + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                    </div>
                    <InputContainer>
                        <Note
                            label="受付状況文字カスタムClass"
                            labelClassName="text-blue-100 text-xs"
                            inputClassName="bg-blue-25 !p-1"
                            height="h-8"
                            name="stockStatusCustomClass"
                            onBlur={(e) => handleOnChange(e, 1)}
                            placeholder="受付状況文字カスタムClass"
                        />
                    </InputContainer>
                </Form>
            </div>
        </Formik>
    );
};
export default Slot1FormSettings;
