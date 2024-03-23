import ReactPaginate from 'react-paginate'
import { Next, Prev } from './Arrows'

export default function Paginate({ handlePageClick, count }) {
    return (
        <ReactPaginate
            breakLabel='...'
            nextLabel={<Next />}
            onPageChange={handlePageClick}
            pageCount={Math.ceil(count / 300)}
            previousLabel={<Prev />}
            renderOnZeroPageCount={null}
            disabledLinkClassName='invisible'
            marginPagesDisplayed={1}
            pageRangeDisplayed={3}
            containerClassName='flex justify-center items-center space-x-2'
            pageLinkClassName='pageBorder h-6 block w-16 flex items-center justify-center bg-white hover:bg-blue-50'
            activeLinkClassName='bgActive activeBorder text-white'
            breakClassName='mt-2'
            breakLinkClassName='marginBreak text-black'
        />
    )
}
