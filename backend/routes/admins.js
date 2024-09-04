const express = require('express');
const mongoose = require("mongoose");
const {questionsPost, questionDel, questionsUpdate, testcasesUpdate} = require('../types');
const {questionsTable,testCaseTable, studentsDetailsTable, enableDisableAssignmentDay} = require('../db');
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const  { authMiddleware } = require("../middleware");

//create account express router
const router = express.Router();

router.get('/enableAssignment',async function(req, res){  
        
    response = await enableDisableAssignmentDay.find({}); //findone gives only the 1st one
            
    res.json(response)
})

//1. addquestions route - Create questions ---actual route /api/v1/admin/addquestions
router.post('/addquestions',async function(req,res,next){
    const createPayload = req.body;
    const parsedPayload = questionsPost.safeParse(createPayload);//zod validation

    //A. Not successful
    if(!parsedPayload.success){
        res.status(411).json({
            message: "Incorrect inputs"
        })
        return; //if 411 return back
    }

    //B. if day already exists 
    const existingDay = await questionsTable.findOne({
        day: req.body.day
    })
    if (existingDay) {
        return res.status(411).json({
            message: "Day already taken"
        })
    }

    //C. if success - put into MongoDB
    const questionscreated = await questionsTable.create({
        day: createPayload.day,
        question1: createPayload.question1,
        question2: createPayload.question2,
        question3: createPayload.question3,
        question4: createPayload.question4,
        question5: createPayload.question5,
        question6: createPayload.question6,
        question7: createPayload.question7,
        question8: createPayload.question8,
        question9: createPayload.question9,
        question10: createPayload.question10
    })

    
    //user id of questions just created above
    const dayId = questionscreated._id

    //initialize test Cases to null string--need to create the Amounts table, Empty string is not possible if string is required
    await testCaseTable.create({
            dayId:dayId,
            question1: {
                testcase1: "Test",
                testcase2: "Test",
                testcase3: "Test",
                testcase4: "Test",
                testcase5: "Test",
                testcase6: "Test",
                testcase7: "Test",
                testcase8: "Test",
                testcase9: "Test",
                testcase10: "Test"
            },
            question2: {
                testcase1: "Test",
                testcase2: "Test",
                testcase3: "Test",
                testcase4: "Test",
                testcase5: "Test",
                testcase6: "Test",
                testcase7: "Test",
                testcase8: "Test",
                testcase9: "Test",
                testcase10: "Test"
            },
            question3: {
                testcase1: "Test",
                testcase2: "Test",
                testcase3: "Test",
                testcase4: "Test",
                testcase5: "Test",
                testcase6: "Test",
                testcase7: "Test",
                testcase8: "Test",
                testcase9: "Test",
                testcase10: "Test"
            },
            question4: {
                testcase1: "Test",
                testcase2: "Test",
                testcase3: "Test",
                testcase4: "Test",
                testcase5: "Test",
                testcase6: "Test",
                testcase7: "Test",
                testcase8: "Test",
                testcase9: "Test",
                testcase10: "Test"
            },
            question5: {
                testcase1: "Test",
                testcase2: "Test",
                testcase3: "Test",
                testcase4: "Test",
                testcase5: "Test",
                testcase6: "Test",
                testcase7: "Test",
                testcase8: "Test",
                testcase9: "Test",
                testcase10: "Test"
            },
            question6: {
                testcase1: "Test",
                testcase2: "Test",
                testcase3: "Test",
                testcase4: "Test",
                testcase5: "Test",
                testcase6: "Test",
                testcase7: "Test",
                testcase8: "Test",
                testcase9: "Test",
                testcase10: "Test"
            },
            question7: {
                testcase1: "Test",
                testcase2: "Test",
                testcase3: "Test",
                testcase4: "Test",
                testcase5: "Test",
                testcase6: "Test",
                testcase7: "Test",
                testcase8: "Test",
                testcase9: "Test",
                testcase10: "Test"
            },
            question8: {
                testcase1: "Test",
                testcase2: "Test",
                testcase3: "Test",
                testcase4: "Test",
                testcase5: "Test",
                testcase6: "Test",
                testcase7: "Test",
                testcase8: "Test",
                testcase9: "Test",
                testcase10: "Test"
            },
            question9: {
                testcase1: "Test",
                testcase2: "Test",
                testcase3: "Test",
                testcase4: "Test",
                testcase5: "Test",
                testcase6: "Test",
                testcase7: "Test",
                testcase8: "Test",
                testcase9: "Test",
                testcase10: "Test"
            },
            question10: {
                testcase1: "Test",
                testcase2: "Test",
                testcase3: "Test",
                testcase4: "Test",
                testcase5: "Test",
                testcase6: "Test",
                testcase7: "Test",
                testcase8: "Test",
                testcase9: "Test",
                testcase10: "Test"
            }
        })       

    //encrypted jwt token created with id just created and the jwt secret key.
    // const token = jwt.sign({userId}, JWT_SECRET);

    //return message on succesful signup
    res.json({
        message: "Questions created successfully"
    })
})


//2.. Get questions - get questions
//Query Parameter: ?=filter=day
router.get('/getquestions',async function(req, res){  
    const filter = req.query.day || "";  
    let questions;  
    if(filter){
        questions = await questionsTable.findOne({day: filter});
        return res.json(questions);
    }
    
    questions = await questionsTable.find({}); //findone gives only the 1st one
            
    res.json(questions)
})

//3.. delete questions - del questions
router.delete('/deletequestions',async function(req, res){  
    const delquestionsPayload = req.body;
    const parseddelquestions = questionDel.safeParse(delquestionsPayload);//zod validation

    //B. Not successful zod
    if(!parseddelquestions.success){
        res.status(411).json({
            message: "Invalid Input"
        })
        return; //if 411 return back
    }    

    const questions = await questionsTable.findOne({
        day:req.body.day
    });

    // delete all questions and test cases for a day
    // const question_deleted = await questionsTable.deleteOne({
    //     _id:questions._id
    // })
    // const testcase_deleted = await testCaseTable.deleteOne({
    //     dayId:questions._id
    // })

    //del a perticular question of a day
    try {        
        const questionkeydeleted = await questionsTable.findOneAndUpdate({ _id: questions._id }, { $unset: { [req.body.questiontodel]: "" } }, { new: true });
        // console.log('Key removed:', questionkeydeleted);
    } catch (err) {
        console.error("no such key");
    }

    try {        
        const questionkeydeleted = await testCaseTable.findOneAndUpdate({ dayId:questions._id }, { $unset: { ["testcase" + req.body.questiontodel.match(/\d+$/)]: "" } }, { new: true });
        // console.log('Key removed:', questionkeydeleted);
    } catch (err) {
        console.error("no such key");
    }
    
    // if(question_deleted.deletedCount==1 && testcase_deleted.deletedCount==1){
    //     res.json({
    //         message:"Question and its Coresponsding Test case are Deleted!",
    //         id_questions:questions._id,
    //         questionkeydeleted:questionkeydeleted,
    //         testkeydeleted:"testcase" + req.body.questiontodelmatch(/\d+$/),
    //         question_deleted:question_deleted,
    //         testcase_deleted:testcase_deleted
    //     })
    // }
    // else{
    //     res.json({
    //         message:"Deletion not successful"
    //     })
    // }

    
    res.json({
        message:"Question and its Coresponsding Test case are Deleted!",
        id_questions:questions._id,
        questionkeydeleted:req.body.questiontodel,
        testkeydeleted:"testcase" + req.body.questiontodel.match(/\d+$/)        
    })

    
})

//4. Post route - updatequestions 
router.post('/updatequestions', async function(req,res,next){   

    const updatequestionsPayload = req.body;
    const parsedupdatequestions = questionsUpdate.safeParse(updatequestionsPayload);//zod validation

    //B. Not successful zod
    if(!parsedupdatequestions.success){
        res.status(411).json({
            message: "Invalid Input"
        })
        return; //if 411 return back
    }    

    //only filter out those questions that are not empty string
    finalobject={};
    for (const key in updatequestionsPayload) {
        if (updatequestionsPayload[key] !== "") {
            finalobject[key] = updatequestionsPayload[key]
        }
    }    
    
    // only update those questions that are not empty string    
    await questionsTable.updateOne({
        day: updatequestionsPayload.day}, 
        finalobject           
        );    

    //D. Succesful update
    res.json({
        message: "Questions uploaded successfully",
        day: updatequestionsPayload.day,
        finalobject:finalobject  
    })    
})


///////////////TEST CASES, test cases are done above, only get, update and del is left
//1.. Get testcases - get testcases
//Query Parameter: ?dayId=xxx?question=question1
router.get('/gettestcases',async function(req, res){  
    const dayfilter = req.query.dayId || "";  
    const questionfilter = req.query.question || "";  
    // console.log(questionfilter);
    let testcases;  
    if(dayfilter && questionfilter){
        testcases = await testCaseTable.findOne({dayId: dayfilter});
        return res.json(testcases[questionfilter]);
    }
    else if(dayfilter){
        testcases = await testCaseTable.findOne({dayId: dayfilter});
        return res.json(testcases);
    }

    testcases = await testCaseTable.find({}); //findone gives only the 1st one
    
    res.json(testcases)
})



//3. Update route - updatetestcases 
router.post('/updatetestcases', async function(req,res,next){   

    let reqDay = req.body.day;
    let reqQuestion = req.body.question;
    let reTestCase = req.body.testcase;
    let value = req.body.updatewithvalue

    //find question by day
    const questions = await questionsTable.findOne({
        day:reqDay
    });    

    //get that testcase object fro that day and question
    const testCaseObject = await testCaseTable.findOne({
        dayId:questions._id
    }); 

    //update that questions that testcase only
    for (const obj in testCaseObject){
        for (const key in testCaseObject[obj]){
            if(obj == reqQuestion && key==reTestCase)
            {
                testCaseObject[obj][key] = value;
            }
        }
    }
    
    // only update those test cases that are not empty string
    await testCaseTable.updateOne({
        dayId:questions._id}, 
        testCaseObject           
    );      

    //D. Succesful update 
    res.json({
        message: "Test Cases updated successfully",
        day: req.body.day,
        testCaseObject:testCaseObject     
    })    
})

/////////////// get Student details
//1.. Get getStudentmarks - get getStudentmarks
//Query Parameter: ?userId=userId
router.get('/getStudentmarksAdmin',async function(req, res){  
    const userfilter = req.query.userId || "";   
    
    let marksGot;  
    if(userfilter){
        marksGot = await studentsDetailsTable.findOne({userId: userfilter});
        return res.json(marksGot);
    }

    marksGot = await studentsDetailsTable.find({}); //findone gives only the 1st one
    
    res.json(marksGot)
})

module.exports = router;