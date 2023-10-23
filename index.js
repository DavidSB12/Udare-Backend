const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();
const { connect, close } = require('./db/db.js');
const routes = require('./routes/routes.js');
const cors = require('cors');

// const fileparser = require('./image/fileparser.js');

// const AWS = require('aws-sdk');
// const fs = require('fs');
// const fileType = require('file-type');
// const multiparty = require('multiparty');

// app.set('json spaces', 5);

// connect to database
connect()


// AWS.config.update({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
// });

// const s3 = new AWS.S3();

// const uploadFile = (buffer, name, type) => {
//   const params = {
//     ACL: 'public-read',
//     Body: buffer,
//     Bucket: process.env.S3_BUCKET,
//     ContentType: type.mime,
//     Key: `${name}.${type.ext}`
//   };
//   return s3.upload(params).promise();
// };


// middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// routes
app.use('/', routes);
app.get("/test", (req, res) => {
    res.send("Hello World");
    res.sendStatus(200);
    });

// app.get("/", (req, res) => {
//     res.send(`
//     <h2>File Upload With <code>"Node.js"</code></h2>
//     <form action="/api/upload" enctype="multipart/form-data" method="post">
//       <div>Select a file: 
//         <input type="file" name="file" multiple="multiple" />
//       </div>
//       <input type="submit" value="Upload" />
//     </form>
//     ` )
// });

// app.post('/api/upload', (req, res) => {
//     const form = new multiparty.Form();
//     form.parse(req, async (error, fields, files) => {
//       if (error) throw new Error(error);
//       try {
//         const path = files.file[0].path;
//         const buffer = fs.readFileSync(path);
//         const type = await fileType.fileTypeFromBuffer(buffer);
//         const timestamp = Date.now().toString();
//         const fileName = `bucketFolder/${Date.now().toString()}`;
//         const data = await uploadFile(buffer, fileName, type);
//         return res.status(200).send(data);
//       } catch (error) {
//         return res.status(400).send(error);
//       }
//     });
//   });

    // app.post('/api/upload', async (req, res) => {
    //   await fileparser(req)
    //   .then(data => {
    //     res.status(200).json({
    //       message: "Success",
    //       data
    //     })
    //   })
    //   .catch(error => {
    //     res.status(400).json({
    //       message: "An error occurred.",
    //       error
    //     })
    //   })
    // });

// console.log(process.env.PORT);


// start server
app.listen(port, () => console.log(`Listening on port ${port}`));
