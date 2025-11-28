export function removeErros(form) {
  form.querySelectorAll(".error-text").forEach(e => e.remove());
  
}

export function mostraErros(campo, mensagens) {
  mensagens.forEach(msg => {
    const div = document.createElement("div");
    div.classList.add("error-text");
    div.innerText = msg;
    campo.insertAdjacentElement("afterend", div);
  });
}

export function validaCampo(funcaoValidadora, campo) {
  const resposta = funcaoValidadora(campo.value);

  if (!resposta.valido) {
    mostraErros(campo, resposta.erros);
    return false;
  }

  return true;
}
