// file backend/routes/user.js that exports a new express router.
const express = require('express');
const {createUser, loginUser, updateUser} = require('../types');
const {userTable, studentsTable, studentsDetailsTable} = require('../db');
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const  { authMiddleware } = require("../middleware");

//create user express router
const router = express.Router();

/**=====GET Route:
 * find({}),
 * 
 * =====POST Route:
 * create(), findOne(),
 * 
 * =====update route: 
 * updateOne({_id:val},{key:val, key:val,,,,,,,})=========update only 1 id, 
 * update({_id:val},{})===========update many ids. */

//1. Signup route - Create users ---actual route /api/v1/user/signup
router.post('/signup',async function(req,res,next){
    const createPayload = req.body;
    const parsedPayload = createUser.safeParse(createPayload);//zod validation

    //A. Not successful
    if(!parsedPayload.success){
        res.status(411).json({
            message: "Incorrect inputs",
            mdf:createUser
        })
        return; //if 411 return back
    }

    //B. if username already exists 
    const existingUser = await userTable.findOne({
        username: req.body.username
    })
    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken"
        })
    }

    //C. if success - put into MongoDB
    const usercreated = await userTable.create({
        username: createPayload.username,
        password: createPayload.password,
        firstName: createPayload.firstName,
        lastName: createPayload.lastName,
        rollNumber: createPayload.rollNumber,
        group: createPayload.group
    })

    
    //user id of user just created above
    const userId = usercreated._id

    //initialize studentsTable table
    await studentsTable.create({
            userId,
            marks_day1: -1,
            test_pass_day1:-1,
            marks_day2: -1,
            test_pass_day2:-1,
            marks_day3: -1,
            test_pass_day3:-1       
        })      
        
    // //initialize studentsDetailsTable table
    // await studentsDetailsTable.create({
    //         userId,
    //         rollNumber: -1, //createPayload.rollNumber
    //         day:-1,
    //         question: -1,
    //         fileUploadPath:"filepath",
    //         marks: -1,
    //         numberOfTestCasesPassed:-1       
    // })       

    //encrypted jwt token created with id just created and the jwt secret key.
    const token = jwt.sign({userId}, JWT_SECRET);

    //return message on succesful signup
    res.json({
        message: "User created successfully",
        token: token,
        firstName: createPayload.firstName,
        lastName: createPayload.lastName,
        rollNumber: createPayload.rollNumber
    })
})
//////////////////////////////////////////////////////////////////////////////////////////////////
//2. Signin route - Login users
router.post('/signin',async function(req,res,next){
    const loginPayload = req.body;
    const parsedPayloadLogin = loginUser.safeParse(loginPayload);//zod validation

    //A. Not successful
    if(!parsedPayloadLogin.success){
        res.status(411).json({
            message: "Incorrect inputs"
        })
        return; //if 411 return back
    }
    
    //Checking value from MongoDB and req payload
    const userLoggedIn = await userTable.findOne({
        username: loginPayload.username,
        password: loginPayload.password        
    })

    //user id of user just logged in above
    const userId = userLoggedIn._id 
    
    //B. User logged in successfully(if user password match)
    if(userLoggedIn)
        {
            //encrypted jwt token created with id just loggedin and the jwt secret key.
            const token = jwt.sign({userId}, JWT_SECRET);

            //return token on succesful signin
            res.json({        
                token: token,
                user_id:userLoggedIn._id,
                firstName: userLoggedIn.firstName,
                lastName: userLoggedIn.lastName,
                rollNumber: userLoggedIn.rollNumber,
                group: userLoggedIn.group
            })
            return;
        }   

    //C. Other errors
    res.status(411).json({
        message: "Error while logging in"
    })    
})

//////////////////////////////////////////////////////////////////////////////////////////////////
//3. Update route - update users
// authMiddleware, is needed here as only authenticated users can update the table.
router.put('/', authMiddleware, async function(req,res,next){
    const updatePayload = req.body;
    const parsedPayloadUpdate = updateUser.safeParse(updatePayload);//zod validation

    //A. Not successful
    if(!parsedPayloadUpdate.success){
        res.status(411).json({
            message: "Incorrect inputs"
        })
        return; //if 411 return back
    }
    
    //Checking value from MongoDB and req payload---------------userId from where defined?????????????????????????
    await userTable.updateOne({
        _id: updatePayload.userId}, {
            password: updatePayload.password,
            firstName: updatePayload.firstName,
            lastName: updatePayload.lastName
        })

    //return message on succesful update
    res.json({
        message: "Updated successfully"
    })   
})

//////////////////////////////////////////////////////////////////////////////////////////////////
//4. Get route - get users
//Query Parameter: ?filter=harkirat-------------is case sensitive
router.get('/bulk', async function(req, res){
    // const filter = req.query.filter || "";

    // const users = await userTable.find({
    //     $or: [{
    //         firstName: {
    //             "$regex": filter
    //         }
    //     }, {
    //         lastName: {
    //             "$regex": filter
    //         }
    //     }, {
    //         _id: {
    //             "$regex": filter
    //         }
    //     }]
    // })

    const filter = req.query.userId || "";  
    if(filter){
        const user = await userTable.findOne({_id: filter});
        return res.json(user);
    }

    const users = await userTable.find({});
    //there can be many people with same firstname and lastname
    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            rollNumber: user.rollNumber,
            group: user.group,
            _id: user._id
        }))
    })
})

module.exports = router;