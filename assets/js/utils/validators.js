// validators.js

export function validaUsuario(usuario) {
    const erros = [];

    if (usuario.length < 3 || usuario.length > 12) {
        erros.push("Usuário deve ter entre 3 e 12 caracteres.");
    }

    if (!/^[a-zA-Z0-9]+$/.test(usuario)) {
        erros.push("Usuário deve conter apenas letras e números.");
    }

    return {
        valido: erros.length === 0,
        erros
    };
}

export function validaSenha(senha) {
    const erros = [];

    if (senha.length < 6 || senha.length > 12) {
        erros.push("Senha deve ter entre 6 e 12 caracteres.");
    }

    // Exemplo: exigir número
    if (!/\d/.test(senha)) {
        erros.push("Senha deve conter ao menos 1 número.");
    }

    return {
        valido: erros.length === 0,
        erros
    };
}


export function validarEmail(email) {
    const erros = [];
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!regex.test(email)) {
        erros.push("Formato de email inválido!");
    }

    return { 
        valido: erros.length === 0,
        erros
    };
}