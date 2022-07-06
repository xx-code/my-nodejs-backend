import express from 'express';
import { Response, ResponseCode, request } from './Response';
import passport from 'passport';
import SocialLinkRequest from './user/SocialLink';

const router = express.Router();


const socialLinkRequest = new SocialLinkRequest();

router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const response = Response;
    response.instance = res;
    const requestData: request = req;
    try {
        await socialLinkRequest.add(requestData);
        response.pushSuccess(ResponseCode.Created.code, { success: true });
    } catch (err) {
        console.log(err)
        response.pushError(err.code, err.message, err.error);
    }
});

router.get('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const response = Response;
    response.instance = res;
    const requestData: request = req;
    try {
        const socialLink = await socialLinkRequest.read(requestData);
        response.pushSuccess(ResponseCode.OK.code, socialLink);
    } catch (err) {
        console.log(err)
        response.pushError(err.code, err.message, err.error);
    }
});

router.get('/allBy/:userId', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const response = Response;
    response.instance = res;
    const requestData: request = req;
    try {
        const socialLinks = await socialLinkRequest.readAll(requestData);
        response.pushSuccess(ResponseCode.OK.code, socialLinks);
    } catch (err) {
        console.log(err)
        response.pushError(err.code, err.message, err.error);
    }
});

router.put('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const response = Response;
    response.instance = res;
    const requestData: request = req;
    try {
        await socialLinkRequest.update(requestData);
        response.pushSuccess(ResponseCode.OK.code, { success: true });
    } catch (err) {
        console.log(err)
        response.pushError(err.code, err.message, err.error);
    }
});

router.delete('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const response = Response;
    response.instance = res;
    const requestData: request = req;
    try {
        await socialLinkRequest.delete(requestData);
        response.pushSuccess(ResponseCode.OK.code, { success: true });
    } catch (err) {
        console.log(err)
        response.pushError(err.code, err.message, err.error);
    }
});

export default router;