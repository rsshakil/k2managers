import { useEffect, useState } from 'react';
import { instance } from '../services/axios';

const useGetListWithPID = ({ info }) => {
    const { projectId, baseURL, listURL, listMethod, shouldGetRecord, fieldType, fieldImportFlag = '',searchFiledFlag=0 } = info;
    const [records, setRecords] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [fetchLoading, setFetchLoading] = useState(true);

    const ENDPOINT = fieldType
        ? `${baseURL}${listURL}?pid=${projectId}&fieldType=${fieldType}&fieldImportFlag=${fieldImportFlag}&searchFiledFlag=${searchFiledFlag}`
        : `${baseURL}${listURL}?pid=${projectId}`;
    useEffect(() => {
        const fetchListRecordsWithPID = async () => {
            if (shouldGetRecord) {
                try {
                    const config = { method: listMethod, url: ENDPOINT };
                    const response = await instance.request(config);
                    response && setRecords(response.data.records);
                } catch (error) {
                    setFetchError(error.message);
                } finally {
                    setFetchLoading(false);
                }
            }
        };
        fetchListRecordsWithPID();
    }, []);

    return { records, fetchLoading, fetchError };
};

export default useGetListWithPID;
