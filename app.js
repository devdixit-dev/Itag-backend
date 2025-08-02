import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import cors from 'cors';
import Client from './models/client.model.js';
import { sendMail } from './services/mailer.service.js';
import { EmailTemp } from './templates/email.temp.js';

await mongoose.connect(process.env.MONGO_URI, { dbName: process.env.DB_NAME })
  .then(() => { console.log(`DB CONNECTED`) })
  .catch((e) => { console.log(`DB ERROR - ${e}`) });

const app = express();
const port = process.env.PORT || 4000

app.use(cors({
  origin: "*",
  credentials: true
}));


app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} - ${req.url}`);
  next();
});

app.post('/client-info', async (req, res) => {
  try {
    const newClient = await Client.create({
      personalDetails: req.body.personalDetails,
      liabilities: req.body.liabilities,
      investments: req.body.investments,
      insurances: req.body.insurances,
      clientDetails: req.body.clientDetails,
      summary: req.body.summary
    });
    console.log(newClient);
    // await sendMail({
    //   to: "userlocalhost80@gmail.com",
    //   subject: `New Client Info - ${req.body.personalDetails.fullName}`,
    //   html: await EmailTemp(
    //     newClient.personalDetails,
    //     newClient.liabilities[0],
    //     newClient.investments[0],
    //     newClient.insurances,
    //   )
    // });

    return res.status(201).json({
      success: true,
      message: 'New client added',
      data: newClient
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      message: 'Internal server error'
    });
  }
});

app.get('/admin/clients', async (req, res) => {
  const allClients = await Client.find();

  return res.status(200).json({
    clients: allClients
  });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`server is running on 0.0.0.0:${port}`);
});