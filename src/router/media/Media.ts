import Media, { mediaError } from "../../models/Media";
import User from "../../models/User";
import Request from '../Request';
import { request, ResponseCode } from "../Response";
import Validator from 'validator';
import { Utils } from '../../utils/Utils';
import moment from 'moment';
import cloudinary from 'cloudinary';
import fs from 'fs';

const errorMessage = require('./errors/errorsMedia.json');
const cloudinaryApi = cloudinary.v2;

export default class MediaRequest implements Request {
    async add(req: request) {
        const lang = Utils.matchLanguage(req);
        const mediaFile = req.file;
        const { isValid, error } = this.inputValidation(mediaFile, lang);
        if (!isValid)
            throw error;

        try {
            const mediaUploaded = await cloudinaryApi.uploader.upload(mediaFile.path);
            fs.unlinkSync(mediaFile.path);
            const newMedia = new Media({
                cloudinaryUrl: mediaUploaded.public_id,
                cloudinaryId: mediaUploaded.url
            });
            await newMedia.save();
        } catch(err) {
            console.log(err)
            throw { code: ResponseCode.Bad_Request.code, error: errorMessage.uploadError[lang] };
        }
    }
    async addMultiple(req: request) {
        const lang = Utils.matchLanguage(req);
        const mediaFiles = req.files;
        if (mediaFiles.length <= 0)
            throw { code: ResponseCode.Bad_Request.code, error: errorMessage.noFile[lang] };
        if (mediaFiles.length > 5)
            throw { code: ResponseCode.Bad_Request.code, error: errorMessage.maxFile[lang]};
        try { 
            for (let i = 0; i < mediaFiles.length; i++) {
                const mediaUploaded = await cloudinaryApi.uploader.upload(mediaFiles[i].path);
                fs.unlinkSync(mediaFiles[i].path);
                const newMedia = new Media({
                    cloudinaryUrl: mediaUploaded.public_id,
                    cloudinaryId: mediaUploaded.url
                });
                await newMedia.save();
            }
        } catch(err) {
            console.log(err)
            throw { code: ResponseCode.Bad_Request.code, error: errorMessage.uploadError[lang] };
        }
    }
    async update(req: request) {
        const lang = Utils.matchLanguage(req);
        let media = await this.read(req);
        const mediaFile = req.file;
        const { isValid, error } = this.inputValidation(mediaFile, lang);
        if (!isValid)
            throw error;
        try {
            const newMediaUploaded = await cloudinaryApi.uploader.upload(mediaFile.path);
            fs.unlinkSync(mediaFile.path);
            await cloudinaryApi.uploader.destroy(media.cloudinaryId);
            await media.updateOne({$set: { 
                cloudinaryId: newMediaUploaded.public_id,
                cloudinaryUrl: newMediaUploaded.url,
                updateDate: Date.now() 
            }});
            
        } catch (err) {
            throw { code: ResponseCode.Bad_Request.code, error: errorMessage.updateError[lang] };
        }

    }
    async delete(req: request) {
        const lang = Utils.matchLanguage(req);
        let media = await this.read(req);
        try {
            await cloudinaryApi.uploader.destroy(media.cloudinaryId);
            await media.deleteOne();
        } catch (err) {
            throw { code: ResponseCode.Bad_Request.code, error: errorMessage.deletionError[lang] };
        }
    }
    deletes(req: request) {
        throw new Error("Method not implemented.");
    }
    readAll(req: request) {
        throw new Error("Method not implemented.");
    }
    async read(req: request) {
        const lang = Utils.matchLanguage(req);
        const params = req.params;
        const id = params.id;
        let media = null;
        try {
            media = await Media.findById(id);
        } catch (err) {
            throw { code: ResponseCode.Bad_Request.code , error: err};
        }
        
        if (media == null)
            throw { code: ResponseCode.NotFound.code, error: errorMessage.mediaNotExist[lang] };

        return media;
    }
    inputValidation(input: any, language: string) {
        let isValid = true;
        let error = {}
        if (Utils.isEmpty(input)) {
            isValid = false;
            error = { code: ResponseCode.Bad_Request.code, error: errorMessage.noFile[language] };
        }
            
        return {isValid, error};
    }
    
}
