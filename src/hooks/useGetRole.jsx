import { useEffect, useState } from 'react';
import { baseURL, getRole, listMethod } from '../restapi/queries';
import { instance } from '../services/axios.js';

const useGetRole = (roleId) => {
    const [role, setRole] = useState({});
    const [roleError, setRoleError] = useState(null);
    const [roleLoading, setRoleLoading] = useState(true);
    useEffect(() => {
        const fetchRole = async () => {
            try {
                const ENDPOINT = `${baseURL}${getRole}${roleId}`;
                const config = { method: listMethod, url: ENDPOINT };
                const response = await instance.request(config);
                response && setRole(response.data.records);
            } catch (error) {
                setRoleError(error.message);
            } finally {
                setRoleLoading(false);
            }
        };
        fetchRole();
    }, [roleId]);

    return { role, roleError, roleLoading };
};
export default useGetRole;
