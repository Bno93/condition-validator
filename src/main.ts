
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css"

import {VariableLexer, VariableParser} from "./parser/Variables";

const var_parser = new VariableParser();

window.onload = () => {

    var variables = document.getElementById("variables") as HTMLTextAreaElement;
    var condition = document.getElementById("condition") as HTMLTextAreaElement;

    var check_btn = document.getElementById("check") as HTMLInputElement;

    check_btn.addEventListener('click', (_: Event) => {
        var variablesContent = variables.value;
        var conditionContent = condition.value;

        if (variablesContent === "") {
            variables.classList.add('invalid-input');
        }
        else {
            if (variables.classList.contains('invalid-input')) {
                variables.classList.remove('invalid-input')
            }
        }

        if (conditionContent === "") {
            condition.classList.add('invalid-input');
        }
        else {
            if (condition.classList.contains('invalid-input')) {
                condition.classList.remove('invalid-input')
            }
        }



        const var_lexResult = VariableLexer.tokenize(variablesContent);
        var_parser.input = var_lexResult.tokens;
        var_parser.variableStatement();


        if (var_parser.errors.length < 0) {
            console.log("error while parsing variables.");

        }


    });
};

