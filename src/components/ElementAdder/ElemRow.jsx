import React from 'react'
import { BsPencil, BsTrash } from 'react-icons/bs'
import { MdOutlineDragIndicator } from 'react-icons/md'

const ElemRow = () => {
    return (
        <div>
            <div className='flex justify-between border rounded-md py-4 font-normal mt-4'>
                <div className='px-2 flex'>
                    <MdOutlineDragIndicator
                        size={25}
                        color='#00000095'
                        style={{ cursor: 'n-resize' }}
                    />
                </div>
                <div>
                    <BsPencil size={25} color='#00000095' />
                </div>
                <div className='px-2'>
                    <input type='checkbox' className='mt-2' />
                    <label>
                        <span className='text-sm font-normal'>checkbox</span>
                    </label>
                </div>
                <div className='px-2 text-lg'>this is the title</div>
                <div className='px-2'>
                    <input
                        style={{ transform: 'scale(2.2)', marginTop: '7px' }}
                        type='checkbox'
                        width={30}
                    />
                </div>
                <div className='px-2'>
                    <BsTrash size={30} color='#00000070' />
                </div>
            </div>
        </div>
    )
}

export default ElemRow
