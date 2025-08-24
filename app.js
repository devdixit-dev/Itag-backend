import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import UserRouter from './routes/user.route.js';
import AdminRouter from './routes/admin.route.js';
import ConnectDB from './config/db.js';
import AuthRouter from './routes/auth.route.js';

// connection to database
ConnectDB();

// app and port
const app = express();
const port = process.env.PORT || 4000

// cors option
app.use(cors({
  origin: `${process.env.FRONTEND_BASE_URL}`,
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// middlewares
app.use("/files", express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use('/user', UserRouter);
app.use('/auth', AuthRouter);
app.use('/admin', AdminRouter);

// app logger
app.use((req, _, next) => {
  console.log(`${req.method} - ${req.url}`);
  next();
});

// default app route
app.get('/', (req, res) => {
  res.end('I Tag Financials Backend Working');
});

// app listen
app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on ${port}`);
});