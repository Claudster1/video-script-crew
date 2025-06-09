const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { supabase } = require('./supabase-config.js');

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS with specific origin in production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-domain.com'] // Replace with your actual domain
    : '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'public')));
}

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.join(__dirname, 'uploads');
        // Create uploads directory if it doesn't exist
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        // Generate unique filename
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 50 * 1024 * 1024 // 50MB limit
    },
    fileFilter: function (req, file, cb) {
        // Accept only specific file types
        const allowedTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'text/plain',
            'application/vnd.ms-powerpoint',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            'image/jpeg',
            'image/png',
            'application/vnd.google-apps.document',
            'application/vnd.google-apps.spreadsheet',
            'application/vnd.google-apps.presentation'
        ];
        
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type'));
        }
    }
});

// Handle file upload
app.post('/upload', upload.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        res.json({
            success: true,
            file: {
                name: req.file.originalname,
                size: req.file.size,
                path: req.file.path,
                type: req.file.mimetype
            }
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: 'Upload failed' });
    }
});

// Handle chunked upload
app.post('/upload/chunk', upload.single('chunk'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No chunk uploaded' });
        }

        const { chunkNumber, totalChunks, fileName } = req.body;
        const chunkDir = path.join(__dirname, 'uploads', 'chunks', fileName);

        // Create chunks directory if it doesn't exist
        if (!fs.existsSync(chunkDir)) {
            fs.mkdirSync(chunkDir, { recursive: true });
        }

        // Move chunk to its directory
        const chunkPath = path.join(chunkDir, `chunk-${chunkNumber}`);
        fs.renameSync(req.file.path, chunkPath);

        // If this is the last chunk, combine all chunks
        if (parseInt(chunkNumber) === parseInt(totalChunks)) {
            const finalPath = path.join(__dirname, 'uploads', fileName);
            const writeStream = fs.createWriteStream(finalPath);

            // Combine all chunks
            for (let i = 1; i <= totalChunks; i++) {
                const chunkPath = path.join(chunkDir, `chunk-${i}`);
                const chunkBuffer = fs.readFileSync(chunkPath);
                writeStream.write(chunkBuffer);
                fs.unlinkSync(chunkPath); // Delete chunk after combining
            }

            writeStream.end();
            fs.rmdirSync(chunkDir); // Remove chunks directory

            res.json({
                success: true,
                file: {
                    name: fileName,
                    path: finalPath
                }
            });
        } else {
            res.json({ success: true, chunk: chunkNumber });
        }
    } catch (error) {
        console.error('Chunk upload error:', error);
        res.status(500).json({ error: 'Chunk upload failed' });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        error: process.env.NODE_ENV === 'production' 
            ? 'Internal server error' 
            : err.message 
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode at http://localhost:${port}`);
}); 