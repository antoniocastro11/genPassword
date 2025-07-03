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
 * Obtém o comprimento e o pool de caracteres, gera a senha, exibe-a na interface
 * e gerencia a visibilidade do botão de cópia. Também chama as funções para
 * exibir a força da senha e dicas de segurança.
 */
function generatePassword() {
  const length = getPasswordLength();
  const pool = getCharacterPool();
  const resultEl = document.getElementById("result");
  const copyBtn = document.getElementById("copy-button");
  const feedbackEl = document.getElementById("feedback-message");

  // Obtém o estado das checkboxes para avaliação da força da senha
  const useUpper = document.getElementById("uppercase").checked;
  const useLower = document.getElementById("lowercase").checked;
  const useNumbers = document.getElementById("numbers").checked;
  const useSymbols = document.getElementById("symbols").checked;

  feedbackEl.innerText = ""; // Limpa qualquer feedback anterior

  if (pool.length === 0) {
    resultEl.innerText = "Selecione pelo menos uma opção!";
    copyBtn.style.display = "none";
    displayPasswordStrength("", false, false, false, false); // Reseta a exibição da força
    document.getElementById("security-tips-container").innerHTML = ""; // Limpa as dicas
  } else {
    const password = generateRandomPassword(length, pool);
    resultEl.innerText = password;
    copyBtn.style.display = "block";
    displayPasswordStrength(password, useUpper, useLower, useNumbers, useSymbols);
    displaySecurityTips();
  }
}

/**
 * Copia a senha exibida para a área de transferência do usuário.
 * Fornece feedback visual sobre o sucesso ou falha da operação.
 */
function copyPasswordToClipboard() {
  const resultEl = document.getElementById("result");
  const feedbackEl = document.getElementById("feedback-message");
  const passwordToCopy = resultEl.innerText;

  if (!passwordToCopy || passwordToCopy === "Selecione pelo menos uma opção!") {
    return; // Não copia se não houver senha válida ou for a mensagem de erro
  }

  navigator.clipboard.writeText(passwordToCopy).then(() => {
    feedbackEl.innerText = "Senha copiada com sucesso!";
    setTimeout(() => feedbackEl.innerText = "", 3000); // Oculta o feedback após 3 segundos
  }).catch(err => {
    feedbackEl.innerText = "Falha ao copiar!";
    console.error("Erro ao copiar a senha: ", err); // Loga o erro no console
  });
}

/**
 * Array de dicas de segurança para senhas.
 * Essas dicas são exibidas aleatoriamente para o usuário.
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

/**
 * Avalia e exibe o nível de força da senha gerada (Baixo, Médio, Alto).
 * A avaliação é baseada no comprimento da senha e na variedade de tipos de caracteres utilizados.
 * @param {string} password - A senha a ser avaliada.
 * @param {boolean} useUpper - Indica se letras maiúsculas foram usadas.
 * @param {boolean} useLower - Indica se letras minúsculas foram usadas.
 * @param {boolean} useNumbers - Indica se números foram usados.
 * @param {boolean} useSymbols - Indica se símbolos foram usados.
 */
function displayPasswordStrength(password, useUpper, useLower, useNumbers, useSymbols) {
  let strength = "Baixo";
  let criteriaMet = 0; // Contador de tipos de caracteres usados

  if (useUpper) criteriaMet++;
  if (useLower) criteriaMet++;
  if (useNumbers) criteriaMet++;
  if (useSymbols) criteriaMet++;

  if (password.length >= 8 && criteriaMet >= 3) {
    strength = "Médio";
  }
  if (password.length >= 12 && criteriaMet === 4) { // Requer todos os tipos e comprimento maior
    strength = "Alto";
  }

  if (password === "Selecione pelo menos uma opção!" || password.length === 0) {
    strength = "N/A"; // Indica que a força não se aplica se não houver senha válida
  }

  let strengthElement = document.getElementById("password-strength");
  // Cria o elemento se ele ainda não existir no DOM
  if (!strengthElement) {
    strengthElement = document.createElement("p");
    strengthElement.id = "password-strength";
    document.querySelector(".container").appendChild(strengthElement);
  }
  strengthElement.innerText = `Nível da senha: ${strength}`;
}

let lastTipIndex = -1; // Variável para garantir que a próxima dica seja diferente da última

/**
 * Exibe uma dica de segurança aleatória na interface do usuário.
 * Garante que a dica exibida não seja a mesma da última vez (se houver mais de uma dica).
 */
function displaySecurityTips() {
  let tipsContainer = document.getElementById("security-tips-container");
  // Cria o container se ele ainda não existir no DOM
  if (!tipsContainer) {
    tipsContainer = document.createElement("div");
    tipsContainer.id = "security-tips-container";
    tipsContainer.classList.add("security-tips"); // Adiciona uma classe para estilização
    document.querySelector(".container").appendChild(tipsContainer);
  }

  tipsContainer.innerHTML = ""; // Limpa a dica anterior antes de adicionar uma nova

  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * securityTips.length);
  } while (securityTips.length > 1 && randomIndex === lastTipIndex); // Evita repetir a última dica

  lastTipIndex = randomIndex;
  const randomTip = securityTips[randomIndex];

  const p = document.createElement("p");
  p.textContent = randomTip;
  tipsContainer.appendChild(p);
}

/**
 * Configura os ouvintes de eventos para os elementos da interface.
 * Isso inclui o botão de copiar e o campo de comprimento da senha.
 */
function setupEventListeners() {
  const copyBtn = document.getElementById("copy-button");
  const lengthInput = document.getElementById("length");

  copyBtn.addEventListener("click", copyPasswordToClipboard);

  lengthInput.addEventListener("input", function () {
    // Remove qualquer caractere que não seja número para garantir um input limpo
    this.value = this.value.replace(/\D/g, "");
  });
}

// Inicializa os ouvintes de eventos quando o script é carregado
setupEventListeners();