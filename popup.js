chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.emailAddresses) {
      const textarea = document.getElementById('email-addresses');
      if (textarea) {
        textarea.value = request.emailAddresses;
      } else {
        console.error('Textarea element not found.');
      }
    }
  });
  
  document.addEventListener('DOMContentLoaded', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
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
        }).join('; ');
  
      chrome.runtime.sendMessage({ emailAddresses: emailAddresses });
    }
  });
  