
import React from "react";

export const LogListData = () => {
    const data = [];
    for (let i = 0; i < 50; i++) {
        const info = {
            date_time: '2020/9/11 12:07:59',
            operation_place: '管理画面',
            account_id: 'yama1100',
            full_name: '西田 美波',
            operation_details: '郵便番号の変更成功',
            detail: '',
        };
        data.push(info);
    }
    return data;

};