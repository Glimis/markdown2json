// 最终状态
const TokenState = require('./TokenState').default
const TokenReader = require('./TokenReader').default
/**
 * 词法分析
 * 
 * 将markdown 语法,转换为单词 【包含\r\n】
 * 
 * 
 * token：   最终的单词
 * letter:  字母
 * token:  部分单词
 * 
 */

class Lextter {


    /**
     * 解析字符串，形成token  --》 有限状态自动机，在不同的状态中迁移
     * 
     * 唯一对外的函数
     * 包含上下文的传递,这里使用类的方式,也可以用闭包
     */
    tokenize(code) {
        // 初始化状态
        this.tokens = new TokenReader()
        this.tokenText = ""
        this.token = {
            text: "",
            state: ""
        }

        // 当前处理节点状态
        let state = State.Initial
        try {
            for (let letter of code) {

                // 如果是换行符,直接初始化
                if (isBr(letter)) {
                    state = this.initToken(letter);
                    continue;
                }
                // 如果为| 一律切割
                if ('|' == letter) {
                    state = this.initToken(letter);
                    continue;
                }
                if (':' == letter) {
                    state = this.initToken(letter);
                    continue;
                }
                // 根据当前状态进行流转
                switch (state) {
                    // 临时转正式系列
                    case State.Br:
                    case State.Colon:
                    case State.Initial:
                    case State.Vline:
                    case State.Slash:
                        state = this.initToken(letter);
                        break;
                    case State.Slash_1:
                        if ('/' == letter) {
                            // 转换为注释
                            state = State.Slash
                            this.token.state = TokenState.Slash
                            this.tokenText += letter
                        } else {
                            // 转换为字符
                            state = State.Id
                            this.token.state = TokenState.Identifier
                            this.tokenText += letter
                        }
                        break;
                    case State.Slash:
                        // 注释追加
                        this.tokenText += letter
                        break;
                    case State.Id:
                        if ('/' == letter) {
                            state = this.initToken(letter);
                        } else {
                            this.tokenText += letter
                        }
                        break;
                }
            }
        } catch (error) {

        }
        // 最后一个词
        this.initToken();
    }



    /**
     * 有限状态机状态初始化处理 
     * 
     * 1. token -> token
     * 2. 确定新状态
     * 
     * 返回中间【临时】状态
     */
    initToken(letter) {
        if (this.tokenText.length > 0) {
            this.token.text = this.tokenText
            this.tokens.push(this.token)
            // 状态为最终状态,需要优先初始化最终状态
            this.token = {
                text: "",
                state: ""
            }
        }

        let state = State.Initial
        if (isSpace(letter)) { // 初始化空格,忽略
            this.tokenText = ''
        } else if (":" === letter) {
            state = State.Colon
            this.token.state = TokenState.Colon
            this.tokenText = letter
        } else if ("/" === letter) {
            state = State.Slash_1
            this.token.state = TokenState.Slash
            this.tokenText = letter
        } else if (isBr(letter)) {
            state = State.Br
            this.token.state = TokenState.Br
            this.tokenText = letter
        } else if ("|" === letter) {
            state = State.Vline
            this.token.state = TokenState.Vline
            this.tokenText = letter
        } else { // 其他状态,统一认为为单词
            this.token.state = TokenState.Identifier
            state = State.Id
            this.tokenText = letter
        }
        return state
    }



}


const letter = new Lextter()

exports.default = (data) => {
    letter.tokenize(data)
    return letter.tokens;
}


function isSpace(letter) {
    // return /[\f\r\t\v]/.test(letter)
    return /[\f\t\v ]/.test(letter)
}


function isBr(letter) {
    return /\n/.test(letter)
}



// 中间状态
const State = {
    Initial: Symbol('Initial'),// 初始化
    Slash_1: Symbol('Slash_1'), // 注释1 -- 过度
    Slash: Symbol('Slash'),
    Br: Symbol('Br'),// 换行  --》 \r\n
    Colon: Symbol('Colon'),// 英文冒号 --> :
    Id: Symbol('Id'),  // 普通单词
    Vline: Symbol('Vline'),  // 竖线
}



