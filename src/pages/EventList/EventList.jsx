import React, { useEffect, useRef, useState } from 'react';
import { MdDateRange } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { listEvent } from '../../../src/restapi/queries';
import OutlineButtonLinkContainer from '../../components/Button/OutlineButtonLinkContainer';
import Footer from '../../components/Footer/Footer';
import Loading from '../../components/Loading/Loader';
import PaginationSearchParams from '../../components/Pagination/PaginationSearchParams';
import AddButton from '../../components/Table/FooterSection/AddButton';
import TableControls from '../../components/Table/TableControls';
import UseTable from '../../components/Table/UseTable';
import { ItemData } from '../../utilities/projectBtnItemData';
import EventListTd from './EventListTd';
import EventSearch from './EventSearch';
import {
    baseURL,
    listProjectData,
    listApp,
    listEvent,
    listMethod,
    listField,
} from '../../../src/restapi/queries';
import { instance } from '../../services/axios';

// GLOBAL DECLARATION START
const headerCells = [
    { label: 'イベントID', width: '100px' },
    { label: 'イベント', minWidth: '200px' },
    { label: '開始日', width: '166px' },
    { label: '停止日', width: '166px' },
    {
        iconLabel: <MdDateRange className="ml-[3px] h-[24px] w-[24px] text-blue-100" />,
        width: '2rem',
    },
    { label: 'APP', minWidth: '200px' },
    { label: '予約カテゴリー', minWidth: '200px' },
    { label: 'ログイン', width: '100px' },
    { label: '予約済', width: '100px' },
    { label: 'キャンセル', width: '100px' },
];
const headerCells2 = [
    { label: 'イベントID', width: '100px' },
    { label: 'イベント', minWidth: '200px' },
    { label: '開始日', width: '166px' },
    { label: '停止日', width: '166px' },
    { label: 'APP', minWidth: '200px' },
    { label: '予約カテゴリー', minWidth: '200px' },
    { label: 'ログイン', width: '100px' },
    { label: '予約済', width: '100px' },
    { label: 'キャンセル', width: '100px' },
];

function EventList() {
    const processing = useRef(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); // make -- true -- after finish development
    const [eventList, setEventList] = useState([]);
    const [numberOfRecords, setNumberOfRecords] = useState(0);
    const [pageNumber, setPageNumber] = useState(+sessionStorage.getItem(`pagination_pageNo`) || 0);
    // r5が1以上出ない場合ヘッダーの４番目を除去
    const role = useSelector((state) => state.auth.role);
    const { TblContainer, TblHead } = UseTable(parseInt(role?.r5) === 0 ? headerCells2 : headerCells);
    const [searchDBParams, setSearchDBParams] = useState('');

    const handleIconClick = (eventId, eventName) => {
        navigate('/event_scheduler', { state: { eventId, eventName } });
    };

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
        <>
            {loading && <Loading />}
            {/*  ----- outline button section ----- */}
            <OutlineButtonLinkContainer ItemData={ItemData} />
            <div className="px-4">
                <TableControls.UpperSection>
                    <TableControls.NumberOfRecords recordsLabel="イベント" numberOfRecords={numberOfRecords} />
                    <div className="flex">
                        <EventSearch setSearchDBParams={setSearchDBParams} loading={loading} setLoading={setLoading} setPageNumber={setPageNumber}/>
                    </div>
                </TableControls.UpperSection>

                <div className="table-wrapper">
                    <TblContainer>
                        <TblHead />
                        <tbody className="tbody-height206p tbody-vertical-scroll">
                            {eventList?.map((event, index) => (
                                <tr key={index} className="h-8 table-row-bg row-display text-left">
                                    <EventListTd
                                        info={{
                                            event,
                                            index,
                                            role,
                                            handleIconClick,
                                        }}
                                    />
                                </tr>
                            ))}
                        </tbody>
                    </TblContainer>
                </div>
                <Footer>
                    {searchDBParams && typeof searchDBParams === 'string' && (
                        <PaginationSearchParams
                            itemsPerPage={300}
                            records={eventList}
                            setRecords={setEventList}
                            setLoading={setLoading}
                            endPoint={listEvent}
                            setNumberOfRecords={setNumberOfRecords}
                            subQueryString={searchDBParams}
                            pageNumber={pageNumber}
                            setPageNumber={setPageNumber}
                        />
                    )}
                    {parseInt(role.r4) === 1 && (
                        <div>
                            <AddButton text="イベント追加" onClick={() => navigate('/event_add')} />
                        </div>
                    )}
                </Footer>
            </div>
        </>
    );
}
export default EventList;
