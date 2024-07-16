async function sendMessage() {
  if (!chatUID) {
    alert("Please start a new chat first.");
    return;
  }
  if (!messageInput.value) {
    return;
  }

  appendMessage(messageInput.value, "User");

  if (surprise()){
    return;
  }

  //...
  // The rest of the function remains the same
  //...
  //...
  //...
}

function toggleSurprise(mode:boolean): void {
  if (mode) {
    appDiv.className = "dark-mode";
    document.body.className = "dark-mode";
    document.getElementById("logo").src =
      "https://raw.githubusercontent.com/sagi-rabinovich-vcita/ai-hackathon-2024/60667e997c95cb4637a146837f07d9df2fc7bb5e/images/logo-2.png";
  } else {
    appDiv.className = "light-mode";
    document.body.className = "light-mode";
    document.getElementById("logo").src =
      "https://raw.githubusercontent.com/sagi-rabinovich-vcita/ai-hackathon-2024/60667e997c95cb4637a146837f07d9df2fc7bb5e/images/logo-1.png";
  }
}

function surprise(){
  if (messageInput.value.toLowerCase().includes("dark mode")) {
    toggleSurprise(true);
    appendMessage("Surprise! DARK MODE!", "Bot");
    return true;
  }
  if (messageInput.value.toLowerCase().includes("light mode")) {
    toggleSurprise(false);
    appendMessage("Surprise! LIGHT MODE!", "Bot");
    return true;
  }
  return false;
}