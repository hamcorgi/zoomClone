const messageList = document.querySelector("ul");
const nickForm = document.querySelector("#nickName");
const messageForm = document.querySelector("#message");
const socket = new WebSocket(`ws://${window.location.host}`);


socket.addEventListener("open", (event) => {
    event.preventDefault;
    console.log("Connected to Browser");

});

socket.addEventListener("close", () => {

    console.log(`Connected form Server ❌`);

})
function  makeMessage(type, payload){
    const msg = {type, payload};
    return JSON.stringify(msg);
}
function messageFormHandler(event){
    event.preventDefault();
    const input = messageForm.querySelector("input");
    const li = document.createElement("li");
    li.innerText = `You: ${input.value}`;
    messageList.append(li);
    socket.send(makeMessage("new_message", input.value));
    input.value = "";
}

function nickFormHandler(event){
    event.preventDefault();
    const input = nickForm.querySelector("input");
    socket.send(makeMessage("nickname", input.value));
   }
messageForm.addEventListener("submit",messageFormHandler);
nickForm.addEventListener("submit",nickFormHandler);
/*setTimeout(() => {

    console.log("hello from the browser!");

}, 10000); */