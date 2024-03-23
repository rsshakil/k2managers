import React from 'react';
import DateBox from 'devextreme-react/date-box';

export class FilterDateRangeTypeEditorComponent extends React.Component {
    constructor(props) {
        super(props);
        this.onValueChanged = this.onValueChanged.bind(this);
    }
    render() {
        return (
            <>
                <DateBox name="datetime1" defaultValue={this.props.data.value} onValueChanged={this.onValueChanged} width="auto" type="date"/> – <DateBox name="datetime2" defaultValue={this.props.data.value} onValueChanged={this.onValueChanged} width="auto" type="date"/>
            </>            
        )
    }
    onValueChanged(e) {
console.log("e value", e);
        this.props.data.setValue(e.value);
    }
}
