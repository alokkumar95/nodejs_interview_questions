const db = require("../models/index");
const jwt = require('jsonwebtoken')

const { User } = db;

function handleErrors(err) {
  let errors = { email: "", password: "" };

  err.errors.forEach((error) => {
    errors[error.path] = error.message;
  });
  return errors
}

function handleErrorsLogin(err){
  let errors = { email: "", password: "" };
  if(err.message==='Incorrect Email'){
    errors.email = 'This Email is not registered';
  }

  if(err.message==='Incorrect Password'){
    errors.email = 'This Password is not correct';
  }
  return errors;
}

const maxAge = 3 * 24 * 60 * 60;// in seconds

const createToken = (id)=>{
  return jwt.sign({id},'Interview Secret',{
    expiresIn: maxAge
  })

}

module.exports.signup_get = (req, res) => {
  res.render("signup");
};

module.exports.login_get = (req, res) => {
  res.render("login");
};


module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    const token = createToken(user.id);
    res.cookie('jwt',token,{httpOnly: true, maxAge: maxAge * 1000})
    res.status(201).json({user: user.id})
  } catch (err) {
    let errors = handleErrors(err);
    res.status(400).json({errors});
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  try{
    const user = await User.login(email,password);
    const token = createToken(user.id);
    res.cookie('jwt',token,{httpOnly: true, maxAge: maxAge * 1000})
    res.status(200).json({user:user.id})

  }catch(err){
    let errors = handleErrorsLogin(err);
    res.status(400).json({errors})
  }
};

module.exports.logout_get = async (req,res)=>{
  res.cookie('jwt','',{maxAge:1});
  res.redirect('/')
}
