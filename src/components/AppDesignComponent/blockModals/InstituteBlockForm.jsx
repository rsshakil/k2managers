import { Form, Formik } from 'formik';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { getFieldList } from '../../../services/appDesignerService';
import { getTransitionDestinationRouteList } from '../../../store/recoil/appDesignerState';
import SelectBox from '../../Form/FormInputs/SelectBox';
import ModalTitle from '../../Modal/components/ModalTitle';
import WhiteModalWrapper from '../../Modal/components/WhiteModalWrapper';
import InputContainer from '../../Wrapper/InputContainer';

import { blockTitle, valueFormatCheck } from '../../../utilities/commonFunctions';
import Note from '../../Form/FormInputs/Note';
import Loader from '../../Loading/Loader';
import TreeListCustom from '../../shared/TreeListCustom';
import BlockModalFooter from './BlockModalFooter';
import InformationAreaBlockForm from './InformationAreaBlockForm';
import { defaultBlockSettings } from '../../../store/recoil/appDesignerState';

export default function InstituteBlockForm({
    blockData = '',
    setModalOpen = () => { },
    handleOnPressSave = () => { },
    fieldKey = '',
}) {
    const transitionRoutes = useRecoilValue(getTransitionDestinationRouteList);
    const [formData, setFormData] = useState({ ...blockData });
    const [fieldList, setFieldList] = useState([]);
    const [loading, setLoading] = useState(true);

    const [modalOpen1, setModalOpen1] = useState(false);
    const [selectedBlock1, setSelectedBlock1] = useState(null);

    function handleOnchange(e) {
        const name = e.target.name;
        const value = valueFormatCheck(e.target.value);

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    function handleOnEventTriggered(e, eventType = '', modifiedItems = []) {
        switch (eventType) {
            case 'add':
                break;
            case 'delete':
                break;
            case 'edit':
                const data = e.row.data;
                setModalOpen1(true);

                const defaultBlockAttributes = defaultBlockSettings[data.key] || {};
                let selectedData = { ...defaultBlockAttributes, ...data };
                if (selectedBlock1 && selectedBlock1.appPageBlockId === data.appPageBlockId) {
                    selectedData = { ...selectedData, ...selectedBlock1 }
                }

                setSelectedBlock1(selectedData);
                break;
            case 'orderChange':
                break;
            default:
                return null;
        }
    }

    function handleOnPressModalSaveButton(e, blockData) {
        e.preventDefault();
        setModalOpen1(false);

        blockData = JSON.parse(JSON.stringify(blockData));
        blockData.blockListCaption = blockTitle(blockData);

        setSelectedBlock1(blockData);

        let updatedBlocks = [...formData.blocks];
        updatedBlocks.splice(_.findIndex(updatedBlocks, { appPageBlockId: blockData.appPageBlockId }), 1, blockData);

        setFormData((prevState) => ({
            ...prevState,
            blocks: updatedBlocks,
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

    return (
        <>
            {loading && <Loader />}
            <WhiteModalWrapper width="border-none text-black" className="items-start">
                <ModalTitle title="施設設定" className="text-blue-100 text-xl" />

                <Formik enableReinitialize={true} initialValues={formData}>
                    <div className="relative w-full h-full">
                        <Form onChange={handleOnchange}>
                            <div className="body-height3 pt-12 px-10 min-h-[calc(100vh-452px)] !p-0">
                                <div className="flex flex-col py-10">
                                    <InputContainer>
                                        <SelectBox
                                            label="表示タイプ"
                                            name="displayType"
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25"
                                        >
                                            <option value={2}>協会健保タイプ</option>
                                        </SelectBox>
                                    </InputContainer>

                                    <InputContainer>
                                        <Note
                                            label="ブロックカスタムClass"
                                            name="blockWrapCustomClass"
                                            placeholder="ブロックカスタムClass"
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25 !p-1"
                                            height="h-8"
                                        />
                                    </InputContainer>

                                    <label className="pt-4 text-blue-100">
                                        表示する施設が無い時の情報エリア設定
                                    </label>
                                    <TreeListCustom
                                        config={{
                                            treeListClasses: 'custom-treelist block-content truncate w-fill px-8 mt-4',
                                            noDataText: '',
                                            dragDropConfig: {
                                                allowDragDrop: true,
                                                handleOnOrderChange: (e, eventType, updatedItems) =>
                                                    handleOnEventTriggered(e, eventType, updatedItems),
                                            },
                                            showColumnHeaders: false,
                                            idKey: 'appPageBlockId',
                                            defaultSelected: 0,
                                            clickableCells: ['blockListCaption'],
                                            dragDirection: 'vertical', // Accepted Values: 'both' | 'horizontal' | 'vertical' => Default Value: 'both'

                                            handleOnCellPreapared: (e, eventType) =>
                                                handleOnEventTriggered(e, eventType),

                                            allowAddMoreButton: false,
                                        }}
                                        dataSource={formData.blocks}
                                        columns={[
                                            {
                                                dataField: 'blockListCaption',
                                                eventType: 'cellClick',
                                                classes: 'cursor-pointer',
                                                handleOnClick: ({ e, eventType, updatedItems }) =>
                                                    handleOnEventTriggered(e, eventType, updatedItems),
                                            },
                                        ]}
                                        actionColumns={[
                                            {
                                                icon: 'edit',
                                                eventType: 'edit',
                                                handleOnClick: ({ e, eventType, updatedItems }) =>
                                                    handleOnEventTriggered(e, eventType, updatedItems),
                                            },
                                        ]}
                                    />

                                    <div className="mt-10"></div>

                                    <InputContainer>
                                        <SelectBox
                                            label="表示可能施設が0個の時true,0個以外の時にfalseを書き込むフィールド"
                                            name={`ifEmptyTargetField`}
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
                                            label="施設確定後遷移先"
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25"
                                            name="destination"
                                        >
                                            <option value="">遷移先を選んでください</option>
                                            {transitionRoutes.map((x) => (
                                                <option key={x.id} value={x.url}>
                                                    {x.name}
                                                </option>
                                            ))}
                                        </SelectBox>
                                    </InputContainer>
                                    <InputContainer>
                                        <SelectBox
                                            label="MAP選択"
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25"
                                            name="useMap"
                                        >
                                            <option value={1}>なし</option>
                                            <option value={2}>あり</option>
                                        </SelectBox>
                                    </InputContainer>
                                    <InputContainer>
                                        <SelectBox
                                            label="MAP選択後遷移先"
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25"
                                            name="mapDestination"
                                        >
                                            <option value="">遷移先を選んでください</option>
                                            {transitionRoutes.map((x) => (
                                                <option key={x.id} value={x.url}>
                                                    {x.name}
                                                </option>
                                            ))}
                                        </SelectBox>
                                    </InputContainer>
                                    <InputContainer>
                                        <SelectBox
                                            label="ユーザーに紐ついた施設一覧の表示"
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25"
                                            name="userLinkedInstitute"
                                        >
                                            <option value={1}>しない</option>
                                            <option value={2}>する</option>
                                        </SelectBox>
                                    </InputContainer>
                                </div>
                            </div>

                            <BlockModalFooter
                                setModalOpen={() => setModalOpen(false)}
                                handleOnPressSave={(e) => handleOnPressSave(e, formData)}
                            />
                        </Form>

                        {modalOpen1 && (
                            <>
                                {selectedBlock1.key === 'INFORMATION_AREA' && (
                                    <InformationAreaBlockForm
                                        blockData={selectedBlock1}
                                        setModalOpen={setModalOpen1}
                                        handleOnPressSave={handleOnPressModalSaveButton}
                                    />
                                )}
                            </>
                        )}
                    </div>
                </Formik>
            </WhiteModalWrapper>
        </>
    );
}
