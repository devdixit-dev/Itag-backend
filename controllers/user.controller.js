import express from 'express';
import Client from '../models/client.model.js';
import Email from '../models/email.model.js';
import transporter from '../services/mailer.service.js';
import fs from 'fs';

export const PostClientInfo = async (req, res) => {
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

    return res.status(201).json({ message: "Client created successfully" });
  } catch (e) {
    console.error("Server error:", e);
    return res.status(500).json({
      message: 'Internal server error'
    });
  }
}

export const PostNewsletter = async (req, res) => {
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
        message: 'your email already exist'
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
}

export const PostApplyForJob = async (req, res) => {
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
}