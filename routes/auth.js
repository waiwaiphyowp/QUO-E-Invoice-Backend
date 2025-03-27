const express = require("express");
const router = express.Router();
const authCtrl = require("../controllers/auth");

router.post("/sign-up", authCtrl.signUp);
router.post("/sign-in", authCtrl.signIn);
//router.post("/sign-out", authCtrl.signOut);

module.exports = router;
