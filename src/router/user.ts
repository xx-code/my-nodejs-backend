import express from 'express';
import { Response, ResponseCode, request } from './Response';
import passport from 'passport';
import UserRequest from './user/User';

const router = express.Router();


const userRequest = new UserRequest();

router.post('/signup', async (req, res) => {
    const response = Response;
    response.instance = res;
    const requestData: request = req;
    try {
        await userRequest.signUp(requestData);
        response.pushSuccess(ResponseCode.Created.code, { success: true });
    } catch(err) {
        response.pushError(err.code, err.message, err.error);
    }
});

router.get('/:id', async (req, res) => {
   const response = Response;
   response.instance = res;
   const requestData: request = req;
   try {
       const user = await userRequest.read(requestData);
       user.password = undefined;
       response.pushSuccess(ResponseCode.OK.code, { user });
   } catch(err) {
       response.pushError(err.code, err.message, err.error);
   }
});

router.post('/signin', async (req, res) => {
    const response = Response;
    response.instance = res;
    const requestData: request = req;
    try {
        const token = await userRequest.signIn(requestData);
        response.pushSuccess(ResponseCode.OK.code, { token });
    } catch(err) {
        console.log(err)
        response.pushError(err.code, err.message, err.error);
    }
});

router.get('/', async (req, res) => {
    const response = Response;
    response.instance = res;
    const requestData: request = req;
    try {
        const users = await userRequest.readAll(requestData);
        response.pushSuccess(ResponseCode.OK.code, { users });
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
        await userRequest.update(requestData);
        response.pushSuccess(ResponseCode.OK.code, { success: true });
    } catch(err) {
        console.log(err);
        response.pushError(err.code, err.message, err.error);
    }
});

router.put('/u/modifyPassword', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const response = Response;
    response.instance = res;
    const requestData: request = req;
    try {
        await userRequest.modifyPassword(requestData);
        response.pushSuccess(ResponseCode.OK.code, { success: true });
    } catch(err) {
        console.log(err);
        response.pushError(err.code, err.message, err.error);
    }
})

export default router;