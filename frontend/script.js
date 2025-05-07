const chat = document.getElementById("chat");
const input = document.getElementById("input");
const button = document.querySelector("button");

button.addEventListener("click", sendMessage);

async function sendMessage() {
  const userMsg = input.value.trim();
  if (!userMsg) return;

  // Show user message
  chat.innerHTML += `<div class="msg user">You: ${userMsg}</div>`;
  input.value = "";
  chat.scrollTop = chat.scrollHeight;

  try {
    const res = await fetch("https://chatboat-1-am1q.onrender.com/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({ message: userMsg }),
    });
    const data = await res.json();

    const botReply = data.reply;

    chat.innerHTML += `<div class="msg bot">Bot: ${botReply}</div>`;
    chat.scrollTop = chat.scrollHeight;
  } catch (err) {
    chat.innerHTML += `<div class="msg bot">Bot: Error contacting OpenAI API.</div>`;
    console.error(err);
  }
}
