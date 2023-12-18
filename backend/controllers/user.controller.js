import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs'

export const user = (req, res) => {
    res.json(
        {
            message: "API working",
        }
    )
}



export const updateUser = async (req, res, next) => {
    // req.params.id ==> '/update/:id'
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, "You can update only Your Account"));
    }

    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 13);
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    pfp: req.body.pfp,
                }
            },
            { new: true }
        );
        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);

    } catch (err) {
        next()
    }
}

export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, "You can Delete only your account"))
    }
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
    }
    catch (err) {
        next(err);
    }

};