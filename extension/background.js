/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
let time = 0
let sites = []
let current = { time: 0 }

let timer = setInterval(() => {
  chrome.tabs.query({ currentWindow: true }, arr => {
    if (arr.length) {
      time = +localStorage.getItem('time') + 1
      localStorage.setItem('time', time)
    }
  })
}, 1000)

chrome.runtime.onInstalled.addListener(function(details) {
  if (details.reason == 'install') {
    localStorage.setItem('time', 0 + '')
    localStorage.setItem('allSites', JSON.stringify([]))
    localStorage.setItem('customSites', JSON.stringify([]))
    localStorage.setItem('customStats', JSON.stringify([]))
    localStorage.setItem('allStats', JSON.stringify([]))
    localStorage.setItem('useCustomSites', false)
    localStorage.setItem('isOn', true)
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage()
    } else {
      window.open(chrome.runtime.getUrl('options.html'))
    }
    // console.log('This is a first install!')
  } else if (details.reason == 'update') {
    // console.log('updated')
    let useCustomSites = JSON.parse(localStorage.getItem('useCustomSites'))
    sites = useCustomSites
      ? JSON.parse(localStorage.getItem('customSites'))
      : JSON.parse(localStorage.getItem('allSites'))
    const isOn = JSON.parse(localStorage.getItem('isOn'))
    if (!isOn) {
      clearInterval(timer)
    }
  }
})

chrome.tabs.onActivated.addListener(function(activeInfo) {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
    activeInfo.url = tabs[0].url
      .split('www.')
      .join('')
      .split('/')
      .slice(2, 3)
      .join('/')

    let useCustomSites = JSON.parse(localStorage.getItem('useCustomSites'))
    let prev = JSON.parse(localStorage.getItem('current'))
    if (!prev) {
      prev = { url: '', time: 0 }
    }

    prev.time = prev.stop ? 0 : parseInt(localStorage.getItem('time'))
    localStorage.setItem('time', 0 + '')

    time = 0
    let flag = 0
    sites = useCustomSites
      ? JSON.parse(localStorage.getItem('customSites'))
      : JSON.parse(localStorage.getItem('allSites'))
    sites = sites.filter(site => {
      if (site.url === prev.url) {
        prev.time += site.time
        flag = 1
      }
      if (activeInfo.url === prev.url) {
        current = { ...prev }
      } else if (activeInfo.url === site.url) {
        console.log('current = site', site)
        current = { ...site }
      }
      return site.url !== prev.url
    })
    console.log('PREV', prev)

    if (prev.url !== '') {
      console.log('sites', sites)
      let extension
      chrome.runtime.getBackgroundPage(backPage => {
        extension = backPage.document.domain

        // console.log('prev url', prev.url)
        // console.log('extention', extension)
        if (prev.url === extension) {
          const isOn = JSON.parse(localStorage.getItem('isOn'))
          if (isOn) {
            clearInterval(timer)
            timer = setInterval(() => {
              chrome.tabs.query({ currentWindow: true }, arr => {
                if (arr.length) {
                  time++
                  localStorage.setItem('time', time + '')
                }
              })
            }, 1000)
          } else {
            clearInterval(timer)
          }
          console.log(isOn)
        }

        if (prev.url !== extension) {
          if (!prev.favicon) {
            prev.favicon = 'https://' + prev.url + '/favicon.ico' || ''
          }
          console.log('prev.url !== extension')
          if (useCustomSites) {
            if (flag) {
              if (prev.date !== new Date().toLocaleDateString()) {
                console.log('overdue')
                let stats = JSON.parse(localStorage.getItem('customStats'))

                stats[prev.date] = stats[prev.date]
                  ? [...stats[prev.date], prev]
                  : [prev]

                localStorage.setItem('customStats', JSON.stringify(stats))
              } else {
                sites.push(prev)
                localStorage.setItem('customSites', JSON.stringify(sites))
              }
            }
          } else {
            if (prev.date !== new Date().toLocaleDateString()) {
              console.log('overdue')
              let stats = JSON.parse(localStorage.getItem('allStats'))

              stats[prev.date] = stats[prev.date]
                ? [...stats[prev.date], prev]
                : [prev]

              localStorage.setItem('allStats', JSON.stringify(stats))
            } else {
              sites.push(prev)
              localStorage.setItem('allSites', JSON.stringify(sites))
            }
          }
        }

        if (current.url === extension) {
          console.log('on extention page, current.url === extension')
          let stats = JSON.parse(
            localStorage.getItem(useCustomSites ? 'customStats' : 'allStats')
          )
          let sites = JSON.parse(
            localStorage.getItem(useCustomSites ? 'customSites' : 'allSites')
          ).filter(site => {
            if (site.date !== new Date().toLocaleDateString()) {
              stats[site.date] = stats[site.date]
                ? [...stats[site.date], site]
                : [site]
            }
            return site.date === new Date().toLocaleDateString()
          })

          localStorage.setItem(
            useCustomSites ? 'customStats' : 'allStats',
            JSON.stringify(stats)
          )
          localStorage.setItem(
            useCustomSites ? 'customSites' : 'allSites',
            JSON.stringify(sites)
          )
          console.log('store new filtered SITES', sites, stats)

          chrome.tabs.query({ active: true, currentWindow: true }, function(
            tabs
          ) {
            console.log(tabs)
            chrome.tabs.update(tabs[0].id, {
              url:
                tabs[0].url
                  .split('/')
                  .slice(0, 3)
                  .join('/') + '/dist/index.html'
            })
          })
        }
      })
    }

    current.url = activeInfo.url

    current.date = new Date().toLocaleDateString()
    localStorage.setItem('current', JSON.stringify(current))
  })
})

let getCurrentUrl = async () => {
  let tablink = await chrome.tabs.query(
    { active: true, lastFocusedWindow: true },
    tabs => {
      tablink = tabs[0].url
        .split('www.')
        .join('')
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
    console.log(tab)
    current = {
      url: tab.url
        .split('www.')
        .join('')
        .split('/')
        .slice(2, 3)
        .join('/'),
      time: 0,
      favicon: tab.favIconUrl,
      date: new Date().toLocaleDateString()
    }
    let useCustomSites = JSON.parse(localStorage.getItem('useCustomSites'))

    sites = useCustomSites
      ? JSON.parse(localStorage.getItem('customSites'))
      : JSON.parse(localStorage.getItem('allSites'))

    sites.forEach(site => {
      if (site.url == current.url) {
        current = { ...current, ...site }
      }
    })

    localStorage.setItem('current', JSON.stringify(current))
  }
})

chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
  console.log('closed', tabId, removeInfo)
})

chrome.tabs.onReplaced.addListener((addedTabId, removedTabId) => {
  console.log('replaced ', removedTabId, ' to ', addedTabId)
})
