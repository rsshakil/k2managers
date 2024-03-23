import TreeListCustom from "../shared/TreeListCustom";

export default function FreePagesTabContent({ activeTabItems = [], activePageId = "", handleOnEventTriggered = () => { } }) {


    return (
        <TreeListCustom
            config={{
                treeListClasses: 'custom-treelist free-page-tab-content truncate max-w-[608px]',
                noDataText: "",
                dragDropConfig: { allowDragDrop: true, handleOnOrderChange: (e, eventType, updatedItems) => handleOnEventTriggered(e, eventType, updatedItems) },
                showColumnHeaders: false,
                idKey: 'appPageId',
                defaultSelected: activePageId,
                clickableCells: ['appPageManagerName'],
                dragDirection: 'vertical', // Accepted Values: 'both' | 'horizontal' | 'vertical' => Default Value: 'both'

                handleOnCellPreapared: (e, eventType) => handleOnEventTriggered(e, eventType),

                allowAddMoreButton: !(activeTabItems.length > 47),
            }}
            addMoreConfig={{
                buttonType: "button",
                options: { buttonTitle: 'ページ追加（最大48ページ）', handleOnClick: (e, eventType) => handleOnEventTriggered(e, eventType) }
            }}
            dataSource={activeTabItems}
            columns={[{ dataField: "appPageManagerName", eventType: "cellClick", classes: "cursor-pointer truncate max-w-[478px] !w-[478px]", handleOnClick: ({ e, eventType, updatedItems }) => handleOnEventTriggered(e, eventType, updatedItems) }]}
            actionColumns={[
                { icon: "home", eventType: "home", handleOnClick: ({ e, eventType, updatedItems }) => handleOnEventTriggered(e, eventType, updatedItems) },
                { icon: "trash", eventType: "delete", handleOnClick: ({ e, eventType, updatedItems }) => handleOnEventTriggered(e, eventType, updatedItems) },
            ]}
        />
    )
}
