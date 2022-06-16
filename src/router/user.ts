import express from 'express';
import { Response, ResponseCode, request } from './Response';
import RouterFactory from './RouterFactory';

const router = express.Router();

const routerFactory = new RouterFactory();

const userRequest = routerFactory.getInstanceRequest('user');

router.post('/signup', async (req, res) => {
    const response = Response
    response.instance = res;
    const requestData: request = req;
    try {
        await userRequest.signUp(requestData);
        response.pushSuccess(ResponseCode.Created.code, { success: true });
    } catch(err) {
        response.pushError(err.code, err.message, err.error);
    }
});

export default router;