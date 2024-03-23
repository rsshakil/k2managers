import { useRecoilState } from "recoil";
import SelectBox from "../../Form/FormInputs/SelectBox";
import TextBox from "../../Form/FormInputs/TextBox";
import InputContainer from "../../Wrapper/InputContainer";

import { Form, Formik } from "formik";
import React from "react";
import ColorPickerWithRecent from "../../ColorPicker/ColorPickerWithRecent";
import InputBoxSeparator from '../../InputBoxSeparator/InputBoxSeparator';


import {
    borderAttributes, borderRadiousAttributes, borderStyles, divideStyleAttributes, divideXWithAttributes, fontSizeAttributes, fontWeightAttributes, marginXAttributes, paddingXAttributes,
    paddingYAttributes, shadowAttributes
} from "../../../lib/tailwindClassAttributes";
import { appDesignerState } from "../../../store/recoil/appDesignerState";



const InstituteSelection1SettingsForm = ({ formData: initialData, handleOnChange, handleOnChangeColor = () => { }, tailwindColorCodeKeys }) => {
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

    return (

        <Formik
            validateOnChange={false}
            validateOnBlur={false}
            enableReinitialize={true}
            initialValues={initialData}
        >
            <div className='relative w-full'>
                <Form>
                    <div>
                        <div className="flex justify-between space-x-4">
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='会場エリア角丸サイズ：無指定'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='default.instituteBorderRadius'
                                        onChange={(e) => handleOnChangePrefix(e, 'default')}>
                                        {borderRadiousAttributes.length > 0 &&
                                            borderRadiousAttributes.map((field, index) => (
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
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='会場エリア角丸サイズ：640px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='sm.instituteBorderRadius'
                                        onChange={(e) => handleOnChangePrefix(e, 'sm')}>
                                        {borderRadiousAttributes.length > 0 &&
                                            borderRadiousAttributes.map((field, index) => (
                                                <option
                                                    value={`sm:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='会場エリア角丸サイズ：768px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='md.instituteBorderRadius'
                                        onChange={(e) => handleOnChangePrefix(e, 'md')}>
                                        {borderRadiousAttributes.length > 0 &&
                                            borderRadiousAttributes.map((field, index) => (
                                                <option
                                                    value={`md:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                        </div>
                        <div className="flex justify-between mt-4 mb-12 space-x-4">
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='会場エリア角丸サイズ：1024px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='lg.instituteBorderRadius'
                                        onChange={(e) => handleOnChangePrefix(e, 'lg')}>
                                        {borderRadiousAttributes.length > 0 &&
                                            borderRadiousAttributes.map((field, index) => (
                                                <option
                                                    value={`lg:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='会場エリア角丸サイズ：1280px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='xl.instituteBorderRadius'
                                        onChange={(e) => handleOnChangePrefix(e, 'xl')}>
                                        {borderRadiousAttributes.length > 0 &&
                                            borderRadiousAttributes.map((field, index) => (
                                                <option
                                                    value={`xl:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='会場エリア角丸サイズ：1536px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='2xl.instituteBorderRadius'
                                        onChange={(e) => handleOnChangePrefix(e, '2xl')}>
                                        {borderRadiousAttributes.length > 0 &&
                                            borderRadiousAttributes.map((field, index) => (
                                                <option
                                                    value={`2xl:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                        </div>

                        <div className="flex justify-between space-x-4">
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='会場エリア枠線：無指定'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='default.instituteBorderWidth'
                                        onChange={(e) => handleOnChangePrefix(e, 'default')}>
                                        {borderAttributes.length > 0 &&
                                            borderAttributes.map((field, index) => (
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
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='会場エリア枠線：640px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='sm.instituteBorderWidth'
                                        onChange={(e) => handleOnChangePrefix(e, 'sm')}>
                                        {borderAttributes.length > 0 &&
                                            borderAttributes.map((field, index) => (
                                                <option
                                                    value={`sm:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='会場エリア枠線：768px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='md.instituteBorderWidth'
                                        onChange={(e) => handleOnChangePrefix(e, 'md')}>
                                        {borderAttributes.length > 0 &&
                                            borderAttributes.map((field, index) => (
                                                <option
                                                    value={`md:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                        </div>
                        <div className="flex justify-between mt-4 mb-12 space-x-4">
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='会場エリア枠線：1024px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='lg.instituteBorderWidth'
                                        onChange={(e) => handleOnChangePrefix(e, 'lg')}>
                                        {borderAttributes.length > 0 &&
                                            borderAttributes.map((field, index) => (
                                                <option
                                                    value={`lg:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='会場エリア枠線：1280px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='xl.instituteBorderWidth'
                                        onChange={(e) => handleOnChangePrefix(e, 'xl')}>
                                        {borderAttributes.length > 0 &&
                                            borderAttributes.map((field, index) => (
                                                <option
                                                    value={`xl:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='会場エリア枠線：1536px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='2xl.instituteBorderWidth'
                                        onChange={(e) => handleOnChangePrefix(e, '2xl')}>
                                        {borderAttributes.length > 0 &&
                                            borderAttributes.map((field, index) => (
                                                <option
                                                    value={`2xl:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                        </div>

                        <div className="flex justify-between space-x-4">
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='会場エリア枠線種類：無指定'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='default.instituteBorderStyle'
                                        onChange={(e) => handleOnChangePrefix(e, 'default')}>
                                        {borderStyles.length > 0 &&
                                            borderStyles.map((field, index) => (
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
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='会場エリア枠線種類：640px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='sm.instituteBorderStyle'
                                        onChange={(e) => handleOnChangePrefix(e, 'sm')}>
                                        {borderStyles.length > 0 &&
                                            borderStyles.map((field, index) => (
                                                <option
                                                    value={`sm:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='会場エリア枠線種類：768px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='md.instituteBorderStyle'
                                        onChange={(e) => handleOnChangePrefix(e, 'md')}>
                                        {borderStyles.length > 0 &&
                                            borderStyles.map((field, index) => (
                                                <option
                                                    value={`md:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                        </div>
                        <div className="flex justify-between mt-4 mb-12 space-x-4">
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='会場エリア枠線種類：1024px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='lg.instituteBorderStyle'
                                        onChange={(e) => handleOnChangePrefix(e, 'lg')}>
                                        {borderStyles.length > 0 &&
                                            borderStyles.map((field, index) => (
                                                <option
                                                    value={`lg:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='会場エリア枠線種類：1280px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='xl.instituteBorderStyle'
                                        onChange={(e) => handleOnChangePrefix(e, 'xl')}>
                                        {borderStyles.length > 0 &&
                                            borderStyles.map((field, index) => (
                                                <option
                                                    value={`xl:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='会場エリア枠線種類：1536px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='2xl.instituteBorderStyle'
                                        onChange={(e) => handleOnChangePrefix(e, '2xl')}>
                                        {borderStyles.length > 0 &&
                                            borderStyles.map((field, index) => (
                                                <option
                                                    value={`2xl:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                        </div>

                        <div className="flex justify-between space-x-4">
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='会場エリア左右間隔：無指定'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='default.instituteMarginX'
                                        onChange={(e) => handleOnChangePrefix(e, 'default')}>
                                        {marginXAttributes.length > 0 &&
                                            marginXAttributes.map((field, index) => (
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
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='会場エリア左右間隔：640px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='sm.instituteMarginX'
                                        onChange={(e) => handleOnChangePrefix(e, 'sm')}>
                                        {marginXAttributes.length > 0 &&
                                            marginXAttributes.map((field, index) => (
                                                <option
                                                    value={`sm:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='会場エリア左右間隔：768px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='md.instituteMarginX'
                                        onChange={(e) => handleOnChangePrefix(e, 'md')}>
                                        {marginXAttributes.length > 0 &&
                                            marginXAttributes.map((field, index) => (
                                                <option
                                                    value={`md:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                        </div>
                        <div className="flex justify-between mt-4 mb-12 space-x-4">
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='会場エリア左右間隔：1024px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='lg.instituteMarginX'
                                        onChange={(e) => handleOnChangePrefix(e, 'lg')}>
                                        {marginXAttributes.length > 0 &&
                                            marginXAttributes.map((field, index) => (
                                                <option
                                                    value={`lg:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='会場エリア左右間隔：1280px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='xl.instituteMarginX'
                                        onChange={(e) => handleOnChangePrefix(e, 'xl')}>
                                        {marginXAttributes.length > 0 &&
                                            marginXAttributes.map((field, index) => (
                                                <option
                                                    value={`xl:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='会場エリア左右間隔：1536px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='2xl.instituteMarginX'
                                        onChange={(e) => handleOnChangePrefix(e, '2xl')}>
                                        {marginXAttributes.length > 0 &&
                                            marginXAttributes.map((field, index) => (
                                                <option
                                                    value={`2xl:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                        </div>

                        <div className="flex justify-between space-x-4">
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='会場エリア影：無指定'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='default.instituteBoxShadow'
                                        onChange={(e) => handleOnChangePrefix(e, 'default')}>
                                        {shadowAttributes.length > 0 &&
                                            shadowAttributes.map((field, index) => (
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
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='会場エリア影：640px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='sm.instituteBoxShadow'
                                        onChange={(e) => handleOnChangePrefix(e, 'sm')}>
                                        {shadowAttributes.length > 0 &&
                                            shadowAttributes.map((field, index) => (
                                                <option
                                                    value={`sm:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='会場エリア影：768px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='md.instituteBoxShadow'
                                        onChange={(e) => handleOnChangePrefix(e, 'md')}>
                                        {shadowAttributes.length > 0 &&
                                            shadowAttributes.map((field, index) => (
                                                <option
                                                    value={`md:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                        </div>
                        <div className="flex justify-between mt-4 mb-12 space-x-4">
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='会場エリア影：1024px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='lg.instituteBoxShadow'
                                        onChange={(e) => handleOnChangePrefix(e, 'lg')}>
                                        {shadowAttributes.length > 0 &&
                                            shadowAttributes.map((field, index) => (
                                                <option
                                                    value={`lg:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='会場エリア影：1280px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='xl.instituteBoxShadow'
                                        onChange={(e) => handleOnChangePrefix(e, 'xl')}>
                                        {shadowAttributes.length > 0 &&
                                            shadowAttributes.map((field, index) => (
                                                <option
                                                    value={`xl:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='会場エリア影：1536px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='2xl.instituteBoxShadow'
                                        onChange={(e) => handleOnChangePrefix(e, '2xl')}>
                                        {shadowAttributes.length > 0 &&
                                            shadowAttributes.map((field, index) => (
                                                <option
                                                    value={`2xl:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                        </div>
                        <InputContainer>
                            <SelectBox
                                label='会場エリア分割線'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='instituteDivideWidthX'
                                onChange={(e) => handleOnChange(e, 1)}>
                                {divideXWithAttributes.length > 0 &&
                                    divideXWithAttributes.map((field, index) => (
                                        <option
                                            value={field.value}
                                            key={field.value + "_" + index}>
                                            {field.caption}
                                        </option>
                                    )
                                    )}
                            </SelectBox>
                        </InputContainer>
                        <InputContainer>
                            <SelectBox
                                label='会場エリア分割線種別'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='instituteDivideStyle'
                                onChange={(e) => handleOnChange(e, 1)}>
                                {divideStyleAttributes.length > 0 &&
                                    divideStyleAttributes.map((field, index) => (
                                        <option
                                            value={field.value}
                                            key={field.value + "_" + index}>
                                            {field.caption}
                                        </option>
                                    )
                                    )}
                            </SelectBox>
                        </InputContainer>

                        <div className="flex flex-col mb-4">
                            <label htmlFor="headerAreaShadow" className="text-blue-100  text-xs">線配色</label>
                            <div className="flex justify-start space-x-4">
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.borderColor, [1, 2])}
                                    inputBoxItem="instituteBorderColor" pickerLabel="外枠線色" isBackgroundColor="1"
                                    isDefaultColor={initialData?.instituteBorderColor} />
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.borderColor, [1, 2])}
                                    inputBoxItem="instituteDivideColor" pickerLabel="分割線色" isBackgroundColor="1"
                                    isDefaultColor={initialData?.instituteDivideColor} />
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.shadowColor, [1, 2])}
                                    inputBoxItem="instituteBoxShadowColor" pickerLabel="影色" isBackgroundColor="1"
                                    isDefaultColor={initialData?.instituteBoxShadowColor} />
                            </div>
                        </div>



                        <InputContainer>
                            <TextBox label="会場エリアWrapカスタムClass"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='instituteWrapCustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                // maxLength='32'
                                placeholder='カスタムClass'
                                type="text" />
                        </InputContainer>



                        <InputBoxSeparator cProperty={`mt-8 mb-8`} />

                        <InputContainer>
                            <SelectBox
                                label='ヘッダータイトル文字サイズ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='headerTitleTextSize'
                                onChange={(e) => handleOnChange(e, 1)}>
                                {fontSizeAttributes.length > 0 &&
                                    fontSizeAttributes.map((field, index) => (
                                        <option
                                            value={field.value}
                                            key={field.value + "_" + index}>
                                            {field.caption}
                                        </option>
                                    )
                                    )}
                            </SelectBox>
                        </InputContainer>

                        <InputContainer>
                            <SelectBox
                                label='ヘッダータイトル文字太さ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='headerTitleFontWeight'
                                onChange={(e) => handleOnChange(e, 1)}>
                                {fontWeightAttributes.length > 0 &&
                                    fontWeightAttributes.map((field, index) => (
                                        <option
                                            value={field.value}
                                            key={field.value + "_" + index}>
                                            {field.caption}
                                        </option>
                                    )
                                    )}
                            </SelectBox>
                        </InputContainer>

                        <InputContainer>
                            <TextBox label="ヘッダータイトルカスタムClass"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='headerTitleCustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                // maxLength='32'
                                placeholder='カスタムClass'
                                type="text" />
                        </InputContainer>


                        <InputContainer>
                            <SelectBox
                                label='ヘッダー説明文字サイズ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='headerExplanationTextSize'
                                onChange={(e) => handleOnChange(e, 1)}>
                                {fontSizeAttributes.length > 0 &&
                                    fontSizeAttributes.map((field, index) => (
                                        <option
                                            value={field.value}
                                            key={field.value + "_" + index}>
                                            {field.caption}
                                        </option>
                                    )
                                    )}
                            </SelectBox>
                        </InputContainer>

                        <InputContainer>
                            <SelectBox
                                label='ヘッダー説明文字太さ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='headerExplanationFontWeight'
                                onChange={(e) => handleOnChange(e, 1)}>
                                {fontWeightAttributes.length > 0 &&
                                    fontWeightAttributes.map((field, index) => (
                                        <option
                                            value={field.value}
                                            key={field.value + "_" + index}>
                                            {field.caption}
                                        </option>
                                    )
                                    )}
                            </SelectBox>
                        </InputContainer>

                        <InputContainer>
                            <TextBox label="ヘッダー説明カスタムClass"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='headerExplanationCustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                // maxLength='32'
                                placeholder='カスタムClass'
                                type="text" />
                        </InputContainer>

                        <InputContainer>
                            <TextBox label="ヘッダーエリアWrapカスタムClass"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='headerWrapCustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                // maxLength='32'
                                placeholder='カスタムClass'
                                type="text" />
                        </InputContainer>

                        <div className="flex flex-col mb-4">
                            <label htmlFor="headerAreaShadow" className="text-blue-100  text-xs">ヘッダー配色</label>
                            <div className="flex justify-start space-x-4">
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])}
                                    inputBoxItem="headerTitleTextColor" pickerLabel="タイトル文字色" isBackgroundColor="1"
                                    isDefaultColor={initialData?.headerTitleTextColor} />
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])}
                                    inputBoxItem="headerExplanationTextColor" pickerLabel="説明文字色" isBackgroundColor="1"
                                    isDefaultColor={initialData?.headerExplanationTextColor} />
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [1, 2])}
                                    inputBoxItem="headerBackgroundColor" pickerLabel="ヘッダーエリア背景色" isBackgroundColor="1"
                                    isDefaultColor={initialData?.headerBackgroundColor} />
                            </div>
                        </div>

                        <InputBoxSeparator cProperty={`mt-8 mb-8`} />

                        <InputContainer>
                            <TextBox label="会場選択文言"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='destinationText'
                                onBlur={(e) => handleOnChange(e, 4)}
                                placeholder=''
                                type="text" />
                        </InputContainer>


                        <div className="flex flex-col mb-4">
                            <label htmlFor="headerAreaShadow" className="text-blue-100  text-xs">会場選択エリア配色</label>
                            <div className="flex justify-start space-x-4">
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [1, 2])}
                                    inputBoxItem="selectionAreaBackgroundColor" pickerLabel="会場選択エリア背景色" isBackgroundColor="1"
                                    isDefaultColor={initialData?.selectionAreaBackgroundColor} />

                            </div>
                        </div>

                        <InputBoxSeparator cProperty={`mt-8 mb-8`} />

                        <div className="flex justify-between space-x-4">
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='会場情報左右余白：無指定'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='default.instituteInfoPaddingX'
                                        onChange={(e) => handleOnChangePrefix(e, 'default')}>
                                        {paddingXAttributes.length > 0 &&
                                            paddingXAttributes.map((field, index) => (
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
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='会場情報左右余白：640px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='sm.instituteInfoPaddingX'
                                        onChange={(e) => handleOnChangePrefix(e, 'sm')}>
                                        {paddingXAttributes.length > 0 &&
                                            paddingXAttributes.map((field, index) => (
                                                <option
                                                    value={`sm:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='会場情報左右余白：768px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='md.instituteInfoPaddingX'
                                        onChange={(e) => handleOnChangePrefix(e, 'md')}>
                                        {paddingXAttributes.length > 0 &&
                                            paddingXAttributes.map((field, index) => (
                                                <option
                                                    value={`md:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                        </div>
                        <div className="flex justify-between mt-4 mb-12 space-x-4">
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='会場情報左右余白：1024px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='lg.instituteInfoPaddingX'
                                        onChange={(e) => handleOnChangePrefix(e, 'lg')}>
                                        {paddingXAttributes.length > 0 &&
                                            paddingXAttributes.map((field, index) => (
                                                <option
                                                    value={`lg:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='会場情報左右余白：1280px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='xl.instituteInfoPaddingX'
                                        onChange={(e) => handleOnChangePrefix(e, 'xl')}>
                                        {paddingXAttributes.length > 0 &&
                                            paddingXAttributes.map((field, index) => (
                                                <option
                                                    value={`xl:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='会場情報左右余白：1536px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='2xl.instituteInfoPaddingX'
                                        onChange={(e) => handleOnChangePrefix(e, '2xl')}>
                                        {paddingXAttributes.length > 0 &&
                                            paddingXAttributes.map((field, index) => (
                                                <option
                                                    value={`2xl:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                        </div>

                        <div className="flex justify-between space-x-4">
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='会場情報上下余白：無指定'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='default.instituteInfoPaddingY'
                                        onChange={(e) => handleOnChangePrefix(e, 'default')}>
                                        {paddingYAttributes.length > 0 &&
                                            paddingYAttributes.map((field, index) => (
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
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='会場情報上下余白：640px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='sm.instituteInfoPaddingY'
                                        onChange={(e) => handleOnChangePrefix(e, 'sm')}>
                                        {paddingYAttributes.length > 0 &&
                                            paddingYAttributes.map((field, index) => (
                                                <option
                                                    value={`sm:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='会場情報上下余白：768px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='md.instituteInfoPaddingY'
                                        onChange={(e) => handleOnChangePrefix(e, 'md')}>
                                        {paddingYAttributes.length > 0 &&
                                            paddingYAttributes.map((field, index) => (
                                                <option
                                                    value={`md:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                        </div>
                        <div className="flex justify-between mt-4 mb-12 space-x-4">
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='会場情報上下余白：1024px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='lg.instituteInfoPaddingY'
                                        onChange={(e) => handleOnChangePrefix(e, 'lg')}>
                                        {paddingYAttributes.length > 0 &&
                                            paddingYAttributes.map((field, index) => (
                                                <option
                                                    value={`lg:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='会場情報上下余白：1280px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='xl.instituteInfoPaddingY'
                                        onChange={(e) => handleOnChangePrefix(e, 'xl')}>
                                        {paddingYAttributes.length > 0 &&
                                            paddingYAttributes.map((field, index) => (
                                                <option
                                                    value={`xl:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='会場情報上下余白：1536px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='2xl.instituteInfoPaddingY'
                                        onChange={(e) => handleOnChangePrefix(e, '2xl')}>
                                        {paddingYAttributes.length > 0 &&
                                            paddingYAttributes.map((field, index) => (
                                                <option
                                                    value={`2xl:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                        </div>

                        <InputContainer>
                            <TextBox label="歯科健診文言"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='dentalCheckText'
                                onBlur={(e) => handleOnChange(e, 4)}
                                // maxLength='32'
                                placeholder=''
                                type="text" />
                        </InputContainer>

                        <InputContainer>
                            <SelectBox
                                label='歯科健診角丸サイズ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='dentalCheckBorderRadius'
                                onChange={(e) => handleOnChange(e, 1)}>
                                {borderRadiousAttributes.length > 0 &&
                                    borderRadiousAttributes.map((field, index) => (
                                        <option
                                            value={field.value}
                                            key={field.value + "_" + index}>
                                            {field.caption}
                                        </option>
                                    )
                                    )}
                            </SelectBox>
                        </InputContainer>
                        <InputContainer>
                            <SelectBox
                                label='歯科健診文字サイズ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='dentalCheckTextSize'
                                onChange={(e) => handleOnChange(e, 1)}>
                                {fontSizeAttributes.length > 0 &&
                                    fontSizeAttributes.map((field, index) => (
                                        <option
                                            value={field.value}
                                            key={field.value + "_" + index}>
                                            {field.caption}
                                        </option>
                                    )
                                    )}
                            </SelectBox>
                        </InputContainer>
                        <InputContainer>
                            <SelectBox
                                label='歯科健診文字太さ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='dentalCheckFontWeight'
                                onChange={(e) => handleOnChange(e, 1)}>
                                {fontWeightAttributes.length > 0 &&
                                    fontWeightAttributes.map((field, index) => (
                                        <option
                                            value={field.value}
                                            key={field.value + "_" + index}>
                                            {field.caption}
                                        </option>
                                    )
                                    )}
                            </SelectBox>
                        </InputContainer>
                        <InputContainer>
                            <TextBox label="歯科健診カスタムClass"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='dentalCheckCustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                // maxLength='32'
                                placeholder='スタムClass'
                                type="text" />
                        </InputContainer>


                        <div className="flex flex-col mb-4">
                            <label htmlFor="headerAreaShadow" className="text-blue-100  text-xs">歯科健診配色</label>
                            <div className="flex justify-start space-x-4">
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])}
                                    inputBoxItem="dentalCheckTextColor" pickerLabel="文字色" isBackgroundColor="1"
                                    isDefaultColor={initialData?.dentalCheckTextColor} />
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [1, 2])}
                                    inputBoxItem="dentalCheckBackgroundColor" pickerLabel="歯科健診背景色" isBackgroundColor="1"
                                    isDefaultColor={initialData?.dentalCheckBackgroundColor} />


                            </div>
                        </div>

                        <div className="flex justify-between space-x-4">
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='会場名文字サイズ：無指定'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='default.instituteNameTextSize'
                                        onChange={(e) => handleOnChangePrefix(e, 'default')}>
                                        {fontSizeAttributes.length > 0 &&
                                            fontSizeAttributes.map((field, index) => (
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
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='会場名文字サイズ：640px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='sm.instituteNameTextSize'
                                        onChange={(e) => handleOnChangePrefix(e, 'sm')}>
                                        {fontSizeAttributes.length > 0 &&
                                            fontSizeAttributes.map((field, index) => (
                                                <option
                                                    value={`sm:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='会場名文字サイズ：768px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='md.instituteNameTextSize'
                                        onChange={(e) => handleOnChangePrefix(e, 'md')}>
                                        {fontSizeAttributes.length > 0 &&
                                            fontSizeAttributes.map((field, index) => (
                                                <option
                                                    value={`md:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                        </div>
                        <div className="flex justify-between mt-4 mb-12 space-x-4">
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='会場名文字サイズ：1024px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='lg.instituteNameTextSize'
                                        onChange={(e) => handleOnChangePrefix(e, 'lg')}>
                                        {fontSizeAttributes.length > 0 &&
                                            fontSizeAttributes.map((field, index) => (
                                                <option
                                                    value={`lg:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='会場名文字サイズ：1280px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='xl.instituteNameTextSize'
                                        onChange={(e) => handleOnChangePrefix(e, 'xl')}>
                                        {fontSizeAttributes.length > 0 &&
                                            fontSizeAttributes.map((field, index) => (
                                                <option
                                                    value={`xl:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='会場名文字サイズ：1536px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='2xl.instituteNameTextSize'
                                        onChange={(e) => handleOnChangePrefix(e, '2xl')}>
                                        {fontSizeAttributes.length > 0 &&
                                            fontSizeAttributes.map((field, index) => (
                                                <option
                                                    value={`2xl:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                        </div>

                        <div className="flex justify-between space-x-4">
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='会場名文字太さ：無指定'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='default.instituteNameTextWeight'
                                        onChange={(e) => handleOnChangePrefix(e, 'default')}>
                                        {fontWeightAttributes.length > 0 &&
                                            fontWeightAttributes.map((field, index) => (
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
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='会場名文字太さ：640px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='sm.instituteNameTextWeight'
                                        onChange={(e) => handleOnChangePrefix(e, 'sm')}>
                                        {fontWeightAttributes.length > 0 &&
                                            fontWeightAttributes.map((field, index) => (
                                                <option
                                                    value={`sm:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='会場名文字太さ：768px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='md.instituteNameTextWeight'
                                        onChange={(e) => handleOnChangePrefix(e, 'md')}>
                                        {fontWeightAttributes.length > 0 &&
                                            fontWeightAttributes.map((field, index) => (
                                                <option
                                                    value={`md:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                        </div>
                        <div className="flex justify-between mt-4 mb-12 space-x-4">
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='会場名文字太さ：1024px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='lg.instituteNameTextWeight'
                                        onChange={(e) => handleOnChangePrefix(e, 'lg')}>
                                        {fontWeightAttributes.length > 0 &&
                                            fontWeightAttributes.map((field, index) => (
                                                <option
                                                    value={`lg:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='会場名文字太さ：1280px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='xl.instituteNameTextWeight'
                                        onChange={(e) => handleOnChangePrefix(e, 'xl')}>
                                        {fontWeightAttributes.length > 0 &&
                                            fontWeightAttributes.map((field, index) => (
                                                <option
                                                    value={`xl:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='会場名文字太さ：1536px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='2xl.instituteNameTextWeight'
                                        onChange={(e) => handleOnChangePrefix(e, '2xl')}>
                                        {fontWeightAttributes.length > 0 &&
                                            fontWeightAttributes.map((field, index) => (
                                                <option
                                                    value={`2xl:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                        </div>

                        <div className="flex flex-col mb-4">
                            <label htmlFor="headerAreaShadow" className="text-blue-100  text-xs">会場名配色</label>
                            <div className="flex justify-start space-x-4">
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])}
                                    inputBoxItem="instituteNameTextColor" pickerLabel="文字色" isBackgroundColor="1"
                                    isDefaultColor={initialData?.instituteNameTextColor} />



                            </div>
                        </div>
                        <InputContainer>
                            <TextBox label="会場名カスタムClass"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='instituteNameCustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                // maxLength='32'
                                placeholder='スタムClass'
                                type="text" />
                        </InputContainer>

                        <div className="flex justify-between space-x-4">
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='会場住所文字サイズ：無指定'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='default.instituteAddressTextSize'
                                        onChange={(e) => handleOnChangePrefix(e, 'default')}>
                                        {fontSizeAttributes.length > 0 &&
                                            fontSizeAttributes.map((field, index) => (
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
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='会場住所文字サイズ：640px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='sm.instituteAddressTextSize'
                                        onChange={(e) => handleOnChangePrefix(e, 'sm')}>
                                        {fontSizeAttributes.length > 0 &&
                                            fontSizeAttributes.map((field, index) => (
                                                <option
                                                    value={`sm:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='会場住所文字サイズ：768px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='md.instituteAddressTextSize'
                                        onChange={(e) => handleOnChangePrefix(e, 'md')}>
                                        {fontSizeAttributes.length > 0 &&
                                            fontSizeAttributes.map((field, index) => (
                                                <option
                                                    value={`md:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                        </div>
                        <div className="flex justify-between mt-4 mb-12 space-x-4">
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='会場住所文字サイズ：1024px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='lg.instituteAddressTextSize'
                                        onChange={(e) => handleOnChangePrefix(e, 'lg')}>
                                        {fontSizeAttributes.length > 0 &&
                                            fontSizeAttributes.map((field, index) => (
                                                <option
                                                    value={`lg:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='会場住所文字サイズ：1280px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='xl.instituteAddressTextSize'
                                        onChange={(e) => handleOnChangePrefix(e, 'xl')}>
                                        {fontSizeAttributes.length > 0 &&
                                            fontSizeAttributes.map((field, index) => (
                                                <option
                                                    value={`xl:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='会場住所文字サイズ：1536px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='2xl.instituteAddressTextSize'
                                        onChange={(e) => handleOnChangePrefix(e, '2xl')}>
                                        {fontSizeAttributes.length > 0 &&
                                            fontSizeAttributes.map((field, index) => (
                                                <option
                                                    value={`2xl:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                        </div>

                        <div className="flex justify-between space-x-4">
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='会場住所文字太さ：無指定'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='default.instituteAddressTextWeight'
                                        onChange={(e) => handleOnChangePrefix(e, 'default')}>
                                        {fontWeightAttributes.length > 0 &&
                                            fontWeightAttributes.map((field, index) => (
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
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='会場住所文字太さ：640px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='sm.instituteAddressTextWeight'
                                        onChange={(e) => handleOnChangePrefix(e, 'sm')}>
                                        {fontWeightAttributes.length > 0 &&
                                            fontWeightAttributes.map((field, index) => (
                                                <option
                                                    value={`sm:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='会場住所文字太さ：768px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='md.instituteAddressTextWeight'
                                        onChange={(e) => handleOnChangePrefix(e, 'md')}>
                                        {fontWeightAttributes.length > 0 &&
                                            fontWeightAttributes.map((field, index) => (
                                                <option
                                                    value={`md:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                        </div>
                        <div className="flex justify-between mt-4 mb-12 space-x-4">
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='会場住所文字太さ：1024px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='lg.instituteAddressTextWeight'
                                        onChange={(e) => handleOnChangePrefix(e, 'lg')}>
                                        {fontWeightAttributes.length > 0 &&
                                            fontWeightAttributes.map((field, index) => (
                                                <option
                                                    value={`lg:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='会場住所文字太さ：1280px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='xl.instituteAddressTextWeight'
                                        onChange={(e) => handleOnChangePrefix(e, 'xl')}>
                                        {fontWeightAttributes.length > 0 &&
                                            fontWeightAttributes.map((field, index) => (
                                                <option
                                                    value={`xl:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='会場住所文字太さ：1536px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='2xl.instituteAddressTextWeight'
                                        onChange={(e) => handleOnChangePrefix(e, '2xl')}>
                                        {fontWeightAttributes.length > 0 &&
                                            fontWeightAttributes.map((field, index) => (
                                                <option
                                                    value={`2xl:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                        </div>

                        <div className="flex flex-col mb-4">
                            <label htmlFor="headerAreaShadow" className="text-blue-100  text-xs">会場住所配色</label>
                            <div className="flex justify-start space-x-4">
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])}
                                    inputBoxItem="instituteAddressTextColor" pickerLabel="文字色" isBackgroundColor="1"
                                    isDefaultColor={initialData?.instituteAddressTextColor} />



                            </div>
                        </div>
                        <InputContainer>
                            <TextBox label="会場住所カスタムClass"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='instituteAddressCustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                // maxLength='32'
                                placeholder='スタムClass'
                                type="text" />
                        </InputContainer>

                        <div className="flex justify-between space-x-4">
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='選択文字サイズ：無指定'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='default.selectionTextSize'
                                        onChange={(e) => handleOnChangePrefix(e, 'default')}>
                                        {fontSizeAttributes.length > 0 &&
                                            fontSizeAttributes.map((field, index) => (
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
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='選択文字サイズ：640px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='sm.selectionTextSize'
                                        onChange={(e) => handleOnChangePrefix(e, 'sm')}>
                                        {fontSizeAttributes.length > 0 &&
                                            fontSizeAttributes.map((field, index) => (
                                                <option
                                                    value={`sm:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='選択文字サイズ：768px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='md.selectionTextSize'
                                        onChange={(e) => handleOnChangePrefix(e, 'md')}>
                                        {fontSizeAttributes.length > 0 &&
                                            fontSizeAttributes.map((field, index) => (
                                                <option
                                                    value={`md:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                        </div>
                        <div className="flex justify-between mt-4 mb-12 space-x-4">
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='選択文字サイズ：1024px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='lg.selectionTextSize'
                                        onChange={(e) => handleOnChangePrefix(e, 'lg')}>
                                        {fontSizeAttributes.length > 0 &&
                                            fontSizeAttributes.map((field, index) => (
                                                <option
                                                    value={`lg:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='選択文字サイズ：1280px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='xl.selectionTextSize'
                                        onChange={(e) => handleOnChangePrefix(e, 'xl')}>
                                        {fontSizeAttributes.length > 0 &&
                                            fontSizeAttributes.map((field, index) => (
                                                <option
                                                    value={`xl:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='選択文字サイズ：1536px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='2xl.selectionTextSize'
                                        onChange={(e) => handleOnChangePrefix(e, '2xl')}>
                                        {fontSizeAttributes.length > 0 &&
                                            fontSizeAttributes.map((field, index) => (
                                                <option
                                                    value={`2xl:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                        </div>

                        <div className="flex justify-between space-x-4">
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='選択文字太さ：無指定'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='default.selectionTextWeight'
                                        onChange={(e) => handleOnChangePrefix(e, 'default')}>
                                        {fontWeightAttributes.length > 0 &&
                                            fontWeightAttributes.map((field, index) => (
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
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='選択文字太さ：640px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='sm.selectionTextWeight'
                                        onChange={(e) => handleOnChangePrefix(e, 'sm')}>
                                        {fontWeightAttributes.length > 0 &&
                                            fontWeightAttributes.map((field, index) => (
                                                <option
                                                    value={`sm:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='選択文字太さ：768px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='md.selectionTextWeight'
                                        onChange={(e) => handleOnChangePrefix(e, 'md')}>
                                        {fontWeightAttributes.length > 0 &&
                                            fontWeightAttributes.map((field, index) => (
                                                <option
                                                    value={`md:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                        </div>
                        <div className="flex justify-between mt-4 mb-12 space-x-4">
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='選択文字太さ：1024px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='lg.selectionTextWeight'
                                        onChange={(e) => handleOnChangePrefix(e, 'lg')}>
                                        {fontWeightAttributes.length > 0 &&
                                            fontWeightAttributes.map((field, index) => (
                                                <option
                                                    value={`lg:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='選択文字太さ：1280px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='xl.selectionTextWeight'
                                        onChange={(e) => handleOnChangePrefix(e, 'xl')}>
                                        {fontWeightAttributes.length > 0 &&
                                            fontWeightAttributes.map((field, index) => (
                                                <option
                                                    value={`xl:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='選択文字太さ：1536px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='2xl.selectionTextWeight'
                                        onChange={(e) => handleOnChangePrefix(e, '2xl')}>
                                        {fontWeightAttributes.length > 0 &&
                                            fontWeightAttributes.map((field, index) => (
                                                <option
                                                    value={`2xl:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                        </div>

                        <div className="flex flex-col mb-4">
                            <label htmlFor="headerAreaShadow" className="text-blue-100  text-xs">選択 文字色</label>
                            <div className="flex justify-start space-x-4">
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [2, 3], 'default')}
                                    inputBoxItem="selectionTextColor" pickerLabel="通常時" isBackgroundColor="1"
                                    isDefaultColor={initialData?.selectionTextColor} />

                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [2, 3], 'hover')}
                                    inputBoxItem="selectionTextColor" pickerLabel="ホバー" isBackgroundColor="1"
                                    isDefaultColor={initialData?.selectionTextColorHover} />
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [2, 3], 'focus')}
                                    inputBoxItem="selectionTextColor" pickerLabel="フォーカス" isBackgroundColor="1"
                                    isDefaultColor={initialData?.selectionTextColorFocus} />
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [2, 3], 'active')}
                                    inputBoxItem="selectionTextColor" pickerLabel="アクティブ" isBackgroundColor="1"
                                    isDefaultColor={initialData?.selectionTextColorActive} />



                            </div>
                        </div>

                        <div className="flex flex-col mb-4">
                            <label htmlFor="headerAreaShadow" className="text-blue-100  text-xs">選択 背景色</label>

                            <div className="flex justify-start space-x-4">
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [2, 3], 'default')}
                                    inputBoxItem="selectionBackgroundColor" pickerLabel="通常時" isBackgroundColor="1"
                                    isDefaultColor={initialData?.selectionBackgroundColor} />

                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [2, 3], 'hover')}
                                    inputBoxItem="selectionBackgroundColor" pickerLabel="ホバー" isBackgroundColor="1"
                                    isDefaultColor={initialData?.selectionBackgroundColorHover} />
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [2, 3], 'focus')}
                                    inputBoxItem="selectionBackgroundColor" pickerLabel="フォーカス" isBackgroundColor="1"
                                    isDefaultColor={initialData?.selectionBackgroundColorFocus} />
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [2, 3], 'active')}
                                    inputBoxItem="selectionBackgroundColor" pickerLabel="アクティブ" isBackgroundColor="1"
                                    isDefaultColor={initialData?.selectionBackgroundColorActive} />



                            </div>
                        </div>
                        <InputContainer>
                            <TextBox label="選択カスタムClass"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='selectionCustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                // maxLength='32'
                                placeholder='スタムClass'
                                type="text" />
                        </InputContainer>




                    </div>
                </Form>
            </div>
        </Formik>
    );
}
export default InstituteSelection1SettingsForm