const timeElement = document.querySelector('[data-testid="test-user-time"]');

function updateTime() {
  timeElement.textContent = String(Date.now());
}

updateTime();
setInterval(updateTime, 1000);