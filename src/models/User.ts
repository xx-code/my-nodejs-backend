import mongoose, { model, Model, Document } from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        requried: true
    },
    username: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    picture: String,
    linkedinUrl: String,
    githubUrl: String,
    instagramUrl: String,
    youtubeUrl: String,
    twitterUrl: String,
    phoneNumbers: [
        String
    ],
    authorizationLevel: {
        type: Number,
        required: true
    }
});

export interface user extends Document {
    email: string;
    password: string;
    username: string;
    firstname: string;
    lastname: string;
    picture?: string;
    linkedinUrl?: string;
    githubUrlUrl?: string;
    instagramUrl?: string;
    youtubeUrl?: string;
    twitterUrl?: string;
    phoneNumbers: Array<string>;
    authorizationLevel: number;
};

export interface currentUser extends Document {
    email: string;
    username: string;
    firstname: string;
    lastname: string;
    picture: string
    authorizationLevel: number;
};

export interface signInUser extends Document {
    email?: string;
    password?: string;
};

export interface signUpUser extends user {
    confirmPassword: string;
};

export interface signUpUserError extends Document {
    emailError?: string;
    passwordError?: string;
    confirmPassword?: string;
};

const User: Model<user> = model('users', UserSchema);

export default User;