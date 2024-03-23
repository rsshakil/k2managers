export function checkEmptyValueInNestedObject(tree) {
    return tree.every(node =>
        node.name &&
        (!node.children.length || checkEmptyValueInNestedObject(node.children))
    );
}