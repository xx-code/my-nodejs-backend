import mongoose, { model, Model, Document } from "mongoose";
import { media } from "./Media";
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
    picture: {
        type: Schema.Types.ObjectId,
        ref: 'media'
    },
    phoneNumbers: [
        String
    ],
    priority: {
        type: Number,
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

export interface user extends Document {
    email: string,
    password: string,
    username: string,
    firstname: string,
    lastname: string,
    picture?: string|media,
    phoneNumbers: string[],
    priority: number,
    creationDate: Date,
    updateDate: Date
};

export interface currentUser extends Document {
    _id: any,
    email: string,
    username: string,
    firstname: string,
    lastname: string,
    picture: string,
    priority: number,
    creationDate: Date,
    updateDate: Date
};

export interface updateUserInput extends Document {
    email?: string,
    password?: string,
    username?: string,
    firstname?: string,
    lastname?: string,
    picture?: string|media,
    phoneNumbers?: string[],
    priority?: number
    updateDate?: number
}

export interface signInUser {
    email?: string;
    password?: string;
};

export interface signUpUser extends user {
    confirmPassword: string;
};

export interface modifyPasswordUser {
    oldpassword: string,
    newPassword: string,
    confirmNewPassword: string,
}

export interface signUpUserError {
    emailError?: string;
    firstnameError?: string;
    lastnameError?: string;
    usernameError?: string;
    passwordError?: string;
    confirmPassword?: string;
    priorityError?: string;
};

export interface signInUserError {
    email?: string,
    password?: string
}

const User: Model<user> = model('users', UserSchema);

export default User;