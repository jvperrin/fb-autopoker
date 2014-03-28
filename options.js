// Saves options to chrome.storage
function save_options() {
  var interval = parseInt(document.getElementById('interval').value, 10);

  if (isNaN(interval)) {
    interval = 15
  }

  chrome.storage.sync.set({
    interval: interval
  }, function() {
    // Update status to let user know options were saved.
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
    interval: 15
  }, function(items) {
    document.getElementById('interval').value = items.interval;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
