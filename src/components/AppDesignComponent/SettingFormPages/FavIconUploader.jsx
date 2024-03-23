import { useRecoilState, useRecoilValue } from 'recoil';
import InputContainer from '../../Wrapper/InputContainer';

import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import useFileUpload from '../../../hooks/useFileUpload';
import { appDesignerState, getSelectedPageData } from '../../../store/recoil/appDesignerState';
import FileUploadInput from '../../FileUploadInput/FileUploadInput';
import InputBoxSeparator from '../../InputBoxSeparator/InputBoxSeparator';

const FavIconUploader = ({ formData: initialValues, handleOnChange, handleOnChangeColor = () => { } }) => {
    const [recoilStateValue, setRecoilState] = useRecoilState(appDesignerState);
    const selectedPageDetail = useRecoilValue(getSelectedPageData);
    // File upload component
    const [files, setFiles, images, setImages, error, setError] = useFileUpload();
    const [uploadedImage1, setUploadedImage1] = useState([]);
    const [uploadedImage2, setUploadedImage2] = useState([]);
    const [uploadedImage3, setUploadedImage3] = useState([]);

    const { activeTab, activePageId, tabItems } = recoilStateValue;
    let settingContent = recoilStateValue ? tabItems.settings : [];
    let pageFrameData = settingContent.appSettingQuery.faviconSettings;

    useEffect(() => {
        console.log('my checking ->', uploadedImage1)
        let currentStateDataUpdate = JSON.parse(JSON.stringify({ ...recoilStateValue }));
        if (uploadedImage1.length > 0 && uploadedImage1[0].hasOwnProperty('location') === true) {
            let img = uploadedImage1[0].location;
            let oldImage = currentStateDataUpdate.tabItems.settings.appSettingQuery.faviconSettings?.info?.shortcutIcon;
            if (img != '' && img != oldImage) {
                currentStateDataUpdate.tabItems.settings.appSettingQuery.faviconSettings.info.shortcutIcon = img;
                setRecoilState(currentStateDataUpdate);
            }
        }
    }, [uploadedImage1]);

    useEffect(() => {
        if (uploadedImage2.length > 0 && uploadedImage2[0].hasOwnProperty('location') === true) {
            let currentStateDataUpdate = JSON.parse(JSON.stringify({ ...recoilStateValue }));
            let img = uploadedImage2[0].location;
            let oldImage =
                currentStateDataUpdate.tabItems.settings.appSettingQuery.faviconSettings?.info?.appleTouchIcon;
            if (img != '' && img != oldImage) {
                currentStateDataUpdate.tabItems.settings.appSettingQuery.faviconSettings.info.appleTouchIcon = img;
                setRecoilState(currentStateDataUpdate);
            }
        }
    }, [uploadedImage2]);

    useEffect(() => {
        if (uploadedImage3.length > 0 && uploadedImage3[0].hasOwnProperty('location') === true) {
            let currentStateDataUpdate = JSON.parse(JSON.stringify({ ...recoilStateValue }));
            let img = uploadedImage3[0].location;
            let oldImage = currentStateDataUpdate.tabItems.settings.appSettingQuery.faviconSettings?.info?.icon;
            if (img != '' && img != oldImage) {
                currentStateDataUpdate.tabItems.settings.appSettingQuery.faviconSettings.info.icon = img;
                setRecoilState(currentStateDataUpdate);
            }
        }
    }, [uploadedImage3]);

    //add pageFreame
    useEffect(() => {
        let ImageArr1 = [];
        let ImageArr2 = [];
        let ImageArr3 = [];
        let picture1 = initialValues.shortcutIcon;
        let picture2 = initialValues.appleTouchIcon;
        let picture3 = initialValues.icon;
        if (picture1 && picture1 != '') {
            var lastName = picture1.substring(picture1.lastIndexOf('/') + 1, picture1.length);
            const imageObj = { bucket: '', name: lastName, location: picture1, number: 1 };
            ImageArr1.push(imageObj);
        }
        if (picture2 && picture2 != '') {
            var lastName = picture2.substring(picture2.lastIndexOf('/') + 1, picture2.length);
            const imageObj = { bucket: '', name: lastName, location: picture2, number: 2 };
            ImageArr2.push(imageObj);
        }
        if (picture3 && picture3 != '') {
            var lastName = picture3.substring(picture3.lastIndexOf('/') + 1, picture3.length);
            const imageObj = { bucket: '', name: lastName, location: picture3, number: 3 };
            ImageArr3.push(imageObj);
        }

        setUploadedImage1([...ImageArr1]);
        setUploadedImage2([...ImageArr2]);
        setUploadedImage3([...ImageArr3]);
    }, [pageFrameData]);

    function imageDeleteHandle(deletedImageKey) {
        let currentStateDataUpdate = JSON.parse(JSON.stringify({ ...recoilStateValue }));
        currentStateDataUpdate.tabItems.settings.appSettingQuery.faviconSettings.info[deletedImageKey] = '';
        setRecoilState(currentStateDataUpdate);
    }

    function validateImage() {

    }

    return (
        <Formik validateOnChange={false} validateOnBlur={false} enableReinitialize={true} initialValues={initialValues}>
            <div className="relative w-full">
                <Form>
                    <div>
                        <InputContainer>
                            <FileUploadInput
                                className="!w-full"
                                label='64x64 32x32 24x24 16x16 ICO (rel="icon")'
                                files={files}
                                setFiles={setFiles}
                                images={images}
                                setImages={setImages}
                                uploadedImage={uploadedImage1}
                                setUploadedImage={setUploadedImage1}
                                deleteImageFromRecoil={imageDeleteHandle}
                                initialValues={initialValues}
                                numberOfField="1"
                                isCenter="justify-center object-contain"
                                error={error}
                                setError={setError}
                                acceptFileType="image/x-icon"
                                name="shortcutIcon"
                                uploadErrorInvisible={true}
                                imageClassName="!w-full"
                                acceptedDimensions={[{ width: 16, height: 16 }, { width: 24, height: 24 }, { width: 32, height: 32 }, { width: 64, height: 64 }]}
                            />
                        </InputContainer>

                        <InputContainer>
                            <FileUploadInput
                                className="!w-full"
                                label='144×144　PNG (rel="apple-touch-icon")'
                                files={files}
                                setFiles={setFiles}
                                images={images}
                                setImages={setImages}
                                uploadedImage={uploadedImage2}
                                setUploadedImage={setUploadedImage2}
                                deleteImageFromRecoil={imageDeleteHandle}
                                initialValues={initialValues}
                                numberOfField="1"
                                isCenter="justify-center object-contain"
                                error={error}
                                setError={setError}
                                acceptFileType="image/png"
                                name="appleTouchIcon"
                                uploadErrorInvisible={true}
                                imageClassName="!w-full"
                                acceptedDimensions={[{ width: 144, height: 144 }]}
                            />
                        </InputContainer>

                        <InputContainer className="!mb-0">
                            <FileUploadInput
                                className="!w-full"
                                label='192×192 PNG (rel="icon")'
                                files={files}
                                setFiles={setFiles}
                                images={images}
                                setImages={setImages}
                                uploadedImage={uploadedImage3}
                                setUploadedImage={setUploadedImage3}
                                deleteImageFromRecoil={imageDeleteHandle}
                                initialValues={initialValues}
                                numberOfField="1"
                                isCenter="justify-center object-contain"
                                error={error}
                                setError={setError}
                                acceptFileType="image/png"
                                name="icon"
                                uploadErrorInvisible={true}
                                imageClassName="!w-full"
                                acceptedDimensions={[{ width: 192, height: 192 }]}
                            />
                        </InputContainer>

                        <InputBoxSeparator cProperty={`mt-8 mb-10`} />

                        <label className="text-blue-100 text-xs !ml-0">以下のようにに設定されます</label>
                        <p className='text-sm'>{'<link rel="icon" href="/favicon.ico">'}</p>
                        <p className='text-sm'>{'<link rel="icon" type="image/png" href="/android-chrome-192x192.png">'}</p>
                        <p className='text-sm'>{'<link rel="apple-touch-icon" href="/apple-touch-icon.png">'}</p>

                        <label className="flex flex-col mt-8 text-blue-100 text-xs !ml-0">以下のようなサービスで生成できます</label>
                        <p className='text-sm'>{'https://realfavicongenerator.net/'}</p>
                        <p className='text-sm'>{'https://ao-system.net/favicongenerator/'}</p>
                    </div>
                </Form>
            </div>
        </Formik>
    );
};
export default FavIconUploader;
