import SmsEditModal from '../../../../components/Modal/WhiteModal/EventNotificationModal/SmsEditModal';
import useGetEmailTemplate from '../../../../hooks/useGetEmailTemplate';
import Loading from '../../../../components/Loading/Loader';

const SmsNotificationEdit = ({ handleCancel, eventID, eventCategoryId, typeFlag = 1 }) => {
    const { templateValues, fieldValues, templateValuesError, templateValuesLoading } = useGetEmailTemplate(
        eventID,
        eventCategoryId,
        typeFlag,
        'smsList'
    );
    return (
        <>
            {templateValuesLoading ? (
                <Loading />
            ) : (
                <SmsEditModal
                    eventID={eventID}
                    eventCategoryId={eventCategoryId}
                    handleCancel={handleCancel}
                    typeFlag={typeFlag}
                    initialValues={{ ...templateValues }}
                    fieldValues={{ ...fieldValues }}
                    templateValuesError={templateValuesError}
                />
            )}
        </>
    );
};
export default SmsNotificationEdit;
