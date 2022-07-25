import express from 'express';
import { Response, ResponseCode, request } from './Response';
import passport from 'passport';
import { Utils } from '../utils/Utils';
import ProjectRequest from './project/Project';

const router = express.Router();

const projectRequest = new ProjectRequest();

router.post('/', passport.authenticate('jwt', { session: false }), 
    async (req, res) => {
        const response = Response;
        response.instance = res;
        const requestData: request = req;
        try {
            await projectRequest.add(requestData);
            response.pushSuccess(ResponseCode.Created.code, { success: true });
        } catch(err) {
            console.log(err);
            response.pushError(err.code, err.message, err.error);
        }
    }
);

router.get('/', async (req, res) => {
        const response = Response;
        response.instance = res;
        const requestData: request = req;
        try {
            const projects = await projectRequest.readAll(requestData);
            response.pushSuccess(ResponseCode.OK.code, projects);
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
            const project = await projectRequest.read(requestData);
            response.pushSuccess(ResponseCode.OK.code, project);
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
            await projectRequest.update(requestData);
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
            await projectRequest.delete(requestData);
            response.pushSuccess(ResponseCode.OK.code, { success: true });
        } catch(err) {
            console.log(err);
            response.pushError(err.code, err.message, err.error);
        }
    }
);

export default router;