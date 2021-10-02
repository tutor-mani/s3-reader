/**
 * Server File - This helps to start the express app
 * 
 * @author Mani
 * @fileName server.js
 * @module s3-reader 
 * 
 */


const config = require('./config')
const app = require('./app');
console.log('***** App Status *****')
console.log(`app url ==> http://localhost:${config.APP_PORT}`)
app.listen(config.APP_PORT, () => console.log(`app listening on port ${config.APP_PORT}!`))


module.exports = app;
