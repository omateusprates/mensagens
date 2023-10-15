const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;


const twilio = require('twilio');

const client = twilio(accountSid, authToken);

const conversations = {};

const sendMessage = async(req,res)=>{

    try {

        let conversationsContext = conversations[req.body.From] || {};
        var messageToSend = "";

        if(Object.keys(conversationsContext).length === 0)
        {
            messageToSend = "Olá, " +req.body.ProfileName;
            conversationsContext.messageToSend = messageToSend;
            conversations[req.body.From] = conversationsContext;

            client.messages
            .create({
                from: req.body.To,
                body: messageToSend,
                to: req.body.From
            })
            .then(message => console.log("Message SID: " +message.sid));

            res.send('send via callback');
        }

        console.log(req.body.Body);          

    } catch (error) {
        return res.status(400).json({ success: false,msg:error.message });
    }

}

module.exports = {
    sendMessage
}