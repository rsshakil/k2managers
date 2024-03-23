import { Form, Formik } from 'formik';
import _ from 'lodash';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { v4 as uuid } from 'uuid';

import { appDesignerState, defaultBlockSettings, getSelectedPageData } from '../../../store/recoil/appDesignerState';
import { blockListTypes, valueFormatCheck } from '../../../utilities/commonFunctions';
import TextBox from '../../Form/FormInputs/TextBox';
import ModalTitle from '../../Modal/components/ModalTitle';
import WhiteModalWrapper from '../../Modal/components/WhiteModalWrapper';
import TreeListCustom from '../../shared/TreeListCustom';
import InputContainer from '../../Wrapper/InputContainer';
import BlockModalFooter from './BlockModalFooter';
import FieldItemBlockForm from './FieldItemBlockForm';

export default function DisplayField({
    blockData = '',
    setModalOpen = () => { },
    handleOnPressSave = () => { },
    fieldKey = '',
}) {
    const [modalOpen1, setModalOpen1] = useState(false);
    const [selectedBlock1, setSelectedBlock1] = useState(null);

    const [formData, setFormData] = useState(blockData);

    const pageBlocks = blockListTypes(['', 'displayItem'], false);

    function handleOnchange(e) {
        const name = e.target.name;
        const value = valueFormatCheck(e.target.value);

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    function handleOnEventTriggered(e, eventType = '', modifiedItems = []) {
        let updatedBlocks = [];

        switch (eventType) {
            case 'add':
                const selectedBlock = {
                    blockPageId: 59,
                    blockPageTitle: 'フィールドアイテム',
                    key: 'displayItem',
                };
                if (!selectedBlock) return null;

                let newBlock = { ...selectedBlock, ...getNewItemAttributes() };
                updatedBlocks = orderBlocks([...formData.displayItem, newBlock]);

                updateState('displayItem', updatedBlocks);

                return updatedBlocks;
            case 'delete':
                const selectedItem = e.row.data;

                const filteredBlocks = _.filter(formData.displayItem, (item) => {
                    return item.appPageBlockId !== selectedItem.appPageBlockId;
                });

                updateState('displayItem', filteredBlocks);
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

                updateState('displayItem', updatedItems);
                break;
            default:
                return null;
        }
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
            item.appPageBlockOrderNo = index + 1;
            return item;
        });
    }

    function getNewItemAttributes() {
        const blockInfo = {
            appPageBlockId: uuid(),
            appPageBlockOrderNo: 0,
        };
        return { ...blockInfo, ...defaultBlockSettings.displayItem };
    }

    function handleOnPressModalSaveButton(e, blockData) {
        e.preventDefault();
        setModalOpen1(false);

        setSelectedBlock1(blockData);

        let updatedBlocks = [...formData.displayItem];
        updatedBlocks.splice(_.findIndex(updatedBlocks, { appPageBlockId: blockData.appPageBlockId }), 1, blockData);

        setFormData((prevState) => ({
            ...prevState,
            displayItem: updatedBlocks,
        }));
    }

    return (
        <WhiteModalWrapper width="border-none text-black" className="items-start">
            <ModalTitle title="フィールド表示設定" className="text-blue-100 text-xl" />

            <Formik enableReinitialize={true} initialValues={formData}>
                <div className="relative w-full h-full">
                    <Form onChange={handleOnchange}>
                        <div className="body-height3 pt-12 px-10 min-h-[calc(100vh-452px)] !p-0">
                            <div className="flex flex-col py-10">
                                <div className="px-8">
                                    <label className="!text-blue-100">表示リスト(最大16個)</label>

                                    <TreeListCustom
                                        config={{
                                            treeListClasses: 'custom-treelist',
                                            noDataText: '',
                                            dragDropConfig: {
                                                allowDragDrop: true,
                                                handleOnOrderChange: (e, eventType, updatedItems) =>
                                                    handleOnEventTriggered(e, eventType, updatedItems),
                                            },
                                            showColumnHeaders: false,
                                            idKey: 'appPageBlockId',
                                            defaultSelected: 0,
                                            clickableCells: ['blockPageTitle'],
                                            dragDirection: 'vertical', // Accepted Values: 'both' | 'horizontal' | 'vertical' => Default Value: 'both'

                                            handleOnCellPreapared: (e, eventType) =>
                                                handleOnEventTriggered(e, eventType),

                                            allowAddMoreButton: !(formData.displayItem.length > 15),
                                        }}
                                        addMoreConfig={{
                                            buttonType: 'button',
                                            options: {
                                                buttonTitle: 'リスト項目追加最大16個',
                                                handleOnClick: (e, eventType) => handleOnEventTriggered(e, eventType),
                                            },
                                        }}
                                        dataSource={formData.displayItem}
                                        columns={[
                                            {
                                                dataField: 'blockPageTitle',
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
                                </div>
                                <div className="mt-8"></div>
                                <InputContainer>
                                    <TextBox
                                        label="ブロックWrapカスタムClass"
                                        name="blockWrapCustomClass"
                                        placeholder="ブロックWrapカスタムClass"
                                        labelClassName="text-blue-100"
                                        inputClassName="bg-blue-25"
                                    />
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
                            {selectedBlock1.key === 'displayItem' && (
                                <FieldItemBlockForm
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
    );
}
