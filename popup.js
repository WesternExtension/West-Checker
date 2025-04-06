document.getElementById('check-button').addEventListener('click', function() {
  const url = document.getElementById('website-url').value;
  if (url) {
    chrome.runtime.sendMessage(
      { type: 'check-reputation', url: url },
      (response) => {
        const resultElement = document.getElementById('result');
        if (response.reputation && response.reputation.matches) {
          resultElement.innerHTML = `<p style="color: red;">Warning: This website is flagged for potential security risks!</p>`;
        } else {
          resultElement.innerHTML = `<p style="color: green;">This website is safe.</p>`;
        }
      }
    );
  } else {
    alert('Please enter a valid URL.');
  }
});
