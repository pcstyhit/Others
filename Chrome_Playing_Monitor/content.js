function checkAudio() {
  let hasAudio = false;
  document.querySelectorAll("audio, video").forEach((media) => {
    if (!media.paused && !media.muted) {
      hasAudio = true;
    }
  });

  if (hasAudio) {
    chrome.runtime.sendMessage({ playing: true });
  } else {
    chrome.runtime.sendMessage({ playing: false });
  }
}

setInterval(checkAudio, 1000);

