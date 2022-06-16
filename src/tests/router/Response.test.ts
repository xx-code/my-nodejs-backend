import { Response, ResponseCode } from '../../../src/router/Response';

const res = { status: jest.fn((status: number) => ({ send: jest.fn((object: any) => object) })) };

test('test error response', () => {    
    const resultExpected = {error: 'error', message: 'message d\'erreur'};
    Response.instance = res;
    const result = Response.pushError(ResponseCode.Bad_Request.code, 'error', 'message d\'erreur');
    expect(resultExpected).toEqual(result);
});

test('test success response', () => {
    const resultExpected = {success: true};
    Response.instance = res;
    const result = Response.pushSuccess(ResponseCode.OK.code, {success: true});
    expect(resultExpected).toEqual(result);
});