import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

const secret_key = "SHASHANK";

export default class UserController {
  static async registerUser(request, response) {
    try {
      const user = new userModel({
        name: request.body.name,
        email: request.body.email,
        password: request.body.password,
      });

      const result = await user.save();

      response.status(201).send({
        message: "User Created Successfully",
        result,
      });
    } catch (error) {
      response.status(500).send({
        message: "Error creating user",
        error,
      });
    }
  }

  static async loginUser(request, response) {
    try {
      const user = await userModel.findOne({ email: request.body.email });

      if (!user) {
        return response.status(404).send({
          message: "Email not found",
        });
      }

      if (user.password !== request.body.password) {
        return response.status(400).send({
          message: "Passwords do not match",
        });
      }
      
      const token = jwt.sign(
        {
          userId: user._id,
          userEmail: user.email,
        },
        secret_key, // Use the same secret key here
        { expiresIn: "24h" }
      );

      response.status(200).send({
        message: "Login Successful",
        email: user.email,
        token,
      });
    } catch (error) {
      response.status(500).send({
        message: "Error during login",
        error,
      });
    }
  }

  static async authenticateToken(req, res, next) {
    try {
      const headers = req.headers;
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
      console.log("refresh token in backend,",token);
      if (!token) {
        return res.sendStatus(401);
      }

      jwt.verify(token, secret_key, (err, decoded) => {
        if (err) {
          console.log("Error verifying token:", err);
          return res.sendStatus(403);
        }
        console.log("req.user,",req.user)
        req.user = decoded;
        console.log("req.user,",req.user)
        next();
      });
      
    } catch (error) {
      res.status(500).send({
        message: "Error during token authentication",
        error,
      });
    }
  }  
}
