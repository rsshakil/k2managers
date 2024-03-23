import React, { useState } from 'react';
import EventInstituteModal from '../../../../components/Modal/EventInstituteModal';
import useGetEventInstitute from '../../../../hooks/useGetEventInstitute';
import useGetFilterList from '../../../../hooks/useGetFilterList';
import useGetInstituteList from '../../../../hooks/useGetInstituteList';

const EventInstituteEdit = ({ setCancelModal, eventId, eventCategoryId, eventInstituteId }) => {
    const { instituteList } = useGetInstituteList();
    const { filterList } = useGetFilterList();
    const { eventInstitute } = useGetEventInstitute(eventId, eventInstituteId);
    const [_isOverFlow, setIsOverFlow] = useState(false);

    return (
        <EventInstituteModal
            title={'施設 編集'}
            initialValues={{
                ...eventInstitute,
                eventInstituteDentalFlag: +eventInstitute?.eventInstituteDentalFlag ? true : false
            }}
            setCancelModal={setCancelModal}
            formType="edit"
            eventId={eventId}
            eventCategoryId={eventCategoryId}
            eventInstituteId={eventInstituteId}
            institutes={instituteList}
            filters={filterList}
            setIsOverFlow={setIsOverFlow}
        />
    );
};
export default EventInstituteEdit;
