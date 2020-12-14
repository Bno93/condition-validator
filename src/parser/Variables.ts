import {createToken, Lexer, CstParser}  from "chevrotain"

const identifier  = createToken({name: "identifier", pattern: /[a-zA-Z]\w*/});
const integer = createToken({ name: "Integer", pattern: /0|[1-9]\d*/ })
const string = createToken({name: "String", pattern: /\".*\"/})

const int_token = createToken({
    name: "int", pattern: /int/,
    longer_alt: identifier
});

const string_token = createToken({
    name: "string", pattern: /string/,
    longer_alt: identifier
});

const bool_token = createToken({
    name: "bool", pattern: /bool/,
    longer_alt: identifier
});

const true_token = createToken({
    name:"true", pattern: /true/,
    longer_alt: identifier
});

const false_token = createToken({
    name:"false", pattern: /false/,
    longer_alt: identifier
});

const equal_token = createToken({
    name:"equal", pattern: /=/,
    longer_alt: identifier
});

const whitespace = createToken({
    name: "WhiteSpace",
    pattern: /\s+/,
    group: Lexer.SKIPPED
})


const all_tokens = [
    whitespace,

    int_token,
    string_token,
    bool_token,

    integer,
    true_token,
    false_token,
    string,
    identifier,
];

export const VariableLexer = new Lexer(all_tokens);

export class VariableParser extends CstParser {

    constructor() {

        super(all_tokens);

        const that = this;

        this.RULE("variableStatement", () => {
            that.SUBRULE(that.typeIdentifier);
            that.CONSUME(identifier);
            that.SUBRULE(that.valueIdentifier);
        });

        this.RULE("typeIdentifier", () => {
            that.OR([
                {ALT: () => that.CONSUME(string_token)},
                {ALT: () => that.CONSUME(int_token)},
                {ALT: () => that.CONSUME(bool_token)},
            ])
        });

        this.RULE("valueIdentifier", () => {
            that.OR([
                {ALT: () => that.CONSUME(integer)},
                {ALT: () => that.CONSUME(true_token)},
                {ALT: () => that.CONSUME(false_token)},
                {ALT: () => that.CONSUME(string)}
            ]);
        })




        this.performSelfAnalysis();
    }
}
