import React, { useEffect, useState } from 'react';
import { CgCloseO } from 'react-icons/cg';
import { uploadFile } from 'react-s3';
import brokenImage from '../../img/broken.png';
import { errorMessages } from '../../lib/errorMessages';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { ImWarning } from "react-icons/im";
import {baseURL, fileUploadToS3, createMethod } from '../../../src/restapi/queries';
import { instance } from '../../services/axios.js';
import Loading from '../../components/Loading/Loader';
import { useSelector } from 'react-redux';


const config = {
    bucketName: process.env.REACT_APP_AWS_S3_BUCKET_NAME,
    region: process.env.REACT_APP_AWS_REGION,
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
};

window.Buffer = window.Buffer || require('buffer').Buffer;
const FileUploadInput = ({
    setFiles,
    className,
    imageClassName,
    uploadErrorInvisible,
    uploadedImage,
    setUploadedImage,
    deleteImageConfrim,
    setDeleteImages,
    error,
    setError,
    label,
    name,
    initialValues,
    numberOfField = 3,
    isCenter = '',
    acceptFileType = 'image/png, image/jpg, image/jpeg, image/gif',
    deleteImageFromRecoil = '',
    acceptedDimensions = [],
}) => {
    let numField = Array.from({ length: numberOfField }, (_, i) => i + 1);
    const [loading, setLoading] = useState(false)
    const projectId = sessionStorage.getItem('currentProjectId');
    const [fileSizeError, setFileSizeError] = useState(false);
    const [extensionError, setExtensionError] = useState(false);
    const [fileDimensionError, setFileDimensionError] = useState(false);
    const acceptedExtensions = ['png', 'PNG', 'jpg', 'JPG', 'jpeg', 'JPEG', 'gif', 'GIF', 'ico', 'ICO'];
    const { info } = useSelector((state) => state.auth);
//Buffer is required to upload the file to s3 bucket
window.Buffer = window.Buffer || require("buffer").Buffer;
    useEffect(() => {
        const imageName1 = name + 1;
        const imageName2 = name + 2;
        const imageName3 = name + 3;
        const { [imageName1]: picture1, [imageName2]: picture2, [imageName3]: picture3 } = initialValues;

        const ImageArr = [];

        if (picture1) {
            let lastName = picture1.substring(picture1.lastIndexOf('/') + 1, picture1.length);
            const imageObj = { bucket: '', name: lastName, location: picture1, number: 1 };
            ImageArr.push(imageObj);
        } else {
            ImageArr.push('');
        }
        if (picture2) {
            let lastName = picture2.substring(picture2.lastIndexOf('/') + 1, picture2.length);
            const imageObj = { bucket: '', name: lastName, location: picture2, number: 2 };
            ImageArr.push(imageObj);
        } else {
            ImageArr.push('');
        }
        if (picture3) {
            let lastName = picture3.substring(picture3.lastIndexOf('/') + 1, picture3.length);
            const imageObj = { bucket: '', name: lastName, location: picture3, number: 3 };
            ImageArr.push(imageObj);
        } else {
            ImageArr.push('');
        }

        setUploadedImage([...ImageArr]);
    }, []);

    const handleUpload = async (e, number) => {
        let targetFile = e.target.files[0];
        let eTargetName = e.target.name;
        //dimension validation
        if (Array.isArray(acceptedDimensions) && acceptedDimensions.length > 0) {
            setFileDimensionError(false);

            try {
                const getDimension = (imageSrc) => new Promise(resolve => {
                    const image = new Image();
                    image.onload = () => {
                        const height = image.height;
                        const width = image.width;
                        resolve({ image, width, height });
                    };
                    image.src = imageSrc;
                });

                const { width, height } = await getDimension(window.URL.createObjectURL(targetFile));

                const found = acceptedDimensions.find(x => x.width == width && x.height == height);
                if (!found) {
                    setFileDimensionError(true);
                    return null;
                }

            } catch (err) {
                console.log('Err while calculating dimension ', err)
                return null;
            }
        }

        // Random File Name
        const S = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const N = 16;
        let fileName = Array.from(crypto.getRandomValues(new Uint32Array(N)))
            .map((n) => S[n % S.length])
            .join('');


        const tName = targetFile.name;
        const extension = tName.substring(tName.lastIndexOf('.') + 1, tName.length);
        // changes file name
        var blob = targetFile.slice(0, targetFile.size, 'image/png');
        targetFile = new File([blob], `${fileName}.${extension}`, { type: 'image/png' });

        // Extension Check
        if (!acceptedExtensions.includes(extension)) {
            setError((prev) => ({ ...prev, [e.target.name]: true }));
            setFileSizeError(false);
            setExtensionError(true);
            return;
        } else if (targetFile?.size > 1000000) {
            setError((prev) => ({ ...prev, [e.target.name]: true }));
            setExtensionError(false);
            setFileSizeError(true);
            return;
        } else {
            setFileSizeError(false);
            setExtensionError(false);
        }
        if (!targetFile?.name.match(/\.(jpg|png|jpeg|gif|ico)$/i)) {
            setError((prev) => ({ ...prev, [e.target.name]: true }));
            return;
        }

        console.log('targetFile', targetFile);
        let targetFile2 = e.target.files[0];  
const tName2 = targetFile2.name;
const extension2 = tName2.substring(tName2.lastIndexOf('.') + 1, tName2.length);
// changes file name
        var blob = targetFile2.slice(0, targetFile2.size, 'image/png');
        console.log('blobbbbb',blob);
        targetFile2 = new File([blob], `${fileName}.${extension2}`, { type: 'image/png' });
        
     

        try {
           
            //file upload via API
// // send request to aws s3 bucket
const reader = new FileReader();
reader.onload = async function (e) {
    const text = e.target.result;

    let array = Buffer.from(new Int8Array(text));
    console.log('array',array);
    let base64data = array.toString('base64');
    console.log('base64data',base64data);
            try {
             


    setLoading(true);
    if (projectId) {
        const ENDPOINT = `${baseURL}${fileUploadToS3}?pid=${projectId}`;
        let body = {
            uploadedFile: base64data,
            bucketName: 'k2adminimages',
            distination_directory:'',
            file_name:targetFile.name,
            createdBy: info.accountId,
            updatedBy: info.accountId,
            projectId: projectId,  
        }
        const config = { 
            method: createMethod,
            data: JSON.stringify(body),
            url: ENDPOINT,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        };
        const response = await instance.request(config);
        const result = response.data;
        console.log('apiRes', result);
        if (result.location) {
            setError((current) => {
                const copy = { ...current };
                delete copy[eTargetName];
                return copy;
            });
            setFiles((prev) => ({ ...prev, [eTargetName]: targetFile }));

            const responseData = {
                bucket: result.bucket,
                name: result.key,
                location: result.location,
                number: number,
            };
            let indexUploadImage = [...uploadedImage];

            if (number == 1) {
                if (indexUploadImage[0] == '') {
                    indexUploadImage.shift();
                    const newArray = [responseData].concat(indexUploadImage);
                    indexUploadImage = [...newArray];
                } else {
                    indexUploadImage.push(responseData);
                }
            }
            if (number == 2) {
                if (indexUploadImage[0] == '') {
                    indexUploadImage[1] = { ...responseData };
                } else {
                    indexUploadImage[0] = indexUploadImage[0];
                    indexUploadImage[1] = { ...responseData };
                }
            }
            if (number == 3) {
                if (indexUploadImage[0] == '' || indexUploadImage[1] == '') {
                    indexUploadImage[2] = { ...responseData };
                } else {
                    indexUploadImage[0] = indexUploadImage[0];
                    indexUploadImage[1] = indexUploadImage[1];
                    indexUploadImage[2] = { ...responseData };
                }
            }

            setUploadedImage([...indexUploadImage]);
        }
    }
    setLoading(false);
} catch (err) {
    //error
    setLoading(false);
    console.log('File upload failed',err);
    setError((prev) => ({ ...prev, [eTargetName]: true }));
}
}
reader.readAsArrayBuffer(e.target.files[0]);
            //file upload via API
           
        } catch (err) {
            setError((prev) => ({ ...prev, [eTargetName]: true }));
        }
    };

    //handling image delete
    const handleDelete = async (uploadedImageDetails, name) => {
        const imageName = uploadedImageDetails.name;
        const number = uploadedImageDetails.number;

        let inputFeildName = name + number;
        let uploadedImageArr = [...uploadedImage];
        let removedImages = [];
        const deleteImage = uploadedImageArr.map((uI, index) => {
            if (uI.name == imageName) {
                uploadedImageArr[index] = '';
                removedImages.push(imageName);
            }
        });

        if (typeof setDeleteImages === 'function') {
            setDeleteImages(removedImages);
        }

        setUploadedImage([...uploadedImageArr]);
        deleteImageFromRecoil(name);
    };

    //if error happens the error image will be cleared
    const handleCancel = (inputName) => {
        setError((current) => {
            const copy = { ...current };
            delete copy[inputName];
            return copy;
        });
    };

    return (
        <div>
            <label htmlFor="" className="text-blue-100">
                {label}
            </label>
            <div
                className={`flex ${isCenter} space-x-2 h-[126px] p-2 hover:outline-1 active:outline-1 focus:outline-1 hover:outline-offset-0 active:outline-offset-0 focus:outline-offset-0 hover:outline-[#145c8f] active:outline-[#145c8f] focus:outline-[#145c8f] outline-none align-middle border bg-blue-25 border-solid border-blue-100 w-full`}
            >

                {(fileDimensionError) ? (
                    <div className={`flex relative items-center justify-center w-full border border-dashed border-gray-300`}>
                        <ImWarning size={50} color="red" />

                        <span onClick={() => setFileDimensionError(false)} className="absolute top-2 right-2 z-10 cursor-pointer"        >
                            <CgCloseO className="backdrop-blur-md text-[24px] rounded-2xl text-gray-250" />
                        </span>
                    </div>
                ) : (
                    <>
                        {/* ---------Three inputs are mapped---------- */}
                        {numField.map((number, index) => (
                            <div className={`relative ${className}`} key={number}>
                                {uploadedImage.length > 0 && uploadedImage[index] && (
                                    <span
                                        className="absolute top-2 right-2 z-10 cursor-pointer"
                                        onClick={() => {
                                            !error[`${name}${number}`]
                                                ? handleDelete(uploadedImage[index], name)
                                                : handleCancel(`${name}${number}`);
                                        }}
                                    >
                                        <CgCloseO className="backdrop-blur-md text-[24px] rounded-2xl text-gray-250" />
                                    </span>
                                )}

                                {uploadedImage.length > 0 && uploadedImage[index]?.location ? (
                                    <img
                                        className={`h-[110px] w-[256px] border border-dashed border-gray-300 object-contain ${imageClassName}`}
                                        src={
                                            uploadedImage.length > 0 && uploadedImage[index]?.location
                                                ? uploadedImage[index]?.location
                                                : brokenImage
                                        }
                                        alt={`upload-${number}`}
                                    />
                                ) : (
                                    <div
                                        className={`flex flex-col h-[110px] w-[256px] border justify-center border-dashed border-gray-300 text-center bg-white relative ${imageClassName}`}
                                    >
                                        <h4 className="text-gray-200 font-bold">ファイルをドロップ</h4>
                                        <h4 className="text-gray-200 font-bold">または</h4>
                                        <label
                                            htmlFor={`${name}${number}`}
                                            className="cursor-pointer underline text-[12px] font-bold text-blue-200"
                                        >
                                            ファイルを選択
                                            <input
                                                type="file"
                                                name={`${name}${number}`}
                                                id={`${name}${number}`}
                                                className="absolute top-0 left-0 opacity-0 w-full h-full block cursor-pointer"
                                                onChange={(e) => {
                                                    handleUpload(e, number);
                                                }}
                                                accept={acceptFileType}
                                            />
                                        </label>
                                    </div>
                                )}
                            </div>
                        ))}
                    </>
                )}


                {/*file upload error messages area*/}
                {!uploadErrorInvisible && (
                    <div
                        className={`h-full w-full flex items-end justify-end ${extensionError || fileSizeError
                            }} ? "visible" : "invisible"`}
                    >
                        <p className="text-orange-300 text-right">
                            {extensionError && `${errorMessages.W_FILE_01}`}
                            {fileSizeError && `${errorMessages.W_FILE_02('1MB')}`}
                        </p>
                    </div>
                )}
            </div>
            {fileDimensionError && <ErrorMessage className="!mt-0">画像サイズが異なるためアップロードに失敗しました</ErrorMessage>}
        </div>
    );
};

export default FileUploadInput;
