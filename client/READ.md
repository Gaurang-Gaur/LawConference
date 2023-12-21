**here is our target to create to pages one is login page and chat room**

1.On login page we have take the infomation of user1 which email and room no and now , we have to take this infomation for states to our backend
through socket server.

2.Now , the question araise that how our react app have the access of socket server
3.we will be creating the socket Provider to wrap our app to use socket by name as useSocket which is custom hook
4.After the form is handle we have to write the code for join our room logic inside handleSubmit form 
5.For , join room here we will emit the event which is room:join 
  and passing {email, room };

6.Now, we have to handle this particular event in backend;
  basically we telling our server that i want to join in this room
  before we have to keep the track which email is in which room
  for which we will use map in this we are going to map the email with socket.id;

7. And,All create a reverse map for the getting email for socket id ...

8.if for particular socket handle the event which room:join and wait for event to listen.

9.Inside particuler socket of client we are mapping the email with socket id and viceversa

     --->emailToSocketIdMap.set(email, socket.id);
        socketidToEmailMap.set(socket.id,email);
        socket.to("room:join",data);
        io.to(socket.id).emit("room:join",data);
    Note: and jes hai ye event (room:join) occurr hua tabhi ye upar wala kaam hoga

**Explaination of above code here**
1.The socket object represents the connection to the individual client.
2.Logging Socket Connection (console.log(Socket connected ${socket.id});):
  This line logs a message indicating that a new socket (client) has connected, along with its unique socket.id.
3."room:join" Event (socket.on("room:join", data => {...})):
   This event is triggered when the client sends a "room:join" event to the server.
4. The above event occurred when the client click on the join button on the lobby form it's will generate the event named: "room:join"
5.Broadcasting to Room (socket.to("room:join", data);):
   This line broadcasts the "room:join" event to all clients in the same room as the sender (socket.id). It excludes the sender from receiving the message.
6.io.to(socket.id).emit("room:join",data);


difference between the io.on() and socket.on()?


In the context of the Socket.IO library in JavaScript, `io.on()` and `socket.on()` are both event handlers, but they are used in different scopes.

1. **`io.on()`**: This is used to handle events at the global level, i.e., for events that are related to the entire Socket.IO server, not just a specific connection. For example, you might use `io.on('connection', ...)` to handle the event when a new client connects to the server.

    ```javascript
    const io = require('socket.io')(httpServer);

    io.on('connection', (socket) => {
      console.log('A user connected');

      // Handle custom event at the global level
      io.on('customEvent', (data) => {
        console.log('Custom event received:', data);
      });
    });
    ```

2. **`socket.on()`**: This is used to handle events for a specific client connection. Each `socket` object represents an individual client. Events handled with `socket.on()` are specific to that particular client.

    ```javascript
    const io = require('socket.io')(httpServer);

    io.on('connection', (socket) => {
      console.log('A user connected');

      // Handle a custom event for this specific socket (client)
      socket.on('customEvent', (data) => {
        console.log('Custom event received:', data);
      });
    });
    ```

In summary, `io.on()` is used for handling global events related to the entire server, while `socket.on()` is used for handling events specific to individual client connections.

