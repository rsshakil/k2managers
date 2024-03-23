import InputContainer from "../../Wrapper/InputContainer";
import TextBox from "../../Form/FormInputs/TextBox";
import SelectBox from "../../Form/FormInputs/SelectBox";

import React, { useState, useEffect } from "react";
import { Formik, Form, useFormikContext } from "formik";
import ColorPickerWithRecent from "../../ColorPicker/ColorPickerWithRecent";
import { borderAttributes, borderStyles, shadowAttributes, heightAttributes, positionAttributes, fontSizeAttributes, fontWeightAttributes, justifyContentAttributes, headerStructures } from "../../../lib/tailwindClassAttributes"
import Note from "../../Form/FormInputs/Note";

const FooterSettings = ({ formData: initialData, handleOnChange, handleOnChangeColor = () => { }, tailwindColorCodeKeys }) => {

    return (

        <Formik
            validateOnChange={false}
            validateOnBlur={false}
            enableReinitialize={true}
            initialValues={initialData}
            onSubmit=""
        >
            <div className='relative w-full'>
                <Form>
                    <div>
                        <InputContainer>
                            <SelectBox
                                label='フッター有無'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='hasFooter'
                                onChange={(e) => handleOnChange(e, 4)}>
                                <option value='false'>なし</option>
                                <option value='true'>あり</option>
                            </SelectBox>
                        </InputContainer>
                        <InputContainer>
                            <TextBox label="事業者・イベント名（最大３２文字）"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='corporationText'
                                onBlur={(e) => handleOnChange(e, 4)}
                                maxLength='32'
                                placeholder='事業者・イベント名'
                                type="text" />
                        </InputContainer>

                        <InputContainer>
                            <TextBox label="事業者・イベント名 link URL"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='corporationUrl'
                                onBlur={(e) => handleOnChange(e, 4)}
                                // value={pageFrameData.footerCorporationUrl}
                                placeholder='URL'
                                type="text" />
                        </InputContainer>
                        <InputContainer>
                            <Note label="事業者・イベント名WrapカスタムClass"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25 !p-1'
                                height='h-8'
                                name='corporationWrapCustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                // value={pageFrameData.footerCorporationUrl}
                                placeholder='カスタムClass'
                            />
                        </InputContainer>
                        <div className="mt-12"></div>
                        <InputContainer>
                            <TextBox label="電話番号（最大１６文字）"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='tel'
                                onBlur={(e) => handleOnChange(e, 4)}
                                maxLength='16'
                                placeholder='電話番号'
                                type="text" />
                        </InputContainer>
                        <InputContainer>
                            <TextBox label="受付時間（最大３２文字）"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='time'
                                onBlur={(e) => handleOnChange(e, 4)}
                                maxLength='32'
                                placeholder='受付時間'
                                type="text" />
                        </InputContainer>
                        <InputContainer>
                            <Note label="電話番号・受付時間WrapカスタムClass"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25 !p-1'
                                height='h-8'
                                name='telTimeWrapCustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                // value={pageFrameData.footerCorporationUrl}
                                placeholder='カスタムClass'
                            />
                        </InputContainer>
                        <div className="mt-12"></div>
                        <InputContainer>
                            <TextBox label="コピーライト"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='copyright'
                                onBlur={(e) => handleOnChange(e, 4)}
                                placeholder='コピーライト'
                                type="text" />
                        </InputContainer>
                        <InputContainer>
                            <Note label="コピーライトWrapカスタムClass									"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25 !p-1'
                                height='h-8'
                                name='copyrightWrapCustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                // value={pageFrameData.footerCorporationUrl}
                                placeholder='カスタムClass'
                            />
                        </InputContainer>
                        <div className="mt-12"></div>
                        <InputContainer>
                            <SelectBox
                                label='フッターエリア高さ(絶対値で設定した時コンテンツ高が計算されます)'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='height'
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
                        <div className="flex flex-col mb-4">
                            <label htmlFor="headerAreaShadow" className="text-blue-100  text-xs">フッターエリア配色</label>
                            <div className="flex justify-start space-x-4">
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.backgroundColor, [1, 2])}
                                    inputBoxItem="backgroundColor" pickerLabel="背景色" isBackgroundColor="1"
                                    isDefaultColor={initialData?.backgroundColor} />
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])}
                                    inputBoxItem="textColor" pickerLabel="文字色" isBackgroundColor="1"
                                    isDefaultColor={initialData?.textColor} />

                            </div>
                        </div>

                        <InputContainer className="!mb-0">
                            <Note label="フッターエリアカスタムClass"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25 !p-1'
                                height='h-8'
                                name='customClass'
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
export default FooterSettings