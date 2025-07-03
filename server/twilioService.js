const twilio = require('twilio');

//load creds from env file
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_ACCOUNT_AUTH_TOKEN;

if(!accountSid || !authToken) {
    console.error('Twilio credentials are not set in .env!');
}
const client = twilio(accountSid, authToken);

module.exports = client;