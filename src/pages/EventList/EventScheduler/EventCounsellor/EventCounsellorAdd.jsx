import EventCounsellorModal from '../../../../components/Modal/WhiteModal/EventCounsellorModal/EventCounsellorModal';
import useGetEventItem from '../../../../hooks/useGetEventItem';

const EventCounsellorAdd = ({ setCancelModal, eventId, pathName, eventInstituteId, instituteName }) => {
    const { eventItem, eventItemLoading, eventItemError } = useGetEventItem(eventInstituteId);
    return (
        <>
            <EventCounsellorModal
                title={'予約カテゴリー 追加'}
                initialValues={{ eventInstituteItemInfo: eventItem?.eventInstituteItemInfo, memo: eventItem.memo3 }}
                setCancelModal={setCancelModal}
                formType="add"
                instituteName={instituteName}
                eventId={eventId}
                pathName={pathName}
                eventInstituteId={eventInstituteId}
                error={eventItemError}
                load={eventItemLoading}
            />
        </>
    );
};
export default EventCounsellorAdd;
