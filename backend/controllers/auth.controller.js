import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {

    // creating a new user on post req from the client
    const {username, email, password} = req.body;
    // hashing our pass using bcryptjs
    const hashedPass = bcryptjs.hashSync(password, 13);
    // using our User model
    const newUser = new User ({username, email: email, password: hashedPass});
    
    // checking whether the given data is valid or not in terms of the schema defined
    try {
        await newUser.save();
        res.status(201).json({message: "User created successfully"});
    } catch (error) {
        //passing control to the next middleware fnc in the stack
       next(errorHandler(300, error.message));
    }
    
}