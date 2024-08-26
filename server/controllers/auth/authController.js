import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";
import Hashing from "../../helpers/hashing.js";
import bcrypt from "bcrypt";
import Token from "../../helpers/generateToken.js";
import Helpers from "../../helpers/featureHelp.js";

export const signUp = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const helpers = new Helpers();
  if (!name || !email || !password) {
    return helpers.sendMessage(res, 400, "Bad request");
  }

  let user = await User.findOne({ email });

  if (user) {
    return helpers.sendMessage(res, 409, `${name} is already a user`);
  }

  const hash = new Hashing(password); //password hashing class
  const hashedPassword = await hash.generateHash();

  user = new User({
    name,
    email,
    password: hashedPassword,
  });

  let newUser = await user.save();

  if (newUser) {
    helpers.sendMessage(res, 200, `Thank you for registering`);
  }
});

export const signIn = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const helpers = new Helpers();
  if (!req.body) {
    return helpers.sendMessage(res, 400, "Bad request");
  }

  let user = await User.findOne({ email });

  if (!user) {
    return helpers.sendMessage(res, 404, "Please register");
  }

  let isPassword = await bcrypt.compare(req.body.password, user.password); //password comparison

  if (!isPassword) {
    return helpers.sendMessage(res, 401, "Invalid credentials");
  }

  const authToken = new Token(user); //token generation

  let token = authToken.generateToken();

  const { password, __v, createdAt, updatedAt, ...rest } = user._doc;

  res.status(200).json({
    success: true,
    message: "Successfully login",
    data: {
      ...rest,
    },
    token,
  });
});


export const updateUser = asyncHandler(async(req,res) => {
    const {name,email} = req.body;
   
    const helper = new Helpers();
    if(!name || !email){
        return helper.sendMessage(res,400,"Bad request");
    }

    let existingUser = await User.findOne({email});

    if(!existingUser){
        return helper.sendMessage(res,404,'User not found');
    }
    existingUser.name = name;
    try{
        const updatedUser = await existingUser.save();
        helper.sendMessage(res,200,updateUser);
    }catch(error){
        console.log(error.message);
        return helper.sendMessage(res,500,"User not updated");
    }
});