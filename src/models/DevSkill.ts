import mongoose, { model, Model, Document } from "mongoose";
import { currentUser } from "./User";
const Schema = mongoose.Schema;

const DevSkillSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        required: true
    },
    isCurrentlyUseful: {
        type: Boolean,
        required: true
    }
});

export interface devSkill extends Document {
    user?: string|currentUser,
    title: string,
    description: string,
    icon: string,
    level: number,
    isCurrentlyUseful: boolean
}

export interface devSkillError {
    userError?: string,
    titleError?: string,
    descriptionError?: string,
    iconError?: string,
    levelError?: number,
    isCurrentlyUsefulError?: boolean
}

const DevSkill: Model<devSkill> = model('devskills', DevSkillSchema);

export default DevSkill;