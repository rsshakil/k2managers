import SelectBox from 'devextreme-react/select-box';
import ArrayStore from 'devextreme/data/array_store';
import React from 'react';

export class FilterListEditorComponent extends React.Component {
    constructor(props) {
        super(props);
        this.listData = new ArrayStore({ data: props.data.field.lookup.dataSource, key: 'value' });
        this.onValueChanged = this.onValueChanged.bind(this);
    }
    onValueChanged(e) {
        this.props.data.setValue(e.value && e.value.length ? e.value : null);
    }
    render() {
        return (
            <SelectBox
                defaultValue={this.props.data.value}
                dataSource={this.listData}
                onValueChanged={this.onValueChanged}
                width="368px"
                displayExpr="name"
                valueExpr="value"
            />
        );
    }
}
