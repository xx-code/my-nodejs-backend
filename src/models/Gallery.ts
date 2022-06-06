import mongoose, { model, Model, Document } from "mongoose";
import { media } from "./Media";
import { project } from "./Project";
const Schema = mongoose.Schema;

const GallerySchema = new Schema({
    projectId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'projects'
    },
    mediaId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'medias'
    }
});

export interface gallery {
    projectId: string|project,
    mediaId: string|media
};

const Gallery: Model<gallery> = model('gallery', GallerySchema);

export default Gallery;