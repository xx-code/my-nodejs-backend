import bcrypt from 'bcryptjs';
import jwt = require('jsonwebtoken');
import { Utils } from '../../utils/Utils';
import User, { user, signInUser, signUpUser, currentUser, signUpUserError } from '../../models/User';
import Request from '../Request';
import { request } from '../Response';
import Validator from 'validator';

const errorMessage = require('./errors/errorUser.json');

export default class UserRequest implements Request {

    update(req: request) {
        throw new Error('Method not implemented.');
    }  
    delete(req: request) {
        throw new Error('Method not implemented.');
    }
    deletes(req: request) {
        throw new Error('Method not implemented.');
    }
    readAll(req: request) {
        throw new Error('Method not implemented.');
    }
    async read(req: request) {
        const id = req.param.id;
        const user: currentUser = req.body;
        const lang = Utils.matchLanguage(req.query.lang);

        let userFound;

        if (Utils.isEmpty(id))
            throw errorMessage.fieldUserNotExist[lang]; 
        else 
            userFound = User.findById(id);

        if (Utils.isEmpty(user.email))
            throw errorMessage.fieldUserNotExist[lang];
        else 
            userFound = User.findOne({ email: user.email });

        if (Utils.isEmpty(user.username))
            throw errorMessage.fieldUserNotExist[lang];
        else 
            userFound = await User.findOne({ username: user.username });
  
        return <currentUser> userFound;
            
    }
    inputValidation(input: signUpUser, language: string) {
        let isValid = true;
        let errors: signUpUserError;

        // refacortor input do avoid undefined
        input.email = !Utils.isEmpty(input.email) ? input.email : '';
        input.password = !Utils.isEmpty(input.password) ? input.password : '';
        input.confirmPassword = !Utils.isEmpty(input.confirmPassword) ? input.confirmPassword : '';
        input.firstname = !Utils.isEmpty(input.firstname) ? input.firstname : '';
        input.lastname = !Utils.isEmpty(input.lastname) ? input.lastname : '';
        input.username = !Utils.isEmpty(input.username) ? input.username : '';
        input.priority = !Utils.isEmpty(input.priority) ? input.priority : null;

        if (Validator.isEmpty(input.email)) {
            isValid = false;
            errors.emailError = errorMessage.fieldEmailEmpty[language];
        }

        if (!Validator.isEmail(input.email)) {
            isValid = false;
            errors.emailError = errorMessage.fieldEmailExist[language];
        }

        if (Validator.isEmpty(input.password)) {
            isValid = false;
            errors.passwordError = errorMessage.fieldPasswordEmpty[language];
        }

        if (Validator.isEmpty(input.confirmPassword)) {
            isValid = false;
            errors.confirmPassword = errorMessage.fieldConfirmPasswordEmpty[language];
        }

        if (Validator.isEmpty(input.firstname)) {
            isValid = false;
            errors.firstnameError = errorMessage.fieldFirstnameEmpty[language];
        }

        if (Validator.isEmpty(input.lastname)) {
            isValid = false;
            errors.lastnameError = errorMessage.fieldLastnameEmpty[language];
        }

        if (Validator.isEmpty(input.username)) {
            isValid = false;
            errors.usernameError = errorMessage.fieldUsernameEmpty[language];
        }

        if (input.priority == null) {
            isValid = false;
            errors.priorityError = errorMessage.fieldPriority[language];
        }

        if (input.password != input.confirmPassword) {
            isValid = false;
            errors.confirmPassword = errorMessage.fpasswordAndConfirmPasswordDifferent[language];
        }

        return {
            isValid,
            errors
        }
    }
    signIn(req: request) {

    }
    async signUp(req: request) {
        const userInput: signUpUser = req.body;
        const { isValid, errors } = this.inputValidation(userInput, Utils.matchLanguage(req.query.lang));

        if (!isValid)
            throw errors;

        this.read(req);
        
        const password = await this.hashPassword(userInput.password);
        userInput.password = password;

        const newUser = await new User(userInput).save();

        return newUser;
    }
    generateToken(input: currentUser) {
        const payload: currentUser = input;
        const JWT_SECRET = process.env.JWT_SECRET != null ? process.env.JWT_SECRET : '';
        const token = jwt.sign(payload, JWT_SECRET, {expiresIn: '2h'});
        return `Bearer ${token}`;
    }
    async hashPassword(password: string) {
        let saltPassword = await bcrypt.genSalt(10);
        const hashedPassword = bcrypt.hash(password, saltPassword);
        return hashedPassword;
    }
}