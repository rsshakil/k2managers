//General version

import React, { useState, useEffect } from "react";
import { Form, Formik } from "formik";
import { useRecoilValue } from "recoil";
import _ from "lodash";
import { v4 as uuid } from 'uuid';

import SelectBox from "../../Form/FormInputs/SelectBox";
import TextBox from "../../Form/FormInputs/TextBox";
import InputContainer from "../../Wrapper/InputContainer";
import WhiteModalWrapper from '../../Modal/components/WhiteModalWrapper';
import ModalTitle from "../../Modal/components/ModalTitle";
import { appDesignerState, getSelectedPageData, getTransitionDestinationRouteList } from "../../../store/recoil/appDesignerState";
import { getFilterList, getFieldList } from "../../../services/appDesignerService";

import BlockModalFooter from "./BlockModalFooter";
import TreeListCustom from "../../shared/TreeListCustom";
import InformationAreaBlockForm from "./InformationAreaBlockForm";
import { blockTitle, valueFormatCheck } from "../../../utilities/commonFunctions";
import Loader from "../../Loading/Loader";
import Note from "../../Form/FormInputs/Note";
import { defaultBlockSettings } from "../../../store/recoil/appDesignerState";

export default function Category({ blockData = '', setModalOpen = () => { }, handleOnPressSave = () => { }, fieldKey = '' }) {
    const transitionRoutes = useRecoilValue(getTransitionDestinationRouteList);
    const [formData, setFormData] = useState({ ...blockData });
    const [fieldList, setFieldList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen1, setModalOpen1] = useState(false);
    const [selectedBlock1, setSelectedBlock1] = useState(null);


    function handleOnchange(e) {
        const name = e.target.name;
        const value = valueFormatCheck(e.target.value)

        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }


    function handleOnEventTriggered(e, eventType = '', modifiedItems = []) {
        let updatedBlocks = [];

        switch (eventType) {
            case 'add':

                break;
            case 'delete':

                break;

            case 'edit':
                const data = e.row.data
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
            blocks: updatedBlocks
        }))
    }


    useEffect(() => {
        async function fetchFieldListInit() {
            try {
                setLoading(true);
                const projectId = sessionStorage.getItem("currentProjectId")

                const { data, status } = await getFieldList('4', projectId);

                if (status == 200) {
                    let { records = [] } = data || [];

                    records = records.map(record => _.pick(record, ['fieldId', 'fieldCode', 'fieldType', 'fieldName']))

                    setFieldList(records);
                }

                setLoading(false);

            } catch (err) {
                setLoading(false);
            }
        }


        fetchFieldListInit();

    }, [])


    return (
        <>
            {loading && <Loader />}
            <WhiteModalWrapper width="border-none text-black" className="items-start">
                <ModalTitle title="カテゴリー設定" className="text-blue-100 text-xl" />

                <Formik
                    enableReinitialize={true}
                    initialValues={formData}
                >
                    <div className='relative w-full h-full'>
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
                                            <option value="1">北海道対がん協会検診選択タイプ</option>
                                            <option value="2">協会健保地域選択タイプ</option>

                                        </SelectBox>
                                    </InputContainer>

                                    <InputContainer>
                                        <Note label="ブロックカスタムClass"
                                            name="blockWrapCustomClass"
                                            placeholder="ブロックカスタムClass"
                                            labelClassName='text-blue-100'
                                            inputClassName='bg-blue-25 !p-1'
                                            height='h-8'
                                        />
                                    </InputContainer>


                                    <label className="pt-4 text-blue-100">表示するカテゴリーが無い時の情報エリア設定</label>
                                    <TreeListCustom
                                        config={{
                                            treeListClasses: 'custom-treelist block-content truncate w-fill px-8 mt-4',
                                            noDataText: "",
                                            dragDropConfig: { allowDragDrop: true, handleOnOrderChange: (e, eventType, updatedItems) => handleOnEventTriggered(e, eventType, updatedItems) },
                                            showColumnHeaders: false,
                                            idKey: 'appPageBlockId',
                                            defaultSelected: 0,
                                            clickableCells: ['blockListCaption'],
                                            dragDirection: 'vertical', // Accepted Values: 'both' | 'horizontal' | 'vertical' => Default Value: 'both'

                                            handleOnCellPreapared: (e, eventType) => handleOnEventTriggered(e, eventType),

                                            allowAddMoreButton: false,
                                        }}
                                        dataSource={formData.blocks}
                                        columns={[{ dataField: "blockListCaption", eventType: "cellClick", classes: "cursor-pointer", handleOnClick: ({ e, eventType, updatedItems }) => handleOnEventTriggered(e, eventType, updatedItems) }]}
                                        actionColumns={[
                                            { icon: "edit", eventType: "edit", handleOnClick: ({ e, eventType, updatedItems }) => handleOnEventTriggered(e, eventType, updatedItems) },
                                        ]}
                                    />

                                    <div className="mt-10"></div>

                                    <InputContainer>
                                        <SelectBox
                                            label="表示可能カテゴリーが0個の時true,0個以外の時にfalseを書き込むフィールド"
                                            name={`ifEmptyTargetField`}
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25"
                                        >
                                            <option value="">記録しない</option>
                                            {fieldList.map(x => <option key={x.fieldId} value={x?.fieldCode}>{x.fieldName}</option>)}
                                        </SelectBox>
                                    </InputContainer>

                                    <InputContainer>
                                        <SelectBox
                                            label="カテゴリー確定後遷移先"
                                            name={`destination`}
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25"
                                        >
                                            <option value="">なし</option>
                                            {transitionRoutes.map(x => <option key={x.id} value={x.url}>{x.name}</option>)}
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
                                {selectedBlock1.key === 'INFORMATION_AREA' && <InformationAreaBlockForm blockData={selectedBlock1} setModalOpen={setModalOpen1} handleOnPressSave={handleOnPressModalSaveButton} />}
                            </>
                        )}

                    </div>
                </Formik>
            </WhiteModalWrapper >
        </>
    )
}