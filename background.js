chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('dictionary.html', {
    bounds: {
      width: 300,
      height: 450
    },
    minWidth: 244,
    maxWidth: 600,
    minHeight: 380,
    maxHeight: 800,
  });
}); 