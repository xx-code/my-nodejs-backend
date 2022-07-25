import Developper, { developperError } from "../../models/Developper";
import User from "../../models/User";
import Request from '../Request';
import { request, ResponseCode } from "../Response";
import Validator from 'validator';
import { Utils } from '../../utils/Utils';
import moment from 'moment';
import { ObjectId } from "mongodb";

const errorMessage = require('./errors/errorsDevelopper.json');
const userErrorMessage = require('./errors/errorsUser.json');

export default class DevelopperRequest implements Request {
    async add(req: request) {
        const lang = Utils.matchLanguage(req);
        const input = req.body;
        const { isValid, errors } = this.inputValidation(input, lang);

        if (!isValid)
            throw { code: ResponseCode.Bad_Request.code, error: errors };
        
        try {
            let developper = null;
            const isRegister = !Utils.isEmpty(input.isRegister) ? input.isRegister : false 
            if (isRegister) {
                // verify if the id is good
                if (!this.isValidUserObjectId(input.user))
                    throw errorMessage.userIdNoGood[lang];
                // verify if the user exist
                const user = await User.findById(input.user);
                if (user == null)
                    throw userErrorMessage.fieldUserNotExist[lang];
                developper = await Developper.findOne({ user: input.user });
            }
            else 
                developper = await Developper.findOne({ name: input.name });
            if (developper != null)
                throw errorMessage.developperAlreadyExist[lang];
        } catch (err) {
            console.log(err);
            throw { code: ResponseCode.Bad_Request.code, error: err };
        }

        const newDevelopper = new Developper(input);
        await newDevelopper.save();
    }
    async update(req: request) {
        const lang = Utils.matchLanguage(req);
        const params = req.params;
        const id = params.id;
        const input = req.body;

        let developper = null;

        input.name = !Utils.isEmpty(input.name) ? input.name : ""; 
        input.user = !Utils.isEmpty(input.user) ? input.user : "";

        try {
            developper = await Developper.findById(id);
        } catch(err) {
            throw { code: ResponseCode.Bad_Request.code, error: err };
        }

        if (developper == null)
            throw { code: ResponseCode.NotFound.code, error: errorMessage.developperNoFound[lang] };
        
        const { isValid, errors } = this.inputValidation(input, lang);

        if (!isValid)
            throw { code: ResponseCode.Bad_Request.code, error: errors };
        
        try {
            const isRegister = !Utils.isEmpty(input.isRegister) ? input.isRegister : false 
            if (isRegister) {
                // verify if the id is good
                if (!this.isValidUserObjectId(input.user))
                    throw errorMessage.userIdNoGood[lang];
                // verify if the user exist
                const user = await User.findById(input.user);
                if (user == null)
                    throw userErrorMessage.fieldUserNotExist[lang];
                developper = await Developper.findOne({ user: input.user });
            }
        } catch(err) {
            console.log(err);
            throw { code: ResponseCode.Bad_Request.code, error: err };
        }
        
        await developper.updateOne({$set: input});
    }
    async delete(req: request) {
        const lang = Utils.matchLanguage(req);
        const params = req.params;
        const id = params.id;

        try {
            await Developper.deleteOne({ _id: id });
        } catch(err) {
            throw { code: ResponseCode.Bad_Request.code, error: errorMessage.NoDelete[lang]  };
        }
    }
    deletes(req: request) {
        throw new Error("Method not implemented.");
    }
    async readAll(req: request) {
        const developpers = await Developper.find();

        return developpers
    }
    async read(req: request) {
        const lang = Utils.matchLanguage(req);
        const params = req.params;
        const id = params.id;
        const userId = params.userId;
        const name = params.name;
        
        let developper = null; 

        try {
            if (!Utils.isEmpty(name))
                developper = await Developper.findOne({ name: name });
            else if (!Utils.isEmpty(userId))
                developper = await Developper.findOne({user: userId});
            else 
                developper = await Developper.findById(id);
        } catch(err) {
            throw { code: ResponseCode.Bad_Request.code, error: err };
        }
        
        if (developper == null)
            throw { code: ResponseCode.NotFound.code, error: errorMessage.developperNoFound[lang] }
        
        return developper;
    }
    /*async readByUserId(req: request) {
        const lang = Utils.matchLanguage(req);
        const params = req.params;
        const userId = params.userId;
        
        let developper = null; 

        try {
           developper = await Developper.findOne({user: userId}); 
        } catch(err) {
            throw { code: ResponseCode.Bad_Request.code, error: err };
        }
        
        if (developper == null)
            throw { code: ResponseCode.NotFound.code, error: errorMessage.developperNoFound[lang] }
        
        return developper;
    }
    async readByName(req: request) {
        const lang = Utils.matchLanguage(req);
        const params = req.params;
        const name = params.name;
        
        let developper = null; 

        try {
           developper = await Developper.findOne({name: name}); 
        } catch(err) {
            throw { code: ResponseCode.Bad_Request.code, error: err };
        }
        
        if (developper == null)
            throw { code: ResponseCode.NotFound.code, error: errorMessage.developperNoFound[lang] }
        
        return developper;
    }*/
    inputValidation(input: any, language: string) {
        let isValid = true;
        let errors:developperError  = {};

        input.name = !Utils.isEmpty(input.name) ? input.name : '';
        input.user = !Utils.isEmpty(input.user) ? input.user : '';
        input.isRegister = !Utils.isEmpty(input.isRegister) ? input.isRegister : false;

        if (Validator.isEmpty(input.user) && Validator.isEmpty(input.name)){
            isValid = false;
            errors.nameError = errorMessage.fieldNameEmpty[language];
            errors.userError = errorMessage.fieldUserEmpty[language];
        }

        if (!Validator.isEmpty(input.user) && !Validator.isEmpty(input.name)){
            isValid = false;
            errors.nameError = errorMessage.chooseBetween[language];
            errors.userError = errorMessage.chooseBetween[language];
        }

        if (input.isRegister && Validator.isEmpty(input.user)) {
            isValid = false;
            errors.userError = errorMessage.fieldsNameAndUserEmpty[language];
        }

        if (!input.isRegister && Validator.isEmpty(input.name)) {
            isValid = false;
            errors.nameError = errorMessage.fieldNameEmpty[language];
        }

        return { isValid, errors };
    }

    isValidUserObjectId(userId: string) {
        if (ObjectId.isValid(userId))
            if ((new ObjectId(userId)).toString() == userId)
                return true;
        return false;
    }
}