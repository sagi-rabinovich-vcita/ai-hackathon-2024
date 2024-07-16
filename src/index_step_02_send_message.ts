async function sendMessage() {
  if (!chatUID) {
    alert("Please start a new chat first.");
    return;
  }
  if (!messageInput.value) {
    return;
  }

  appendMessage(messageInput.value, "User");

  try {
    const response = await fetch(
      `https://api.vcita.biz/v3/ai/bizai_chat_messages?bizai_chat_uid=${chatUID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getBusinessToken()
        },
        body: JSON.stringify({
          type: "text",
          content: {
            text: messageInput.value
          },
          streaming: true
        })
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      messageInput.value = "";
      const currentBotMessage = appendMessage("", "Bot");
      await processStream(response, currentBotMessage);
    }
  } catch (error) {
    alert(`Error sending message:\n${error}`);
  }
}

async function processStream(response, currentBotMessage) {
  currentBotMessage.textContent += "Need to process the stream";
}
