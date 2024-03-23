import React, { useState, useEffect } from 'react';
import EventCategoryModal from '../../../../components/Modal/EventCategoryModal';
import useGetValidCategoryList from '../../../../hooks/useGetValidCategoryList';
import useGetFilterList from '../../../../hooks/useGetFilterList';
import useGetEventCategory from '../../../../hooks/useGetEventCategory';
import Loader from '../../../../components/Loading/Loader';

const EventCategoryEdit = ({ setCancelModal, eventId, eventCategoryId }) => {
    const { categoryList, categoryLoading } = useGetValidCategoryList();
    const { filterList, filterLoading } = useGetFilterList();
    const { eventCategory, eventCategoryLoading } = useGetEventCategory(eventId, eventCategoryId);
    const [_isOverFlow, setIsOverFlow] = useState(false);

    return (
        <>
            {categoryLoading || filterLoading || eventCategoryLoading ? (
                <>
                    <Loader />
                </>
            ) : (
                <>
                    <EventCategoryModal
                        title={'予約カテゴリー 編集'}
                        initialValues={{
                            ...eventCategory,
                        }}
                        setCancelModal={setCancelModal}
                        formType="edit"
                        eventId={eventId}
                        eventCategoryId={eventCategoryId}
                        categories={categoryList}
                        filters={filterList}
                        setIsOverFlow={setIsOverFlow}
                    />
                </>
            )}
        </>
    );
};
export default EventCategoryEdit;
