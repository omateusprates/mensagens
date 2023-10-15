const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;


const twilio = require('twilio');

const client = twilio(accountSid, authToken);

const conversations = {};

const sendMessage = async(req,res)=>{

    try {

        const myNumber = req.body.To;
        const senderNumber = req.body.From;
        const messageBody = req.body.Body;

        let conversationsContext = conversations[senderNumber] || {};
        let messageToSend = "";

        if(Object.keys(conversationsContext).length === 0)
        {
            messageToSend = "Primeira mensagem";
            conversationsContext.messageToSend = messageToSend;
            conversations[senderNumber] = conversationsContext;

            client.messages
            .create({
                from: myNumber,
                body: messageToSend,
                to: senderNumber
            })
            .then(message => console.log("Message SID: " +message.sid));

            res.send('send via callback');
        }

        console.log(messageBody);          

    } catch (error) {
        return res.status(400).json({ success: false,msg:error.message });
    }

}

module.exports = {
    sendMessage
}