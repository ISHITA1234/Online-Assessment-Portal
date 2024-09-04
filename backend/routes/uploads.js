// const express = require('express');
// const multer = require('multer');
// const { exec } = require('child_process');
// const cors = require('cors');
// const fs = require('fs');
// const path = require('path');

// const app = express();
// const upload = multer({ dest: 'uploads/' });
// const PORT = 5000;

// app.use(cors());

// app.post('/api/v1/student/upload', upload.single('file'), (req, res) => {
//     const filePath = path.join(__dirname, req.file.path);

//     // Compile the uploaded C file
//     const outputFilePath = filePath.replace('.c', '');
//     exec(`gcc ${filePath} -o ${outputFilePath} && ${outputFilePath}`, (error, stdout, stderr) => {
//         // Clean up the uploaded file
//         fs.unlinkSync(filePath);

//         if (error) {
//             return res.status(500).send({ error: stderr });
//         }

//         res.send({ output: stdout });
//         // Clean up the compiled output file
//         fs.unlinkSync(outputFilePath);
//     });
// });

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
