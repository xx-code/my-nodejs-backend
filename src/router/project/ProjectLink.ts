import ProjectLink, { projectLinkError } from "../../models/ProjectLink";
import Project from "../../models/Project";
import Request from '../Request';
import { request, ResponseCode } from "../Response";
import Validator from 'validator';
import { Utils } from '../../utils/Utils';

const errorMessage = require('./errors/errorsProjectLink.json');
const projectErrorMessage = require('./errors/errorsProject.json');

export default class ProjectLinkRequest implements Request {
    async add(req: request) {
        const lang = Utils.matchLanguage(req);
        const input = req.body;
        const { isValid, errors } = this.inputValidation(input, lang);

        if (!isValid)
            throw { code: ResponseCode.Bad_Request.code, error: errors };

        let project = null;
        try {
            project = await Project.findById(input.project);
            if (project == null)
                throw { code: ResponseCode.Bad_Request.code, message: projectErrorMessage.projectNotFound[lang] };
        } catch (err) {
            throw { code: ResponseCode.Bad_Request.code, error: err };
        }

        const projectLink = new ProjectLink(input);
        await projectLink.save();
    }
    async update(req: request) {
        const lang = Utils.matchLanguage(req);
        const input = req.body;
        const params = req.params;
        const id = params.id;

        let projectLink = null;
        try {
            projectLink = await ProjectLink.findById(id);
            if (projectLink == null)
                throw { code: ResponseCode.NotFound.code, error: projectErrorMessage.projectNotFound[lang]}; 
        } catch(err) {
            throw { code: ResponseCode.Bad_Request.code, error: err };
        }
        await projectLink.updateOne({$set: input});
    }
    async delete(req: request) {
        const lang = Utils.matchLanguage(req);
        const params = req.params;
        const id = params.id;

        try {
            await ProjectLink.deleteOne({ _id: id });
        } catch(err) {
            throw { code: ResponseCode.Bad_Request.code, error: errorMessage.NoDelete[lang]  };
        }
    }
    async deletes(req: request) {
        throw new Error("Method not implemented.");
    }
    async readAll(req: request) {
        const lang = Utils.matchLanguage(req);
        const params = req.params;
        const projectId = params.projectId;

        let projectLinks = null;
        try {
            projectLinks = await ProjectLink.find({ project: projectId});
            if (projectLinks == null)
                throw { code: ResponseCode.NotFound.code, error: projectErrorMessage.projectNotFound[lang]}; 
        } catch(err) {
            throw { code: ResponseCode.Bad_Request.code, error: err };
        }
        return projectLinks;
    }
    async read(req: request) {
        const lang = Utils.matchLanguage(req);
        const params = req.params;
        const id = params.id;

        let projectLink = null;
        try {
            projectLink = await ProjectLink.findById(id);
            if (projectLink == null)
                throw { code: ResponseCode.NotFound.code, error: projectErrorMessage.projectNotFound[lang]}; 
        } catch(err) {
            throw { code: ResponseCode.Bad_Request.code, error: err };
        }
        return projectLink;
    }
    inputValidation(input: any, language: string) {
        let isValid = true;
        let errors:projectLinkError  = {};

        input.url = !Utils.isEmpty(input.url) ? input.url : '';
        input.platform = !Utils.isEmpty(input.platform) ? input.platform : '';
        input.project = !Utils.isEmpty(input.project) ? input.project : '';

        if (Validator.isEmpty(input.url)){
            isValid = false;
            errors.urlError = errorMessage.fieldUrlError[language];
        }

        if (Validator.isEmpty(input.platform)){
            isValid = false;
            errors.platformError = errorMessage.fieldPlatformError[language];
        }

        if (Validator.isEmpty(input.project)){
            isValid = false;
            errors.projectError = errorMessage.fieldProject[language];
        }

        return { isValid, errors };
    }
    
}