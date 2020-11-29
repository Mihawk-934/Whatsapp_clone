// importing
import express from 'express';
import mongoose from 'mongoose';
import Pusher from 'pusher';
import cors from 'cors';
import Messages from "./dbMessages.js";

// app config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
    appId: "1111773",
    key: "a157d59b0581ff66c741",
    secret: "96ab7743404c64354f08",
    cluster: "eu",
    useTLS: true
});

// middleware
app.use(express.json());
app.use(cors());

// DB config
const connection_url = 'mongodb+srv://admin:Bb3g8r7eiw5fJfrq@cluster0.6gvrk.mongodb.net/whatsappdb?retryWrites=true&w=majority';
mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.once('open', () => {
    console.log("DB connected");

    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch();

    changeStream.on('change', (change) => {
        // console.log("change", change)

        if (change.operationType === 'insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted', {
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received
            });
        } else {
            console.log('Error triggering Pusher')
        }
    })
})

// ?????

// api routes
app.get('/', (req, res) => res.status(200).send("Hello Word!"));

app.get('/messages/sync', (req, res) => {
    Messages.find((err, data) => {
        if (err)
            res.status(500).send(err);
        else
            res.status(200).send(data);
    })
})

app.post('/messages/new', (req, res) => {
    const dbMessage = req.body;

    Messages.create(dbMessage, (err, data) => {
        if (err)
            res.status(500).send(err);
        else
            res.status(201).send(data);
    })
})

// listen
app.listen(port, () => console.log(`listening on localhost: ${port}`));