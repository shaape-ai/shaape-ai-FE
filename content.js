// content.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getWindowObject") {
    // Access the window object here
    const windowInfo = {
      location: window.location.href,
      title: document.title,
      zara: window.zara,
      // Add other properties you need
    };
    sendResponse(windowInfo);
  }
});
