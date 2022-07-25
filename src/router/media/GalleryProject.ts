import GalleryProject, { galleryProjectError } from "../../models/GalleryProject";
import Project from "../../models/Project";
import Request from '../Request';
import { request, ResponseCode } from "../Response";
import Validator from 'validator';
import { Utils } from '../../utils/Utils';
import Media from "../../models/Media";

const errorMessage = require('./errors/errorsGallery.json');
const errorProjectMessage = require('../project/errors/errorsProject.json');

export default class GalleryProjectRequest implements Request {
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
                throw { code: ResponseCode.Bad_Request.code, error: errorProjectMessage.projectNotFound[lang] };
            let media = null;
            media = await Media.findById(input.media);
            if (media == null)
                throw { code: ResponseCode.Bad_Request.code, error: errorMessage.mediaAlreadyLink[lang] };
            let galleryProject = null;
            galleryProject = await GalleryProject.findOne({ project: input.project, media: input.media });
            if (galleryProject != null)
                throw { code: ResponseCode.Bad_Request.code, error: errorMessage.mediaNotExist[lang] };
        } catch (err) {
            throw { code: ResponseCode.Bad_Request.code, error: err };
        }

        const galleryProject = new GalleryProject(input);
        await galleryProject.save();
    }
    update(req: request) {
        throw new Error("Method not implemented.");
    }
    async delete(req: request) {
        const lang = Utils.matchLanguage(req);
        const params = req.params;
        const id = params.id;

        try {
            await GalleryProject.deleteOne({ _id: id });
        } catch(err) {
            throw { code: ResponseCode.Bad_Request.code, error: errorMessage.NoDelete[lang]  };
        }
    }
    deletes(req: request) {
        throw new Error("Method not implemented.");
    }
    async readAll(req: request) {
        const lang = Utils.matchLanguage(req);
        const params = req.params;
        const projectId = params.projectId;

        let galleryProjects = null;
        try {
            galleryProjects = await GalleryProject.find({project: projectId});
            if (galleryProjects == null)
                throw { code: ResponseCode.NotFound.code, error: errorMessage.noFound[lang]}; 
        } catch(err) {
            throw { code: ResponseCode.Bad_Request.code, error: err };
        }

        return galleryProjects;
    }
    async read(req: request) {
        const lang = Utils.matchLanguage(req);
        const params = req.params;
        const id = params.id;
        

        let galleryProject = null;
        try {
            galleryProject = await GalleryProject.findById(id);
            if (galleryProject == null)
                throw { code: ResponseCode.NotFound.code, error: errorMessage.noFound[lang]}; 
        } catch(err) {
            throw { code: ResponseCode.Bad_Request.code, error: err };
        }
        return galleryProject;
    }
    inputValidation(input: any, language: string) {
        let isValid = true;
        let errors:galleryProjectError  = {};

        input.project = !Utils.isEmpty(input.project) ? input.project : '';
        input.media = !Utils.isEmpty(input.media) ? input.media : '';

        if (Validator.isEmpty(input.project)) {
            errors.projectError = errorMessage.fieldProjectError[language];
            isValid = false;
        }

        if (Validator.isEmpty(input.media)) {
            errors.mediaError = errorMessage.fieldMediaError[language];
            isValid = false;
        }

        return { isValid, errors };
    }
}