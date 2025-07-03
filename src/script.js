/**
 * Obtém e valida o comprimento da senha com base nos limites mínimo e máximo definidos no input.
 * Garante que o valor esteja dentro da faixa permitida (min a max).
 * @returns {number} O comprimento ajustado da senha.
 */
function getPasswordLength() {
  const lengthInput = document.getElementById("length");
  let length = parseInt(lengthInput.value);
  const min = parseInt(lengthInput.min);
  const max = parseInt(lengthInput.max);

  if (length > max) {
    length = max;
    lengthInput.value = max; // Atualiza o input com o valor máximo
  } else if (length < min) {
    length = min;
    lengthInput.value = min; // Atualiza o input com o valor mínimo
  }

  return length;
}

/**
 * Obtém as preferências de caractere (maiúsculas, minúsculas, números, símbolos)
 * marcadas pelo usuário na interface.
 * @returns {string} Uma string contendo todos os caracteres permitidos com base nas seleções do usuário.
 */
function getCharacterPool() {
  const useUpper = document.getElementById("uppercase").checked;
  const useLower = document.getElementById("lowercase").checked;
  const useNumbers = document.getElementById("numbers").checked;
  const useSymbols = document.getElementById("symbols").checked;

  const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?"; // Conjunto de símbolos comuns

  let pool = "";
  if (useUpper) pool += upperChars;
  if (useLower) pool += lowerChars;
  if (useNumbers) pool += numberChars;
  if (useSymbols) pool += symbolChars;

  return pool;
}

/**
 * Gera uma senha aleatória usando o comprimento especificado e o conjunto de caracteres fornecido.
 * @param {number} length - O comprimento desejado para a senha.
 * @param {string} pool - O conjunto de caracteres a serem usados na geração da senha.
 * @returns {string} A senha aleatória gerada.
 */
function generateRandomPassword(length, pool) {
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * pool.length);
    password += pool[randomIndex];
  }
  return password;
}

/**
 * Função principal para gerar a senha.
 * Controla a exibição dos resultados e chama as funções de avaliação.
 */
function generatePassword() {
    const length = getPasswordLength();
    const pool = getCharacterPool();
    const resultEl = document.getElementById("result");
    const feedbackEl = document.getElementById("feedback-message");
    
    // MODIFICAÇÃO: Pega o contêiner de detalhes da senha
    const passwordDetailsContainer = document.getElementById("password-details");

    const useUpper = document.getElementById("uppercase").checked;
    const useLower = document.getElementById("lowercase").checked;
    const useNumbers = document.getElementById("numbers").checked;
    const useSymbols = document.getElementById("symbols").checked;

    feedbackEl.innerText = "";

    if (pool.length === 0) {
        resultEl.innerText = "";
        // MODIFICAÇÃO: Oculta a seção de detalhes se nenhuma opção for selecionada
        passwordDetailsContainer.classList.add("hidden");
        displayPasswordStrength("", false, false, false, false); // Limpa a força
        document.getElementById("security-tips-container").innerHTML = ""; // Limpa as dicas
        alert("Por favor, selecione pelo menos um tipo de caractere.");
    } else {
        const password = generateRandomPassword(length, pool);
        resultEl.innerText = password;
        // MODIFICAÇÃO: Mostra a seção de detalhes
        passwordDetailsContainer.classList.remove("hidden");
        displayPasswordStrength(password, useUpper, useLower, useNumbers, useSymbols);
        displaySecurityTips();
    }
}

/**
 * Copia a senha exibida para a área de transferência do usuário.
 */
function copyPasswordToClipboard() {
    const resultEl = document.getElementById("result");
    const feedbackEl = document.getElementById("feedback-message");
    const passwordToCopy = resultEl.innerText;

    if (!passwordToCopy) return;

    navigator.clipboard.writeText(passwordToCopy).then(() => {
        feedbackEl.innerText = "Senha copiada com sucesso!";
        setTimeout(() => feedbackEl.innerText = "", 3000);
    }).catch(err => {
        feedbackEl.innerText = "Falha ao copiar!";
        console.error("Erro ao copiar a senha: ", err);
    });
}


/**
 * Avalia e exibe o nível de força da senha com cores.
 */
function displayPasswordStrength(password, useUpper, useLower, useNumbers, useSymbols) {
    const strengthElement = document.getElementById("password-strength");
    
    // MODIFICAÇÃO: Limpa classes de cor anteriores
    strengthElement.classList.remove("strength-baixo", "strength-medio", "strength-alto");

    if (!password) {
        strengthElement.innerText = "";
        return;
    }

    let strength = "Baixo";
    let criteriaMet = (useUpper ? 1 : 0) + (useLower ? 1 : 0) + (useNumbers ? 1 : 0) + (useSymbols ? 1 : 0);

    if (password.length >= 12 && criteriaMet >= 4) {
        strength = "Alto";
    } else if (password.length >= 8 && criteriaMet >= 3) {
        strength = "Médio";
    }

    // MODIFICAÇÃO: Adiciona a classe de cor correspondente
    switch (strength) {
        case "Alto":
            strengthElement.classList.add("strength-alto");
            break;
        case "Médio":
            strengthElement.classList.add("strength-medio");
            break;
        case "Baixo":
            strengthElement.classList.add("strength-baixo");
            break;
    }
    
    strengthElement.innerText = `Nível de segurança: ${strength}`;
}

let lastTipIndex = -1;

/**
 * Exibe uma dica de segurança aleatória na interface.
 */
function displaySecurityTips() {
    const tipsContainer = document.getElementById("security-tips-container");
    tipsContainer.innerHTML = ""; // Limpa a dica anterior

    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * securityTips.length);
    } while (securityTips.length > 1 && randomIndex === lastTipIndex);

    lastTipIndex = randomIndex;
    const randomTip = securityTips[randomIndex];

    const p = document.createElement("p");
    p.innerHTML = `<strong>Dica:</strong> ${randomTip}`;
    tipsContainer.appendChild(p);
}


/**
 * Configura os ouvintes de eventos para os elementos da interface.
 */
function setupEventListeners() {
    document.getElementById("copy-button").addEventListener("click", copyPasswordToClipboard);
    const lengthInput = document.getElementById("length");
    lengthInput.addEventListener("input", function () {
        this.value = this.value.replace(/\D/g, "");
    });
}

// Inicializa os ouvintes de eventos quando o DOM estiver pronto.
document.addEventListener('DOMContentLoaded', setupEventListeners);


// OBS: Cole o restante das funções não modificadas aqui
// (getPasswordLength, getCharacterPool, generateRandomPassword, e o array securityTips)

/**
 * Obtém e valida o comprimento da senha com base nos limites mínimo e máximo definidos no input.
 */
function getPasswordLength() {
    const lengthInput = document.getElementById("length");
    let length = parseInt(lengthInput.value);
    const min = parseInt(lengthInput.min);
    const max = parseInt(lengthInput.max);

    if (length > max) {
        length = max;
        lengthInput.value = max;
    } else if (length < min) {
        length = min;
        lengthInput.value = min;
    }
    return length;
}

/**
 * Obtém as preferências de caractere.
 */
function getCharacterPool() {
    const useUpper = document.getElementById("uppercase").checked;
    const useLower = document.getElementById("lowercase").checked;
    const useNumbers = document.getElementById("numbers").checked;
    const useSymbols = document.getElementById("symbols").checked;
    const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?";
    let pool = "";
    if (useUpper) pool += upperChars;
    if (useLower) pool += lowerChars;
    if (useNumbers) pool += numberChars;
    if (useSymbols) pool += symbolChars;
    return pool;
}

/**
 * Gera uma senha aleatória.
 */
function generateRandomPassword(length, pool) {
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * pool.length);
        password += pool[randomIndex];
    }
    return password;
}

/**
 * Array de dicas de segurança para senhas.
 */
const securityTips = [
    "Nunca reutilize senhas entre diferentes sites.",
    "Troque suas senhas periodicamente.",
    "Evite usar nomes, datas ou palavras óbvias.",
    "Nunca compartilhe sua senha com ninguém.",
    "Ative a autenticação em duas etapas (2FA).",
    "Use senhas longas com letras, números e símbolos.",
    "Senhas aleatórias são mais seguras que frases comuns.",
    "Use um gerenciador de senhas confiável.",
    "Nunca digite sua senha em sites desconhecidos.",
    "Cuidado com tentativas de phishing por e-mail.",
    "Não copie senhas em computadores públicos.",
    "Cada conta merece uma senha única.",
    "Senhas com 12+ caracteres são muito mais fortes.",
    "Apague senhas antigas que não usa mais.",
    "Não use informações pessoais como senha.",
    "Desconfie de links pedindo para “verificar sua senha”"
];