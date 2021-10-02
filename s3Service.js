/**
 * This script reads data from AWS s3 and returns file content for given file path
 * 
 * @author Mani
 * @fileName s3Service.js
 * @module s3-reader
 * @see aws-sdk
 * 
 */

const config = require('./config')
const AWS = require("aws-sdk");
const csvjson = require('csvjson');


/**
 * This function reads S3 file and return content as JSON array.
 * @param {*} location 
 * @returns 
 */
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


/**
 * Main method for s3 file reader
 * @param {*} req 
 * @returns 
 */
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

module.exports = s3Reader;