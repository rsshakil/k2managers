export const ItemListData = () => {
    const data = [];
    for (let i = 0; i < 50; i++) {
        const info = {
            item_name: '乳房エックス線検査（マンモグラフィー）',
            item_tag: '令和4年度東京',
            parent_item: '肺がん検診',
            child_item: 'ペプシノゲン 腫瘍マーカー（PSA）エラスターゼ1検査',
            selection: 'CT検査',
            selection_disabled: 'CYFRA',
            reservation_category: '街角検診 はつらつ検診 生き生き検診 がん検診',
        };
        data.push(info);
    }
    return data;

};