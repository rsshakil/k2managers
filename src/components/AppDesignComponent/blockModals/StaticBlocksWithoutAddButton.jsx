import { useState } from 'react';
import { useRecoilState } from 'recoil';

import { appDesignerState } from '../../../store/recoil/appDesignerState';
import { blockListTypes } from '../../../utilities/commonFunctions';
import TreeListCustom from '../../shared/TreeListCustom';
import InformationAreaBlockForm from './InformationAreaBlockForm';
import { defaultBlockSettings } from '../../../store/recoil/appDesignerState';

export default function StaticBlocksWithoutAddButton({
    config = {},
    label = '',
    blocks = [],
    fieldKey = '',
    formValues,
    stateDateUpdate = () => { },
}) {
    const [recoilStateValue, setRecoilState] = useRecoilState(appDesignerState);

    const pageBlocks = blockListTypes();
    const pageFrameBlockTypes = blockListTypes(['', 'BUTTON', 'IMAGE', 'TEXT_LINK', 'INFORMATION_AREA'], false);

    const { idKey = '', activeItem = '', clickableCells = [] } = config;

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedBlock, setSelectedBlock] = useState(null);
    const [newFormValues, setFormValues] = useState(formValues);

    const { activePageId } = recoilStateValue;
    let dropDownKeyList = activePageId == 'pageFrameSettings' ? pageFrameBlockTypes : pageBlocks;

    function handleOnEventTriggered(e, eventType = '', modifiedItems = []) {
        let updatedBlocks = [];

        switch (eventType) {
            case 'edit':
                const data = e.row.data;
                setModalOpen(true);

                const defaultBlockAttributes = defaultBlockSettings[data.key] || {};
                let selectedData = { ...defaultBlockAttributes, ...data };

                setSelectedBlock(selectedData);

                break;

            default:
                return null;
        }
    }

    function handleOnPressModalSaveButton(e, formData) {
        e.preventDefault();
        setModalOpen(false);

        stateDateUpdate(fieldKey, formData);
    }

    const blockTitle = (data) => {
        let title = data.blockPageTitle;

        switch (data.key) {
            case 'BUTTON':
                const buttonTitles = [data.button1Text, data.button2Text].filter((e) => e);
                title += buttonTitles.join(',');
                break;

            case 'INFORMATION_AREA':
                const infoAreaTitles = [data.informationAreaTitle];
                title += infoAreaTitles.join(',');
                break;

            case 'TEXT_LINK':
                const textLinkTitles = [data.linkText];
                title += textLinkTitles.join(',');
                break;

            case 'H1':
            case 'H2':
            case 'H3':
            case 'H4':
            case 'H5':
            case 'H6':
                const hTitles = [data.headingText];
                title += hTitles.join(',');
                break;

            default:
                break;
        }

        return title;
    };

    return (
        <>
            <label className=" text-blue-100 text-base">{label}</label>

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
                    idKey: idKey,
                    defaultSelected: activeItem,
                    clickableCells: clickableCells,
                    dragDirection: 'vertical', // Accepted Values: 'both' | 'horizontal' | 'vertical' => Default Value: 'both'

                    handleOnCellPreapared: (e, eventType) => handleOnEventTriggered(e, eventType),

                    allowAddMoreButton: false,
                }}
                addMoreConfig={{
                    buttonType: 'dropdown',
                    options: {
                        dropdownItems: dropDownKeyList,
                        captionKey: 'blockPageTitle',
                        valueKey: 'blockPageId',
                        handleOnClick: (e, eventType) => handleOnEventTriggered(e, eventType),
                    },
                }}
                dataSource={blocks}
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

            {modalOpen && (
                <>
                    {selectedBlock.key === 'INFORMATION_AREA' && (
                        <InformationAreaBlockForm
                            fieldKey={fieldKey}
                            blockData={selectedBlock}
                            setModalOpen={setModalOpen}
                            handleOnPressSave={handleOnPressModalSaveButton}
                        />
                    )}
                </>
            )}
        </>
    );
}
