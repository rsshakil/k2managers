//Main->https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxFilterBuilder/
//field->https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxFilterBuilder/Configuration/fields/
//format->https://js.devexpress.com/Documentation/ApiReference/Common/Object_Structures/format/
//ifdate->https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxFilterBuilder/Configuration/fields/#dataType

export const fieldsValueJSON = {
    values: {},
    fields: [
        {
            caption: 'BirthDay',
            dataField: 'ID001',
            name: 'ID001',
            dataType: 'date',
            format: undefined,
            trueText: 'true',
            falseText: 'false',
            calculateFilterExpression: [],
            filterOperations: ['=', '<>', '<', '>', '<=', '>=', 'isblank', 'isnotblank'],
            lookup: {
                allowClearing: 'false',
                dataSource: [
                    { id: 1, name: 'Touhid', birthday: new Date('2002-12-10') },
                    { id: 2, name: 'Naima', birthday: new Date('2003-12-10') },
                    { id: 3, name: 'Linkon', birthday: new Date('2004-12-10') },
                    { id: 4, name: 'Partho', birthday: new Date('2005-12-10') },
                    { id: 5, name: 'Iram', birthday: new Date('2006-12-10') },
                ],
                displayExpr: 'name',
                valueExpr: 'birthday',
            },
        },
        {
            caption: 'Great Engineer',
            dataField: 'ID002',
            name: 'ID002',
            dataType: 'number',
            format: undefined,
            trueText: 'true',
            falseText: 'false',
            calculateFilterExpression: [],
            filterOperations: ['=', '<>', '<', '>', '<=', '>=', 'isblank', 'isnotblank'],
            lookup: {
                allowClearing: 'false',
                dataSource: [
                    { id: 1, name: 'Touhid', score: 999999 },
                    { id: 2, name: 'Naima', score: 50 },
                    { id: 3, name: 'Linkon', score: 50 },
                    { id: 4, name: 'Partho', score: 999 },
                    { id: 5, name: 'Iram', score: 9999 },
                ],
                displayExpr: 'name',
                valueExpr: 'score',
            },
        },
        {
            caption: 'Love masaru-dan',
            dataField: 'ID003',
            name: 'ID003',
            dataType: 'boolean',
            format: undefined,
            trueText: 'love so much',
            falseText: 'love',
            calculateFilterExpression: [],
            filterOperations: ['=', '<>', 'isblank', 'isnotblank'],
            lookup: undefined,
        },
        {
            caption: 'Time for bed',
            dataField: 'ID004',
            name: 'ID004',
            dataType: 'datetime',
            //  format: "longTime",
            trueText: 'true',
            falseText: 'false',
            calculateFilterExpression: [],
            filterOperations: ['=', '<>', '<', '>', '<=', '>=', 'isblank', 'isnotblank'],
            lookup: undefined,
        },
        {
            caption: 'coding skills',
            dataField: 'ID005',
            name: 'ID005',
            dataType: 'string',
            format: undefined,
            trueText: 'true',
            falseText: 'false',
            calculateFilterExpression: [],
            filterOperations: ['contains', 'notcontains', 'startswith', 'endswith', '=', '<>', 'isblank', 'isnotblank'],
            lookup: {
                allowClearing: 'true',
                dataSource: [
                    { id: 1, code: 'CSS' },
                    { id: 2, code: 'REACT' },
                    { id: 31, code: 'GraphQL' },
                    { id: 42, code: 'Vanilla JS' },
                    { id: 55, code: 'PHP' },
                    { id: 68, code: 'Laravel' },
                    { id: 72, code: 'Vue.js' },
                    { id: 72, code: 'Tailwind' },
                    { id: 72, code: 'Shell Script' },
                    { id: 72, code: 'VPC' },
                    { id: 72, code: 'LAMBDA' },
                ],
                displayExpr: 'code',
                valueExpr: 'code',
            },
        },
        {
            caption: 'Employee Info',
            dataField: 'ID006',
            name: 'ID006',
            dataType: 'object',
            format: undefined,
            trueText: 'true',
            falseText: 'false',
            calculateFilterExpression: [],
            filterOperations: ['isblank', 'isnotblank'],
            lookup: {
                allowClearing: 'false',
                dataSource: [
                    { id: 1, department: 'Accounting' },
                    { id: 2, department: 'HR' },
                    { id: 3, department: 'Development' },
                    { id: 4, department: 'SQA' },
                ],
                displayExpr: 'department',
                valueExpr: 'department',
            },
        },
        {
            caption: 'Joining Date',
            dataField: 'ID007',
            name: 'ID007',
            dataType: 'date',
            format: 'shortDate',
            trueText: 'true',
            falseText: 'false',
            calculateFilterExpression: [],
            filterOperations: ['between'],
            lookup: undefined,
        },
        {
            caption: 'Entry and Exit time',
            dataField: 'ID008',
            name: 'ID008',
            dataType: 'datetime',
            format: 'shortTime',
            trueText: 'true',
            falseText: 'false',
            calculateFilterExpression: [],
            filterOperations: ['=', '<>', '<', '>', '<=', '>=', 'isblank', 'isnotblank'],
            lookup: {
                allowClearing: 'false',
                dataSource: [
                    { id: 1, track: 'Entry Time', time: new Date('2022-06-13 09:00:00') },
                    { id: 2, track: 'Exit Time', time: new Date('2022-06-13 16:00:00') },
                ],
                displayExpr: 'track',
                valueExpr: 'time',
            },
        },
        {
            caption: 'Foods',
            dataField: 'ID009',
            name: 'ID009',
            dataType: 'string',
            format: undefined,
            trueText: 'true',
            falseText: 'false',
            calculateFilterExpression: [],
            filterOperations: ['contains', 'notcontains', 'startswith', 'endswith', '=', '<>', 'isblank', 'isnotblank'],
            lookup: {
                allowClearing: 'true',
                dataSource: [
                    { id: 1, name: 'Apple' },
                    { id: 2, name: 'Mango' },
                    { id: 3, name: 'Orange' },
                    { id: 4, name: 'Champon' },
                ],
                displayExpr: 'name',
                valueExpr: 'name',
            },
        },
        {
            caption: 'Coder Rank',
            dataField: 'ID010',
            name: 'ID010',
            dataType: 'number',
            format: undefined,
            trueText: 'true',
            falseText: 'false',
            calculateFilterExpression: [],
            filterOperations: ['between'],
            lookup: undefined,
        },
        {
            caption: 'Joining Members Date',
            dataField: 'ID011',
            name: 'ID011',
            dataType: 'date',
            format: 'shortDate',
            trueText: 'true',
            falseText: 'false',
            calculateFilterExpression: [],
            filterOperations: ['=', '<>', '<', '>', '<=', '>=', 'isblank', 'isnotblank'],
            lookup: {
                allowClearing: 'false',
                dataSource: [
                    { id: 1, name: 'Touhid', joinDate: new Date('2022-12-10') },
                    { id: 2, name: 'Naima', joinDate: new Date('2022/01/01') },
                    { id: 3, name: 'Linkon', joinDate: new Date('20210601AAA') },
                    { id: 4, name: 'Partha Sarathi kundu', joinDate: new Date('2019/02/15') },
                    { id: 5, name: 'Iram Shahzad', joinDate: new Date('2020/01/05') },
                ],
                displayExpr: 'name',
                valueExpr: 'joinDate',
            },
        },
        {
            caption: 'Coder Score',
            dataField: 'ID012',
            name: 'ID012',
            dataType: 'number',
            format: undefined,
            trueText: 'true',
            falseText: 'false',
            calculateFilterExpression: [],
            filterOperations: ['=', '<>', '<', '>', '<=', '>=', 'isblank', 'isnotblank'],
            lookup: {
                allowClearing: 'false',
                dataSource: [
                    { id: 0, name: 'Test', score: 50 },
                    { id: 1, name: 'Amature', score: 100 },
                    { id: 2, name: 'Gold', score: 1000 },
                    { id: 3, name: 'Silver', score: 10000 },
                    { id: 4, name: 'Diamond', score: 100000 },
                    { id: 5, name: 'Ace', score: 1000000 },
                ],
                displayExpr: 'name',
                valueExpr: 'score',
            },
        },
    ],
};
