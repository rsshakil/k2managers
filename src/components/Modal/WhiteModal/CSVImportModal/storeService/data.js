export const customerFieldDataSource = [
    {
        customerFieldId: 1,
        FieldName: '住所1',
        CharacterTypeId: 1,
        CharacterType: [1, 7],
        MinimumCharacters: '',
        MaximumCharacters: '',
    },
    {
        customerFieldId: 2,
        FieldName: '住所2',
        CharacterTypeId: 2,
        CharacterType: [2, 4, 5],
        MinimumCharacters: '',
        MaximumCharacters: '',
    },
    {
        customerFieldId: 3,
        FieldName: '電話番号',
        CharacterTypeId: 3,
        CharacterType: [1, 2],
        MinimumCharacters: '',
        MaximumCharacters: '',
    },
    {
        customerFieldId: 4,
        FieldName: '送付先住所',
        CharacterTypeId: 4,
        CharacterType: [1],
        MinimumCharacters: '',
        MaximumCharacters: '',
    },
];

export const systemFieldDataSource = [
    {
        customerFieldId: 1,
        FieldName: '住所1',
        CharacterTypeId: 1,
        CharacterType: [],
        MinimumCharacters: '',
        MaximumCharacters: '',
    },
    {
        customerFieldId: 1,
        FieldName: '住所2',
        CharacterTypeId: 2,
        CharacterType: [],
        MinimumCharacters: '',
        MaximumCharacters: '',
    },
    {
        customerFieldId: 1,
        FieldName: '電話番号',
        CharacterTypeId: 3,
        CharacterType: [1],
        MinimumCharacters: '',
        MaximumCharacters: '',
    },
    {
        customerFieldId: 1,
        FieldName: '送付先住所',
        CharacterTypeId: 4,
        CharacterType: [],
        MinimumCharacters: '',
        MaximumCharacters: '',
    },
];

export const tagBoxDataSource = [
    { CharacterTypeId: 1, Name: '英大' },
    { CharacterTypeId: 2, Name: '数字' },
    { CharacterTypeId: 3, Name: 'かな' },
    { CharacterTypeId: 4, Name: '全カナ' },
    { CharacterTypeId: 5, Name: '記号' },
    { CharacterTypeId: 6, Name: '半カナ' },
    { CharacterTypeId: 7, Name: '日本語' },
    { CharacterTypeId: 8, Name: '漢字' },
    { CharacterTypeId: 9, Name: 'カナ' },
];
