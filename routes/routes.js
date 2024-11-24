const express = require('express');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const pool = require('../db');
const router = express.Router();

// Multer configuration for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15 MB file size limit
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (['.mp3', '.mov', '.mp4'].includes(ext)) {
      return cb(null, true);
    }
    cb(new Error('Only .mp3, .mov, and .mp4 formats are allowed.'));
  },
});

// Index page
router.get('/', async (req, res) => {
  const [rows] = await pool.query('SELECT id, videoname FROM videos ORDER BY id DESC');
  res.render('index', { videos: rows });
});

// Upload page
router.get('/upload', (req, res) => {
  res.render('upload');
});

// Handle video upload
router.post('/upload', upload.single('video'), async (req, res) => {
  const { videoname } = req.body;
  if (!videoname || videoname.length > 50) {
    return res.status(400).send('Video name is required and must be under 50 characters.');
  }
  const videoId = crypto.randomBytes(12).toString('hex'); // Generate random 25-character string

  try {
    await pool.query('INSERT INTO videos (id, videoname, videofile) VALUES (?, ?, ?)', [
      videoId,
      videoname,
      req.file.buffer, // Store the video file as a blob
    ]);
    res.redirect('/');
  } catch (error) {
    console.error('Error uploading video:', error);
    res.status(500).send('Error uploading video.');
  }
});

// Watch page
router.get('/video', async (req, res) => {
  const { w: id } = req.query;
  const [rows] = await pool.query('SELECT videoname, videofile FROM videos WHERE id = ?', [id]);
  if (rows.length === 0) {
    return res.status(404).send('Video not found.');
  }
  const video = rows[0];
  res.render('watch', { video });
});

module.exports = router;
