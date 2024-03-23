export const returnFlattenObject = (arr) => {
    const flatObject = {};
    for (let i = 0; i < arr.length; i++) {
        for (const property in arr[i]) {
            flatObject[`${property}`] = arr[i][property];
        }
    }
    return flatObject;
};