const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const twilio = require('twilio');

const client = twilio(accountSid, authToken);

const sendMessage = async(req,res)=>{

    try {

        client.messages.create({
            body: req.body.message,
            from: 'whatsapp:+14155238886',
            to: 'whatsapp:'+req.body.to
        })
        .then(message => console.log("Message sent successfully"));

        return res.status(200).json({ success: true,msg:'Message sent successfully' });
    } catch (error) {
        return res.status(400).json({ success: false,msg:error.message });
    }

}

module.exports = {
    sendMessage
}