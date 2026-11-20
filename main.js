//Create Peer
MyPeer = new Peer();
OtherPeer = 0;
PeerConnection = 0;

MyPeer.on("open", (ID) => {
    IDDisplay.textContent = (ID);
});

//Listen for connections
MyPeer.on("connection", (Connection) => {
    console.log("Connected to", Connection.peer);
    PeerConnection = Connection;
  
    Connection.on("data", (Data) => {
        console.log("Received data:", Data);
  });
});



//Connect to Peer
function ConnectToPeer(ID) {
    let Connection = MyPeer.connect(ID);

    Connection.on("open", () => {
        console.log("Connected to:", ID);
        PeerConnection = Connection;
        Connection.send("You have connected to: "+MyPeer.id);
    });

    //Listen for replies
    Connection.on("data", (Data) => {
        console.log("Received data", Data);
    });

    return Connection;
}



//Send Data
function SendData(Connection, Data) {
    Connection.send(Data)
};



//UI
IDPanel = document.createElement("div");
document.body.append(IDPanel);

IDInput = document.createElement("input");
IDInput.placeholder = "Enter Peer ID";
IDInput.style.height = "25px";
IDPanel.append(IDInput);

ConnectButton = document.createElement("button");
ConnectButton.textContent = "Connect";
ConnectButton.style.width = "80px";
ConnectButton.style.height = "25px";
ConnectButton.onclick = () => ConnectToPeer(IDInput.value);
IDPanel.append(ConnectButton);

MessagePanel = document.createElement("div");
document.body.append(MessagePanel);

MessageInput = document.createElement("input");
MessageInput.placeholder = "Enter Message";
MessageInput.style.height = "25px";
MessagePanel.append(MessageInput);

SendButton = document.createElement("button");
SendButton.textContent = "Send";
SendButton.style.width = "80px";
SendButton.style.height = "25px"
SendButton.onclick = () => SendData(PeerConnection, MessageInput.value);
MessagePanel.append(SendButton);

IDDisplay =  document.createElement("p");
IDDisplay.textContent = "Loading...";
document.body.append(IDDisplay);
