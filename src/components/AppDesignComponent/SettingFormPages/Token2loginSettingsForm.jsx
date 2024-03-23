import InputContainer from "../../Wrapper/InputContainer";
import TextBox from "../../Form/FormInputs/TextBox";
import SelectBox from "../../Form/FormInputs/SelectBox";
import { useRecoilState, useRecoilValue } from "recoil";

import React, { useState, useEffect } from "react";
import { Formik, Form, useFormikContext } from "formik";
import InputBoxSeparator from '../../InputBoxSeparator/InputBoxSeparator'
import ColorPickerWithRecent from "../../ColorPicker/ColorPickerWithRecent";

import {
    borderAttributes, borderStyles, shadowAttributes, heightAttributes, positionAttributes, fontSizeAttributes, fontWeightAttributes, justifyContentAttributes, headerStructures,
    textAlignAttributes,
    letterSpacingAttributes,
    verticalAlignAttributes,
    paddingXAttributes,
    paddingYAttributes,
    borderRadiousAttributes,
    flexBasisAttributes
} from "../../../lib/tailwindClassAttributes"
import { appDesignerState, getSelectedPageData } from "../../../store/recoil/appDesignerState";


const Token2loginSettingsForm = ({ formData: initialData, handleOnChange, handleOnChangeColor = () => { }, tailwindColorCodeKeys }) => {
    const [recoilStateValue, setRecoilState] = useRecoilState(appDesignerState);
    const { activeTab, activePageId, tabItems } = recoilStateValue;
    let numField = Array.from({ length: initialData.divisionNumber }, (_, i) => i + 1);

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
                                label='ラベル文字サイズ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='labelTextSize'
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
                                label='ラベル文字太さ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='labelTextWeight'
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

                        <div className="flex flex-col mb-4">
                            <label htmlFor="headerAreaShadow" className="text-blue-100  text-xs">ラベル配色</label>
                            <div className="flex justify-start">
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])}
                                    inputBoxItem="labelTextColor" pickerLabel="ラベル文字色" isBackgroundColor="1"
                                    isDefaultColor={initialData?.labelTextColor} />
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [1, 2])}
                                    inputBoxItem="labelBackgroundColor" pickerLabel="ラベル背景色" isBackgroundColor="1"
                                    isDefaultColor={initialData?.labelBackgroundColor} />
                            </div>
                        </div>

                        <InputContainer>
                            <TextBox label="ラベルカスタムClass"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='labelCustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                placeholder='カスタムClass'
                                type="text" />
                        </InputContainer>

                        <InputBoxSeparator cProperty={`mt-8 mb-8`} />


                        <InputContainer>
                            <TextBox label="必須文言	"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='requiredCharacters'
                                onBlur={(e) => handleOnChange(e, 4)}
                                placeholder='必須文言'
                                type="text" />
                        </InputContainer>
                        <InputContainer>
                            <SelectBox
                                label='必須文字サイズ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='requiredTextSize'
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
                                label='必須文字太さ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='requiredTextWeight'
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

                        <div className="flex flex-col mb-4">
                            <label htmlFor="headerAreaShadow" className="text-blue-100  text-xs">必須配色</label>
                            <div className="flex justify-start space-x-4">
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])}
                                    inputBoxItem="requiredTextColor" pickerLabel="文字色" isBackgroundColor="1"
                                    isDefaultColor={initialData?.requiredTextColor} />
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [1, 2])}
                                    inputBoxItem="requiredBackgroundColor" pickerLabel="背景色" isBackgroundColor="1"
                                    isDefaultColor={initialData?.requiredBackgroundColor} />

                            </div>
                        </div>

                        <InputContainer>
                            <TextBox label="必須カスタムClass"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='requiredCustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                // maxLength='32'
                                placeholder='カスタムClass'
                                type="text" />
                        </InputContainer>

                        <InputBoxSeparator cProperty={`mt-8 mb-8`} />

                        <InputContainer>
                            <SelectBox
                                label='トークン1入力エリア分割数'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='divisionNumber'
                                onChange={(e) => handleOnChange(e, 4)}>
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                            </SelectBox>
                        </InputContainer>
                        <div className="flex justify-start space-x-4">

                            {numField.length > 0 && numField.map((number, index) => (
                                <>
                                    <div className="w-1/4">
                                        <InputContainer>
                                            <SelectBox
                                                label='トークン1入力エリア分割比率'
                                                labelClassName='text-blue-100 text-xs'
                                                inputClassName='bg-blue-25'
                                                name={`flexBasis${number}`}
                                                onChange={(e) => handleOnChange(e, 1)}>
                                                {flexBasisAttributes.length > 0 &&
                                                    flexBasisAttributes.map((field, index) => (
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
                                </>
                            ))
                            }
                        </div>

                        <InputContainer>
                            <TextBox label="トークン1入力エリア接続文字"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='divisionText'
                                onBlur={(e) => handleOnChange(e, 4)}
                                placeholder='カスタムClass'
                                type="text" />
                        </InputContainer>
                        <InputContainer>
                            <SelectBox
                                label='トークン1接続文字サイズ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='divisionTextSize'
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
                                label='トークン1接続文字太さ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='divisionTextWeight'
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

                        <div className="flex flex-col mb-4">
                            <label htmlFor="headerAreaShadow" className="text-blue-100  text-xs">配色</label>
                            <div className="flex justify-start">
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])}
                                    inputBoxItem="divisionTextColor" pickerLabel="トークン1接続文字色"
                                    isBackgroundColor="1"
                                    isDefaultColor={initialData?.divisionTextColor} />

                            </div>
                        </div>

                        <InputContainer>
                            <TextBox label="トークン1接続文字カスタムクラス"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='divisionTextCustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                placeholder='カスタムClass'
                                type="text" />
                        </InputContainer>

                        <InputContainer>
                            <TextBox label="トークン1接続文字Wrapカスタムクラス"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='divisionTextwrapCustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                placeholder='カスタムClass'
                                type="text" />
                        </InputContainer>
                        <InputBoxSeparator cProperty={`mt-8 mb-8`} />

                        <InputContainer>
                            <SelectBox
                                label='トークン１,2入力エリア文字サイズ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='inputTextSize'
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
                                label='トークン１,2入力エリア文字太さ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='inputTextWeight'
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
                            <SelectBox
                                label='トークン１,2入力エリア罫線'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='inputBorderWidth'
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
                                label='トークン１,2入力エリア枠線種別'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='inputBorderStyle'
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
                                label='トークン１,2入力エリア角丸サイズ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='inputBorderRadius'
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


                        <div className="flex flex-col mb-4">
                            <label htmlFor="headerAreaShadow" className="text-blue-100  text-xs">トークン１,2入力エリア配色</label>
                            <div className="flex justify-start space-x-4">

                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.borderColor, [1, 2])}
                                    inputBoxItem="inputBorderColor" pickerLabel="枠線色" isBackgroundColor="1"
                                    isDefaultColor={initialData?.inputBorderColor} />

                            </div>
                        </div>

                        <InputBoxSeparator cProperty={`mt-8 mb-8`} />

                        <InputContainer>
                            <SelectBox
                                label='トークン１入力エリアマスク表示'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='isMask'
                                onChange={(e) => handleOnChange(e, 4)}>
                                <option value='false'>しない</option>
                                <option value='true'>する</option>
                            </SelectBox>
                        </InputContainer>
                        <InputContainer>
                            <SelectBox
                                label='入力エリアプレイスホルダー文字サイズ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='placeholderTextSize'
                                onChange={(e) => handleOnChange(e, 1)}>
                                {fontSizeAttributes.length > 0 &&
                                    fontSizeAttributes.map((field, index) => (
                                        <option
                                            value={'placeholder:' + field.value}
                                            key={field.value + "_" + index}>
                                            {field.caption}
                                        </option>
                                    )
                                    )}
                            </SelectBox>
                        </InputContainer>
                        <InputContainer>
                            <SelectBox
                                label='入力エリアプレイスホルダー文字太さ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='placeholderTextWeight'
                                onChange={(e) => handleOnChange(e, 1)}>
                                {fontWeightAttributes.length > 0 &&
                                    fontWeightAttributes.map((field, index) => (
                                        <option
                                            value={'placeholder:' + field.value}
                                            key={field.value + "_" + index}>
                                            {field.caption}
                                        </option>
                                    )
                                    )}
                            </SelectBox>
                        </InputContainer>

                        <div className="flex flex-col mb-4">
                            <label htmlFor="headerAreaShadow" className="text-blue-100  text-xs">トークン１配色</label>
                            <div className="flex justify-start space-x-4">
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])}
                                    inputBoxItem="inputTextColor" pickerLabel="入力文字色" isBackgroundColor="1"
                                    isDefaultColor={initialData?.inputTextColor} />
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2], 'placeholder')}
                                    inputBoxItem="placeholderTextColor" pickerLabel="プレイスホルダー文字色"
                                    isBackgroundColor="1"
                                    isDefaultColor={initialData?.placeholderTextColor} />
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [1, 2])}
                                    inputBoxItem="inputBackgroundColor" pickerLabel="背景色"
                                    isBackgroundColor="1"
                                    isDefaultColor={initialData?.inputBackgroundColor} />


                            </div>
                        </div>

                        <InputBoxSeparator cProperty={`mt-8 mb-8`} />

                        <InputContainer>
                            <SelectBox
                                label='トークン2月日表示文字サイズ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='dayMonthTextSize'
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
                                label='トークン2月日表示文字太さ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='dayMonthTextWeight'
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

                        <div className="flex flex-col mb-4">
                            <label htmlFor="headerAreaShadow" className="text-blue-100  text-xs">トークン2配色</label>
                            <div className="flex justify-start space-x-4">
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])}
                                    inputBoxItem="selectTextColor" pickerLabel="選択文字色" isBackgroundColor="1"
                                    isDefaultColor={initialData?.selectTextColor} />
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [1, 2])}
                                    inputBoxItem="selectBackgroundColor" pickerLabel="選択背景色"
                                    isBackgroundColor="1"
                                    isDefaultColor={initialData?.selectBackgroundColor} />
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])}
                                    inputBoxItem="dayMonthTextColor" pickerLabel="月日文字色"
                                    isBackgroundColor="1"
                                    isDefaultColor={initialData?.dayMonthTextColor} />
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [1, 2])}
                                    inputBoxItem="dayMonthBackgroundColor" pickerLabel="月日背景色"
                                    isBackgroundColor="1"
                                    isDefaultColor={initialData?.dayMonthBackgroundColor} />


                            </div>
                        </div>

                        <InputContainer>
                            <TextBox label="トークン2月日表示カスタムClass"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='dayMonthcustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                placeholder='カスタムClass'
                                type="text" />
                        </InputContainer>
                        <InputBoxSeparator cProperty={`mt-8 mb-8`} />

                        <InputContainer>
                            <SelectBox
                                label='トークン１,2下エラーメッセージ文字サイズ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='inputErrorTextSize'
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
                                label='トークン１,2下エラーメッセージ文字太さ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='inputErrorTextWeight'
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

                        <div className="flex flex-col mb-4">
                            <label htmlFor="headerAreaShadow" className="text-blue-100  text-xs">トークン１,2下エラーメッセージ配色</label>
                            <div className="flex justify-start space-x-4">
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])}
                                    inputBoxItem="inputErrorTextColor" pickerLabel="エラーメッセージ文字色" isBackgroundColor="1"
                                    isDefaultColor={initialData?.inputErrorTextColor} />
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [1, 2])}
                                    inputBoxItem="inputErrorBackgroundColor" pickerLabel="エラーメッセージ背景色"
                                    isBackgroundColor="1"
                                    isDefaultColor={initialData?.inputErrorBackgroundColor} />



                            </div>
                        </div>

                        <InputContainer>
                            <TextBox label="トークン１,2下エラーメッセージカスタムClass"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='inputErrorCustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                placeholder='カスタムClass'
                                type="text" />
                        </InputContainer>


                        <InputContainer>
                            <SelectBox
                                label='ボタンタイプ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='buttonType'
                                onChange={(e) => handleOnChange(e, 4)}>
                                <option value='a'>A</option>
                                <option value='b'>B</option>
                                <option value='c'>C</option>
                            </SelectBox>
                        </InputContainer>


                        <InputContainer>
                            <SelectBox
                                label='ボタン下エラーメッセージ文字サイズ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='buttonErrorTextSize'
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
                                label='ボタン下エラーメッセージ文字太さ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='buttonErrorTextWeight'
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

                        <div className="flex flex-col mb-4">
                            <label htmlFor="headerAreaShadow" className="text-blue-100  text-xs">ボタン下エラーメッセージ配色</label>
                            <div className="flex justify-start space-x-4">
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])}
                                    inputBoxItem="buttonErrorTextColor" pickerLabel="エラーメッセージ文字色" isBackgroundColor="1"
                                    isDefaultColor={initialData?.buttonErrorTextColor} />
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [1, 2])}
                                    inputBoxItem="buttonErrorBackgroundColor" pickerLabel="エラーメッセージ背景色"
                                    isBackgroundColor="1"
                                    isDefaultColor={initialData?.buttonErrorBackgroundColor} />


                            </div>
                        </div>

                        <InputContainer>
                            <TextBox label="ボタン下エラーメッセージカスタムClass"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='buttonErrorCustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                placeholder='カスタムClass'
                                type="text" />
                        </InputContainer>























                        <InputBoxSeparator cProperty={`mt-8 mb-8`} />



                        <div className="mt-12"></div>



                        <InputContainer>
                            <TextBox label="トークン1iWrapカスタムClass"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='token1WrapCustumClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                placeholder='カスタムClass'
                                type="text" />
                        </InputContainer>
                        <InputContainer>
                            <TextBox label="トークン2WrapカスタムClass"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='token2WrapCustumClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                placeholder='カスタムClass'
                                type="text" />
                        </InputContainer>
                        <InputContainer>
                            <TextBox label="ボタンWrapカスタムClass"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='buttonWrapCustumClass'
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
export default Token2loginSettingsForm