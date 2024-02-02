// SQL문을 시퀄라이즈로 작업하기
const { User } = require('./models');

// INSERT INTO prac.users (name,age,married,comments) VALUES('asdf',100,0,'안녕!');
User.create({
    name:'asdf',
    age:100,
    married:false,
    comment:'안녕!',
});

// SELECT * FROM prac.users;
// findAll로 가져옴
User.findAll({});

// attributes 옵션을 사용해서 원하는 컬럼만 가져올 수도 있다.
// SELECT name,married FROM prac.users;
User.findAll({
    attributes: ['name','married'],
});

// 조건 검색
// SELECT name,age FROM prac.users WHERE married 1 and age > 30;
User.findAll({
    attributes: ['name','age'],
    where : {
        married : true,
        age:{[Op.gt]:30},
    }
});

// 연산자 관련
// Sequelize 객체 내부의 Op 객체를 불러왔고
// Op.gt (초과) / Op.gte (이상) / Op.lt (미만) / Op.lte (이하)
// Op.ne (같지 않음) / Op.or (또는) / Op.in (배열 요소중 하나)
// Op.notIn (배열 요소와 모두 다름)
// 정도의 연산자가 자주 사용 됨.

// Op.or 예시
// SELECT id,name FROM prac.users WHERE married = 0 or age > 30;
User.findAll({
    attributes: ['id','name'],
    where : {
        [Op.or] : [{married : false},
        {age:{[Op.gt]:30}}]
    }
});

// update
// UPDATE prac.users SET comment = '바꿀 내용' WHERE id = 2;
User.update({
    comment:'바꿀 내용'
},{
    where : {id:2}
});
// 첫 번째 파라미터는 수정할 내용,
// 두 번째 파라미터는 어떤 데이터를 바꿀지를 특정.

// Delete
// DELETE FROM prac.users WHERE id = 2;
User.destroy({
    where : {id:2}
});

// --------------------------------------------
// 관계 쿼리
// 현재 User 모델은 Comment 모델과 hasMany - belongsTo 관계
// 이 때 특정 사용자를 가져오면서 그 사람이 작성한 댓글까지
//  모두 가져오고 싶다면 include 속성을 사용할 것!

const user = User.findOne({

    include:[{
        model:Comment
        
    }]

});