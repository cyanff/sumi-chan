chrome.action.onClicked.addListener(async (tab) => {
  try {
    await chrome.tabs.sendMessage(tab.id, { action: "show" });
  } catch (e) {
    // If there's an error, the overlay is not injected
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["./main.js"],
    });
  }
  // Magic return to make chrome happpy :)
  return true;
});
