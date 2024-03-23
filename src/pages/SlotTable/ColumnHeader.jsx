import React from 'react';
import { BsLink } from 'react-icons/bs';
const ColumnHeader = ({ data, setIconsStatus, iconsStatus }) => {
    const handleClick = () => {
        setIconsStatus((prev) => ({ ...prev, [data.data.columnIndex]: !prev[data.data.columnIndex] }));
    };
    return (
        <>
            <div>{data.data.column.caption}</div>
            <div
                className={`absolute top-[18px] right-[-17px] cursor-pointer z-50 overflow-visible  ${
                    iconsStatus[data.data.columnIndex] ? 'opacity-100' : 'opacity-0'
                }  hover:opacity-100 `}
            >
                <BsLink
                    onClick={handleClick}
                    color={iconsStatus[data.data.columnIndex] ? 'black' : 'gray-400'}
                    size={30}
                />
            </div>
        </>
    );
};

export default ColumnHeader;
