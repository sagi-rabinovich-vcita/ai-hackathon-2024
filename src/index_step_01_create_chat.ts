async function createNewChat(businessApiToken: string) {
  try {
    const response = await fetch("https://api.vcita.biz/v3/ai/bizai_chats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + businessApiToken
      },
      body: JSON.stringify({
        agent: "vanilla",
        config: {
          window_size: 10
        }
      })
    });
    const data = await response.json();
    return data.data.uid;
  } catch (error) {
    alert(`Error creating new chat:\n${error}`);
  }
}