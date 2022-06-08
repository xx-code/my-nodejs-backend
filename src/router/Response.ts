
export interface request {
    param: any,
    query: any,
    body: any,
    file: any,
    files: any,
    lang: any
};

export const ResponseCode = {
    OK : 200,
    Created : 201,
    No_Content: 204,
    Bad_Request: 400,
    Unauthorized: 401,
    Forbidden: 403,
    NotFound: 404,
    InternalServerError: 500
}

export namespace Response {
    export let instance:any;

    export function pushError(status:number, error:string, message:string) {
        if (instance)
            return instance.status(status).send({ error: error, message: message });
        throw 'error operation impossible - verify if instance is initialize';
    }

    export function pushSuccess(status:number, object:any) {
        if (instance)
            return instance.status(status).send(object)
        throw 'error operation impossible - verify if action is '
    }
};
