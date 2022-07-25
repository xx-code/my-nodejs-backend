import mongoose, { model, Model, Document } from "mongoose";
import { media } from "./Media";
import { project } from "./Project";
const Schema = mongoose.Schema;

const GalleryProjectSchema = new Schema({
    project: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'projects'
    },
    media: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'medias'
    }
});

export interface galleryProject extends Document {
    project: string|project,
    media: string|media
};

export interface galleryProjectError {
    projectError?: string
    mediaError?: string
}

const Gallery: Model<galleryProject> = model('galleryProject', GalleryProjectSchema);

export default Gallery;