document.addEventListener("DOMContentLoaded", function () {
  fetchServerInfo();
  setInterval(fetchServerInfo, 5000);
});

function fetchServerInfo() {
  fetch("info")
    .then((response) => response.json())
    .then((data) => {
      const infoDiv = document.getElementById("serverInfo");
      infoDiv.innerHTML = `<p>Server Name: ${data.serverName}</p>
                                 <p>Server Version: ${data.serverVersion}</p>
                                 <p>Players: ${data.players.length}</p>`;
    })
    .catch((error) => console.error("Error fetching server info:", error));
}

function sendCommand(command) {
  command = command ? command : document.getElementById("commandInput").value;
  fetch("/command", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ command: command }),
  })
    .then((response) => response.json())
    .then((data) => {
      const jsonResponseDiv = document.getElementById("jsonResponse");
      jsonResponseDiv.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
    })
    .catch((error) => {
      console.error("Error sending command:", error);
      const jsonResponseDiv = document.getElementById("jsonResponse");
      jsonResponseDiv.innerHTML = `Error: ${error}`;
    });
}

function shutdownServer(seconds, messageText, cdown = false) {
  sendCommand(`Shutdown ${seconds} ${messageText}`);

  if (cdown) {
    countdown(seconds, messageText);
  }
}

function doExit() {
  sendCommand("DoExit");
}

function broadcastMessage(messageText) {
  sendCommand(`Broadcast ${messageText}`);
}

function kickPlayer(steamID) {
  sendCommand(`KickPlayer ${steamID}`);
}

function banPlayer(steamID) {
  sendCommand(`BanPlayer ${steamID}`);
}

function teleportToPlayer(steamID) {
  sendCommand(`TeleportToPlayer ${steamID}`);
}

function teleportToMe(steamID) {
  sendCommand(`TeleportToMe ${steamID}`);
}

function showPlayers() {
  sendCommand("ShowPlayers");
}

function getServerInfo() {
  sendCommand("Info");
}

function saveWorld() {
  sendCommand("Save");
}

function countdown(seconds, message) {
  const intervalId = setInterval(() => {
    if (seconds > 0) {
      sendCommand(`Broadcast ${message}_finalizando_em_${seconds}s`);
      seconds--;
    } else {
      clearInterval(intervalId);
    }
  }, 1000);
}

function replaceSpaces() {
  var inputField = document.getElementById("broadcastMessage");
  inputField.value = inputField.value.replace(/\s/g, "_");
}
