// install mysql 해줘야함.

const mysql = require('mysql2');  // mysql 모듈 로드
const conn = {  // mysql 접속 설정
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'sdj7524',
    database: 'practice'
};

var connection = mysql.createConnection(conn); // DB 커넥션 생성
connection.connect();   // DB 접속
 
var testQuery = "INSERT INTO Respina VALUES ('감초2',23,'강서구');";    // 사용할 query문
 
connection.query(testQuery, function (err, results, fields) { // testQuery 실행
    if (err) {
        console.log(err);
    }
    console.log(results);
});
 
var testQuery2 = "SELECT * FROM Respina";   // 사용할 query문 2
 
connection.query(testQuery2, function (err, results, fields) { // testQuery2 실행
    if (err) {
        console.log(err);
    }
    console.log(results);
});
 
connection.end(); // DB 접속 종료
