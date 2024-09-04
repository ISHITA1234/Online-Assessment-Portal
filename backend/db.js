//3 routes for user authentication
const mongoose = require("mongoose");
//DB name is AssignmentApp
mongoose.connect("mongodb+srv://ishitad123:Babla%401234@mydb.qeypvet.mongodb.net/AssignmentApp");

// USERS table & Schema
const userSchema = new mongoose.Schema({
    // username: String,
    // password: String,
    // firstName: String,
    // lastName: String
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    rollNumber: {
        type: Number,
        required: true,
        trim: true,
        maxLength: 20
    },
    group: {
        type: String,
        required: true,
        trim: true,
        maxLength: 20
    } 
})

//User is the name of table created in BD, once index.js runs, table is created in mongoose DB
const userTable = mongoose.model('User',userSchema)

// Students table & Schema
const studentsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    marks_day1: {
        type: Number,
        required: true
    },
    test_pass_day1: {
        type: Number,
        required: true
    },
    marks_day2: {
        type: Number,
        required: true
    },
    test_pass_day2: {
        type: Number,
        required: true
    },
    marks_day3: {
        type: Number,
        required: true
    },
    test_pass_day3: {
        type: Number,
        required: true
    }
})

//Student is the name of table created in BD, once index.js runs,
const studentsTable = mongoose.model('Student', studentsSchema)

//
const studentsDetailsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User table
        ref: 'User',
        required: true
    },
    uploadDateTime:{
        type: Date,
        required: true
    },
    group:{
        type: String,
        required: true
    },
    rollNumber: {
        type: Number,
        required: true
    },
    day: {
        type: Number,
        required: true
    },
    question: {
        type: Number,
        required: true
    },
    fileUploadPath: {
        type: String,
        required: true
    },
    marks: {
        type: Number,
        required: true
    },
    numberOfTestCasesPassed: {
        type: Number,
        required: true
    }
})
//StudentDetails is the name of table created in BD, once index.js runs,
const studentsDetailsTable = mongoose.model('StudentDetails', studentsDetailsSchema)


//Questions table & Schema=================================================================
const questionsSchema = new mongoose.Schema({    
    day: {
        type: Number,
        required: true
    },
    question1: {
        type: String,
        required: true
    },
    question2: {
        type: String,
        required: true
    },
    question3: {
        type: String,
        required: true
    },
    question4: {
        type: String,
        required: true
    },
    question5: {
        type: String,
        required: true
    },
    question6: {
        type: String,
        required: true
    },
    question7: {
        type: String,
        required: true
    },
    question8: {
        type: String,
        required: true
    },
    question9: {
        type: String,
        required: true
    },
    question10: {
        type: String,
        required: true
    }
})

//TestCases table & Schema
const testCaseSchema = new mongoose.Schema({
    dayId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to Questions model
        ref: 'Questions',
        required: true
    },
    question1:{
        testcase1: {
            type: String,
            required: true
        },
        testcase2: {
            type: String,
            required: true
        },
        testcase3: {
            type: String,
            required: true
        },
        testcase4: {
            type: String,
            required: true
        },
        testcase5: {
            type: String,
            required: true
        },
        testcase6: {
            type: String,
            required: true
        },
        testcase7: {
            type: String,
            required: true
        },
        testcase8: {
            type: String,
            required: true
        },
        testcase9: {
            type: String,
            required: true
        },
        testcase10: {
            type: String,
            required: true
        }
    },
    question2:{
        testcase1: {
            type: String,
            required: true
        },
        testcase2: {
            type: String,
            required: true
        },
        testcase3: {
            type: String,
            required: true
        },
        testcase4: {
            type: String,
            required: true
        },
        testcase5: {
            type: String,
            required: true
        },
        testcase6: {
            type: String,
            required: true
        },
        testcase7: {
            type: String,
            required: true
        },
        testcase8: {
            type: String,
            required: true
        },
        testcase9: {
            type: String,
            required: true
        },
        testcase10: {
            type: String,
            required: true
        }
    },
    question3:{
        testcase1: {
            type: String,
            required: true
        },
        testcase2: {
            type: String,
            required: true
        },
        testcase3: {
            type: String,
            required: true
        },
        testcase4: {
            type: String,
            required: true
        },
        testcase5: {
            type: String,
            required: true
        },
        testcase6: {
            type: String,
            required: true
        },
        testcase7: {
            type: String,
            required: true
        },
        testcase8: {
            type: String,
            required: true
        },
        testcase9: {
            type: String,
            required: true
        },
        testcase10: {
            type: String,
            required: true
        }
    },
    question4:{
        testcase1: {
            type: String,
            required: true
        },
        testcase2: {
            type: String,
            required: true
        },
        testcase3: {
            type: String,
            required: true
        },
        testcase4: {
            type: String,
            required: true
        },
        testcase5: {
            type: String,
            required: true
        },
        testcase6: {
            type: String,
            required: true
        },
        testcase7: {
            type: String,
            required: true
        },
        testcase8: {
            type: String,
            required: true
        },
        testcase9: {
            type: String,
            required: true
        },
        testcase10: {
            type: String,
            required: true
        }
    },
    question5:{
        testcase1: {
            type: String,
            required: true
        },
        testcase2: {
            type: String,
            required: true
        },
        testcase3: {
            type: String,
            required: true
        },
        testcase4: {
            type: String,
            required: true
        },
        testcase5: {
            type: String,
            required: true
        },
        testcase6: {
            type: String,
            required: true
        },
        testcase7: {
            type: String,
            required: true
        },
        testcase8: {
            type: String,
            required: true
        },
        testcase9: {
            type: String,
            required: true
        },
        testcase10: {
            type: String,
            required: true
        }
    },
    question6:{
        testcase1: {
            type: String,
            required: true
        },
        testcase2: {
            type: String,
            required: true
        },
        testcase3: {
            type: String,
            required: true
        },
        testcase4: {
            type: String,
            required: true
        },
        testcase5: {
            type: String,
            required: true
        },
        testcase6: {
            type: String,
            required: true
        },
        testcase7: {
            type: String,
            required: true
        },
        testcase8: {
            type: String,
            required: true
        },
        testcase9: {
            type: String,
            required: true
        },
        testcase10: {
            type: String,
            required: true
        }
    },
    question7:{
        testcase1: {
            type: String,
            required: true
        },
        testcase2: {
            type: String,
            required: true
        },
        testcase3: {
            type: String,
            required: true
        },
        testcase4: {
            type: String,
            required: true
        },
        testcase5: {
            type: String,
            required: true
        },
        testcase6: {
            type: String,
            required: true
        },
        testcase7: {
            type: String,
            required: true
        },
        testcase8: {
            type: String,
            required: true
        },
        testcase9: {
            type: String,
            required: true
        },
        testcase10: {
            type: String,
            required: true
        }
    },
    question8:{
        testcase1: {
            type: String,
            required: true
        },
        testcase2: {
            type: String,
            required: true
        },
        testcase3: {
            type: String,
            required: true
        },
        testcase4: {
            type: String,
            required: true
        },
        testcase5: {
            type: String,
            required: true
        },
        testcase6: {
            type: String,
            required: true
        },
        testcase7: {
            type: String,
            required: true
        },
        testcase8: {
            type: String,
            required: true
        },
        testcase9: {
            type: String,
            required: true
        },
        testcase10: {
            type: String,
            required: true
        }
    },
    question9:{
        testcase1: {
            type: String,
            required: true
        },
        testcase2: {
            type: String,
            required: true
        },
        testcase3: {
            type: String,
            required: true
        },
        testcase4: {
            type: String,
            required: true
        },
        testcase5: {
            type: String,
            required: true
        },
        testcase6: {
            type: String,
            required: true
        },
        testcase7: {
            type: String,
            required: true
        },
        testcase8: {
            type: String,
            required: true
        },
        testcase9: {
            type: String,
            required: true
        },
        testcase10: {
            type: String,
            required: true
        }
    },
    question10:{
        testcase1: {
            type: String,
            required: true
        },
        testcase2: {
            type: String,
            required: true
        },
        testcase3: {
            type: String,
            required: true
        },
        testcase4: {
            type: String,
            required: true
        },
        testcase5: {
            type: String,
            required: true
        },
        testcase6: {
            type: String,
            required: true
        },
        testcase7: {
            type: String,
            required: true
        },
        testcase8: {
            type: String,
            required: true
        },
        testcase9: {
            type: String,
            required: true
        },
        testcase10: {
            type: String,
            required: true
        }
    }
}
)

//Questions is the name of table created in BD, once index.js runs,
const questionsTable = mongoose.model('Questions', questionsSchema)

//TestCases is the name of table created in BD, once index.js runs,
const testCaseTable = mongoose.model('TestCases', testCaseSchema)

const enableSchema = new mongoose.Schema({
    group: {
        type: String,
        required: true
    },
    Day1:{
        type: String,
        required: true
    },
    Day2:{
        type: String,
        required: true
    },
    Day3: {
        type: String,
        required: true
    },
    Day4: {
        type: String,
        required: true
    },
    Day5: {
        type: String,
        required: true
    },
    Day6: {
        type: String,
        required: true
    },
    Day7: {
        type: String,
        required: true
    },
    Day8: {
        type: String,
        required: true
    }
})

//enableDisableAssignmentDay is the existing table, we do not need to insert, as it is already inserted, we just need to fetch the data. So we just need to define the schema, craete a model(enableDisableAssignDay) for existing table. 
const enableDisableAssignmentDay = mongoose.model('enableDisableAssignDay', enableSchema, 'enableDisableAssignmentDay')


module.exports = {userTable,studentsTable,questionsTable,testCaseTable,studentsDetailsTable,enableDisableAssignmentDay}