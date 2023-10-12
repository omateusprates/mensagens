const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;


const twilio = require('twilio');

const client = twilio(accountSid, authToken);


const sendMessage = async(req,res)=>{

    try {

        console.log(req.body.Body);

        var messageToSend = " ";

        if(req.body.Body == "Tá ocupado?")
        {
            messageToSend = "Tô nada, fala aí"    
        }

        client.messages
            .create({
                from: 'whatsapp:+14155238886',
                body: messageToSend,
                to: req.body.From
            })
            .then(message => console.log("Message SID: " +message.sid));

            res.send('send via callback');


    } catch (error) {
        return res.status(400).json({ success: false,msg:error.message });
    }

}

module.exports = {
    sendMessage
}