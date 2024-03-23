import { useRecoilState } from 'recoil';

import FreePagesTabContent from '../AppDesignComponent/FreePagesTabContent';
import CommonPagesTabContent from '../AppDesignComponent/CommonPagesTabContent';
import SettingsPagesTabContent from '../AppDesignComponent/SettingsPagesTabContent';
import { appDesignerState } from '../../store/recoil/appDesignerState';
import AppDesignTabContent from '../AppDesignComponent/AppDesignTabContent';
import { appDesignerSettingPages } from '../../lib/commonConstants';

const mapper = {
    freePages: { idKey: 'appPageId', orderKey: 'appPageOrderNo', clickableColumns: ['appPageTitle'] },
    commonPages: { idKey: 'appCommonPageId', orderKey: '', clickableColumns: ['appCommonPageTitle'] },
    settings: { idKey: 'key', orderKey: '', clickableColumns: ['title'] },
};

const Data = [
    {
        label: '自由ページ',
        value: 'freePages',
        content: <AppDesignTabContent mapper={mapper} render={({ ...rest }) => <FreePagesTabContent {...rest} />} />,
    },
    {
        label: '固定ページ',
        value: 'commonPages',
        content: <AppDesignTabContent mapper={mapper} render={({ ...rest }) => <CommonPagesTabContent {...rest} />} />,
    },
    {
        label: '設定',
        value: 'settings',
        content: (
            <AppDesignTabContent mapper={mapper} render={({ ...rest }) => <SettingsPagesTabContent {...rest} />} />
        ),
    },
];

const TabsComponent = ({ loading }) => {
    const [recoilStateValue, setRecoilState] = useRecoilState(appDesignerState);
    const { tabItems } = recoilStateValue;
    console.log('recoilStateValuerecoilStateValue', recoilStateValue);
    function handleOnChangeTab({ value: tabId }) {
        let activePageId = 0;
        const activeTabItems = tabItems[tabId];
        if (['freePages', 'commonPages'].includes(tabId) && activeTabItems.length > 0) {
            activePageId = activeTabItems[0][mapper[tabId].idKey];
        } else if (tabId === 'settings') {
            activePageId = appDesignerSettingPages[0][mapper[tabId].idKey];
        }

        let updatedState = {
            ...recoilStateValue,
            activeTab: tabId,
            activePageId: activePageId,
            tabItems: {
                ...recoilStateValue.tabItems,
                histories: {
                    ...recoilStateValue.tabItems?.histories,
                    actives: {
                        ...recoilStateValue.tabItems?.histories?.actives,
                        activeTab: tabId,
                        activePageId: activePageId,
                    },
                },
            },
        };

        setRecoilState(updatedState);
    }

    const activeTabContent = () => {
        return Data.find((x) => x.value === recoilStateValue.activeTab).content;
    };

    return (
        <>
            <ul className="flex w-full ">
                {Data.map((name, key) => (
                    <li
                        key={name.value}
                        className={`w-[33.33%] ${recoilStateValue.activeTab === name.value ? 'z-20' : 'z-10'}`}
                    >
                        <a
                            href="#"
                            role="tab"
                            onClick={() => handleOnChangeTab(name)}
                            className={` ${
                                recoilStateValue.activeTab === name.value
                                    ? 'bg-blue-150 custom-shadow rounded-tr-xl'
                                    : 'bg-gray-300 rounded-t-md'
                            }
                            h-10 min-w-[120px] text-blue-100 text-center hover:bg-blue-300 w-full hover:text-white inline-block px-1 py-2
                            `}
                        >
                            {name.label}
                        </a>
                    </li>
                ))}
            </ul>

            <div className="w-full pt-6 px-4 bg-blue-150 border-l">{activeTabContent()}</div>
        </>
    );
};
export default TabsComponent;
