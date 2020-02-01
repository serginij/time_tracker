let time = 0;
let sites = [];
let current = { time: 0 };

let timer = setInterval(() => {
  chrome.tabs.query({ currentWindow: true }, arr => {
    if (arr.length) {
      time++;
      localStorage.setItem('time', time + '');
    }
  });
}, 1000);

chrome.runtime.onInstalled.addListener(function(details) {
  if (details.reason == 'install') {
    localStorage.setItem('sites', JSON.stringify([]));
    localStorage.setItem('time', 0 + '');
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
      // clearInterval(timer);
    } else {
      window.open(chrome.runtime.getUrl('options.html'));
    }
    console.log('This is a first install!');
  } else if (details.reason == 'update') {
  }
});

chrome.tabs.onActivated.addListener(function(activeInfo) {
  console.log('opened', activeInfo.tabId);
  let prev = JSON.parse(localStorage.getItem('current'));
  if (!prev) {
    prev = { tabId: 0, url: '', time: 0 };
  }
  // console.log('prev time before', prev.time);
  prev.time = parseInt(localStorage.getItem('time'));
  // console.log('prev time after', prev.time);
  localStorage.setItem('time', 0 + '');
  time = 0;
  sites = JSON.parse(localStorage.getItem('sites'));
  sites = sites.filter(site => {
    if (site.url === prev.url) {
      prev.time += site.time;
      console.log('found one', prev);
    }
    if (activeInfo.tabId === prev.tabId) {
      current = { ...prev };
    } else if (activeInfo.tabId === site.tabId) {
      current = { ...site };
    }
    return site.url !== prev.url;
  });
  if (prev.url !== '') {
    console.log('sites', sites);
    sites.push(prev);
    localStorage.setItem('sites', JSON.stringify(sites));
  }

  console.log('prev tab', prev);
  console.log('current tab', current);
  if (current.url !== '') {
    localStorage.setItem('current', JSON.stringify(current));
  }
});

let getCurrentUrl = () => {
  let tablink;
  chrome.tabs.getSelected(null, function(tab) {
    tablink = tab.url;
  });
  return tablink;
};

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status == 'complete') {
    console.log('opened info', tabId, changeInfo, tab);
    console.log('sites from onUpdated', sites);
    current = { tabId: tabId, url: tab.url, time: 0 };
    let flag = 0;
    sites.forEach(site => {
      if (site.url == tab.url) {
        current = { ...site };
        flag = 1;
      }
    });

    localStorage.setItem('current', JSON.stringify(current));
    current = { tabId: tabId, url: tab.url, time: 0 };
  }
});

chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
  console.log('closed', tabId, removeInfo);
});

chrome.tabs.onReplaced.addListener((addedTabId, removedTabId) => {
  console.log('replaced ', removedTabId, ' to ', addedTabId);
});
