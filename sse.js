const SSE = require('sse');

module.exports = (server) => {
  const sse = new SSE(server);
  sse.on('connection', (client) => {
    // 1초마다 접속한 클라이어느에게 서버 시간 타임스탬프를 보냄
    // 문자열만 보낼 수 있으므로 숫자인 toString사용해 변경
    setInterval(() => {
      client.send(Date.now().toString());
    }, 1000);
  });
};