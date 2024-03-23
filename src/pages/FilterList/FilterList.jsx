import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import OutlineButtonLinkContainer from "../../components/Button/OutlineButtonLinkContainer";
import Footer from "../../components/Footer/Footer";
import Loading from "../../components/Loading/Loader";
import PaginationSearchParams from "../../components/Pagination/PaginationSearchParams";
import AddButton from "../../components/Table/FooterSection/AddButton";
import TableControls from "../../components/Table/TableControls";
import UseTable from "../../components/Table/UseTable";
import Container from "../../components/Wrapper/Container";
import { SessionStorageOnReload } from "../../helper/browserSessionStorage/SessionStorageOnReload";
import { listFilter } from "../../restapi/queries";
import { ItemData } from "../../utilities/projectBtnItemData";
import FilterListTr from "./FilterListTr";
import FilterSearch from "./FilterSearch";
import {
    baseURL,
    listProjectData,
    listApp,
    listEvent,
    listMethod,
    listField,
} from '../../../src/restapi/queries';
import { instance } from '../../services/axios';

const headerCells = [
    { label: "フィルター名", width: "25rem" },
    { label: "フィルター管理名", width: "30rem" },
    { label: "フィルター説明", minWidth: "12rem" },
    { label: "変更日時", width: "10.375rem" },
    { label: "作成日時", width: "10.375rem" },
];

const FilterList = () => { 
    const processing = useRef(false);
    const navigate = useNavigate()
    const { pathname } = useLocation();
    const [loading, setLoading] = useState(false); // make -- true -- after finish development
    const [isOverFlow, setIsOverFlow] = useState(false);
    const [filterList, setFilterList] = useState([]);
    const [numberOfRecords, setNumberOfRecords] = useState(0);
    const { TblContainer, TblHead } = UseTable(headerCells);
   const [pageNumber, setPageNumber] = useState(+sessionStorage.getItem(`pagination_pageNo`) || 0);
 
    const { getInitialState } = SessionStorageOnReload();
    const { searchParamsValues } = getInitialState(pathname)
    const [searchParams, setSearchParams] = useState(searchParamsValues ? searchParamsValues : "")
    // プロジェクトに入ったときにapp_listが表示されるとは限らない
    useEffect(() => {
        getProjectData();
    }, [sessionStorage.getItem('currentProjectId')]);
    async function getProjectData() {
        if (processing.current) return;
        processing.current = true;
        try {
            const projectId = sessionStorage.getItem('currentProjectId');
            if (projectId) {
                const ENDPOINT = `${baseURL}${listProjectData}${projectId}`;
                const config = { method: listMethod, url: ENDPOINT };
                const response = await instance.request(config);
                sessionStorage.setItem(
                    `customer_view_category_filter_` + projectId,
                    JSON.stringify(response?.data?.category)
                );
                sessionStorage.setItem(
                    `customer_view_institute_filter_` + projectId,
                    JSON.stringify(response?.data?.institute)
                );
                sessionStorage.setItem(
                    `customer_view_item_filter_` + projectId,
                    JSON.stringify(response?.data?.item)
                );
                sessionStorage.setItem(
                    `customer_view_counselor_filter_` + projectId,
                    JSON.stringify(response?.data?.counselor)
                );
                sessionStorage.setItem(
                    `customer_view_busRoute_filter_` + projectId,
                    JSON.stringify(response?.data?.busRoute)
                );
            }
        } catch (err) {
            console.log('Field err', err);
        } finally {
            processing.current = false;
        }
    }

    return (
        <div className={`${isOverFlow && "overflow-hidden"} `}>
            {loading && <Loading />}
            <Container> 
                <OutlineButtonLinkContainer ItemData={ItemData} />
                <div className="px-4">
                    
                    <TableControls.UpperSection>
                        <TableControls.NumberOfRecords
                            recordsLabel="フィルター"
                            numberOfRecords={numberOfRecords}
                        />
                        <div className="flex">
                            <FilterSearch
                                setSearchParams={setSearchParams}
                                setPageNumber={setPageNumber}
                                numberOfRecords={numberOfRecords}
                            />
                        </div>
                    </TableControls.UpperSection>
                    {/* table section */}
                    <div className="table-wrapper overflow-x-auto">
                        <TblContainer className="!table-auto min-w-[1400px]">
                            <TblHead />
                            <tbody className="h-[calc(100vh-206px)] tbody-vertical-scroll">
                                {filterList.map((filter, index) => (
                                    <FilterListTr key={index} info={{filter}}/>
                                ))}
                            </tbody>
                        </TblContainer>
                    </div>
                    {/* Table Footer Section  */}
                    <Footer>
                        <PaginationSearchParams
                            itemsPerPage={300}
                            endPoint={listFilter}
                            records={filterList}
                            setRecords={setFilterList}
                            setLoading={setLoading}
                            setNumberOfRecords={setNumberOfRecords}
                            subQueryString={searchParams ? searchParams : searchParamsValues}
                            pageNumber={pageNumber}
                            setPageNumber={setPageNumber}
                        />
                        <div className="flex flex-col items-end">
                                <AddButton text="フィルター 追加" onClick={()=>navigate("/filter_add")}/>
                        </div>
                    </Footer>
                </div>
            </Container>
        </div>
    );
};

export default FilterList;
