import { useEffect, useState } from 'react';
import { baseURL, listEmailTemplate, listSMSTemplate, listMethod } from '../restapi/queries';
import { instance } from '../services/axios.js';

const useGetEmailTemplate = (eventId, eventCategoryId, typeFlag = 1, selectedList = 'emailList') => {
    const [templateValues, setTemplateValues] = useState({});
    const [fieldValues, setFieldValues] = useState({});
    const [templateValuesError, setTemplateValuesError] = useState(null);
    const [templateValuesLoading, setTemplateValuesLoading] = useState(true);
    const selectedListENDPoint = selectedList === 'emailList' ? listEmailTemplate : listSMSTemplate;

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const projectId = sessionStorage.getItem('currentProjectId');
                const ENDPOINT = `${baseURL}${selectedListENDPoint}${eventId}?eventCategoryId=${eventCategoryId}&pid=${projectId}&typeFlag=${typeFlag}`;
                const config = { method: listMethod, url: ENDPOINT };
                const response = await instance.request(config);
                response && setFieldValues(response.data.fields);
                response && setTemplateValues(response.data.template);
            } catch (error) {
                setTemplateValuesError(error.message);
            } finally {
                setTemplateValuesLoading(false);
            }
        };
        fetchEvent();
    }, [eventId]);
    return { templateValues, fieldValues, templateValuesError, templateValuesLoading };
};
export default useGetEmailTemplate;
