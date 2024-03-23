import { useRecoilState, useRecoilValue } from "recoil";
import SelectBox from "../../Form/FormInputs/SelectBox";
import TextAreaInput from "../../Form/FormInputs/TextAreaInput";
import TextBox from "../../Form/FormInputs/TextBox";
import InputBoxSeparator from '../../InputBoxSeparator/InputBoxSeparator';
import InputContainer from "../../Wrapper/InputContainer";

import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import useFileUpload from "../../../hooks/useFileUpload";
import ColorPickerWithRecent from "../../ColorPicker/ColorPickerWithRecent";
import FileUploadInput from "../../FileUploadInput/FileUploadInput";
import Note from "../../Form/FormInputs/Note";

import { fontSizeAttributes, fontWeightAttributes, headerStructures, heightAttributes, justifyContentAttributes, letterSpacingAttributes, textAlignAttributes, verticalAlignAttributes, widthAttributes } from "../../../lib/tailwindClassAttributes";
import { appDesignerState, getSelectedPageData } from "../../../store/recoil/appDesignerState";

const LogoSettings = ({ formData: initialData, handleOnChange, handleOnChangeColor = () => { }, tailwindColorCodeKeys }) => {

    const [recoilStateValue, setRecoilState] = useRecoilState(appDesignerState);
    const selectedPageDetail = useRecoilValue(getSelectedPageData);
    // File upload component
    const [files, setFiles, images, setImages, error, setError] = useFileUpload()
    const [uploadedImage, setUploadedImage] = useState([])
    const { activeTab, activePageId, tabItems } = recoilStateValue;
    let settingContent = recoilStateValue ? tabItems.settings : [];
    let pageFrameData = settingContent.appSettingQuery.logoSettings?.info?.imageUrl;

    useEffect(() => {
        if (uploadedImage.length > 0 && uploadedImage[0].hasOwnProperty('location') === true) {
            let currentStateDataUpdate = JSON.parse(JSON.stringify({ ...recoilStateValue }));
            let img = uploadedImage[0].location;
            let oldImage = currentStateDataUpdate.tabItems.settings.appSettingQuery.logoSettings?.info?.imageUrl;
            if (img != '' && img != oldImage) {
                currentStateDataUpdate.tabItems.settings.appSettingQuery.logoSettings.info.imageUrl = img;
                setRecoilState(currentStateDataUpdate);
            }
        }
    }, [uploadedImage]);

    //add pageFreame
    useEffect(() => {

        let ImageArr = [];
        let picture1 = initialData.imageUrl;
        if (picture1 && picture1 != '') {
            var lastName = picture1.substring(picture1.lastIndexOf("/") + 1, picture1.length);
            const imageObj = { bucket: "", name: lastName, location: picture1, number: 1 }
            ImageArr.push(imageObj)
            setUploadedImage([...ImageArr]);
        } else {
            setUploadedImage([...ImageArr]);
        }
    }, [pageFrameData]);


    function handleOnChangePrefix(e, attr) {
        let attrName = e.target.name;
        let attrValue = e.target.value;
        let getAttrNameFromArr = attrName.split('.');
        let objName = getAttrNameFromArr[0];
        let objIndex = getAttrNameFromArr[1];

        let currentStateDataUpdate = JSON.parse(JSON.stringify({ ...recoilStateValue }));
        currentStateDataUpdate.tabItems.settings.appSettingQuery.logoSettings.prefixClass[objName][objIndex] = attrValue;

        setRecoilState(currentStateDataUpdate);
    }
    function imageDeleteHandle(deletedImageKey) {
        let currentStateDataUpdate = JSON.parse(JSON.stringify({ ...recoilStateValue }));
        currentStateDataUpdate.tabItems.settings.appSettingQuery.logoSettings.info[deletedImageKey] = '';
        setRecoilState(currentStateDataUpdate);
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
                                label='ロゴ位置（左もしくは右を選んだ時のみ、反対側にヘッダーメニューが出現します）'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='justifyContent'
                                onChange={(e) => handleOnChange(e, 1)}
                            >
                                {justifyContentAttributes.length > 0 &&
                                    justifyContentAttributes.map((field, index) => (
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
                            <TextBox label="ロゴテキストLINKアドレス"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='linkUrl'
                                onBlur={(e) => handleOnChange(e, 4)}
                                placeholder='URL'
                                type="text" />
                        </InputContainer>
                        <InputContainer>
                            <SelectBox
                                label='ロゴテキストLINKを別タブで開く'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='linkTargetBlank'
                                onChange={(e) => handleOnChange(e, 4)}>
                                <option value='true'>開く</option>
                                <option value='false'>開かない</option>
                            </SelectBox>
                        </InputContainer>
                        <InputContainer>
                            <SelectBox
                                label='ロゴ構成'
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25'
                                name='structure'
                                onChange={(e) => handleOnChange(e, 4)}>
                                {headerStructures.length > 0 &&
                                    headerStructures.map((field, index) => (
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
                            <Note label="ロゴWrapカスタムClass"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25 !p-1'
                                height='h-8'
                                name='logoWrapCustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                placeholder='カスタムClass'
                            />
                        </InputContainer>

                        <InputBoxSeparator cProperty={`mt-8 mb-8`} />


                        <InputContainer>
                            <FileUploadInput
                                className="!w-full"
                                label="ロゴ画像"
                                files={files}
                                setFiles={setFiles}
                                images={images}
                                setImages={setImages}
                                uploadedImage={uploadedImage}
                                setUploadedImage={setUploadedImage}
                                deleteImageFromRecoil={imageDeleteHandle}
                                initialValues={initialData}
                                numberOfField='1'
                                isCenter='justify-center object-contain'
                                error={error}
                                setError={setError}
                                name="imageUrl"
                                uploadErrorInvisible={true}
                                imageClassName="!w-full"

                            />
                        </InputContainer>

                        <div className="flex justify-between space-x-4">
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='高さ：無指定'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='default.imageHeight'
                                        onChange={(e) => handleOnChangePrefix(e, 'default')}>
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
                            </div>
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='高さ：640px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='sm.imageHeight'
                                        onChange={(e) => handleOnChangePrefix(e, 'sm')}>
                                        {heightAttributes.length > 0 &&
                                            heightAttributes.map((field, index) => (
                                                <option
                                                    value={`sm:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='高さ：768px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='md.imageHeight'
                                        onChange={(e) => handleOnChangePrefix(e, 'md')}>
                                        {heightAttributes.length > 0 &&
                                            heightAttributes.map((field, index) => (
                                                <option
                                                    value={`md:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                        </div>

                        <div className="flex justify-between space-x-4">
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='高さ：1024px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='lg.imageHeight'
                                        onChange={(e) => handleOnChangePrefix(e, 'lg')}>
                                        {heightAttributes.length > 0 &&
                                            heightAttributes.map((field, index) => (
                                                <option
                                                    value={`lg:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='高さ：1280px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='xl.imageHeight'
                                        onChange={(e) => handleOnChangePrefix(e, 'xl')}>
                                        {heightAttributes.length > 0 &&
                                            heightAttributes.map((field, index) => (
                                                <option
                                                    value={`xl:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='高さ：1536px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='2xl.imageHeight'
                                        onChange={(e) => handleOnChangePrefix(e, '2xl')}>
                                        {heightAttributes.length > 0 &&
                                            heightAttributes.map((field, index) => (
                                                <option
                                                    value={`2xl:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                        </div>

                        <div className="flex mt-12  justify-between space-x-4">
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='横幅：無指定'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='default.imageWidth'
                                        onChange={(e) => handleOnChangePrefix(e, 'default')}>
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
                            </div>
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='横幅：640px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='sm.imageWidth'
                                        onChange={(e) => handleOnChangePrefix(e, 'sm')}>
                                        {widthAttributes.length > 0 &&
                                            widthAttributes.map((field, index) => (
                                                <option
                                                    value={`sm:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='横幅：768px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='md.imageWidth'
                                        onChange={(e) => handleOnChangePrefix(e, 'md')}>
                                        {widthAttributes.length > 0 &&
                                            widthAttributes.map((field, index) => (
                                                <option
                                                    value={`md:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                        </div>

                        <div className="flex justify-between mb-12 space-x-4">
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='横幅：1024px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='lg.imageWidth'
                                        onChange={(e) => handleOnChangePrefix(e, 'lg')}>
                                        {widthAttributes.length > 0 &&
                                            widthAttributes.map((field, index) => (
                                                <option
                                                    value={`lg:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='横幅：1280px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='xl.imageWidth'
                                        onChange={(e) => handleOnChangePrefix(e, 'xl')}>
                                        {widthAttributes.length > 0 &&
                                            widthAttributes.map((field, index) => (
                                                <option
                                                    value={`xl:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='横幅：1536px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='2xl.imageWidth'
                                        onChange={(e) => handleOnChangePrefix(e, '2xl')}>
                                        {widthAttributes.length > 0 &&
                                            widthAttributes.map((field, index) => (
                                                <option
                                                    value={`2xl:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                        </div>
                        <InputContainer>
                            <Note label="ロゴ画像カスタムClass"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25 !p-1'
                                height='h-8'
                                name='imageCustomClass'
                                onBlur={(e) => handleOnChange(e, 1)}
                                placeholder='カスタムClass'
                            />
                        </InputContainer>

                        <InputBoxSeparator cProperty={`mt-8 mb-8`} />

                        <InputContainer>
                            <TextAreaInput
                                label="ロゴテキスト（改行可能、最大32文字）"
                                labelClassName="text-blue-100"
                                inputClassName="bg-blue-25 !h-16"
                                name="text"
                                onBlur={(e) => handleOnChange(e, 4)}
                                maxLength="32"
                                type="text"
                                placeholder="ロゴテキスト"
                            />
                        </InputContainer>


                        <div className="flex justify-between space-x-4">
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='文字揃え：無指定'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='default.textAlign'
                                        onChange={(e) => handleOnChangePrefix(e, 'default')}>
                                        {textAlignAttributes.length > 0 &&
                                            textAlignAttributes.map((field, index) => (
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
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='文字揃え：640px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='sm.textAlign'
                                        onChange={(e) => handleOnChangePrefix(e, 'sm')}>
                                        {textAlignAttributes.length > 0 &&
                                            textAlignAttributes.map((field, index) => (
                                                <option
                                                    value={`sm:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='文字揃え：768px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='md.textAlign'
                                        onChange={(e) => handleOnChangePrefix(e, 'md')}>
                                        {textAlignAttributes.length > 0 &&
                                            textAlignAttributes.map((field, index) => (
                                                <option
                                                    value={`md:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                        </div>

                        <div className="flex justify-between mb-12 space-x-4">
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='文字揃え：1024px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='lg.textAlign'
                                        onChange={(e) => handleOnChangePrefix(e, 'lg')}>
                                        {textAlignAttributes.length > 0 &&
                                            textAlignAttributes.map((field, index) => (
                                                <option
                                                    value={`lg:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='文字揃え：1280px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='xl.textAlign'
                                        onChange={(e) => handleOnChangePrefix(e, 'xl')}>
                                        {textAlignAttributes.length > 0 &&
                                            textAlignAttributes.map((field, index) => (
                                                <option
                                                    value={`xl:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='文字揃え：1536px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='2xl.textAlign'
                                        onChange={(e) => handleOnChangePrefix(e, '2xl')}>
                                        {textAlignAttributes.length > 0 &&
                                            textAlignAttributes.map((field, index) => (
                                                <option
                                                    value={`2xl:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                        </div>

                        <div className="flex mt-4 justify-between space-x-4">
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='垂直整列：無指定'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='default.verticalAlign'
                                        onChange={(e) => handleOnChangePrefix(e, 'default')}>
                                        {verticalAlignAttributes.length > 0 &&
                                            verticalAlignAttributes.map((field, index) => (
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
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='垂直整列：640px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='sm.verticalAlign'
                                        onChange={(e) => handleOnChangePrefix(e, 'sm')}>
                                        {verticalAlignAttributes.length > 0 &&
                                            verticalAlignAttributes.map((field, index) => (
                                                <option
                                                    value={`sm:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='垂直整列：768px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='md.verticalAlign'
                                        onChange={(e) => handleOnChangePrefix(e, 'md')}>
                                        {verticalAlignAttributes.length > 0 &&
                                            verticalAlignAttributes.map((field, index) => (
                                                <option
                                                    value={`md:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                        </div>

                        <div className="flex justify-between mb-12 space-x-4">
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='垂直整列：1024px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='lg.verticalAlign'
                                        onChange={(e) => handleOnChangePrefix(e, 'lg')}>
                                        {verticalAlignAttributes.length > 0 &&
                                            verticalAlignAttributes.map((field, index) => (
                                                <option
                                                    value={`lg:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='垂直整列：1280px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='xl.verticalAlign'
                                        onChange={(e) => handleOnChangePrefix(e, 'xl')}>
                                        {verticalAlignAttributes.length > 0 &&
                                            verticalAlignAttributes.map((field, index) => (
                                                <option
                                                    value={`xl:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='垂直整列：1536px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='2xl.verticalAlign'
                                        onChange={(e) => handleOnChangePrefix(e, '2xl')}>
                                        {verticalAlignAttributes.length > 0 &&
                                            verticalAlignAttributes.map((field, index) => (
                                                <option
                                                    value={`2xl:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                        </div>


                        <div className="flex justify-between space-x-4">
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='文字サイズ：無指定'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='default.textSize'
                                        onChange={(e) => handleOnChangePrefix(e, 'default')}>
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
                            </div>
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='文字サイズ：640px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='sm.textSize'
                                        onChange={(e) => handleOnChangePrefix(e, 'sm')}>
                                        {fontSizeAttributes.length > 0 &&
                                            fontSizeAttributes.map((field, index) => (
                                                <option
                                                    value={`sm:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='文字サイズ：768px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='md.textSize'
                                        onChange={(e) => handleOnChangePrefix(e, 'md')}>
                                        {fontSizeAttributes.length > 0 &&
                                            fontSizeAttributes.map((field, index) => (
                                                <option
                                                    value={`md:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                        </div>

                        <div className="flex justify-between mb-12 space-x-4">
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='文字サイズ：1024px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='lg.textSize'
                                        onChange={(e) => handleOnChangePrefix(e, 'lg')}>
                                        {fontSizeAttributes.length > 0 &&
                                            fontSizeAttributes.map((field, index) => (
                                                <option
                                                    value={`lg:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='文字サイズ：1280px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='xl.textSize'
                                        onChange={(e) => handleOnChangePrefix(e, 'xl')}>
                                        {fontSizeAttributes.length > 0 &&
                                            fontSizeAttributes.map((field, index) => (
                                                <option
                                                    value={`xl:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='文字サイズ：1536px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='2xl.textSize'
                                        onChange={(e) => handleOnChangePrefix(e, '2xl')}>
                                        {fontSizeAttributes.length > 0 &&
                                            fontSizeAttributes.map((field, index) => (
                                                <option
                                                    value={`2xl:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                        </div>

                        <div className="flex mt-4 justify-between space-x-4">
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='文字太さ：無指定'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='default.textWeight'
                                        onChange={(e) => handleOnChangePrefix(e, 'default')}>
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
                            </div>
                            <div className="w-1/3 ">
                                <InputContainer>
                                    <SelectBox
                                        label='文字太さ：640px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='sm.textWeight'
                                        onChange={(e) => handleOnChangePrefix(e, 'sm')}>
                                        {fontWeightAttributes.length > 0 &&
                                            fontWeightAttributes.map((field, index) => (
                                                <option
                                                    value={`sm:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='文字太さ：768px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='md.textWeight'
                                        onChange={(e) => handleOnChangePrefix(e, 'md')}>
                                        {fontWeightAttributes.length > 0 &&
                                            fontWeightAttributes.map((field, index) => (
                                                <option
                                                    value={`md:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                        </div>

                        <div className="flex justify-between mb-12 space-x-4">
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='文字太さ：1024px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='lg.textWeight'
                                        onChange={(e) => handleOnChangePrefix(e, 'lg')}>
                                        {fontWeightAttributes.length > 0 &&
                                            fontWeightAttributes.map((field, index) => (
                                                <option
                                                    value={`lg:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='文字太さ：1280px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='xl.textWeight'
                                        onChange={(e) => handleOnChangePrefix(e, 'xl')}>
                                        {fontWeightAttributes.length > 0 &&
                                            fontWeightAttributes.map((field, index) => (
                                                <option
                                                    value={`xl:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='文字太さ：1536px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='2xl.textWeight'
                                        onChange={(e) => handleOnChangePrefix(e, '2xl')}>
                                        {fontWeightAttributes.length > 0 &&
                                            fontWeightAttributes.map((field, index) => (
                                                <option
                                                    value={`2xl:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                        </div>

                        <div className="flex justify-between space-x-4">
                            <div className="w-1/3 ">
                                <InputContainer>
                                    <SelectBox
                                        label='文字字間：無指定'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='default.letterSpacing'
                                        onChange={(e) => handleOnChangePrefix(e, 'default')}>
                                        {letterSpacingAttributes.length > 0 &&
                                            letterSpacingAttributes.map((field, index) => (
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
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='文字字間：640px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='sm.letterSpacing'
                                        onChange={(e) => handleOnChangePrefix(e, 'sm')}>
                                        {letterSpacingAttributes.length > 0 &&
                                            letterSpacingAttributes.map((field, index) => (
                                                <option
                                                    value={`sm:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='文字字間：768px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='md.letterSpacing'
                                        onChange={(e) => handleOnChangePrefix(e, 'md')}>
                                        {letterSpacingAttributes.length > 0 &&
                                            letterSpacingAttributes.map((field, index) => (
                                                <option
                                                    value={`md:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                        </div>

                        <div className="flex justify-between mb-12 space-x-4">
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='文字字間：1024px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='lg.letterSpacing'
                                        onChange={(e) => handleOnChangePrefix(e, 'lg')}>
                                        {letterSpacingAttributes.length > 0 &&
                                            letterSpacingAttributes.map((field, index) => (
                                                <option
                                                    value={`lg:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='文字字間：1280px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='xl.letterSpacing'
                                        onChange={(e) => handleOnChangePrefix(e, 'xl')}>
                                        {letterSpacingAttributes.length > 0 &&
                                            letterSpacingAttributes.map((field, index) => (
                                                <option
                                                    value={`xl:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                            <div className="w-1/3">
                                <InputContainer>
                                    <SelectBox
                                        label='文字字間：1536px以上'
                                        labelClassName='text-blue-100 text-xs'
                                        inputClassName='bg-blue-25'
                                        name='2xl.letterSpacing'
                                        onChange={(e) => handleOnChangePrefix(e, '2xl')}>
                                        {letterSpacingAttributes.length > 0 &&
                                            letterSpacingAttributes.map((field, index) => (
                                                <option
                                                    value={`2xl:${field.value}`}
                                                    key={field.value + "_" + index}>
                                                    {field.caption}
                                                </option>
                                            )
                                            )}
                                    </SelectBox>
                                </InputContainer>
                            </div>
                        </div>

                        <div className="flex flex-col mb-4">
                            <label htmlFor="headerAreaShadow" className="text-blue-100 text-xs">ロゴ文字配色</label>
                            <div className="flex justify-start">
                                <ColorPickerWithRecent
                                    labelClassName="text-[10px] text-blue-100"
                                    setColorhandle={(_, name, colorCode) => handleOnChangeColor(name, colorCode, tailwindColorCodeKeys.textColor, [1, 2])}
                                    inputBoxItem="textColor" pickerLabel="文字色" isBackgroundColor="1"
                                    isDefaultColor={initialData?.textColor} />
                            </div>
                        </div>
                        <InputContainer className="!mb-0">
                            <Note label="ロゴ文字カスタムClass"
                                labelClassName='text-blue-100 text-xs'
                                inputClassName='bg-blue-25 !p-1'
                                height='h-8'
                                name='textCustomClass'
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
export default LogoSettings