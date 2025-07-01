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
}