import {TokenType, createToken, Lexer}  from "chevrotain" 

class VariableParser {

    identifier: TokenType;
    integer: TokenType;
    int_token: TokenType;
    string_token: TokenType;
    bool_token: TokenType;
    true_token: TokenType;
    false_token: TokenType;
    whitespace: TokenType;

    all_tokens: Array<TokenType>;


    lexer: Lexer;

    constructor() {
        
        this.identifier  = createToken({name: "identifier", pattern: /[a-zA-Z]\w*/});
        this.integer = createToken({ name: "Integer", pattern: /0|[1-9]\d*/ })

        this.int_token = createToken({
            name: "int", pattern: /int/,
            longer_alt: this.identifier
        });

        this.string_token = createToken({
            name: "string", pattern: /string/,
            longer_alt: this.identifier
        });

        this.bool_token = createToken({
            name: "bool", pattern: /bool/,
            longer_alt: this.identifier
        });

        this.true_token = createToken({
            name:"true", pattern: /true/,
            longer_alt: this.identifier
        });

        this.false_token = createToken({
            name:"false", pattern: /false/,
            longer_alt: this.identifier
        });

        this.whitespace = createToken({
            name: "WhiteSpace",
            pattern: /\s+/,
            group: Lexer.SKIPPED
          })


        this.all_tokens = [
            this.whitespace,

            this.int_token,
            this.string_token,
            this.bool_token,

            this.identifier,
            this.integer,
            this.true_token,
            this.false_token
        ];


        this.lexer = new Lexer(this.all_tokens);
    }


}