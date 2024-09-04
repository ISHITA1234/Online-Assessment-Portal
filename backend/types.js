const zod = require('zod');
//payload only for post and put , so zod only for post and put
//signup payload for post
const createUser = zod.object({
    username: zod.string().email(),
    password: zod.string().min(4),
    firstName: zod.string(),
    lastName: zod.string(),
    rollNumber: zod.number(),
    group: zod.string()
})

//signin payload for post
const loginUser = zod.object({
    username: zod.string().email(),
    password: zod.string().min(4)    
})

//update payload for put, .optional()----user can or cannot give any of the inputs in the payload
const updateUser = zod.object({
    password: zod.string().min(4).optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()    
})

//student marks payload for post
const studentsPost = zod.object({
    marks1: zod.number(),
    testpassed1: zod.number(),
    marks2: zod.number(),
    testpassed2: zod.number(),
    marks3: zod.number(),
    testpassed3: zod.number()
})

//student marks payload for update
const updateStudentsMarks = zod.object({
    // uploadDateTime: zod.string().datetime(),
    uploadDateTime: zod.string(),
    group: zod.string(),
    rollNumber: zod.number(),
    day: zod.number(),
    question: zod.number(),
    fileUploadPath: zod.string(),
    marks: zod.number(),
    numberOfTestCasesPassed: zod.number()
})

//student marks payload for create one entry
const createStudentsMarks = zod.object({
    // uploadDateTime: zod.string().datetime(),
    uploadDateTime: zod.string(),
    group: zod.string(),
    rollNumber: zod.number(),
    day: zod.number(),
    question: zod.number(),
    fileUploadPath: zod.string(),
    marks: zod.number(),
    numberOfTestCasesPassed: zod.number()
})

//questions payload for post
const questionsPost = zod.object({
    day:zod.number(),
    question1: zod.string(),
    question2: zod.string(),
    question3: zod.string(),
    question4: zod.string(),
    question5: zod.string(),
    question6: zod.string(),
    question7: zod.string(),
    question8: zod.string(),
    question9: zod.string(),
    question10: zod.string()
    
})

//Update questions payload for post
const questionsUpdate = zod.object({
    day:zod.number(),
    question1: zod.string(),
    question2: zod.string(),
    question3: zod.string(),
    question4: zod.string(),
    question5: zod.string(),
    question6: zod.string(),
    question7: zod.string(),
    question8: zod.string(),
    question9: zod.string(),
    question10: zod.string()
    
})


//Del questions payload for del
const questionDel = zod.object({
    day:zod.number(),
    questiontodel: zod.string()  
})

//test cases payload for post
const testCasesPost = zod.object({
    testcase1: zod.string(),
    testcase2: zod.string(),
    testcase3: zod.string(),
    testcase4: zod.string(),
    testcase5: zod.string(),
    testcase6: zod.string(),
    testcase7: zod.string(),
    testcase8: zod.string(),
    testcase9: zod.string(),
    testcase10: zod.string()
})

//Update test cases payload for post
const testcasesUpdate = zod.object({
    day:zod.number(),
    testcase1: zod.string(),
    testcase2: zod.string(),
    testcase3: zod.string(),
    testcase4: zod.string(),
    testcase5: zod.string(),
    testcase6: zod.string(),
    testcase7: zod.string(),
    testcase8: zod.string(),
    testcase9: zod.string(),
    testcase10: zod.string()
    
})

module.exports = {
    createUser:createUser,
    loginUser:loginUser,
    updateUser:updateUser,
    studentsPost:studentsPost,
    updateStudentsMarks:updateStudentsMarks,
    questionsPost:questionsPost,
    questionsUpdate:questionsUpdate,
    testcasesUpdate:testcasesUpdate,
    questionDel:questionDel,
    testCasesPost:testCasesPost,
    createStudentsMarks:createStudentsMarks
}