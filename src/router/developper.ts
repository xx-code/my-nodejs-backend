import express from 'express';
import { Response, ResponseCode, request } from './Response';
import passport from 'passport';
import DevelopperRequest from './user/Developper';
import { Utils } from '../utils/Utils';

const router = express.Router();

const developperRequest = new DevelopperRequest();

router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const response = Response;
    response.instance = res;
    const requestData: request = req;
    try {
        await developperRequest.add(requestData);
        response.pushSuccess(ResponseCode.Created.code, { success: true });
    } catch(err) {
        console.log(err);
        response.pushError(err.code, err.message, err.error);
    }
});

router.get('/', async (req, res) => { 
    const response = Response;
    response.instance = res;
    const requestData: request = req;
    try {
        const developper =  await developperRequest.readAll(requestData);
        response.pushSuccess(ResponseCode.Created.code, developper);
    } catch(err) {
        console.log(err);
        response.pushError(err.code, err.message, err.error);
    }
});

router.get('/:id', async (req, res) => {
    const response = Response;
    response.instance = res;
    const requestData: request = req;
    try {
        const developpers = await developperRequest.read(requestData);
        response.pushSuccess(ResponseCode.Created.code, developpers);
    } catch(err) {
        console.log(err);
        response.pushError(err.code, err.message, err.error);
    }
});

router.get('/byUser/:userId', async (req, res) => {
    const response = Response;
    response.instance = res;
    const requestData: request = req;
    try {
        const developpers = await developperRequest.read(requestData);
        response.pushSuccess(ResponseCode.Created.code, developpers);
    } catch(err) {
        console.log(err);
        response.pushError(err.code, err.message, err.error);
    }
});

router.get('/byName/:name', async (req, res) => {
    const response = Response;
    response.instance = res;
    const requestData: request = req;
    try {
        const developpers = await developperRequest.read(requestData);
        response.pushSuccess(ResponseCode.Created.code, developpers);
    } catch(err) {
        console.log(err);
        response.pushError(err.code, err.message, err.error);
    }
});

router.put('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const response = Response;
    response.instance = res;
    const requestData: request = req;
    try {
        await developperRequest.update(requestData);        
        response.pushSuccess(ResponseCode.Created.code, { success: true });
    } catch(err) {
        console.log(err);
        response.pushError(err.code, err.message, err.error);
    }
});

router.delete('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const response = Response;
    response.instance = res;
    const requestData: request = req;
    try {
        await developperRequest.delete(requestData);
        response.pushSuccess(ResponseCode.Created.code, { success: true });
    } catch(err) {
        console.log(err);
        response.pushError(err.code, err.message, err.error);
    } 
});

export default router;