window.onload = load();

function load() {
  chrome.storage.sync.get({
    interval: 15,
    random: false,
    range: 1
  }, function(items) {

    if (items.random) {

      (function loop() {
        var rand = randomIntFromInterval(items.interval - items.range, items.interval + items.range);

        setTimeout(function() {
          poke();
          loop();
        }, rand * 1000);
      }());

    } else {

      setInterval(function() {
        poke();
      }, items.interval * 1000);

    }
  });
}

function poke() {
  console.log("Attempting a poke at " + new Date());
  var poke_links = $('a._42ft._4jy0._4jy3._4jy1.selected[role="button"][rel="async-post"]:contains("Poke Back")');
  if (poke_links.length) {
    poke_links.each(function(index, link) {
      link.click();
    });
    console.log("Poke successful!");
  }
}

function randomIntFromInterval(min, max)
{
    return Math.floor(Math.random() * (max - min + 1) + min);
}
