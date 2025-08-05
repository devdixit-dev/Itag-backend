import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import cors from 'cors';
import Client from './models/client.model.js';
import { sendMail } from './services/mailer.service.js';
import { EmailTemp } from './templates/email.temp.js';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';

await mongoose.connect(process.env.MONGO_URI, { dbName: process.env.DB_NAME })
  .then(() => { console.log(`DB CONNECTED`) })
  .catch((e) => { console.log(`DB ERROR - ${e}`) });

const app = express();
const port = process.env.PORT || 4000

app.use(cors({
  origin: process.env.FRONTEND_PRO_URL || process.env.FRONTEND_DEV_URL,
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use((req, _, next) => {
  console.log(`${req.method} - ${req.url}`);
  next();
});

// middlewares
const AuthMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if(!token) {
    return res.status(400).json({
      message: 'No token provided'
    });
  }

  const decodeJwt = jwt.verify(token, process.env.JWT_SEC);
  const checkRole = decodeJwt.role === 'admin' || 'developer'

  if(!checkRole) {
    return res.json({
      message: `${checkRole} is not auth`
    })
  }

  next();
}

app.get('/', (req, res) => {
  res.end('working');
})

// add info by clients
app.post('/client-info', async (req, res) => {
  try {
    const newClient = await Client.create({
      personalDetails: req.body.personalDetails,
      liabilities: req.body.liabilities,
      investments: req.body.investments,
      insurances: req.body.insurances,
      summary: req.body.summary
    });
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

    return res.status(201).json({ message: "Client created successfully" });
  } catch (e) {
    console.error("Server error:", e);
    return res.status(500).json({
      message: 'Internal server error'
    });
  }
});

// admin - get clients
app.post('/admin/clients', AuthMiddleware, async (req, res) => {
  const allClients = await Client.find();

  return res.status(200).json({
    clients: allClients
  });
});

app.post('/admin/email', AuthMiddleware, async (req, res) => {
  
});

// admin login
app.post('/admin', async (req, res) => {
  const { username, password } = req.body;

  if(!username || !password) {
    return res.status(400).json({
      message: 'All fields are required for login'
    });
  }

  const isAdmin = username === process.env.ADMIN_USER && password === process.env.ADMIN_PASS
  const isDev = username === process.env.DEV_USER && password === process.env.DEV_PASS

  if(!isAdmin && !isDev) {
    return res.status(400).json({
      message: 'Incorrect email or password'
    });
  }

  const payload = {
    username,
    role: isAdmin ? 'admin' : 'developer'
  }

  const encodeJwt = jwt.sign(payload, process.env.JWT_SEC, {expiresIn: '1h'});

  res.cookie('token', encodeJwt, {
    maxAge: 60 * 60 * 1000,
    secure: true,
    httpOnly: true
  });

  return res.json({
    message: `${username} logged in 🎈`,
    role: payload.role
  });
});

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});