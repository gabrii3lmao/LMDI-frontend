import { validarEmail, validaSenha, validaUsuario } from "../utils/validators.js";
import { removeErros, mostraErros, validaCampo } from "../utils/formUtils.js";
const form = document.querySelector(".auth-box-form");

form.addEventListener("submit", e => {
  e.preventDefault();

  let valid = true;
  let firstInvalidField = null;


  const nome = form.querySelector("#name");
  const email = form.querySelector("#email");
  const senha = form.querySelector("#password");
  const confirmar = form.querySelector("#confirm-password");


  const campos = [
    {input: nome, validator: validaUsuario},
    {input: email, validator: validarEmail},
    {input: senha, validator: validaSenha}
  ]

  // Adicionando validação em tempo real
  campos.forEach(campoObj => {
  campoObj.input.addEventListener("blur", () => {
    // 1. Remove os erros anteriores daquele campo específico
    removeErros(campoObj.input.parentNode); 
    
    // 2. Valida o campo
    validaCampo(campoObj.validator, campoObj.input);

    });
  });

  removeErros(form);

  let resposta;

  if(!validaCampo(validaUsuario, nome)) {
    if (!firstInvalidField) firstInvalidField = nome;
    valid = false;
  }
  if(!validaCampo(validarEmail, email)) {
    if (!firstInvalidField) firstInvalidField = email;
    valid = false;
  }
  if(!validaCampo(validaSenha, senha)) {
    if (!firstInvalidField) firstInvalidField = senha;
    valid = false;
  }
  if (senha.value !== confirmar.value) {
    mostraErros(confirmar, ["As senhas precisam ser iguais"]);
    valid = false;
  }

  if (valid) {
    // AQUI COLOCAR FETCH/AJAX PARA EVITAR REENVIO
    // form.submit(); é uma desgraça
    console.log("Formulário Válido! Enviando dados...");
  } else if (firstInvalidField) {
    // Foca no primeiro campo com erro
    firstInvalidField.focus();
  }
});


// funções utéis
