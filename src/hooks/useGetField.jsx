import { useEffect, useState } from 'react';
import { baseURL, listField, listMethod } from '../restapi/queries';
import { instance } from '../services/axios.js';

const useGetField = (fieldId) => {
    const [field, setField] = useState({});
    const [fieldError, setFieldError] = useState(null);
    const [fieldLoading, setFieldLoading] = useState(true);
    useEffect(() => {
        const fetchField = async () => {
            try {
                const projectId = sessionStorage.getItem('currentProjectId');
                const ENDPOINT = `${baseURL}${listField}${fieldId}?pid=${projectId}`;
                const config = { method: listMethod, url: ENDPOINT };
                const response = await instance.request(config);
                response && setField(response.data.records);
            } catch (error) {
                setFieldError(error.message);
            } finally {
                setFieldLoading(false);
            }
        };
        fetchField();
    }, [fieldId]);

    return { field, fieldLoading, fieldError };
};
export default useGetField;
