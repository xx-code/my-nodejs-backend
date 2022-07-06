import SocialLink, { socialLinkError } from "../../models/SocialLink";
import User from "../../models/User";
import Request from '../Request';
import { request, ResponseCode } from "../Response";
import Validator from 'validator';
import { Utils } from '../../utils/Utils';

const errorMessage = require('./errors/errorsSocialLink.json');
const userErrorMessage = require('./errors/errorsUser.json');

export default class SocialLinkRequest implements Request {
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

        const socialLink = new SocialLink(input);
        socialLink.save();
    }
    async update(req: request) {
        const lang = Utils.matchLanguage(req);
        const params = req.params;
        const id = params.id;
        const input = req.body;

        let resume = null;

        try {
            resume = await SocialLink.findById(id);
        } catch(err) {
            throw { code: ResponseCode.Bad_Request.code, error: err };
        }

        if (resume == null)
            throw { code: ResponseCode.NotFound.code, error: errorMessage.NoFound[lang] };
        
        await resume.updateOne({$set: input});
    }
    async delete(req: request) {
        const lang = Utils.matchLanguage(req);
        const params = req.params;
        const id = params.id;

        try {
            await SocialLink.deleteOne({ _id: id });
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

        const socialLinks = await SocialLink.find({ user: userId});

        return socialLinks;
    }
    async read(req: request) {
        const lang = Utils.matchLanguage(req);
        const params = req.params;
        const id = params.id;
        
        let resume = null; 

        try {
           resume = await SocialLink.findById(id); 
        } catch(err) {
            throw { code: ResponseCode.Bad_Request.code, error: err };
        }
        
        if (resume == null)
            throw { code: ResponseCode.NotFound.code, error: errorMessage.NoFound[lang] }
        
        return resume;
    }
    inputValidation(input: any, language: string) {
        let isValid = true;
        let errors:socialLinkError  = {};

        input.user = !Utils.isEmpty(input.user) ? input.user : '';
        input.url = !Utils.isEmpty(input.url) ? input.url : '';
        input.name = !Utils.isEmpty(input.name) ? input.name : '';

        if (Validator.isEmpty(input.user)) {
            errors.userError = errorMessage.haveToTargetUser[language];
            isValid = false;
        }

        if (Validator.isEmpty(input.url)) {
            errors.urlError = errorMessage.fieldUrlError[language];
            isValid = false;
        }


        return { isValid, errors }
    }

}