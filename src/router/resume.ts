import express from 'express';
import { Response, ResponseCode, request } from './Response';
import passport from 'passport';
import ResumeRequest from './user/Resume';

const router = express.Router();

const resumeRequest = new ResumeRequest();

router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const response = Response;
    response.instance = res;
    const requestData: request = req;
    try {
        await resumeRequest.add(requestData);
        response.pushSuccess(ResponseCode.Created.code, {success: true});
    } catch(err) {
        console.log(err)
        response.pushError(err.code, err.message, err.error);
    }
});

router.get('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const response = Response;
    response.instance = res;
    const requestData: request = req;
    try {
        const resume = await resumeRequest.read(requestData);
        response.pushSuccess(ResponseCode.OK.code, resume);
    } catch(err) {
        console.log(err)
        response.pushError(err.code, err.message, err.error);
    }
});

router.get('/allBy/:userId', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const response = Response;
    response.instance = res;
    const requestData: request = req;
    try {
        const resumes = await resumeRequest.readAll(requestData);
        response.pushSuccess(ResponseCode.OK.code, resumes);
    } catch(err) {
        console.log(err)
        response.pushError(err.code, err.message, err.error);
    }
});

router.put('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const response = Response;
    response.instance = res;
    const requestData: request = req;
    try {
        await resumeRequest.update(requestData);
        response.pushSuccess(ResponseCode.OK.code, { success: true });
    } catch(err) {
        console.log(err)
        response.pushError(err.code, err.message, err.error);
    }
});

router.delete('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const response = Response;
    response.instance = res;
    const requestData: request = req;
    try {
        await resumeRequest.delete(requestData);
        response.pushSuccess(ResponseCode.OK.code, { success: true });
    } catch(err) {
        console.log(err)
        response.pushError(err.code, err.message, err.error);
    }
});

export default router;