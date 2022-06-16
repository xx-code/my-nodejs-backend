import { request } from "../router/Response";

export namespace Utils {
    export function isEmpty(value: any) {
        if (value === undefined)
            return true;
        
        if (value === null)
            return true;

        if (typeof value === 'object' && Object.keys(value).length === 0)
            return true;
        
        if (typeof value === 'string' && value.trim().length === 0)
            return true;
        
        return false;
    }

    export function matchLanguage(req: request) {
        const query = !isEmpty(req.query) ? req.query : '';
        return !isEmpty(query.lang) ? query.lang.toString() : 'en'
    }
}