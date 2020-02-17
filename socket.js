const SocketIO = require('socket.io');

module.exports = (server, app) => {
  const io = SocketIO(server, { path: '/socket.io' });

  app.set('io', io);

  io.on('connection', (socket) => {
    const req = socket.request;
    const { headers: { referer } } = req;

    // 주소로부터 경매방 아이디를 받아와 seocket.join으로 해당 방에 입장
    const roomId = referer.split('/')[referer.split('/').length - 1];
    socket.join(roomId);

    // 연결이 끊기면 해당방에서 나감
    socket.on('disconnect', () => {
      socket.leave(roomId);
    });
  });
};