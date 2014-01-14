chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('dictionary.html', {
    bounds: {
      width: 300,
      height: 400
    },
    minWidth: 200,
    minHeight: 200,
    /*
        maxWidth: 800,
        maxHeight: 800
    */
  });
}); 