const dxSchedularConfig = {};

dxSchedularConfig.onAppointmentFormOpening = (e) => {
    dxSchedularConfig.getStartDateFromAppointmentForm = e.appointmentData.startDate;
    const { form } = e;

    let toolbarItems = e.popup.option('toolbarItems');
    toolbarItems.forEach((item) => { 
        if (item.options && item.options.text === 'Done') {
            item.options.text = '保存';
            item.onClick = null; 
        } else if (item.options && item.shortcut === 'Cancel') {
            item.options.text = 'キャンセル';
        }
    });
    e.popup.option('toolbarItems', toolbarItems);

    form.option('items', [
        {
            label: {
                text: '検診実施',
            },
            dataField: 'startDate',
            editorType: 'dxDateBox',
            colSpan: 2,
            editorOptions: {
                // width: "200%",
                type: 'date',
                readOnly: true,
            },
        },

        {
            label: {
                text: '検診受付開始日時',
            },
            dataField: 'resStartDate',
            editorType: 'dxDateBox',
            editorOptions: {
                width: '100%',
                type: 'datetime',
            },
        },
        {
            label: {
                text: '予約受付終了日時',
            },
            dataField: 'resEndDate',
            editorType: 'dxDateBox',
            editorOptions: {
                width: '100%',
                type: 'datetime',
            },
        },
    ]);

    e.cancel = typeof e.appointmentData?.cancel === 'undefined' ? true : false;
};

export default dxSchedularConfig;
