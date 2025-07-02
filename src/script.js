function generatePassword() {
  const length = document.getElementById("length").value;
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
  const resultEl = document.getElementById("result");
  const copyBtn = document.getElementById("copy-button");
  const feedbackEl = document.getElementById("feedback-message");
  
  feedbackEl.innerText = "";

  if (charPool.length === 0) {
    password = "Selecione pelo menos uma opção!";
    copyBtn.style.display = "none";
  } else {
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charPool.length);
      password += charPool[randomIndex];
    }
    copyBtn.style.display = "block";
  }

  resultEl.innerText = password;
}

const copyBtn = document.getElementById("copy-button");

copyBtn.addEventListener("click", () => {
  const resultEl = document.getElementById("result");
  const feedbackEl = document.getElementById("feedback-message");
  const passwordToCopy = resultEl.innerText;

  if (!passwordToCopy || passwordToCopy === "Selecione pelo menos uma opção!") {
    return; 
  }

  navigator.clipboard.writeText(passwordToCopy).then(() => {
    feedbackEl.innerText = "Senha copiada com sucesso!";

    setTimeout(() => {
      feedbackEl.innerText = "";
    }, 3000);
  }).catch(err => {
    feedbackEl.innerText = "Falha ao copiar!";
    console.error("Erro ao copiar a senha: ", err);
  });
});