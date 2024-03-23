import { useEffect, useState } from 'react';
import { baseURL, listEvent, listMethod } from '../restapi/queries';
import { instance } from '../services/axios.js';

const useGetEvent = (eventId) => {
    const [event, setEvent] = useState({});
    const [eventError, setEventError] = useState(null);
    const [eventLoading, setEventLoading] = useState(true);
    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const projectId = sessionStorage.getItem('currentProjectId');
                const ENDPOINT = `${baseURL}${listEvent}${eventId}?pid=${projectId}`;
                const config = { method: listMethod, url: ENDPOINT };
                const response = await instance.request(config);
                response && setEvent(response.data.records);
            } catch (error) {
                setEventError(error.message);
            } finally {
                setEventLoading(false);
            }
        };
        fetchEvent();
    }, [eventId]);

    return { event, eventLoading, eventError };
};

export default useGetEvent;
