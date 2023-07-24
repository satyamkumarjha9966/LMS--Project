import app from './app.js';
import connectionToDB from './config/dbConnection.js';
import cloddinary from 'cloudinary';


const PORT = process.env.PORT || 5000;

// Cloudinary Configuration
cloddinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

app.listen(PORT, async () => {
    await connectionToDB();
    console.log(`App is running at http://localhost:${PORT}`);
});