const TokenState = require('./TokenState').default


/**
 * 解析 -> 产生ast
 * 
 * programm -> keyDeclare | tableDeclare
 * 
 * key 声明
 * keyDeclare -> Identifier+? Colon [Slash Identifier]  Br tableDeclare
 * 
 * 
 * tableDeclare -> rowDeclare+
 * 
 * 行声明
 * rowDeclare -> Cell+  Br rowDeclare
 * 
 * 单元格
 * 
 * cellDeclar -> Vline? Identifier Vline
 */
class Parser {
    constructor(tokenReader) {
        this.tokenReader = tokenReader
    }
    prog() {
        let body = []
        while (this.tokenReader.peek()) {
            while (this.tokenReader.nextIs(TokenState.Br)) {
                this.tokenReader.read()
            }

            let node = keyDeclare(this.tokenReader)
            if (node) {
                body.push({
                    type: 'json',
                    node
                })
                continue;
            }

            node = tableDeclare(this.tokenReader)

            if (node) {
                body.push({
                    type: 'table',
                    node
                })
                continue;
            }


            throw new Error('无法解析')


        }
        return body
    }
}

// keyDeclare -> Identifier+ Colon [Slash Identifier]  Br tableDeclare
function keyDeclare(tokenReader) {
    let pos = tokenReader.getPos()
    let node
    // 必须为 Identifier+?
    if (tokenReader.nextIs(TokenState.Identifier)) {
        let token = tokenReader.read()
        node = {
            key: token.text
        }
        // 可以为 Identifier+?
        while (tokenReader.nextIs(TokenState.Identifier)) {
            let token = tokenReader.read()
            node.key += token.text
        }

        // 必须为 :
        if (tokenReader.nextIs(TokenState.Colon)) {
            tokenReader.read()
            // 后面必须为 // 或者 换行
            // 可选 // 
            if (tokenReader.nextIs(TokenState.Slash)) {
                tokenReader.read()
                while (!tokenReader.nextIs(TokenState.Br)) {
                    // 合并注释
                    node.comments = node.comments || []
                    node.comments.push(tokenReader.read().text)
                }
            }
            if (tokenReader.nextIs(TokenState.Br)) {
                tokenReader.read()
                // 后面接row

                let table = tableDeclare(tokenReader)

                if (table) {
                    node.table = table
                } else {
                    node.table = []
                }
            } else {
                node = null
            }

        } else {
            node = null
        }
    }
    if (!node) {
        tokenReader.setPos(pos)
        node = null
    }
    return node
}


//  rowDeclare+
function tableDeclare(tokenReader) {
    let rows = []

    while (row = rowDeclare(tokenReader)) {
        rows.push(row)
    }

    if (rows.length == 0) {
        return
    } else {
        return rows
    }
}

// rowDeclare -> Vline? Cell+  Br? rowDeclare
function rowDeclare(tokenReader) {
    let pos = tokenReader.getPos()
    let cells = []

    if (tokenReader.nextIs(TokenState.Vline)) {
        tokenReader.read()
    }


    while (cellNode = cellDeclar(tokenReader)) {
        cells.push(cellNode.value)
    }


    while (tokenReader.nextIs(TokenState.Br)) {
        tokenReader.read()
    }



    if (cells.length == 0) {
        tokenReader.setPos(pos)
        return
    } else {
        return cells
    }
}

//  Identifier Slash  Colon Vline 
function cellDeclar(tokenReader) {
    let pos = tokenReader.getPos()
    let node = { value: '' }

    // Vline 开头
    // if (tokenReader.nextIs(TokenState.Vline)) {
    //     tokenReader.read()
    // }

    // Identifier Slash  Colon 合并
    while (token = tokenReader.peek()) {
        if ([TokenState.Identifier, TokenState.Slash, TokenState.Colon].indexOf(token.state) > -1) {
            tokenReader.read()
            node.value += token.text
        } else {
            break;
        }
    }


    if (tokenReader.nextIs(TokenState.Vline)) {
        tokenReader.read()
        return node
    } else {
        tokenReader.setPos(pos)
        return null
    }
}


exports.default = (tokens) => {
    const parse = new Parser(tokens)
    return parse.prog()
}
