import InputContainer from "../../Wrapper/InputContainer";
import TextBox from "../../Form/FormInputs/TextBox";
import SelectBox from "../../Form/FormInputs/SelectBox";
import { useRecoilState, useRecoilValue } from "recoil";
import React, { useState, useEffect } from "react";
import { Formik, Form, useFormikContext } from "formik";
import ColorPickerWithRecent from "../../ColorPicker/ColorPickerWithRecent";

import {
    borderAttributes, borderStyles, shadowAttributes, heightAttributes, positionAttributes, fontSizeAttributes, fontWeightAttributes, justifyContentAttributes, headerStructures,
    textAlignAttributes,
    letterSpacingAttributes,
    verticalAlignAttributes,
    paddingXAttributes,
    paddingYAttributes,
    borderRadiousAttributes
} from "../../../lib/tailwindClassAttributes"
import { appDesignerState, getSelectedPageData } from "../../../store/recoil/appDesignerState";

const H1Settings = ({ formData: initialValues, handleOnChange, handleOnChangeColor = () => { }, tailwindColorCodeKeys }) => {

    const [recoilStateValue, setRecoilState] = useRecoilState(appDesignerState);
    const selectedPageDetail = useRecoilValue(getSelectedPageData);
    const { activeTab, activePageId, tabItems } = recoilStateValue;

    const formDataJson = tabItems[activeTab].appSettingQuery[activePageId];
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

        <Formik onSubmit=""
            validateOnChange={false}
            validateOnBlur={false}
            enableReinitialize={true}
            initialValues={initialValues}
        >
            <div className='relative w-full'>
                <Form>
                    <div>
                        <div className="flex justify-between space-x-4">
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='テキスト文字サイズ：無指定'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='default.textSize'
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
                                        label='テキスト文字サイズ：640px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='sm.textSize'
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
                                        label='テキスト文字サイズ：768px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='md.textSize'
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

                        <div className="flex justify-between mb-12 space-x-4">
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='テキスト文字サイズ：1024px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='lg.textSize'
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
                                        label='テキスト文字サイズ：1280px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='xl.textSize'
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
                                        label='テキスト文字サイズ：1536px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='2xl.textSize'
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

                        <div className="flex mt-4 justify-between space-x-4">
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='テキスト太さ：無指定'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='default.textWeight'
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
                                        label='テキスト太さ：640px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='sm.textWeight'
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
                                        label='テキスト太さ：768px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='md.textWeight'
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

                        <div className="flex justify-between mb-12 space-x-4">
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='テキスト太さ：1024px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='lg.textWeight'
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
                                        label='テキスト太さ：1280px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='xl.textWeight'
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
                                        label='テキスト太さ：1536px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='2xl.textWeight'
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

                        <div className="flex justify-between space-x-4">
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='テキスト文字揃え：無指定'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='default.textAlign'
                                        onChange={(e) => handleOnChangePrefix(e, 'default')}>
                                        {textAlignAttributes.length > 0 &&
                                            textAlignAttributes.map((field, index) => (
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
                                        label='テキスト文字揃え：640px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='sm.textAlign'
                                        onChange={(e) => handleOnChangePrefix(e, 'sm')}>
                                        {textAlignAttributes.length > 0 &&
                                            textAlignAttributes.map((field, index) => (
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
                                        label='テキスト文字揃え：768px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='md.textAlign'
                                        onChange={(e) => handleOnChangePrefix(e, 'md')}>
                                        {textAlignAttributes.length > 0 &&
                                            textAlignAttributes.map((field, index) => (
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

                        <div className="flex justify-between mb-12 space-x-4">
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='テキスト文字揃え：1024px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='lg.textAlign'
                                        onChange={(e) => handleOnChangePrefix(e, 'lg')}>
                                        {textAlignAttributes.length > 0 &&
                                            textAlignAttributes.map((field, index) => (
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
                                        label='テキスト文字揃え：1280px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='xl.textAlign'
                                        onChange={(e) => handleOnChangePrefix(e, 'xl')}>
                                        {textAlignAttributes.length > 0 &&
                                            textAlignAttributes.map((field, index) => (
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
                                        label='テキスト文字揃え：1536px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='2xl.textAlign'
                                        onChange={(e) => handleOnChangePrefix(e, '2xl')}>
                                        {textAlignAttributes.length > 0 &&
                                            textAlignAttributes.map((field, index) => (
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

                        <div className="flex mt-4 justify-between space-x-4">
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='テキスト垂直整列：無指定'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='default.verticalAlign'
                                        onChange={(e) => handleOnChangePrefix(e, 'default')}>
                                        {verticalAlignAttributes.length > 0 &&
                                            verticalAlignAttributes.map((field, index) => (
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
                                        label='テキスト垂直整列：640px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='sm.verticalAlign'
                                        onChange={(e) => handleOnChangePrefix(e, 'sm')}>
                                        {verticalAlignAttributes.length > 0 &&
                                            verticalAlignAttributes.map((field, index) => (
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
                                        label='テキスト垂直整列：768px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='md.verticalAlign'
                                        onChange={(e) => handleOnChangePrefix(e, 'md')}>
                                        {verticalAlignAttributes.length > 0 &&
                                            verticalAlignAttributes.map((field, index) => (
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

                        <div className="flex justify-between mb-12 space-x-4">
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='テキスト垂直整列：1024px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='lg.verticalAlign'
                                        onChange={(e) => handleOnChangePrefix(e, 'lg')}>
                                        {verticalAlignAttributes.length > 0 &&
                                            verticalAlignAttributes.map((field, index) => (
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
                                        label='テキスト垂直整列：1280px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='xl.verticalAlign'
                                        onChange={(e) => handleOnChangePrefix(e, 'xl')}>
                                        {verticalAlignAttributes.length > 0 &&
                                            verticalAlignAttributes.map((field, index) => (
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
                                        label='テキスト垂直整列：1536px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='2xl.verticalAlign'
                                        onChange={(e) => handleOnChangePrefix(e, '2xl')}>
                                        {verticalAlignAttributes.length > 0 &&
                                            verticalAlignAttributes.map((field, index) => (
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
                                        label='テキスト字間：無指定'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='default.letterSpacing'
                                        onChange={(e) => handleOnChangePrefix(e, 'default')}>
                                        {letterSpacingAttributes.length > 0 &&
                                            letterSpacingAttributes.map((field, index) => (
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
                                        label='テキスト字間：640px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='sm.letterSpacing'
                                        onChange={(e) => handleOnChangePrefix(e, 'sm')}>
                                        {letterSpacingAttributes.length > 0 &&
                                            letterSpacingAttributes.map((field, index) => (
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
                                        label='テキスト字間：768px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='md.letterSpacing'
                                        onChange={(e) => handleOnChangePrefix(e, 'md')}>
                                        {letterSpacingAttributes.length > 0 &&
                                            letterSpacingAttributes.map((field, index) => (
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

                        <div className="flex justify-between mb-12 space-x-4">
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='テキスト字間：1024px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='lg.letterSpacing'
                                        onChange={(e) => handleOnChangePrefix(e, 'lg')}>
                                        {letterSpacingAttributes.length > 0 &&
                                            letterSpacingAttributes.map((field, index) => (
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
                                        label='テキスト字間：1280px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='xl.letterSpacing'
                                        onChange={(e) => handleOnChangePrefix(e, 'xl')}>
                                        {letterSpacingAttributes.length > 0 &&
                                            letterSpacingAttributes.map((field, index) => (
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
                                        label='テキスト字間：1536px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='2xl.letterSpacing'
                                        onChange={(e) => handleOnChangePrefix(e, '2xl')}>
                                        {letterSpacingAttributes.length > 0 &&
                                            letterSpacingAttributes.map((field, index) => (
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
                                        label='左右余白：無指定'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='default.paddingX'
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
                                        label='左右余白：640px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='sm.paddingX'
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
                                        label='左右余白：768px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='md.paddingX'
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

                        <div className="flex justify-between mb-12 space-x-4">
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='左右余白：1024px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='lg.paddingX'
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
                                        label='左右余白：1280px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='xl.paddingX'
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
                                        label='左右余白：1536px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='2xl.paddingX'
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
                                        label='上下余白：無指定'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='default.paddingY'
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
                                        label='上下余白：640px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='sm.paddingY'
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
                                        label='上下余白：768px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='md.paddingY'
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

                        <div className="flex justify-between mb-12 space-x-4">
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='上下余白：1024px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='lg.paddingY'
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
                                        label='上下余白：1280px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='xl.paddingY'
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
                                        label='上下余白：1536px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='2xl.paddingY'
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


                        <div className="flex justify-between space-x-4">
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='角丸サイズ：無指定'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='default.borderRadius'
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
                                        label='角丸サイズ：640px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='sm.borderRadius'
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
                                        label='角丸サイズ：768px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='md.borderRadius'
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

                        <div className="flex justify-between mb-12 space-x-4">
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='角丸サイズ：1024px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='lg.borderRadius'
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
                                        label='角丸サイズ：1280px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='xl.borderRadius'
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
                                        label='角丸サイズ：1536px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='2xl.borderRadius'
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
                                        label='枠線：無指定'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='default.borderWidth'
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
                                        label='枠線：640px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='sm.borderWidth'
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
                                        label='枠線：768px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='md.borderWidth'
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

                        <div className="flex justify-between mb-12 space-x-4">
                            <div className="w-1/3 ">
                                <InputContainer>
                                    <SelectBox
                                        label='枠線：1024px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='lg.borderWidth'
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
                                        label='枠線：1280px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='xl.borderWidth'
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
                                        label='枠線：1536px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='2xl.borderWidth'
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
                                        label='枠線種類：無指定'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='default.borderStyle'
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
                                        label='枠線種類：640px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='sm.borderStyle'
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
                                        label='枠線種類：768px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='md.borderStyle'
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

                        <div className="flex justify-between mb-12 space-x-4">
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='枠線種類：1024px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='lg.borderStyle'
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
                                        label='枠線種類：1280px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='xl.borderStyle'
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
                                        label='枠線種類：1536px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='2xl.borderStyle'
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
                                        label='影：無指定'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='default.dropShadow'
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
                                        label='影：640px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='sm.dropShadow'
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
                                        label='影：768px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='md.dropShadow'
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

                        <div className="flex justify-between mb-12 space-x-4">
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='影：1024px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='lg.dropShadow'
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
                                        label='影：1280px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='xl.dropShadow'
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
                                        label='影：1536px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='2xl.dropShadow'
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


                        <div className="flex justify-between space-x-4">
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='高さ：無指定'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='default.height'
                                        onChange={(e) => handleOnChangePrefix(e, 'default')}>
                                        {heightAttributes.length > 0 &&
                                            heightAttributes.map((field, index) => (
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
                                        label='高さ：640px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='sm.height'
                                        onChange={(e) => handleOnChangePrefix(e, 'sm')}>
                                        {heightAttributes.length > 0 &&
                                            heightAttributes.map((field, index) => (
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
                                        label='高さ：768px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='md.height'
                                        onChange={(e) => handleOnChangePrefix(e, 'md')}>
                                        {heightAttributes.length > 0 &&
                                            heightAttributes.map((field, index) => (
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

                        <div className="flex justify-between mb-12 space-x-4">
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='高さ：1024px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='lg.height'
                                        onChange={(e) => handleOnChangePrefix(e, 'lg')}>
                                        {heightAttributes.length > 0 &&
                                            heightAttributes.map((field, index) => (
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
                                        label='高さ：1280px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='xl.height'
                                        onChange={(e) => handleOnChangePrefix(e, 'xl')}>
                                        {heightAttributes.length > 0 &&
                                            heightAttributes.map((field, index) => (
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
                                        label='高さ：1536px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='2xl.height'
                                        onChange={(e) => handleOnChangePrefix(e, '2xl')}>
                                        {heightAttributes.length > 0 &&
                                            heightAttributes.map((field, index) => (
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
                            <label htmlFor="headerAreaShadow" className="text-blue-100 text-xs">配色</label>
                            <div className="flex justify-start space-x-4">
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])}
                                    inputBoxItem="textColor" pickerLabel="文字色" isBackgroundColor="1"
                                    isDefaultColor={initialValues?.textColor} />
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [1, 2])}
                                    inputBoxItem="backgroundColor" pickerLabel="背景色" isBackgroundColor="1"
                                    isDefaultColor={initialValues?.backgroundColor} />
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.borderColor, [1, 2])}
                                    inputBoxItem="borderColor" pickerLabel="線色" isBackgroundColor="1"
                                    isDefaultColor={initialValues?.borderColor} />
                            </div>
                        </div>
                        <InputContainer className="!mb-0">
                            <TextBox label="カスタムClass"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='customClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                placeholder='カスタムClass'
                                type="text" />
                        </InputContainer>
                    </div>
                </Form>
            </div>
        </Formik>
    );
}
export default H1Settings