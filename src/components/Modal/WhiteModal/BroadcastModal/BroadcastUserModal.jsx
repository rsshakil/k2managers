import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    baseURL,
    createMethod,
    broadcastUserCreate,
    listBroadcast,
    listMethod,
} from '../../../../restapi/queries';
import ModalFormFooter from '../../../Footer/ModalFormFooter';
import { Form, Formik } from 'formik';
import { errorMessages } from '../../../../lib/errorMessages';
import ErrorMessage from '../../../ErrorMessage/ErrorMessage';
import BroadcastUserTable from './BroadcastUserTable';
import InputContainer from '../../../Wrapper/InputContainer';
import Button from '../../../Button/Button';
import ButtonContainer from '../../../Wrapper/ButtonContainer';
import Loading from '../../../Loading/Loader';
import TableControls from '../../../Table/TableControls';
import ModalTitle from '../../components/ModalTitle';
import WhiteModalWrapper from '../../components/WhiteModalWrapper';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { csvToObject, csvDataItems } from '../../../../helper/functions/csvToObject';
import { useSelector } from 'react-redux';
import { instance } from '../../../../services/axios.js';

export default function BroadcastUserModal({
    formType = 'add',
    handleCancel,
    broadcastId,
    readonly
}) {
    // LOCAL DECLARATION START
    const processing = useRef(false)
    const { info } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({});
    const [broadcastType, setBroadcastType] = useState(0);
    const [noTargetError, setNoTargetError] = useState(false);
    const [systemError, setSystemError] = useState(false);
    const [broadcastUsers, setBroadcastUsers] = useState();

    const navigate = useNavigate();
    // LOCAL DECLARATION END

    useEffect(() => {
        if (broadcastId !== 0) {
            setLoading(true);
            const projectId = sessionStorage.getItem('currentProjectId');
            const ENDPOINT = `${baseURL}${listBroadcast}${broadcastId}?pid=${projectId}`;

            (async () => {
                if (processing.current) return;
                processing.current = true;
                try {
                    const config = { method: listMethod, url: ENDPOINT };
                    const response = await instance.request(config);
                    if (response.data.error) throw new Error(response.data.error);
                    setBroadcastUsers(response.data.records);
                    setBroadcastType(response.data.data.broadcastType);
                } catch (error) {
                    console.log(error);
                } finally {
                    processing.current = false;
                    setLoading(false);
                }
            })();
        }
    }, [broadcastId]);

    const handleChange = async (e) => {
        const { files, name } = e.target;
        if (files[0]) { 
            setLoading(true);
            const obj =  await csvToObject(files[0]);
            console.log('files',files[0]);
            const dataItems = await csvDataItems(files[0]);
            console.log(name, '=>', obj);
            console.log('dataItems', dataItems);
            setFormData((prevState) => ({ ...prevState, }));
            setBroadcastType(name == 'sms-file' ? 1 : 0)
            setBroadcastUsers(dataItems?.csvImportPreview);
            setLoading(false);
        }
       
    };

    const handleAdd = async () => {
        if (processing.current) return;
        processing.current = true;
        setLoading(true);
        setNoTargetError(false);
        setSystemError(false);
        try {
            const projectId = sessionStorage.getItem('currentProjectId');
            let base64data = JSON.stringify(broadcastUsers);

            if (projectId && base64data && base64data.length > 0) {
                const ENDPOINT = `${baseURL}${broadcastUserCreate}`;
                let body = {
                    projectId: projectId,
                    broadcastId: broadcastId,
                    csvData: base64data,
                    broadcastType: broadcastType,
                    createdBy: info.accountId,
                    updatedBy: info.accountId,
                };
                const config = {
                    method: createMethod,
                    url: ENDPOINT,
                    data: JSON.stringify(body),
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                };
                await instance.request(config);
                navigate('/broadcast_list');
                handleCancel(false);
            } else {
                setNoTargetError(true);
            }
            setLoading(false);
        } catch (err) {
            setSystemError(true);
            setLoading(false);
            console.log(err);
        } finally {
            processing.current = false;
        }
    };

    return (
        <>
            {loading && <Loading />}
            <WhiteModalWrapper width="border-none text-black" className="items-start">
                {/* this is the modal title section */}
                <ModalTitle
                    className="text-blue-100 bold text-xl"
                    title={`${formType === 'add' ? `一斉送信CSV新規追加` : '一斉送信CSV編集'}`}
                />
                <div className="">
                    <TableControls.UpperSection>
                        <TableControls.NumberOfRecords
                            recordsLabel="一斉送信対象者"
                            numberOfRecords={broadcastUsers?.length ?? 0}
                        />
                    </TableControls.UpperSection>

                    <div className="table-wrapper scroll-bar overflow-x-auto">
                        <BroadcastUserTable broadcastUsers={broadcastUsers} loading={loading}/>
                    </div>

                    <Formik
                        validateOnChange={false}
                        validateOnBlur={false}
                        initialValues={formData}
                        enableReinitialize={true}
                        onSubmit={() => {
                            handleAdd();
                        }}
                    >
                        {({ errors }) => {
                            const first = Object.keys(errors)[0];
                            return (
                                <Form>
                                    {readonly === false ? (
                                        <>
                                            <div className='clear-both relative pt-10'>
                                                <div className='float-right'>
                                                    <label
                                                        className="flex items-center pl-2 cursor-pointer columns-12 tracking-normal text-left text-blue-100"
                                                        htmlFor="email"
                                                    >
                                                        <div>メール送信対象者CSVアップロード（上書き）</div>
                                                        <BsFillPlusCircleFill />
                                                        <input
                                                            type="file"
                                                            name="email-file"
                                                            className="hidden"
                                                            id="email"
                                                            onChange={handleChange}
                                                        />
                                                    </label>
                                                    <label
                                                        className="flex items-center pl-5 cursor-pointer columns-12 tracking-normal text-left text-blue-100"
                                                        htmlFor="sms"
                                                    >
                                                        <div>SMS送信対象者CSVアップロード（上書き）</div>
                                                        <BsFillPlusCircleFill />
                                                        <input
                                                            type="file"
                                                            name="sms-file"
                                                            className="hidden"
                                                            id="sms"
                                                            onChange={handleChange}
                                                        />
                                                    </label>
                                                </div>
                                            </div>

                                            <InputContainer className={'mt-16'}>
                                                <ModalFormFooter
                                                    padding="!p-0 clear-both"
                                                    btn_title1={`${formType === 'add' ? 'キャンセル' : 'キャンセル'}`}
                                                    btn_title2={`${formType === 'add' ? '保存' : '保存'}`}
                                                    formType={'add'}
                                                    handleCancel={handleCancel}
                                                    memoViewDisable={true}
                                                >
                                                    {/* ----error---- */}
                                                    <ErrorMessage>
                                                        {errors[first]}
                                                        {noTargetError && !errors[first] && `${errorMessages.W_BROADCAST_02}`}
                                                        {systemError && !errors[first] && `${errorMessages.E_SYSTEM_01}`}
                                                    </ErrorMessage>
                                                </ModalFormFooter>
                                            </InputContainer>
                                        </>
                                    ) : (
                                        <InputContainer className={'mt-16'}>
                                            <ButtonContainer>
                                                <Button
                                                    title="キャンセル"
                                                    className="bg-blue-100"
                                                    hoverColorType="hover:bg-blue-300"
                                                    type="button"
                                                    onClick={handleCancel}
                                                />
                                            </ButtonContainer>
                                        </InputContainer>
                                    )}
                                </Form>
                            );
                        }}
                    </Formik>
                </div>
            </WhiteModalWrapper>
        </>
    );
}
