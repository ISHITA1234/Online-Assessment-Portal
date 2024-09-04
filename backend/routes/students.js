const express = require('express');
const mongoose = require("mongoose");
const {createUser, loginUser, updateUser, studentsPost,updateStudentsMarks, createStudentsMarks} = require('../types');
const {uesrTable, studentsTable, studentsDetailsTable} = require('../db');
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const  { authMiddleware } = require("../middleware");
const axios = require('axios');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);



const multer = require('multer');
// const { exec } = require('child_process');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

//create account express router
const router = express.Router();

const app = express();
const upload = multer({ dest: 'uploads/' });
// const PORT = 5000;

app.use(cors());

//1.. Get route - get balance
// Query Parameter: Nothing
router.get('/getmarks',upload.single('file'),authMiddleware,async function(req, res){    
    

    // const token = jwt.sign({req.userId}, JWT_SECRET);
    const allStudentsMarks = await studentsTable.find({});
    return res.json(allStudentsMarks);

    

    //only admins should get all students marks
    // if(req.userId=="6676a97376f145fabc0289d9"){
    //     const allStudentsMarks = await studentsTable.find({});
    //     return res.json(allStudentsMarks);
    // }

    //that perticular student should get their own marks
    // const studentMarks = await studentsTable.findOne({
    //     userId:req.userId
    // })
    
    // res.json({
    //     M1: studentMarks.marks_day1,
    //     T1: studentMarks.test_pass_day1,
    //     M2: studentMarks.marks_day2,
    //     T2: studentMarks.test_pass_day2,
    //     M3: studentMarks.marks_day3,
    //     T3: studentMarks.test_pass_day3
    // })
})

//////////////////////////////COMPILATION
//uploadGod must be created from before hand
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // cb(null, path.join(__dirname, 'uploads11'));
        cb(null, path.join("C:/Users/ishit/OneDrive/Desktop/UpSkill/JAVASCRIPTS/Online-Assignment-Portal/backend", '/uploadGod'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// const upload1 = multer({ dest: 'uploads1/' });
const upload1 = multer({ storage: storage });
router.post('/upload',upload1.single('file'),authMiddleware,async function(req, res){ 
    /*
    if simple text program:#########
        file: path to .c file (simple code)
        testInput:""
    if calculation program: 
        file: path to .c file (calculation code)
        testInput:"2 5"
        */
    let testInput = req.body.testInput;
    console.log("testInput:",testInput)

    //Saving the testInput into a file "testcasefile.txt"
    const filePath = './testcase.txt'; // Replace with your desired file name
    const filename = 'testcase.txt';
    const stringToAppend = 'This is the string to append.\n';

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
          // If the file does not exist, create it and write the initial string
          fs.writeFile(filePath, testInput, (err) => {
            if (err) {
              console.error('Error creating the file:', err);
            } else {
              console.log('File created and string appended.');
            }
          });
        } else {
          // If the file exists, append the string to it
          fs.writeFile(filePath, testInput, (err) => {
            if (err) {
              console.error('Error appending to the file:', err);
            } else {
              console.log('String appended to existing file.');
            }
          });
        }
      });

    try {
        const filePath = path.resolve(__dirname, req.file.path);
        console.log('File saved to:', filePath);
        console.log("filePath:",filePath)
        console.log("req.file.path:",req.file.path)
        console.log("__dirname:",__dirname)

        // Read the file content (optional)
        const fileContent = fs.readFile(filePath, ()=>{ 'utf8' });
        console.log('File content:', fileContent);

        // Compile the uploaded C file
        try {
            await execPromise(`gcc ${filePath} -o test.out`);
            console.log('Compilation successful');
        } catch (compilationError) {
            console.error('Compilation error:', compilationError.stderr || compilationError);
            return res.status(500).send({ error: 'Compilation error', details: compilationError.stderr || compilationError });
        }
       
        // Run the compiled program
        let output;        
        try {
            // if(testInput==""){
            //     const { stdout } = await execPromise('test.out');
            //     output = stdout;
            //     console.log(`stdout: ${output}`);
            // }else {
            //     const { stdout } = await execPromise('test.out '+testInput);
            //     console.log('test.out:','test.out '+testInput)
            //     output = stdout;
            //     console.log(`stdout: ${output}`);
            // }   
                        
            const { stdout } = await execPromise('test.out <' + filename);
            output = stdout;
            console.log(`stdout: ${output}`);

            
        } catch (executionError) {
            console.error('Execution error:', executionError.stderr || executionError);
            return res.status(500).send({ error: 'Execution error', details: executionError.stderr || executionError });
        }

        res.send({
            message: 'File uploaded, compiled, and executed successfully',
            filePath,
            fileContent,
            output,
            userId:req.userId
        });
    } catch (error) {
        console.error('Error handling file upload:', error);
        res.status(500).send({ error: 'Error handling file upload' });
    }
})

// Endpoint to download a file
router.get('/download/:filename', authMiddleware, (req, res) => {
    const filePath = path.join("C:/Users/ishit/OneDrive/Desktop/UpSkill/JAVASCRIPTS/Online-Assignment-Portal/backend", 'uploadGod', req.params.filename);
    // const filePath = res.params.filename;
    // Check if file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error('File does not exist:', filePath);
            return res.status(404).send({ error: 'File not found' });
        }

        res.download(filePath, req.params.filename, (err) => {
            if (err) {
                console.error('Error downloading file:', err);
                return res.status(500).send({ error: 'Error downloading file' });
            }
            else{
                return res.send({sucess:"success"})
            }
        });
    });
});



//2. Post route - Transfer account 
router.post('/postmarks',authMiddleware, async function(req,res,next){
    // //A. create session and start transaction to ensure ACID property
    // const session = await mongoose.startSession();
    // session.startTransaction();

    const marksPayload = req.body;
    const parsedMarksPayload = studentsPost.safeParse(marksPayload);//zod validation

    //B. Not successful zod
    if(!parsedMarksPayload.success){
        res.status(411).json({
            message: "Invalid Input"
        })
        return; //if 411 return back
    }    

    
    //C. 4. Update
    await studentsTable.updateOne({
        userId: req.userId}, 
        {$inc: { marks_day1: marksPayload.marks1,
            test_pass_day1:marksPayload.testpassed1,
            marks_day2: marksPayload.marks2,
            test_pass_day2:marksPayload.testpassed2,
            marks_day3: marksPayload.marks3,
            test_pass_day3:marksPayload.testpassed3  }
        }      
        );    

    //D. Succesful transfer
    res.json({
        message: "Marks uploaded successfully",
        userId: req.userId     
    })    

})


//create students Details table entry for that question and day
router.post('/createSingleEntryInStudentsDetails', authMiddleware,async function(req,res){

    const createPayload = req.body;
    const parsedPayload = createStudentsMarks.safeParse(createPayload);//zod validation

    //A. Not successful
    if(!parsedPayload.success){
        res.status(411).json({
            message: "Incorrect inputs"
        })
        return; //if 411 return back
    }

    //B. if entry already exists 
    const existingEntry = await studentsDetailsTable.findOne({
        userId:req.userId,
        day: req.body.day,
        question: req.body.question
    })
    if (existingEntry) {
        return res.status(411).json({
            message: "Entry for this day+question already taken, please update now"
        })
    }

    //C. if success - put into MongoDB studentsDetailsTable table
    await studentsDetailsTable.create({
            userId:req.userId,
            uploadDateTime: createPayload.uploadDateTime,
            group: createPayload.group,
            rollNumber: createPayload.rollNumber,
            day: createPayload.day,
            question: createPayload.question,
            fileUploadPath: createPayload.fileUploadPath,
            marks: createPayload.marks,
            numberOfTestCasesPassed: createPayload.numberOfTestCasesPassed      
    })
    
    //D. Succesful transfer
    res.json({
        message: "Marks Created successfully",
        userId: req.userId     
    })    
})
    
/////////////// get Student details, by only the specific students
//1.. Get getStudentmarks - get getStudentmarks
//
router.get('/getStudentmarks',authMiddleware,async function(req, res){  
    marksGot = await studentsDetailsTable.find({userId: req.userId});
    res.json({marksGot,
        userId_req:req.userId
    })
})

//2. Post route - update studentsDetailsTable
router.post('/updateMarks',authMiddleware, async function(req,res,next){
    // //A. create session and start transaction to ensure ACID property
    // const session = await mongoose.startSession();
    // session.startTransaction();

    const marksPayload = req.body;
    const parsedMarksPayload = updateStudentsMarks.safeParse(marksPayload);//zod validation

    //B. Not successful zod
    if(!parsedMarksPayload.success){
        res.status(411).json({
            message: "Invalid Input"
        })
        return; //if 411 return back
    }    

    
    //C. 4. Update
    const response = await studentsDetailsTable.updateOne({
        day:marksPayload.day, question: marksPayload.question, userId:req.userId}, 
        
        {fileUploadPath:marksPayload.fileUploadPath,
        uploadDateTime: marksPayload.uploadDateTime,
        group: marksPayload.group,             
        rollNumber: marksPayload.rollNumber,
        day:marksPayload.day,
        question: marksPayload.question,            
        marks: marksPayload.marks,
        numberOfTestCasesPassed:marksPayload.numberOfTestCasesPassed  }
          
        );    
    
    //D. Succesful transfer
    res.json({
        message: "Marks uploaded successfully",
        userId: req.userId
    })    

})



module.exports = router;