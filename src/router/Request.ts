import { request } from "./Response";

export default interface Request {
    update(req: request): any,
    delete(req: request): any,
    deletes(req: request): any,
    readAll(req: request): any,
    read(req: request): any,
    inputValidation(input:any, language:string): any
}