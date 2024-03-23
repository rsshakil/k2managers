import { useEffect, useState } from 'react';
import { baseURL, listInstitute, listMethod } from '../restapi/queries';
import { instance } from '../services/axios.js';

const useGetInstitute = (instituteId) => {
    const [institute, setInstitute] = useState({});
    const [instituteError, setInstituteError] = useState(null);
    const [instituteLoading, setInstituteLoading] = useState(true);
    useEffect(() => {
        const fetchInstitute = async () => {
            try {
                const projectId = sessionStorage.getItem('currentProjectId');
                const ENDPOINT = `${baseURL}${listInstitute}${instituteId}?pid=${projectId}`;
                const config = { method: listMethod, url: ENDPOINT };
                const response = await instance.request(config);
                response && setInstitute(response.data.records);
            } catch (error) {
                setInstituteError(error.message);
            } finally {
                setInstituteLoading(false);
            }
        };
        fetchInstitute();
    }, [instituteId]);

    return { institute, instituteLoading, instituteError };
};

export default useGetInstitute;
