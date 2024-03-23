import { useEffect, useState } from 'react';
import { baseURL, listApp, listMethod } from '../restapi/queries';
import { instance } from '../services/axios.js';

const useGetApp = (appId) => {
    const [app, setApp] = useState({});
    const [appError, setAppError] = useState(null);
    const [appLoading, setAppLoading] = useState(true);

    useEffect(() => {
        const fetchApp = async () => {
            try {
                const projectId = sessionStorage.getItem('currentProjectId');
                const ENDPOINT = `${baseURL}${listApp}${appId}?pid=${projectId}`;
                const config = { method: listMethod, url: ENDPOINT };
                const response = await instance.request(config);
                if (response) setApp(response.data.records);
            } catch (error) {
                setAppError(error.message);
            } finally {
                setAppLoading(false);
            }
        };
        fetchApp();
    }, [appId]);

    return { app, appLoading, appError };
};

export default useGetApp;
