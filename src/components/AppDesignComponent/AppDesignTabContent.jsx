import { useRecoilState } from "recoil";
import _ from "lodash";
import { v4 as uuid } from 'uuid';

import { appDesignerState } from "../../store/recoil/appDesignerState";

export default function AppDesignTabContent({ render, mapper = {} }) {
    const [recoilStateValue, setRecoilState] = useRecoilState(appDesignerState);
    const { activeTab, tabItems, activePageId } = recoilStateValue;
    const activeTabItems = tabItems[activeTab];


    function handleOnEventTriggered(e, eventType = '', updatedPages = []) { 

        switch (eventType) {
            case 'add':
                const newPage = getNewItemAttributes();

                updatedPages = setDefaultRootPage([...activeTabItems, newPage]);
                updatedPages = orderedPages(updatedPages);

                setRecoilState((prevState) => ({
                    ...prevState,
                    activePageId: !activePageId ? updatedPages[0][mapper[activeTab].idKey] : activePageId,
                    tabItems: { ...prevState.tabItems, [activeTab]: updatedPages }
                }));

                return updatedPages;
            case 'cellClick':
                setRecoilState((prevState) => ({
                    ...prevState,
                    activePageId: e.data[mapper[activeTab].idKey]
                }));
                break;
            case 'home':
                const newHomePage = e.row.data;
                updatedPages = JSON.parse(JSON.stringify([...updatedPages])); 
                _.map(updatedPages, x => x.appPageId === newHomePage.appPageId ? x.appPageRootFlag = 1 : x.appPageRootFlag = 0)
                setRecoilState((prevState) => ({
                    ...prevState,
                    tabItems: { ...prevState.tabItems, [activeTab]: updatedPages }
                }));
                break;
            case 'delete':
                const deletedItem = e.row.data;
                updatedPages = setDefaultRootPage(updatedPages);
                updatedPages = orderedPages(updatedPages);

                //remove deleted item url from all pages > transition sources
                updatedPages = updatedPages.map(x => {
                    let { url = [] } = x.appPageTransitionSource;
                    const filteredUrls = _.without(url, deletedItem.appPageURLName); 
                    return {
                        ...x,
                        appPageTransitionSource: { url: filteredUrls }
                    }
                }) 

                setRecoilState((prevState) => ({
                    ...prevState,
                    activePageId: updatedPages.length > 0 ? updatedPages[0][mapper[activeTab].idKey] : 0,
                    tabItems: { ...prevState.tabItems, [activeTab]: updatedPages }
                }));

                break;
            case 'orderChange':
                const orderedPageList = orderedPages(updatedPages);

                setRecoilState((prevState) => ({
                    ...prevState,
                    tabItems: { ...prevState.tabItems, [activeTab]: orderedPageList }
                }));

                break;
            case 'cellPrepared':
                if (e.data && e.data.hasOwnProperty('appPageRootFlag') && e.column?.dataField === 'action') {

                    if (e.data && e.data.appPageRootFlag !== 1) {
                        e.cellElement.children[0].classList.add('dx-icon-home-light');

                    } else if (e.data && e.data.appPageRootFlag === 1) {
                        e.cellElement.children[0].classList.remove('dx-icon-home-light');
                    }
                }

                break;
            default:
        }
    }

    function setDefaultRootPage(updatedItems = []) {
        updatedItems = JSON.parse(JSON.stringify([...updatedItems]));

        //If the current page is appPageRootFlag=1 then make the immediate 2nd one main
        const foundAppRootPage = updatedItems.find(x => x.appPageRootFlag === 1);

        if (!foundAppRootPage && updatedItems.length > 0) {
            updatedItems[0].appPageRootFlag = 1;
        }

        return updatedItems;
    }

    function orderedPages(pages = []) {
        let pageList = JSON.parse(JSON.stringify([...pages]));

        return pageList.map((item, index) => {
            item[mapper[activeTab].orderKey] = index + 1;
            return item;
        });
    }

    function getNewItemAttributes() {
        return {
            appPageId: uuid(),
            appPageOrderNo: 0,
            appPageManagerName: "",
            appPageURLName: "",
            appPageTitle: "",
            appPageDescription: "",
            appPageRootFlag: 0,
            appPageStepId: 0,
            appPageStepValue: 'none',
            appPageStepType: 1,
            appPageAuthFlag: 0,
            appPageTransitionSource: { url: [] },
            appPageCustomClass: "",
            memo: "",
            blocks: [],
            updatedBy: "Randon string",
            isNewPage: true,
        }
    }


    return render({
        activeTabItems,
        activePageId,
        handleOnEventTriggered
    })
}