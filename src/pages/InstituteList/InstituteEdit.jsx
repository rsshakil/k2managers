import { useState } from "react";
import { useParams } from "react-router-dom";
import { ItemData } from "../../utilities/projectBtnItemData";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import InstituteForm from "../../components/Form/InstituteForm";
import OutlineButtonLinkContainer from "../../components/Button/OutlineButtonLinkContainer";
import useGetInstitute from "../../hooks/useGetInstitute";

const InstituteEdit = () => {
    const { instituteId } = useParams();
    const { institute, instituteError, instituteLoading } = useGetInstitute(instituteId);
    const [isOverFlow, setIsOverFlow] = useState(false);

    return (
        <div className={`${isOverFlow && "overflow-hidden"} `}>
            {/* FIXME: If you are in the project, you should fix it so that it is displayed in common. */}
            <OutlineButtonLinkContainer ItemData={ItemData} />
            <BreadCrumbs
                title={`施設 > 編集 : ${institute?.instituteName ? institute?.instituteName : ""}`}
                className="mt-4 text-blue-50 font-bold px-4"
            />
            <InstituteForm
                initialValues={{
                    ...institute
                }}
                load={instituteLoading}
                error={instituteError}
                formType="edit"
                setIsOverFlow={setIsOverFlow}
            />
        </div>
    )
}
export default InstituteEdit;