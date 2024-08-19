document.addEventListener("DOMContentLoaded", () => {
  const tabsContainer = document.getElementById("tabs");
  tabsContainer.innerHTML = "<p>Loading...</p>";

  try {
    chrome.tabs.query({}, (tabs) => {
      const allTabs = [];
      let tabsProcessed = 0;

      if (tabs.length === 0) {
        tabsContainer.innerHTML = "<p>No tabs found.</p>";
        return;
      }

      // 获取已存储的勾选状态
      chrome.storage.local.get("checkedTabs", (data) => {
        const checkedTabs = data.checkedTabs || {};

        tabs.forEach((tab) => {
          if (tab.url.startsWith("http://") || tab.url.startsWith("https://")) {
            chrome.scripting.executeScript(
              {
                target: { tabId: tab.id },
                func: checkMediaPlayback,
              },
              (results) => {
                tabsProcessed++;
                if (chrome.runtime.lastError) {
                  console.error(chrome.runtime.lastError.message);
                } else if (results && results[0]) {
                  let status;
                  if (results[0].result === "playing") {
                    status = "Playing";
                  } else if (results[0].result === "paused") {
                    status = "Paused";
                  } else {
                    status = "No Media";
                  }
                  allTabs.push({
                    id: tab.id,
                    title: tab.title,
                    url: tab.url,
                    status: status,
                  });
                }

                if (tabsProcessed === tabs.length) {
                  displayTabs(allTabs, checkedTabs);
                }
              }
            );
          } else {
            tabsProcessed++;
            if (tabsProcessed === tabs.length) {
              displayTabs(allTabs, checkedTabs);
            }
          }
        });
      });
    });
  } catch (error) {
    console.error("Error initializing extension:", error);
    tabsContainer.innerHTML =
      "<p>Failed to load tabs. Please try again later.</p>";
  }

  function checkMediaPlayback() {
    const mediaElements = document.querySelectorAll("audio, video");
    for (let media of mediaElements) {
      if (!media.paused && !media.ended && media.readyState > 2) {
        return "playing";
      }
    }
    return mediaElements.length > 0 ? "paused" : "no media";
  }

  function shouldShowSwitch(url) {
    const disallowedUrls = ["https://www.bilibili.com/"];

    return !disallowedUrls.includes(url);
  }

  function displayTabs(tabs, checkedTabs) {
    tabsContainer.innerHTML = "";
    if (tabs.length === 0) {
      tabsContainer.innerHTML = "<p>No tabs found.</p>";
    } else {
      tabs.forEach((tab) => {
        const tabElement = document.createElement("div");
        tabElement.className = "tab";
        const showSwitch =
          tab.status !== "No Media" && shouldShowSwitch(tab.url);
        const isChecked = checkedTabs[tab.id] || false;
        tabElement.innerHTML = `
          <span class="tab-info">Tab: ${tab.title} - URL: ${
          tab.url
        } - Status: ${tab.status}</span>
          ${
            showSwitch
              ? `
            <label class="switch">
              <input type="checkbox" ${
                isChecked ? "checked" : ""
              } data-tab-id="${tab.id}">
              <span class="slider round"></span>
            </label>
          `
              : ""
          }
        `;
        tabsContainer.appendChild(tabElement);

        if (showSwitch) {
          const switchElement = tabElement.querySelector(
            ".switch input[type='checkbox']"
          );
          switchElement.addEventListener("change", (event) => {
            const tabId = parseInt(event.target.getAttribute("data-tab-id"));
            const action = event.target.checked
              ? "startTracking"
              : "stopTracking";

            chrome.storage.local.get("checkedTabs", (data) => {
              const checkedTabs = data.checkedTabs || {};
              if (event.target.checked) {
                checkedTabs[tabId] = true;
              } else {
                delete checkedTabs[tabId];
              }
              chrome.storage.local.set({ checkedTabs: checkedTabs });
            });

            chrome.runtime.sendMessage({ action: action, tabId: tabId });
          });
        }
      });
    }
  }
});

