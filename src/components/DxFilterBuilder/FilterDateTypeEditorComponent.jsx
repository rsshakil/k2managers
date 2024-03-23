import React from 'react';
import DateBox from 'devextreme-react/date-box';

export class FilterDateTypeEditorComponent extends React.Component {
    constructor(props) {
        super(props);
        this.onValueChanged = this.onValueChanged.bind(this);
    }
    render() {
        return <DateBox defaultValue={this.props.data.value} onValueChanged={this.onValueChanged} width="auto" type="date"/>;
    }
    onValueChanged(e) {
        this.props.data.setValue(e.value);
    }
}
