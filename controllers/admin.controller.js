import Email from "../models/email.model.js";
import Job from "../models/job.model.js";
import Report from "../models/report.model.js";
import JobApp from "../models/jobApp.model.js";
import Guide from "../models/guide.model.js";
import Video from "../models/video.model.js";

export const AdminRemoveEmail = async (req, res) => {
  try {
    const id = req.params.id;

    const email = await Email.findOneAndDelete({ _id: id });

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Email deleted successfully 🗑️'
    });
  }
  catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
}

export const AdminGetAllEmails = async (req, res) => {
  const emails = await Email.find().select('email source');

  return res.status(200).json({
    length: emails.length,
    emails: emails
  });
}

export const AdminGetAllClients = async (req, res) => {
  const allClients = await Client.find();

  return res.status(200).json({
    clients: allClients
  });
}

export const AdminPostJobApp = async (req, res) => {
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
}

export const AdminGetAllJobApps = async (req, res) => {
  const jobApps = await JobApp.find().select("-_id");

  return res.status(200).json({
    message: `Total job apps ${jobApps.length}`,
    jobApplications: jobApps
  });
}

export const AdminAddReport = async (req, res) => {
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
      fileLink: `${process.env.FRONTEND_BASE_URL}/files/${req.file.originalname}`
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
}

export const AdminGetAllReports = async (req, res) => {
  const reports = await Report.find();

  return res.status(200).json({
    message: `Total reports ${reports.length}`,
    reports: reports
  });
}

export const AdminRemoveReport = async (req, res) => {
  try{
    const id = req.params.id;

    const report = await Report.findOneAndDelete({ _id: id });

    if(!report) {
      return res.status(400).json({
        success: false,
        message: 'Report not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Report deleted successfully 🗑️'
    });
  }
  catch(err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
}

export const AdminAddGuide = async (req, res) => {
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
      fileLink: `${process.env.FRONTEND_BASE_URL}/files/${req.file.originalname}`
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
}

export const AdminGetAllGuides = async (req, res) => {
  const guides = await Guide.find();

  return res.status(200).json({
    message: `Total job apps ${guides.length}`,
    guides: guides
  });
}

export const AdminRemoveGuide = async (req, res) => {
  try{
    const id = req.params.id;

    const guide = await Guide.findOneAndDelete({ _id: id });

    if(!guide) {
      return res.status(400).json({
        success: false,
        message: 'Guide not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Guide deleted successfully 🗑️'
    });
  }
  catch(err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
}

export const AdminAddVideo = async (req, res) => {
  try {
    const { name, duration, category, videoLink } = req.body;

    const data = await Video.create({
      name,
      duration,
      category,
      videoLink
    });

    return res.json({
      success: true,
      message: 'Video added successfully',
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
}

export const AdminGetAllVideos = async (req, res) => {
  const videos = await Video.find();

  return res.status(200).json({
    message: `Total videos ${videos.length}`,
    videos: videos
  });
}

export const AdminRemoveVideo = async (req, res) => {
  try{
    const id = req.params.id;

    const video = await Video.findOneAndDelete({ _id: id });

    if(!video) {
      return res.status(400).json({
        success: false,
        message: 'Video link not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Video deleted successfully 🗑️'
    });
  }
  catch(err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
}