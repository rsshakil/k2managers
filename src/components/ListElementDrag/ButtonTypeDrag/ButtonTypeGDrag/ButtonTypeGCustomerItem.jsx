import React from 'react';
import { BiSortAlt2 } from 'react-icons/bi';
import { BsFillPencilFill } from 'react-icons/bs';

export default function ButtonTypeGCustomerItem({
    handle, // handle is style for drag icon devextreme style
    item, // Rows for reorder
    style, // Component style
    setOpenEditModal, // Edit modal open by this props
}) {
    let className = 'item dx-theme-text-color dx-theme-background-color';
    if (handle) className += 'item-with-handle';

    return (
        <div className={`${className} hover:bg-cevenhover`} style={style}>
            <div className="flex flex-start mb-1 text-blue-100">
                {
                    <div className="w-[6%] flex align-middle items-center pl-2">
                        <BsFillPencilFill
                            onClick={() => {
                                setOpenEditModal(true);
                                sessionStorage.setItem('customer_template_edit', item.id);
                            }}
                        />
                    </div>
                }
                {<div className="w-[88%]">{item.name}</div>}
            </div>
        </div>
    );
}
