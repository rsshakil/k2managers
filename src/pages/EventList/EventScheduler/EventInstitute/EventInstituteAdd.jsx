import EventInstituteModal from '../../../../components/Modal/EventInstituteModal';
import useGetInstituteList from '../../../../hooks/useGetInstituteList';
import useGetFilterList from '../../../../hooks/useGetFilterList';

const EventInstituteAdd = ({ setCancelModal, eventId, eventCategoryId }) => {
    const initialValues = {
        memo: '',
        eventInstituteName: '',
        eventInstituteItemType: 0,
        eventInstituteSlotType: 0,
        eventInstituteSlotStyleTimePattern: 10,
        eventInstituteDentalFlag: false,
    };
    const { instituteList } = useGetInstituteList();
    const { filterList } = useGetFilterList();

    return (
        <>
            <EventInstituteModal
                title={'施設 追加'}
                initialValues={initialValues}
                setCancelModal={setCancelModal}
                formType="add"
                institutes={instituteList}
                filters={filterList}
                eventId={eventId}
                eventCategoryId={eventCategoryId}
            />
        </>
    );
};
export default EventInstituteAdd;
