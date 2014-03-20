window.onload = poke();

function poke() {
  window.setInterval(function() {
    console.log("Attempting a poke at " + new Date());
    var poke_link = $('a._42ft._4jy0._4jy3._4jy1.selected[role="button"][rel="async-post"]:contains("Poke Back")')
    if (poke_link.length) {
      poke_link[0].click();
      console.log("Poke successful!");
    }
  }, 15000)
}
