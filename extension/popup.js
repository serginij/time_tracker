let settingsButton = document.querySelector('#settings');
let stopButton = document.querySelector('#stop');
let timerLabel = document.querySelector('#timer');

console.log('opened');
let stopped = false;

settingsButton.addEventListener('click', () => {
  console.log('open options page');
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getUrl('options.html'));
  }
});

let sec = parseInt(localStorage.getItem('time'));
let min, hrs;

if (sec > 60) {
  min = (sec - (sec % 60)) / 60;
  sec = sec % 60;
} else {
  min = (sec - (sec % 60)) / 60;
}

if (min > 60) {
  hrs = (min - (min % 60)) / 60;
  min = min % 60;
} else {
  hrs = (min - (min % 60)) / 60;
}

let interval;

let timer = () =>
  (interval = setInterval(() => {
    console.log(sec);
    sec++;

    if (sec == 60) {
      ++min;
      sec = 0;
    }
    if (min == 60) {
      ++hrs;
      min = 0;
    }

    timerLabel.innerHTML =
      (hrs ? (hrs < 10 ? '0' + hrs : hrs) + ':' : '') +
      (min < 10 ? '0' + min : min) +
      ':' +
      (sec < 10 ? '0' + sec : sec);
    localStorage.setItem('time', sec + '');
  }, 1000));

timer();

stopButton.addEventListener('click', () => {
  if (stopped) {
    timer();
    stopped = false;
    stopButton.innerHTML = 'Stop';
  } else {
    clearInterval(interval);
    stopped = true;
    stopButton.innerHTML = 'Start';
  }

  chrome.runtime.getBackgroundPage(backgroundPage => {
    console.log('got background', backgroundPage);
  });
});

if (stopped) {
  clearInterval(timer);
}
