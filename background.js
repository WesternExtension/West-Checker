chrome.runtime.onInstalled.addListener(function() {
  console.log('Website Reputation Checker Extension Installed');
});

// Function to check website reputation
async function checkWebsiteReputation(url) {
  const apiKey = 'YOUR_GOOGLE_SAFE_BROWSING_API_KEY';  // Replace with your actual API key
  const endpoint = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`;

  const requestBody = {
    client: {
      clientId: "yourClientId",
      clientVersion: "1.0"
    },
    threatInfo: {
      threatTypes: ["MALWARE", "SOCIAL_ENGINEERING"],
      platformTypes: ["WINDOWS"],
      threatEntryTypes: ["URL"],
      threatEntries: [
        { url: url }
      ]
    }
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  });

  const result = await response.json();
  return result;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'check-reputation') {
    checkWebsiteReputation(message.url)
      .then(result => {
        sendResponse({ reputation: result });
      })
      .catch(error => {
        sendResponse({ error: error.message });
      });
  }
  return true;
});
