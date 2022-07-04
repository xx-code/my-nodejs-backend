import Resume, { resumeError } from "../../models/Resume";
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
        const lang = req.lang;
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
    }
    async update(req: request) {
        const lang = req.lang;
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
        const lang = req.lang;
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
        const lang = req.lang;
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
        input.isCurrent = !Utils.isEmpty(input.isCurrent) ? input.isCurrent : false;

        if (Validator.isEmpty(input.user)) {
            errors.userError = errorMessage.haveToTargetUser[language];
            isValid = false;
        }

        if (Validator.isEmpty(input.title)) {
            errors.titleError = errorMessage.fieldTitleError[language];
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
        } 

        return { isValid, errors};
    }
}