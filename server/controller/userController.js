const midtransClient = require("midtrans-client");
const { comparePassword } = require("../helper/bcrypt");
const { createToken, readPayload } = require("../helper/jwt");
const { User, Exam, Invitee, Campus, Favourite } = require("../models");
const { OAuth2Client } = require("google-auth-library");
const axios = require("axios");

class userController {
  static async register(req, res, next) {
    try {
      const { name, email, password, school, studentClass } = req.body;
      // const apikey = process.env.apikey
      // const cekEmail = {
      //   url:"https://api.apilayer.com/email_verification/check?email="+email,
      //   method: 'get',
      //   redirect:'follow',
      //   headers:{
      //     apikey,
      //   }
      // }
      // const {data}= await axios.request(cekEmail)

      // if(data.domain!=="gmail.com") throw {name: "not_gmail"}
      console.log(req.body);
      let createUser = await User.create({
        name,
        email,
        password,
        school,
        studentClass,
        isSubscribed: false,
      });
      res.status(201).json({
        message: `user with email ${createUser.name} has been created`,
      });
    } catch (error) {
      next(error);
    }
  }
  static async signIn(req, res, next) {
    try {
      const token_google = req.headers.token_google;
      const client = new OAuth2Client(process. clientId);

      const ticket = await client.verifyIdToken({
        idToken: token_google,
        audience: process.env.clientId, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      const payload = ticket.getPayload();

      const [user, create] = await User.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          name: payload.name,
          email: payload.email,
          password: "semnagat_kakakss",
          school: "sma mana aja",
          studentClass: 12,
          isSubscribed: false,
        },
        hooks: false,
      });

      const token = createToken({
        id: user.id,
      });

      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }

  static async changeSubscribe(req, res, next) {
    try {
      await User.update(
        { isSubscribed: true },
        {
          where: {
            id: req.user.id,
          },
        }
      );
      res.status(200).json({ message: `user can accses All fiture` });
    } catch (error) {
      next(error);
    }
  }

  static async getUser(req, res, next) {
    let token = req.headers.token;
    try {
      let payload = readPayload(token);
      let user = await User.findByPk(payload.id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async generateMidtrans(req, res, next) {
    try {
      const findUser = await User.findByPk(req.user.id);

      if (findUser.isSubscribed !== "false") throw { name: "subscribed" };

      let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: process.env.midtrans_server_key,
      });

      let parameter = {
        transaction_details: {
          order_id: "transaction__" + Math.floor(1000000 * Math.random()),
          gross_amount: 1000000,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          name: findUser.name,
          email: findUser.email,
        },
      };

      const midtransToken = await snap.createTransaction(parameter);

      res.status(201).json(midtransToken);
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) throw { name: "email_password_required" };

      const user = await User.findOne({
        where: { email },
      });
      if (!user) throw { name: "email/password_incorrect" };
      const validPass = comparePassword(password, user.password);
      if (!validPass) throw { name: "email/password_incorrect" };

      const payload = {
        id: user.id,
      };

      const token = createToken(payload);

      res.status(200).json({ token, isSubscribed: user.isSubscribed });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = userController;
