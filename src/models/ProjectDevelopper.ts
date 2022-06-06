import mongoose, { model, Model, Document } from "mongoose";
import { developper } from "./Developper";
import { project } from "./Project";
const Schema = mongoose.Schema;

const ProjectDevelopperSchema = new Schema({
    devId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'developpers'
    },
    projectId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'projects'
    }
});

export interface projectDevelopper {
    devId: string|developper
    projectId: string|project
};

const ProjectDevelopper: Model<projectDevelopper> = model('projectDeveloppers', ProjectDevelopperSchema);

export default ProjectDevelopper;