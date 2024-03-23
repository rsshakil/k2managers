import React, { useState, useEffect } from 'react';
import { Form, Formik } from 'formik';
import _ from 'lodash';
import { useRecoilState, useRecoilValue } from 'recoil';

import Note from '../../Form/FormInputs/Note';
import SelectBox from '../../Form/FormInputs/SelectBox';
import { TagBox } from 'devextreme-react/tag-box';

import TextBox from '../../Form/FormInputs/TextBox';
import InputContainer from '../../Wrapper/InputContainer';
import WhiteModalWrapper from '../../Modal/components/WhiteModalWrapper';
import ModalTitle from '../../Modal/components/ModalTitle';
import BlockModalFooter from './BlockModalFooter';
import Loader from '../../Loading/Loader';
import {
    appDesignerState,
    getTransitionDestinationRouteList,
    getSelectedPageData,
} from '../../../store/recoil/appDesignerState';
import { valueFormatCheck } from '../../../utilities/commonFunctions';

import { getFilterList, getFieldList } from '../../../services/appDesignerService';

export default function ButtonCommonModalBlockForm({
    blockData = '',
    setModalOpen = () => { },
    handleOnPressSave = () => { },
    fieldKey = '',
    selectedButton = 1,
    selectedModalType = 0,
}) {
    const transitionRoutes = useRecoilValue(getTransitionDestinationRouteList);
    const [formData, setFormData] = useState(blockData);

    const [fieldList, setFieldList] = useState([]);
    const [loading, setLoading] = useState(true);

    let modalTitle = '';
    let successDestinationLabel = '';
    let successTargetFieldLabel = '';
    let pageDataKey = '';
    switch (selectedModalType) {
        case 0:
            modalTitle = '予約実行機能詳細設定';
            successDestinationLabel = '予約完了時遷移先';
            successTargetFieldLabel = '予約完了時結果保存フィールド';
            pageDataKey = `button${selectedButton}Reservation`;
            break;
        case 1:
            modalTitle = '予約取消機能詳細設定';
            successDestinationLabel = '予約取消完了時遷移先';
            successTargetFieldLabel = '予約取消完了時結果保存フィールド';
            pageDataKey = `button${selectedButton}ReservationCancel`;

            break;
        case 2:
            modalTitle = '予約変更機能詳細設定';
            successDestinationLabel = '予約変更完了時遷移先';
            successTargetFieldLabel = '予約変更完了時結果保存フィールド';
            pageDataKey = `button${selectedButton}ReservationChange`;

            break;
        case 3:
            modalTitle = 'フィールド送信機能詳細設定';
            successDestinationLabel = 'フィールド送信完了時遷移先';
            successTargetFieldLabel = 'フィールド送信完了時結果保存フィールド';
            pageDataKey = `button${selectedButton}SendField`;

            break;
    }
    const [formDataInitial, setFormDataInitial] = useState(formData[pageDataKey]);

    function handleOnchange(e) {
        const name = e.target.name;
        const value = valueFormatCheck(e.target.value);
        setFormDataInitial((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        setFormData((prevState) => ({
            ...prevState,
            [pageDataKey]: {
                ...prevState[pageDataKey],
                [name]: value,
            },
        }));
    }

    function handleOnChangeTags(e, name = '') {
        const { addedItems = [], removedItems = [] } = e;

        let updatedTagItems = formDataInitial[name];
        if (addedItems.length > 0) {
            updatedTagItems = [...updatedTagItems, ...addedItems];
        }

        if (removedItems.length > 0) {
            updatedTagItems = updatedTagItems.filter(
                (x) => !removedItems.filter((y) => y.fieldCode === x.fieldCode).length
            );
        }

        updatedTagItems = _.uniqBy(updatedTagItems, 'fieldCode');

        setFormDataInitial((prevState) => ({
            ...prevState,
            [name]: updatedTagItems,
        }));

        setFormData((prevState) => ({
            ...prevState,
            [pageDataKey]: {
                ...prevState[pageDataKey],
                [name]: updatedTagItems,
            },
        }));
    }

    useEffect(() => {
        async function fetchFieldListInit() {
            try {
                setLoading(true);
                const projectId = sessionStorage.getItem('currentProjectId');

                const { data, status } = await getFieldList('4', projectId);

                if (status == 200) {
                    let { records = [] } = data || [];
                    records = records.map((record) =>
                        _.pick(record, ['fieldId', 'fieldCode', 'fieldType', 'fieldName'])
                    );
                    setFieldList(records);
                }

                setLoading(false);
            } catch (err) {
                setLoading(false);
            }
        }

        fetchFieldListInit();
    }, []);

    const getDynamicLabelText = (errorNo) => {
        let labelText = `エラー${errorNo}`;
        const errorLabelPrefix = 'エラーコード:';

        switch (errorNo) {
            case 1:
                if (selectedModalType == 0) {
                    labelText = `${errorLabelPrefix}201(枠の空きが無いorアイテムの在庫が無い)`;
                } else if (selectedModalType == 2) {
                    labelText = `${errorLabelPrefix}401(枠の空きが無いorアイテムの在庫が無い)`;
                } else if (selectedModalType == 3) {
                    labelText = `${errorLabelPrefix}501(予約番号なし)`;
                }
                break;
            case 2:
                if (selectedModalType == 0) {
                    labelText = `${errorLabelPrefix}202(システム混雑)`;
                } else if (selectedModalType == 1) {
                    labelText = `${errorLabelPrefix}302(システム混雑)`;
                } else if (selectedModalType == 2) {
                    labelText = `${errorLabelPrefix}402(システム混雑)`;
                } else if (selectedModalType == 3) {
                    labelText = `${errorLabelPrefix}502(システム混雑)`;
                }
                break;
            case 3:
                if (selectedModalType == 0) {
                    labelText = `${errorLabelPrefix}203(重複予約)`;
                } else if (selectedModalType == 1) {
                    labelText = `${errorLabelPrefix}303(重複取消)`;
                } else if (selectedModalType == 2) {
                    labelText = `${errorLabelPrefix}403(重複変更)`;
                } else if (selectedModalType == 3) {
                    labelText = `${errorLabelPrefix}503(重複送信)`;
                }
                break;
        }
        return labelText;
    };

    const buttonModalElement = (errorNo = 1) => {
        return (
            <React.Fragment key={errorNo}>
                {/* <label className="text-blue-100 mt-8 mb-4">{`エラー${buttonNo}`}</label> */}
                <label className="text-blue-100 mt-8 mb-4">{getDynamicLabelText(errorNo)}</label>
                <div className="flex">
                    <div className="w-1/2 pr-2">
                        <InputContainer>
                            <SelectBox
                                label="エラー時遷移先"
                                name={`error${errorNo}Destination`}
                                labelClassName="text-blue-100"
                                inputClassName="bg-blue-25"
                            >
                                <option value="">遷移しない</option>
                                {transitionRoutes.map((x) => (
                                    <option key={x.id} value={x.url}>
                                        {x.name}
                                    </option>
                                ))}
                            </SelectBox>
                        </InputContainer>
                        <InputContainer>
                            <SelectBox
                                label="エラー時モーダルクローズ(モーダル使用の場合) "
                                name={`error${errorNo}ModalClose`}
                                labelClassName="text-blue-100"
                                inputClassName="bg-blue-25"
                            >
                                <option value="1">閉じる</option>
                                <option value="2">閉じない</option>
                            </SelectBox>
                        </InputContainer>
                        <InputContainer>
                            <TextBox
                                label="エラー時ボタン下エラーメッセージ(モーダルボタンorページボタン)"
                                name={`error${errorNo}Text`}
                                placeholder="エラーメッセージ "
                                labelClassName="text-blue-100"
                                inputClassName="bg-blue-25"
                            />
                        </InputContainer>
                    </div>
                    <div className="w-1/2 pl-2">
                        <InputContainer>
                            <SelectBox
                                label="エラー時結果保存フィールド"
                                name={`error${errorNo}TargetField`}
                                labelClassName="text-blue-100"
                                inputClassName="bg-blue-25"
                            >
                                <option value="">記録しない</option>
                                {fieldList.map((x) => (
                                    <option key={x.fieldId} value={x?.fieldCode}>
                                        {x.fieldName}
                                    </option>
                                ))}
                            </SelectBox>
                        </InputContainer>
                        <InputContainer>
                            <SelectBox
                                label="エラー時確定ボタン無効化"
                                name={`error${errorNo}ButtonDisable`}
                                labelClassName="text-blue-100"
                                inputClassName="bg-blue-25"
                            >
                                <option value="1">無効にする</option>
                                <option value="2">無効にしない</option>
                            </SelectBox>
                        </InputContainer>
                    </div>
                </div>
            </React.Fragment>
        );
    };

    return (
        <>
            {loading && <Loader />}
            <WhiteModalWrapper width="border-none text-black" className="items-start">
                <ModalTitle title={modalTitle} className="text-blue-100 text-xl" />

                <Formik enableReinitialize={true} initialValues={formDataInitial}>
                    <div className="relative w-full h-full">
                        <Form onChange={handleOnchange}>
                            <div className="body-height3 pt-12 px-10 min-h-[calc(100vh-452px)] !p-0">
                                <div className="flex flex-col py-10">
                                    <div className="flex">
                                        <div className="w-1/2 pr-2">
                                            <InputContainer>
                                                <SelectBox
                                                    label={successDestinationLabel}
                                                    name="successDestination"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25"
                                                >
                                                    <option value="">遷移しない</option>
                                                    {transitionRoutes.map((x) => (
                                                        <option key={x.id} value={x.url}>
                                                            {x.name}
                                                        </option>
                                                    ))}
                                                </SelectBox>
                                            </InputContainer>
                                        </div>
                                        <div className="w-1/2 pl-2">
                                            <InputContainer>
                                                <SelectBox
                                                    label={successTargetFieldLabel}
                                                    name="successTargetField"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25"
                                                >
                                                    <option value="">記録しない</option>
                                                    {fieldList.map((x) => (
                                                        <option key={x.fieldId} value={x?.fieldCode}>
                                                            {x.fieldName}
                                                        </option>
                                                    ))}
                                                </SelectBox>
                                            </InputContainer>
                                        </div>
                                    </div>
                                    <div className="flex mt-8">
                                        <div className="w-1/2 pr-2">
                                            <InputContainer>
                                                <SelectBox
                                                    label="ネットワークエラー時遷移先"
                                                    name="networkErrorDestination"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25"
                                                >
                                                    <option value="">遷移しない</option>
                                                    {transitionRoutes.map((x) => (
                                                        <option key={x.id} value={x.url}>
                                                            {x.name}
                                                        </option>
                                                    ))}
                                                </SelectBox>
                                            </InputContainer>
                                            <InputContainer>
                                                <SelectBox
                                                    label="ネットワークエラー時モーダルクローズ(モーダル使用の場合)"
                                                    name="networkErrorModalClose"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25"
                                                >
                                                    <option value="1">閉じる</option>
                                                    <option value="2">閉じない</option>
                                                </SelectBox>
                                            </InputContainer>
                                            <InputContainer>
                                                <TextBox
                                                    label="ネットワークエラー時ボタン下エラーメッセージ(モーダルボタンorページボタン)"
                                                    name="networkErrorText"
                                                    placeholder="エラーメッセージ"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25"
                                                />
                                            </InputContainer>
                                        </div>
                                        <div className="w-1/2 pl-2">
                                            <InputContainer>
                                                <SelectBox
                                                    label="ネットワークエラー時結果保存フィールド "
                                                    name="networkErrorTargetField"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25"
                                                >
                                                    <option value="">記録しない</option>
                                                    {fieldList.map((x) => (
                                                        <option key={x.fieldId} value={x?.fieldCode}>
                                                            {x.fieldName}
                                                        </option>
                                                    ))}
                                                </SelectBox>
                                            </InputContainer>
                                            <InputContainer>
                                                <SelectBox
                                                    label="ネットワークエラー時確定ボタン無効化"
                                                    name="networkErrorButtonDisable"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25"
                                                >
                                                    <option value="1">無効にする</option>
                                                    <option value="2">無効にしない</option>
                                                </SelectBox>
                                            </InputContainer>
                                        </div>
                                    </div>

                                    {_.range(3).map((x) => buttonModalElement(x + 1))}

                                    {selectedModalType == 3 && (
                                        <InputContainer>
                                            <label className="text-blue-100 text-xs">送信するフィールド選択</label>
                                            <TagBox
                                                name="sendTargetField"
                                                dataSource={fieldList}
                                                value={_.map(formDataInitial.sendTargetField, 'fieldCode')}
                                                displayExpr="fieldName"
                                                valueExpr="fieldCode"
                                                onSelectionChanged={(e) => handleOnChangeTags(e, 'sendTargetField')}
                                                noDataText="データがありません"
                                                selectAllText="すべて選択する"
                                                placeholder="送信するフィールド選択"
                                            />
                                        </InputContainer>
                                    )}
                                </div>
                            </div>

                            <BlockModalFooter
                                memoFieldShow={false}
                                setModalOpen={() => setModalOpen(false)}
                                handleOnPressSave={(e) => handleOnPressSave(e, formData)}
                            />
                        </Form>
                    </div>
                </Formik>
            </WhiteModalWrapper>
        </>
    );
}
