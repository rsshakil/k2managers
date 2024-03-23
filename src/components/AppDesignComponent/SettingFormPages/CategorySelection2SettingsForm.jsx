import { useRecoilState } from "recoil";
import SelectBox from "../../Form/FormInputs/SelectBox";
import TextBox from "../../Form/FormInputs/TextBox";
import InputContainer from "../../Wrapper/InputContainer";

import { Form, Formik } from "formik";
import React from "react";
import ColorPickerWithRecent from "../../ColorPicker/ColorPickerWithRecent";
import InputBoxSeparator from '../../InputBoxSeparator/InputBoxSeparator';


import {
    borderAttributes, borderRadiousAttributes, borderStyles, boxShadowAttributes, fontSizeAttributes, fontWeightAttributes, gapAttributes, gridTemplateColumnsAttributes, letterSpacingAttributes, paddingXAttributes,
    paddingYAttributes, textAlignAttributes, verticalAlignAttributes
} from "../../../lib/tailwindClassAttributes";
import { appDesignerState } from "../../../store/recoil/appDesignerState";



const CategorySelection2SettingsForm = ({ formData: initialData, handleOnChange, handleOnChangeColor = () => { }, tailwindColorCodeKeys }) => {
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
                                        label='エリア左右余白：無指定'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='default.wrapPaddingX'
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
                                        label='エリア左右余白：640px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='sm.wrapPaddingX'
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
                                        label='エリア左右余白：768px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='md.wrapPaddingX'
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
                                        label='エリア左右余白：1024px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='lg.wrapPaddingX'
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
                                        label='エリア左右余白：1280px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='xl.wrapPaddingX'
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
                                        label='エリア左右余白：1536px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='2xl.wrapPaddingX'
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
                                        label='列の数：無指定'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='default.wrapGridColos'
                                        onChange={(e) => handleOnChangePrefix(e, 'default')}>
                                        {gridTemplateColumnsAttributes.length > 0 &&
                                            gridTemplateColumnsAttributes.map((field, index) => (
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
                                        label='列の数：640px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='sm.wrapGridColos'
                                        onChange={(e) => handleOnChangePrefix(e, 'sm')}>
                                        {gridTemplateColumnsAttributes.length > 0 &&
                                            gridTemplateColumnsAttributes.map((field, index) => (
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
                                        label='列の数：768px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='md.wrapGridColos'
                                        onChange={(e) => handleOnChangePrefix(e, 'md')}>
                                        {gridTemplateColumnsAttributes.length > 0 &&
                                            gridTemplateColumnsAttributes.map((field, index) => (
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
                                        label='列の数：1024px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='lg.wrapGridColos'
                                        onChange={(e) => handleOnChangePrefix(e, 'lg')}>
                                        {gridTemplateColumnsAttributes.length > 0 &&
                                            gridTemplateColumnsAttributes.map((field, index) => (
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
                                        label='列の数：1280px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='xl.wrapGridColos'
                                        onChange={(e) => handleOnChangePrefix(e, 'xl')}>
                                        {gridTemplateColumnsAttributes.length > 0 &&
                                            gridTemplateColumnsAttributes.map((field, index) => (
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
                                        label='列の数：1536px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='2xl.wrapGridColos'
                                        onChange={(e) => handleOnChangePrefix(e, '2xl')}>
                                        {gridTemplateColumnsAttributes.length > 0 &&
                                            gridTemplateColumnsAttributes.map((field, index) => (
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
                                        label='gap：無指定'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='default.wrapGridGap'
                                        onChange={(e) => handleOnChangePrefix(e, 'default')}>
                                        {gapAttributes.length > 0 &&
                                            gapAttributes.map((field, index) => (
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
                                        label='gap：640px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='sm.wrapGridGap'
                                        onChange={(e) => handleOnChangePrefix(e, 'sm')}>
                                        {gapAttributes.length > 0 &&
                                            gapAttributes.map((field, index) => (
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
                                        label='gap：768px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='md.wrapGridGap'
                                        onChange={(e) => handleOnChangePrefix(e, 'md')}>
                                        {gapAttributes.length > 0 &&
                                            gapAttributes.map((field, index) => (
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
                                        label='gap：1024px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='lg.wrapGridGap'
                                        onChange={(e) => handleOnChangePrefix(e, 'lg')}>
                                        {gapAttributes.length > 0 &&
                                            gapAttributes.map((field, index) => (
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
                                        label='gap：1280px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='xl.wrapGridGap'
                                        onChange={(e) => handleOnChangePrefix(e, 'xl')}>
                                        {gapAttributes.length > 0 &&
                                            gapAttributes.map((field, index) => (
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
                                        label='gap：1536px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='2xl.wrapGridGap'
                                        onChange={(e) => handleOnChangePrefix(e, '2xl')}>
                                        {gapAttributes.length > 0 &&
                                            gapAttributes.map((field, index) => (
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
                                label='エリア角丸サイズ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='wrapBorderRadius'
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
                                label='エリア枠線'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='wrapBorderWidth'
                                onChange={(e) => handleOnChange(e, 1)}>
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
                        <InputContainer>
                            <SelectBox
                                label='エリア枠線種別'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='wrapBorderStyle'
                                onChange={(e) => handleOnChange(e, 1)}>
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
                        <InputContainer>
                            <SelectBox
                                label='エリア枠の影'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='wrapBoxShadow'
                                onChange={(e) => handleOnChange(e, 1)}>
                                {boxShadowAttributes.length > 0 &&
                                    boxShadowAttributes.map((field, index) => (
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
                            <label htmlFor="headerAreaShadow" className="text-blue-100  text-xs">エリア配色</label>
                            <div className="flex justify-start space-x-4">
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.borderColor, [1, 2])}
                                    inputBoxItem="wrapBorderColor" pickerLabel="枠線色" isBackgroundColor="1"
                                    isDefaultColor={initialData?.wrapBorderColor} />
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.shadowColor, [1, 2])}
                                    inputBoxItem="wrapBoxShadowColor" pickerLabel="影色" isBackgroundColor="1"
                                    isDefaultColor={initialData?.wrapBoxShadowColor} />
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [1, 2])}
                                    inputBoxItem="wrapBackgroundColor" pickerLabel="背景色" isBackgroundColor="1"
                                    isDefaultColor={initialData?.wrapBackgroundColor} />
                            </div>
                        </div>

                        <InputContainer>
                            <TextBox label="カテゴリーWrapカスタムClass"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='wrapCustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                // maxLength='32'
                                placeholder='カスタムClass'
                                type="text" />
                        </InputContainer>

                        <InputBoxSeparator cProperty={`mt-8 mb-8`} />

                        <div className="flex justify-between space-x-4">
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='地区文字サイズ：無指定'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='default.areaTextSize'
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
                                        label='地区文字サイズ：640px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='sm.areaTextSize'
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
                                        label='地区文字サイズ：768px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='md.areaTextSize'
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
                                        label='地区文字サイズ：1024px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='lg.areaTextSize'
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
                                        label='地区文字サイズ：1280px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='xl.areaTextSize'
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
                                        label='地区文字サイズ：1536px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='2xl.areaTextSize'
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
                                        label='地区文字太さ：無指定'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='default.areaTextWeight'
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
                                        label='地区文字太さ：640px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='sm.areaTextWeight'
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
                                        label='地区文字太さ：768px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='md.areaTextWeight'
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
                                        label='地区文字太さ：1024px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='lg.areaTextWeight'
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
                                        label='地区文字太さ：1280px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='xl.areaTextWeight'
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
                                        label='地区文字太さ：1536px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='2xl.areaTextWeight'
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
                                        label='地区角丸サイズ：無指定'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='default.areaBorderRadius'
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
                                        label='地区角丸サイズ：640px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='sm.areaBorderRadius'
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
                                        label='地区角丸サイズ：768px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='md.areaBorderRadius'
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
                                        label='地区角丸サイズ：1024px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='lg.areaBorderRadius'
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
                                        label='地区角丸サイズ：1280px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='xl.areaBorderRadius'
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
                                        label='地区角丸サイズ：1536px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='2xl.areaBorderRadius'
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
                                        label='地区枠線：無指定'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='default.areaBorderWidth'
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
                                        label='地区枠線：640px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='sm.areaBorderWidth'
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
                                        label='地区枠線：768px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='md.areaBorderWidth'
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
                                        label='地区枠線：1024px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='lg.areaBorderWidth'
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
                                        label='地区枠線：1280px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='xl.areaBorderWidth'
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
                                        label='地区枠線：1536px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='2xl.areaBorderWidth'
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
                                        label='地区枠線種類：無指定'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='default.areaBorderStyle'
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
                                        label='地区枠線種類：640px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='sm.areaBorderStyle'
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
                                        label='地区枠線種類：768px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='md.areaBorderStyle'
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
                                        label='地区枠線種類：1024px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='lg.areaBorderStyle'
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
                                        label='地区枠線種類：1280px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='xl.areaBorderStyle'
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
                                        label='地区枠線種類：1536px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='2xl.areaBorderStyle'
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
                                        label='地区影：無指定'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='default.areaBoxShadow'
                                        onChange={(e) => handleOnChangePrefix(e, 'default')}>
                                        {boxShadowAttributes.length > 0 &&
                                            boxShadowAttributes.map((field, index) => (
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
                                        label='地区影：640px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='sm.areaBoxShadow'
                                        onChange={(e) => handleOnChangePrefix(e, 'sm')}>
                                        {boxShadowAttributes.length > 0 &&
                                            boxShadowAttributes.map((field, index) => (
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
                                        label='地区影：768px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='md.areaBoxShadow'
                                        onChange={(e) => handleOnChangePrefix(e, 'md')}>
                                        {boxShadowAttributes.length > 0 &&
                                            boxShadowAttributes.map((field, index) => (
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
                                        label='地区影：1024px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='lg.areaBoxShadow'
                                        onChange={(e) => handleOnChangePrefix(e, 'lg')}>
                                        {boxShadowAttributes.length > 0 &&
                                            boxShadowAttributes.map((field, index) => (
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
                                        label='地区影：1280px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='xl.areaBoxShadow'
                                        onChange={(e) => handleOnChangePrefix(e, 'xl')}>
                                        {boxShadowAttributes.length > 0 &&
                                            boxShadowAttributes.map((field, index) => (
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
                                        label='地区影：1536px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='2xl.areaBoxShadow'
                                        onChange={(e) => handleOnChangePrefix(e, '2xl')}>
                                        {boxShadowAttributes.length > 0 &&
                                            boxShadowAttributes.map((field, index) => (
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
                                        label='地区文字揃え：無指定'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='default.areaTextAlign'
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
                                        label='地区文字揃え：640px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='sm.areaTextAlign'
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
                                        label='地区文字揃え：768px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='md.areaTextAlign'
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
                        <div className="flex justify-between mt-4 mb-12 space-x-4">
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='地区文字揃え：1024px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='lg.areaTextAlign'
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
                                        label='地区文字揃え：1280px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='xl.areaTextAlign'
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
                                        label='地区文字揃え：1536px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='2xl.areaTextAlign'
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

                        <div className="flex justify-between space-x-4">
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='地区文字垂直整列：無指定'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='default.areaVerticalAlign'
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
                                        label='地区文字垂直整列：640px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='sm.areaVerticalAlign'
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
                                        label='地区文字垂直整列：768px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='md.areaVerticalAlign'
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
                        <div className="flex justify-between mt-4 mb-12 space-x-4">
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='地区文字垂直整列：1024px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='lg.areaVerticalAlign'
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
                                        label='地区文字垂直整列：1280px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='xl.areaVerticalAlign'
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
                                        label='地区文字垂直整列：1536px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='2xl.areaVerticalAlign'
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
                                        label='地区文字間：無指定'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='default.areaLetterSpacing'
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
                                        label='地区文字間：640px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='sm.areaLetterSpacing'
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
                                        label='地区文字間：768px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='md.areaLetterSpacing'
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
                        <div className="flex justify-between mt-4 mb-12 space-x-4">
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='地区文字間：1024px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='lg.areaLetterSpacing'
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
                                        label='地区文字間：1280px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='xl.areaLetterSpacing'
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
                                        label='地区文字間：1536px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='2xl.areaLetterSpacing'
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
                                        label='地区左右余白：無指定'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='default.areaPaddingX'
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
                                        label='地区左右余白：640px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='sm.areaPaddingX'
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
                                        label='地区左右余白：768px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='md.areaPaddingX'
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
                                        label='地区左右余白：1024px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='lg.areaPaddingX'
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
                                        label='地区左右余白：1280px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='xl.areaPaddingX'
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
                                        label='地区左右余白：1536px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='2xl.areaPaddingX'
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
                                        label='地区上下余白：無指定'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='default.areaPaddingY'
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
                                        label='地区上下余白：640px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='sm.areaPaddingY'
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
                                        label='地区上下余白：768px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='md.areaPaddingY'
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
                                        label='地区上下余白：1024px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='lg.areaPaddingY'
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
                                        label='地区上下余白：1280px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='xl.areaPaddingY'
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
                                        label='地区上下余白：1536px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='2xl.areaPaddingY'
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


























                        <div className="flex flex-col mb-4">
                            <label htmlFor="headerAreaShadow" className="text-blue-100  text-xs">地区エリア配色</label>
                            <div className="flex justify-start space-x-4">
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])}
                                    inputBoxItem="areaTextColor" pickerLabel="文字色" isBackgroundColor="1"
                                    isDefaultColor={initialData?.areaTextColor} />
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.borderColor, [1, 2])}
                                    inputBoxItem="areaBorderColor" pickerLabel="枠線色" isBackgroundColor="1"
                                    isDefaultColor={initialData?.areaBorderColor} />
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [1, 2])}
                                    inputBoxItem="areaBackgroundColor" pickerLabel="背景色" isBackgroundColor="1"
                                    isDefaultColor={initialData?.areaBackgroundColor} />
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.shadowColor, [1, 2])}
                                    inputBoxItem="areaBoxShadowColor" pickerLabel="影色" isBackgroundColor="1"
                                    isDefaultColor={initialData?.areaBoxShadowColor} />

                            </div>
                        </div>


                        <InputContainer>
                            <TextBox label="地区エリアカスタムClass"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='areawrapCustomClass'
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
export default CategorySelection2SettingsForm