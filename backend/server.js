import {app} from './src/app.js'
import connectDB from './src/db/db.js';
import dotenv from 'dotenv';

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server is running on port ${PORT}`);
});
