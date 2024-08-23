// background.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getActiveTabWindowObject") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        const activeTabId = tabs[0].id;
        chrome.scripting.executeScript(
          {
            target: { tabId: activeTabId },
            files: ["content.js"],
          },
          () => {
            chrome.tabs.sendMessage(
              activeTabId,
              { action: "getWindowObject" },
              (response) => {
                sendResponse(response);
              }
            );
          }
        );
      } else {
        sendResponse(null);
      }
    });
    return true; // Indicates that sendResponse will be called asynchronously
  }
});
