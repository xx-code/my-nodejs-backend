import mongoose, { model, Model, Document } from "mongoose";
const Schema = mongoose.Schema;

const MediaSchema = new Schema({
    cloudinaryUrl: {
        type: String,
        required: true
    },
    cloudinaryId: {
        type: String,
        required: true
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

export interface media extends Document {
    cloudinaryUrl: string,
    cloudinaryId: string,
    creationDate: Date,
    updateDate: Date
}

export interface mediaError {
    cloudinaryUrlError?: string,
    cloudinaryIdError?: string
}

const Media: Model<media> = model('medias', MediaSchema);

export default Media;