import mongoose, { model, Model, Document } from "mongoose";
const Schema = mongoose.Schema;

const SocialLink = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref:'users'
    },
    url: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

export interface socialLink extends Document {
    user: string,
    url: string,
    name: string
};

export interface socialLinkError {
    userError?: string,
    urlError?: string,
    nameError?: string,
}

const ScialLink: Model<socialLink> = model('socialLinks', SocialLink);

export default ScialLink;