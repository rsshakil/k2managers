import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import OutlineButtonLinkContainer from '../../components/Button/OutlineButtonLinkContainer';
import Footer from '../../components/Footer/Footer';
import Loading from '../../components/Loading/Loader';
import BroadcastUserModal from '../../components/Modal/WhiteModal/BroadcastModal/BroadcastUserModal';
import BroadcastTemplateModal from '../../components/Modal/WhiteModal/BroadcastModal/BroadcastTemplateModal';
import PaginationSearchParams from '../../components/Pagination/PaginationSearchParams';
import AddButton from '../../components/Table/FooterSection/AddButton';
import TableControls from '../../components/Table/TableControls';
import UseTable from '../../components/Table/UseTable';
import { baseURL, listMethod, listBroadcast } from '../../restapi/queries';
import { instance } from '../../services/axios';
import { ItemData } from '../../utilities/projectBtnItemData';
import BroadcastListTD from './BroadcastListTD';

const headerCells = [
    { label: 'ステータス', width: '8rem' },
    { label: 'タイプ', width: '8rem' },
    { label: '一斉送信タイトル', minWidth: '10rem' },
    { label: '送信予約日時', width: '11.25rem' },
    { label: '編集日時', width: '11.25rem' },
    { label: '取消日時', width: '11.25rem' },
    { label: '送信人数', width: '6rem' },
    { label: '編集', width: '3rem' },
];

export default function BroadcastList() {
    // LOCAL DECLARATION START
    const processing = useRef(false);
    const location = useLocation()
    const [loading, setLoading] = useState(true);
    const [broadcastList, setBroadcastList] = useState();
    const [numberOfRecords, setNumberOfRecords] = useState(0);
    const [searchDBParams, setSearchDBParams] = useState('');
    const [initialValueEmail, setInitialValueEmail] = useState([]);
    const [openBroadcastTemplateModal, setOpenBroadcastTemplateModal] = useState(false);
    const [openBroadcastUserModal, setOpenBroadcastUserModal] = useState(false);
    const [formType, setFormType] = useState('add');
    const [readonly, setReadonly] = useState(false);
    const [pageNumber, setPageNumber] = useState(+sessionStorage.getItem(`pagination_pageNo`) || 0);
    const [broadcastId, setBroadcastId] = useState(0);
    const [broadcastTemplateId, setBroadcastTemplateId] = useState(0);
    // LOCAL DECLARATION END

    // CUSTOM HOOK START
    const { TblContainer, TblHead } = UseTable(headerCells);
    // CUSTOM HOOK END

    // useEFFECT START
    useEffect(() => {
        // FIXED -- Double Scroll issue when modal is open
        if (openBroadcastUserModal || openBroadcastTemplateModal) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
    }, [openBroadcastUserModal, openBroadcastTemplateModal]);

    useEffect(() => {
        setLoading(true)
        const projectId = window.sessionStorage.getItem('currentProjectId');
        const ENDPOINT = `${baseURL}${listBroadcast}?pid=${projectId}&itemsPerPage=300&pagesVisited=0`;
        (async () => {
            try {
                if (processing.current) return;
                processing.current = true;
                const config = { method: listMethod, url: ENDPOINT };
                const response = await instance.request(config);
                if (response.data.error) throw new Error(response.data.error);
                setBroadcastList(response.data.records);
            } catch (error) {
                console.log(error);
            } finally {
                processing.current = false;
                setLoading(false);
            }
        })();
    }, [location]);
    // useEFFECT END

    // HANDLE FUNCTION START
    const handleAddBroadcastUser = () => {
        // open broadcast user modal
        setOpenBroadcastUserModal(true);
        setBroadcastId(0);
        // sent and canceled are read-only
        setReadonly(false);
    };

    const handleEditBroadcastUser = (broadcastInfo) => {
        // open broadcast user modal
        setOpenBroadcastUserModal(true);
        // sent and canceled are read-only
        setReadonly(broadcastInfo.broadcastStatus !== 0 ? true : false);
    }

    const handleCancelBroadcastUser = () => {
        // close broadcast user modal
        setOpenBroadcastUserModal(false);
    };

    const handleEditBroadcastTemplate = (broadcastInfo) => {
        // SET INITIAL VALUE EMAIL
        setInitialValueEmail(broadcastInfo);
        // MODAL OPEN TRUE
        setOpenBroadcastTemplateModal(true);
        // sent and canceled are read-only
        setReadonly(broadcastInfo.broadcastStatus !== 0 ? true : false);
    };

    // ---SMS and EMAIL MODAL START
    const handleCancelBroadcastTemplate = () => {
        setOpenBroadcastTemplateModal(false);
    };
    // ---SMS and EMAIL MODAL END
    // HANDLE FUNCTION END

    return (
        <>
            {loading && <Loading />}
            {/*  ----- outline button section ----- */}
            <OutlineButtonLinkContainer ItemData={ItemData} />
            <div className="px-4">
                <TableControls.UpperSection>
                    <TableControls.NumberOfRecords recordsLabel="一斉送信" numberOfRecords={numberOfRecords} />
                </TableControls.UpperSection>

                <div className="table-wrapper">
                    <TblContainer>
                        <TblHead />
                        <tbody className="tbody-height206p tbody-vertical-scroll">
                            {broadcastList?.map((listRecord, index) => (
                                <tr key={index} className="h-8 table-row-bg row-display text-left">
                                    <BroadcastListTD
                                        listRecord={listRecord}
                                        setFormType={setFormType}
                                        setBroadcastId={setBroadcastId}
                                        handleEditBroadcastUser={handleEditBroadcastUser}
                                        handleEditBroadcastTemplate={handleEditBroadcastTemplate}
                                    />
                                </tr>
                            ))}
                        </tbody>
                    </TblContainer>
                </div>
                <Footer>
                    <PaginationSearchParams
                        itemsPerPage={300}
                        records={broadcastList}
                        setRecords={setBroadcastList}
                        setLoading={setLoading}
                        endPoint={listBroadcast}
                        setNumberOfRecords={setNumberOfRecords}
                        subQueryString={searchDBParams}
                        pageNumber={pageNumber}
                        setPageNumber={setPageNumber}
                    />
                    <div>
                        <AddButton text="一斉送信追加" onClick={handleAddBroadcastUser} />
                    </div>
                </Footer>
            </div>

            {openBroadcastUserModal && (
                <BroadcastUserModal
                    formType={formType}
                    handleCancel={handleCancelBroadcastUser}
                    broadcastId={broadcastId}
                    readonly={readonly}
                />
            )}

            {/* EDIT SCREEN FOR SMS & EMAIL FORM MODAL */}
            {openBroadcastTemplateModal && (
                <BroadcastTemplateModal
                    formType={initialValueEmail?.broadcastTemplateId ? 'edit' : 'add'}
                    broadcastType={initialValueEmail?.broadcastType}
                    broadcastTemplateId={setBroadcastTemplateId}
                    initialValues={initialValueEmail}
                    readonly={readonly}
                    handleCancel={handleCancelBroadcastTemplate}
                />
            )}
        </>
    );
}
