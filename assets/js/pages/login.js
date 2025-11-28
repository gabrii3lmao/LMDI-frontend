import { validarEmail, validaSenha } from "../utils/validators.js";
import { removeErros, validaCampo, mostraErros } from "../utils/formUtils.js"; 

const loginForm = document.querySelector(".login-box-form");

loginForm.addEventListener("submit", e => {
    e.preventDefault();

  let valid = true;

  const email = document.getElementById("login-email")
  const senha = document.getElementById("login-password")
  removeErros(loginForm);


  if(!validaCampo(validarEmail, email)) valid = false;
  if(!validaCampo(validaSenha, senha)) valid = false;


  if(valid) {
    // fazer o consumo de APIS de auth AQUI
    console.log("Login feito com sucesso!");
  }
});


