import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/auth.route.js';
import { connectDB } from './db/connectDB.js';
import path from 'path';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin : process.env.CLIENT_URL, credentials: true}));
app.use('/api/auth', authRoutes);

app.get('/api/health', (req, res) => res.status(200).json({ ok: true, time: Date.now() }));
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}


app.listen(PORT, ()=>{
    connectDB();
    console.log(`Server is running on port ${PORT}`);
})