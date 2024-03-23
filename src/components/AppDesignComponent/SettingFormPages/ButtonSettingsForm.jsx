import { Form, Formik } from "formik";

import {
    borderradiusArrays, borderWidthArrays, boxShadowArrays, fontSizeArrays,
    fontWeightArrays, marginBottomArrays, marginTopArrays, paddingXArrays,
    paddingYArrays, ringOffsetWidthActiveArrays, ringOffsetWidthFocusArrays,
    ringWidthActiveArrays, ringWidthFocusArrays
} from '../../../lib/commonConstants';
import ColorPickerWithRecent from "../../ColorPicker/ColorPickerWithRecent";
import SelectBox from "../../Form/FormInputs/SelectBox";
import TextBox from "../../Form/FormInputs/TextBox";
import InputBoxSeparator from '../../InputBoxSeparator/InputBoxSeparator';
import InputContainer from "../../Wrapper/InputContainer";

export default function ButtonSettingsForm({ buttonType, formData: initialData, handleOnChange, handleOnChangeColor = () => { }, tailwindColorCodeKeys }) {

    function removePrefixClass(str, prefix) {
        if (typeof str != 'undefined') {
            if (str.includes(prefix)) {
                let arr = str.split(':');
                return arr[1];
            } else {
                return str;
            }
        }
    }
    return (
        <Formik
            validateOnChange={false}
            validateOnBlur={false}
            enableReinitialize={true}
            initialValues={initialData} >
            <div className='relative w-full'>
                <Form>
                    <div>
                        <InputContainer>
                            <SelectBox
                                label={`ボタン${buttonType}　左右余白`}
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='paddingX'
                                onChange={(e) => handleOnChange(e, 1)}
                            >
                                {paddingXArrays.map(x => <option key={x.value} value={x.value}>{x.caption}</option>)}
                            </SelectBox>
                        </InputContainer>
                        <InputContainer>
                            <SelectBox
                                label={`ボタン${buttonType}　上下余白`}
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='paddingY'
                                onChange={(e) => handleOnChange(e, 1)}
                            >
                                {paddingYArrays.map(x => <option key={x.value} value={x.value}>{x.caption}</option>)}
                            </SelectBox>
                        </InputContainer>
                        <InputContainer>
                            <SelectBox
                                label={`ボタン${buttonType}　上間隔`}
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='marginTop'
                                onChange={(e) => handleOnChange(e, 1)}
                            >
                                {marginTopArrays.map(x => <option key={x.value} value={x.value}>{x.caption}</option>)}
                            </SelectBox>
                        </InputContainer>
                        <InputContainer>
                            <SelectBox
                                label={`ボタン${buttonType}　下間隔`}
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='marginBottom'
                                onChange={(e) => handleOnChange(e, 1)}
                            >
                                {marginBottomArrays.map(x => <option key={x.value} value={x.value}>{x.caption}</option>)}
                            </SelectBox>
                        </InputContainer>
                        <InputContainer>
                            <SelectBox
                                label={`ボタン${buttonType}　角丸`}
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='borderRadius'
                                onChange={(e) => handleOnChange(e, 1)}
                            >
                                {borderradiusArrays.map(x => <option key={x.value} value={x.value}>{x.caption}</option>)}
                            </SelectBox>
                        </InputContainer>
                        <InputContainer>
                            <SelectBox
                                label={`ボタン${buttonType}　テキスト文字サイズ`}
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='textSize'
                                onChange={(e) => handleOnChange(e, 1)}
                            >
                                {fontSizeArrays.map(x => <option key={x.value} value={x.value}>{x.caption}</option>)}
                            </SelectBox>
                        </InputContainer>
                        <InputContainer>
                            <SelectBox
                                label={`ボタン${buttonType}　テキスト文字太さ`}
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='fontWeight'
                                onChange={(e) => handleOnChange(e, 1)}
                            >
                                {fontWeightArrays.map(x => <option key={x.value} value={x.value}>{x.caption}</option>)}
                            </SelectBox>
                        </InputContainer>
                        <InputContainer>
                            <SelectBox
                                label={`ボタン${buttonType}　枠線太さ`}
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='borderWidth'
                                onChange={(e) => handleOnChange(e, 1)}
                            >
                                {borderWidthArrays.map(x => <option key={x.value} value={x.value}>{x.caption}</option>)}
                            </SelectBox>
                        </InputContainer>

                        <InputBoxSeparator cProperty={`mt-8 mb-8`} />

                        <InputContainer>
                            <SelectBox
                                label={`ボタン${buttonType} フォーカス　外周円太さ`}
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='ringWidthFocusPreview'
                                value={removePrefixClass(initialData?.focus?.ringWidth, 'focus')}
                                onChange={(e) => handleOnChange(e, 3, 'focus')}
                            >
                                {ringWidthFocusArrays.map(x => <option key={x.value} value={x.value}>{x.caption}</option>)}
                            </SelectBox>
                        </InputContainer>
                        <InputContainer>
                            <SelectBox
                                label={`ボタン${buttonType} フォーカス　外周円オフセット`}
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='ringOffsetWidthFocusPreview'
                                value={removePrefixClass(initialData?.focus?.ringOffsetWidth, 'focus')}
                                onChange={(e) => handleOnChange(e, 3, 'focus')}
                            >
                                {ringOffsetWidthFocusArrays.map(x => <option key={x.value} value={x.value}>{x.caption}</option>)}
                            </SelectBox>
                        </InputContainer>
                        <InputContainer>
                            <SelectBox
                                label={`ボタン${buttonType} アクティブ　外周円太さ`}
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='ringWidthActivePreview'
                                value={removePrefixClass(initialData?.active?.ringWidth, 'active')}
                                onChange={(e) => handleOnChange(e, 3, 'active')}
                            >
                                {ringWidthActiveArrays.map(x => <option key={x.value} value={x.value}>{x.caption}</option>)}
                            </SelectBox>
                        </InputContainer>
                        <InputContainer>
                            <SelectBox
                                label={`ボタン${buttonType} アクティブ　外周円オフセット`}
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='ringOffsetWidthActivePreview'
                                value={removePrefixClass(initialData?.active?.ringOffsetWidth, 'active')}
                                onChange={(e) => handleOnChange(e, 3, 'active')}
                            >
                                {ringOffsetWidthActiveArrays.map(x => <option key={x.value} value={x.value}>{x.caption}</option>)}
                            </SelectBox>
                        </InputContainer>
                        <InputContainer>
                            <SelectBox
                                label={`ボタン${buttonType} アクティブ　凹み影（推奨：内側）`}
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='boxShadowActivePreview'
                                value={removePrefixClass(initialData?.active?.boxShadow, 'active')}
                                onChange={(e) => handleOnChange(e, 3, 'active')}
                            >
                                {boxShadowArrays.map(x => <option key={x.value} value={x.value}>{x.caption}</option>)}
                            </SelectBox>
                        </InputContainer>
                        <InputContainer>
                            <SelectBox
                                label={`ボタン${buttonType} 無効時　凹み影`}
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='boxShadowDisabledPreview'
                                value={removePrefixClass(initialData?.disabled?.boxShadow, 'disabled')}
                                onChange={(e) => handleOnChange(e, 3, 'disabled')}
                            >
                                {boxShadowArrays.map(x => <option key={x.value} value={x.value}>{x.caption}</option>)}
                            </SelectBox>
                        </InputContainer>

                        <InputBoxSeparator cProperty={`mt-8 mb-8`} />

                        <div className="flex flex-col mb-4">
                            <label htmlFor="" className="text-blue-100 text-xs">ボタン{buttonType} 背景色</label>
                            <div className="flex justify-start app-design-color-picker">
                                <ColorPickerWithRecent setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [2, 3], 'default')} inputBoxItem="backgroundColor" pickerLabel="通常時" isBackgroundColor="1" isDefaultColor={initialData.backgroundColor} />
                                <ColorPickerWithRecent setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [2, 3], 'hover')} inputBoxItem="backgroundColor" pickerLabel="ホバー" isBackgroundColor="1" isDefaultColor={initialData.backgroundColorHover} />
                                <ColorPickerWithRecent setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [2, 3], 'focus')} inputBoxItem="backgroundColor" pickerLabel="フォーカス" isBackgroundColor="1" isDefaultColor={initialData.backgroundColorFocus} />
                                <ColorPickerWithRecent setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [2, 3], 'active')} inputBoxItem="backgroundColor" pickerLabel="アクティブ" isBackgroundColor="1" isDefaultColor={initialData.backgroundColorActive} />
                                <ColorPickerWithRecent setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [2, 3], 'disabled')} inputBoxItem="backgroundColor" pickerLabel="無効時" isBackgroundColor="1" isDefaultColor={initialData.backgroundColorDisabled} />
                            </div>
                        </div>


                        <div className="flex flex-col mb-4">
                            <label htmlFor="" className="text-blue-100 text-xs">ボタン{buttonType} 文字色</label>
                            <div className="flex justify-start app-design-color-picker">
                                <ColorPickerWithRecent setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [2, 3], 'default')} inputBoxItem="textColor" pickerLabel="通常時" isBackgroundColor="1" isDefaultColor={initialData.textColor} />
                                <ColorPickerWithRecent setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [2, 3], 'hover')} inputBoxItem="textColor" pickerLabel="ホバー" isBackgroundColor="1" isDefaultColor={initialData.textColorHover} />
                                <ColorPickerWithRecent setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [2, 3], 'focus')} inputBoxItem="textColor" pickerLabel="フォーカス" isBackgroundColor="1" isDefaultColor={initialData.textColorFocus} />
                                <ColorPickerWithRecent setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [2, 3], 'active')} inputBoxItem="textColor" pickerLabel="アクティブ" isBackgroundColor="1" isDefaultColor={initialData.textColorActive} />
                                <ColorPickerWithRecent setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [2, 3], 'disabled')} inputBoxItem="textColor" pickerLabel="無効時" isBackgroundColor="1" isDefaultColor={initialData.textColorDisabled} />
                            </div>
                        </div>

                        <div className="flex flex-col mb-4">
                            <label htmlFor="" className="text-blue-100 text-xs">ボタン{buttonType} 枠線</label>
                            <div className="flex justify-start app-design-color-picker">
                                <ColorPickerWithRecent setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.borderColor, [2, 3], 'default')} inputBoxItem="borderColor" pickerLabel="通常時" isBackgroundColor="1" isDefaultColor={initialData.borderColor} />
                                <ColorPickerWithRecent setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.borderColor, [2, 3], 'hover')} inputBoxItem="borderColor" pickerLabel="ホバー" isBackgroundColor="1" isDefaultColor={initialData.borderColorHover} />
                                <ColorPickerWithRecent setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.borderColor, [2, 3], 'focus')} inputBoxItem="borderColor" pickerLabel="フォーカス" isBackgroundColor="1" isDefaultColor={initialData.borderColorFocus} />
                                <ColorPickerWithRecent setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.borderColor, [2, 3], 'active')} inputBoxItem="borderColor" pickerLabel="アクティブ" isBackgroundColor="1" isDefaultColor={initialData.borderColorActive} />
                                <ColorPickerWithRecent setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.borderColor, [2, 3], 'disabled')} inputBoxItem="borderColor" pickerLabel="無効時" isBackgroundColor="1" isDefaultColor={initialData.borderColorDisabled} />
                            </div>
                        </div>

                        {buttonType !== 'C' && (
                            <div className="flex flex-col mb-4">
                                <label htmlFor="" className="text-blue-100 text-xs">ボタン{buttonType} 外周円色</label>
                                <div className="flex justify-start app-design-color-picker">
                                    <ColorPickerWithRecent setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.ringColor, [2, 3], 'focus')} inputBoxItem="ringColor" pickerLabel="フォーカス" isBackgroundColor="1" isDefaultColor={initialData.ringColorFocus} />
                                    <ColorPickerWithRecent setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.ringColor, [2, 3], 'active')} inputBoxItem="ringColor" pickerLabel="アクティブ" isBackgroundColor="1" isDefaultColor={initialData.ringColorActive} />
                                </div>
                            </div>
                        )}


                        {/* <div className="flex flex-col mb-4">
                            <label htmlFor="" className="text-blue-100 text-xs">ボタン{buttonType} スピナー色</label>
                            <div className="flex justify-start app-design-color-picker">
                                <ColorPickerWithRecent setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])} inputBoxItem="spinnerColor" pickerLabel="" isBackgroundColor="1" isDefaultColor={initialData.spinnerColor} />
                            </div>
                        </div> */}

                        <InputBoxSeparator cProperty={`mt-8 mb-8`} />

                        <InputContainer>
                            <TextBox label={`ボタン${buttonType} カスタムClass`}
                                name="customClass"
                                placeholder="カスタムClass"
                                labelClassName="text-blue-100 text-xs"
                                inputClassName="bg-blue-25"
                                onBlur={(e) => handleOnChange(e, 1)} //onBlur event handler. Useful for when you need to track whether an input has been touched or not.
                            />
                        </InputContainer>
                        <InputContainer className="!mb-0">
                            <TextBox label={`ボタン${buttonType}スピナー カスタムClass`}
                                name="spinnerCustomClass"
                                placeholder="カスタムClass"
                                labelClassName="text-blue-100 text-xs"
                                inputClassName="bg-blue-25"
                                onBlur={(e) => handleOnChange(e, 1)} //onBlur event handler. Useful for when you need to track whether an input has been touched or not.
                            />
                        </InputContainer>
                    </div>
                </Form>
            </div>
        </Formik>
    )
}