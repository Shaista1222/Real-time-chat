const socket = io('http://localhost:8000')
const form = document.getElementById('send-container')
const messageInp = document.getElementById('messageInp')
// messages in container 
const messageContainer = document.querySelector('.container')
const audio = new Audio('ting.mp3')
// position is like left or rit
const append = ((message, possition) => {
    const messageElemet = document.createElement('div');
    messageElemet.innerHTML(message);
    messageElemet.classList.add('message');
    messageElemet.classList.add(possition);
    messageContainer.append(messageElemet);
    if (possition == 'left') {
        audio.play()
    }
});
form.addEventListener('submit', (e) => {
    // reload nae one det
    e.preventDefault()
    const message = messageInp.value;
    append(`You: ${message}`, 'right')
    socket.emit('send', message)
    messageInp.value = ''

})

const name = prompt('Enter your name to join')
console.log(name)
socket.emit('new-user-joined', name)

socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'right')
})

socket.on('receive', data => {
    append(`${data.name}: & ${data.message}`, 'left')
})
socket.on('left', name => {
    append(`${name}: left the chat `, 'left')
})