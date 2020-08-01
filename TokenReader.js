const TokenState = require('./TokenState').default
/**
 * token 流
 * 
 * 提供回滚机制
 * 
 */

class TokenReader {
    constructor() {
        // token读取指针
        this.pos = 0
        this.value = []
    }

    push(token) {

        // if (this.value.length > 0 && this.value[this.value.length - 1].state == token.state && token.state == TokenState.Identifier) {
        //     // 如果当前与上一个都为Identifier,则进行合并
        //     // 针对注释,合并逻辑
        //     this.value[this.value.length - 1].text = this.value[this.value.length - 1].text + token.text;
        //     return;
        // }
        // if (this.value.length > 1 && this.value[this.value.length - 2].state == TokenState.Vline && this.value[this.value.length - 1].state == TokenState.Identifier && token.state == TokenState.Colon) {
        //     this.value[this.value.length - 1].text = this.value[this.value.length - 1].text + token.text;
        //     return;
        // }

        this.value.push(token)

    }


    peek() {
        if (this.pos < this.value.length) {
            return this.value[this.pos]
        }
    }

    read() {
        if (this.pos < this.value.length) {
            return this.value[this.pos++]
        }
    }

    // 回滚,核心
    setPos(pos) {
        this.pos = pos
    }
    getPos() {
        return this.pos
    }

    hasNext() {
        return this.pos < this.value.length
    }

    // 下一个 是否为 xxx
    nextIs(state) {
        return this.pos < this.value.length && this.value[this.pos].state == state
    }
}

exports.default = TokenReader;