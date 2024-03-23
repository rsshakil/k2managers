import { TagBox } from 'devextreme-react/tag-box';
import React, { useEffect } from 'react';

const products = [
    { Id: 1, Name: 'メール ' },
    { Id: 2, Name: 'SMS' },
];

export default function TagBoxComponentV1({ tagBoxValue, setTagBoxValue, formType, initialValues }) {
    useEffect(() => {
        // tag box value set from api coming
        if (formType === 'edit') { 
            const eventMailFlag = initialValues.eventMailFlag;
            if (eventMailFlag) {
                if (eventMailFlag === 3) { 
                    setTagBoxValue([1, 2]);
                } else if (eventMailFlag === 2) { 
                    setTagBoxValue([2]);
                } else if (eventMailFlag === 1) { 
                    setTagBoxValue([1]);
                } else { 
                    setTagBoxValue([]);
                }
            }
        }
    }, []);

    // tag box value change
    const tagBoxValueChange = (e) => { 
        setTagBoxValue(e.value);
    };

    return (
        <>
            <TagBox
                dataSource={products}
                displayExpr={'Name'}
                valueExpr={'Id'}
                onValueChanged={(e) => tagBoxValueChange(e)}
                value={tagBoxValue}
                className="dx-tag-custom"
                showSelectionControls={true}
                noDataText="データがありません"
                placeholder={'選択してください'}
                selectAllText="すべて選択する"
                 
            />
        </>
    );
}

export function roleAddTagBoxSessionStorage(pathName, count, projectId, uniqueIdentifier, onChangeValue) {
    const sessionKey = `${pathName}_timestamp_${count}`;
    //const getSessionItem = sessionStorage.getItem(sessionKey);
    const getSessionItem = JSON.parse(sessionStorage.getItem(sessionKey));  

    getSessionItem.projectEvent.map((project) => {
        if (project.currentProjectId === projectId) {
            project[uniqueIdentifier] = onChangeValue;
        }
        return project;
    });
 
    sessionStorage.setItem(sessionKey, JSON.stringify(getSessionItem));
}
