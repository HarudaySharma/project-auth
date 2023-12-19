import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import Jwt from "jsonwebtoken";

export const sign_up = async (req, res, next) => {
  // creating a new user on post req from the client
  const { username, email, password } = req.body;
  // hashing our pass using bcryptjs
  const hashedPass = bcryptjs.hashSync(password, 13);
  // using our User model
  const newUser = new User(
    {
      username,
      email: email,
      password: hashedPass
    });

  // checking whether the given data is valid or not in terms of the schema defined
  try {
    await newUser.save();
    res
      .status(201)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    //passing control to the next middleware fnc in the stack
    console.log(error)
    next(errorHandler(500, "Username already taken or already have an account"));

    // can use custom error handlers to handle any error and show it in the custom format to the user
    //next(errorHandler(300, error.message));
  }
};


function generateToken(id) {
  return Jwt.sign({ id: id }, process.env.JWT_SECRET);
}

function getResponseData(user) {
  const { password: hashedPassword, ...rest } = user._doc;
  return rest;
}


export const sign_in = async (req, res, next) => {
  // finding the login credentials
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return next(errorHandler(404, "User not found"));

    const isPassValid = bcryptjs.compareSync(password, user.password);
    if (!isPassValid) return next(errorHandler(401, "wrong credentials"));

    //creating a sign in cookie
    const token = generateToken(user._id)

    //excluding password from rest of the user data to send it to the client
    const resData = getResponseData(user);
    resData.success = true;

    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(resData);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const google = async (req, res, next) => {
  const { name, email, photo } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      //create new user
      // 16 character password
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      // (36 -> 0-9 && aA-zZ ) && (-8 -> 8 letters from the end)
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 13);
      const newUser = new User({
        username:
          name.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-8),
        email: email,
        password: hashedPassword,
        pfp: photo,
      });
      await newUser.save();
      const token = generateToken(newUser._id);
      const resData = getResponseData(newUser);
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(resData);
      return;
    }

    const token = generateToken(user._id);
    const resData = getResponseData(user);

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(resData);
  } catch (err) {
    next(err);
  }
};



export const sign_out = async (req, res, next) => {
  res.clearCookie('access_token').status(200).json("Signout success");
};