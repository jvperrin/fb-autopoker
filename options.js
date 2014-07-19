// Saves options to chrome.storage
function save_options() {
  var interval = parseInt(document.getElementById('interval').value, 10);
  var range = parseInt(document.getElementById('range').value, 10);
  var random = document.getElementById('random').checked;
  var dayLimit = parseInt(document.getElementById('day-limit').value, 10);

  if (isNaN(interval)) {
    interval = 15
  }
  if (isNaN(range)) {
    range = 1;
  }
  if (isNaN(dayLimit)) {
    dayLimit = 300
  }

  if (range >= interval) {
    range = interval - 1;
  }

  chrome.storage.sync.set({
    interval: interval,
    random: random,
    range: range,
    dayLimit: dayLimit
  }, function() {
    // Update status to let user know options were saved.
    document.getElementById('interval').value = interval;
    document.getElementById('range').value = range;
    document.getElementById('day-limit').value = dayLimit;

    var status = document.getElementById('status');
    status.textContent = 'Options saved.';

    setTimeout(function() {
      status.textContent = '';
    }, 1000);
  });
}

// Restores options state using the preferences stored in chrome.storage.
function restore_options() {
  // Use default value interval = 15 seconds.
  chrome.storage.sync.get({
    interval: 15,
    random: false,
    range: 1,
    dayLimit: 300
  }, function(items) {
    document.getElementById('interval').value = items.interval;
    document.getElementById('random').checked = items.random;
    document.getElementById('range').value = items.range;
    document.getElementById('day-limit').value = items.dayLimit;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
