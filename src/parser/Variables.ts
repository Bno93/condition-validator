import { createToken, Lexer, EmbeddedActionsParser } from "chevrotain"

const identifier  = createToken({name: "identifier", pattern: /[a-zA-Z]\w*/});
const integer = createToken({ name: "Integer", pattern: /0|[1-9]\d*/ });
const string = createToken({name: "String", pattern: /\".*\"/});

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

const semicolon_token = createToken({
    name: "semicolon", pattern: /;/,
    longer_alt: identifier
})

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
    equal_token,
    semicolon_token,
    identifier,
];

export const VariableLexer = new Lexer(all_tokens);

export class VariableParser extends EmbeddedActionsParser {

    constructor() {

        super(all_tokens);

        const that = this;

        this.RULE("variableDocument", () => {
            let table: Array<Object> = [];
            that.MANY(() => {
                table.push(that.SUBRULE(that.variableStatement));
            });

            return table;
        });

        this.RULE("variableStatement", () => {
            const type = that.SUBRULE(that.typeIdentifier);
            const name = that.CONSUME(identifier);
            that.CONSUME(equal_token);
            const value = that.SUBRULE(that.valueIdentifier);
            that.CONSUME(semicolon_token);

            return {
                type: type,
                name: name.image,
                value: value,
            };
        });

        this.RULE("typeIdentifier", () => {
            let type;
            that.OR([
                    {
                    ALT: () => {
                        that.CONSUME(string_token);
                        type = String; //token.image;
                    }
                },
                {
                    ALT: () => {
                        that.CONSUME(int_token);
                        type = integer; //token.image;
                    }
                },
                {
                    ALT: () => {
                        that.CONSUME(bool_token);
                        type = Boolean; //token.image;
                    }
                },
            ]);
            return type;
        });

        this.RULE("valueIdentifier", () => {
            let value;
            that.OR([
                {
                    ALT: () => {
                        const token = that.CONSUME(integer);
                        value = parseInt(token.image);
                    }
                },
                {
                    ALT: () => {
                        that.CONSUME(true_token);
                        value = true;
                    }
                },
                {
                    ALT: () => {
                        that.CONSUME(false_token);
                        value = false;
                    }
                },
                {
                    ALT: () => {
                        const token = that.CONSUME(string)
                        value = token.image;
                    }
                }
            ]);
            return value;
        });

        this.performSelfAnalysis();
    }
}
