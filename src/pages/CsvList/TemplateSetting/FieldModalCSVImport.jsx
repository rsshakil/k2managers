import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import BlockModalFooter from '../../../components/AppDesignComponent/blockModals/BlockModalFooter';
import TagBoxComponentV1 from '../../../components/ManagementItem/TagBoxComponentV1';
import ModalTitle from '../../../components/Modal/components/ModalTitle';
import WhiteModalWrapper from '../../../components/Modal/components/WhiteModalWrapper';
import InputContainer from '../../../components/Wrapper/InputContainer';
import './fieldModal.css';

export default function FieldModalCSVImport({
    filterRecords,
    fieldRecords,
    blockData = '',
    setModalOpen = () => {},
    handleOnPressSave = () => {},
    fieldKey = '',
}) {
    const [formData, setFormData] = useState(blockData);

    const pathName = window.location.pathname;
    const routeName = pathName.split('/').pop();
    const [dragList, setDragList] = useState([]);

    const [tagBoxItems, setTagBoxItems] = useState([]);
    const [displayControlVal, setDisplayControlVal] = useState(0);
    // Tag box handle state
    const [functionMode, setFunctionMode] = useState({ mode: '', item: {} });
    const [countTagBox1, setCoutTagBox1] = useState([]);

    const [buttonType, setButtonType] = useState({
        buttonName: 'フィルターを追加する',
        type: 'F',
        buttonData: [],
        buttonItems: [],
        placeholder: 'フィルターを追加する',
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
            space: 'col-span-7',
            header: 'フィルター',
            editable: false,
        },
        inputBox2: { show: false, space: 'col-span-10', header: 'abc5' },
        inputBox3: { show: true, space: 'col-span-3', header: '値' },
        pen: { show: false, space: 'col-span-1', header: '編集' },
        trash: { show: true, space: 'col-span-1', header: '削除' },
    });
    const sessionStorageDragKey = `${routeName}_drag`;

    useEffect(() => {
        setTagBoxItems(filterRecords);
    }, []);

    useEffect(() => {
        if (formData) {
            let displayControlVal = Number(formData.displayControl);
            setDisplayControlVal(displayControlVal);
        }
    }, [formData]);

    // DRAG-APP state handle whole things END
    useEffect(() => {
        try {
            setTimeout(() => {
                //setLoading && setLoading(false)
            }, 3000);

            const targetDragItem = JSON.parse(sessionStorage.getItem(sessionStorageDragKey)).find(
                (item) => item.fTypeId == formData.fTypeId
            );
            const selectedItemsIdArr = [];
            if (targetDragItem) {
                targetDragItem?.innerDrag &&
                    targetDragItem.innerDrag.forEach((item) => {
                        selectedItemsIdArr.push(item.fTypeId);
                    });
            }
            const newButtonType = {
                ...buttonType,
                buttonData: filterRecords?.map((filter) => {
                    return {
                        id: filter.filterId,
                        text: filter.filterName,
                        disabled: selectedItemsIdArr.includes(filter.filterId),
                    };
                }),
                buttonItems: typeof targetDragItem !== 'undefined' ? targetDragItem.innerDrag : '',
            };
            setButtonType(newButtonType);
            // setLoading && setLoading(false)
        } catch (error) {
            console.log('AddedCSVExportModal Error F Type Button Update', error);
        }
    }, [filterRecords, displayControlVal === 1]);

    function handleOnchange(e) {
        const name = e.target.name;
        const value = e.target.value;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    return (
        <WhiteModalWrapper width="border-none text-black" className="items-start">
            <ModalTitle title={`${formData?.inputBox.value}フィルター編集`} className="text-blue-100 text-xl" />

            <Formik enableReinitialize={true} initialValues={formData}>
                <div className="relative w-full h-full">
                    <Form onChange={handleOnchange}>
                        <div className="body-height3 pt-12 px-10 min-h-[calc(100vh-452px)] !p-0">
                            <div className="flex flex-col py-10">
                                <div className="w-full">
                                    <label htmlFor="tagBox" class="text-blue-100">
                                        フィルター設定
                                    </label>
                                    <InputContainer>
                                        <TagBoxComponentV1
                                            valueExpr="filterId"
                                            displayExpr="filterName"
                                            placeholder="選択してください"
                                            key={'tag_box1'}
                                            count={'tag_box1_' + formData.fTypeId}
                                            dragList={tagBoxItems}
                                            preDefineTagBoxValue={formData.tagBoxValue}
                                            functionMode={functionMode}
                                            pathName={routeName}
                                            countTagBox1={countTagBox1}
                                            setCoutTagBox1={setCoutTagBox1}
                                            //countTagBox={ctb}
                                            id="tagBox"
                                        />
                                    </InputContainer>
                                </div>
                            </div>
                        </div>

                        <BlockModalFooter
                            setModalOpen={() => setModalOpen(false)}
                            handleOnPressSave={(e) => handleOnPressSave(e, formData)}
                        />
                    </Form>
                </div>
            </Formik>
        </WhiteModalWrapper>
    );
}
