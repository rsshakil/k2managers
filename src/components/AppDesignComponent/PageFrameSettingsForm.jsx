import InputContainer from "../Wrapper/InputContainer";
import TextBox from "../Form/FormInputs/TextBox";
import SelectBox from "../Form/FormInputs/SelectBox";
import InputBoxSeparator from '../InputBoxSeparator/InputBoxSeparator'
import { useRecoilState, useRecoilValue } from "recoil";
import React, { useState, useEffect } from "react";
import { Formik, Form, useFormikContext } from "formik";
import SettingPageBlocks from "./SettingPageBlocks";
import ColorPickerWithRecent from "../ColorPicker/ColorPickerWithRecent";
import Note from "../Form/FormInputs/Note";
import { borderAttributes, borderStyles, shadowAttributes, heightAttributes, positionAttributes, fontSizeAttributes, fontWeightAttributes, justifyContentAttributes, headerStructures } from "../../lib/tailwindClassAttributes"
import { appDesignerState, getSelectedPageData } from "../../store/recoil/appDesignerState";
import { paddingXArrays } from "../../lib/commonConstants";

const PageFrameSettingsForm = ({ formData: initialData, handleOnChange, handleOnChangeColor = () => { }, tailwindColorCodeKeys }) => {
    const [recoilStateValue, setRecoilState] = useRecoilState(appDesignerState);
    const selectedPageDetail = useRecoilValue(getSelectedPageData);
    let headerMenuBlocks1 = initialData?.headerMenu1Block;
    let headerMenuBlocks2 = initialData?.headerMenu2Block;
    function handleOnChangePrefix(e, attr) {
        let attrName = e.target.name;
        let attrValue = e.target.value;
        let attrValue2 = attrValue.replace('h-', 'mt-');
        let getAttrNameFromArr = attrName.split('.');
        let objName = getAttrNameFromArr[0];
        let objIndex = getAttrNameFromArr[1];
        
        let currentStateDataUpdate = JSON.parse(JSON.stringify({ ...recoilStateValue }));
        currentStateDataUpdate.tabItems.settings.appSettingQuery.pageFrameSettings.prefixClass[objName][objIndex] = attrValue;
        currentStateDataUpdate.tabItems.settings.appSettingQuery.pageFrameSettings.prefixClass[objName].contentMarginTop = attrValue2;

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
                        <InputContainer>
                            <SelectBox
                                label=' ヘッダーエリア枠線'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='headerBorderWidth'
                                onChange={(e) => handleOnChange(e, 1)}
                            >
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
                                label='ヘッダーエリア影'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='headerDropShadow'
                                onChange={(e) => handleOnChange(e, 1)}>
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

                        <InputContainer>
                            <SelectBox
                                label='ヘッダーエリア固定'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='headerPosition'
                                onChange={(e) => handleOnChange(e, 1)}>
                                {positionAttributes.length > 0 &&
                                    positionAttributes.map((field, index) => (
                                        <option
                                            value={field.value}
                                            key={field.value + "_" + index}>
                                            {field.caption}
                                        </option>
                                    )
                                    )}
                            </SelectBox>
                        </InputContainer>

                        <div className="flex justify-between space-x-4">
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='高さ：無指定'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='default.headerHeight'
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
                                        name='sm.headerHeight'
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
                                        name='md.headerHeight'
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

                        <div className="flex justify-between space-x-4">
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='高さ：1024px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='lg.headerHeight'
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
                                        name='xl.headerHeight'
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
                                        name='2xl.headerHeight'
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
                            <label htmlFor="headerAreaShadow" className="text-blue-100 text-xs">ヘッダーエリア配色</label>
                            <div className="flex justify-start space-x-4">
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [1, 2])}
                                    inputBoxItem="headerBackgroundColor" pickerLabel="背景色" isBackgroundColor="1"
                                    isDefaultColor={initialData?.headerBackgroundColor} />
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.borderColor, [1, 2])}
                                    inputBoxItem="headerBorderColor" pickerLabel="線色" isBackgroundColor="1"
                                    isDefaultColor={initialData?.headerBorderColor} />
                            </div>
                        </div>

                        <InputContainer>
                            <Note label="ヘッダーエリアカスタムClass"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25 !p-1'
                                height='h-8'
                                name='headerCustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                placeholder='カスタムClass'
                            />
                        </InputContainer>

                        <InputBoxSeparator cProperty={`mt-8 mb-8`} />


                        <InputContainer>
                            <SelectBox
                                label='コンテンツエリア罫線'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='contentsBorderWidth'
                                onChange={(e) => handleOnChange(e, 1)}
                            >
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
                                label='コンテンツエリア罫線種類'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='contentsBorderStyle'
                                onChange={(e) => handleOnChange(e, 1)}
                            >
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
                                label='コンテンツエリア影'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='contentsDropShadow'
                                onChange={(e) => handleOnChange(e, 1)}
                            >
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

                        <div className="flex flex-col mb-4">
                            <label htmlFor="contentAreaColor" className="text-blue-100 text-xs">コンテンツエリア配色</label>
                            <div className="flex justify-start space-x-4">
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [1, 2])}
                                    inputBoxItem="contentsBackgroundColor" pickerLabel="背景色" isBackgroundColor="1"
                                    isDefaultColor={initialData?.contentsBackgroundColor} />
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.borderColor, [1, 2])}
                                    inputBoxItem="contentsBorderColor" pickerLabel="罫線色" isBackgroundColor="1"
                                    isDefaultColor={initialData?.contentsBorderColor} />

                            </div>
                        </div>

                        <InputContainer>
                            <Note label="コンテンツエリアカスタムClass"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25 !p-1'
                                height='h-8'
                                name='contentsCustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                placeholder='カスタムClass'
                            />
                        </InputContainer>

                        <InputBoxSeparator cProperty={`mt-8 mb-8`} />

                        <div className="flex flex-col mb-4">
                            <label htmlFor="stretchAreaColor" className="text-blue-100 text-xs">ストレッチエリア配色</label>
                            <div className="flex justify-start">
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [1, 2])}
                                    inputBoxItem="stretchBackgroundColor" pickerLabel="背景色" isBackgroundColor="1"
                                    isDefaultColor={initialData?.stretchBackgroundColor} />
                            </div>
                        </div>

                        <InputContainer>
                            <Note label="ストレッチエリアカスタムClass   "
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25 !p-1'
                                height='h-8'
                                name='stretchCustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                placeholder='カスタムClass'
                            />
                        </InputContainer>

                        <InputBoxSeparator cProperty={`mt-8 mb-8`} />


                        <InputContainer>
                            <SelectBox
                                label='ヘッダーメニュー1（ロゴ位置が左もしくは右の時のみ表示されます）'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='headerMenu1'
                                onChange={(e) => handleOnChange(e, 4)}>
                                <option value='false'>なし</option>
                                <option value='true'>あり</option>
                            </SelectBox>
                        </InputContainer>
                        <InputContainer>
                            <SelectBox
                                label='ヘッダーメニュー１ボタンタイプ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='headerMenu1Button'
                                onChange={(e) => handleOnChange(e, 4)}>
                                <option value='a'>A</option>
                                <option value='b'>B</option>
                                <option value='c'>C</option>
                            </SelectBox>
                        </InputContainer>
                        {/*<InputContainer>
                            <TextBox label="ヘッダーメニュー１ボタンテキスト（最大8文字）※"
                                     labelClassName='text-blue-100 text-xs'
                                     inputClassName='bg-blue-25'
                                     name='headerMenu1Text'
                                     onBlur={(e) => handleOnChange(e, 4)}
                                     maxLength='8'
                                     placeholder='ロゴメニュー１ボタンテキスト'
                                     type="text"/>
                        </InputContainer>*/}


                        <div className="mb-12 mt-12">
                            <InputContainer><label className="text-blue-100 text-xs">ヘッダーメニュー１ボタンテキスト（最大8文字）※</label></InputContainer>
                            <div className="flex justify-between space-x-4 ">
                                <div className="w-1/3">
                                    <InputContainer>
                                        <TextBox label="無指定"
                                            name="headerMenu1TextDefault"
                                            placeholder="ボタンテキスト"
                                            labelClassName='text-blue-100 text-xs'
                                            inputClassName={`bg-blue-25`}
                                            onBlur={(e) => handleOnChange(e, 4)}
                                            maxLength='8'
                                            type="text"
                                        />
                                    </InputContainer>
                                </div>
                                <div className="w-1/3">
                                    <InputContainer>
                                        <TextBox label="640px以上"
                                            name="headerMenu1TextSm"
                                            placeholder="ボタンテキスト"
                                            labelClassName='text-blue-100 text-xs'
                                            inputClassName={`bg-blue-25`}
                                            onBlur={(e) => handleOnChange(e, 4)}
                                            maxLength='8'
                                            type="text"
                                        />
                                    </InputContainer>
                                </div>
                                <div className="w-1/3">
                                    <InputContainer>
                                        <TextBox label="768px以上"
                                            name="headerMenu1TextMd"
                                            placeholder="ボタンテキスト"
                                            labelClassName='text-blue-100 text-xs'
                                            inputClassName={`bg-blue-25`}
                                            onBlur={(e) => handleOnChange(e, 4)}
                                            maxLength='8'
                                            type="text"
                                        />
                                    </InputContainer>
                                </div>
                            </div>
                            <div className="flex justify-between space-x-4 ">
                                <div className="w-1/3">
                                    <InputContainer>
                                        <TextBox label="1024px以上"
                                            name="headerMenu1TextLg"
                                            placeholder="ボタンテキスト"
                                            labelClassName='text-blue-100 text-xs'
                                            inputClassName={`bg-blue-25`}
                                            onBlur={(e) => handleOnChange(e, 4)}
                                            maxLength='8'
                                            type="text"
                                        />
                                    </InputContainer>
                                </div>
                                <div className="w-1/3">
                                    <InputContainer>
                                        <TextBox label="1280px以上"
                                            name="headerMenu1TextXl"
                                            placeholder="ボタンテキスト"
                                            labelClassName='text-blue-100 text-xs'
                                            inputClassName={`bg-blue-25`}
                                            onBlur={(e) => handleOnChange(e, 4)}
                                            maxLength='8'
                                            type="text"
                                        />
                                    </InputContainer>
                                </div>
                                <div className="w-1/3">
                                    <InputContainer>
                                        <TextBox label="1536px以上"
                                            name="headerMenu1Text2xl"
                                            placeholder="ボタンテキスト"
                                            labelClassName='text-blue-100 text-xs'
                                            inputClassName={`bg-blue-25`}
                                            onBlur={(e) => handleOnChange(e, 4)}
                                            maxLength='8'
                                            type="text"
                                        />
                                    </InputContainer>
                                </div>
                            </div>
                        </div>


                        <div className="mb-12">
                            <InputContainer><label className="text-blue-100 text-xs">ヘッダーメニュー１ボタン文字サイズ</label></InputContainer>

                            <div className="flex justify-between space-x-4 ">
                                <div className="w-1/3">
                                    <InputContainer>
                                        <SelectBox
                                            label='文字サイズ：無指定'
                                            labelClassName='text-blue-100 text-xs'
                                            inputClassName='bg-blue-25'
                                            name='default.headerMenu1textSize'
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
                                            label='文字サイズ：640px以上'
                                            labelClassName='text-blue-100 text-xs'
                                            inputClassName='bg-blue-25'
                                            name='sm.headerMenu1textSize'
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
                                            label='文字サイズ：768px以上'
                                            labelClassName='text-blue-100 text-xs'
                                            inputClassName='bg-blue-25'
                                            name='md.headerMenu1textSize'
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

                            <div className=" flex justify-between space-x-4">
                                <div className="w-1/3">
                                    <InputContainer>
                                        <SelectBox
                                            label='文字サイズ：1024px以上'
                                            labelClassName='text-blue-100 text-xs'
                                            inputClassName='bg-blue-25'
                                            name='lg.headerMenu1textSize'
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
                                            label='文字サイズ：1280px以上'
                                            labelClassName='text-blue-100 text-xs'
                                            inputClassName='bg-blue-25'
                                            name='xl.headerMenu1textSize'
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
                                            label='文字サイズ：1536px以上'
                                            labelClassName='text-blue-100 text-xs'
                                            inputClassName='bg-blue-25'
                                            name='2xl.headerMenu1textSize'
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
                        </div>


                        <div className="mb-12">
                            <InputContainer><label className="text-blue-100 text-xs">ヘッダーメニュー１ボタン文字太さ</label></InputContainer>
                            <div className="flex justify-between space-x-4">
                                <div className="w-1/3">
                                    <InputContainer>
                                        <SelectBox
                                            label='文字太さ：無指定'
                                            labelClassName='text-blue-100 text-xs'
                                            inputClassName='bg-blue-25'
                                            name='default.headerMenu1textWeight'
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
                                <div className="w-1/3 ">
                                    <InputContainer>
                                        <SelectBox
                                            label='文字太さ：640px以上'
                                            labelClassName='text-blue-100 text-xs'
                                            inputClassName='bg-blue-25'
                                            name='sm.headerMenu1textWeight'
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
                                            label='文字太さ：768px以上'
                                            labelClassName='text-blue-100 text-xs'
                                            inputClassName='bg-blue-25'
                                            name='md.headerMenu1textWeight'
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
                            <div className="flex justify-between space-x-4">
                                <div className="w-1/3">
                                    <InputContainer>
                                        <SelectBox
                                            label='文字太さ：1024px以上'
                                            labelClassName='text-blue-100 text-xs'
                                            inputClassName='bg-blue-25'
                                            name='lg.headerMenu1textWeight'
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
                                            label='文字太さ：1280px以上'
                                            labelClassName='text-blue-100 text-xs'
                                            inputClassName='bg-blue-25'
                                            name='xl.headerMenu1textWeight'
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
                                            label='文字太さ：1536px以上'
                                            labelClassName='text-blue-100 text-xs'
                                            inputClassName='bg-blue-25'
                                            name='2xl.headerMenu1textWeight'
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
                        </div>

                        <div>
                            <InputContainer><label className="text-blue-100 text-xs">ヘッダーメニュー１ボタン左右余白</label></InputContainer>
                            <div className="flex justify-between space-x-4 ">
                                <div className="w-1/3">
                                    <InputContainer>
                                        <SelectBox
                                            label={`左右余白：無指定`}
                                            labelClassName='text-blue-100 text-xs'
                                            inputClassName='bg-blue-25'
                                            name='default.headerMenu1paddingX'
                                            onChange={(e) => handleOnChangePrefix(e, 'default')}
                                        >
                                            {paddingXArrays.map((x, index) => (
                                                <option value={x.value}
                                                    key={x.value + "_" + index}>{x.caption}</option>))}
                                        </SelectBox>
                                    </InputContainer>
                                </div>
                                <div className="w-1/3">
                                    <InputContainer>
                                        <SelectBox
                                            label={`左右余白：640px以上`}
                                            labelClassName='text-blue-100 text-xs'
                                            inputClassName='bg-blue-25'
                                            name='sm.headerMenu1paddingX'
                                            onChange={(e) => handleOnChangePrefix(e, 'sm')}
                                        >
                                            {paddingXArrays.map((x, index) => (
                                                <option value={`sm:${x.value}`}
                                                    key={x.value + "_" + index}>{x.caption}</option>))}
                                        </SelectBox>
                                    </InputContainer>
                                </div>
                                <div className="w-1/3">
                                    <InputContainer>
                                        <SelectBox
                                            label={`左右余白：768px以上`}
                                            labelClassName='text-blue-100 text-xs'
                                            inputClassName='bg-blue-25'
                                            name='md.headerMenu1paddingX'
                                            onChange={(e) => handleOnChangePrefix(e, 'md')}
                                        >
                                            {paddingXArrays.map((x, index) => (
                                                <option value={`md:${x.value}`}
                                                    key={x.value + "_" + index}>{x.caption}</option>))}
                                        </SelectBox>
                                    </InputContainer>
                                </div>
                            </div>
                            <div className="flex justify-between space-x-4">
                                <div className="w-1/3">
                                    <InputContainer>
                                        <SelectBox
                                            label={`左右余白：1024px以上`}
                                            labelClassName='text-blue-100 text-xs'
                                            inputClassName='bg-blue-25'
                                            name='lg.headerMenu1paddingX'
                                            onChange={(e) => handleOnChangePrefix(e, 'lg')}
                                        >
                                            {paddingXArrays.map((x, index) => (
                                                <option value={`lg:${x.value}`}
                                                    key={x.value + "_" + index}>{x.caption}</option>))}
                                        </SelectBox>
                                    </InputContainer>
                                </div>
                                <div className="w-1/3">
                                    <InputContainer>
                                        <SelectBox
                                            label={`左右余白：1280px以上`}
                                            labelClassName='text-blue-100 text-xs'
                                            inputClassName='bg-blue-25'
                                            name='xl.headerMenu1paddingX'
                                            onChange={(e) => handleOnChangePrefix(e, 'xl')}
                                        >
                                            {paddingXArrays.map((x, index) => (
                                                <option value={`xl:${x.value}`}
                                                    key={x.value + "_" + index}>{x.caption}</option>))}
                                        </SelectBox>
                                    </InputContainer>
                                </div>
                                <div className="w-1/3">
                                    <InputContainer>
                                        <SelectBox
                                            label={`左右余白：1536px以上`}
                                            labelClassName='text-blue-100 text-xs'
                                            inputClassName='bg-blue-25'
                                            name='2xl.headerMenu1paddingX'
                                            onChange={(e) => handleOnChangePrefix(e, '2xl')}
                                        >
                                            {paddingXArrays.map((x, index) => (
                                                <option value={`2xl:${x.value}`}
                                                    key={x.value + "_" + index}>{x.caption}</option>))}
                                        </SelectBox>
                                    </InputContainer>
                                </div>
                            </div>

                        </div>

                        <InputContainer>
                            <SettingPageBlocks
                                label="ブロックの配置"
                                fieldKey='headerMenu1Block'
                                config={{ idKey: 'appPageBlockId', activeItem: 0, clickableCells: ['blockPageTitle'] }}
                                blocks={headerMenuBlocks1}
                            />
                        </InputContainer>


                        <InputContainer>
                            <Note label="ヘッダーメニュー1カスタムClass"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25 !p-1'
                                height='h-8'
                                name='headerMenu1CustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                placeholder='カスタムClass'
                            />
                        </InputContainer>

                        <InputBoxSeparator cProperty={`mt-8 mb-8`} />

                        <InputContainer>
                            <SelectBox
                                label='ヘッダーメニュー2（ロゴ位置が左もしくは右の時のみ表示されます）'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='headerMenu2'
                                onChange={(e) => handleOnChange(e, 4)}>
                                <option value='false'>なし</option>
                                <option value='true'>あり</option>
                            </SelectBox>
                        </InputContainer>
                        <InputContainer>
                            <SelectBox
                                label='ヘッダーメニュー2ボタンタイプ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='headerMenu2Button'
                                onChange={(e) => handleOnChange(e, 4)}>
                                <option value='a'>A</option>
                                <option value='b'>B</option>
                                <option value='c'>C</option>
                            </SelectBox>
                        </InputContainer>
                        {/*<InputContainer>
                            <TextBox label="ヘッダーメニュー2ボタンテキスト（最大8文字）※"
                                     labelClassName='text-blue-100 text-xs'
                                     inputClassName='bg-blue-25'
                                     name='headerMenu2Text'
                                     onBlur={(e) => handleOnChange(e, 4)}
                                     maxLength='8'
                                     placeholder='ロゴメニュー２ボタンテキスト '
                                     type="text"/>
                        </InputContainer>*/}
                        <div className=" mb-12 mt-12">
                            <InputContainer><label className="text-blue-100 text-xs">ヘッダーメニュー2ボタンテキスト（最大8文字）※</label></InputContainer>
                            <div className="flex justify-between space-x-4 ">
                                <div className="w-1/3">
                                    <InputContainer>
                                        <TextBox label="無指定"
                                            name="headerMenu2TextDefault"
                                            placeholder="ボタンテキスト"
                                            labelClassName='text-blue-100 text-xs'
                                            inputClassName={`bg-blue-25`}
                                            onBlur={(e) => handleOnChange(e, 4)}
                                            maxLength='8'
                                            type="text"
                                        />
                                    </InputContainer>
                                </div>
                                <div className="w-1/3">
                                    <InputContainer>
                                        <TextBox label="640px以上"
                                            name="headerMenu2TextSm"
                                            placeholder="ボタンテキスト"
                                            labelClassName='text-blue-100 text-xs'
                                            inputClassName={`bg-blue-25`}
                                            onBlur={(e) => handleOnChange(e, 4)}
                                            maxLength='8'
                                            type="text"
                                        />
                                    </InputContainer>
                                </div>
                                <div className="w-1/3">
                                    <InputContainer>
                                        <TextBox label="768px以上"
                                            name="headerMenu2TextMd"
                                            placeholder="ボタンテキスト"
                                            labelClassName='text-blue-100 text-xs'
                                            inputClassName={`bg-blue-25`}
                                            onBlur={(e) => handleOnChange(e, 4)}
                                            maxLength='8'
                                            type="text"
                                        />
                                    </InputContainer>
                                </div>
                            </div>
                            <div className="flex justify-between space-x-4 ">
                                <div className="w-1/3">
                                    <InputContainer>
                                        <TextBox label="1024px以上"
                                            name="headerMenu2TextLg"
                                            placeholder="ボタンテキスト"
                                            labelClassName='text-blue-100 text-xs'
                                            inputClassName={`bg-blue-25`}
                                            onBlur={(e) => handleOnChange(e, 4)}
                                            maxLength='8'
                                            type="text"
                                        />
                                    </InputContainer>
                                </div>
                                <div className="w-1/3">
                                    <InputContainer>
                                        <TextBox label="1280px以上"
                                            name="headerMenu2TextXl"
                                            placeholder="ボタンテキスト"
                                            labelClassName='text-blue-100 text-xs'
                                            inputClassName={`bg-blue-25`}
                                            onBlur={(e) => handleOnChange(e, 4)}
                                            maxLength='8'
                                            type="text"
                                        />
                                    </InputContainer>
                                </div>
                                <div className="w-1/3">
                                    <InputContainer>
                                        <TextBox label="1536px以上"
                                            name="headerMenu2Text2xl"
                                            placeholder="ボタンテキスト"
                                            labelClassName='text-blue-100 text-xs'
                                            inputClassName={`bg-blue-25`}
                                            onBlur={(e) => handleOnChange(e, 4)}
                                            maxLength='8'
                                            type="text"
                                        />
                                    </InputContainer>
                                </div>
                            </div>
                        </div>
                        <div className="mb-12">
                            <InputContainer><label className="text-blue-100 text-xs">ヘッダーメニュー2ボタン文字サイズ</label></InputContainer>

                            <div className=" flex justify-between space-x-4">
                                <div className="w-1/3">
                                    <InputContainer>
                                        <SelectBox
                                            label='文字サイズ：無指定'
                                            labelClassName='text-blue-100 text-xs'
                                            inputClassName='bg-blue-25'
                                            name='default.headerMenu2textSize'
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
                                            label='文字サイズ：640px以上'
                                            labelClassName='text-blue-100 text-xs'
                                            inputClassName='bg-blue-25'
                                            name='sm.headerMenu2textSize'
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
                                            label='文字サイズ：768px以上'
                                            labelClassName='text-blue-100 text-xs'
                                            inputClassName='bg-blue-25'
                                            name='md.headerMenu2textSize'
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

                            <div className=" flex justify-between space-x-4">
                                <div className="w-1/3">
                                    <InputContainer>
                                        <SelectBox
                                            label='文字サイズ：1024px以上'
                                            labelClassName='text-blue-100 text-xs'
                                            inputClassName='bg-blue-25'
                                            name='lg.headerMenu2textSize'
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
                                            label='文字サイズ：1280px以上'
                                            labelClassName='text-blue-100 text-xs'
                                            inputClassName='bg-blue-25'
                                            name='xl.headerMenu2textSize'
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
                                            label='文字サイズ：1536px以上'
                                            labelClassName='text-blue-100 text-xs'
                                            inputClassName='bg-blue-25'
                                            name='2xl.headerMenu2textSize'
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
                        </div>
                        <div className="mb-12">
                            <InputContainer><label className="text-blue-100 text-xs">ヘッダーメニュー2ボタン文字太さ</label></InputContainer>
                            <div className="flex justify-between space-x-4">
                                <div className="w-1/3">
                                    <InputContainer>
                                        <SelectBox
                                            label='文字太さ：無指定'
                                            labelClassName='text-blue-100 text-xs'
                                            inputClassName='bg-blue-25'
                                            name='default.headerMenu2textWeight'
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
                                <div className="w-1/3 ">
                                    <InputContainer>
                                        <SelectBox
                                            label='文字太さ：640px以上'
                                            labelClassName='text-blue-100 text-xs'
                                            inputClassName='bg-blue-25'
                                            name='sm.headerMenu2textWeight'
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
                                            label='文字太さ：768px以上'
                                            labelClassName='text-blue-100 text-xs'
                                            inputClassName='bg-blue-25'
                                            name='md.headerMenu2textWeight'
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
                            <div className="flex justify-between space-x-4">
                                <div className="w-1/3">
                                    <InputContainer>
                                        <SelectBox
                                            label='文字太さ：1024px以上'
                                            labelClassName='text-blue-100 text-xs'
                                            inputClassName='bg-blue-25'
                                            name='lg.headerMenu2textWeight'
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
                                            label='文字太さ：1280px以上'
                                            labelClassName='text-blue-100 text-xs'
                                            inputClassName='bg-blue-25'
                                            name='xl.headerMenu2textWeight'
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
                                            label='文字太さ：1536px以上'
                                            labelClassName='text-blue-100 text-xs'
                                            inputClassName='bg-blue-25'
                                            name='2xl.headerMenu2textWeight'
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
                        </div>
                        <div>
                            <InputContainer><label className="text-blue-100 text-xs">ヘッダーメニュー2ボタン左右余白</label></InputContainer>
                            <div className="flex justify-between space-x-4">
                                <div className="w-1/3">
                                    <InputContainer>
                                        <SelectBox
                                            label={`左右余白：無指定`}
                                            labelClassName='text-blue-100 text-xs'
                                            inputClassName='bg-blue-25'
                                            name='default.headerMenu2paddingX'
                                            onChange={(e) => handleOnChangePrefix(e, 'default')}
                                        >

                                            {paddingXArrays.map((x, index) => (
                                                <option value={x.value}
                                                    key={x.value + "_" + index}>{x.caption}</option>))}
                                        </SelectBox>
                                    </InputContainer>
                                </div>
                                <div className="w-1/3">
                                    <InputContainer>
                                        <SelectBox
                                            label={`左右余白：640px以上`}
                                            labelClassName='text-blue-100 text-xs'
                                            inputClassName='bg-blue-25'
                                            name='sm.headerMenu2paddingX'
                                            onChange={(e) => handleOnChangePrefix(e, 'sm')}
                                        >
                                            {paddingXArrays.map((x, index) => (
                                                <option value={`sm:${x.value}`}
                                                    key={x.value + "_" + index}>{x.caption}</option>))}
                                        </SelectBox>
                                    </InputContainer>
                                </div>
                                <div className="w-1/3">
                                    <InputContainer>
                                        <SelectBox
                                            label={`左右余白：768px以上`}
                                            labelClassName='text-blue-100 text-xs'
                                            inputClassName='bg-blue-25'
                                            name='md.headerMenu2paddingX'
                                            onChange={(e) => handleOnChangePrefix(e, 'md')}
                                        >
                                            {paddingXArrays.map((x, index) => (
                                                <option value={`md:${x.value}`}
                                                    key={x.value + "_" + index}>{x.caption}</option>))}
                                        </SelectBox>
                                    </InputContainer>
                                </div>
                            </div>
                            <div className="flex justify-between space-x-4">
                                <div className="w-1/3">
                                    <InputContainer>
                                        <SelectBox
                                            label={`左右余白：1024px以上`}
                                            labelClassName='text-blue-100 text-xs'
                                            inputClassName='bg-blue-25'
                                            name='lg:headerMenu2paddingX'
                                            onChange={(e) => handleOnChangePrefix(e, 'lg')}
                                        >
                                            {paddingXArrays.map((x, index) => (
                                                <option value={`lg:${x.value}`}
                                                    key={x.value + "_" + index}>{x.caption}</option>))}
                                        </SelectBox>
                                    </InputContainer>
                                </div>
                                <div className="w-1/3">
                                    <InputContainer>
                                        <SelectBox
                                            label={`左右余白：1280px以上`}
                                            labelClassName='text-blue-100 text-xs'
                                            inputClassName='bg-blue-25'
                                            name='xl.headerMenu2paddingX'
                                            onChange={(e) => handleOnChangePrefix(e, 'xl')}
                                        >
                                            {paddingXArrays.map((x, index) => (
                                                <option value={`xl:${x.value}`}
                                                    key={x.value + "_" + index}>{x.caption}</option>))}
                                        </SelectBox>
                                    </InputContainer>
                                </div>
                                <div className="w-1/3">
                                    <InputContainer>
                                        <SelectBox
                                            label={`左右余白：1536px以上`}
                                            labelClassName='text-blue-100 text-xs'
                                            inputClassName='bg-blue-25'
                                            name='2xl.headerMenu2paddingX'
                                            onChange={(e) => handleOnChangePrefix(e, '2xl')}
                                        >
                                            {paddingXArrays.map((x, index) => (
                                                <option value={`2xl:${x.value}`}
                                                    key={x.value + "_" + index}>{x.caption}</option>))}
                                        </SelectBox>
                                    </InputContainer>
                                </div>
                            </div>

                        </div>

                        <InputContainer>
                            <SettingPageBlocks
                                label="ブロックの配置"
                                fieldKey='headerMenu2Block'
                                config={{ idKey: 'appPageBlockId', activeItem: 0, clickableCells: ['blockPageTitle'] }}
                                blocks={headerMenuBlocks2}
                            />
                        </InputContainer>

                        <InputContainer className="!mb-0">
                            <Note label="ヘッダーメニュー2カスタムClass"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25 !p-1'
                                height='h-8'
                                name='headerMenu2CustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                placeholder='カスタムClass'
                            />
                        </InputContainer>
                    </div>
                </Form>
            </div>
        </Formik>
    );

}
export default PageFrameSettingsForm