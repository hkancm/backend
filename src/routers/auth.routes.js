const router = require("express").Router();
const { login, register, me } = require("../controller/auth.controller");
const { tokenCheck } = require("../middlewares/auth");
const authValidation = require("../middlewares/validation/auth.validation");

router.post("/login",authValidation.login,login)
router.post("/register",authValidation.register,register)
router.get("/me", tokenCheck, me);


module.exports = router;
