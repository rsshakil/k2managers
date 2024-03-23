import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import OutlineButtonLinkContainer from "../../../components/Button/OutlineButtonLinkContainer";
import Footer from "../../../components/Footer/Footer";
import Loading from "../../../components/Loading/Loader";
import Pagination from "../../../components/Pagination/Pagination";
import BusStopSearch from "./BusStopSearch";
import PaginationSearchParams from "../../../components/Pagination/PaginationSearchParams";
import AddButton from "../../../components/Table/FooterSection/AddButton";
import TableControls from "../../../components/Table/TableControls";
import UseTable from "../../../components/Table/UseTable";
import Container from "../../../components/Wrapper/Container";
import { ItemData } from "../../../utilities/projectBtnItemData";
import { listBusStop } from "../../../restapi/queries";
import BreadCrumbs from "../../../components/BreadCrumbs/BreadCrumbs";
import { SessionStorageOnReload } from "../../../helper/browserSessionStorage/SessionStorageOnReload";
import BusStopListTr from "./BusStopListTr";

const headerCells = [
    { label: "停留所名", minWidth: "12.25rem" },
    { label: "停留所管理名", minWidth: "12.25rem" },
    { label: "停留所住所", minWidth: "21rem" },
    { label: "変更日時", width: "10.375rem" },
    { label: "作成日時", width: "10.375rem" },
];


const BusStopList = () => {
    const recordsLabel = "バス停一覧";
    const { pathname } = useLocation();
    const [loading, setLoading] = useState(false); // make -- true -- after finish development
    const [busStopList, setBusStopList] = useState([]);
    const [isOverFlow, setIsOverFlow] = useState(false);
    const [numberOfRecords, setNumberOfRecords] = useState(0);
    const { TblContainer, TblHead } = UseTable(headerCells);
    const navigate = useNavigate()
    const [pageNumber, setPageNumber] = useState(+sessionStorage.getItem(`pagination_pageNo`) || 0);
    
    const { getInitialState, fetchSessionStorageData } = SessionStorageOnReload();
    const { searchParamsValues } = getInitialState(pathname)
    const [searchParams, setSearchParams] = useState(searchParamsValues ? searchParamsValues : "")
   // const { setSelectedValue } = SessionStorageOnReload() // Manage reload option flag
    // params set
    // send project id as a params
    /*
    const projectId = sessionStorage.getItem("currentProjectId");
    const initializeValue = {
        pid: projectId,
    }
    setSelectedValue(initializeValue);

    useEffect(() => {
        const paramsStr = new URLSearchParams(initializeValue)
        console.log("USE EFFECT RUN", initializeValue);
        console.log("params", new URLSearchParams(initializeValue));
        setParams(new URLSearchParams(initializeValue))
        console.log("paramsStr", paramsStr);
    }, [])
*/


    return (
        <div className={`${isOverFlow && "overflow-hidden"} `}>
            {loading && <Loading />}
            <Container>
                <OutlineButtonLinkContainer ItemData={ItemData} />
                <div className="px-4">
                    <TableControls.UpperSection>
                        <div className="flex flex-start">
                            <BreadCrumbs title="バス路線" className="underline text-blue-50 cursor-pointer font-bold pl-2 pt-px pb-0.5"
                                onClick={() => navigate("/bus_route_list")} />
                            <span className="text-blue-50">{"> "}</span>
                            <TableControls.NumberOfRecords
                                recordsLabel={recordsLabel}
                                numberOfRecords={numberOfRecords}
                            />
                        </div>
                        <div className="flex justify-between">
                        <BusStopSearch
                                setSearchParams={setSearchParams}
                                numberOfRecords={numberOfRecords}
                                setPageNumber={setPageNumber}
                            />
                           
                        </div>
                    </TableControls.UpperSection>
                    {/* table section */}
                    <div className="table-wrapper">
                        <TblContainer className="!table-auto min-w-[1400px]">
                            <TblHead />
                            <tbody className="h-[calc(100vh-206px)] tbody-vertical-scroll">
                                {busStopList.map((bus, index) => (
                                    <BusStopListTr key={index} bus={bus}/>
                                ))}
                            </tbody>
                        </TblContainer>
                    </div>
                    {/* Table Footer Section  */}
                    <Footer>
                        <PaginationSearchParams
                            itemsPerPage={300}
                            endPoint={listBusStop}
                            records={busStopList}
                            setRecords={setBusStopList}
                            setLoading={setLoading}
                            subQueryString={searchParams ? searchParams : searchParamsValues}
                            setNumberOfRecords={setNumberOfRecords}
                            pageNumber={pageNumber}
                            setPageNumber={setPageNumber}
                        />
                        <div className="flex flex-col items-end">
                            <AddButton text="バス停追加" onClick={() => navigate("/bus_stop_add")} />
                        </div>
                    </Footer>
                </div>
            </Container>
        </div>
    );
};

export default BusStopList;
