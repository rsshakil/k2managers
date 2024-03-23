import React from 'react';
import TextBox from 'devextreme-react/text-box';

export class FilterMaxlengthEditorComponent extends React.Component {
    constructor(props) {
        super(props);
        this.onValueChanged = this.onValueChanged.bind(this);
    }

    onValueChanged(e) {
        this.props.data.setValue(e.value && e.value.length ? e.value : null);
    }

    render() {
        return <TextBox defaultValue={this.props.data.value} onValueChanged={this.onValueChanged} width="auto" />;
    }
}
