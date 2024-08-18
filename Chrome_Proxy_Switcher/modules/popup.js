document.addEventListener("DOMContentLoaded", function () {
  const defaultBypassList = ["127.0.0.1/8", "::1", "localhost"]; // 默认的bypass列表

  const proxyToggle = document.getElementById("proxy-toggle");
  const httpProxyInput = document.getElementById("http-proxy");
  const httpPortInput = document.getElementById("http-port");
  const httpsProxyInput = document.getElementById("https-proxy");
  const httpsPortInput = document.getElementById("https-port");
  const socksHostInput = document.getElementById("socks-host");
  const socksPortInput = document.getElementById("socks-port");
  const bypassListInput = document.getElementById("bypass-list");
  const useForHttpsCheckbox = document.getElementById("use-for-https");
  const applyButton = document.getElementById("apply-button");
  const cancelButton = document.getElementById("cancel-button");
  const httpsProxyLabel = document.querySelector('label[for="https-proxy"]');

  let initialSettings = {};

  let a = 0;

  chrome.storage.sync.get(
    [
      "proxyEnabled",
      "httpProxy",
      "httpPort",
      "httpsProxy",
      "httpsPort",
      "socksHost",
      "socksPort",
      "bypassList",
      "useForHttps",
    ],
    function (result) {
      initialSettings = result;
      if (result.proxyEnabled) proxyToggle.checked = result.proxyEnabled;
      if (result.httpProxy) httpProxyInput.value = result.httpProxy;
      if (result.httpPort) httpPortInput.value = result.httpPort;
      if (result.httpsProxy) httpsProxyInput.value = result.httpsProxy;
      if (result.httpsPort) httpsPortInput.value = result.httpsPort;
      if (result.socksHost) socksHostInput.value = result.socksHost;
      if (result.socksPort) socksPortInput.value = result.socksPort;

      // 合并默认的bypassList和用户自定义的bypassList
      const userBypassList = result.bypassList ? result.bypassList : [];
      const combinedBypassList = [
        ...new Set([...defaultBypassList, ...userBypassList]),
      ];

      bypassListInput.value = combinedBypassList.join(", ");
      if (result.useForHttps !== undefined)
        useForHttpsCheckbox.checked = result.useForHttps;

      // 根据 useForHttpsCheckbox 的状态更新 HTTPS 输入框的状态和标签文本
      toggleHttpsSettings(result.useForHttps);

      // 切换代理设置的启用状态
      toggleProxySettings(result.proxyEnabled);
    }
  );

  function saveSettings() {
    // 获取用户输入并将其分割为数组，同时移除多余的空格
    const bypassList = bypassListInput.value
      .split(",")
      .map((url) => url.trim())
      .filter(Boolean); // 过滤掉空值，确保bypassList只有有效条目

    // 将默认的bypassList加入用户输入的bypassList
    const finalBypassList = [...new Set([...defaultBypassList, ...bypassList])];

    const proxyConfig = {
      mode: "fixed_servers",
      rules: {
        singleProxy: {
          scheme: "http",
          host: httpProxyInput.value || "127.0.0.1",
          port: parseInt(httpPortInput.value) || 7890,
        },
        bypassList: finalBypassList, // 使用合并后的 bypassList
      },
    };

    // 保存设置到 Chrome 存储中
    chrome.storage.sync.set(
      {
        proxyEnabled: proxyToggle.checked,
        httpProxy: httpProxyInput.value,
        httpPort: httpPortInput.value,
        httpsProxy: useForHttpsCheckbox.checked
          ? httpProxyInput.value
          : httpsProxyInput.value,
        httpsPort: useForHttpsCheckbox.checked
          ? httpPortInput.value
          : httpsPortInput.value,
        socksHost: socksHostInput.value,
        socksPort: socksPortInput.value,
        bypassList: finalBypassList, // 保存合并后的 bypassList
        useForHttps: useForHttpsCheckbox.checked,
        proxySettings: proxyConfig, // 保存代理配置
      },
      function () {
        applyProxySettings(proxyConfig); // 立即应用设置
      }
    );
  }

  function applyProxySettings(proxyConfig) {
    if (proxyToggle.checked) {
      chrome.proxy.settings.set(
        {
          value: proxyConfig,
          scope: "regular",
        },
        function () {}
      );
    } else {
      chrome.proxy.settings.clear({ scope: "regular" }, function () {});
    }
  }

  function applySettings() {
    saveSettings();
    window.close(); // 关闭 popup
  }

  function cancelSettings() {
    // 恢复到初始设置
    if (initialSettings.proxyEnabled)
      proxyToggle.checked = initialSettings.proxyEnabled;
    if (initialSettings.httpProxy)
      httpProxyInput.value = initialSettings.httpProxy;
    if (initialSettings.httpPort)
      httpPortInput.value = initialSettings.httpPort;
    if (initialSettings.httpsProxy)
      httpsProxyInput.value = initialSettings.httpsProxy;
    if (initialSettings.httpsPort)
      httpsPortInput.value = initialSettings.httpsPort;
    if (initialSettings.socksHost)
      socksHostInput.value = initialSettings.socksHost;
    if (initialSettings.socksPort)
      socksPortInput.value = initialSettings.socksPort;

    const userBypassList = initialSettings.bypassList
      ? initialSettings.bypassList
      : [];
    const combinedBypassList = [
      ...new Set([...defaultBypassList, ...userBypassList]),
    ];
    bypassListInput.value = combinedBypassList.join(", ");

    if (initialSettings.useForHttps !== undefined)
      useForHttpsCheckbox.checked = initialSettings.useForHttps;

    toggleHttpsSettings(initialSettings.useForHttps);
    toggleProxySettings(initialSettings.proxyEnabled);
    window.close(); // 关闭 popup
  }

  function toggleProxySettings(enabled) {
    httpProxyInput.disabled = !enabled;
    httpPortInput.disabled = !enabled;
    httpsProxyInput.disabled = !enabled && !useForHttpsCheckbox.checked;
    httpsPortInput.disabled = !enabled && !useForHttpsCheckbox.checked;
    socksHostInput.disabled = !enabled;
    socksPortInput.disabled = !enabled;
    bypassListInput.disabled = !enabled;
    useForHttpsCheckbox.disabled = !enabled;
  }

  function toggleHttpsSettings(useForHttps) {
    if (useForHttps) {
      httpsProxyLabel.textContent = "HTTPS Proxy (与 HTTP 相同)";
      if (!httpsProxyInput.disabled) httpsProxyInput.disabled = true;
      if (!httpsPortInput.disabled) httpsPortInput.disabled = true;
    } else {
      if (httpsProxyInput.disabled) httpsProxyInput.disabled = false;
      if (httpsPortInput.disabled) httpsPortInput.disabled = false;
      httpsProxyLabel.textContent = "HTTPS Proxy";
    }
  }

  proxyToggle.addEventListener("change", function () {
    toggleProxySettings(proxyToggle.checked);
  });

  useForHttpsCheckbox.addEventListener("change", function () {
    toggleHttpsSettings(useForHttpsCheckbox.checked);
    saveSettings(); // 保存复选框的状态
  });

  applyButton.addEventListener("click", applySettings);

  cancelButton.addEventListener("click", cancelSettings);
});
