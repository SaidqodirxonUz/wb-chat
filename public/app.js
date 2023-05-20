const socket = io()
const user = prompt("Ismingizni kiriting")

socket.emit("new-user", user)
let eldiv = document.querySelector(".chat")
let elUser = document.createElement("h2")
elUser.textContent = `Sen qo'shilding`
eldiv.appendChild(elUser)

console.log(socket.id);

document.querySelector("#form").addEventListener("submit", (e) => {
    e.preventDefault()
    let message = document.querySelector("#input").value

    let elText = document.createElement("p")
    elText.textContent = `Sen: ${message}`
    eldiv.appendChild(elText)

    socket.emit("new-message", {message, user})

})

document.querySelector("#input").addEventListener("keyup", (e) => {
    socket.emit("typing-user", user)
})

socket.on("user",user => {
    let eldiv = document.querySelector(".chat")
    let elUser = document.createElement("h2")
    elUser.textContent = `${user} qo'shildi`
    eldiv.appendChild(elUser)
})

socket.on("message", data => {
    let elText = document.createElement("p")
    elText.textContent = `${data.user}: ${data.message}`
    eldiv.appendChild(elText)
})

socket.on("typing", user => {
    let elText = document.querySelector(".Typing")
    elText.textContent = `${user} yozmoqda ...`

    setTimeout(() => {
        document.createElement("Typing").textContent = ""
    }, 2000)
})