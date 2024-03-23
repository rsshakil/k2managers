import { useEffect } from 'react'
import { useState } from 'react'

const useGetRoleList = () => {
    const [roleList, setRoleList] = useState({})
    const [roleError, setRoleError] = useState(null)
    const [roleLoading, setRoleLoading] = useState(false)
    useEffect(() => {
        const fetchRoleList = async () => {
            try {
                setRoleLoading(true)
                // FIXME: change this api integration
                const response = false
                if (response) {
                    setRoleLoading(false)
                    setRoleList(response?.data?.listRoles)
                }
            } catch (error) {
                setRoleLoading(false)
                setRoleError(error.message)
            }
        }
        fetchRoleList()
    }, [])
    return {
        roleList,
        roleError,
        roleLoading,
    }
}
export default useGetRoleList
