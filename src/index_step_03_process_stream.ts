async function processStream(response, currentBotMessage: HTMLDivElement) {
  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");
  let buffer = "";
  let finishReasonMet = false;

  let accumulatedData = "";
  try {
    let reading = true;
    let { value, done } = await reader.read();
    while (reading) {
      if (done) {
        reading = false;
      }

      buffer += decoder.decode(value, { stream: true });
      const { remainingBuffer, parsedData } = processBuffer(buffer);
      buffer = remainingBuffer;
      for (let i = 0; i < parsedData.length; i++) {
        const parsed = parsedData[i];
        finishReasonMet = finishReasonMet || parsed.finish_reason === "stop";
        if (parsed.delta) {
          accumulatedData += parsed.delta;
          currentBotMessage.textContent += parsed.delta;
        }
      }
      if (!done) {
        ({ value, done } = await reader.read());
      }
    }
    if (!finishReasonMet) {
      console.error(
        "Stream did not end with the expected 'stop' finish reason."
      );
    }
  } catch (err) {
    console.error("Error reading stream:", err);
  } finally {
    //await this.endStream(accumulatedData);
    console.log("accumulatedData:", accumulatedData);
    reader.releaseLock();
  }
}

function processBuffer(buffer: string) {
  let remainingBuffer = buffer;
  let eolIndex = remainingBuffer.indexOf("\n");
  const parsedData = [];
  while (eolIndex !== -1) {
    const line = remainingBuffer.slice(0, eolIndex).trim();
    remainingBuffer = remainingBuffer.slice(eolIndex + 1);
    if (line) {
      const parsed = JSON.parse(line);
      parsedData.push(parsed);
    }
    eolIndex = remainingBuffer.indexOf("\n");
  }
  return { remainingBuffer, parsedData };
}
