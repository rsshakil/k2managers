import React, { useRef, useState } from 'react';
import { AiOutlineCopy } from 'react-icons/ai';

const TableRow = ({ listRecord }) => {
    const copyRef = useRef();
    const handleMouseUp = async (e) => {
        try {
            await window.navigator.clipboard.writeText(copyRef.current.innerText);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <tr className='h-8 table-row-bg row-display text-left'>
            <td className={`w-[24.325rem] px-2 right-border`}>{listRecord?.column}</td>
            <td className={`min-w-[37.5rem] px-2 right-border`}>
                <span ref={copyRef} >
                    {listRecord?.replacementTag}
                </span>
            </td>
            <td className={`w-[4.625rem] px-2 cursor-pointer`} onMouseUp={handleMouseUp}>
                <AiOutlineCopy className={`text-blue-100 m-auto`} />
            </td>
        </tr>
    );
};

export default TableRow;
