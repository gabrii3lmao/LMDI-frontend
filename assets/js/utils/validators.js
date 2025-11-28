// validators.js

export function validaUsuario(usuario) {
    const erros = [];
    usuario = usuario.trim();
    if (usuario.length < 3 || usuario.length > 12) {
        return {
            valido: false,
            erros: ["Usuário deve ter entre 3 e 12 caracteres."]
        };
    }

    if (!/^[a-zA-Z0-9_-]+$/.test(usuario)) {
        return {
            valido: false,
            erros: ["Usuário deve conter apenas letras e números"]
        };
    }

    return {
        valido: erros.length === 0,
        erros
    };
}

export function validaSenha(senha, contexto = 'cadastro') {
    const erros = [];

    if (contexto === 'login') {
        
        const falhaDeComprimento = senha.length < 8; 
        const falhaDeMinuscula = !/[a-z]/.test(senha);
        const falhaDeMaiuscula = !/[A-Z]/.test(senha);
        const falhaDeNumero = !/\d/.test(senha);
        const falhaDeEspecial = !/[!@_#$%^&*(),.?":{}|<>]/.test(senha);

        if (falhaDeComprimento || falhaDeMinuscula || falhaDeMaiuscula || falhaDeNumero || falhaDeEspecial) {
            return {
                valido: false,
                erros: ["Senha inválida. Por favor, verifique sua senha."]
            };
        }
    }

    if (senha.length < 8) { // Mínimo de 8 é o padrão de mercado
        erros.push("Senha deve ter ao menos 8 caracteres.");
        return { valido: false, erros };
    }
    
    if (!/[a-z]/.test(senha)) {
        erros.push("Senha deve conter ao menos 1 letra minúscula.");
        return { valido: false, erros };
    }
    if (!/[A-Z]/.test(senha)) {
        erros.push("Senha deve conter ao menos 1 letra maiúscula.");
        return { valido: false, erros };
    }
    if (!/\d/.test(senha)) {
        erros.push("Senha deve conter ao menos 1 número.");
        return { valido: false, erros };
    }
    if (!/[!@_#$%^&*(),.?":{}|<>]/.test(senha)) {
        erros.push("Senha deve conter ao menos 1 caractere especial.");
        return { valido: false, erros };
    }

    return {
        valido: erros.length === 0,
        erros
    };
}

export function validarEmail(email) {
    const erros = [];
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if(!email) {
        erros.push("O campo email não pode ficar vazio.");
        return {
            valido: false,
            erros
        };
    }
    if (!regex.test(email)) {
        erros.push("Formato de email inválido!");
        return {
            valido: false,
            erros
        };
    }

    return { 
        valido: erros.length === 0,
        erros
    };
}