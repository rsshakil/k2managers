import { useState } from "react";
import { useParams } from "react-router-dom";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import OutlineButtonLinkContainer from "../../components/Button/OutlineButtonLinkContainer";
import AppForm from "../../components/Form/App/AppForm";
import useGetApp from "../../hooks/useGetApp";
import { ItemData } from "../../utilities/projectBtnItemData";

const AppEdit = () => {
    const { appId } = useParams();
    const { app, appLoading, appError } = useGetApp(appId);
    const [isOverFlow, setIsOverFlow] = useState(false);
    return (
        <div className={`${isOverFlow && "overflow-hidden"} `}> 
            <OutlineButtonLinkContainer ItemData={ItemData} />
            <BreadCrumbs
                title={`APP > 編集 : ${app?.appName ? app?.appName : ""}`}
                className="mt-4 text-blue-50 font-bold px-4"
            />
            <AppForm
                initialValues={{
                    ...app,
                    appStatus: app.appStatus === 1,
                    appBasicFlag: app.appBasicFlag === 1,
                }}
                load={appLoading}
                error={appError}
                formType="edit"
                editForm={true}
                setIsOverFlow={setIsOverFlow}
            />
        </div>
    )
}
export default AppEdit;