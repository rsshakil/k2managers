const filterBuilderConfig = [];

filterBuilderConfig.overrideOnValueChanged = (e) => {
    if (e.dataField === 'OrderNumber') {
        const defaultValueChangeHandler = e.editorOptions.onValueChanged;
        e.editorOptions.onValueChanged = function (args) {
            if (args.value >= 2000 && args.value <= 4000) {
                defaultValueChangeHandler(args);
            } else {
                alert('Please, enter the value from this range 2000 - 4000');
                e.setValue(null);
            }
        };
    } else if (e.dataField === 'ID010') {
        const defaultValueChangeHandler = e.editorOptions.onValueChanged;
        e.editorOptions.onValueChanged = function (args) {
            if (args.value >= 2000 && args.value <= 4000) {
                defaultValueChangeHandler(args);
            } else {
                alert('Please,Coder Rank enter the value from this range 2000 - 4000');
                e.setValue(null);
            }
        };
    }
};

export default filterBuilderConfig;
