import mongoose, { model, Model, Document } from "mongoose";
import { developper } from "./Developper";
import { project } from "./Project";
const Schema = mongoose.Schema;

const ProjectDevelopperSchema = new Schema({
    developper: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'developpers'
    },
    project: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'projects'
    }
});

export interface projectDevelopper extends Document {
    developper: string|developper
    project: string|project
};

export interface projectDevelopperError {
    developperError?: string
    projectError?: string
}

const ProjectDevelopper: Model<projectDevelopper> = model('projectDeveloppers', ProjectDevelopperSchema);

export default ProjectDevelopper;