// npm init -y
// package.json
// 시퀄라이즈 (Sequelize)
//      ORM(Object Relation Mapping)
//      자바스크립트 객체와 데이터베이스의 테이블을 매핑해주는 도구
// npm install express morgan nunjucks sequelize sequelize-cli mysql2 chokidar
// 설치 완료 후 npx sequelize init 명령어 실행 > 여러 폴더 생성

const express = require('express');
const morgan = require('morgan');
const nunjucks = require('nunjucks');

const { sequelize } = require('./models');

const app = express();

app.set('view engine','html');

nunjucks.configure('views',{
    express:app,
    watch:true,
});

sequelize.sync({force:false})
    .then(()=>{
        console.log('DB 연결 성공');
    })
    .catch((err)=>{
        console.log(err);
    });

app.listen(3000,()=>{
    console.log('3000번 포트 사용중 ...');
});