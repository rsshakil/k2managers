import { useEffect, useState } from 'react';
import { baseURL, listMethod, listSchedulerSlot } from '../restapi/queries';
import { instance } from '../services/axios.js';

const useGetEventSlot = (mappingId) => {
    const [eventSlot, setEventSlot] = useState({});
    const [eventBus, setEventBus] = useState([]);
    const [error, setError] = useState(null);
    const [load, setLoad] = useState(true);
    useEffect(() => {
        const fetchEventSlot = async () => {
            try {
                const ENDPOINT = `${baseURL}${listSchedulerSlot}${mappingId}`;
                const config = { method: listMethod, url: ENDPOINT };
                const response = await instance.request(config);
                if (response) {
                    setEventSlot(response.data.records);
                    setEventBus(response.data?.eventBusId);
                }
console.log("slot data", response);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoad(false);
            }
        };
        fetchEventSlot();
    }, []);
    
    return { eventSlot, eventBus, load, error };
};

export default useGetEventSlot;
