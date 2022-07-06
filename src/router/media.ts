import express from 'express';
import { Response, ResponseCode, request } from './Response';
import passport from 'passport';
import MediaRequest from './media/Media';
import { Utils } from '../utils/Utils';

const router = express.Router();

const mediaRequest = new MediaRequest();

const uploader = Utils.getUploader();

const singleUploader = uploader.single('media');
const multipleUploader = uploader.array('medias', 5);

router.post('/', singleUploader, 
    passport.authenticate('jwt', { session: false }), 
    async (req, res) => {
        const response = Response;
        response.instance = res;
        const requestData: request = req;
        try {
            await mediaRequest.add(requestData);
            response.pushSuccess(ResponseCode.Created.code, { success: true });
        } catch(err) {
            console.log(err);
            response.pushError(err.code, err.message, err.error);
        }
    }
);

router.post('/multiple', multipleUploader, 
    passport.authenticate('jwt', { session: false }), 
    async (req, res) => {
        const response = Response;
        response.instance = res;
        const requestData: request = req;
        try {
            await mediaRequest.addMultiple(requestData);
            response.pushSuccess(ResponseCode.Created.code, { success: true });
        } catch(err) {
            console.log(err);
            response.pushError(err.code, err.message, err.error);
        }
    }
);

router.get('/:id', 
    async (req, res) => {
        const response = Response;
        response.instance = res;
        const requestData: request = req;
        try {
            const media = await mediaRequest.read(requestData);
            response.pushSuccess(ResponseCode.OK.code, media);
        } catch(err) {
            console.log(err);
            response.pushError(err.code, err.message, err.error);
        }
    }
);

router.put('/:id',
    singleUploader, 
    passport.authenticate('jwt', { session: false }), 
    async (req, res) => {
        const response = Response;
        response.instance = res;
        const requestData: request = req;
        try {
            await mediaRequest.update(requestData);
            response.pushSuccess(ResponseCode.OK.code, { success: true });
        } catch(err) {
            console.log(err);
            response.pushError(err.code, err.message, err.error);
        }
    }
);

router.delete('/:id', 
    passport.authenticate('jwt', { session: false }), 
    async (req, res) => {
        const response = Response;
        response.instance = res;
        const requestData: request = req;
        try {
            await mediaRequest.delete(requestData);
            response.pushSuccess(ResponseCode.OK.code, { success: true });
        } catch(err) {
            console.log(err);
            response.pushError(err.code, err.message, err.error);
        }
    }
);

export default router;