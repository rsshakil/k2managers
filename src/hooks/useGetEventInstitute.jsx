import { useEffect, useState } from 'react';
import { baseURL, listEventInstitute, listMethod } from '../restapi/queries';
import { instance } from '../services/axios.js';

const useGetEventInstitute = (eventId, eventInstituteId) => {
    const [eventInstitute, setEventInstitute] = useState({});
    const [eventInstituteError, setEventInstituteError] = useState(null);
    const [eventInstituteLoading, setEventInstituteLoading] = useState(false);
    useEffect(() => {
        const fetchEventInstitute = async () => {
            try {
                setEventInstituteLoading(true);
                const projectId = sessionStorage.getItem('currentProjectId');
                // get event list
                let ENDPOINT = `${baseURL}${listEventInstitute}${eventInstituteId}?eid=${eventId}&pid=${projectId}`;
                let config = {
                    method: listMethod,
                    url: ENDPOINT,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                };
                let response = await instance.request(config);
                let result = await response.data;

                if (result.error) throw new Error(result.error);
                if (result.records !== undefined) {
                    result.records.initFlag = false;

                    // eventInstituteSlotStyleを分解する
                    result.records.eventInstituteSlotStyleRangeTime =
                        result.records.eventInstituteSlotStyle?.eventInstituteSlotStyleRangeTime;
                    result.records.eventInstituteSlotStyleTimePattern =
                        result.records.eventInstituteSlotStyle?.eventInstituteSlotStyleTimePattern;
                    result.records.eventInstituteItemTypeName =
                        result.records.eventInstituteItemType == 0 ? 'アイテム' : 'カウンセラー';
                    result.records.eventInstituteSlotTypeName =
                        result.records.eventInstituteSlotType == 0
                            ? '繰り返しパターン'
                            : result.records.eventInstituteSlotType == 1
                            ? '１枠ずつ入力'
                            : 'バス検診';
                    result.records.eventInstituteSlotStyleTimePatternName =
                        result.records.eventInstituteSlotStyleTimePattern == 10
                            ? '10分'
                            : result.records.eventInstituteSlotStyleTimePattern == 15
                            ? '15分'
                            : result.records.eventInstituteSlotStyleTimePattern == 20
                            ? '20分'
                            : result.records.eventInstituteSlotStyleTimePattern == 30
                            ? '30分'
                            : '60分';

                    setEventInstitute(result.records);
                }
                setEventInstituteLoading(false);
            } catch (error) {
                setEventInstituteLoading(false);
            }
        };
        fetchEventInstitute();
    }, [eventId, eventInstituteId]);

    return { eventInstitute, eventInstituteError, eventInstituteLoading };
};

export default useGetEventInstitute;
