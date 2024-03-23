import React from 'react';
import { ContextMenu, MenuItem } from 'react-contextmenu';
import classes from "./contextStyles.module.css";

export default function ContextMenuItem({ cmtID, menuItems, handleUseState, axisX, axisY}) {
    const handleClick = (e, data) => {
        handleUseState({
            clickID: cmtID && cmtID,
            menuID: data.keyIndex,
            menuName: data.value,
            x: axisX,
            y: axisY
        })
    }
    return (
        <>
            <ContextMenu className={classes.menu} id={cmtID}>
                {
                    menuItems && menuItems.map(([keyIndex, value], index) => (
                        <MenuItem
                            key={index}
                            data={{ keyIndex, value }}
                            onClick={handleClick}
                            className={classes.menuItemList}
                        >
                            {value}
                        </MenuItem>
                    ))
                }
            </ContextMenu>
        </>
    )
}