export const getModalDemoData = (length) => {
    const data = [];
    for (let i = 0; i < length; i++) {
        const information = {
            titleLabel: `お知らせ${
                i + 1
            }タイトル（128文字まで　改行不可　TELなど不可）`,
            titlePlaceholder: `お知らせ${i + 1}のタイトルを入力してください`,
            contentLabel: `お知らせ${i + 1}内容（2048文字まで　改行可）`,
            contentPlaceholder: `お知らせ${i + 1}の内容を入力してください。
            以下のタグでリンクが作れます
            <a href="tel:ハイフン抜きの電話番号">ハイフン入りの電話番号</a>
            <a href=”mailto:xxxx@mailmarketing.jp”>メールはこちら</a>
            <a href="https://google.com">ウェブサイト</a>`,
            colorLabel: `お知らせ${i + 1}カラー`,
            colorValues: ["青","黄","赤"],
            titleName: `title-${i + 1}`,
            contentName: `content-${i + 1}`,
            colorName: `color-${i + 1}`,
        };
        data.push(information);
    }
    return data;
};
export const staticData={
    titleLabel: (number)=>`お知らせ${number}タイトル（128文字まで　改行不可　TELなど不可）`,
    titlePlaceholder: (number)=>`お知らせ${number}のタイトルを入力してください`,
    contentLabel: (number)=>`お知らせ${number}内容（2048文字まで　改行可）`,
    contentPlaceholder: (number)=>`お知らせ${number}の内容を入力してください。
以下のタグでリンクが作れます
<a href="tel:ハイフン抜きの電話番号">ハイフン入りの電話番号</a>
<a href=”mailto:xxxx@mailmarketing.jp”>メールはこちら</a>
<a href="https://google.com">ウェブサイト</a>`,
    colorLabel: (number)=>`お知らせ${number}カラー`,
}