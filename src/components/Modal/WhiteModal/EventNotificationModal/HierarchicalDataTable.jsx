import React from 'react';
import TreeList, { Button, Column, Scrolling } from 'devextreme-react/tree-list';

export default function HierarchicalDataTable({ filedData }) {
    const dataSourceOptions = {
        store:
            filedData &&
            filedData.map((task) => {
                return task;
            }),
    };

    const isCopyIconVisible = (e) => {
        return e.row.data?.fieldCode !== '' ? true : false;
    };

    return (
        <>
            <TreeList
                height={340}
                className="hierarchicalDataTable border border-blue-100 max-h-full"
                id="tasks"
                keyExpr="Task_ID"
                parentIdExpr="Task_Parent_ID"
                dataSource={dataSourceOptions}
                showBorders={true}
                columnAutoWidth={true}
                wordWrapEnabled={true}
                sorting={{ mode: 'none' }}
                rowAlternationEnabled={true}
            >
                <Scrolling mode="virtual" rowRenderingMode="virtual" />
                <Column
                    className="cdx-Task-Subject bg-red-200"
                    dataField="fieldType"
                    caption="フィールドタイプ"
                    width={600}
                />
                <Column className="cdx-TaskAssigned-Employee-ID" dataField="fieldCode" caption="置換タグ" width={700} />
                <Column caption="コピー" type="buttons" width={74}>
                    <Button
                        icon="copy"
                        visible={isCopyIconVisible}
                        onClick={(e) => navigator.clipboard.writeText(e.row.data?.fieldCode)}
                    />
                </Column>
            </TreeList>
        </>
    );
}
