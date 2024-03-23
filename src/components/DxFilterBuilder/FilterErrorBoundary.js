import FilterBuilder from 'devextreme-react/filter-builder';
import React from 'react';

export default class FilterErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
        this.fields = props.fields;
        this.maxGroupLevel = props.maxGroupLevel;
        this.onValueChanged = props.onValueChanged;
        this.filterOperationDescriptions = props.filterOperationDescriptions;
        this.groupOperations = props.groupOperations;
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return (
                <>
                    <FilterBuilder
                        fields={this.fields}
                        maxGroupLevel={this.maxGroupLevel}
                        onValueChanged={this.onValueChanged}
                        filterOperationDescriptions={this.filterOperationDescriptions}
                        groupOperations={this.groupOperations}
                        allowHierarchicalFields={true}
                    ></FilterBuilder>
                </>
            );
        }
        return this.props.children;
    }
}
