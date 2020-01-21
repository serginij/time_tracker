chrome.runtime.onInstalled.addListenter(() => {
  chrome.storage.sync.set({ sites: {} }, () => {
    console.log('default site object stored');
  });
});
