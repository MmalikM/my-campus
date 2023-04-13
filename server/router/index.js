"use strict";

const { route } = require("../app");
const mainController = require("../controller/mainController");
const userController = require("../controller/userController");
const authentification = require("../middleware/authentification");

const router = require("express").Router();


router.post("/register", userController.register );
router.post("/login", userController.login );
router.get("/users",userController.getUser)
router.post("/sign-in", userController.signIn)
router.patch("/subscription", authentification, userController.changeSubscribe );
router.post('/generate-midtrans-token',authentification,userController.generateMidtrans)

router.get("/campuses", mainController.getCampus );
router.get("/campuses/:id", mainController.getDetailCampus );
router.get("/exams/:id", mainController.getExamById );
router.get("/campuses/invitees/:id",mainController.getDetailInvitee );
router.get("/favourites", authentification,mainController.getFavourite );
router.post("/favourites/:examId", authentification,mainController.addFavoourite );
router.delete("/favourites/:id", authentification,mainController.destroyFavourite );
router.post('/tests/:InviteeId', authentification,mainController.compareValue)

router.get('/news', mainController.news)
 

module.exports = router; 