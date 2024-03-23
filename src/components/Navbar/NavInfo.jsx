import { useSelector } from 'react-redux'
import { UnixTsToString } from '../../lib/unixTsToString'
import  { CgClose }  from 'react-icons/cg'
import {IoIosTime} from 'react-icons/io'
import {RiUserFill} from 'react-icons/ri'

function NavInfo({ info }) {
    const auth = useSelector((state) => state.auth)
    const { accountId } = info
    return (
        <div className='text-white items-center text-xs font-bold flex-1 whitespace-nowrap'>
            <div className='max-w-[172px]'>
                <div className='tooltip'>
                    <div className='flex'>
                        <RiUserFill className="h-[15px]"/>
                        <div className='truncate '> 
                            <span className='ml-2'>{`${accountId}`}</span>
                        </div>
                        <span className='pl-1'>さん</span>
                    </div>
                    <div className='tooltiptext' style={{ left: '70px' }}>
                        {`${accountId}`}
                        <span className='pl-1'>さん</span>
                    </div>
                </div>
                <div className='flex justify-between'>
                    <div className='tooltip'>
                        <div className='inline-block mb-[-2px]'>
                            <CgClose className="text-red-500"/>
                        </div>
                        <span className='ml-2'>
                            {`${auth.lastLoginFailureCount || 0} 回`}{' '}
                        </span>
                        <div className='tooltiptext'>最終ログイン失敗回数</div>
                    </div>
                    {/* First Login does not display */}
                    {!!auth.lastLoginTime && UnixTsToString(auth.lastLoginTime) && (
                        <div className='tooltip'>
                            <div className='w-auto inline-block mb-[-2px]'>
                               <IoIosTime className=""/>
                            </div>
                            <span className='ml-2'>
                                {UnixTsToString(auth.lastLoginTime)}
                            </span>
                            <div className='tooltiptext'>最終ログイン日時</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default NavInfo
