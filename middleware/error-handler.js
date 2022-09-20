import { CustomApiError } from '../errors/custom-error.js';

const errorHandler = async (err, req, res, next) => {
    if(err instanceof CustomApiError){
        return res.status(err.statusCode).json({success : false, msg : err.message});
    }
    return res.status(500).json({success : false, msg : err.message});
};

export {errorHandler};
