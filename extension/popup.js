/* eslint-disable no-undef */
let settingsButton = document.querySelector('#settings')
let resultsButton = document.querySelector('#results')
let stopButton = document.querySelector('#stop')
let timerLabel = document.querySelector('#timer')

console.log('opened')
// let current.stop = false
const isOn = JSON.parse(localStorage.getItem('isOn'))

settingsButton.addEventListener('click', () => {
  console.log('open options page')
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage()
  } else {
    window.open(chrome.runtime.getURL('dist/index.html'))
  }
})

resultsButton.addEventListener('click', () => {
  console.log('open options page')
  // if (chrome.runtime.openOptionsPage) {
  //   chrome.runtime.openOptionsPage()
  // } else {
  window.open(chrome.runtime.getURL('dist/index.html') + '?to=stats')
  // }
})

let current = JSON.parse(localStorage.getItem('current'))
let time = parseInt(localStorage.getItem('time'))

if (current.time) {
  // current.stop = current.stop
  console.log(current.stop)
  if (current.stop) {
    // sec = current.time
    time = current.time
    stopButton.innerHTML = 'Start'
  } else {
    time += current.time
    // sec += current.time
    stopButton.innerHTML = 'Stop'
    current.stop = false
  }
}
let sec = time
let min, hrs

if (sec > 60) {
  min = (sec - (sec % 60)) / 60
  sec = sec % 60
} else {
  min = (sec - (sec % 60)) / 60
}

if (min > 60) {
  hrs = (min - (min % 60)) / 60
  min = min % 60
} else {
  hrs = (min - (min % 60)) / 60
}

if (isOn) {
  timerLabel.innerHTML =
    (hrs ? (hrs < 10 ? '0' + hrs : hrs) + ' : ' : '') +
    (min < 10 ? '0' + min : min) +
    ' : ' +
    (sec < 10 ? '0' + sec : sec)
}

let interval

let timer = () =>
  (interval = setInterval(() => {
    console.log(sec)
    sec++
    time++
    if (sec == 60) {
      ++min
      sec = 0
    }
    if (min == 60) {
      ++hrs
      min = 0
    }

    timerLabel.innerHTML =
      (hrs ? (hrs < 10 ? '0' + hrs : hrs) + ' : ' : '') +
      (min < 10 ? '0' + min : min) +
      ' : ' +
      (sec < 10 ? '0' + sec : sec)
    // localStorage.setItem('time', sec + '')
  }, 1000))
clearInterval(interval)
!current.stop && timer()

stopButton.addEventListener('click', () => {
  if (isOn) {
    if (current.stop) {
      current.stop = false
      localStorage.setItem('time', 0)
      localStorage.setItem('current', JSON.stringify(current))
      timer()
      // current.stop = false
      stopButton.innerHTML = 'Stop'
    } else {
      clearInterval(interval)
      current.time = time
      current.stop = true
      localStorage.setItem('current', JSON.stringify(current))
      // current.stop = true
      stopButton.innerHTML = 'Start'
    }
  }

  chrome.runtime.getBackgroundPage(backgroundPage => {
    console.log('got background', backgroundPage)
  })
})

if (current.stop || !isOn) {
  clearInterval(interval)
}
