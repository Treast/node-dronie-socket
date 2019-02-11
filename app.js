const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = process.env.SERVER_PORT || 8090;

io.on('connection', function(socket) {
  console.log('a user connected');

  socket.use((packet, next) => {
    console.log(packet);
    const event = packet[0] || null;
    const json = packet[1] || null;

    if (event) {
      socket.broadcast.emit(event, JSON.parse(json));
      next();
    }

    next(new Error('You must specify an event name.'));
  });
});

http.listen(port, function() {
  console.log(`listening on *:${port}`);
});
