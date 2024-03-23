import React, { useState, useEffect } from 'react';
import { TagBox } from 'devextreme-react/tag-box';
import DataSource from 'devextreme/data/data_source';

// PROPS INFO
// placeholder ---- REQUIRED
// projectId ---------- OPTIONAL for Role_add Screen --- need for SessionStorage
// uniqueIdentifier ---------- OPTIONAL for Role_add Screen --- need for SessionStorage

export default function TagBoxComponentV1({
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
    countTagBox,
    returnItem = () => {},
    attrKey = '',
    countTagBox1,
    setCoutTagBox1,
}) {
    const [tagBoxValue, setTagBoxValue] = useState(preDefineTagBoxValue);

    useEffect(() => {
        setTagBoxValue(preDefineTagBoxValue);
    }, [countTagBox]);

    const LSDragList = JSON.parse(localStorage.getItem('ButtonCTypeData'));

    useEffect(() => {
        const recentlyAddedItem = LSDragList && LSDragList[LSDragList.length - 1];

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

    const tagBoxValueChange = (e) => {
        const onChangeValue = e.value;
        setTagBoxValue(e.value);

        returnItem(e, onChangeValue, attrKey);

        if (pathName && projectId && uniqueIdentifier) {
            // If Role_add Screen
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

        let countTagBox1Array = [...countTagBox1];
        for (let i = 0; i < countTagBox1Array.length; i++) {
            if (countTagBox1Array[i].ID == countTagBox.ID) {
                countTagBox1Array[i].selectedDrag = onChangeValue;
            }
        }
        setCoutTagBox1(countTagBox1Array);
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
