import React, { useEffect, useState } from 'react';
import DragAppCsv from '../../../components/ListElementDrag/DragAppCsv';

export default function CsvOutputField({
    fieldRecords,
    fieldRecords2,
    filterRecords,
    initialValues,
    setLoading,
    formType,
    stateInfoCsvImport = {},
    infoText: { buttonFTypeName, inputBoxHeader, dragAppCSVTitle, openEditPencilModal = 'csvExport' },
}) {
    // DRAG-APP state handle whole things START
    const [dragList, setDragList] = useState([]);
    const [buttonType, setButtonType] = useState({
        buttonName: buttonFTypeName,
        type: 'F',
        buttonData: [],
        buttonItems: [],
        placeholder: buttonFTypeName,
    });
    const [buttonType2, setButtonType2] = useState({
        buttonName: buttonFTypeName,
        type: 'F',
        buttonData: [],
        buttonItems: [],
        placeholder: buttonFTypeName,
    });
    const [controlDragDrop, setDragDrop] = useState({
        grid: { name: 'grid grid-cols-12 gap-1' },
        dragable: { show: true, space: 'col-span-1', header: '移動' }, //col-span-2
        checkbox1: { show: false, space: 'col-span-1', header: 'abc3' },
        info: { show: false, space: 'col-span-2', header: '' },
        info2: { show: false, space: 'col-span-6', header: '停留所住所' },
        task: { show: false, space: 'col-span-1', header: '' },
        checkbox2: { show: false, space: 'col-span-1', header: '' },
        inputBox: {
            show: true,
            space: 'col-span-9',
            header: inputBoxHeader,
            editable: false,
        },
        inputBox2: { show: false, space: 'col-span-10', header: 'abc5' },
        inputBox3: { show: false, space: 'col-span-3', header: '' },
        pen: { show: true, space: 'col-span-1', header: '編集' },
        trash: { show: true, space: 'col-span-1', header: '削除' },
    });

    const [load, setLoad] = useState(false);
    const [finalLoad, setFinalLoad] = useState(false);

    useEffect(() => {
        try {
            /*setTimeout(() => {
                setLoading && setLoading(false);
            }, 4000);*/

            // Making button type f data for add screen
            if (formType == 'add') {
                const newButtonType = {
                    ...buttonType2,
                    buttonData: fieldRecords?.map((field) => {
                        let textCaption = (field.fieldSpecialName !== undefined) ? field.fieldSpecialName : field.fieldName;
                        if (field.fieldManageName) textCaption += `（${field.fieldManageName}）`;

                        return {
                            id: field.fieldId,
                            text: textCaption,
                            fieldManageName: field.fieldManageName,
                            type: field.fieldType,
                            disabled: false,
                        };
                    }),
                };
                setButtonType(newButtonType);
            }

            // Making button type f data for edit screen
            if (formType == 'edit') {
                if (initialValues.csvExportTemplateColumn) {
                    let selectedFTypeItems = [...initialValues.csvExportTemplateColumn];
                    let buttonTypeFEditScreenButtonData = [];
                    // making f type button data
                    for (let i = 0; i < fieldRecords.length; i++) {
                        const el = fieldRecords[i];
                        let fieldId = el.fieldId;
                        // checking same id is there or not
                        let flag = 0;
                        for (let j = 0; j < selectedFTypeItems.length; j++) {
                            const el2 = selectedFTypeItems[j];
                            let selectedFTypeId = el2.fTypeId;
                            if (selectedFTypeId == fieldId) {
                                flag = 1;
                            }
                        }
                        // making object of every f type data for button
                        let textCaption = (el.fieldSpecialName !== undefined) ? el.fieldSpecialName : el.fieldName;
                        if (el.fieldManageName) textCaption += `（${el.fieldManageName}）`;

                        const fTypeButtonDataObject = {
                            id: el.fieldId,
                            text: textCaption,
                            fieldManageName: el.fieldManageName,
                            type: el.fieldType,
                            disabled: flag === 1 ? true : false,
                        };
                        buttonTypeFEditScreenButtonData.push(fTypeButtonDataObject);
                    }

                    setButtonType({ ...buttonType2, buttonData: buttonTypeFEditScreenButtonData });
                }
            }
            setLoad(true);
            setFinalLoad(true);
            setLoading && setLoading(false);
        } catch (error) {
            setLoading && setLoading(false);
            setFinalLoad(true);
        }
    }, [fieldRecords]);

    useEffect(() => {
        try {
            /*setTimeout(() => {
                setLoading && setLoading(false);
            }, 4000);*/

            // Making button type f data for add screen
            if (formType == 'add') {
                const newButtonType = {
                    ...buttonType,
                    buttonData: fieldRecords2?.map((field) => {
                        let textCaption = (field.fieldSpecialName !== undefined) ? field.fieldSpecialName : field.fieldName;
                        if (field.fieldManageName) textCaption += `（${field.fieldManageName}）`;

                        return {
                            id: field.fieldId,
                            text: textCaption,
                            fieldManageName: field.fieldManageName,
                            type: field.fieldType,
                            disabled: false,
                        };
                    }),
                };
                setButtonType2(newButtonType);
                // setLoading && setLoading(false)
                //setLoad(true);
            }

            // Making button type f data for edit screen
            if (formType == 'edit') {
                if (initialValues.csvExportTemplateColumn) {
                    let selectedFTypeItems = [...initialValues.csvExportTemplateColumn];
                    let buttonTypeFEditScreenButtonData = [];
                    // making f type button data
                    for (let i = 0; i < fieldRecords2.length; i++) {
                        const el = fieldRecords2[i];
                        let fieldId = el.fieldId;
                        // checking same id is there or not
                        let flag = 0;
                        for (let j = 0; j < selectedFTypeItems.length; j++) {
                            const el2 = selectedFTypeItems[j];
                            let selectedFTypeId = el2.fTypeId;
                            if (selectedFTypeId == fieldId) {
                                flag = 1;
                            }
                        }
                        // making object of every f type data for button
                        let textCaption = (el.fieldSpecialName !== undefined) ? el.fieldSpecialName : el.fieldName;
                        if (el.fieldManageName) textCaption += `（${el.fieldManageName}）`;

                        const fTypeButtonDataObject = {
                            id: el.fieldId,
                            text: textCaption,
                            fieldManageName: el.fieldManageName,
                            type: el.fieldType,
                            disabled: flag === 1 ? true : false,
                        };
                        buttonTypeFEditScreenButtonData.push(fTypeButtonDataObject);
                    }

                    setButtonType2({ ...buttonType, buttonData: buttonTypeFEditScreenButtonData });
                }
            }
            setLoad(true);
            setFinalLoad(true);
            setLoading && setLoading(false);
        } catch (error) {
            setLoading && setLoading(false);
            setFinalLoad(true);
        }
    }, [fieldRecords2]);

    useEffect(() => {
        setButtonType({
            ...buttonType,
            buttonItems: initialValues.csvExportTemplateColumn,
        });
        setButtonType2({
            ...buttonType2,
            buttonItems: initialValues.csvExportTemplateColumn,
        });
        setLoad(true);
        setFinalLoad(true);
    }, [initialValues]);
    return (
        <>
            {finalLoad && <DragAppCsv
                title={dragAppCSVTitle}
                dragList={dragList}
                filterRecords={filterRecords}
                buttonType={{ ...buttonType }}
                buttonType2={{ ...buttonType2 }}
                controlDragDrop={controlDragDrop}
                load={load}
                setLoad={setLoad}
                openEditPencilModal={openEditPencilModal}
                stateInfoCsvImport={stateInfoCsvImport}
            />}
        </>
    );
}
