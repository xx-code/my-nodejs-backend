import mongoose, { model, Model, Document } from "mongoose";
import { media } from "./Media";
import { project } from "./Project";
const Schema = mongoose.Schema;

const GallerySchema = new Schema({
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

export interface gallery extends Document {
    project: string|project,
    media: string|media
};

const Gallery: Model<gallery> = model('gallery', GallerySchema);

export default Gallery;