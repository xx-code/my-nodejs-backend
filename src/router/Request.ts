import { request } from "./Response";

export default interface Request {
    add(req: request): any,
    update(req: request): any,
    delete(req: request): any,
    deletes(req: request): any,
    readAll(req: request): any,
    read(req: request): any,
    inputValidation(input:any, language:string): any
}