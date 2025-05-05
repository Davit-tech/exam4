import {Users} from "../models/index.js";
import helpers from "../utils/helpers.js";
import createError from "http-errors";
import mail from "../services/mail.js";
import qs from "query-string";

export default {

    async register(req, res) {
        const {userName, email, password} = req.body;

        try {
            const userEmail = await Users.findOne({where: {email}});

            if (userEmail) {
                return res.status(422).json({
                    success: false,
                    message: "User with this email already exists. Please try another one",
                    messageType: "error",
                });
            }

            const user = await Users.create({userName, email, password});
            const token = await helpers.createToken({userId: user.id});

            await mail(
                email,
                '"Maddison Foo Koch 👻" <maddison53@ethereal.email>',
                "Profile activation email",
                "activate-user",
                {
                    name: userName,
                    link: `http://localhost:3000/user/activate?${qs.stringify({token})}`,
                },);

            user.activationToken = token;
            await user.save();

            res.status(201).json({
                user, success: true, message: "Registration successful!", messageType: "success",
            });

        } catch (err) {
            console.error("Error during user registration:", err);
            res.status(500).json({message: "Internal server error"});
        }
    }, async activate(req, res) {

        try {
            const {token} = req.query;

            const user = await Users.findOne({where: {activationToken: token}});

            if (!user) {
                return res.status(422).json({message: "Invalid activation token"});
            }

            user.status = "active";
            await user.save();
            res.render("userActive");
        } catch (err) {
            console.error("Error during activation:", err);
            res.status(500).json({message: "Activation failed"});
        }
    },
    async login(req, res, next) {

        try {
            const {email, password} = req.body;

            const user = await Users.findOne({where: {email}});

            if (!user) {
                return res.status(422).json({
                    success: false, message: "User not found", messageType: "error",
                });
            }

            if (user.status !== 'active') {
                return res.status(403).json({
                    success: false,
                    message: "Account is not activated. Please check your email to activate your account.",
                    messageType: "error",
                });
            }

            const plainPassword = await user.dataValues.password;
            const isMatch = await Users.comparePassword(password, plainPassword);

            if (isMatch) {
                const token = await helpers.createToken(user.id);
                return res.status(200).json({
                    token, user, message: "Login successfully", success: true,
                });
            } else {
                return res.status(422).json({
                    success: false, messageType: "error", message: "Invalid password",
                });
            }

        } catch (err) {
            return next(createError(500, `Server error. Please try again later: ${err.message}`));
        }
    },

};


