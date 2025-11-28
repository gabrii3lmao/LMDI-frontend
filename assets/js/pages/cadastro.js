// cadastro.js
import {
  validaUsuario,
  validaSenha,
  validarEmail,
} from "../utils/validators.js";

class ValidaForm {
  constructor() {
    this.formulario = document.querySelector(".auth-box-form");
    this.eventos();
  }

  eventos() {
    this.formulario.addEventListener("submit", (e) => {
      this.handleSubmit(e);
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const formValido = this.camposSaoValidos();
    if (formValido) {
      console.log("Formulário ok, pode enviar!");
      this.formulario.submit();
    }
  }

  camposSaoValidos() {
    let valid = true;

    // remove mensagens antigas
    for (let errorText of this.formulario.querySelectorAll(".error-text")) {
      errorText.remove();
    }

    // percorre inputs
    for (let campo of this.formulario.querySelectorAll("input")) {
 
      const labelEl = this.formulario.querySelector(`label[for="${campo.id}"]`);
      const label = labelEl ? labelEl.innerText : campo.id || "Campo";

      // Input vazio
      if (!campo.value.trim()) {
        this.criaErro(campo, `Campo "${label}" não pode ficar em branco`);
        valid = false;
      }

      // Valida usuário 
      if (campo.id === "name" || campo.classList.contains("nome")) {
        const resultado = validaUsuario(campo.value);
        if (!resultado.valido) {
          resultado.erros.forEach((msg) => this.criaErro(campo, msg));
          valid = false;
        }
      }

      // valida email 
      if (campo.id === "email" || campo.classList.contains("email")) {
        const resultado = validarEmail(campo.value);
        if (!resultado.valido) {
          resultado.erros.forEach((msg) => this.criaErro(campo, msg));
          valid = false;
        }
      }

      // Valida senha 
      if (campo.type === "password" || campo.id.includes("password") || campo.classList.contains("password")
      ) {
        const resultado = validaSenha(campo.value);
        if (!resultado.valido) {
          resultado.erros.forEach((msg) => this.criaErro(campo, msg));
          valid = false;
        }
      }
    }

    return valid;
  }

  criaErro(campo, mensagem) {
    const div = document.createElement("div");
    div.classList.add("error-text");
    div.innerText = mensagem;
    campo.insertAdjacentElement("afterend", div);
  }
}

const valida = new ValidaForm();
