const itemsDriveD = [];
const itemsDriveC = [
    {
        id: '612',
        name: '[3]can be a parent&child',
        icon: 'home',
        isDirectory: true,
        expanded: true,
        items: [],
    },
    {
        id: '629',
        name: '[4]can be a parent&child',
        icon: 'home',
        isDirectory: true,
        expanded: true,
        items: [],
    },
];

export default {
    getItemsDriveC() {
        return itemsDriveC;
    },
    getItemsDriveD() {
        return itemsDriveD;
    },
};
