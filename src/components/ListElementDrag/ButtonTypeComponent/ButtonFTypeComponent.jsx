import React, { useState } from 'react';
import { CheckBox } from 'devextreme-react';
import { BiSortAlt2 } from 'react-icons/bi';
import { BsFillPencilFill } from 'react-icons/bs';
import { FaTrash } from 'react-icons/fa';

export default function ButtonFTypeComponent({
    handle,
    style,
    item,
    deleteForm,
    handleEditForm,
    handleEditForm2,
    setColorhandle,
    checkbox1OnChange,
    checkbox2OnChange,
    chagneColorInput,
    inputBox2OnBlur,
    stateControlDragDrop,
    className,
    deleteCTypeArray,
}) {
    const [editFrom, setEditForm] = useState(false);
    const [editFrom2, setEditForm2] = useState(false);

    return (
        <>
            <p>TYPE F</p>
            <div className={`${className} hover:bg-cevenhover`} style={style}>
                <div className={`${stateControlDragDrop.grid.name} mb-1`}>
                    {stateControlDragDrop.dragable.show && (
                        <div className={`${stateControlDragDrop.dragable.space} `}>
                            {handle && (
                                <div className="">
                                    {stateControlDragDrop?.dragable.show === false ? (
                                        <span></span>
                                    ) : (
                                        <i className="cursor-ns-resize handle !top-0">
                                            <BiSortAlt2 className="h-[22px] w-[22px]" />
                                        </i>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {stateControlDragDrop.pen.show && (
                        <div className={`${stateControlDragDrop.pen.space} flex items-center `}>
                            {stateControlDragDrop?.pen.show === false ? (
                                <span></span>
                            ) : (
                                <BsFillPencilFill
                                    className="w-[20px] h-[20px] hover:text-blue-50 cursor-pointer text-blue-100"
                                    onClick={() => {
                                        setEditForm(editFrom ? false : true);
                                    }}
                                />
                            )}
                        </div>
                    )}
                    {stateControlDragDrop.checkbox1.show && (
                        <div className={`${stateControlDragDrop.checkbox1.space} flex !col-span-3`}>
                            {item.checkbox1 ? (
                                <div className="mr-6">
                                    {stateControlDragDrop?.checkbox1.show === false ? (
                                        <span></span>
                                    ) : (
                                        <CheckBox
                                            iconSize="24px"
                                            className={`${stateControlDragDrop.info.space} text-blue-100 border-none`}
                                            text={item.info}
                                            onValueChange={(e) => {
                                                checkbox1OnChange(item, item.checkbox1, e);
                                                setEditForm(false);
                                            }}
                                            value={!!item.checkbox1.checked}
                                        />
                                    )}
                                </div>
                            ) : (
                                <span></span>
                            )}
                        </div>
                    )}
                    {stateControlDragDrop.inputBox.show && (
                        <div className={`${stateControlDragDrop.inputBox.space} `}>
                            {editFrom ? (
                                <div className="">
                                    {stateControlDragDrop?.inputBox.show === false ? (
                                        <span></span>
                                    ) : (
                                        <div className="">
                                            <input
                                                className="appearance-none w-full h-8 p-2 outline-none border border-solid border-blue-100 bg-blue-25"
                                                id=""
                                                type="text"
                                                placeholder=""
                                                defaultValue={item.Task_Subject}
                                                onBlur={(e) => handleEditForm(e, item)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        handleEditForm(e, item);
                                                        setEditForm(false);
                                                    }
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div
                                    className="hover:bg-cevenhover"
                                    onClick={() => {
                                        if (stateControlDragDrop?.inputBox.editable === true) {
                                            setEditForm(!editFrom);
                                        }
                                    }}
                                >
                                    <p className="text-blue-100 ">
                                        {stateControlDragDrop?.inputBox.show === false ? (
                                            <span></span>
                                        ) : (
                                            <span>{item.Task_Subject}</span>
                                        )}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                    {
                        //info 2
                        stateControlDragDrop.info2.show && (
                            <div className={`${stateControlDragDrop.info2.space} `}>
                                {editFrom2 ? (
                                    <div className="">
                                        {stateControlDragDrop?.info2.show === false ? (
                                            <span></span>
                                        ) : (
                                            <div className="">
                                                <input
                                                    className="appearance-none w-full h-8 p-2 outline-none border border-solid border-blue-100 bg-blue-25"
                                                    id=""
                                                    type="text"
                                                    placeholder=""
                                                    defaultValue={item.info2}
                                                    onBlur={(e) => handleEditForm2(e, item)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            handleEditForm2(e, item);
                                                            setEditForm2(false);
                                                        }
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div onClick={() => setEditForm2(!editFrom2)}>
                                        <p className="text-blue-100 ">
                                            {stateControlDragDrop?.inputBox.show === false ? (
                                                <span></span>
                                            ) : (
                                                <span>{item.info2}</span>
                                            )}
                                        </p>
                                    </div>
                                )}
                            </div>
                        )
                    }
                    {stateControlDragDrop.inputBox2.show && (
                        <div className={`${stateControlDragDrop.inputBox2.space} `}>
                            {
                                // editFrom ?
                                <div className="">
                                    {stateControlDragDrop?.inputBox2.show === false ? (
                                        <span></span>
                                    ) : (
                                        <div className="">
                                            <input
                                                className="appearance-none w-full h-8 p-2 outline-none border border-solid border-blue-100 bg-blue-25"
                                                onBlur={(e) => {
                                                    inputBox2OnBlur(item, e);
                                                }}
                                                onChange={(e) => {
                                                    inputBox2OnBlur(item, e);
                                                }}
                                                id={item?.inputBox2?.id}
                                                type="text"
                                                value={item?.inputBox2?.value}
                                                placeholder={stateControlDragDrop?.inputBox2.placeholder}
                                            />
                                        </div>
                                    )}
                                </div>
                            }
                        </div>
                    )}

                    {stateControlDragDrop.checkbox2.show && (
                        <div className={`${stateControlDragDrop.checkbox2.space}  flex justify-center`}>
                            {item.checkbox2 ? (
                                <div>
                                    {stateControlDragDrop?.checkbox2.show === false ? (
                                        <span></span>
                                    ) : (
                                        <CheckBox
                                            iconSize="24px"
                                            onValueChange={(e) => {
                                                setEditForm(false);
                                                checkbox2OnChange(item, item.checkbox2, e);
                                            }}
                                            value={!!item.checkbox2.checked}
                                        />
                                    )}
                                </div>
                            ) : (
                                <span></span>
                            )}
                        </div>
                    )}
                    {/* checkbox 2 handle start */}
                    {/* trash delete handle row start */}
                    {stateControlDragDrop.trash.show && (
                        <div
                            className={`${stateControlDragDrop.trash.space} text-blue-100 flex justify-end items-center cursor-pointer hover:text-blue-50`}
                        >
                            <p className="">
                                <FaTrash />
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
