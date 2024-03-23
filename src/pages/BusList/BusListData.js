export const BusListData = () => {
    const data = [];
    for (let i = 0; i < 50; i++) {
        const info = {
            route_name: '市役所正面玄関前（マーケット前入口経由）',
            registered_flights: '2',
            facility_type: '',
            update_time: '2022/04/27 16:18',
            create_time: '2022/04/27 12:46',
        };
        data.push(info);
    }
    return data;

};
export const BusWayListData = () => {
    const data = [];
    for (let i = 0; i < 50; i++) {
        const info = {
            bus_stop: '高円寺南四丁目（都営バス）',
            morning_flights: '10:11',
            late_flights: '11:10',
            third_flights: '12:00',
            hiace_flights: '13:20',
        };
        data.push(info);
    }
    return data;

};