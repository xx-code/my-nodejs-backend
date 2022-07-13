import express from 'express';
import { Response, ResponseCode, request } from './Response';
import passport from 'passport';
import DevSkillRequest from './devSkill/DevSkill';

const router = express.Router();

const devSkillRequest = new DevSkillRequest();

router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const response = Response;
    response.instance = res;
    const requestData: request = req;
    try {
        await devSkillRequest.add(requestData);
        response.pushSuccess(ResponseCode.Created.code, { success: true });
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
        const devSkill = await devSkillRequest.read(requestData);
        response.pushSuccess(ResponseCode.OK.code, devSkill);
    } catch(err) {
        console.log(err);
        response.pushError(err.code, err.message, err.error);
    }
});

router.get('/allBy/:userId', async (req, res) => {
    const response = Response;
    response.instance = res;
    const requestData: request = req;
    try {
        const devSkills = await devSkillRequest.readAll(requestData);
        response.pushSuccess(ResponseCode.OK.code, devSkills);
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
        await devSkillRequest.update(requestData);
        response.pushSuccess(ResponseCode.OK.code, { success: true });
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
        await devSkillRequest.delete(requestData)
        response.pushSuccess(ResponseCode.OK.code, { success: true });
    } catch(err) {
        console.log(err);
        response.pushError(err.code, err.message, err.error);
    }
});

export default router;