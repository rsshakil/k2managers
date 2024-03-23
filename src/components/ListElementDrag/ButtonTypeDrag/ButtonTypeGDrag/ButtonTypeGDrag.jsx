import { ScrollView, Sortable } from 'devextreme-react';
import React, { useEffect, useState } from 'react';
import ButtonTypeGItem from './ButtonTypeGItem';
import style from './ButtonTypeGStyle.css';
import ButtonTypeGCustomerItem from './ButtonTypeGCustomerItem';

export default function ButtonTypeGDrag({
    controlDragDrop, // If you want to control the lable and rows element show
    dragList, // Array will come for reorder rows
    addLimit, // Drag limit will work efficiently if it is 60
    setOpenEditModal, // Edit modal props it will open edit modal by click pen icon
}) {
    const [state, setState] = useState({
        items: [...dragList], //array
        sortedItems: [...dragList], // if you want to sort the item by current position store value in this and show
        limit: addLimit ? addLimit : 60, // limit of drag list max is 60 otherwise application will slow down
        stateControlDragDrop: controlDragDrop
            ? controlDragDrop
            : {
                  grid: { name: 'grid grid-cols-12 gap-1' },
                  dragable: { show: true, space: 'col-span-1', header: '移動' }, //col-span-2
                  pen: { show: true, space: 'col-span-1', header: '編集' },
                  text: { show: true, space: 'col-span-8', header: '顧客一覧テンプレート' },
              },
        // Drag app state
        dropFeedbackMode: 'push',
        itemOrientation: 'vertical',
        dragDirection: 'vertical',
        scrollSpeed: 30,
        scrollSensitivity: 60,
        handle: '.handle',
        dragComponent: null,
        cursorOffset: null,
    });

    useEffect(() => {
        setState({ ...state, sortedItems: dragList });
    }, [dragList]);

    // On drag start and get the value from state
    const onDragStart = (e) => {
        e.itemData = state.sortedItems[e.fromIndex];
    };

    // drag row and organize
    const onReorder = (e) => {
        let { sortedItems, items } = state;
        sortedItems = [...sortedItems.slice(0, e.fromIndex), ...sortedItems.slice(e.fromIndex + 1)];
        sortedItems = [...sortedItems.slice(0, e.toIndex), e.itemData, ...sortedItems.slice(e.toIndex)];

        // will change the position of sorted array and show in webpage
        sortedItems.length > 0 &&
            sortedItems.map((item, i) => {
                if (item.currentPos) item.currentPos = sortedItems.indexOf(item);
            });
        setState({
            ...state,
            sortedItems: sortedItems,
        });
        const projectId = sessionStorage.getItem('currentProjectId');
        let keyName = 'customer_template_order_' + projectId;
        sessionStorage.setItem(
            `${keyName}`,
            JSON.stringify({
                sortedItems: sortedItems, // to local string
            })
        );
        // Changes in main array which will go to the backend
        for (let i = 0; i < items.length; i++) {
            const data = items[i];
            const { id } = data;
            const filterdTask = sortedItems.filter((sItem) => sItem.id === id);
            data.currentPos = filterdTask[0].currentPos;
        }
        // send update position array of data in backend
    };

    return (
        <div className="py-4"> 
            <div className={`flex flex-start mb-1 text-blue-100`}>
                {state.stateControlDragDrop.dragable.show && (
                    <div className="w-[6%]">
                        <p>{state.stateControlDragDrop.dragable.header}</p>
                    </div>
                )}
                {state.stateControlDragDrop.pen.show && (
                    <div className="w-[6%]">
                        <p>{state.stateControlDragDrop.pen.header}</p>
                    </div>
                )}
                {state.stateControlDragDrop.text.show && (
                    <div className="w-[88%]">
                        <p>{state.stateControlDragDrop.text.header}</p>
                    </div>
                )}
            </div>
            {/* grid layout end */}

            <ScrollView id="scroll" direction={state.itemOrientation} showScrollbar="always">
                <Sortable
                    id="list"
                    dropFeedbackMode={state.dropFeedbackMode}
                    itemOrientation={state.itemOrientation}
                    dragDirection="vertical"
                    scrollSpeed={state.scrollSpeed}
                    scrollSensitivity={state.scrollSensitivity}
                    handle=".handle"
                    dragComponent={state.dragComponent}
                    cursorOffset={state.cursorOffset}
                    onDragStart={onDragStart}
                    onReorder={onReorder}
                >
                    {controlDragDrop?
                        state.sortedItems.map((item) => (
                            <ButtonTypeGCustomerItem
                                key={item.id}
                                text={item.name}
                                handle={state.handle}
                                style={style}
                                item={item} // Every rows will go as a props and show
                                setOpenEditModal={setOpenEditModal} // Edit modal open by this props
                            />
                        ))
                    :
                    
                    state.sortedItems.map((item) => (
                        <ButtonTypeGItem
                            key={item.id}
                            text={item.name}
                            handle={state.handle}
                            style={style}
                            item={item} // Every rows will go as a props and show
                            setOpenEditModal={setOpenEditModal} // Edit modal open by this props
                        />
                    ))}
                </Sortable>
            </ScrollView>
        </div>
    );
}
