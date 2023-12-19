chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: extractSpanTitles,
    });
  });
  
  function extractSpanTitles() {
    console.assert(false);
    const exampleElement = document.querySelector("#mainContent > div.row-fluid.ng-scope > div > div.control-group.simulated-input.bottom-16.ng-scope > div.control-group > div")
    const divs = exampleElement.querySelectorAll('div.tile.ng-scope[ng-repeat="recipient in messaging.recipients | orderBy:\'name\'"]');
    const emailAddresses = Array.from(divs).map(div => {
      const span = div.querySelector('span.tile-name');
      return span.getAttribute('title');
    }).join(';');
  
    chrome.action.setPopup({ tabId: sender.tab.id, popup: 'popup.html' });
    chrome.runtime.sendMessage({ emailAddresses: emailAddresses });
  }