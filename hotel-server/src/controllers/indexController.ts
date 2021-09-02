import { Request, Response } from 'express';

class IndexController {
    public index (req: Request, res: Response){
        res.json({text: 'API Is /api/hotel'});
        //res.send("Hello from indexController");
    }
}

export const indexController = new IndexController();