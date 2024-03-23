import { useEffect, useRef, useState } from 'react';
import TreeList, { Column, RowDragging } from 'devextreme-react/tree-list';
import CheckBox from 'devextreme-react/check-box';

import TreeView, { Item } from 'devextreme-react/tree-view';
import Sortable from 'devextreme-react/sortable';

import service from './data.js';
// import { employees as employeeList } from "./data.js";
import './EmployeeStyle.css';
import { BiSortAlt2 } from 'react-icons/bi';

const expandedRowKeys = [1];

const EmployeeList = ({
    dragList,
    functionMode,
    customClass,
    selectedEventItemTreeListSessionKey, selectedEventItemSessionKey, dependencyRun,
    noDataText = 'No data to display',
}) => {
    const treeViewDriveCRef = useRef(null);
    const treeViewDriveDRef = useRef(null);

    const [state, setState] = useState({
        itemsDriveC: dragList?.length > 0 ? [...dragList] : [],
        itemsDriveD: service.getItemsDriveD(),
    });

    const LSDragList = JSON.parse(localStorage.getItem('ButtonCTypeData'));

    useEffect(() => {
        try {
            let previousArray = state.itemsDriveC;
            if (functionMode.mode == 'add') {
                setTimeout(() => {
                    // let recentAddedItem = dragList[dragList.length - 1];
                    let dragListData = JSON.parse(sessionStorage.getItem(selectedEventItemSessionKey));
                    let recentAddedItem = dragListData[dragListData.length - 1];
                    if (recentAddedItem) {

                        // console.log("🧑‍💻 🧑‍💻 Previous Array:", previousArray)
                        previousArray.push(recentAddedItem);
                        sessionStorage.setItem(selectedEventItemTreeListSessionKey, JSON.stringify([...previousArray]));
                        setState({ ...state, itemsDriveC: [...previousArray] });
                    }
                }, 500)
            }

            if (functionMode.mode == 'delete') {
                const deleteId = functionMode.item.ID;

                let itemArr = [];
                if (previousArray.length > 0) {
                    previousArray.forEach((prevArr) => {
                        if (prevArr.ID == deleteId) {
                            let item = prevArr.items;

                            if (item.length > 0) {
                                item.forEach((i) => delete i.HeadID);
                                itemArr = [...item];
                            }

                            const index = previousArray.indexOf(prevArr);
                            if (index > -1) {
                                // only splice array when item is found
                                previousArray.splice(index, 1); // 2nd parameter means remove one item only
                            }
                        }

                        let items = [...prevArr.items];
                        if (items.length > 0) {
                            items.forEach((item) => {
                                if (item.ID == deleteId) {
                                    const index = items.indexOf(item);
                                    if (index > -1) {
                                        // only splice array when item is found
                                        items.splice(index, 1); // 2nd parameter means remove one item only
                                    }
                                }
                            });
                        }
                        prevArr.items = items;
                    });
                }

                const storedArray = [...previousArray, ...itemArr];

                sessionStorage.setItem(selectedEventItemTreeListSessionKey, JSON.stringify(storedArray));

                setState({ ...state, itemsDriveC: [...storedArray] });
            }

            if (functionMode.mode === 'array') {
                if (functionMode.item?.length > 0) {
                    sessionStorage.setItem(selectedEventItemTreeListSessionKey, JSON.stringify([...functionMode.item]));
                    setState({ ...state, itemsDriveC: [...functionMode.item] });
                } else {
                    setState({ ...state, itemsDriveC: [] });
                    sessionStorage.setItem(selectedEventItemTreeListSessionKey, JSON.stringify([]));
                }
            }
            //TODO: REMOVE THIS lin kon 16-3-23
            // setComponentRender3(false) // render end loader will hide to the parent component
            // console.log("🔄️🔄️🔄️ setComponentRender3 = false, loader end from Emp list ")
        } catch (error) {
            console.log('employee list error in useEffect', error);
        }
    }, [dragList, functionMode.mode, dependencyRun]);

    // on drag change
    function onDragChange(e) {
        if (e.fromComponent === e.toComponent) {
            const fromNode = findNode(getTreeView(e.fromData), e.fromIndex);
            const toNode = findNode(getTreeView(e.toData), calculateToIndex(e));

            if (toNode !== null && isChildNode(fromNode, toNode)) {
                e.cancel = true;
            }
        }
    }

    // after drag end
    function onDragEnd(e) {
        if (e.fromComponent === e.toComponent && e.fromIndex === e.toIndex) {
            return;
        }

        const fromTreeView = getTreeView(e.fromData);
        const toTreeView = getTreeView(e.toData);
        const fromNode = findNode(fromTreeView, e.fromIndex);
        const toNode = findNode(toTreeView, calculateToIndex(e));

        const fromNodeContainChildren = fromNode.items;
        const fromNodeChildrenLen = fromNodeContainChildren.length;

        const fromNodeHasToKeyNode = fromNode;

        const HeadID = toNode?.itemData?.HeadID;

        if (e.dropInsideItem && fromNodeChildrenLen !== 0) {
            return;
        }
        if (fromNodeChildrenLen !== 0 && toNode?.parent) {
            return;
        }

        if (e.dropInsideItem && toNode !== null && !toNode.itemData.isDirectory) {
            return;
        }

        const fromTopVisibleNode = getTopVisibleNode(e.fromComponent);
        const toTopVisibleNode = getTopVisibleNode(e.toComponent);

        const fromItems = state[getStateFieldName(e.fromData)];
        const toItems = state[getStateFieldName(e.toData)];
        // Move node function
        moveNode(fromNode, toNode, fromItems, toItems, e.dropInsideItem);

        toItems.forEach((tI) => {
            tI.HeadID && delete tI.HeadID;
            tI.isDirectory = true;
        });

        sessionStorage.setItem(selectedEventItemTreeListSessionKey, JSON.stringify(toItems));

        setState({
            [getStateFieldName(e.fromData)]: [...fromItems],
            [getStateFieldName(e.toData)]: [...toItems],
        });
        if (fromTreeView.scrollToItem) {
            fromTreeView.scrollToItem(fromTopVisibleNode);
        }
        if (toTreeView.scrollToItem) {
            toTreeView.scrollToItem(toTopVisibleNode);
        }
    }

    function getTreeView(driveName) {
        return driveName === 'driveC' ? treeViewDriveC : treeViewDriveD;
    }

    function getStateFieldName(driveName) {
        return driveName === 'driveC' ? 'itemsDriveC' : 'itemsDriveD';
    }

    function calculateToIndex(e) {
        if (e.fromComponent !== e.toComponent || e.dropInsideItem) {
            return e.toIndex;
        }

        return e.fromIndex >= e.toIndex ? e.toIndex : e.toIndex + 1;
    }

    function findNode(treeView, index) {
        const nodeElement = treeView().element().querySelectorAll('.dx-treeview-node')[index];
        if (nodeElement) {
            return findNodeById(treeView().getNodes(), nodeElement.getAttribute('data-item-id'));
        }

        return null;
    }

    function findNodeById(Pnodes, id) {
        let nodes = [...Pnodes];

        for (let i = 0; i < nodes.length; i += 1) {
            if (nodes[i].itemData.id == id) {
                return nodes[i];
            }
            if (nodes[i].children) {
                const node = findNodeById(nodes[i].children, id);
                if (node != null) {
                    return node;
                }
            }
        }
        return null;
    }

    // Moving node here
    function moveNode(fromNode, toNode, fromItems, toItems, isDropInsideItem) {
        const toNodeKey = toNode?.key;

        fromNode.itemData.HeadID = toNodeKey;
        fromNode.itemData.isDirectory = false;

        const fromNodeContainingArray = getNodeContainingArray(fromNode, fromItems);

        const fromIndex = fromNodeContainingArray.findIndex((item) => item.id === fromNode?.itemData.id);
        fromNodeContainingArray.splice(fromIndex, 1);

        if (isDropInsideItem) {
            toNode.itemData.items.splice(toNode.itemData.items.length, 0, fromNode.itemData);
        } else {
            const toNodeContainingArray = getNodeContainingArray(toNode, toItems);
            const toIndex =
                toNode === null
                    ? toNodeContainingArray.length
                    : toNodeContainingArray.findIndex((item) => item.id === toNode.itemData.id);
            toNodeContainingArray.splice(toIndex, 0, fromNode.itemData);
        }
    }

    function getNodeContainingArray(node, rootArray) {
        return node === null || node.parent === null ? rootArray : node.parent.itemData.items;
    }

    function isChildNode(parentNode, childNode) {
        let { parent } = childNode;
        while (parent !== null) {
            if (parent.itemData.id === parentNode.itemData.id) {
                return true;
            }
            parent = parent.parent;
        }
        return false;
    }

    function getTopVisibleNode(component) {
        const treeViewElement = component.element();
        const treeViewTopPosition = treeViewElement.getBoundingClientRect().top;
        const nodes = treeViewElement.querySelectorAll('.dx-treeview-node');
        for (let i = 0; i < nodes.length; i += 1) {
            const nodeTopPosition = nodes[i].getBoundingClientRect().top;
            if (nodeTopPosition >= treeViewTopPosition) {
                return nodes[i];
            }
        }

        return null;
    }

    const treeViewDriveC = () => {
        return treeViewDriveCRef.current.instance;
    };

    const treeViewDriveD = () => {
        return treeViewDriveDRef.current.instance;
    };

    function renderTreeViewItem(item) {
        return (
            <div className="bg-red-400 itemChildren">
                <i className="cursor-ns-resize handle">
                    <BiSortAlt2 className="h-[22px] w-[22px]" />
                </i>
                <i>{item.name}</i>
            </div>
        );
    }

    function onItemClick(e) {
        e.event.stopPropagation();
    }

    return (
        <div>
            <label className="text-blue-100">
                親子関係設定（２階層まで設定できます。ここで設定した並び順で予約APPに表示されます）
            </label>
            <div className="">
                <div className="drive-panel bg-inherit" style={{ width: '716px' }}>
                    <div className="drive-header cursor-default" style={{ padding: '5px 6px', minHeight: '32px' }}>
                        <div className="dx-treeview-item-content item-parent-child-relationship-setting ">
                            <Sortable
                                filter=".dx-treeview-item"
                                group="shared"
                                data="driveC"
                                allowDropInsideItem={true}
                                allowReordering={true}
                                onDragChange={onDragChange}
                                onDragEnd={onDragEnd}
                                showDragIcons={true}
                            >
                                <TreeView
                                    id="treeviewDriveC"
                                    noDataText={noDataText}
                                    expandNodesRecursive={false}
                                    showDragIcons={true}
                                    dataStructure="tree"
                                    ref={treeViewDriveCRef}
                                    expandAllEnabled={true}
                                    items={state.itemsDriveC}
                                    itemRender={renderTreeViewItem}
                                    //width={300}
                                    displayExpr="name"
                                    className={customClass}
                                    onItemClick={onItemClick}
                                ></TreeView>
                            </Sortable>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeList;
