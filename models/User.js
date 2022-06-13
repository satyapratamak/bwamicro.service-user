module.exports = (sequelize, DataTypes)=>{
    const User = sequelize.define('User', {
        id: {
          type : DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        name : {
          type : DataTypes.STRING,
          allowNull: false,
        }, 
        profession : {
          type : DataTypes.STRING,
          allowNull: true,
        },
        avatar : {
          type : DataTypes.STRING,
          allowNull: true,
        },
        role : {
          type : DataTypes.ENUM,
          values : ["admin", "student"],
          allowNull: false,
          defaultValue : 'student',
        },
        email : {
          type : DataTypes.STRING,
          allowNull: false,
          unique : true,
        },
        password : {
          type : DataTypes.STRING,
          allowNull: false,
        },
        created_at : {
          type : DataTypes.DATE,
          field : 'created_at',
          allowNull: false,
        },
        updated_at : {
          type : DataTypes.DATE,
          field : 'updated_at',
          allowNull: false,
        },
    }, {
        tableName : 'users',
        timestamps : true,
    });
    return User;
}