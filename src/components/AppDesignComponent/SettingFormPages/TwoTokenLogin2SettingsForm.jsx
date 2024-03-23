import { useRecoilState } from "recoil";
import SelectBox from "../../Form/FormInputs/SelectBox";
import TextBox from "../../Form/FormInputs/TextBox";
import InputContainer from "../../Wrapper/InputContainer";

import { Form, Formik } from "formik";
import React from "react";
import ColorPickerWithRecent from "../../ColorPicker/ColorPickerWithRecent";
import InputBoxSeparator from '../../InputBoxSeparator/InputBoxSeparator';

import {
    borderAttributes, borderRadiousAttributes, borderStyles, flexBasisAttributes, fontSizeAttributes, fontWeightAttributes
} from "../../../lib/tailwindClassAttributes";
import { appDesignerState } from "../../../store/recoil/appDesignerState";


const TwoTokenLogin2SettingsForm = ({ formData: initialData, handleOnChange, handleOnChangeColor = () => { }, tailwindColorCodeKeys }) => {
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
                    <div className="flex justify-between space-x-4">
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label='ラベル文字サイズ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='labelTextSize'
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
                                    label='ラベル文字太さ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='labelTextWeight'
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
                        <TextBox label="必須文言"
                            labelClassName='text-blue-100 text-xs'
                            inputClassName='bg-blue-25'
                            name='requiredCharacters'
                            onBlur={(e) => handleOnChange(e, 4)}
                            placeholder='必須文言'
                            type="text" />
                    </InputContainer>

                    <div className="flex justify-between space-x-4">
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label='必須文字サイズ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='requiredTextSize'
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
                                    label='必須文字太さ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='requiredTextWeight'
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
                            placeholder='カスタムClass'
                            type="text" />
                    </InputContainer>

                    <InputBoxSeparator cProperty={`mt-8 mb-8`} />

                    <InputContainer>
                        <SelectBox
                            label='ID入力エリア分割数'
                            labelClassName='text-blue-100 text-xs'
                            inputClassName='bg-blue-25'
                            name='divisionNumber'
                            onChange={(e) => handleOnChange(e, 4)}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                        </SelectBox>
                    </InputContainer>

                    <div className="">
                        <label className="text-blue-100 text-xs">ID入力エリア分割比率</label>

                        <div className="flex justify-start space-x-4">
                            {numField.length > 0 && numField.map((number, index) => (
                                <div className="w-1/4">
                                    <InputContainer>
                                        <SelectBox
                                            label=''
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
                            ))}
                        </div>
                    </div>

                    <InputContainer>
                        <TextBox label="ID入力エリア接続文字"
                            labelClassName='text-blue-100 text-xs'
                            inputClassName='bg-blue-25'
                            name='divisionText'
                            onBlur={(e) => handleOnChange(e, 4)}
                            placeholder='ID入力エリア接続文字'
                            type="text" />
                    </InputContainer>

                    <div className="flex justify-between space-x-4">
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label='ID接続文字サイズ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='divisionTextSize'
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
                                    label='ID接続文字太さ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='divisionTextWeight'
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
                        <label htmlFor="headerAreaShadow" className="text-blue-100  text-xs">配色</label>
                        <div className="flex justify-start">
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])}
                                inputBoxItem="divisionTextColor" pickerLabel="ID接続文字色"
                                isBackgroundColor="1"
                                isDefaultColor={initialData?.divisionTextColor} />
                        </div>
                    </div>

                    <InputContainer>
                        <TextBox label="ID接続文字カスタムClass"
                            labelClassName='text-blue-100 text-xs'
                            inputClassName='bg-blue-25'
                            name='divisionTextCustomClass'
                            onBlur={(e) => handleOnChange(e, 1)}
                            placeholder='カスタムClass'
                            type="text" />
                    </InputContainer>
                    <InputContainer>
                        <TextBox label="ID接続文字WrapカスタムClass"
                            labelClassName='text-blue-100 text-xs'
                            inputClassName='bg-blue-25'
                            name='divisionTextwrapCustomClass'
                            onBlur={(e) => handleOnChange(e, 1)}
                            placeholder='カスタムClass'
                            type="text" />
                    </InputContainer>

                    <InputBoxSeparator cProperty={`mt-8 mb-8`} />

                    <div className="flex justify-between space-x-4">
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label='ID password入力エリア文字サイズ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='inputTextSize'
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
                                    label='ID password入力エリア文字太さ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='inputTextWeight'
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
                        <SelectBox
                            label='ID password入力エリア罫線'
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
                            label='ID password入力エリア枠線種別'
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
                            label='ID password入力エリア角丸サイズ'
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
                        <label htmlFor="headerAreaShadow" className="text-blue-100  text-xs">ID password入力エリア配色</label>
                        <div className="flex justify-start space-x-4">
                            <ColorPickerWithRecent
                                labelClassName="text-[10px] text-blue-100"
                                setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.borderColor, [1, 2])}
                                inputBoxItem="inputBorderColor" pickerLabel="枠線色" isBackgroundColor="1"
                                isDefaultColor={initialData?.inputBorderColor} />
                        </div>
                    </div>

                    <InputBoxSeparator cProperty={`mt-8 mb-8`} />

                    <div className="flex justify-between space-x-4">
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label='ID入力エリアマスク表示'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='isMaskId'
                                    onChange={(e) => handleOnChange(e, 4)}>
                                    <option value={false}>しない</option>
                                    <option value={true}>する</option>
                                </SelectBox>
                            </InputContainer>
                        </div>
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label='password入力エリアマスク表示'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='isMaskPssword'
                                    onChange={(e) => handleOnChange(e, 4)}>
                                    <option value={false}>しない</option>
                                    <option value={true}>する</option>
                                </SelectBox>
                            </InputContainer>
                        </div>
                    </div>

                    <div className="flex justify-between space-x-4">
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label='ID password入力エリアプレイスホルダー文字サイズ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='placeholderTextSize'
                                    onChange={(e) => handleOnChange(e, 1)}>
                                    {fontSizeAttributes.map((field, index) => (
                                        <option
                                            value={'placeholder:' + field.value}
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
                                    label='ID password入力エリアプレイスホルダー文字太さ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='placeholderTextWeight'
                                    onChange={(e) => handleOnChange(e, 1)}>
                                    {fontWeightAttributes.map((field, index) => (
                                        <option
                                            value={'placeholder:' + field.value}
                                            key={field.value + "_" + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                        </div>
                    </div>

                    <div className="flex flex-col mb-4">
                        <label htmlFor="headerAreaShadow" className="text-blue-100  text-xs">ID password配色</label>
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

                    <InputContainer>
                        <TextBox label="ID inputカスタムClass"
                            labelClassName='text-blue-100 text-xs'
                            inputClassName='bg-blue-25'
                            name='idInputCustomClass'
                            onBlur={(e) => handleOnChange(e, 1)}
                            placeholder='カスタムClass'
                            type="text" />
                    </InputContainer>
                    <InputContainer>
                        <TextBox label="password inputカスタムClass"
                            labelClassName='text-blue-100 text-xs'
                            inputClassName='bg-blue-25'
                            name='passwordInputCustomClass'
                            onBlur={(e) => handleOnChange(e, 1)}
                            placeholder='カスタムClass'
                            type="text" />
                    </InputContainer>

                    <InputBoxSeparator cProperty={`mt-8 mb-8`} />

                    <div className="flex justify-between space-x-4">
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label='エラーメッセージ文字サイズ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='inputErrorTextSize'
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
                                    label='エラーメッセージ文字太さ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='inputErrorTextWeight'
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
                        <label htmlFor="headerAreaShadow" className="text-blue-100  text-xs">ID 誕生日下エラーメッセージ配色</label>
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
                        <TextBox label="エラーメッセージカスタムClass"
                            labelClassName='text-blue-100 text-xs'
                            inputClassName='bg-blue-25'
                            name='inputErrorCustomClass'
                            onBlur={(e) => handleOnChange(e, 1)}
                            placeholder='カスタムClass'
                            type="text" />
                    </InputContainer>

                    <InputBoxSeparator cProperty={`mt-8 mb-8`} />

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

                    <div className="flex justify-between space-x-4">
                        <div className="w-1/2">
                            <InputContainer>
                                <SelectBox
                                    label='ボタン上エラーメッセージ文字サイズ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='buttonErrorTextSize'
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
                                    label='ボタン上エラーメッセージ文字太さ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='buttonErrorTextWeight'
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
                        <label htmlFor="headerAreaShadow" className="text-blue-100  text-xs">ボタン上エラーメッセージ配色</label>
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
                        <TextBox label="ボタン上エラーメッセージカスタムClass"
                            labelClassName='text-blue-100 text-xs'
                            inputClassName='bg-blue-25'
                            name='buttonErrorCustomClass'
                            onBlur={(e) => handleOnChange(e, 1)}
                            placeholder='カスタムClass'
                            type="text" />
                    </InputContainer>

                    <InputBoxSeparator cProperty={`mt-8 mb-8`} />

                    <InputContainer>
                        <TextBox label="ID WrapカスタムClass"
                            labelClassName='text-blue-100 text-xs'
                            inputClassName='bg-blue-25'
                            name='idWrapCustomClass'
                            onBlur={(e) => handleOnChange(e, 1)}
                            placeholder='カスタムClass'
                            type="text" />
                    </InputContainer>
                    <InputContainer>
                        <TextBox label="password WrapカスタムClass"
                            labelClassName='text-blue-100 text-xs'
                            inputClassName='bg-blue-25'
                            name='passwordWrapCustomClass'
                            onBlur={(e) => handleOnChange(e, 1)}
                            placeholder='カスタムClass'
                            type="text" />
                    </InputContainer>
                    <InputContainer>
                        <TextBox label="ボタンWrapカスタムClass"
                            labelClassName='text-blue-100 text-xs'
                            inputClassName='bg-blue-25'
                            name='buttonWrapCustomClass'
                            onBlur={(e) => handleOnChange(e, 1)}
                            placeholder='カスタムClass'
                            type="text" />
                    </InputContainer>
                </Form>
            </div>
        </Formik>
    );
}
export default TwoTokenLogin2SettingsForm