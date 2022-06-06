import mongoose, { model, Model, Document } from "mongoose";
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
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

export interface image extends Document {
    cloudinaryUrl: string,
    cloudinaryId: string,
    creationDate: Date,
    updateDate: Date
}

export interface imageError {
    cloudinaryUrlError?: string,
    cloudinaryIdError?: string
}

const Image: Model<image> = model('images', ImageSchema);

export default Image;