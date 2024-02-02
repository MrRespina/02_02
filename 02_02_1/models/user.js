// 모델 정의
// 시퀄라이즈는 기본적으로 모델의 이름은 단수형
//      테이블의 이름은 복수형 사용

const Sequelize = require('sequelize');

class User extends Sequelize.Model{

    static initiate(sequelize){

        User.init({

            name:{
                type:Sequelize.STRING(20),
                allowNull:false,
                unique:true,
            },
            age:{
                type:Sequelize.INTEGER.UNSIGNED,
                allowNull:false,
            },
            married:{
                type:Sequelize.BOOLEAN,
                allowNull:false,
            },
            comment:{
                type:Sequelize.TEXT,
                allowNull:false,
            },
            create_at:{
                type:Sequelize.DATE,
                allowNull:false,
                defaultValue:Sequelize.NOW,
            },
        },{
            sequelize,
            timestamps:false,
            underscored:true,
            modelName:'User',
            tableName:'users',
            paranoid:false,
            charset:'utf',
            collate:'utf8_general_ci',
        });

    }

    static associate(db){

        db.User.hasMany(db.Comment,{foreignKey:'commenter',sourceKey:'id'});

    }
    // 왜 db라는파라미터를 사용하는지 의문을 가질 수 있음
    // 코드 최상단에 require로 comment.js를 부르면 되지 않을까 ?
    //  라고 생각할 수도 있는데
    // 이 경우 user.js에서 comment.js 불러옴 , comment.js에서 user.js 불러오는 상황
    // 이 때 문제가 발생할 수 있음. > 서로가 서로를 무한히 로딩
    // 서로가 서로를 require하는 방식을 순환 참조라고 하는데, 지양해야 함.

    // 어떤 모델에서는 hasMany를 쓰고,
    // 어떤 모델에서는 belongsTo를 사용함   / 1:n, 관계의 차이에서 비롯됨.
    // 다른 모델의 정보가 들어가는 테이블에는 belongsTo 함수 사용
    // 참조가 되는 모델에서는 hasMany 함수 사용, hasMany 메소드에서는 sourceKey 속성 사용하여 id 넣어줌.
    // belongsTo 메소드에서는 targetKey 속성을 사용하여 id를 넣음.
    // 이것은 모두 User 모델에 있는 id 값을 의미함.

    // 1:1 관계에서는 hasMany 대신 hasOne 메소드 사용
    // 참조하는 메소드는 belongsTo로 사용.

    // 사용자의 정보를 담고있는 Info라는 모델이 존재한다 가정.
    // db.User.hasOne(db.Info,{foreignKey:'UserID',sourceKey:'id'});
    // db.Info.belongsTo(db.User,{foreignKey:'UserID',targetKey:'id'});
    // 1:1 관계라고 하더라도 belongsTo와 hasOne이 반대로 작성되어서는 안됨.

    // N:M 관계에서는 belongsToMany 메소드로 사용
    // belongsToMany <-> belongsToMany
    // 게시글 정보를 담고 있는 Post 모델과,
    // 해시태그 정보를 담고 있는 Hashtag 라는 모델이 있다고 가정하고

    // db.Post.belongsToMany(db.Hashtag,{through:'PostHashtag'});
    // db.Hashtag.belongsToMany(db.Post,{through:'PostHashtag'});
    // 이런식으로 서로에게 belongsToMany 메소드를 사용함.
    // N:M 관계의 특성상 새로운 모델이 생성된다.
    // through 속성에는 생성할 모델의 이름을 명시하면 되고,생성된 모델에는 게시글과 해시태그의 id가 저장됨



}

module.exports = User;
// User 모델을 만들고 외부로 export 한 상태
//  모델은 Sequelize.Model을 확장한 클래스로 선언함.
//  모델은 크게 static initiate 메소드와 static associate 메소드로 나뉘게 됨.
//      static initiate : 테이블에 대한 설정
//      static associate : 다른 모델과의 관계에 대한 설정

// 자료형
//  VARCHAR > STRING
//  TEXT > TEXT
//  INT > INTEGER
//  DOUBLE > DOUBLE
//  TINYINT > BOOLEAN
//  DATETIME > DATE
//      현재 시간 : Sequelize.NOW

// 제약 조건
//  NOT NULl > allowNull : false
//  UNIQUE > unique : true

// 모델.init 메소드의 두 번째 파라미터 = 테이블 옵션
//  sequelize : static initiate 메소드의 파라미터와 연결되는 옵션, 나중에 models/index.js에서 연결함
//  timestamp : 현재 값은 false , true라면 createAt과 updateAt 컬럼을 추가하는 데, 각각 row가 생성될 때와 수정될 떄의 시간이 자동으로 입력
//      우리는 직접 created_at 이라는 컬럼을 만들어서 false
//  underscored : 시퀄라이즈는 기본적으로 테이블명과 컬럼명을 카멜체로 만들어줌. 허나 이 옵션을 사용해서 뱀체로 바꿔줄 수 있음.
//  modelName : 모델의 이름 설정
//  tableName : Database의 테이블 이름
//  paranoid : true로 설정하는 경우, deleteAt이라는 컬럼이 생김
//          > 데이터를 지운 시간이 기록됨.
//  charset,collate : 각각 utf8,utf8_general_ci로 설정해야 한글 입력 가능.
//                  이모티콘까지 입력하고싶다면 utf8mb4 / utf8mb4_general_ci로 설정하면 됨.