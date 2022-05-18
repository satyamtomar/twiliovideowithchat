const express = require("express");
const router = express.Router();
const videoController=require('../controllers/VideoChat');

router.route("/getToken").post(videoController.getToken);

module.exports = router;
