import React from 'react';
import Button from '../../Button/Button';
import Modal from '../components/Modal';
import ModalTitle from '../components/ModalTitle';

const DeleteModal = ({ closeModal }) => {
    return (
        <>
            <div className="overlay modal-overlay text-white">
                <div className="content-m min-h-full">
                    <div className="content-1440 flex-container">
                        {/*this is the modal title section*/}
                        <ModalTitle title="削除" />
                        {/*modal body section*/}
                        <Modal.Body>
                            <div className="text-center mt-[1rem]">
                                <p>選択した権限ロールを削除します。</p>
                                <div className="text-orange-500 mt-[1rem]">削除したデータは復元できません。</div>
                            </div>
                        </Modal.Body>
                        {/* this is modal footer section*/}
                        <Modal.Footer>
                            <Button className="bg-orange-300 hover:bg-orange-400" title="権限ロール削除" />
                            <Button title="いいえ" onClick={() => closeModal(false)} />
                        </Modal.Footer>
                    </div>
                </div>
            </div>
        </>
    );
};
export default DeleteModal;
