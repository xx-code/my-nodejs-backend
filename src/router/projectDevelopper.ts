import express from 'express';
import { Response, ResponseCode, request } from './Response';
import passport from 'passport';
import ProjectDevelopperRequest from './project/ProjectDevelopper';
import { Utils } from '../utils/Utils';

const router = express.Router();
const projectDevelopperRequest = new ProjectDevelopperRequest();

router.post('/', passport.authenticate('jwt', { session: false }), 
    async (req, res) => {
        const response = Response;
        response.instance = res;
        const requestData: request = req;
        try {
            await projectDevelopperRequest.add(requestData);
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
            const projectDeveloppers = await projectDevelopperRequest.readAll(requestData);
            response.pushSuccess(ResponseCode.OK.code, projectDeveloppers);
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
            const projectDevelopper = await projectDevelopperRequest.read(requestData);
            response.pushSuccess(ResponseCode.OK.code, projectDevelopper);
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
            await projectDevelopperRequest.delete(requestData);
            response.pushSuccess(ResponseCode.OK.code, { success: true });
        } catch(err) {
            console.log(err);
            response.pushError(err.code, err.message, err.error);
        }
    }
);

export default router;