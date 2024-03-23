import React from 'react';
import SelectBox from 'devextreme-react/select-box';
import { nowRangeCategories } from './query.js';
import ArrayStore from 'devextreme/data/array_store';

export class FilterRangeZeroEditorComponent extends React.Component {
    constructor(props) {
        super(props);
        this.categories = new ArrayStore({
            data: nowRangeCategories,
            key: 'id',
        });
        this.onValueChanged = this.onValueChanged.bind(this);
    }

    onValueChanged(e) {
        this.props.data.setValue(e.value && e.value.length ? e.value : null);
        this.props.data.valueText = 'test';
    }

    render() {
        return (
            <>
                <SelectBox
                    defaultValue={this.props.data.value}
                    dataSource={this.categories}
                    onValueChanged={this.onValueChanged}
                    width="368px"
                    displayExpr="name"
                    valueExpr="id"
                />
                    ～
                <SelectBox
                    defaultValue={this.props.data.value}
                    dataSource={this.categories}
                    onValueChanged={this.onValueChanged}
                    width="368px"
                    displayExpr="name"
                    valueExpr="id"
                />
            </>
        );
    }
}
