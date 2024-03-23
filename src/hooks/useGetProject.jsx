import { useEffect, useState } from 'react';
import { baseURL, listProject, listMethod } from '../restapi/queries';
import { instance } from '../services/axios.js';

const useGetProject = (projectId) => {
    const [project, setProject] = useState({});
    const [projectError, setProjectError] = useState(null);
    const [projectLoading, setProjectLoading] = useState(false);
    useEffect(() => {
        const fetchProject = async () => {
            try {
                setProjectLoading(true);
                const ENDPOINT = `${baseURL}${listProject}${projectId}`;
                const config = { method: listMethod, url: ENDPOINT };
                const response = await instance.request(config);
                response && setProject(response.data.records);
            } catch (error) {
                setProjectError(error.message);
            } finally {
                setProjectLoading(false);
            }
        };
        fetchProject();
    }, [projectId]);

    return { project, projectError, projectLoading };
};
export default useGetProject;
