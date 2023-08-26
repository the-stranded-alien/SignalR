var sendButton = document.getElementById("sendButton");

var connectionNotification = new signalR.HubConnectionBuilder()
    .withUrl("/hubs/notification").build();

sendButton.disabled = true;

connectionNotification.on("LoadNotification", function (messages, counter) {
    document.getElementById("messageList").innerHTML = "";
    var notificationCounter = document.getElementById("notificationCounter");
    notificationCounter.innerHTML = "<span>(" + counter + ")</span>";
    for (let i = messages.length - 1; i >= 0; i--) {
        var listItem = document.createElement("li");
        listItem.textContent = `Notification: ${messages[i]}`;
        document.getElementById("messageList").appendChild(listItem);
    }
});

sendButton.addEventListener("click", function (event) {
    var message = document.getElementById("notificationInput").value;
    connectionNotification.send("SendMessage", message).then(function () {
        document.getElementById("notificationInput").value = "";
    });
    event.preventDefault();
});

connectionNotification.start().then(function () {
    connectionNotification.send("LoadMessages");
    sendButton.disabled = false;
});
