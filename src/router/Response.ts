
export interface request {
    param: any,
    query: any,
    body: any,
    file: any,
    files: any
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

export default class Response {
    action:any;

    pushError(status:number, error:string, message:string) {

    }

    pushResponse(status:number, object:any) {
    }
};
