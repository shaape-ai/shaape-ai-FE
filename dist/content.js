function extractContent(className,type) {
  let element = ''
  switch(type){
    case 'description':
      element = document.querySelectorAll(className)?.[1]?.lastChild?.innerHTML
      break;
    case 'color':
    case 'title':
      element = document.querySelector(className)?.textContent.trim()
      break
    default:
      element = ''
      break;
  }
  return element;
}

function getPageURL() {
  return window.location.href;
}

// Listen for the message from the injected script
window.addEventListener('message', (event) => {
  // We only accept messages from our own script
  if (event.source != window) return;

  if (event.data.type && event.data.type == 'FROM_PAGE') {
    const zaraValue = event.data.zaraValue ? JSON.parse(event.data.zaraValue) : null;
    console.log('Value of window.zara:', zaraValue, zaraValue?.appConfig?.storeId);
    const description =  extractContent('.expandable-text__inner-content','description')
    const color =  extractContent('.product-color-extended-name','color')
    const title =  extractContent('.product-detail-info__header-name','title')
    chrome.runtime.sendMessage({ storeId: zaraValue?.appConfig?.storeId, description, url: getPageURL(),color,title }, function(response) {
      console.log("Response from background:", response,description,color,title );
    });
  }
});

// Inject the script into the page
(function injectScript() {
  const script = document.createElement('script');
  script.id = 'my-injected-script'; // Add an ID to avoid re-injection
  script.src = chrome.runtime.getURL('injectScript.js');
  (document.head || document.documentElement).appendChild(script);

  // Clean up after the script has loaded
  script.onload = function() {
    this.remove();
  };
})();
