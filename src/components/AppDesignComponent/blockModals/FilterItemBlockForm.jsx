import { Form, Formik } from 'formik';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { buttonValidationKeys } from '../../../lib/commonConstants';
import SelectBox from '../../Form/FormInputs/SelectBox';
import TextBox from '../../Form/FormInputs/TextBox';
import Loader from '../../Loading/Loader';
import ModalTitle from '../../Modal/components/ModalTitle';
import WhiteModalWrapper from '../../Modal/components/WhiteModalWrapper';
import InputContainer from '../../Wrapper/InputContainer';
import BlockModalFooter from './BlockModalFooter';

import { getFieldList } from '../../../services/appDesignerService';
import { getSelectedPageData } from '../../../store/recoil/appDesignerState';

export default function FilterItemBlockForm({ blockData = '', setModalOpen = () => { }, handleOnPressSave = () => { } }) {
    const [formData, setFormData] = useState(blockData);
    const [fieldList, setFieldList] = useState([]);

    const [loading, setLoading] = useState(true);

    const selectedPageDetail = useRecoilValue(getSelectedPageData);

    let { blocks = [] } = selectedPageDetail || '';
    let getAllChildBlocks = [];
    if (blocks.length > 0) {
        getAllChildBlocks = generateChildBlocks(blocks);
    }
    let response = getAllChildBlocks.filter((item) => buttonValidationKeys.includes(item.key));
    let res = response.map((record) => _.pick(record, ['appPageBlockId', 'blockListCaption']));
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
                case 'ZIP_CODE_SEARCH_SETTINGS_BLOCK':
                case 'ZIP_CODE_SEARCH':
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
        let updtedItems = {};
        Object.keys(blockMessageItems).map((name) => {
            let updatedBlock = blockMessageItems[name].map((errorItem, i) => {
                let errorT = '';
                if (formData.blockMessages.hasOwnProperty(name)) {
                    errorT = formData.blockMessages[name][i]?.errorText ?? '';
                }
                return { order: errorItem.order, errorText: errorT };
            });
            updtedItems[name] = updatedBlock;
        });
        setFormData((prevState) => ({
            ...prevState,
            blockMessages: updtedItems,
        }));

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

    function handleOnchangeErrorText(e, item, index, orderNo) {
        const name = e.target.name;
        const value = e.target.value;
        let updatedBlocks = [...formData.blockMessages[name]];

        updatedBlocks.splice(index, 1, { order: orderNo, errorText: value });
        setFormData((prevState) => ({
            ...prevState,
            blockMessages: {
                ...prevState.blockMessages,
                [name]: updatedBlocks,
            },
        }));
    }

    function handleOnchange(e) {
        const name = e.target.name;
        const value = e.target.value;
        if (name !== 'targetField') {
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    }
    const filterSubItem = (item, index, blockId, numberOfCol) => {
        let blockInfo = getAllChildBlocks.find((data) => data.appPageBlockId == blockId);
        let blockPageTitleLabel = blockInfo?.key == 'ZIP_CODE_SEARCH' ? `入力項目${index - 1}の下` : blockInfo?.blockPageTitle;
        if (blockInfo?.key == 'ZIP_CODE_SEARCH' || blockInfo?.key == 'ZIP_CODE_SEARCH_SETTINGS_BLOCK') {
            if (index == 0 || index == 1) {
                blockPageTitleLabel = index == 0 ? '郵便番号1の下' : 'ドロップダウン下';
            }
        }
        return (
            <div className={`w-1/${numberOfCol} px-2`}>
                <InputContainer>
                    <TextBox
                        label={blockPageTitleLabel}
                        name={blockId}
                        labelClassName="text-blue-100"
                        inputClassName="bg-blue-25"
                        placeholder="エラーメッセージ"
                        value={item?.errorText}
                        onChange={(e) => handleOnchangeErrorText(e, item, index, item.order)}
                    />
                </InputContainer>
            </div>
        );
    };
    const buttonFilterItemSettingsElement = (blockId) => {
        let numberOfCol = formData.blockMessages[blockId].length;
        return (
            <React.Fragment key={blockId}>
                <div className={`flex ${numberOfCol == 1 ? 'flex-col' : ''}`}>
                    {numberOfCol > 0 &&
                        formData.blockMessages[blockId].map((x, i) => filterSubItem(x, i, blockId, numberOfCol))}
                </div>
            </React.Fragment>
        );
    };
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
                <ModalTitle title={`フィルター詳細設定`} className="text-blue-100 text-xl" />

                <Formik enableReinitialize={true} initialValues={formData}>
                    <div className="relative w-full h-full">
                        <Form onChange={handleOnchange}>
                            <div className="body-height3 pt-12 px-10 min-h-[calc(100vh-452px)] !p-0">
                                <div className="flex flex-col py-10">
                                    <InputContainer>
                                        <SelectBox
                                            label="フィルター判定結果保存先フィールド"
                                            name={`targetField`}
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25"
                                            onChange={handleOnchange}
                                        >
                                            <option value="">記録しない</option>
                                            {fieldList.map((x) => (
                                                <option key={x.fieldId} value={x?.fieldCode}>
                                                    {x.fieldName}
                                                </option>
                                            ))}
                                        </SelectBox>
                                    </InputContainer>

                                    <label className="!text-blue-100">
                                        フィルター判定FALSE時ブロック下エラーメッセージ
                                    </label>
                                    <div className="mt-4">
                                        {Object.keys(formData.blockMessages).length > 0 &&
                                            Object.keys(formData.blockMessages).map((key) =>
                                                buttonFilterItemSettingsElement(key)
                                            )}
                                    </div>
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
