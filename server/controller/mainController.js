const { User, Exam, Invitee, Campus, Favourite } = require("../models");
const { Op } = require("sequelize");
const nodemailer = require("nodemailer");
const axios = require('axios')


class mainController {
  static async getCampus(req, res, next) {
    try {
      const { page, name } = req.query;
      console.log(name);
      let limit = 8;
      let offset = Number(page - 1) * limit || 0;
      let option = {};
      option.limit = limit;
      option.offset = offset;

      if (name) {
        option.where = { namaPTN: { [Op.iLike]: `%${name}%` } };
      }
      let { count, rows: campuses } = await Campus.findAndCountAll(option);
      res
        .status(200)
        .json({ campuses, limit: option.limit, offset: option.offset, count });
    } catch (error) {
      next(error);
    }
  }

  static async getDetailCampus(req, res, next) {
    const { id } = req.params;
    try {
      let campus = await Exam.findAll({
        include: [Campus],
        where: { PTN: id },
      });
      if (!campus) {
        throw { name: "Not Found" };
      }
      res.status(200).json(campus);
    } catch (error) {
      next(error);
    }
  }
  static async getDetailInvitee(req, res, next) {
    const { id } = req.params;
    try {
      let campus = await Invitee.findAll({
        include: [Campus],
        where: { IdUniversitas: id },
      });
      if (!campus || campus.length == 0) {
        throw { name: "Not Found" };
      }
      res.status(200).json(campus);
    } catch (error) {
      next(error);
    }
  }
  static async getExamById(req, res, next) {
    const { id } = req.params;
    try {
      let exam = await Exam.findByPk(id, {
        include: Campus,
      });
      if (!exam) {
        throw { name: "Not Found" };
      }
      res.status(200).json(exam);
    } catch (error) {
      next(error);
    }
  }

  static async getFavourite(req, res, next) {
    const UserId = req.user.id;
    try {
      let favourites = await Favourite.findAll({
        include: {
          model: Exam,
          include: {
            model: Campus,
          },
        },
        where: { UserId },
      });

      if (!favourites) {
        throw { name: "Not Found" };
      }
      res.status(200).json(favourites);
    } catch (error) {
      next(error);
    }
  }

  static async addFavoourite(req, res, next) {
    const UserId = req.user.id;
    const CampusId = req.params.examId;
    try {
      let exam = await Exam.findByPk(CampusId);
      if (!exam) throw { name: "Not Found" };
      let fav = await Favourite.findOne({
        where: { CampusId },
      });
      if (fav) throw { name: "used" };
      await Favourite.create({
        UserId,
        CampusId,
      });
      res.status(201).json({ message: "favourites created" });
    } catch (error) {
      next(error);
    }
  }

  static async destroyFavourite(req, res, next) {
    const { id } = req.params;
    console.log(id);
    try {
      let favourite = await Favourite.findByPk(id);
      if (!favourite) {
        throw { name: "Not Found" };
      }
      await favourite.destroy({ where: { id: id } });
      res.status(200).json({ message: `Favourite success to delete` });
    } catch (error) {
      next(error);
    }
  }

  static async compareValue(req, res, next) {
    const inviteeId = req.params.InviteeId;
    const email = req.user.email
    try {
      const { mat, kim, bio, fis, bind, bing } = req.body;
      const campus = await Invitee.findByPk(inviteeId);
      const value = campus.nilai;
      let theValue =
        (Number(mat) + Number(kim) + Number(bio) + Number(fis) + Number(bing)+Number(bind)) /
        6;
      let SMS;
      console.log(value, theValue);
      if (value < theValue) SMS = "Selamat nilai anda di atas NRM";
      if (value === theValue) SMS = "WAAAAH nilai anda Pass sekali";
      if (value > theValue) SMS = "Mohon maaf nilai anda kurang";

      // //nodemailer

      // let testAccount = await nodemailer.createTestAccount();
      // let transporter = nodemailer.createTransport({
      //   host: "smtp.ethereal.email",
      //   port: 587,
      //   secure: false, 
      //   auth: {
      //     user: process.env.gmail, 
      //     pass: process.env.password, 
      //   },
      //   service: "gmail"
      // });
    
      // let info = await transporter.sendMail({
      //   from: process.env.gmail, 
      //   to: email, 
      //   subject: "your result", 
      //   text: SMS, 
      //   html: "<b>Hello world?</b>", 
      // });
      // console.log(info,'<<<<<inpo');
      // batas nodemailer
      
      res.status(201).json({massage:SMS});
    } catch (error) {
      next(error);
    }
  }

  static async news(req,res,next){
    try {
      const apikey = process.env.apikey
      const news = {
        url:"https://api.apilayer.com/world_news/search-news?sort=education&&number=10",
        method: 'get',
        redirect:'follow',
        headers:{
          apikey,
        }
      }
      const {data}= await axios.request(news)
      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }



}

module.exports = mainController;
