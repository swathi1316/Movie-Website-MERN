import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const secret_key = "SHASHANK";

export default class UserController {
  static async registerUser(request, response) {
    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(request.body.password, salt);

      const user = new userModel({
        name: request.body.name,
        email: request.body.email,
        password: hashedPassword,
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

      const passwordCheck = await bcrypt.compare(
        request.body.password,
        user.password
      );

      if (!passwordCheck) {
        return response.status(400).send({
          message: "Passwords do not match",
        });
      }
      console.log(secret_key);
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
      const request1 = req;
      console.log("request,",request1);
      const headers = req.headers;
      console.log("header,",headers);
      const authHeader = req.headers["authorization"];
      console.log("authheader,",authHeader);
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


  // static async refreshToken(request, response) {
  //   try {
  //     const refreshToken = request.body.refreshToken;

  //     console.log("refresh token in backend,",refreshToken);
  
  //     // Verify the refresh token
  //     const decoded = jwt.verify(refreshToken, secret_key);

  //     console.log("decoded,",decoded);
  
  //     // Extract the user ID from the token payload
  //     const userId = decoded.userId;
  
  //     // Generate a new access token with a longer expiration time
  //     const newAccessToken = jwt.sign(
  //       {
  //         userId: userId,
  //       },
  //       secret_key,
  //       { expiresIn: '5m' } // Set a longer expiration time for the new access token
  //     );
  //     console.log("new access token in backend,",newAccessToken);
  //     // Return the new access token as the response
  //     response.status(200).json({ token: newAccessToken });
  //   } catch (error) {
  //     response.status(401).json({ message: 'Invalid refresh token' });
  //   }
  // }
  
}
