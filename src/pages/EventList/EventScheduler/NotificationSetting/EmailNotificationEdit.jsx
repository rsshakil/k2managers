import EmailEditModal from '../../../../components/Modal/WhiteModal/EventNotificationModal/EmailEditModal';
import useGetEmailTemplate from '../../../../hooks/useGetEmailTemplate';
import Loading from '../../../../components/Loading/Loader';

const EmailNotificationEdit = ({ handleCancel, eventID, eventCategoryId, typeFlag = 1 }) => {
    const { templateValues, fieldValues, templateValuesError, templateValuesLoading } = useGetEmailTemplate(
        eventID,
        eventCategoryId,
        typeFlag,
        'emailList'
    );

    return (
        <>
            {templateValuesLoading ? (
                <Loading />
            ) : (
                <EmailEditModal
                    handleCancel={handleCancel}
                    eventID={eventID}
                    eventCategoryId={eventCategoryId}
                    initialValues={{ ...templateValues }}
                    fieldValues={{ ...fieldValues }}
                    templateValuesError={templateValuesError}
                    typeFlag={typeFlag}
                />
            )}
        </>
    );
};
export default EmailNotificationEdit;
