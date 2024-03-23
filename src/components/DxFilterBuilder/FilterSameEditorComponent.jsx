import React from 'react';
import SelectBox from 'devextreme-react/select-box';
import ArrayStore from 'devextreme/data/array_store';

export class FilterSameEditorComponent extends React.Component {
    constructor(props) {
        super(props);
        let data = JSON.parse(window.sessionStorage.getItem('field_parameter'));
        this.categories = new ArrayStore({
            data: data,
            key: 'id',
        });
        this.onValueChanged = this.onValueChanged.bind(this);
    }

    onValueChanged(e) {
        this.props.data.setValue(e.value && e.value.length ? e.value : null);
    }
    
    render() {
        return (
            <SelectBox
                defaultValue={this.props.data.value}
                dataSource={this.categories}
                onValueChanged={this.onValueChanged}
                width="512px"
                displayExpr="name"
                valueExpr="id"
            />
        );
    }
}
