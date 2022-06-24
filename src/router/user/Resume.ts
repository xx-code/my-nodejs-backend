import Resume from "../../models/Resume";
import Request from '../Request';
import { request } from "../Response";

export default class ResumeRequest implements Request{
    update(req: request) {
        throw new Error("Method not implemented.");
    }
    delete(req: request) {
        throw new Error("Method not implemented.");
    }
    deletes(req: request) {
        throw new Error("Method not implemented.");
    }
    readAll(req: request) {
        throw new Error("Method not implemented.");
    }
    read(req: request) {
        throw new Error("Method not implemented.");
    }
    inputValidation(input: any, language: string) {
        throw new Error("Method not implemented.");
    }
}