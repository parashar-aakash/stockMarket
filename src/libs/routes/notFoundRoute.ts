import { Request , Response , NextFunction } from 'express';

export default ( req: Request , res: Response , next: NextFunction ) => {
    console.log( `first middleWare Working` ) ;
    next( {
        err : 'Not Found',
        code : 404
    } );
};
