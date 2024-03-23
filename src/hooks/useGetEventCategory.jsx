import { useEffect, useState } from 'react';
import { baseURL, listEventCategory, listMethod } from '../restapi/queries';
import { instance } from '../services/axios.js';

const useGetEventCategory = (eventId, eventCategoryId) => {
    const [eventCategory, setEventCategory] = useState({});
    const [eventCategoryError, setEventCategoryError] = useState(null);
    const [eventCategoryLoading, setEventCategoryLoading] = useState(true);
    useEffect(() => {
        const fetchEventCategory = async () => {
            try {
                const projectId = sessionStorage.getItem('currentProjectId');
                let ENDPOINT = `${baseURL}${listEventCategory}${eventCategoryId}?eid=${eventId}&pid=${projectId}`;
                let config = { method: listMethod, url: ENDPOINT };
                let response = await instance.request(config);
                if (response.data.error) throw new Error(response.data.error);
                setEventCategory(response.data.records);
            } catch (error) {
                setEventCategoryError(error.message);
            } finally {
                setEventCategoryLoading(false);
            }
        };
        fetchEventCategory();
    }, [eventId, eventCategoryId]);

    return { eventCategory, eventCategoryError, eventCategoryLoading };
};

export default useGetEventCategory;
