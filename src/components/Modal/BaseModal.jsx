import ModalTitle from './components/ModalTitle'
import ModalContainer from './ModalContainer'

function BaseModal({ title = '', hasBorder, children, width }) {
    return (
        <ModalContainer hasBorder={hasBorder} width={width}>
            <ModalTitle title={title} className="text-2xl font-bold" />
            <div className="pt-[64px] h-full ">{children}</div>
        </ModalContainer>
    )
}

export default BaseModal
