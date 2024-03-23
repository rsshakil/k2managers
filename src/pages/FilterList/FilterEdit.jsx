import { useState } from "react";
import { useParams } from "react-router-dom";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import OutlineButtonLinkContainer from "../../components/Button/OutlineButtonLinkContainer";
import FilterForm from "../../components/Form/FilterForm";
import useGetFilter from "../../hooks/useGetFilter";
import { ItemData } from "../../utilities/projectBtnItemData";

const FilterEdit = () => {
    const { filterId } = useParams();
    const { filter, filterError, filterLoading } = useGetFilter(filterId);
    const [isOverFlow, setIsOverFlow] = useState(false);

    return(
        <div className={`${isOverFlow && "overflow-hidden"} `}>
            {/* FIXME: If you are in the project, you should fix it so that it is displayed in common. */}
            <OutlineButtonLinkContainer ItemData={ItemData} />
            <BreadCrumbs
                title={`フィルター > 編集 : ${filter?.filterName ? filter?.filterName : ""}`}
                className="mt-4 text-blue-50 font-bold px-4"
            />
            <FilterForm
                initialValues={{ ...filter }}
                load={filterLoading}
                error={filterError}
                formType="edit"
                setIsOverFlow={setIsOverFlow}
            />
        </div>
    )
}
export default FilterEdit;