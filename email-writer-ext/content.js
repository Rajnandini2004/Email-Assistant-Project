console.log("Email Writer loaded");

function getEmailContent() {
  const selectors = ['.a3s.aiL', '.gmail_quote'];
  for (const selector of selectors) {
    const el = document.querySelector(selector);
    if (el) return el.innerText.trim();
  }
  return "";
}

function findToolbar() {
  return document.querySelector('.btC') || document.querySelector('[role="toolbar"]');
}

function createButton() {
  const btn = document.createElement("div");
  btn.innerText = "AI Reply";
  btn.className = "T-I J-J5-Ji aoO v7 T-I-atl L3 ai-reply-button";
  btn.style.marginRight = "8px";
  btn.setAttribute("role", "button");
  return btn;
}

function injectButton() {
  if (document.querySelector(".ai-reply-button")) return;

  const toolbar = findToolbar();
  if (!toolbar) return;

  const btn = createButton();

  btn.onclick = () => {
    btn.innerText = "Generating...";

    chrome.runtime.sendMessage(
      {
        type: "GENERATE_EMAIL",
        data: {
          emailContent: getEmailContent(),
          tone: "professional"
        }
      },
      (response) => {
        btn.innerText = "AI Reply";

        if (!response || !response.success) {
          console.error(response?.error);
          return;
        }

        const box = document.querySelector('[role="textbox"][g_editable="true"]');
        if (box) {
          box.focus();
          document.execCommand("insertText", false, response.data);
        }
      }
    );
  };

  toolbar.insertBefore(btn, toolbar.firstChild);
}

const observer = new MutationObserver(() => {
  setTimeout(injectButton, 500);
});

observer.observe(document.body, { childList: true, subtree: true });
