const { lexer, parser } = require('../index')


const markdown1 = `
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



const markdown2 = `
1:
| label                 | 安信美         | 商家名             | 产品名        | 安信美             | 商家ID | 客户   | 安信美 | 商家ID | 客户  | 安信美 | 商家ID | 客户 | 安信美 | 商家ID | 客户 |
| prop                  | hospital_name | stat.cashback_cnt | product_name | stat.cashback_cnt | id    | ss_id | name  | id     | ss_id |       |       |     |       |        |     |
| width                 | 100           |                   | 50           |                   |       |       |       |        |       | axn   |       | kh  |       |        |     |
| minWidth              |               |                   |              |                   |       |       |       |        |       |       |       |     |       |        |     |
| align                 | left          |                   |              |                   |       |       |       |        |       |       |       |     |       |        |     |
| show-overflow-tooltip | true          | true              | true         |                   |       |       |       |        |       |       |       |     |       |        |     |
| min-width             |               | 200               |              |                   |       |       |       |        |       |       |       |     |       |        |     |



2:
| label                 | 2安信美        | 商家名        | 产品名        | 安信美             | 商家ID | 客户   | 安信美 | 商家ID | 客户  | 安信美 | 商家ID | 客户 | 安信美 | 商家ID | 客户 |  |
| prop                  | hospital_name | product_name | product_name | stat.cashback_cnt | id    | ss_id | name  | id     | ss_id |       |       |     |       |        |     |  |
| width                 | 100           |              | 50           |                   |       |       |       |        |       | axn   |       | kh  |       |        |     |  |
| minWidth              |               |              |              |                   |       |       |       |        |       |       |       |     |       |        |     |  |
| align                 | left          |              |              |                   |       |       |       |        |       |       |       |     |       |        |     |  |
| show-overflow-tooltip | true          | true         | true         |                   |       |       |       |        |       |       |       |     |       |        |     |  |
| min-width             |               | 200          |              |                   |       |       |       |        |       |       |       |     |       |        |     |  |

3:
| label                 | 3安信美        | 商家名        | 产品名        | 安信美             | 商家ID | 客户   | 安信美 | 商家ID | 客户  | 安信美 | 商家ID | 客户 | 安信美 | 商家ID | 客户 |  |
| prop                  | hospital_name | product_name | product_name | stat.cashback_cnt | id    | ss_id | name  | id     | ss_id |       |       |     |       |        |     |  |
| width                 | 100           |              | 50           |                   |       |       |       |        |       | axn   |       | kh  |       |        |     |  |
| minWidth              |               |              |              |                   |       |       |       |        |       |       |       |     |       |        |     |  |
| align                 | left          |              |              |                   |       |       |       |        |       |       |       |     |       |        |     |  |
| show-overflow-tooltip | true          | true         | true         |                   |       |       |       |        |       |       |       |     |       |        |     |  |
| min-width             |               | 200          |              |                   |       |       |       |        |       |       |       |     |       |        |     |  |

4:
| label                 | 4安信美        | 商家名        | 产品名        | 安信美             | 商家ID | 客户   | 安信美 | 商家ID | 客户  | 安信美 | 商家ID | 客户 | 安信美 | 商家ID | 客户 |  |
| prop                  | hospital_name | product_name | product_name | stat.cashback_cnt | id    | ss_id | name  | id     | ss_id |       |       |     |       |        |     |  |
| width                 | 100           |              | 50           |                   |       |       |       |        |       | axn   |       | kh  |       |        |     |  |
| minWidth              |               |              |              |                   |       |       |       |        |       |       |       |     |       |        |     |  |
| align                 | left          |              |              |                   |       |       |       |        |       |       |       |     |       |        |     |  |
| show-overflow-tooltip | true          | true         | true         |                   |       |       |       |        |       |       |       |     |       |        |     |  |
| min-width             |               | 200          |              |                   |       |       |       |        |       |       |       |     |       |        |     |  |

`

console.log(parser(lexer(markdown1)))

console.log(parser(lexer(markdown2)))

let a = parser(lexer(markdown2))
debugger