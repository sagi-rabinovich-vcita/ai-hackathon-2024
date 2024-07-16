// Pointers to various elements on the screen

const appDiv = document.getElementById("app") as HTMLDivElement;
const messageContainer = document.getElementById(
  "message-container"
) as HTMLDivElement;
const messageInput = document.getElementById(
  "message-input"
) as HTMLInputElement;
const sendButton = document.getElementById("send-button") as HTMLButtonElement;
const newChatButton = document.getElementById(
  "new-chat-button"
) as HTMLButtonElement;
const businessTokenInput = document.getElementById(
  "business-token"
) as HTMLInputElement;

businessTokenInput.value =
  "";

let chatUID: string;

async function createNewChat(businessApiToken: string) {
  // TODO: Implement this function
  alert(`Congrats...Move to the next step`);
}

async function sendMessage() {
  // TODO: Implement this function
  appendMessage(messageInput.value, "User");
  appendMessage("Not done yet...", "Bot");
}

function appendMessage(message: string, sender: string) {
  const messageDiv = document.createElement("pre");
  messageDiv.textContent = ">" + sender + ": " + message;
  messageDiv.className =
    sender.toLowerCase() === "user" ? "user-message" : "bot-message";
  const messageContainer = document.getElementById(
    "message-container"
  ) as HTMLDivElement;
  const wrapperDiv = document.createElement("div");
  wrapperDiv.appendChild(messageDiv);
  messageContainer.appendChild(wrapperDiv);
  messageContainer.scrollTop = messageContainer.scrollHeight;
  return messageDiv;
}

function getBusinessToken() {
  // Get the business token from the input
  const businessApiToken = businessTokenInput.value;
  if (!businessApiToken) {
    throw new Error("Please enter a business token.");
  }
  return businessApiToken;
}

async function clickNewChatButton() {
  // Disable button and show loading state
  newChatButton.textContent = "Loading...";
  newChatButton.disabled = true;

  try {
    chatUID = await createNewChat(getBusinessToken());
    messageContainer.innerHTML = "";
  } catch (error) {
    alert(`Error creating new chat:\n${error}`);
  } finally {
    // Reset button text and enable button
    newChatButton.textContent = "New Chat";
    newChatButton.disabled = false;
  }
}

function handleKeyPress(event: KeyboardEvent): void {
  if (event.key === "Enter") {
    event.preventDefault();
    sendMessage();
  }
}

// Button listeners
sendButton.addEventListener("click", sendMessage);
messageInput.addEventListener("keypress", handleKeyPress);
newChatButton.addEventListener("click", clickNewChatButton);
