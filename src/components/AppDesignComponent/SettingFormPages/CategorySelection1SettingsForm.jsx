import { useRecoilState } from "recoil";
import SelectBox from "../../Form/FormInputs/SelectBox";
import TextBox from "../../Form/FormInputs/TextBox";
import InputContainer from "../../Wrapper/InputContainer";

import { Form, Formik } from "formik";
import React from "react";
import ColorPickerWithRecent from "../../ColorPicker/ColorPickerWithRecent";
import InputBoxSeparator from '../../InputBoxSeparator/InputBoxSeparator';


import {
    borderAttributes, borderRadiousAttributes, borderStyles, divideStyleAttributes, divideXWithAttributes,
    divideYWithAttributes, fontSizeAttributes, fontWeightAttributes, heightAttributes
} from "../../../lib/tailwindClassAttributes";
import { appDesignerState } from "../../../store/recoil/appDesignerState";



const CategorySelection1SettingsForm = ({ formData: initialData, handleOnChange, handleOnChangeColor = () => { }, tailwindColorCodeKeys }) => {
    const [recoilStateValue, setRecoilState] = useRecoilState(appDesignerState);

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
                                label='カテゴリーエリア角丸サイズ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='cardBorderRadius'
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
                                label='カテゴリーエリア枠線'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='cardBorderWidth'
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
                                label='カテゴリーエリア分割線 X方向'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='cardDivideWidthX'
                                onChange={(e) => handleOnChange(e, 1)}>
                                {divideXWithAttributes.length > 0 &&
                                    divideXWithAttributes.map((field, index) => (
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
                                label='カテゴリーエリア分割線 Y方向'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='cardDivideWidthY'
                                onChange={(e) => handleOnChange(e, 1)}>
                                {divideYWithAttributes.length > 0 &&
                                    divideYWithAttributes.map((field, index) => (
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
                                label='カテゴリーエリア枠線種別'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='cardBorderStyle'
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
                                label='カテゴリーエリア分割線種別'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='cardDivideStyle'
                                onChange={(e) => handleOnChange(e, 1)}>
                                {divideStyleAttributes.length > 0 &&
                                    divideStyleAttributes.map((field, index) => (
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
                            <label htmlFor="headerAreaShadow" className="text-blue-100  text-xs">線配色</label>
                            <div className="flex justify-start space-x-4">
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.borderColor, [1, 2])}
                                    inputBoxItem="cardOuterBorderColor" pickerLabel="外枠線色" isBackgroundColor="1"
                                    isDefaultColor={initialData?.cardOuterBorderColor} />
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.borderColor, [1, 2])}
                                    inputBoxItem="cardDivideColor" pickerLabel="分割線色 X方向　Y方向" isBackgroundColor="1"
                                    isDefaultColor={initialData?.cardDivideColor} />
                            </div>
                        </div>
                        <InputContainer>
                            <TextBox label="カテゴリーエリアWrapカスタムClass"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='cardOuterWrapCustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                placeholder='カテゴリーエリアWrapカスタムClass'
                                type="text" />
                        </InputContainer>

                        <InputBoxSeparator cProperty={`mt-8 mb-8`} />


                        <InputContainer>
                            <SelectBox
                                label='予約カテゴリー名文字サイズ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='categoryNameTextSize'
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
                                label='予約カテゴリー名文字太さ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='categoryNameFontWeight'
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
                            <TextBox label="予約カテゴリー名WrapカスタムClass"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='categoryNameCustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                // maxLength='32'
                                placeholder='カスタムClass'
                                type="text" />
                        </InputContainer>

                        <InputContainer>
                            <SelectBox
                                label='ヘッダーエリアメニュー数'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='headerMenuQuantity'
                                onChange={(e) => handleOnChange(e, 4)}>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                            </SelectBox>
                        </InputContainer>

                        <InputContainer>
                            <TextBox label="ヘッダーエリアメニュー1ボタン文言"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='headerMenu1Text'
                                onBlur={(e) => handleOnChange(e, 4)}
                                // maxLength='32'
                                placeholder='メニュー1のボタン文言'
                                type="text" />
                        </InputContainer>

                        <InputContainer>
                            <SelectBox
                                label='ヘッダーエリアメニュー1ボタン機能'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='headerMenu1Function'
                                onChange={(e) => handleOnChange(e, 4)}>
                                <option value={1}>モーダルで画像を表示</option>
                                <option value={2}>別タブで外部サイトに遷移</option>
                            </SelectBox>
                        </InputContainer>

                        <InputContainer>
                            <TextBox label="外部サイトのURL"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='headerMenu1Url'
                                onBlur={(e) => handleOnChange(e, 4)}
                                // maxLength='32'
                                placeholder='外部サイトのURL'
                                type="text" />
                        </InputContainer>

                        <InputContainer>
                            <SelectBox
                                label='モーダルで表示する画像'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='headerMenu1Img'
                                onChange={(e) => handleOnChange(e, 4)}>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                            </SelectBox>
                        </InputContainer>

                        <InputContainer>
                            <TextBox label="ヘッダーエリアメニュー2ボタン文言"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='headerMenu2Text'
                                onBlur={(e) => handleOnChange(e, 4)}
                                // maxLength='32'
                                placeholder='メニュー2のボタン文言'
                                type="text" />
                        </InputContainer>

                        <InputContainer>
                            <TextBox label="ボタンWrapカスタムClass"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='headerMenuButtonWrapCustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                // maxLength='32'
                                placeholder='スタムClass'
                                type="text" />
                        </InputContainer>


                        <InputContainer>
                            <TextBox label="ヘッダーエリアWrapカスタムClass"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='headerWrapCustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                // maxLength='32'
                                placeholder='スタムClass'
                                type="text" />
                        </InputContainer>







                        <div className="flex flex-col mb-4">
                            <label htmlFor="headerAreaShadow" className="text-blue-100  text-xs">ヘッダー配色</label>
                            <div className="flex justify-start space-x-4">
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])}
                                    inputBoxItem="categoryNameTextColor" pickerLabel="タイトル文字色" isBackgroundColor="1"
                                    isDefaultColor={initialData?.categoryNameTextColor} />
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [1, 2])}
                                    inputBoxItem="headerAreaBackgroundColor" pickerLabel="ヘッダーエリア背景色" isBackgroundColor="1"
                                    isDefaultColor={initialData?.headerAreaBackgroundColor} />

                            </div>
                        </div>
                        <InputBoxSeparator cProperty={`mt-8 mb-8`} />


                        <InputContainer>
                            <SelectBox
                                label={"画像エリアで表示する画像"}
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='imgAreaImg'
                                onChange={(e) => handleOnChange(e, 4)}>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                            </SelectBox>
                        </InputContainer>

                        <InputContainer>
                            <SelectBox
                                label={"画像角丸サイズ"}
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='imgAreaImgRadius'
                                onChange={(e) => handleOnChange(e, 1)}>
                                {borderRadiousAttributes.length > 0 &&
                                    borderRadiousAttributes.map((field, index) => (
                                        <option
                                            value={field.value}
                                            key={field.value + "_" + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                            </SelectBox>
                        </InputContainer>
                        <InputContainer>
                            <SelectBox
                                label={"画像最大高さ：640px以上"}
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='imgAreaImgMaxHeight'
                                onChange={(e) => handleOnChange(e, 1)}>
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

                        <InputContainer>
                            <TextBox label="imgカスタムClass"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='imgAreaImgCustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                // maxLength='32'
                                placeholder='カスタムClass'
                                type="text" />
                        </InputContainer>

                        <InputContainer>
                            <TextBox label="imgWrapカスタムClass"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='imgAreaOuterWrapCustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                // maxLength='32'
                                placeholder='カスタムClass'
                                type="text" />
                        </InputContainer>
                        <InputBoxSeparator cProperty={`mt-8 mb-8`} />


                        <InputContainer>
                            <SelectBox
                                label='予約カテゴリー説明1文字サイズ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='categoryDescription1TextSize'
                                onChange={(e) => handleOnChange(e, 1)}>
                                {fontSizeAttributes.length > 0 &&
                                    fontSizeAttributes.map((field, index) => (
                                        <option
                                            value={field.value}
                                            key={field.value + "_" + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                            </SelectBox>
                        </InputContainer>
                        <InputContainer>
                            <SelectBox
                                label='予約カテゴリー説明1文字太さ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='categoryDescription1FontWeight'
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

                            <label htmlFor="headerAreaShadow"
                                className="text-blue-100  text-xs">予約カテゴリー説明1配色</label>
                            <div className="flex justify-start space-x-4">
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])}
                                    inputBoxItem="categoryDescription1TextColor" pickerLabel="文字色"
                                    isBackgroundColor="1"
                                    isDefaultColor={initialData?.categoryDescription1TextColor} />


                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [1, 2])}
                                    inputBoxItem="categoryDescription1BackgroundColor" pickerLabel="エリア背景色"
                                    isBackgroundColor="1"
                                    isDefaultColor={initialData?.categoryDescription1BackgroundColor} />
                            </div>
                        </div>

                        <InputContainer>
                            <TextBox label='予約カテゴリー説明1pタグカスタムClass'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='categoryDescription1PCustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                placeholder='カスタムClass'
                                type="text" />
                        </InputContainer>

                        <InputContainer>
                            <TextBox label='予約カテゴリー説明1pタグWrapカスタムClass'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='categoryDescription1PWrapCustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                placeholder='カスタムClass'
                                type="text" />
                        </InputContainer>

                        <InputBoxSeparator cProperty={`mt-8 mb-8`} />


                        <InputContainer>
                            <SelectBox
                                label='予約カテゴリー説明2文字サイズ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='categoryDescription2TextSize'
                                onChange={(e) => handleOnChange(e, 1)}>
                                {fontSizeAttributes.length > 0 &&
                                    fontSizeAttributes.map((field, index) => (
                                        <option
                                            value={field.value}
                                            key={field.value + "_" + index}>
                                            {field.caption}
                                        </option>
                                    ))}
                            </SelectBox>
                        </InputContainer>
                        <InputContainer>
                            <SelectBox
                                label='予約カテゴリー説明2文字太さ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='categoryDescription2FontWeight'
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

                            <label htmlFor="headerAreaShadow"
                                className="text-blue-100  text-xs">予約カテゴリー説明2配色</label>
                            <div className="flex justify-start space-x-4">
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])}
                                    inputBoxItem="categoryDescription2TextColor" pickerLabel="文字色"
                                    isBackgroundColor="1"
                                    isDefaultColor={initialData?.categoryDescription2TextColor} />


                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [1, 2])}
                                    inputBoxItem="categoryDescription2BackgroundColor" pickerLabel="エリア背景色"
                                    isBackgroundColor="1"
                                    isDefaultColor={initialData?.categoryDescription2BackgroundColor} />
                            </div>
                        </div>

                        <InputContainer>
                            <TextBox label='予約カテゴリー説明2pタグカスタムClass'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='categoryDescription2PCustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                placeholder='カスタムClass'
                                type="text" />
                        </InputContainer>

                        <InputContainer>
                            <TextBox label='予約カテゴリー説明2pタグWrapカスタムClass'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='categoryDescription2PWrapCustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                placeholder='カスタムClass'
                                type="text" />
                        </InputContainer>

                        <InputBoxSeparator cProperty={`mt-8 mb-8`} />


                        <InputContainer>
                            <TextBox label="予約カテゴリー説明1&2WrapカスタムClass"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='categoryDescriptionAllWrapCustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                placeholder='カスタムClass'
                                type="text" />
                        </InputContainer>

                        <InputBoxSeparator cProperty={`mt-8 mb-8`} />

                        <InputContainer>
                            <TextBox label="検診内容エリアタイトル"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='examinationItemTitle'
                                onBlur={(e) => handleOnChange(e, 4)}
                                placeholder='検診内容エリアタイトル'
                                type="text" />
                        </InputContainer>
                        <InputContainer>
                            <SelectBox
                                label='検診内容エリアタイトル文字サイズ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='examinationItemTitleTextSize'
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
                                label='検診内容エリアタイトル文字太さ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='examinationItemTitleFontWeight'
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
                            <TextBox label='検診内容エリアタイトルカスタムClass'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='examinationItemTitleCustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                placeholder='カスタムClass'
                                type="text" />
                        </InputContainer>



                        <InputContainer>
                            <SelectBox
                                label='検診内容エリア本文文字サイズ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='examinationItemTextSize'
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
                                label='検診内容エリア本文文字太さ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='examinationItemFontWeight'
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
                            <TextBox label='検診内容エリアタイトルカスタムClass'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='examinationItemCustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                placeholder='カスタムClass'
                                type="text" />
                        </InputContainer>

                        <div className="flex flex-col mb-4">
                            <label htmlFor="headerAreaShadow" className="text-blue-100  text-xs">検診内容エリア配色</label>
                            <div className="flex justify-start space-x-4">
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])}
                                    inputBoxItem="examinationItemTitleTextColor" pickerLabel="タイトル色" isBackgroundColor="1"
                                    isDefaultColor={initialData?.examinationItemTitleTextColor} />
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])}
                                    inputBoxItem="examinationItemTextColor" pickerLabel="本文色"
                                    isBackgroundColor="1" isDefaultColor={initialData?.examinationItemTextColor} />
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [1, 2])}
                                    inputBoxItem="examinationItemBackgroundColor" pickerLabel="背景色"
                                    isBackgroundColor="1" isDefaultColor={initialData?.examinationItemBackgroundColor} />

                            </div>
                        </div>
                        <InputContainer>
                            <TextBox label="検診内容エリアWrapカスタムClass"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='examinationItemWrapCustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                placeholder='カスタムClass'
                                type="text" />
                        </InputContainer>

                        <InputBoxSeparator cProperty={`mt-8 mb-8`} />

                        <InputContainer>
                            <TextBox label="実施日程エリアタイトル"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='scheduleTitle'
                                onBlur={(e) => handleOnChange(e, 4)}
                                placeholder='実施日程エリアタイトル'
                                type="text" />
                        </InputContainer>
                        <InputContainer>
                            <SelectBox
                                label='実施日程エリアタイトル文字サイズ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='scheduleTitleTextSize'
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
                                label='実施日程エリアタイトル文字太さ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='scheduleTitleFontWeight'
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
                            <TextBox label='実施日程エリアタイトルカスタムClass'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='scheduleTitleCustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                placeholder='カスタムClass'
                                type="text" />
                        </InputContainer>



                        <InputContainer>
                            <SelectBox
                                label='実施日程エリア本文文字サイズ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='scheduleTextSize'
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
                                label='実施日程エリア本文文字太さ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='scheduleFontWeight'
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
                            <TextBox label='実施日程エリアタイトルカスタムClass'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='scheduleCustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                placeholder='カスタムClass'
                                type="text" />
                        </InputContainer>

                        <div className="flex flex-col mb-4">
                            <label htmlFor="headerAreaShadow" className="text-blue-100  text-xs">実施日程エリア配色</label>
                            <div className="flex justify-start space-x-4">
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])}
                                    inputBoxItem="scheduleTitleTextColor" pickerLabel="タイトル色" isBackgroundColor="1"
                                    isDefaultColor={initialData?.scheduleTitleTextColor} />
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])}
                                    inputBoxItem="scheduleTextColor" pickerLabel="本文色"
                                    isBackgroundColor="1" isDefaultColor={initialData?.scheduleTextColor} />
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [1, 2])}
                                    inputBoxItem="scheduleBackgroundColor" pickerLabel="背景色"
                                    isBackgroundColor="1" isDefaultColor={initialData?.scheduleBackgroundColor} />

                            </div>
                        </div>

                        <InputContainer>
                            <TextBox label="実施日程エリアWrapカスタムClass"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='scheduleWrapCustomClass'
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
export default CategorySelection1SettingsForm