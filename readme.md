### 输入

```javascript
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
```
### 输出

```javascript
[{
    type: 'json',
    node: { key: '张/三   ', 
        comments: ["全部"], 
        table: [
                ['na:me','value'],
                [ '张/三' , '3']
                [ '李四//1' , '4']
                [ '王五: 1' , '4']
            ] 
        }
},{
    // ...
}]
```


### 输入

```javascript
const { lexer, parser } = require('../index')

const markdown = `
| na:me | value | 
| 张/三 | 3|
| 李四//1 | 4|
| 王五: 1 | 4|
`
```
### 输出

```javascript
[
    ['na:me','value'],
    [ '张/三' , '3']
    [ '李四//1' , '4']
    [ '王五: 1' , '4']
] 
```