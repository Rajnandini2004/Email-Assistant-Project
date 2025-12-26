chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "GENERATE_EMAIL") {
    fetch("http://localhost:8080/api/email/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(message.data)
    })
      .then(res => res.text())
      .then(data => {
        sendResponse({ success: true, data });
      })
      .catch(err => {
        sendResponse({ success: false, error: err.toString() });
      });

    return true; // VERY IMPORTANT
  }
});
