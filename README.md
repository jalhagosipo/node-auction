# node-auction
- 실시간 경매 시스템
    - 회원가입, 로그인, 경매상품 등록, 방참여, 경매진행

# v0.1
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