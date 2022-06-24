import bcrypt from 'bcryptjs';
import jwt = require('jsonwebtoken');
import { Utils } from '../../utils/Utils';
import User, { user, signInUser, signUpUser, currentUser, signUpUserError, signInUserError, updateUserInput } from '../../models/User';
import Request from '../Request';
import { request, ResponseCode } from '../Response';
import Validator from 'validator';

const errorMessage = require('./errors/errorsUser.json');

export default class UserRequest implements Request {

    async update(req: request) {
        const id = req.params.id;
        const currentUser: currentUser = req.user;
        const lang = Utils.matchLanguage(req);
        const inputUser: updateUserInput = req.body;

        if (currentUser.priority != 0 || currentUser._id != id)
            throw { code: ResponseCode.Forbidden.code, error:errorMessage.NoAuthorization[lang] }

        try {
            let user = null;

            if (!Utils.isEmpty(id))
                user = await User.findById(id);
            
            if (user == null)
                throw { code: ResponseCode.NotFound.code, error:errorMessage.userNoFound[lang] }
            
            // force!! double security to ensure anybody to modify password here;
            inputUser.password = undefined;

            await user.updateOne({$set: inputUser });
        } catch(err) {
            console.log(err);
            throw { code: ResponseCode.InternalServerError, error: 'SERVER ERROR -- REF TO LOG' }
        }
        
    }  
    delete(req: request) {
        throw new Error('Method not implemented.');
    }
    deletes(req: request) {
        throw new Error('Method not implemented.');
    }
    async readAll(req: request) {
        let users = await User.find();

        return users;
    }
    async read(req: request) {
        const id = req.params.id;
        const user: currentUser = req.body;
        const lang = Utils.matchLanguage(req);

        let userFound = null;

        if (!Utils.isEmpty(user.email))
            userFound = await User.findOne({ email: user.email });

        if (!Utils.isEmpty(id)) 
            userFound = await User.findById(id);

        if (!Utils.isEmpty(user.username))
            userFound = await User.findOne({ username: user.username });
        
        if (userFound == null)
            throw { code: ResponseCode.NotFound.code, error:errorMessage.fieldUserNotExist[lang] };
  
        return userFound;       
    }

    async isUserExiste(req: request) {
        try {
            await this.read(req);
            return true;
        } catch(err) {
            return false;
        }
    }

    inputValidationSignIn(input: signInUser, language: string) {
        let isValid = true;
        let errors:signInUserError  = {};

        input.email = !Utils.isEmpty(input.email) ? input.email : '';
        input.password = !Utils.isEmpty(input.password) ? input.password : '';

        if (Validator.isEmpty(input.email)) {
            errors.email = errorMessage.emailOrPasswordError[language];
            isValid = false;
        }

        if (Validator.isEmpty(input.password)) {
            errors.password = errorMessage.emailOrPasswordError[language];
            isValid = false;
        }

        return { isValid, errors};
    }
    
    inputValidation(input: signUpUser, language: string) {
        let isValid = true;
        let errors: signUpUserError = {};

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
            errors.emailError = errorMessage.fieldUserNotExist[language];
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
            errors.confirmPassword = errorMessage.passwordAndConfirmPasswordDifferent[language];
        }

        return {
            isValid,
            errors
        }
    }
    async signIn(req: request) {
        const lang = Utils.matchLanguage(req);
        const userInput: signInUser = req.body;
        const { isValid, errors } = this.inputValidationSignIn(userInput, lang);
        
        if (!isValid)
            throw { code: ResponseCode.Bad_Request.code, error: errors };

        const user  = await this.read(req);

        if (user == null) 
            throw { code: ResponseCode.Bad_Request.code, error: errorMessage.emailOrPasswordError[lang] };
        
        const isCorrectPassword = await bcrypt.compare(userInput.password, user.password);

        if (!isCorrectPassword)
            throw { code: ResponseCode.Bad_Request.code, error: errorMessage.emailOrPasswordError[lang] };
    
        user.password = undefined;

        return this.generateToken(user);
    }
    async signUp(req: request) {
        const lang = Utils.matchLanguage(req);
        const userInput: signUpUser = req.body;
        const { isValid, errors } = this.inputValidation(userInput, lang);

        if (!isValid)
            throw { code: ResponseCode.Bad_Request.code, error: errors };

        if (await this.isUserExiste(req))
            throw { code: ResponseCode.Bad_Request.code, error: errorMessage.userAlreadyExiste[lang] };
        
        const password = await this.hashPassword(userInput.password);
        userInput.password = password;

        const newUser = await new User(userInput).save();

        return newUser;
    }
    async modifyPassword(req: request) {

    }
    generateToken(input: any) {
        // sign function take plainObject
        const payload: currentUser = input;
        // change typescript object to plainOjbect
        const payloadObject = Object.assign({}, payload);
        const JWT_SECRET = process.env.JWT_SECRET != null ? process.env.JWT_SECRET : '';
        const token = jwt.sign(payloadObject, JWT_SECRET, {expiresIn: '2h'});
        return `Bearer ${token}`;
    }
    async hashPassword(password: string) {
        let saltPassword = await bcrypt.genSalt(10);
        const hashedPassword = bcrypt.hash(password, saltPassword);
        return hashedPassword;
    }
}