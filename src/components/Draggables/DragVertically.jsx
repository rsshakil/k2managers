import React from 'react';
import Draggable from 'react-draggable';
import { BiMoveVertical } from 'react-icons/bi';

const DragVertically = ({ children }) => {
    return (
        <>
            <Draggable axis="y" handle="span">
                <div className="flex items-center my-4">
                    <span className="cursor">
                        <BiMoveVertical size={30} className="cursor-pointer" />
                    </span>
                    {children}
                </div>
            </Draggable>
        </>
    );
};

export default DragVertically;
