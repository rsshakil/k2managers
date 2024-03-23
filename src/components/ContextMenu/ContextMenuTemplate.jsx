import React, { useEffect, useState } from 'react';
import { ContextMenuTrigger } from 'react-contextmenu';
import UseTable from '../Table/UseTable';
import ContextMenuItem from './ContextMenuItem';
import { default as contextMenuItem } from './contextMenuItems';

const headerCellsTbl1 = [
    { label: 'clicked:ID', width: '10rem' },
    { label: 'clicked:MenuID', width: '10rem' },
    { label: 'clicked:Menu_name', minWidth: '10rem' },
    { label: 'called:X', width: '10rem' },
    { label: 'called:Y', width: '10rem' },
];
const headerCellsTbl2 = [
    { label: 'ID', width: '10rem' },
    { label: 'Menu Array', minWidth: '20rem' },
];
let cellObjectKey, entriesMenuItem, axisX, axisY;

export default function ContextMenuTemplate() {
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [clickId, setClickId] = useState('Last Values');
    const [menuId, setMenuId] = useState('Last Values');
    const [menuName, setMenuName] = useState('Last Values');

    const handleUseState = ({ clickID, menuID, menuName, x, y }) => {
        clickID && setClickId(clickID);
        menuID && setMenuId(menuID);
        menuName && setMenuName(menuName);
        x && setX(x);
        y && setY(y);
    };

    return (
        <>
            <Tbl1 clickId={clickId} menuID={menuId} menuName={menuName} axisX={axisX} axisY={axisY} />
            <br />
            <br />
            <br />
            <Tbl2 handleUseState={handleUseState} />
        </>
    );
}

const Tbl1 = ({ clickId, menuID, menuName, axisX, axisY }) => {
    const { TblContainer, TblHead } = UseTable(headerCellsTbl1);
    useEffect(() => {}, [axisX]);
    return (
        <>
            <TblContainer>
                <TblHead />
                <tbody>
                    {
                        <tr className="h-8 table-row-bg row-display text-left">
                            <td className="w-[10rem] right-border pl-2">{clickId && clickId}</td>
                            <td className="w-[10rem] right-border pl-2">{menuID && menuID}</td>
                            <td className="min-w-[10rem] right-border pl-2 ellipsis max-w-0">{menuName && menuName}</td>
                            <td className="w-[10rem] right-border pl-2">{axisX & axisX}</td>
                            <td className="w-[10rem] right-border pl-2">{axisY & axisY}</td>
                        </tr>
                    }
                </tbody>
            </TblContainer>
        </>
    );
};

const Tbl2 = ({ handleUseState }) => {
    const { TblContainer, TblHead } = UseTable(headerCellsTbl2);
    function getCellItem(cellItem) {
        cellObjectKey = cellItem[0]; // Cell ClickedID/CellName
        Object.entries(
            cellItem[1].map(
                (menuItem) =>
                    (entriesMenuItem = Object.entries(menuItem)) // Object to Array
            )
        );
    }

    const handleAxis = (e) => {
        axisX = e.clientX;
        axisY = e.clientY;
    };
    return (
        <>
            <TblContainer>
                <TblHead />
                <tbody>
                    {contextMenuItem &&
                        contextMenuItem.map((itemObj, index) => (
                            <tr key={index} className="h-8 table-row-bg row-display text-left">
                                {
                                    Object.entries(itemObj).map((cellItem) => getCellItem(cellItem)) // {/* Find the Object KEY from the Array of Object */}
                                }
                                <ContextMenuTrigger
                                    renderTag="td"
                                    id={cellObjectKey}
                                    attributes={{
                                        className: 'w-[10rem] right-border pl-2',
                                        onClick: (e) =>
                                            handleUseState({
                                                clickID: Object.entries(itemObj).map((cellItem) => cellItem[0]),
                                            }),
                                        onContextMenu: (e) => handleAxis(e),
                                    }}
                                >
                                    {cellObjectKey}
                                </ContextMenuTrigger>

                                <ContextMenuItem
                                    cmtID={cellObjectKey}
                                    menuItems={entriesMenuItem}
                                    handleUseState={handleUseState}
                                    axisX={axisX}
                                    axisY={axisY}
                                />

                                <td className="min-w-[20rem] right-border pl-2 ellipsis max-w-0">
                                    {Array.from(entriesMenuItem, ([ele, value]) => `${ele} : ${value}, `)}
                                </td>
                            </tr>
                        ))}
                </tbody>
            </TblContainer>
        </>
    );
};
