import mongoose, { model, Model, Document } from "mongoose";
import { developper } from "./Developper";
import { media } from "./Media";
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
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'developpers'
    },
    cover: {
        type: Schema.Types.ObjectId,
        ref: 'medias'
    },
    icon: {
        type: Schema.Types.ObjectId,
        ref: 'medias'
    },
    creationDate: {
        type: Date,
        default: Date.now()
    },
    updateDate: {
        type: Date,
        default: Date.now()
    }
});

export interface project extends Document{
    name: string,
    description: string,
    owner: string|developper,
    cover?: media,
    icon?: media,
    creationDate: Date,
    updateDate: Date
};

export interface projectError {
    nameError?: string,
    descriptionError?: string,
    ownerError?: string
};

const Project: Model<project> = model('projects', ProjectSchema);

export default Project;