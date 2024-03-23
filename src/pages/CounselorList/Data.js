import img001 from "../../img/counselor/ex001.jpg"
import img002 from "../../img/counselor/ex002.jpg"
import img003 from "../../img/counselor/ex003.jpg"
import img004 from "../../img/counselor/ex004.jpg"
import img005 from "../../img/counselor/ex005.jpg"
import img006 from "../../img/counselor/ex006.jpg"
import img007 from "../../img/counselor/ex007.jpg"
import img008 from "../../img/counselor/ex008.jpg"
import img009 from "../../img/counselor/ex009.jpg"
import img010 from "../../img/counselor/ex010.jpg"
import Image3 from "../../img/testImg.jpeg"
export const CounselorListData = () => {
    const data = [];
    const IMG_ARRAY = [Image3, img001, img002, img003, img004, img005, img006, img007, img008, img009, img010];
    for (let i = 0; i < 50; i++) {
        var number = Math.floor(Math.random() * 11);
        const info = {
            image: IMG_ARRAY[number],
            name: '西田 美波',
            tag_name: '#早番 #土曜休み #管理栄養士',
            update_time: '2022/04/27 16:20',
            create_time: '2022/04/27 12:46',
        };
        data.push(info);
    }
    return data;
};