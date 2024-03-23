import { useState } from 'react';

const useFileUpload = () => {
    const [files, setFiles] = useState({});
    const [images, setImages] = useState({});
    const [error, setError] = useState(false);
    return [files, setFiles, images, setImages, error, setError];
};

export default useFileUpload;
