import { Form, Formik } from "formik";
import React from "react";
import { useRecoilState } from "recoil";
import ColorPickerWithRecent from "../../ColorPicker/ColorPickerWithRecent";
import Note from "../../Form/FormInputs/Note";
import SelectBox from "../../Form/FormInputs/SelectBox";
import TextBox from "../../Form/FormInputs/TextBox";
import InputBoxSeparator from '../../InputBoxSeparator/InputBoxSeparator';
import InputContainer from "../../Wrapper/InputContainer";


import { borderWidthArrays } from "../../../lib/commonConstants";
import {
  borderRadiousAttributes, borderStyles, fontSizeAttributes, fontWeightAttributes, spaceBetweenXAttributes, widthAttributes
} from "../../../lib/tailwindClassAttributes";
import { appDesignerState } from "../../../store/recoil/appDesignerState";


const FieldFormRadioSettings = ({
  formData: initialData,
  handleOnChange,
  handleOnChangeColor = () => { },
  tailwindColorCodeKeys
}) => { 
  const [recoilStateValue, setRecoilState] = useRecoilState(appDesignerState);
  const { activeTab, activePageId, tabItems } = recoilStateValue;

  return (
    <Formik
      validateOnChange={false}
      validateOnBlur={false}
      enableReinitialize={true}
      initialValues={initialData}
    >
      <div className="relative w-full">
        <Form>
          <div>
            <InputContainer>
              <SelectBox
                label="ラベル文字サイズ"
                labelClassName="text-blue-100 text-xs"
                inputClassName="bg-blue-25"
                name="labelTextSize"
                onChange={(e) => handleOnChange(e, 1)}
              >
                {fontSizeAttributes.length > 0 &&
                  fontSizeAttributes.map((field, index) => (
                    <option value={field.value} key={field.value + "_" + index}>
                      {field.caption}
                    </option>
                  ))}
              </SelectBox>
            </InputContainer>
            <InputContainer>
              <SelectBox
                label="ラベル文字太さ"
                labelClassName="text-blue-100 text-xs"
                inputClassName="bg-blue-25"
                name="labelFontWeight"
                onChange={(e) => handleOnChange(e, 1)}
              >
                {fontWeightAttributes.length > 0 &&
                  fontWeightAttributes.map((field, index) => (
                    <option value={field.value} key={field.value + "_" + index}>
                      {field.caption}
                    </option>
                  ))}
              </SelectBox>
            </InputContainer>

            <div className="flex flex-col mb-4">
              <label
                htmlFor="headerAreaShadow"
                className="text-blue-100  text-xs"
              >
                ラベル配色
              </label>
              <div className="flex justify-start">
                <ColorPickerWithRecent
                  labelClassName="text-[10px] text-blue-100"
                  setColorhandle={(_, name, colorCode) =>
                    handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])
                  }
                  inputBoxItem="labelTextColor"
                  pickerLabel="文字色"
                  isBackgroundColor="1"
                  isDefaultColor={initialData?.labelTextColor}
                />
              </div>
            </div>
            <InputContainer>
              <Note
                label="ラベルカスタムClass"
                labelClassName="text-blue-100 text-xs"
                inputClassName='bg-blue-25 !p-1'
                height='h-8'
                name="labelCustomClass"
                onBlur={(e) => handleOnChange(e, 1)}
                placeholder="ラベルカスタムClass"
              />
            </InputContainer>

            <InputBoxSeparator cProperty={`mt-8 mb-8`} />
            <InputContainer>
              <TextBox
                label="必須文言"
                labelClassName="text-blue-100 text-xs"
                inputClassName="bg-blue-25"
                name="requiredCharacters"
                onBlur={(e) => handleOnChange(e, 4)}
                placeholder="必須文言"
                type="text"
              />
            </InputContainer>
            <InputContainer>
              <SelectBox
                label="必須文字サイズ"
                labelClassName="text-blue-100 text-xs"
                inputClassName="bg-blue-25"
                name="requiredTextSize"
                onChange={(e) => handleOnChange(e, 1)}
              >
                {fontSizeAttributes.length > 0 &&
                  fontSizeAttributes.map((field, index) => (
                    <option value={field.value} key={field.value + "_" + index}>
                      {field.caption}
                    </option>
                  ))}
              </SelectBox>
            </InputContainer>
            <InputContainer>
              <SelectBox
                label="必須文字太さ"
                labelClassName="text-blue-100 text-xs"
                inputClassName="bg-blue-25"
                name="requiredFontWeight"
                onChange={(e) => handleOnChange(e, 1)}
              >
                {fontWeightAttributes.length > 0 &&
                  fontWeightAttributes.map((field, index) => (
                    <option value={field.value} key={field.value + "_" + index}>
                      {field.caption}
                    </option>
                  ))}
              </SelectBox>
            </InputContainer>

            <div className="flex flex-col mb-4">
              <label
                htmlFor="headerAreaShadow"
                className="text-blue-100  text-xs"
              >
                必須配色
              </label>
              <div className="flex justify-start space-x-4">
                <ColorPickerWithRecent
                  labelClassName="text-[10px] text-blue-100"
                  setColorhandle={(_, name, colorCode) =>
                    handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])
                  }
                  inputBoxItem="requiredTextColor"
                  pickerLabel="文字色"
                  isBackgroundColor="1"
                  isDefaultColor={initialData?.requiredTextColor}
                />
                <ColorPickerWithRecent
                  labelClassName="text-[10px] text-blue-100"
                  setColorhandle={(_, name, colorCode) =>
                    handleOnChangeColor(
                      name,
                      colorCode,
                      tailwindColorCodeKeys.backgroundColor,
                      [1, 2]
                    )
                  }
                  inputBoxItem="requiredBackgroundColor"
                  pickerLabel="背景色"
                  isBackgroundColor="1"
                  isDefaultColor={initialData?.requiredBackgroundColor}
                />
              </div>
            </div>

            <InputContainer>
              <Note
                label="必須カスタムClass"
                labelClassName="text-blue-100 text-xs"
                inputClassName='bg-blue-25 !p-1'
                height='h-8'
                name="requiredCustomClass"
                onBlur={(e) => handleOnChange(e, 1)}
                placeholder="必須カスタムClass"
              />
            </InputContainer>

            <InputBoxSeparator cProperty={`mt-8 mb-8`} />

            <InputContainer>
              <SelectBox
                label="ボタン文字サイズ"
                labelClassName="text-blue-100 text-xs"
                inputClassName="bg-blue-25"
                name="buttonTextSize"
                onChange={(e) => handleOnChange(e, 1)}
              >
                {fontSizeAttributes.length > 0 &&
                  fontSizeAttributes.map((field, index) => (
                    <option value={field.value} key={field.value + "_" + index}>
                      {field.caption}
                    </option>
                  ))}
              </SelectBox>
            </InputContainer>
            <InputContainer>
              <SelectBox
                label="ボタン文字太さ"
                labelClassName="text-blue-100 text-xs"
                inputClassName="bg-blue-25"
                name="buttonFontWeight"
                onChange={(e) => handleOnChange(e, 1)}
              >
                {fontWeightAttributes.length > 0 &&
                  fontWeightAttributes.map((field, index) => (
                    <option value={field.value} key={field.value + "_" + index}>
                      {field.caption}
                    </option>
                  ))}
              </SelectBox>
            </InputContainer>

            <InputContainer>
              <SelectBox
                label='ボタン横幅'
                labelClassName='text-blue-100 text-xs'
                inputClassName='bg-blue-25'
                name='buttonWidth'
                onChange={(e) => handleOnChange(e, 1)}>
                {widthAttributes.length > 0 &&
                  widthAttributes.map((field, index) => (
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
                label='ボタン角丸サイズ'
                labelClassName='text-blue-100 text-xs'
                inputClassName='bg-blue-25'
                name='buttonBorderRadius'
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
                label='ボタン同士の隙間'
                labelClassName='text-blue-100 text-xs'
                inputClassName='bg-blue-25'
                name='buttonSpaceBetweenX'
                onChange={(e) => handleOnChange(e, 1)}>
                {spaceBetweenXAttributes.length > 0 &&
                  spaceBetweenXAttributes.map((field, index) => (
                    <option
                      value={field.value}
                      key={field.value + "_" + index}>
                      {field.caption}
                    </option>
                  )
                  )}
              </SelectBox>
            </InputContainer>
            <InputBoxSeparator cProperty={`mt-8 mb-8`} />
            <InputContainer>
              <SelectBox
                label='未選択ボタン罫線'
                labelClassName='text-blue-100 text-xs'
                inputClassName='bg-blue-25'
                name='unSelectButtonBorderWidth'
                onChange={(e) => handleOnChange(e, 1)}>
                {borderWidthArrays.length > 0 &&
                  borderWidthArrays.map((field, index) => (
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
                label='未選択ボタン罫線種別'
                labelClassName='text-blue-100 text-xs'
                inputClassName='bg-blue-25'
                name='unSelectButtonBorderStyle'
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
            <div className="flex flex-col mb-4">
              <label htmlFor="headerAreaShadow" className="text-blue-100  text-xs"> 未選択ボタン背景色</label>
              <div className="flex justify-start space-x-4">
                <ColorPickerWithRecent
                  labelClassName="text-[10px] text-blue-100"
                  setColorhandle={(_, name, colorCode) =>
                    handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [2, 3], 'default')
                  }
                  inputBoxItem="unSelectButtonBackgroundColor"
                  pickerLabel="通常時"
                  isBackgroundColor="1"
                  isDefaultColor={initialData?.unSelectButtonBackgroundColor}
                />
                <ColorPickerWithRecent
                  labelClassName="text-[10px] text-blue-100"
                  setColorhandle={(_, name, colorCode) =>
                    handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [2, 3], 'hover')
                  }
                  inputBoxItem="unSelectButtonBackgroundColor"
                  pickerLabel="ホバー"
                  isBackgroundColor="1"
                  isDefaultColor={initialData?.unSelectButtonBackgroundColorHover}
                />
                <ColorPickerWithRecent
                  labelClassName="text-[10px] text-blue-100"
                  setColorhandle={(_, name, colorCode) =>
                    handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [2, 3], 'focus')
                  }
                  inputBoxItem="unSelectButtonBackgroundColor"
                  pickerLabel="フォーカス"
                  isBackgroundColor="1"
                  isDefaultColor={initialData?.unSelectButtonBackgroundColorFocus}
                />
                <ColorPickerWithRecent
                  labelClassName="text-[10px] text-blue-100"
                  setColorhandle={(_, name, colorCode) =>
                    handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [2, 3], 'active')
                  }
                  inputBoxItem="unSelectButtonBackgroundColor"
                  pickerLabel="アクティブ"
                  isBackgroundColor="1"
                  isDefaultColor={initialData?.unSelectButtonBackgroundColorActive}
                />
                <ColorPickerWithRecent
                  labelClassName="text-[10px] text-blue-100"
                  setColorhandle={(_, name, colorCode) =>
                    handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [2, 3], 'disabled', 'peer-')
                  }
                  inputBoxItem="unSelectButtonBackgroundColor"
                  pickerLabel="非活性時"
                  isBackgroundColor="1"
                  isDefaultColor={initialData?.unSelectButtonBackgroundColorDisabled}
                />
              </div>
            </div>

            <div className="flex flex-col mb-4">
              <label
                htmlFor="headerAreaShadow"
                className="text-blue-100  text-xs"
              >
                未選択ボタン文字色
              </label>
              <div className="flex justify-start space-x-4">
                <ColorPickerWithRecent
                  labelClassName="text-[10px] text-blue-100"
                  setColorhandle={(_, name, colorCode) =>
                    handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [2, 3], 'default')
                  }
                  inputBoxItem="unSelectButtonTextColor"
                  pickerLabel="通常時"
                  isBackgroundColor="1"
                  isDefaultColor={initialData?.unSelectButtonTextColor}
                />
                <ColorPickerWithRecent
                  labelClassName="text-[10px] text-blue-100"
                  setColorhandle={(_, name, colorCode) =>
                    handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [2, 3], 'hover')
                  }
                  inputBoxItem="unSelectButtonTextColor"
                  pickerLabel="ホバー"
                  isBackgroundColor="1"
                  isDefaultColor={initialData?.unSelectButtonTextColorHover}
                />
                <ColorPickerWithRecent
                  labelClassName="text-[10px] text-blue-100"
                  setColorhandle={(_, name, colorCode) =>
                    handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [2, 3], 'focus')
                  }
                  inputBoxItem="unSelectButtonTextColor"
                  pickerLabel="フォーカス"
                  isBackgroundColor="1"
                  isDefaultColor={initialData?.unSelectButtonTextColorFocus}
                />
                <ColorPickerWithRecent
                  labelClassName="text-[10px] text-blue-100"
                  setColorhandle={(_, name, colorCode) =>
                    handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [2, 3], 'active')
                  }
                  inputBoxItem="unSelectButtonTextColor"
                  pickerLabel="アクティブ"
                  isBackgroundColor="1"
                  isDefaultColor={initialData?.unSelectButtonTextColorActive}
                />

                <ColorPickerWithRecent
                  labelClassName="text-[10px] text-blue-100"
                  setColorhandle={(_, name, colorCode) =>
                    handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [2, 3], 'disabled', 'peer-')
                  }
                  inputBoxItem="unSelectButtonTextColor"
                  pickerLabel="非活性時"
                  isBackgroundColor="1"
                  isDefaultColor={initialData?.unSelectButtonTextColorDisabled}
                />

              </div>
            </div>

            <div className="flex flex-col mb-4">
              <label
                htmlFor="headerAreaShadow"
                className="text-blue-100  text-xs"
              >
                未選択ボタン枠線
              </label>
              <div className="flex justify-start space-x-4">

                <ColorPickerWithRecent
                  labelClassName="text-[10px] text-blue-100"
                  setColorhandle={(_, name, colorCode) =>
                    handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.borderColor, [2, 3], 'default')
                  }
                  inputBoxItem="unSelectButtonBorderColor"
                  pickerLabel="通常時"
                  isBackgroundColor="1"
                  isDefaultColor={initialData?.unSelectButtonBorderColor}
                />
                <ColorPickerWithRecent
                  labelClassName="text-[10px] text-blue-100"
                  setColorhandle={(_, name, colorCode) =>
                    handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.borderColor, [2, 3], 'hover')
                  }
                  inputBoxItem="unSelectButtonBorderColor"
                  pickerLabel="ホバー"
                  isBackgroundColor="1"
                  isDefaultColor={initialData?.unSelectButtonBorderColorHover}
                />

                <ColorPickerWithRecent
                  labelClassName="text-[10px] text-blue-100"
                  setColorhandle={(_, name, colorCode) =>
                    handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.borderColor, [2, 3], 'focus')
                  }
                  inputBoxItem="unSelectButtonBorderColor"
                  pickerLabel="フォーカス"
                  isBackgroundColor="1"
                  isDefaultColor={initialData?.unSelectButtonBorderColorFocus}
                />

                <ColorPickerWithRecent
                  labelClassName="text-[10px] text-blue-100"
                  setColorhandle={(_, name, colorCode) =>
                    handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.borderColor, [2, 3], 'active')
                  }
                  inputBoxItem="unSelectButtonBorderColor"
                  pickerLabel="アクティブ"
                  isBackgroundColor="1"
                  isDefaultColor={initialData?.unSelectButtonBorderColorActive}
                />
                <ColorPickerWithRecent
                  labelClassName="text-[10px] text-blue-100"
                  setColorhandle={(_, name, colorCode) =>
                    handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.borderColor, [2, 3], 'disabled', 'peer-')
                  }
                  inputBoxItem="unSelectButtonBorderColor"
                  pickerLabel="非活性時"
                  isBackgroundColor="1"
                  isDefaultColor={initialData?.unSelectButtonBorderColorDisabled}
                />
              </div>
            </div>


            <InputBoxSeparator cProperty={`mt-8 mb-8`} />


            <InputContainer>
              <SelectBox
                label='選択中ボタン罫線'
                labelClassName='text-blue-100 text-xs'
                inputClassName='bg-blue-25'
                name='selectButtonBorderWidth'
                onChange={(e) => handleOnChange(e, 1)}>
                {borderWidthArrays.map((field, index) => <option value={field.value} key={field.value + "_" + index}> {field.caption} </option>)}
              </SelectBox>
            </InputContainer>
            <InputContainer>
              <SelectBox
                label='選択中ボタン罫線種別'
                labelClassName='text-blue-100 text-xs'
                inputClassName='bg-blue-25'
                name='selectButtonBorderStyle'
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

            <div className="flex flex-col mb-4">
              <label
                htmlFor="headerAreaShadow"
                className="text-blue-100  text-xs"
              >
                選択中ボタン背景色
              </label>
              <div className="flex justify-start space-x-4">
                <ColorPickerWithRecent
                  labelClassName="text-[10px] text-blue-100"
                  setColorhandle={(_, name, colorCode) =>
                    handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [2, 3], 'default', 'peer-checked:')
                  }
                  inputBoxItem="selectButtonBackgroundColor"
                  pickerLabel="通常時"
                  isBackgroundColor="1"
                  isDefaultColor={initialData.selectButtonBackgroundColor}
                />
                <ColorPickerWithRecent
                  labelClassName="text-[10px] text-blue-100"
                  setColorhandle={(_, name, colorCode) =>
                    handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [2, 3], 'hover', 'peer-checked:')
                  }
                  inputBoxItem="selectButtonBackgroundColor"
                  pickerLabel="ホバー"
                  isBackgroundColor="1"
                  isDefaultColor={initialData.selectButtonBackgroundColorHover}
                />
                <ColorPickerWithRecent
                  labelClassName="text-[10px] text-blue-100"
                  setColorhandle={(_, name, colorCode) =>
                    handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [2, 3], 'focus', 'peer-checked:')
                  }
                  inputBoxItem="selectButtonBackgroundColor"
                  pickerLabel="フォーカス"
                  isBackgroundColor="1"
                  isDefaultColor={initialData.selectButtonBackgroundColorFocus}
                />
                <ColorPickerWithRecent
                  labelClassName="text-[10px] text-blue-100"
                  setColorhandle={(_, name, colorCode) =>
                    handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [2, 3], 'active', 'peer-checked:')
                  }
                  inputBoxItem="selectButtonBackgroundColor"
                  pickerLabel="アクティブ"
                  isBackgroundColor="1"
                  isDefaultColor={initialData.selectButtonBackgroundColorActive}
                />

                {/* <ColorPickerWithRecent
                  labelClassName="text-[10px] text-blue-100"
                  setColorhandle={(_, name, colorCode) =>
                    handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [2, 3], 'disabled', 'peer-')
                  }
                  inputBoxItem="selectButtonBackgroundColor"
                  pickerLabel="非活性時"
                  isBackgroundColor="1"
                  isDefaultColor={initialData.selectButtonBackgroundColorDisabled}
                /> */}
              </div>
            </div>

            <div className="flex flex-col mb-4">
              <label
                htmlFor="headerAreaShadow"
                className="text-blue-100  text-xs"
              >
                選択ボタン文字色
              </label>
              <div className="flex justify-start space-x-4">
                <ColorPickerWithRecent
                  labelClassName="text-[10px] text-blue-100"
                  setColorhandle={(_, name, colorCode) =>
                    handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [2, 3], 'default', 'peer-checked:')
                  }
                  inputBoxItem="selectButtonTextColor"
                  pickerLabel="通常時"
                  isBackgroundColor="1"
                  isDefaultColor={initialData.selectButtonTextColor}
                />
                <ColorPickerWithRecent
                  labelClassName="text-[10px] text-blue-100"
                  setColorhandle={(_, name, colorCode) =>
                    handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [2, 3], 'hover', 'peer-checked:')
                  }
                  inputBoxItem="selectButtonTextColor"
                  pickerLabel="ホバー"
                  isBackgroundColor="1"
                  isDefaultColor={initialData.selectButtonTextColorHover}
                />
                <ColorPickerWithRecent
                  labelClassName="text-[10px] text-blue-100"
                  setColorhandle={(_, name, colorCode) =>
                    handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [2, 3], 'focus', 'peer-checked:')
                  }
                  inputBoxItem="selectButtonTextColor"
                  pickerLabel="フォーカス"
                  isBackgroundColor="1"
                  isDefaultColor={initialData.selectButtonTextColorFocus}
                />
                <ColorPickerWithRecent
                  labelClassName="text-[10px] text-blue-100"
                  setColorhandle={(_, name, colorCode) =>
                    handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [2, 3], 'active', 'peer-checked:')
                  }
                  inputBoxItem="selectButtonTextColor"
                  pickerLabel="アクティブ"
                  isBackgroundColor="1"
                  isDefaultColor={initialData.selectButtonTextColorActive}
                />
                {/* <ColorPickerWithRecent
                  labelClassName="text-[10px] text-blue-100"
                  setColorhandle={(_, name, colorCode) =>
                    handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [2, 3], 'disabled', 'peer-')
                  }
                  inputBoxItem="selectButtonTextColor"
                  pickerLabel="非活性時"
                  isBackgroundColor="1"
                  isDefaultColor={initialData.selectButtonTextColorDisabled}
                /> */}
              </div>
            </div>

            <div className="flex flex-col mb-4">
              <label
                htmlFor="headerAreaShadow"
                className="text-blue-100  text-xs"
              >
                選択ボタン枠線
              </label>
              <div className="flex justify-start space-x-4">

                <ColorPickerWithRecent
                  labelClassName="text-[10px] text-blue-100"
                  setColorhandle={(_, name, colorCode) =>
                    handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.borderColor, [2, 3], 'default', 'peer-checked:')
                  }
                  inputBoxItem="selectButtonBorderColor"
                  pickerLabel="通常時"
                  isBackgroundColor="1"
                  isDefaultColor={initialData.selectButtonBorderColor}
                />
                <ColorPickerWithRecent
                  labelClassName="text-[10px] text-blue-100"
                  setColorhandle={(_, name, colorCode) =>
                    handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.borderColor, [2, 3], 'hover', 'peer-checked:')
                  }
                  inputBoxItem="selectButtonBorderColor"
                  pickerLabel="ホバー"
                  isBackgroundColor="1"
                  isDefaultColor={initialData.selectButtonBorderColorHover}
                />
                <ColorPickerWithRecent
                  labelClassName="text-[10px] text-blue-100"
                  setColorhandle={(_, name, colorCode) =>
                    handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.borderColor, [2, 3], 'focus', 'peer-checked:')
                  }
                  inputBoxItem="selectButtonBorderColor"
                  pickerLabel="フォーカス"
                  isBackgroundColor="1"
                  isDefaultColor={initialData.selectButtonBorderColorFocus}
                />
                <ColorPickerWithRecent
                  labelClassName="text-[10px] text-blue-100"
                  setColorhandle={(_, name, colorCode) =>
                    handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.borderColor, [2, 3], 'active', 'peer-checked:')
                  }
                  inputBoxItem="selectButtonBorderColor"
                  pickerLabel="アクティブ"
                  isBackgroundColor="1"
                  isDefaultColor={initialData.selectButtonBorderColorActive}
                />
                {/* <ColorPickerWithRecent
                  labelClassName="text-[10px] text-blue-100"
                  setColorhandle={(_, name, colorCode) =>
                    handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.borderColor, [2, 3], 'disabled', 'peer-')
                  }
                  inputBoxItem="selectButtonBorderColor"
                  pickerLabel="非活性時"
                  isBackgroundColor="1"
                  isDefaultColor={initialData.selectButtonBorderColorDisabled}
                /> */}
              </div>
            </div>

            <InputBoxSeparator cProperty={`mt-8 mb-8`} />
            <InputContainer>
              <Note
                label="ボタンカスタムClass"
                labelClassName="text-blue-100 text-xs"
                inputClassName='bg-blue-25 !p-1'
                height='h-8'
                name="buttonCustomClass"
                onBlur={(e) => handleOnChange(e, 1)}
                placeholder="カスタムClass"
              />
            </InputContainer>

            <InputBoxSeparator cProperty={`mt-8 mb-8`} />

            <InputContainer>
              <SelectBox
                label="エラーメッセージ文字サイズ"
                labelClassName="text-blue-100 text-xs"
                inputClassName="bg-blue-25"
                name="errorMessageTextSize"
                onChange={(e) => handleOnChange(e, 1)}
              >
                {fontSizeAttributes.length > 0 &&
                  fontSizeAttributes.map((field, index) => (
                    <option value={field.value} key={field.value + "_" + index}>
                      {field.caption}
                    </option>
                  ))}
              </SelectBox>
            </InputContainer>
            <InputContainer>
              <SelectBox
                label="エラーメッセージ文字太さ"
                labelClassName="text-blue-100 text-xs"
                inputClassName="bg-blue-25"
                name="errorMessageFontWeight"
                onChange={(e) => handleOnChange(e, 1)}
              >
                {fontWeightAttributes.length > 0 &&
                  fontWeightAttributes.map((field, index) => (
                    <option value={field.value} key={field.value + "_" + index}>
                      {field.caption}
                    </option>
                  ))}
              </SelectBox>
            </InputContainer>

            <div className="flex flex-col mb-4">
              <label
                htmlFor="headerAreaShadow"
                className="text-blue-100  text-xs"
              >
                エラーメッセージ配色
              </label>
              <div className="flex justify-start space-x-4">
                <ColorPickerWithRecent
                  labelClassName="text-[10px] text-blue-100"
                  setColorhandle={(_, name, colorCode) =>
                    handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])
                  }
                  inputBoxItem="errorMessageTextColor"
                  pickerLabel="文字色"
                  isBackgroundColor="1"
                  isDefaultColor={initialData?.errorMessageTextColor}
                />
                <ColorPickerWithRecent
                  labelClassName="text-[10px] text-blue-100"
                  setColorhandle={(_, name, colorCode) =>
                    handleOnChangeColor(
                      name,
                      colorCode,
                      tailwindColorCodeKeys.backgroundColor,
                      [1, 2]
                    )
                  }
                  inputBoxItem="errorMessageBackgroundColor"
                  pickerLabel="背景色"
                  isBackgroundColor="1"
                  isDefaultColor={initialData?.errorMessageBackgroundColor}
                />
              </div>
            </div>

            <InputContainer>
              <Note
                label="エラーメッセージカスタムClass"
                labelClassName="text-blue-100 text-xs"
                inputClassName='bg-blue-25 !p-1'
                height='h-8'
                name="errorMessageCustomClass"
                onBlur={(e) => handleOnChange(e, 1)}
                placeholder="エラーメッセージカスタムClass"
              />
            </InputContainer>

            <InputBoxSeparator cProperty={`mt-8 mb-8`} />

            <InputContainer className="!mb-0">
              <Note
                label="radioAWrapカスタムClass"
                labelClassName="text-blue-100 text-xs"
                inputClassName='bg-blue-25 !p-1'
                height='h-8'
                name="radioAWrapCustomClass"
                onBlur={(e) => handleOnChange(e, 1)}
                placeholder="カスタムClass"
              />
            </InputContainer>
          </div>
        </Form>
      </div>
    </Formik>
  );
};
export default FieldFormRadioSettings;