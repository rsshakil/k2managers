import React, { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import _ from 'lodash';
import { v4 as uuid } from 'uuid';

import TextBox from '../../Form/FormInputs/TextBox';
import SelectBox from '../../Form/FormInputs/SelectBox';

import InputContainer from '../../Wrapper/InputContainer';
import WhiteModalWrapper from '../../Modal/components/WhiteModalWrapper';
import ModalTitle from '../../Modal/components/ModalTitle';
import Note from '../../Form/FormInputs/Note';
import TreeListCustom from '../../shared/TreeListCustom';
import BlockModalFooter from './BlockModalFooter';
import Loader from '../../Loading/Loader';
import { getFieldList } from '../../../services/appDesignerService';
import FieldFormatBlockForm from './../blockModals/FieldFormatBlockForm';
import { valueFormatCheck } from '../../../utilities/commonFunctions';
import { getFilterList } from '../../../services/appDesignerService';
import { defaultBlockSettings } from '../../../store/recoil/appDesignerState';

export default function FieldItemBlockForm({ blockData = '', setModalOpen = () => { }, handleOnPressSave = () => { } }) {
    const [fieldList, setFieldList] = useState([{ fieldId: '', fieldName: 'フィールド追加(最大16個)' }]);
    const [formData, setFormData] = useState(blockData);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState([]);

    const [modalOpen1, setModalOpen1] = useState(false);
    const [selectedBlock1, setSelectedBlock1] = useState(null);

    useEffect(() => {
        async function fetchFieldListInit() {
            try {
                setLoading(true);
                const projectId = sessionStorage.getItem('currentProjectId');

                const { data, status } = await getFieldList('0,1,2,3,4,5,6,7', projectId);

                if (status == 200) {
                    let { records = [] } = data || [];

                    records = records.map((record) =>
                        _.pick(record, ['fieldId', 'fieldCode', 'fieldType', 'fieldName'])
                    );

                    setFieldList((prevState) => [prevState[0], ...records]);
                }

                setLoading(false);
            } catch (err) {
                setLoading(false);
            }
        }
        async function fetchFilteList() {
            try {
                setLoading(true);
                const projectId = sessionStorage.getItem('currentProjectId');

                const { data, status } = await getFilterList(projectId);

                if (status == 200) {
                    let { records = [] } = data || [];
                    setFilters(records);
                }

                setLoading(false);
            } catch (err) {
                setLoading(false);
            }
        }

        fetchFilteList();

        fetchFieldListInit();
    }, []);

    function updateBlockTitle(name, value) {
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    function handleOnchange(e) {
        const name = e.target.name;
        const value = valueFormatCheck(e.target.value);

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        if (name == 'caption') {
            let captionTItlte = value == '' ? 'フィールドアイテム' : value;
            updateBlockTitle('blockPageTitle', captionTItlte);
        }
    }

    function handleOnEventTriggered(e, eventType = '', modifiedItems = []) {
        switch (eventType) {
            case 'add':
                const selectedField = JSON.parse(e.target.value);
                if (!selectedField) return null;
                const newField = { ...selectedField, ...getNewItemAttributes(selectedField) };
                const updatedFields = orderBlocks([...formData.fields, newField]);

                updateState('fields', updatedFields);

                return updatedFields;
            case 'delete':
                const selectedItem = e.row.data;

                const filteredBlocks = _.filter(formData.fields, (item) => {
                    return item.appPageBlockId !== selectedItem.appPageBlockId;
                });
                updateState('fields', filteredBlocks);
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

                updateState('fields', updatedItems);
                break;
            default:
                return null;
        }
    }

    function handleOnPressModalSaveButton(e, blockData) {
        e.preventDefault();
        setModalOpen1(false);

        setSelectedBlock1(blockData);

        let updatedBlocks = [...formData.fields];
        updatedBlocks.splice(_.findIndex(updatedBlocks, { appPageBlockId: blockData.appPageBlockId }), 1, blockData);

        setFormData((prevState) => ({
            ...prevState,
            fields: updatedBlocks,
        }));
    }

    function updateState(key, value) {
        setFormData((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    }

    function orderBlocks(pageBlocks = []) {
        pageBlocks = JSON.parse(JSON.stringify([...pageBlocks]));

        return pageBlocks.map((item, index) => {
            item.fieldOrderNo = index + 1;
            return item;
        });
    }

    function getNewItemAttributes(fieldInfo) {
        let fieldMethodvalue = '';
        if (fieldInfo.fieldType == 6) {
            fieldMethodvalue = 4;
        } else if (fieldInfo.fieldType == 7) {
            fieldMethodvalue = 1;
        } else if (fieldInfo.fieldType == 3) {
            fieldMethodvalue = 1;
        }
        return {
            appPageBlockId: uuid(),
            fieldOrderNo: 0,
            fieldType: parseInt(fieldInfo.fieldType),
            formatMethod: fieldMethodvalue,
            memo: '',
        };
    }

    return (
        <>
            {loading && <Loader />}

            <WhiteModalWrapper width="border-none text-black" className="items-start">
                <ModalTitle title="リスト項目設定" className="text-blue-100" />

                <Formik enableReinitialize={true} initialValues={formData}>
                    <div className="relative w-full h-full">
                        <Form onChange={handleOnchange}>
                            <div className="body-height3 pt-12 px-10 min-h-[calc(100vh-452px)] !p-0">
                                <div className="flex flex-col py-10">
                                    <InputContainer>
                                        <TextBox
                                            label="リスト項目名"
                                            name="caption"
                                            placeholder="リスト項目のラベル（改行は\n）など"
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25"
                                        />
                                    </InputContainer>

                                    <InputContainer>
                                        <SelectBox
                                            label="表示条件フィルター"
                                            name="filter"
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25"
                                            value={formData.filter}
                                            onChange={handleOnchange}
                                        >
                                            <option value="0">フィルターなし</option>
                                            {filters.map((row, index) => (
                                                <option value={row.filterId} key={row.filterId + '_' + index}>
                                                    {row.filterName}
                                                </option>
                                            ))}
                                        </SelectBox>
                                    </InputContainer>

                                    <InputContainer>
                                        <label className="!text-blue-100">項目表示フィールド</label>

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
                                                clickableCells: ['fieldName'],

                                                handleOnCellPreapared: (e, eventType) =>
                                                    handleOnEventTriggered(e, eventType),

                                                allowAddMoreButton: !(formData.fields.length > 17),
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
                                            dataSource={formData.fields}
                                            columns={[
                                                {
                                                    dataField: 'fieldName',
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

                                    <InputContainer>
                                        <TextBox
                                            label="フィールド接続文字"
                                            name="conjunction"
                                            placeholder="入力がない場合区切り無しになります。スペース　カンマ　ハイフン（改行は\n）など"
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25"
                                        />
                                    </InputContainer>
                                    <InputContainer>
                                        <TextBox
                                            label="フィールド毎のカスタムClass"
                                            name="listItemCustomClass"
                                            placeholder="カスタムClass"
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25"
                                        />
                                    </InputContainer>

                                    <InputContainer>
                                        <SelectBox
                                            label="全てのフィールドが空で表示するものがない時"
                                            name="isAllEmpty"
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25"
                                        >
                                            <option value="1">リスト行を表示しない</option>
                                            <option value="2">リスト行を表示する</option>
                                        </SelectBox>
                                    </InputContainer>
                                    <InputContainer>
                                        <TextBox
                                            label="全て空の場合の表示文字"
                                            name="emptyText"
                                            placeholder="リスト項目全てのフィールドが空の場合の表示文字"
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25"
                                        />
                                    </InputContainer>
                                    <InputContainer>
                                        <Note
                                            label="リスト項目先頭表示文字"
                                            placeholder="項目の先頭に追加する説明"
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25 !h-16"
                                            name="firstSentence"
                                        />
                                    </InputContainer>
                                    <InputContainer>
                                        <Note
                                            label="リスト項目末尾表示文字"
                                            placeholder="項目の末尾に追加する説明"
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25 !h-16"
                                            name="endSentence"
                                        />
                                    </InputContainer>
                                    <InputContainer>
                                        <TextBox
                                            label="リスト表示カスタムClass"
                                            name="fieldsWrapCustomClass"
                                            placeholder="カスタムClass"
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25"
                                        />
                                    </InputContainer>
                                    <InputContainer>
                                        <TextBox
                                            label="リスト項目名カスタムClass"
                                            name="captionWrapCustomClass"
                                            placeholder="カスタムClass"
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25"
                                        />
                                    </InputContainer>
                                </div>
                            </div>

                            <BlockModalFooter
                                setModalOpen={() => setModalOpen(false)}
                                handleOnPressSave={(e) => handleOnPressSave(e, _.omit(formData, ['addNewItem']))}
                            />
                        </Form>

                        {modalOpen1 && (
                            <FieldFormatBlockForm
                                blockData={selectedBlock1}
                                setModalOpen={setModalOpen1}
                                handleOnPressSave={handleOnPressModalSaveButton}
                            />
                        )}
                    </div>
                </Formik>
            </WhiteModalWrapper>
        </>
    );
}
