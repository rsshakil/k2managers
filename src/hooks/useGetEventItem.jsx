import { useEffect, useState } from 'react';
import { baseURL, listEventItem, listMethod } from '../restapi/queries';
import { instance } from '../services/axios.js';

const useGetEventItem = (eventInstituteId) => {
    const [eventItem, setEventItem] = useState({});
    const [eventItemError, setEventItemError] = useState(null);
    const [eventItemLoading, setEventItemLoading] = useState(true);
    useEffect(() => {
        const fetchEventItem = async () => {
            try {
                const projectId = sessionStorage.getItem('currentProjectId');
                const ENDPOINT = `${baseURL}${listEventItem}${eventInstituteId}`;
                const config = { method: listMethod, url: ENDPOINT };
                const response = await instance.request(config);

                setEventItem(response.data.records.records[0]);
            } catch (error) {
                setEventItemError(error.message);
            } finally {
                setEventItemLoading(false);
            }
        };
        fetchEventItem();
    }, []);
    return {
        eventItem,
        eventItemLoading,
        eventItemError,
    };
};

export default useGetEventItem;
