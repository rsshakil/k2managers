import { Form, Formik } from "formik";
import React from "react";
import { useRecoilState } from "recoil";
import ColorPickerWithRecent from "../../ColorPicker/ColorPickerWithRecent";
import Note from "../../Form/FormInputs/Note";
import SelectBox from "../../Form/FormInputs/SelectBox";
import TextBox from "../../Form/FormInputs/TextBox";
import InputBoxSeparator from '../../InputBoxSeparator/InputBoxSeparator';
import InputContainer from "../../Wrapper/InputContainer";


import {
    borderAttributes, borderRadiousAttributes, borderStyles, fontSizeAttributes, fontWeightAttributes
} from "../../../lib/tailwindClassAttributes";
import { appDesignerState } from "../../../store/recoil/appDesignerState";


const ZipSearchSettingsForm = ({ formData: initialData, handleOnChange, handleOnChangeColor = () => { }, tailwindColorCodeKeys }) => {
    const [recoilStateValue, setRecoilState] = useRecoilState(appDesignerState);
    const { activeTab, activePageId, tabItems } = recoilStateValue;

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
                                name='labelFontWeight'
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
                            <div className="flex justify-start space-x-4">
                                <ColorPickerWithRecent labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])}
                                    inputBoxItem="labelTextColor" pickerLabel="文字色"
                                    isBackgroundColor="1"
                                    isDefaultColor={initialData?.labelTextColor} />
                                <ColorPickerWithRecent labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [1, 2])}
                                    inputBoxItem="labelTextBackgroundColor" pickerLabel="背景色"
                                    isBackgroundColor="1"
                                    isDefaultColor={initialData?.labelTextBackgroundColor} />


                            </div>
                        </div>

                        <InputContainer>
                            <Note
                                label='ラベルカスタムClass'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25 !p-1'
                                height='h-8'
                                name='labelCustomClass'
                                placeholder="カスタムClass"
                                onBlur={(e) => handleOnChange(e, 1)}
                            />
                        </InputContainer>

                        <InputBoxSeparator cProperty={`mt-8 mb-8`} />

                        <InputContainer>
                            <TextBox label="必須文言"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='requiredCharacters'
                                onBlur={(e) => handleOnChange(e, 4)}
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
                                name='requiredFontWeight'
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
                                <ColorPickerWithRecent labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])}
                                    inputBoxItem="requiredTextColor" pickerLabel="文字色"
                                    isBackgroundColor="1"
                                    isDefaultColor={initialData?.requiredTextColor} />
                                <ColorPickerWithRecent labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [1, 2])}
                                    inputBoxItem="requiredBackgroundColor" pickerLabel="背景色"
                                    isBackgroundColor="1"
                                    isDefaultColor={initialData?.requiredBackgroundColor} />


                            </div>
                        </div>

                        <InputContainer>
                            <Note
                                label='必須カスタムClass'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25 !p-1'
                                height='h-8'
                                name='requiredCustomClass'
                                placeholder="カスタムClass"
                                onBlur={(e) => handleOnChange(e, 1)}
                            />
                        </InputContainer>

                        <InputBoxSeparator cProperty={`mt-8 mb-8`} />

                        <InputContainer>
                            <TextBox label="接続文字"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='divisionText'
                                onBlur={(e) => handleOnChange(e, 4)}
                                type="text" />
                        </InputContainer>

                        <InputContainer>
                            <SelectBox
                                label='接続文字サイズ'
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
                                label='接続文字太さ'
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
                            {/* <label htmlFor="headerAreaShadow" className="text-blue-100  text-xs">必須配色</label> */}
                            <div className="flex justify-start space-x-4">
                                <ColorPickerWithRecent labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])}
                                    inputBoxItem="divisionTextColor" pickerLabel="接続文字色"
                                    isBackgroundColor="1"
                                    isDefaultColor={initialData?.divisionTextColor} />


                            </div>
                        </div>


                        <InputContainer>
                            <Note
                                label='接続文字カスタムClass'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25 !p-1'
                                height='h-8'
                                name='divisionTextCustomClass'
                                placeholder="カスタムClass"
                                onBlur={(e) => handleOnChange(e, 1)}
                            />
                        </InputContainer>


                        <InputContainer>
                            <Note
                                label='接続文字WrapカスタムClass'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25 !p-1'
                                height='h-8'
                                name='divisionTextwrapCustomClass'
                                placeholder="カスタムClass"
                                onBlur={(e) => handleOnChange(e, 1)}
                            />
                        </InputContainer>

                        <InputBoxSeparator cProperty={`mt-8 mb-8`} />

                        <InputContainer>
                            <SelectBox
                                label='入力エリア文字サイズ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='valueTextSize'
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
                                label='入力エリア文字太さ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='valueFontWeight'
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
                                label='入力エリア罫線'
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
                                label='入力エリア枠線種別'
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
                                label='入力エリア角丸サイズ'
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
                            <label htmlFor="headerAreaShadow" className="text-blue-100  text-xs">入力エリア配色</label>
                            <div className="flex justify-start space-x-4">
                                <ColorPickerWithRecent labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])}
                                    inputBoxItem="valueTextColor" pickerLabel="入力文字色"
                                    isBackgroundColor="1"
                                    isDefaultColor={initialData?.valueTextColor} />
                                <ColorPickerWithRecent labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2], 'placeholder')}
                                    inputBoxItem="placeholderTextColor" pickerLabel="プレイスホルダー文字色"
                                    isBackgroundColor="1"
                                    isDefaultColor={initialData?.placeholderTextColor} />

                                <ColorPickerWithRecent labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.borderColor, [1, 2])}
                                    inputBoxItem="borderColor" pickerLabel="枠線色"
                                    isBackgroundColor="1"
                                    isDefaultColor={initialData?.borderColor} />
                                <ColorPickerWithRecent labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [1, 2])}
                                    inputBoxItem="inputBackgroundColor" pickerLabel="背景色"
                                    isBackgroundColor="1"
                                    isDefaultColor={initialData?.inputBackgroundColor} />


                            </div>
                        </div>

                        <InputContainer>
                            <Note
                                label='入力エリアカスタムClass'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25 !p-1'
                                height='h-8'
                                name='inputCustomClass'
                                placeholder="カスタムClass"
                                onBlur={(e) => handleOnChange(e, 1)}
                            />
                        </InputContainer>

                        <InputBoxSeparator cProperty={`mt-8 mb-8`} />

                        <InputContainer>
                            <SelectBox
                                label='エラーメッセージ文字サイズ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='errorMessageTextSize'
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
                                label='エラーメッセージ文字太さ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='errorMessageFontWeight'
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
                            <label htmlFor="headerAreaShadow" className="text-blue-100  text-xs">エラーメッセージ配色</label>
                            <div className="flex justify-start space-x-4">
                                <ColorPickerWithRecent labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])}
                                    inputBoxItem="errorMessageTextColor" pickerLabel="文字色"
                                    isBackgroundColor="1"
                                    isDefaultColor={initialData?.errorMessageTextColor} />
                                <ColorPickerWithRecent labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [1, 2])}
                                    inputBoxItem="errorMessageBackgroundColor" pickerLabel="背景色"
                                    isBackgroundColor="1"
                                    isDefaultColor={initialData?.errorMessageBackgroundColor} />


                            </div>
                        </div>


                        <InputContainer>
                            <Note
                                label='エラーメッセージカスタムClass'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25 !p-1'
                                height='h-8'
                                name='errorMessageCustomClass'
                                placeholder="カスタムClass"
                                onBlur={(e) => handleOnChange(e, 1)}
                            />
                        </InputContainer>

                        <InputBoxSeparator cProperty={`mt-8 mb-8`} />

                        <InputContainer>
                            <Note
                                label='入力フォームWrapカスタムClass'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25 !p-1'
                                height='h-8'
                                name='inputWrapCustomClass'
                                placeholder="カスタムClass"
                                onBlur={(e) => handleOnChange(e, 1)}
                            />
                        </InputContainer>

                    </div>
                </Form>
            </div>
        </Formik>
    );
}
export default ZipSearchSettingsForm