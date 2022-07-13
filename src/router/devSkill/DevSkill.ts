import DevSkill, { devSkillError } from "../../models/DevSkill";
import User from "../../models/User";
import Request from '../Request';
import { request, ResponseCode } from "../Response";
import Validator from 'validator';
import { Utils } from '../../utils/Utils';

const errorMessage = require('./errors/errorsDevSkill.json');
const userErrorMessage = require('../user/errors/errorsUser.json');

export default class DevSkillRequest implements Request {
    async add(req: request) {
        const lang = Utils.matchLanguage(req);
        const input = req.body;
        const { isValid, errors } = this.inputValidation(input, lang);

        if (!isValid)
            throw { code: ResponseCode.Bad_Request.code, error: errors };
        
        try {
            const user = await User.findById(input.user);
            if (user == null)
                throw userErrorMessage.fieldUserNotExist[lang];
        } catch (err) {
            throw { code: ResponseCode.Bad_Request.code, error: err };
        }

        const devSkill = new DevSkill(input);
        await devSkill.save();
    }
    async update(req: request) {
        const lang = Utils.matchLanguage(req);;
        const params = req.params;
        const id = params.id;
        const input = req.body;

        let devSkill = null;

        try {
            devSkill = await DevSkill.findById(id);
        } catch(err) {
            throw { code: ResponseCode.Bad_Request.code, error: err };
        }

        if (devSkill == null)
            throw { code: ResponseCode.NotFound.code, error: errorMessage.NoFound[lang] };
        
        await devSkill.updateOne({$set: input});
    }
    async delete(req: request) {
        const lang = Utils.matchLanguage(req);
        const params = req.params;
        const id = params.id;

        try {
            await DevSkill.deleteOne({ _id: id });
        } catch(err) {
            throw { code: ResponseCode.Bad_Request.code, error: errorMessage.NoDelete[lang]  };
        }
    }
    deletes(req: request) {
        throw new Error("Method not implemented.");
    }
    async readAll(req: request) {
        const params = req.params;
        const userId = params.userId;

        const devSkills = await DevSkill.find({ user: userId});

        return devSkills;
    }
    async read(req: request) {
        const lang = Utils.matchLanguage(req);;
        const params = req.params;
        const id = params.id;
        
        let devSkills = null; 

        try {
           devSkills = await DevSkill.findById(id); 
        } catch(err) {
            throw { code: ResponseCode.Bad_Request.code, error: err };
        }
        
        if (devSkills == null)
            throw { code: ResponseCode.NotFound.code, error: errorMessage.NoFound[lang] }
        
        return devSkills;
    }
    inputValidation(input: any, language: string) {
        let isValid = true;
        let errors:devSkillError  = {};

        input.user = !Utils.isEmpty(input.user) ? input.user : '';
        input.title = !Utils.isEmpty(input.title) ? input.title : '';
        input.description = !Utils.isEmpty(input.description) ? input.description : '';
        input.icon = !Utils.isEmpty(input.icon) ? input.icon : '';
        input.level = !Utils.isEmpty(input.level) ? input.level : '';

        if (Validator.isEmpty(input.user)) {
            isValid = false;
            errors.userError = errorMessage.fieldUserNotExist[language];
        }

        if (Validator.isEmpty(input.title)) {
            isValid = false;
            errors.titleError = errorMessage.fieldTitleEmpty[language];
        }

        if (Validator.isEmpty(input.icon)) {
            isValid = false;
            errors.iconError = errorMessage.fieldIconEmpty[language];
        }

        if (Validator.isEmpty(input.level)) {
            isValid = false;
            errors.levelError = errorMessage.levelEmpty[language];
        }

        return { isValid, errors };

    }

}