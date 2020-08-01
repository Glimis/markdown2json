const { sum, map, chain, max } = require('lodash')
/**
 * 反向生成
 * 
 *
 * 1. 
 * type:'' 
 * node:{
 *     key: ' ',
 *     comments: [ '全部' ],
 *     table: [
 *       [ 'na:me ', 'value ' ]
 *     ]
 *   }
 * 
 * 2. 
 * [ [] ,[] ]
 */
exports.default = (ast) => {
    const generate = new Generate()
    return generate.print(ast)
}

class Generate {
    constructor() {
        this.buffer = new Buffer()
    }

    print(ast) {
        ast.forEach(({ type, node }) => {
            switch (type) {
                case 'json':
                    this.jsons_format(node)
                    break;
                case 'table':
                    this.table_format(node)
                    break;
            }
        })


        return this.buffer.format()
    }
    jsons_format(ast) {
        ast.forEach((item, index) => {
            this.json_format(item, index)
        })
    }

    json_format({ key, comments = [], table }) {
        // 组装注释
        let arrStr = [key, ":"]
        if (comments.length > 0) {
            arrStr.push('//')
            arrStr = arrStr.concat(comments)
        }
        this.buffer.append(arrStr.join(' '))
        this.table_format(table)
    }

    table_format(table = []) {
        // 设置当前table的宽度
        this.rowsWidth = getRowsWidth(table)
        this.tableWidth = getTableWidth(this.rowsWidth)

        table.forEach((item, index) => {
            this.row_format(item, index)
        })
    }

    row_format(row = [], index) {
        // 当前行宽度
        this.rowWidth = this.rowsWidth[index]

        // 模拟渲染宽度,包含小数
        this.rowRenderNeedWidth = 0;
        // 模拟渲染宽度,实际使用空格取整
        this.rowRenderWidth = 0;
        let rowStrArr = row.map((item, index) => {
            return this.cell_format(item, index)
        })

        let str = rowStrArr.join(' | ')
        this.buffer.append(`| ${str} |`)
    }

    // 补全空格
    cell_format(name, index) {
        // 设置需要
        let width = this.tableWidth[index]
        // 前方已渲染
        let renderWidth = this.rowRenderWidth
        // 前方实际需要
        let rowRenderNeedWidth = this.rowRenderWidth
        // 已有
        let hasWidth = this.rowWidth[index]

        // 需要补空格数 = 设置需要 - 已有 + (实际需要>已渲染?1:0)
        let needNumber = width - hasWidth + Math.round(rowRenderNeedWidth - renderWidth)
        // 实际补空格数 --》 取证
        let number = Math.round(needNumber)

        return name + new Array(number).fill(' ').join('');
    }
}

function getRowsWidth(table) {
    return table.map(getRowWidth)
}
// 计算宽度  --> 获取每行最长
function getTableWidth(rowsWidth) {
    let rowWidth = rowsWidth
        // 读取每行每列最大数
        .reduce((maxRow, newMaxRow) => {
            // 使用最大长度
            const length = max([maxRow.length, newMaxRow.length])
            const rs = []
            for (let i = 0; i < length; i++) {
                // 选择相同序号的最大值
                rs[i] = max([maxRow[i], newMaxRow[i]])
            }
            return rs
        })

    return rowWidth
}

function getRowWidth(row) {
    return row.map(getCellWidth)
}

/**
 * 简易渲染宽度算法,assic == 1,其余为1.66
 */
function getCellWidth(cell) {
    return chain(cell)
        .map(letter => {
            return letter.charCodeAt() > 255 ? 1.66 : 1
        })
        .sum()
        .value()
}

class Buffer {
    constructor() {
        this.value = [];
    }
    append(str) {
        this.value.push(str)
    }

    format() {
        return this.value.join("\r\n")
    }
}