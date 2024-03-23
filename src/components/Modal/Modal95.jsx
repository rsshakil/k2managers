import React from "react";
import './Modal.css';
import Button from "../Button/Button";

const Modal95 = () => {
    return (
        <div className='overlay modal-overlay text-white'>
            <div className='content-m min-h-screen'>
                <div className='content-960 flex-container'>
                    <div className='flex flex-col w-full text-center tooltip'>
                        <div className="truncate h-8 modal-header">
                            <span className="left-0 w-auto">選択したデータを削除します選択したデータを削除します選択したデータを削除します。選択したデータを削除します選択したデータを削除します選択したデータを削除します選択したデータを削除します選択したデータを削除します選択したデータを削除します選択したデータを削除します選択したデータを削除します選択したデータを削除します選択したデータを削除します選択したデータを削除します選択したデータを削除します
                            </span>
                        </div>
                        <div className="tooltiptext">
                            選択したデータを削除します選択したデータを削除します選択したデータを削除します。選択したデータを削除します選択したデータを削除します選択したデータを削除します選択したデータを削除します選択したデータを削除します選択したデータを削除します選択したデータを削除します選択したデータを削除します選択したデータを削除します選択したデータを削除します選択したデータを削除します選択したデータを削除します
                        </div>
                    </div>
                    <div className="overscroll-auto overflow-y-scroll p-2 modal-body">
                        <p>This is modal body</p>
                        <p>This is modal body</p>
                        <p>This is modal body</p>
                        <p>This is modal body</p>
                        <p>This is modal body</p>
                        <p>This is modal body</p>
                        <p>This is modal body</p>
                        <p>This is modal body</p>
                        <p>This is modal body</p>
                        <p>This is modal body</p>
                        <p>This is modal body</p>
                        <p>This is modal body</p>
                        <p>This is modal body</p>
                        <p>This is modal body</p>
                        <p>This is modal body</p>
                        <p>This is modal body</p>
                        <p>This is modal body</p>
                        <p>This is modal body</p>
                        <p>This is modal body</p>
                        <p>This is modal body</p>
                        <p>This is modal body</p>
                        <p>This is modal body</p>
                        <p>This is modal body</p>
                        <p>This is modal body</p>
                        <p>This is modal body</p>
                        <p>This is modal body</p>
                        <p>This is modal body</p>
                        <p>This is modal body</p>
                    </div>
                    <div className="p-2 flex flex-col items-center text-red-600">
                       <p style={{lineHeight: '1.5rem'}}>選択したデータを削除します。</p>
                        <div className="mt-8 flex w-full">
                        <Button title='アカウント削除' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Modal95;