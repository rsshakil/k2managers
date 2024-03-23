import DataGrid, { Column, Editing, Lookup } from 'devextreme-react/data-grid';
import React from 'react';
import CustomerFieldSettingTagBox from './CustomerFieldSettingTagBox';
import { systemFieldDataSource, tagBoxDataSource } from './storeService/data';

export default function SystemFieldSettingTable() {
    // dxDataGrid CONFIGURATION START
    const cellTemplate = (container, options) => {
            const noBreakSpace = '\u00A0';
            const text = (options.value || [])
                .map((element) => options.column.lookup.calculateCellValue(element))
                .join(', ');
            container.textContent = text || noBreakSpace;
            container.title = text;
        },
        calculateFilterExpression = (filterValue, _selectedFilterOperation, target) => {
            if (target === 'search' && typeof filterValue === 'string') {
                return [this.dataField, 'contains', filterValue];
            }
            return function (data) {
                return (data.AssignedEmployee || []).indexOf(filterValue) !== -1;
            };
        };
    // dxDataGrid CONFIGURATION END
    return (
        <>
            <DataGrid
                id="systemFieldSettingDataGrid"
                dataSource={systemFieldDataSource}
                rowAlternationEnabled={true}
                showBorders={true}
                sorting={{ mode: 'none' }}
            >
                <Editing mode="cell" allowUpdating={true} allowAdding={true} />
                <Column dataField="FieldName" caption="フィールド名" dataType="string" />
                <Column
                    dataField="CharacterType"
                    caption="文字種"
                    allowSorting={false}
                    editCellComponent={CustomerFieldSettingTagBox}
                    cellTemplate={cellTemplate}
                    calculateFilterExpression={calculateFilterExpression}
                >
                    <Lookup dataSource={tagBoxDataSource} valueExpr="CharacterTypeId" displayExpr="Name" />
                </Column>
                <Column dataField="MinimumCharacters" caption="最小文字数" dataType="string" width="160" />
                <Column dataField="MaximumCharacters" caption="最大文字数" dataType="string" width="160" />
            </DataGrid>
        </>
    );
}
