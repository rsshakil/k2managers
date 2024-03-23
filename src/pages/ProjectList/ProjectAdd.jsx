import React from 'react';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import ProjectForm from '../../components/Form/ProjectForm';

const initialValues = {
    projectName: '',
    projectCode: '',
    projectStatus: true,
    projectCsvCharacterCode: 0,
    createdAt: '',
    memo: '',
};

const ProjectAdd = () => {
    return (
        <>
            <BreadCrumbs title="プロジェクト > 新規作成" className="mt-4 text-blue-50 font-bold px-4" />
            <ProjectForm initialValues={initialValues} formType="add" />
        </>
    );
};

export default ProjectAdd;
