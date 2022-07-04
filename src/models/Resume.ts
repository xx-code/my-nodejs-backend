import mongoose, { model, Model, Document } from 'mongoose';
import { currentUser } from './User';
const Schema = mongoose.Schema

const ResumeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    title: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: Date,
    isCurrent: {
        type: Boolean,
        required: true
    },
    type: {
        type: String,
        enum: ['Work', 'Certification', 'Education'],
        default: 'Work'
    },
    detail: {
        type: String,
        required: true
    }
});

export enum TypeExperience {
    Work='Work',
    Certification='Certification',
    Education='Education'
};

export interface resume extends Document {
    user: string|currentUser,
    title: string,
    detail: string,
    startDate: Date,
    endDate?: Date,
    isCurrent: boolean,
    type: string
};

export interface resumeError {
    userError?: string,
    titleError?: string,
    detailError?: string,
    startDateError?: string,
    endDateError?: string,
    typeError?: string
};


const Resume: Model<resume> = model('resumes', ResumeSchema);

export default Resume;