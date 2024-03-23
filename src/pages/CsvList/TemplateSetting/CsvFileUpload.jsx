import React, { useEffect, useRef, useState } from 'react';

import FileUploader from "devextreme-react/file-uploader";
import {uploadFile} from "react-s3";
import {AiOutlinePlus} from "react-icons/ai";
import {baseURL, csvImportTemplateDownload, listCsvImportUpload, listMethod,createMethod,
    updateMethod} from '../../../restapi/queries';
import { useSelector } from 'react-redux';

import Loading from '../../../components/Loading/Loader';
import { instance } from '../../../services/axios.js';
const Encoding = require('encoding-japanese');

const CsvFileUpload = ({bucketName, dirName, csvTemplate, maxFileSize=null, selectButtonText, fileUploadOutputProps}) => {
    //S3 CONFIG FILES
    const [loading, setLoading] = useState(false)
    const projectId = sessionStorage.getItem('currentProjectId');
    const { info } = useSelector((state) => state.auth);
    const projectCsvCharacterCode = sessionStorage.getItem('projectCsvCharacterCode');
    const config = {
        bucketName,
        region: process.env.REACT_APP_AWS_REGION,
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
        dirName: dirName ? dirName : null,
    }
    //Buffer is required to upload the file to s3 bucket
    window.Buffer = window.Buffer || require("buffer").Buffer;

    let fileName = 'import_template';
    if (csvTemplate.length > 0) {
        fileName = `${csvTemplate[0].projectId}_${csvTemplate[0].csvImportTemplateName}_import_template`;
    }

    const handleUpload = (e) => {
        const file = e.target.files[0];
        fileUploadOutputProps({
            csvImportUploadFileName: file.name
        });
        e.target.value = null;
        // console.log(file, 'file')

        //getting the file which is selected
        let targetFile = file;
        const tName = targetFile.name;
        const extension = tName.substring(tName.lastIndexOf(".") + 1, tName.length);

        // changes file name
        let blob = targetFile.slice(0, targetFile.size, 'text/csv');
        fileName = fileName;
        targetFile = new File([blob], `${fileName}.${extension}`, { type: 'text/csv' });

        // Make validation
        // CSV file 100 items validation
        const reader = new FileReader();
        reader.onload = async function (e) {
            const text = e.target.result;
            
            let array = Buffer.from(new Int8Array(text));
            console.log(array,'array');
            let detectedEncoding = Encoding.detect(array);
            console.log('sourceEncoding',detectedEncoding);
            let convertedBuffer = Encoding.convert(array, {
                to: 'UNICODE',
                from: detectedEncoding
            });
            let decodedString = Encoding.codeToString(convertedBuffer);
            console.log('decodedString',decodedString);



            const lines = decodedString.trim().split('\n');
            if (lines.length > 101) {
                console.log("アイテム数が上限（100件）を超えています");
                fileUploadOutputProps({
                    errorMessage: 'アイテム数が上限（100件）を超えています',
                    csvImportUploadFileName: file.name
                });
            }
            else {
                // // send request to aws s3 bucket
                try {
                    setLoading(true);
                    // let buff = Buffer.from(text);
                    let base64data = array.toString('base64');

                    if (projectId) {
                        const ENDPOINT = `${baseURL}${listCsvImportUpload}?pid=${projectId}`;
                        let body = {
                            csvdata: base64data,
                            csvImportFileName: encodeURI(file.name),
                            csvImportLength: lines?.length-1,
                            createdBy: info.accountId,
                            updatedBy: info.accountId,
                            projectId: projectId,
                            projectCsvCharacterCode: projectCsvCharacterCode,
                            csvImportTemplateId: sessionStorage.getItem('csvImportTemplateId_' + projectId),
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
                        if(response?.data?.csvImportId){
                            sessionStorage.setItem('csvImportId_'+projectId,response?.data?.csvImportId);
                            fileUploadOutputProps({
                                csvImportPreviewStatus: true,
                                csvImportUploadFileName: file.name
                            });
                        }
                        console.log('apiRes',response);
                    }
                    setLoading(false);
                } catch (err) {
                    //error
                    setLoading(false);
                    console.log(err)
                    fileUploadOutputProps({
                        errorMessage: 'File upload failed',
                        csvImportUploadFileName: ""
                    });
                }
            }
        }
        reader.readAsArrayBuffer(targetFile);
    }

    return (
        <>
            {loading && <Loading />}
        
            <div className="relative flex justify-center align-middle hover:bg-blue-400 items-center bg-blue-25 !cursor-pointer text-blue-100 border border-all h-[32px]">
                <input
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={(e) => handleUpload(e)}
                    accept=".csv"
                />
                <AiOutlinePlus
                    className="h-[22px] w-[22px] z-10 mr-[-32px]"
                />
                <button
                    type="button"
                    className="w-full cursor-pointer"
                >
                    {selectButtonText}
                </button>
            </div>
        </>
    );
}
export default CsvFileUpload;