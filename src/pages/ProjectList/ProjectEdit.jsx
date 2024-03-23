import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import ProjectForm from '../../components/Form/ProjectForm';
import useGetProject from '../../hooks/useGetProject';
import { UnixTsToString } from '../../lib/unixTsToString';

const ProjectEdit = () => {
    const { projectId } = useParams();
    const { project, projectLoading, projectError } = useGetProject(projectId); 
    const [isOverFlow, setIsOverFlow] = useState(false);
    return (
        <div className={`${isOverFlow && 'overflow-hidden'} `}>
            <BreadCrumbs title="プロジェクト > 編集" className="mt-4 text-blue-50 font-bold px-4" />
            <ProjectForm
                initialValues={{
                    ...project,
                    createdAt: project.createdAt ? UnixTsToString(project.createdAt) : '',
                    projectStatus: project.projectStatus === 1 ? true : false,
                }}
                load={projectLoading}
                error={projectError}
                formType="edit"
                setIsOverFlow={setIsOverFlow}
            />
        </div>
    );
};

export default ProjectEdit;
