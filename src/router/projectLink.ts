import express from 'express';
import { Response, ResponseCode, request } from './Response';
import passport from 'passport';
import { Utils } from '../utils/Utils';
import ProjectLinkRequest from './project/ProjectLink';

const router = express.Router();
const projectLinkRequest = new ProjectLinkRequest();

router.post('/', passport.authenticate('jwt', { session: false }), 
    async (req, res) => {
        const response = Response;
        response.instance = res;
        const requestData: request = req;
        try {
            await projectLinkRequest.add(requestData);
            response.pushSuccess(ResponseCode.Created.code, { success: true });
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
            const projectLink = await projectLinkRequest.read(requestData);
            response.pushSuccess(ResponseCode.OK.code, projectLink);
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
            const projectLinks = await projectLinkRequest.readAll(requestData);
            response.pushSuccess(ResponseCode.OK.code, projectLinks);
        } catch(err) {
            console.log(err);
            response.pushError(err.code, err.message, err.error);
        }
    }
);

router.put('/:id', passport.authenticate('jwt', { session: false }), 
    async (req, res) => {
        const response = Response;
        response.instance = res;
        const requestData: request = req;
        try {
            await projectLinkRequest.update(requestData);
            response.pushSuccess(ResponseCode.OK.code, { success: true });
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
            await projectLinkRequest.delete(requestData);
            response.pushSuccess(ResponseCode.OK.code, { success: true });
        } catch(err) {
            console.log(err);
            response.pushError(err.code, err.message, err.error);
        }
    }
);

export default router;