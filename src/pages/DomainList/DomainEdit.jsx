import { useState } from 'react';
import { useParams } from 'react-router-dom';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import DomainForm from '../../components/Form/DomainForm';
import useGetDomain from '../../hooks/useGetDomain';

const DomainEdit = () => {
    const { domainId } = useParams();
    const { domain, domainError, domainLoading } = useGetDomain(domainId);
    const [isOverFlow, setIsOverFlow] = useState(false);

    return (
        <div className={`${isOverFlow && 'overflow-hidden'} `}>
            {/* FIXME: If you are in the project, you should fix it so that it is displayed in common. */}
            <BreadCrumbs
                title={`ドメイン > 編集 : ${domain?.domainName ? domain?.domainName : ''}`}
                className="mt-4 text-blue-50 font-bold px-4"
            />
            <DomainForm
                initialValues={{ ...domain }}
                formType="edit"
                load={domainLoading}
                error={domainError}
                setIsOverFlow={setIsOverFlow}
            />
        </div>
    );
};
export default DomainEdit;
