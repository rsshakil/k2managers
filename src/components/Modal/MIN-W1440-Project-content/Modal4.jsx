import React from 'react';
import '../Modal.css';
import ModalBody from './ModalBody';
import TitleDialog from '../components/Title';
import Footer from './Footer';
const Modal4 = ({ children }) => {
    return (
        <div className="relative text-white overlay modal-overlay flex justify-center flex-col items-center overflow-x-auto">
            <div className="modal1440-body wrap overscroll-auto overflow-y-scroll min-w-[1440px]">
                <TitleDialog
                    title={
                        '選択したデータを削除します選択したデータを削除します選択したデータを削除します。選択したデータを削除します選択したデータを削除します選択したデータを削除します選択したデータを削除します選択したデータを削除します選択したデータを削除します選択したデータを削除します選択したデータを削除します選択したデータを削除します選択したデータを削除します選択したデータを削除します選択したデータを削除します'
                    }
                />
                <ModalBody>{children}</ModalBody>
                <Footer />
            </div>
        </div>
    );
};
export default Modal4;
