import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Loading from '../../components/Loading/Loader';
import PaginationSearchParams from '../../components/Pagination/PaginationSearchParams';
import AddButton from '../../components/Table/FooterSection/AddButton';
import TableControls from '../../components/Table/TableControls';
import UseTable from '../../components/Table/UseTable';
import Container from '../../components/Wrapper/Container';
import { SessionStorageOnReload } from '../../helper/browserSessionStorage/SessionStorageOnReload';
import { listProject } from '../../restapi/queries';
import ProjectListTr from './ProjectListTr';
import ProjectSearch from './ProjectSearch';

// import { projectListData } from "./projectListData";
const headerCells = [
    { label: 'プロジェクト名', minWidth: '36rem' }, // project name
    { label: 'プロジェクトコード', width: '18rem' }, //project id
    { label: '状態', width: '6rem' }, //situation
    { label: '変更日時', width: '10.5rem' }, // updateDate
    { label: '作成日時', width: '10.5rem' }, //createDate
];

const ProjectList = () => {
    const { TblContainer, TblHead } = UseTable(headerCells);
    const recordsLabel = 'プロジェクト';
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [projectList, setProjectList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [numberOfRecords, setNumberOfRecords] = useState(0);
    const [pageNumber, setPageNumber] = useState(0);
    const { getInitialState, fetchSessionStorageData } = SessionStorageOnReload();
    const { setSelectedValue } = SessionStorageOnReload(); // Manage reload option flag

    const retainedProjectList = JSON.parse(sessionStorage.getItem(`retained_project_list`));

    const initializeValue = {
        projectName: retainedProjectList?.projectName,
    };
    setSelectedValue(initializeValue);
    const { searchParamsValues } = getInitialState(pathname);
    const [searchDBParams, setSearchDBParams] = useState(searchParamsValues ? searchParamsValues : '');

    const handleProjectEdit = (projectId) => {
        navigate(`/project_edit/${projectId}`);
    };

    return (
        <div>
            {loading && <Loading />}
            <Container>
                <div className="px-4">
                    {/* Filter section  */}
                    <TableControls.UpperSection>
                        {/* TODO:  numberOfRecords also update when filter use*/}
                        <TableControls.NumberOfRecords recordsLabel={recordsLabel} numberOfRecords={numberOfRecords} />
                        <div className="flex">
                            <ProjectSearch setSearchParams={setSearchDBParams} setPageNumber={setPageNumber}/>
                        </div>
                    </TableControls.UpperSection>

                    {/* Table Section  */}
                    <div className="table-wrapper">
                        <TblContainer>
                            <TblHead />
                            <tbody className="tbody-vertical-scroll">
                                {projectList &&
                                    projectList.map((project, index) => (
                                        <ProjectListTr key={index} info={{ project, handleProjectEdit }} />
                                    ))}
                            </tbody>
                        </TblContainer>
                    </div>

                    {/* Pagination Section  */}
                    <Footer>
                        <PaginationSearchParams
                            itemsPerPage={300}
                            endPoint={listProject}
                            records={projectList}
                            setRecords={setProjectList}
                            setLoading={setLoading}
                            subQueryString={searchDBParams}
                            setNumberOfRecords={setNumberOfRecords}
                            pageNumber={pageNumber}
                            setPageNumber={setPageNumber}
                        />
                        <div className="flex flex-col items-end">
                            <AddButton text="プロジェクト追加" onClick={() => navigate('/project_add')} />
                        </div>
                    </Footer>
                </div>
            </Container>
        </div>
    );
};

export default ProjectList;
