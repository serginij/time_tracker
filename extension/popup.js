let settingsButton = document.querySelector('#settings');
let stopButton = document.querySelector('#stop');
let timer = document.querySelector('#timer');

console.log('opened');

settingsButton.addEventListener('click', () => {
  console.log('open options page');
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getUrl('options.html'));
  }
});
