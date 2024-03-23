export const Next = () => (
    <div className='flex justify-center items-center border pageBorder h-6  w-16 bg-white hover:bg-blue-50'>
        <span className='text-xs'> 次 </span>

        <div className='text-xs ml-0.5'>
            <svg
                xmlns='http://www.w3.org/2000/svg'
                width='11'
                height='12'
                viewBox='0 0 11 12'>
                <g
                    id='Polygon_8'
                    data-name='Polygon 8'
                    transform='translate(11) rotate(90)'
                    fill='#145c8f'>
                    <path
                        d='M 11.15772438049316 10.5 L 0.8422754406929016 10.5 L 6 1.044171690940857 L 11.15772438049316 10.5 Z'
                        stroke='none'
                    />
                    <path
                        d='M 6 2.088333129882812 L 1.684545516967773 10 L 10.31545448303223 10 L 6 2.088333129882812 M 6 0 L 12 11 L 0 11 L 6 0 Z'
                        stroke='none'
                        fill='#145c8f'
                    />
                </g>
            </svg>
        </div>
    </div>
)

export const Prev = () => (
    <div className='flex justify-center items-center border pageBorder h-6 w-16 bg-white hover:bg-blue-50'>
        <div className='text-xs mr-0.5'>
            <svg
                xmlns='http://www.w3.org/2000/svg'
                width='11'
                height='12'
                viewBox='0 0 11 12'>
                <g
                    id='Polygon_8'
                    data-name='Polygon 8'
                    transform='translate(0 12) rotate(-90)'
                    fill='#145c8f'>
                    <path
                        d='M 11.15772438049316 10.5 L 0.8422754406929016 10.5 L 6 1.044171690940857 L 11.15772438049316 10.5 Z'
                        stroke='none'
                    />
                    <path
                        d='M 6 2.088333129882812 L 1.684545516967773 10 L 10.31545448303223 10 L 6 2.088333129882812 M 6 0 L 12 11 L 0 11 L 6 0 Z'
                        stroke='none'
                        fill='#145c8f'
                    />
                </g>
            </svg>
        </div>
        <div className='text-xs'>前</div>
    </div>
)
