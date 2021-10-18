//adding new chat documents
//setting up a real-time listener to get new chats
//updating the username
//updating the room


class Chatroom {
    constructor(room, username){
        this.room = room;
        this.username = username;
        this.chat = db.collection('chat');
        this.unsub;
    }
    async addChat(message){
        //format a chat object
        const now = new Date();
        const chatt = {
            message,
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        };
        //save the chat document
        const response = await this.chat.add(chatt);
        return response;
    }
    getChat(callback){
        this.unsub = this.chat
            .where('room', '==', this.room)
            .orderBy('created_at')
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if(change.type === 'added'){
                        //update ui
                        callback(change.doc.data());
                    }
                });
            });
    }
    updateName(username){
        this.username = username;
        localStorage.setItem('username', username);
    }
    updateRoom(room){
        this.room = room;
        console.log('room updated');
        if(this.unsub){
            this.unsub();
        }    
    }
}





