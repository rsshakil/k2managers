import TreeList, { Column, RowDragging, Editing, Button, Lookup } from "devextreme-react/tree-list";
import { AiOutlinePlus } from "react-icons/ai";
import { v4 as uuid } from 'uuid';

const expandedRowKeys = [1];

export default function TreeListCustom({ config = {}, dataSources = [], columns = [], actionColumns = [], handleOnAction = () => { } }) {
  const {
    allowDragDrop = true,
    showColumnHeaders = true,
    idKey = "ID",
    allowAddMoreButton = true,
    addMoreButtonTitle = '',
  } = config;

  function onDragChange(e) {
    const visibleRows = e.component.getVisibleRows();
    const sourceNode = e.component.getNodeByKey(e.itemData[idKey]);
    let targetNode = visibleRows[e.toIndex].node;

    while (targetNode && targetNode.data) {
      if (targetNode.data[idKey] === sourceNode.data[idKey]) {
        e.cancel = true;
        break;
      }
      targetNode = targetNode.parent;
    }
  }

  function onReorder(e) {
    const visibleRows = e.component.getVisibleRows();
    let sourceData = e.itemData;
    const sourceIndex = dataSources.indexOf(sourceData);

    if (e.dropInsideItem) {
      sourceData = { ...sourceData, Head_ID: visibleRows[e.toIndex].key };
      dataSources = [
        ...dataSources.slice(0, sourceIndex),
        sourceData,
        ...dataSources.slice(sourceIndex + 1)
      ];
    }
    else {
      const toIndex = e.fromIndex > e.toIndex ? e.toIndex - 1 : e.toIndex;
      let targetData = toIndex >= 0 ? visibleRows[toIndex].node.data : null;

      

      dataSources = [
        ...dataSources.slice(0, sourceIndex),
        ...dataSources.slice(sourceIndex + 1)
      ];

      const targetIndex = dataSources.indexOf(targetData) + 1;
      dataSources = [
        ...dataSources.slice(0, targetIndex),
        sourceData,
        ...dataSources.slice(targetIndex)
      ];
    }

    handleOnAction(e, 'orderChange', dataSources);
  }


  const addMoreButton = (
    <div className="mt-4 flex justify-center align-middle hover:bg-blue-400 items-center bg-blue-25 !cursor-pointer text-blue-100 border border-all h-[32px]">
      <AiOutlinePlus className="h-[22px] w-[22px] z-10 mr-[-32px]" />
      <button type="button"
        onClick={(e) => { handleOnAction(e, 'add') }}
        className='w-full cursor-pointer'
      >
        {addMoreButtonTitle}
      </button>
    </div>
  )

  return (
    <>
      <TreeList
        className="custom-treelist"
        dataSource={dataSources}
        showColumnHeaders={showColumnHeaders}
        showColumnLines={false}
        keyExpr={idKey}
        showRowLines={true}
        showBorders={true}
        parentIdExpr="Head_ID"
        defaultExpandedRowKeys={expandedRowKeys}
        columnAutoWidth={true}
        levelLimit={0}
        autoExpandAll={true}
        onCellPrepared={(e) => handleOnAction(e, 'updateRowStyle')}
        onCellClick={(e) => handleOnAction(e, 'cellClick')}
      >

        {allowDragDrop && (<RowDragging
          onDragChange={onDragChange}
          onReorder={onReorder}
          allowDropInsideItem={false}
          allowReordering={true}
          showDragIcons={true}
          dataField="dragIcon"
        />)}


        {columns.map(column => <Column key={uuid()} dataField={column.dataField} cssClass={column.classes}>
          
        </Column>
        )}


        {actionColumns.length > 0 && (
          <Column type="buttons" dataField="action">
            {actionColumns.map(item => <Button key={uuid()} icon={item.icon} onClick={(e) => item.handleOnClick(e)} />)}
          </Column>
        )}
      </TreeList>


      {allowAddMoreButton && addMoreButton}
    </>
  );
}