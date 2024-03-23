
import React, { useRef, useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FaReact } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import AppDesignerForm from "../../components/Form/App/AppDesignerForm";
import DialogModal from "../../components/Modal/DialogModal";
import AddButton from "../../components/Table/FooterSection/AddButton";
import { deployApp, getAppInfo } from "../../services/appDesignerService";
import { appDesignerState } from "../../store/recoil/appDesignerState";
import InputContainer from "../../components/Wrapper/InputContainer";
import TextBox from "../../components/Form/FormInputs/TextBox";
import { Form, Formik } from "formik";
import SelectBox from "../../components/Form/FormInputs/SelectBox";
import {
    baseURL,
    listAppBase,
    listMethod,
} from '../../restapi/queries';
import { instance } from '../../services/axios';
import Loading from "../../components/Loading/Loader";
import { errorMessages } from "../../lib/errorMessages";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";



const AppDesigner = ({ tempValues }) => {
    let { appId } = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isOverFlow, setIsOverFlow] = useState(false);

    const [recoilStateValue, setRecoilState] = useRecoilState(appDesignerState);
    const { appName = '', appURL } = recoilStateValue || '';

    const [deployModal, setDeployModal] = useState(false);
    const [deployProcessingModal, setDeployProcessingModal] = useState(false);
    const [appInitializingModal, setAppInitializingModal] = useState(false);
    const [appDeployStatus, setAppDeployStatus] = useState()

    const [appBase, setAppBase] = useState([]);

    const [systemError, setSystemError] = useState(false);
    const [appBaseId, setAppBaseId] = useState(null);

    async function deployAppInit(e) {
        e.preventDefault();
        setDeployModal(false);

        try {
            setLoading(true);
            setError(null);
            await deployApp(appId, appBaseId);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    async function getAppBaseInfo() {

        const ENDPOINT = `${baseURL}${listAppBase}${appId}`;
        try {
            const config = {
                method: listMethod,
                url: ENDPOINT,
            };

            const response = await instance.request(config);
            if (response) {
                setAppBase(response.data);

                const { currentVerInfo, records = [] } = response?.data || {};

                let appBaseCurrentId = currentVerInfo?.appBaseCurrentId;
                if (!appBaseCurrentId && records.length > 0) appBaseCurrentId = records[0].appBaseId;

                setAppBaseId(appBaseCurrentId);
            }
        } catch (error) {
            console.log(error);
            errorShow();
        }
    }

    const handleModal = () => {
        setDeployModal(true)
        setIsOverFlow(false)
    }

    function closeWindow() {
        window.opener = null;
        window.open("", "_self");
        window.close();
    }
    function openWindow() {
        window.open("https://" + appURL);
    }

    async function checkDeploymentStatus(e) {
        e.preventDefault();
        try {
            setSystemError(false);
            setLoading(true);
            await getAppBaseInfo();
            setError(null);
            const projectId = window.sessionStorage.getItem("currentProjectId");

            const { data, status } = await getAppInfo(appId, projectId);
            const { appDeployFlag, appInitializeStatus } = data?.records || {};

            if (status === 200) {
                if (appDeployFlag == 1) {
                    setDeployProcessingModal(true);
                    setIsOverFlow(false)
                    setAppDeployStatus(data.records.appDeployStatus);

                } else if (appInitializeStatus < 100) {
                    setAppInitializingModal(true);
                    setIsOverFlow(false);
                } else {
                    handleModal();
                }
            }
        } catch (err) {
            console.log(err);
            errorShow();
        } finally {
            setLoading(false);
        }
    }

    function errorShow() {
        setAppBase([]);
        setAppBaseId(null)
        setSystemError(true);
        handleModal();
    }

    const getDeployModalElement = (props) => {
        const { numberOfButton = '2', confirmBtnTitle = 'はい', cancelBtnTitle = '', onClickConfirm = () => { }, onClickCancel = () => { }, modalContent = '' } = props || {};

        let topClass = "relative w-full h-full mt-28";
        if (deployProcessingModal) {
            topClass = "relative w-full h-full mt-44";
        }

        return (
            <DialogModal
                title=''
                btn_title={cancelBtnTitle}
                cancel_title={confirmBtnTitle}
                values={tempValues}
                handleButtonLeft={() => onClickCancel(false)}
                handleButtonRight={(e) => onClickConfirm(e)}
                colorType="bg-blue-100"
                setIsOverFlow={setIsOverFlow}
                errors={""}
                numberOfButton={numberOfButton}
            >
                <div className='text-center mt-[1rem]'>
                    {modalContent}
                </div>
                {(deployModal || deployProcessingModal) &&
                    <Formik>
                        <Form>
                            <div className={topClass}>
                                <div className="-mt-4" id="scroller"></div>
                                <InputContainer>
                                    <TextBox
                                        label="現在のデプロイバージョン"
                                        labelClassName="text-blue-100"
                                        inputClassName="bg-gray-300 cursor-default pointer-events-none"
                                        name="designerVer"
                                        value={appBase.currentVerInfo?.currentVer}
                                        readOnly
                                    />
                                </InputContainer>
                                {deployModal &&
                                    <InputContainer>
                                        <SelectBox
                                            label="デプロイバージョンの選択"
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25"
                                            value={appBaseId}
                                            onChange={(e) => setAppBaseId(e.target.value)}
                                        >
                                            {appBase.records?.length > 0 &&
                                                appBase.records.map((selVer, key) => (
                                                    <option
                                                        value={selVer.appBaseId}
                                                        key={selVer.appBaseId + '_designerSelVer_' + key}
                                                    >
                                                        {selVer.currentVer}
                                                    </option>
                                                ))}
                                        </SelectBox>
                                    </InputContainer>
                                }
                            </div>
                            <ErrorMessage className={`${systemError} ? "visible" : "invisible" -mt-4`}>
                                {systemError && `${errorMessages.E_SYSTEM_01}`}
                            </ErrorMessage>
                        </Form>
                    </Formik>
                }
            </DialogModal>

        )
    }

    return (
        <>{loading && <Loading />}
            <div className={`${isOverFlow && "overflow-y-hidden"} bg-white`}>
                <div className='pr-4 px-4'>
                    <div className="mt-2 mb-2 flex justify-between items-center">
                        <AddButton
                            iconPosition="left"
                            text="APPをデプロイ"
                            onClick={checkDeploymentStatus} disabled={loading}
                            endIcon={<FaReact className="text-[#6495ed]" />}
                        />

                        <span className="text-blue-100 cursor-pointer" onClick={openWindow}>{appName}</span>
                        <div className="text-blue-100" >
                            <span className="cursor-pointer" onClick={closeWindow}>デザイナー画面の終了</span>
                            <span className="cursor-pointer flex float-right py-1 ml-2" onClick={closeWindow}>
                                <AiOutlineCloseCircle />
                            </span>
                        </div>
                    </div>
                </div>

                <AppDesignerForm />

                {/* Modal when App is ok for deployment state */}
                {deployModal && getDeployModalElement({
                    cancelBtnTitle: 'キャンセル',
                    onClickCancel: () => setDeployModal(false),
                    onClickConfirm: (e) => deployAppInit(e),
                    modalContent: <p>デプロイしてよろしいですか？</p>
                })}

                {/* Modal when App is processing state */}
                {deployProcessingModal && getDeployModalElement({
                    cancelBtnTitle: '閉じる',
                    onClickCancel: () => setDeployProcessingModal(false),
                    numberOfButton: '1',
                    modalContent: <p>APPデプロイ中です。しばらくお待ちください。（{appDeployStatus}）</p>
                })}

                {/* Modal when App is initializing state */}
                {appInitializingModal && getDeployModalElement({
                    cancelBtnTitle: '閉じる',
                    onClickCancel: () => setAppInitializingModal(false),
                    numberOfButton: '1',
                    modalContent: <p>構成中のためデプロイできません。</p>
                })}

                {/* {deployModal &&  (
                <DialogModal
                    title=''
                    btn_title='キャンセル'
                    cancel_title='はい'
                    values={tempValues}
                    handleButtonLeft={() => setDeployModal(false)}
                    handleButtonRight={(e) => deployAppInit(e)}
                    colorType="bg-blue-100"
                    setIsOverFlow={setIsOverFlow}
                    errors={""}
                >
                    <div className='text-center mt-[1rem]'>
                        <p>デプロイしてよろしいですか？</p>
                    </div>
                </DialogModal>
            )} */}

                {/* {deployProcessingModal && (
                <DialogModal
                    title=''
                    btn_title='閉じる'
                    cancel_title='はい'
                    values={tempValues}
                    handleButtonLeft={() => setDeployProcessingModal(false)}
                    handleButtonRight={(e) => setDeployProcessingModal(false)}
                    colorType="bg-blue-100"
                    setIsOverFlow={setIsOverFlow}
                    errors={""}
                    numberOfButton='1'
                >
                    <div className='text-center mt-[1rem]'>
                        <p>APPデプロイ中です。しばらくお待ちください。（{appDeployStatus}）</p>
                    </div>
                </DialogModal>
            )} */}
            </div>
        </>
    );
}
export default AppDesigner