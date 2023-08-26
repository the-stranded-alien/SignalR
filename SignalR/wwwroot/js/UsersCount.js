// Create Connection
var connectionUserCount = new signalR.HubConnectionBuilder()
    // .configureLogging(signalR.LogLevel.Information)
    .withUrl("/hubs/userCount", signalR.HttpTransportType.WebSockets).build();

// Connect to Methods That Hub Invokes aka Receive Notifications from Hub
connectionUserCount.on("updateTotalViews", (value) => {
    var newCountSpan = document.getElementById("totalViewsCounter");
    newCountSpan.innerText = value.toString();
});

connectionUserCount.on("updateTotalUsers", (value) => {
    var newCountSpan = document.getElementById("totalUsersCounter");
    newCountSpan.innerText = value.toString();
});

// Invoke Hub Methods aka Send Notification to Hub
function newWindowLoadedOnClient() {
    connectionUserCount.invoke("NewWindowLoaded").then((value) => {
        console.log(value);
    });
    //connectionUserCount.send("NewWindowLoaded").then((value) => {
    //    console.log(value);
    //});
    // Note: Can pass parameters also.
}

// Start Connection
function fulfilled() {
    // do something on start
    console.log("Connection to User Hub Successful");
    newWindowLoadedOnClient();
}

function rejected() {
    // Rejected Logs
    console.log("Connection to User Hub Failed");
}

connectionUserCount.start().then(fulfilled, rejected);