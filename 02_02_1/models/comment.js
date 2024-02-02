const Sequelize = require('sequelize');

class Comment extends Sequelize.Model{

    static initiate(sequelize){

        Comment.init({

            comment:{
                type:Sequelize.STRING(100),
                allowNull:false,
            },
            created_at:{
                type:Sequelize.DATE,
                allowNull:false,
                defaultValue:Sequelize.NOW,
            },

        },{
            sequelize,
            timestamps:false,
            modelName:'Comment',
            tableName:'comments',
            paranoid:false,
            charset:'utf8mb4',
            collate:'utf8mb4_general_ci',
        });

    }

    static associate(db){

        db.Comment.belongsTo(db.User,{foreignKey:'commenter',targetKey:'id'});

    }

}

module.exports = Comment;

// comment 모델 이상한 점?
//  users 테이블과 연결이 된 commenter 컬럼이 없음.
//  이 부분은 모델을 정의할 때 해당 컬럼을 만들어도 되지만,
//  시퀄라이즈 자체에서 관계를 따로 정의 가능.

// associate 메소드로 인행 comments 테이블은 users 테이블의 id를 commenter(FK)로 하여 자신의 속성으로 가짐.