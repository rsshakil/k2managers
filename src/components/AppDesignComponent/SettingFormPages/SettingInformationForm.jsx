import InputContainer from "../../Wrapper/InputContainer";
import TextBox from "../../Form/FormInputs/TextBox";
import SelectBox from "../../Form/FormInputs/SelectBox";

import React, { useState, useEffect } from "react";
import { Formik, Form, useFormikContext } from "formik";
import { borderAttributes, borderStyles, shadowAttributes, borderRadiousAttributes, heightAttributes, positionAttributes, fontSizeAttributes, fontWeightAttributes, justifyContentAttributes, headerStructures } from "../../../lib/tailwindClassAttributes"
import ColorPickerWithRecent from "../../ColorPicker/ColorPickerWithRecent";
import { fontSizeArrays, fontWeightArrays } from "../../../lib/commonConstants";
import InputBoxSeparator from '../../InputBoxSeparator/InputBoxSeparator'


const SettingInformationForm = ({ formData: initialValues, handleOnChange, handleOnChangeColor = () => { }, tailwindColorCodeKeys }) => {

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
                        {/* area 1 start */}
                        <InputContainer>
                            <SelectBox
                                label='タイプ１　タイトルテキスト文字サイズ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType1TitleTextSize'
                                onChange={(e) => handleOnChange(e, 1)}
                            >
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
                                label='タイプ１　タイトルテキスト文字太さ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType1TitleFontWeight'
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
                            <TextBox label="タイプ１　タイトルWrapカスタムClass"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType1TitleWrapCustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                placeholder='カスタムClassを入力してください'
                            />
                        </InputContainer>
                        <div className="mt-12"></div>
                        <InputContainer>
                            <SelectBox
                                label='タイプ１　本文テキスト文字サイズ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType1BodyTextSize'
                                onChange={(e) => handleOnChange(e, 1)}
                            >
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
                                label='タイプ１　本文テキスト文字太さ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType1BodyFontWeight'
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
                            <TextBox label="タイプ１　本文テキストカスタムClass"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType1BodyWrapCustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                placeholder='カスタムClassを入力してください'
                            />
                        </InputContainer>
                        <div className="mt-12"></div>
                        <InputContainer>
                            <TextBox label="タイプ１　blockAreaWrapカスタムClass"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType1BlockWrapCustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                placeholder='カスタムClassを入力してください'
                            />
                        </InputContainer>
                        <InputContainer>
                            <SelectBox
                                label='タイプ１　block下テキスト文字サイズ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType1BelowBlockTextSize'
                                onChange={(e) => handleOnChange(e, 1)}
                            >
                                {fontSizeArrays.map(field => <option value={field.value} key={field.value}> {field.caption} </option>)}
                            </SelectBox>
                        </InputContainer>

                        <InputContainer>
                            <SelectBox
                                label='タイプ１　block下テキスト文字太さ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType1BelowBlockFontWeight'
                                onChange={(e) => handleOnChange(e, 1)}
                            >
                                {fontWeightArrays.map(field => <option value={field.value} key={field.value}> {field.caption} </option>)}
                            </SelectBox>
                        </InputContainer>
                        <InputContainer>
                            <TextBox label="タイプ１　block下テキストカスタムClass"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType1BelowBlockWrapCustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                placeholder='カスタムClassを入力してください'
                            />
                        </InputContainer>
                        <div className="mt-12"></div>

                        <InputContainer>
                            <SelectBox
                                label=' タイプ１　枠線太さ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType1BorderWidth'
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
                                label='タイプ１　枠線種類'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType1BorderStyle'
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
                                label=' タイプ１　枠線角丸サイズ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType1BorderRadius'
                                onChange={(e) => handleOnChange(e, 1)}
                            >
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
                                label='タイプ１　枠の影'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType1DropShadow'
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
                        <div className="flex flex-col mt-12 mb-4">
                            <label htmlFor="headerAreaShadow" className="text-blue-100 text-xs">タイプ１ 配色</label>
                            <div className="flex justify-start space-x-4">
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])}
                                    inputBoxItem="infoType1TitleTextColor" pickerLabel="タイトル色" isBackgroundColor="1"
                                    isDefaultColor={initialValues?.infoType1TitleTextColor} />
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])}
                                    inputBoxItem="infoType1BodyTextColor" pickerLabel="本文色" isBackgroundColor="1"
                                    isDefaultColor={initialValues?.infoType1BodyTextColor} />
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])}
                                    inputBoxItem="infoType1BelowBlockTextColor" pickerLabel="ブロック下文字色" isBackgroundColor="1"
                                    isDefaultColor={initialValues?.infoType1BelowBlockTextColor} />
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [1, 2])}
                                    inputBoxItem="infoType1BackgroundColor" pickerLabel="背景色" isBackgroundColor="1"
                                    isDefaultColor={initialValues?.infoType1BackgroundColor} />
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.borderColor, [1, 2])}
                                    inputBoxItem="infoType1BorderColor" pickerLabel="線色" isBackgroundColor="1"
                                    isDefaultColor={initialValues?.infoType1BorderColor} />

                            </div>
                        </div>
                        <InputContainer>
                            <TextBox label="タイプ１　カスタムClass"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType1CustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                placeholder='カスタムClass'
                                type="text" />
                        </InputContainer>

                        {/* area 2 start */}

                        <InputBoxSeparator cProperty={`mt-8 mb-8`} />


                        <InputContainer>
                            <SelectBox
                                label=' タイプ２　タイトルテキスト文字サイズ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType2TitleTextSize'
                                onChange={(e) => handleOnChange(e, 1)}
                            >
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
                                label='タイプ２　タイトルテキスト文字太さ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType2TitleFontWeight'
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
                            <TextBox label="タイプ２　タイトルWrapカスタムClass"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType2TitleWrapCustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                placeholder='カスタムClassを入力してください'
                            />
                        </InputContainer>
                        <div className="mt-12"></div>

                        <InputContainer>
                            <SelectBox
                                label=' タイプ２　本文テキスト文字サイズ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType2BodyTextSize'
                                onChange={(e) => handleOnChange(e, 1)}
                            >
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
                                label='タイプ２　本文テキスト文字太さ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType2BodyFontWeight'
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
                            <TextBox label="タイプ２　本文テキストカスタムClass"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType2BodyWrapCustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                placeholder='カスタムClassを入力してください'
                            />
                        </InputContainer>
                        <div className="mt-12"></div>
                        <InputContainer>
                            <TextBox label="タイプ２　blockAreaWrapカスタムClass"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType2BlockWrapCustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                placeholder='カスタムClassを入力してください'
                            />
                        </InputContainer>

                        <InputContainer>
                            <SelectBox
                                label='タイプ２　block下テキスト文字サイズ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType2BelowBlockTextSize'
                                onChange={(e) => handleOnChange(e, 1)}
                            >
                                {fontSizeArrays.map(field => <option value={field.value} key={field.value}> {field.caption} </option>)}
                            </SelectBox>
                        </InputContainer>


                        <InputContainer>
                            <SelectBox
                                label='タイプ２　block下テキスト文字太さ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType2BelowBlockFontWeight'
                                onChange={(e) => handleOnChange(e, 1)}
                            >
                                {fontWeightArrays.map(field => <option value={field.value} key={field.value}> {field.caption} </option>)}
                            </SelectBox>
                        </InputContainer>
                        <InputContainer>
                            <TextBox label="タイプ２　block下テキストカスタムClass"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType2BelowBlockWrapCustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                placeholder='カスタムClassを入力してください'
                            />
                        </InputContainer>
                        <div className="mt-12"></div>


                        <InputContainer>
                            <SelectBox
                                label=' タイプ２　枠線太さ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType2BorderWidth'
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
                                label='タイプ２　枠線種類'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType2BorderStyle'
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
                                label=' タイプ２　枠線角丸サイズ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType2BorderRadius'
                                onChange={(e) => handleOnChange(e, 1)}
                            >
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
                                label='タイプ２　枠の影'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType2DropShadow'
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

                        <div className="flex flex-col mt-12 mb-4">
                            <label htmlFor="headerAreaShadow" className="text-blue-100 text-xs">タイプ２ 配色</label>
                            <div className="flex justify-start space-x-4">
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])}
                                    inputBoxItem="infoType2TitleTextColor" pickerLabel="タイトル色" isBackgroundColor="1"
                                    isDefaultColor={initialValues?.infoType2TitleTextColor} />
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])}
                                    inputBoxItem="infoType2BodyTextColor" pickerLabel="本文色" isBackgroundColor="1"
                                    isDefaultColor={initialValues?.infoType2BodyTextColor} />
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])}
                                    inputBoxItem="infoType2BelowBlockTextColor" pickerLabel="ブロック下文字色" isBackgroundColor="1"
                                    isDefaultColor={initialValues?.infoType2BelowBlockTextColor} />
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [1, 2])}
                                    inputBoxItem="infoType2BackgroundColor" pickerLabel="背景色" isBackgroundColor="1"
                                    isDefaultColor={initialValues?.infoType2BackgroundColor} />
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.borderColor, [1, 2])}
                                    inputBoxItem="infoType2BorderColor" pickerLabel="線色" isBackgroundColor="1"
                                    isDefaultColor={initialValues?.infoType2BorderColor} />

                            </div>
                        </div>
                        <InputContainer>
                            <TextBox label="タイプ２　カスタムClass"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType2CustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                placeholder='カスタムClass'
                                type="text" />
                        </InputContainer>

                        {/* area 3 start */}
                        <InputBoxSeparator cProperty={`mt-8 mb-8`} />


                        <InputContainer>
                            <SelectBox
                                label=' タイプ３　タイトルテキスト文字サイズ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType3TitleTextSize'
                                onChange={(e) => handleOnChange(e, 1)}
                            >
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
                                label='タイプ３　タイトルテキスト文字太さ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType3TitleFontWeight'
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
                            <TextBox label="タイプ３　タイトルWrapカスタムClass"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType3TitleWrapCustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                placeholder='カスタムClassを入力してください'
                            />
                        </InputContainer>
                        <div className="mt-12"></div>
                        <InputContainer>
                            <SelectBox
                                label=' タイプ３　本文テキスト文字サイズ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType3BodyTextSize'
                                onChange={(e) => handleOnChange(e, 1)}
                            >
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
                                label='タイプ３　本文テキスト文字太さ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType3BodyFontWeight'
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
                            <TextBox label="タイプ３　本文テキストカスタムClass"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType3BodyWrapCustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                placeholder='カスタムClassを入力してください'
                            />
                        </InputContainer>
                        <div className="mt-12"></div>
                        <InputContainer>
                            <TextBox label="タイプ３　blockAreaWrapカスタムClass"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType3BlockWrapCustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                placeholder='カスタムClassを入力してください'
                            />
                        </InputContainer>
                        <InputContainer>
                            <SelectBox
                                label='タイプ３　block下テキスト文字サイズ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType3BelowBlockTextSize'
                                onChange={(e) => handleOnChange(e, 1)}
                            >
                                {fontSizeArrays.map(field => <option value={field.value} key={field.value}> {field.caption} </option>)}
                            </SelectBox>
                        </InputContainer>

                        <InputContainer>
                            <SelectBox
                                label='タイプ３　block下テキスト文字太さ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType3BelowBlockFontWeight'
                                onChange={(e) => handleOnChange(e, 1)}
                            >
                                {fontWeightArrays.map(field => <option value={field.value} key={field.value}> {field.caption} </option>)}
                            </SelectBox>
                        </InputContainer>
                        <InputContainer>
                            <TextBox label="タイプ３　block下テキストカスタムClass"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType3BelowBlockWrapCustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                placeholder='カスタムClassを入力してください'
                            />
                        </InputContainer>

                        <div className="mt-12"></div>

                        <InputContainer>
                            <SelectBox
                                label=' タイプ３　枠線太さ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType3BorderWidth'
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
                                label='タイプ３　枠線種類'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType3BorderStyle'
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
                                label=' タイプ３　枠線角丸サイズ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType3BorderRadius'
                                onChange={(e) => handleOnChange(e, 1)}
                            >
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
                                label='タイプ３　枠の影'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType3DropShadow'
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
                        <div className="flex flex-col mt-12 mb-4">
                            <label htmlFor="headerAreaShadow" className="text-blue-100 text-xs">タイプ３ 配色</label>
                            <div className="flex justify-start space-x-4">
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])}
                                    inputBoxItem="infoType3TitleTextColor" pickerLabel="タイトル色" isBackgroundColor="1"
                                    isDefaultColor={initialValues?.infoType3TitleTextColor} />
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])}
                                    inputBoxItem="infoType3BodyTextColor" pickerLabel="本文色" isBackgroundColor="1"
                                    isDefaultColor={initialValues?.infoType3BodyTextColor} />
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])}
                                    inputBoxItem="infoType3BelowBlockTextColor" pickerLabel="ブロック下文字色" isBackgroundColor="1"
                                    isDefaultColor={initialValues?.infoType3BelowBlockTextColor} />
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [1, 2])}
                                    inputBoxItem="infoType3BackgroundColor" pickerLabel="背景色" isBackgroundColor="1"
                                    isDefaultColor={initialValues?.infoType3BackgroundColor} />
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.borderColor, [1, 2])}
                                    inputBoxItem="infoType3BorderColor" pickerLabel="線色" isBackgroundColor="1"
                                    isDefaultColor={initialValues?.infoType3BorderColor} />
                            </div>
                        </div>
                        <InputContainer>
                            <TextBox label="タイプ３　カスタムClass"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType3CustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                placeholder='カスタムClass'
                                type="text" />
                        </InputContainer>


                        {/* area 4 start*/}
                        <InputBoxSeparator cProperty={`mt-8 mb-8`} />

                        <InputContainer>
                            <SelectBox
                                label='タイプ４　タイトルテキスト文字サイズ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType4TitleTextSize'
                                onChange={(e) => handleOnChange(e, 1)}
                            >
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
                                label='タイプ４　タイトルテキスト文字太さ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType4TitleFontWeight'
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
                            <TextBox label="タイプ４　タイトルWrapカスタムClass"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType4TitleWrapCustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                placeholder='カスタムClassを入力してください'
                            />
                        </InputContainer>
                        <div className="mt-12"></div>
                        <InputContainer>
                            <SelectBox
                                label='タイプ４　本文テキスト文字サイズ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType4BodyTextSize'
                                onChange={(e) => handleOnChange(e, 1)}
                            >
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
                                label='タイプ４　本文テキスト文字太さ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType4BodyFontWeight'
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
                            <TextBox label="タイプ４　本文テキストカスタムClass"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType4BodyWrapCustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                placeholder='カスタムClassを入力してください'
                            />
                        </InputContainer>
                        <div className="mt-12"></div>
                        <InputContainer>
                            <TextBox label="タイプ４　blockAreaWrapカスタムClass"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType4BlockWrapCustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                placeholder='カスタムClassを入力してください'
                            />
                        </InputContainer>
                        <InputContainer>
                            <SelectBox
                                label='タイプ４　block下テキスト文字サイズ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType4BelowBlockTextSize'
                                onChange={(e) => handleOnChange(e, 1)}
                            >
                                {fontSizeArrays.map(field => <option value={field.value} key={field.value}> {field.caption} </option>)}
                            </SelectBox>
                        </InputContainer>

                        <InputContainer>
                            <SelectBox
                                label='タイプ４　block下テキスト文字太さ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType4BelowBlockFontWeight'
                                onChange={(e) => handleOnChange(e, 1)}
                            >
                                {fontWeightArrays.map(field => <option value={field.value} key={field.value}> {field.caption} </option>)}
                            </SelectBox>
                        </InputContainer>
                        <InputContainer>
                            <TextBox label="タイプ４　block下テキストカスタムClass"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType4BelowBlockWrapCustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                placeholder='カスタムClassを入力してください'
                            />
                        </InputContainer>

                        <div className="mt-12"></div>
                        <InputContainer>
                            <SelectBox
                                label=' タイプ４　枠線太さ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType4BorderWidth'
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
                                label='タイプ４　枠線種類'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType4BorderStyle'
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
                                label=' タイプ４　枠線角丸サイズ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType4BorderRadius'
                                onChange={(e) => handleOnChange(e, 1)}
                            >
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
                                label='タイプ４　枠の影'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType4DropShadow'
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

                        <div className="flex flex-col mt-12 mb-4">
                            <label htmlFor="headerAreaShadow" className="text-blue-100 text-xs">タイプ４ 配色</label>
                            <div className="flex justify-start space-x-4">
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])}
                                    inputBoxItem="infoType4TitleTextColor" pickerLabel="タイトル色" isBackgroundColor="1"
                                    isDefaultColor={initialValues?.infoType4TitleTextColor} />
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])}
                                    inputBoxItem="infoType4BodyTextColor" pickerLabel="本文色" isBackgroundColor="1"
                                    isDefaultColor={initialValues?.infoType4BodyTextColor} />
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])}
                                    inputBoxItem="infoType4BelowBlockTextColor" pickerLabel="ブロック下文字色" isBackgroundColor="1"
                                    isDefaultColor={initialValues?.infoType4BelowBlockTextColor} />
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [1, 2])}
                                    inputBoxItem="infoType4BackgroundColor" pickerLabel="背景色" isBackgroundColor="1"
                                    isDefaultColor={initialValues?.infoType4BackgroundColor} />
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.borderColor, [1, 2])}
                                    inputBoxItem="infoType4BorderColor" pickerLabel="線色" isBackgroundColor="1"
                                    isDefaultColor={initialValues?.infoType4BorderColor} />
                            </div>
                        </div>
                        <InputContainer>
                            <TextBox label="タイプ４　カスタムClass"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType4CustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                placeholder='カスタムClass'
                                type="text" />
                        </InputContainer>

                        {/* area 5 start*/}
                        <InputBoxSeparator cProperty={`mt-8 mb-8`} />

                        <InputContainer>
                            <SelectBox
                                label=' タイプ５　タイトルテキスト文字サイズ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType5TitleTextSize'
                                onChange={(e) => handleOnChange(e, 1)}
                            >
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
                                label='タイプ５　タイトルテキスト文字太さ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType5TitleFontWeight'
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
                            <TextBox label="タイプ５　タイトルWrapカスタムClass"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType5TitleWrapCustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                placeholder='カスタムClassを入力してください'
                            />
                        </InputContainer>
                        <div className="mt-12"></div>
                        <InputContainer>
                            <SelectBox
                                label='タイプ５　本文テキスト文字サイズ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType5BodyTextSize'
                                onChange={(e) => handleOnChange(e, 1)}
                            >
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
                                label='タイプ５　本文テキスト文字太さ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType5BodyFontWeight'
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
                            <TextBox label="タイプ５　本文テキストカスタムClass"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType5BodyWrapCustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                placeholder='カスタムClassを入力してください'
                            />
                        </InputContainer>
                        <div className="mt-12"></div>
                        <InputContainer>
                            <TextBox label="タイプ５　blockAreaWrapカスタムClass"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType5BlockWrapCustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                placeholder='カスタムClassを入力してください'
                            />
                        </InputContainer>
                        <InputContainer>
                            <SelectBox
                                label='タイプ５　block下テキスト文字サイズ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType5BelowBlockTextSize'
                                onChange={(e) => handleOnChange(e, 1)}
                            >
                                {fontSizeArrays.map(field => <option value={field.value} key={field.value}> {field.caption} </option>)}
                            </SelectBox>
                        </InputContainer>

                        <InputContainer>
                            <SelectBox
                                label='タイプ５　block下テキスト文字太さ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType5BelowBlockFontWeight'
                                onChange={(e) => handleOnChange(e, 1)}
                            >
                                {fontWeightArrays.map(field => <option value={field.value} key={field.value}> {field.caption} </option>)}
                            </SelectBox>
                        </InputContainer>
                        <InputContainer>
                            <TextBox label="タイプ５　block下テキストカスタムClass"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType5BelowBlockWrapCustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                placeholder='カスタムClassを入力してください'
                            />
                        </InputContainer>
                        <div className="mt-12"></div>

                        <InputContainer>
                            <SelectBox
                                label=' タイプ５　枠線太さ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType5BorderWidth'
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
                                label='タイプ５　枠線種類'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType5BorderStyle'
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
                                label=' タイプ５　枠線角丸サイズ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType5BorderRadius'
                                onChange={(e) => handleOnChange(e, 1)}
                            >
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
                                label='タイプ５　枠の影'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType5DropShadow'
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

                        <div className="flex flex-col mt-12 mb-4">
                            <label htmlFor="headerAreaShadow" className="text-blue-100 text-xs">タイプ５ 配色</label>
                            <div className="flex justify-start space-x-4">
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])}
                                    inputBoxItem="infoType5TitleTextColor" pickerLabel="タイトル色" isBackgroundColor="1"
                                    isDefaultColor={initialValues?.infoType5TitleTextColor} />
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])}
                                    inputBoxItem="infoType5BodyTextColor" pickerLabel="本文色" isBackgroundColor="1"
                                    isDefaultColor={initialValues?.infoType5BodyTextColor} />
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])}
                                    inputBoxItem="infoType5BelowBlockTextColor" pickerLabel="ブロック下文字色" isBackgroundColor="1"
                                    isDefaultColor={initialValues?.infoType5BelowBlockTextColor} />
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [1, 2])}
                                    inputBoxItem="infoType5BackgroundColor" pickerLabel="背景色" isBackgroundColor="1"
                                    isDefaultColor={initialValues?.infoType5BackgroundColor} />
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.borderColor, [1, 2])}
                                    inputBoxItem="infoType5BorderColor" pickerLabel="線色" isBackgroundColor="1"
                                    isDefaultColor={initialValues?.infoType5BorderColor} />

                            </div>
                        </div>

                        <InputContainer className="!mb-0">
                            <TextBox label="タイプ５　カスタムClass"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='infoType5CustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                placeholder='カスタムClass'
                                type="text" />
                        </InputContainer>
                    </div>
                </Form>
            </div>
        </Formik>
    );
};
export default SettingInformationForm