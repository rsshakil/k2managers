export const InstituteListData = () => {
    const data = [];
    for (let i = 0; i < 50; i++) {
        const info = {
            facility_name: '江別市保健センター（若草町６-１） ',
            post_code: '0670004',
            prefectures: '北海道',
            municipalities: '江別市若草町',
            address: '11-12',
            full_address: '西新宿ﾌﾟﾗｲﾑｽｸｴｱ2Ｆ',
            phone_number: '0570-012-489',
            facility_tag: '多摩地区',
            facility1: '',
            facility2: '',
            facility3: '',
        };
        data.push(info);
    }
    return data;

};