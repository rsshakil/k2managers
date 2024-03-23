import React, { useState } from 'react';
import { BsFillPencilFill } from 'react-icons/bs';
import Loading from '../../../../components/Loading/Loader';
import LabelWithListActionAddEdit, {
    LabelWithListActionAddEditIcon,
} from '../../../../components/ListElementDrag/static/LabelWithListActionAddEdit';

const NotificationSetting = ({ setEmailTypeFlag, setMailEditModal, setSMSTypeFlag, setSmsEditModal }) => {
    const [loading, setLoading] = useState(false);
    const handleMailEditModal = (typeFlag) => {
            setEmailTypeFlag(typeFlag);
            setMailEditModal(true);
        },
        handleSmsEditModal = (typeFlag) => {
            setSMSTypeFlag(typeFlag);
            setSmsEditModal(true);
        };
    return (
        <>
            {loading && <Loading />}
            <div className="relative w-full h-full">
                <div className="mt-6 min-h-[calc(100vh-500px)]">
                    <div>
                        <LabelWithListActionAddEdit
                            labelTitle="メール設定"
                            column1Title="編集"
                            column2Title="メールテンプレート"
                            id="customerCreatedTemplate"
                        >
                            <LabelWithListActionAddEditIcon
                                iconComponent={<BsFillPencilFill onClick={() => handleMailEditModal(1)} />}
                                column2Text="（新規）予約完了"
                            />
                            <LabelWithListActionAddEditIcon
                                iconComponent={<BsFillPencilFill onClick={() => handleMailEditModal(2)} />}
                                column2Text="（新規）再送メール"
                            />
                            <LabelWithListActionAddEditIcon
                                iconComponent={<BsFillPencilFill onClick={() => handleMailEditModal(3)} />}
                                column2Text="（検診前）リマインド"
                            />
                            <LabelWithListActionAddEditIcon
                                iconComponent={<BsFillPencilFill onClick={() => handleMailEditModal(4)} />}
                                column2Text="（変更）予約変更完了"
                            />
                            <LabelWithListActionAddEditIcon
                                iconComponent={<BsFillPencilFill onClick={() => handleMailEditModal(5)} />}
                                column2Text="（キャンセル）予約キャンセル完了	"
                            />
                        </LabelWithListActionAddEdit>

                        <LabelWithListActionAddEdit
                            labelTitle="SMS設定"
                            column1Title="編集"
                            column2Title="SMSテンプレート	"
                            id="customerCreatedTemplate"
                        >
                            <LabelWithListActionAddEditIcon
                                iconComponent={<BsFillPencilFill onClick={() => handleSmsEditModal(1)} />}
                                column2Text="（新規）予約完了"
                            />
                            <LabelWithListActionAddEditIcon
                                iconComponent={<BsFillPencilFill onClick={() => handleSmsEditModal(2)} />}
                                column2Text="（新規）再送メール"
                            />
                            <LabelWithListActionAddEditIcon
                                iconComponent={<BsFillPencilFill onClick={() => handleSmsEditModal(3)} />}
                                column2Text="（検診前）リマインド"
                            />
                            <LabelWithListActionAddEditIcon
                                iconComponent={<BsFillPencilFill onClick={() => handleSmsEditModal(4)} />}
                                column2Text="（変更）予約変更完了"
                            />
                            <LabelWithListActionAddEditIcon
                                iconComponent={<BsFillPencilFill onClick={() => handleSmsEditModal(5)} />}
                                column2Text="（キャンセル）予約キャンセル完了	"
                            />
                        </LabelWithListActionAddEdit>
                    </div>
                </div>
            </div>
        </>
    );
};
export default NotificationSetting;
