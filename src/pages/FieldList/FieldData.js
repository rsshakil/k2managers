import React from "react";

export const FieldtData = () => {
    const data = [];
    for (let i = 0; i < 50; i++) {
        const info = {
            field_name: '国民健康保険加入者かどうか',
            page_type: '個人情報',
            field_type: 'キー／値の一覧',
            initial_value: 'Yes',
            filter: ' ',
            browsing_restrictions: ' ',
            required: ' ',
            multiple_choice: ' ',
            time_stamp: ' ',
            tag: ' ',
            edit_dateTime: '1680361199',
        };
        data.push(info);
    }
    return data;

};