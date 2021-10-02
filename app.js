const express = require('express');
const router = express.Router();

const s3Service = require('./s3Service')
 
const app = express("s3-reader-api")

// parse json request body
app.use(express.json());
// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

app.use("/", router)
 
router.get('/', (req, res) => res.json({ message: 'S3 Reader API - Demo' }))

router.post('/s3Reader', async (req, res, next) => {
    const response = await s3Service(req)
    res.status(response.statusCode)
    res.json(response.data)
})

module.exports = app