import EventItemModal from '../../../../components/Modal/WhiteModal/EventItemModal/EventItemModal';
import useGetEventItem from '../../../../hooks/useGetEventItem';

const EventItemEdit = ({ setCancelModal, eventId, pathName, eventInstituteId, instituteName }) => {
    const { eventItem, eventItemLoading, eventItemError } = useGetEventItem(eventInstituteId);
    return (
        <>
            <EventItemModal
                title={'施設 追加'}
                initialValues={{ eventInstituteItemInfo: eventItem?.eventInstituteItemInfo, memo: eventItem.memo3 }}
                instituteName={instituteName}
                setCancelModal={setCancelModal}
                formType="add"
                eventId={eventId}
                pathName={pathName}
                eventInstituteId={eventInstituteId}
                error={eventItemError}
                load={eventItemLoading}
            />
        </>
    );
};
export default EventItemEdit;
