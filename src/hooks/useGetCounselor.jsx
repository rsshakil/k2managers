import { useEffect, useState } from 'react';
import { baseURL, listCounselor, listMethod } from '../restapi/queries';
import { instance } from '../services/axios.js';

const useGetCounselor = (counselorId) => {
    const [counselor, setCounselor] = useState({});
    const [counselorError, setCounselorError] = useState(null);
    const [counselorLoading, setCounselorLoading] = useState(true);
    useEffect(() => {
        const fetchCounselor = async () => {
            try {
                const projectId = sessionStorage.getItem('currentProjectId');
                const ENDPOINT = `${baseURL}${listCounselor}${counselorId}?pid=${projectId}`;
                const config = { method: listMethod, url: ENDPOINT };
                const response = await instance.request(config);
                response && setCounselor(response.data.records);
            } catch (error) {
                setCounselorError(error.message);
            } finally {
                setCounselorLoading(false);
            }
        };
        fetchCounselor();
    }, [counselorId]);
    return { counselor, counselorLoading, counselorError };
};

export default useGetCounselor;
