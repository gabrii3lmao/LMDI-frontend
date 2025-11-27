export function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || email.trim() === "") {
        return { valido: false, erro: "campo_vazio" };
    }

    if (!regex.test(email)) {
        return { valido: false, erro: "formato_invalido" };
    }

    return { valido: true };
}

export function validarSenha(senha) {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!senha || senha.trim() === "") {
        return { valido: false, erro: "campo_vazio" };
    }

    if (senha.length < 8) {
        return { valido: false, erro: "curta_demais" };
    }

    if (!regex.test(senha)) {
        return { valido: false, erro: "formato_invalido" };
    }

    return { valido: true };
}

// CONSERTAR O CSS, CADASTRO TODO FUDIDO, HTML MAIS AINDA (commit fodasse)