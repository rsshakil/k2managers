import { useState } from 'react';
import { useParams } from 'react-router-dom';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import OutlineButtonLinkContainer from '../../components/Button/OutlineButtonLinkContainer';
import CounselorForm from '../../components/Form/CounselorForm';
import useGetCounselor from '../../hooks/useGetCounselor';
import { ItemData } from '../../utilities/projectBtnItemData';

const CounselorEdit = () => {
    const { counselorId } = useParams();
    const { counselor, counselorError, counselorLoading } = useGetCounselor(counselorId);
    const [isOverFlow, setIsOverFlow] = useState(false);

    return (
        <div className={`${isOverFlow && 'overflow-hidden'} `}>
            {/* FIXME: If you are in the project, you should fix it so that it is displayed in common. */}
            <OutlineButtonLinkContainer ItemData={ItemData} />
            <BreadCrumbs
                title={`カウンセラー > 編集 : ${counselor?.counselorName ? counselor?.counselorName : ''}`}
                className="mt-4 text-blue-50 font-bold px-4"
            />
            <CounselorForm
                initialValues={{ ...counselor }}
                load={counselorLoading}
                error={counselorError}
                formType="edit"
                setIsOverFlow={setIsOverFlow}
            />
        </div>
    );
};
export default CounselorEdit;
