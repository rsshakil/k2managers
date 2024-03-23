const dxFilterBuilderLib = {};

const groupOperations = {
    0: 'and',
    1: 'or',
};

dxFilterBuilderLib.storeInLS = (fieldBuilder, page) => {
    window.sessionStorage.setItem(page, JSON.stringify(fieldBuilder));
};

// Step 1 Read Data from JSON --> convert it dx Array which pattern dx accepted
function findGroupConditionKey(obj) {
    // return And, Or, NotAnd, NotOr
    for (let key in groupOperations) {
        const groupCondition = obj?.[groupOperations[key]];
        if (groupCondition !== undefined) {
            return groupOperations[key];
        }
    }
}
// Recursive Function

let filterBuilderFinalArray = [];
let storeKey = [];

function recursionFunBuildArray(groupArray, groupArrayLength) {
    let filterBuilderCondition = [];
    groupArray.forEach((findCondition) => {
        let isAndOrKey = findGroupConditionKey(findCondition);

        if (isAndOrKey) {
            storeKey.push(isAndOrKey);
            recursionFunBuildArray(findCondition?.[isAndOrKey], findCondition?.[isAndOrKey].length);
        } else {
            filterBuilderCondition.push(findCondition); // ['Product Name', '=', 'Super']

            filterBuilderFinalArray.push(filterBuilderCondition); // [['Product Name', '=', 'Super'], ['Product Name', '=', 'Super']]

            if (filterBuilderCondition.length === 2) {
                let getStoreKeyElement = storeKey.pop();

                filterBuilderCondition.splice(1, 0, getStoreKeyElement); // GroupOperation Or/And
                filterBuilderCondition.join();
            }
        }
    });

    return filterBuilderCondition;
}

dxFilterBuilderLib.getLsConvertArrayShowDxFilter = (page) => {
    let getLs = JSON.parse(window.sessionStorage.getItem(page));
    try {
        let filterBuilderConditionsArray;
        if (getLs == null) {
            getLs = {
                fields: [],
            };
        }
        const fieldsLS = getLs?.fields;
        let key = findGroupConditionKey(getLs?.values),
            groupArray = getLs?.values?.[key];
        if (groupArray !== undefined) {
            filterBuilderConditionsArray = recursionFunBuildArray(groupArray, groupArray.length);
        } else {
            filterBuilderConditionsArray = null;
        }
        return { filterBuilderConditionsArray, fieldsLS };
    } catch (e) {
        console.log('Error in getLsConvertArrayShowDxFilter', e.message);
    }
};

export default dxFilterBuilderLib;
