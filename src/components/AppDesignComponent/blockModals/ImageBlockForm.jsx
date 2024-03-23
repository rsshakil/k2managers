import { Form, Formik } from "formik";
import React, { useState } from "react";

import useFileUpload from "../../../hooks/useFileUpload";
import { valueFormatCheck } from "../../../utilities/commonFunctions";
import FileUploadInput from "../../FileUploadInput/FileUploadInput";
import Note from "../../Form/FormInputs/Note";
import SelectBox from "../../Form/FormInputs/SelectBox";
import ModalTitle from "../../Modal/components/ModalTitle";
import WhiteModalWrapper from '../../Modal/components/WhiteModalWrapper';
import InputContainer from "../../Wrapper/InputContainer";
import BlockModalFooter from "./BlockModalFooter";


export default function ImageBlockForm({ blockData = '', setModalOpen = () => { }, handleOnPressSave = () => { }, fieldKey = '' }) {
    const [formData, setFormData] = useState(blockData);

    const [files, setFiles, images, setImages, error, setError] = useFileUpload();
    const [uploadedImages, setUploadedImages] = useState([]);


    function handleOnchange(e) {
        const name = e.target.name;
        const value = valueFormatCheck(e.target.value);

        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }


    function handleImageChange(uploadedImages = []) {
        setUploadedImages(uploadedImages);

        uploadedImages.forEach((image, index) => {
            const { location } = image || '';
            index = index + 1;

            setFormData((prevState) => ({
                ...prevState,
                [`imageUrl${index}`]: location || ''
            }))
        });
    }


    return (
        <WhiteModalWrapper width="border-none text-black" className="items-start">
            <ModalTitle title="画像設定" className="text-blue-100 text-xl" />

            <Formik
                enableReinitialize={true}
                initialValues={formData}
            >
                <div className='relative w-full h-full'>
                    <Form onChange={handleOnchange}>
                        <div className="body-height3 pt-12 px-10 min-h-[calc(100vh-452px)] !p-0">
                            <div className="flex flex-col py-10">
                                <InputContainer>
                                    <SelectBox
                                        label="画像枚数"
                                        name="imageQuantity"
                                        labelClassName="text-blue-100"
                                        inputClassName="bg-blue-25"
                                    >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                    </SelectBox>
                                </InputContainer>


                                <InputContainer>
                                    <FileUploadInput
                                        label='画像'
                                        files={files}
                                        setFiles={setFiles}
                                        images={images}
                                        setImages={setImages}
                                        uploadedImage={uploadedImages}
                                        //uploadedImage={formData[`imageUrl${formData.imageQuantity}`]}
                                        setUploadedImage={handleImageChange}
                                        initialValues={formData}
                                        numberOfField={formData.imageQuantity}
                                        isCenter='justify-center object-contain'
                                        error={error}
                                        setError={setError}
                                        name="imageUrl"
                                    />
                                </InputContainer>


                                <InputContainer>
                                    <Note label="画像エリアwrapカスタムClass"
                                        name="imgAreaCustomClass"
                                        placeholder="画像エリアwrapカスタムClass"
                                        labelClassName='text-blue-100'
                                        inputClassName='bg-blue-25 !p-1'
                                        height='h-8'
                                    />
                                </InputContainer>

                                <InputContainer>
                                    <Note label="imgWrapカスタムClass"
                                        name="imgWrapCustomClass"
                                        placeholder="imgWrapカスタムClass"
                                        labelClassName='text-blue-100'
                                        inputClassName='bg-blue-25 !p-1'
                                        height='h-8'
                                    />
                                </InputContainer>

                                <InputContainer>
                                    <Note label="imgカスタムClass"
                                        name="imgCustomClass"
                                        placeholder="imgカスタムClass"
                                        labelClassName='text-blue-100'
                                        inputClassName='bg-blue-25 !p-1'
                                        height='h-8'
                                    />
                                </InputContainer>

                            </div>
                        </div>

                        <BlockModalFooter
                            setModalOpen={() => setModalOpen(false)}
                            handleOnPressSave={(e) => handleOnPressSave(e, formData)}
                        />
                    </Form>
                </div>
            </Formik>
        </WhiteModalWrapper >
    )
}