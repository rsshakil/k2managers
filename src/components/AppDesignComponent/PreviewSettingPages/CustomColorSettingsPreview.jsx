import _ from 'lodash';
import { isValidColor, defaultColorCode } from '../../../lib/ColorConvert';

export default function CustomColorSettingsPreview({ data = [] }) { 
    return (
        <>
            <label className='text-blue-100'>カスタムカラー</label>
            <div className={`flex justify-between w-full text-center mt-6 overflow-hidden`}>
                {data.map((x, index) => <div key={index} className={`w-10 h-10 rounded-full border-[1px] border-black`} style={{ backgroundColor: isValidColor(x) ? x : defaultColorCode }}></div>)}
            </div>
        </>
    )
}