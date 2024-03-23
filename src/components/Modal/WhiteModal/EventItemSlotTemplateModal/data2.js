export const rowsData = [
    {
        ID: 1, //represents row
        time: '9:30',
        upperLimitReserved: 10,
        colonCancerReserved: 30, //column
        HelicobacterReserved: 40,
        FeverReserved: 19, //column
        gastricReserved: 50,
        ulcerReserved: 34,
        xReserved: 34,
        yReserved: 89,
    },
    {
        ID: 2, //represents row
        time: '10:00',
        upperLimitReserved: 20,
        colonCancerReserved: 330,
        HelicobacterReserved: 430,
        FeverReserved: 19,
        gastricReserved: 50,
        ulcerReserved: 34,
        xReserved: 34,
        yReserved: 89,
    },
    {
        ID: 3, //represents row
        time: '10:30',
        upperLimitReserved: 103,
        colonCancerReserved: 330,
        HelicobacterReserved: 430,
        gastricReserved: 50,
        ulcerReserved: 34,
        xReserved: 34,
        yReserved: 89,
    },
    {
        ID: 4,
        time: '11:00',
        upperLimitReserved: 140,
        colonCancerReserved: 340,
        HelicobacterReserved: 440,
        FeverReserved: 12,
        gastricReserved: 50,
        ulcerReserved: 34,
        xReserved: 34,
        yReserved: 89,
    },
    {
        ID: 5,
        time: '12:00',
        upperLimitReserved: 104,
        colonCancerReserved: 340,
        HelicobacterReserved: 440,
        FeverReserved: 13,
        gastricReserved: 50,
        ulcerReserved: 34,
        xReserved: 34,
        yReserved: 89,
    },
    {
        ID: 6,
        time: '12:30',
        upperLimitReserved: 120,
        colonCancerReserved: 330,
        HelicobacterReserved: 340,
        FeverReserved: 11,
        gastricReserved: 50,
        ulcerReserved: 34,
        xReserved: 34,
        yReserved: 89,
    },
    {
        ID: 7,
        time: '1:00',
        upperLimitReserved: 130,
        colonCancerReserved: 330,
        HelicobacterReserved: 40,
        FeverReserved: 18,
        gastricReserved: 50,
        ulcerReserved: 34,
        xReserved: 34,
        yReserved: 89,
    },
    {
        ID: 8,
        time: '1:30',
        upperLimitReserved: 1033,
        colonCancerReserved: 330,
        HelicobacterReserved: 450,
        FeverReserved: 10,
        gastricReserved: 50,
        ulcerReserved: 34,
        xReserved: 34,
        yReserved: 89,
    },
    {
        ID: 9,
        time: '2:00',
        upperLimitReserved: 510,
        colonCancerReserved: 350,
        HelicobacterReserved: 450,
        FeverReserved: 23,
        gastricReserved: 50,
        ulcerReserved: 34,
        xReserved: 34,
        yReserved: 89,
    },
    {
        ID: 10,
        time: '2:30',
        upperLimitReserved: 150,
        colonCancerReserved: 305,
        HelicobacterReserved: 450,
        FeverReserved: 59,
        gastricReserved: 50,
        ulcerReserved: 34,
        xReserved: 34,
        yReserved: 89,
    },
    {
        ID: 11,
        time: '3:00',
        upperLimitReserved: 150,
        colonCancerReserved: 305,
        HelicobacterReserved: 450,
        FeverReserved: 39,
        gastricReserved: 50,
        ulcerReserved: 34,
        xReserved: 34,
        yReserved: 89,
    },
];
export const columnsData = {
    headers: {
        mappingId: 12,
        insName: '',
        insDate: '',
    },
    slots: [
        {
            id: 1234,
            caption: 'caption 1',
            allowReordering: false,
            fixed: true,
            child: [
                {
                    parentId: 1234,
                    id: 12345, //unique
                    caption: '開催時間',
                    format: 'string',
                    cssClass: false,
                    chained: false, //is chained(dark colored chain) or not(gray colored chain)
                    displayChain: false, //chainable or not
                    chainedWith: null, //id
                    fixed: true,
                    dataField: 'time',
                    width: 92,
                    allowReordering: false,
                    allowEditing: false,
                    allowSorting: false,
                    prev: null,
                    next: 12349,
                    isLastElement: false,
                    gChild: [],
                },
            ],
        },
        {
            id: 432,
            caption: 'caption 2',
            allowReordering: false,
            //upper limit
            child: [
                {
                    //parent
                    parentId: 432,
                    id: 12349, //unique
                    caption: 'Upper Limit',
                    format: 'string',
                    cssClass: true,
                    chained: false,
                    displayChain: false,
                    chainedWith: null, //id
                    prev: 12345,
                    next: 12399,
                    allowReordering: false,
                    isLastElement: false,
                    gChild: [
                        // reserved
                        {
                            parentId: 12349,
                            dataField: 'upperLimitReserved',
                            caption: '予約',
                            width: 92,
                            allowEditing: false,
                            allowSorting: false,
                            allowReordering: false,
                        },
                    ],
                },
            ],
        },
        {
            id: 1236,
            caption: 'caption 3',
            allowReordering: true,
            //fever , helico bactor, colon
            child: [
                //colon cancer
                {
                    parentId: 1236,
                    id: 12399, //unique
                    caption: '大腸がん検診',
                    format: 'string',
                    cssClass: true,
                    chained: true,
                    displayChain: true,
                    chainedWith: 12395, //id
                    prev: 12349,
                    next: 12395,
                    allowReordering: false,
                    isLastElement: false,
                    gChild: [
                        {
                            parentId: 12399,
                            dataField: 'colonCancerReserved',
                            caption: '予約',
                            width: 92,
                            allowEditing: false,
                            allowSorting: false,
                            allowReordering: false,
                        },
                    ],
                },
                //  helico bactor
                {
                    parentId: 1236,
                    id: 12395, //unique
                    caption: 'ピロリ菌',
                    format: 'string',
                    cssClass: true,
                    chained: true,
                    displayChain: true,
                    chainedWith: 12377, //id
                    prev: 12399,
                    next: 12377,
                    allowReordering: false,
                    isLastElement: false,
                    gChild: [
                        {
                            parentId: 12395,
                            dataField: 'HelicobacterReserved',
                            caption: '予約',
                            width: 92,
                            allowEditing: false,
                            allowSorting: false,
                            allowReordering: false,
                        },
                    ],
                },
                // fever
                {
                    parentId: 1236,
                    id: 12377, //unique
                    caption: 'Fever',
                    format: 'string',
                    cssClass: true,
                    chained: false,
                    displayChain: true,
                    chainedWith: 12395, //id
                    prev: 12395,
                    next: 11111,
                    allowReordering: false,
                    isLastElement: false,
                    gChild: [
                        {
                            parentId: 12377,
                            dataField: 'FeverReserved',
                            caption: '予約',
                            width: 92,
                            allowEditing: false,
                            allowSorting: false,
                            allowReordering: false,
                        },
                    ],
                },
            ],
        },
        {
            id: 123,
            caption: 'caption 4',
            //gastric and ulcer
            allowReordering: true,
            child: [
                //gastric
                {
                    parentId: 123,
                    id: 11111, //unique
                    caption: 'Gastric',
                    format: 'string',
                    cssClass: true,
                    chained: true,
                    displayChain: true,
                    chainedWith: 12395, //id
                    prev: 12377,
                    next: 12432,
                    allowReordering: false,
                    isLastElement: false,
                    gChild: [
                        {
                            parentId: 11111,
                            dataField: 'gastricReserved',
                            caption: '予約',
                            width: 92,
                            allowEditing: false,
                            allowSorting: false,
                            allowReordering: false,
                        },
                    ],
                },
                //  ulcer
                {
                    parentId: 123,
                    id: 12432, //unique
                    caption: 'Ulcer',
                    format: 'string',

                    cssClass: true,
                    chained: false,
                    displayChain: true,
                    chainedWith: 12377, //id
                    prev: 11111,
                    next: 11234,
                    allowReordering: false,
                    isLastElement: false,
                    gChild: [
                        {
                            parentId: 12432,
                            dataField: 'ulcerReserved',
                            caption: '予約',
                            width: 92,
                            allowEditing: false,
                            allowSorting: false,
                            allowReordering: false,
                        },
                    ],
                },
            ],
        },

        //x
        {
            id: 923,
            caption: 'caption 5',
            allowReordering: true,
            child: [
                //x
                {
                    parentId: 923,
                    id: 11234, //unique
                    caption: 'x',
                    format: 'string',
                    cssClass: true,
                    chained: false,
                    displayChain: true,
                    chainedWith: 12395, //id
                    prev: 12432,
                    next: 117894,
                    allowReordering: false,
                    isLastElement: false,
                    gChild: [
                        {
                            parentId: 11234,
                            dataField: 'xReserved',
                            caption: '予約',
                            width: 92,
                            allowEditing: false,
                            allowSorting: false,
                            allowReordering: false,
                        },
                    ],
                },
            ],
        },
        //y
        {
            id: 92333,
            caption: 'caption 6',
            allowReordering: true,
            //y
            child: [
                //x
                {
                    parentId: 92333,
                    id: 117894, //unique
                    caption: 'y',
                    format: 'string',
                    cssClass: true,
                    chained: false,
                    displayChain: true,
                    chainedWith: 12395, //id
                    prev: 11234,
                    next: null,
                    isLastElement: true,
                    allowReordering: false,
                    gChild: [
                        {
                            parentId: 117894,
                            dataField: 'yReserved',
                            caption: '予約',
                            width: 92,
                            allowEditing: false,
                            allowSorting: false,
                            allowReordering: false,
                        },
                    ],
                },
            ],
        },
    ],
};
