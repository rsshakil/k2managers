import React, { useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

import ButtonTypeGDrag from '../ButtonTypeDrag/ButtonTypeGDrag/ButtonTypeGDrag';

// Call API and get the data it should be an array and it will pass the ButtonTypeGDrag
const array = [
    { id: 32, name: 'タイトル名ABCD００5' },
    { id: 34, name: 'タイトル名ABCD００6' },
    { id: 35, name: 'タイトル名ABCD００7' },
    { id: 36, name: 'タイトル名ABCD００8' },
    { id: 37, name: 'タイトル名ABCD００9' },
    { id: 38, name: 'タイトル名ABCD０10' },
    { id: 39, name: 'タイトル名ABCD０11' },
];

export default function ButtonGTypeComponent({
    buttonTitle,
    data,
    ComponentAddModal,
    ComponentEditModal,
    openModal,
    setOpenModal,
    openEditModal,
    setOpenEditModal,
    controlDragDrop,
}) {
    const [dragList, setDragList] = useState([]); // array data will dynamic it will come from api

    useEffect(() => {
        const getDummyArray = data || JSON.parse(localStorage.getItem('customerDragDummyArray'));
        if (getDummyArray) {
            setDragList([
                ...getDummyArray.map((template) => ({
                    id: controlDragDrop?template?.customerEditTemplateId:template?.customerViewTemplateId,
                    name: controlDragDrop?template?.customerEditTemplateName:template?.customerViewTemplateName,
                })),
            ]);
        } else {
            //setDragList([...array]);
        }
        const projectId = sessionStorage.getItem('currentProjectId');
        let keyName = 'customer_template_order_' + projectId;
        sessionStorage.setItem(
            `${keyName}`,
            JSON.stringify({
                sortedItems: dragList, // to local string
            })
        );
    }, [openModal, data]);
    return (
        <>
            <div className="mb-4">
                <ButtonTypeGDrag
                    controlDragDrop={controlDragDrop}
                    dragList={dragList} // Drag list to reorder the rows
                    setOpenEditModal={setOpenEditModal} // Open edit modal set state props passing
                />

                <div className="flex justify-center align-middle hover:bg-blue-400 items-center bg-blue-25 !cursor-pointer text-blue-100 border border-all h-[32px]">
                    <AiOutlinePlus className="h-[22px] w-[22px] z-10 mr-[-32px]" />
                    <button type="button" className="w-full cursor-pointer" onClick={() => setOpenModal(true)}>
                        {buttonTitle ? buttonTitle : 'G TYPE MODAL'}
                    </button>
                </div>
                {/* Button type G drag and show end*/}
            </div>

            {openModal == true && ComponentAddModal}
            {openEditModal && ComponentEditModal}
        </>
    );
}
