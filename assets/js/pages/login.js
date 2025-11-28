import { validarEmail, validaSenha } from "../utils/validators.js";
import { removeErros, validaCampo } from "../utils/formUtils.js"; 

const loginForm = document.querySelector(".login-box-form");

const email = document.getElementById("login-email");
const senha = document.getElementById("login-password");

const campos = [
    {input: email, validator: validarEmail},
    {input: senha, validator: (value) => validaSenha(value, 'login')}
];

campos.forEach(campoObj => {
  campoObj.input.addEventListener("blur", () => {
    
    removeErros(campoObj.input.parentNode); 

    validaCampo(campoObj.validator, campoObj.input);
  });
});

loginForm.addEventListener("submit", e => {
    e.preventDefault();

    let valid = true;
    
    removeErros(loginForm); 

    campos.forEach(campoObj => {
        if(!validaCampo(campoObj.validator, campoObj.input)) {
            valid = false;
        }
    });

    if(valid) {
        // LÓGICA DE ENVIO PARA API AQUI
        console.log("Login feito com sucesso! Enviando dados para o servidor...");
    }
});