import React from "react";
import './Modal.css';
import Button from "../Button/Button";
import Tooltip from "../Tooltip/Tooltip";

const Modal10 = () => {
    return (
        <div className='overlay modal-overlay text-white'>
            <div className='content-m min-h-full'>
                <div className='content-1440 flex-container'>
                    {/*this is the modal title section*/}
                    <div className='flex flex-col w-full text-center tooltip'>
                        <div className="truncate h-8 modal-header">
                            <span className="sticky z-20 left-0 w-auto top-0">選択したデータを削除します選択したデータを削除します選択したデータを削除します。選択したデータを削除します選択したデータを削除します選択したデータを削除します選択したデータを削除します選択したデータを削除します選択したデータを削除します選択したデータを削除します選択したデータを削除します選択したデータを削除します選択したデータを削除します選択したデータを削除します選択したデータを削除します
                            </span>
                        </div>
                        {/* tooltip text added*/}
                        <Tooltip
                            title={'選択したデータを削除します選択したデータを削除します選択したデータを削除します。選択したデータを削除します選択したデータを削除します選択したデータを削除します選択したデータを削除します選択したデータを削除します選択したデータを削除します選択したデータを削除します選択したデータを削除します選択したデータを削除します選択したデータを削除します選択したデータを削除します選択したデータを削除します'}/>
                    </div>

                    {/*modal body section*/}
                    <div className="overscroll-auto overflow-y-scroll h-[18rem]
                          p-2">
                        <p>This is Top body</p>
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
                    {/* this is modal footer section*/}
                    <div className="p-2 flex flex-col text-red-600">
                        <p className="leading6 text-right h-8">選択したデータを削除します。</p>
                        <div className="flex w-full">
                            <Button title='アカウント削除'/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Modal10;