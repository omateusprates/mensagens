const dados = require('./variaveis');
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
const port = 3000;

const client = require('twilio')(dados.accountSid, dados.authToken);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/reply', (req, res) => {
    res.send('Hello World from reply');
});


app.post('/reply', express.json(), (req,res) => {
    return new Promise((resolve, reject)=> {
    console.log(req.body.Body);
    
    var messageToSend = "";

    if(req.body.Body == 'hi')
    {
        messageToSend = "Hello There, How I can assist you"

    }
    else
    {
        messageToSend = "Hello" +req.body.Body+ "How are you! Let me know I can assist you";
    }

    client.messages
        .create({
            from: 'whatsapp:+14155238886',
            body: 'Hello there!',
            to: 'whatsapp:+5534992298475'
        })
        .then(message => console.log(message.sid));

    });

    res.send('send via callback');

});

app.post('/callback', (red,res) => {
    res.send('Hello Word!');
});

app.listen(port, () =>{
    console.log('Example app listening at http://localhost:'+ port)
})



