function generatePassword() {
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

  const useUpper = document.getElementById("uppercase").checked;
  const useLower = document.getElementById("lowercase").checked;
  const useNumbers = document.getElementById("numbers").checked;
  const useSymbols = document.getElementById("symbols").checked;

  const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?";

  let charPool = "";
  if (useUpper) charPool += upperChars;
  if (useLower) charPool += lowerChars;
  if (useNumbers) charPool += numberChars;
  if (useSymbols) charPool += symbolChars;

  let password = "";
  if (charPool.length === 0) {
    password = "Selecione pelo menos uma opção!";
  } else {
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charPool.length);
      password += charPool[randomIndex];
    }
  }

  document.getElementById("result").innerText = password;
  displayPasswordStrength(password, useUpper, useLower, useNumbers, useSymbols);
  displaySecurityTips();
}

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

function displayPasswordStrength(password, useUpper, useLower, useNumbers, useSymbols) {
  let strength = "Baixo";
  let criteriaMet = 0;

  if (useUpper) criteriaMet++;
  if (useLower) criteriaMet++;
  if (useNumbers) criteriaMet++;
  if (useSymbols) criteriaMet++;

  if (password.length >= 8 && criteriaMet >= 3) {
    strength = "Médio";
  }
  if (password.length >= 12 && criteriaMet === 4) {
    strength = "Alto";
  }

  if (password === "Selecione pelo menos uma opção!") {
    strength = "N/A";
  }

  let strengthElement = document.getElementById("password-strength");
  if (!strengthElement) {
    strengthElement = document.createElement("p");
    strengthElement.id = "password-strength";
    document.querySelector(".container").appendChild(strengthElement);
  }
  document.getElementById("password-strength").innerText = `Nível da senha: ${strength}`;
}

function displaySecurityTips() {
  let tipsContainer = document.getElementById("security-tips-container");
  if (!tipsContainer) {
    tipsContainer = document.createElement("div");
    tipsContainer.id = "security-tips-container";
    tipsContainer.classList.add("security-tips");
    document.querySelector(".container").appendChild(tipsContainer);
  }

  tipsContainer.innerHTML = "";

  const randomIndex = Math.floor(Math.random() * securityTips.length);
  const randomTip = securityTips[randomIndex];

  const p = document.createElement("p");
  p.textContent = randomTip;
  tipsContainer.appendChild(p);
}

const lengthInput = document.getElementById("length");

lengthInput.addEventListener("input", function() {
  this.value = this.value.replace(/\D/g, "");
});
