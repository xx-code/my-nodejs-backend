
export interface request {
    params?: any,
    query?: any,
    body?: any,
    file?: any,
    files?: any,
    lang?: any,
    user?: any
};

export const ResponseCode = {
    OK : { code: 200, message: 'Success'},
    Created : { code: 201, message: 'Created'},
    No_Content: { code: 204, message: 'No Content'},
    Bad_Request: { code: 400, message: 'Bad request'},
    Unauthorized: { code: 401, message: 'Unauthorized'},
    Forbidden: {  code: 403, message: 'Forbidden'},
    NotFound: { code: 404, message: 'Not Found'},
    InternalServerError: { code: 500, message: 'Internal Server Error'}
}

export namespace Response {
    export let instance:any;

    export function pushError(status:number, error:string, message:any) {
        if (instance)
            return instance.status(status).send({ error: error, message: message });
        throw new Error('error operation impossible - verify if instance is initialize');
    }

    export function pushSuccess(status:number, object:any) {
        if (instance)
            return instance.status(status).send(object)
        throw new Error('error operation impossible - verify if action is ');
    }
};
