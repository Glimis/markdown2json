const generate = require('../Generate').default



const ast = [{
    type: 'json',
    node: [{
        key: '张/三',
        comments: ['全部'],
        table: [
            ['na: me', 'value'],
            ['张/三三三三三', '3'],
            ['李四//1', '4'],
            ['王五:1', '4']
        ]
    }]
}]


console.log(generate(ast))