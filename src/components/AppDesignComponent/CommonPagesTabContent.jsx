import { useRecoilState } from "recoil";
import { appDesignerState } from "../../store/recoil/appDesignerState";
import TreeListCustom from "../shared/TreeListCustom";

export default function CommonPagesTabContent({ activeTabItems = [], activePageId = "", handleOnEventTriggered = () => { } }) {
    const [recoilStateValue, setRecoilState] = useRecoilState(appDesignerState);
    const { activeTab } = recoilStateValue;

    let currentPage = '';

    const onFocusedCellChanged = (e) => {
        currentPage = e.row?.data?.appCommonPageId;
    }

    const onKeyDown = (e) => { 
        if (e.event.key == 'Enter') {
            if (currentPage && activeTab == 'commonPages') {
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
                treeListClasses: 'custom-treelist common-page-tab-content',
                dragDropConfig: { allowDragDrop: false },
                showColumnHeaders: false,
                idKey: 'appCommonPageId',
                defaultSelected: activePageId,
                clickableCells: ['appCommonPageManagerName'],

                handleOnCellPreapared: (e, eventType) => handleOnEventTriggered(e, eventType),

                allowAddMoreButton: false,
                onKeyDown,
                onFocusedCellChanged
            }}
            dataSource={activeTabItems}
            columns={[{ dataField: "appCommonPageManagerName", eventType: "cellClick", classes: "cursor-pointer truncate max-w-[478px] !w-[478px]", handleOnClick: ({ e, eventType, updatedItems }) => handleOnEventTriggered(e, eventType, updatedItems) }]}
        />
    )
}