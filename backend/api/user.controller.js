import userModel from "../models/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const secret_key = "RANDOM-TOKEN";

export default class UserController {
    static async registerUser(request,response)
    {
        // hash the password

        // generates a random salt value using which password is hashed which in turn increases security
        // output of bcrypt.hash is saved in the hashedpassword variable which is passed to userModel object further.
        const salt = await bcrypt.genSalt();
        await bcrypt.hash(request.body.password, salt)
        .then((hashedPassword) => {
        // create a new user instance and collect the data
        const user = new userModel({
            name:request.body.name,
            email: request.body.email,
            password: hashedPassword
        });

        // save the new user
        user.save()
            // return success if the new user is added to the database successfully
            .then((result) => {
            response.status(201).send({
                message: "User Created Successfully",
                result,
            });
            })
            // catch error if the new user wasn't added successfully to the database
            .catch((error) => {
            response.status(500).send({
                message: "Error creating user",
                error,
            })
            })
        })
        // catch error if the password hash isn't successful
        .catch((e) => {
        response.status(500).send({
            message: "Password was not hashed successfully",
            e,
        })
        })
    }

    static async loginUser(request,response)
    {
        // check if email exists
        userModel.findOne({ email: request.body.email })
        // if email exists
        .then((user) => {
            // compare the password entered and the hashed password found
            bcrypt
            .compare(request.body.password, user.password)

            // if the passwords match
            .then((passwordCheck) => {

                // check if password matches
                if(!passwordCheck) {
                return response.status(400).send({
                    message: "Passwords does not match",
                    error,
                })
                }

                //   create JWT token
                const token = jwt.sign(
                {
                    userId: user._id,
                    userEmail: user.email,
                },
                "secret_key",
                { expiresIn: "24h" }
                )

                //   return success response
                response.status(200).send({
                message: "Login Successful",
                email: user.email,
                token,
                })
            })
            // catch error if password does not match
            .catch((error) => {
                response.status(400).send({
                message: "Passwords does not match",
                error,
                })
            })
        })
        // catch error if email does not exist
        .catch((e) => {
            response.status(404).send({
            message: "Email not found",
            e,
            })
        })
    }

    static async authenticateToken(req, res, next) {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
      
        if (token == null) {
          return res.sendStatus(401);
        }
      
        jwt.verify(token, "secret_key", (err, user) => {
          if (err) {
            return res.sendStatus(403);
          }
          req.user = user;
          next();
        });
      }
    
}