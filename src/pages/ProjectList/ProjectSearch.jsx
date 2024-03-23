import React from 'react';
import TableControls from '../../components/Table/TableControls';
import { SessionStorageOnReload } from '../../helper/browserSessionStorage/SessionStorageOnReload';
import { FilterComMethods } from '../../helper/functions/FilterComMethods';

export default function ProjectSearch({ setSearchParams,setPageNumber }) {
    const retainedProjectList = JSON.parse(sessionStorage.getItem(`retained_project_list`));
    const { setSelectedValue } = SessionStorageOnReload(); // Manage reload option flag

    const initializeValue = { projectName: retainedProjectList?.projectName };
    setSelectedValue(initializeValue);
    const { handleChange2, handleChange, values } = FilterComMethods(initializeValue);

    return (
        <>
            <TableControls.Search
                placeholder="プロジェクト名"
                name="projectName"
                value={values.projectName}
                onChange={handleChange2}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleChange(e);
                        const { name, value } = e.target;
                        const obj = { ...values, [name]: value };
                        let createdSearchParams = new URLSearchParams(obj);
                        createdSearchParams = createdSearchParams.toString();
                        setSearchParams(createdSearchParams);
                        setPageNumber(0);
                    }
                }}
            />
        </>
    );
}
