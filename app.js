import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import cors from 'cors';
import Client from './models/client.model.js';
// import { sendMail } from './services/mailer.service.js';
// import { EmailTemp } from './templates/email.temp.js';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import Email from './models/email.model.js';
import Job from './models/job.model.js';
import JobApp from './models/jobApp.model.js';
import upload from './services/multer.service.js';
import transporter from './services/mailer.service.js';
import fs from "fs";
import Report from './models/report.model.js';
import Guide from './models/guide.model.js';

// mongodb connection
await mongoose.connect(process.env.MONGO_URI, { dbName: process.env.DB_NAME })
  .then(() => { console.log(`DB CONNECTED`) })
  .catch((e) => { console.log(`DB ERROR - ${e}`) });

// app and port
const app = express();
const port = process.env.PORT || 4000

// cors option
app.use(cors({
  origin: `${process.env.FRONTEND_DEV_URL}`,
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// middlewares
app.use("/files", express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use((req, _, next) => {
  console.log(`${req.method} - ${req.url}`);
  next();
});

// auth middleware
const AuthMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(400).json({
      message: 'No token provided'
    });
  }

  const decodeJwt = jwt.verify(token, process.env.JWT_SEC);
  const checkRole = decodeJwt.role === 'admin' || 'developer'

  if (!checkRole) {
    return res.json({
      message: `${checkRole} is not authoried`
    })
  }
  req.user = decodeJwt;
  next();
}

// default home route
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
    const addEmail = await Email.create({
      email: req.body.personalDetails.email,
      source: 'financial_form'
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

// user add email - newsletter
app.post('/newsletter', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        messsage: 'Email is required'
      });
    }

    const checkEmail = await Email.findOne({ email });

    if (checkEmail) {
      return res.status(400).json({
        message: 'Email already exist'
      });
    }

    const addEmail = await Email.create({
      email: email,
      source: 'newsletter'
    });

    return res.status(200).json({
      message: 'Email subscription added'
    })
  }
  catch (err) {
    console.log(err);
    return res.status(500).json({
      message: `Email subscription error - ${err}`
    });
  }
});

// admin - get clients
app.get('/admin/clients', AuthMiddleware, async (req, res) => {
  const allClients = await Client.find();

  return res.status(200).json({
    clients: allClients
  });
});

// admin all emails
app.post('/admin/emails', AuthMiddleware, async (req, res) => {
  const emails = await Email.find().select('email source -_id');

  return res.status(200).json({
    length: emails.length,
    emails: emails
  });
});

// admin login
app.post('/admin', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: 'All fields are required for login'
    });
  }

  const isAdmin = username === process.env.ADMIN_USER && password === process.env.ADMIN_PASS
  const isDev = username === process.env.DEV_USER && password === process.env.DEV_PASS

  if (!isAdmin && !isDev) {
    return res.status(400).json({
      message: 'Incorrect email or password'
    });
  }

  const payload = {
    username,
    role: isAdmin ? 'admin' : 'developer'
  }

  const encodeJwt = jwt.sign(payload, process.env.JWT_SEC, { expiresIn: '1h' });

  res.cookie('token', encodeJwt, {
    maxAge: 60 * 60 * 1000,
    secure: true,
    httpOnly: true,
    sameSite: 'none'
  });

  return res.json({
    message: `${username} logged in 🎈`,
    role: payload.role
  });
});

// admin verify
app.get('/admin/verify', AuthMiddleware, async (req, res) => {
  res.status(200).json({ loggedIn: true });
});

// Post a job
app.post('/admin/post-job', AuthMiddleware, async (req, res) => {
  try {
    const user = req.user;
    console.log(user);

    const { title, department, location, experience, requirements, responsibilities } = req.body;

    const jobrRequirements = await requirements.split("\n")
      .map(line => line.trim())
      .filter(line => line.length);

    const jobResponsibilities = await responsibilities.split("\n")
      .map(line => line.trim())
      .filter(line => line.length);

    const newJob = await Job.create({
      title,
      department,
      location,
      experience,
      requirements: jobrRequirements,
      responsibilities: jobResponsibilities,
      postedBy: user.username
    });

    console.log("Job post backend data:", newJob);

    return res.status(201).json({
      message: 'New job posted',
      job: newJob
    });

  }
  catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Internal server error'
    });
  }
});

// user apply for a job
app.post('/apply-job', upload.single('resume'), async (req, res) => {
  try {
    const { appliedForRole, fullname, email, phone, intro } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Resume file is required" });
    }

    const appliedJob = await JobApp.create({
      appliedForRole,
      fullname,
      email,
      phone,
      intro
    });

    await transporter.sendMail({
      from: process.env.ADMIN_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: "New job application",
      text: `${fullname} - ${appliedForRole} - ${email} - ${phone}`,
      attachments: [{
        filename: req.file.filename,
        path: req.file.path
      }]
    });

    // Delete file after sending
    fs.unlinkSync(req.file.path);
    console.log("Resume sent successfully");

    return res.status(200).json({
      success: true,
      message: "Job application sent",
      data: appliedJob
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
});

// admin - add reports
app.post('/admin/add-report', AuthMiddleware, upload.single('report'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded"
      });
    }

    console.log(req.file);

    const { name, type } = req.body;

    const data = await Report.create({
      name,
      type,
      fileName: req.file.originalname,
      fileLink: `http://localhost:3000/files/${req.file.originalname}`
    });

    return res.json({
      success: true,
      message: 'Market report uploaded successfully',
      data
    });
  }
  catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    })
  }
});

// admin - see reports
app.get('/admin/reports', AuthMiddleware, async (req, res) => {
  const reports = await Report.find().select("-_id");

  return res.status(200).json({
    message: `Total reports ${reports.length}`,
    reports: reports
  });
});

// admin - add guides
app.post('/admin/add-guide', AuthMiddleware, upload.single('guide'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded"
      });
    }

    console.log(req.file);

    const { name, desc, category } = req.body;

    const data = await Guide.create({
      name,
      desc,
      category,
      fileLink: `http://localhost:3000/files/${req.file.originalname}`
    });

    return res.json({
      success: true,
      message: 'Guide uploaded successfully',
      data
    });
  }
  catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    })
  }
});

// admin - see guides
app.get('/admin/guides', AuthMiddleware, async (req, res) => {
  const guides = await Guide.find().select("-_id");

  return res.status(200).json({
    message: `Total job apps ${guides.length}`,
    guides: guides
  });
});

// admin - add videos
app.post('/admin/add-video', AuthMiddleware, async (req, res) => {
  try {
    const { name, category, duration, videoLink } = req.body;

    const data = {
      name,
      category,
      duration,
      videoLink
    }

    return res.status(200).json({
      success: true,
      message: 'Video linked successfully',
      data: data
    });
  }
  catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    })
  }
});

// admin job applications
app.get('/job-apps', AuthMiddleware, async (req, res) => {
  const jobApps = await JobApp.find().select("-_id");

  return res.status(200).json({
    message: `Total job apps ${jobApps.length}`,
    jobApplications: jobApps
  });
})

// admin logout
app.post('/logout', AuthMiddleware, async (req, res) => {
  res.clearCookie('token');

  return res.status(200).json({
    message: 'User logged out successfully 🫡'
  });
});

// server listen
app.listen(port, "0.0.0.0", () => {
  console.log(`server is running on ${port}`);
});