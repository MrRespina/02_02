// 1. npm init -y
// 2. npm install express morgan nunjucks sequelize sequelize-cli mysql2 chokidar
// 3. npx sequelize init

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const nunjucks = require('nunjucks');

const { sequelize } = require('./models');

const app = express();
app.set('port',process.env.PORT || 3000);
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
        console.log(err)
    });

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json);
app.use(express.urlencoded({extended:false}));

app.listen(app.get('port'),()=>{
    console.log(app.get('port'),'번 포트에서 동작 중')
});