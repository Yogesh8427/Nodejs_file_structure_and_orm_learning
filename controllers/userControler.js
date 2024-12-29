const { User } = require("../models/index");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const key="User#12#@^&^";

// create user
const createUser = async (request, responce) => {
  try {
    const { name, email, password } = request?.body;
    User.sync()
      .then(async (res) => {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        User.create({
          Name: name,
          Email: email,
          password: hash,
        })
          .then((res) => {
            responce.send({
              message: " user Created Successfully",
              status: 200,
            });
          })
          .catch((err) => {
            console.log(err, "error==>");
            responce.json(err).status(500);
          });
      })
      .catch((err) => {
        console.log(err, "error==>");
        responce.json({
          message: "failed",
          status: 500,
        }).status(500);
      });
  } catch (error) {
    console.log(error, "Error in UserControler");
  }
};
// log in user
const loginUser = async (request, responce) => {
  try {
    const{email,password}=request?.body;
    const user=await User.findOne({where:{Email:email}});
    if(user){
      const isvalid=bcrypt.compareSync(password,user?.dataValues?.password);
      const token = jwt.sign(user?.dataValues, key);
      isvalid?responce.send({isvalid,token}):responce.send({message:"Invalid user"});
    }else{
      responce.send({message:"Invalid User"});
    }
  } catch (error) {
    console.log(error,"server error");
    responce.json({
      message: "failed",
      status: 500,
    }).status(500);
  }
};
module.exports = { createUser, loginUser };
