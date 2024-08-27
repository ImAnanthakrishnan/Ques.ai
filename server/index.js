import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import DatabaseConnection from './helpers/dbConnection.js';
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';

const app = express();

dotenv.config();//configuration of environment variables;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//database connection
const DB_CONNECT = new DatabaseConnection(process.env.MONGO_URL);
DB_CONNECT.connect();

//cors configuration -> preflight options
const corsOption = {
    origin:process.env.CLIENT_URL,
    methods:['GET','POST','PUT','PATCH','DELETE']
}

app.use(cors(corsOption));

//parsers
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname,'../frontend/src/assets/images'))); //access static files via url

//routes
import projectRouter from './routes/features/project.js';
import episodeRouter from './routes/features/episode.js';
import userRouter from './routes/auth/auth.js';

//setting
const base = process.env.BASE_URL
app.use(`${base}/project`,projectRouter);
app.use(`${base}/episode`,episodeRouter);
app.use(`${base}/auth`,userRouter);

//error handler
app.use(notFound);
app.use(errorHandler);

//Application listens
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server listening on port no:${PORT}`));