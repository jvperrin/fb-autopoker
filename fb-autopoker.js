window.onload = poke();

function poke() {
  var interval = 15;
  chrome.storage.sync.get({
    interval: 15
  }, function(items) {

    setInterval(function() {
      console.log("Attempting a poke at " + new Date());
      var poke_link = $('a._42ft._4jy0._4jy3._4jy1.selected[role="button"][rel="async-post"]:contains("Poke Back")');
      if (poke_link.length) {
        poke_link[0].click();
        console.log("Poke successful!");
      }
    }, items.interval * 1000);

  });
}
