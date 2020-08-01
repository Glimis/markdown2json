const { lexer, parser } = require('../index')


const markdown = `
张/三   :   // 全部
| na:me | value | 
| 张/三 | 3|
| 李四//1 | 4|
| 王五: 1 | 4|

2: // 激活
| name | value |
| 张三 | 3|
| 李四 | 4|
`

// const markdown = `


// | na:me | value | 
// | 张/三 | 3|
// | 李四//1 | 4|
// | 王五: 1 | 4|
// | name | value |
// | 张三 | 3|
// | 李四 | 4|
// `
console.log(parser(lexer(markdown)))
