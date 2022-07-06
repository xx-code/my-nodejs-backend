import { request } from "../router/Response";
import multer from 'multer';

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

    export function getUploader() {
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, './temp/');
            },
            filename: (req, file, cb) => {
                cb(null, 'temp' + file.originalname);
            }
        });

        const filter = (req:any, file:any, cb: any) => {
            if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
                cb(null, true);
            } else {
                cb(null, false);
            }
        };

        const uploader = multer({
            storage: storage,
            fileFilter: filter,
            limits: {
                fileSize: 1024 * 1024 * 5
            }
        });

        return uploader;
    }
}