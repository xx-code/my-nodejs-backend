import Project, { projectError } from "../../models/Project";
import User from "../../models/User";
import Request from '../Request';
import { request, ResponseCode } from "../Response";
import Validator from 'validator';
import { Utils } from '../../utils/Utils';
import Developper from "../../models/Developper";

const errorMessage = require('./errors/errorsProject.json');

export default class ProjectRequest implements Request {
    async add(req: request) {
        let input = req.body;
        const lang = Utils.matchLanguage(req);
        let { isValid, errors } = this.inputValidation(input, lang);

        if (!isValid)
            throw { code: ResponseCode.Bad_Request.code, error: errors };

        let owner = null;

        try {
            owner = await Developper.findById(input.owner);
        } catch(err) {
            console.log(err);
            throw { code: ResponseCode.NotFound.code, error: errorMessage.ownerNotExist[lang] };
        }
        if (owner == null)
            throw { code: ResponseCode.NotFound.code, error: errorMessage.ownerNotExist[lang] };
        
        const project = new Project(input);
        await project.save();
    }
    async update(req: request) {
        const params = req.params;
        const lang = Utils.matchLanguage(req);
        const id = params.id;
        const input = req.body;

        let project = null;
        try {
            project = await Project.findById(id);
        } catch(err) {
            console.log(err);
            throw { code: ResponseCode.NotFound.code, error: errorMessage.projectNotFound[lang] };
        }

        await project.update({$set: input });
    }
    async delete(req: request) {
        const lang = Utils.matchLanguage(req);
        const params = req.params;
        const id = params.id;

        try {
            await Project.deleteOne({ _id: id });
        } catch(err) {
            throw { code: ResponseCode.Bad_Request.code, error: errorMessage.NoDelete[lang]  };
        }
    }
    async deletes(req: request) {
        throw new Error("Method not implemented.");
    }
    async readAll(req: request) {
        const projects = await Project.find();

        return projects;
    }
    async read(req: request) {
        const params = req.params;
        const lang = Utils.matchLanguage(req);
        const id = params.id;

        let project = null;
        try {
            project = await Project.findById(id);
        } catch(err) {
            console.log(err);
            throw { code: ResponseCode.NotFound.code, error: errorMessage.projectNotFound[lang] };
        }

        if (project == null)
            throw { code: ResponseCode.NotFound.code, error: errorMessage.projectNotFound[lang] }

        return project;
    }
    inputValidation(input: any, language: string) {
        let isValid = true;
        let errors:projectError  = {};

        input.owner = !Utils.isEmpty(input.owner) ? input.owner : '';
        input.description = !Utils.isEmpty(input.description) ? input.description : '';
        input.name = !Utils.isEmpty(input.name) ? input.name : '';

        if (Validator.isEmpty(input.owner)) {
            errors.ownerError = errorMessage.fieldOwnerEmpty[language];
            isValid = false;
        }

        if (Validator.isEmpty(input.description)) {
            errors.descriptionError = errorMessage.fieldDescriptionEmpty[language];
            isValid = false;
        }

        if (Validator.isEmpty(input.name)) {
            errors.nameError = errorMessage.fieldNameEmpty[language];
            isValid = false;
        }

        return { isValid, errors};
    }
    
}