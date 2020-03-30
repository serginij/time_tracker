/* eslint-disable no-undef */
let settingsButton = document.querySelector('#settings')
let resultsButton = document.querySelector('#results')
let stopButton = document.querySelector('#stop')
let timerLabel = document.querySelector('#timer')
let goal = document.querySelector('#goal')
let goalProgress = document.querySelector('#goal-progress')
let goalValue = document.querySelector('#goal-value')
let tag = document.querySelector('#tag')
let sw = document.querySelector('#switch')
let root = document.querySelector('#root')

console.log('opened')
let isOn = JSON.parse(localStorage.getItem('isOn'))

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
  window.open(chrome.runtime.getURL('dist/index.html') + '?to=stats')
})

let current = JSON.parse(localStorage.getItem('current'))
let time = parseInt(localStorage.getItem('time'))

if (current.time) {
  console.log(current.stop)
  if (current.stop) {
    time = current.time
    stopButton.innerHTML = 'Start'
  } else {
    time += current.time
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
timerLabel.innerHTML =
  (hrs ? (hrs < 10 ? '0' + hrs : hrs) + ' : ' : '') +
  (min < 10 ? '0' + min : min) +
  ' : ' +
  (sec < 10 ? '0' + sec : sec)

if (isOn) {
  sw.checked = true
} else {
  root.style.opacity = 0.5
  stopButton.disabled = true
}

if (current.goal) {
  goalValue.innerHTML = `${current.goal} часов(а)`
  goalProgress.max = current.goal
  goalProgress.value = hrs + min / 60
} else {
  goal.style.display = 'none'
  document.body.style.height = '180px'
}

if (current.label) {
  tag.style.backgroundColor = current.label.color
  tag.innerHTML = current.label.name
} else {
  timerLabel.style.width = '100%'
  timerLabel.style.textAlign = 'center'
  tag.style.display = 'none'
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
      stopButton.innerHTML = 'Stop'
    } else {
      clearInterval(interval)
      current.time = time
      current.stop = true
      localStorage.setItem('current', JSON.stringify(current))
      stopButton.innerHTML = 'Start'
    }
  }

  chrome.runtime.getBackgroundPage(backgroundPage => {
    console.log('got background', backgroundPage)
  })
})

sw.addEventListener('change', e => {
  localStorage.setItem('isOn', e.target.checked)
  if (isOn) {
    clearInterval(interval)
    current.time = time
    current.stop = true
    localStorage.setItem('current', JSON.stringify(current))
    stopButton.disabled = true
    root.style.opacity = 0.5
  } else {
    current.stop = false
    localStorage.setItem('time', 0)
    localStorage.setItem('current', JSON.stringify(current))
    timer()
    stopButton.disabled = false
    root.style.opacity = 1
  }
  isOn = e.target.checked
})

if (current.stop || !isOn) {
  clearInterval(interval)
}
