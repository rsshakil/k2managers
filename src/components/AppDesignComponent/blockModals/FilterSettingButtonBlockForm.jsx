import { Form, Formik } from 'formik';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { v4 as uuid } from 'uuid';

import Loader from '../../Loading/Loader';
import ModalTitle from '../../Modal/components/ModalTitle';
import WhiteModalWrapper from '../../Modal/components/WhiteModalWrapper';
import TreeListCustom from '../../shared/TreeListCustom';
import InputContainer from '../../Wrapper/InputContainer';
import BlockModalFooter from './BlockModalFooter';
import FilterItemBlockForm from './FilterItemBlockForm';
import ValueChangeSettingModal from './ValueChangeSettingModal';

import { buttonValidationKeys } from '../../../lib/commonConstants';
import { getFilterList } from '../../../services/appDesignerService';
import { getSelectedPageData } from '../../../store/recoil/appDesignerState';
import { valueFormatCheck } from '../../../utilities/commonFunctions';
import { defaultBlockSettings } from '../../../store/recoil/appDesignerState';

export default function FilterSettingButtonBlockForm(props) {
    const {
        blockData = '',
        setModalOpen = () => { },
        handleOnPressSave = () => { },
        selectedButton = 1,
        sourceDataKey = `button${selectedButton}ValidateFilters`,
        editModalKey = 'filterItemBlockModal',
        modalTitle = 'ボタン押下後フィルター設定',
        label = "フィルター(最大32個)"
    } = props;

    const [formData, setFormData] = useState(blockData);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState([{ FilterId: '', filterName: 'フィルター追加最大32個' }]);

    const [modalOpen1, setModalOpen1] = useState(false);
    const [selectedBlock1, setSelectedBlock1] = useState(null);
    const selectedPageDetail = useRecoilValue(getSelectedPageData);

    let dataSource = [];
    if (formData.hasOwnProperty(`${sourceDataKey}`)) {
        if (Array.isArray(formData[sourceDataKey])) {
            dataSource = formData[sourceDataKey];
        }
    }

    let { blocks = [] } = selectedPageDetail || '';

    let getAllChildBlocks = [];
    if (blocks.length > 0) {
        getAllChildBlocks = generateChildBlocks(blocks);
    }

    let response = getAllChildBlocks.filter((item) => buttonValidationKeys.includes(item.key));

    let blockMessageItems = {};
    response.map((item) => {
        {
            let numOfField = 1;
            let nonNumeric = false;
            switch (item.key) {
                case 'INPUT_TEXT':
                case 'INPUT_TEXT_SETTINGS_BLOCK':
                    numOfField = item.columns;
                    nonNumeric = true;
                    break;
                case 'INPUT_NUMBER_SETTINGS_BLOCK':
                    numOfField = item.inputNumberQuantity;
                    nonNumeric = true;
                    break;
                case 'COMBINE_INPUT_TEXT':
                case 'JOIN_INPUT_FORM_SETTINGS_BLOCK':
                    numOfField = item.numberOfCombine;
                    nonNumeric = true;
                    break;
                case 'ZIP_CODE_SEARCH':
                case 'ZIP_CODE_SEARCH_SETTINGS_BLOCK':
                    numOfField = item.numberOfInputItems + 2;
                    nonNumeric = true;
                    break;
                case 'OPTION_SELECT':
                case 'SELECT_SETTINGS_BLOCK':
                    numOfField = item.areaNumberQuantity;
                    nonNumeric = true;
                    break;
            }

            let numberOfErrorItems = Array.from({ length: numOfField }, (_, i) => {
                return { order: nonNumeric === false ? '' : i + 1, errorText: '' };
            });
            blockMessageItems[item.appPageBlockId] = [...numberOfErrorItems];
        }
    });

    useEffect(() => {
        async function fetchFilteList() {
            try {
                setLoading(true);
                const projectId = sessionStorage.getItem('currentProjectId');

                const { data, status } = await getFilterList(projectId);

                if (status == 200) {
                    let { records = [] } = data || [];
                    records = records.map((record) => _.pick(record, ['filterId', 'filterName']));

                    setFilters((prevState) => [prevState[0], ...records]);
                }

                setLoading(false);
            } catch (err) {
                setLoading(false);
            }
        }
        fetchFilteList();
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
                const updatedFields = orderBlocks([...formData[sourceDataKey], newField]);

                updateState(sourceDataKey, updatedFields);

                return updatedFields;
            case 'delete':
                const selectedItem = e.row.data;

                const filteredBlocks = _.filter(formData[sourceDataKey], (item) => {
                    return item.appPageBlockId !== selectedItem.appPageBlockId;
                });
                updateState(sourceDataKey, filteredBlocks);
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

                updateState(sourceDataKey, updatedItems);
                break;
            default:
                return null;
        }
    }

    function handleOnPressModalSaveButton(e, blockData) {
        e.preventDefault();
        setModalOpen1(false);

        setSelectedBlock1(blockData);

        let updatedBlocks = [...formData[sourceDataKey]];
        updatedBlocks.splice(_.findIndex(updatedBlocks, { appPageBlockId: blockData.appPageBlockId }), 1, blockData);

        setFormData((prevState) => ({
            ...prevState,
            [sourceDataKey]: updatedBlocks,
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
        let newItemKeys = {
            appPageBlockId: uuid(),
            fieldOrderNo: 0,
        };

        if (editModalKey == 'valueChangeSettingModal') {
            newItemKeys = { ...newItemKeys, modifyMethod: 1, originFieldCode: '', specifiedValue: '' };
        } else {
            newItemKeys = { ...newItemKeys, targetField: '', blockMessages: blockMessageItems };
        }
        return newItemKeys;
    }

    function generateChildBlocks(blocks = []) {
        let result = [];
        blocks.forEach(function (a) {
            result.push(a);

            if (a.key === 'BUTTON' && (a.hasOwnProperty('button1blocks') || a.hasOwnProperty('button2blocks'))) {
                const { button1blocks = [], button2blocks = [] } = a;
                let mergerButtonBlocks = [...button1blocks, ...button2blocks];

                result = result.concat(generateChildBlocks(mergerButtonBlocks));
            } else if (a.hasOwnProperty('blocks') && a.blocks.length > 0) {
                result = result.concat(generateChildBlocks(a.blocks));
            }
        });

        return result;
    }

    return (
        <>
            {loading && <Loader />}

            <WhiteModalWrapper width="border-none text-black" className="items-start">
                <ModalTitle title={`${modalTitle}`} className="text-blue-100" />

                <Formik enableReinitialize={true} initialValues={formData}>
                    <div className="relative w-full h-full">
                        <Form onChange={handleOnchange}>
                            <div className="body-height3 pt-12 px-10 min-h-[calc(100vh-452px)] !p-0">
                                <div className="flex flex-col py-10">
                                    <InputContainer>
                                        <label className="!text-blue-100 text-xs mb-2">{label}</label>

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
                                                clickableCells: ['filterName'],

                                                handleOnCellPreapared: (e, eventType) =>
                                                    handleOnEventTriggered(e, eventType),

                                                allowAddMoreButton: !(formData[sourceDataKey].length > 31),
                                            }}
                                            addMoreConfig={{
                                                buttonType: 'dropdown',
                                                options: {
                                                    dropdownItems: filters,
                                                    captionKey: 'filterName',
                                                    valueKey: 'filterId',
                                                    handleOnClick: (e, eventType) =>
                                                        handleOnEventTriggered(e, eventType),
                                                },
                                            }}
                                            dataSource={dataSource}
                                            columns={[
                                                {
                                                    dataField: 'filterName',
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

                        {modalOpen1 && editModalKey == 'filterItemBlockModal' && (
                            <FilterItemBlockForm
                                blockData={selectedBlock1}
                                setModalOpen={setModalOpen1}
                                handleOnPressSave={handleOnPressModalSaveButton}
                            />
                        )}
                        {modalOpen1 && editModalKey == 'valueChangeSettingModal' && (
                            <ValueChangeSettingModal
                                blockData={selectedBlock1}
                                fieldData={blockData}
                                setModalOpen={setModalOpen1}
                                handleOnPressSave={handleOnPressModalSaveButton}
                                modalTitle={`${blockData.fieldName}： ${selectedBlock1.filterName}値変更設定`}
                            />
                        )}
                    </div>
                </Formik>
            </WhiteModalWrapper>
        </>
    );
}
