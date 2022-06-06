import mongoose, { model, Model, Document } from 'mongoose';
const Schema = mongoose.Schema

const ResumeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    aboutYou: String,
    experiences: [
        {
            title: String,
            startDate: {
                type: Date,
                required: true
            },
            endDate: Date,
            isCurrent: {
                type: Boolean,
                required: true
            },
            typeExperience: {
                type: String,
                enum: ['Work', 'Certification', 'Education'],
                default: 'Work'
            }
        }
    ]
});

export enum TypeExperience {
    Work='Work',
    Certification='Certification',
    Education='Education'
};

export interface experience extends Document {
    title: string,
    startDate: Date,
    endDate?: Date,
    isCurrent: boolean,
    typeExperience: string
};

export interface resume extends Document {
    user: string,
    aboutYou: string,
    experiences: experience[]
};

export interface resumeError {
    user?: string,
    about?: string
};

export interface experienceError {
    titleError: string,
    startDateError: string,
    typeExperience: string,
    isCurrent: string
};

const Resume: Model<resume> = model('resumes', ResumeSchema);

export default Resume;