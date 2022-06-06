import mongoose, { model, Model, Document } from "mongoose";
const Schema = mongoose.Schema;

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true,
        default: 'Me'
    },
    developers: [
        {
            userId: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
            isRegister: {
                type: Boolean,
                required: false
            },
            name: String
        }
    ],
    links: [
        {
            url: {
                type: String,
                required: true
            },
            plateform: {
                type: String,
                required: true,
                enum: ['Android', 'IOS', 'WINDOWS', 'MACOS']
            }
        }
    ]
});

export interface developer extends Document {
    userId?: string,
    isRegister: boolean,
    name: string
};

export interface link extends Document {
    url: string,
    plateform: string
};

export interface project extends Document{
    name: string,
    description: string,
    owner: string,
    developers: developer[],
    links: link[]
};

export interface projectError {
    nameError?: string,
    descriptionError?: string,
    ownerError?: string
};

export interface developerError {
    isRegister?: string
};

export interface linkError{
    urlError?: string,
    plateform?: string
};

const Project: Model<project> = model('projects', ProjectSchema);

export default Project;