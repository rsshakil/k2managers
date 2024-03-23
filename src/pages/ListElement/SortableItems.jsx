import React, { Component } from "react";
import {
    sortableContainer,
    sortableElement,
    sortableHandle
} from "react-sortable-hoc";
import { FaBuffer } from "react-icons/fa";
import { FaBroom } from "react-icons/fa";
import { FaGlassWhiskey } from "react-icons/fa";
 
import styles from "./index.module.css";
import arrayMove from "./arrayMove"; 

//Drag handler
const DragHandle = sortableHandle(() => (
    <span className={`${styles.dragHandler} border`}> 
        <FaBuffer />
    </span>
));

//Draggable elements
const SortableItem = sortableElement(({ value }) => (
    <div className={`${styles.dragElement} flex border`}>
        <DragHandle />
        <div className="flex flex-row">
            {value}
            <p className=" flex-initial w-64 flex ml-5 pl-5"> <FaBroom />Input Box</p>
            <p className=" flex-initial w-64 flex ml-5 pl-5"> <FaBroom />Input Box</p>
            <p className=" flex-initial w-64 flex ml-5 pl-5"> <FaBroom />Input Box</p>
            <p className=" flex-initial w-64 flex ml-5 pl-5"> <FaGlassWhiskey />Delete</p>
        </div>
    </div>
));

//Drag area
const SortableContainer = sortableContainer(({ children }) => {
    return <div className={styles.dragContainer}>{children}</div>;
});

class SortableItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: ["1", "2", "3", "4", "5", "6"]
        };
    }

    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState(({ items }) => ({
            items: arrayMove(items, oldIndex, newIndex)
        }));
    };

    render() {
        const { items } = this.state;

        return (
            <SortableContainer onSortEnd={this.onSortEnd} useDragHandle>
                {items.map((value, index) => (
                    <SortableItem key={`item-${index}`} index={index} value={value} />
                ))}
            </SortableContainer>
        );
    }
}

export default SortableItems;