var cloakSpan = document.getElementById("cloakCounter");
var stoneSpan = document.getElementById("stoneCounter");
var wandSpan = document.getElementById("wandCounter");

// Create Connection
var connectionDeathlyHallows = new signalR.HubConnectionBuilder()
    // .configureLogging(signalR.LogLevel.Information)
    .withUrl("/hubs/deathlyHallows").build();

// Connect to Methods That Hub Invokes aka Receive Notifications from Hub
connectionDeathlyHallows.on("updateDeathlyHallowsCount", (cloak, stone, wand) => {
    cloakSpan.innerText = cloak.toString();
    stoneSpan.innerText = stone.toString();
    wandSpan.innerText = wand.toString();

});

// Invoke Hub Methods aka Send Notification to Hub


// Start Connection
function fulfilled() {
    // do something on start
    connectionDeathlyHallows.invoke("GetRaceStatus").then((raceCounter) => {
        cloakSpan.innerText = raceCounter.cloak.toString();
        stoneSpan.innerText = raceCounter.stone.toString();
        wandSpan.innerText = raceCounter.wand.toString();
    });
    console.log("Connection to Deathly Hallow Hub Successful");
}

function rejected() {
    // Rejected Logs
    console.log("Connection to Deathly Hallow Hub Failed");
}

connectionDeathlyHallows.start().then(fulfilled, rejected);