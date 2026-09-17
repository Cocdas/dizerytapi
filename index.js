const express = require('express');
const ytdl = require('@distube/ytdl-core');
const cors = require('cors');

const app = express();
app.use(cors());

// 🎵 MP3 (Audio) බාගන්න API එක
app.get('/api/ytmp3', async (req, res) => {
    const url = req.query.url;
    if (!url) return res.status(400).json({ status: false, error: "URL එකක් ලබා දෙන්න" });

    try {
        res.header('Content-Disposition', 'attachment; filename="audio.mp3"');
        res.header('Content-Type', 'audio/mpeg');
        
        // YouTube එකෙන් කෙලින්ම Stream කරලා API එක හරහා යවනවා
        ytdl(url, { filter: 'audioonly', quality: 'highestaudio' }).pipe(res);
    } catch (err) {
        res.status(500).json({ status: false, error: err.message });
    }
});

// 🎬 MP4 (Video) බාගන්න API එක
app.get('/api/ytmp4', async (req, res) => {
    const url = req.query.url;
    if (!url) return res.status(400).json({ status: false, error: "URL එකක් ලබා දෙන්න" });

    try {
        res.header('Content-Disposition', 'attachment; filename="video.mp4"');
        res.header('Content-Type', 'video/mp4');
        
        ytdl(url, { filter: format => format.container === 'mp4' && format.hasAudio && format.hasVideo, quality: 'highest' }).pipe(res);
    } catch (err) {
        res.status(500).json({ status: false, error: err.message });
    }
});

// Server එක Run කිරීම
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 DIZER API Server is running on port ${PORT}`);
});
