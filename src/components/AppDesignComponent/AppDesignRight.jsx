import { useRecoilState } from "recoil";

import { appDesignerState } from "../../store/recoil/appDesignerState";
import FreePagesForm from "./FreePagesForm";
import CommonPagesForm from "./CommonPagesForm";
import SettingPagesForm from "./SettingPagesForm";

const AppDesignRight = ({ loading, errors,fetchAppDesignerData }) => {
    const [recoilStateValue,] = useRecoilState(appDesignerState);
    const { activeTab } = recoilStateValue;

    return (
        <div className="w-[640px] z-50 bg-blue-150 custom-shadow-setting-page">
        <div className="w-[640px] p-4 overflow-auto scroll-bar overlay !h-[calc(100vh-54px)]">
            {activeTab === 'freePages' && <FreePagesForm errors={errors} />}
            {activeTab === 'commonPages' && <CommonPagesForm />}
            {activeTab === 'settings' && <SettingPagesForm fetchAppDesignerData={fetchAppDesignerData} />}
        </div>
        </div>
    )
}
export default AppDesignRight