import { MdOutlineDoNotDisturbAlt } from 'react-icons/md';
import React from 'react';

export const CategoryListData = () => {
    const data = [];
    for (let i = 0; i < 50; i++) {
        const info = {
            booking: 'ぴぱ検診',
            maintenance: <MdOutlineDoNotDisturbAlt className="text-red-400 ml-[16px]" />,
            facility_type: 'バス検診',
            event: '令和4年度　江別市「集団けんしん」 インターネット予約',
            number_of_access: '193245',
        };
        data.push(info);
    }
    return data;
};
