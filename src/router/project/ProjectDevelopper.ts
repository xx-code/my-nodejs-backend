import ProjectDevelopper, { projectDevelopperError } from "../../models/ProjectDevelopper";
import Project from "../../models/Project";
import Request from '../Request';
import { request, ResponseCode } from "../Response";
import Validator from 'validator';
import { Utils } from '../../utils/Utils';
import Developper from "../../models/Developper";

const errorMessage = require('./errors/errorsProjectDevelopper.json');
const projectErrorMessage = require('./errors/errorsProject.json')

export default class ProjectDevelopperRequest implements Request {
    async add(req: request) {
        const lang = Utils.matchLanguage(req);
        const input = req.body;
        const { isValid, errors } = this.inputValidation(input, lang);

        if (!isValid)
            throw { code: ResponseCode.Bad_Request.code, error: errors };

        try {
            let project = null;
            project = await Project.findById(input.project);
            if (project == null)
                throw { code: ResponseCode.Bad_Request.code, error: projectErrorMessage.projectNotFound[lang] };
            let developper = null;
            developper = await Developper.findById(input.developper);
            if (developper == null)
                throw { code: ResponseCode.Bad_Request.code, error: errorMessage.developperNoFound[lang] };
            let projectDevelopper = null;
            projectDevelopper = await ProjectDevelopper.findOne({ project: input.project,  developper: input.developper });
            if (projectDevelopper != null)
                throw { code: ResponseCode.Bad_Request.code, error: errorMessage.developperAlreadyLink[lang] };
        } catch (err) {
            throw { code: ResponseCode.Bad_Request.code, error: err };
        }

        const projectDevelopper = new ProjectDevelopper(input);
        await projectDevelopper.save();
    }
    async update(req: request) {
        throw new Error("Method not implemented.");
    }
    async delete(req: request) {
        const lang = Utils.matchLanguage(req);
        const params = req.params;
        const id = params.id;

        try {
            await ProjectDevelopper.deleteOne({ _id: id });
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

        let projectDeveloppers = [];
        try {
            projectDeveloppers = await ProjectDevelopper.find({project: projectId});
            if (projectDeveloppers == null)
                throw { code: ResponseCode.NotFound.code, error: errorMessage.noFound[lang]}; 
        } catch(err) {
            throw { code: ResponseCode.Bad_Request.code, error: err };
        }
        return projectDeveloppers;
    }
    async read(req: request) {
        const lang = Utils.matchLanguage(req);
        const params = req.params;
        const id = params.id;
        
        let projectDevelopper = null;
        try {
            projectDevelopper = await ProjectDevelopper.findById(id);
            if (projectDevelopper == null)
                throw { code: ResponseCode.NotFound.code, error: errorMessage.noFound[lang]}; 
        } catch(err) {
            throw { code: ResponseCode.Bad_Request.code, error: err };
        }
        return projectDevelopper;
    }
    inputValidation(input: any, language: string) {
        let isValid = true;
        let errors:projectDevelopperError  = {};

        input.project = !Utils.isEmpty(input.project) ? input.project : '';
        input.developper = !Utils.isEmpty(input.developper) ? input.developper : '';

        if (Validator.isEmpty(input.project)) {
            errors.projectError = errorMessage.fieldProjectError[language];
            isValid = false;
        }

        if (Validator.isEmpty(input.developper)) {
            errors.developperError = errorMessage.fieldDevelopperError[language];
            isValid = false;
        }

        return { isValid, errors };
    }
}