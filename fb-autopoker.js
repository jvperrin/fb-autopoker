window.onload = load();

function load() {
  date = new Date();
  formatted_date = date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate();
  chrome.storage.sync.get({
    interval: 15, // Defaults
    random: false,
    range: 1,
    dayLimit: 300
  }, function(items) {

    var pokes = 0;

    chrome.storage.local.get({
      dailyPokes: 0,
      day: formatted_date
    }, function(local_items) {
      pokes = local_items.dailyPokes;
      console.log("Daily pokes so far: " + pokes);
    });

    console.log(items);

    if (items.random) {

      (function loop() {
        var rand = randomIntFromInterval(items.interval - items.range, items.interval + items.range);

        setTimeout(function() {
          chrome.storage.local.get({
            day: formatted_date
          }, function(local_items) {
            pokes = poke(pokes, local_items.day, items.dayLimit);
            loop();
          });
        }, rand * 1000);
      }());

    } else {

      setInterval(function() {
        chrome.storage.local.get({
          day: formatted_date
        }, function(local_items) {
          pokes = poke(pokes, local_items.day, items.dayLimit);
        });
      }, items.interval * 1000);

    }
  });
}

function poke(dailyPokes, day, pokeLimit) {
  console.log("Attempting a poke at " + new Date());
  var poke_links = $('a._42ft._4jy0._4jy3._4jy1.selected[role="button"][rel="async-post"]:contains("Poke Back")');
  if (poke_links.length) {
    poke_links.each(function(index, link) {
      date = new Date();
      formatted_date = date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate();

      if (day == formatted_date) {
        dailyPokes += 1;

        chrome.storage.local.set({
          dailyPokes: dailyPokes
        });
      } else {
        chrome.storage.local.set({
          day: formatted_date,
          dailyPokes: 0
        });
      }

      if (dailyPokes < pokeLimit) {
        console.log("Poke successful! " + dailyPokes);
        link.click();
      } else {
        console.log("Daily limit reached! " + dailyPokes);
      }
    });

    return dailyPokes;
  }
}

function randomIntFromInterval(min, max)
{
    return Math.floor(Math.random() * (max - min + 1) + min);
}
