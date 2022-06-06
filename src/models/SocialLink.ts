import mongoose, { model, Model, Document } from "mongoose";
const Schema = mongoose.Schema;

const SocialLink = new Schema({
    userId: {
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
    userId: string,
    url: string,
    name: string
};

export interface scialLinkError {
    userIdError: string,
    urlError: string,
    nameError: string
}

const ScialLink: Model<socialLink> = model('socialLinks', SocialLink);

export default ScialLink;