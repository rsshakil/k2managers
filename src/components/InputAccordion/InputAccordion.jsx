import React, { useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { FaTimesCircle } from 'react-icons/fa';
import Checkbox from '../Form/FormInputs/CheckboxInput';

const InputAccordion = ({ title, children }) => {
    const [open, setOpen] = useState(0);
    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };
    return (
        <>
            {/* -----Accordion header------ */}
            <div className="flex relative h-8 justify-between items-center w-[44rem] font-medium text-left text-blue-100">
                <div>
                    <Checkbox name={title} children={title} />
                </div>
                <div className="flex-grow border-t border-gray-50"></div>
                {open !== 1 && <AiOutlinePlusCircle className="cursor-pointer" onClick={() => handleOpen(1)} />}
                {open === 1 && <FaTimesCircle className="cursor-pointer" onClick={() => handleOpen(1)} />}
            </div>
            {/* ----------Accordion body----------- */}
            {open === 1 && <div className="p-5">{children}</div>}
        </>
    );
};

export default InputAccordion;
