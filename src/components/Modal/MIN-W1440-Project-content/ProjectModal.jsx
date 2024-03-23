import React from 'react';
import Button from '../../Button/Button';
import Checkbox from '../../Form/FormInputs/CheckboxInput';
import BaseModal from '../BaseModal';
import ModalTitle from '../components/ModalTitle';
import Footer from './Footer';
import ModalBody from './ModalBody';

const ProjectModal = ({ modalTitle, name, closeModal, Data, btnTitle1, btnTitle2, setIsOverFlow }) => {
    return (
        <BaseModal>
            <ModalTitle title={modalTitle} className="text-2xl font-bold" />
            <div className="text-white h-8 mt-[65px] mb-[3rem]">
                <Checkbox name={name} children={name} borderColor="border border-white" />
            </div>
            <ModalBody>
                <div className="pl-[131px] pb-[148px] text-white font-normal scroll-bar wrap overscroll-auto overlay">
                    {Data.map((title, index) => (
                        <div className="h-8">
                            <Checkbox name={title} children={title} borderColor="border border-white" />
                        </div>
                    ))}
                </div>
            </ModalBody>
            <Footer>
                <div className="flex w-full space-x-[42px]">
                    <Button
                        title={btnTitle1}
                        className="bg-blue-100"
                        hoverColorType="hover:bg-blue-300"
                        type="button"
                        onClick={() => {
                            closeModal(false);
                            setIsOverFlow(false);
                        }}
                    />
                    <Button
                        title={btnTitle2}
                        type="button"
                        onClick={() => {
                            closeModal(false);
                            setIsOverFlow(false);
                        }}
                    />
                </div>
            </Footer>
        </BaseModal>
    );
};
export default ProjectModal;
