export const itemListData = [
    { id: 1, text: "胃がん検診（バリウム普通）", disabled: false },
    { id: 11, text: "胃がん検診（バリウム普通）AA", disabled: false },
    { id: 12, text: "AA", disabled: true },
    { id: 13, text: "GG", disabled: false },
    { id: 15, text: "胃がん検診（バリウム普通）2", disabled: false },
    { id: 14, text: "AABB", disabled: true },
    { id: 16, text: "胃がん検診（バリウム普通）AA", disabled: false },
    { id: 17, text: "胃がん検診（バリウム普通）3", disabled: false },
    { id: 18, text: "胃がん検診（バリウム普通）4", disabled: false },
    { id: 19, text: "胃がん検診（バリウム普通）5", disabled: false },
    { id: 20, text: "胃がん検診（バリウム普通）6", disabled: false },
    { id: 21, text: "胃がん検診（バリウム普通）7", disabled: false },
    { id: 22, text: "BB", disabled: true },
    { id: 2, text: "胃がん検診（バリウム普通）BB", disabled: false },
    { id: 3, text: "CC", disabled: false },
    { id: 4, text: "DD", disabled: false },
    { id: 5, text: "EE", disabled: false },
    { id: 6, text: "FF", visible: false },
    { id: 7, text: "SuperPlasma 500", visible: false },
    { id: 8, text: "SuperPlasma 400", visible: false }
];

export const itemConditionsData = [
    { id: 1, name: 'New filter 1' },
    { id: 2, name: 'New filter 2' },
    { id: 3, name: 'New filter 3' },
    { id: 4, name: 'New filter 4' },
    { id: 5, name: 'New filter 5' },
];

export const itemOptionsData = [
    { id: 1, name: '選択必須' },
    { id: 2, name: '初期状態で選択済み' },
    { id: 3, name: '単独選択不可' },
    { id: 4, name: '変更不可' },
];

export const eventItemData = {
    dragList: [
        {
            Name: "Faefa",
            Title: "Faefa",
            id: 1111,
            buttonId: 431,
            name: "Faefa Can Parent and Child",
            isDirectory: true,
            expanded: true,
            icon: "home",
            items: [],
            selectedItemConditions: [
                { id: 334, amount: 2000 },
                { id: 344, amount: 3000 },
            ],
            selectedItemOptions: [1,0,3],
            ID: 1111
        },
        {
            Name: "Test11",
            Title: "Test11",
            id: 4444,
            buttonId: 370,
            name: "Test11 Can Parent and Child",
            isDirectory: true,
            expanded: true,
            icon: "home",
            items: [],
            selectedItemConditions: [
                { id: 336, amount: 4000 },
            ],
            selectedItemOptions: [0,2,0],
            ID: 4444
        },
        {
            Name: "ITEMAAA02",
            Title: "ITEMAAA02",
            id: 3333,
            buttonId: 103,
            name: "ITEMAAA02 Can Parent and Child",
            isDirectory: true,
            expanded: true,
            icon: "home",
            items: [],
            selectedItemConditions: [
                { id: 336, amount: 5000 },
                { id: 334, amount: 1000 },
                { id: 344, amount: 2000 },
            ],
            selectedItemOptions: [0,2,3],
            ID: 3333
        },
    ],
    memo: 'This is test memo'
}