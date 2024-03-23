import Button from '../../components/Button/Button';
import Loading from '../../components/Loading/Loader';
import BaseModal from '../../components/Modal/BaseModal';
import ModalTitle from '../../components/Modal/components/ModalTitle';
import ButtonContainer from '../../components/Wrapper/ButtonContainer';

const AccountDeleteModal = (props) => {
    const { closeModal, setIsOverFlow, handleDelete, deleteLoading } = props;

    return (
        <BaseModal hasBorder={true}>
            <div className="h-[calc(100vh-133px)] flex justify-center items-center w-full -mt-8 ">
                <div className="text-center border w-full py-8 px-[70px]  h-[22.75rem] flex flex-col justify-between items-center ">
                    <div className="space-y-[22px]">
                        <ModalTitle title={'削除'} />
                        <h4 className="text-base">選択したデータを削除します。</h4>
                        <h4 className="text-orange-300 text-base">削除したデータは復元できません。</h4>
                        {deleteLoading && <Loading />}
                    </div>
                    <ButtonContainer>
                        <Button
                            title={'アカウント削除'}
                            className={'bg-orange-300'}
                            hoverColorType={'hover:bg-blue-300'}
                            type="button"
                            onClick={handleDelete}
                        />
                        <Button
                            title={'キャンセル'}
                            className={'bg-blue-100'}
                            hoverColorType={'hover:bg-blue-300'}
                            type="button"
                            onClick={() => {
                                closeModal(false);
                                setIsOverFlow(false);
                            }}
                        />
                    </ButtonContainer>
                </div>
            </div>
        </BaseModal>
    );
};

export default AccountDeleteModal;
