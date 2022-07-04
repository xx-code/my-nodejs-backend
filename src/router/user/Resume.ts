import Resume, { resumeError, TypeExperience } from "../../models/Resume";
import User from "../../models/User";
import Request from '../Request';
import { request, ResponseCode } from "../Response";
import Validator from 'validator';
import { Utils } from '../../utils/Utils';
import moment from 'moment';

const errorMessage = require('./errors/errorsResume.json');
const userErrorMessage = require('./errors/errorsUser.json')

export default class ResumeRequest implements Request{
    async add(req: request) {
        const lang = Utils.matchLanguage(req);;
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

        // yyyy-mm-dd
        input.startDate = new Date(input.startDate);
        if (!Utils.isEmpty(input.endDate))
            input.endDate = new Date(input.endDate);

        const newResume = new Resume(input);
        await newResume.save();
    }
    async update(req: request) {
        const lang = Utils.matchLanguage(req);;
        const params = req.params;
        const id = params.id;
        const input = req.body;

        let resume = null;

        try {
            resume = await Resume.findById(id);
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
            await Resume.deleteOne({ _id: id });
        } catch(err) {
            throw { code: ResponseCode.Bad_Request.code, error: errorMessage.NoDelete[lang]  };
        }
    }
    async deletes(req: request) {
        throw new Error("Method not implemented.");
    }
    async readAll(req: request) {
        const params = req.params;
        const userId = params.userId;

        const resumes = await Resume.find({ user: userId});

        return resumes;
    }
    async read(req: request) {
        const lang = Utils.matchLanguage(req);;
        const params = req.params;
        const id = params.id;
        
        let resume = null; 

        try {
           resume = await Resume.findById(id); 
        } catch(err) {
            throw { code: ResponseCode.Bad_Request.code, error: err };
        }
        
        if (resume == null)
            throw { code: ResponseCode.NotFound.code, error: errorMessage.NoFound[lang] }
        
        return resume;
    }
    inputValidation(input: any, language: string) {
        let isValid = true;
        let errors:resumeError  = {};

        input.user = !Utils.isEmpty(input.user) ? input.user : '';
        input.title = !Utils.isEmpty(input.title) ? input.title : '';
        input.detail = !Utils.isEmpty(input.detail) ? input.detail : '';
        input.type = !Utils.isEmpty(input.type) ? input.type: '';
        input.isCurrent = !Utils.isEmpty(input.isCurrent) ? input.isCurrent : false;
        input.startDate = !Utils.isEmpty(input.startDate) ? input.startDate : '';
        input.endDate = !Utils.isEmpty(input.endDate) ? input.endDate : '';

        if (Validator.isEmpty(input.user)) {
            errors.userError = errorMessage.haveToTargetUser[language];
            isValid = false;
        }

        if (Validator.isEmpty(input.title)) {
            errors.titleError = errorMessage.fieldTitleError[language];
            isValid = false;
        }

        if (Validator.isEmpty(input.detail)) {
            errors.detailError = errorMessage.fieldDetail[language];
            isValid = false;
        }

        if ( input.type != TypeExperience.Certification && input.type != TypeExperience.Education && input.type != TypeExperience.Work ) {
            errors.typeError = errorMessage.typeNotValid[language];
            isValid = false;
        }

        if (Validator.isEmpty(input.type)) {
            errors.typeError = errorMessage.fieldTypeError[language];
            isValid = false;
        }


        if (Validator.isEmpty(input.startDate)) {
            errors.startDateError = errorMessage.fieldStartDateError[language];
            isValid = false;
        }

        if (!input.isCurrent) {
            if (Validator.isEmpty(input.endDate)) {
                errors.endDateError = errorMessage.fieldEndDateError[language];
                isValid = false;
            } else {
                const startDate = new Date(input.startDate);
                const endDate = new Date(input.endDate);
                const start = moment(startDate.toISOString());
                const end = moment(endDate.toDateString());

                if (end < start) {
                    errors.endDateError = errorMessage.dateStartLessThanEndDate[language];
                    isValid = false;
                }
            }
        } else {
            const startDate = new Date(input.startDate);
            const start = moment(startDate.toISOString());
            
            if (start > moment()) { 
                errors.endDateError = errorMessage.CantStartBefort[language];
                isValid = false;
            }

            if (!Validator.isEmpty(input.endDate)) {
                errors.endDateError = errorMessage.EndDateMustNotDefined[language];
                isValid = false;
            }
        }
            

        return { isValid, errors};
    }
}