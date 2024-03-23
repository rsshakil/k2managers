import SelectBox from "../../Form/FormInputs/SelectBox";
import InputContainer from "../../Wrapper/InputContainer";

import { Form, Formik } from "formik";
import React from "react";
import { strokeSizeArray } from "../../../lib/commonConstants";
import { fontSizeAttributes } from "../../../lib/tailwindClassAttributes";
import ColorPickerWithRecent from "../../ColorPicker/ColorPickerWithRecent";
import IconPicker from "../../IconPicker/IconPicker";


const RadioboxIconSettingForm = ({ formData: initialData, handleOnChange, handleOnChangeColor = () => { }, updateState, tailwindColorCodeKeys }) => {

    function handleOnChangeIcon(name, icon) {
        updateState(name, icon, 'info');
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
                                label='ラジオボタンのタイプ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='useIcon'
                                onChange={(e) => handleOnChange(e, 4)}
                            >
                                <option value={false}>ブラウザーのチェックボックを利用(CSSでカスタマイズ)</option>
                                <option value={true}>アイコンでカスタマイズ</option>

                            </SelectBox>
                        </InputContainer>

                        <p className="text-blue-100 text-xs m-5">選択前状態</p>

                        <InputContainer>
                            <SelectBox
                                label='アイコン1サイズ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='notSelectedIcon1Size'
                                onChange={(e) => handleOnChange(e, 1)}>
                                {fontSizeAttributes.map((field, index) => (
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
                                label='アイコン1strokeサイズ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='notSelectedIcon1StrokeSize'
                                onChange={(e) => handleOnChange(e, 1)}
                            >
                                {strokeSizeArray.map((field, index) => (
                                    <option key={field.value} value={field.value} > {field.caption}</option>
                                ))}
                            </SelectBox>
                        </InputContainer>


                        <div className="flex flex-col mb-4">
                            {/* <label htmlFor="headerAreaShadow" className="text-blue-100  text-xs">必須配色</label> */}

                            <div className="flex justify-start space-x-4">
                                <div className="icons">
                                    <IconPicker
                                        name="notSelectedIcon1"
                                        value={initialData?.notSelectedIcon1}
                                        width="32px"
                                        height="32px"
                                        iconSize="1.2em"
                                        iconTitle="アイコン1"
                                        path="M894 462c30.9 0 43.8-39.7 18.7-58L530.8 126.2a31.81 31.81 0 0 0-37.6 0L111.3 404c-25.1 18.2-12.2 58 18.8 58H192v374h-72c-4.4 0-8 3.6-8 8v52c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-52c0-4.4-3.6-8-8-8h-72V462h62zM381 836H264V462h117v374zm189 0H453V462h117v374zm190 0H642V462h118v374z"
                                        iconCustomClass="!rounded-none"
                                        iconWrapperCustomClasses="flex flex-row"
                                        titleCustomClasses="ml-1 text-blue-100"
                                        onChangeIcon={(name, iconData) => handleOnChangeIcon(name, iconData)}
                                    />
                                </div>

                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.fillColor, [1, 2])}
                                    inputBoxItem="notSelectedIcon1FillColor" pickerLabel="アイコン1fill色" isBackgroundColor="1"
                                    isDefaultColor={initialData?.notSelectedIcon1FillColor} />

                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.strokeColor, [1, 2])}
                                    inputBoxItem="notSelectedIcon1StrokeColor" pickerLabel="アイコン1stroke色" isBackgroundColor="1"
                                    isDefaultColor={initialData?.notSelectedIcon1StrokeColor} />
                            </div>
                        </div>


                        <div className="mt-8">
                            <InputContainer>
                                <SelectBox
                                    label='アイコン2サイズ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='notSelectedIcon2Size'
                                    onChange={(e) => handleOnChange(e, 1)}>
                                    {fontSizeAttributes.map((field, index) => (
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
                                    label='アイコン2strokeサイズ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='notSelectedIcon2StrokeSize'
                                    onChange={(e) => handleOnChange(e, 1)}
                                >
                                    {strokeSizeArray.map((field, index) => (
                                        <option key={field.value} value={field.value} > {field.caption}</option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                            <div className="flex flex-col mb-4">
                                {/* <label htmlFor="headerAreaShadow" className="text-blue-100  text-xs">必須配色</label> */}
                                <div className="flex justify-start space-x-4">
                                    <div className="icons">
                                        <IconPicker
                                            name="notSelectedIcon2"
                                            value={initialData?.notSelectedIcon2}
                                            width="32px"
                                            height="32px"
                                            iconSize="1.2em"
                                            iconTitle="アイコン2"
                                            path="M894 462c30.9 0 43.8-39.7 18.7-58L530.8 126.2a31.81 31.81 0 0 0-37.6 0L111.3 404c-25.1 18.2-12.2 58 18.8 58H192v374h-72c-4.4 0-8 3.6-8 8v52c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-52c0-4.4-3.6-8-8-8h-72V462h62zM381 836H264V462h117v374zm189 0H453V462h117v374zm190 0H642V462h118v374z"
                                            iconCustomClass="!rounded-none"
                                            iconWrapperCustomClasses="flex flex-row"
                                            titleCustomClasses="ml-1 text-blue-100"
                                            onChangeIcon={(name, iconData) => handleOnChangeIcon(name, iconData)}
                                        />
                                    </div>

                                    <ColorPickerWithRecent
                                        labelClassName="text-[10px] text-blue-100"
                                        setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.fillColor, [1, 2])}
                                        inputBoxItem="notSelectedIcon2FillColor" pickerLabel="アイコン2fill色" isBackgroundColor="1"
                                        isDefaultColor={initialData?.notSelectedIcon2FillColor} />

                                    <ColorPickerWithRecent
                                        labelClassName="text-[10px] text-blue-100"
                                        setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.strokeColor, [1, 2])}
                                        inputBoxItem="notSelectedIcon2StrokeColor" pickerLabel="アイコン2stroke色" isBackgroundColor="1"
                                        isDefaultColor={initialData?.notSelectedIcon2StrokeColor} />
                                </div>
                            </div>
                        </div>



                        <div className="flex flex-col mt-8 mb-8 border-dotted border"></div>

                        <p className="text-blue-100 text-xs m-5">選択後状態</p>
                        <InputContainer>
                            <SelectBox
                                label='アイコン1サイズ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='selectedIcon1Size'
                                onChange={(e) => handleOnChange(e, 1)}>
                                {fontSizeAttributes.map((field, index) => (
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
                                label='アイコン1strokeサイズ'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='selectedIcon1StrokeSize'
                                onChange={(e) => handleOnChange(e, 1)}
                            >
                                {strokeSizeArray.map((field, index) => (
                                    <option key={field.value} value={field.value} > {field.caption}</option>
                                ))}
                            </SelectBox>
                        </InputContainer>
                        <div className="flex flex-col mb-4">
                            {/* <label htmlFor="headerAreaShadow" className="text-blue-100  text-xs">必須配色</label> */}
                            <div className="flex justify-start space-x-4">
                                <div className="icons">
                                    <IconPicker
                                        name="selectedIcon1"
                                        value={initialData?.selectedIcon1}
                                        width="32px"
                                        height="32px"
                                        iconSize="1.2em"
                                        iconTitle="アイコン1"
                                        path="M894 462c30.9 0 43.8-39.7 18.7-58L530.8 126.2a31.81 31.81 0 0 0-37.6 0L111.3 404c-25.1 18.2-12.2 58 18.8 58H192v374h-72c-4.4 0-8 3.6-8 8v52c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-52c0-4.4-3.6-8-8-8h-72V462h62zM381 836H264V462h117v374zm189 0H453V462h117v374zm190 0H642V462h118v374z"
                                        iconCustomClass="!rounded-none"
                                        iconWrapperCustomClasses="flex flex-row"
                                        titleCustomClasses="ml-1 text-blue-100"
                                        onChangeIcon={(name, iconData) => handleOnChangeIcon(name, iconData)}
                                    />
                                </div>

                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.fillColor, [1, 2])}
                                    inputBoxItem="selectedIcon1FillColor" pickerLabel="アイコン1fill色" isBackgroundColor="1"
                                    isDefaultColor={initialData?.selectedIcon1FillColor} />

                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.strokeColor, [1, 2])}
                                    inputBoxItem="selectedIcon1StrokeColor" pickerLabel="アイコン1stroke色" isBackgroundColor="1"
                                    isDefaultColor={initialData?.selectedIcon1StrokeColor} />
                            </div>
                        </div>


                        <div className="mt-8">
                            <InputContainer>
                                <SelectBox
                                    label='アイコン2サイズ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='selectedIcon2Size'
                                    onChange={(e) => handleOnChange(e, 1)}>
                                    {fontSizeAttributes.map((field, index) => (
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
                                    label='アイコン2strokeサイズ'
                                    labelClassName='text-blue-100 text-xs'
                                    inputClassName='bg-blue-25'
                                    name='selectedIcon2StrokeSize'
                                    onChange={(e) => handleOnChange(e, 1)}
                                >
                                    {strokeSizeArray.map((field, index) => (
                                        <option key={field.value} value={field.value} > {field.caption}</option>
                                    ))}
                                </SelectBox>
                            </InputContainer>
                            <div className="flex flex-col mb-4">
                                {/* <label htmlFor="headerAreaShadow" className="text-blue-100  text-xs">必須配色</label> */}
                                <div className="flex justify-start space-x-4">
                                    <div className="icons">
                                        <IconPicker
                                            name="selectedIcon2"
                                            value={initialData?.selectedIcon2}
                                            width="32px"
                                            height="32px"
                                            iconSize="1.2em"
                                            iconTitle="アイコン2"
                                            path="M894 462c30.9 0 43.8-39.7 18.7-58L530.8 126.2a31.81 31.81 0 0 0-37.6 0L111.3 404c-25.1 18.2-12.2 58 18.8 58H192v374h-72c-4.4 0-8 3.6-8 8v52c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-52c0-4.4-3.6-8-8-8h-72V462h62zM381 836H264V462h117v374zm189 0H453V462h117v374zm190 0H642V462h118v374z"
                                            iconCustomClass="!rounded-none"
                                            iconWrapperCustomClasses="flex flex-row"
                                            titleCustomClasses="ml-1 text-blue-100"
                                            onChangeIcon={(name, iconData) => handleOnChangeIcon(name, iconData)}
                                        />
                                    </div>

                                    <ColorPickerWithRecent
                                        labelClassName="text-[10px] text-blue-100"
                                        setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.fillColor, [1, 2])}
                                        inputBoxItem="selectedIcon2FillColor" pickerLabel="アイコン2fill色" isBackgroundColor="1"
                                        isDefaultColor={initialData?.selectedIcon2FillColor} />

                                    <ColorPickerWithRecent
                                        labelClassName="text-[10px] text-blue-100"
                                        setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.strokeColor, [1, 2])}
                                        inputBoxItem="selectedIcon2StrokeColor" pickerLabel="アイコン2stroke色" isBackgroundColor="1"
                                        isDefaultColor={initialData?.selectedIcon2StrokeColor} />
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
        </Formik>
    );
}
export default RadioboxIconSettingForm