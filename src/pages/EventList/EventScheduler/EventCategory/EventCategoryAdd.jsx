import EventCategoryModal from '../../../../components/Modal/EventCategoryModal';
import useGetFilterList from '../../../../hooks/useGetFilterList';
import useGetValidCategoryList from '../../../../hooks/useGetValidCategoryList';

const EventCategoryAdd = ({ setCancelModal, eventId }) => {
    const initialValues = { memo: '', eventCategoryViewType: 0 };
    const { categoryList } = useGetValidCategoryList();
    const { filterList } = useGetFilterList();

    return (
        <>
            <EventCategoryModal
                title={'予約カテゴリー 追加'}
                initialValues={initialValues}
                setCancelModal={setCancelModal}
                formType="add"
                categories={categoryList}
                filters={filterList}
                eventId={eventId}
            />
        </>
    );
};
export default EventCategoryAdd;
