const express = require("express")
const controller = require("../controllers")
const router = express.Router()

router.route("/").get(controller.getalluser)
router.route("/register").post(controller.postuser)
router.route("/login").post(controller.postlogin)
router.route("/upload").post(controller.uploadimg).post(controller.addimg)

module.exports = router
