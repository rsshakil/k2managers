import { useRecoilState } from "recoil";
import { appDesignerState } from "../../store/recoil/appDesignerState";
import { appDesignerSettingPages } from '../../lib/commonConstants';
import TreeListCustom from "../shared/TreeListCustom";

export default function Setting({ activeTabItems = [], activePageId = "", handleOnEventTriggered = () => { } }) {
    const [recoilStateValue, setRecoilState] = useRecoilState(appDesignerState);
    const { activeTab } = recoilStateValue;

    let currentPage = '';

    const onFocusedCellChanged = (e) => {
        currentPage = e.row?.data?.key;
    }

    const onKeyDown = (e) => { 
        if (e.event.key == 'Enter') {
            if (currentPage && activeTab == 'settings') {
                setRecoilState((oldRecoilState) => ({
                    ...oldRecoilState,
                    activePageId: currentPage
                }));
            }
        }
    }


    return (
        <TreeListCustom
            config={{
                treeListClasses: 'custom-treelist setting-page-tab-content',
                dragDropConfig: { allowDragDrop: false },
                showColumnHeaders: false,
                idKey: 'key',
                defaultSelected: activePageId,
                clickableCells: ['title'],

                handleOnCellPreapared: (e, eventType) => handleOnEventTriggered(e, eventType),

                allowAddMoreButton: false,
                onKeyDown,
                onFocusedCellChanged
            }}
            dataSource={appDesignerSettingPages}
            columns={[{ dataField: "title", eventType: "cellClick", classes: "cursor-pointer truncate max-w-[478px] !w-[478px]", handleOnClick: ({ e, eventType, updatedItems }) => handleOnEventTriggered(e, eventType, updatedItems) }]}
        />

        // <TreeListCustom
        //     config={{
        //         allowDragDrop: false,
        //         showColumnHeaders: false,
        //         idKey: 'key',
        //         allowAddMoreButton: false,
        //     }}
        //     dataSources={appDesignerSettingPages}
        //     columns={[{ dataField: "title", classes: "cursor-pointer" }]}
        //     handleOnAction={handleOnAction}
        // />
    )
}