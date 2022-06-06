import mongoose, { model, Model, Document } from "mongoose";
import { currentUser } from "./User";
const Schema = mongoose.Schema;

const DevelopperSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    isRegister: {
        type: Boolean,
        default: false
    },
    name: String,
    creationDate: {
        type: Date,
        default: Date.now()
    },
    updateDate: {
        type: Date,
        default: Date.now()
    }
});

export interface developper extends Document {
    user?: string|currentUser,
    name?: string,
    isRegister: boolean,
    creationDate: Date,
    updateDate: Date
};

export interface developperError {
    userError?: string,
    nameError?: string,
}

const Developper: Model<developper> = model('developpers', DevelopperSchema);

export default Developper;