import { TagBox } from 'devextreme-react/tag-box';
import React, { useEffect, useState } from 'react';

export default function TagBoxComponentV4({
    dragList,
    count,
    displayExpr,
    valueExpr,
    preDefineTagBoxValue = [],
    pathName = 'routeName',
    tagBoxSessionStorageKey,
    placeholder,
    onChangeTagItems = () => { }
}) {
    const [tagBoxValue, setTagBoxValue] = useState(preDefineTagBoxValue);
    useEffect(() => {
        if (preDefineTagBoxValue == '' || preDefineTagBoxValue == []) {
            console.log("Should return")
            return;
        }
        setTagBoxValue(preDefineTagBoxValue);
    }, [preDefineTagBoxValue]);

    // tag box value change
    const tagBoxValueChange = (e) => {
        const onChangeValue = e.value;
        console.log("⚓⚓⚓onChangeValue", onChangeValue)
        // if (onChangeValue == '' || onChangeValue == []) {
        //     console.log("Break")
        //     return;
        // }
        setTagBoxValue(e.value);
        const sessionStorageKey = `${pathName}_timestamp_${count}`;
        sessionStorage.setItem(sessionStorageKey, JSON.stringify(onChangeValue));
        if (tagBoxSessionStorageKey) {
            tagBoxSessionStorageKey(sessionStorageKey);
        }
    };

    const handleOnChangeTags = (e) => {
        const { addedItems = [], removedItems = [] } = e;

        onChangeTagItems({ addedItems, removedItems });
    }

    return (
        <>
            <TagBox
                items={dragList}
                displayExpr={displayExpr ? displayExpr : 'Name'}
                valueExpr={valueExpr ? valueExpr : 'ID'}
                value={tagBoxValue}
                onValueChanged={(e) => tagBoxValueChange(e)}
                onSelectionChanged={handleOnChangeTags}
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
