import React, { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import _ from 'lodash';
import { v4 as uuid } from 'uuid';

import InputContainer from '../../Wrapper/InputContainer';
import WhiteModalWrapper from '../../Modal/components/WhiteModalWrapper';
import ModalTitle from '../../Modal/components/ModalTitle';
import TreeListCustom from '../../shared/TreeListCustom';
import BlockModalFooter from './BlockModalFooter';
import Loader from '../../Loading/Loader';
import FilterSettingButtonBlockForm from './FilterSettingButtonBlockForm';
import { valueFormatCheck } from '../../../utilities/commonFunctions';
import { getFilterList, getFieldList } from '../../../services/appDesignerService';
import { defaultBlockSettings } from '../../../store/recoil/appDesignerState';

export default function FieldValueChangeSettingModal({
    blockData = '',
    setModalOpen = () => { },
    handleOnPressSave = () => { },
    selectedButton = 1,
}) {
    const [fieldList, setFieldList] = useState([{ FilterId: '', fieldName: 'フィールド追加(最大16個)' }]);
    const [formData, setFormData] = useState(blockData);
    const [loading, setLoading] = useState(true);

    const [modalOpen1, setModalOpen1] = useState(false); //filter modal show/hide
    const [selectedBlock1, setSelectedBlock1] = useState(null);

    let dataSource = [];
    if (formData.hasOwnProperty(`button${selectedButton}FieldModifySetting`)) {
        dataSource = formData[`button${selectedButton}FieldModifySetting`].map((x) => {
            return { ...x, modifiedFieldName: 'フィールド名：' + x.fieldName };
        });
    }

    //Fetch all fields
    useEffect(() => {
        async function fetchFieldList() {
            try {
                setLoading(true);
                const projectId = sessionStorage.getItem('currentProjectId');

                const { data, status } = await getFieldList('0,1,2,3,4,5,6,7', projectId);

                if (status == 200) {
                    let { records = [] } = data || [];
                    records = records.map((record) =>
                        _.pick(record, ['fieldId', 'fieldCode', 'fieldType', 'fieldName', 'fieldStyle'])
                    );

                    setFieldList((prevState) => [prevState[0], ...records]);
                }

                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        }
        fetchFieldList();
    }, []);

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
                const selectedField = JSON.parse(e.target.value);
                if (!selectedField) return null;
                const newField = { ...selectedField, ...getNewItemAttributes() };
                console.log('my checkkkk', formData)
                const updatedFields = orderBlocks([...formData[`button${selectedButton}FieldModifySetting`], newField]);

                updateState(`button${selectedButton}FieldModifySetting`, updatedFields);

                return updatedFields;
            case 'delete':
                const selectedItem = e.row.data;

                const filteredBlocks = _.filter(formData[`button${selectedButton}FieldModifySetting`], (item) => {
                    return item.appPageBlockId !== selectedItem.appPageBlockId;
                });

                updateState(`button${selectedButton}FieldModifySetting`, filteredBlocks);
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
                const updatedItems = orderBlocks(modifiedItems);

                updateState(`button${selectedButton}FieldModifySetting`, updatedItems);
                break;
            default:
                return null;
        }
    }

    function handleOnPressModalSaveButton(e, blockData) {
        e.preventDefault();
        setModalOpen1(false);

        setSelectedBlock1(blockData);

        let updatedBlocks = [...formData[`button${selectedButton}FieldModifySetting`]];
        updatedBlocks.splice(_.findIndex(updatedBlocks, { appPageBlockId: blockData.appPageBlockId }), 1, blockData);
        let key = `button${selectedButton}FieldModifySetting`;

        setFormData((prevState) => ({
            ...prevState,
            [key]: updatedBlocks,
        }));
    }

    function updateState(key, value) {
        setFormData((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    }

    function orderBlocks(fieldsArr = []) {
        let orderedFieldsArr = JSON.parse(JSON.stringify([...fieldsArr]));

        return orderedFieldsArr.map((item, index) => {
            item.fieldOrderNo = index + 1;
            return item;
        });
    }

    function getNewItemAttributes() {
        return {
            appPageBlockId: uuid(),
            fieldOrderNo: 0,
            filters: [],
        };
    }

    return (
        <>
            {loading && <Loader />}

            <WhiteModalWrapper width="border-none text-black" className="items-start">
                <ModalTitle title="ボタン押下後フィールド値変更設定" className="text-blue-100" />

                <Formik enableReinitialize={true} initialValues={formData}>
                    <div className="relative w-full h-full">
                        <Form onChange={handleOnchange}>
                            <div className="body-height3 pt-12 px-10 min-h-[calc(100vh-452px)] !p-0">
                                <div className="flex flex-col py-10">
                                    <InputContainer>
                                        <label className="!text-blue-100">フィールド(最大16個)</label>

                                        <TreeListCustom
                                            config={{
                                                treeListClasses: 'custom-treelist block-content px-8',
                                                noDataText: '',
                                                dragDropConfig: {
                                                    allowDragDrop: true,
                                                    handleOnOrderChange: (e, eventType, updatedItems) =>
                                                        handleOnEventTriggered(e, eventType, updatedItems),
                                                },
                                                showColumnHeaders: false,
                                                idKey: 'appPageBlockId',
                                                defaultSelected: 0,
                                                clickableCells: ['modifiedFieldName'],

                                                handleOnCellPreapared: (e, eventType) =>
                                                    handleOnEventTriggered(e, eventType),

                                                allowAddMoreButton: !(dataSource.length > 15),
                                            }}
                                            addMoreConfig={{
                                                buttonType: 'dropdown',
                                                options: {
                                                    dropdownItems: fieldList,
                                                    captionKey: 'fieldName',
                                                    valueKey: 'fieldId',
                                                    handleOnClick: (e, eventType) =>
                                                        handleOnEventTriggered(e, eventType),
                                                },
                                            }}
                                            dataSource={dataSource}
                                            columns={[
                                                {
                                                    dataField: 'modifiedFieldName',
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
                                                {
                                                    icon: 'trash',
                                                    eventType: 'delete',
                                                    handleOnClick: ({ e, eventType, updatedItems }) =>
                                                        handleOnEventTriggered(e, eventType, updatedItems),
                                                },
                                            ]}
                                        />
                                    </InputContainer>
                                </div>
                            </div>

                            <BlockModalFooter
                                memoFieldShow={false}
                                setModalOpen={() => setModalOpen(false)}
                                handleOnPressSave={(e) => handleOnPressSave(e, formData)}
                            />
                        </Form>

                        {modalOpen1 && (
                            <FilterSettingButtonBlockForm
                                blockData={selectedBlock1}
                                setModalOpen={setModalOpen1}
                                handleOnPressSave={handleOnPressModalSaveButton}
                                sourceDataKey="filters"
                                editModalKey="valueChangeSettingModal"
                                modalTitle={`フィールド名：${selectedBlock1.fieldName}値変更設定`}
                                label="変更条件フィルター（上から順番に照合され最初にヒットした時点で終了します。一個もヒットしない場合は何も実行されません）"
                            />
                        )}
                    </div>
                </Formik>
            </WhiteModalWrapper>
        </>
    );
}
