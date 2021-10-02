const config = require('./config')
const AWS = require("aws-sdk");
const csvjson = require('csvjson');

async function s3ReadHandler(location) {

    const s3 = new AWS.S3({
        accessKeyId: config.S3_ACCESS_KEY,
        secretAccessKey: config.S3_SECRET_KEY,
        region: config.S3_REGION
    });

    let params = { Bucket: config.S3_BUCKET_NAME, Key: location }
    
    const data = await s3.getObject(params).promise();

    const csvOptions = {
        delimiter: ','
    };

    const jsonArray = csvjson.toObject(data.Body.toString('utf-8'), csvOptions);
    return jsonArray;
}


async function s3Reader(req) {
    let reqBody = {}
    try {
        reqBody = JSON.parse(req.body)
    } catch {
        reqBody = req.body
    }
    try {
        const result = await s3ReadHandler(reqBody.fileLocation);
        return { statusCode: 200, data: { status: "success", message: 'file reading success', output: result } }
    } catch (error) {
        console.log("Error: ", error);
        return { statusCode: 400, data: { status: "failure", message: 'file reading failed', error: error.message } }
    }
}


module.exports = s3Reader