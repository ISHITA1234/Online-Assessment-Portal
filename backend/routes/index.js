// file backend/routes/index.js that exports a new express router.
const express = require('express');
const userRouter = require("./users");
const studentRouter = require("./students");
const adminRouter = require("./admins");
const uploadRouter = require("./uploads")

//express router
const router = express.Router();

//route all requests from /api/v1/user to it******
router.use("/user", userRouter);
//route all requests from /api/v1/student to it******
router.use("/student", studentRouter);
//route all requests from /api/v1/admin to it******
router.use("/admin", adminRouter);
//route all requests from /api/v1/admin to it******
// router.use("/uploads", uploadRouter);



module.exports = router;