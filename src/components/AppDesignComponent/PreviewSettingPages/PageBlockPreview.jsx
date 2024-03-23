export default function PageBlockPreview({ data = [] }) {
    let { blocks = [] } = data;

    const blockTitle = (data) => {
        let title = '[' + data.blockPageTitle + ']';
        switch (data.key) {
            case 'BUTTON':
                const buttonTitles = [data.button1Text, data.button2Text].filter((e) => e);
                title += buttonTitles.join(',');
                break;

            case 'INFORMATION_AREA':
                const infoAreaTitles = [data.informationAreaTitle];
                title += infoAreaTitles.join(',');
                break;

            case 'TEXT_LINK':
                const textLinkTitles = [data.linkText];
                title += textLinkTitles.join(',');
                break;

            case 'H1':
            case 'H2':
            case 'H3':
            case 'H4':
            case 'H5':
            case 'H6':
                const hTitles = [data.headingText];
                title += hTitles.join(',');
                break;

            default:
                break;
        }

        return title;
    };
    blocks = blocks.map((row) => {
        let row2 = Object.assign({}, row);
        row2.blockListCaption = blockTitle(row);
        return row2;
    });

    return (
        <div className={`relative w-full h-full`}>
            {blocks.map((x) => (
                <div
                    key={x.appPageBlockId}
                    className="w-full h-12 align-middle grid grid-cols-1 mb-4 content-center align-center text-white bg-blue-400"
                >
                    <p className="text-center content-center text-white line-clamp-2" title={x.blockListCaption}>
                        {x.blockListCaption}
                    </p>
                </div>
            ))}
        </div>
    );
}
