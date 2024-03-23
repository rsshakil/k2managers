import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Form, Formik } from 'formik';
import { useSelector } from 'react-redux';
import { useRecoilState, useRecoilValue } from 'recoil';
import DialogModal from '../../../components/Modal/DialogModal';
import { copyApp } from '../../../services/appDesignerService';
import { instance } from '../../../services/axios.js';
import { appDesignerState, defaultTabState, getSelectedPageData } from '../../../store/recoil/appDesignerState';
import Button from '../../Button/Button';
import SelectBox from '../../Form/FormInputs/SelectBox';
import Loader from '../../Loading/Loader';
import InputContainer from '../../Wrapper/InputContainer';

import { baseURL, listApp, listMethod, listProject } from '../../../restapi/queries';

export default function DuplicateAppDesignSettingsForm({ fetchAppDesignerData }) {
    const [recoilStateValue, setRecoilState] = useRecoilState(appDesignerState);
    const [projectLists, setProjectLists] = useState([]);
    const [appLists, setAppLists] = useState([]);
    const [modalOpen1, setModalOpen1] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [errors, setErrors] = useState(null);
    const { info } = useSelector((state) => state.auth); // Auth info held in Redux

    const [isOverFlow, setIsOverFlow] = useState(false);

    let { appId } = useParams();

    const [initialData, setFormData] = useState({
        from_project_id: '',
        from_app_id: '',
        to_project_id: '',
        to_app_id: appId,
    });

    const { activePageId } = recoilStateValue;

    const selectedPageDetail = useRecoilValue(getSelectedPageData);
    useEffect(() => {
        const projectId = window.sessionStorage.getItem('currentProjectId');
        updateFormData('to_project_id', projectId);
        getAllProjectList();
    }, []);

    const getAllProjectList = async () => {
        try {
            setLoading(true);
            const ENDPOINT = `${baseURL}${listProject}?itemsPerPage=300&pagesVisited=0`;
            const config = {
                method: listMethod,
                url: ENDPOINT,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            };
            const response = await instance.request(config);
            getAllAppList(response?.data?.records[0].projectId);

            setProjectLists(response?.data?.records);
            updateFormData('from_project_id', response?.data?.records[0]?.projectId);
            setLoading(false);
        } catch (err) {
            setLoading(false);
        }
    };

    const getAllAppList = async (projectId) => {
        try {
            setLoading(true);
            if (projectId) {
                const ENDPOINT = `${baseURL}${listApp}?pid=${projectId}`;
                const config = {
                    method: listMethod,
                    url: ENDPOINT,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                };
                const response = await instance.request(config);
                setAppLists(response?.data?.records);
                updateFormData('from_app_id', response?.data?.records[0]?.appId);
                setLoading(false);
            }
        } catch (err) {
            setLoading(false);
        }
    };

    function handleOnChange(e) {
        let { name, value } = e.target;
        if (name == 'from_project_id') {
            getAllAppList(value);
        }
        updateFormData(name, value);
    }
    function updateFormData(name, value) {
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }
    async function copyAppData() {
        initialData.updatedBy = info.accountId;
        let myAppId = initialData.to_app_id;
        setIsOverFlow(true);
        try {
            setLoading(true);
            setError(null);
            const { data, status } = await copyApp(initialData, myAppId);

            if (status === 200) {
                setErrors(null);
                setRecoilState(defaultTabState);
                fetchAppDesignerData();
            } else {
                const { message = '' } = data;
                setErrors(message);
            }
            setLoading(false);
        } catch (err) {
        } finally {
            setLoading(false);
            setModalOpen1(false);
        }
    }

    return (
        <Formik
            validateOnChange={false}
            validateOnBlur={false}
            enableReinitialize={true}
            initialValues={initialData}
            onSubmit=""
        >
            <div className="relative w-full">
                {loading && <Loader />}
                <Form onChange={handleOnChange}>
                    <div>
                        <div>プロジェクト名</div>
                        <InputContainer>
                            <SelectBox
                                label=""
                                labelClassName="text-blue-100 text-xs"
                                inputClassName="bg-blue-25"
                                name="from_project_id"
                            >
                                {projectLists.length > 0 &&
                                    projectLists.map((field, index) => (
                                        <option value={field.projectId} key={field.projectId + '_' + index}>
                                            {field.projectName}
                                        </option>
                                    ))}
                            </SelectBox>
                        </InputContainer>
                        <div>App名</div>
                        <InputContainer>
                            <SelectBox
                                label=""
                                labelClassName="text-blue-100 text-xs"
                                inputClassName="bg-blue-25"
                                name="from_app_id"
                            >
                                {appLists.length > 0 &&
                                    appLists.map((field, index) => (
                                        <option value={field.appId} key={field.appId + '_' + index}>
                                            {field.appName}
                                        </option>
                                    ))}
                            </SelectBox>
                        </InputContainer>
                        <Button
                            title="上記AppのデザインをこのAppに上書きコピーする"
                            type="button"
                            onClick={() => setModalOpen1(true)}
                        />
                    </div>
                </Form>
                {modalOpen1 && (
                    <DialogModal
                        title=""
                        btn_title="キャンセル "
                        cancel_title="はい"
                        values=""
                        handleButtonLeft={() => setModalOpen1(false)}
                        handleButtonRight={(e) => copyAppData(e)}
                        colorType="bg-blue-100"
                        setIsOverFlow={setIsOverFlow}
                        errors={''}
                    >
                        <div className="text-center mt-[1rem]">
                            <p>Appを上書きコピーしますか?</p>
                        </div>
                        <div className="text-center mt-[1rem] text-red-500">
                            <p>※上書きしたAppは元には戻せません。上書きしたAppは自動で全て保存されます。</p>
                        </div>
                    </DialogModal>
                )}
            </div>
        </Formik>
    );
}
