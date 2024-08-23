let storedData = null;

let uuid = null;
const chatHistory = [
  {
    id: 12,
    type: "text" | "suggestion" | "carousel",
    text: {
      message: "1244",
    },
    suggestion: [
      {
        type: "Size",
        options: ["M", "XXL"],
      },
    ],
    carousel: [
      {
        id: 8765,
        imageUrl: "https://joihrrj",
        url: "https://something.com",
      },
    ],
    timestamp: 78765467897,
  },
];

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "fetchData") {
    if (!uuid) {
      console.log("creating uuid");
      uuid = Math.floor(Math.random() * 10);
    }
    console.log("uuid here", uuid);
    // Get the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        const tabId = tabs[0].id;
        chrome.scripting.executeScript(
          {
            target: { tabId: tabId },
            files: ["content.js"],
          },
          () => {
            // Wait for the content script to send the data back
            chrome.runtime.onMessage.addListener(function (
              contentMessage,
              sender,
              sendContentResponse
            ) {
              console.log("contentMessage: ", contentMessage);
              if (contentMessage.storeId) {
                storedData = contentMessage;
                sendResponse(storedData);
                sendContentResponse();
              }
            });
          }
        );
      } else {
        sendResponse({ error: "No active tab found" });
      }
    });
    return true; // Indicate that the response will be sent asynchronously
  }
});
