// validators.js

export function validaUsuario(usuario) {
    const erros = [];
    usuario = usuario.trim();
    if (usuario.length < 3 || usuario.length > 12) {
        erros.push("Usuário deve ter entre 3 e 12 caracteres.");
    }

    if (!/^[a-zA-Z0-9_-]+$/.test(usuario)) {
        erros.push("Usuário deve conter apenas letras e números.");
    }

    return {
        valido: erros.length === 0,
        erros
    };
}

export function validaSenha(senha) {
    const erros = [];

    
    if (senha.length < 8) { // Mínimo de 8 é o padrão de mercado
        erros.push("Senha deve ter ao menos 8 caracteres.");
    }
    
    if (!/[a-z]/.test(senha)) {
        erros.push("Senha deve conter ao menos 1 letra minúscula.");
    }
    if (!/[A-Z]/.test(senha)) {
        erros.push("Senha deve conter ao menos 1 letra maiúscula.");
    }
    if (!/\d/.test(senha)) {
        erros.push("Senha deve conter ao menos 1 número.");
    }
    if (!/[!@_#$%^&*(),.?":{}|<>]/.test(senha)) {
        erros.push("Senha deve conter ao menos 1 caractere especial.");
    }

    return {
        valido: erros.length === 0,
        erros
    };
}

export function validarEmail(email) {
    const erros = [];
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;


    if (!regex.test(email)) {
        erros.push("Formato de email inválido!");
    }

    return { 
        valido: erros.length === 0,
        erros
    };
}