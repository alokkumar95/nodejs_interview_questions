const { isEmail } = require("validator");
const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    email: {
      type: DataTypes.STRING,
      unique: { arg: true, msg: "This username is already taken." },
      allowNull: false,
      validate: {
        isLowercase: true,
        isEmail(value) {
          if (!isEmail(value)) {
            throw new Error("Provide Valid email!");
          }
        },
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[0-9a-f]{6}$/i,
      },
    },
  });

  User.beforeSave(async(user,options)=>{
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password,salt)
  })

  User.login = async function(email,password){
    const user = await this.findOne({where:{email:email}})
    console.log("user",user)
    if(user){
      const auth = await bcrypt.compare(password,user.password);
      if(auth){
        return user;
      }
      throw Error('Incorrect Password')

    }
    throw Error('Incorrect Email')
  }

  return User;
};
