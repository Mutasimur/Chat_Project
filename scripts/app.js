// dom queries
const chatlist = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');

//add a new chat
newChatForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
        .then(() => newChatForm.requestFullscreen())
        .catch(err => console.log(err));
});

//update username
newNameForm.addEventListener('submit', e => {
    e.preventDefault();
    //update name via chatroom
    const newName = newNameForm.name.value.trim();
    chatroom.updateName(newName);
    //reset form
    newNameForm.reset();
    //show then hide the update message
    updateMssg.innerHTML = `Your name was updated to ${newName}`;
});

//update the chatroom
rooms.addEventListener('click', e => {
    if(e.target.tagName === 'BUTTON'){
        ChatUI.clear();
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChat(chatt => chatUI.render(chatt));
    }
});

//check llocal storage for a name
const username = localStorage.username ? localStorage.username : 'anon';



// class interfaces
const chatUI = new ChatUI(chatlist);
const chatroom = new Chatroom('general', username);

// get chats and render
chatroom.getChat(data => ChatUI.render(data));