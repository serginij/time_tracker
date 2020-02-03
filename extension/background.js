/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
let time = 0
let sites = []
let current = { time: 0 }

let timer = setInterval(() => {
  chrome.tabs.query({ currentWindow: true }, arr => {
    if (arr.length) {
      time++
      localStorage.setItem('time', time + '')
    }
  })
}, 1000)

chrome.runtime.onInstalled.addListener(function(details) {
  if (details.reason == 'install') {
    localStorage.setItem('sites', JSON.stringify([]))
    localStorage.setItem('time', 0 + '')
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage()
      // clearInterval(timer);
    } else {
      window.open(chrome.runtime.getUrl('options.html'))
    }
    console.log('This is a first install!')
  } else if (details.reason == 'update') {
    console.log('updated')
    sites = JSON.parse(localStorage.getItem('sites'))
  }
})

chrome.tabs.onActivated.addListener(function(activeInfo) {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
    activeInfo.url = tabs[0].url
      .split('/')
      .slice(2, 3)
      .join('/')

    let prev = JSON.parse(localStorage.getItem('current'))
    if (!prev) {
      prev = { tabId: 0, url: '', time: 0 }
    }

    prev.time = parseInt(localStorage.getItem('time'))
    localStorage.setItem('time', 0 + '')

    time = 0
    sites = JSON.parse(localStorage.getItem('sites')) || []
    sites = sites.filter(site => {
      if (site.url === prev.url) {
        prev.time += site.time
      }
      if (activeInfo.url === prev.url) {
        current = { ...prev }
      } else if (activeInfo.url === site.url) {
        current = { ...site }
      }
      return site.url !== prev.url
    })
    if (prev.url !== '') {
      console.log('sites', sites)
      let extension
      chrome.runtime.getBackgroundPage(backPage => {
        extension = backPage.document.domain
      })

      if (prev.url !== extension) {
        sites.push(prev)
        localStorage.setItem('sites', JSON.stringify(sites))
      }
    }

    current.url = activeInfo.url
    localStorage.setItem('current', JSON.stringify(current))
    console.log('prev tab', prev)
    console.log('current tab', current)
  })
})

let getCurrentUrl = async () => {
  let tablink = await chrome.tabs.query(
    { active: true, lastFocusedWindow: true },
    tabs => {
      tablink = tabs[0].url
        .split('/')
        .slice(2, 3)
        .join('/')
      return tablink
    }
  )
  return tablink
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status == 'complete') {
    current = {
      tabId: tabId,
      url: tab.url
        .split('/')
        .slice(2, 3)
        .join('/'),
      time: 0
    }
    // let flag = 0
    sites.forEach(site => {
      if (site.url == tab.url) {
        current = { ...site }
        // flag = 1
      }
    })

    localStorage.setItem('current', JSON.stringify(current))
    current = {
      tabId: tabId,
      url: tab.url
        .split('/')
        .slice(2, 3)
        .join('/'),
      time: 0
    }
  }
})

chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
  console.log('closed', tabId, removeInfo)
})

chrome.tabs.onReplaced.addListener((addedTabId, removedTabId) => {
  console.log('replaced ', removedTabId, ' to ', addedTabId)
})
