// Armazena as senhas geradas para poder exportá-las depois.
let generatedPasswords = [];

/**
 * Obtém e valida o comprimento da senha com base nos limites do input HTML.
 * @returns {number} Comprimento ajustado da senha.
 */
function getPasswordLength() {
  const lengthInput = document.getElementById("length");
  let length = parseInt(lengthInput.value, 10);
  const min = parseInt(lengthInput.min, 10);
  const max = parseInt(lengthInput.max, 10);

  // Garante que o comprimento esteja dentro dos limites min/max definidos no HTML
  if (isNaN(length) || length < min) {
    length = min;
    lengthInput.value = min;
  } else if (length > max) {
    length = max;
    lengthInput.value = max;
  }
  return length;
}

/**
 * Monta a string de caracteres possíveis com base nas opções selecionadas.
 * @returns {string} O conjunto de caracteres disponíveis para gerar a senha.
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
 * Gera uma única senha aleatória.
 * @param {number} length - Comprimento da senha.
 * @param {string} pool - Conjunto de caracteres a serem usados.
 * @returns {string} A senha gerada.
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
 * Função principal que gera 3 senhas e as exibe na tela.
 */
function generatePassword() {
  const length = getPasswordLength();
  const pool = getCharacterPool();
  const resultEl = document.getElementById("result");

  generatedPasswords = []; // Limpa o array de senhas antigas
  let displayText = "";

  if (pool.length === 0) {
    displayText = "Selecione ao menos um tipo de caractere!";
  } else {
    // Loop para gerar as 3 senhas
    for (let i = 0; i < 3; i++) {
      const newPassword = generateRandomPassword(length, pool);
      generatedPasswords.push(newPassword);
      // Formata o texto para exibição com quebra de linha
      displayText += `Senha ${i + 1}: ${newPassword}\n`;
    }
  }

  resultEl.innerText = displayText.trim(); // .trim() remove a última quebra de linha
}

/**
 * Exporta as senhas geradas para um arquivo .txt.
 */
function exportPasswords() {
  if (generatedPasswords.length === 0) {
    alert("Por favor, gere as senhas antes de exportar.");
    return;
  }

  // Cria um "Blob", que é um objeto semelhante a um arquivo
  const blob = new Blob([generatedPasswords.join("\n")], {
    type: "text/plain",
  });

  // Cria um link temporário para iniciar o download
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "senhas_geradas.txt";

  // Simula o clique no link para baixar o arquivo e depois o remove
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}