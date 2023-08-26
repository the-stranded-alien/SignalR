let lbl_houseJoined = document.getElementById("lbl_houseJoined");
// Unsubscribe/Leave Buttons
let btn_un_gryffindor = document.getElementById("btn_un_gryffindor");
let btn_un_slytherin = document.getElementById("btn_un_slytherin");
let btn_un_hufflepuff = document.getElementById("btn_un_hufflepuff");
let btn_un_ravenclaw = document.getElementById("btn_un_ravenclaw");
// Subscribe/Join Buttons
let btn_gryffindor = document.getElementById("btn_gryffindor");
let btn_slytherin = document.getElementById("btn_slytherin");
let btn_hufflepuff = document.getElementById("btn_hufflepuff");
let btn_ravenclaw = document.getElementById("btn_ravenclaw");
// Trigger Notification Button
let trigger_gryffindor = document.getElementById("trigger_gryffindor");
let trigger_slytherin = document.getElementById("trigger_slytherin");
let trigger_hufflepuff = document.getElementById("trigger_hufflepuff");
let trigger_ravenclaw = document.getElementById("trigger_ravenclaw");

// Create connection
var connectionHouseGroup = new signalR.HubConnectionBuilder()
    .withUrl("/hubs/houseGroups").build();

btn_gryffindor.addEventListener("click", function (event) {
    connectionHouseGroup.send("JoinHouse", "Gryffindor");
    event.preventDefault();
});
btn_slytherin.addEventListener("click", function (event) {
    connectionHouseGroup.send("JoinHouse", "Slytherin");
    event.preventDefault();
});
btn_hufflepuff.addEventListener("click", function (event) {
    connectionHouseGroup.send("JoinHouse", "Hufflepuff");
    event.preventDefault();
});
btn_ravenclaw.addEventListener("click", function (event) {
    connectionHouseGroup.send("JoinHouse", "Ravenclaw");
    event.preventDefault();
});

btn_un_gryffindor.addEventListener("click", function (event) {
    connectionHouseGroup.send("LeaveHouse", "Gryffindor");
    event.preventDefault();
});
btn_un_slytherin.addEventListener("click", function (event) {
    connectionHouseGroup.send("LeaveHouse", "Slytherin");
    event.preventDefault();
});
btn_un_hufflepuff.addEventListener("click", function (event) {
    connectionHouseGroup.send("LeaveHouse", "Hufflepuff");
    event.preventDefault();
});
btn_un_ravenclaw.addEventListener("click", function (event) {
    connectionHouseGroup.send("LeaveHouse", "Ravenclaw");
    event.preventDefault();
});

trigger_gryffindor.addEventListener("click", function (event) {
    connectionHouseGroup.send("TriggerHouseNotify", "Gryffindor");
    event.preventDefault();
});
trigger_slytherin.addEventListener("click", function (event) {
    connectionHouseGroup.send("TriggerHouseNotify", "Slytherin");
    event.preventDefault();
});
trigger_hufflepuff.addEventListener("click", function (event) {
    connectionHouseGroup.send("TriggerHouseNotify", "Hufflepuff");
    event.preventDefault();
});
trigger_ravenclaw.addEventListener("click", function (event) {
    connectionHouseGroup.send("TriggerHouseNotify", "Ravenclaw");
    event.preventDefault();
});


connectionHouseGroup.on("memberAddedToHouse", (houseName) => {
    toastr.success(`A New Member has Subscribed to : ${houseName}`);
});

connectionHouseGroup.on("memberRemovedFromHouse", (houseName) => {
    toastr.warning(`A Member has Unsubscribed from : ${houseName}`);
});

connectionHouseGroup.on("triggerHouseNotification", (houseName) => {
    toastr.info(`A New Notification for ${houseName} has been launched.`);
});

connectionHouseGroup.on("subscriptionStatus", (strGroupsJoined, houseName, hasSubscribed) => {
    lbl_houseJoined.innerText = strGroupsJoined;
    if (hasSubscribed) {
        switch (houseName) {
            case "gryffindor":
                btn_gryffindor.style.display = "none";
                btn_un_gryffindor.style.display = "";
                break;
            case "slytherin":
                btn_slytherin.style.display = "none";
                btn_un_slytherin.style.display = "";
                break;
            case "hufflepuff":
                btn_hufflepuff.style.display = "none";
                btn_un_hufflepuff.style.display = "";
                break;
            case "ravenclaw":
                btn_ravenclaw.style.display = "none";
                btn_un_ravenclaw.style.display = "";
                break;
            default:
                break;
        }
        toastr.success(`You have Subscribed Successfully : ${houseName}`);
    } else {
        // Unsubscribe
        switch (houseName) {
            case "gryffindor":
                btn_gryffindor.style.display = "";
                btn_un_gryffindor.style.display = "none";
                break;
            case "slytherin":
                btn_slytherin.style.display = "";
                btn_un_slytherin.style.display = "none";
                break;
            case "hufflepuff":
                btn_hufflepuff.style.display = "";
                btn_un_hufflepuff.style.display = "none";
                break;
            case "ravenclaw":
                btn_ravenclaw.style.display = "";
                btn_un_ravenclaw.style.display = "none";
                break;
            default:
                break;
        }
        toastr.success(`You have Unsubscribed Successfully : ${houseName}`);    
    }
});

// Start Connection
function fulfilled() {
    console.log("Connection to House Groups Hub Successful");
}

function rejected() {
    console.log("Connection to House Groups Hub Unsuccessful");
}

connectionHouseGroup.start().then(fulfilled, rejected);