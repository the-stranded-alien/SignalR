var sendMessageButton = document.getElementById("sendMessage");

var chatConnection = new signalR.HubConnectionBuilder().withUrl("/hubs/basicChat").build();

sendMessageButton.disabled = true;
chatConnection.on("MessageReceived", function (user, message) {
    var listItem = document.createElement("li");
    var messageList = document.getElementById("messagesList");
    messageList.appendChild(listItem);
    listItem.textContent = `${user} - ${message}`;

});

document.getElementById("sendMessage").addEventListener("click", function (event) {
    var sender = document.getElementById("senderEmail").value;
    var receiver = document.getElementById("receiverEmail").value;
    var message = document.getElementById("chatMessage").value;

    if (receiver.length > 0) {
        chatConnection.send("SendMessageToReceiver", sender, receiver, message).catch(function (err) {
            console.log(`Error Occured: ${err.toString()}`);
        });
    } else {
        // Send message to all the users
        chatConnection.send("SendMessageToAll", sender, message).catch(function (err) {
            console.log(`Error Occured: ${err.toString()}`);
        });
    }
    event.preventDefault();
});

chatConnection.start().then(function () {
    sendMessageButton.disabled = false;

});

