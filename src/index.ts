import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRouter from './router/user';
import resumeRouter from './router/resume';
import socialLinkRouter from './router/socialLink';
import mediaRouter from './router/media';
import devSkillRouter from './router/devSkill';
import developperRouter from './router/developper';
import projectRouter from './router/project';
import projectLinkRouter from './router/projectLink';
import projectDevelopperRouter from './router/projectDevelopper';
import bodyParser from 'body-parser';
import passport from 'passport';
import passportConfig from './middleware/passport';
import cors from 'cors';
import cloudinary from 'cloudinary';

const cloudinaryV2 = cloudinary.v2;

const app = express();
dotenv.config();

const DB_KEY = process.env.MONGODB_KEY != null ? process.env.MONGODB_KEY : '';
const SECRET_KEY = process.env.JWT_SECRET != null ? process.env.JWT_SECRET : '';
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY != null ? process.env.CLOUDINARY_API_KEY : '';
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET != null ? process.env.CLOUDINARY_API_SECRET : '';
const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME != null ? process.env.CLOUDINARY_NAME : '';

cloudinaryV2.config({
    cloud_name: CLOUDINARY_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
});

app.use(cors());

mongoose
    .connect(DB_KEY)
    .then(() => {
        // tslint:disable-next-line:no-console
        console.log('mongodb connected');
    })
    .catch(err => {
        // tslint:disable-next-line:no-console
        console.log(err);
    });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

passportConfig(passport, SECRET_KEY);
app.use(passport.initialize());

app.use('/users', userRouter);

app.use('/user/resumes', resumeRouter);

app.use('/user/socialLinks', socialLinkRouter);

app.use('/medias', mediaRouter);

app.use('/user/devSkills', devSkillRouter);

app.use('/developpers', developperRouter);

app.use('/projects', projectRouter);

app.use('/project/links', projectLinkRouter);

app.use('/project/developpers', projectDevelopperRouter);

app.get('/', (req, res) => {
    res.send({
        message: 'REST API',
        status: 400
    })
} );

app.listen(process.env.PORT, () => {
    // tslint:disable-next-line:no-console
    console.log(`server open on http://localhost:${process.env.PORT}`)
} );