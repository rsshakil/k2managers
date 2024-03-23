import { CheckBox } from 'devextreme-react/check-box';
import 'devextreme-react/text-area';
import React, { useEffect, useState } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import { BiSortAlt2 } from 'react-icons/bi';
import { BsFillPencilFill } from 'react-icons/bs';
import { FaTrash } from 'react-icons/fa';
import CalendarTimeInputBox from '../Calendar/16MonthsCalendar/CalendarForm/CalendarTimeInputBox.jsx';
import CustomerTemplate from './ExpandableComponents/CustomerTemplate';
import './style.css';

export default function Item({
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
    inputBox3OnBlur,
    stateControlDragDrop,
    deleteCTypeArray,
    deleteFTypeArray,
    openEditModal,
    searchItemValue,
}) {
    const [extendForm, setExtendForm] = useState(false);
    const [extendValue, setExtendValue] = useState();
    const [editFrom, setEditForm] = useState(false);
    const [editFrom2, setEditForm2] = useState(false);
    const pathname = window.location.pathname;
    const routeName = pathname.split('/').pop();
    let className = 'item dx-theme-text-color dx-theme-background-color';
    if (handle) {
        className += 'item-with-handle';
    }
    const rotate = extendForm ? 'rotate(135deg)' : 'rotate(0)';

    useEffect(() => {
        const itemValue = JSON.parse(sessionStorage.getItem(`customer_template_${item.Task_ID}`));
        setExtendValue(itemValue?.headerName);
    }, [extendValue]);

    return (
        <>
            {item.expandType === 'F' && (
                <div className={`${className} hover:bg-cevenhover`} style={style}>
                    <div className={`${stateControlDragDrop.grid.name} mb-1`}>
                        {stateControlDragDrop.dragable.show && (
                            <div className={`${stateControlDragDrop.dragable.space} `}>
                                {handle && (
                                    <div className="">
                                        {stateControlDragDrop?.dragable.show === false ? (
                                            <span></span>
                                        ) : (
                                            <i className="cursor-ns-resize handle !top-0 left-[4px]">
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
                                            routeName === 'csv_export_setting' || routeName === 'csv_import_setting'
                                                ? openEditModal(item)
                                                : setEditForm(editFrom ? false : true);
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
                                                    defaultValue={item?.inputBox?.value}
                                                    value={item?.inputBox?.value}
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
                                        <p
                                            className={`${item?.dragType == 'default' ? 'text-red-500' : 'text-blue-100'
                                                }`}
                                        >
                                            {stateControlDragDrop?.inputBox.show === false ? (
                                                <span></span>
                                            ) : (
                                                <span>{item?.inputBox?.value}</span>
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
                                        <div
                                            onClick={() => {
                                                if (stateControlDragDrop.info2.editable) {
                                                    setEditForm2(!editFrom2);
                                                }
                                            }}
                                        >
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
                        {stateControlDragDrop.inputBox3.show && (
                            <div className={`${stateControlDragDrop.inputBox3.space} `}>
                                {
                                    // editFrom ?
                                    <div className="">
                                        {stateControlDragDrop?.inputBox3.show === false ? (
                                            <span></span>
                                        ) : (
                                            <div className="">
                                                <input
                                                    className="appearance-none w-full h-8 p-2 outline-none border border-solid border-blue-100 bg-blue-25"
                                                    onBlur={(e) => {
                                                        inputBox3OnBlur(item, e);
                                                    }}
                                                    onChange={(e) => {
                                                        inputBox3OnBlur(item, e);
                                                    }}
                                                    id={item?.inputBox3?.id}
                                                    type="text"
                                                    defaultValue={item?.inputBox3?.value}
                                                    placeholder={stateControlDragDrop?.inputBox3.placeholder}
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
                        {stateControlDragDrop.trash.show && (
                            <div
                                className={`${stateControlDragDrop.trash.space
                                    } text-blue-100 flex justify-end pr-[2px] items-center ${item?.dragType == 'default' ? 'cursor-default' : 'cursor-pointer'
                                    } hover:text-blue-50`}
                            >
                                {item?.dragType != 'default' &&
                                    <p className="" onClick={() => deleteFTypeArray(item)}>
                                        <FaTrash />
                                    </p>
                                }
                            </div>
                        )}
                    </div>
                </div>
            )}

            {item.expandType === 'C' && (
                <div className={className} style={style}>
                    <div className={`${stateControlDragDrop.grid.name} mb-1`}>
                        <div className="col-span-1 ">
                            {handle && (
                                <div className="">
                                    {stateControlDragDrop?.dragable == false && <span></span>}
                                    {stateControlDragDrop?.dragable == true && (
                                        <i className="cursor-ns-resize handle">
                                            <BiSortAlt2 className="h-[22px] w-[22px]" />
                                        </i>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="col-span-9">
                            <div
                                className="flex relative h-8 justify-between items-center w-full text-left"
                                onClick={() => setExtendForm(!extendForm)}
                            >
                                <h1 className="text-blue-200">{item.Name} 移動とクローズできる部品</h1>
                                <div className="flex-grow border-t border-blue-100"></div>
                            </div>
                        </div>

                        <div className="col-span-1 hover:text-blue-50 cursor-pointer flex items-center text-blue-100">
                            <p className="" onClick={() => deleteCTypeArray(item)}>
                                <FaTrash />
                            </p>
                        </div>
                    </div>
                </div>
            )}
            {item.expandType === true && (
                <div className={className} style={style}>
                    <div className={`${stateControlDragDrop.grid.name} mb-1`}>
                        <div className="col-span-1 ">
                            {handle && (
                                <div className="">
                                    {stateControlDragDrop?.dragable === false ? (
                                        <span></span>
                                    ) : (
                                        <i className="cursor-ns-resize handle">
                                            <BiSortAlt2 className="h-[22px] w-[22px]" />
                                        </i>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="col-span-9">
                            <div
                                className="flex relative h-8 justify-between items-center w-full text-left"
                                onClick={() => setExtendForm(!extendForm)}
                            >
                                <h1 className="text-blue-100"> {extendValue || '列ヘッダー表示名'}</h1>
                                {/* <h1 className="text-blue-200"> {item.name ? item.name : `移動とクローズできる部品( ${extendForm ? "opened" : "closed"})`}  </h1> */}
                                <div className="flex-grow border-t border-blue-100"></div>
                            </div>
                        </div>
                        <div
                            className="col-span-1 flex justify-center hover:text-blue-50 cursor-pointer items-center text-center text-blue-100"
                            onClick={() => setExtendForm(!extendForm)}
                        >
                            <AiFillPlusCircle
                                className="h-[22px] w-[22px]"
                                style={{ transform: rotate, transition: 'all 0.4s linear' }}
                            />
                        </div>
                        <div className="col-span-1  flex items-center hover:text-blue-50 cursor-pointer text-blue-100">
                            <p className="" onClick={() => deleteForm(item)}>
                                <FaTrash />
                            </p>
                        </div>
                    </div>

                    {/* after expand start*/}
                    {extendForm ? (
                        <div className="">
                            {item.components.length > 0 ? (
                                <div className="">
                                    {item.components &&
                                        item.components.map((comp) => (
                                            <CustomerTemplate
                                                label={comp.label}
                                                item={item}
                                                setColorhandle={setColorhandle}
                                                changeItem={item}
                                                inputBoxItem={comp}
                                                defaultValue={comp.inputValue}
                                                extendForm={extendForm}
                                                setExtendValue={setExtendValue}
                                                onBlur={(e) => {
                                                    chagneColorInput(item, comp, e);
                                                }}
                                                style={{
                                                    color: comp.colorValue ? `rgba(${comp.colorValue})` : 'black',
                                                }}
                                                searchItemValue={searchItemValue}
                                            />
                                        ))}
                                </div>
                            ) : (
                                <span></span>
                            )}
                            {/* <div className="flex">
                                            <div className=" w-10/12">
                                                <input
                                                    className=" 
                                                appearance-none border 
                                                rounded w-full py-3 p
                                               leading-tight 
                                                focus:outline-none 
                                                focus:shadow-outline"
                                                    placeholder="これは入力フィールドです"
                                                    disabled
                                                />
                                            </div>
                                            <div className="border w-2/12">
                                                <ColorPicker />
                                            </div>
                                        </div>
                                        <div className="flex">
                                            <div className=" w-10/12">
                                                <input
                                                    className=" 
                                                appearance-none border 
                                                rounded w-full py-3 p
                                               leading-tight 
                                                focus:outline-none 
                                                focus:shadow-outline"
                                                    placeholder="これは入力フィールドです"
                                                    disabled
                                                />
                                            </div>
                                            <div className="border w-2/12">
                                                <ColorPicker />
                                            </div>
                                        </div>
                                        <div className="flex">
                                            <div className=" w-10/12">
                                                <input
                                                    className=" 
                                                appearance-none border 
                                                rounded w-full py-3 p
                                               leading-tight 
                                                focus:outline-none 
                                                focus:shadow-outline"
                                                    placeholder="これは入力フィールドです"
                                                    disabled
                                                />
                                            </div>
                                            <div className="border w-2/12">
                                                <ColorPicker />
                                            </div>
                                        </div> */}
                        </div>
                    ) : (
                        <span></span>
                    )}
                    {/* after expand end*/}
                </div>
            )}

            {item.expandType === false && (
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
                        {stateControlDragDrop.inputBox3.show && (
                            <div className={`${stateControlDragDrop.inputBox3.space} `}>
                                {
                                    // editFrom ?
                                    <div className="">
                                        {stateControlDragDrop?.inputBox3.show === false ? (
                                            <span></span>
                                        ) : (
                                            <div className="w-full">
                                                <CalendarTimeInputBox
                                                    timePicker={true}
                                                    timeValue={item?.inputBox3?.value}
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
                        {stateControlDragDrop.trash.show && (
                            <div
                                className={`${stateControlDragDrop.trash.space} text-blue-100 flex justify-end items-center cursor-pointer hover:text-blue-50`}
                            >
                                <p className="" onClick={() => deleteForm(item)}>
                                    <FaTrash />
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
