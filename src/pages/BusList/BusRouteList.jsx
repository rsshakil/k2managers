import React, { useState } from "react";
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
import { listBusRoute } from "../../restapi/queries";
import { ItemData } from "../../utilities/projectBtnItemData";
import BusRouteListTr from "./BusRouteListTr";
import BusRouteSearch from "./BusRouteSearch";

const headerCells = [
    { label: "路線名", minWidth: "24.00rem" },
    { label: "路線管理名", minWidth: "15.00rem" },
    { label: "登録便数", width: "5.5rem" },
    { label: "変更日時", width: "10.375rem" },
    { label: "作成日時", width: "10.375rem" },
    { label: "バス便", width: "4rem" },
];

const BusRouteList = () => {
    const recordsLabel = "バス路線";
    const { pathname } = useLocation();
    const [loading, setLoading] = useState(false); // make -- true -- after finish development
    const [busRouteList, setBusRouteList] = useState([]);
    const [isOverFlow, setIsOverFlow] = useState(false);
    const [numberOfRecords, setNumberOfRecords] = useState(0);
    const { TblContainer, TblHead } = UseTable(headerCells);
    const navigate = useNavigate()
    const [pageNumber, setPageNumber] = useState(+sessionStorage.getItem(`pagination_pageNo`) || 0);
    const { getInitialState } = SessionStorageOnReload();
    const { searchParamsValues } = getInitialState(pathname)
    const [searchParams, setSearchParams] = useState(searchParamsValues ? searchParamsValues : "")

    return (
        <div className={`${isOverFlow && "overflow-hidden"} `}>
            {loading && <Loading/>}
            <Container>
                {/*  ----- outline button section ----- */}
                <OutlineButtonLinkContainer ItemData={ItemData}/>
                <div className="px-4">
                    {/* ------ Filter section ---------*/}
                    <TableControls.UpperSection>
                        <TableControls.NumberOfRecords
                            recordsLabel={recordsLabel}
                            numberOfRecords={numberOfRecords}
                        />
                        <div className="flex justify-between">
                        <BusRouteSearch
                                setSearchParams={setSearchParams}
                                numberOfRecords={numberOfRecords}
                                setPageNumber={setPageNumber}
                            />
                           
                        </div>
                    </TableControls.UpperSection>
                    {/* table section */}
                    <div className="table-wrapper">
                        <TblContainer className="!table-auto min-w-[1400px]">
                            <TblHead/>
                            <tbody className="h-[calc(100vh-206px)] tbody-vertical-scroll">
                            {/* --------TAble content goes here-------- */}
                            {
                                busRouteList.map((bus, index) => (
                                    <BusRouteListTr key={index} bus={bus}/>
                                ))
                            }
                            </tbody>
                        </TblContainer>
                    </div>
                    {/* Table Footer Section  */}
                    <Footer>
                        <PaginationSearchParams
                            itemsPerPage={300}
                            endPoint={listBusRoute}
                            records={busRouteList}
                            setRecords={setBusRouteList}
                            setLoading={setLoading}
                            setNumberOfRecords={setNumberOfRecords}
                            subQueryString={searchParams ? searchParams : searchParamsValues}
                            pageNumber={pageNumber}
                            setPageNumber={setPageNumber}
                        />
                        <div className="flex flex-col items-end">
                            <AddButton text="バス路線追加" onClick={() => navigate("/bus_route_add")}/>
                            <AddButton text="バス停管理" onClick={() => navigate("/bus_stop_list")}/>
                        </div>
                    </Footer>
                </div>
            </Container>
        </div>
    );
};

export default BusRouteList;
