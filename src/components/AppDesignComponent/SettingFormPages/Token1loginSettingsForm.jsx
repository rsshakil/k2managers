import { useRecoilState } from "recoil";
import SelectBox from "../../Form/FormInputs/SelectBox";
import TextBox from "../../Form/FormInputs/TextBox";
import InputContainer from "../../Wrapper/InputContainer";

import { Form, Formik } from "formik";
import React from "react";
import ColorPickerWithRecent from "../../ColorPicker/ColorPickerWithRecent";
import InputBoxSeparator from '../../InputBoxSeparator/InputBoxSeparator';

import {
    borderAttributes, borderRadiousAttributes, borderStyles, fontSizeAttributes, fontWeightAttributes
} from "../../../lib/tailwindClassAttributes";
import { appDesignerState } from "../../../store/recoil/appDesignerState";
const Token1loginSettingsForm = ({ formData: initialData, handleOnChange, handleOnChangeColor = () => { }, tailwindColorCodeKeys }) => {
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
                                label='入力エリア分割数'
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

                        <InputContainer>
                            <SelectBox
                                label='ボタンタイプ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='buttonType'
                                onChange={(e) => handleOnChange(e, 4)}>
                                <option value='a'>A</option>
                                <option value='b'>B</option>
                            </SelectBox>
                        </InputContainer>
                        <InputContainer>
                            <TextBox label="ボタンエリアwrapカスタムクラス"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='customClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                placeholder='カスタムClass'
                                type="text" />
                        </InputContainer>

                        <InputBoxSeparator cProperty={`mt-8 mb-8`} />
                        <InputContainer>
                            <TextBox label="入力エリア接続文字"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='divisionText'
                                onBlur={(e) => handleOnChange(e, 4)}
                                placeholder='カスタムClass'
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
                            <label htmlFor="headerAreaShadow" className="text-blue-100  text-xs">配色</label>
                            <div className="flex justify-start">
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])}
                                    inputBoxItem="divisionTextColor" pickerLabel="接続文字色" isBackgroundColor="1"
                                    isDefaultColor={initialData?.divisionTextColor} />

                            </div>
                        </div>

                        <InputContainer>
                            <TextBox label="接続文字カスタムクラス"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='divisionTextCustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                placeholder='カスタムClass'
                                type="text" />
                        </InputContainer>

                        <InputContainer>
                            <TextBox label="接続文字Wrapカスタムクラス"
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
                                label='入力エリアマスク表示'
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
                        <div className="mt-12"></div>


                        <InputContainer>
                            <SelectBox
                                label='入力エリアラベル文字サイズ'
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
                                label='入力エリア文字サイズ'
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
                        <div className="mt-12"></div>

                        <InputContainer>
                            <SelectBox
                                label='入力エリアラベル文字太さ
                                    '
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
                        <InputContainer>
                            <SelectBox
                                label='入力エリア文字太さ'
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

                        <div className="flex flex-col mb-4">
                            <label htmlFor="headerAreaShadow" className="text-blue-100  text-xs">入力エリア配色</label>
                            <div className="flex justify-start space-x-4">
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])}
                                    inputBoxItem="labelTextColor" pickerLabel="ラベル文字色" isBackgroundColor="1"
                                    isDefaultColor={initialData?.labelTextColor} />
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2], 'placeholder')}
                                    inputBoxItem="placeholderTextColor" pickerLabel="プレイスホルダー文字色"
                                    isBackgroundColor="1"
                                    isDefaultColor={initialData?.placeholderTextColor} />
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])}
                                    inputBoxItem="inputTextColor" pickerLabel="入力文字色" isBackgroundColor="1"
                                    isDefaultColor={initialData?.inputTextColor} />
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.borderColor, [1, 2])}
                                    inputBoxItem="borderColor" pickerLabel="枠戦色" isBackgroundColor="1"
                                    isDefaultColor={initialData?.borderColor} />

                            </div>
                        </div>

                        <InputContainer>
                            <TextBox label="inputカスタムクラス"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='inputCustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                placeholder='カスタムClass'
                                type="text" />
                        </InputContainer>
                        <InputContainer>
                            <TextBox label="inputWrapカスタムクラス"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='inputWrapCustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                placeholder='カスタムClass'
                                type="text" />
                        </InputContainer>

                        <InputBoxSeparator cProperty={`mt-8 mb-8`} />

                        {numField.length > 0 && numField.map((number, index) => (
                            <>
                                <InputContainer>
                                    <TextBox label={`入力エリア${number}ラベル文言`}
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name={`inputLabelText${number}`}
                                        onBlur={(e) => handleOnChange(e, 4)}
                                        placeholder='カスタムClass'
                                        type="text" />
                                </InputContainer>
                                <InputContainer>
                                    <TextBox label={`入力エリア${number}プレイスホルダー文言`}
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name={`inputPlaceholderText${number}`}
                                        onBlur={(e) => handleOnChange(e, 4)}
                                        placeholder='カスタムClass'
                                        type="text" />
                                </InputContainer>
                                <InputContainer>
                                    <TextBox label={`入力エリア${number}カスタムクラス`}
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name={`inputCustumClass${number}`}
                                        onBlur={(e) => handleOnChange(e, 1)}
                                        placeholder='カスタムClass'
                                        type="text" />
                                </InputContainer>
                                <InputContainer>
                                    <TextBox label={`入力エリア${number}Wrapカスタムクラス`}
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name={`inputWrapCustumClass${number}`}
                                        onBlur={(e) => handleOnChange(e, 1)}
                                        placeholder='カスタムClass'
                                        type="text" />
                                </InputContainer>
                                {index != numField.length - 1 &&
                                    <div className="mt-12"></div>
                                }
                            </>
                        ))
                        }
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
                                name='errorMessageTextWeight'
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
                            <div className="flex justify-start">
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])}
                                    inputBoxItem="errorMessageTextColor" pickerLabel="エラーメッセージ文字色"
                                    isBackgroundColor="1"
                                    isDefaultColor={initialData?.errorMessageTextColor} />

                            </div>
                        </div>

                        <InputContainer>
                            <TextBox label="エラーメッセージカスタムクラス"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='errorMessagecustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                placeholder='エラーメッセージカスタムクラス'
                                type="text" />
                        </InputContainer>

                        <InputContainer className="!mb-0">
                            <TextBox label="エラーメッセージWrapカスタムクラス"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='errorMessageWrapCustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                placeholder='エラーメッセージWrapカスタムクラス'
                                type="text" />
                        </InputContainer>
                    </div>
                </Form>
            </div>
        </Formik>
    );
}
export default Token1loginSettingsForm