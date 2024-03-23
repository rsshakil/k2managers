import React, { useEffect, useState } from 'react';
import DragAppCsvImport from '../../../components/ListElementDrag/DragAppCsvImport';

export default function CsvImportOutputField({
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
    const [dragList, setDragList] = useState(initialValues?.csvImportTemplateColumn ?? []);
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

    useEffect(() => {
        try {
            setTimeout(() => {
                setLoading && setLoading(false);
            }, 4000);

            // Making button type f data for add screen
            if (formType == 'add') {
                const newButtonType = {
                    ...buttonType2,
                    buttonData: fieldRecords?.map((field) => {
                        return {
                            id: field.fieldId,
                            text: field.fieldName,
                            type: field.fieldType,
                            disabled: false,
                        };
                    }),
                };
                setButtonType(newButtonType);
                // setLoading && setLoading(false)
                setLoad(true);
            }

            // Making button type f data for edit screen
            if (formType == 'edit') {
                if (initialValues.csvImportTemplateColumn) {
                    let selectedFTypeItems = [...initialValues.csvImportTemplateColumn];
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
                        const fTypeButtonDataObject = {
                            id: el.fieldId,
                            text: el.fieldName,
                            type: el.fieldType,
                            disabled: flag === 1 ? true : false,
                        };
                        buttonTypeFEditScreenButtonData.push(fTypeButtonDataObject);
                    }

                    setButtonType({ ...buttonType2, buttonData: buttonTypeFEditScreenButtonData });
                    // setLoading && setLoading(false)
                }
                setLoad(true);
            }
        } catch (error) {
            setLoading && setLoading(false);
        }
    }, [fieldRecords]);

    useEffect(() => {
        try {
            setTimeout(() => {
                setLoading && setLoading(false);
            }, 4000);

            // Making button type f data for add screen
            if (formType == 'add') {
                const newButtonType = {
                    ...buttonType,
                    buttonData: fieldRecords2?.map((field) => {
                        return {
                            id: field.fieldId,
                            text: field.fieldName,
                            type: field.fieldType,
                            disabled: false,
                        };
                    }),
                };
                setButtonType2(newButtonType);
                // setLoading && setLoading(false)
                setLoad(true);
            }

            // Making button type f data for edit screen
            if (formType == 'edit') {
                if (initialValues.csvImportTemplateColumn) {
                    let selectedFTypeItems = [...initialValues.csvImportTemplateColumn];
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
                        const fTypeButtonDataObject = {
                            id: el.fieldId,
                            text: el.fieldName,
                            type: el.fieldType,
                            disabled: flag === 1 ? true : false,
                        };
                        buttonTypeFEditScreenButtonData.push(fTypeButtonDataObject);
                    }

                    setButtonType2({ ...buttonType, buttonData: buttonTypeFEditScreenButtonData });
                    // setLoading && setLoading(false)
                }
                setLoad(true);
            }
        } catch (error) {
            setLoading && setLoading(false);
        }
    }, [fieldRecords2]);

    useEffect(() => {
        setButtonType({
            ...buttonType,
            buttonItems: initialValues.csvImportTemplateColumn,
        });
        setDragList(initialValues.csvImportTemplateColumn);
        setLoad(true);
    }, [initialValues]);
    return (
        <>
            <DragAppCsvImport
                title={dragAppCSVTitle}
                dragList={initialValues.csvImportTemplateColumn ?? []}
                filterRecords={filterRecords}
                buttonType={{ ...buttonType }}
                buttonType2={{ ...buttonType2 }}
                controlDragDrop={controlDragDrop}
                load={load}
                setLoad={setLoad}
                openEditPencilModal={openEditPencilModal}
                stateInfoCsvImport={stateInfoCsvImport}
            />
        </>
    );
}
