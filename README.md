# node-auction
- 실시간 경매 시스템
    - 회원가입, 로그인, 경매상품 등록, 방참여, 경매진행

## v0.1
- 프로젝트 설정, 회원가입, 상품 등록
    - MySQL 사용 : sequelize 설치 및 기본 디렉토리 생성
        - `npm i -g sequelize-cli`
        - `npm i sequelize mysql2`
        - `sequelize init` :  `config\config.json` 생성
        - 사용자모델(user.js), 제품모델(good.js), 경매모델(auction.js)로 구성
        - `config/config.json`에 db에 맞게 수정
        - `sequelize db:create` : DB 생성
        - `npm i passport passport-local bcrypt` : 로그인을 위한 패스포트 설정 추가
            - passport 폴더와 localStrategy.js, index.js 추가
            - 로그인을 위한 /routes/auth.js 추가
            - .env : `COOKIE_SECRET=auction` 추가
        - view 추가 
            - layout.pug : 화면의 레이아웃
            - main.pug : 메인 화면
            - join.pug : 회원가입 화면
            - good.pug : 상품을 업로드 하는 페이지

## v0.2
- 서버센트 이벤트 사용하기
- 클라이언트의 시간은 쉽게 변경될 수 있기 때문에 서버 시간을 받아올 것 -> 서버센트 이벤트로 서버이 시간을 받아올 것
- 경매 진행 중 다른 사람이 참여하거나 입찰했을 때 모두에게 금액을 알릴 수 있도록 웹 소켓 사용
- `npm i sse socket.io`
    - 서버와 sse, socket.io 모듈연결(app.js)
    - sse.js : SSE(server sent event)로 서버객체를 생성, connection 이벤트 리스너를 연결하여 클라이언트와 연결 시 어떤 동작을 할지 정의(시간보냄)
    - socket.js : 방입장, 방퇴장
- 서버센트 이벤트 : IE, 엣지에서는 사용할 수 없음(EventSource객체를 지원하지 않기 때문) -> 사용자가 직접 구현할 수 있음
    - IE, 엣지브라우저를 위해 클라이언트 코드에 EventSource polyfill을 추가 
        - `script(src='https://cdnjs.cloudflare.com/ajax/libs/event-source-polyfill/0.0.9/eventsource.min.js')`
    - 서버와 클라이언트사이에 단일 단방향 채널을 염
    - 클라이언트에서 데이터를 전송하지 않아도 되며, 서버에서 보낼때 사용이 적절
- 경매를 진행하는 페이지 추가(auction.pug : 서버센트 이벤트와 웹소켓 모두 연결)

## v0.3
- 스케줄링 구현하기
- 경매가 생성된 지 24시간 후에 낙찰자를 정하도록 시스템 구현
    - `npm i node-schedule`
    - schedule 객체의 scheduleJob 메서드로 일정을 예약
    - 단점 : 스케줄링이 노드 기반으로 작동하므로 노드가 종료되면 스케줄 예약도 같이 종료
        - 서버가 시작될 때 경매 시작 후 24시간이 지났지만 낙찰자는 없는 경매를 찾아서 낙찰자를 지정하도록 하면 됨(checkAuction.js)

## v1.0
- 낙찰자가 낙찰내역 보기
    - `/list`, `list.pug` 추가

## v1.1
- 상품 등록자는 참여할 수 없게 만들기(라우터에서 검사)

## v1.2
- 경매 시간을 자유롭게 조정할 수 있게 만들기
    - 상품 등록 시 생성할 수 있게 DB수정

## v1.3
- 노드 서버가 꺼졌다 다시 켜졌을 때 스케줄러 다시 생성하기
    - checkAuction에서 DB 조회 후 스케줄러 설정 (과거 : 상품등록 시 스케줄러 설정)

## v1.4
- 아무도 입찰을 하지 않아 낙찰자가 없을 때 처리 로직 구현하기
    - checkAuction과 스케줄러 수정