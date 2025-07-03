/**
 * obtém e valida o comprimento da senha com base nos limites mínimo e máximo.
 * @returns {number} Comprimento ajustado da senha.
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
 * obtém as preferências de caractere marcadas pelo usuário.
 * @returns {string} pool de caracteres permitidos.
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
 * gera uma senha com base no pool de caracteres e comprimento.
 * @param {number} length - Comprimento desejado da senha.
 * @param {string} pool - pool de caracteres permitidos.
 * @returns {string} senha gerada.
 */
function generateRandomPassword(length, pool) {
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * pool.length);
    password += pool[randomIndex];
  }
  return password;
}

function generatePassword() {
/**
 * exibe a senha gerada e controla visibilidade do botão de cópia.
 */
  const length = getPasswordLength();
  const pool = getCharacterPool();
  const resultEl = document.getElementById("result");
  const copyBtn = document.getElementById("copy-button");
  const feedbackEl = document.getElementById("feedback-message");

  feedbackEl.innerText = "";

  if (pool.length === 0) {
    resultEl.innerText = "Selecione pelo menos uma opção!";
    copyBtn.style.display = "none";
  } else {
    const password = generateRandomPassword(length, pool);
    resultEl.innerText = password;
    copyBtn.style.display = "block";
  }
}


function copyPasswordToClipboard() {
  /*
 * copia a senha gerada para a área de transferência.
 */
  const resultEl = document.getElementById("result");
  const feedbackEl = document.getElementById("feedback-message");
  const passwordToCopy = resultEl.innerText;

  if (!passwordToCopy || passwordToCopy === "Selecione pelo menos uma opção!") {
    return;
  }

  navigator.clipboard.writeText(passwordToCopy).then(() => {
    feedbackEl.innerText = "Senha copiada com sucesso!";
    setTimeout(() => feedbackEl.innerText = "", 3000);
  }).catch(err => {
    feedbackEl.innerText = "Falha ao copiar!";
    console.error("Erro ao copiar a senha: ", err);
  });
}


function setupEventListeners() {
  /*
 * inicializa os eventos de escuta para inputs e botões.
 */
  const copyBtn = document.getElementById("copy-button");
  const lengthInput = document.getElementById("length");

  copyBtn.addEventListener("click", copyPasswordToClipboard);

  lengthInput.addEventListener("input", function () {
    // remove qualquer caractere que não seja número
    this.value = this.value.replace(/\D/g, "");
  });
}

// Inicialização
setupEventListeners();
