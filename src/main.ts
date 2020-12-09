
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css"



window.onload = () => {

    var variables = document.getElementById("variables") as HTMLTextAreaElement;
    var condition = document.getElementById("condition") as HTMLTextAreaElement;

    var check_btn = document.getElementById("check") as HTMLInputElement;

    check_btn.addEventListener('click', (_: Event) => {
        console.log(variables.value);
        console.log(condition.value);
    });
};

