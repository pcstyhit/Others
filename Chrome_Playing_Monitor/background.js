let trackedTabs = new Set();

function checkAllTabs() {
  chrome.tabs.query({}, function (tabs) {
    tabs.forEach((tab) => {
      if (trackedTabs.has(tab.id)) {
        if (tab.url.startsWith("http://") || tab.url.startsWith("https://")) {
          chrome.scripting.executeScript(
            {
              target: { tabId: tab.id },
              func: checkMediaPlaybackAndResume,
            },
            (results) => {
              if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError.message);
              } else if (
                results &&
                results[0] &&
                results[0].result !== undefined
              ) {
                console.log(`Tab ${tab.title}: ${results[0].result}`);
              }
            }
          );
        }
      }
    });
  });
}

function checkMediaPlaybackAndResume() {
  try {
    let mediaElements = document.querySelectorAll("audio, video");
    let resumed = false;
    for (let media of mediaElements) {
      if (media.paused) {
        media.play();
        resumed = true;
      }
    }
    return resumed ? "Paused - Resumed" : "Playing";
  } catch (error) {
    console.error("Error resuming media playback:", error);
    return "Error";
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "startTracking") {
    trackedTabs.add(message.tabId);
  } else if (message.action === "stopTracking") {
    trackedTabs.delete(message.tabId);
  }
});

// 设置间隔1秒执行一次
setInterval(checkAllTabs, 1000);

