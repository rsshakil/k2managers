import _ from 'lodash';
import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { useDispatch } from 'react-redux';
import useFormDataValidate from '../../../hooks/useFormDataValidate';
import { freePagesValidationSchema } from '../../../lib/Schema';
import { appDesignerUpdate } from '../../../services/appDesignerService';
import { appDesignerState, defaultTabState } from '../../../store/recoil/appDesignerState';
import { logOut } from '../../../store/slice/authSlice';
import { checkSessionHandler } from '../../../utilities/checkSessionHandler';
import Button from '../../Button/Button';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import DialogModal from '../../Modal/DialogModal';
import {Form, Formik } from 'formik';
import InputContainer from '../../Wrapper/InputContainer';
import SelectBox from '../FormInputs/SelectBox';
import { instance } from '../../../services/axios';
import { listAppHistory, updateAppHistory, listMethod, updateMethod, baseURL } from '../../../restapi/queries';
import { useSelector } from 'react-redux';
import { errorMessages } from "../../../lib/errorMessages";

const pageLoaderApplicableKeys = ['CATEGORY', 'SLOT', 'ITEM', 'INSTITUTE'];
const AppFormFooter = ({ fetchAppDesignerData, setValidationErrors, loading, setLoading }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let { appId } = useParams();
    const [recoilStateValue, setRecoilState] = useRecoilState(appDesignerState);
    const [formValid, setFormValid] = useState(true);
    const [errors, setErrors] = useState(null);
    const { validate } = useFormDataValidate();

    const { tabItems } = recoilStateValue;
    // AIS --- Add  Start
    const [appHistoriesModal, setAppHistoriesModal] = useState(false);
    const [systemError, setSystemError] = useState(false);
    const [appHistoriesOption, setAppHistoriesOption] = useState([]);
    const [selectHistory, setSelectHistory] = useState(null);
    const [error, setError] = useState(null);
    const processing = useRef(false);
    
    const { info } = useSelector((state) => state.auth);
    // AIS --- Add  End

    async function processPageBlock(freePagesTemp) {
        return freePagesTemp.map((pageInfo) => {
            let itemBlocks =
                pageInfo?.blocks.length > 0 &&
                pageInfo?.blocks.filter(
                    (blockInfo) => blockInfo.key == 'ITEM_SETTINGS_BLOCK' || blockInfo.key == 'ITEM'
                );
            let itemObjects = {};
            itemBlocks =
                itemBlocks &&
                itemBlocks.length > 0 &&
                itemBlocks.map((itemBlock) => {
                    itemObjects[itemBlock.appPageBlockId] = itemBlock;
                });
            let pagesB =
                pageInfo.blocks.length > 0 &&
                pageInfo.blocks.map((item) => {
                    if (item.key == 'BUTTON') {
                        let obj = Object.assign({}, item);
                        obj.itemSelectionOnThisPage = itemObjects;
                        return obj;
                    }
                    return item;
                });
            if (pageInfo.blocks.length > 0) {
                let obj2 = Object.assign({}, pageInfo);
                obj2.blocks = [...pagesB];
                return obj2;
            }

            return pageInfo;
        });
    }
    async function updateRecoilState(freePagesTemp, commonPagesTemp) {
        setRecoilState((prevState) => ({
            ...prevState,
            tabItems: {
                ...prevState.tabItems,
                freePages: freePagesTemp,
                commonPages: commonPagesTemp,
            },
        }));
    }
    // create operation
    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setErrors(null);

            const result = await checkSessionHandler(dispatch, navigate);
            if (!result.flag) {
                dispatch(logOut());
                sessionStorage.clear();
                localStorage.clear();
                navigate('/');
            }

            let freePagesTemp = tabItems.freePages;
            let commonPagesTemp = tabItems.commonPages;
            let allPagesStopLoadingState = {};

            freePagesTemp = JSON.parse(JSON.stringify(freePagesTemp)).map((x) => {
                const allBlocks = x.blocks;
                const filteredBlocks = allBlocks.filter((element) => pageLoaderApplicableKeys.includes(element.key));

                x.appPageLoadingFlag = null;
                x.appPageLoadingStopFlag = null;

                if (filteredBlocks.length > 0) {
                    x.appPageLoadingFlag = false;

                    const appPageBlockIds = _.map(filteredBlocks, 'appPageBlockId');
                    const appPageBlockIdsObj = appPageBlockIds.reduce((a, v) => ({ ...a, [v]: 0 }), {});

                    x.appPageLoadingStopFlag = appPageBlockIdsObj;
                }
                return x;
            });

            commonPagesTemp = JSON.parse(JSON.stringify(commonPagesTemp)).map((x) => {
                const allBlocks = x.blocks;
                const filteredBlocks = allBlocks.filter((element) => pageLoaderApplicableKeys.includes(element.key));

                x.appPageLoadingFlag = null;
                x.appPageLoadingStopFlag = null;

                if (filteredBlocks.length > 0) {
                    x.appPageLoadingFlag = false;

                    const appPageBlockIds = _.map(filteredBlocks, 'appPageBlockId');
                    const appPageBlockIdsObj = appPageBlockIds.reduce((a, v) => ({ ...a, [v]: 0 }), {});

                    x.appPageLoadingStopFlag = appPageBlockIdsObj;
                }
                return x;
            });

            if (freePagesTemp.length > 0) {
                freePagesTemp = await processPageBlock(freePagesTemp);
            }
            commonPagesTemp = await processPageBlock(commonPagesTemp);

            await updateRecoilState(freePagesTemp, commonPagesTemp); //updated;

            let allRoutes = [
                ..._.map(tabItems.freePages, 'appPageURLName'),
                ..._.map(tabItems.commonPages, 'appCommonPageURLName'),
            ];
            allRoutes = allRoutes.map((x) => {
                return { appPageURLName: x };
            });

            const { valid, errors } = validate(freePagesValidationSchema, tabItems.freePages, allRoutes);
            setValidationErrors(errors);
            setFormValid(valid);

            if (!valid) {
                setLoading(false);
                return null;
            }

            const { blocks, histories, settings } = recoilStateValue.tabItems;
            let tabDetails = { blocks, histories, settings, freePages: freePagesTemp, commonPages: commonPagesTemp, pageLoadingHistory: allPagesStopLoadingState };
            let formData = processData(tabDetails);

            const { data, status } = await appDesignerUpdate(formData, appId);

            if (status !== 200) {
                const { message = '' } = data;
                setErrors(message);
            }

            setLoading(false);
        } catch (error) {
            setLoading(false);
            setErrors(error);
        }
    };

    function processData(tabItems = {}) {
        let masterBlocks = [];

        const modifiedFreePages = tabItems.freePages.map((x) => {
            if (x.isNewPage) {
                x = _.omit(x, ['appPageId', 'isNewPage']);
            }

            masterBlocks = [...masterBlocks, ...x.blocks];
            return x;
        });

        const modifiedCommonPages = tabItems.commonPages.map((x) => {
            if (x.isNewPage) {
                x = _.omit(x, ['appCommonPageId', 'isNewPage']);
            }

            masterBlocks = [...masterBlocks, ...x.blocks];
            return x;
        });

        let settingBlocks = _.without(_.map(tabItems.settings.appSettingQuery, 'blocks'), undefined, null);
        settingBlocks = _.map(settingBlocks, (x) => Object.values(x));
        settingBlocks = settingBlocks.reduce((flattened, value) => {
            return flattened.concat(_.flatten(value));
        }, []);

        masterBlocks = [...masterBlocks, ...settingBlocks];

        let flatMasterBlocks = generateMasterBlocks(masterBlocks);
        flatMasterBlocks = flatMasterBlocks.reduce(
            (obj, item) => ((obj[item.appPageBlockId] = _.omit(item, 'addNewItem')), obj),
            {}
        );

        return {
            ...tabItems,
            freePages: modifiedFreePages,
            commonPages: modifiedCommonPages,
            blocks: flatMasterBlocks,
        };
    }

    function generateMasterBlocks(blocks = []) {
        let result = [];
        blocks.forEach(function (a) {
            result.push(a);

            if (a.key === 'BUTTON' && (a.hasOwnProperty('button1blocks') || a.hasOwnProperty('button2blocks'))) {
                const { button1blocks = [], button2blocks = [] } = a;
                let mergerButtonBlocks = [...button1blocks, ...button2blocks];

                result = result.concat(generateMasterBlocks(mergerButtonBlocks));
            } else if (a.hasOwnProperty('blocks') && a.blocks.length > 0) {
                result = result.concat(generateMasterBlocks(a.blocks));
            }
        });

        return result;
    }

    // AIS --- Mod Start
    async function resetChanges() {
        if (processing.current) return;
        processing.current = true;

        setLoading(true);
        setSystemError(false);

        const ENDPOINT = `${baseURL}${updateAppHistory}${appId}`;
        try {
            const config = {
                method: updateMethod,
                url: ENDPOINT,
                data: {
                    appHistoriesId: selectHistory,
                    updatedBy: info.accountId,
                },
            };

            const created = await instance.request(config);
            // if create is successful
            if (created) {
                setSystemError(false);
                setLoading(false);
                setFormValid(true);
                setErrors(null);
                setAppHistoriesModal(false);
                setRecoilState(defaultTabState);
                fetchAppDesignerData();
            }
        } catch (error) {
            setSystemError(true);
            setLoading(false);
        }finally {
            processing.current = false;
        }
    }
    // AIS --- Mod End
    // AIS --- Add Start
    function setAppHistories(e) {
        e.preventDefault();
        setAppHistoriesOption([]);
        setLoading(true);
        setHistoriesOption();
        setSystemError(false);
        setAppHistoriesModal(true);
    }

    const setHistoriesOption = async () => {
        try {
            const ENDPOINT = `${baseURL}${listAppHistory}${appId}`;
            const config = {
                method: listMethod,
                url: ENDPOINT,
            };

            const response = await instance.request(config);
            if (response) {
                setAppHistoriesOption(response.data.records);
                setSelectHistory(response.data.records[0].appHistoriesId);
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            setSystemError(true);
        }
    };

    const getHistoryModalElement = (props) => {
        const { numberOfButton = '2', confirmBtnTitle = '上記の履歴から復元', cancelBtnTitle = '', onClickConfirm = () => { }, onClickCancel = () => { }, modalContent = '' } = props || {};
        return (
            <DialogModal
                btn_title={cancelBtnTitle}
                cancel_title={confirmBtnTitle}
                handleButtonLeft={() => onClickCancel(false)}
                handleButtonRight={(e) => onClickConfirm(e)}
                colorType="bg-blue-100"
                numberOfButton={numberOfButton}
            >
                <div className='text-center mt-[1rem]'>
                    {modalContent}
                </div>
                <div className='pt-40'>
                    <Formik>
                        <Form>
                            <InputContainer>
                                <SelectBox
                                    label="復元するAPP履歴の選択"
                                    labelClassName="text-blue-100"
                                    inputClassName="bg-blue-25"
                                    onChange={(e) => setSelectHistory(e.target.value)}
                                >
                                    {appHistoriesOption.length > 0 &&
                                        appHistoriesOption.map((field, index) => (
                                            <option value={field.appHistoriesId} key={field.appHistoriesId + '_' + index}>
                                                {field.createdAt}
                                            </option>
                                        ))}
                                </SelectBox>
                            </InputContainer>
                            <ErrorMessage className={`${systemError} ? "visible" : "invisible" -mt-2`}>
                                {systemError && `${errorMessages.E_SYSTEM_01}`}
                            </ErrorMessage>
                        </Form>
                    </Formik>
                </div>
            </DialogModal>
        )
    }
    // AIS --- Add End
    return (
        <div className={`bg-white !p-0`}>
            <ErrorMessage className={!formValid || errors ? 'visible !mt-0' : 'invisible !mt-0'}>
                {!formValid ? '必須項目を確認してください' : errors}
            </ErrorMessage>
            <div className="flex space-x-4 mb-2">
                <Button
                    title="履歴から復元する"
                    className="bg-orange-300"
                    hoverColorType="hover:bg-orange-400"
                    type="button"
                    onClick={setAppHistories}
                    disabled={!!loading}
                />
                <Button title="全て保存" type="button" onClick={handleUpdate} disabled={!!loading} />
            </div>
            <div className="h-8">
                <p className="text-orange-300 text-left text-xs">
                    ※プレビューエリアの外観は実際の予約画面と異なる場合があります
                </p>
                <p class="text-orange-300 text-left text-xs">※同じ画面で同じフィールドを使用すると予期せぬ挙動になることがあります</p>
            </div>
            {/* AIS  --- Add Start*/}
            {appHistoriesModal && getHistoryModalElement({
            cancelBtnTitle: 'キャンセル',
            onClickCancel: () => setAppHistoriesModal(false),
            onClickConfirm: (e) => resetChanges(e),
            modalContent: <p><b>復元するAPP履歴を選択してください</b></p>
            })}
            {/* AIS  --- Add End*/}
        </div>
    );
};
export default AppFormFooter;
