import mongoose, { model, Model, Document } from "mongoose";
import { project } from "./Project";
const Schema = mongoose.Schema;

const ProjectLinkSchema = new Schema({
    project: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'projects'
    },
    url: {
        type: String,
        required: true
    },
    platform: {
        type: String,
        required: true
    }
});

export interface projectLink extends Document {
    project: string|project,
    url: string,
    platform: string
};

export interface projectLinkError {
    urlError?: string,
    platformError?: string
    projectError?: string
};

const ProjectLink: Model<projectLink> = model('projectLinks', ProjectLinkSchema);

export default ProjectLink;