/* eslint-disable no-unused-vars */
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { CgFileDocument } from 'react-icons/cg';
import { errorMessages } from '../../../lib/errorMessages';
import { parseLocalStorageJSON, removeFromLocalStorage, setToLocalStorage } from '../../../lib/localStrorage';
import { UnixTsToStringYYMMDDJP } from '../../../lib/unixTsToString';
import {
    baseURL,
    listMethod,
    listSchedulerSlot,
    listSchedulerSlotUpdate,
    updateMethod,
} from '../../../restapi/queries';
import { instance } from '../../../services/axios.js';
import { getAllInputSlotObject } from '../../../utilities/getUpdatedSlots';
import Button from '../../Button/Button';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import Note from '../../Form/FormInputs/Note';
import Loading from '../../Loading/Loader';
import AddButton from '../../Table/FooterSection/AddButton';
import InputContainer from '../../Wrapper/InputContainer';
import BaseModal from '../BaseModal';
import SlotTable from './SlotTable';

function SlotListModal({ closeModal, setIsOverFlow, mappingId }) {
    const [editRows, setEditRows] = useState(
        parseLocalStorageJSON('editedRows') ? parseLocalStorageJSON('editedRows') : {}
    );
    const [allowBlink, setAllowBlink] = useState(false);
    const [data, setData] = useState({});
    const [numOfCols, setNumOfCols] = useState(0);
    const [numOfRows, setNumOfRows] = useState(0);
    const [initialValues, setInitialValues] = useState({});
    const [loading, setLoading] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [errorDisplayList, setErrorDisplayList] = useState(
        parseLocalStorageJSON('errorDisplayList') ? parseLocalStorageJSON('errorDisplayList') : {}
    );

    useEffect(() => {
        const ENDPOINT = `${baseURL}${listSchedulerSlot}${mappingId}`;
        (async () => {
            try {
                setLoading(true);
                const config = { method: listMethod, url: ENDPOINT };
                const response = await instance.request(config);
                const result = await response.json();
                setData(result);
                setNumOfCols(result.items.length);
                setNumOfRows(result.items[0].slots.length);
                const initialValuesFromLocalStorage = parseLocalStorageJSON('slotInputValues');
                setInitialValues(
                    initialValuesFromLocalStorage ? initialValuesFromLocalStorage : getInitialValues(result)
                );
                setLoading(false);
            } catch (error) {
                console.log('Error Fetching Data');
                // setLoading(false)
            }
        })();
    }, [mappingId]);
    useEffect(() => {
        setToLocalStorage('editedRows', editRows);
        setToLocalStorage('errorDisplayList', errorDisplayList);
    }, [editRows, errorDisplayList]);

    const getInitialValues = (data) => {
        const values = {};
        values.memo = data.memo;
        data?.items?.forEach((item) => {
            item?.slots.forEach((slot) => (values[slot.slotId] = slot.maximumNumberOfSlots));
        });
        return values;
    };

    const handleUpdateSlot = async (values, initialValues) => {
        if (Object.keys(errorDisplayList).length === 0) {
            setUpdateLoading(true);
            //reset blinking
            setAllowBlink(false);
            for (const row in editRows) {
                editRows[row] = false;
            }
            const updatedSlots = getAllInputSlotObject(values); //return an array containing all the input slots
            //make a put request to update slot list
            const ENDPOINT = `${baseURL}${listSchedulerSlotUpdate}${mappingId}`; //api end point
            const reqBody = {
                memo: `${values.memo}`,
                updatedBy: 'admin',
                slot: updatedSlots,
            };

            const config = {
                method: updateMethod,
                url: ENDPOINT,
                data: reqBody,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            };
            const res = await instance.request(config);
            if (res.status === 200) {
                closeModal(false);
                setUpdateLoading(false);

                //remove all the data from localStorage
                removeFromLocalStorage('mappingId');
                removeFromLocalStorage('openModal');
                removeFromLocalStorage('slotInputValues');
                removeFromLocalStorage('editedRows');
                removeFromLocalStorage('errorDisplayList');
            }
        } else {
            console.log('errorDisplay', errorDisplayList);
        }
    };
    //cancel button operation
    const handleCancelButton = () => {
        closeModal(false);
        setIsOverFlow(false);

        //remove all the data from localStorage
        removeFromLocalStorage('mappingId');
        removeFromLocalStorage('openModal');
        removeFromLocalStorage('slotInputValues');
        removeFromLocalStorage('editedRows');
        removeFromLocalStorage('errorDisplayList');
    };

    return (
        <>
            {updateLoading && <Loading />}
            <BaseModal
                // title="2022年10月23日：矢野内科クリニック{`: ${data}`}
                title={`${data.date ? `${UnixTsToStringYYMMDDJP(data.date)} :` : ' '} ${
                    data.InstituteName ? data.InstituteName : ''
                }`}
                width="w-[1920px]"
            >
                {loading ? (
                    <Loading />
                ) : (
                    <Formik
                        validateOnChange={false}
                        validateOnBlur={false}
                        initialValues={initialValues}
                        onSubmit={(values) => {
                            handleUpdateSlot(values, initialValues);
                        }}
                    >
                        {({ errors, handleChange, handleBlur, values, isSubmitting }) => {
                            const first = Object.keys(errors)[0];
                            return (
                                <Form>
                                    <div className="mt-[3rem]">
                                        <SlotTable
                                            data={data}
                                            numOfCols={numOfCols}
                                            numOfRows={numOfRows}
                                            editRows={editRows}
                                            setEditRows={setEditRows}
                                            allowBlink={allowBlink}
                                            setAllowBlink={setAllowBlink}
                                            handleChange={handleChange}
                                            values={values}
                                            setErrorDisplayList={setErrorDisplayList}
                                            initialValues={initialValues}
                                            errorDisplayList={errorDisplayList}
                                        />
                                        <div className="pt-[10px]">
                                            <AddButton
                                                endIcon={
                                                    <CgFileDocument className="h-4 w-4 inline-block text-blue-100" />
                                                }
                                                text="CSVダウンロード"
                                                textColor="text-white"
                                                hoverColor="hover:text-opacity-70"
                                                type="button"
                                                onClick={(e) => e.preventDefault()}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-[1312px] mx-auto mt-24">
                                        {/* ---component for TextArea starts---*/}
                                        <InputContainer className="mt-16 mb-[32px] text-black">
                                            <Note
                                                label="メモ（2048文字まで）"
                                                labelClassName="text-white"
                                                inputClassName="bg-blue-25"
                                                name="memo"
                                                onChange={handleChange}
                                                value={values.memo ? values.memo : ''}
                                            />
                                        </InputContainer>

                                        {/* error */}
                                        <ErrorMessage>
                                            {isSubmitting &&
                                                Object.keys(errorDisplayList).length > 0 &&
                                                errorMessages.W_NUMERIC_01}
                                        </ErrorMessage>

                                        {/* ロール  button component */}
                                        <div className="flex w-full space-x-[42px]">
                                            <Button
                                                title="キャンセル"
                                                className="bg-blue-100"
                                                hoverColorType="hover:bg-blue-300"
                                                type="button"
                                                onClick={handleCancelButton}
                                            />
                                            <Button title="設定保存" type="submit" />
                                        </div>
                                    </div>
                                </Form>
                            );
                        }}
                    </Formik>
                )}
            </BaseModal>
        </>
    );
}
export default SlotListModal;
