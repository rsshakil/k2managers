import { TagBox } from 'devextreme-react/tag-box';
import React, { useEffect, useState } from 'react';

export default function TagBoxComponent({
    dragList,
    functionMode,
    count,
    displayExpr,
    valueExpr,
    preDefineTagBoxValue = [],
    pathName = 'routeName',
    projectId,
    uniqueIdentifier,
    tagBoxSessionStorageKey,
    placeholder,
    returnItem = () => {},
    attrKey = '',
}) {
    const [tagBoxValue, setTagBoxValue] = useState(preDefineTagBoxValue);

    useEffect(() => {
        setTagBoxValue(preDefineTagBoxValue);
    }, preDefineTagBoxValue);

    const LSDragList = JSON.parse(localStorage.getItem('ButtonCTypeData'));

    useEffect(() => {
        const recentlyAddedItem = LSDragList && LSDragList[LSDragList.length - 1];

        // if there is data in drag list
        if (dragList) {
            const fMode = functionMode.mode;
            const fItem = functionMode.item;

            // if function mode is add it will automatically add new item in tagbox also select
            if (fMode == 'add') {
                localStorage.setItem(`ButtonCTypeData`, JSON.stringify([...dragList]));
            }
            if (fMode == 'delete') {
                const itemID = fItem.ID;
                const filterdTagBoxValue = tagBoxValue.filter((tbv) => tbv !== itemID);
                setTagBoxValue([...filterdTagBoxValue]);
                localStorage.setItem(`ButtonCTypeData`, JSON.stringify([...dragList]));
            }
        }
    }, [dragList]);

    // tag box value change
    const tagBoxValueChange = (e) => {
        const onChangeValue = e.value;
        setTagBoxValue(e.value);
        returnItem(e, onChangeValue, attrKey);
        if (pathName && projectId && uniqueIdentifier) {
            roleAddTagBoxSessionStorage(pathName, count, projectId, uniqueIdentifier, onChangeValue);
        } else if (pathName) {
            const sessionStorageKey = `${pathName}_timestamp_${count}`;
            sessionStorage.setItem(sessionStorageKey, JSON.stringify(onChangeValue));
            if (tagBoxSessionStorageKey) {
                tagBoxSessionStorageKey(sessionStorageKey);
            }
        } else {
            localStorage.setItem(`TagBox${count}`, JSON.stringify(onChangeValue)); // TODO: ::Use for management screen please use sessionStorage instance of localStorage
        }
    };
    return (
        <>
            <TagBox
                items={dragList}
                displayExpr={displayExpr ? displayExpr : 'Name'}
                valueExpr={valueExpr ? valueExpr : 'ID'}
                value={tagBoxValue}
                onValueChanged={(e) => tagBoxValueChange(e)}
                className="dx-tag-custom"
                showSelectionControls={true}
                noDataText="データがありません"
                selectAllText="すべて選択する"
                placeholder={placeholder ? placeholder : '選択してください'}
            />
        </>
    );
}

export function roleAddTagBoxSessionStorage(pathName, count, projectId, uniqueIdentifier, onChangeValue) {
    const sessionKey = `${pathName}_timestamp_${count}`; 
    const getSessionItem = JSON.parse(sessionStorage.getItem(sessionKey));

    getSessionItem.projectEvent.map((project) => {
        if (project.currentProjectId === projectId) {
            project[uniqueIdentifier] = onChangeValue;
        }
        return project;
    });

    sessionStorage.setItem(sessionKey, JSON.stringify(getSessionItem));
}
