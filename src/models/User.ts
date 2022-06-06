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
    aboutMe: String,
    picture: String,
    phoneNumbers: [
        String
    ],
    priority: {
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
    aboutMe: string;
    picture?: string;
    phoneNumbers: string[];
    priority: number;
};

export interface currentUser extends Document {
    email: string;
    username: string;
    firstname: string;
    lastname: string;
    picture: string;
    authorizationLevel: number;
};

export interface signInUser {
    email?: string;
    password?: string;
};

export interface signUpUser extends user {
    confirmPassword: string;
};

export interface signUpUserError {
    emailError?: string;
    passwordError?: string;
    confirmPassword?: string;
};

const User: Model<user> = model('users', UserSchema);

export default User;