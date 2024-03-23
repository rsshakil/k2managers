import React from 'react';
import FileUploadInput from '../../components/FileUploadInput/FileUploadInput';
import Page1440Body from '../../components/Page1440/Page1440Body';
import useFileUpload from '../../hooks/useFileUpload';
const FileUpload = () => {
    const [files, setFiles, images, setImages, error, setError] = useFileUpload();
    return (
        <Page1440Body className="page1440-body3 pt-8 px-10">
            <FileUploadInput
                files={files}
                setFiles={setFiles}
                images={images}
                setImages={setImages}
                error={error}
                setError={setError}
                label="カウンセラー画像（3枚まで）"
            />
        </Page1440Body>
    );
};

export default FileUpload;
