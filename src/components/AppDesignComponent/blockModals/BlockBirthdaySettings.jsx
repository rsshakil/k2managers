
//--------added 6th feb,23, no need anymore-------
//Ebetsu Version
import { Form, Formik } from "formik";
import React, { useState } from "react";

import { valueFormatCheck } from "../../../utilities/commonFunctions";
import ModalTitle from "../../Modal/components/ModalTitle";
import WhiteModalWrapper from '../../Modal/components/WhiteModalWrapper';
import BlockModalFooter from "./BlockModalFooter";

export default function BlockBirthdaySettings({ blockData = '', setModalOpen = () => { }, handleOnPressSave = () => { },uniqueError={} }) {
    const [formData, setFormData] = useState(blockData);


    function handleOnchange(e) {
        const name = e.target.name;
        const value = valueFormatCheck(e.target.value)

        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }


    return (
        <WhiteModalWrapper width="border-none text-black" className="items-start">
            <ModalTitle title="[江別]誕生日" className="text-blue-100 text-xl" />

            <Formik
                enableReinitialize={true}
                initialValues={formData}
            >
                <div className='relative w-full h-full'>
                    <Form onChange={handleOnchange}>
                        <div className="body-height3 pt-12 px-10 min-h-[calc(100vh-452px)] !p-0">
                            <div className="flex flex-col py-10">

                            </div>
                        </div>

                        <BlockModalFooter
                            errors={uniqueError}
                            setModalOpen={() => setModalOpen(false)}
                            handleOnPressSave={(e) => handleOnPressSave(e, formData)}
                        />
                    </Form>
                </div>
            </Formik>
        </WhiteModalWrapper >
    )
}