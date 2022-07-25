import express from 'express';
import { Response, ResponseCode, request } from './Response';
import passport from 'passport';
import { Utils } from '../utils/Utils';
import GalleryProjectRequest from './media/GalleryProject';

const router = express.Router();
const galleryProjectRequest = new GalleryProjectRequest();

router.post('/', passport.authenticate('jwt', { session: false }), 
    async (req, res) => {
        const response = Response;
        response.instance = res;
        const requestData: request = req;
        try {
            await galleryProjectRequest.add(requestData);
            response.pushSuccess(ResponseCode.Created.code, { success: true });
        } catch(err) {
            console.log(err);
            response.pushError(err.code, err.message, err.error);
        }
    }
);

router.get('/allBy/:projectId', async (req, res) => {
        const response = Response;
        response.instance = res;
        const requestData: request = req;
        try {
            const gallery = await galleryProjectRequest.readAll(requestData);
            response.pushSuccess(ResponseCode.OK.code, gallery);
        } catch(err) {
            console.log(err);
            response.pushError(err.code, err.message, err.error);
        }
    }
);

router.get('/:id', async (req, res) => {
        const response = Response;
        response.instance = res;
        const requestData: request = req;
        try {
            const gallery = await galleryProjectRequest.read(requestData);
            response.pushSuccess(ResponseCode.OK.code, gallery);
        } catch(err) {
            console.log(err);
            response.pushError(err.code, err.message, err.error);
        }
    }
);

router.delete('/:id', passport.authenticate('jwt', { session: false }), 
    async (req, res) => {
        const response = Response;
        response.instance = res;
        const requestData: request = req;
        try {
            await galleryProjectRequest.delete(requestData);
            response.pushSuccess(ResponseCode.OK.code, { success: true });
        } catch(err) {
            console.log(err);
            response.pushError(err.code, err.message, err.error);
        }
    }
);

export default router;