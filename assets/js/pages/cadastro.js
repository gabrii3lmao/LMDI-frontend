import { validarEmail, validarSenha } from "../utils/validators.js";
import { mensagens } from "../utils/messages.js";

document.addEventListener("DOMContentLoaded", () => {
    const authForm = document.querySelector(".auth-box-form");
    const inputNome = document.getElementById("name");
    const inputEmail = document.getElementById("email");
    const inputPassword = document.getElementById("password");
    const inputConPassword = document.getElementById("confirm-password");

    const boxNomeErro = document.querySelector(".nome-erro");
    const boxEmailErro = document.querySelector(".email-erro");
    const boxSenhaErro = document.querySelector(".senha-erro");
    const boxConfirmarSenhaErro = document.querySelector(".confirmarSenha-erro");

    authForm.addEventListener("submit", (event) => {
        event.preventDefault();

        limparErros(); // sempre bom limpar antes

        const nome = inputNome.value.trim();
        const email = inputEmail.value.trim();
        const senha = inputPassword.value.trim();
        const confirmarSenha = inputConPassword.value.trim();

        // Nome 
        if (!nome) {
            mostrarMensagemErro(mensagens.campo_vazio, boxNomeErro);
            return;
        }

        // Email
        const resultadoEmail = validarEmail(email);
        if (!resultadoEmail.valido) {
            mostrarMensagemErro(mensagens[resultadoEmail.erro], boxEmailErro);
            return;
        }

        // Senha
        const resultadoSenha = validarSenha(senha);
        if (!resultadoSenha.valido) {
            mostrarMensagemErro(mensagens[resultadoSenha.erro], boxSenhaErro);
            return;
        }

        // Confirmar senha
        if (senha !== confirmarSenha) {
            mostrarMensagemErro("As senhas não coincidem", boxConfirmarSenhaErro);
            return;
        }

        console.log("Cadastro foi no embalo", { nome, email, senha });
        authForm.submit();
    });

    function limparErros() {
        boxNomeErro.textContent = "";
        boxEmailErro.textContent = "";
        boxSenhaErro.textContent = "";
        boxConfirmarSenhaErro.textContent = "";
    }
});

function mostrarMensagemErro(texto, elemento) {
    elemento.textContent = texto;
    elemento.style.color = "red";
}
