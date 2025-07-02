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

  let generatedPasswords = [];
  let displayText = "";

  if (charPool.length === 0) {
    displayText = "Selecione pelo menos uma opção!";
  } else {
    for (let j = 0; j < 3; j++) {
      let password = "";
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charPool.length);
        password += charPool[randomIndex];
      }
      generatedPasswords.push(password);
      displayText += `Senha ${j + 1}: ${password}\n`;
    }

    const blob = new Blob([generatedPasswords.join("\n")], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "senhas.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  document.getElementById("result").innerText = displayText;
}
