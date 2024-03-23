import React from 'react';
import TagBox from 'devextreme-react/tag-box';

const CustomerFieldSettingTagBox = (props) => {
    // TagBox CONFIGURATION START
    const onValueChanged = (e) => {
            props.data.setValue(e.value);
        },
        onSelectionChanged = () => {
            props.data.component.updateDimensions();
        };

    return (
        <TagBox
            dataSource={props.data.column.lookup.dataSource}
            defaultValue={props.data.value}
            valueExpr="CharacterTypeId"
            displayExpr="Name"
            applyValueMode="instantly"
            maxDisplayedTags={3}
            showMultiTagOnly={false}
            searchEnabled={false}
            showSelectionControls={false}
            onValueChanged={onValueChanged}
            onSelectionChanged={onSelectionChanged}
            placeholder="選択してください"
            selectAllText="すべて選択する"
        />
    );
};

export default CustomerFieldSettingTagBox;
